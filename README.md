# AI Course Assistant

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)
![AI](https://img.shields.io/badge/AI-LLM%20Powered-purple)

![Status](https://img.shields.io/badge/status-in%20development-yellow)

A full-stack AI-powered study assistant that helps students understand and review course materials using AI. Users can upload lecture slides, notes, and past exams, then generate summaries, flashcards, quizzes, and ask questions about the content.

## Features

- Upload lecture slides and course documents
- AI-generated summarized notes
- Flashcards for active recall
- Practice quizzes generated from course materials
- Chatbot for asking questions about uploaded documents
- Course-based workspaces to organize study materials

## Tech Stack

### Frontend
- Next.js
- TypeScript
- Tailwind CSS

### Backend
- Next.js API routes

### Database
- PostgreSQL
- pgvector (for semantic search)

### AI
-  OpenAI (text-embedding-3-small for embeddings, GPT-4o-mini for chat)
-  LangChain for PDF loading and text splitting  

## Project Status

### In development

### Current progress:                                                                             
  - Course navigation UI with sidebar and course list
  - Individual course with feature pages (summaries, flashcards, quiz, chatbot)             
  - File upload system with document management (upload + delete)                    
  - Document-based chatbot with RAG                                                 
  - Persistent course management (create, delete) backed by PostgreSQL
    
### Planned features:

- Summarized notes
- Quiz and flashcard generation

