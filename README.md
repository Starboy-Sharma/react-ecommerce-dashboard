## Project Structure and Implementation

src/
├── assets/               # Images, icons, etc.
├── components/           # Reusable UI components
│   ├── common/           # Button, Card, Modal, etc.
│   ├── forms/            # Form components and inputs
│   ├── layout/           # Layout components (Sidebar, Header)
│   └── dashboard/        # Dashboard-specific components
├── context/              # React Context definitions
│   ├── AuthContext.tsx
│   ├── ProductContext.tsx
│   └── OrderContext.tsx
├── hooks/                # Custom hooks
│   ├── useAuth.tsx
│   ├── usePagination.tsx
│   ├── useSort.tsx
│   ├── useFilter.tsx
│   └── useNotification.tsx
├── pages/                # Application pages
│   ├── Dashboard/
│   ├── Products/
│   ├── Orders/
│   ├── Customers/
│   ├── Profile/
│   └── Auth/
├── services/             # API service calls
│   ├── api.ts            # Base API configuration
│   ├── authService.ts
│   ├── productService.ts
│   └── orderService.ts
├── types/                # TypeScript type definitions
├── utils/                # Helper functions
├── App.tsx               # Main component
└── index.tsx             # Entry point



