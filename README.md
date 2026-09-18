# 🚀 TechTactix 2026

![TechTactix Banner](https://img.shields.io/badge/Event-TECHTACTIX%202026-06b6d4?style=for-the-badge&logo=next.js&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)

A premium, modern, and highly interactive event registration platform built for **TechTactix 2026** — the ultimate technical competition organized by the CSI Student Chapter at St. Peter's Engineering College.

*"Think Smart. Pitch Strong. Defend Better."*

---

## ✨ Features

- 🌌 **Premium UI/UX:** Stunning futuristic design featuring glassmorphism, dynamic glowing gradients, and responsive layouts.
- 📝 **Multi-Step Registration Flow:** Seamless 3-step form to build a team of two participants with intuitive step-by-step validation.
- ⚡ **Real-Time Validation:** Built with React Hook Form and Zod for robust client-side error handling without page reloads.
- 💸 **Dynamic Fee Calculation:** Automatically calculates registration fees based on CSI membership status (CSI Members are free, Non-CSI are ₹30).
- 📧 **Automated Confirmations:** Fully integrated Nodemailer SMTP functionality that instantly sends beautifully formatted HTML confirmation emails to registered participants.
- 🛡️ **Admin Dashboard:** A built-in protected dashboard (`/dashboard`) summarizing total revenue, registrations, and participant data in a sleek data table.
- 🔒 **Data Security:** Locally managed JSON persistent storage to ensure all student data remains fully owned and controlled by the event organizers.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS (Custom extended design system)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Validation:** Zod & React Hook Form
- **Mailing:** Nodemailer (SMTP Integration)

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/vinaybethala/TECHTACTIX.git
cd TECHTACTIX
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory and add your SMTP credentials for the automated emails:
```env
GMAIL_USER="your-email@college.edu"
GMAIL_APP_PASSWORD="your-16-digit-app-password"
```

### 4. Start the Development Server
```bash
npm run dev
```

The website will be live at [http://localhost:3000](http://localhost:3000).

## 📊 Accessing the Admin Dashboard

To view the live list of registrations and financial metrics, simply navigate to:
`http://localhost:3000/dashboard`

---
*Built with precision and aesthetics.*
