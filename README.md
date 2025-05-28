# 🎬 AI Short Video Generator

🚀 [Live Demo](https://ai-short-video-gen-pi.vercel.app/)

AI-powered SaaS application to **generate short videos in seconds** using natural language prompts, dynamic image styles, voice-overs, and captions — all with a clean, modern dashboard experience.

---

## 🧠 What is it?

**AI Short Video Generator** is a full-stack application built to showcase how modern AI tools and web technologies can be combined to generate media-rich content programmatically. 

Users can:
- Enter a story type or custom prompt
- Choose an image generation style (Animated, Cartoon, Comic, Realistic, Watercolor)
- Automatically generate a script, visuals, voice-over, and captions
- Download or export the generated short video

This project includes:
- Authenticated user dashboard
- Credit system (free tier: 5 videos / 50 credits)
- Video generation based on category
- Cloud storage and database integration
- Full video rendering pipeline using AI and automation

---

## ✨ Features

- ⚡️ Instant video generation using AI
- 📚 Predefined categories and custom prompt support
- 🎨 Multiple visual styles: Animated, Cartoon, Comic, Realistic, Watercolor
- 🔊 Google TTS voice-over generation
- 📝 Automatic captioning using AssemblyAI
- 🖼️ High-quality images from `sdxl-lightning-4step` (by ByteDance)
- 🎥 Final video generation using [Remotion](https://www.remotion.dev/)
- 📦 File storage on Google Firebase
- 💳 Credit system with free tier
- 🔐 Secure auth with Clerk
- 🧑‍💼 Dashboard to view/download videos

---

## 🛠 Tech Stack

| Layer               | Technology                                           |
|--------------------|------------------------------------------------------|
| **Frontend**        | Next.js, React, TailwindCSS, ShadCN/UI              |
| **Backend**         | Node.js (API routes), Drizzle ORM                   |
| **Database**        | PostgreSQL (via Neon on AWS)                        |
| **Authentication**  | Clerk                                                |
| **AI Services**     | Gemini AI (prompts & scripts), Google TTS, AssemblyAI |
| **Image Gen**       | SDXL-Lightning-4step (Bytedance)                    |
| **Video Gen**       | Remotion                                            |
| **Cloud Storage**   | Firebase Storage                                    |
| **Deployment**      | Vercel                                              |

---

## 🧪 How It Works

1. **Select the Story Type**  
   Choose a predefined story category or input a custom prompt.

2. **Select the Image Style**  
   Choose from 5 styles: Animated, Cartoon, Comic, Realistic, Watercolor.

3. **Generate the Video**  
   - Gemini AI creates script and visual prompts  
   - SDXL Lightning generates images  
   - Google TTS creates voice-over  
   - AssemblyAI generates captions with timestamps  
   - Remotion compiles everything into a downloadable video

---

## 💸 Credits System

- Each user starts with **50 credits**
- **10 credits** required per video generation
- Users can generate up to **5 videos** for free
- (No paid tier implemented yet)

---

## 🧭 Future Roadmap

### 🔐 Monetization

- **Upgrade Page with Subscription Tiers**  
  Unlock more customization, faster generation, or HD exports via tiered plans.

- **Buy Credits Directly**  
  Allow users to purchase additional credits without needing a subscription.

### 💡 Suggested Future Features

- **Video Editor Preview** – Minor editing before final render (drag/drop scenes, trim audio).
- **Script Customization** – Allow users to edit AI-generated scripts.
- **Voice Selection** – Choose from different TTS voices, accents, or languages.
- **Community Gallery** – Share videos with others or mark as private/public.
- **Analytics Dashboard** – Track credit usage, render time, most-used categories.
- **Email Notifications** – Notify users when video is ready or when credits are low.
- **Mobile Optimization** – Improve experience for video generation from mobile devices.
- **Webhook/API Access** – Let other apps trigger video generation via API (B2B).

---

## 📸 Screenshots

---

## 📂 Folder Structure (Simplified)

```bash
/
├── app/            # Next.js app directory (routes, pages, layouts)
├── components/     # Reusable React components (UI elements, forms, etc.)
├── configs/        # Configuration files (Clerk, Firebase, etc.)
├── lib/            # Helper functions and utilities (e.g., AI integration logic)
├── public/         # Static assets (logos, favicons, etc.)
└── remotion/       # Video rendering logic using Remotion
