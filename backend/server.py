from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pathlib import Path
import os
import logging
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, List
import uuid
from datetime import datetime, timezone

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()
# Add this after line 26
root_path = os.environ.get('ROOT_PATH', '')
app = FastAPI(root_path=root_path)
# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Chatbot now uses database-based answers instead of OpenAI
logger.info("CYBOT chatbot initialized with database backend")

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

class ChatbotAnswer(BaseModel):
    keywords: List[str]
    answer: str
    category: str = "general"

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
    """CYBOT - Database-powered chatbot for CYBOGLABS"""
    try:
        session_id = chat_input.session_id or str(uuid.uuid4())
        user_message = chat_input.message.lower().strip()
        
        # Find matching answer in database (no chat storage)
        answer = await find_best_answer(user_message)
        
        return ChatResponse(response=answer, session_id=session_id)
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        return ChatResponse(
            response="I apologize, but I'm having trouble processing your request right now. Please try again or contact support@cyboglabs.com for assistance.",
            session_id=chat_input.session_id or str(uuid.uuid4())
        )

async def find_best_answer(user_message: str) -> str:
    """Find the best matching answer based on keywords"""
    try:
        # Get all chatbot answers from database
        answers = await db.chatbot_answers.find({}).to_list(100)
        
        if not answers:
            # If no answers in database, return default
            return "Hello! I'm CYBOT, your AI assistant for CYBOGLABS. How can I help you today? You can ask me about our products, services, careers, or anything else!"
        
        # Keyword matching logic with improved scoring
        best_match = None
        best_score = 0
        
        for answer in answers:
            score = 0
            keywords = answer.get("keywords", [])
            user_words = user_message.split()
            
            # Check for exact keyword matches (higher score)
            for keyword in keywords:
                if keyword.lower() in user_message:
                    score += 3
            
            # Check for partial word matches (lower score)
            for keyword in keywords:
                keyword_words = keyword.lower().split()
                for keyword_word in keyword_words:
                    if keyword_word in user_words:
                        score += 1
            
            # Bonus for category-specific keywords
            category = answer.get("category", "")
            if category == "careers" and any(word in user_message for word in ["career", "job", "work", "hiring"]):
                score += 2
            elif category == "products" and any(word in user_message for word in ["product", "service", "project"]):
                score += 2
            elif category == "contact" and any(word in user_message for word in ["contact", "email", "reach", "support"]):
                score += 2
            elif category == "internships" and any(word in user_message for word in ["intern", "student", "learning"]):
                score += 2
            
            if score > best_score:
                best_score = score
                best_match = answer
        
        # If we found a good match, return it
        if best_match and best_score >= 2:
            return best_match.get("answer", "I'm not sure how to help with that. Please contact support@cyboglabs.com for more assistance.")
        
        # Fallback responses for common patterns
        if any(word in user_message for word in ["hello", "hi", "hey"]):
            return "Hello! I'm CYBOT, your AI assistant for CYBOGLABS. How can I help you today?"
        
        if any(word in user_message for word in ["bye", "goodbye", "thanks"]):
            return "Thank you for chatting with CYBOT! Have a great day! Feel free to reach out anytime."
        
        # Default fallback
        return "I'm not sure I understand. Could you please rephrase your question? You can ask me about our products, services, careers, or contact information."
        
    except Exception as e:
        logger.error(f"Error finding answer: {str(e)}")
        return "I'm having trouble finding the right answer. Please try again or contact support@cyboglabs.com for assistance."

@api_router.post("/chatbot-answers")
async def add_chatbot_answer(answer_data: ChatbotAnswer):
    """Add a new answer to the chatbot knowledge base"""
    try:
        answer_doc = {
            "id": str(uuid.uuid4()),
            "keywords": answer_data.keywords,
            "answer": answer_data.answer,
            "category": answer_data.category,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        
        await db.chatbot_answers.insert_one(answer_doc)
        return {"success": True, "message": "Answer added successfully"}
        
    except Exception as e:
        logger.error(f"Error adding answer: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to add answer")

@api_router.get("/chatbot-answers")
async def get_chatbot_answers():
    """Get all chatbot answers"""
    try:
        answers = await db.chatbot_answers.find({}, {"_id": 0}).to_list(100)
        return answers
        
    except Exception as e:
        logger.error(f"Error getting answers: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get answers")

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