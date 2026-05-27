/* eslint-disable @next/next/no-img-element */

const CheckMini = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const UploadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const CarMini = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v3h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const BikeMini = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="5.5" cy="17.5" r="3.5" />
    <circle cx="18.5" cy="17.5" r="3.5" />
    <path d="M15 6h2l2 6H5l3-6h2" />
    <path d="M12 6V3" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export default function GiaDinhPage() {
  return (
    <div className="giadinh-page">
      {/* ── Page Header ── */}
      <div className="page-header">
        <div className="page-header-left">
          <div className="page-title">Thành viên gia đình</div>
          <div className="page-subtitle">Quản lý các thành viên đăng ký tại căn hộ A-12.05 · Landmark 1</div>
        </div>
        <button className="btn-add-member">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Thêm thành viên
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#efeeff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-lbl">Tổng thành viên</div>
            <div className="stat-val">3</div>
            <div className="stat-sub">Còn <b>3 slot</b> trống</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#e3fbed" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-lbl">Đã xác minh</div>
            <div className="stat-val" style={{ color: "#1c9d5f" }}>2</div>
            <div className="stat-sub"><b>CCCD</b> hợp lệ</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#fff8ec" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-lbl">Chờ xác minh</div>
            <div className="stat-val" style={{ color: "#c8761b" }}>1</div>
            <div className="stat-sub">Cần bổ sung giấy tờ</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: "#f7f5ff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#5a3ad9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-lbl">Ngày đăng ký</div>
            <div className="stat-val" style={{ fontSize: 18 }}>01/2022</div>
            <div className="stat-sub">Cư dân từ <b>3 năm</b></div>
          </div>
        </div>
      </div>

      {/* ── Section header ── */}
      <div className="section-hd-row">
        <div className="section-hd-title">Danh sách thành viên</div>
        <div className="section-hd-sub">Tối đa 6 người · Đang dùng 3/6 slot</div>
      </div>

      {/* ── Member grid ── */}
      <div className="member-grid">
        {/* Member 1: Chủ hộ */}
        <div className="member-card">
          <span className="owner-tag">Chủ hộ</span>
          <div className="mc-top">
            <img
              className="mc-avatar"
              src="https://www.figma.com/api/mcp/asset/ee21e768-a070-4e15-ad43-73a28943d4ee"
              alt="Chris Tran"
              width="56"
              height="56"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <div className="mc-info">
              <div className="mc-name">Trần Hoàng Chris</div>
              <div className="mc-relation">Chủ hộ · Nam · 33 tuổi</div>
              <div className="mc-status ok">
                <span className="mc-status-dot"></span>
                Đã xác minh
              </div>
            </div>
          </div>
          <hr className="mc-divider" />
          <div className="mc-fields">
            <div className="mc-field">
              <span className="mc-field-label">Ngày sinh</span>
              <span className="mc-field-value">15/08/1990</span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Số điện thoại</span>
              <span className="mc-field-value">
                0912 345 678{" "}
                <span className="verified-badge"><CheckMini /></span>
              </span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Giấy tờ</span>
              <span className="mc-field-value">
                <span className="doc-badge doc-cccd">CCCD · 079 190 015 820</span>
              </span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Phương tiện</span>
              <div className="mc-vehicles">
                <span className="mc-veh"><CarMini />51G-123.45</span>
                <span className="mc-veh"><BikeMini />59K-999.00</span>
              </div>
            </div>
          </div>
          <div className="mc-actions">
            <button className="mc-btn"><EditIcon />Chỉnh sửa</button>
            <button className="mc-btn primary"><EyeIcon />Xem hồ sơ</button>
          </div>
        </div>

        {/* Member 2: Vợ */}
        <div className="member-card">
          <div className="mc-top">
            <div className="mc-avatar" style={{ background: "linear-gradient(135deg,#f9a8d4,#ec4899)", fontSize: 20 }}>TH</div>
            <div className="mc-info">
              <div className="mc-name">Trần Thị Hoa</div>
              <div className="mc-relation">Vợ · Nữ · 31 tuổi</div>
              <div className="mc-status ok">
                <span className="mc-status-dot"></span>
                Đã xác minh
              </div>
            </div>
          </div>
          <hr className="mc-divider" />
          <div className="mc-fields">
            <div className="mc-field">
              <span className="mc-field-label">Ngày sinh</span>
              <span className="mc-field-value">22/04/1993</span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Số điện thoại</span>
              <span className="mc-field-value">
                0987 654 321{" "}
                <span className="verified-badge"><CheckMini /></span>
              </span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Giấy tờ</span>
              <span className="mc-field-value">
                <span className="doc-badge doc-cccd">CCCD · 079 193 054 211</span>
              </span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Phương tiện</span>
              <div className="mc-vehicles">
                <span className="mc-veh"><BikeMini />51F-338.22</span>
              </div>
            </div>
          </div>
          <div className="mc-actions">
            <button className="mc-btn"><EditIcon />Chỉnh sửa</button>
            <button className="mc-btn primary"><EyeIcon />Xem hồ sơ</button>
          </div>
        </div>

        {/* Member 3: Con trai */}
        <div className="member-card">
          <div className="mc-top">
            <div className="mc-avatar" style={{ background: "linear-gradient(135deg,#93c5fd,#3b82f6)", fontSize: 20 }}>TM</div>
            <div className="mc-info">
              <div className="mc-name">Trần Hoàng Minh</div>
              <div className="mc-relation">Con trai · Nam · 7 tuổi</div>
              <div className="mc-status pending">
                <span className="mc-status-dot"></span>
                Chờ xác minh
              </div>
            </div>
          </div>
          <hr className="mc-divider" />
          <div className="mc-fields">
            <div className="mc-field">
              <span className="mc-field-label">Ngày sinh</span>
              <span className="mc-field-value">05/03/2017</span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Liên hệ</span>
              <span className="mc-field-value" style={{ color: "#585c7b", fontStyle: "italic" }}>Qua phụ huynh</span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Giấy tờ</span>
              <span className="mc-field-value">
                <span className="doc-badge doc-ks">Giấy khai sinh</span>
              </span>
            </div>
            <div className="mc-field">
              <span className="mc-field-label">Ghi chú</span>
              <span className="mc-field-value" style={{ color: "#c8761b", fontSize: 11 }}>Cần nộp bản sao GCKS để xác minh</span>
            </div>
          </div>
          <div className="mc-actions">
            <button className="mc-btn"><EditIcon />Chỉnh sửa</button>
            <button className="mc-btn" style={{ borderColor: "#c8761b", color: "#c8761b" }}>
              <UploadIcon />Nộp giấy tờ
            </button>
          </div>
        </div>

        {/* Empty slots */}
        {[
          { label: "Slot 4/6 · Còn trống" },
          { label: "Slot 5/6 · Còn trống" },
          { label: "Slot 6/6 · Còn trống" },
        ].map((s) => (
          <div className="slot-card" key={s.label}>
            <div className="slot-circle"><PlusIcon /></div>
            <div className="slot-label">Thêm thành viên</div>
            <div className="slot-sub">{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Policy note ── */}
      <div className="policy-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <div className="policy-text">
          Mỗi căn hộ được đăng ký tối đa <b>6 thành viên</b> (bao gồm chủ hộ). Thành viên đăng ký sẽ được cấp thẻ từ và quyền ra vào toà nhà. Trẻ em dưới 14 tuổi cần cung cấp giấy khai sinh, từ 14 tuổi trở lên cần CCCD/CMND. Liên hệ BQL để được hỗ trợ thêm.
        </div>
      </div>
    </div>
  );
}
