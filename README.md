# Flux - Expense Tracker

A full-stack expense tracking app I built to manage personal finances. Track transactions, organize them by categories and wallets, and filter through your spending history.

Built with React + TypeScript on the frontend and Spring Boot on the backend.

## Current status

The frontend is fully functional with all CRUD operations working through localStorage. The Spring Boot backend is also complete with JWT authentication, REST endpoints, and PostgreSQL database.

Right now I'm in the process of connecting the two - replacing the localStorage calls with actual API requests. The Axios client is set up with interceptors for JWT token handling, just need to wire up the individual API calls.

## Screenshots

*Coming soon*

## What it does

- **User accounts** - Register, login, stay logged in between sessions
- **Transaction management** - Add, edit, delete your income and expenses
- **Organization** - Assign transactions to categories (food, bills, etc.) and wallets (bank account, cash, etc.)
- **Filtering** - Filter by type, category, wallet, or date range. Sort by amount or date.

### Still working on

- Replacing localStorage with API calls (in progress)
- Dashboard with charts and spending insights
- Better mobile experience

## Tech used

**Frontend:**
- React 18 with TypeScript
- Vite for building
- Tailwind CSS
- React Router v7
- React Hook Form + Zod for forms
- Axios for API calls

**Backend:**
- Spring Boot 3
- Spring Security with JWT
- PostgreSQL
- Hibernate/JPA

## Project structure

```
src/
├── components/        # UI components
│   ├── Dialog/       # Reusable modal
│   ├── Expenses.tsx  # Main transactions page
│   ├── FilterBar.tsx
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   └── ...
├── context/          # Auth context
├── hooks/            # Custom hooks (useFilterState, etc.)
├── services/
│   ├── api/          # Axios setup
│   └── localStorage/ # Local storage helpers
├── types/            # TypeScript types
└── data/             # Mock data for development
```

## Running locally

You'll need Node.js 18+ and pnpm.

```bash
git clone https://github.com/yourusername/flux-expense-tracker.git
cd flux-expense-tracker
pnpm install
pnpm dev
```

Opens at `http://localhost:5173`

For testing, use:
```
Email: user1@example.com
Password: Password1!
```

### Backend (optional)

If you want to run the full stack:

```bash
cd backend
./mvnw spring-boot:run
```

API runs at `http://localhost:8080`

## Some implementation notes

**Dialog component** uses compound components pattern so it's flexible:

```tsx
<Dialog isOpen={isOpen} onClose={onClose} title="Add Transaction">
    <Dialog.Body>
        {/* form stuff */}
    </Dialog.Body>
    <Dialog.Footer>
        {/* buttons */}
    </Dialog.Footer>
</Dialog>
```

**Filtering** is handled by a custom hook that returns filtered + sorted transactions:

```tsx
const { sortedAndFilteredTransactions, filters, setFilters, resetFilters } = useFilterState(transactions);
```

**Form validation** uses Zod with a custom codec for date handling (converts between ISO strings and input date format).

## TODO

- [ ] Dashboard with spending charts
- [ ] Connect to backend API
- [ ] Wallet management page
- [ ] Category management page  
- [ ] Export to CSV
- [ ] Recurring transactions

---

Made for Coding Factory @ AUEB
