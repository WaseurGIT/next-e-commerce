/**
 * NEXT E-COMMERCE PROJECT STRUCTURE
 * ===================================
 * 
 * A Next.js e-commerce application with multiple product categories,
 * authentication, and product details pages.
 * 
 * Last Updated: May 18, 2026
 */

const projectStructure = `
next-e-commerce/
│
├── 📄 Root Configuration Files
│   ├── AGENTS.md                       # Agent configuration
│   ├── CLAUDE.md                       # Claude configuration
│   ├── eslint.config.mjs               # ESLint configuration
│   ├── next-env.d.ts                   # Next.js type definitions
│   ├── next.config.ts                  # Next.js configuration
│   ├── package.json                    # Project dependencies and scripts
│   ├── package-lock.json               # Locked dependencies
│   ├── postcss.config.mjs              # PostCSS configuration
│   ├── README.md                       # Project documentation
│   ├── structure.js                    # This file - Current project structure
│   ├── tsconfig.json                   # TypeScript configuration
│   └── .env                            # Environment variables
│
├── 📁 .git/                            # Git repository
├── 📁 .gitignore                       # Git ignore rules
├── 📁 .next/                           # Next.js build output
├── 📁 node_modules/                    # Project dependencies
│
├── 📁 app/                             # Main Next.js App Router Directory
│   ├── 📁 (dashboard)/                 # Dashboard route group
│   │   ├── layout.tsx                  # Dashboard layout
│   │   ├── 📁 admin/
│   │   │   └── 📁 dashboard/
│   │   │       └── page.tsx            # Admin dashboard
│   │   └── 📁 user/
│   │       └── 📁 dashboard/
│   │           └── page.tsx            # User dashboard
│   │
│   ├── 📁 (public)/                    # Public route group
│   │   ├── layout.tsx                  # Public layout
│   │   ├── page.tsx                    # Public home page
│   │   └── 📁 pages/                   # Product and feature pages
│   │       ├── 📁 CartPage/
│   │       │   └── page.tsx
│   │       ├── 📁 Fans/
│   │       │   └── page.tsx
│   │       ├── 📁 Login/
│   │       │   └── page.tsx
│   │       ├── 📁 LuxuryClocks/
│   │       │   └── page.tsx
│   │       ├── 📁 ProductDetailsPage/
│   │       │   └── page.tsx
│   │       ├── 📁 Register/
│   │       │   └── page.tsx
│   │       └── 📁 WristWatches/
│   │           └── page.tsx
│   │
│   ├── 📁 api/                         # API integration
│   │   └── productsApi.ts              # Products API
│   │
│   ├── 📁 auth/                        # Authentication
│   │   ├── AuthProvider.tsx            # Auth context provider
│   │   └── axiosSecure.ts              # Secure axios instance
│   │
│   ├── 📁 components/                  # Reusable components
│   │   ├── Banner.tsx
│   │   ├── MidNightCollection.tsx
│   │   ├── Service.tsx
│   │   ├── ShopCategoris.tsx
│   │   ├── Subscribe.tsx
│   │   └── Trending.tsx
│   │
│   ├── 📁 firebase/                    # Firebase configuration
│   │   └── firebase.config.ts
│   │
│   ├── 📁 shared/                      # Shared layout components
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   └── favicon.ico
│   │
│   ├── globals.css                     # Global CSS styles
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Home page
│
└── 📦 Key Directories
    ├── app/                            # Next.js app router
    └── public/                         # Static files

═══════════════════════════════════════════════════════════════════════════════

CURRENT STRUCTURE SUMMARY:
──────────────────────────
✓ Root configuration files & environment setup (14 items)
✓ Git & build directories (.git, .next, node_modules)
✓ Main app directory with root layout and page
✓ Route groups: (dashboard) and (public)
✓ Admin section with dashboard
✓ User section with dashboard
✓ Public pages section with 7 product categories
✓ API integration for products
✓ Authentication system (AuthProvider, axiosSecure)
✓ Reusable components (6 components)
✓ Firebase configuration
✓ Shared layout components (Navbar, Footer, favicon)
✓ Public assets directory with images
✓ Global CSS styles

FOLDER HIERARCHY:
─────────────────
• app/(dashboard)/admin/dashboard/
• app/(dashboard)/user/dashboard/
• app/(public)/pages/CartPage/
• app/(public)/pages/Fans/
• app/(public)/pages/Login/
• app/(public)/pages/LuxuryClocks/
• app/(public)/pages/ProductDetailsPage/
• app/(public)/pages/Register/
• app/(public)/pages/WristWatches/
• app/api/
• app/auth/
• app/components/
• app/firebase/
• app/shared/
• public/images/
`;

module.exports = projectStructure;
