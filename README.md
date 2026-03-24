# SuppTrackr

SuppTrackr is a modern, responsive web application built with Next.js, Tailwind CSS, and Firebase. It helps users track their supplement intake, generate schedules, and manage their health routines.

## Features

- **User Authentication:** Secure login using Firebase Authentication (Google, Microsoft, X).
- **Supplement Tracking:** Log daily supplement intake with dosages and timing.
- **Responsive Design:** Optimized for both mobile and desktop experiences using Tailwind CSS.
- **Real-time Data:** Powered by Firestore for real-time synchronization across devices.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, Framer Motion
- **Backend/Database:** Firebase (Auth, Firestore, Storage)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Firebase project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/supptrackr.git
   cd supptrackr
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env.local` and fill in your Firebase configuration.
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is optimized for deployment on Vercel or Firebase App Hosting.

## License

This project is licensed under the MIT License.
