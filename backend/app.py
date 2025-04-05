import os
import tempfile
from flask import Flask, render_template, request, jsonify
import cv2
import google.generativeai as genai
import PIL.Image
from dotenv import load_dotenv  
# from google import genai

import requests

url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=GEMINI_API_KEY"
headers = {"Content-Type": "application/json"}
data = {
    "contents": [{
        "parts": [{"text": "Explain how AI works"}]
    }]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())

# client = genai.Client(api_key="wildbees")

# response = client.models.generate_content(
#     model="gemini-2.0-flash", contents="Explain how AI works in a few words"
# )
# print(response.text)
