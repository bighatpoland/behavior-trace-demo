# 🧠 Impulse Buy Budget Tracer

> **Copyright © 2025 Konstancja Tanjga (Big Hat Poland)**  
> All rights reserved.

<div align="center">

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)

**Track not just your spending, but the psychology behind it.**

[✨ Features](#-features) • [🚀 Getting Started](#-getting-started) • [📱 Mobile App](#-install-as-mobile-app) • [🛠️ Tech Stack](#️-tech-stack)

</div>

---

## 🎯 What Makes This Different?

This isn't just another expense tracker. **Impulse Buy Budget Tracer** is a behavior analysis tool that helps you understand the *emotional patterns* behind your spending habits.

### The Problem
You know you're spending money impulsively, but you don't know *why*. Was it stress? Boredom? Late-night scrolling through social media?

### The Solution
Every time you log a purchase, you also log:
- **The Trigger**: What emotional state led to this purchase?
- **Your Rating**: How much do you actually like what you bought?
- **Product Details**: Including optional barcode scanning for quick entry

Then watch as patterns emerge:
> *"You've spent $347 on 'Dining Out' — 68% of it triggered by 'Stress' on Friday nights."*

---

## ✨ Features

### 📝 Intelligent Purchase Logging
- **Item Name & Price**: Track what you bought and how much
- **Date Selection**: When did this happen?
- **Emotional Trigger Tracking**: Choose from 6 common impulse triggers:
  - 🥱 Boredom
  - 😰 Stress
  - 📱 Social Media
  - 🍕 Hunger
  - 🌙 Late Night Scrolling
  - 👥 Peer Pressure

### ⭐ Product Rating System
- Rate each purchase from 1-5 stars
- Discover if your impulse buys are actually things you like
- Visual star interface with hover effects
- See your ratings in the purchase history

### 📷 Barcode Scanner
- **Camera-based scanning** using your device's camera
- Automatically detects and reads product barcodes
- Manual barcode entry option
- Works on both mobile and desktop
- Support for all major barcode formats (UPC, EAN, Code128, etc.)

### �� Behavior Trace Dashboard

#### Summary Cards
- **Total Impulse Spend**: See your total spending at a glance
- **Top Emotional Trigger**: Identify your #1 spending trigger
- **Purchase Count**: Track how many impulse buys you've made

#### Behavior Trace List
Each purchase shows:
- Item name and price
- Emotional trigger
- Star rating (how much you liked it)
- Barcode (if scanned)
- Purchase date
- Insightful trace: *"You spent $X because of 'Trigger'"*
- Delete option for each entry

#### Spending Breakdown
- Visual breakdown of spending by trigger
- Percentage and dollar amount per trigger
- Gradient progress bars
- Sorted by highest spending first

### 💾 Data Privacy & Persistence
- **100% Local Storage**: All data stays on your device
- **No Server, No Tracking**: Your spending habits are yours alone
- **Persistent Data**: Survives browser refresh and relaunch
- **No Account Required**: Start using immediately

### 📱 Progressive Web App (PWA)
- **Install as Mobile App**: Add to your home screen
- **Offline Capable**: Works without internet
- **Native App Feel**: Smooth, responsive interface
- **Camera Access**: Use your phone's camera for barcode scanning

---

## 🚀 Getting Started

### Prerequisites

Before you begin, make sure you have:
- **Node.js** 18+ ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js)

Check your versions:
```bash
node --version  # Should be 18 or higher
npm --version   # Should be 9 or higher
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/bighatpoland/behavior-trace-demo.git
cd behavior-trace-demo
```

2. **Install dependencies**
```bash
npm install
```

This installs:
- Next.js 15
- React 18
- TypeScript 5
- Tailwind CSS 3
- Lucide React (icons)
- react-webcam (camera access)
- @zxing/library (barcode scanning)

3. **Run the development server**
```bash
npm run dev
```

4. **Open in your browser**
```
http://localhost:3000
```

You should see the Impulse Buy Budget Tracer interface!

---

## 📱 Install as Mobile App

The app is designed as a Progressive Web App (PWA) that can be installed on your phone like a native app.

### iOS (iPhone/iPad)

1. Open the app in **Safari** (not Chrome)
2. Tap the **Share** button (box with arrow pointing up)
3. Scroll down and tap **"Add to Home Screen"**
4. Choose a name (or keep "Budget Tracer")
5. Tap **"Add"**

The app icon will appear on your home screen!

### Android

1. Open the app in **Chrome**
2. Tap the **menu** (three vertical dots)
3. Tap **"Install App"** or **"Add to Home Screen"**
4. Tap **"Install"**

### Desktop (Chrome/Edge)

1. Look for the install icon in the address bar (⊕ or computer icon)
2. Click **"Install"**
3. The app opens in its own window!

---

## 🎯 How to Use

### 1. Log Your First Purchase

Click the **"Log a Purchase"** form and fill in:

- **What did you buy?**: e.g., "Coffee", "New Shoes", "Takeout"
- **How much?**: Enter the price in USD
- **When?**: Select the purchase date
- **What triggered this?**: Choose from the dropdown:
  - Boredom
  - Stress
  - Social Media
  - Hunger
  - Late Night Scrolling
  - Peer Pressure
- **Barcode** (optional): 
  - Click "Scan" to use your camera
  - Or type the barcode manually
- **Rating**: Click stars to rate 1-5 (how much you like the product)

Click **"Track This Purchase"** to save!

### 2. Scan a Barcode

1. Click the **"Scan"** button next to the barcode field
2. Allow camera access when prompted
3. Point your camera at the product barcode
4. The barcode will be automatically detected and filled in
5. Continue filling out the rest of the form

### 3. View Your Behavior Patterns

The dashboard shows:

- **Total Spend**: Your cumulative impulse spending
- **Top Trigger**: The emotional state that costs you the most
- **Purchase History**: Each item with its trigger, rating, and trace
- **Spending Breakdown**: Visual chart of spending by trigger

### 4. Analyze Your Behavior

Look for patterns:
- Do you spend more when stressed?
- Are your "Boredom" purchases items you actually like (check the ratings)?
- What percentage of your spending is due to social media?

### 5. Take Action

Use the insights to:
- Avoid shopping when you notice a trigger
- Find healthier coping mechanisms
- Make more conscious purchase decisions

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Beautiful icon library |
| **react-webcam** | Camera access for barcode scanning |
| **@zxing/library** | Barcode detection and reading |
| **LocalStorage API** | Client-side data persistence |

### Project Architecture

```
behavior-trace-demo/
├── app/
│   ├── layout.tsx           # Root layout with PWA metadata
│   ├── page.tsx             # Main page with state management
│   └── globals.css          # Global Tailwind styles
├── components/
│   ├── PurchaseForm.tsx     # Purchase logging form
│   ├── Dashboard.tsx        # Behavior trace dashboard
│   ├── BarcodeScanner.tsx   # Camera-based barcode scanner
│   └── StarRating.tsx       # 5-star rating component
├── lib/
│   ├── localStorage.ts      # LocalStorage utilities
│   └── utils.ts             # Helper functions (stats, formatting)
├── types/
│   └── index.ts             # TypeScript type definitions
├── public/
│   └── manifest.json        # PWA manifest
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind configuration
└── next.config.ts           # Next.js configuration
```

---

## 🎨 Design Philosophy

### Color Scheme
- **Warm Amber (#f59e0b)**: Energy, attention, warmth
- **Soft Rose (#fb7185)**: Emotion, humanity, empathy
- **Clean Grays**: Professional, readable

The warm colors create a human-centric feel — this is about your emotional well-being, not just numbers.

### Mobile-First
- Responsive grid layouts
- Touch-friendly buttons and inputs
- Large tap targets (minimum 44×44px)
- PWA capabilities for native app feel

### Accessibility
- Semantic HTML
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to deploy to production

Your app will be live at: `https://your-project.vercel.app`

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repo to [Netlify](https://netlify.com)
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

### Manual Build

```bash
npm run build
npm start
```

Runs on `http://localhost:3000`

---

## 🔧 Development

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Adding New Triggers

1. Edit `types/index.ts`:
```typescript
export type TriggerType =
  | "Boredom"
  | "Stress"
  | "Your New Trigger" // Add here
  | ...
```

2. Update the triggers array in `components/PurchaseForm.tsx`

3. Update the initial state in `lib/utils.ts`

### Customizing Colors

Edit `tailwind.config.ts` and `app/globals.css` to change the color scheme.

---

## 📊 Data Format

Purchases are stored in LocalStorage as JSON:

```json
{
  "id": "1704123456789",
  "itemName": "Coffee",
  "price": 5.50,
  "date": "2025-12-27",
  "trigger": "Stress",
  "rating": 4,
  "barcode": "012345678901",
  "createdAt": 1704123456789
}
```

### Exporting Data

Want to export your data? Open the browser console and run:

```javascript
JSON.parse(localStorage.getItem('impulse-purchases'))
```

Copy the output to save your data.

---

## 🐛 Troubleshooting

### Camera not working?
- Make sure you've granted camera permissions
- Use HTTPS or localhost (cameras require secure context)
- On iOS, use Safari (Chrome doesn't support camera on iOS)

### Data not persisting?
- Check if LocalStorage is enabled in your browser
- Try a non-incognito/private window
- Clear browser cache and try again

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Build errors after pulling?
```bash
rm -rf node_modules .next package-lock.json
npm install
npm run dev
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Copyright © 2025 Konstancja Tanjga (Big Hat Poland)

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Barcode scanning powered by [ZXing](https://github.com/zxing-js/library)
- Camera access via [react-webcam](https://www.npmjs.com/package/react-webcam)
- Built with [Next.js](https://nextjs.org/)

---

## 📮 Contact

**Author**: Konstancja Tanjga (Big Hat Poland)  
**Repository**: [github.com/bighatpoland/behavior-trace-demo](https://github.com/bighatpoland/behavior-trace-demo)

---

<div align="center">

**Built with ❤️ to help you understand your spending behavior**

⭐ Star this repo if you find it helpful!

</div>
