export default function DashboardPage() {
  return (
    <div className="db-content">

      {/* ── Hero Banner ── */}
      <div className="hero-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-bg" src="/images/dashboard/hero-bg.jpg" alt="" />

        <div className="hero-left">
          <div className="hero-text">
            <p className="hero-greeting">Chào buổi sáng, Chris!</p>
            <p className="hero-date">Hôm nay là thứ 5, ngày 23 tháng 5 năm 2026</p>
            <div className="hero-meta">
              <div className="hero-meta-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/img_1.svg" alt="" />
                Landmark 1
              </div>
              <div className="hero-meta-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/img_2.svg" alt="" />
                1389 cư dân
              </div>
            </div>
          </div>
          <div className="hero-notif-pill">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/img_3.svg" alt="" />
            Bạn có 12 thông báo mới
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="hero-notif-pill-arrow" src="/images/dashboard/hero-notif-pill-arrow.svg" alt="" />
          </div>
        </div>

        <div className="hero-right">
          <div className="weather-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="weather-icon" src="/images/dashboard/weather-icon.png" alt="Sun" />
            <div className="weather-info">
              <span className="weather-city">TP. Hồ Chí Minh</span>
              <span className="weather-temp">28°C</span>
              <span className="weather-desc">Trời nắng</span>
            </div>
          </div>
          <button className="weather-btn">
            Xem dự báo
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/dashboard/img_6.svg" alt="" />
          </button>
        </div>
      </div>

      {/* ── Content Row ── */}
      <div className="content-row">

        {/* Left Column */}
        <div className="col-left">

          {/* Thao tác nhanh */}
          <div>
            <div className="db-section-title">Thao tác nhanh</div>
            <div className="quick-actions-grid">

              <div className="qa-card">
                <div className="qa-icon-box" style={{ background: '#4137f9' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 19.052 3.895 20 5 20h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144a2.46 2.46 0 0 1-1.276.67l-3.114.733a2.46 2.46 0 0 1-2.638-1.659l-.537-1.518a2.46 2.46 0 0 1 .538-2.44l5.17-5.47-.908-.47Z" />
                    <path d="M19.901 3.604c-.785-.831-2.067-.831-2.852 0l-1.52 1.608a.396.396 0 0 0-.027.534l3.584 3.799a.397.397 0 0 0 .549.012l1.496-1.581c.785-.832.785-2.18 0-3.012Z" />
                  </svg>
                </div>
                <div className="qa-info">
                  <div className="qa-title">Gửi phản ánh</div>
                  <div className="qa-desc">Báo cáo sự cố, góp ý</div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="qa-arrow" src="/images/dashboard/qa-arrow.svg" alt="" />
              </div>

              <div className="qa-card">
                <div className="qa-icon-box" style={{ background: '#41c69c' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/img_8.svg" alt="" style={{ width: '20px', height: '20px' }} />
                </div>
                <div className="qa-info">
                  <div className="qa-title">Xem báo cáo</div>
                  <div className="qa-desc">Minh bạch tài chính</div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="qa-arrow" src="/images/dashboard/qa-arrow.svg" alt="" />
              </div>

              <div className="qa-card">
                <div className="qa-icon-box" style={{ background: '#6c90fa' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/dashboard/img_10.svg" alt="" style={{ width: '20px', height: '20px' }} />
                </div>
                <div className="qa-info">
                  <div className="qa-title">AI trợ lý</div>
                  <div className="qa-desc">Hỏi đáp thông tin</div>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="qa-arrow" src="/images/dashboard/qa-arrow.svg" alt="" />
              </div>

            </div>
          </div>

          {/* Tổng quan minh bạch */}
          <div>
            <div className="db-section-header">
              <div className="db-section-title">Tổng quan minh bạch</div>
              <button className="db-filter-btn">
                Tháng 5/2026
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/img_24.svg" alt="" />
              </button>
            </div>
            <div className="stats-grid">
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon-box" style={{ background: '#eae7fe' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard/img_13.svg" alt="" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Thu chi tháng 5/2026</div>
                    <div className="stat-value">128.450.000đ</div>
                    <div className="stat-change"><span className="pct down">-8.5%</span> so với tháng trước</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box" style={{ background: '#e6f7f1' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard/img_14.svg" alt="" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Quỹ bảo trì</div>
                    <div className="stat-value">2.450.000.000đ</div>
                    <div className="stat-change"><span className="pct up">+4.2%</span> so với tháng trước</div>
                  </div>
                </div>
              </div>
              <div className="stats-row">
                <div className="stat-card">
                  <div className="stat-icon-box" style={{ background: '#fef1e6' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard/img_15.svg" alt="" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Phản ánh đang xử lý</div>
                    <div className="stat-value">24</div>
                    <div className="stat-change"><span className="pct down">-12.5%</span> so với tháng trước</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon-box" style={{ background: '#e6f0fe' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/dashboard/img_16.svg" alt="" />
                  </div>
                  <div className="stat-info">
                    <div className="stat-label">Tỉ lệ xử lý đúng hạn</div>
                    <div className="stat-value">92%</div>
                    <div className="stat-change"><span className="pct up">+8.3%</span> so với tháng trước</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Hoạt động cộng đồng */}
          <div>
            <div className="db-section-header">
              <div className="db-section-title">Hoạt động cộng đồng</div>
              <a href="#" className="db-section-link">
                Xem tất cả
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/img_6.svg" alt="" />
              </a>
            </div>
            <div className="community-grid">

              <div className="community-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="community-photo" src="/images/dashboard/community-1.png" alt="" />
                <div className="community-body">
                  <div className="community-title">Cập nhật tiến độ bảo trì thang máy tháng 5/2024</div>
                  <div className="community-meta">
                    <span className="community-time">2 giờ trước</span>
                    <div className="community-views">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/img_19.svg" alt="" />
                      284
                    </div>
                  </div>
                </div>
              </div>

              <div className="community-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="community-photo" src="/images/dashboard/community-2.png" alt="" />
                <div className="community-body">
                  <div className="community-title">Ngày hội cư dân Sunshine Riverside 2024</div>
                  <div className="community-meta">
                    <span className="community-time">1 ngày trước</span>
                    <div className="community-views">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/img_19.svg" alt="" />
                      256
                    </div>
                  </div>
                </div>
              </div>

              <div className="community-card">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="community-photo" src="/images/dashboard/community-3.png" alt="" />
                <div className="community-body">
                  <div className="community-title">Lớp học Yoga miễn phí cho cư dân vào mỗi sáng thứ 7</div>
                  <div className="community-meta">
                    <span className="community-time">2 ngày trước</span>
                    <div className="community-views">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/img_19.svg" alt="" />
                      89
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>{/* /col-left */}

        {/* Right Column */}
        <div className="col-right">

          {/* Thông báo mới */}
          <div>
            <div className="db-section-header">
              <div className="db-section-title">Thông báo mới</div>
              <a href="#" className="db-section-link">
                Xem tất cả
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/img_6.svg" alt="" />
              </a>
            </div>
            <div className="notif-list-card">

              <div className="notif-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="notif-icon" src="/images/dashboard/notif-icon-1.svg" alt="" />
                <div className="notif-info">
                  <div className="notif-title">Bảo trì hệ thống PCCC định kỳ</div>
                  <div className="notif-sub">Ban quản trị</div>
                </div>
                <span className="notif-time">10:30 AM</span>
              </div>

              <div className="notif-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="notif-icon" src="/images/dashboard/notif-icon-2.svg" alt="" />
                <div className="notif-info">
                  <div className="notif-title">Thông báo điều chỉnh phí giữ xe</div>
                  <div className="notif-sub">Ban quản trị</div>
                </div>
                <span className="notif-time">09:15 AM</span>
              </div>

              <div className="notif-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="notif-icon" src="/images/dashboard/notif-icon-3.svg" alt="" />
                <div className="notif-info">
                  <div className="notif-title">Sự kiện: Ngày hội cư dân 2024</div>
                  <div className="notif-sub">Ban quản trị</div>
                </div>
                <span className="notif-time">Hôm qua</span>
              </div>

              <div className="notif-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="notif-icon" src="/images/dashboard/notif-icon-4.svg" alt="" />
                <div className="notif-info">
                  <div className="notif-title">Tạm ngưng cấp nước khu A</div>
                  <div className="notif-sub">Ban quản trị</div>
                </div>
                <span className="notif-time">21/05/2024</span>
              </div>

            </div>
          </div>

          {/* Lịch sự kiện */}
          <div>
            <div className="db-section-header">
              <div className="db-section-title">Lịch sự kiện</div>
              <a href="#" className="db-section-link">
                Xem lịch đầy đủ
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/dashboard/img_6.svg" alt="" />
              </a>
            </div>

            <div className="calendar-card">
              {/* Calendar header */}
              <div className="cal-header">
                <button className="cal-nav-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3e4265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <div className="cal-month-btn">
                  <span className="cal-month-text">Tháng 5, 2026</span>
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="#3e4265">
                    <path d="M1 1l5 5 5-5" stroke="#3e4265" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
                <button className="cal-nav-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3e4265" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              {/* Day-of-week headers */}
              <div className="cal-grid">
                <div className="cal-dow">T2</div>
                <div className="cal-dow">T3</div>
                <div className="cal-dow">T4</div>
                <div className="cal-dow">T5</div>
                <div className="cal-dow">T6</div>
                <div className="cal-dow">T7</div>
                <div className="cal-dow">CN</div>
                {/* Week 1 (Apr 26 – May 1) */}
                <div className="cal-cell other-month">26</div>
                <div className="cal-cell other-month">27</div>
                <div className="cal-cell other-month">28</div>
                <div className="cal-cell other-month">29</div>
                <div className="cal-cell other-month">30</div>
                <div className="cal-cell other-month">31</div>
                <div className="cal-cell">1</div>
                {/* Week 2 */}
                <div className="cal-cell">2</div>
                <div className="cal-cell">3</div>
                <div className="cal-cell">4</div>
                <div className="cal-cell">5</div>
                <div className="cal-cell">6</div>
                <div className="cal-cell">7</div>
                <div className="cal-cell">8</div>
                {/* Week 3 */}
                <div className="cal-cell">9</div>
                <div className="cal-cell">10</div>
                <div className="cal-cell">11</div>
                <div className="cal-cell">12</div>
                <div className="cal-cell">13</div>
                <div className="cal-cell">14</div>
                <div className="cal-cell">15</div>
                {/* Week 4 */}
                <div className="cal-cell">16</div>
                <div className="cal-cell today">17</div>
                <div className="cal-cell">18</div>
                <div className="cal-cell">19</div>
                <div className="cal-cell">20</div>
                <div className="cal-cell">21</div>
                <div className="cal-cell">22</div>
                {/* Week 5 */}
                <div className="cal-cell">23</div>
                <div className="cal-cell">24</div>
                <div className="cal-cell">25</div>
                <div className="cal-cell">26</div>
                <div className="cal-cell">27</div>
                <div className="cal-cell">28</div>
                <div className="cal-cell">29</div>
                {/* Week 6 */}
                <div className="cal-cell">30</div>
                <div className="cal-cell other-month">1</div>
                <div className="cal-cell other-month">2</div>
                <div className="cal-cell other-month">3</div>
                <div className="cal-cell other-month">4</div>
                <div className="cal-cell other-month">5</div>
                <div className="cal-cell other-month">6</div>
              </div>

              {/* Event cards */}
              <div className="event-grid" style={{ marginTop: '12px' }}>

                <div className="event-card">
                  <div className="event-title">Ngày hội cư dân 2024</div>
                  <div className="event-meta">
                    <div className="event-meta-row">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/img_30.svg" alt="" />
                      <span>08:00 - 17:00</span>
                    </div>
                    <div className="event-meta-row">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/img_31.svg" alt="" />
                      <span>Sảnh chính</span>
                    </div>
                  </div>
                </div>

                <div className="event-card">
                  <div className="event-title">Bảo trì hệ thống PCCC</div>
                  <div className="event-meta">
                    <div className="event-meta-row">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/img_30.svg" alt="" />
                      <span>13:00 - 15:00</span>
                    </div>
                    <div className="event-meta-row">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/dashboard/img_31.svg" alt="" />
                      <span>Tòa nhà A</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>{/* /col-right */}
      </div>{/* /content-row */}

      {/* ── AI Banner ── */}
      <div className="ai-banner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ai-banner-bg" src="/images/dashboard/ai-banner-bg.jpg" alt="" />
        <div className="ai-banner-left">
          <div className="ai-banner-text">
            <div className="ai-banner-title">Hỏi AI trợ lý của cư dân</div>
            <div className="ai-banner-subtitle">Tôi có thể giúp gì cho bạn hôm nay?</div>
          </div>
          <div className="ai-chips">
            <button className="ai-chip">Quy định về việc nuôi thú cưng?</button>
            <button className="ai-chip">Hướng dẫn đăng ký xe</button>
            <button className="ai-chip">Tìm tài liệu nội quy</button>
          </div>
        </div>
        <button className="ai-chat-btn">
          Chat với AI
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/dashboard/img_35.svg" alt="" />
        </button>
      </div>

    </div>
  );
}
