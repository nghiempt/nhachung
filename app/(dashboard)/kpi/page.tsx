"use client";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

const KPI_CAT_LABEL: Record<string, string> = {
  FINANCE: "Tài chính", MAINTENANCE: "Bảo trì hạ tầng", SATISFACTION: "Dịch vụ cư dân",
  LEGAL: "Pháp lý", OPERATIONS: "Vận hành", SECURITY: "An ninh & PCCC",
};
const KPI_CAT_COLOR: Record<string, string> = {
  FINANCE: "#1c9d5f", MAINTENANCE: "#c8761b", SATISFACTION: "#4137f9",
  LEGAL: "#5a3ad9", OPERATIONS: "#1870c4", SECURITY: "#f5222d",
};
const RATING_LABEL: Record<string, string> = {
  EXCELLENT: "Xuất sắc", GOOD: "Tốt", AVERAGE: "Trung bình", POOR: "Kém",
};
const RATING_BADGE: Record<string, { class: string; text: string }> = {
  EXCELLENT: { class: "badge badge-green", text: "Xuất sắc" },
  GOOD: { class: "badge badge-green", text: "Tốt" },
  AVERAGE: { class: "badge badge-orange", text: "Trung bình" },
  POOR: { class: "badge badge-red", text: "Kém" },
};
const INDICATOR_STATUS: Record<string, { class: string; text: string }> = {
  ON_TRACK: { class: "badge badge-green", text: "Đạt" },
  NEEDS_ATTENTION: { class: "badge badge-orange", text: "Cần cải thiện" },
  OFF_TRACK: { class: "badge badge-red", text: "Chưa đạt" },
};
const initialsKpi = (name: string) => name.split(" ").slice(-2).map((p) => p[0]).join("").toUpperCase();
const MEMBER_PALETTE = [
  { bg: "#efeeff", color: "#4137f9" },
  { bg: "#e3fbed", color: "#1c9d5f" },
  { bg: "#e4f1ff", color: "#1870c4" },
  { bg: "#fff1de", color: "#c8761b" },
  { bg: "#ffeded", color: "#f5222d" },
];

type KpiRow = {
  metric: string;
  unit: string;
  target: string;
  actual: string;
  actualClass?: "green" | "orange" | "red";
  achPct: string;
  achColor: string;
  achWidth: string;
  achFillColor: string;
  pts: string;
  ptsStyle?: React.CSSProperties;
  badgeClass: string;
  badgeText: string;
};

type KpiGroup = {
  label: string;
  color: string;
  rows: KpiRow[];
};

const groups: KpiGroup[] = [
  {
    label: "Tài chính", color: "#1c9d5f",
    rows: [
      { metric: "Tỉ lệ thu phí quản lý", unit: "% căn hộ đóng đúng hạn", target: "≥ 95%", actual: "98.6%", actualClass: "green", achPct: "103.8%", achColor: "#1c9d5f", achWidth: "100%", achFillColor: "#1c9d5f", pts: "20/20", badgeClass: "badge badge-green", badgeText: "Vượt" },
      { metric: "Tỉ lệ thu quỹ bảo trì", unit: "% căn hộ đóng đúng hạn", target: "≥ 90%", actual: "98.6%", actualClass: "green", achPct: "109.6%", achColor: "#1c9d5f", achWidth: "100%", achFillColor: "#1c9d5f", pts: "20/20", badgeClass: "badge badge-green", badgeText: "Vượt" },
      { metric: "Kiểm soát chi phí vận hành", unit: "% so với ngân sách", target: "≤ 105%", actual: "98.3%", actualClass: "green", achPct: "100%", achColor: "#1c9d5f", achWidth: "100%", achFillColor: "#1c9d5f", pts: "15/15", badgeClass: "badge badge-green", badgeText: "Đạt" },
    ],
  },
  {
    label: "Vận hành", color: "#1870c4",
    rows: [
      { metric: "Tỉ lệ xử lý yêu cầu đúng hạn", unit: "% yêu cầu hoàn thành đúng SLA", target: "≥ 90%", actual: "93.6%", actualClass: "green", achPct: "104%", achColor: "#1c9d5f", achWidth: "100%", achFillColor: "#1870c4", pts: "18/20", badgeClass: "badge badge-green", badgeText: "Đạt" },
      { metric: "Thời gian phản hồi sự cố", unit: "Phút trung bình", target: "≤ 30ph", actual: "34ph", actualClass: "orange", achPct: "88.2%", achColor: "#c8761b", achWidth: "88%", achFillColor: "#c8761b", pts: "13/15", ptsStyle: { color: "#c8761b" }, badgeClass: "badge badge-orange", badgeText: "Cần cải thiện" },
    ],
  },
  {
    label: "Dịch vụ cư dân", color: "#4137f9",
    rows: [
      { metric: "Chỉ số hài lòng cư dân (CSAT)", unit: "Điểm trung bình / 5", target: "≥ 4.2", actual: "4.38", actualClass: "green", achPct: "104.3%", achColor: "#1c9d5f", achWidth: "100%", achFillColor: "#4137f9", pts: "20/20", badgeClass: "badge badge-green", badgeText: "Vượt" },
      { metric: "Tỉ lệ giải quyết phản ánh", unit: "% phản ánh được xử lý trong 5 ngày", target: "≥ 85%", actual: "91.3%", actualClass: "green", achPct: "107.4%", achColor: "#1c9d5f", achWidth: "100%", achFillColor: "#4137f9", pts: "18/20", badgeClass: "badge badge-green", badgeText: "Đạt" },
    ],
  },
  {
    label: "An ninh & PCCC", color: "#f5222d",
    rows: [
      { metric: "Số vụ mất an ninh nghiêm trọng", unit: "Tổng vụ việc trong quý", target: "= 0", actual: "0", actualClass: "green", achPct: "100%", achColor: "#1c9d5f", achWidth: "100%", achFillColor: "#f5222d", pts: "20/20", badgeClass: "badge badge-green", badgeText: "Đạt" },
    ],
  },
  {
    label: "Bảo trì hạ tầng", color: "#c8761b",
    rows: [
      { metric: "Thực hiện kế hoạch bảo trì định kỳ", unit: "% hạng mục hoàn thành đúng kế hoạch", target: "≥ 90%", actual: "82%", actualClass: "orange", achPct: "91.1%", achColor: "#c8761b", achWidth: "82%", achFillColor: "#c8761b", pts: "12/15", ptsStyle: { color: "#c8761b" }, badgeClass: "badge badge-orange", badgeText: "Cần cải thiện" },
    ],
  },
];

export default function KpiPage() {
  const { data } = useApi(() => api.kpi(), []);
  const period = data?.period;
  const summary = data?.summary ?? { totalScore: 87.4, rating: "EXCELLENT", achieved: 18, needsAttention: 4, offTrack: 2, totalIndicators: 24 };
  const apiCategories: any[] = data?.categoryScores ?? [];
  const indicators: any[] = data?.indicators ?? [];
  const boardMembers: any[] = data?.boardMembers ?? [];
  const trend: any[] = data?.trend ?? [];

  const totalScore = Number(summary.totalScore) || 87.4;
  const totalScoreCircle = 289;
  const totalScoreDash = (totalScore / 100) * totalScoreCircle;
  const periodLabel = period ? `Quý ${period.quarter}/${period.year}` : "Quý 2/2024";
  const ratingText = RATING_LABEL[summary.rating] ?? "Xuất sắc";

  // Group indicators by category name for the detail table
  const apiGroups: KpiGroup[] = apiCategories.length
    ? apiCategories.map((c: any) => {
        const catIndicators = indicators.filter((i: any) => i.categoryId === c.id);
        const color = KPI_CAT_COLOR[c.name] ?? "#585c7b";
        return {
          label: KPI_CAT_LABEL[c.name] ?? c.name,
          color,
          rows: catIndicators.map((i: any): KpiRow => {
            const ach = Number(i.achievementRate);
            const statusInfo = INDICATOR_STATUS[i.status] ?? INDICATOR_STATUS.ON_TRACK;
            const isGood = i.status === "ON_TRACK";
            const isWarn = i.status === "NEEDS_ATTENTION";
            const achColor = isGood ? "#1c9d5f" : isWarn ? "#c8761b" : "#f5222d";
            return {
              metric: i.name,
              unit: i.unit ?? "",
              target: `${Number(i.targetValue)}${i.unit?.includes("%") ? "" : ""}`,
              actual: `${Number(i.actualValue)}${i.unit?.includes("%") ? "" : ""}`,
              actualClass: isGood ? "green" : isWarn ? "orange" : "red",
              achPct: `${ach.toFixed(1)}%`,
              achColor,
              achWidth: `${Math.min(ach, 100)}%`,
              achFillColor: color,
              pts: `${Number(i.score)}/25`,
              ptsStyle: isWarn ? { color: "#c8761b" } : undefined,
              badgeClass: statusInfo.class,
              badgeText: statusInfo.text,
            };
          }),
        };
      })
    : [];
  const groupsToRender = apiGroups.length ? apiGroups : groups;

  return (
    <div className="kpi-page">
      {/* ── Page Header ── */}
      <div className="page-hd">
        <div>
          <h1 className="page-title">KPI Ban quản trị</h1>
          <p className="page-sub">Đánh giá hiệu quả hoạt động Ban quản trị theo chỉ tiêu đề ra</p>
        </div>
        <div className="page-actions">
          <button className="btn-outline">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {periodLabel}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Cập nhật KPI
          </button>
        </div>
      </div>

      {/* ── Overall Score + Stats ── */}
      <div className="score-row">
        <div className="score-main">
          <div className="score-ring-wrap">
            <svg viewBox="0 0 110 110">
              <circle cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,.15)" strokeWidth="10" />
              <circle
                cx="55" cy="55" r="46" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="10"
                strokeDasharray={`${totalScoreDash} ${totalScoreCircle}`} strokeDashoffset="72.3" strokeLinecap="round"
                transform="rotate(-90 55 55)"
              />
            </svg>
            <div className="score-ring-label">
              <div className="score-big">{totalScore.toFixed(1)}</div>
              <div className="score-max">/100</div>
            </div>
          </div>
          <div className="score-info">
            <div className="score-title">Tổng điểm KPI — {periodLabel}</div>
            <div className="score-grade">{ratingText}</div>
            <div className="score-grade-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Vượt chỉ tiêu 85 điểm
            </div>
            <div className="score-compare">So với Quý 1: <strong>+4.2 điểm ↑</strong></div>
          </div>
        </div>

        <div className="stat-mini">
          <div className="stat-mini-top">
            <div className="stat-mini-icon" style={{ background: "#e3fbed" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div className="stat-mini-trend trend-up">+3 so với Q1</div>
          </div>
          <div className="stat-mini-val green">{summary.achieved}</div>
          <div className="stat-mini-label">Chỉ tiêu đạt / vượt</div>
        </div>

        <div className="stat-mini">
          <div className="stat-mini-top">
            <div className="stat-mini-icon" style={{ background: "#fff1de" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div className="stat-mini-trend trend-same">Theo dõi</div>
          </div>
          <div className="stat-mini-val orange">{summary.needsAttention}</div>
          <div className="stat-mini-label">Chỉ tiêu cần cải thiện</div>
        </div>

        <div className="stat-mini">
          <div className="stat-mini-top">
            <div className="stat-mini-icon" style={{ background: "#ffeded" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <div className="stat-mini-trend trend-down">-1 so với Q1</div>
          </div>
          <div className="stat-mini-val red">{summary.offTrack}</div>
          <div className="stat-mini-label">Chỉ tiêu chưa đạt</div>
        </div>

        <div className="stat-mini">
          <div className="stat-mini-top">
            <div className="stat-mini-icon" style={{ background: "#efeeff" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </div>
            <div className="stat-mini-trend trend-same">Q2/2024</div>
          </div>
          <div className="stat-mini-val">{summary.totalIndicators}</div>
          <div className="stat-mini-label">Tổng chỉ tiêu đánh giá</div>
        </div>
      </div>

      {/* ── Category KPI cards ── */}
      <div className="cat-grid">
        <div className="cat-kpi-card active">
          <div className="cat-icon-bg" style={{ background: "#e3fbed" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <div className="cat-kpi-name">Tài chính</div>
            <div className="cat-kpi-score-row">
              <div className="cat-kpi-score">91</div>
              <div className="cat-kpi-total">/100</div>
            </div>
          </div>
          <div>
            <div className="cat-track"><div className="cat-fill" style={{ width: "91%", background: "#1c9d5f" }}></div></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 11, color: "#585c7b" }}>5/5 chỉ tiêu đạt</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1c9d5f" }}>Xuất sắc</span>
            </div>
          </div>
        </div>

        <div className="cat-kpi-card">
          <div className="cat-icon-bg" style={{ background: "#e4f1ff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M4.93 4.93A10 10 0 0 1 19.07 19.07" />
              <circle cx="12" cy="12" r="1" />
            </svg>
          </div>
          <div>
            <div className="cat-kpi-name">Vận hành</div>
            <div className="cat-kpi-score-row">
              <div className="cat-kpi-score">85</div>
              <div className="cat-kpi-total">/100</div>
            </div>
          </div>
          <div>
            <div className="cat-track"><div className="cat-fill" style={{ width: "85%", background: "#1870c4" }}></div></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 11, color: "#585c7b" }}>4/5 chỉ tiêu đạt</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#1870c4" }}>Tốt</span>
            </div>
          </div>
        </div>

        <div className="cat-kpi-card">
          <div className="cat-icon-bg" style={{ background: "#efeeff" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="cat-kpi-name">Dịch vụ cư dân</div>
            <div className="cat-kpi-score-row">
              <div className="cat-kpi-score">88</div>
              <div className="cat-kpi-total">/100</div>
            </div>
          </div>
          <div>
            <div className="cat-track"><div className="cat-fill" style={{ width: "88%", background: "#4137f9" }}></div></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 11, color: "#585c7b" }}>4/5 chỉ tiêu đạt</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#4137f9" }}>Tốt</span>
            </div>
          </div>
        </div>

        <div className="cat-kpi-card">
          <div className="cat-icon-bg" style={{ background: "#ffeded" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <div>
            <div className="cat-kpi-name">An ninh &amp; PCCC</div>
            <div className="cat-kpi-score-row">
              <div className="cat-kpi-score">90</div>
              <div className="cat-kpi-total">/100</div>
            </div>
          </div>
          <div>
            <div className="cat-track"><div className="cat-fill" style={{ width: "90%", background: "#f5222d" }}></div></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 11, color: "#585c7b" }}>5/5 chỉ tiêu đạt</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#f5222d" }}>Xuất sắc</span>
            </div>
          </div>
        </div>

        <div className="cat-kpi-card">
          <div className="cat-icon-bg" style={{ background: "#fff1de" }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div>
            <div className="cat-kpi-name">Bảo trì hạ tầng</div>
            <div className="cat-kpi-score-row">
              <div className="cat-kpi-score" style={{ color: "#c8761b" }}>76</div>
              <div className="cat-kpi-total">/100</div>
            </div>
          </div>
          <div>
            <div className="cat-track"><div className="cat-fill" style={{ width: "76%", background: "#c8761b" }}></div></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
              <span style={{ fontSize: 11, color: "#585c7b" }}>3/4 chỉ tiêu đạt</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#c8761b" }}>Cần cải thiện</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mid row: Trend + Detail ── */}
      <div className="mid-row">
        <div className="trend-card">
          <div className="card-hd">
            <div className="card-title">Xu hướng điểm KPI</div>
            <span className="card-sub">6 quý gần nhất</span>
          </div>
          <div className="chart-svg-wrap">
            <span className="chart-y-lbl" style={{ top: "6px" }}>100</span>
            <span className="chart-y-lbl" style={{ top: "56px" }}>80</span>
            <span className="chart-y-lbl" style={{ top: "106px" }}>60</span>
            <span className="chart-y-lbl" style={{ top: "156px" }}>40</span>
            <svg viewBox="0 0 330 180" style={{ width: "100%", overflow: "visible", paddingLeft: 34 }}>
              <line x1="34" y1="10" x2="330" y2="10" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="34" y1="60" x2="330" y2="60" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="34" y1="110" x2="330" y2="110" stroke="#f0f0f5" strokeWidth="1" />
              <line x1="34" y1="160" x2="330" y2="160" stroke="#f0f0f5" strokeWidth="1" />

              <text x="70" y="175" textAnchor="middle" fontSize="10.5" fill="#585c7b">Q1/23</text>
              <text x="120" y="175" textAnchor="middle" fontSize="10.5" fill="#585c7b">Q2/23</text>
              <text x="170" y="175" textAnchor="middle" fontSize="10.5" fill="#585c7b">Q3/23</text>
              <text x="220" y="175" textAnchor="middle" fontSize="10.5" fill="#585c7b">Q4/23</text>
              <text x="270" y="175" textAnchor="middle" fontSize="10.5" fill="#585c7b">Q1/24</text>
              <text x="320" y="175" textAnchor="middle" fontSize="10.5" fill="#4137f9" fontWeight="700">Q2/24</text>

              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4137f9" stopOpacity=".18" />
                  <stop offset="100%" stopColor="#4137f9" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon points="70,110 120,100 170,82.5 220,75 270,55 320,25 320,160 70,160" fill="url(#trendGrad)" />
              <polyline
                points="70,110 120,100 170,82.5 220,75 270,55 320,25"
                fill="none" stroke="#4137f9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              />
              <circle cx="70" cy="110" r="4" fill="#4137f9" />
              <circle cx="120" cy="100" r="4" fill="#4137f9" />
              <circle cx="170" cy="82.5" r="4" fill="#4137f9" />
              <circle cx="220" cy="75" r="4" fill="#4137f9" />
              <circle cx="270" cy="55" r="4" fill="#4137f9" />
              <circle cx="320" cy="25" r="6" fill="#fff" stroke="#4137f9" strokeWidth="2.5" />

              <rect x="288" y="4" width="52" height="18" rx="5" fill="#4137f9" />
              <text x="314" y="16" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="700">87.4 điểm</text>

              <line x1="34" y1="47.5" x2="330" y2="47.5" stroke="#1c9d5f" strokeWidth="1.5" strokeDasharray="5 4" />
              <text x="330" y="44" textAnchor="end" fontSize="10" fill="#1c9d5f" fontWeight="600">Mục tiêu 85</text>
            </svg>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-line" style={{ background: "#4137f9" }}></div>
              <span className="legend-lbl">Điểm KPI tổng</span>
            </div>
            <div className="legend-item">
              <div className="legend-line" style={{ background: "#1c9d5f", borderTop: "1.5px dashed #1c9d5f", height: 0 }}></div>
              <span className="legend-lbl">Chỉ tiêu</span>
            </div>
          </div>

          {(() => {
            const last = trend[trend.length - 1];
            const prev = trend[trend.length - 2];
            const prevScore = prev?.totalScore != null ? Number(prev.totalScore) : 83.2;
            const lastScore = last?.totalScore != null ? Number(last.totalScore) : totalScore;
            const delta = lastScore - prevScore;
            const prevLabel = prev ? `Q${prev.quarter}/${prev.year}` : "Q1/2024";
            const lastLabel = last ? `Q${last.quarter}/${last.year}` : periodLabel;
            return (
              <div style={{ background: "#fafafa", borderRadius: 12, padding: "14px 16px", display: "flex", gap: 16 }}>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#585c7b", marginBottom: 4 }}>{prevLabel}</div>
                  <div style={{ fontFamily: '"Manrope","Inter",sans-serif', fontSize: 20, fontWeight: 800, color: "#272727" }}>{prevScore.toFixed(1)}</div>
                </div>
                <div style={{ width: 1, background: "#e2e5f1" }}></div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#4137f9", fontWeight: 600, marginBottom: 4 }}>{lastLabel} ●</div>
                  <div style={{ fontFamily: '"Manrope","Inter",sans-serif', fontSize: 20, fontWeight: 800, color: "#4137f9" }}>{lastScore.toFixed(1)}</div>
                </div>
                <div style={{ width: 1, background: "#e2e5f1" }}></div>
                <div style={{ flex: 1, textAlign: "center" }}>
                  <div style={{ fontSize: 12, color: "#585c7b", marginBottom: 4 }}>Tăng trưởng</div>
                  <div style={{ fontFamily: '"Manrope","Inter",sans-serif', fontSize: 20, fontWeight: 800, color: delta >= 0 ? "#1c9d5f" : "#f5222d" }}>{delta >= 0 ? "+" : ""}{delta.toFixed(1)}</div>
                </div>
              </div>
            );
          })()}
        </div>

        <div className="detail-card">
          <div className="card-hd">
            <div className="card-title">Chi tiết chỉ tiêu KPI</div>
            <span className="card-link">Xem tất cả →</span>
          </div>

          <div className="kpi-table">
            <div className="kpi-hd">
              <span>Chỉ tiêu</span>
              <span>Mục tiêu</span>
              <span>Thực tế</span>
              <span>% Đạt</span>
              <span>Điểm</span>
              <span>Kết quả</span>
            </div>

            {groupsToRender.map((g) => (
              <div key={g.label}>
                <div className="kpi-group-label">
                  <span className="kpi-group-dot" style={{ background: g.color }}></span>
                  {g.label}
                </div>
                {g.rows.map((r) => (
                  <div className="kpi-row" key={r.metric}>
                    <div className="kpi-name-col">
                      <div className="kpi-metric">{r.metric}</div>
                      <div className="kpi-unit">{r.unit}</div>
                    </div>
                    <div className="kpi-num">{r.target}</div>
                    <div className={`kpi-num ${r.actualClass ?? ""}`}>{r.actual}</div>
                    <div className="kpi-ach-wrap">
                      <span className="kpi-ach-pct" style={{ color: r.achColor }}>{r.achPct}</span>
                      <div className="kpi-ach-bar">
                        <div className="kpi-ach-fill" style={{ width: r.achWidth, background: r.achFillColor }}></div>
                      </div>
                    </div>
                    <div className="pts-cell"><span className="pts-val" style={r.ptsStyle}>{r.pts}</span></div>
                    <div className="badge-cell"><span className={r.badgeClass}>{r.badgeText}</span></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Members ── */}
      <div className="members-card">
        <div className="card-hd">
          <div className="card-title">Thành viên Ban quản trị</div>
          <span className="card-sub">Nhiệm kỳ 2023–2026</span>
        </div>
        <div className="members-grid">
          {(boardMembers.length ? boardMembers.slice(0, 5).map((b: any, i: number) => {
            const palette = MEMBER_PALETTE[i % MEMBER_PALETTE.length];
            const ratingInfo = b.currentRating ? RATING_BADGE[b.currentRating] : RATING_BADGE.GOOD;
            return {
              initials: initialsKpi(b.user?.fullName ?? "?"),
              bg: palette.bg,
              color: palette.color,
              name: b.user?.fullName ?? "—",
              role: b.position ?? "—",
              score: String(Math.round(Number(b.currentScore ?? 0))),
              badge: ratingInfo.class.replace("badge ", ""),
              badgeText: ratingInfo.text,
            };
          }) : [
            { initials: "NT", bg: "#efeeff", color: "#4137f9", name: "Ông Nguyễn Thanh Bình", role: "Chủ tịch BQT", score: "92", badge: "badge-green", badgeText: "Xuất sắc" },
            { initials: "TL", bg: "#e3fbed", color: "#1c9d5f", name: "Bà Trần Thị Lan Anh", role: "Phó Chủ tịch BQT", score: "89", badge: "badge-green", badgeText: "Tốt" },
            { initials: "PH", bg: "#e4f1ff", color: "#1870c4", name: "Ông Phạm Hoàng Nam", role: "Uỷ viên Tài chính", score: "91", badge: "badge-green", badgeText: "Xuất sắc" },
            { initials: "LV", bg: "#fff1de", color: "#c8761b", name: "Ông Lê Văn Đức", role: "Uỷ viên Kỹ thuật", score: "83", badge: "badge-orange", badgeText: "Cần cải thiện" },
            { initials: "VT", bg: "#ffeded", color: "#f5222d", name: "Bà Võ Thị Mai", role: "Uỷ viên An ninh", score: "88", badge: "badge-green", badgeText: "Tốt" },
          ]).map((m: any) => (
            <div className="member-item" key={m.initials}>
              <div className="member-avatar" style={{ background: m.bg, color: m.color }}>{m.initials}</div>
              <div>
                <div className="member-name">{m.name}</div>
                <div className="member-role">{m.role}</div>
              </div>
              <div className="member-score-row">
                <span className="member-score">{m.score}</span>
                <span className={`member-badge ${m.badge} badge`} style={{ fontSize: 10 }}>{m.badgeText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
