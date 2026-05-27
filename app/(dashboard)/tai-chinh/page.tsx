"use client";
/* eslint-disable @next/next/no-img-element */
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

const fmtVNDfull = (n?: number) => (n != null ? `${Math.round(n).toLocaleString("vi-VN")} đ` : "—");
const fmtMonthLabel = (key: string) => {
  const [y, m] = key.split("-");
  return `T${Number(m)}/${y.slice(2)}`;
};

export default function FinanceOverviewPage() {
  const { data } = useApi(() => api.finance(6), []);
  const kpis = data?.kpis ?? { totalIncome: 2_845_600_000, totalExpense: 2_138_900_000, surplus: 706_700_000, maintenanceFundBalance: 8_265_000_000, collectionRate: 98.6 };
  const monthly: any[] = data?.monthly ?? [];
  const expenseBreakdown: any[] = data?.expenseBreakdown ?? [];
  const latestReport: any = data?.latestReport;
  const totalExpense = kpis.totalExpense || 1;
  const DONUT_COLORS = ["#7a6dff", "#ff9d6a", "#3ddcb6", "#a99cff", "#c7d3ff", "#f5b5d4"];
  const lastMonth = monthly[monthly.length - 1];
  const incomeMonth = lastMonth?.income ?? kpis.totalIncome;
  const expenseMonth = lastMonth?.expense ?? kpis.totalExpense;
  const surplusMonth = lastMonth?.surplus ?? kpis.surplus;
  const monthLabelShort = lastMonth ? fmtMonthLabel(lastMonth.month).replace("T", "Tháng ") + lastMonth.month.slice(0, 4).replace(/^.*?(\d{4})$/, "/$1") : "Tháng 5/2024";
  const periodTitle = lastMonth ? `Tháng ${lastMonth.month.split("-")[1]}/${lastMonth.month.split("-")[0]}` : "Tháng 5/2024";

  return (
    <div className="fin-page">
      {/* ── Page header ── */}
      <div className="fin-page-hd">
        <div>
          <h1 className="fin-title">Tổng quan tài chính</h1>
          <p className="fin-sub">Cập nhật tình hình thu chi, quỹ và các chỉ số tài chính của tòa nhà</p>
        </div>
        <div className="fin-actions">
          <button className="fin-btn">
            <img src="https://www.figma.com/api/mcp/asset/bb824f87-1b0e-4c71-ba99-09a0e1da7f1e" alt="" width="16" height="16" />
            {periodTitle}
            <img src="https://www.figma.com/api/mcp/asset/68ffcd0e-3438-4ca4-9d64-847b5ccf5b79" alt="" width="14" height="14" />
          </button>
          <button className="fin-btn">
            <img src="https://www.figma.com/api/mcp/asset/690e85bc-cb14-4eb3-931b-790db95c8d26" alt="" width="16" height="16" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="kpi-row">
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#efeeff" }}>
            <img src="https://www.figma.com/api/mcp/asset/76a8ace0-d7c2-4074-bf26-caa39551254e" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Tổng thu trong tháng</div>
            <div className="kpi-value">{fmtVNDfull(incomeMonth)}</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/07b679db-3ec2-4a70-acb0-a92326a51f04" alt="" width="11" height="11" />
              <span className="kpi-pct up">12.4%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#ffeded" }}>
            <img src="https://www.figma.com/api/mcp/asset/3eec0cf0-a93a-4dba-b3a1-d0a31d498f64" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Tổng chi trong tháng</div>
            <div className="kpi-value">{fmtVNDfull(expenseMonth)}</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/39450053-803f-485d-803e-0750a3c14591" alt="" width="11" height="11" />
              <span className="kpi-pct down">8.7%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#efffe7" }}>
            <img src="https://www.figma.com/api/mcp/asset/1351b03a-eb8f-4a37-b663-cac5b38c302c" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Thặng dư/thâm hụt</div>
            <div className="kpi-value">{fmtVNDfull(surplusMonth)}</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/07b679db-3ec2-4a70-acb0-a92326a51f04" alt="" width="11" height="11" />
              <span className="kpi-pct up">28.6%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-icon-bg" style={{ background: "#e4f1ff" }}>
            <img src="https://www.figma.com/api/mcp/asset/0daa5a59-6d8f-431c-bc64-893e8920578d" alt="" width="22" height="22" />
          </div>
          <div className="kpi-body">
            <div className="kpi-label">Quỹ bảo trì hiện tại</div>
            <div className="kpi-value">{fmtVNDfull(kpis.maintenanceFundBalance)}</div>
            <div className="kpi-trend">
              <img src="https://www.figma.com/api/mcp/asset/07b679db-3ec2-4a70-acb0-a92326a51f04" alt="" width="11" height="11" />
              <span className="kpi-pct up">3.2%</span>
              <span className="kpi-tlabel">so với tháng 4/2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Chart Row ── */}
      <div className="chart-row">
        <div className="chart-card">
          <div className="chart-hd">
            <div className="chart-title">
              Thu chi theo tháng
              <span className="chart-info">i</span>
            </div>
            <button className="chart-period">
              6 tháng gần nhất
              <img src="https://www.figma.com/api/mcp/asset/9ca275cd-9232-4f52-ae8d-87092e85d00e" alt="" width="12" height="12" />
            </button>
          </div>

          <div className="chart-svg-area">
            <svg
              viewBox="0 0 700 285"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: "block", width: "100%", height: "285px", overflow: "visible" }}
            >
              <line x1="42" y1="8" x2="692" y2="8" stroke="#eaecf4" strokeWidth="1" />
              <line x1="42" y1="71" x2="692" y2="71" stroke="#eaecf4" strokeWidth="1" />
              <line x1="42" y1="134" x2="692" y2="134" stroke="#eaecf4" strokeWidth="1" />
              <line x1="42" y1="197" x2="692" y2="197" stroke="#eaecf4" strokeWidth="1" />
              <line x1="42" y1="260" x2="692" y2="260" stroke="#eaecf4" strokeWidth="1" />

              <rect x="612" y="8" width="52" height="252" rx="4" fill="#f5f4ff" opacity="0.6" />

              <rect x="72" y="128" width="22" height="132" rx="3" fill="#8b80f9" />
              <rect x="98" y="156" width="22" height="104" rx="3" fill="#ef6b7c" />
              <rect x="180" y="135" width="22" height="125" rx="3" fill="#8b80f9" />
              <rect x="206" y="161" width="22" height="99" rx="3" fill="#ef6b7c" />
              <rect x="288" y="118" width="22" height="142" rx="3" fill="#8b80f9" />
              <rect x="314" y="147" width="22" height="113" rx="3" fill="#ef6b7c" />
              <rect x="396" y="115" width="22" height="145" rx="3" fill="#8b80f9" />
              <rect x="422" y="148" width="22" height="112" rx="3" fill="#ef6b7c" />
              <rect x="504" y="100" width="22" height="160" rx="3" fill="#8b80f9" />
              <rect x="530" y="136" width="22" height="124" rx="3" fill="#ef6b7c" />
              <rect x="612" y="81" width="22" height="179" rx="3" fill="#8b80f9" />
              <rect x="638" y="125" width="22" height="135" rx="3" fill="#ef6b7c" />

              <polyline
                points="96,232 204,235 312,232 420,227 528,224 636,216"
                fill="none"
                stroke="#22c08a"
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />

              <circle cx="96" cy="232" r="4" fill="white" stroke="#22c08a" strokeWidth="2" />
              <circle cx="204" cy="235" r="4" fill="white" stroke="#22c08a" strokeWidth="2" />
              <circle cx="312" cy="232" r="4" fill="white" stroke="#22c08a" strokeWidth="2" />
              <circle cx="420" cy="227" r="4" fill="white" stroke="#22c08a" strokeWidth="2" />
              <circle cx="528" cy="224" r="4" fill="white" stroke="#22c08a" strokeWidth="2" />
              <circle cx="636" cy="216" r="5" fill="#22c08a" stroke="white" strokeWidth="2" />
            </svg>

            <div className="chart-y-lbl" style={{ top: "8px" }}>4B</div>
            <div className="chart-y-lbl" style={{ top: "71px" }}>3B</div>
            <div className="chart-y-lbl" style={{ top: "134px" }}>2B</div>
            <div className="chart-y-lbl" style={{ top: "197px" }}>1B</div>
            <div className="chart-y-lbl" style={{ top: "260px" }}>0</div>

            {(monthly.length >= 6 ? monthly.slice(-6) : [{month: "2023-12"}, {month: "2024-01"}, {month: "2024-02"}, {month: "2024-03"}, {month: "2024-04"}, {month: "2024-05"}]).map((m: any, i: number) => (
              <div key={m.month ?? i} className="chart-x-lbl" style={{ left: `${[13.71, 29.14, 44.57, 60, 75.43, 90.86][i]}%` }}>{fmtMonthLabel(m.month)}</div>
            ))}

            <div className="chart-tooltip">
              <div className="tt-title">{periodTitle}</div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#8b80f9" }}></div>
                <div className="tt-name">Tổng thu</div>
                <div className="tt-val">{fmtVNDfull(incomeMonth)}</div>
              </div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#ef6b7c" }}></div>
                <div className="tt-name">Tổng chi</div>
                <div className="tt-val">{fmtVNDfull(expenseMonth)}</div>
              </div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#22c08a" }}></div>
                <div className="tt-name">Thặng dư</div>
                <div className="tt-val">{fmtVNDfull(surplusMonth)}</div>
              </div>
            </div>
          </div>

          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#8b80f9" }}></div>
              <span className="legend-lbl">Tổng thu</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#ef6b7c" }}></div>
              <span className="legend-lbl">Tổng chi</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot" style={{ background: "#22c08a" }}></div>
              <span className="legend-lbl">Thặng dư</span>
            </div>
          </div>
        </div>

        {/* Donut chart */}
        <div className="donut-card">
          <div className="donut-title">Cơ cấu chi phí {periodTitle.toLowerCase()}</div>
          <div className="donut-wrap">
            <img
              src="https://www.figma.com/api/mcp/asset/56447ff4-2e26-402d-8cd5-bfc42189cdd1"
              alt="Cơ cấu chi phí"
              width="205"
              height="205"
            />
            <div className="donut-center">
              <div className="donut-cval">{fmtVNDfull(kpis.totalExpense)}</div>
              <div className="donut-clbl">Tổng chi</div>
            </div>
          </div>
          <div className="donut-legend">
            {(expenseBreakdown.length ? expenseBreakdown.slice(0, 6).map((c: any, i: number) => ({
              color: DONUT_COLORS[i % DONUT_COLORS.length],
              name: c.name,
              pct: Math.round((c.amount / totalExpense) * 100),
              amt: fmtVNDfull(c.amount),
            })) : [
              { color: "#7a6dff", name: "Vận hành & quản lý", pct: 35, amt: "748.600.000 đ" },
              { color: "#ff9d6a", name: "Điện nước chung", pct: 22, amt: "470.800.000 đ" },
              { color: "#3ddcb6", name: "Bảo trì & sửa chữa", pct: 18, amt: "385.200.000 đ" },
              { color: "#a99cff", name: "Dịch vụ & tiện ích", pct: 12, amt: "256.600.000 đ" },
              { color: "#c7d3ff", name: "Nhân sự & lương", pct: 8, amt: "171.100.000 đ" },
              { color: "#f5b5d4", name: "Khác", pct: 5, amt: "106.600.000 đ" },
            ]).map((row: any, i: number) => (
              <div className="donut-row" key={i}>
                <div className="donut-left">
                  <div className="donut-dot" style={{ background: row.color }}></div>
                  <span className="donut-name">{row.name}</span>
                </div>
                <div className="donut-pct">{row.pct}%</div>
                <div className="donut-amt">{row.amt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Summary Row ── */}
      <div className="summary-row">
        <div className="sum-card">
          <div className="sum-title">
            <img src="https://www.figma.com/api/mcp/asset/2692c8e7-b548-4b0f-9156-69077c30d015" alt="" width="18" height="18" />
            <span>Quỹ bảo trì</span>
          </div>
          <div className="sum-grid">
            <div className="sum-main">
              <div className="sum-mlbl">Số dư hiện tại</div>
              <div className="sum-bigval">{fmtVNDfull(kpis.maintenanceFundBalance)}</div>
              <div className="sum-trend">
                <img src="https://www.figma.com/api/mcp/asset/c6a833b5-a6ff-466a-b396-972bb3661f6e" alt="" width="11" height="11" />
                <span className="sum-tpct">3.2%</span>
                <span className="sum-tlbl">so với tháng 4/2024</span>
              </div>
            </div>
            <div className="sum-details">
              <div className="sum-drow">
                <span className="sum-dkey">Số dư đầu kỳ</span>
                <span className="sum-dval">8.005.000.000 đ</span>
              </div>
              <div className="sum-drow">
                <span className="sum-dkey">Tăng trong tháng</span>
                <span className="sum-dval green">260.000.000 đ</span>
              </div>
              <div className="sum-drow">
                <span className="sum-dkey">Đã sử dụng</span>
                <span className="sum-dval">0 đ</span>
              </div>
            </div>
          </div>
          <a href="#" className="sum-link">
            Xem lịch sử quỹ bảo trì
            <img src="https://www.figma.com/api/mcp/asset/2182cf16-c606-4a8d-8028-0a377971172b" alt="" width="13" height="13" />
          </a>
        </div>

        <div className="sum-card">
          <div className="sum-title">
            <img src="https://www.figma.com/api/mcp/asset/67e99264-b523-43a0-8dcf-bb73fa9b811b" alt="" width="18" height="18" />
            <span>Chỉ số tài chính</span>
          </div>
          <div className="metric-list">
            <div className="metric-row">
              <div className="metric-icon" style={{ background: "#efffe7" }}>
                <img src="https://www.figma.com/api/mcp/asset/a1f90758-bdbb-4b40-860d-072060f9689b" alt="" width="16" height="16" />
              </div>
              <div className="metric-name">Tỷ lệ thu phí</div>
              <div className="metric-val">{(kpis.collectionRate ?? 98.6)}%</div>
              <div className="metric-trend up">+2.4% so với T4/2024</div>
            </div>
            <div className="metric-row">
              <div className="metric-icon" style={{ background: "#fff1de" }}>
                <img src="https://www.figma.com/api/mcp/asset/8911d112-c0c2-45cf-ac1f-829917821964" alt="" width="16" height="16" />
              </div>
              <div className="metric-name">Tỷ lệ chi phí / Thu</div>
              <div className="metric-val">{kpis.totalIncome ? `${((kpis.totalExpense / kpis.totalIncome) * 100).toFixed(1)}%` : "75.2%"}</div>
              <div className="metric-trend down">-3.1% so với T4/2024</div>
            </div>
            <div className="metric-row">
              <div className="metric-icon" style={{ background: "#efeeff" }}>
                <img src="https://www.figma.com/api/mcp/asset/e88157c5-1b73-4936-a61a-3617cc37163d" alt="" width="16" height="16" />
              </div>
              <div className="metric-name">Tỷ lệ sử dụng quỹ bảo trì</div>
              <div className="metric-val">0%</div>
              <div className="metric-trend neu">+0% so với T4/2024</div>
            </div>
          </div>
          <a href="#" className="sum-link">
            Xem tất cả chỉ số
            <img src="https://www.figma.com/api/mcp/asset/2182cf16-c606-4a8d-8028-0a377971172b" alt="" width="13" height="13" />
          </a>
        </div>
      </div>

      {/* ── Báo cáo tài chính mới nhất ── */}
      <div className="report-card">
        <div className="report-hd">
          <div className="report-title">Báo cáo tài chính mới nhất</div>
          <a href="#" className="report-link">
            Xem tất cả
            <img src="https://www.figma.com/api/mcp/asset/5a506401-e463-4a1b-bf42-3f1fa881b635" alt="" width="13" height="13" />
          </a>
        </div>
        <div className="report-body">
          <div className="report-file">
            <div className="pdf-badge">{latestReport?.fileType ?? "PDF"}</div>
            <div>
              <div className="report-fname">{latestReport?.title ?? "Báo cáo tài chính tháng 5/2024"}</div>
              <div className="report-fmeta">{latestReport?.fileType ?? "PDF"} • {latestReport?.fileSize ? `${(latestReport.fileSize / 1024 / 1024).toFixed(1)} MB` : "2.4 MB"} • Ban quản trị</div>
            </div>
          </div>
          <div className="report-meta">
            <div className="report-mitem">
              <img src="https://www.figma.com/api/mcp/asset/62236d98-457d-41ed-b756-7cd5d55209a4" alt="" width="13" height="13" />
              <span className="report-mlbl">Ngày tạo</span>
            </div>
            <span className="report-mval">{latestReport?.publishDate ? new Date(latestReport.publishDate).toLocaleDateString("vi-VN") : "01/06/2024"}</span>
          </div>
          <div className="report-meta">
            <div className="report-mitem">
              <img src="https://www.figma.com/api/mcp/asset/78fa00e8-bbd4-4b35-972e-709ed91f109c" alt="" width="13" height="13" />
              <span className="report-mlbl">Lượt tải</span>
            </div>
            <span className="report-mval">{latestReport?.downloadCount ?? 256}</span>
          </div>
          <a href="#" className="report-dl">
            <img src="https://www.figma.com/api/mcp/asset/fb3fce31-7fe7-48a0-bbdd-671441f0b2d4" alt="" width="15" height="15" />
            Tải xuống
          </a>
        </div>
      </div>
    </div>
  );
}
