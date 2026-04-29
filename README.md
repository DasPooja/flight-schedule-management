# ✈️ Flight Schedule Management

This is a React-based application to manage flight schedules with features like search, filtering, inline editing, and bulk actions. The application is optimized for performance and provides a responsive UI for both desktop and mobile screens.

---

## 🚀 Features

- Search flights by flight number, origin, or destination (debounced)

- Filter flights using:
  - Date range
  - Status (Active / Inactive)
  - AOC (dynamic)
  - Body Type
  - Days of Operation

- Inline editing for:
  - Departure (STD)
  - Arrival (STA)
  - Start Date / End Date

- Select single or multiple rows  
- Bulk delete with confirmation dialog  
- Responsive table design (desktop + mobile)

---

## ⚡ Performance

- Used **react-window** for virtualization  
- Efficient rendering for large datasets (200+ records)

---

## 🧠 State Management

- Managed using React local state  
- Custom hook: `useFlights`  
- Filtering handled via utility function `applyFilters`

---

## 🎨 Tech Stack

- React (Vite)
- Tailwind CSS
- Material UI (MUI)
- react-window
- react-hot-toast
- dayjs

---

## 📦 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/DasPooja/flight-schedule-management.git

# Go to project folder
cd flight-schedule-management

# Install dependencies
npm install

# Run the project
npm run dev
```

### 🌐 App will run at:
http://localhost:5173
