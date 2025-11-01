# Aplikasi Keuangan glofin - Next.js

Aplikasi manajemen keuangan berbasis web yang dibangun dengan Next.js 15 untuk membantu pengguna mengelola transaksi keuangan, laporan, dan kategori keuangan mereka.

## 📋 Daftar Isi

- [Mengapa Next.js?](#-mengapa-nextjs)
- [Tech Stack](#-tech-stack)
- [Library yang Digunakan](#-library-yang-digunakan)
- [Persyaratan Sistem](#-persyaratan-sistem)
- [Instalasi](#-instalasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Scripts Tersedia](#-scripts-tersedia)
- [Struktur Project](#-struktur-project)
- [Fitur Utama](#-fitur-utama)

## 🤔 Mengapa Next.js?

Aplikasi ini menggunakan **Next.js 15** sebagai framework utama karena beberapa alasan strategis:

### 1. **Server-Side Rendering (SSR) & Static Site Generation (SSG)**
- ✅ Meningkatkan **SEO** untuk aplikasi keuangan yang memerlukan visibility
- ✅ **Initial load time** lebih cepat karena HTML sudah dirender di server
- ✅ **Better performance** dengan server-side rendering untuk konten dinamis

### 2. **App Router Architecture (Next.js 13+)**
- ✅ **File-based routing** yang intuitif dan mudah diorganisir
- ✅ **Route groups** `(auth)` dan `(home)` untuk grouping routes yang rapi
- ✅ **Parallel routes** dan **intercepting routes** untuk UX yang lebih baik
- ✅ Built-in **loading states** dan **error boundaries**

### 3. **API Routes & Server Actions**
- ✅ Built-in **API routes** untuk backend functionality
- ✅ **Server Components** untuk mengurangi bundle size client-side
- ✅ **Data fetching** yang efisien dengan fetch API yang dioptimalkan

### 4. **Performance Optimization**
- ✅ **Automatic code splitting** - setiap route otomatis di-split
- ✅ **Image optimization** dengan next/image untuk performa gambar
- ✅ **Font optimization** dengan next/font untuk loading yang lebih cepat
- ✅ **Turbopack** untuk build yang lebih cepat dibandingkan webpack

### 5. **Developer Experience**
- ✅ **TypeScript support** out of the box
- ✅ **Hot Module Replacement (HMR)** untuk development yang lebih cepat
- ✅ **Built-in CSS support** untuk Tailwind CSS
- ✅ **ESLint integration** untuk code quality
- ✅ **shadcn/ui integration** - Component library yang fully customizable dan accessible

### 5.5. **shadcn/ui - UI Component Library**
- ✅ **Copy-paste approach** - Components bukan npm package, bisa di-edit langsung
- ✅ **Built on Radix UI** - Accessible by default, keyboard navigation, screen reader support
- ✅ **Tailwind CSS based** - Fully customizable dengan utility classes
- ✅ **TypeScript first** - Type safety untuk semua components
- ✅ **No runtime overhead** - Components adalah source code, bukan compiled package
- ✅ **Perfect fit dengan Next.js** - Server Components support, RSC compatible

### 6. **Production Ready Features**
- ✅ **Automatic HTTPS** di production
- ✅ **Optimized builds** dengan tree shaking dan minification
- ✅ **Static export** support untuk deployment yang fleksibel
- ✅ **Middleware** untuk authentication dan routing logic

### 7. **Ekosistem & Community**
- ✅ **Large community** dengan banyak resources dan examples
- ✅ **Vercel integration** untuk deployment yang seamless
- ✅ **Rich ecosystem** dengan banyak plugin dan tools
- ✅ **Active development** dengan update reguler dan features baru

### 8. **Kesesuaian dengan Project**
- ✅ Perfect untuk **aplikasi keuangan** yang memerlukan performance tinggi
- ✅ **Route protection** yang mudah dengan middleware
- ✅ Support untuk **dynamic routes** seperti `/riwayat/[categoryId]`
- ✅ **Suspense boundaries** untuk better UX dengan async operations

### Ringkasan
Next.js dipilih karena memberikan **kombinasi optimal** antara **developer experience**, **performance**, dan **production readiness** yang sangat diperlukan untuk aplikasi keuangan yang kompleks seperti glofin.

## 🚀 Tech Stack

### Core Framework
- **Next.js 15.5.4** - React framework untuk production dengan server-side rendering dan routing
- **React 19.1.0** - Library JavaScript untuk membangun user interface
- **TypeScript 5** - Superset JavaScript dengan static typing

### Styling & UI Components
- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processor untuk Tailwind
- **shadcn/ui** - Re-usable components built with Radix UI and Tailwind CSS

### Package Manager
- **Bun** atau **npm** - Package manager untuk dependencies

## 📚 Library yang Digunakan

### UI Components & Styling
- **shadcn/ui** - Component library yang dibangun dengan Radix UI dan Tailwind CSS
  - **Keunggulan shadcn/ui:**
    - ✅ Copy-paste components (bukan npm package)
    - ✅ Fully customizable dengan Tailwind CSS
    - ✅ Accessible by default (built on Radix UI)
    - ✅ TypeScript support
    - ✅ Components bisa di-edit langsung sesuai kebutuhan
  - **Komponen yang digunakan:** Button, Input, Dialog, Select, Tabs, Date Picker, OTP Input, dll
  
- **@radix-ui/react-*** (various versions) - Primitive UI components yang accessible dan unstyled (base untuk shadcn/ui)
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown, Tabs, dll
  
- **lucide-react** (^0.545.0) - Beautiful & consistent icon library (digunakan di shadcn/ui components)
- **class-variance-authority** (^0.7.1) - Utility untuk variant management (digunakan oleh shadcn/ui)
- **clsx** (^2.1.1) - Utility untuk conditional className (digunakan oleh shadcn/ui)
- **tailwind-merge** (^3.3.1) - Utility untuk merge Tailwind classes (digunakan oleh shadcn/ui)

### Form Handling
- **react-hook-form** (^7.64.0) - Performant forms dengan validation
- **@hookform/resolvers** (^5.2.2) - Validation resolvers untuk react-hook-form
- **zod** (^4.1.12) - TypeScript-first schema validation

### Date & Time
- **date-fns** (^4.1.0) - Modern JavaScript date utility library
- **date-fns-tz** (^3.2.0) - Timezone support untuk date-fns
- **react-day-picker** (^9.11.0) - Date picker component

### UI Enhancements
- **framer-motion** (^12.23.24) - Production-ready motion library untuk React
- **gsap** (^3.13.0) - Professional animation library
- **sonner** (^2.0.7) - Beautiful toast notifications
- **vaul** (^1.1.2) - Drawer component
- **next-themes** (^0.4.6) - Theme management untuk Next.js

### Data Visualization
- **recharts** (2.15.4) - Composable charting library untuk React
- **cmdk** (^1.1.1) - Command menu component

### Other Utilities
- **input-otp** (^1.4.2) - OTP input component
- **embla-carousel-react** (^8.6.0) - Carousel component
- **react-resizable-panels** (^3.0.6) - Resizable panels untuk layouts
- **jspdf** (^3.0.3) - PDF generation library
- **jspdf-autotable** (^5.0.2) - Table plugin untuk jsPDF

### Development Tools
- **ESLint** (^9) - JavaScript linter
- **eslint-config-next** (15.5.4) - ESLint config untuk Next.js
- **TypeScript** (^5) - Type checking

## 💻 Persyaratan Sistem

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** 18.17 atau lebih tinggi
- **Bun** (opsional, tapi direkomendasikan) atau **npm/yarn**
- **Git** untuk version control

## 📦 Instalasi

### Menggunakan Bun (Direkomendasikan)

```bash
# Clone repository
git clone <repository-url>

# Masuk ke direktori project
cd lomba

# Install dependencies
bun install
```

### Menggunakan npm

```bash
# Clone repository
git clone <repository-url>

# Masuk ke direktori project
cd lomba

# Install dependencies
npm install
```

### Menggunakan yarn

```bash
# Clone repository
git clone <repository-url>

# Masuk ke direktori project
cd lomba

# Install dependencies
yarn install
```

## 🏃 Cara Menjalankan

### Development Mode

Development mode akan menjalankan server development dengan hot-reload:

```bash
# Menggunakan Bun
bun run dev

# Menggunakan npm
npm run dev

# Menggunakan yarn
yarn dev
```

Aplikasi akan berjalan di **http://localhost:3000**

### Production Build

Untuk membuat production build:

```bash
# Menggunakan Bun
bun run build

# Menggunakan npm
npm run build

# Menggunakan yarn
yarn build
```

### Menjalankan Production Server

Setelah build, jalankan production server:

```bash
# Menggunakan Bun
bun run start

# Menggunakan npm
npm start

# Menggunakan yarn
yarn start
```

## 📜 Scripts Tersedia

| Script | Deskripsi |
|--------|-----------|
| `dev` | Menjalankan development server dengan Turbopack |
| `build` | Membuat production build dengan Turbopack |
| `start` | Menjalankan production server |
| `lint` | Menjalankan ESLint untuk code quality check |

## 📁 Struktur Project

```
lomba/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes (login, register, OTP)
│   │   ├── (home)/            # Protected home routes
│   │   │   ├── home/          # Dashboard
│   │   │   ├── pemasukan/     # Income management
│   │   │   ├── pengeluaran/   # Expense management
│   │   │   ├── riwayat/       # Transaction history
│   │   │   ├── laporan/       # Financial reports
│   │   │   ├── kelola-hpp/    # Cost management
│   │   │   └── profile/       # User profile
│   │   ├── pindai-struk/      # Receipt scanner
│   │   └── layout.tsx         # Root layout
│   ├── components/             # React components
│   │   ├── auth/              # Authentication components
│   │   ├── layout/            # Layout components
│   │   ├── ui/                # UI components (shadcn/ui)
│   │   └── utils/             # Utility components
│   ├── lib/                   # Utility libraries
│   ├── hooks/                 # Custom React hooks
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── public/                    # Static assets
├── package.json              # Dependencies & scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── README.md                 # Dokumentasi project
```

## ✨ Fitur Utama

- 🔐 **Autentikasi** - Login, Register, dan Password Reset
- 💰 **Manajemen Transaksi** - Pemasukan dan Pengeluaran
- 📊 **Laporan Keuangan** - Neraca, Laba Rugi, dan Arus Kas
- 📷 **Pindai Struk** - Scan receipt menggunakan kamera
- 🏷️ **Kategori Transaksi** - Kelola kategori keuangan
- 👤 **Profil Pengguna** - Kelola profil dan password
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Menggunakan Radix UI dan Tailwind CSS

## 🔧 Konfigurasi

### Environment Variables

Buat file `.env.local` di root project:

```env
NEXT_PUBLIC_API_BASE_URL=http://your-api-url.com
```

## 📝 Catatan

- Project menggunakan **Turbopack** untuk build yang lebih cepat
- Menggunakan **App Router** dari Next.js 13+
- TypeScript diaktifkan untuk type safety
- ESLint dikonfigurasi untuk code quality

## 🤝 Kontribusi

Project ini dibuat untuk keperluan lomba kampus. Untuk kontribusi, silakan buat pull request.

## 📄 License

Private project - All rights reserved

---

**Dibuat dengan ❤️ menggunakan Next.js dan React**
