const ArrowUp = () => (
  <svg className="arrow-up" viewBox="0 0 12 12" fill="none">
    <path d="M6 10V2M2 6l4-4 4 4" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowDown = () => (
  <svg className="arrow-down" viewBox="0 0 12 12" fill="none">
    <path d="M6 2v8M2 6l4 4 4-4" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDown = ({ size = 13 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

type WorkOrder = {
  id: string;
  idStyle?: React.CSSProperties;
  rowStyle?: React.CSSProperties;
  name: string;
  date: string;
  dateStyle?: React.CSSProperties;
  avatar: string;
  avatarStyle?: React.CSSProperties;
  requester: string;
  catBadge: string;
  catText: string;
  catStyle?: React.CSSProperties;
  statBadge: string;
  statText: string;
  priClass: string;
  priText: string;
};

const workOrders: WorkOrder[] = [
  {
    id: "#YC-2405-047", name: "Thay bóng đèn LED hành lang tầng 12 Block B", date: "24/05/2024",
    avatar: "BQT", requester: "Ban quản trị",
    catBadge: "badge badge-sky", catText: "Điện",
    statBadge: "badge badge-orange", statText: "Đang xử lý",
    priClass: "pri-dot pri-medium", priText: "Trung bình",
  },
  {
    id: "#YC-2405-046", name: "Sửa van xả nước căn hộ C5-08 bị rò rỉ", date: "22/05/2024",
    avatar: "NT", avatarStyle: { background: "#e3fbed", color: "#1c9d5f" }, requester: "Nguyễn Thị Lan",
    catBadge: "badge badge-sky", catText: "Nước", catStyle: { background: "#e4f1ff", color: "#1870c4" },
    statBadge: "badge badge-green", statText: "Hoàn thành",
    priClass: "pri-dot pri-high", priText: "Khẩn cấp",
  },
  {
    id: "#YC-2405-045", name: "Kiểm tra máy bơm nước tầng hầm B2 hoạt động yếu", date: "21/05/2024",
    avatar: "KT", requester: "Kỹ thuật viên",
    catBadge: "badge badge-sky", catText: "Nước", catStyle: { background: "#e4f1ff", color: "#1870c4" },
    statBadge: "badge badge-green", statText: "Hoàn thành",
    priClass: "pri-dot pri-high", priText: "Khẩn cấp",
  },
  {
    id: "#YC-2405-044", name: "Bảo dưỡng định kỳ thang máy số 2 (T2)", date: "20/05/2024",
    avatar: "BQT", requester: "Ban quản trị",
    catBadge: "badge badge-blue", catText: "Thang máy",
    statBadge: "badge badge-orange", statText: "Đang xử lý",
    priClass: "pri-dot pri-medium", priText: "Trung bình",
  },
  {
    id: "#YC-2405-043", name: "Sửa cửa kính tự động sảnh tầng trệt bị kẹt", date: "18/05/2024",
    avatar: "BV", avatarStyle: { background: "#fff1de", color: "#c8761b" }, requester: "Bảo vệ ca sáng",
    catBadge: "badge badge-gray", catText: "Khu chung",
    statBadge: "badge badge-green", statText: "Hoàn thành",
    priClass: "pri-dot pri-medium", priText: "Trung bình",
  },
  {
    id: "#YC-2405-040", name: "Kiểm tra hệ thống PCCC tầng 8–12, Block A", date: "15/05/2024",
    avatar: "BQT", requester: "Ban quản trị",
    catBadge: "badge badge-red", catText: "PCCC", catStyle: { background: "#ffeded", color: "#f5222d" },
    statBadge: "badge badge-green", statText: "Hoàn thành",
    priClass: "pri-dot pri-high", priText: "Khẩn cấp",
  },
  {
    id: "#YC-2405-038", name: "Thay toàn bộ bóng đèn khu vực hầm xe B2", date: "14/05/2024",
    avatar: "KT", requester: "Kỹ thuật viên",
    catBadge: "badge badge-sky", catText: "Điện",
    statBadge: "badge badge-green", statText: "Hoàn thành",
    priClass: "pri-dot pri-low", priText: "Thấp",
  },
  {
    id: "#YC-2404-029 · Quá hạn 14 ngày", rowStyle: { background: "#fff8f8" }, idStyle: { color: "#f5222d" },
    name: "Thay ổ khóa cửa phòng kỹ thuật tầng 5 Block C", date: "10/04/2024", dateStyle: { color: "#f5222d" },
    avatar: "BV", avatarStyle: { background: "#ffeded", color: "#f5222d" }, requester: "Bảo vệ tầng 5",
    catBadge: "badge badge-gray", catText: "Khu chung",
    statBadge: "badge badge-red", statText: "Quá hạn",
    priClass: "pri-dot pri-high", priText: "Khẩn cấp",
  },
];

export default function VanHanhPage() {
  return (
    <div className="vhbt-page">
      {/* ── Page Header ── */}
      <div className="page-hd">
        <div>
          <h1 className="page-title">Vận hành &amp; Bảo trì</h1>
          <p className="page-sub">Quản lý yêu cầu bảo trì và tình trạng hệ thống tòa nhà</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Tháng 5/2024
            <ChevronDown />
          </button>
          <button className="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Xuất báo cáo
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tạo yêu cầu mới
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#e4f1ff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Tổng yêu cầu tháng này</div>
            <div className="kpi-value">47</div>
            <div className="kpi-trend">
              <ArrowUp />
              <span className="kpi-pct up">+15.2%</span>
              <span className="kpi-tlabel">so với tháng trước</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#fff1de" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Đang xử lý</div>
            <div className="kpi-value warning">12</div>
            <div className="kpi-trend">
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="3" fill="#c8761b" /></svg>
              <span className="kpi-pct neutral" style={{ color: "#c8761b" }}>Đang tiến hành</span>
              <span className="kpi-tlabel">— cần theo dõi</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#e3fbed" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Hoàn thành tháng này</div>
            <div className="kpi-value">32</div>
            <div className="kpi-trend">
              <ArrowUp />
              <span className="kpi-pct up">+8.3%</span>
              <span className="kpi-tlabel">so với tháng trước</span>
            </div>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#ffeded" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div>
            <div className="kpi-label">Quá hạn xử lý</div>
            <div className="kpi-value danger">3</div>
            <div className="kpi-trend">
              <ArrowDown />
              <span className="kpi-pct up">−2</span>
              <span className="kpi-tlabel">so với tháng trước</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Middle Row ── */}
      <div className="mid-row">
        <div className="cat-card">
          <div className="card-hd">
            <div className="card-title">Yêu cầu theo hạng mục</div>
            <span className="card-sub">Tháng 5/2024 · 47 yêu cầu</span>
          </div>
          <div className="cat-list">
            {[
              { color: "#f5a623", name: "Điện & chiếu sáng", count: 18, pct: "38%", width: "38%" },
              { color: "#1870c4", name: "Cấp & thoát nước", count: 12, pct: "26%", width: "26%" },
              { color: "#5a3ad9", name: "Thang máy & thang bộ", count: 6, pct: "13%", width: "13%" },
              { color: "#f5222d", name: "PCCC & an ninh", count: 5, pct: "11%", width: "11%" },
              { color: "#1c9d5f", name: "Khu vực chung", count: 6, pct: "13%", width: "13%" },
            ].map((c) => (
              <div className="cat-row" key={c.name}>
                <div className="cat-row-hd">
                  <div className="cat-name">
                    <span className="cat-dot" style={{ background: c.color }}></span>
                    {c.name}
                  </div>
                  <div className="cat-right">
                    <span className="cat-count">{c.count}</span>
                    <span className="cat-pct">{c.pct}</span>
                  </div>
                </div>
                <div className="cat-track">
                  <div className="cat-fill" style={{ width: c.width, background: c.color }}></div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 4, padding: "14px 16px", background: "#fafafa", borderRadius: 12, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#585c7b", fontWeight: 500 }}>Tỉ lệ hoàn thành tháng này</span>
                <span style={{ fontFamily: '"Manrope","Inter",sans-serif', fontSize: 13, fontWeight: 700, color: "#1c9d5f" }}>68.1%</span>
              </div>
              <div style={{ height: 8, background: "#f0f0f5", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", width: "68.1%", borderRadius: 4, background: "linear-gradient(90deg,#22c08a,#1c9d5f)" }}></div>
              </div>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontFamily: '"Manrope","Inter",sans-serif', fontSize: 18, fontWeight: 700, color: "#272727", lineHeight: "22px" }}>
                32<span style={{ fontSize: 13, color: "#585c7b", fontWeight: 500 }}>/47</span>
              </div>
              <div style={{ fontSize: 12, color: "#585c7b", marginTop: 2 }}>yêu cầu</div>
            </div>
          </div>
        </div>

        {/* System status */}
        <div className="sys-card">
          <div className="card-hd">
            <div className="card-title">Tình trạng hệ thống</div>
            <span className="card-sub" style={{ fontSize: 11 }}>Cập nhật 10:45</span>
          </div>
          <div className="sys-grid">
            <div className="sys-row">
              <div className="sys-icon-bg" style={{ background: "#efeeff" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <polyline points="9 10 12 7 15 10" />
                  <polyline points="9 14 12 17 15 14" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Thang máy T1 &amp; T3</div>
                <div className="sys-detail">2 cabin · Hoạt động bình thường</div>
              </div>
              <div className="sys-status"><span className="status-pill status-ok"><span className="status-dot"></span>Bình thường</span></div>
            </div>

            <div className="sys-row">
              <div className="sys-icon-bg" style={{ background: "#fff1de" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <polyline points="9 10 12 7 15 10" />
                  <polyline points="9 14 12 17 15 14" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Thang máy T2</div>
                <div className="sys-detail">Đang bảo dưỡng định kỳ</div>
              </div>
              <div className="sys-status"><span className="status-pill status-warn"><span className="status-dot"></span>Bảo trì</span></div>
            </div>

            <div className="sys-row">
              <div className="sys-icon-bg" style={{ background: "#ffeded" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c0 1.38-.5 2-1 3-.5.94-.5 1.5-.5 2" />
                  <path d="M12 2C6.5 7 5 10.5 7 15c.9 1.8 2.5 2.5 4.5 2.5 3 0 4.5-2 4.5-5 0-1.5-.5-2.5-1.5-3.5-1-1-1.5-2-1.5-3.5z" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Hệ thống PCCC</div>
                <div className="sys-detail">Kiểm tra định kỳ 15/5</div>
              </div>
              <div className="sys-status"><span className="status-pill status-ok"><span className="status-dot"></span>Bình thường</span></div>
            </div>

            <div className="sys-row">
              <div className="sys-icon-bg" style={{ background: "#fff9e0" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Điện dự phòng (UPS)</div>
                <div className="sys-detail">Công suất 99.2% · Ổn định</div>
              </div>
              <div className="sys-status"><span className="status-pill status-ok"><span className="status-dot"></span>Bình thường</span></div>
            </div>

            <div className="sys-row">
              <div className="sys-icon-bg" style={{ background: "#e4f1ff" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Máy bơm nước</div>
                <div className="sys-detail">Tầng hầm B1 &amp; B2 · Hoạt động</div>
              </div>
              <div className="sys-status"><span className="status-pill status-ok"><span className="status-dot"></span>Bình thường</span></div>
            </div>

            <div className="sys-row">
              <div className="sys-icon-bg" style={{ background: "#f0f0f5" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#585c7b" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 7l-7 5 7 5V7z" />
                  <rect x="1" y="5" width="15" height="14" rx="2" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Camera an ninh</div>
                <div className="sys-detail">98/100 camera · 2 đang sửa</div>
              </div>
              <div className="sys-status"><span className="status-pill status-warn"><span className="status-dot"></span>98%</span></div>
            </div>

            <div className="sys-row">
              <div className="sys-icon-bg" style={{ background: "#e3fbed" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Hệ thống thông gió</div>
                <div className="sys-detail">Tất cả tầng · Hoạt động tốt</div>
              </div>
              <div className="sys-status"><span className="status-pill status-ok"><span className="status-dot"></span>Bình thường</span></div>
            </div>

            <div className="sys-row" style={{ paddingBottom: 0, borderBottom: 0 }}>
              <div className="sys-icon-bg" style={{ background: "#efeeff" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div className="sys-body">
                <div className="sys-name">Mạng internet tòa nhà</div>
                <div className="sys-detail">Uptime 99.9% · 1Gbps</div>
              </div>
              <div className="sys-status"><span className="status-pill status-ok"><span className="status-dot"></span>Bình thường</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Work Orders Table ── */}
      <div className="wo-card">
        <div className="card-hd">
          <div className="card-title">Danh sách yêu cầu bảo trì</div>
          <span className="card-link">Xem tất cả →</span>
        </div>

        <div className="wo-filters">
          <button className="filter-tab active">Tất cả (47)</button>
          <button className="filter-tab">Đang xử lý (12)</button>
          <button className="filter-tab">Hoàn thành (32)</button>
          <button className="filter-tab">Quá hạn (3)</button>
          <div className="filter-spacer"></div>
          <div className="search-mini">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            Lọc &amp; Tìm kiếm
          </div>
        </div>

        <div className="wo-table">
          <div className="wo-hd">
            <span>Yêu cầu</span>
            <span>Ngày tạo</span>
            <span>Người yêu cầu</span>
            <span style={{ textAlign: "center" }}>Hạng mục</span>
            <span style={{ textAlign: "center" }}>Trạng thái</span>
            <span style={{ textAlign: "right" }}>Ưu tiên</span>
          </div>

          {workOrders.map((w) => (
            <div className="wo-row" key={w.id} style={w.rowStyle}>
              <div className="wo-info">
                <div className="wo-id" style={w.idStyle}>{w.id}</div>
                <div className="wo-name">{w.name}</div>
              </div>
              <div className="wo-date" style={w.dateStyle}>{w.date}</div>
              <div className="wo-requester">
                <div className="wo-avatar" style={w.avatarStyle}>{w.avatar}</div>
                <span className="wo-req-name">{w.requester}</span>
              </div>
              <div className="wo-cat-wrap"><span className={w.catBadge} style={w.catStyle}>{w.catText}</span></div>
              <div className="wo-stat-wrap"><span className={w.statBadge}>{w.statText}</span></div>
              <div className="wo-pri-wrap"><span className={w.priClass}>{w.priText}</span></div>
            </div>
          ))}
        </div>

        <div className="table-foot">
          <span className="table-count">Hiển thị 1–8 / 47 yêu cầu</span>
          <div className="pagination">
            <button className="pg-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <span className="pg-ellipsis">…</span>
            <button className="pg-btn">6</button>
            <button className="pg-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Upcoming Maintenance Schedule ── */}
      <div className="sched-card">
        <div className="card-hd">
          <div className="card-title">Lịch bảo trì sắp tới</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="card-sub">Tuần 22 — 27 tháng 5, 2024</span>
            <span className="card-link">Xem lịch đầy đủ →</span>
          </div>
        </div>
        <div className="sched-grid">
          {/* Hôm nay */}
          <div className="sched-col today">
            <div className="sched-col-hd">
              <div>
                <div className="sched-day">Thứ Hai</div>
                <div className="sched-date">27</div>
              </div>
              <span className="sched-badge badge badge-blue" style={{ background: "#efeaff", color: "#5a3ad9" }}>Hôm nay</span>
            </div>
            <div className="sched-items">
              <div className="sched-item">
                <div className="sched-item-dot" style={{ background: "#5a3ad9" }}></div>
                <div className="sched-item-body">
                  <div className="sched-item-name">Bảo dưỡng thang máy T2</div>
                  <div className="sched-item-time">08:00 – 12:00 · OTIS VN</div>
                </div>
              </div>
              <div className="sched-item">
                <div className="sched-item-dot" style={{ background: "#1870c4" }}></div>
                <div className="sched-item-body">
                  <div className="sched-item-name">Vệ sinh bể ngầm tầng hầm</div>
                  <div className="sched-item-time">14:00 – 17:00 · MT Xanh</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sched-col">
            <div className="sched-col-hd">
              <div>
                <div className="sched-day">Thứ Ba</div>
                <div className="sched-date">28</div>
              </div>
            </div>
            <div className="sched-items">
              <div className="sched-item">
                <div className="sched-item-dot" style={{ background: "#f5a623" }}></div>
                <div className="sched-item-body">
                  <div className="sched-item-name">Thay bóng đèn hành lang Block C</div>
                  <div className="sched-item-time">09:00 – 11:00 · Kỹ thuật viên</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sched-col">
            <div className="sched-col-hd">
              <div>
                <div className="sched-day">Thứ Tư</div>
                <div className="sched-date">29</div>
              </div>
            </div>
            <div className="sched-items">
              <div className="sched-item">
                <div className="sched-item-dot" style={{ background: "#f5222d" }}></div>
                <div className="sched-item-body">
                  <div className="sched-item-name">Kiểm tra PCCC định kỳ Q3</div>
                  <div className="sched-item-time">08:30 – 12:00 · PCCC Sài Gòn</div>
                </div>
              </div>
              <div className="sched-item">
                <div className="sched-item-dot" style={{ background: "#1870c4" }}></div>
                <div className="sched-item-body">
                  <div className="sched-item-name">Kiểm tra hệ thống bơm nước</div>
                  <div className="sched-item-time">14:00 – 16:00 · Cơ điện lạnh BK</div>
                </div>
              </div>
            </div>
          </div>

          <div className="sched-col">
            <div className="sched-col-hd">
              <div>
                <div className="sched-day">T.Năm – T.Sáu</div>
                <div className="sched-date">30–31</div>
              </div>
            </div>
            <div className="sched-items">
              <div className="sched-item">
                <div className="sched-item-dot" style={{ background: "#1c9d5f" }}></div>
                <div className="sched-item-body">
                  <div className="sched-item-name">Sơn lại hành lang Block A tầng 1–5</div>
                  <div className="sched-item-time">08:00 – 17:00 · XD Việt Nam</div>
                </div>
              </div>
              <div className="sched-item">
                <div className="sched-item-dot" style={{ background: "#585c7b" }}></div>
                <div className="sched-item-body">
                  <div className="sched-item-name">Kiểm tra camera an ninh hầm B2</div>
                  <div className="sched-item-time">09:00 – 11:00 · Kỹ thuật viên</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
