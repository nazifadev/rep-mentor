# Rep mentor

Exercising with bad form goes unnoticed until it causes injury. Rep mentor uses your webcam to detect body landmarks in real time, calculate joint angles, and deliver live audio and on-screen form feedback with rep counts, all processed locally on your device with no footage ever leaving it.

## Tech Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Computer Vision:** MediaPipe BlazePose (pose_landmarker_full)
- **Auth:** Firebase Authentication (Google OAuth)
- **Database:** Cloud Firestore
- **Deployment:** Vercel

## Features

- Detects 33 body landmarks per frame using MediaPipe BlazePose and calculates joint angles with Math.atan2 trigonometry
- Counts reps via a two-phase state machine with threshold buffering to eliminate false positives
- Delivers 3 types of real-time feedback per rep: voice cues via Web Speech API, on-screen text, and an audio beep via Web Audio API oscillator synthesis
- Gates all feedback behind a per-landmark visibility check so nothing fires until the full body is in frame
- Gives users a 15-second countdown with audio cues before each session starts
- Prevents voice feedback from overlapping by canceling queued utterances and enforcing a 500ms cooldown between cues
- Shows a results screen after each workout with rep count and options to repeat or switch exercises
- Saves workout sessions to Firestore per user via Google OAuth, ordered by date
- Supports guest mode with full feature access and no account required
- Includes a workout history page pulling past sessions from Firestore
- Fully responsive across mobile and desktop

  
## Exercises

| Exercise | Camera Position | Landmarks Tracked |
|----------|----------------|-------------------|
| Squat | Front facing | Hip, Knee, Ankle |
| Push-up | Side facing, floor level | Shoulder, Elbow, Wrist |
| Lunge | Side facing | Hip, Knee, Ankle |
| Sit-up | Side facing, floor level | Shoulder, Hip, Knee |

## Privacy

All pose detection and form analysis runs entirely in the browser via MediaPipe. No video, images, or body landmark data ever leaves your device or is sent to any server. Only rep counts and exercise names are saved to Firestore for signed-in users.

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/nazifadev/rep-mentor.git
```
2. Navigate to the frontend folder
```bash
cd rep-mentor/frontend
```
3. Install dependencies
```bash
npm install
```
4. Create a `.env` file in the frontend folder
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

5. Start the development server
```bash
npm run dev
```

## Status
Live — form coaching and rep counting complete across all four exercises, workout history and Google sign in integrated. Currently exploring a more comprehensive authentication system beyond Google OAuth.

## Live Demo
[repmentor.vercel.app](https://repmentor.vercel.app)
