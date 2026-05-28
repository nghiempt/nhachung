# Nhà Chung — Kịch bản Demo End-to-End

> Tài liệu này dành cho người demo (sales / founder) để dẫn dắt khách hàng đi xuyên suốt sản phẩm trong **15–20 phút**, từ lúc đăng nhập cho đến đăng xuất. Mỗi bước có thao tác cụ thể + thông điệp giá trị muốn truyền tải.

---

## 🎬 Bối cảnh mở đầu (30 giây)

> *"Hãy hình dung anh/chị là **Chris Trần** — cư dân căn hộ A-12.05, chung cư Landmark 1. 8 giờ tối, vừa đi làm về, mở Nhà Chung để xem hôm nay tòa nhà có gì."*

**Thông điệp:** Đây không phải "ứng dụng kỹ thuật" — đây là **cánh cửa hằng ngày** giữa cư dân và tòa nhà.

---

## Bước 1 — Đăng nhập (30 giây)

**Thao tác:**
- Mở `http://localhost:3000` → tự chuyển trang đăng nhập
- Nhập sẵn: `chris.tran@gmail.com` / `Password@123`
- Click **Đăng nhập**

**Điểm nhấn:**
- Giao diện sạch, không rườm rà
- Đăng nhập bằng email/SĐT (sau này có thể thêm Zalo/Google)
- Tài khoản gắn với căn hộ — không cần điền lại

**Giá trị:** *"Một tài khoản — một căn hộ. Sau này có nhiều tòa thì chỉ cần switch dropdown."*

---

## Bước 2 — Dashboard: Bức tranh tổng quan (90 giây)

**Cư dân vừa đăng nhập sẽ thấy ngay:**

1. **Hero banner**
   - *"Chào buổi tối, Chris!"* — tự động đổi theo giờ
   - Ngày tháng đầy đủ
   - Pill "Bạn có **3 thông báo mới**" — đập vào mắt
   - Widget thời tiết TP.HCM (UX nhỏ nhưng dễ thương)

2. **Thao tác nhanh** — 3 nút lớn: Gửi phản ánh / Xem báo cáo / Hỏi AI

3. **Tổng quan minh bạch** — 4 stat cards:
   - Thu chi tháng này
   - Quỹ bảo trì
   - Phản ánh đang xử lý
   - Tỉ lệ xử lý đúng hạn

4. **Hoạt động cộng đồng** — 3 tin nổi bật

5. **Thông báo mới + Lịch sự kiện** ở cột phải

6. **AI Banner cuối trang** — quảng bá trợ lý

**Giá trị:** *"Toàn bộ những thông tin cư dân cần biết trong ngày — gói gọn trong một màn hình. Không cần lướt 10 tab Facebook hoặc Zalo group."*

---

## Bước 3 — Thông báo: Xem chi tiết một bản tin (60 giây)

**Thao tác:**
- Click **Thông báo** ở sidebar
- Thấy danh sách: PCCC khẩn, điều chỉnh phí, sự kiện cư dân...
- Click vào **"Thông báo bảo trì hệ thống PCCC định kỳ"**
- Cột phải hiện đầy đủ: tiêu đề, người gửi, nội dung, lịch thực hiện, checklist, file đính kèm

**Điểm nhấn:**
- Lọc theo loại: Tất cả / Khẩn / Chưa đọc / Đã đọc
- Nút **"Đánh dấu tất cả đã đọc"** ở góc
- Mỗi thông báo có chấm trạng thái — đỏ = chưa đọc, xanh = đã đọc

**Giá trị:** *"Thông báo của BQT giờ có địa chỉ rõ ràng, có lịch sử, có file đính kèm — không trôi như tin nhắn Zalo."*

---

## Bước 4 — Căn hộ của tôi: "Nhà tôi giờ ra sao?" (90 giây)

**Thao tác:**
- Click **Căn hộ** ở sidebar
- Lướt qua các section:
  1. **Hero**: mã căn A-12.05, 95m², 3PN/2WC, hướng Đông Nam, sở hữu vĩnh viễn
  2. **4 stat cards**: diện tích, vị trí, loại căn, thời gian cư trú
  3. **Chi tiết căn hộ**: tháp/tầng/hướng, chỗ đậu xe...
  4. **Hợp đồng & sở hữu**: số HĐ, ngày ký, ngày bàn giao, chủ sở hữu
  5. **Bảng phí dịch vụ kỳ này**: phí quản lý, gửi xe, điện, nước + trạng thái thanh toán
  6. **Sidebar phải**: thẻ cư dân + thao tác nhanh (thanh toán, yêu cầu bảo trì)

**Giá trị:** *"Mọi thông tin về căn hộ — từ hợp đồng tới hóa đơn — đều ở đây. Không cần lục tủ tìm sổ hồng."*

---

## Bước 5 — Thành viên gia đình: Quản lý ai đang sống ở đây (60 giây)

**Thao tác:**
- Click **Gia đình**
- Thấy 4 stat: tổng 3 thành viên, đã xác minh 2, chờ xác minh 1, còn 3 slot trống
- 3 card thành viên: Chris (Chủ hộ ✓), Hoa (Vợ ✓), Minh (Con 7 tuổi — chờ xác minh GKS)
- 3 ô slot trống có nét đứt + dấu "+"

**Điểm nhấn:**
- Mỗi căn hộ tối đa **6 thành viên** — chính sách tự động enforce
- Trạng thái xác minh CCCD/GKS rõ ràng
- Mỗi thành viên có thông tin, giấy tờ, phương tiện đăng ký

**Giá trị:** *"BQT biết chính xác ai sống ở đây — quan trọng cho an ninh và quản lý thẻ từ. Không còn cảnh 'không biết người lạ này là ai'."*

---

## Bước 6 — Tài chính minh bạch: Đập tan nghi ngờ (2 phút)

> Đây là **vũ khí lớn nhất** của Nhà Chung — dành thời gian.

### 6.1 Tổng quan tài chính
- Click **Tổng quan tài chính**
- 4 KPI cards: Thu, Chi, Thặng dư, Quỹ bảo trì
- **Biểu đồ Thu-Chi 6 tháng** (Bar chart đẹp)
- **Donut "Cơ cấu chi phí"**: vận hành, điện nước, bảo trì, dịch vụ, nhân sự, khác
- Tải báo cáo PDF tháng

### 6.2 Báo cáo thu chi (chi tiết hơn)
- Click **Báo cáo thu chi**
- **AI Banner phân tích nhanh**: *"Tháng này tòa nhà thặng dư X đồng, tỉ lệ thu phí 98.6%..."* (highlight đỏ/xanh)
- Bảng chi tiết khoản thu (phí quản lý, gửi xe, cho thuê, lãi tiền gửi)
- Bảng chi tiết khoản chi (vận hành, điện nước, bảo trì...)
- **Bảng giao dịch gần đây** — từng giao dịch một, có mã số, ngày, hình thức

### 6.3 Quỹ bảo trì
- Click **Quỹ bảo trì**
- 4 KPI: số dư hiện tại, đã thu, đã chi, lãi tiền gửi
- Biểu đồ xu hướng quỹ qua 8 quý
- Thông tin ngân hàng, số tài khoản, lãi suất
- **Bảng chi tiêu gần đây** + **Kế hoạch bảo trì sắp tới** (timeline)
- Tỉ lệ thu quỹ theo từng Block

**Giá trị (nhấn mạnh):** *"Đây là điểm khác biệt lớn nhất với chung cư truyền thống. Cư dân thấy **mọi đồng tiền** — vào từ đâu, chi cho cái gì, ai phê duyệt. **Minh bạch = niềm tin = không còn tranh cãi.**"*

---

## Bước 7 — Vận hành & Bảo trì: BQT đang làm gì (90 giây)

**Thao tác:**
- Click **Vận hành**
- 4 KPI: tổng yêu cầu, đang xử lý, hoàn thành, **quá hạn (đỏ — cần chú ý)**
- **Phân tích theo hạng mục**: Điện, Nước, Thang máy, PCCC... với % và thanh tiến trình
- **Tình trạng hệ thống**: 9 hệ thống kỹ thuật, mỗi cái có status OK / Cảnh báo / Nguy hiểm
- **Bảng work orders** — lọc theo Tất cả / Đang xử lý / Hoàn thành / Quá hạn
- **Lịch bảo trì sắp tới** — grid 4 cột theo ngày, "Hôm nay" được highlight

**Giá trị:** *"Cư dân không cần gọi điện hỏi 'thang máy số 2 đang sửa hay sao?' — mở app là biết. BQT cũng không cần giải thích đi giải thích lại."*

---

## Bước 8 — KPI Ban Quản Trị: Đo lường hiệu quả (60 giây)

**Thao tác:**
- Click **KPI**
- **Vòng tròn điểm tổng** 87.4/100 — **Xuất sắc** (gradient indigo nổi bật)
- So sánh với quý trước: +4.2 điểm
- 4 mini stats: Đạt 18 / Cần cải thiện 4 / Chưa đạt 2 / Tổng 24
- **5 category cards**: Tài chính, Vận hành, Dịch vụ cư dân, An ninh, Bảo trì
- **Biểu đồ xu hướng 6 quý** + đường mục tiêu
- **Bảng KPI chi tiết**: từng chỉ tiêu — mục tiêu / thực tế / % đạt / điểm / kết quả
- **5 thành viên BQT** với điểm và xếp loại

**Giá trị:** *"BQT phải show their work. Không còn cảnh 'tin BQT đi' — số liệu nói thay."*

---

## Bước 9 — Tin tức cộng đồng (45 giây)

**Thao tác:**
- Click **Tin tức**
- Tabs: Tất cả / Thông báo BQT / Sự kiện / Bảo trì / Cộng đồng (có count)
- **Banner bài nổi bật** (Ghim) — ảnh đẹp, gradient overlay
- **Grid 6 bài viết** với thumbnail, danh mục màu, tác giả, ngày
- **Sidebar phải**: "Xem nhiều nhất" + "Sự kiện sắp diễn ra"

**Giá trị:** *"Báo nội bộ chung cư — gọn, đẹp, có tổ chức. Thay cho group Facebook lộn xộn."*

---

## Bước 10 — Góp ý / Phản ánh: Cư dân lên tiếng (90 giây)

> Demo cảm xúc — kể câu chuyện.

**Thao tác:**
- Click **Góp ý**
- Tabs: Tất cả 24 / Đang xử lý 6 / Chờ phản hồi 3 / Đã hoàn thành 12 / Từ chối 3
- **Cột trái**: danh sách 5 phản ánh (icon danh mục, tiêu đề, trạng thái)
- Click vào **"Rác thải không được dọn dẹp ở tầng hầm B2"**
- **Cột giữa**: chi tiết phản ánh + ảnh đính kèm + **timeline xử lý** (BQT tiếp nhận → Đang xử lý → Chờ phản hồi cư dân) + ô viết bình luận
- **Cột phải**: thông tin phản ánh (danh mục, ưu tiên, địa điểm, ngày tạo) + thao tác nhanh

**Demo script:**
> *"Tuần trước Chris thấy tầng hầm bẩn — chụp ảnh, gửi phản ánh. 10:45 BQT tiếp nhận, 11:20 báo bộ phận vệ sinh xử lý. Mỗi bước có timestamp. Không còn cảnh 'gửi xong rồi im bặt'."*

**Giá trị:** *"Mọi phản ánh đều có địa chỉ, có người chịu trách nhiệm, có thời hạn. SLA rõ ràng."*

---

## Bước 11 — AI Assistant: Trợ lý 24/7 (60 giây)

**Thao tác:**
- Click **AI Assistant**
- Cột trái: lịch sử các câu hỏi gần đây
- Click 1 chip gợi ý: *"Quy định về nuôi thú cưng?"*
- AI trả lời (hiện tại là stub) — nhưng demo được cấu trúc trả lời với highlight card, checklist, nguồn trích dẫn (Điều 12.3 nội quy)

**Demo script:**
> *"Cư dân không cần đọc 50 trang nội quy. Hỏi trực tiếp như chat với ChatGPT, AI tra cứu trong nội quy + tài liệu của tòa nhà rồi trả lời, kèm dẫn nguồn."*

**Giá trị:** *"Giảm 80% câu hỏi lặp lại gửi BQT. BQT có thời gian làm việc thực sự."*

**Lưu ý:** AI hiện trả lời stub — production sẽ tích hợp GPT/Gemini.

---

## Bước 12 — Kho tài liệu & Báo cáo định kỳ (45 giây)

### 12.1 Kho tài liệu
- Click **Kho tài liệu**
- 5 folders: Nội quy, Biên bản họp, Hợp đồng, Hướng dẫn, Khác
- Bảng tài liệu mới nhất: tên, danh mục, ngày, dung lượng, lượt xem, tải xuống

### 12.2 Báo cáo định kỳ
- Click **Báo cáo**
- 4 stat cards: tổng 28, đã phát hành 21, chờ duyệt 3, sắp đến hạn 2
- Tabs: Tháng / Quý / Năm
- Card report đẹp với badge PDF/DOC/XLS

### 12.3 Lịch sử & Lưu trữ
- Click **Lịch sử**
- Tabs năm: 2024 / 2023 / 2022 / 2021
- Nhóm theo tháng → bảng tài liệu trong tháng
- Sidebar: thống kê danh mục + top download

**Giá trị:** *"Mọi văn bản giấy tờ của tòa nhà 5 năm gần nhất — tra cứu trong 3 giây. Không còn cảnh 'để tôi tìm trong kho rồi gọi lại'."*

---

## Bước 13 — Hồ sơ cá nhân + Cài đặt (45 giây)

### 13.1 Hồ sơ cá nhân
- Click **Hồ sơ** (sidebar bottom)
- Banner avatar + tags: Căn hộ, Landmark 1, "✓ Cư dân đã xác minh"
- Progress bar **độ hoàn thiện hồ sơ 85%** — gợi mở việc bổ sung
- Sections: Thông tin cơ bản, CCCD, Liên hệ, Phương tiện (Toyota Camry + Honda Air Blade)
- **Hoạt động gần đây** ở sidebar

### 13.2 Cài đặt
- Click **Cài đặt**
- Sidebar 6 tab: Tài khoản / Thông báo / Bảo mật / Giao diện / Quyền riêng tư / Thiết bị
- Toggle 5 loại thông báo (phí, bảo trì, khẩn cấp, sự kiện, tài liệu)
- Quản lý thiết bị đăng nhập (iPhone + MacBook)
- Vùng nguy hiểm: Đăng xuất tất cả / Xóa tài khoản

**Giá trị:** *"Cư dân làm chủ hồ sơ của mình. Đầy đủ quyền riêng tư theo chuẩn GDPR."*

---

## Bước 14 — Đăng xuất (15 giây)

**Thao tác:**
- Click avatar góc phải header → dropdown → **Đăng xuất**
- Quay về trang login

**Giá trị:** *"Bảo mật cơ bản — auto logout, đăng xuất trên mọi thiết bị, JWT có TTL."*

---

## 🎯 Tổng kết Demo (90 giây)

Sau khi đi hết flow, chốt với **5 giá trị cốt lõi**:

| Giá trị | Cụ thể trong sản phẩm |
|---|---|
| **1. Minh bạch tài chính** | Mọi đồng thu chi, quỹ bảo trì, KPI BQT — public với cư dân |
| **2. Truyền thông chính thức** | Thông báo + tin tức + sự kiện — thay group Zalo lộn xộn |
| **3. Phản ánh có địa chỉ** | Submit → BQT tiếp nhận → timeline → cư dân thấy tiến trình |
| **4. Vận hành công khai** | Lịch bảo trì + status hệ thống + work orders — không còn "chờ ai đó sửa" |
| **5. Cư dân làm chủ hồ sơ** | Hồ sơ, gia đình, phương tiện, giấy tờ — đều của riêng cư dân |

**Câu chốt mạnh:**
> *"Một chung cư minh bạch không phải vì BQT muốn — mà vì có công cụ giúp họ minh bạch. Nhà Chung là công cụ đó."*

---

## 📋 Checklist trước khi demo

- [ ] Backend chạy (`http://localhost:4000/api/v1/docs` mở được)
- [ ] Frontend chạy (`http://localhost:3000`)
- [ ] Postgres container alive (`docker ps` thấy `nhachung-postgres`)
- [ ] Đã seed data (`npm run db:seed` trong /backend)
- [ ] Browser ở fullscreen, đã đăng xuất khỏi `chris.tran@gmail.com` để demo lại từ đầu
- [ ] Có sẵn câu trả lời cho FAQ phổ biến (xem dưới)

---

## ❓ FAQ khách thường hỏi

| Câu hỏi | Trả lời |
|---|---|
| *"App có chạy trên điện thoại không?"* | Web responsive — chạy được trên mobile browser. Phase 2 có thể làm app native. |
| *"Dữ liệu của tôi an toàn không?"* | JWT auth, bcrypt password, HTTPS bắt buộc khi production, audit log mọi action. |
| *"Tôi muốn xem báo cáo PDF có được không?"* | Có — mọi báo cáo định kỳ đều có nút "Tải xuống" PDF. |
| *"BQT có thể chỉnh sửa dữ liệu lén không?"* | Mọi action ghi audit log. Cư dân có thể xem lịch sử thay đổi tài liệu/giao dịch. |
| *"Tôi không thấy thanh toán online?"* | Phase này chưa tích hợp cổng thanh toán. Sẽ có ở phase tiếp (VNPay/Momo). |
| *"AI có học từ tài liệu chung cư của tôi không?"* | Có — AI sẽ index nội quy + tài liệu cụ thể của tòa nhà để trả lời chính xác. |
| *"Nếu BQT thay đổi nhân sự thì sao?"* | Dữ liệu đã lưu trên hệ thống, không phụ thuộc cá nhân. Bàn giao chỉ là chuyển quyền tài khoản. |
| *"Bao nhiêu tòa thì 1 instance phục vụ được?"* | Multi-tenant từ thiết kế. 1 instance phục vụ vài trăm tòa (tới 100k cư dân). |

---

## 🚧 Tính năng đang phát triển (chủ động khai)

Cần chủ động đề cập để khách không hỏi đột ngột:

- **Thanh toán online** — phase 2 (Q3/2026), tích hợp VNPay/Momo
- **AI Assistant gọi LLM thật** — đang stub, sẽ tích hợp GPT-4o hoặc Gemini Pro
- **App mobile native** — phase 3, hiện responsive web đủ dùng
- **Upload file đính kèm phản ánh** — UI có rồi, backend cần thêm S3 storage
- **Camera CCTV trực tiếp** — không có trong roadmap, lý do bảo mật + băng thông
- **Đa ngôn ngữ** — kiến trúc đã hỗ trợ i18n, chỉ cần thêm bản dịch
- **Báo cáo tự sinh PDF** — hiện là file upload thủ công, phase 2 sẽ auto-generate

---

## 🎤 Tips cho người demo

1. **Đăng nhập sẵn** ở một browser tab. Tab thứ 2 ở trang login để demo flow đăng nhập nếu cần.
2. **Đừng đi quá nhanh ở phần Tài chính** — đây là điểm khách quan tâm nhất.
3. **Kể câu chuyện ở phần Phản ánh** — cảm xúc của cư dân là vũ khí thuyết phục.
4. **AI Assistant**: nói rõ "đang là demo stub" để không bị hỏi xoáy về độ chính xác.
5. **KPI page**: đây là "wow moment" cho khách doanh nghiệp / Hiệp hội — nhấn mạnh tính accountability.
6. **Đừng demo Settings quá lâu** — chỉ lướt nhanh để khoe có quản lý thiết bị + 2FA.
7. **Đóng demo bằng câu chốt** ở phần Tổng kết — đừng để rơi vào silence sau bước cuối.

---

*Tài liệu này dùng cho phiên bản demo nội bộ — cập nhật khi có tính năng mới production-ready.*
