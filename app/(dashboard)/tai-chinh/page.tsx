/* eslint-disable @next/next/no-img-element */
export default function FinanceOverviewPage() {
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
            Tháng 5/2024
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
            <div className="kpi-value">2.845.600.000 đ</div>
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
            <div className="kpi-value">2.138.900.000 đ</div>
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
            <div className="kpi-value">706.700.000 đ</div>
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
            <div className="kpi-value">8.265.000.000 đ</div>
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

            <div className="chart-x-lbl" style={{ left: "13.71%" }}>T12/23</div>
            <div className="chart-x-lbl" style={{ left: "29.14%" }}>T1/24</div>
            <div className="chart-x-lbl" style={{ left: "44.57%" }}>T2/24</div>
            <div className="chart-x-lbl" style={{ left: "60%" }}>T3/24</div>
            <div className="chart-x-lbl" style={{ left: "75.43%" }}>T4/24</div>
            <div className="chart-x-lbl" style={{ left: "90.86%" }}>T5/24</div>

            <div className="chart-tooltip">
              <div className="tt-title">Tháng 5/2024</div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#8b80f9" }}></div>
                <div className="tt-name">Tổng thu</div>
                <div className="tt-val">2.845.600.000 đ</div>
              </div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#ef6b7c" }}></div>
                <div className="tt-name">Tổng chi</div>
                <div className="tt-val">2.138.900.000 đ</div>
              </div>
              <div className="tt-row">
                <div className="tt-dot" style={{ background: "#22c08a" }}></div>
                <div className="tt-name">Thặng dư</div>
                <div className="tt-val">706.700.000 đ</div>
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
          <div className="donut-title">Cơ cấu chi phí tháng 5/2024</div>
          <div className="donut-wrap">
            <img
              src="https://www.figma.com/api/mcp/asset/56447ff4-2e26-402d-8cd5-bfc42189cdd1"
              alt="Cơ cấu chi phí"
              width="205"
              height="205"
            />
            <div className="donut-center">
              <div className="donut-cval">2.138.900.000 đ</div>
              <div className="donut-clbl">Tổng chi</div>
            </div>
          </div>
          <div className="donut-legend">
            <div className="donut-row">
              <div className="donut-left">
                <div className="donut-dot" style={{ background: "#7a6dff" }}></div>
                <span className="donut-name">Vận hành & quản lý</span>
              </div>
              <div className="donut-pct">35%</div>
              <div className="donut-amt">748.600.000 đ</div>
            </div>
            <div className="donut-row">
              <div className="donut-left">
                <div className="donut-dot" style={{ background: "#ff9d6a" }}></div>
                <span className="donut-name">Điện nước chung</span>
              </div>
              <div className="donut-pct">22%</div>
              <div className="donut-amt">470.800.000 đ</div>
            </div>
            <div className="donut-row">
              <div className="donut-left">
                <div className="donut-dot" style={{ background: "#3ddcb6" }}></div>
                <span className="donut-name">Bảo trì & sửa chữa</span>
              </div>
              <div className="donut-pct">18%</div>
              <div className="donut-amt">385.200.000 đ</div>
            </div>
            <div className="donut-row">
              <div className="donut-left">
                <div className="donut-dot" style={{ background: "#a99cff" }}></div>
                <span className="donut-name">Dịch vụ & tiện ích</span>
              </div>
              <div className="donut-pct">12%</div>
              <div className="donut-amt">256.600.000 đ</div>
            </div>
            <div className="donut-row">
              <div className="donut-left">
                <div className="donut-dot" style={{ background: "#c7d3ff" }}></div>
                <span className="donut-name">Nhân sự & lương</span>
              </div>
              <div className="donut-pct">8%</div>
              <div className="donut-amt">171.100.000 đ</div>
            </div>
            <div className="donut-row">
              <div className="donut-left">
                <div className="donut-dot" style={{ background: "#f5b5d4" }}></div>
                <span className="donut-name">Khác</span>
              </div>
              <div className="donut-pct">5%</div>
              <div className="donut-amt">106.600.000 đ</div>
            </div>
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
              <div className="sum-bigval">8.265.000.000 đ</div>
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
              <div className="metric-val">98.6%</div>
              <div className="metric-trend up">+2.4% so với T4/2024</div>
            </div>
            <div className="metric-row">
              <div className="metric-icon" style={{ background: "#fff1de" }}>
                <img src="https://www.figma.com/api/mcp/asset/8911d112-c0c2-45cf-ac1f-829917821964" alt="" width="16" height="16" />
              </div>
              <div className="metric-name">Tỷ lệ chi phí / Thu</div>
              <div className="metric-val">75.2%</div>
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
            <div className="pdf-badge">PDF</div>
            <div>
              <div className="report-fname">Báo cáo tài chính tháng 5/2024</div>
              <div className="report-fmeta">PDF • 2.4 MB • Ban quản trị</div>
            </div>
          </div>
          <div className="report-meta">
            <div className="report-mitem">
              <img src="https://www.figma.com/api/mcp/asset/62236d98-457d-41ed-b756-7cd5d55209a4" alt="" width="13" height="13" />
              <span className="report-mlbl">Ngày tạo</span>
            </div>
            <span className="report-mval">01/06/2024</span>
          </div>
          <div className="report-meta">
            <div className="report-mitem">
              <img src="https://www.figma.com/api/mcp/asset/78fa00e8-bbd4-4b35-972e-709ed91f109c" alt="" width="13" height="13" />
              <span className="report-mlbl">Lượt xem</span>
            </div>
            <span className="report-mval">256</span>
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
