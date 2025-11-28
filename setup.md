# Smart Helmet Accident Detection System - Setup Guide

This guide explains how to set up and run the Smart Helmet Accident Detection System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js**: Version 18 or higher is recommended. [Download Node.js](https://nodejs.org/)
- **npm**: Included with Node.js.

## Installation

1.  **Navigate to the project directory**:
    Open your terminal or command prompt and move to the project folder:
    ```bash
    cd c:\Users\victo\.gemini\antigravity\playground\tachyon-oort
    ```

2.  **Install Dependencies**:
    Run the following command to install all necessary libraries (React, Vite, etc.):
    ```bash
    npm install
    ```

## Running the Application

1.  **Start the Development Server**:
    To run the app locally, use:
    ```bash
    npm run dev
    ```

2.  **Open in Browser**:
    Once the server starts, you will see a URL in the terminal (usually `http://localhost:5173`).
    Open this URL in your web browser (Chrome is recommended).

## How to Use the System

### 1. Dashboard Overview
- **Sensor Monitor**: Shows real-time simulated data from the helmet (Accelerometer, Gyroscope).
- **Live Location**: Displays the current location on a Google Map.
- **Alert System**: Shows the current status (NORMAL, WARNING, CRITICAL).

### 2. Simulating an Accident
- Click the **"⚠️ Simulate Crash"** button in the top right.
- The system status will change to **CRITICAL**.
- **Auto-Open WhatsApp**: If enabled (checked by default), the system will attempt to open WhatsApp Web tabs for your emergency contacts.
    - **Important**: You must **allow popups** for `localhost` in your browser settings.
    - You must manually click **"Send"** in the opened WhatsApp tabs.
- **SMS Simulation**: You will see logs of simulated SMS messages being sent every 5 seconds.

### 3. Real Geolocation
- The system uses your browser's **Geolocation API** to get your real position.
- When asked, click **"Allow"** to grant location permission.
- If permission is denied, it may fall back to a mock location or show an error.

### 4. Managing Contacts
- Scroll down to the **"Emergency Contacts"** section.
- You can **Add** new contacts (Indian mobile numbers only) or **Remove** existing ones.

## Troubleshooting

- **"WhatsApp tabs are not opening"**:
    - Check your browser's address bar for a "Popup blocked" icon. Click it and select "Always allow popups...".
- **"Map is not showing my location"**:
    - Ensure you have granted location permissions to the browser.
    - Check if your device's GPS is enabled.
- **"App is not starting"**:
    - Make sure you ran `npm install` first.
    - Check the terminal for any error messages.

## Build for Production (Optional)
To create an optimized build for deployment:
```bash
npm run build
```
The output will be in the `dist` folder.
