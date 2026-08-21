# Website CLB Nghiên Cứu Khoa Học (HG-SRC) - Phân hiệu ĐHTN tại Hà Giang

Website chính thức của **Câu lạc bộ Nghiên cứu Khoa học – Phân hiệu Đại học Thái Nguyên tại tỉnh Hà Giang**. Trang web được xây dựng với công nghệ HTML5, CSS3 và JavaScript thuần, tối ưu giao diện hiện đại, chuẩn SEO và phục vụ đặc biệt cho **Tân sinh viên** cũng như hoạt động học thuật của Phân hiệu.

---

## 🌟 Cấu trúc thư mục

```
WEB CLB NCKH/
│
├── index.html       # Bộ khung HTML5 hoàn chỉnh, chuẩn ngữ nghĩa & cấu trúc
├── styles.css       # Toàn bộ hệ thống giao diện, Typography, Responsive & Animation
├── script.js        # Logic tương tác: Quiz phân ngành NCKH, Modal, Lọc sự kiện/tài liệu, Cấp thẻ thành viên
└── README.md        # Hướng dẫn sử dụng & quản trị website
```

---

## 🚀 Cách mở và sử dụng website

1. **Mở trực tiếp trên máy tính:**
   - Bạn chỉ cần nhấp đúp chuột vào tệp `index.html` để mở trang web trên trình duyệt (Google Chrome, Microsoft Edge, Firefox, Cốc Cốc, Safari...).

2. **Chạy bằng Live Server (Nếu dùng VS Code):**
   - Mở thư mục `WEB CLB NCKH` trong VS Code.
   - Chuột phải vào `index.html` và chọn **Open with Live Server**.

3. **Đưa lên mạng Internet miễn phí:**
   - **GitHub Pages:** Tạo một repository trên GitHub, đẩy thư mục này lên và bật tính năng *Pages* trong phần *Settings*.
   - **Netlify / Vercel:** Kéo thả trực tiếp thư mục `WEB CLB NCKH` vào trang quản trị Netlify/Vercel là website sẽ có ngay tên miền trực tuyến miễn phí.

---

## 📌 Các phân mục nổi bật trên trang web

1. **Header thông minh:** Thanh điều hướng cố định với hiệu ứng làm mờ kính (Glassmorphism), menu co giãn mượt mà trên điện thoại.
2. **Hero Section:** Slogan truyền cảm hứng, hộp đếm số liệu thống kê tự động (Thành viên, Đề tài NCKH, Workshop, Giảng viên đồng hành).
3. **Góc Tân Sinh Viên (Freshmen Hub):**
   - Lộ trình 4 bước từ con số 0 đến nhà nghiên cứu trẻ.
   - Giải mã 4 lầm tưởng phổ biến về NCKH.
   - Tổng hợp quyền lợi & cộng điểm rèn luyện.
   - **Trắc nghiệm mini tương tác**: Tự động phân tích câu trả lời và gợi ý nhóm nghiên cứu phù hợp (CNTT, Văn hóa - Du lịch, Nông sản OCOP, Sư phạm).
4. **Về CLB & Giá trị cốt lõi:** Tôn chỉ, 5 giá trị cốt lõi và giới thiệu Đội ngũ Giảng viên cố vấn / Ban chủ nhiệm.
5. **Hoạt Động & Sự Kiện:** Bộ lọc phân loại hoạt động kèm popup modal xem chi tiết chương trình, thời gian, địa điểm.
6. **Thư Viện Tri Thức & Biểu Mẫu:** Tìm kiếm thời gian thực, lọc loại tài liệu, xem trước nội dung và tải file mẫu quy chuẩn (.docx, .pdf, .pptx).
7. **Đề Tài Tiêu Biểu:** Giới thiệu các công trình nghiên cứu xuất sắc của sinh viên gắn với Cao nguyên đá Đồng Văn và kinh tế - xã hội Hà Giang.
8. **Hỏi Đáp (FAQ):** Accordion giải đáp 6 thắc mắc lớn nhất của tân sinh viên.
9. **Cổng Đăng Ký Trực Tuyến & Cấp Thẻ Hội Viên:** Form đăng ký tiện lợi, lưu trữ dữ liệu vào trình duyệt và tự động tạo **Thẻ Hội Viên Dự Bị** với mã số riêng có thể in hoặc lưu lại.
10. **Thông Tin Liên Hệ & Chân Trang:** Trụ sở Phân hiệu ĐHTN tại Hà Giang (Tổ 16, P. Minh Khai), số điện thoại, email và liên kết nhóm Zalo/Fanpage.

---

## 🛠️ Hướng dẫn tùy chỉnh nội dung cho Ban Chủ Nhiệm

- **Thay đổi thông tin liên hệ / Hotline / Email:** Mở tệp `index.html`, tìm đến phần `<!-- ==================== 10. CONTACT & LOCATION ==================== -->` để chỉnh sửa số điện thoại, email hoặc địa chỉ.
- **Thêm sự kiện mới:** Mở tệp `index.html`, nhân bản khối `<div class="event-card">` trong phần `#activities` và cập nhật thông tin trong `script.js` (hàm `eventDetailsMap`).
- **Thêm biểu mẫu tải về mới:** Thêm thẻ `<div class="resource-card">` tại mục `#resources` trong `index.html`.
