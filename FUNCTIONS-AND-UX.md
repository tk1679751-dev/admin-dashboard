# JazzyAdmin — Functions and UI/UX Design

This file describes what the admin dashboard does and how it is designed. The product name in the interface is **JazzyAdmin**. It is a browser-only store admin: HTML, CSS, and JavaScript, with sample data (no live server).

Open `login.html` to sign in, then `index.html` for the dashboard.

**Demo sign-in:** `admin@nexus.com` / `admin123`

---

## 1. What the product is

JazzyAdmin is a SaaS-style admin for a small online store. An administrator can:

- See today’s store numbers, charts, orders, and tasks
- Look up customers, products, and orders
- Add a product (publish or save a draft)
- Read and reply to customer messages
- Review analytics and export reports
- Change account, theme, and notification preferences
- Read FAQ and send a support message

Navigation uses the URL hash (`index.html#orders`). Unrecognized pages open the Dashboard.

---

## 2. UI/UX design

### Layout

The signed-in screen is a fixed left sidebar plus a top header and a scrolling content area.

| Area | What the user sees |
| --- | --- |
| Sidebar | Logo “J”, name JazzyAdmin, grouped links, user name and role at the bottom |
| Header | Menu button (mobile), breadcrumb, global search, theme toggle, notifications, avatar menu |
| Main | One page at a time, with a short fade when switching |

**Sidebar groups**

- **Main:** Dashboard, Analytics, Reports
- **Management:** Customers, Products, Add Product, Orders (badge 47)
- **Communication:** Messages (badge 3)
- **Support:** FAQ, Help Center, Settings

The sidebar can collapse to icons only (72px). On a narrow screen it becomes a drawer with a dim overlay. Collapse state is remembered in the browser.

### Visual style

Light and dark themes. The choice is saved as `dashboard-theme`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| Primary | `#4F46E5` indigo | `#6366F1` | Buttons, active nav, links |
| Secondary | `#7C3AED` violet | `#8B5CF6` | Accents |
| Success | `#10B981` | same | Positive status, up trends |
| Warning | `#F59E0B` | same | Low stock, caution |
| Danger | `#EF4444` | same | Errors, delete, down trends |
| Info | `#3B82F6` | same | Neutral information |
| Page background | white cards on a light page | slate `#0F172A` / cards `#1E293B` | Surfaces |
| Text | `#111827` / muted `#6B7280` | `#F8FAFC` / muted `#94A3B8` | Body copy |

**Shape and motion**

- Font: Inter, then Poppins, then system UI
- Corners: 6px, 10px, 14px, 20px
- Cards use a soft shadow and a 1px border
- Motion: 0.25s ease; page change is a short fade and 8px rise
- Icons: Font Awesome 6
- Charts: Chart.js, colors follow the active theme

### Recurring UI pieces

- **Page header:** title, one-line description, actions on the right
- **Stat card:** icon, label, number, percent change with an up or down arrow
- **Filter bar:** search field plus dropdowns
- **Data table:** avatar or id, status badge, icon actions (view, edit, delete, print)
- **Status badges:** active, inactive, pending, in-stock, low-stock, out-of-stock, delivered, shipped, processing, cancelled
- **Buttons:** primary (filled indigo), outline, ghost, danger; small size in toolbars
- **Modal:** centered card for profiles, edits, and order detail; confirm dialog before delete
- **Toast:** short message at the edge (success, info, warning, error), about 3.5 seconds
- **Empty state:** icon and a short “nothing found” message
- **Pagination:** used on Customers (8 per page) and Products (9 per page)

### UX patterns

- The current page is highlighted in the sidebar and named in the breadcrumb.
- Search and filters update the list in place.
- Destructive actions ask for confirmation.
- Forms show an error under the field that failed.
- Password fields have a show/hide control and a strength bar on register and settings.
- Global search (header) shows a toast with the typed query. It does not open a results page.
- Sign-in is required. Without a saved user, `index.html` sends the person to `login.html`.

---

## 3. Sign-in screen (`login.html`)

Centered card on a full-page background. A moon/sun button in the corner switches theme before login.

**Tabs:** Sign In, Register, Forgot.

| Function | Behavior |
| --- | --- |
| Sign in | Email and password are required. Valid email format. On success, the user is stored in the browser and the dashboard opens. “Remember me” is shown. Demo values are prefilled. |
| Register | Full name, email, password (6+ characters), confirm password, terms checkbox. Password strength bar. On success, account is stored and the dashboard opens. |
| Forgot password | Email field, then a “check your email” success state. No real email is sent. |
| Social buttons | Google and GitHub are visible only. They do not sign the user in. |
| Password visibility | Eye button on password fields. |

---

## 4. Shell functions (every page)

| Function | Behavior |
| --- | --- |
| Theme toggle | Switches light and dark and redraws charts. |
| Notifications | Dropdown of 5 items (order, low stock, payment, review, system). Unread items are marked. “Mark all as read” clears the badge and shows a toast. |
| User menu | Settings, Help Center, Logout. Logout clears the saved user and returns to the sign-in page. |
| Breadcrumb | Home / current page name. |
| Page transition | Content fades out, new page HTML is inserted, content fades in. |

---

## 5. Page functions

### Dashboard (`#dashboard`)

Home view of the store for the signed-in person.

- Greeting by time of day plus first name, and a short “what’s happening today” line
- Banner totals: revenue `$48,352`, orders `1,284`, customers `3,642`
- Five stat cards: revenue, orders, customers, products (`856`), pending orders (`47`), each with a percent change
- **Sales Overview** line chart (this year / last year selector)
- **Revenue Analytics** bar chart (this week / last week selector)
- Recent orders table (5 rows) with a link to all orders
- Top 5 products with rank, image, category, revenue, and units sold
- Activity timeline (new order, restock, payment, low stock, new customer, cancellation)
- Calendar widget
- Task list with priority (high, medium, low) and completed state
- Notes widget
- Weather widget

### Analytics (`#analytics`)

- Summary: total revenue `$128K`, orders `2,847`, customers `3,642`, conversion `4.8%`
- Charts: revenue trend (line), sales by category (bar), category distribution (pie), customer growth
- Revenue report table
- **Export CSV** downloads the analytics numbers

### Reports (`#reports`)

- Period tabs: Daily, Weekly, Monthly, Custom Range (from/to dates and Apply)
- Summary numbers and a chart for the selected period
- Report type cards: Sales, Revenue, Customer, Inventory, Tax, Performance
- **Export PDF** and **Export Excel** download a text report for the active period (the file is generated in the browser, not a real spreadsheet engine)

### Customers (`#customers`)

- Count of matching customers
- Search by name or email
- Filter: All, Active, Inactive, Pending
- Table: avatar, name, email, phone, status, order count, total spent, join date
- Pagination, 8 rows
- **View** opens a profile modal (contact, location, orders, spent)
- **Edit** opens an edit modal
- **Delete** asks for confirmation, then removes the row from the current view
- Add Customer button is shown on the page

### Products (`#products`)

- Search by name or SKU
- Filter by category (Electronics, Fashion, Food, Sports, Home) and stock (in stock, low stock, out of stock)
- Sort: newest, oldest, price low to high, price high to low
- **Grid or table** toggle
- Card or row: image, name, category, price, discount, stock, status, SKU
- Select products and **bulk delete** with confirmation
- Pagination, 9 items
- **Add Product** goes to the add-product page

### Add Product (`#add-product`)

- Fields: name, description, category, SKU, price, discount, stock, tags
- Live price preview after discount
- Image upload by click or drag-and-drop, with previews
- Required: name (at least 3 characters), category, SKU, price
- **Save Draft** stores the form in the browser and restores it on the next visit
- **Publish Product** validates, then shows a success toast

### Orders (`#orders`)

- Search across the row text
- Filter: pending, processing, shipped, delivered, cancelled
- Table: order id, customer, email, item count, total, status, date
- **View** opens order detail (payment, address, status)
- **Print** opens a print view of the invoice
- **Download PDF** downloads an HTML invoice file for that order
- **Export** downloads the current order list

### Messages (`#messages`)

- Conversation list with avatar, preview, time, and unread state
- Thread view of sent and received messages
- Compose box: type and send; the reply appears in the thread
- Sample threads: Sarah Johnson, Michael Chen, Emma Williams, James Rodriguez, Support Team

### FAQ (`#faq`)

Accordion of six answers: add a product, export reports, change password, customize the dashboard, manage order status, contact support.

### Help Center (`#help`)

- Search box for help articles
- Categories: Getting Started, Products & Orders, Account & Billing, Analytics & Reports, Integrations, Troubleshooting
- Popular articles list
- Contact form: subject (general, technical, billing, feature request) and message. Submit shows a toast.
- Support details: `support@nexusadmin.com`, `+1 (555) 123-4567`, Mon–Fri 9AM–6PM EST

### Settings (`#settings`)

Side nav inside the page:

| Section | Functions |
| --- | --- |
| Profile | Avatar initials, change photo button, first name, last name, email, phone, bio. Save checks the email and stores the name. |
| Security | Current password, new password with strength bar, confirm. Update checks that the new passwords match. |
| Email | Toggles: order updates, marketing, weekly digest, security alerts |
| Notifications | Toggles: new orders, low stock, customer messages, system updates, sound |
| Appearance | Dark mode (applies the theme), compact sidebar, animations |
| Language | Language list (English, Spanish, French, German, Japanese, Chinese) and timezone. Save shows a toast. |

---

## 6. Screen map

```
login.html
  Sign In | Register | Forgot password
        |
        v
index.html
  Sidebar + Header
    Dashboard
    Analytics
    Reports
    Customers
    Products --> Add Product
    Orders
    Messages
    FAQ
    Help Center
    Settings
```

---

## 7. Data and limits

All store numbers, people, products, orders, chats, and notifications come from `js/data.js`. Actions such as delete, send message, save profile, and export work in the browser session. They are not sent to a server. Social login and the “reset email” step are interface only.
