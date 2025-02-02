# Document Q&A Bot

A web application that allows users to upload documents (PDFs and text files) and ask questions based on the content of those documents. The application uses an AI model to provide answers to the questions.

## Table of Contents

- [Features](#features)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Upload PDF and text files.
- Ask questions based on the uploaded document's content.
- Get AI-generated answers to the questions.

## Directory Structure
priyanshu6091-document_qna/
├── backend/
│   ├── index.js
│   └── package.json
└── frontend/
├── eslint.config.js
├── index.html
├── package.json
├── vite.config.js
├── public/
└── src/
├── App.css
├── App.jsx
├── index.css
├── main.jsx
└── assets/

## Getting Started
![image](https://github.com/user-attachments/assets/2c6fff33-0401-4406-8625-b3a65bac4f35)

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or remote instance)
- An API key from Together AI (https://together.xyz/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/priyanshu6091-document_qna.git
   cd priyanshu6091-document_qna
2. Install dependencies for both the backend and frontend:
   ```bash
    cd backend
    npm install

    # Frontend
   ```bash
    cd ../frontend
    npm install
3. Set up environment variables:
Create a .env file in the backend directory and add the following:
   ```bash
    MONGO_URI=mongodb://localhost:27017/docQA
    API_KEY=your-together-ai-api-key
4. Start the backend server:
   ```bash
    cd backend
    npm start
5. Start the frontend development server:
   ```bash
    cd ../frontend
    npm run dev

### Usage
Open your browser and navigate to http://localhost:5173.
Click on the "Choose File" button to select a PDF or text file.
Click the "Upload" button to upload the file.
Once the file is uploaded, enter a question in the input field.
Click the "Ask" button to get an answer based on the document's content.
### Contributing
Contributions are welcome! Please follow these steps:
Fork the repository.
Create a new branch: git checkout -b feature/your-feature-name.
Make your changes and commit them: git commit -m "Add your feature".
Push to the branch: git push origin feature/your-feature-name.
Open a pull request.
### License
This project is licensed under the ISC License - see the LICENSE file for details.
