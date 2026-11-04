
from flask import Flask, render_template, jsonify, request, session, redirect
import os
import random

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "change-this-secret-key")

QUESTION_FILE = "questions.txt"


def load_questions():
    """Load questions from the external TXT file."""
    questions = []

    if not os.path.exists(QUESTION_FILE):
        return questions

    with open(QUESTION_FILE, "r", encoding="utf-8") as file:
        for line in file:
            line = line.strip()

            if not line or line.startswith("#"):
                continue

            if "|" not in line:
                continue

            category, question = line.split("|", 1)

            questions.append({
                "category": category.strip().lower(),
                "question": question.strip()
            })

    return questions

@app.route("/")
def index():
    return redirect("https://bigboysautomation.com", code=302)


#### date conversation starter
@app.route("/date")
def index_date():
    return render_template("index.html")


@app.route("/date/api/question", methods=["GET"])
def get_question():
    category = request.args.get("category", "all").lower()

    questions = load_questions()

    if category not in ["all", "casual", "christian"]:
        return jsonify({"error": "Invalid category"}), 400

    # Filter questions
    if category == "all":
        filtered = questions
    else:
        filtered = [
            q for q in questions
            if q["category"] == category
        ]

    if not filtered:
        return jsonify({"error": "No questions available"}), 404

    # Track previously asked questions in the user's session
    asked = session.get("asked", {})
    used = asked.get(category, [])

    # Identify questions that haven't been used
    available = [
        q for q in filtered
        if questions.index(q) not in used
    ]

    # Reset when all questions have been used
    if not available:
        used = []
        available = filtered

    selected = random.choice(available)
    selected_index = questions.index(selected)

    used.append(selected_index)
    asked[category] = used
    session["asked"] = asked

    return jsonify({
        "question": selected["question"],
        "category": selected["category"].title(),
        "remaining": len(filtered) - len(used),
        "total": len(filtered)
    })


@app.route("/date/api/stats")
def stats():
    questions = load_questions()

    return jsonify({
        "total": len(questions),
        "casual": sum(
            1 for q in questions if q["category"] == "casual"
        ),
        "christian": sum(
            1 for q in questions if q["category"] == "christian"
        )
    })


@app.route("/date/api/reset", methods=["POST"])
def reset_questions():
    session.pop("asked", None)

    return jsonify({
        "success": True,
        "message": "Question history reset."
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
