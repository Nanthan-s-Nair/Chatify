import spotipy
from spotipy.oauth2 import SpotifyOAuth

# Replace with your Spotify app credentials
CLIENT_ID = "feaf3cae48c94061bfc4b8ecddfece71"
CLIENT_SECRET = "9a00118920414f63bb3f9b4e6aa0ffec"
REDIRECT_URI = "http://localhost:8888/callback"  # Must match the one set in your Spotify app

# Scope for controlling playback
SCOPE = "user-read-playback-state user-modify-playback-state"

# Authenticate with Spotify
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=CLIENT_ID,
                                               client_secret=CLIENT_SECRET,
                                               redirect_uri=REDIRECT_URI,
                                               scope=SCOPE))

# Get available devices
devices = sp.devices()
print("Available Devices:", devices)

# Check if any device is active
if not devices['devices']:
    print("No active devices found. Please play something on Spotify first.")
else:
    device_id = devices['devices'][0]['id']  # Select the first available device
    print(f"Using Device: {devices['devices'][0]['name']} (ID: {device_id})")

    # Play a test song
    song_uri = "spotify:track:4uLU6hMCjMI75M1A2tKUQC"  # Example: Rick Astley - Never Gonna Give You Up
    sp.start_playback(device_id=device_id, uris=[song_uri])
    print("✅ Playing song on your active Spotify device!")