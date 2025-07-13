import random
import gradio as gr
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import openai
import os
from PIL import Image
import requests
from io import BytesIO
from langchain.agents import initialize_agent, AgentExecutor, AgentType
from langchain.tools import Tool
from langchain.memory import ConversationBufferMemory
from langchain.prompts import MessagesPlaceholder
from langchain.schema import SystemMessage
from langchain.chat_models import ChatOpenAI 
# ------------------------------
# Spotify Authentication Section --
# ------------------------------
CLIENT_ID = "feaf3cae48c94061bfc4b8ecddfece71"
CLIENT_SECRET = "9a00118920414f63bb3f9b4e6aa0ffec"
REDIRECT_URI = "https://my-portfolio-hwmt.vercel.app"
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=CLIENT_ID,
    client_secret=CLIENT_SECRET,
    redirect_uri=REDIRECT_URI,
    scope="user-read-playback-state user-modify-playback-state"
))
devices = sp.devices()
device_id = devices['devices'][0]['id'] if devices['devices'] else None
if not device_id:
    print("❌ No active device found! Please play a song on Spotify to set an active device.")
def play_track_by_name(track_name, artist_name=None):
    query = f"track:{track_name}"
    if artist_name:
        query += f" artist:{artist_name}"
    
    results = sp.search(q=query, type='track', limit=5) 

    if not results['tracks']['items']:
        return f"❌ Track '{track_name}' not found on Spotify.", None 
    for track in results['tracks']['items']:
        if track['name'].lower() == track_name.lower():
            track_uri = track['uri']
            track_name = track['name']
            artist_name = track['artists'][0]['name']
            album_cover = track['album']['images'][0]['url']
            break
    else:
        track = results['tracks']['items'][0]
        track_uri = track['uri']
        track_name = track['name']
        artist_name = track['artists'][0]['name']
        album_cover = track['album']['images'][0]['url']

    try:
        sp.start_playback(device_id=device_id, uris=[track_uri])
        return f"♫ Now playing {track_name} by {artist_name} ♫", album_cover
    except spotipy.exceptions.SpotifyException as e:
        return f"❌ An error occurred with Spotify: {e}. \n\n**Make sure Spotify is active.**", None
    except Exception as e:
        return f"❌ Unexpected error: {e}.", None

# ------------------------------
#  Gemini 2.0 Model Section ---
# ------------------------------
llm=ChatOpenAI(
    model="google/gemini-2.0-flash-001", 
    openai_api_key="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",
    openai_api_base="https://openrouter.ai/api/v1",
    streaming=True, 
)

system_message = SystemMessage(content="You are Chatify, an AI assistant that can play music and chat.")
MEMORY_KEY = "chat_history"
prompt = MessagesPlaceholder(variable_name=MEMORY_KEY)

memory = ConversationBufferMemory(memory_key=MEMORY_KEY, return_messages=True)

# ------------------------------
#  Playing Tracks Section ---
# ------------------------------
def search_and_play_track(query: str) -> str:
    return play_track_by_name(query)

play_tool = Tool.from_function(
    func=search_and_play_track,
    name="Play Spotify Track",
    description="Plays a song on Spotify given a track name."
)
tools = [play_tool]
# ------------------------------
# Initialize Agent
# ------------------------------
agent = initialize_agent(
    tools=tools,
    agent_type=AgentType.OPENAI_FUNCTIONS,
    llm=llm,
    memory=memory,
    verbose=True
)
# ------------------------------
# Chat Function with Gradio
# ------------------------------
mood_songs = {
    "chill": ["-play Tum Mile", "-play Night Changes", "-play Ocean Eyes"],
    "beach": ["-play Suraj Hua Maddham", "-play Senorita", "-play Summer of 69"],
    "happy": ["-play Gallan Goodiyan", "-play Phir Se Ud Chala", "-play Stayin' Alive"],
    "sad": ["-play Agar Tum Saath Ho", "-play Channa Mereya", "-play Someone Like You"]
}

def get_songs_by_mood(user_message):
    for mood, songs in mood_songs.items():
        if mood in user_message.lower():
            return random.choice(songs) 
    return None  

def respond(user_message, chat_history):
    try:
        print(f"📝 User Message: {user_message}")
        album_cover = None 
        mood_song = get_songs_by_mood(user_message)
        if mood_song:
            bot_message, album_cover = play_track_by_name(mood_song.replace("-play ", ""))
        elif user_message.strip().startswith("-play"):
            parts = user_message.split(" ", 1)
            if len(parts) > 1:
                track_name = parts[1]
                bot_message, album_cover = play_track_by_name(track_name)
            else:
                bot_message = "Please provide a track name. Example: `-play Shape of You`"
        else:
            print("⏳ Running agent_executor...")
            response = agent.invoke({"input": user_message})
            if isinstance(response, dict) and "output" in response:
                bot_message = response["output"]
            else:
                bot_message = str(response)
            print(f"✅ GPT Response: {bot_message}")
        chat_history.append((user_message, bot_message))
        print(f"✅ Response: {bot_message}")
        return "", chat_history, album_cover 
    except Exception as e:
        print(f"❌ ERROR: {e}")
        bot_message = "Error: Unable to connect to Spotify. Check your API credentials and active device."
        chat_history.append((user_message, bot_message))
        return "", chat_history, None
# ------------------------------
# Gradio App Setup Section
# ------------------------------
def resize_album_cover(url):
    if url:
        response = requests.get(url)
        if response.status_code == 200:
            img = Image.open(BytesIO(response.content))
            img = img.resize((200, 100))
            return img
    return None
# ------------------------------
# Gradio App Setup2 Secion
# ------------------------------
with gr.Blocks(css="""
    body {
        background-color: black !important;
        color: #b39ddb;
        font-family: 'Arial', sans-serif;
    }
    .gradio-container {
        background: #000;
        border-radius: 10px;
        padding: 20px;
    }
    .gradio-chat {
        background-color: rgba(50, 50, 50, 0.8) !important;
        border-radius: 8px;
        color: #b39ddb;
    }
    .gradio-markdown {
        color: #b39ddb !important;
        text-align: center;
        font-size: 20px;
    }
    .gradio-button {
        background: linear-gradient(45deg, #8e24aa, #d500f9) !important;
        border: none;
        color: white;
    }
    .gradio-input {
        border: 2px solid #8e24aa !important;
        color: white;
    }
""") as app:
    gr.Markdown("# 🎧 **Chatify - AI Powered Spotify Player** 🎵")
    with gr.Row():
        album_cover = gr.Image(label="Now Playing", show_label=False, type="pil", height=150)  

    chatbot = gr.Chatbot(
        bubble_full_width=False, 
        label="🎤 Chatify AI",
        height=460,
    )
    msg = gr.Textbox(
        placeholder="🔊 Enter '-play' followed by a song name (e.g., -play Blinding Lights)", 
        container=False
    )
    msg.submit(respond, inputs=[msg, chatbot], outputs=[msg, chatbot, album_cover])
    gr.Examples([
        "-play Shape of You",
        "-play Blinding Lights",
        "-play Heat Waves"
    ], inputs=[msg], label="🔥 Quick Start")
app.launch()