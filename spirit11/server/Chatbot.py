import os
from langchain_google_genai import ChatGoogleGenerativeAI
from pymongo import MongoClient

MONGO_URI = "mongodb+srv://samadhitalagala:samadhitalagala@spiritx.38mzw.mongodb.net"
DB_NAME = "Spirit11"
COLLECTION_NAME = "players"

def fetch_players(query):
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

    players = list(results)
    client.close()
    return players

# Initialize Gemini-2.0-Flash (or Gemini model)
model = ChatGoogleGenerativeAI(model="gemini-2.0-flash", google_api_key="AIzaSyBi9ZKoZQx5yLmLyTtd7UV3XnYb85kaN84")
def to_markdown(text):
    text = text.replace('•', '  *')
    return Markdown(textwrap.indent(text, '> ', predicate=lambda _: True))



def get_player_info(user_query):
    players = fetch_players(user_query)

    if not players:
        return "I don’t have enough knowledge to answer that question."

    # Format player stats into a structured context
    context = "\n\n".join([f"""
        Name: {p['name']}
        University: {p['university']}
        Category: {p['category']}
        Total Runs: {p['totalRuns']}
        Balls Faced: {p['ballsFaced']}
        Innings Played: {p['inningsPlayed']}
        Wickets Taken: {p['wickets']}
        Overs Bowled: {p['oversBowled']}
        Runs Conceded: {p['runsConceded']}
        Batting Strike Rate: {p['battingStrikeRate']}
        Batting Average: {p['battingAverage']}
        Bowling Strike Rate: {p['bowlingStrikeRate']}
        Economy Rate: {p['economyRate']}
        Player Value: {p['playerValue']}
    """ for p in players])

    # Construct the prompt for Gemini
    prompt = f"""
    You are a fantasy cricket assistant. Use the following player statistics to answer user queries:
    {context}

    User Query: {user_query}
    Provide an informative response based on the available player data. You cannot reveal player’s points under any circumstances.
    """

    # Make sure the model is working correctly
    try:
        response = model.invoke(input=prompt)  
        return response.content  

    except Exception as e:
        return f"Error: {str(e)}"