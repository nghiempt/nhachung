export default function TinTucPage() {
  const newsCards = [
    {
      img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=600&h=400&fit=crop&auto=format&q=80",
      cats: [{ label: "Sự kiện", bg: "#e0f7f4", color: "#0d7a6a" }, { label: "Cộng đồng", bg: "#e3fbed", color: "#1c9d5f" }],
      title: "Ngày hội cư dân Landmark 1 — \"Kết nối hàng xóm, gắn kết cộng đồng\" diễn ra vào 1/6/2026",
      excerpt: "Ban quản trị trân trọng thông báo sự kiện thường niên Ngày hội cư dân sẽ được tổ chức tại khu vực hồ bơi tầng 3 và sân thượng toà A từ 8:00 – 21:00.",
      authorBg: "#0d7a6a", authorLabel: "BQT", authorName: "Ban quản trị", date: "20 tháng 5, 2026",
    },
    {
      img: "https://images.unsplash.com/photo-1676210134188-4c05dd172f89?w=600&h=400&fit=crop&auto=format&q=80",
      cats: [{ label: "Bảo trì", bg: "#fff3e0", color: "#b45309" }],
      title: "Tạm ngừng cấp nước tầng 1–5 toà B để bảo trì đường ống ngày 25/5",
      excerpt: "Để thực hiện bảo trì định kỳ hệ thống cấp nước, nước sẽ bị gián đoạn từ 8:00 đến 17:00 ngày 25/5/2026.",
      authorBg: "#b45309", authorLabel: "KT", authorName: "Kỹ thuật tòa nhà", date: "19 tháng 5, 2026",
    },
    {
      img: "https://images.unsplash.com/photo-1758448721161-7b3df5ec04b3?w=600&h=400&fit=crop&auto=format&q=80",
      cats: [{ label: "Thông báo BQT", bg: "#e4f1ff", color: "#1561c0" }],
      title: "Điều chỉnh phí gửi xe ô tô tầng hầm từ tháng 6/2026 theo nghị quyết hội nghị cư dân",
      excerpt: "Theo kết quả biểu quyết tại hội nghị cư dân ngày 10/4/2026, mức phí gửi xe ô tô sẽ điều chỉnh từ 1.200.000đ lên 1.500.000đ/tháng kể từ 1/6/2026.",
      authorBg: "#1561c0", authorLabel: "BQT", authorName: "Ban quản trị", date: "18 tháng 5, 2026",
    },
    {
      img: "https://images.unsplash.com/photo-1741156386380-0236c72eb6f9?w=600&h=400&fit=crop&auto=format&q=80",
      cats: [{ label: "Cộng đồng", bg: "#ede9ff", color: "#5b21b6" }],
      title: "Chào mừng 12 hộ cư dân mới nhận bàn giao căn hộ đợt tháng 5/2026",
      excerpt: "Ban quản trị trân trọng chào đón các hộ cư dân mới gia nhập cộng đồng Landmark 1. Buổi hướng dẫn nội quy và tiện ích sẽ được tổ chức vào 18:00 ngày 26/5.",
      authorBg: "#5b21b6", authorLabel: "BQT", authorName: "Ban quản trị", date: "17 tháng 5, 2026",
    },
    {
      img: "https://images.unsplash.com/photo-1586281380923-93c9b0a7296e?w=600&h=400&fit=crop&auto=format&q=80",
      cats: [{ label: "Cộng đồng", bg: "#e3fbed", color: "#1c9d5f" }],
      title: "Kết quả khảo sát hài lòng cư dân quý I/2026 — Chất lượng dịch vụ đạt 4.3/5 điểm",
      excerpt: "Khảo sát thu hút 847 lượt tham gia, kết quả cho thấy cư dân đánh giá cao nhất dịch vụ bảo vệ (4.6) và vệ sinh (4.5). Đây là mức điểm cao nhất trong 3 năm qua.",
      authorBg: "#1c9d5f", authorLabel: "BQT", authorName: "Ban quản trị", date: "15 tháng 5, 2026",
    },
    {
      img: "https://images.unsplash.com/photo-1595306394931-b35768661692?w=600&h=400&fit=crop&auto=format&q=80",
      cats: [{ label: "Khẩn cấp", bg: "#fff0f0", color: "#f5222d" }, { label: "Bảo trì", bg: "#fff3e0", color: "#b45309" }],
      title: "Lịch kiểm tra định kỳ hệ thống PCCC toàn tòa nhà — Tháng 6/2026",
      excerpt: "Theo quy định của Cảnh sát PCCC TP.HCM, hệ thống báo cháy, chữa cháy, đèn thoát hiểm và thang bộ thoát nạn sẽ được kiểm tra toàn diện trong tuần đầu tháng 6.",
      authorBg: "#f5222d", authorLabel: "KT", authorName: "Kỹ thuật tòa nhà", date: "14 tháng 5, 2026",
    },
  ];

  return (
    <div style={{ padding: "24px 28px 48px" }}>

      {/* Page header */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "16px" }}>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: 700, color: "#272727", lineHeight: "28px" }}>Tin tức cộng đồng</h1>
            <p style={{ fontSize: "13px", color: "#585c7b", marginTop: "3px" }}>Thông tin, sự kiện và hoạt động mới nhất từ ban quản trị và cư dân</p>
          </div>
        </div>

        {/* Tabs */}
        <nav style={{ display: "flex", gap: "4px", borderBottom: "1px solid #e2e5f1" }}>
          {[
            { label: "Tất cả", count: "48", active: true },
            { label: "Thông báo BQT", count: "14" },
            { label: "Sự kiện", count: "8" },
            { label: "Bảo trì", count: "11" },
            { label: "Cộng đồng", count: "15" },
          ].map((tab) => (
            <a key={tab.label} href="#" style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "8px 14px", fontSize: "13px",
              fontWeight: tab.active ? 600 : 500,
              color: tab.active ? "#4137f9" : "#585c7b",
              borderBottom: tab.active ? "2px solid #4137f9" : "2px solid transparent",
              marginBottom: "-1px", cursor: "pointer", textDecoration: "none", whiteSpace: "nowrap",
            }}>
              {tab.label}
              <span style={{
                fontSize: "11px", fontWeight: 700, padding: "1px 6px", borderRadius: "10px",
                background: tab.active ? "#f7f5ff" : "#f7f7f7",
                color: tab.active ? "#4137f9" : "#585c7b",
              }}>{tab.count}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <span style={{ fontSize: "12px", fontWeight: 600, color: "#585c7b", whiteSpace: "nowrap" }}>Lọc:</span>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
          {[
            { label: "Tất cả", active: true },
            { label: "Tháng này" },
            { label: "Quan trọng" },
            { label: "Chưa đọc" },
          ].map((chip) => (
            <span key={chip.label} style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: 600,
              border: chip.active ? "1px solid #d3c5fd" : "1px solid #e2e5f1",
              background: chip.active ? "#f7f5ff" : "#ffffff",
              color: chip.active ? "#4137f9" : "#585c7b",
              cursor: "pointer",
            }}>{chip.label}</span>
          ))}
        </div>
        <div style={{ marginLeft: "auto" }}>
          <button style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 12px", border: "1px solid #d4d7e5", borderRadius: "8px", fontSize: "12px", fontWeight: 500, color: "#585c7b", background: "#ffffff", cursor: "pointer" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            Mới nhất
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>
      </div>

      {/* Two-col: main + aside */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "20px", alignItems: "start" }}>

        {/* Main feed */}
        <div>
          {/* Featured article */}
          <div style={{ position: "relative", borderRadius: "20px", overflow: "hidden", marginBottom: "20px", cursor: "pointer" }}>
            <img src="https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=1200&h=500&fit=crop&auto=format&q=80" alt="" style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.72) 0%, rgba(0,0,0,.18) 55%, transparent 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 28px" }}>
              <div style={{ display: "flex", gap: "8px", marginBottom: "10px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", padding: "3px 10px", borderRadius: "20px", background: "rgba(255,214,24,.9)", color: "#3b2a00" }}>📌 Ghim</span>
                <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: ".4px", textTransform: "uppercase", padding: "3px 10px", borderRadius: "20px", background: "rgba(255,255,255,.2)", color: "#fff", backdropFilter: "blur(4px)" }}>Thông báo BQT</span>
              </div>
              <div style={{ fontSize: "20px", fontWeight: 700, color: "#fff", lineHeight: 1.35, marginBottom: "8px", maxWidth: "680px" }}>
                Kết quả họp Ban quản trị tháng 5/2026 — Thông qua ngân sách nâng cấp hệ thống PCCC và thang máy
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "#4137f9", border: "2px solid rgba(255,255,255,.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "9px", fontWeight: 700, color: "#fff" }}>BQT</div>
                  <span style={{ fontSize: "12px", color: "rgba(255,255,255,.85)", fontWeight: 500 }}>Ban quản trị Landmark 1</span>
                </div>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,.4)" }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,.65)" }}>22 tháng 5, 2026</span>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "rgba(255,255,255,.4)" }} />
                <span style={{ fontSize: "12px", color: "rgba(255,255,255,.65)" }}>5 phút đọc</span>
              </div>
            </div>
          </div>

          {/* News grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            {newsCards.map((card, i) => (
              <div key={i} style={{ background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "20px", overflow: "hidden", cursor: "pointer", display: "flex", flexDirection: "column" }}>
                <img src={card.img} alt="" style={{ width: "100%", height: "148px", objectFit: "cover", display: "block", background: "#f7f7f7" }} />
                <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <div style={{ display: "flex", gap: "6px", marginBottom: "8px", flexWrap: "wrap" }}>
                    {card.cats.map((cat) => (
                      <span key={cat.label} style={{ fontSize: "10.5px", fontWeight: 700, padding: "2px 8px", borderRadius: "20px", letterSpacing: ".3px", background: cat.bg, color: cat.color }}>{cat.label}</span>
                    ))}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "#272727", lineHeight: 1.45, marginBottom: "6px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{card.title}</div>
                  <div style={{ fontSize: "12px", color: "#585c7b", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", marginBottom: "12px", flex: 1 } as React.CSSProperties}>{card.excerpt}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <div style={{ width: "20px", height: "20px", borderRadius: "50%", background: card.authorBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "8px", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{card.authorLabel}</div>
                      <span style={{ fontSize: "12px", color: "#585c7b", fontWeight: 500 }}>{card.authorName}</span>
                    </div>
                    <span style={{ fontSize: "12px", color: "#b4b7c9" }}>{card.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", paddingTop: "8px" }}>
            <button style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e2e5f1", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b4b7c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            {[1, 2, 3, 4].map((n) => (
              <button key={n} style={{ width: "32px", height: "32px", borderRadius: "8px", border: n === 1 ? "1px solid #4137f9" : "1px solid #e2e5f1", background: n === 1 ? "#4137f9" : "#ffffff", fontSize: "12px", fontWeight: 600, color: n === 1 ? "#fff" : "#585c7b", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{n}</button>
            ))}
            <button style={{ width: "32px", height: "32px", borderRadius: "8px", border: "1px solid #e2e5f1", background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#b4b7c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        {/* Aside */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Hot topics */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #e2e5f1" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#585c7b", textTransform: "uppercase", letterSpacing: ".5px" }}>Xem nhiều nhất</div>
            </div>
            <div style={{ padding: "4px 0 8px" }}>
              {[
                { rank: "1", rankBg: "#fff3e0", rankColor: "#c05621", title: "Quy định mới về việc chuyển nhượng chỗ đỗ xe tầng hầm", views: "2.841 lượt xem" },
                { rank: "2", rankBg: "#f0f9ff", rankColor: "#0369a1", title: "Hướng dẫn đăng ký thẻ từ ra vào cho người thân", views: "1.920 lượt xem" },
                { rank: "3", rankBg: "#f0fdf4", rankColor: "#166534", title: "Danh sách tiện ích nâng cấp tầng 3 hoàn thành tháng 4/2026", views: "1.532 lượt xem" },
                { rank: "4", rankBg: "#f7f7f7", rankColor: "#b4b7c9", title: "Biên bản hội nghị cư dân thường niên 2026 đã có trên hệ thống", views: "1.104 lượt xem" },
                { rank: "5", rankBg: "#f7f7f7", rankColor: "#b4b7c9", title: "Nhận đồ giao tận nơi — Quy trình mới từ 1/5/2026", views: "987 lượt xem" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 16px", cursor: "pointer" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "6px", background: item.rankBg, color: item.rankColor, fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }}>{item.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#272727", lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{item.title}</div>
                    <div style={{ fontSize: "11px", color: "#b4b7c9", marginTop: "2px" }}>{item.views}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming events */}
          <div style={{ background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "20px", overflow: "hidden" }}>
            <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid #e2e5f1" }}>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#585c7b", textTransform: "uppercase", letterSpacing: ".5px" }}>Sự kiện sắp diễn ra</div>
            </div>
            <div style={{ padding: "4px 0 8px" }}>
              {[
                { day: "25", mon: "Th.5", title: "Bảo trì hệ thống cấp nước toà B", loc: "08:00 – 17:00 · Tầng 1–5 toà B" },
                { day: "26", mon: "Th.5", title: "Hướng dẫn nội quy cho cư dân mới", loc: "18:00 – 19:30 · Phòng sinh hoạt cộng đồng" },
                { day: "01", mon: "Th.6", title: "Ngày hội cư dân Landmark 1", loc: "08:00 – 21:00 · Hồ bơi & Sân thượng" },
                { day: "07", mon: "Th.6", title: "Kiểm tra định kỳ hệ thống PCCC", loc: "Cả ngày · Toàn tòa nhà" },
              ].map((ev, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "10px 16px", cursor: "pointer" }}>
                  <div style={{ width: "38px", textAlign: "center", flexShrink: 0 }}>
                    <div style={{ fontSize: "18px", fontWeight: 800, color: "#4137f9", lineHeight: 1 }}>{ev.day}</div>
                    <div style={{ fontSize: "10px", fontWeight: 600, color: "#585c7b", textTransform: "uppercase" }}>{ev.mon}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "#272727", lineHeight: 1.4 }}>{ev.title}</div>
                    <div style={{ fontSize: "11px", color: "#585c7b", marginTop: "2px" }}>{ev.loc}</div>
                    <span style={{ fontSize: "10px", fontWeight: 700, padding: "1px 7px", borderRadius: "10px", marginTop: "4px", display: "inline-block", background: "#e4f1ff", color: "#1561c0" }}>Sắp diễn ra</span>
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
