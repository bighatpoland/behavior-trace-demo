# 🧠 Impulse Buy Budget Tracer

A mobile-first Progressive Web App (PWA) that helps you understand the psychology behind your spending habits.

## 🎯 What Makes This Different?

This isn't just another expense tracker. It's a **behavior tracer** that connects your spending to your emotional state.

### Key Features

- **📝 Purchase Logger**: Track what you bought, when, and how much
- **🎭 Behavior Triggers**: Log the emotional trigger behind each purchase
  - Boredom
  - Stress
  - Social Media
  - Hunger
  - Late Night Scrolling
  - Peer Pressure
- **📊 Behavior Trace Dashboard**: 
  - Total impulse spend tracking
  - Top emotional trigger identification
  - Visual breakdown of spending by trigger
  - Trace connections like: "You spent $50 because of 'Boredom'"
- **💾 Local Storage**: Your data never leaves your device
- **📱 Mobile-First**: Designed for mobile use with PWA support

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📱 Install on Mobile

1. Open the app in your mobile browser
2. On iOS: Tap the Share button → "Add to Home Screen"
3. On Android: Tap the menu → "Install App" or "Add to Home Screen"

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Storage**: LocalStorage (client-side only)

## 🎨 Design Philosophy

The app uses warm, human colors (amber and rose) to make budget tracking feel less clinical and more emotionally aware. The UI is card-based for easy mobile interaction.

## 📂 Project Structure

```
behavior-trace-demo/
├── app/
│   ├── layout.tsx         # Root layout with PWA metadata
│   ├── page.tsx           # Main page with state management
│   └── globals.css        # Global styles
├── components/
│   ├── PurchaseForm.tsx   # Form to log purchases
│   └── Dashboard.tsx      # Behavior trace dashboard
├── lib/
│   ├── localStorage.ts    # LocalStorage utilities
│   └── utils.ts           # Helper functions
├── types/
│   └── index.ts           # TypeScript type definitions
└── public/
    └── manifest.json      # PWA manifest
```

## 🔒 Privacy

All your data is stored locally in your browser using LocalStorage. Nothing is sent to any server. Your spending habits are yours alone.

## �� License

MIT

---

Built with ❤️ to help you understand your spending behavior
