# Nexletter — AI‑Powered Personalized Newsletter

Nexletter is a full‑stack, automated AI newsletter system built with **Supabase**, **Inngest**, and **Next.js**.  
Users choose their preferred news categories and how often they want to receive AI‑generated summaries.  
The system then automatically fetches articles, analyzes them using an open AI model, and sends a personalized newsletter straight to their inbox every morning at **9:00 AM**.

---

## 🚀 Tech Stack

- Supabase (database + auth)
- Supabase Auth for secure email/password login
- React Context for lightweight global state management
- NewsAPI for fetching articles
- Inngest for background jobs, workflows, and scheduling
- Xiaomi / Mimo‑v2‑Flash model for AI article analysis (free)
- EmailJS for sending emails
- shadcn/ui for clean, accessible UI components
- React Hook Form + Zod for form validation
- Lucide Icons for modern iconography

---

## 📬 How It Works

Once a user logs in, they configure their **newsletter preferences**:

- Pick news **categories**
- Choose **frequency** of the AI‑generated newsletter

From there, an **Inngest workflow** takes over — a multi‑step background function that handles the entire lifecycle of generating and delivering the newsletter.

---

## ⚙️ Inngest Workflow

Each newsletter cycle consists of four steps:

### 1. Fetch Articles

Inngest calls the NewsAPI to retrieve the latest articles matching the user’s selected categories.

### 2. AI Processing

The Xiaomi/Mimo‑v2‑Flash model analyzes the articles and:

- cleans up the content
- summarizes key points
- adds a friendly, personal tone
- formats everything into a consistent newsletter template

### 3. Send Email

The final newsletter is delivered using **EmailJS**, styled and formatted for readability.

### 4. Schedule the Next Run

Based on the user’s chosen frequency, Inngest schedules the next newsletter to be sent at **9:00 AM**.

---

## 🖥️ Dashboard Features

Users can manage their preferences at any time:

- Change categories
- Update frequency
- Pause or resume the newsletter
- Pausing removes the next scheduled job
- Resuming queues a new one instantly

Everything updates in real time and syncs with Supabase.

---

## 🎨 UI & UX

The interface is clean, responsive, and mobile‑friendly:

- Built with shadcn/ui
- Smooth form handling via React Hook Form + Zod
- Icons powered by Lucide
- Thoughtful layout and spacing for a premium feel

---

## 📦 Project Highlights

- Fully automated newsletter system
- Zero‑maintenance scheduling via Inngest
- Free AI model that performs surprisingly well
- Secure auth and user data storage
- Modern, polished UI
- Clear separation of concerns and scalable architecture
