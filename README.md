# 👨🏻‍🍳 Leftover Chef (Frontend)

แอปพลิเคชันเว็บสำหรับจัดการวัตถุดิบและค้นหาเมนูอาหาร พัฒนาด้วย **Next.js** เพื่อประสิทธิภาพที่ยอดเยี่ยมและการจัดการ Route ที่แม่นยำ

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Shadcn UI
- **Icons:** Lucide React
- **Data Fetching:** Axios
- **State Management:** Zustand

## 🚀 Getting Started

### 1. Prerequisites

ตรวจสอบว่าเครื่องของคุณมีการติดตั้ง:

- Node.js (LTS version)

- pnpm (`npm install -g pnpm`)

### 2. Installation

```sh
# ติดตั้ง Dependencies
pnpm install

# สร้างไฟล์ Environment
cp .env.example .env.local
```

อย่าลืมระบุ `NEXT_PUBLIC_API_URL` ใน `.env.local`

### 3. Running the App

```sh
pnpm dev
```

เปิดดูแอปได้ที่: `http://localhost:3000`

## 📂 Project Structure

```
/src
 ├── app              # Next.js App Router (admin, login, recipe, register)
 ├── components       # Reusable UI Components
 ├── data             # Static data หรือ Mock data ต่างๆ
 ├── lib              # Shared libraries และ Axios instance configuration
 ├── services         # API service functions แยกตามโมดูล (สอดคล้องกับ Backend)
 ├── store            # Zustand stores สำหรับจัดการ Global State
 ├── types            # TypeScript Interfaces / Types definitions
 ├── utils            # Helper functions ต่างๆ
 └── middleware.ts    # Route protection และการจัดการสิทธิ์การเข้าถึง
```

## 🔐 Authentication & Session

- ระบบใช้ **HttpOnly Cookies** ผ่านการตั้งค่า `withCredentials: true` ใน Axios

- มีการใช้ **Middleware** (`middleware.ts`) เพื่อดักเช็คสิทธิ์การเข้าถึงหน้า Protected Routes (เช่น Admin หรือ User Dashboard)
