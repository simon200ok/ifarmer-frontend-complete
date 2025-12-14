# iFarmr — Frontend (Complete)

A modern **React + Vite** frontend for **iFarmr**, a farm management and community platform. It provides a clean landing page, authentication, a farmer dashboard (crops, livestock, inventory), community posts, and an admin area for user management and analytics.

---

## Key Features

### Farmer experience
- **Authentication**: sign up, log in, forgot/reset password flows
- **Dashboard layout** with sidebar navigation
- **Crop management**: view crop stats (e.g., growing/flowering/total) and add new crops
- **Livestock management**: list livestock, view totals, and navigate to edit/update screens
- **Inventory management**: view inventory stats and add new inventory
- **Community**: create posts (with file upload), view popular posts, post details, like & comment
- **Profile**: view/update profile details and upload a display photo

### Admin experience
- **Admin auth**: login/signup/forgot/reset flows
- **Admin dashboard**: “at a glance” counts, weekly active users, user growth charts
- **Analytics**: average usage time (by year) and demographics breakdown (pie chart)

---

## Tech Stack

- **React 18** + **Vite**
- **React Router**
- **Bootstrap / React-Bootstrap**
- **Axios** for API calls
- **Chart.js + react-chartjs-2** for dashboards/analytics charts
- **Day.js** for date formatting
- **React Toastify** for notifications/toasts

---

## Getting Started

### Prerequisites
- **Node.js** (LTS recommended)
- **npm** (comes with Node)

### Install & Run
```bash
# 1) Clone
git clone https://github.com/simon200ok/ifarmer-frontend-complete.git
cd ifarmer-frontend-complete

# 2) Install dependencies
npm install

# 3) Start development server
npm run dev
