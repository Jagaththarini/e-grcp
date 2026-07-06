# Enterprise Governance, Risk, Compliance & Procurement Platform (e-GRCP)

## Project Overview

The Enterprise Governance, Risk, Compliance & Procurement Platform (e-GRCP) is a modern enterprise web application developed using React.js. The platform enables organizations to efficiently manage governance processes, procurement workflows, vendor management, compliance activities, risk monitoring, audits, approvals, notifications, and reporting through a centralized dashboard.

The application follows enterprise-level architecture with React Router, Redux Toolkit, Axios Service Layer, Material UI, React Hook Form, Yup Validation, Redux Persist, Lazy Loading, Protected Routes, and Role-Based Access Control (RBAC).

---

# Business Problem

Large organizations often manage procurement, vendors, audits, risks, and compliance using multiple disconnected systems or spreadsheets. This creates:

- Manual approval delays
- Duplicate data
- Compliance violations
- Poor audit visibility
- Difficult vendor management
- Limited reporting capabilities

The e-GRCP platform centralizes all these operations into a single enterprise application.

---

# Product Vision

To provide organizations with a secure, scalable, and centralized Governance, Risk, Compliance, and Procurement management platform that improves operational efficiency and regulatory compliance.

---

## 📁 Project Structure

```
src/
├── __mocks__/          # Jest file mocks
├── __tests__/          # Test suites (50 tests, 8 suites)
├── components/
│   ├── common/         # KpiCard, StatusChip, ErrorBoundary, etc.
│   └── layout/         # AppHeader, AppSidebar, AppLayout
├── mocks/              # Mock JSON data (users, vendors, requests, risks, etc.)
├── pages/
│   ├── auth/           # Login, ForgotPassword, ResetPassword, SessionExpired
│   ├── dashboard/      # Executive Dashboard with KPIs and charts
│   ├── procurement/    # List, Detail, Create Request pages
│   ├── vendors/        # Vendor List and Detail pages
│   ├── risk/           # Risk Center with heat matrix
│   ├── compliance/     # Compliance Center
│   ├── audit/          # Audit Center
│   ├── approval/       # Approval Workbench
│   ├── notifications/  # Notification Center
│   ├── reports/        # Reporting Center with CSV export
│   └── settings/       # User Settings
├── services/           # Mock API services (simulated async calls)
├── store/
│   ├── index.js        # configureStore with redux-persist
│   └── slices/         # 10 Redux Toolkit slices
└── theme/              # MUI light/dark themes
```

## 🏗 Architecture Flow

<p align="center">
  <img src="architecture.png" alt="e-GRCP Architecture Flow" width="900">
</p>

# User Roles

## Admin

- Dashboard Management
- User Management
- Vendor Management
- Procurement Management
- Risk Management
- Compliance Management
- Audit Management
- Reports
- System Settings

---

## Risk Manager

- View Dashboard
- Manage Risks
- Risk Mitigation
- Reports
- Notifications

---

## Procurement Manager

- Manage Procurement
- Vendor Management
- Purchase Requests
- Notifications

---

## Auditor

- Audit Management
- Compliance Reviews
- Reports
- Notifications

---

## Employee

- Dashboard
- Approvals
- Notifications

---

The application follows Separation of Concerns (SoC).

- Presentation Layer
- Business Logic Layer
- State Management Layer
- Service Layer
- Mock Data Layer

---

# Technology Stack

## Frontend

- React.js
- JavaScript (ES6+)
- Material UI (MUI)

## State Management

- Redux Toolkit
- Redux Persist

## Routing

- React Router DOM

## Forms

- React Hook Form
- Yup Validation

## HTTP Client

- Axios

## Testing

- Jest
- React Testing Library

## Deployment

- Vercel
- GitHub

---

# Redux Toolkit

The application uses Redux Toolkit for centralized state management.

Implemented Slices

- Auth Slice
- Dashboard Slice
- Procurement Slice
- Vendor Slice
- Risk Slice
- Compliance Slice
- Audit Slice
- Report Slice
- Notification Slice
- UI Slice

Redux features used:

- createSlice
- createAsyncThunk
- Redux Persist
- Redux DevTools

---

# React Router

Implemented Features

- Nested Routing
- Dynamic Routes
- Protected Routes
- Role-Based Navigation
- Lazy Loading

Example Routes

```
/login

/dashboard

/procurement

/procurement/:id

/vendors

/vendors/:id

/risk

/compliance

/audit

/reports

/settings
```

---

# Axios Service Layer

Axios is configured using a centralized service layer.

Features

- Axios Instance
- Base URL
- Request Interceptors
- Response Interceptors
- Authentication Token
- Global Error Handling
- Session Expiry Handling

---

# Form Validation

Implemented using

- React Hook Form
- Yup Validation

Validation includes

- Required Fields
- Email Validation
- Password Validation
- Custom Error Messages

---

# Error Handling

The application includes

- Error Boundary
- API Error Handling
- Validation Errors
- Session Expired Handling
- Unauthorized Access Handling

---

# Performance Optimization

Implemented

- React.memo
- useMemo
- useCallback
- Lazy Loading
- Route-Based Code Splitting

---

# Testing Strategy

Testing Frameworks

- Jest
- React Testing Library

Testing Includes

- Component Testing
- Redux Slice Testing
- Service Layer Testing
- Form Validation Testing

Target Coverage

- Minimum 70%
- Target 80%+

---

# Deployment

Production Build

```
npm run build
```

Development

```
npm install

npm run dev
```

---

# Environment Variables

Create a `.env` file in the project root.

```
VITE_API_BASE_URL=http://localhost:3000/
```

---

# Login Credentials

| Role                | Email                 | Password        |
| ------------------- | --------------------- | --------------- |
| Admin               | admin@egrcp.com       | Admin@123       |
| Risk Manager        | risk@egrcp.com        | Risk@123        |
| Procurement Manager | procurement@egrcp.com | Procurement@123 |
| Auditor             | auditor@egrcp.com     | Audit@123       |
| Employee            | employee@egrcp.com    | Employee@123    |

---

# Future Enhancements

- JWT Authentication
- Real Backend Integration
- Multi-Factor Authentication
- Real-Time Notifications
- AI-Based Risk Prediction
- Advanced Analytics Dashboard

---

# Author

**Jagaththarini S T**

Department of Computer Science & Engineering

Enterprise Governance, Risk, Compliance & Procurement Platform (e-GRCP)

React | Redux Toolkit | Material UI | Axios | React Router | Enterprise Application

---
