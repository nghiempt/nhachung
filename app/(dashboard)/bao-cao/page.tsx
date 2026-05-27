const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

type FileType = "pdf" | "doc" | "xls";

const FileIcon = ({ type }: { type: FileType }) => {
  const color = type === "pdf" ? "#f5222d" : type === "doc" ? "#1870c4" : "#1c9d5f";
  const bg = type === "pdf" ? "#fff1f0" : type === "doc" ? "#e8f0fe" : "#e8f8ee";
  return (
    <div className={`rc-file-icon file-${type}`}>
      <svg width="22" height="26" viewBox="0 0 24 28" fill="none">
        <rect x="2" y="0" width="20" height="28" rx="3" fill={bg} />
        <path d="M14 0v6h6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 0l6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <div className="rc-file-ext" style={{ color }}>{type.toUpperCase()}</div>
    </div>
  );
};

type Report = {
  type: FileType;
  period: string;
  title: string;
  date: string;
  badgeClass: string;
  badgeText: string;
  rightText: string;
};

const monthlyReports: Report[] = [
  { type: "pdf", period: "Báo cáo tháng", title: "Báo cáo hoạt động BQT tháng 5/2024", date: "Hạn nộp: 10/06/2024", badgeClass: "badge badge-orange", badgeText: "Chờ duyệt", rightText: "Ô. Nguyễn Thanh Bình" },
  { type: "pdf", period: "Báo cáo tháng", title: "Báo cáo hoạt động BQT tháng 4/2024", date: "Phát hành: 08/05/2024 · 2.4 MB", badgeClass: "badge badge-green", badgeText: "Đã phát hành", rightText: "247 lượt xem" },
  { type: "pdf", period: "Báo cáo tháng", title: "Báo cáo hoạt động BQT tháng 3/2024", date: "Phát hành: 05/04/2024 · 2.1 MB", badgeClass: "badge badge-green", badgeText: "Đã phát hành", rightText: "312 lượt xem" },
  { type: "doc", period: "Báo cáo tháng", title: "Báo cáo hoạt động BQT tháng 2/2024", date: "Phát hành: 07/03/2024 · 1.8 MB", badgeClass: "badge badge-green", badgeText: "Đã phát hành", rightText: "198 lượt xem" },
  { type: "pdf", period: "Báo cáo tháng", title: "Báo cáo hoạt động BQT tháng 1/2024", date: "Phát hành: 06/02/2024 · 2.2 MB", badgeClass: "badge badge-green", badgeText: "Đã phát hành", rightText: "276 lượt xem" },
];

const quarterlyReports: Report[] = [
  { type: "pdf", period: "Báo cáo quý", title: "Báo cáo tổng hợp Quý 1/2024", date: "Phát hành: 15/04/2024 · 5.8 MB", badgeClass: "badge badge-green", badgeText: "Đã phát hành", rightText: "531 lượt xem" },
  { type: "xls", period: "Báo cáo quý", title: "Báo cáo tài chính Quý 2/2024", date: "Hạn nộp: 15/07/2024", badgeClass: "badge badge-orange", badgeText: "Chờ duyệt", rightText: "Bà Trần Thị Lan Anh" },
  { type: "pdf", period: "Báo cáo năm", title: "Báo cáo thường niên BQT năm 2023", date: "Phát hành: 20/01/2024 · 12.3 MB", badgeClass: "badge badge-green", badgeText: "Đã phát hành", rightText: "892 lượt xem" },
];

type UpcomingRow = {
  title: string;
  sub: string;
  date: string;
  urgent?: boolean;
  person: string;
  badgeClass: string;
  badgeText: string;
};

const upcoming: UpcomingRow[] = [
  { title: "Báo cáo tháng 6/2024", sub: "Tổng hợp hoạt động BQT", date: "10/07/2024 · 18 ngày", urgent: true, person: "Ô. Nguyễn Thanh Bình", badgeClass: "badge badge-gray", badgeText: "Chưa soạn" },
  { title: "Báo cáo tổng hợp Q2/2024", sub: "Tổng hợp hoạt động cả quý", date: "15/07/2024 · 23 ngày", urgent: true, person: "Bà Trần Thị Lan Anh", badgeClass: "badge badge-orange", badgeText: "Chờ duyệt" },
  { title: "Báo cáo tài chính Q2/2024", sub: "Thu chi và quỹ bảo trì", date: "20/07/2024 · 28 ngày", person: "Ô. Phạm Hoàng Nam", badgeClass: "badge badge-gray", badgeText: "Chưa soạn" },
  { title: "Báo cáo vận hành Q2/2024", sub: "Bảo trì, an ninh, sự cố", date: "20/07/2024 · 28 ngày", person: "Ô. Lê Văn Đức", badgeClass: "badge badge-gray", badgeText: "Chưa soạn" },
];

function ReportCard({ r }: { r: Report }) {
  return (
    <div className="report-card">
      <div className="rc-top">
        <FileIcon type={r.type} />
        <div className="rc-meta">
          <div className="rc-period">{r.period}</div>
          <div className="rc-title">{r.title}</div>
          <div className="rc-date">{r.date}</div>
        </div>
      </div>
      <div className="rc-divider"></div>
      <div className="rc-bottom">
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span className={r.badgeClass}>{r.badgeText}</span>
          <span style={{ fontSize: 11, color: "#585c7b" }}>{r.rightText}</span>
        </div>
        <div className="rc-actions">
          <button className="rc-btn" title="Xem"><EyeIcon /></button>
          <button className="rc-btn" title="Tải xuống"><DownloadIcon /></button>
        </div>
      </div>
    </div>
  );
}

export default function BaoCaoPage() {
  return (
    <div className="bcdk-page">
      {/* ── Page Header ── */}
      <div className="page-hd">
        <div>
          <h1 className="page-title">Báo cáo định kỳ</h1>
          <p className="page-sub">Hệ thống báo cáo tháng, quý và năm của Ban quản trị</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Năm 2024
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tạo báo cáo mới
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e4f1ff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </div>
          <div className="stat-val">28</div>
          <div className="stat-lbl">Tổng báo cáo năm 2024</div>
          <div className="stat-trend">
            <span style={{ color: "#1c9d5f" }}>↑ +4</span>
            <span className="trend-neu"> so với 2023</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e3fbed" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div className="stat-val green">21</div>
          <div className="stat-lbl">Đã phát hành</div>
          <div className="stat-trend"><span className="trend-neu">5 tháng đầu năm</span></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fff1de" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <div className="stat-val orange">3</div>
          <div className="stat-lbl">Chờ phê duyệt</div>
          <div className="stat-trend"><span style={{ color: "#c8761b" }}>● Cần xem xét</span></div>
        </div>

        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#ffeded" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
          </div>
          <div className="stat-val red">2</div>
          <div className="stat-lbl">Sắp đến hạn nộp</div>
          <div className="stat-trend"><span style={{ color: "#f5222d" }}>Trong 7 ngày tới</span></div>
        </div>
      </div>

      {/* ── Filter ── */}
      <div className="filter-bar">
        <button className="filter-tab active">Tất cả (28)</button>
        <button className="filter-tab">Báo cáo tháng (20)</button>
        <button className="filter-tab">Báo cáo quý (5)</button>
        <button className="filter-tab">Báo cáo năm (3)</button>
        <div className="filter-spacer"></div>
        <div className="search-mini">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Lọc &amp; Tìm kiếm
        </div>
      </div>

      {/* ── Báo cáo tháng ── */}
      <div className="report-section">
        <div className="section-label">Báo cáo tháng — 2024</div>
        <div className="report-grid">
          {monthlyReports.map((r) => <ReportCard key={r.title} r={r} />)}

          {/* Chưa soạn placeholder */}
          <div className="report-card" style={{ borderStyle: "dashed", background: "#fafafa" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 0", textAlign: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "#f7f7f7", border: "1.5px dashed #d4d7e5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b4b7c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#585c7b" }}>Báo cáo tháng 6/2024</div>
                <div style={{ fontSize: 12, color: "#b4b7c9", marginTop: 3 }}>Hạn nộp: 10/07/2024</div>
              </div>
              <span className="badge badge-gray">Chưa soạn</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Báo cáo quý ── */}
      <div className="report-section">
        <div className="section-label">Báo cáo quý — 2024</div>
        <div className="report-grid">
          {quarterlyReports.map((r) => <ReportCard key={r.title} r={r} />)}
        </div>
      </div>

      {/* ── Upcoming ── */}
      <div className="upcoming-card">
        <div className="card-hd">
          <div className="card-title">Lịch nộp báo cáo sắp tới</div>
          <span className="card-link">Xem lịch đầy đủ →</span>
        </div>
        <div className="upcoming-list">
          <div className="up-row up-hd">
            <span>Tên báo cáo</span>
            <span>Hạn nộp</span>
            <span>Người phụ trách</span>
            <span>Trạng thái</span>
            <span style={{ textAlign: "right" }}>Thao tác</span>
          </div>
          {upcoming.map((u) => (
            <div className="up-row" key={u.title}>
              <div>
                <div className="up-title">{u.title}</div>
                <div className="up-sub">{u.sub}</div>
              </div>
              <div className={`up-date${u.urgent ? " urgent" : ""}`}>{u.date}</div>
              <div className="up-person">{u.person}</div>
              <div className="badge-cell"><span className={u.badgeClass}>{u.badgeText}</span></div>
              <div className="action-cell">
                <button className="rc-btn"><EditIcon /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
