#!/usr/bin/env python3
"""
Script to populate chatbot answers in the database
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone
import uuid

async def populate_chatbot_answers():
    """Populate the database with initial chatbot answers"""
    
    # MongoDB connection
    mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
    client = AsyncIOMotorClient(mongo_url)
    db = client[os.environ.get('DB_NAME', 'cyboglabs')]
    
    # Clear existing answers
    await db.chatbot_answers.delete_many({})
    
    # Initial chatbot answers
    answers = [
        {
            "id": str(uuid.uuid4()),
            "keywords": ["what", "cyboglabs", "company", "about", "who"],
            "answer": "CYBOGLABS is a future-driven R&D powerhouse committed to pushing boundaries and turning visionary ideas into cutting-edge innovations. We specialize in Product-Driven Engineering R&D, AI & Machine Learning Systems, Hardware-Software Co-Development, and more.",
            "category": "company",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "keywords": ["products", "services", "projects", "what", "offer"],
            "answer": "We offer innovative products including SpotyTags (hospitality automation), Pixzee.ai (AI fashion platform), Matrivis (warehouse intelligence), TestRive (driving simulation), ZepTrack (pharmacy automation), and WONDS (warranty platform). Each product addresses specific industry challenges with cutting-edge technology.",
            "category": "products",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "keywords": ["careers", "jobs", "hiring", "opportunities", "work"],
            "answer": "We're currently hiring for DevOps Engineer (3-6 years), AI/ML Architect (5-10 years), Cloud Architect (6-10 years), and Hardware & Embedded Systems Engineer (4-8 years). We also offer paid internships in AI/ML Research, Full Stack Development, Embedded Systems, and Cloud & DevOps. Visit our careers page for more details!",
            "category": "careers",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "keywords": ["contact", "email", "support", "reach", "help"],
            "answer": "You can reach us at support@cyboglabs.com for general inquiries, careers@cyboglabs.com for career opportunities, or use our contact form on the website. We typically respond within 24-48 hours for general inquiries and 3-5 business days for career applications.",
            "category": "contact",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "keywords": ["internships", "intern", "students", "learning"],
            "answer": "We offer paid internships lasting 3-6 months in AI/ML Research, Full Stack Development, Embedded Systems, and Cloud & DevOps. Interns get hands-on experience with real projects, mentorship from industry experts, flexible work arrangements, and potential pre-placement opportunities.",
            "category": "internships",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "keywords": ["matrivis", "port", "iit", "madras", "innovation"],
            "answer": "Matrivis is our digital warehouse intelligence system selected by IIT Madras for the Port Innovation Challenge 2025. It transforms Chennai port operations with real-time cargo tracking, AI-powered predictive analytics, and seamless integration capabilities.",
            "category": "products",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "keywords": ["location", "where", "address", "office"],
            "answer": "CYBOGLABS is an R&D-focused company. For specific location information or to arrange a visit, please contact us at support@cyboglabs.com. We work with clients globally and can accommodate both in-person and virtual collaborations.",
            "category": "company",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": str(uuid.uuid4()),
            "keywords": ["technology", "tech", "stack", "expertise"],
            "answer": "Our expertise spans Product-Driven Engineering R&D, AI & Machine Learning Systems, Hardware-Software Co-Development, Technology Problem Solving, Experimental Prototyping & Validation, and End-to-End Product Ownership. We work with cutting-edge technologies across multiple domains.",
            "category": "company",
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    
    # Insert answers into database
    result = await db.chatbot_answers.insert_many(answers)
    print(f"Inserted {len(result.inserted_ids)} chatbot answers")
    
    # Close connection
    client.close()

if __name__ == "__main__":
    asyncio.run(populate_chatbot_answers())
