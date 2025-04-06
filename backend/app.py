import os
import warnings
from skimage.metrics import structural_similarity as ssim
import tempfile
from flask import Flask, render_template, request, jsonify
import cv2
import google.generativeai as genai
import PIL.Image
from dotenv import load_dotenv  
from IPython.display import Markdown, clear_output, display
from tqdm import tqdm
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type
import requests
from flask_cors import CORS
CORS(app)

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def suppress_httpx_closed_warning():
    warnings.filterwarnings("ignore", message="Exception ignored in.*__del__")
suppress_httpx_closed_warning()

suppress_httpx_closed_warning()
load_dotenv('.env.local')

genai.configure(api_key=os.getenv("API_KEY"))
model = genai.GenerativeModel(model_name = "gemini-1.5-flash")

def extract_key_frames(video_path, frame_interval=30, n_frames=1):
    # Extract key frames from video at intervals
    cap = cv2.VideoCapture(video_path)
    frames = {}
    frame_count = 0

    for frame in range(n_frames):
        ret, img = cap.read()
        if not ret:
            break
        if frame == 1500:
            break
        if frame % frame_interval == 0:
            frame_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            frames[frame_count] = [img, frame_rgb]
        frame_count += 1
    cap.release()
    return frames

output_directory = "selected_frames"
selected_frames = []
previous_frame = None
threshold = 0.5

def extract_noteworthy_frames(video_path, input_frames, output_directory, threshold=0.5):
    os.makedirs(output_directory, exist_ok=True)
    noteworthy_frames = []
    video = cv2.VideoCapture(video_path)

    if not video.isOpened():
        print(f"Error: Could not open video file {video_path}")
        return noteworthy_frames

    previous_frame = None

    for frame_idx, (img, _) in tqdm(input_frames.items(), desc="Processing Frames"):
        # Re-seek to the frame index
        video.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, img = video.read() # read the frame again, to guarantee that it is the correct frame.

        if not ret:
            print(f"Error: Could not read frame {frame_idx}")
            continue

        b, g, r = cv2.split(img)

        if previous_frame is not None:
            ssim_b, _ = ssim(previous_frame[0], b, full=True)
            ssim_g, _ = ssim(previous_frame[1], g, full=True)
            ssim_r, _ = ssim(previous_frame[2], r, full=True)

            similarity_index = (ssim_b + ssim_g + ssim_r) / 3

            if similarity_index < threshold:
                noteworthy_frames.append(img)
                frame_filename = os.path.join(output_directory, f"frame_{frame_idx:04d}.png")
                cv2.imwrite(frame_filename, img)

        previous_frame = cv2.split(img)

    video.release()
    return noteworthy_frames

def analyze_bee_agitation(frames):
    """Analyze frames for bee agitation using Gemini"""
    results = []
    prompt = """
    Analyze this image of bees and determine their agitation level. Consider these factors:
    1. Number of bees in flight vs on surfaces
    2. Wing positions and movement patterns
    3. Clustering behavior
    4. Visible defensive postures
    
    Provide your assessment on a scale from 1 (calm) to 5 (highly agitated).
    Include specific visual evidence supporting your rating.
    """
    if frames == []:
        return 0

    for i, frame in enumerate(frames):
        try:
            # Convert frame to bytes for Gemini
            _, buffer = cv2.imencode('.jpg', cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))
            image_bytes = buffer.tobytes()
            
            # Create Gemini content
            image_part = {
                "mime_type": "image/jpeg",
                "data": image_bytes
            }
            
            @retry(
                stop=stop_after_attempt(5),  # Limit retries
                wait=wait_exponential(multiplier=1, max=10),  # Exponential backoff
                retry=retry_if_exception_type((requests.exceptions.RequestException))
            )
            def make_request():
                return model.generate_content([prompt, image_part])
            
            response = make_request()
            results.append({
                "frame_number": i,
                "analysis": response.text,
                "image": frame
            })
        except Exception as e:
            print(f"Error analyzing frame {i}: {str(e)}")
            continue
    
    return results

def generate_summary_report(analyses):
    """Generate a comprehensive summary of all analyses"""
    summary_prompt = f"""
    You are an expert apiarist analyzing bee behavior across multiple frames.
    Here are individual frame analyses:
    {analyses}
    
    Compile a comprehensive report with:
    1. Overall agitation trend
    2. Key moments of behavior change
    3. Potential triggers for agitation
    4. Recommendations for beekeeper intervention
    """
    response = model.generate_content(summary_prompt)
    return response.text

def main(video_path):
    video = cv2.VideoCapture(video_path)
    n_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT)) 
    print(f"Total frames: {n_frames}")
    height = video.get(cv2.CAP_PROP_FRAME_HEIGHT)
    width = video.get(cv2.CAP_PROP_FRAME_WIDTH)
    print(f'Height {height}, Width {width}')
    # Get frames per second
    fps = round(video.get(cv2.CAP_PROP_FPS))
    print(f'FPS : {fps:0.2f}')

    per_sec = extract_key_frames(video_path, fps, n_frames)
    print("There are", len(per_sec), "frames selected so far.")

    noteworthy_frames = extract_noteworthy_frames(video_path, per_sec, output_directory, threshold)
    print(f'Total noteworthy frames based on the threshold chosen : {len(noteworthy_frames)}')

    print("Analyzing bee behavior...")
    analyses = analyze_bee_agitation(noteworthy_frames)
    
    if analyses != 0:
        print("Generating summary report...")
        report = generate_summary_report(analyses)
    
        print("\n=== BEE AGITATION ANALYSIS REPORT ===")
        print(report)
    else:
        print("No noteworthy frames chosen.")

if __name__ == "__main__":
    video_path = input("Enter path to your bee video file: ")
    if not os.path.exists(video_path):
        print("Error: File not found")
    else:
        main(video_path)