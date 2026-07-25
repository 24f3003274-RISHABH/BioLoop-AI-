# 🌿 BioLoop AI (Syngenta Biologicals & ANNAM.AI X IIT ROPAR)

> **Integrated Causal Yield & CropFit Platform** — Powered by Causal Machine Learning, Gemini 2.5 Flash Multilingual Reasoning, and Real-Time Agricultural Telemetry.

[![GitHub Repo](https://img.shields.io/badge/GitHub-BioLoop--AI---181717?style=for-the-badge&logo=github)](https://github.com/24f3003274-RISHABH/BioLoop-AI-.git)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Google_Gemini-2.5_Flash-8E44AD?style=for-the-badge&logo=google)](https://ai.google.dev/)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Project Screenshots](#-project-screenshots)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Prerequisites](#-prerequisites)
- [Quick Start Guide](#-quick-start-guide)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Configure Environment Variables](#3-configure-environment-variables)
  - [4. Start the Development Server](#4-start-the-development-server)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌾 Overview

**BioLoop AI** is a next-generation precision agriculture and biostimulant optimization platform designed in collaboration with **Syngenta Biologicals** and **ANNAM.AI**. 

It empowers smallholder farmers, agronomists, and supply chain partners with:
- **Causal Inference Engine**: Isolate true yield lifts from soil, weather, and biostimulant application using Double Machine Learning (DML) and Synthetic Control Methods.
- **CropFit Precision Diagnostics**: AI-driven crop health diagnostic tool powered by Google Gemini 2.5 Flash for real-time localized advice in regional languages (Hindi, Marathi, Punjabi, Gujarati, etc.).
- **ROBI (Return On Biological Investment) Calculator**: Financial quantification of net profitability per hectare/acre.
- **Digital Field Journal**: Offline-first voice & text field logging system with automated harvest matching.

---

## ✨ Key Features

- 🎯 **Causal Yield Uplift Analysis**: Distinguish true biological product impact from climate noise.
- 💬 **CropFit Multilingual AI Assistant**: Gemini-powered voice/text assistant supporting voice input, image analysis, and local agricultural domain knowledge.
- 📊 **Real-Time Telemetry Dashboard**: Interactive soil moisture, temperature, NDVI, and weather risk visualizations via Recharts.
- 💵 **ROBI Financial Tracker**: Live calculation of net financial returns considering product cost and crop yield lift.
- 📱 **Mobile-Responsive & Accessible UI**: Designed with clean contrast, responsive touch targets, and offline fallback states.

---

## 🖼️ Project Screenshots

<div align="center">

### 1. Executive Intelligence Dashboard
![Dashboard Preview](https://raw.githubusercontent.com/24f3003274-RISHABH/BioLoop-AI-/main/public/preview-dashboard.png)
*Real-time causal yield lifts, field logs, ROBI metrics, and weather alerts.*

### 2. CropFit AI Multilingual Assistant
![CropFit Assistant](https://raw.githubusercontent.com/24f3003274-RISHABH/BioLoop-AI-/main/public/preview-cropfit.png)
*Interactive multi-lingual voice & image diagnostic engine for crop health.*

### 3. Causal Inference & ROBI Analytics
![Causal Analytics](https://raw.githubusercontent.com/24f3003274-RISHABH/BioLoop-AI-/main/public/preview-causal.png)
*Counterfactual yield modeling comparing treated vs. untreated control fields.*

</div>

*(Note: If screenshots are not rendering, make sure you have pushed preview images to your repository's `/public/` directory).*

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Motion (Framer Motion)
- **Data Visualization**: Recharts, Lucide React Icons
- **AI & Reasoning**: Google Gen AI SDK (`@google/genai` with Gemini 2.5 Flash)
- **Backend Infrastructure**: Express, Node.js, Vite Dev Server Middleware

---

## 📐 System Architecture

```
                                 ┌───────────────────────────────┐
                                 │     User Interface (React)    │
                                 │  Dashboard, CropFit, Journal │
                                 └──────────────┬────────────────┘
                                                │
                                  ┌─────────────▼──────────────┐
                                  │   Express API Middleware   │
                                  └─────────────┬──────────────┘
                                                │
                 ┌──────────────────────────────┼──────────────────────────────┐
                 │                              │                              │
    ┌────────────▼────────────┐    ┌────────────▼────────────┐    ┌────────────▼────────────┐
    │  Causal Engine (DML)    │    │ Gemini 2.5 Flash SDK    │    │ Weather & Telemetry Hub │
    │ Yield Lift & Counterfact│    │ Multilingual Crop Diagnostics│    │ Soil Moisture & Risk    │
    └─────────────────────────┘    └─────────────────────────┘    └─────────────────────────┘
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js**: `v18.0.0` or higher (recommended: `v20.x`) — [Download Node.js](https://nodejs.org/)
- **npm**: `v9.0.0` or higher (comes bundled with Node.js)
- **Git**: [Download Git](https://git-scm.com/)
- **Google Gemini API Key**: Free key from [Google AI Studio](https://aistudio.google.com/)

---

## 🚀 Quick Start Guide

Follow these simple step-by-step instructions to get **BioLoop AI** running locally on your computer.

### 1. Clone the Repository

Open your terminal or command prompt and run:

```bash
git clone https://github.com/24f3003274-RISHABH/BioLoop-AI-.git
cd BioLoop-AI-
```

### 2. Install Dependencies

Install all required npm packages:

```bash
npm install
```

### 3. Configure Environment Variables

Create a local `.env` file by copying the sample configuration:

```bash
cp .env.example .env
```

Open `.env` in your code editor (e.g., VS Code) and add your Gemini API Key:

```env
GEMINI_API_KEY="your_actual_gemini_api_key_here"
APP_URL="http://localhost:3000"
```

> 💡 **Tip**: Get a free API key in seconds from [Google AI Studio](https://aistudio.google.com/).

### 4. Start the Development Server

Launch the local development server:

```bash
npm run dev
```

Once the server starts, open your browser and navigate to:
```
http://localhost:3000
```

---

## 📂 Project Structure

```
BioLoop-AI-/
├── public/                 # Static assets & screenshots
├── src/
│   ├── components/         # React Components
│   │   ├── DashboardScreen.tsx
│   │   ├── CropFitAssistant.tsx
│   │   ├── FieldJournalScreen.tsx
│   │   └── CausalAnalyticsScreen.tsx
│   ├── data/               # Mock datasets & causal models
│   ├── types.ts            # TypeScript interfaces & types
│   ├── App.tsx             # Main App layout & state routing
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global Tailwind CSS styles
├── .env.example            # Environment variables blueprint
├── metadata.json           # Application metadata
├── package.json            # Project dependencies & scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build settings
└── README.md               # Project documentation
```

---

## ⚙️ Available Scripts

In the project directory, you can run:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs the app in development mode on `http://localhost:3000` |
| `npm run build` | Builds the app for production to the `dist` folder |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript compiler type checking without emitting files |
| `npm run clean` | Cleans build artifacts (`dist/`) |

---

## 🤝 Contributing

Contributions are warmly welcome! If you want to improve BioLoop AI:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
Developed with 💚 for <b>Syngenta Biologicals & ANNAM.AI Hackathon 2026</b>.
</div>
