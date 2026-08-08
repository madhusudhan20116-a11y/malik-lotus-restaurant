# 🍽️ Malik Lotus Restaurant — Full-Stack Web Application

A modern, high-performance, full-stack web application designed for **Malik Lotus Restaurant** (మాలిక్ లోటస్ రెస్టారెంట్), Kurnool, Andhra Pradesh. Built to present rich culinary offerings—including authentic Arabian Mandi, Biryani, and Indian grills—to attract guests, showcase digital menus, and streamline online orders.

---

## ✨ Features & Highlights

- **Dynamic Digital Menu:** Browse categorised dishes (Mandi, Biryani, Starters, Grills, Seafood, Desserts) with instant search and category filter pills.
- **Real-time Order System & Cart Management:** Add items to cart, calculate dynamic delivery totals, and submit orders directly to the restaurant database.
- **Admin Management Dashboard:** JWT-authenticated portal to view live orders, manage order fulfillment status (`New` ➔ `Preparing` ➔ `Out for Delivery` ➔ `Delivered`), and update/delete menu items.
- **Quick Action Bar & Mobile Optimization:** One-tap action buttons for **Call Now**, **Online Order**, **Get Directions**, and **WhatsApp Inquiry**, optimized with a sticky bottom navigation bar for mobile devices.
- **Trust & Reviews Showcase:** Highlighting real guest feedback (4.1★ rating across 6,193+ Google reviews) and exact business coordinates in Kurnool.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React.js (v18)
- **Styling:** Tailwind CSS, PostCSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **Routing:** React Router DOM (v6)

### Backend
- **Framework:** FastAPI (Python 3.10+)
- **Database ORM:** SQLAlchemy
- **Authentication:** PyJWT & Passlib (Bcrypt)
- **Data Validation:** Pydantic (v2)
- **Database:** PostgreSQL (Production) / SQLite (Local Development)

---

## 📁 Repository Structure

```text
malik-lotus-restaurant/
├── backend/
│   ├── main.py                  # FastAPI application entry point & data seeds
│   ├── database.py              # Database engine & session setup
│   ├── models.py                # SQLAlchemy DB models (Orders, Menu, Users)
│   ├── schemas.py               # Pydantic data validation schemas
│   ├── auth.py                  # JWT authentication & password hashing
│   ├── requirements.txt         # Python dependencies
│   └── routers/
│       ├── auth_router.py       # Login endpoint
│       ├── menu.py              # Menu items & categories CRUD
│       ├── orders.py            # Order creation & status updates
│       ├── offers.py            # Special offers management
│       ├── gallery.py           # Photo gallery API
│       └── restaurant.py        # Business settings API
├── frontend/
│   ├── public/                  # HTML template & static assets
│   ├── src/
│   │   ├── components/          # Navbar, QuickActionBar, MobileStickyBar, Footer
│   │   ├── pages/               # Home, MenuPage, CheckoutPage, AdminDashboard
│   │   ├── context/             # CartContext state management
│   │   ├── services/            # Axios API interface
│   │   ├── App.js               # Main routing & app wrapper
│   │   └── index.css            # Tailwind directives & global styling
│   ├── package.json             # Node dependencies & build scripts
│   └── tailwind.config.js       # Custom theme configuration (Colors, Typography)
└── README.md                    # Project documentation
```

---

## 🚀 Step-by-Step Setup Instructions

### 1. Prerequisites
- **Python:** Version 3.10 or higher
- **Node.js:** Version 16.x or higher (with `npm`)
- **Git:** Installed on your local machine

---

### 2. Backend Setup

Open your terminal or PowerShell and run:

```bash
# Navigate to the backend directory
cd backend

# Create Python virtual environment
python -m venv venv

# Activate virtual environment
# On Windows PowerShell:
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.env\Scripts\Activate.ps1

# On macOS / Linux:
# source venv/bin/activate

# Install Python dependencies (including bcrypt==4.0.1 compatibility fix)
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
```

* **Backend Server:** `http://localhost:8000`
* **Interactive API Docs (Swagger):** `http://localhost:8000/docs`

---

### 3. Frontend Setup

Open a **second terminal window** and run:

```bash
# Navigate to the frontend directory
cd frontend

# Allow script execution (if using Windows PowerShell)
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

# Install Node dependencies
npm install

# Start the React development server
npm start
```

* **Frontend Web App:** `http://localhost:3000`

---

## 🔐 Admin Dashboard Credentials

* **Username:** `admin`
* **Password:** `MalikLotus@2026`

---

## 📄 License & Attribution

Designed and developed for **Malik Lotus Restaurant**, Kurnool, Andhra Pradesh, India.
