"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

const ARCHIVE_FILE_EXT: Record<string, "PDF" | "DOC" | "XLS"> = {
  PDF: "PDF", DOCX: "DOC", XLSX: "XLS",
};
const guessCatKey = (cat?: string): "fin" | "ops" | "sec" | "bqt" | "maint" => {
  if (!cat) return "bqt";
  const c = cat.toLowerCase();
  if (c.includes("tài chính") || c.includes("thu chi")) return "fin";
  if (c.includes("vận hành")) return "ops";
  if (c.includes("an ninh") || c.includes("pccc") || c.includes("bảo mật")) return "sec";
  if (c.includes("bảo trì") || c.includes("kỹ thuật")) return "maint";
  return "bqt";
};
const fmtArchSize = (bytes?: number) => {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};
const fmtGB = (bytes?: number) => {
  if (!bytes) return "0 KB";
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)} GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
};

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

const CalIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#585c7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

type FileExt = "PDF" | "DOC" | "XLS";
type Cat = "fin" | "ops" | "sec" | "bqt" | "maint";

const catText: Record<Cat, string> = {
  fin: "Tài chính",
  ops: "Vận hành",
  sec: "An ninh",
  bqt: "BQT",
  maint: "Bảo trì",
};

type Doc = { ext: FileExt; name: string; cat: Cat; date: string; size: string; dl: string };

type MonthGroup = { name: string; count: string; docs: Doc[] };

const months2024: MonthGroup[] = [
  {
    name: "Tháng 5 / 2024", count: "6 tài liệu",
    docs: [
      { ext: "PDF", name: "Biên bản họp BQT tháng 5/2024", cat: "bqt", date: "22/05/2024", size: "1.2 MB", dl: "47" },
      { ext: "XLS", name: "Bảng tổng hợp thu phí tháng 5/2024", cat: "fin", date: "20/05/2024", size: "854 KB", dl: "38" },
      { ext: "PDF", name: "Kết quả kiểm tra PCCC định kỳ Q2/2024", cat: "sec", date: "16/05/2024", size: "3.1 MB", dl: "29" },
      { ext: "DOC", name: "Nghị quyết BQT số 12/2024 — Phê duyệt ngân sách bảo trì Q3", cat: "bqt", date: "10/05/2024", size: "420 KB", dl: "93" },
    ],
  },
  {
    name: "Tháng 4 / 2024", count: "5 tài liệu",
    docs: [
      { ext: "PDF", name: "Báo cáo tổng hợp Quý 1/2024", cat: "fin", date: "15/04/2024", size: "5.8 MB", dl: "531" },
      { ext: "PDF", name: "Biên bản họp BQT tháng 4/2024", cat: "bqt", date: "25/04/2024", size: "980 KB", dl: "124" },
      { ext: "XLS", name: "Bảng kê chi phí bảo trì thang máy T2 — Q1/2024", cat: "maint", date: "08/04/2024", size: "1.4 MB", dl: "67" },
    ],
  },
  {
    name: "Tháng 1 / 2024", count: "3 tài liệu",
    docs: [
      { ext: "PDF", name: "Báo cáo thường niên Ban quản trị năm 2023", cat: "bqt", date: "20/01/2024", size: "12.3 MB", dl: "892" },
      { ext: "DOC", name: "Kế hoạch hoạt động BQT năm 2024", cat: "bqt", date: "10/01/2024", size: "2.1 MB", dl: "314" },
    ],
  },
];

function DocRow({ d }: { d: Doc }) {
  const badgeCls = d.ext === "PDF" ? "badge-pdf" : d.ext === "DOC" ? "badge-doc" : "badge-xls";
  return (
    <div className="doc-row">
      <div className="doc-name-col">
        <span className={`doc-file-badge ${badgeCls}`}>{d.ext}</span>
        <span className="doc-name">{d.name}</span>
      </div>
      <div className="doc-cat"><span className={`badge badge-${d.cat}`}>{catText[d.cat]}</span></div>
      <div className="doc-date">{d.date}</div>
      <div className="doc-size">{d.size}</div>
      <div className="doc-dl">{d.dl}</div>
      <div className="doc-act">
        <button className="doc-btn"><EyeIcon /></button>
        <button className="doc-btn"><DownloadIcon /></button>
      </div>
    </div>
  );
}

function MonthBlock({ m }: { m: MonthGroup }) {
  return (
    <div className="month-group">
      <div className="month-hd">
        <CalIcon />
        <span className="month-name">{m.name}</span>
        <span className="month-count">{m.count}</span>
        <svg className="month-toggle" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </div>
      <div className="doc-table">
        <div className="doc-hd">
          <span>Tên tài liệu</span>
          <span>Danh mục</span>
          <span>Ngày tải</span>
          <span>Dung lượng</span>
          <span>Lượt tải</span>
          <span></span>
        </div>
        {m.docs.map((d) => <DocRow key={d.name} d={d} />)}
      </div>
    </div>
  );
}

const VI_MONTH = ["", "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];

export default function LichSuPage() {
  const [year, setYear] = useState<number | undefined>(undefined);
  const { data } = useApi(() => api.archive(year), [year]);

  const stats = data?.stats ?? { totalDocuments: 347, totalSizeBytes: 2_800_000_000, years: 4 };
  const years: number[] = data?.years?.length ? data.years : [2024, 2023, 2022, 2021];
  const currentYear = data?.currentYear ?? years[0] ?? 2024;
  const byMonth: Record<number, any[]> = data?.byMonth ?? {};
  const categoryStats: any[] = data?.categoryStats ?? [];

  const sortedMonthEntries = Object.entries(byMonth)
    .map(([m, docs]) => [Number(m), docs as any[]] as const)
    .sort((a, b) => b[0] - a[0]);

  const totalDocsInYear = sortedMonthEntries.reduce((s, [, docs]) => s + docs.length, 0);

  const apiMonths: MonthGroup[] = sortedMonthEntries.map(([monthNum, docs]) => ({
    name: `${VI_MONTH[monthNum] || `Tháng ${monthNum}`} / ${currentYear}`,
    count: `${docs.length} tài liệu`,
    docs: docs.map((d: any): Doc => ({
      ext: ARCHIVE_FILE_EXT[d.fileType] ?? "PDF",
      name: d.name,
      cat: guessCatKey(d.category),
      date: new Date(d.createdAt).toLocaleDateString("vi-VN"),
      size: fmtArchSize(d.fileSize),
      dl: String(d.downloadCount ?? 0),
    })),
  }));

  const monthsToRender = apiMonths.length ? apiMonths : months2024;
  const totalDownloads = monthsToRender.reduce((s, m) => s + m.docs.reduce((ss, d) => ss + Number(d.dl), 0), 0);

  return (
    <div className="lichsu-page">
      {/* ── Page Header ── */}
      <div className="page-hd">
        <div>
          <h1 className="page-title">Lịch sử &amp; Lưu trữ</h1>
          <p className="page-sub">Kho lưu trữ toàn bộ tài liệu hoạt động của Ban quản trị</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Xuất danh sách
          </button>
          <button className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Tải lên tài liệu
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="stat-row">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#efeeff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-val">{stats.totalDocuments}</div>
            <div className="stat-lbl">Tổng tài liệu lưu trữ</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e4f1ff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-val">{fmtGB(stats.totalSizeBytes)}</div>
            <div className="stat-lbl">Dung lượng lưu trữ</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#e3fbed" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-val">{stats.years}</div>
            <div className="stat-lbl">Năm lưu trữ ({years.length ? `${years[years.length - 1]}–${years[0]}` : "2021–2024"})</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fff1de" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </div>
          <div className="stat-body">
            <div className="stat-val">{totalDownloads.toLocaleString("en-US")}</div>
            <div className="stat-lbl">Tổng lượt tải xuống</div>
          </div>
        </div>
      </div>

      {/* ── Search + filter ── */}
      <div className="search-row">
        <div className="search-full">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b4b7c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input placeholder="Tìm theo tên tài liệu, nội dung, người tải lên..." />
        </div>
        <div className="filter-select">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Danh mục: Tất cả
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <div className="filter-select">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          </svg>
          Loại: Tất cả
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        <div className="year-tabs">
          {years.map((y) => (
            <button key={y} className={`year-tab${y === currentYear ? " active" : ""}`} onClick={() => setYear(y)}>{y}</button>
          ))}
        </div>
      </div>

      {/* ── Archive layout ── */}
      <div className="archive-layout">
        {/* Main */}
        <div className="archive-main">
          {/* Current year */}
          <div className="year-section">
            <div className="year-header">
              <span className="year-tag">{currentYear}</span>
              <span className="year-count">{totalDocsInYear || 28} tài liệu · {monthsToRender.length || 5} tháng</span>
              <div className="year-line"></div>
            </div>
            {monthsToRender.map((m) => <MonthBlock key={m.name} m={m} />)}
          </div>

          {/* 2023 preview */}
          <div className="year-section">
            <div className="year-header">
              <span className="year-tag" style={{ background: "#f7f7f7", color: "#585c7b", borderColor: "#e2e5f1" }}>2023</span>
              <span className="year-count">96 tài liệu · 12 tháng</span>
              <div className="year-line"></div>
              <a href="#" style={{ fontSize: 13, fontWeight: 500, color: "#4137f9", whiteSpace: "nowrap" }}>Xem tất cả →</a>
            </div>
            <div className="month-group">
              <div className="month-hd">
                <CalIcon />
                <span className="month-name">Tháng 12 / 2023</span>
                <span className="month-count">8 tài liệu</span>
                <svg className="month-toggle" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <div style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#585c7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <span style={{ fontSize: 13, color: "#585c7b" }}>Bấm để mở rộng 8 tài liệu tháng 12/2023</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="archive-sidebar">
          {/* Theo danh mục */}
          <div className="sw-card">
            <div className="sw-title">Tài liệu theo danh mục</div>
            <div className="sw-list">
              {(categoryStats.length ? categoryStats.slice(0, 5).map((c: any, i: number) => {
                const max = categoryStats[0]?._count?._all ?? categoryStats[0]?.count ?? 124;
                const count = c.count ?? c._count?._all ?? 0;
                const colors = ["#5a3ad9", "#1c9d5f", "#c8761b", "#f5222d", "#1870c4"];
                return { color: colors[i % colors.length], label: c.category ?? "Khác", count: String(count), width: `${Math.max(10, Math.round((count / Math.max(max, 1)) * 100))}%` };
              }) : [
                { color: "#5a3ad9", label: "Ban quản trị", count: "124", width: "72%" },
                { color: "#1c9d5f", label: "Tài chính", count: "89", width: "52%" },
                { color: "#c8761b", label: "Bảo trì", count: "71", width: "42%" },
                { color: "#f5222d", label: "An ninh & PCCC", count: "38", width: "22%" },
                { color: "#1870c4", label: "Vận hành", count: "25", width: "15%" },
              ]).map((c: any) => (
                <div key={c.label}>
                  <div className="sw-row">
                    <span className="sw-dot" style={{ background: c.color }}></span>
                    <span className="sw-label">{c.label}</span>
                    <span className="sw-count">{c.count}</span>
                  </div>
                  <div className="sw-bar-track">
                    <div className="sw-bar-fill" style={{ width: c.width, background: c.color }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top downloads */}
          <div className="sw-card">
            <div className="sw-title">Tải xuống nhiều nhất</div>
            <div className="sw-list">
              {[
                { rank: "#1", color: "#4137f9", title: "Báo cáo thường niên 2023", count: "892 lượt tải" },
                { rank: "#2", color: "#5a3ad9", title: "Báo cáo tổng hợp Q1/2024", count: "531 lượt tải" },
                { rank: "#3", color: "#1c9d5f", title: "Kế hoạch hoạt động 2024", count: "314 lượt tải" },
                { rank: "#4", color: "#c8761b", title: "Biên bản họp BQT T4/2024", count: "124 lượt tải" },
              ].map((t) => (
                <div className="sw-row" key={t.rank} style={{ alignItems: "flex-start", gap: 8 }}>
                  <span style={{ fontFamily: '"Manrope","Inter",sans-serif', fontSize: 13, fontWeight: 800, color: t.color, flexShrink: 0, width: 18 }}>{t.rank}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: "#272727", lineHeight: "16px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: "#585c7b", marginTop: 2 }}>{t.count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Loại file */}
          <div className="sw-card">
            <div className="sw-title">Phân loại file</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { tag: "PDF", tagBg: "#fff1f0", tagColor: "#f5222d", label: "PDF", count: "198", pct: "57%" },
                { tag: "XLS", tagBg: "#e8f8ee", tagColor: "#1c9d5f", label: "Excel", count: "94", pct: "27%" },
                { tag: "DOC", tagBg: "#e8f0fe", tagColor: "#1870c4", label: "Word", count: "55", pct: "16%" },
              ].map((f) => (
                <div key={f.tag} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 9, fontWeight: 800, padding: "3px 6px", borderRadius: 4, background: f.tagBg, color: f.tagColor }}>{f.tag}</span>
                    <span style={{ fontSize: 13, color: "#585c7b" }}>{f.label}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: '"Manrope","Inter",sans-serif', fontSize: 13, fontWeight: 700, color: "#272727" }}>{f.count}</span>
                    <span style={{ fontSize: 12, color: "#585c7b" }}>{f.pct}</span>
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
