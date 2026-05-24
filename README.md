# 💹 Bluestocks Fintech — IPO Admin Dashboard & REST API

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Status](https://img.shields.io/badge/Internship_Project-Bluestock_Fintech-blue?style=for-the-badge)

> Production-ready IPO Admin Dashboard & REST API prototype built during the Bluestock Fintech internship. Simulates a real-world IPO module with listing management, an admin panel, an upcoming IPO section, and fully Postman-tested APIs.

---

## 📌 Project Overview

**Bluestocks Fintech** is a hands-on internship project built at **Bluestock Fintech**, simulating a production-grade IPO platform. It covers the full lifecycle of an IPO module — from admin management to public-facing listing pages — and includes a complete REST API tested via Postman.

This project reflects growth in **full-stack development**, **alpha testing**, and **API validation** in a real fintech environment.

---

## ✨ Key Features

- 📋 **IPO Listing Management** — Create, view, and manage active and upcoming IPO listings
- 🛡️ **Admin Panel** — Secure admin dashboard for managing IPO data
- 📅 **Upcoming IPO Section** — Dedicated page showcasing upcoming IPOs for investors
- 🔐 **Authentication** — Sign-in and sign-out functionality with session management
- 🌐 **Community & Products Pages** — Broker listings, product showcase, and live news pages
- 🧪 **Fully Postman-Tested APIs** — All endpoints documented and validated via Postman
- 📱 **Responsive Frontend** — HTML/CSS/JS with cross-device compatibility

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | HTML5, CSS3, JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (setup documented in `DATABASE_SETUP.md`) |
| **API Testing** | Postman |
| **Auth** | Session-based sign-in / sign-out |

---

## 🏗️ Project Structure

```
📦 Bluestocks-Fintech-
 ┣ 📁 app/                  # App logic and routing
 ┣ 📁 components/           # Reusable UI components
 ┣ 📁 images/               # Project assets
 ┣ 📁 js/                   # Client-side JavaScript
 ┣ 📁 styles/               # Stylesheets
 ┣ 📄 index.html            # Landing / home page
 ┣ 📄 ipo.html              # IPO listing page
 ┣ 📄 ipo-all-upcoming.html # Upcoming IPO section
 ┣ 📄 signin.html           # Sign-in page
 ┣ 📄 dropdown-test.html    # UI component test
 ┣ 📄 server.js             # Express backend server
 ┣ 📄 DATABASE_SETUP.md     # Database initialization guide
 ┗ 📄 package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 16
- MySQL

### Installation

```bash
# Clone the repository
git clone https://github.com/Arnavs10/Bluestocks-Fintech-.git
cd Bluestocks-Fintech-

# Install dependencies
npm install

# Set up database
# Follow instructions in DATABASE_SETUP.md

# Start the server
node server.js
```

Open [http://localhost:3000](http://localhost:3000) (or configured port) to view the app.

---

## 🔌 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/ipos` | Fetch all IPO listings |
| `POST` | `/api/ipos` | Create a new IPO listing (Admin) |
| `GET` | `/api/ipos/upcoming` | Get upcoming IPOs |
| `POST` | `/api/auth/signin` | User sign-in |
| `POST` | `/api/auth/signout` | User sign-out |

> All endpoints are tested and documented via Postman.

---

## 📚 What I Learned

This internship project strengthened my skills in:

- Building production-style REST APIs with Node.js and Express
- Designing and documenting APIs with Postman
- Implementing authentication flows from scratch
- Frontend-to-backend integration in a real fintech context
- Alpha testing and iterative bug fixing in a collaborative team

---

## 👥 Contributors

- **Arnav Shukla** ([@Arnavs10](https://github.com/Arnavs10))

---

## 🔮 Future Improvements

- [ ] JWT-based authentication
- [ ] Live IPO data feed integration
- [ ] Email notifications for new IPO listings
- [ ] Admin analytics dashboard
- [ ] Full deployment on cloud infrastructure

---

> ⭐ Star this repo if you found it useful!
