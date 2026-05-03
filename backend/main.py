from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import ReviewRequest, ReviewResponse
from services import get_code_review

app = FastAPI(title="AI Code Reviewer API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "AI Code Reviewer API is running"}

@app.post("/api/review", response_model=ReviewResponse)
def review_code(request: ReviewRequest):
    try:
        # Dummy high-CPU operation to consume credits as requested
        # Calculate some primes to burn CPU cycles
        primes = []
        for n in range(2, 5000):
            if all(n % i != 0 for i in range(2, int(n**0.5) + 1)):
                primes.append(n)
        
        review_data = get_code_review(request.code, request.language)
        return ReviewResponse(**review_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
