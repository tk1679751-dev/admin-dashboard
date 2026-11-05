/**
 * Mock data store for the admin dashboard
 */

export const stats = {
  revenue: { value: '$48,352', change: 12.5, up: true },
  orders: { value: '1,284', change: 8.2, up: true },
  customers: { value: '3,642', change: 5.1, up: true },
  products: { value: '856', change: 2.3, up: true },
  pending: { value: '47', change: 3.2, up: false },
};

export const customers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1 555-0101', status: 'active', orders: 24, spent: '$4,280', joined: '2024-03-15', avatar: 'SJ', location: 'New York, USA' },
  { id: 2, name: 'Michael Chen', email: 'mchen@email.com', phone: '+1 555-0102', status: 'active', orders: 18, spent: '$3,150', joined: '2024-05-22', avatar: 'MC', location: 'San Francisco, USA' },
  { id: 3, name: 'Emma Williams', email: 'emma.w@email.com', phone: '+1 555-0103', status: 'inactive', orders: 5, spent: '$890', joined: '2024-01-08', avatar: 'EW', location: 'Chicago, USA' },
  { id: 4, name: 'James Rodriguez', email: 'j.rodriguez@email.com', phone: '+1 555-0104', status: 'active', orders: 32, spent: '$6,720', joined: '2023-11-30', avatar: 'JR', location: 'Miami, USA' },
  { id: 5, name: 'Olivia Brown', email: 'olivia.b@email.com', phone: '+1 555-0105', status: 'pending', orders: 2, spent: '$340', joined: '2025-01-10', avatar: 'OB', location: 'Seattle, USA' },
  { id: 6, name: 'David Kim', email: 'dkim@email.com', phone: '+1 555-0106', status: 'active', orders: 15, spent: '$2,890', joined: '2024-07-18', avatar: 'DK', location: 'Austin, USA' },
  { id: 7, name: 'Sophia Martinez', email: 's.martinez@email.com', phone: '+1 555-0107', status: 'active', orders: 28, spent: '$5,430', joined: '2024-02-14', avatar: 'SM', location: 'Denver, USA' },
  { id: 8, name: 'Liam Anderson', email: 'liam.a@email.com', phone: '+1 555-0108', status: 'inactive', orders: 8, spent: '$1,120', joined: '2023-09-05', avatar: 'LA', location: 'Portland, USA' },
  { id: 9, name: 'Ava Thompson', email: 'ava.t@email.com', phone: '+1 555-0109', status: 'active', orders: 21, spent: '$3,980', joined: '2024-06-01', avatar: 'AT', location: 'Boston, USA' },
  { id: 10, name: 'Noah Garcia', email: 'noah.g@email.com', phone: '+1 555-0110', status: 'pending', orders: 1, spent: '$150', joined: '2025-02-01', avatar: 'NG', location: 'Phoenix, USA' },
  { id: 11, name: 'Isabella Lee', email: 'isabella.l@email.com', phone: '+1 555-0111', status: 'active', orders: 19, spent: '$3,560', joined: '2024-04-20', avatar: 'IL', location: 'Los Angeles, USA' },
  { id: 12, name: 'Ethan Wilson', email: 'ethan.w@email.com', phone: '+1 555-0112', status: 'active', orders: 11, spent: '$2,100', joined: '2024-08-12', avatar: 'EW', location: 'Dallas, USA' },
];

export const products = [
  { id: 1, name: 'Wireless Headphones Pro', category: 'Electronics', price: 149.99, discount: 10, stock: 45, sku: 'WHP-001', status: 'in-stock', image: 'assets/products/product-thumbnail-01.jpg', tags: ['wireless', 'audio'], created: '2024-11-01' },
  { id: 2, name: 'Smart Watch Series X', category: 'Electronics', price: 299.99, discount: 0, stock: 23, sku: 'SWX-002', status: 'in-stock', image: 'assets/products/product-thumbnail-02.jpg', tags: ['wearable', 'smart'], created: '2024-10-15' },
  { id: 3, name: 'Premium Leather Bag', category: 'Fashion', price: 89.99, discount: 15, stock: 0, sku: 'PLB-003', status: 'out-of-stock', image: 'assets/products/product-thumbnail-03.jpg', tags: ['leather', 'accessories'], created: '2024-09-20' },
  { id: 4, name: 'Organic Coffee Beans', category: 'Food', price: 24.99, discount: 0, stock: 120, sku: 'OCB-004', status: 'in-stock', image: 'assets/products/product-thumbnail-04.jpg', tags: ['organic', 'coffee'], created: '2024-12-01' },
  { id: 5, name: 'Yoga Mat Premium', category: 'Sports', price: 49.99, discount: 20, stock: 8, sku: 'YMP-005', status: 'low-stock', image: 'assets/products/product-thumbnail-05.jpg', tags: ['fitness', 'yoga'], created: '2024-08-05' },
  { id: 6, name: 'Desk Lamp LED', category: 'Home', price: 59.99, discount: 0, stock: 67, sku: 'DLD-006', status: 'in-stock', image: 'assets/products/product-thumbnail-06.jpg', tags: ['lighting', 'office'], created: '2024-07-22' },
  { id: 7, name: 'Running Shoes Ultra', category: 'Sports', price: 129.99, discount: 25, stock: 34, sku: 'RSU-007', status: 'in-stock', image: 'assets/products/product-thumbnail-07.jpg', tags: ['running', 'shoes'], created: '2024-06-10' },
  { id: 8, name: 'Bluetooth Speaker', category: 'Electronics', price: 79.99, discount: 0, stock: 56, sku: 'BTS-008', status: 'in-stock', image: 'assets/products/product-thumbnail-08.jpg', tags: ['audio', 'portable'], created: '2024-05-18' },
  { id: 9, name: 'Ceramic Plant Pot', category: 'Home', price: 34.99, discount: 0, stock: 3, sku: 'CPP-009', status: 'low-stock', image: 'assets/products/product-thumbnail-09.jpg', tags: ['decor', 'plants'], created: '2024-04-02' },
  { id: 10, name: 'Silk Scarf Collection', category: 'Fashion', price: 45.99, discount: 10, stock: 28, sku: 'SSC-010', status: 'in-stock', image: 'assets/products/product-thumbnail-10.jpg', tags: ['silk', 'accessories'], created: '2024-03-25' },
];

export const orders = [
  { id: 'ORD-7842', customer: 'Sarah Johnson', email: 'sarah.j@email.com', products: 3, total: '$342.50', status: 'delivered', date: '2025-06-15', payment: 'Credit Card', address: '123 Main St, New York, NY 10001' },
  { id: 'ORD-7841', customer: 'Michael Chen', email: 'mchen@email.com', products: 1, total: '$149.99', status: 'shipped', date: '2025-06-14', payment: 'PayPal', address: '456 Oak Ave, San Francisco, CA 94102' },
  { id: 'ORD-7840', customer: 'Emma Williams', email: 'emma.w@email.com', products: 2, total: '$189.98', status: 'processing', date: '2025-06-14', payment: 'Credit Card', address: '789 Pine Rd, Chicago, IL 60601' },
  { id: 'ORD-7839', customer: 'James Rodriguez', email: 'j.rodriguez@email.com', products: 5, total: '$567.45', status: 'pending', date: '2025-06-13', payment: 'Bank Transfer', address: '321 Beach Blvd, Miami, FL 33101' },
  { id: 'ORD-7838', customer: 'Olivia Brown', email: 'olivia.b@email.com', products: 1, total: '$49.99', status: 'cancelled', date: '2025-06-13', payment: 'Credit Card', address: '654 Elm St, Seattle, WA 98101' },
  { id: 'ORD-7837', customer: 'David Kim', email: 'dkim@email.com', products: 4, total: '$423.96', status: 'delivered', date: '2025-06-12', payment: 'PayPal', address: '987 Cedar Ln, Austin, TX 78701' },
  { id: 'ORD-7836', customer: 'Sophia Martinez', email: 's.martinez@email.com', products: 2, total: '$279.98', status: 'shipped', date: '2025-06-12', payment: 'Credit Card', address: '147 Maple Dr, Denver, CO 80201' },
  { id: 'ORD-7835', customer: 'Liam Anderson', email: 'liam.a@email.com', products: 1, total: '$79.99', status: 'processing', date: '2025-06-11', payment: 'Credit Card', address: '258 Birch Way, Portland, OR 97201' },
];

export const recentOrders = orders.slice(0, 5);

export const topProducts = [
  { rank: 1, name: 'Wireless Headphones Pro', category: 'Electronics', revenue: '$12,450', units: 83, image: products[0].image },
  { rank: 2, name: 'Smart Watch Series X', category: 'Electronics', revenue: '$9,890', units: 33, image: products[1].image },
  { rank: 3, name: 'Running Shoes Ultra', category: 'Sports', revenue: '$7,560', units: 58, image: products[6].image },
  { rank: 4, name: 'Premium Leather Bag', category: 'Fashion', revenue: '$5,230', units: 58, image: products[2].image },
  { rank: 5, name: 'Bluetooth Speaker', category: 'Electronics', revenue: '$4,890', units: 61, image: products[7].image },
];

export const activities = [
  { title: 'New order received', desc: 'Order #ORD-7842 from Sarah Johnson', time: '5 min ago', type: 'primary' },
  { title: 'Product restocked', desc: 'Wireless Headphones Pro — 50 units added', time: '1 hour ago', type: 'success' },
  { title: 'Payment confirmed', desc: 'Payment of $567.45 for order #ORD-7839', time: '2 hours ago', type: 'success' },
  { title: 'Low stock alert', desc: 'Yoga Mat Premium — only 8 units remaining', time: '3 hours ago', type: 'warning' },
  { title: 'New customer registered', desc: 'Olivia Brown joined the platform', time: '5 hours ago', type: 'primary' },
  { title: 'Order cancelled', desc: 'Order #ORD-7838 was cancelled by customer', time: '6 hours ago', type: 'danger' },
];

export const conversations = [
  { id: 1, name: 'Sarah Johnson', avatar: 'SJ', preview: 'Thank you for the quick delivery!', time: '2m', unread: true, messages: [
    { text: 'Hi, I have a question about my recent order.', sent: false, time: '10:30 AM' },
    { text: 'Of course! How can I help you today?', sent: true, time: '10:32 AM' },
    { text: 'Thank you for the quick delivery!', sent: false, time: '10:35 AM' },
  ]},
  { id: 2, name: 'Michael Chen', avatar: 'MC', preview: 'Can I get a refund for item #4521?', time: '15m', unread: true, messages: [
    { text: 'Can I get a refund for item #4521?', sent: false, time: '9:45 AM' },
  ]},
  { id: 3, name: 'Emma Williams', avatar: 'EW', preview: 'The product quality is amazing!', time: '1h', unread: false, messages: [
    { text: 'The product quality is amazing!', sent: false, time: '8:30 AM' },
    { text: 'We\'re glad you love it! Thank you for your feedback.', sent: true, time: '8:45 AM' },
  ]},
  { id: 4, name: 'James Rodriguez', avatar: 'JR', preview: 'When will my order ship?', time: '3h', unread: false, messages: [
    { text: 'When will my order ship?', sent: false, time: '7:00 AM' },
    { text: 'Your order is scheduled to ship tomorrow.', sent: true, time: '7:15 AM' },
  ]},
  { id: 5, name: 'Support Team', avatar: 'ST', preview: 'Weekly report is ready for review', time: '1d', unread: false, messages: [
    { text: 'Weekly report is ready for review', sent: false, time: 'Yesterday' },
  ]},
];

export const notifications = [
  { id: 1, title: 'New Order', text: 'Order #ORD-7842 has been placed', time: '5 min ago', icon: 'fa-shopping-cart', type: 'primary', unread: true },
  { id: 2, title: 'Low Stock', text: 'Yoga Mat Premium is running low', time: '1 hour ago', icon: 'fa-exclamation-triangle', type: 'warning', unread: true },
  { id: 3, title: 'Payment Received', text: '$567.45 payment confirmed', time: '2 hours ago', icon: 'fa-dollar-sign', type: 'success', unread: true },
  { id: 4, title: 'New Review', text: 'Sarah left a 5-star review', time: '3 hours ago', icon: 'fa-star', type: 'info', unread: false },
  { id: 5, title: 'System Update', text: 'Dashboard updated to v2.1', time: '1 day ago', icon: 'fa-sync', type: 'info', unread: false },
];

export const categories = ['Electronics', 'Fashion', 'Food', 'Sports', 'Home'];

export const chartData = {
  salesOverview: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    sales: [4200, 5100, 4800, 6200, 5800, 7100, 6500, 7800, 7200, 8400, 7900, 9200],
    orders: [120, 145, 132, 168, 155, 190, 175, 210, 195, 225, 210, 245],
  },
  revenue: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [3200, 4100, 3800, 5200, 4800, 6100, 5500],
  },
  analytics: {
    line: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], data: [12000, 15000, 13500, 18000] },
    bar: { labels: ['Electronics', 'Fashion', 'Food', 'Sports', 'Home'], data: [45000, 28000, 15000, 22000, 18000] },
    pie: { labels: ['Electronics', 'Fashion', 'Food', 'Sports', 'Home'], data: [35, 22, 12, 18, 13] },
  },
  customerGrowth: [120, 185, 240, 310, 380, 450, 520, 610, 680, 750, 820, 920],
};

export const tasks = [
  { id: 1, text: 'Review pending orders', priority: 'high', completed: false },
  { id: 2, text: 'Update product inventory', priority: 'medium', completed: false },
  { id: 3, text: 'Send weekly newsletter', priority: 'low', completed: true },
  { id: 4, text: 'Respond to customer inquiries', priority: 'high', completed: false },
  { id: 5, text: 'Prepare monthly report', priority: 'medium', completed: false },
];

export const notes = [
  { id: 1, text: 'Meeting with suppliers on Friday at 2 PM', color: 'primary' },
  { id: 2, text: 'New product launch scheduled for next month', color: 'yellow' },
  { id: 3, text: 'Review Q2 marketing budget', color: 'green' },
  { id: 4, text: 'Update return policy documentation', color: 'purple' },
];

export const faqItems = [
  { q: 'How do I add a new product?', a: 'Navigate to Products > Add Product from the sidebar. Fill in the product details, upload images, and click Save to publish or Save Draft to save for later.' },
  { q: 'How can I export reports?', a: 'Go to the Reports page, select your desired time period (daily, weekly, monthly, or custom range), and click Export PDF or Export Excel.' },
  { q: 'How do I change my password?', a: 'Go to Settings > Security, enter your current password and new password, then click Update Password.' },
  { q: 'Can I customize the dashboard?', a: 'Yes! You can toggle dark mode, collapse the sidebar, and customize notification preferences in Settings > Appearance.' },
  { q: 'How do I manage order statuses?', a: 'Open the Orders page, click on any order to view details, and use the status dropdown to update it. Changes are saved automatically.' },
  { q: 'How do I contact support?', a: 'Visit the Help Center page or send a message through the Messages section. Our support team typically responds within 24 hours.' },
];

export const navItems = [
  { section: 'Main', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'analytics', label: 'Analytics', icon: 'fa-chart-line' },
    { id: 'reports', label: 'Reports', icon: 'fa-file-alt' },
  ]},
  { section: 'Management', items: [
    { id: 'customers', label: 'Customers', icon: 'fa-users' },
    { id: 'products', label: 'Products', icon: 'fa-box' },
    { id: 'add-product', label: 'Add Product', icon: 'fa-plus-circle' },
    { id: 'orders', label: 'Orders', icon: 'fa-shopping-bag', badge: 47 },
  ]},
  { section: 'Communication', items: [
    { id: 'messages', label: 'Messages', icon: 'fa-envelope', badge: 3 },
  ]},
  { section: 'Support', items: [
    { id: 'faq', label: 'FAQ', icon: 'fa-question-circle' },
    { id: 'help', label: 'Help Center', icon: 'fa-life-ring' },
    { id: 'settings', label: 'Settings', icon: 'fa-cog' },
  ]},
];

export const pageTitles = {
  dashboard: { title: 'Dashboard', breadcrumb: 'Dashboard' },
  customers: { title: 'Customers', breadcrumb: 'Customers' },
  products: { title: 'Products', breadcrumb: 'Products' },
  'add-product': { title: 'Add Product', breadcrumb: 'Add Product' },
  orders: { title: 'Orders', breadcrumb: 'Orders' },
  messages: { title: 'Messages', breadcrumb: 'Messages' },
  analytics: { title: 'Analytics', breadcrumb: 'Analytics' },
  reports: { title: 'Reports', breadcrumb: 'Reports' },
  settings: { title: 'Settings', breadcrumb: 'Settings' },
  faq: { title: 'FAQ', breadcrumb: 'FAQ' },
  help: { title: 'Help Center', breadcrumb: 'Help Center' },
};

const currency = (value) => Number.parseFloat(String(value).replace(/[$,]/g, ''));
const orderTotal = (rows) => rows.reduce((sum, row) => sum + currency(row.total), 0);
const itemTotal = (rows) => rows.reduce((sum, row) => sum + row.products, 0);
console.assert(products.length === 10, 'Products inventory should contain 10 sample rows.');
console.assert(customers.length === 12, 'Customer directory should contain 12 sample rows.');
console.assert(orders.length === 8 && orderTotal(orders).toFixed(2) === '2083.84' && itemTotal(orders) === 19, 'Order sample totals must reconcile.');
console.assert(recentOrders.length === 5 && orderTotal(recentOrders).toFixed(2) === '1299.91' && itemTotal(recentOrders) === 12, 'Recent order sample totals must reconcile.');
console.assert(chartData.salesOverview.sales.reduce((a, b) => a + b, 0) === 80200, 'Monthly sales must total 80200 USD.');
console.assert(chartData.revenue.data.reduce((a, b) => a + b, 0) === 32700, 'Weekly revenue must total 32700 USD.');
console.assert(chartData.analytics.line.data.reduce((a, b) => a + b, 0) === 58500, 'Analytics revenue must total 58500 USD.');
console.assert(chartData.analytics.bar.data.reduce((a, b) => a + b, 0) === 128000, 'Category sales must total 128000 USD.');
console.assert(chartData.analytics.pie.data.reduce((a, b) => a + b, 0) === 100, 'Category shares must total 100 percent.');
console.assert(tasks.filter((task) => !task.completed).length === 4, 'Open task count must reconcile.');
console.assert(conversations.filter((thread) => thread.unread).length === 2, 'Unread conversation count must reconcile.');
