/* eslint-disable @next/next/no-img-element */

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const VerifiedBadge = () => (
  <span className="verified-badge">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
    Đã xác minh
  </span>
);

const CarIcon = ({ stroke }: { stroke: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 11l2-5h10l2 5H5z" />
    <rect x="2" y="11" width="20" height="5" rx="1" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="17" cy="18" r="2" />
    <line x1="9" y1="16" x2="15" y2="16" />
  </svg>
);

export default function HoSoPage() {
  return (
    <div className="profile-page">
      {/* ── Banner ── */}
      <div className="profile-banner">
        <div className="banner-avatar-wrap">
          <img className="banner-avatar" src="https://www.figma.com/api/mcp/asset/ee21e768-a070-4e15-ad43-73a28943d4ee" alt="Chris Tran" />
          <div className="banner-avatar-edit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </div>
        </div>
        <div className="banner-info">
          <div className="banner-name">Trần Hoàng Chris</div>
          <div className="banner-tags">
            <div className="banner-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              Căn hộ A-12.05
            </div>
            <div className="banner-tag">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Landmark 1 · Vinhomes Central Park
            </div>
            <div className="banner-tag" style={{ background: "rgba(74,222,128,.2)" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span style={{ color: "#4ade80" }}>Cư dân đã xác minh</span>
            </div>
          </div>
        </div>
        <div className="banner-actions">
          <button className="btn-banner-outline">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Tải thẻ cư dân
          </button>
          <button className="btn-banner-primary">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Chỉnh sửa hồ sơ
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="profile-body">
        {/* Left main */}
        <div className="profile-main">
          {/* Hoàn thiện hồ sơ */}
          <div className="section-card" style={{ padding: "18px 22px" }}>
            <div className="completion-wrap">
              <div className="completion-hd">
                <span className="completion-lbl">Độ hoàn thiện hồ sơ</span>
                <span className="completion-pct">85%</span>
              </div>
              <div className="completion-bar"><div className="completion-fill" style={{ width: "85%" }}></div></div>
            </div>
            <div className="completion-items">
              <div className="comp-item comp-done"><CheckIcon /><span>Thông tin cơ bản</span></div>
              <div className="comp-item comp-done"><CheckIcon /><span>Số điện thoại đã xác minh</span></div>
              <div className="comp-item comp-done"><CheckIcon /><span>CCCD đã tải lên</span></div>
              <div className="comp-item comp-done"><CheckIcon /><span>Phương tiện đã đăng ký</span></div>
              <div className="comp-item comp-miss" style={{ color: "#c8761b" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>Email chưa xác minh</span>
              </div>
              <div className="comp-item comp-miss" style={{ color: "#585c7b" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <span>Thêm liên hệ khẩn cấp</span>
              </div>
            </div>
          </div>

          {/* Thông tin cơ bản */}
          <div className="section-card">
            <div className="section-hd">
              <div className="section-title">
                <div className="section-title-icon" style={{ background: "#efeeff" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                Thông tin cơ bản
              </div>
              <button className="section-edit"><EditIcon />Chỉnh sửa</button>
            </div>
            <div className="info-grid">
              {[
                { l: "Họ và tên", v: "Trần Hoàng Chris" },
                { l: "Tên hiển thị", v: "Chris Tran" },
                { l: "Ngày sinh", v: "15/08/1990" },
                { l: "Giới tính", v: "Nam" },
                { l: "Quốc tịch", v: "Việt Nam" },
                { l: "Nghề nghiệp", v: "Kỹ sư phần mềm" },
              ].map((i) => (
                <div className="info-item" key={i.l}>
                  <div className="info-label">{i.l}</div>
                  <div className="info-value">{i.v}</div>
                </div>
              ))}
              <div className="info-divider"></div>
              <div className="info-item info-full">
                <div className="info-label">Địa chỉ thường trú</div>
                <div className="info-value">123 Nguyễn Văn Linh, Phường Tân Phong, Quận 7, TP. Hồ Chí Minh</div>
              </div>
            </div>
          </div>

          {/* Giấy tờ tùy thân */}
          <div className="section-card">
            <div className="section-hd">
              <div className="section-title">
                <div className="section-title-icon" style={{ background: "#e4f1ff" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                Giấy tờ tùy thân
              </div>
              <button className="section-edit"><EditIcon />Cập nhật</button>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Số CCCD</div>
                <div className="info-value mono">
                  079 190 015 820
                  <VerifiedBadge />
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Ngày cấp</div>
                <div className="info-value">20/03/2021</div>
              </div>
              <div className="info-item info-full">
                <div className="info-label">Nơi cấp</div>
                <div className="info-value">Cục Cảnh sát QLHC về TTXH — TP. Hồ Chí Minh</div>
              </div>
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="section-card">
            <div className="section-hd">
              <div className="section-title">
                <div className="section-title-icon" style={{ background: "#e3fbed" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                Thông tin liên hệ
              </div>
              <button className="section-edit"><EditIcon />Chỉnh sửa</button>
            </div>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">Số điện thoại</div>
                <div className="info-value">
                  0912 345 678
                  <VerifiedBadge />
                </div>
              </div>
              <div className="info-item">
                <div className="info-label">Điện thoại phụ</div>
                <div className="info-value">—</div>
              </div>
              <div className="info-item info-full">
                <div className="info-label">Email</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                  <div className="info-value">chris.tran@gmail.com</div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#fff1de", borderRadius: 10, padding: "3px 10px", fontSize: 11, fontWeight: 700, color: "#c8761b", whiteSpace: "nowrap", flexShrink: 0 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Chưa xác minh
                  </div>
                  <button style={{ fontSize: 12, color: "#4137f9", fontWeight: 600, cursor: "pointer", background: "none", border: "none", padding: 0 }}>Xác minh ngay →</button>
                </div>
              </div>
              <div className="info-item info-full">
                <div className="info-label">Zalo</div>
                <div className="info-value primary">0912 345 678 · Đã liên kết</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="profile-sidebar">
          {/* Phương tiện */}
          <div className="section-card" style={{ gap: 14 }}>
            <div className="section-hd">
              <div className="section-title" style={{ fontSize: 14 }}>
                <div className="section-title-icon" style={{ background: "#fff1de" }}>
                  <CarIcon stroke="#c8761b" />
                </div>
                Phương tiện
              </div>
              <button className="section-edit" style={{ fontSize: 11, padding: "4px 10px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Thêm
              </button>
            </div>
            <div className="vehicle-list">
              <div className="vehicle-item">
                <div className="vehicle-icon" style={{ background: "#efeeff" }}>
                  <CarIcon stroke="#4137f9" />
                </div>
                <div className="vehicle-body">
                  <div className="vehicle-name">Toyota Camry 2022</div>
                  <div className="vehicle-plate">51G-123.45 · Tầng hầm B1-A21</div>
                </div>
                <span className="vehicle-badge" style={{ background: "#e3fbed", color: "#1c9d5f" }}>Ô tô</span>
              </div>
              <div className="vehicle-item">
                <div className="vehicle-icon" style={{ background: "#e4f1ff" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="5.5" cy="17.5" r="3.5" />
                    <circle cx="18.5" cy="17.5" r="3.5" />
                    <path d="M15 6h3l3 6M9 17h6l-3-10h-2M5.5 14L8 9h7" />
                  </svg>
                </div>
                <div className="vehicle-body">
                  <div className="vehicle-name">Honda Air Blade</div>
                  <div className="vehicle-plate">59K-999.00 · Tầng hầm B2-M14</div>
                </div>
                <span className="vehicle-badge" style={{ background: "#e4f1ff", color: "#1870c4" }}>Xe máy</span>
              </div>
            </div>
          </div>

          {/* Liên hệ */}
          <div className="section-card" style={{ gap: 14 }}>
            <div className="section-hd">
              <div className="section-title" style={{ fontSize: 14 }}>
                <div className="section-title-icon" style={{ background: "#ffeded" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                Liên hệ
              </div>
              <button className="section-edit" style={{ fontSize: 11, padding: "4px 10px" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Thêm
              </button>
            </div>
            <div className="contact-list">
              <div className="contact-item">
                <div className="contact-avatar" style={{ background: "#efeeff", color: "#4137f9" }}>TH</div>
                <div className="contact-body">
                  <div className="contact-name">Trần Thị Hoa</div>
                  <div className="contact-rel">Vợ · Cùng căn hộ A-12.05</div>
                  <div className="contact-phone">0987 654 321</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-avatar" style={{ background: "#e3fbed", color: "#1c9d5f" }}>TV</div>
                <div className="contact-body">
                  <div className="contact-name">Trần Văn Bình</div>
                  <div className="contact-rel">Bố · Quận 1, TP.HCM</div>
                  <div className="contact-phone">0901 234 567</div>
                </div>
              </div>
            </div>
          </div>

          {/* Hoạt động gần đây */}
          <div className="section-card" style={{ gap: 14 }}>
            <div className="section-hd">
              <div className="section-title" style={{ fontSize: 14 }}>
                <div className="section-title-icon" style={{ background: "#f0f0f5" }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#585c7b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                Hoạt động gần đây
              </div>
            </div>
            <div className="activity-list">
              {[
                { color: "#4137f9", text: <>Gửi <b>góp ý về tiếng ồn</b> hành lang tầng 12</>, time: "Hôm nay, 09:14" },
                { color: "#1c9d5f", text: <>Đóng <b>phí quản lý</b> tháng 5/2024 thành công</>, time: "22/05/2024, 14:30" },
                { color: "#c8761b", text: <>Đăng ký <b>thẻ từ phụ</b> cho khách</>, time: "18/05/2024, 10:05" },
                { color: "#b4b7c9", text: <>Tải báo cáo <b>Quý 1/2024</b></>, time: "15/04/2024, 08:22" },
              ].map((a, i) => (
                <div className="act-row" key={i}>
                  <div className="act-dot-col"><div className="act-dot" style={{ background: a.color }}></div></div>
                  <div className="act-body">
                    <div className="act-text">{a.text}</div>
                    <div className="act-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
