# Project Guardrails: Profit Calculator Web App (JavaScript Version)

This file defines the scope, stack, and rules that **all developers and AI assistants (Cursor, Copilot, etc.)** must follow.  
The purpose is to prevent hallucinations, scope creep, and deviation from the Product Requirements Document (PRD).  

---

## 📌 Project Summary
A web application for small business owners to calculate **profitability of their products** by inputting ingredients, quantities, and batch details.  
The system will calculate **total costs, gross income, net profit, profit margin, and per-ingredient contribution**, and display results in a **dashboard with charts**.  

---

## ✅ Allowed Tech Stack

### Frontend
- **Framework:** Next.js (React, JavaScript only)  
- **Styling:** TailwindCSS  
- **Charts:** Recharts  

### Backend
- **Runtime:** Node.js  
- **Framework:** Express.js (for API routes)  
- **Authentication:** Clerk  
- **Database:** MongoDB Atlas (Mongoose ODM)  

### Hosting
- **Frontend:** Vercel (free tier)  
- **Backend (if separate):** Render (free tier)  
- **Database:** MongoDB Atlas (free tier)  

---

## 🔒 Scope of Features

### Core Features
1. **Authentication**
   - Clerk integration for user signup, login, logout.  
   - Email/password or OAuth (Google, etc.) depending on Clerk’s free tier.  
   - JWT/session tokens for API requests.  

2. **Ingredient Management**
   - CRUD operations: add, edit, delete, view ingredients.  
   - Fields: name, unit type (g, ml, pcs, etc.), unit cost, supplier (optional).  

3. **Batch Input**
   - Define number of units produced.  
   - Define selling price per unit OR total gross revenue.  
   - Select ingredients + quantities used per batch.  

4. **Calculations**
   - Total ingredient cost per batch.  
   - Total gross income (units × price OR provided gross revenue).  
   - Net profit = Gross income − Total costs.  
   - Profit margin % = (Net profit ÷ Gross income) × 100.  
   - Per-ingredient contribution to cost (%).  

5. **Dashboard**
   - Profit trends over time.  
   - Cost breakdown pie chart (Recharts).  
   - Profit margin per batch bar chart.  
   - KPIs (cards): Net Profit, Gross Income, Profit Margin %.  

6. **Feedback Engine**
   - Simple rule-based suggestions:  
     - Highlight top 3 costliest ingredients.  
     - Suggest cost reduction (e.g., “X ingredient contributes 40% of cost”).  
     - Flag low profit margin batches (<15%).  

---

## 🚫 Forbidden (Strict Rules)
- ❌ No recipe builder feature.  
- ❌ No inventory/stock tracking.  
- ❌ No payment integration (Stripe, etc.) for MVP.  
- ❌ No AI/ML for cost optimization in MVP (rule-based only).  
- ❌ No use of paid hosting or services.  
- ❌ No TypeScript (JavaScript only).  
- ❌ No frameworks other than Next.js, Express, React, Tailwind, Recharts, MongoDB, Clerk.  

---

## 🛡️ Code & Design Standards
- Use **JavaScript (ES6+)** only, no TypeScript.  
- Optional: JSDoc for documenting functions and models.  
- API must follow **REST conventions** (`/api/ingredients`, `/api/batches`, `/api/calculations`).  
- Mongoose schemas must be defined for **Users, Ingredients, Batches**.  
- All sensitive values (DB URL, Clerk keys) must be stored in `.env` only.  
- UI must be **responsive** (mobile/tablet/desktop).  
- Keep **clean component structure**: `components/`, `pages/`, `lib/`, `models/`.  
- Charts should use **Recharts** (not Chart.js or others).  
- Feedback must be **deterministic** and rule-based (no AI).  

---

## 📅 Future Extensions (Not MVP)
- Stripe integration for SaaS monetization.  
- AI-powered cost optimization.  
- Multi-currency support.  
- Export reports to PDF/Excel.  
- Team collaboration (multiple users per company).  

---
