import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime, timezone

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()

# ── Supabase ──────────────────────────────────────────────
SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")

def get_supabase():
    if not SUPABASE_URL or not SUPABASE_KEY:
        raise Exception("Supabase credentials missing. Please set SUPABASE_URL and SUPABASE_KEY in environment variables.")
    return create_client(SUPABASE_URL, SUPABASE_KEY)

# ── SMTP ──────────────────────────────────────────────────
SMTP_EMAIL = os.getenv("SMTP_EMAIL", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "sasikumarblogger@gmail.com")

# ── FastAPI app ───────────────────────────────────────────
app = FastAPI(title="Sasikumar Portfolio API", version="1.0.0")

# CORS – allow frontend origin
origins = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schema ────────────────────────────────────────────────
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str


# ── Routes ────────────────────────────────────────────────
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Portfolio API is running"}


@app.post("/contact")
async def handle_contact(data: ContactForm):
    """
    1. Insert contact message into Supabase `contacts` table (SQL / PostgreSQL).
    2. Send notification email via SMTP.
    """
    try:
        # ── 1. Store in Supabase (PostgreSQL) ─────────────
        supabase = get_supabase()
        row = {
            "name": data.name,
            "email": data.email,
            "subject": data.subject,
            "message": data.message,
            "created_at": datetime.now(timezone.utc).isoformat(),
        }
        result = supabase.table("contacts").insert(row).execute()

        if not result.data:
            raise Exception("Failed to insert into Supabase: result.data is empty")

        # ── 2. Send email notification ────────────────────
        if SMTP_EMAIL and SMTP_PASSWORD:
            _send_email(data)

        return {"success": True, "message": "Message received! I'll get back to you soon."}

    except Exception as e:
        error_msg = str(e)
        print(f"[ERROR] /contact: {error_msg}")
        
        # Friendly error messages for common cloud issues
        if "supabase credentials missing" in error_msg.lower():
            friendly_detail = "API Configuration Error: SUPABASE_URL or SUPABASE_KEY is missing in your environment variables."
        elif "row-level security" in error_msg.lower():
            friendly_detail = "Database Permission Error: Please ensure you have disabled RLS or added a policy for the 'contacts' table."
        elif "bad credentials" in error_msg.lower() or "password not accepted" in error_msg.lower():
            friendly_detail = "Email Error: SMTP credentials (App Password) are incorrect."
        else:
            friendly_detail = error_msg

        raise HTTPException(status_code=500, detail=friendly_detail)


def _send_email(data: ContactForm):
    """Send a notification email via Gmail SMTP."""
    if not SMTP_EMAIL or not SMTP_PASSWORD:
        return

    msg = MIMEMultipart()
    msg["From"] = SMTP_EMAIL
    msg["To"] = RECIPIENT_EMAIL
    msg["Subject"] = f"Portfolio Contact: {data.subject}"

    body = f"""
    New message from your portfolio website!

    Name:    {data.name}
    Email:   {data.email}
    Subject: {data.subject}

    Message:
    {data.message}
    """
    msg.attach(MIMEText(body, "plain"))

    try:
        with smtplib.SMTP("smtp.gmail.com", 587) as server:
            server.starttls()
            server.login(SMTP_EMAIL, SMTP_PASSWORD)
            server.send_message(msg)
    except Exception as e:
        print(f"[EMAIL ERROR] {e}")


# ── Static Files ──────────────────────────────────────────
# Assuming frontend build is in ../frontend/dist
# On Vercel, static files are served by the platform, so we skip this
if not os.getenv("VERCEL"):
    frontend_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")

    if os.path.exists(frontend_path):
        app.mount("/assets", StaticFiles(directory=os.path.join(frontend_path, "assets")), name="assets")

        @app.get("/{full_path:path}")
        async def serve_react_app(full_path: str):
            # Serve API routes normally, everything else goes to index.html
            if full_path.startswith("api/") or full_path == "contact":
                raise HTTPException(status_code=404)
            
            file_path = os.path.join(frontend_path, full_path)
            if os.path.isfile(file_path):
                return FileResponse(file_path)
            return FileResponse(os.path.join(frontend_path, "index.html"))
    else:
        print(f"Warning: Frontend build not found at {frontend_path}")


# ── Run with: uvicorn main:app --reload ───────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
