
# ♡ DateTalk – Conversation Starter Randomizer

**DateTalk** is a romantic and interactive web application built with Python Flask. It helps couples, dating partners, and people getting to know each other start meaningful conversations through randomly generated questions.

Whether you want a casual conversation, a romantic discussion, or a deeper conversation about Christian faith and relationships, DateTalk provides questions to make every date more engaging.

---

## ✨ Features

### 1. Random Question Generator
- Generates random conversation starter questions.
- Displays one question at a time.
- Prevents question repetition until the selected question pool is exhausted.
- Automatically starts a new round when all questions have been used.

### 2. Conversation Categories

**Casual Dating**
- Getting-to-know-you questions
- Funny and entertaining questions
- Personal interests and hobbies
- Romantic questions
- Dreams, goals, and experiences
- Relationship expectations

**Christian Dating**
- Faith and spiritual growth
- Bible verses and biblical principles
- Prayer and devotion
- Christian courtship
- Relationship boundaries
- Marriage and family
- Growing together in Christ

### 3. Question Navigation
- Next Question
- Previous Question
- Reset Question Pool
- Question progress indicator

### 4. Modern Romantic Interface
- Elegant blush, rose, and cream color palette.
- Romantic typography.
- Responsive mobile-friendly layout.
- Animated question transitions.
- Clean and minimal interface.

### 5. External Question Database
- Questions are stored in `questions.txt`.
- Add new questions without modifying Python code.
- Separate questions by category.

---

## 📁 Project Structure

```text
DateTalk/
│
├── app.py
├── questions.txt
├── requirements.txt
├── README.md
│
├── templates/
│   └── index.html
│
└── static/
    ├── css/
    │   └── style.css
    │
    └── js/
        └── script.js
```

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Flask | Web application framework |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| JavaScript | Randomizer and interactions |
| TXT | External question storage |

---

## 🚀 Installation

### Prerequisites

Make sure you have installed:

- Python 3.9 or newer
- pip (Python package manager)
- A web browser

### Step 1. Clone or Download the Project

Download the project files and navigate to the project directory.

```bash
cd DateTalk
```

### Step 2. Create a Virtual Environment

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**macOS / Linux:**

```bash
source venv/bin/activate
```

### Step 3. Install Dependencies

```bash
pip install -r requirements.txt
```

Alternatively:

```bash
pip install flask
```

### Step 4. Configure the Secret Key

Set a secure Flask session secret.

**Windows PowerShell:**

```powershell
$env:SECRET_KEY="your-secure-secret-key"
```

**macOS / Linux:**

```bash
export SECRET_KEY="your-secure-secret-key"
```

### Step 5. Run the Application

```bash
python app.py
```

### Step 6. Open the Application

Visit the following address in your browser:

```text
http://127.0.0.1:5000
```

To access the application from another device connected to the same network:

```text
http://YOUR_LOCAL_IP:5000
```

---

## 📝 Managing Questions

All conversation starters are stored in:

```text
questions.txt
```

### Question Format

Each question follows this format:

```text
category|question
```

### Available Categories

| Category | Description |
|---|---|
| `casual` | Casual, fun, romantic, and personal questions |
| `christian` | Faith-based and Christian relationship questions |

### Example

```text
# CASUAL QUESTIONS

casual|What is your idea of a perfect date?
casual|What makes you smile even on a bad day?
casual|What is your dream travel destination?

# CHRISTIAN QUESTIONS

christian|What does a Christ-centered relationship mean to you?
christian|What Bible verse inspires you the most?
christian|How can couples grow together spiritually?
```

### Adding New Questions

1. Open `questions.txt`.
2. Add a new line.
3. Specify the category.
4. Separate the category and question using `|`.
5. Save the file.

Example:

```text
casual|What is one thing you would love to experience with me?
christian|How important is praying together in a relationship?
```

The application automatically loads the updated questions when a new question is requested.

---

## 🔌 API Endpoints

DateTalk provides simple Flask API endpoints.

### 1. Get Random Question

**Endpoint:**

```http
GET /api/question
```

**Parameters:**

| Parameter | Values |
|---|---|
| category | all |
| category | casual |
| category | christian |

**Example:**

```http
GET /api/question?category=christian
```

**Sample JSON Response:**

```json
{
    "question": "What does a Christ-centered relationship look like to you?",
    "category": "Christian",
    "remaining": 59,
    "total": 60
}
```

### 2. Get Question Statistics

**Endpoint:**

```http
GET /api/stats
```

**Sample Response:**

```json
{
    "total": 120,
    "casual": 60,
    "christian": 60
}
```

### 3. Reset Question Pool

**Endpoint:**

```http
POST /api/reset
```

**Sample Response:**

```json
{
    "success": true,
    "message": "Question pool reset."
}
```

---

## 🎨 User Interface

The application uses a modern romantic design with:

- Blush and rose color combinations.
- Elegant typography using Playfair Display.
- Clean layouts and rounded cards.
- Responsive mobile and desktop views.
- Interactive buttons and progress indicators.

The interface is designed to create a warm and comfortable atmosphere for meaningful conversations.

---

## 🔄 Application Workflow

1. Open the DateTalk application.
2. Select a conversation category.
3. The application randomly selects a question.
4. Read the question together.
5. Discuss your answers.
6. Click **Another Question** to continue.
7. Use **Previous** to revisit the previous question.
8. Reset the question pool when you want a fresh round.

---

## ⚙️ Configuration

The application runs by default on:

```text
Host: 0.0.0.0
Port: 5000
```

You can change the port using an environment variable:

```bash
export PORT=8000
python app.py
```

For development debugging:

```bash
export FLASK_DEBUG=1
python app.py
```

**Important:** Do not enable Flask debug mode in production. Use a strong secret key and a production WSGI server when deploying publicly.

---

## 💡 Future Enhancements

Potential features for future versions:

- [ ] Romantic Mode – Flirty and sweet conversation starters.
- [ ] Deep Talk Mode – Personal, emotional, and meaningful questions.
- [ ] Date Night Mode – Guided conversation stages.
- [ ] Spin the Wheel – Visual question randomizer.
- [ ] Favorites – Save favorite questions.
- [ ] Bible Challenge – Bible trivia and scripture questions.
- [ ] Marriage Preparation – Questions about compatibility and future family life.
- [ ] Custom Categories – Create and manage question categories.
- [ ] Admin Dashboard – Manage questions through a web interface.
- [ ] SQLite Database – Store questions and favorites persistently.

---

## ❤️ Purpose

DateTalk was created to encourage people to communicate more meaningfully.

Sometimes, the best conversations begin with a simple question.

**Ask. Listen. Understand. Connect.**

*Make every moment count.*

---

## 📄 License

This project is intended for personal, educational, and non-commercial use. You may modify and extend the source code according to your needs.
