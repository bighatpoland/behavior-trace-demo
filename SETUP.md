# 🚀 Quick Setup Guide

## Prerequisites

Before you begin, make sure you have Node.js installed:
```bash
node --version  # Should be 18 or higher
```

If you don't have Node.js, install it from: https://nodejs.org/

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

This will install:
- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)

### 2. Run Development Server
```bash
npm run dev
```

Open your browser to: **http://localhost:3000**

### 3. Test on Mobile

#### Option A: Local Network Testing
1. Find your computer's local IP (e.g., 192.168.1.x)
2. Run: `npm run dev`
3. On your phone, visit: `http://YOUR_IP:3000`

#### Option B: Deploy to Vercel (Recommended for Mobile Testing)
```bash
npm install -g vercel
vercel
```
Follow the prompts, and you'll get a live URL to test on your phone!

## 📱 Install as Mobile App

Once deployed or running locally on your phone:

### iOS (iPhone/iPad)
1. Open the app in Safari
2. Tap the **Share** button (box with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"**

### Android
1. Open the app in Chrome
2. Tap the **menu** (three dots)
3. Tap **"Install App"** or **"Add to Home Screen"**
4. Tap **"Install"**

## 🎯 Using the App

1. **Log a Purchase**: Fill out the form with:
   - What you bought
   - How much you spent
   - When you bought it
   - What triggered the purchase (Boredom, Stress, etc.)

2. **Track Your Behavior**: The dashboard will show:
   - Total impulse spending
   - Your top emotional trigger
   - Spending breakdown by trigger
   - Individual purchase traces

3. **Data Persistence**: Everything is saved locally in your browser. No account needed!

## 🛠️ Building for Production

```bash
npm run build
npm start
```

## 🌐 Deploying to Production

### Vercel (Easiest)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
1. Push your code to GitHub
2. Connect your repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts` and `app/globals.css` to customize the color scheme.

### Add More Triggers
Edit `types/index.ts` to add new trigger types, then update the form dropdown.

### Modify Layout
The main page is in `app/page.tsx`. Components are in the `components/` folder.

## 🐛 Troubleshooting

### Port 3000 already in use?
```bash
npm run dev -- -p 3001
```

### Build errors?
```bash
rm -rf node_modules .next
npm install
npm run dev
```

### Data not persisting?
- Check if your browser allows LocalStorage
- Try in a non-incognito window

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript](https://www.typescriptlang.org/docs)

---

**Need help?** Check the README.md for more details or open an issue on GitHub!
