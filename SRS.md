# Software Requirements Specification (SRS)

## Nhà Chung — Cổng thông tin quản lý chung cư

**Phiên bản:** 1.0  
**Ngày tạo:** 25/05/2026  
**Trạng thái:** Draft  
**Phân loại:** Internal  

---

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Mô tả tổng quan hệ thống](#2-mô-tả-tổng-quan-hệ-thống)
3. [Người dùng và vai trò](#3-người-dùng-và-vai-trò)
4. [Yêu cầu chức năng](#4-yêu-cầu-chức-năng)
   - 4.1 [Trang chủ & Marketing (Public)](#41-trang-chủ--marketing-public)
   - 4.2 [Xác thực người dùng](#42-xác-thực-người-dùng)
   - 4.3 [Dashboard — Trang tổng hợp](#43-dashboard--trang-tổng-hợp)
   - 4.4 [Thông báo](#44-thông-báo)
   - 4.5 [Căn hộ của tôi](#45-căn-hộ-của-tôi)
   - 4.6 [Thành viên gia đình](#46-thành-viên-gia-đình)
   - 4.7 [Tổng quan tài chính](#47-tổng-quan-tài-chính)
   - 4.8 [Báo cáo thu chi](#48-báo-cáo-thu-chi)
   - 4.9 [Quỹ bảo trì](#49-quỹ-bảo-trì)
   - 4.10 [Vận hành & Bảo trì](#410-vận-hành--bảo-trì)
   - 4.11 [KPI Ban quản trị](#411-kpi-ban-quản-trị)
   - 4.12 [Báo cáo định kỳ](#412-báo-cáo-định-kỳ)
   - 4.13 [Lịch sử & Lưu trữ](#413-lịch-sử--lưu-trữ)
   - 4.14 [Tin tức cộng đồng](#414-tin-tức-cộng-đồng)
   - 4.15 [Góp ý / Phản ánh](#415-góp-ý--phản-ánh)
   - 4.16 [Kho tài liệu](#416-kho-tài-liệu)
   - 4.17 [AI Assistant](#417-ai-assistant)
   - 4.18 [Hồ sơ cá nhân](#418-hồ-sơ-cá-nhân)
   - 4.19 [Cài đặt](#419-cài-đặt)
5. [Yêu cầu phi chức năng](#5-yêu-cầu-phi-chức-năng)
6. [Kiến trúc hệ thống & Giao diện](#6-kiến-trúc-hệ-thống--giao-diện)
7. [Luồng điều hướng](#7-luồng-điều-hướng)
8. [Ràng buộc & Giả định](#8-ràng-buộc--giả-định)
9. [Phụ lục](#9-phụ-lục)

---

## 1. Giới thiệu

### 1.1 Mục đích tài liệu

Tài liệu này mô tả toàn bộ yêu cầu phần mềm (Software Requirements Specification — SRS) cho hệ thống **Nhà Chung**, một cổng thông tin quản lý chung cư dạng SaaS nhằm minh bạch hóa thông tin và nâng cao chất lượng quản lý vận hành cho cư dân và Ban quản trị chung cư.

Tài liệu được xây dựng dựa trên bộ 20 file giao diện HTML đại diện cho toàn bộ các màn hình của hệ thống. Đây là tài liệu tham chiếu chính thức cho đội phát triển, thiết kế, kiểm thử và các bên liên quan.

### 1.2 Phạm vi

Hệ thống **Nhà Chung** bao gồm:

- **Cổng thông tin công khai (Public Portal):** Trang giới thiệu sản phẩm, định giá, tính năng dành cho khách hàng tiềm năng.
- **Cổng cư dân (Resident Portal):** Ứng dụng web dành cho cư dân đang sinh sống, cung cấp đầy đủ các nghiệp vụ quản lý chung cư.
- **Báo cáo minh bạch (Transparency Reports):** Hệ thống báo cáo tài chính, vận hành, bảo trì được công khai với cư dân.

Hệ thống **không** bao gồm: ứng dụng di động native, hệ thống backend/API (nằm ngoài phạm vi tài liệu này), tích hợp cổng thanh toán (mô tả ở mức giao diện người dùng).

### 1.3 Định nghĩa và từ viết tắt

| Thuật ngữ | Định nghĩa |
|---|---|
| **BQT** | Ban Quản Trị chung cư |
| **Cư dân** | Người đang sinh sống tại căn hộ, đã đăng ký tài khoản |
| **Chủ hộ** | Cư dân đại diện sở hữu căn hộ, có quyền quản lý thành viên |
| **Căn hộ** | Đơn vị ở cơ bản trong tòa nhà (Apartment Unit) |
| **Quỹ bảo trì** | Quỹ tài chính dùng cho bảo trì, sửa chữa các hạng mục chung |
| **Work Order** | Phiếu yêu cầu bảo trì / sửa chữa |
| **KPI** | Key Performance Indicator — Chỉ số hiệu suất chính |
| **SRS** | Software Requirements Specification |
| **CCCD** | Căn cước công dân |
| **PCCC** | Phòng cháy chữa cháy |

### 1.4 Tài liệu tham chiếu

- Bộ 20 file thiết kế giao diện HTML của hệ thống Nhà Chung (phiên bản demo)
- Tiêu chuẩn IEEE 830-1998: Recommended Practice for Software Requirements Specifications

---

## 2. Mô tả tổng quan hệ thống

### 2.1 Định vị sản phẩm

**Nhà Chung** là nền tảng SaaS quản lý chung cư thế hệ mới với thông điệp cốt lõi: *"Minh bạch thông tin — Vững niềm tin cư dân"*. Hệ thống giải quyết vấn đề thiếu minh bạch trong quản lý chung cư tại Việt Nam bằng cách số hóa toàn bộ các nghiệp vụ: tài chính, bảo trì, vận hành, truyền thông cộng đồng và quản lý hồ sơ.

### 2.2 Các chức năng chính

| Nhóm chức năng | Mô tả |
|---|---|
| **Quản lý cá nhân** | Hồ sơ cá nhân, thông tin căn hộ, thành viên gia đình |
| **Tài chính minh bạch** | Tổng quan tài chính, báo cáo thu chi, quỹ bảo trì |
| **Vận hành** | Bảo trì, vận hành hệ thống, KPI ban quản trị |
| **Truyền thông cộng đồng** | Tin tức, thông báo, góp ý phản ánh |
| **Kho tài liệu** | Quản lý văn bản, tài liệu điện tử, lịch sử lưu trữ |
| **AI Assistant** | Trợ lý ảo hỗ trợ cư dân |
| **Báo cáo** | Báo cáo định kỳ, lịch sử lưu trữ |

### 2.3 Đặc điểm người dùng

- **Nhóm cư dân phổ thông:** Sử dụng các tính năng xem thông tin, thanh toán, gửi yêu cầu. Trình độ kỹ thuật: từ cơ bản đến trung bình.
- **Nhóm Ban quản trị:** Sử dụng đầy đủ tính năng bao gồm báo cáo KPI, quản lý vận hành. Trình độ kỹ thuật: trung bình đến cao.
- **Khách hàng tiềm năng (Public):** Chỉ xem trang marketing. Không cần đăng nhập.

### 2.4 Môi trường vận hành

- **Nền tảng:** Web application, responsive (desktop, tablet, mobile)
- **Trình duyệt hỗ trợ:** Chrome, Safari, Firefox, Edge (phiên bản mới nhất)
- **Ngôn ngữ giao diện:** Tiếng Việt (chính), có thể mở rộng đa ngôn ngữ
- **Màn hình tối thiểu:** 320px (mobile) — 1440px (desktop)

---

## 3. Người dùng và vai trò

### 3.1 Sơ đồ vai trò

```
Hệ thống Nhà Chung
├── Khách (Guest/Public)
│   └── Xem trang marketing, đăng ký dùng thử
│
├── Cư dân (Resident)
│   ├── Chủ hộ (Primary Resident)
│   │   ├── Quản lý thành viên gia đình
│   │   ├── Quản lý thông tin căn hộ
│   │   └── Toàn bộ quyền cư dân thông thường
│   └── Thành viên hộ gia đình (Secondary Resident)
│       ├── Xem thông tin cá nhân
│       └── Quyền hạn chế (xem, không quản lý)
│
└── Ban Quản Trị (Management Board)
    ├── Quản lý toàn bộ tài chính, vận hành
    ├── Đăng tin tức, thông báo
    ├── Phê duyệt/xử lý yêu cầu bảo trì
    ├── Xem báo cáo KPI
    └── Quản lý tài liệu
```

### 3.2 Quyền hạn theo vai trò

| Chức năng | Khách | Cư dân | Chủ hộ | BQT |
|---|:---:|:---:|:---:|:---:|
| Xem trang marketing | ✓ | ✓ | ✓ | ✓ |
| Đăng nhập / Đăng ký | ✓ | ✓ | ✓ | ✓ |
| Dashboard | — | ✓ | ✓ | ✓ |
| Thông tin căn hộ | — | Xem | Xem + Sửa | ✓ |
| Thành viên gia đình | — | Xem | Xem + Quản lý | ✓ |
| Tài chính (xem) | — | ✓ | ✓ | ✓ |
| Tài chính (quản lý) | — | — | — | ✓ |
| Vận hành & Bảo trì | — | Xem | Xem + Yêu cầu | ✓ |
| KPI Ban quản trị | — | Xem | Xem | ✓ |
| Tin tức (đọc) | — | ✓ | ✓ | ✓ |
| Tin tức (đăng) | — | — | — | ✓ |
| Góp ý / Phản ánh | — | ✓ | ✓ | Xử lý |
| Kho tài liệu | — | ✓ | ✓ | ✓ + Upload |
| AI Assistant | — | ✓ | ✓ | ✓ |
| Hồ sơ cá nhân | — | ✓ | ✓ | ✓ |
| Cài đặt | — | ✓ | ✓ | ✓ |

---

## 4. Yêu cầu chức năng

---

### 4.1 Trang chủ & Marketing (Public)

**Module:** `Home.html`  
**Mục đích:** Giới thiệu sản phẩm đến khách hàng tiềm năng, chuyển đổi sang đăng ký dùng thử.

#### 4.1.1 Navigation Bar

| ID | Yêu cầu |
|---|---|
| F-HOME-001 | Hiển thị logo Nhà Chung ở góc trái. |
| F-HOME-002 | Thanh điều hướng gồm các liên kết: Giải pháp, Tính năng, AI Chatbot, Bảng giá, Tài nguyên, Demo. |
| F-HOME-003 | Nút "Đăng nhập" (outline) và "Tạo miễn phí" (primary) ở góc phải. |
| F-HOME-004 | Responsive: ẩn nav links ở màn hình ≤768px, hiển thị nút hamburger. |
| F-HOME-005 | Hamburger menu mở full-screen overlay với các nav link và action buttons. |

#### 4.1.2 Hero Section

| ID | Yêu cầu |
|---|---|
| F-HOME-010 | Hiển thị headline, subtext mô tả giá trị sản phẩm. |
| F-HOME-011 | Hai nút CTA: "Bắt đầu miễn phí" (primary) và "Xem demo" (outline). |
| F-HOME-012 | Hình ảnh minh họa sản phẩm bên phải hero. |

#### 4.1.3 Stats Bar

| ID | Yêu cầu |
|---|---|
| F-HOME-020 | Thanh thống kê nhanh hiển thị các con số nổi bật của nền tảng (số chung cư, số cư dân, v.v.). |

#### 4.1.4 Các Section nội dung

| ID | Yêu cầu |
|---|---|
| F-HOME-030 | Section "Giải pháp" — hiển thị danh sách dịch vụ dạng card cuộn ngang. |
| F-HOME-031 | Section "Tính năng" — grid tính năng (3 cột desktop, 2 cột tablet, 1 cột mobile). |
| F-HOME-032 | Section "Đối tác" — logo strip các đối tác, cuộn ngang trên mobile. |
| F-HOME-033 | Section "Bảng giá" — hiển thị các gói giá với nút đăng ký. |
| F-HOME-034 | Section CTA cuối trang — banner gradient + headline + nút hành động. |

#### 4.1.5 Footer

| ID | Yêu cầu |
|---|---|
| F-HOME-040 | Footer 4 cột: logo + mô tả, và 3 cột liên kết (Sản phẩm, Công ty, Hỗ trợ). |
| F-HOME-041 | Form đăng ký nhận bản tin: input email + nút "Đăng ký". |
| F-HOME-042 | Biểu tượng mạng xã hội và thông tin bản quyền. |
| F-HOME-043 | Responsive hoàn toàn với breakpoints: 1200px, 1024px, 768px, 480px. |

---

### 4.2 Xác thực người dùng

**Modules:** `login.html`, `signup.html`

#### 4.2.1 Đăng nhập

| ID | Yêu cầu |
|---|---|
| F-AUTH-001 | Form đăng nhập gồm: Email/Số điện thoại, Mật khẩu, nút "Đăng nhập". |
| F-AUTH-002 | Trường mật khẩu có nút toggle hiển thị/ẩn mật khẩu (icon mắt). |
| F-AUTH-003 | Liên kết "Quên mật khẩu?" dẫn đến luồng khôi phục mật khẩu. |
| F-AUTH-004 | Liên kết chuyển sang trang đăng ký nếu chưa có tài khoản. |
| F-AUTH-005 | Khung hỗ trợ: hiển thị các kênh liên hệ hỗ trợ (hotline, chat). |
| F-AUTH-006 | Layout 2 cột: form bên trái, hình ảnh minh họa bên phải. Ẩn cột phải ở màn hình ≤860px. |
| F-AUTH-007 | Validate: email/SĐT đúng định dạng, mật khẩu không được để trống. |
| F-AUTH-008 | Hiển thị thông báo lỗi khi đăng nhập thất bại (sai thông tin, tài khoản bị khóa). |

#### 4.2.2 Đăng ký

| ID | Yêu cầu |
|---|---|
| F-AUTH-010 | Form đăng ký tài khoản mới gồm thông tin cơ bản: Họ tên, Email, SĐT, Mật khẩu, Xác nhận mật khẩu. |
| F-AUTH-011 | Liên kết mã căn hộ hoặc mã mời (invitation code) để kết nối với tòa nhà. |
| F-AUTH-012 | Checkbox đồng ý Điều khoản sử dụng và Chính sách bảo mật. |
| F-AUTH-013 | Liên kết quay lại trang đăng nhập. |
| F-AUTH-014 | Validate toàn bộ trường bắt buộc trước khi submit. |

---

### 4.3 Dashboard — Trang tổng hợp

**Module:** `dashboard.html`  
**Mục đích:** Cung cấp cái nhìn tổng quan tức thì cho cư dân về các thông tin quan trọng.

#### 4.3.1 Header & Topbar (dùng chung toàn hệ thống)

| ID | Yêu cầu |
|---|---|
| F-DASH-001 | Topbar hiển thị: dropdown chọn tòa nhà đang xem, ô tìm kiếm toàn hệ thống, biểu tượng thông báo có badge số lượng chưa đọc. |
| F-DASH-002 | Dropdown thông báo nhanh: danh sách thông báo gần nhất, nhóm theo ngày, liên kết "Xem tất cả". |
| F-DASH-003 | User pill (avatar + tên): dropdown gồm Hồ sơ cá nhân, Cài đặt, Đăng xuất. |
| F-DASH-004 | Dropdown chọn tòa nhà: hiển thị danh sách tòa nhà của cư dân (mục "Của tôi") và tòa nhà có thể khám phá (mục "Khám phá"). |

#### 4.3.2 Sidebar điều hướng (dùng chung toàn hệ thống)

| ID | Yêu cầu |
|---|---|
| F-DASH-010 | Sidebar cố định bên trái, rộng 268px, hiển thị đầy đủ trên desktop. |
| F-DASH-011 | Logo Nhà Chung ở đầu sidebar. |
| F-DASH-012 | Nhóm điều hướng **Main**: Dashboard, Thông báo (badge), Kho tài liệu, Góp ý / Phản ánh, Tin tức cộng đồng, AI Assistant. |
| F-DASH-013 | Nhóm điều hướng **Báo cáo minh bạch**: Tổng quan tài chính, Báo cáo thu chi, Quỹ bảo trì, Vận hành & bảo trì, KPI Ban quản trị, Báo cáo định kỳ, Lịch sử & lưu trữ. |
| F-DASH-014 | Nhóm điều hướng **Cá nhân**: Hồ sơ cá nhân, Thành viên gia đình, Căn hộ của tôi, Cài đặt. |
| F-DASH-015 | Mục đang active được highlight bằng màu primary (tím). |

#### 4.3.3 Hero Banner Dashboard

| ID | Yêu cầu |
|---|---|
| F-DASH-020 | Banner chào mừng có gradient, hiển thị: lời chào theo thời gian (sáng/chiều/tối), ngày tháng hiện tại. |
| F-DASH-021 | Meta pills: mã căn hộ, tên tòa nhà. |
| F-DASH-022 | Pill số thông báo chưa đọc. |
| F-DASH-023 | Widget thời tiết (card nổi bên phải): thành phố, nhiệt độ, mô tả, nút xem dự báo. |

#### 4.3.4 Nội dung Dashboard

| ID | Yêu cầu |
|---|---|
| F-DASH-030 | Layout 2 cột: cột chính (flex 1) và cột phụ (331px). |
| F-DASH-031 | Cột chính: hiển thị các khoản phí sắp đến hạn, thông báo gần nhất, sự kiện sắp tới. |
| F-DASH-032 | Cột phụ: quick-action links, nhiệm vụ/task sắp tới, tóm tắt tài chính mini. |
| F-DASH-033 | Tiêu đề mỗi section có liên kết "Xem tất cả" dẫn đến trang tương ứng. |

---

### 4.4 Thông báo

**Module:** `notification.html`

| ID | Yêu cầu |
|---|---|
| F-NOTI-001 | Trang trung tâm thông báo đầy đủ, hiển thị tất cả thông báo của cư dân. |
| F-NOTI-002 | Phân nhóm thông báo theo thời gian: Hôm nay, Hôm qua, Tuần này. |
| F-NOTI-003 | Mỗi thông báo hiển thị: icon phân loại (nền màu), tiêu đề, nguồn phát, thời gian. |
| F-NOTI-004 | Thông báo chưa đọc có dấu chấm xanh phân biệt. |
| F-NOTI-005 | Tabs lọc theo loại: Tất cả, Quản lý, Sự kiện, Tài chính, Hệ thống. |
| F-NOTI-006 | Nút "Đánh dấu tất cả đã đọc". |
| F-NOTI-007 | Badge số thông báo chưa đọc hiển thị trên icon thông báo ở topbar. |

---

### 4.5 Căn hộ của tôi

**Module:** `can-ho-cua-toi.html`  
**Mục đích:** Xem và quản lý thông tin chi tiết căn hộ đang sinh sống.

#### 4.5.1 Apartment Hero Banner

| ID | Yêu cầu |
|---|---|
| F-APT-001 | Banner gradient hiển thị: tên tòa nhà/block/tầng, mã căn hộ lớn, tên dự án. |
| F-APT-002 | Tags thông tin nhanh: diện tích (m²), số phòng ngủ/WC, hướng, loại sở hữu. |
| F-APT-003 | Chip trạng thái căn hộ: "Đang hoạt động" (xanh). |
| F-APT-004 | Nút "Xem mặt bằng" dẫn đến floor plan. |
| F-APT-005 | Nút "Tải hồ sơ" và "Cập nhật thông tin" ở page header. |

#### 4.5.2 Thống kê nhanh

| ID | Yêu cầu |
|---|---|
| F-APT-010 | 4 card thống kê: Diện tích thông thủy (m²), Vị trí (tầng, tháp, số căn), Loại căn hộ (số PN/WC/ban công), Ngày hợp đồng. |

#### 4.5.3 Thông tin chi tiết

| ID | Yêu cầu |
|---|---|
| F-APT-020 | Lưới thông tin căn hộ 2 cột: các trường thông tin đầy đủ (diện tích, địa chỉ, hướng, loại sở hữu, v.v.). |
| F-APT-021 | Bảng phí dịch vụ: tên phí, chu kỳ, số tiền, trạng thái thanh toán (Đã thanh toán / Chờ thanh toán). |
| F-APT-022 | Bảng lịch sử thanh toán: mô tả giao dịch, ngày, số tiền, trạng thái. |

#### 4.5.4 Sidebar căn hộ

| ID | Yêu cầu |
|---|---|
| F-APT-030 | Card cư dân: avatar, tên, mã căn hộ, mã QR, chip "Đang hoạt động". |
| F-APT-031 | Quick links: Báo cáo sự cố, Lịch sử thanh toán, Tài liệu, Yêu cầu bảo trì. |
| F-APT-032 | Hiển thị mã QR dành cho định danh căn hộ/cư dân. |

---

### 4.6 Thành viên gia đình

**Module:** `thanh-vien-gia-dinh.html`  
**Mục đích:** Quản lý hồ sơ tất cả thành viên sinh sống trong căn hộ.

#### 4.6.1 Thống kê

| ID | Yêu cầu |
|---|---|
| F-FAM-001 | 4 card thống kê: Tổng thành viên (số hiện tại / tổng slot), Đã xác minh (số CCCD hợp lệ), Chờ xác minh (cần bổ sung giấy tờ), Ngày đăng ký hộ. |

#### 4.6.2 Danh sách thành viên

| ID | Yêu cầu |
|---|---|
| F-FAM-010 | Grid 3 cột, tối đa 6 slot (giới hạn 6 thành viên/căn hộ). |
| F-FAM-011 | Card thành viên hiển thị: avatar/initials, họ tên, quan hệ + giới tính + tuổi, status pill (Đã xác minh / Chờ xác minh / Tạm trú), thông tin cá nhân (CCCD, ngày sinh, nghề nghiệp, liên hệ), tài liệu đã nộp (CCCD/giấy khai sinh/hộ chiếu), phương tiện (xe máy/ô tô). |
| F-FAM-012 | Tag "Chủ hộ" được hiển thị nổi bật trên card chủ hộ. |
| F-FAM-013 | Mỗi card có 2 nút hành động: Chỉnh sửa, Xem chi tiết. |
| F-FAM-014 | Slot trống: hiển thị dạng card nét đứt với icon "+" và text "Thêm thành viên mới". Click mở form thêm mới. |

#### 4.6.3 Thêm / Chỉnh sửa thành viên

| ID | Yêu cầu |
|---|---|
| F-FAM-020 | Nút "+ Thêm thành viên" ở header dẫn đến form thêm mới. |
| F-FAM-021 | Form thêm thành viên gồm: Họ tên, Quan hệ với chủ hộ, CCCD/CMND, Ngày sinh, Giới tính, Nghề nghiệp, SĐT, upload giấy tờ. |
| F-FAM-022 | Thông báo chính sách: giới hạn tối đa 6 thành viên mỗi căn hộ. |

---

### 4.7 Tổng quan tài chính

**Module:** `tong-quan-tai-chinh.html`  
**Mục đích:** Cung cấp báo cáo tổng quan tài chính toàn tòa nhà theo dạng minh bạch với cư dân.

#### 4.7.1 KPI Tài chính

| ID | Yêu cầu |
|---|---|
| F-FIN-001 | 4 card KPI: Tổng thu, Tổng chi, Thặng dư/Thâm hụt, Tỷ lệ thu tiền. |
| F-FIN-002 | Mỗi card hiển thị: icon (nền màu), nhãn, giá trị lớn (font Manrope), mũi tên xu hướng + badge % thay đổi so với kỳ trước. |

#### 4.7.2 Biểu đồ

| ID | Yêu cầu |
|---|---|
| F-FIN-010 | Biểu đồ cột nhóm (Bar chart): So sánh Thu vs Chi theo từng tháng trong năm. |
| F-FIN-011 | Biểu đồ có: dropdown chọn kỳ, chú thích, tooltip khi hover vào cột. |
| F-FIN-012 | Biểu đồ tròn/donut "Cơ cấu chi phí": phân tích chi phí theo danh mục, với chú thích tên + % + số tiền. |

#### 4.7.3 Tóm tắt & Báo cáo

| ID | Yêu cầu |
|---|---|
| F-FIN-020 | Card tóm tắt Thu: giá trị lớn + xu hướng %, phân tích theo dòng (Phí quản lý / Phí dịch vụ / Parking / Khác). |
| F-FIN-021 | Card tóm tắt Chi: danh sách chỉ số (icon + tên + giá trị + trend). |
| F-FIN-022 | Card báo cáo nổi bật: badge PDF đỏ, tên file, thông tin (kỳ, số trang, dung lượng), link tải xuống. |

---

### 4.8 Báo cáo thu chi

**Module:** `bao-cao-thu-chi.html`  
**Mục đích:** Báo cáo chi tiết thu chi tài chính với phân tích AI.

#### 4.8.1 KPI & AI Banner

| ID | Yêu cầu |
|---|---|
| F-INC-001 | 4 card KPI: Tổng thu, Tổng chi, Thặng dư ròng, Danh mục chi lớn nhất. |
| F-INC-002 | Banner AI phân tích: gradient tím, icon AI, nhãn "AI PHÂN TÍCH", văn bản tóm tắt tự động với số liệu được highlight (xanh = tích cực / đỏ = tiêu cực), nút "Xem chi tiết phân tích". |

#### 4.8.2 Biểu đồ kết hợp

| ID | Yêu cầu |
|---|---|
| F-INC-010 | Biểu đồ Bar + Line kết hợp: cột thu/chi, đường thặng dư. Có chú thích và tooltip. |
| F-INC-011 | Biểu đồ donut phân tích chi phí theo danh mục (giống 4.7). |

#### 4.8.3 Bảng phân tích chi tiết

| ID | Yêu cầu |
|---|---|
| F-INC-020 | Bảng phân tích Thu: tên danh mục + mô tả phụ / thanh tiến trình / số tiền + badge thay đổi %. |
| F-INC-021 | Bảng phân tích Chi: cấu trúc tương tự bảng phân tích Thu. |

#### 4.8.4 Giao dịch gần nhất

| ID | Yêu cầu |
|---|---|
| F-INC-030 | Card toàn chiều rộng: danh sách giao dịch gần nhất (dạng bảng), liên kết "Xem tất cả". |
| F-INC-031 | Nút Export và Download PDF ở page header. |

---

### 4.9 Quỹ bảo trì

**Module:** `quy-bao-tri.html`  
**Mục đích:** Theo dõi số dư, thu chi và kế hoạch quỹ bảo trì tòa nhà.

#### 4.9.1 KPI Quỹ

| ID | Yêu cầu |
|---|---|
| F-FUND-001 | 4 card KPI: Số dư quỹ hiện tại, Tổng thu năm nay, Tỷ lệ thu (%), Số lượng khoản giải ngân đang chờ. |

#### 4.9.2 Biểu đồ xu hướng

| ID | Yêu cầu |
|---|---|
| F-FUND-010 | Biểu đồ đường (area chart): xu hướng số dư quỹ qua 12 tháng, có đường dự báo (nét đứt), tô màu vùng. |
| F-FUND-011 | Card thông tin quỹ: ngày thành lập, cơ sở pháp lý, ngân hàng quản lý, lãi suất, thanh tiến trình tỷ lệ thu. |

#### 4.9.3 Bảng chi tiêu & Kế hoạch

| ID | Yêu cầu |
|---|---|
| F-FUND-020 | Bảng chi tiêu: tên hạng mục / nhà thầu / số tiền (màu đỏ, nổi bật) / badge trạng thái (Hoàn thành / Đã duyệt / Chờ duyệt / Kế hoạch). |
| F-FUND-021 | Danh sách kế hoạch bảo trì dạng timeline: chấm chỉ thị (đặc = đã làm, rỗng xanh = kế hoạch, rỗng xám = dự kiến), tên hạng mục, ngày dự kiến, nhà thầu, kinh phí. |

#### 4.9.4 Tỷ lệ thu theo block

| ID | Yêu cầu |
|---|---|
| F-FUND-030 | Grid 3 cột: mỗi block/tháp có thanh tiến trình, % thu, số căn chưa đóng. |

---

### 4.10 Vận hành & Bảo trì

**Module:** `van-hanh-bao-tri.html`  
**Mục đích:** Quản lý phiếu công việc bảo trì, theo dõi trạng thái hệ thống kỹ thuật tòa nhà.

#### 4.10.1 KPI Vận hành

| ID | Yêu cầu |
|---|---|
| F-OPS-001 | 4 card KPI: Tổng phiếu đang mở, Thời gian phản hồi trung bình (cảnh báo cam), Đã giải quyết tháng này, Quá hạn (nguy hiểm đỏ). |

#### 4.10.2 Phân tích danh mục & Trạng thái hệ thống

| ID | Yêu cầu |
|---|---|
| F-OPS-010 | Card phân tích theo danh mục: từng hàng gồm dot màu + tên danh mục (Điện, Nước, Thang máy, PCCC, HVAC, Dân dụng) + số lượng + % + thanh tiến trình. |
| F-OPS-011 | Card trạng thái hệ thống: danh sách hệ thống kỹ thuật (PCCC, Thang máy, Điện, Nước, CCTV), mỗi mục có icon nền màu, tên, ngày kiểm tra gần nhất, badge trạng thái (OK / Cảnh báo / Nguy hiểm). |

#### 4.10.3 Bảng phiếu công việc (Work Orders)

| ID | Yêu cầu |
|---|---|
| F-OPS-020 | Tabs lọc: Tất cả / Đang mở / Đang xử lý / Đã xong / Quá hạn. Tab active được highlight. |
| F-OPS-021 | Ô tìm kiếm và nút lọc ở góc phải bảng. |
| F-OPS-022 | Bảng 6 cột: ID phiếu + tên công việc / Ngày tạo / Người yêu cầu (avatar + tên) / Danh mục (badge) / Trạng thái (badge màu) / Mức ưu tiên (Cao đỏ / Vừa cam / Thấp xám). |
| F-OPS-023 | Phân trang và hiển thị số lượng bản ghi ở cuối bảng. |

#### 4.10.4 Lịch công việc sắp tới

| ID | Yêu cầu |
|---|---|
| F-OPS-030 | Grid 4 cột theo ngày, cột "Hôm nay" được highlight border/nền primary. |
| F-OPS-031 | Mỗi cột: ngày/tháng, badge số lượng task, danh sách task (chấm + tên + giờ). |

---

### 4.11 KPI Ban quản trị

**Module:** `kpi-ban-quan-tri.html`  
**Mục đích:** Đánh giá hiệu suất hoạt động của Ban quản trị qua hệ thống KPI đa chiều.

#### 4.11.1 Điểm tổng hợp

| ID | Yêu cầu |
|---|---|
| F-KPI-001 | Card điểm chính (gradient indigo): biểu đồ vòng tròn SVG với điểm số ở tâm, tên "Điểm tổng hợp BQT", xếp loại (Xuất sắc/Tốt/Trung bình/Kém), so sánh với kỳ trước. |
| F-KPI-002 | 3 mini card thống kê bên cạnh: icon + badge xu hướng (xanh/đỏ/xám) + giá trị lớn + nhãn. |

#### 4.11.2 Grid KPI theo danh mục

| ID | Yêu cầu |
|---|---|
| F-KPI-010 | 5 card danh mục KPI: Tài chính, Bảo trì, Sự hài lòng, Pháp lý, Vận hành. |
| F-KPI-011 | Mỗi card: icon nền màu, tên danh mục, điểm X/Y (Manrope bold), thanh mini tiến trình. |
| F-KPI-012 | Cards có thể click để xem chi tiết (hover/active state). |

#### 4.11.3 Biểu đồ xu hướng & Bảng chi tiết

| ID | Yêu cầu |
|---|---|
| F-KPI-020 | Biểu đồ đa đường (3 lines): Quý hiện tại / Quý trước / Mục tiêu. Có chú thích, nhãn trục Y. |
| F-KPI-021 | Bảng KPI chi tiết: nhóm theo danh mục (label dot + tên nhóm), từng hàng gồm tên chỉ số + đơn vị / mục tiêu / thực tế / kết quả màu / % đạt + mini bar / badge trạng thái / điểm. |

#### 4.11.4 Đánh giá thành viên BQT

| ID | Yêu cầu |
|---|---|
| F-KPI-030 | Grid 5 cột: mỗi thành viên có avatar initials (nền màu), tên, vai trò, điểm + badge xếp loại. |

---

### 4.12 Báo cáo định kỳ

**Module:** `bao-cao-dinh-ky.html`  
**Mục đích:** Thư viện báo cáo chính thức định kỳ (tháng/quý/năm) dành cho cư dân.

| ID | Yêu cầu |
|---|---|
| F-RPT-001 | Hiển thị danh sách/thư viện các báo cáo định kỳ đã xuất bản. |
| F-RPT-002 | Phân loại báo cáo: Báo cáo tháng, Báo cáo quý, Báo cáo năm. |
| F-RPT-003 | Bộ lọc theo khoảng thời gian và danh mục. |
| F-RPT-004 | Mỗi báo cáo hiển thị: loại file (PDF/Word/Excel) + tên + kỳ báo cáo + ngày xuất bản + dung lượng + nút tải xuống. |
| F-RPT-005 | Nút xuất/tải xuống báo cáo (Download PDF). |

---

### 4.13 Lịch sử & Lưu trữ

**Module:** `lich-su-luu-tru.html`  
**Mục đích:** Kho lưu trữ toàn bộ tài liệu lịch sử, phân theo năm và tháng.

#### 4.13.1 Thống kê kho lưu trữ

| ID | Yêu cầu |
|---|---|
| F-ARC-001 | 4 card thống kê: Tổng số tài liệu, Dung lượng sử dụng (GB), Số năm lưu trữ, thống kê khác. |

#### 4.13.2 Điều hướng & Tìm kiếm

| ID | Yêu cầu |
|---|---|
| F-ARC-010 | Tabs năm (pills): 2024 / 2023 / 2022 / 2021. Active tab được highlight. |
| F-ARC-011 | Ô tìm kiếm toàn văn (full-width) + dropdown lọc danh mục. |

#### 4.13.3 Danh sách tài liệu theo tháng

| ID | Yêu cầu |
|---|---|
| F-ARC-020 | Layout: cột chính (flex 1) + sidebar phải (268px). |
| F-ARC-021 | Cột chính: nhóm theo năm → nhóm theo tháng → bảng tài liệu trong tháng. |
| F-ARC-022 | Mỗi hàng tài liệu 6 cột: badge file (PDF/DOC/XLS màu) + tên / danh mục badge / ngày / dung lượng / lượt tải / nút tải xuống + chia sẻ. |
| F-ARC-023 | Sidebar: thống kê theo danh mục (dot + nhãn + số lượng + mini bar): Tài chính, Vận hành, Bảo mật, BQT, Bảo trì. |

---

### 4.14 Tin tức cộng đồng

**Module:** `tin-tuc-cong-dong.html`  
**Mục đích:** Kênh truyền thông nội bộ giữa BQT và cư dân.

#### 4.14.1 Cấu trúc trang

| ID | Yêu cầu |
|---|---|
| F-NEWS-001 | Nút "Đăng bài viết" ở header (chỉ hiển thị với BQT). |
| F-NEWS-002 | Tabs phân loại: Tất cả / Thông báo / Sự kiện / Góp ý — có badge số lượng. |
| F-NEWS-003 | Thanh lọc: chip phân loại (Tất cả / Thông báo BQT / Sự kiện / An ninh / Tiện ích / Khẩn cấp), nút sắp xếp. |

#### 4.14.2 Bài viết nổi bật

| ID | Yêu cầu |
|---|---|
| F-NEWS-010 | Banner toàn chiều rộng: hình nền gradient, overlay gradient, pills danh mục (có pill "Ghim" màu vàng), tiêu đề bài viết, tên tác giả, ngày đăng, thời gian đọc ước tính. |

#### 4.14.3 Danh sách tin tức

| ID | Yêu cầu |
|---|---|
| F-NEWS-020 | Layout 2 cột: cột chính + aside (300px). |
| F-NEWS-021 | Cột chính: grid 3 cột bài viết. Mỗi card: thumbnail / badge danh mục màu / tiêu đề (giới hạn 2 dòng) / tóm tắt (2 dòng) / footer (tên tác giả + ngày). |
| F-NEWS-022 | Phân trang bên dưới grid. |
| F-NEWS-023 | Aside widget "Chủ đề hot": top 3 bài viết với badge thứ hạng màu (cam/xanh/xanh lá) + tiêu đề + lượt xem. |
| F-NEWS-024 | Aside widget "Sự kiện sắp tới": date box (ngày + tháng) + tên sự kiện + địa điểm + badge (Sắp diễn ra / Hôm nay). |

---

### 4.15 Góp ý / Phản ánh

**Module:** `gop-y-phan-anh.html`  
**Mục đích:** Kênh gửi, theo dõi và xử lý phản ánh/khiếu nại của cư dân.

#### 4.15.1 Danh sách phản ánh

| ID | Yêu cầu |
|---|---|
| F-FBK-001 | Tabs trạng thái: Tất cả / Đang xử lý / Đã giải quyết / Đã đóng — có badge số lượng. |
| F-FBK-002 | Ô tìm kiếm + nút lọc. |
| F-FBK-003 | Cột danh sách (372px): card phản ánh gồm icon danh mục + nhãn danh mục + tiêu đề (2 dòng) + chấm trạng thái + ngày + badge trạng thái. |
| F-FBK-004 | Card đang active (được chọn): nền tím nhạt + border tím. |

#### 4.15.2 Chi tiết phản ánh

| ID | Yêu cầu |
|---|---|
| F-FBK-010 | Cột chi tiết (flex 1): thanh trên (nút quay lại + Follow + menu ···), badge trạng thái, tiêu đề lớn (Manrope), dòng tác giả (avatar + tên + căn hộ + ngày). |
| F-FBK-011 | Nội dung mô tả đầy đủ. |
| F-FBK-012 | Grid ảnh đính kèm với overlay "+N ảnh nữa". |
| F-FBK-013 | Timeline phản hồi: các cập nhật trạng thái và phản hồi từ BQT theo thứ tự thời gian. |
| F-FBK-014 | Ô nhập phản hồi ở cuối (input + nút gửi). |
| F-FBK-015 | Sidebar ngữ cảnh bên phải: thông tin liên quan, thống kê người báo, work order liên kết. |

#### 4.15.3 Gửi phản ánh mới

| ID | Yêu cầu |
|---|---|
| F-FBK-020 | Nút "+ Gửi phản ánh mới" ở header mở form gửi phản ánh. |
| F-FBK-021 | Form gồm: Danh mục, Tiêu đề, Mô tả chi tiết, Upload ảnh/video đính kèm, Mức độ ưu tiên. |

---

### 4.16 Kho tài liệu

**Module:** `kho-tai-lieu.html`  
**Mục đích:** Quản lý và tra cứu tài liệu điện tử của tòa nhà.

#### 4.16.1 Tìm kiếm & Lọc

| ID | Yêu cầu |
|---|---|
| F-DOC-001 | Ô tìm kiếm rộng (height 44px) + nút "Bộ lọc". |
| F-DOC-002 | Nút "Duyệt" và "Upload" (primary) ở page header. |

#### 4.16.2 Thư mục

| ID | Yêu cầu |
|---|---|
| F-DOC-010 | Grid 5 cột thư mục: icon folder nền màu primary-light + tên thư mục + số file. |
| F-DOC-011 | Hover hiệu ứng highlight thư mục. |

#### 4.16.3 Bảng tài liệu

| ID | Yêu cầu |
|---|---|
| F-DOC-020 | Bảng HTML 6 cột: Tên tài liệu (43%) / Danh mục (17%) / Ngày (10%) / Dung lượng (10%) / Lượt xem (10%) / Thao tác (10%). |
| F-DOC-021 | File cell: badge màu (PDF=đỏ, DOCX=xanh dương, XLSX=xanh lá, góc gấp tam giác) + tên file + phần mở rộng. |
| F-DOC-022 | Badge danh mục: pill màu (tím/xanh lá/cam/xanh dương/xám). |
| F-DOC-023 | Nút thao tác: 3 nút 32px (tải xuống, chia sẻ, thêm). |
| F-DOC-024 | Footer bảng: "Hiển thị X/Y tài liệu" + phân trang. |

---

### 4.17 AI Assistant

**Module:** `ai-assistant.html`  
**Mục đích:** Trợ lý ảo thông minh hỗ trợ cư dân giải đáp thắc mắc, tra cứu thông tin.

| ID | Yêu cầu |
|---|---|
| F-AI-001 | Giao diện chat 2 panel: panel trái (lịch sử cuộc hội thoại) + panel phải (cửa sổ chat hiện tại). |
| F-AI-002 | Danh sách lịch sử cuộc trò chuyện ở panel trái, có thể chọn để xem lại. |
| F-AI-003 | Bong bóng chat: tin nhắn user (phải, nền màu) / tin nhắn AI (trái, avatar thương hiệu). |
| F-AI-004 | Thanh nhập ở cuối: input text + nút đính kèm + nút gửi. |
| F-AI-005 | Chip gợi ý nhanh (quick-action): các câu hỏi thường gặp để người dùng click nhanh. |
| F-AI-006 | AI có thể trả lời về: phí dịch vụ, nội quy chung cư, yêu cầu bảo trì, sự kiện, tra cứu tài liệu. |
| F-AI-007 | Nút tạo cuộc trò chuyện mới. |

---

### 4.18 Hồ sơ cá nhân

**Module:** `ho-so-ca-nhan.html`  
**Mục đích:** Quản lý thông tin cá nhân của tài khoản cư dân.

| ID | Yêu cầu |
|---|---|
| F-PROF-001 | Hiển thị ảnh đại diện + nút thay đổi ảnh. |
| F-PROF-002 | Thông tin cá nhân: Họ tên, Ngày sinh, Giới tính, Email, Số điện thoại. |
| F-PROF-003 | Liên kết căn hộ: mã căn hộ, tòa nhà hiện tại. |
| F-PROF-004 | Trạng thái xác minh giấy tờ tùy thân (CCCD). |
| F-PROF-005 | Tài khoản liên kết (mạng xã hội / email). |
| F-PROF-006 | Nút lưu thay đổi thông tin cá nhân. |

---

### 4.19 Cài đặt

**Module:** `cai-dat.html`  
**Mục đích:** Tuỳ chỉnh trải nghiệm và bảo mật tài khoản.

| ID | Yêu cầu |
|---|---|
| F-SET-001 | Cài đặt thông báo: toggle switch cho từng loại thông báo (Email, Push, SMS). |
| F-SET-002 | Cài đặt ngôn ngữ & khu vực: ngôn ngữ giao diện, múi giờ, định dạng ngày tháng. |
| F-SET-003 | Cài đặt quyền riêng tư. |
| F-SET-004 | Bảo mật tài khoản: đổi mật khẩu, bật/tắt xác thực 2 yếu tố (2FA). |
| F-SET-005 | Quản lý thiết bị đã đăng nhập: danh sách thiết bị, nút đăng xuất từng thiết bị. |
| F-SET-006 | Xuất dữ liệu cá nhân. |

---

## 5. Yêu cầu phi chức năng

### 5.1 Hiệu suất (Performance)

| ID | Yêu cầu |
|---|---|
| NFR-PERF-001 | Trang web phải tải trong vòng **< 3 giây** trên kết nối 4G (50 Mbps). |
| NFR-PERF-002 | Thời gian phản hồi API **< 500ms** cho các request thông thường. |
| NFR-PERF-003 | Hệ thống phải xử lý tối thiểu **500 người dùng đồng thời** mà không suy giảm hiệu suất đáng kể. |
| NFR-PERF-004 | Biểu đồ SVG phải render trong vòng **< 200ms** sau khi nhận dữ liệu. |

### 5.2 Bảo mật (Security)

| ID | Yêu cầu |
|---|---|
| NFR-SEC-001 | Toàn bộ giao tiếp client-server phải sử dụng **HTTPS/TLS 1.3**. |
| NFR-SEC-002 | Mật khẩu phải được hash bằng **bcrypt** (min rounds = 12) trước khi lưu trữ. |
| NFR-SEC-003 | Xác thực session bằng **JWT** với thời hạn token access là 15 phút, refresh token 7 ngày. |
| NFR-SEC-004 | Áp dụng **Rate Limiting** trên endpoint đăng nhập: tối đa 5 lần thất bại/15 phút, sau đó khóa tạm thời. |
| NFR-SEC-005 | Toàn bộ input từ người dùng phải được **sanitize và validate** trước khi xử lý (chống XSS, SQL Injection). |
| NFR-SEC-006 | Upload file: chỉ cho phép các định dạng whitelist (PDF, DOCX, XLSX, JPG, PNG, MP4). Giới hạn kích thước tối đa 50MB/file. |
| NFR-SEC-007 | Dữ liệu nhạy cảm (CCCD, thông tin cá nhân) phải được **mã hóa at rest**. |
| NFR-SEC-008 | Hệ thống phải ghi nhật ký đầy đủ (audit log) các hành động quan trọng: đăng nhập, thay đổi thông tin, tải xuống tài liệu. |

### 5.3 Khả dụng (Availability & Reliability)

| ID | Yêu cầu |
|---|---|
| NFR-AVAIL-001 | Uptime tối thiểu **99.5%** (~ 44 giờ downtime/năm). |
| NFR-AVAIL-002 | Hệ thống phải có cơ chế **backup tự động** hàng ngày, lưu giữ tối thiểu 30 ngày. |
| NFR-AVAIL-003 | Recovery Time Objective (RTO) **< 4 giờ**, Recovery Point Objective (RPO) **< 24 giờ**. |

### 5.4 Khả năng bảo trì (Maintainability)

| ID | Yêu cầu |
|---|---|
| NFR-MAINT-001 | Code coverage tối thiểu **70%** cho unit tests. |
| NFR-MAINT-002 | Tài liệu API đầy đủ (OpenAPI/Swagger). |
| NFR-MAINT-003 | Hỗ trợ triển khai **CI/CD pipeline** với tự động test trước khi deploy. |

### 5.5 Khả năng mở rộng (Scalability)

| ID | Yêu cầu |
|---|---|
| NFR-SCALE-001 | Kiến trúc phải hỗ trợ **multi-tenant**: một instance có thể phục vụ nhiều tòa nhà/dự án độc lập. |
| NFR-SCALE-002 | Cơ sở dữ liệu phải hỗ trợ **horizontal sharding** khi số lượng cư dân vượt 100,000. |
| NFR-SCALE-003 | Hỗ trợ **CDN** cho tài sản tĩnh (CSS, fonts, ảnh). |

### 5.6 Khả năng sử dụng (Usability)

| ID | Yêu cầu |
|---|---|
| NFR-UX-001 | Giao diện **responsive** hoàn toàn: desktop (≥1024px), tablet (768–1023px), mobile (320–767px). |
| NFR-UX-002 | Tuân thủ **WCAG 2.1 Level AA** về khả năng tiếp cận (accessibility). |
| NFR-UX-003 | Toàn bộ giao diện sử dụng ngôn ngữ **Tiếng Việt** là mặc định. |
| NFR-UX-004 | Thời gian học sử dụng cơ bản: người dùng mới có thể hoàn thành task cơ bản trong **< 5 phút** không cần hướng dẫn. |

### 5.7 Quốc tế hóa (Localization)

| ID | Yêu cầu |
|---|---|
| NFR-I18N-001 | Kiến trúc hỗ trợ **i18n**: chuỗi văn bản phải được externalize để dễ thêm ngôn ngữ mới. |
| NFR-I18N-002 | Định dạng số: sử dụng dấu chấm phân cách hàng nghìn (`1.000.000`), dấu phẩy thập phân. |
| NFR-I18N-003 | Định dạng ngày: `DD/MM/YYYY`. |

---

## 6. Kiến trúc hệ thống & Giao diện

### 6.1 Design System

Hệ thống sử dụng một design system thống nhất với các token sau:

| Token | Giá trị | Mô tả |
|---|---|---|
| `--primary` | `#4137F9` | Màu chính (Electric Indigo) |
| `--primary-light` | `#F7F5FF` | Nền primary nhạt |
| `--primary-dark` | `#2C0E87` | Primary tối |
| `--success` | `#1C9D5F` | Màu thành công (xanh lá) |
| `--danger` | `#F5222D` | Màu nguy hiểm (đỏ) |
| `--warning` | `#C8761B` | Màu cảnh báo (cam) |
| `--text` | `#272727` | Màu chữ chính |
| `--text-gray` | `#585C7B` | Màu chữ phụ |
| `--border` | `#E2E5F1` | Viền thẻ |
| `--r-card` | `20px` | Border-radius thẻ |
| `--sidebar-w` | `268px` | Chiều rộng sidebar |
| Font chính | Inter | Font thân text |
| Font số | Manrope | Font hiển thị số liệu |

### 6.2 Các pattern UI tái sử dụng

| Pattern | Mô tả |
|---|---|
| **KPI Card** | Icon nền màu + nhãn + giá trị Manrope lớn + badge xu hướng % |
| **Status Badge** | Pill tròn: xanh (đã xong) / cam (chờ) / đỏ (lỗi/nguy hiểm) / xanh dương (đang xử lý) |
| **Dropdown** | `position:fixed; z-index:9999`, animation slide-in (opacity + translateY), đóng khi click ngoài |
| **Chart (SVG inline)** | Vẽ SVG thuần (không dùng thư viện), label tuyệt đối, tooltip card overlay |
| **File Badge** | Nhãn 3 ký tự + góc gấp tam giác, màu theo loại: PDF đỏ / DOCX xanh / XLSX xanh lá |
| **Section Card** | border-radius 20px, border 1px #E2E5F1, nền trắng |

### 6.3 Layout chung (các trang đã đăng nhập)

```
┌─────────────────────────────────────────────────────┐
│ TOPBAR: Logo dropdown | Search | 🔔 Badge | 👤 User  │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│   SIDEBAR    │           MAIN CONTENT                │
│   268px      │           (flex: 1, scroll)           │
│   fixed      │                                       │
│              │                                       │
│  [Logo]      │  [Page Header]                        │
│  ─────────   │  [KPI Cards Row]                      │
│  Main        │  [Charts Row]                         │
│  ─────────   │  [Tables / Lists]                     │
│  Báo cáo     │                                       │
│  ─────────   │                                       │
│  Cá nhân     │                                       │
│              │                                       │
└──────────────┴──────────────────────────────────────┘
```

---

## 7. Luồng điều hướng

### 7.1 Luồng cư dân mới

```
Trang chủ (Home.html)
    ↓ Click "Tạo miễn phí"
Đăng ký (signup.html)
    ↓ Đăng ký thành công
Đăng nhập (login.html)
    ↓ Đăng nhập thành công
Dashboard (dashboard.html)
    ↓
[Điều hướng qua Sidebar]
```

### 7.2 Luồng xem tài chính

```
Dashboard → Tổng quan tài chính
         → Báo cáo thu chi
         → Quỹ bảo trì
         → Báo cáo định kỳ
         → Lịch sử & lưu trữ
```

### 7.3 Luồng gửi phản ánh

```
Dashboard / Góp ý Phản ánh
    ↓ Click "+ Gửi phản ánh mới"
Điền form (danh mục, tiêu đề, mô tả, ảnh)
    ↓ Submit
Phản ánh tạo thành công (trạng thái: Đang xử lý)
    ↓
BQT xử lý → Cập nhật timeline
    ↓
Cư dân nhận thông báo → Phản ánh đóng (Đã giải quyết)
```

### 7.4 Luồng yêu cầu bảo trì

```
Căn hộ của tôi → Yêu cầu bảo trì (quick link)
    ↓
Form yêu cầu (danh mục, mô tả, ảnh)
    ↓
Work Order tạo → Vận hành & Bảo trì (BQT thấy)
    ↓
BQT phân công → Kỹ thuật viên xử lý
    ↓
Đóng Work Order → Cư dân nhận thông báo
```

### 7.5 Luồng quản lý thành viên gia đình

```
Thành viên gia đình
    ↓ Click card slot trống / "+ Thêm thành viên"
Form thêm thành viên
    ↓ Submit + upload CCCD
Trạng thái: Chờ xác minh
    ↓ BQT xác minh CCCD
Trạng thái: Đã xác minh
```

---

## 8. Ràng buộc & Giả định

### 8.1 Ràng buộc kỹ thuật

- Giao diện phải hoạt động không cần JavaScript framework (có thể dùng Vanilla JS, React, Vue.js — tùy đội phát triển quyết định khi implement).
- Font phải load từ Google Fonts hoặc self-hosted để tránh phụ thuộc CDN ngoài trong môi trường production.
- Biểu đồ có thể chuyển từ SVG inline sang thư viện chart (Chart.js, ECharts, Recharts) khi implement backend thực tế.

### 8.2 Ràng buộc nghiệp vụ

- Một căn hộ tối đa **6 thành viên** gia đình.
- Mỗi cư dân chỉ được liên kết với **1 căn hộ** chính (primary residence).
- Tài liệu tài chính phải được lưu giữ tối thiểu **5 năm** theo quy định pháp luật.
- Quỹ bảo trì phải tuân thủ quy định của **Luật Nhà ở Việt Nam** hiện hành.

### 8.3 Giả định

- Người dùng có kết nối internet ổn định (3G trở lên).
- Ban Quản Trị có ít nhất 1 nhân viên được đào tạo sử dụng hệ thống.
- Dữ liệu tài chính đầu vào do BQT nhập thủ công hoặc tích hợp từ phần mềm kế toán.
- AI Assistant sử dụng Large Language Model bên thứ ba (OpenAI, Google Gemini, hoặc tương đương).

---

## 9. Phụ lục

### 9.1 Danh sách màn hình

| STT | File | Tên màn hình | Vai trò truy cập |
|---|---|---|---|
| 1 | `Home.html` | Trang chủ & Marketing | Public |
| 2 | `login.html` | Đăng nhập | Public |
| 3 | `signup.html` | Đăng ký | Public |
| 4 | `dashboard.html` | Dashboard | Cư dân, BQT |
| 5 | `notification.html` | Thông báo | Cư dân, BQT |
| 6 | `can-ho-cua-toi.html` | Căn hộ của tôi | Cư dân, BQT |
| 7 | `thanh-vien-gia-dinh.html` | Thành viên gia đình | Chủ hộ, BQT |
| 8 | `tong-quan-tai-chinh.html` | Tổng quan tài chính | Cư dân, BQT |
| 9 | `bao-cao-thu-chi.html` | Báo cáo thu chi | Cư dân, BQT |
| 10 | `quy-bao-tri.html` | Quỹ bảo trì | Cư dân, BQT |
| 11 | `van-hanh-bao-tri.html` | Vận hành & Bảo trì | Cư dân (xem), BQT |
| 12 | `kpi-ban-quan-tri.html` | KPI Ban quản trị | Cư dân (xem), BQT |
| 13 | `bao-cao-dinh-ky.html` | Báo cáo định kỳ | Cư dân, BQT |
| 14 | `lich-su-luu-tru.html` | Lịch sử & Lưu trữ | Cư dân, BQT |
| 15 | `tin-tuc-cong-dong.html` | Tin tức cộng đồng | Cư dân (đọc), BQT (đăng) |
| 16 | `gop-y-phan-anh.html` | Góp ý / Phản ánh | Cư dân (gửi), BQT (xử lý) |
| 17 | `kho-tai-lieu.html` | Kho tài liệu | Cư dân, BQT |
| 18 | `ai-assistant.html` | AI Assistant | Cư dân, BQT |
| 19 | `ho-so-ca-nhan.html` | Hồ sơ cá nhân | Cư dân, BQT |
| 20 | `cai-dat.html` | Cài đặt | Cư dân, BQT |

### 9.2 Bảng màu trạng thái

| Trạng thái | Màu nền | Màu chữ | Ý nghĩa |
|---|---|---|---|
| Đã hoàn thành / OK | `#E3FBED` | `#1C9D5F` | Thành công, đã xong |
| Đang xử lý / Chờ | `#FFF1DE` | `#C8761B` | Đang chờ, cần chú ý |
| Nguy hiểm / Quá hạn | `#FFEDED` | `#F5222D` | Lỗi, cần hành động ngay |
| Đang xử lý (xanh) | `#EFEAFF` | `#5A3AD9` | Đang trong quy trình |
| Tạm trú | `#EFF8FF` | `#1A7CB8` | Thông tin bổ sung |

### 9.3 Ưu tiên phát triển (MoSCoW)

| Mức độ | Tính năng |
|---|---|
| **Must Have** | Đăng nhập/Đăng ký, Dashboard, Thông tin căn hộ, Thông báo, Tài chính (xem), Góp ý phản ánh |
| **Should Have** | Thành viên gia đình, Kho tài liệu, Tin tức cộng đồng, Vận hành & Bảo trì, Hồ sơ cá nhân |
| **Could Have** | AI Assistant, KPI Ban quản trị, Báo cáo định kỳ, Lịch sử lưu trữ, Cài đặt nâng cao |
| **Won't Have (now)** | Tích hợp thanh toán trực tuyến, App mobile native, Tích hợp camera/CCTV trực tiếp |

---

*Tài liệu này được tạo tự động từ phân tích bộ 20 file giao diện HTML của dự án Nhà Chung.*  
*Mọi thay đổi yêu cầu phải được cập nhật vào tài liệu này và đồng bộ với thiết kế giao diện.*
