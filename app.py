import os
import warnings
import sys
# import tempfile
from flask import Flask, render_template, request, jsonify
import cv2
# from google import genai
import google.generativeai as genai
import PIL.Image
from dotenv import load_dotenv  
from IPython.display import Markdown, clear_output, display, ipd

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


def suppress_httpx_closed_warning():
    warnings.filterwarnings("ignore", message="Exception ignored in.*__del__")
suppress_httpx_closed_warning()

suppress_httpx_closed_warning()
load_dotenv('.env.local')

genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel("gemini-pro-vision")

video_path = input("Please enter video path here")
video = cv2.VideoCapture(video_path)
n_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT)) 

height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)
width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
print(f'Height {height}, Width {width}')
# Get frames per second
fps = cap.get(cv2.CAP_PROP_FPS)
print(f'FPS : {fps:0.2f}')

def extract_key_frames(video_path, frame_interval=30):
    ig, axs = plt.subplots(3, 5, figsize=(30, 20))
    axs = axs.flatten()

    # Extract key frames from video at intervals
    cap = cv2.VideoCapture(video_path)
    frames = []
    frame_count = 0
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
            
        if frame_count % frame_interval == 0:
            # Convert BGR to RGB
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            frames.append(frame_rgb)
            
        frame_count += 1
    
    cap.release()
    return frames

# try:
#     response = client.models.generate_content(
#         model="gemini-2.0-flash", contents="Explain how AI works in a few words"
#     )
#     print(response.text)
# except Exception as e:
#     print(f"An error occurred: {e}")

# prompt = 'Is there a Queen Bee in this image?'
# img = PIL.Image.open('sample_bee/bee_hive2.jpg')

# model = genai.GenerativeModel(model_name='gemini-1.5-flash')  # or gemini-1.5-pro
# response = model.generate_content([prompt, img], stream=True)

# buffer = []
# for chunk in response:
#     for part in chunk.parts:
#         buffer.append(part.text)
#     clear_output()
#     display(Markdown(''.join(buffer)))

# buffer = []
# for chunk in response:
#     for part in chunk.parts:
#         buffer.append(part.text)

#     # Simply print the buffer each time
#     print(''.join(buffer))