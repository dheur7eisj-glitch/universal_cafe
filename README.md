# ☕ Universal Cafe — Website

A premium, fully responsive website for **Universal Cafe**, located near Evergreen Stand, Shiv Mandir Road, Jharoda Kalan, Delhi – 110072.

---

## 📁 Folder Structure

```
universal-cafe/
├── index.html          ← Main HTML file
├── css/
│   └── style.css       ← All styles (variables, layout, responsive)
├── js/
│   └── main.js         ← Interactivity (menu tabs, carousel, animations)
├── images/             ← (Optional) Place local images here
└── README.md           ← This file
```

---

## 🚀 Deploy to GitHub Pages

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) → click **"New Repository"**
2. Name it `universal-cafe` (or anything you prefer)
3. Set it to **Public**
4. Click **"Create Repository"**

### Step 2 — Upload Your Files

**Option A — Using GitHub Website (Easiest)**
1. Open your repo → click **"Add file"** → **"Upload files"**
2. Drag and drop the entire `universal-cafe/` folder contents
3. Click **"Commit changes"**

**Option B — Using Git CLI**
```bash
cd universal-cafe
git init
git add .
git commit -m "Initial commit: Universal Cafe website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/universal-cafe.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → click **Settings**
2. Scroll to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Set **Branch** to `main` and folder to `/ (root)`
5. Click **Save**

### Step 4 — Access Your Live Website

Your site will be live at:
```
https://YOUR_USERNAME.github.io/universal-cafe/
```

It may take **2–5 minutes** to go live after enabling GitHub Pages.

---

## ✏️ Customisation Guide

| What to Change | Where |
|---|---|
| Phone number | `index.html` (search: `+91 98765 43210`) |
| Address | `index.html` — Contact section + Schema |
| Opening hours | `index.html` — Footer + Contact section |
| Menu prices | `index.html` — `#menu` section |
| Cafe name / logo | `index.html` — `.nav-brand` and footer |
| Colours | `css/style.css` — `:root` CSS variables |
| Hero image | Replace `hero-img` `src` URL in `index.html` |
| Google Maps embed | Replace `<iframe src="...">` in Contact section |

---

## 🎨 Design System

- **Heading Font:** Playfair Display (Google Fonts)
- **Body Font:** Jost (Google Fonts)
- **Primary Colour:** `#C97B2B` (warm chai amber)
- **Dark Colour:** `#2C1810` (espresso brown)
- **Background:** `#FDF6EC` (warm cream)

---

## 📱 Responsiveness

Tested and optimised for:
- ✅ Desktop (1200px+)
- ✅ Laptop (1024px)
- ✅ Tablet (768px)
- ✅ Mobile (480px, 375px)

---

## 🔧 Tech Stack

- **HTML5** — Semantic markup with Schema.org structured data
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — No frameworks, fast & lightweight
- **Google Fonts** — Playfair Display + Jost
- **Font Awesome 6** — Icons
- **Unsplash** — Royalty-free placeholder images

---

## 📞 Cafe Contact

**Universal Cafe**  
Near Evergreen Stand, Shiv Mandir Road  
Jharoda Kalan, Delhi – 110072  
📞 +91 98765 43210  

---

*Built with ❤️ for the Universal Cafe community.*
