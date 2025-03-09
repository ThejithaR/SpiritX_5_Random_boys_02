from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from langchain_google_genai import ChatGoogleGenerativeAI

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# MongoDB Configuration
MONGO_URI = "mongodb+srv://samadhitalagala:samadhitalagala@spiritx.38mzw.mongodb.net"
DB_NAME = "Spirit11"
COLLECTION_NAME = "players"

# Initialize Gemini-2.0-Flash model
GEMINI_API_KEY = "AIzaSyBi9ZKoZQx5yLmLyTtd7UV3XnYb85kaN84"
model = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key=GEMINI_API_KEY)


def fetch_players(query):
    """Fetch player details from MongoDB matching the user query."""
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    results = collection.find(
        {
            "$or": [
                {"name": {"$regex": query, "$options": "i"}},
                {"university": {"$regex": query, "$options": "i"}},
                {"category": {"$regex": query, "$options": "i"}}
            ]
        }
    ).limit(5)

    # Convert to list and remove MongoDB '_id' field to avoid JSON serialization issues
    players = []
    for p in results:
        p.pop("_id", None)  # Remove '_id' if present
        players.append(p)

    client.close()
    return players


def get_player_info(user_query):
    """Retrieve player data and use Gemini to generate a response."""
    players = fetch_players(user_query)

    if not players:
        return "I don’t have enough knowledge to answer that question."

    # Format player stats into structured context
    context = "\n\n".join([
        f"""
        Name: {p.get('name', 'N/A')}
        University: {p.get('university', 'N/A')}
        Category: {p.get('category', 'N/A')}
        Total Runs: {p.get('totalRuns', 'N/A')}
        Balls Faced: {p.get('ballsFaced', 'N/A')}
        Innings Played: {p.get('inningsPlayed', 'N/A')}
        Wickets Taken: {p.get('wickets', 'N/A')}
        Overs Bowled: {p.get('oversBowled', 'N/A')}
        Runs Conceded: {p.get('runsConceded', 'N/A')}
        Batting Strike Rate: {p.get('battingStrikeRate', 'N/A')}
        Batting Average: {p.get('battingAverage', 'N/A')}
        Bowling Strike Rate: {p.get('bowlingStrikeRate', 'N/A')}
        Economy Rate: {p.get('economyRate', 'N/A')}
        Player Value: {p.get('playerValue', 'N/A')}
        """
        for p in players
    ])

    # Construct the prompt for Gemini
    prompt = f"""
    You are a fantasy cricket assistant. Use the following player statistics to answer user queries:
    {context}

    User Query: {user_query}
    Provide an informative response based on the available player data. You cannot reveal player’s points under any circumstances.
    """

    try:
        response = model.invoke(prompt)
        return response.content if response else "I couldn't process that request."
    except Exception as e:
        return f"Error: {str(e)}"


@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    """API endpoint for chatbot queries."""
    data = request.get_json()
    user_query = data.get('query')

    if not user_query:
        return jsonify({"error": "No query provided"}), 400

    response = get_player_info(user_query)
    return jsonify({"response": response})


if __name__ == '__main__':
    app.run(debug=True, port=5000)
