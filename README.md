# Hà Trọng Tài — AI Video & Film Creator

Portfolio cá nhân tĩnh, song ngữ Việt/Anh, viết bằng HTML, CSS và JavaScript thuần.
Trang giới thiệu chủ portfolio trước, tiếp đến nền tảng và kinh nghiệm, rồi danh sách
dự án. Mỗi sản phẩm là một mục dự án; thông điệp riêng nằm trong phần chi tiết dự án.

## Xem trên máy

Tại thư mục repo, chạy `python3 -m http.server 8765`, sau đó mở
<http://localhost:8765>. Không cần cài dependency hoặc build.

## Chỉnh nội dung

- `index.html`: nội dung tiếng Việt mặc định, cấu trúc trang và liên kết cá nhân.
- `main.js`: bộ bản dịch `translations`; tiếng Việt được đọc từ HTML, tiếng Anh nằm trong `translations.en`. Mỗi nội dung dịch dùng một khóa `data-i18n`; nhãn và ảnh dùng `data-i18n-aria`, `data-i18n-alt`.
- `style.css`: màu sắc, typography, responsive và hiệu ứng; hỗ trợ `prefers-reduced-motion`.
- `assets/image/featured-film.jpg`: thumbnail chính thức của video được chủ portfolio cung cấp; `profile-image.jpg`: ảnh chân dung hiện có.

Khi đổi video, cập nhật URL YouTube, ID trình nhúng trong `main.js`, thumbnail,
tiêu đề, mô tả và metadata Open Graph. Giữ phần đóng góp đúng với vai trò thực tế.
Video chỉ tải iframe khi người xem bấm phát; liên kết YouTube luôn hiện để xem dự phòng.

Ngôn ngữ mặc định là tiếng Việt, lựa chọn được lưu tại khóa
`portfolio-language` trong localStorage. Khi tắt JavaScript, nội dung và điều hướng
vẫn dùng được; xem video qua liên kết YouTube.

## Kiểm tra và xuất bản

Kiểm tra giao diện 360, 768, 1440 px ở cả hai ngôn ngữ; menu mobile, bàn phím,
phát video, liên hệ và ngôn ngữ sau khi tải lại trang. Chạy `node --check main.js`
và `git diff --check` trước khi commit.

GitHub Pages đang xuất bản từ nhánh `main`. Push thay đổi lên `main` rồi xác minh
bản triển khai tại <https://hatrontai.github.io/Portfolio/>.
