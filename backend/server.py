from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from openai import OpenAI


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# OpenAI client with Emergent LLM key
openai_client = OpenAI(
    api_key=os.environ.get('EMERGENT_LLM_KEY'),
    base_url="https://api.emergentmethods.ai/v1"
)

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# CYBOGLABS Knowledge Base - Company information for CYBOT
CYBOGLABS_KNOWLEDGE = """
# CYBOGLABS Company Information

## About CYBOGLABS
CYBOGLABS is a future-driven R&D powerhouse committed to pushing boundaries and turning visionary ideas into cutting-edge innovations. Our tagline is "Technology & Life". For us, the future isn't something to predict, it's something to create.

## Contact Information
- Email: support@cyboglabs.com
- For careers: careers@cyboglabs.com

## Our Vision
To emerge as the world's leader in R&D, creating long-term innovation that defines the future of technology and enhances human affairs around the globe.

## Our Mission
- To deliver high-impact R&D solutions that address real-world challenges
- To foster innovation through collaboration, creativity & technology
- To empower businesses with scalable, efficient & future-ready solutions

## Our Specialties
1. **Product-Driven Engineering R&D**: We conduct applied research and experimental development to create original, IP-led technology products.
2. **AI & Machine Learning Systems**: We design and implement AI and ML models as core components of our products, focusing on real-world applicability, automation, and intelligent decision-making.
3. **Hardware-Software Co-Development**: We build integrated systems where custom hardware, embedded firmware, and software platforms are developed together to solve complex operational challenges.
4. **Technology Problem Solving**: We take on difficult, unsolved engineering challenges and translate them into scalable, practical technology solutions through structured experimentation and iteration.
5. **Experimental Prototyping & Validation**: We rapidly prototype, test, and refine concepts to validate feasibility, performance, and market relevance before moving toward productization.
6. **End-to-End Product Ownership**: From concept and research to design, development, and IP creation, all core innovation is conceived and built in-house, with manufacturing executed through trusted partners.

## Our Projects
1. **SpotyTags**: Hospitality-focused automation platform for intelligent tracking and billing of in-room consumables.
2. **Pixzee.ai**: An AI-driven apparel platform that blends personalization, automation, and digital intelligence into fashion retail.
3. **PixzeePod**: An AI-powered retail assistant designed to enhance customer interaction and in-store decision support.
4. **Seabot.ai**: An intelligent marine data platform built to enable real-time monitoring and insights in maritime environments.
5. **Matrivis**: A digital warehouse intelligence system designed for port and logistics operations to improve visibility and control. Recently selected by IIT Madras for Chennai Port Operations transformation.
6. **TestRive**: A virtual driving and simulation platform created to evaluate, train, and validate vehicle interaction scenarios.
7. **Lockfee**: An automated parking compliance solution that enables digital payment and controlled clamp release with minimal manual intervention.
8. **SpotAxis**: A smart parking assistance platform focused on improving flow, compliance, and operational efficiency in managed parking environments.
9. **ZepTrack**: An automation platform designed to streamline pharmacy operations and inventory-driven workflows.
10. **WONDS**: A digital warranty and after-sales platform that simplifies product ownership and service access for end users.

## Career Opportunities
We are currently hiring for:
1. **DevOps Engineer** (3-6 years experience) - Infrastructure & Operations
2. **AI/ML Architect** (5-10 years experience) - Artificial Intelligence
3. **Cloud Architect** (6-10 years experience) - Cloud Infrastructure
4. **Hardware & Embedded Systems Engineer** (4-8 years experience) - Hardware Engineering

## Internship Programs
We offer paid internships in:
1. AI/ML Research Intern (3-6 months)
2. Full Stack Development Intern (3-6 months)
3. Embedded Systems Intern (4-6 months)
4. Cloud & DevOps Intern (3-6 months)

## Recent News & Events
- **Matrivis selected by IIT Madras** for the Port Innovation Challenge 2025 to transform Chennai port operations.
- **India Tech Summit 2025**: CYBOGLABS will showcase innovations at Booth #A-127 in September 2025.
- **Embedded AI Workshop**: Hands-on TinyML workshop scheduled for October 2025.

## Website Pages
- Home: /
- About: /#about
- Projects: /#projects
- Blog: /blog
- Careers: /careers
- Internships: /internships
- Events & News: /events-news
- Contact: /#contact
- Terms & Conditions: /terms
- Privacy Policy: /privacy
"""


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

class EmailContact(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    type: str = "general"  # general, careers, support

class EmailResponse(BaseModel):
    success: bool
    message: str

class VisitorData(BaseModel):
    userAgent: Optional[str] = None
    language: Optional[str] = None
    platform: Optional[str] = None
    screenWidth: Optional[int] = None
    screenHeight: Optional[int] = None
    referrer: Optional[str] = None
    path: Optional[str] = None
    timestamp: Optional[str] = None

class VisitorResponse(BaseModel):
    success: bool
    visitor_id: str

# Store chat history in memory (for demo - in production use database)
chat_sessions = {}

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_cybot(chat_input: ChatMessage):
    """CYBOT - AI-powered chatbot for CYBOGLABS"""
    try:
        session_id = chat_input.session_id or str(uuid.uuid4())
        
        # Get or create chat history for this session
        if session_id not in chat_sessions:
            chat_sessions[session_id] = []
        
        # Add user message to history
        chat_sessions[session_id].append({
            "role": "user",
            "content": chat_input.message
        })
        
        # Keep only last 10 messages to manage context
        recent_history = chat_sessions[session_id][-10:]
        
        # Create system prompt with knowledge base
        system_prompt = f"""You are CYBOT, the friendly and helpful AI assistant for CYBOGLABS. You help visitors learn about the company, its products, services, career opportunities, and more.

Use the following knowledge base to answer questions accurately. If you don't know something or the information isn't in the knowledge base, politely say so and suggest contacting support@cyboglabs.com.

Be conversational, helpful, and professional. Keep responses concise but informative.

{CYBOGLABS_KNOWLEDGE}

Important guidelines:
- Always be helpful and friendly
- For career inquiries, direct them to /careers page or careers@cyboglabs.com
- For support, direct them to support@cyboglabs.com
- For internships, mention the /internships page
- If asked about specific projects, provide details from the knowledge base
- Keep responses concise (2-3 paragraphs max unless more detail is needed)
"""
        
        messages = [{"role": "system", "content": system_prompt}] + recent_history
        
        # Call OpenAI API via Emergent
        response = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=500,
            temperature=0.7
        )
        
        assistant_message = response.choices[0].message.content
        
        # Add assistant response to history
        chat_sessions[session_id].append({
            "role": "assistant",
            "content": assistant_message
        })
        
        return ChatResponse(response=assistant_message, session_id=session_id)
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        return ChatResponse(
            response="I apologize, but I'm having trouble processing your request right now. Please try again or contact support@cyboglabs.com for assistance.",
            session_id=chat_input.session_id or str(uuid.uuid4())
        )

@api_router.post("/contact", response_model=EmailResponse)
async def submit_contact(contact: EmailContact):
    """Submit contact form - stores in database and returns confirmation"""
    try:
        # Store in database
        contact_doc = {
            "id": str(uuid.uuid4()),
            "name": contact.name,
            "email": contact.email,
            "subject": contact.subject,
            "message": contact.message,
            "type": contact.type,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "status": "pending"
        }
        
        await db.contacts.insert_one(contact_doc)
        
        # Determine response based on type
        if contact.type == "careers":
            response_msg = f"Thank you {contact.name}! Your career inquiry has been received. Our HR team will review your message and get back to you at {contact.email} within 3-5 business days."
        elif contact.type == "support":
            response_msg = f"Thank you {contact.name}! Your support request has been logged. Our technical team will respond to {contact.email} within 24-48 hours."
        else:
            response_msg = f"Thank you {contact.name}! Your message has been received. We'll get back to you at {contact.email} soon."
        
        return EmailResponse(success=True, message=response_msg)
        
    except Exception as e:
        logger.error(f"Contact form error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to submit contact form")

@api_router.get("/contacts")
async def get_contacts():
    """Get all contact submissions (admin endpoint)"""
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

@api_router.post("/visitors", response_model=VisitorResponse)
async def track_visitor(visitor: VisitorData):
    """Track visitor data for analytics (only if user consented to cookies)"""
    try:
        visitor_doc = {
            "id": str(uuid.uuid4()),
            "user_agent": visitor.userAgent,
            "language": visitor.language,
            "platform": visitor.platform,
            "screen_width": visitor.screenWidth,
            "screen_height": visitor.screenHeight,
            "referrer": visitor.referrer,
            "path": visitor.path,
            "visit_timestamp": visitor.timestamp or datetime.now(timezone.utc).isoformat(),
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        
        await db.visitors.insert_one(visitor_doc)
        
        return VisitorResponse(success=True, visitor_id=visitor_doc["id"])
        
    except Exception as e:
        logger.error(f"Visitor tracking error: {str(e)}")
        return VisitorResponse(success=False, visitor_id="")

@api_router.get("/visitors/stats")
async def get_visitor_stats():
    """Get visitor statistics (admin endpoint)"""
    try:
        total_visitors = await db.visitors.count_documents({})
        
        # Get visitors from last 24 hours
        from datetime import timedelta
        yesterday = (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
        recent_visitors = await db.visitors.count_documents({
            "created_at": {"$gte": yesterday}
        })
        
        # Get unique paths
        pipeline = [
            {"$group": {"_id": "$path", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 10}
        ]
        top_pages = await db.visitors.aggregate(pipeline).to_list(10)
        
        # Get referrer stats
        referrer_pipeline = [
            {"$group": {"_id": "$referrer", "count": {"$sum": 1}}},
            {"$sort": {"count": -1}},
            {"$limit": 5}
        ]
        top_referrers = await db.visitors.aggregate(referrer_pipeline).to_list(5)
        
        return {
            "total_visitors": total_visitors,
            "visitors_last_24h": recent_visitors,
            "top_pages": [{"page": p["_id"], "visits": p["count"]} for p in top_pages],
            "top_referrers": [{"referrer": r["_id"], "count": r["count"]} for r in top_referrers]
        }
    except Exception as e:
        logger.error(f"Visitor stats error: {str(e)}")
        return {"error": str(e)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()