# 🚗 CarShop — Enterprise Automotive Portal & Showroom Management Ecosystem

> **Nền tảng số hóa toàn diện quy trình kinh doanh ô tô cao cấp, kết hợp giữa Trải nghiệm Khách hàng B2C sang trọng và Cổng Điều hành Quản trị B2B (Mini ERP/CRM) dành cho chuỗi Showroom xe.**

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9_Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand-orange)](https://github.com/pmndrs/zustand)
[![Code_Style](https://img.shields.io/badge/Design_System-Unified_10px-0ea5e9)](#)

---

## 📑 Mục Lục

1. [Dự Án Này Dùng Để Làm Gì? (Project Overview)](#1--dự-án-này-dùng-để-làm-gì-project-overview)
2. [Mục Đích & Đối Tượng Sử Dụng (Target Audience & Personas)](#2--mục-đích--đối-tượng-sử-dụng-target-audience--personas)
3. [Tổng Hợp Các Tính Năng Của Hệ Thống (Feature Catalog)](#3--tổng-hợp-các-tính-năng-của-hệ-thống-feature-catalog)
   - [3.1. Phân Hệ Trải Nghiệm Khách Hàng B2C](#31-phân-hệ-trải-nghiệm-khách-hàng-b2c-public-showroom)
   - [3.2. Phân Hệ Xác Thực & Phân Luồng Thông Minh](#32-phân-hệ-xác-thực--phân-luồng-thông-minh-auth-pipeline)
   - [3.3. Phân Hệ Điều Hành & Quản Trị Showroom B2B](#33-phân-hệ-điều-hành--quản-trị-showroom-b2b-management-portal)
4. [Kiến Trúc & Công Nghệ Cốt Lõi (Tech Stack & Architecture)](#4-️-kiến-trúc--công-nghệ-cốt-lõi-tech-stack--architecture)
5. [Những Điểm Sáng Kỹ Thuật Doanh Nghiệp Quan Tâm (Technical Highlights)](#5--những-điểm-sáng-kỹ-thuật-doanh-nghiệp-quan-tâm-technical-highlights)
6. [Cấu Trúc Thư Mục Chuẩn Doanh Nghiệp (Directory Tree)](#6--cấu-trúc-thư-mục-chuẩn-doanh-nghiệp-directory-tree)
7. [Tài Khoản Thử Nghiệm & Phân Quyền (Demo Credentials)](#7--tài-khoản-thử-nghiệm--phân-quyền-demo-credentials)
8. [Hướng Dẫn Cài Đặt & Chạy Dự Án (Getting Started)](#8--hướng-dẫn-cài-đặt--chạy-dự-án-getting-started)

---

## 1. 🎯 Dự Án Này Dùng Để Làm Gì? (Project Overview)

Trong mô hình kinh doanh xe ô tô truyền thống, các đại lý và showroom thường gặp phải 3 vấn đề lớn:
1. **Thiếu tính minh bạch:** Khách hàng khó tra cứu tình trạng kiểm định, giá lăn bánh và lịch sử xe.
2. **Quy trình rời rạc:** Việc định giá xe cũ, đăng ký lái thử, đặt cọc và xử lý hợp đồng thường quản lý thủ công qua giấy tờ hoặc file Excel, dễ thất thoát khách hàng tiềm năng (Leads).
3. **Quản trị phân tán:** Ban giám đốc khó theo dõi thời gian thực về dòng tiền cọc, số lượng xe tồn kho và hiệu suất làm việc của nhân viên kinh doanh.

👉 **CarShop ra đời như một giải pháp số hóa toàn diện khép kín:**
* **Bề nổi (Front-Office):** Là một sàn trưng bày xe trực tuyến (Online Showroom) sang trọng, minh bạch tiêu chuẩn 176 hạng mục kiểm định, giúp khách hàng mua - bán - định giá - lái thử xe chỉ với vài cú nhấp chuột.
* **Bề sâu (Back-Office):** Là một trung tâm điều hành quản trị tập trung (Operations Dashboard) giúp nhân viên và ban lãnh đạo kiểm soát kho xe, quản lý đơn cọc, theo dõi KPI doanh số và bảo mật thông tin khách hàng.

---

## 2. 👥 Mục Đích & Đối Tượng Sử Dụng (Target Audience & Personas)

Hệ thống được thiết kế hướng tới **3 nhóm người dùng mục tiêu** với những vai trò và giá trị phục vụ rõ ràng:

| Nhóm Đối Tượng | Họ Là Ai? | Hệ Thống Phục Vụ Gì Cho Họ? (Giá trị mang lại) |
| :--- | :--- | :--- |
| **1. Khách Hàng Cá Nhân**<br/>*(B2C Customers)* | • Người có nhu cầu mua xe sang, xe lướt đã kiểm định.<br/>• Người muốn bán xe cũ hoặc đổi xe mới.<br/>• Người muốn trải nghiệm lái thử tại nhà hoặc showroom. | • Tra cứu kho xe với bộ lọc đa chiều (hãng, giá, nhiên liệu).<br/>• Tìm kiếm nhanh toàn hệ thống với **Spotlight (`Ctrl + K`)**.<br/>• Sử dụng công cụ **Định giá xe AI** để biết giá trị xe cũ trong 2 giờ.<br/>• Đặt lịch lái thử trực tuyến không cần gọi điện thoại.<br/>• Đăng nhập an toàn, quản lý thông tin và theo dõi đơn cọc. |
| **2. Đội Ngũ Nhân Viên**<br/>*(Sales & Tư Vấn Viên)* | • Nhân viên bán hàng tại các chi nhánh showroom.<br/>• Chuyên viên thẩm định xe cũ. | • Tiếp nhận và xử lý tức thì các yêu cầu lái thử từ khách hàng.<br/>• Quản lý thông tin và lịch sử tương tác khách hàng trên CRM.<br/>• Tạo và theo dõi hợp đồng cọc xe (50M - 100M).<br/>• Tra cứu tình trạng xe trong kho (Sẵn sàng, Đang thẩm định, Đã cọc). |
| **3. Ban Quản Trị Showroom**<br/>*(Managers & Admins)* | • Giám đốc chi nhánh, Trưởng phòng kinh doanh.<br/>• Quản trị viên hệ thống công nghệ thông tin. | • Nắm bắt bức tranh tổng quan qua **Dashboard KPI**: doanh thu tháng, xe bán chạy, tỷ lệ chốt cọc.<br/>• Phê duyệt hợp đồng mua bán và hồ sơ vay trả góp.<br/>• Kiểm soát phân quyền truy cập 2 tầng (RBAC), tạo tài khoản nhân viên và khóa/mở tài khoản an toàn. |

---

## 3. ⚡ Tổng Hợp Các Tính Năng Của Hệ Thống (Feature Catalog)

### 3.1. Phân Hệ Trải Nghiệm Khách Hàng B2C (Public Showroom)

* 🔍 **Tìm Kiếm Toàn Năng Spotlight (`Ctrl + K`):** Hộp thoại tìm kiếm nhanh nổi giữa màn hình, hỗ trợ tìm kiếm xe theo tên, hãng, tầm giá; tự động xử lý tiếng Việt không dấu.
* 🚗 **Trang Danh Mục & Lọc Xe Đa Chiều (`/mua-xe`):**
  * Lọc linh hoạt theo: Hãng xe, mức giá, dòng xe (Sedan/SUV/Coupe), loại nhiên liệu (Xăng/Điện/Hybrid), năm sản xuất.
  * Đồng bộ trực tiếp bộ lọc lên URL query params (giúp copy link chia sẻ giữ nguyên kết quả lọc).
* 🏷️ **Bán Xe & Thu Cũ Đổi Mới (`/ban-xe`):** Biểu mẫu gửi thông tin xe cũ nhanh chóng, hỗ trợ trợ giá thu cũ đổi mới lên đến 50 triệu đồng.
* 🤖 **Định Giá Xe Thông Minh Bằng AI (`/dinh-gia`):** Nhập năm sản xuất, số ODO, dòng xe để nhận dự toán định giá tức thì dựa trên biểu đồ khấu hao thực tế.
* 🏎️ **Đăng Ký Lái Thử Trực Tuyến (`/test-drive`):** Cho phép chọn lái thử tại showroom hoặc giao xe tận nhà, chọn cung đường trải nghiệm; dữ liệu tự động đồng bộ sang CRM của nhân viên.
* ⚡ **Trang Chi Tiết Xe Thể Thao Porsche Taycan 4S (`/cars/taycan`):** Trải nghiệm showroom ảo với thông số kỹ thuật (VDP), ảnh xoay 360 độ và bảng dự toán chi phí lăn bánh theo từng tỉnh thành.
* 📰 **Tạp Chí & Đánh Giá Xe Hơi (`/news`):** Chuyên trang tin tức, phân tích chuyên sâu các dòng xe và cẩm nang lái xe an toàn.
* 🎁 **Chính Sách & Ưu Đãi Showroom (`/uu-dai`):** Bảng tổng hợp các chương trình hỗ trợ 100% lệ phí trước bạ, lãi suất ưu đãi 0%.

---

### 3.2. Phân Hệ Xác Thực & Phân Luồng Thông Minh (Auth Pipeline)

* 🔐 **Đăng Nhập Linh Hoạt (`/login`):** Hỗ trợ đăng nhập bằng Email/Password, tích hợp sẵn giao diện SSO Google và Apple ID.
* 🚦 **Phân Luồng Điều Hướng Tự Động Theo Vai Trò (Smart Redirect):**
  * **Khách hàng (`role = user`):** Sau khi đăng nhập được đưa ngay về trang **Showroom Mua Xe** (`/mua-xe`) để tiếp tục mua sắm, tuyệt đối không bị lạc vào trang quản trị.
  * **Nhân viên / Quản lý / Admin (`role = staff / manager / admin`):** Tự động điều hướng vào **Dashboard KPI** (`/dashboard`).
* 👤 **Hiển Thị Tài Khoản Cá Nhân Hóa Trên Navbar:**
  * Khi chưa đăng nhập: Nút *"Đăng nhập"* màu xanh nổi bật.
  * Khi đăng nhập thành công: Nút chuyển thành **Avatar của người dùng** (nếu chưa có ảnh thì hiển thị chữ cái đầu của tên), đi kèm menu dropdown tiện ích (Thông tin cá nhân, Đơn hàng, Đăng xuất).
* 🔄 **Quy Trình Khôi Phục Mật Khẩu 3 Bước Chuẩn Enterprise:**
  1. `/forgot-password`: Gửi yêu cầu xác thực qua SMS / Email.
  2. `/verify-otp`: Giao diện nhập mã OTP 6 ô độc lập, hỗ trợ paste mã tự động, auto-focus và đồng hồ đếm ngược 60 giây.
  3. `/reset-password`: Thiết lập mật khẩu mới đi kèm thước đo độ mạnh mật khẩu (Password Strength Meter).

---

### 3.3. Phân Hệ Điều Hành & Quản Trị Showroom B2B (Management Portal)

* 📊 **Dashboard Điều Hành KPI (`/dashboard`):**
  * Thống kê trực quan: Doanh thu tháng, tổng đơn cọc, xe đã bàn giao, giá trị tồn kho.
  * Biểu đồ xu hướng tăng trưởng và bảng xếp hạng Top các mẫu xe bán chạy nhất trong tháng.
* 🚘 **Quản Lý Kho Xe Tập Trung (`/cars`):**
  * Xem danh sách dạng lưới thẻ (Card Grid) hoặc bảng chi tiết (Table View).
  * Bộ lọc tồn kho theo trạng thái: *Sẵn sàng giao ngay, Đã nhận cọc, Đã bàn giao, Đang kiểm định 176 điểm*.
  * Tích hợp tìm kiếm nhanh, xuất dữ liệu CSV và làm mới dữ liệu tại chỗ.
* 📝 **Hợp Đồng & Xử Lý Đơn Đặt Cọc (`/orders`):**
  * Quản lý trạng thái đơn hàng: Chờ duyệt, Đã cọc (50M - 100M), Chờ thanh toán đủ, Đã giao xe.
  * Xem chi tiết phương thức thanh toán, hỗ trợ thẩm định hồ sơ vay trả góp ngân hàng lên đến 85%.
* 👥 **CRM Quản Trị Khách Hàng (`/customers`):**
  * Quản lý danh sách khách hàng, phân loại nguồn khách (Website, Lái thử, Hotline).
  * Lưu trữ lịch sử giao dịch và nhu cầu quan tâm xe của từng khách.
* 🛡️ **Quản Trị Người Dùng & Phân Quyền (`/users`):**
  * Phân chia vai trò rõ ràng: Admin (Toàn quyền), Manager (Quản lý chi nhánh), Staff (Nhân viên tư vấn).
  * Thao tác cấp phát quyền hạn, kích hoạt hoặc khóa tài khoản nhân sự nghỉ việc.
* ⚙️ **Cài Đặt Hệ Thống (`/settings`):** Cấu hình thông tin showroom, chính sách bảo hành và bảo trì hệ thống.

---

## 4. 🛠️ Kiến Trúc & Công Nghệ Cốt Lõi (Tech Stack & Architecture)

Dự án được xây dựng trên nền tảng công nghệ Frontend hiện đại, tối ưu cho hiệu năng và độ ổn định:

| Công Nghệ | Phiên Bản | Lý Do Lựa Chọn (Góc Nhìn Doanh Nghiệp) |
| :--- | :--- | :--- |
| **React** | `v19.0.0` | Thư viện UI mạnh mẽ nhất, tận dụng các cải tiến mới về render hiệu năng cao và transitions. |
| **TypeScript** | `v5.9.3` | **Strict Mode 100%**: Định nghĩa chặt chẽ Schema dữ liệu (`Car`, `Order`, `Customer`, `User`), ngăn ngừa hoàn toàn các lỗi `undefined` hoặc `type mismatch` tại runtime. |
| **Vite** | `v6.0.0` | Build tool thế hệ mới với tốc độ Hot Reload (HMR) tính bằng mili-giây, tối ưu hóa bundle khi deploy production. |
| **Tailwind CSS** | `v3.4.1` | Công cụ styling tối ưu, loại bỏ hoàn toàn CSS thừa, dễ dàng chuẩn hóa Design Tokens cho toàn dự án. |
| **Zustand** | `v5.0.0` | Quản lý State toàn cục cực nhẹ (~1KB), không rườm rà boilerplate như Redux, hỗ trợ lưu trữ trạng thái phiên làm việc (`persist`). |
| **React Router** | `v7.0.0` | Quản lý điều hướng Single-Page Application (SPA), tích hợp Route Guards bảo vệ các trang quản trị. |
| **Axios** | `v1.7.9` | Xử lý HTTP Client với hệ thống Interceptors tự động đính kèm Token và xử lý lỗi phiên đăng nhập tập trung. |
| **Lucide React** | `v1.16.0` | Bộ icon SVG nhẹ, đồng bộ và chuyên nghiệp cho toàn bộ giao diện. |

---

## 5. 💎 Những Điểm Sáng Kỹ Thuật Doanh Nghiệp Quan Tâm (Technical Highlights)

Khi nhà tuyển dụng hoặc chuyên gia kỹ thuật đánh giá source code, đây là **5 điểm cộng vượt trội**:

### ① Chuẩn Hóa Design System (Unified 10px Radius)
* Toàn bộ hệ thống giao diện từ nút bấm (`button`), ô tìm kiếm (`input`), thẻ xe (`card`), cửa sổ popup (`modal`) cho đến bảng dữ liệu (`table`) đều được chuẩn hóa chính xác **bo góc 10px (`rounded-[10px]`)**.
* Bảng màu chủ đạo theo phong cách **Titanium & Deep Slate**, tạo cảm giác sang trọng, cao cấp, không bị rối mắt.

### ② Cơ Chế Bảo Mật 2 Tầng (Two-Tier Role-Based Access Control - RBAC)
* **Tầng 1 (Route Level):** Sử dụng `ProtectedRoute` và `RoleGuard` để kiểm tra phân quyền ngay tại URL. Nếu người dùng thường (`role = user`) cố tình gõ link `/dashboard` hoặc `/users`, hệ thống sẽ chặn đứng và chuyển hướng về trang an toàn.
* **Tầng 2 (Component Level):** Sử dụng hàm kiểm tra quyền hạn `hasPermission()` để ẩn/hiện các nút thao tác nhạy cảm (như *"Xóa xe"*, *"Phê duyệt cọc"*, *"Khóa người dùng"*).

### ③ Tối Ưu Hiệu Năng & Code Splitting (Performance)
* Ứng dụng kỹ thuật **Lazy Loading (`React.lazy` + `Suspense`)** để phân tách các trang quản trị nặng thành các bundle nhỏ riêng biệt.
* Trang chủ Showroom B2C ban đầu chỉ tải phần tài nguyên cần thiết, giúp tốc độ tải trang đạt chuẩn **Google Core Web Vitals** (< 1.2s).

### ④ Quản Trị State Tinh Gọn (State Management)
* Sử dụng **Zustand** để chia tách store độc lập theo từng nghiệp vụ:
  * `useAuthStore`: Quản lý thông tin đăng nhập, vai trò người dùng, token và quyền hạn.
  * `useCarStore`: Quản lý danh sách xe, bộ lọc tìm kiếm và trạng thái tồn kho.

### ⑤ Bảo Mật Mã Nguồn (Security Standards)
* Toàn bộ các file môi trường chứa khóa bí mật (`.env`, `.env.local`) đều được cấu hình trong `.gitignore` nghiêm ngặt, đảm bảo không bao giờ bị lộ lọt khi đưa lên GitHub. Chỉ cung cấp `.env.example` làm mẫu cấu hình.

---

## 6. 📁 Cấu Trúc Thư Mục Chuẩn Doanh Nghiệp (Directory Tree)

Dự án tổ chức theo mô hình **Feature-Driven Architecture** (chia theo từng miền nghiệp vụ):

```
client/
├── public/                 # Tài nguyên tĩnh (Favicon, Logo, Assets)
├── src/
│   ├── components/         # Reusable UI Components
│   │   ├── Navbar.tsx      # Thanh điều hướng Showroom (Header + User Avatar)
│   │   ├── Footer.tsx      # Chân trang thông tin liên hệ và chi nhánh
│   │   ├── SearchModal.tsx # Hộp thoại tìm kiếm thông minh Spotlight (Ctrl+K)
│   │   └── ProtectedRoute.tsx # Route Guard bảo vệ trang quản trị
│   ├── features/           # Các phân hệ nghiệp vụ độc lập (Feature Modules)
│   │   ├── auth/           # Đăng nhập, Đăng ký, Pipeline OTP 3 bước
│   │   ├── home/           # Trang chủ, Mua xe, Bán xe, Định giá AI
│   │   ├── cars/           # Chi tiết xe VDP, Quản lý kho xe Showroom
│   │   ├── dashboard/      # Dashboard điều hành chỉ số KPI
│   │   ├── orders/         # Quản lý hợp đồng & đơn đặt cọc
│   │   ├── customers/      # CRM quản lý hồ sơ khách hàng
│   │   ├── users/          # Quản trị người dùng & phân quyền nội bộ
│   │   ├── news/           # Tạp chí ô tô & bài viết đánh giá xe
│   │   ├── test-drive/     # Đặt lịch lái thử trực tuyến
│   │   └── settings/       # Cấu hình đại lý & thông số hệ thống
│   ├── routes/             # Định tuyến URL & cấu hình phân quyền RBAC
│   ├── stores/             # Zustand Global State Stores
│   ├── services/           # Axios Interceptor & kết nối Backend API
│   ├── types/              # Khai báo TypeScript Interfaces & Types
│   ├── App.tsx             # Root Component chứa Router Provider
│   ├── main.tsx            # Entry Point khởi chạy React 19
│   └── index.css           # Tailwind Directives & Custom Typography
├── .gitignore              # Bỏ qua node_modules, build artifacts và file .env
├── package.json            # Danh sách dependencies & scripts chạy dự án
├── tsconfig.json           # Cấu hình TypeScript Strict Mode
└── vite.config.ts          # Cấu hình Vite Bundler (Proxy & Port 3000)
```

---

## 7. 🔑 Tài Khoản Thử Nghiệm & Phân Quyền (Demo Credentials)

Hệ thống được tích hợp sẵn các tài khoản mẫu tương ứng với từng vai trò để phục vụ việc đánh giá và nghiệm thu tính năng:

| Vai Trò (Role) | Email Đăng Nhập | Mật Khẩu | Trang Được Phép Truy Cập | Mục Đích Thử Nghiệm |
| :--- | :--- | :--- | :--- | :--- |
| **Quản Trị Viên**<br/>*(Admin)* | `admin@carshop.vn` | `Admin@123` | **Toàn bộ hệ thống**<br/>(`/dashboard`, `/cars`, `/orders`, `/users`, `/settings`) | Xem toàn bộ quyền hành cao nhất, quản lý tài khoản nhân viên. |
| **Quản Lý Showroom**<br/>*(Manager)* | `manager@carshop.vn` | `Manager@123` | `/dashboard`, `/cars`, `/orders`, `/customers` | Xem báo cáo KPI, duyệt đơn cọc, quản lý kho xe chi nhánh. |
| **Nhân Viên Bán Hàng**<br/>*(Staff)* | `sales@carshop.vn` | `Staff@123` | `/cars`, `/orders`, `/customers` | Tiếp nhận khách lái thử, tạo hợp đồng bán xe (không xem KPI tổng). |
| **Khách Hàng**<br/>*(User)* | `customer@gmail.com` | `User@123` | **Chỉ phân hệ B2C**<br/>(`/mua-xe`, `/ban-xe`, `/dinh-gia`, `/cars/taycan`) | Đăng nhập sẽ tự động chuyển về trang Mua xe; bị chặn nếu vào `/dashboard`. |

---

## 8. 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án (Getting Started)

### Yêu cầu môi trường
* **Node.js**: Phiên bản `18.x` hoặc `20.x` trở lên
* **npm**: Phiên bản `9.x` trở lên

### Các bước cài đặt

1. **Clone mã nguồn từ GitHub:**
   ```bash
   git clone https://github.com/your-username/CarShop.git
   cd CarShop/client
   ```

2. **Cài đặt thư viện dependencies:**
   ```bash
   npm install
   ```

3. **Cấu hình file môi trường:**
   Tạo file `.env` dựa trên mẫu `.env.example`:
   ```bash
   cp .env.example .env
   ```
   *(Mặc định trỏ API về `http://localhost:5000/api`)*

4. **Khởi chạy ứng dụng ở chế độ Development:**
   ```bash
   npm run dev
   ```
   Truy cập trên trình duyệt tại địa chỉ: **`http://localhost:3000`**

5. **Kiểm tra biên dịch Production (Build Test):**
   ```bash
   npm run build
   ```
   Lệnh này sẽ chạy trình kiểm tra lỗi kiểu dữ liệu TypeScript (`tsc -b`) và đóng gói mã nguồn tối ưu vào thư mục `dist/`.

---

## 👨‍💻 Tác Giả & Liên Hệ

* **Dự án:** CarShop Enterprise Automotive Ecosystem
* **Chịu trách nhiệm kỹ thuật Frontend:** Hien & CarShop Engineering Team
* **Tiêu chuẩn chất lượng:** Clean Code • Type-Safe • Modular Architecture • High Performance UI

---
*(Tài liệu được cập nhật và đồng bộ tự động với phiên bản mã nguồn mới nhất).*
