import os
import json
import re
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
client = Groq(api_key=GROQ_API_KEY) if GROQ_API_KEY else None

def get_code_review(code: str, language: str) -> dict:
    if not client:
        raise ValueError("GROQ_API_KEY is not set. Please add it to your .env file.")

    prompt = f"""You are a senior software engineer conducting a code review.
Please analyze the following {language} code.

Code:
```
{code}
```

You must return ONLY a JSON object with the following structure, with no extra text or markdown formatting:
{{
  "score": "An integer score from 0 to 10 representing code quality",
  "issues": [
    {{ "line": "Line number or snippet", "description": "Description of the issue" }}
  ],
  "bugs": [
    {{ "line": "Line number or snippet", "description": "Description of the bug" }}
  ],
  "improvements": [
    "Suggestion 1",
    "Suggestion 2"
  ],
  "optimized_code": "The fully optimized and refactored code"
}}
"""

    response = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama-3.3-70b-versatile", # Using LLaMA 3 as requested in theory
        temperature=0.2, # Low temperature for more deterministic output
        response_format={"type": "json_object"},
    )

    result_text = response.choices[0].message.content
    
    match = re.search(r'\{.*\}', result_text, re.DOTALL)
    if not match:
        raise ValueError(f"LLM did not return any JSON object: {result_text}")
        
    try:
        data = json.loads(match.group())
        
        # Robust score parsing (handles "2/10" or "85/100" strings)
        if isinstance(data.get("score"), str):
            if "/" in data["score"]:
                try:
                    # Take the numerator (e.g., "2" from "2/10")
                    data["score"] = int(float(data["score"].split("/")[0]))
                except (ValueError, IndexError):
                    pass
            else:
                try:
                    data["score"] = int(float(data["score"]))
                except ValueError:
                    pass
        
        return data
    except json.JSONDecodeError:
        raise ValueError(f"LLM returned invalid JSON inside braces: {result_text}")
