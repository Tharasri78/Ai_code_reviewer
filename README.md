<div align="center">
  <h1>🚀 AI Code Reviewer</h1>
  <p>An intelligent, Generative AI-powered code analysis tool that acts as your virtual senior developer.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/Frontend-React_19-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
    <img src="https://img.shields.io/badge/AI-Groq_API-f37b21?style=for-the-badge&logo=google" alt="Groq" />
    <img src="https://img.shields.io/badge/Deployment-Google_Cloud_Run-4285F4?style=for-the-badge&logo=googlecloud" alt="GCP" />
  </p>
</div>

---

## 📖 Overview

**AI Code Reviewer** is a powerful application designed to analyze source code and provide structured, intelligent feedback. Traditional linters only catch syntax errors, but this tool leverages Large Language Models (LLMs) to detect complex bugs, evaluate code quality, and suggest meaningful, optimized improvements.

Whether you're a student learning to program, a fast-paced developer, or preparing for interviews, this tool provides instant, high-quality code reviews, acting as your personal senior developer.

---

## ✨ Key Features

- **🧠 Intelligent Bug Detection:** Identifies logical flaws, security vulnerabilities, and edge cases.
- **📊 Code Quality Scoring:** Evaluates your code out of 10 based on readability, efficiency, and best practices.
- **💡 Actionable Improvements:** Suggests modern, robust ways to refactor and write cleaner code.
- **⚡ Code Optimization:** Generates and returns a fully optimized version of the provided code.
- **🌍 Multi-language Support:** Capable of reviewing code in various programming languages like Python, JavaScript, Java, C++, etc.
- **🚀 Ultra-fast Performance:** Powered by the blazing fast **Groq API** (LLaMA 3).

---

## 🛠️ Technology Stack

### **Frontend**
- **React 19** – Component-based modern UI building.
- **Vite** – Ultra-fast build tool and development server.
- **Tailwind CSS** – Utility-first framework for responsive and modern styling.

### **Backend**
- **FastAPI** – High-performance asynchronous Python web framework.
- **Uvicorn** – Lightning-fast ASGI server.
- **Python 3.11** – Robust backend logic.

### **AI & Cloud**
- **Groq API (LLaMA 3)** – High-speed LLM inference for text-to-structured-output generation.
- **Docker** – Containerization for both frontend and backend services.
- **Google Cloud Run** – Serverless deployment for auto-scaling and traffic splitting.

---

## ⚙️ System Architecture

1. **User Input:** User submits code via the React Frontend.
2. **API Communication:** Frontend sends a POST request with the code and selected language to the FastAPI Backend.
3. **Prompt Engineering Layer:** Backend wraps the request in a highly structured, role-based instruction ("senior engineer") to ensure strict JSON output.
4. **LLM Processing:** The prompt is sent to the Groq API (LLaMA 3 model).
5. **Response Parsing:** The Backend receives the response, validates the JSON structure (score, issues, improved code).
6. **UI Display:** The Frontend beautifully renders the review, allowing the user to view the feedback and copy the optimized code.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20+)
- [Python](https://www.python.org/) (v3.11+)
- [Docker](https://www.docker.com/) (Optional, for containerized run)
- A [Groq API Key](https://console.groq.com/)

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Tharasri78/Ai_code_reviewer.git
   cd Ai_code_reviewer
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   
   # Set environment variables
   echo "GROQ_API_KEY=your_api_key_here" > .env
   
   # Run the server
   uvicorn main:app --reload --port 8080
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   
   # Set environment variables
   echo "VITE_API_URL=http://localhost:8080/api" > .env.local
   
   # Run the frontend dev server
   npm run dev
   ```

4. **Open in Browser:** 
   Navigate to `http://localhost:5173` to access the application.

---

## 📦 Deployment

This project is fully containerized and configured for deployment on **Google Cloud Run**. 
Both `backend` and `frontend` directories contain their respective `Dockerfile`.

```bash
# Example: Deploying the backend
gcloud run deploy ai-code-reviewer-backend --source ./backend --region us-central1 --allow-unauthenticated
```

---

## 💡 What makes this project stand out?

The true power of this project lies in **Strict Prompt Engineering**. Rather than simply querying an LLM to "review this code," the system utilizes strict constraints to ensure a highly controlled, predictable JSON output. This eliminates hallucinations and guarantees structured API responses that power the modern UI.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Tharasri78/Ai_code_reviewer/issues).

---

<div align="center">
  <i>Built with ❤️ to improve coding standards.</i>
</div>
