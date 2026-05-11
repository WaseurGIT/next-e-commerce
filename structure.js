/**
 * NEXT E-COMMERCE PROJECT STRUCTURE
 * ===================================
 * 
 * A Next.js 16 e-commerce application with multiple product categories,
 * authentication, and product details pages.
 */

const projectStructure = `
next-e-commerce/
│
├── 📄 Configuration Files
│   ├── package.json                    # Project dependencies and scripts
│   ├── next.config.ts                  # Next.js configuration
│   ├── tsconfig.json                   # TypeScript configuration
│   ├── eslint.config.mjs               # ESLint configuration
│   ├── postcss.config.mjs              # PostCSS configuration
│   ├── tailwind.config.js              # Tailwind CSS configuration
│   ├── next-env.d.ts                   # Next.js type definitions
│   ├── README.md                       # Project documentation
│   ├── AGENTS.md                       # Agent configuration
│   ├── CLAUDE.md                       # Claude configuration
│   └── structure.js                    # This file - Project structure overview
│
├── 📁 app/                             # Main Next.js App Router Directory
│   ├── layout.tsx                      # Root layout with Navbar and Footer
│   ├── page.tsx                        # Home page - main landing page
│   ├── globals.css                     # Global CSS styles and Tailwind imports
│   │
│   ├── 📁 shared/                      # Reusable layout components
│   │   ├── Navbar.tsx                  # Navigation bar component
│   │   └── Footer.tsx                  # Footer component
│   │
│   ├── 📁 components/                  # Home page section components
│   │   ├── Banner.tsx                  # Hero banner section
│   │   ├── MidNightCollection.tsx      # Midnight collection showcase
│   │   ├── Service.tsx                 # Services information section
│   │   ├── ShopCategoris.tsx           # Shop categories section
│   │   ├── Subscribe.tsx               # Newsletter subscription section
│   │   └── Trending.tsx                # Trending products section
│   │
│   └── 📁 pages/                       # Product and feature pages
│       ├── 📁 WristWatches/
│       │   └── page.tsx                # Wrist watches listing (4-col grid, watches.json)
│       │
│       ├── 📁 LuxuryClocks/
│       │   └── page.tsx                # Luxury clocks listing (4-col grid, clocks.json)
│       │
│       ├── 📁 Fans/
│       │   └── page.tsx                # Table fans listing (4-col grid, fans.json)
│       │
│       ├── 📁 ProductDetailsPage/
│       │   └── page.tsx                # Product details page (query: id, type)
│       │
│       ├── 📁 Login/
│       │   └── page.tsx                # Login page with email & social auth
│       │
│       ├── 📁 Register/
│       │   └── page.tsx                # Registration page with validation
│       │
│       ├── 📁 admin/                   # Admin panel (placeholder - TBD)
│       ├── 📁 auth/                    # Auth pages (placeholder - TBD)
│       └── 📁 client/                  # Client pages (placeholder - TBD)
│
├── 📁 public/                          # Static assets directory
│   ├── watches.json                    # Watch products data
│   ├── clocks.json                     # Clock products data
│   ├── fans.json                       # Fan products data
│   │
│   └── 📁 images/                      # Product and UI images
│       ├── watch_1.png through watch_9.png
│       ├── clock_1.png through clock_n.png
│       ├── fan_1.png through fan_n.png
│       ├── umbrella_1.png through umbrella_n.png
│       └── login.png and other UI images
│
└── 📦 Dependencies
    ├── Runtime:
    │   ├── next@16.2.6
    │   ├── react@19.2.4
    │   ├── react-dom@19.2.4
    │   ├── react-icons@^5.6.0
    │   └── lucide-react@^1.14.0
    │
    └── DevDependencies:
        ├── typescript@^5
        ├── tailwindcss@^4
        ├── @tailwindcss/postcss@^4
        ├── eslint@^9
        ├── eslint-config-next@16.2.6
        ├── @types/node@^20
        ├── @types/react@^19
        └── @types/react-dom@^19

═══════════════════════════════════════════════════════════════════════════════

KEY FEATURES:
─────────────
✓ Multiple product categories (Watches, Clocks, Fans)
✓ Detailed product pages with images, pricing, ratings
✓ Mobile-first responsive design using Tailwind CSS
✓ Login and Registration authentication pages
✓ Fixed navigation bar with search, user menu, and cart
✓ Comprehensive footer with links and social media
✓ Optimized images using Next.js Image component

DESIGN SYSTEM:
──────────────
• Primary Color: #2573E6 (Blue)
• Secondary: blue-600
• Background: Gradient (slate-50 via-blue-50 to-indigo-50)
• Max Width: max-w-7xl
• Padding: px-4 sm:px-6 lg:px-8
• Gap: gap-6

ROUTES:
───────
/                           Home page
/pages/WristWatches         Wrist watches listing
/pages/LuxuryClocks         Luxury clocks listing
/pages/Fans                 Table fans listing
/pages/ProductDetailsPage   Product details (query: id, type)
/pages/Login                Login page
/pages/Register             Registration page

SCRIPTS:
────────
npm run dev                 Start development server (port 3000)
npm run build               Create production build
npm run start               Start production server
npm run lint               Run ESLint

DEVELOPER NOTES:
────────────────
1. Product pages use responsive grids: 1 col mobile → 2 col tablet → 4 col desktop
2. Product details fetches data dynamically via query parameters
3. All product pages use "use client" for client-side interactivity
4. Tailwind CSS is used for styling with responsive breakpoints
5. React Icons used throughout for UI icons
6. Product data stored in JSON files in public directory
7. Admin, Auth, and Client sections are placeholders for future development
8. Image optimization via Next.js Image component
`;

module.exports = projectStructure;
