\# 🛠️ JazzyAdmin

**JazzyAdmin** is a modern, SaaS-style admin dashboard for small online stores. It's fully browser-based — built with plain HTML, CSS, and vanilla JavaScript (ES modules) — so you can run it instantly without any build step or backend. Sample data is included, and charts are rendered with Chart.js.

Sign in from `login.html`, then open `index.html` to access the dashboard.

## ✨ Features

### 🔐 Authentication
- Sign In / Register / Forgot Password screens
- Password visibility toggle + strength meter (register & security settings)
- Demo credentials included

### 🏠 Dashboard (`#dashboard`)
- Greeting + daily summary
- Store stat cards: revenue, orders, customers, products, pending orders (with % change)
- Sales Overview line chart & Revenue bar chart (this year / last year, this week / last week)
- Recent orders, Top 5 products, Activity timeline, Calendar, Tasks, Notes, Weather

### 📊 Analytics (`#analytics`)
- Revenue summary, charts (revenue trend, sales by category, category distribution, customer growth)
- Revenue report table + **Export CSV**

### 📑 Reports (`#reports`)
- Periods: Daily, Weekly, Monthly, Custom Range
- Report types: Sales, Revenue, Customer, Inventory, Tax, Performance
- **Export PDF** / **Export Excel** (generated in browser)

### 👥 Customers (`#customers`)
- Search, filter (All / Active / Inactive / Pending), table, pagination (8/page)
- View / Edit / Delete customer (with confirm dialog), Add Customer

### 📦 Products (`#products`) & ➕ Add Product (`#add-product`)
- Search, filter by category & stock, sort, grid/table toggle, bulk delete
- Add Product: fields, live price preview, image upload (click/drag-drop), Save Draft / Publish

### 🧾 Orders (`#orders`)
- Search, status filter, table, detail modal, Print invoice, Download PDF invoice, Export list

### 💬 Messages (`#messages`)
- Conversation list + thread view, send messages (sample threads)

### ❓ FAQ, Help Center & ⚙️ Settings
- FAQ accordion, Help Center (articles, contact form, support info)
- Settings: Profile, Security, Email, Notifications, Appearance, Language

## 🔑 Demo Access

| Field | Value |
| --- | --- |
| Email | `admin@nexus.com` |
| Password | `admin123` |

## 🧰 Tech Stack

- **HTML5** + **CSS3** (custom design system, CSS custom properties for theming)
- **Vanilla JavaScript** (ES modules, no framework)
- **Chart.js** (theme-aware charts)
- **Font Awesome 6** (icons)
- Fonts: Inter, Poppins, system UI
- Browser storage for theme, user session, saved drafts

## 🚀 Getting Started

No build step required — just open it in a browser.

1. Open `login.html`
2. Sign in with the demo credentials (or register a new account)
3. Land on `index.html` — navigate via hash routes, e.g. `index.html#orders`

### Scripts

Since there's no bundler, there are no npm scripts. Serve the folder with any static server if you prefer:

```bash
# optional: serve locally
npx serve .
