from pydantic import BaseModel
from typing import List, Union

class ReviewRequest(BaseModel):
    code: str
    language: str

class Issue(BaseModel):
    line: Union[str, int]
    description: str

class ReviewResponse(BaseModel):
    score: int
    issues: List[Issue]
    bugs: List[Issue]
    improvements: List[str]
    optimized_code: str
