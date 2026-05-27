"use client";
import { useState } from "react";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

const FB_CAT_LABEL: Record<string, string> = {
  ELECTRIC: "Kỹ thuật - Hạ tầng", WATER: "Kỹ thuật - Hạ tầng", NOISE: "Tiếng ồn",
  SECURITY: "An ninh", CLEANLINESS: "Vệ sinh - Môi trường", ELEVATOR: "Thang máy",
  PARKING: "Bãi xe", SERVICE: "Tiện ích - Dịch vụ", OTHER: "Khác",
};
const FB_STATUS: Record<string, { bg: string; color: string; label: string; dot: string }> = {
  OPEN: { bg: "#fff1de", color: "#c87a13", label: "Chờ phản hồi", dot: "#f5a623" },
  IN_PROGRESS: { bg: "#e7eeff", color: "#2f7bf6", label: "Đang xử lý", dot: "#2f7bf6" },
  RESOLVED: { bg: "#e3fbed", color: "#1c9d5f", label: "Đã hoàn thành", dot: "#1cbf6a" },
  CLOSED: { bg: "#ffeded", color: "#ef4444", label: "Từ chối", dot: "#ef4444" },
};
const FB_PRIORITY_VI: Record<string, string> = { LOW: "Thấp", MEDIUM: "Trung bình", HIGH: "Cao", URGENT: "Khẩn" };
const FB_PRIORITY_COLOR: Record<string, string> = { LOW: "#1cbf6a", MEDIUM: "#f5a623", HIGH: "#ef4444", URGENT: "#ef4444" };

const CARD_ICONS = [
  "https://www.figma.com/api/mcp/asset/ec541bd5-fad0-4e4f-8433-b90771929e65",
  "https://www.figma.com/api/mcp/asset/9363a7be-87de-4f19-9dd6-071e4dff1672",
  "https://www.figma.com/api/mcp/asset/ce3d1932-a120-413f-9915-8ed3c62226f6",
  "https://www.figma.com/api/mcp/asset/cf7184bf-d98a-417b-97b3-a823a07f9355",
  "https://www.figma.com/api/mcp/asset/b4a15126-3fb5-4f75-9541-4a3fff306493",
];

const fmtMoment = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  const now = new Date();
  const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: true });
  if (d.toDateString() === now.toDateString()) return `${time} · Hôm nay`;
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return `${time} · Hôm qua`;
  const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400_000);
  if (diffDays < 7) return `${time} · ${diffDays} ngày trước`;
  return `${time} · ${d.toLocaleDateString("vi-VN")}`;
};
const fmtFull = (iso?: string) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return `${d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: true })} • ${d.toLocaleDateString("vi-VN")}`;
};

export default function GopYPage() {
  const { data, refresh } = useApi(() => api.feedback(), []);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reply, setReply] = useState("");
  const [posting, setPosting] = useState(false);

  const items: any[] = data?.items ?? [];
  const tabs = data?.tabs ?? {};
  const selectedId = activeId ?? items[0]?.id;
  const { data: detail } = useApi(
    () => (selectedId ? api.feedbackById(selectedId) : Promise.resolve(null)),
    [selectedId]
  );

  async function submitReply() {
    if (!reply.trim() || !selectedId) return;
    setPosting(true);
    try {
      await api.feedbackReply(selectedId, { content: reply });
      setReply("");
      refresh();
    } finally {
      setPosting(false);
    }
  }

  const detailStatus = detail?.status ?? "IN_PROGRESS";
  const detailStatusInfo = FB_STATUS[detailStatus] ?? FB_STATUS.IN_PROGRESS;

  return (
    <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Page header */}
      <div>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "16px" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#272727", lineHeight: "36px" }}>Góp ý / Phản ánh</h1>
            <p style={{ fontSize: "16px", color: "#3e4265", marginTop: "6px", fontWeight: 500, lineHeight: "24px" }}>
              Gửi phản ánh và theo dõi tình trạng xử lý từ Ban quản trị
            </p>
          </div>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "11px 18px", background: "#4137f9",
            borderRadius: "10px", border: 0,
            fontSize: "14px", fontWeight: 500, color: "#fff",
            cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, marginTop: "4px", lineHeight: "22px",
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 3.333v9.334M3.333 8h9.334" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            Tạo phản ánh mới
          </button>
        </div>

        {/* Tabs */}
        <nav style={{ display: "flex", borderBottom: "1px solid #e2e5f1" }}>
          {[
            { label: "Tất cả", count: String(tabs.all ?? 24), active: true },
            { label: "Đang xử lý", count: String(tabs.IN_PROGRESS ?? 6) },
            { label: "Chờ phản hồi", count: String(tabs.OPEN ?? 3) },
            { label: "Đã hoàn thành", count: String(tabs.RESOLVED ?? 12) },
            { label: "Từ chối", count: String(tabs.CLOSED ?? 3) },
          ].map((tab) => (
            <a key={tab.label} href="#" style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "0 18px 14px",
              fontSize: "14px", fontWeight: tab.active ? 600 : 500,
              color: tab.active ? "#4137f9" : "#585c7b",
              cursor: "pointer", position: "relative", whiteSpace: "nowrap",
              textDecoration: "none",
              borderBottom: tab.active ? "2px solid #4137f9" : "2px solid transparent",
              marginBottom: "-1px",
            }}>
              {tab.label}
              <span style={{
                fontSize: "11px", fontWeight: 700, padding: "2px 7px",
                borderRadius: "10px", lineHeight: "17px",
                background: tab.active ? "#f1f7ff" : "#f0f1f5",
                color: tab.active ? "#4137f9" : "#585c7b",
              }}>{tab.count}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Three-column layout */}
      <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>

        {/* LEFT — List */}
        <div style={{ width: "372px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {/* Search + filter */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", border: "1px solid #d4d7e5", borderRadius: "10px", padding: "0 15px", height: "44px", background: "#ffffff" }}>
              <img src="https://www.figma.com/api/mcp/asset/715b105e-116c-4950-a349-27462ff6de3e" alt="" width={16} height={16} style={{ flex: "0 0 16px" }} />
              <input placeholder="Tìm kiếm phản ánh..." style={{ flex: 1, border: 0, outline: 0, fontSize: "14px", background: "transparent", color: "#222" }} />
            </div>
            <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0 16px", height: "44px", background: "#ffffff", border: "1px solid #d4d7e5", borderRadius: "10px", fontSize: "13.5px", fontWeight: 400, color: "#272727", cursor: "pointer", flexShrink: 0, whiteSpace: "nowrap" }}>
              <img src="https://www.figma.com/api/mcp/asset/02a58ae9-cd99-47a3-838d-c5dfab7af5ef" alt="" width={16} height={16} />
              Bộ lọc
            </button>
          </div>

          {/* Cards */}
          {(items.length ? items.slice(0, 5).map((f: any, i: number) => {
            const st = FB_STATUS[f.status] ?? FB_STATUS.IN_PROGRESS;
            const code = `#PA-${f.createdAt ? new Date(f.createdAt).toISOString().slice(2, 10).replace(/-/g, "") : "240525"}-${f.id.slice(0, 4)}`;
            return {
              _id: f.id,
              active: f.id === selectedId,
              icon: CARD_ICONS[i % CARD_ICONS.length],
              category: FB_CAT_LABEL[f.category] ?? f.category,
              title: f.title,
              dotColor: st.dot,
              id: `${code} · ${fmtMoment(f.createdAt)}`,
              badgeBg: st.bg,
              badgeColor: st.color,
              badgeText: st.label,
            };
          }) : [
            { _id: "p1", active: true, icon: CARD_ICONS[0], category: "Vệ sinh - Môi trường", title: "Rác thải không được dọn dẹp ở tầng hầm B2", dotColor: "#2f7bf6", id: "#PA-240525-0012 · 10:30 · Hôm nay", badgeBg: "#e7eeff", badgeColor: "#2f7bf6", badgeText: "Đang xử lý" },
            { _id: "p2", icon: CARD_ICONS[1], category: "Thang máy", title: "Thang máy số 2 bị kẹt và dừng đột ngột", dotColor: "#f5a623", id: "#PA-240524-0011 · 16:45 · Hôm qua", badgeBg: "#fff1de", badgeColor: "#c87a13", badgeText: "Chờ phản hồi" },
            { _id: "p3", icon: CARD_ICONS[2], category: "Kỹ thuật - Hạ tầng", title: "Đèn hành lang tầng 15 không hoạt động", dotColor: "#1cbf6a", id: "#PA-240524-0010 · 09:15 · 2 ngày trước", badgeBg: "#e3fbed", badgeColor: "#1c9d5f", badgeText: "Đã hoàn thành" },
            { _id: "p4", icon: CARD_ICONS[3], category: "An ninh", title: "Xe lạ thường xuyên ra vào khu vực căn hộ", dotColor: "#2f7bf6", id: "#PA-240523-0009 · 21:30 · 2 ngày trước", badgeBg: "#e7eeff", badgeColor: "#2f7bf6", badgeText: "Đang xử lý" },
            { _id: "p5", icon: CARD_ICONS[4], category: "Tiện ích - Dịch vụ", title: "Phòng gym thiếu máy và thiết bị hỏng", dotColor: "#ef4444", id: "#PA-240523-0008 · 18:20 · 3 ngày trước", badgeBg: "#ffeded", badgeColor: "#ef4444", badgeText: "Từ chối" },
          ]).map((card: any, i: number) => (
            <div key={card._id ?? i} onClick={() => card._id && setActiveId(card._id)} style={{ background: card.active ? "#f7f5ff" : "#ffffff", border: `1px solid ${card.active ? "#d3c5fd" : "#e2e5f1"}`, borderRadius: "20px", padding: "16px", cursor: "pointer", boxShadow: card.active ? "0 2px 5px rgba(65,55,249,.12)" : "none" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "10px", background: card.active ? "#ffffff" : "#f7f8fc", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src={card.icon} alt="" width={22} height={22} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "11.5px", color: "#585c7b", marginBottom: "4px" }}>{card.category}</div>
                  <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#272727", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>{card.title}</div>
                </div>
                <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: card.dotColor, flexShrink: 0, marginTop: "4px" }} />
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>
                <span style={{ fontSize: "11.5px", color: "#585c7b" }}>{card.id}</span>
                <span style={{ display: "inline-flex", alignItems: "center", padding: "3px 10px", borderRadius: "999px", fontSize: "11.5px", fontWeight: 600, whiteSpace: "nowrap", background: card.badgeBg, color: card.badgeColor }}>{card.badgeText}</span>
              </div>
            </div>
          ))}

          {/* Pagination */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "6px", paddingBottom: "4px", marginTop: "2px" }}>
            <span style={{ fontSize: "12px", color: "#3e4265", whiteSpace: "nowrap" }}>Hiển thị 1 - {Math.min(5, items.length || 5)} của {tabs.all ?? 24} phản ánh</span>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <button style={{ minWidth: "32px", height: "32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #d4d7e5", background: "#ffffff", cursor: "pointer" }}>
                <img src="https://www.figma.com/api/mcp/asset/f1006bab-257c-4f10-9b0f-708a766e554a" alt="" width={10} height={10} />
              </button>
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} style={{ minWidth: "32px", height: "32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0 8px", fontSize: "13px", color: n === 1 ? "#fff" : "#3e4265", border: n === 1 ? "1px solid #4137f9" : "1px solid #d4d7e5", background: n === 1 ? "#4137f9" : "#ffffff", cursor: "pointer", fontWeight: n === 1 ? 600 : 400 }}>{n}</button>
              ))}
              <button style={{ minWidth: "32px", height: "32px", borderRadius: "8px", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1px solid #d4d7e5", background: "#ffffff", cursor: "pointer" }}>
                <img src="https://www.figma.com/api/mcp/asset/553ef640-5114-42f4-b632-43b7aba10442" alt="" width={10} height={10} />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE — Detail */}
        <div style={{ flex: 1, minWidth: 0, background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "20px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Topbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <a href="#" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3e4265", textDecoration: "none" }}>
              <img src="https://www.figma.com/api/mcp/asset/d061fb6b-8fc1-4ecd-9bdb-a8a976365cf6" alt="" width={15} height={15} />
              <span style={{ fontSize: "13.5px" }}>Quay lại danh sách</span>
            </a>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 15px", background: "#ffffff", border: "1px solid #d4d7e5", borderRadius: "10px", fontSize: "13px", fontWeight: 500, color: "#272727", cursor: "pointer" }}>
                <img src="https://www.figma.com/api/mcp/asset/6dd5d7dd-0213-4d29-8a4d-c8369df012e7" alt="" width={14} height={14} />
                Theo dõi
              </button>
              <button style={{ width: "34px", height: "34px", background: "#ffffff", border: "1px solid #d4d7e5", borderRadius: "10px", display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <img src="https://www.figma.com/api/mcp/asset/705aaa04-0fba-4a62-9c13-a4ff3a3a1975" alt="" width={15} height={15} />
              </button>
            </div>
          </div>

          {/* Status */}
          <div><span style={{ display: "inline-flex", alignItems: "center", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: 600, background: detailStatusInfo.bg, color: detailStatusInfo.color }}>{detailStatusInfo.label}</span></div>

          {/* Title */}
          <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#272727", lineHeight: 1.3 }}>{detail?.title ?? "Rác thải không được dọn dẹp ở tầng hầm B2"}</h2>

          {/* Author */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", flexShrink: 0, background: "linear-gradient(180deg, #d7e0ee 0%, #c0cadb 100%)" }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "13.5px", fontWeight: 600, color: "#272727" }}>{detail?.user?.fullName ?? "Nguyễn Hoàng Nam"}</div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginTop: "3px" }}>
                <span style={{ fontSize: "11.5px", color: "#585c7b" }}>Căn hộ A-12.05</span>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#b4b7c9" }} />
                <span style={{ fontSize: "11.5px", color: "#585c7b" }}>{detail?.createdAt ? new Date(detail.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: true }) : "10:30 AM"}</span>
                <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "#b4b7c9" }} />
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <img src="https://www.figma.com/api/mcp/asset/2fa24cfe-7563-4730-822f-99db41075e63" alt="" width={11} height={11} />
                  <span style={{ fontSize: "11.5px", color: "#585c7b" }}>{detail?.createdAt ? new Date(detail.createdAt).toLocaleDateString("vi-VN") : "25/05/2024"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p style={{ fontSize: "14px", color: "#3e4265", lineHeight: 1.65 }}>{detail?.description ?? "Khu vực gần thang thoát hiểm và cột B2-07 có nhiều rác thải sinh hoạt, mùi hôi khó chịu. Đề nghị ban quản lý kiểm tra và xử lý sớm."}</p>

          {/* Attachments */}
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#272727" }}>Hình ảnh đính kèm (3)</div>
          <div style={{ display: "flex", gap: "10px" }}>
            <img src="https://www.figma.com/api/mcp/asset/ce2a3881-b289-4f47-9a40-cce0ed2e2a3d" alt="" style={{ flex: 1, aspectRatio: "1/1", minWidth: 0, borderRadius: "12px", objectFit: "cover" }} />
            <img src="https://www.figma.com/api/mcp/asset/547b3a90-e46f-4ee6-a805-dac6339f7cfb" alt="" style={{ flex: 1, aspectRatio: "1/1", minWidth: 0, borderRadius: "12px", objectFit: "cover" }} />
            <div style={{ flex: 1, aspectRatio: "1/1", minWidth: 0, borderRadius: "12px", position: "relative", overflow: "hidden" }}>
              <img src="https://www.figma.com/api/mcp/asset/711f85c8-ac3e-42a3-ae26-540d70bede3e" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: "22px", fontWeight: 700, color: "#fff" }}>+1</span>
              </div>
            </div>
          </div>

          {/* History */}
          <div style={{ fontSize: "15px", fontWeight: 700, color: "#272727" }}>Lịch sử xử lý</div>
          <div>
            {(detail?.replies?.length ? detail.replies.map((r: any, i: number) => ({
              borderColor: i === 0 ? "#1cbf6a" : "#2f7bf6",
              icon: i === 0 ? "https://www.figma.com/api/mcp/asset/3feab6cf-60ec-4e5b-adff-84aa994169bc" : "https://www.figma.com/api/mcp/asset/74849f66-a1f0-4144-9eb2-4f014d1ca1ee",
              label: r.user?.fullName ?? "Ban quản lý",
              time: fmtFull(r.createdAt),
              text: r.content,
              hasLine: true,
              labelColor: "#272727",
            })) : [
              { borderColor: "#1cbf6a", icon: "https://www.figma.com/api/mcp/asset/3feab6cf-60ec-4e5b-adff-84aa994169bc", label: "Ban quản lý đã tiếp nhận phản ánh", time: "10:45 AM • 25/05/2024", text: "Cảm ơn Anh/Chị đã phản ánh. Chúng tôi đã tiếp nhận và sẽ kiểm tra ngay.", hasLine: true, labelColor: "#272727" },
              { borderColor: "#2f7bf6", icon: "https://www.figma.com/api/mcp/asset/74849f66-a1f0-4144-9eb2-4f014d1ca1ee", label: "Đang xử lý", time: "11:20 AM • 25/05/2024", text: "Bộ phận vệ sinh đã được thông báo và đang tiến hành xử lý.", hasLine: true, labelColor: "#272727" },
            ]).map((step: any, i: number) => (
              <div key={i} style={{ position: "relative", paddingLeft: "36px", paddingBottom: "22px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: "24px", height: "24px", borderRadius: "12px", border: `2px solid ${step.borderColor}`, background: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                  <img src={step.icon} alt="" width={12} height={12} />
                </div>
                {step.hasLine && <div style={{ position: "absolute", left: "11px", top: "26px", bottom: "-6px", width: "2px", background: "#e2e5f1" }} />}
                <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
                  <div style={{ flex: 1, fontSize: "13.5px", fontWeight: 600, color: step.labelColor }}>{step.label}</div>
                  <div style={{ fontSize: "11.5px", color: "#585c7b", whiteSpace: "nowrap" }}>{step.time}</div>
                </div>
                <div style={{ fontSize: "13px", color: "#3e4265", lineHeight: 1.55 }}>{step.text}</div>
              </div>
            ))}
            {/* Step 3 — gray pending */}
            <div style={{ position: "relative", paddingLeft: "36px", display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ position: "absolute", left: 0, top: 0, width: "24px", height: "24px", borderRadius: "12px", border: "2px solid #d4d7e5", background: "#f7f8fc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                <div style={{ width: "8px", height: "8px", background: "#d4d7e5", borderRadius: "4px" }} />
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "20px" }}>
                <div style={{ flex: 1, fontSize: "13.5px", fontWeight: 600, color: "#585c7b" }}>Chờ phản hồi từ cư dân</div>
                <div style={{ fontSize: "11.5px", color: "#585c7b", whiteSpace: "nowrap" }}>—</div>
              </div>
              <div style={{ fontSize: "13px", color: "#3e4265", lineHeight: 1.55 }}>Sau khi xử lý, chúng tôi sẽ cập nhật kết quả tại đây. Cảm ơn Anh/Chị!</div>
            </div>
          </div>

          {/* Comment */}
          <div style={{ borderTop: "1px solid #eff2fc", paddingTop: "19px", display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ flex: 1, height: "44px", border: "1px solid #d4d7e5", borderRadius: "10px", background: "#ffffff", display: "flex", alignItems: "center", padding: "0 15px", minWidth: 0 }}>
              <input
                placeholder="Viết bình luận..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && !posting) submitReply(); }}
                style={{ flex: 1, border: 0, outline: 0, fontSize: "16px", background: "transparent", color: "#222", minWidth: 0 }}
              />
            </div>
            <button onClick={submitReply} disabled={posting || !reply.trim()} style={{ width: "44px", height: "44px", background: "#4137f9", borderRadius: "10px", border: 0, display: "inline-flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, opacity: posting ? 0.6 : 1 }}>
              <img src="https://www.figma.com/api/mcp/asset/e8ea7b01-bd93-42b6-968b-6b6f97ebe7e6" alt="" width={18} height={18} />
            </button>
          </div>
        </div>

        {/* RIGHT — Rail */}
        <div style={{ width: "260px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "20px", padding: "17px 19px" }}>
            <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#272727", marginBottom: "14px" }}>Thông tin phản ánh</div>
            {[
              { label: "Danh mục", value: FB_CAT_LABEL[detail?.category] ?? "Vệ sinh - Môi trường", dot: detailStatusInfo.dot },
              { label: "Ưu tiên", value: FB_PRIORITY_VI[detail?.priority] ?? "Trung bình", dot: FB_PRIORITY_COLOR[detail?.priority] ?? "#f5a623" },
              { label: "Địa điểm", value: detail?.location ?? "Tầng hầm B2 - Gần cột B2-07" },
              { label: "Ngày tạo", value: fmtFull(detail?.createdAt) ?? "10:30 AM • 25/05/2024" },
              { label: "Cập nhật cuối", value: fmtFull(detail?.updatedAt ?? detail?.replies?.[detail.replies.length - 1]?.createdAt) ?? "11:20 AM • 25/05/2024" },
            ].map((row: any, i: number) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: i > 0 ? "14px" : 0 }}>
                <div style={{ fontSize: "11.5px", color: "#585c7b" }}>{row.label}</div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 500, color: "#272727" }}>
                  {row.value}
                  {row.dot && <div style={{ width: "8px", height: "8px", borderRadius: "4px", background: row.dot, flexShrink: 0 }} />}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#ffffff", border: "1px solid #e2e5f1", borderRadius: "20px", padding: "17px 19px" }}>
            <div style={{ fontSize: "14.5px", fontWeight: 700, color: "#272727", marginBottom: "14px" }}>Thao tác nhanh</div>
            {[
              { icon: "https://www.figma.com/api/mcp/asset/25de301b-b7d7-4fa8-9cbc-d698f3caefd3", label: "Cập nhật thông tin", danger: false },
              { icon: "https://www.figma.com/api/mcp/asset/a92c0573-5529-487b-975a-9aef1e1a753c", label: "Bổ sung hình ảnh", danger: false },
              { icon: "https://www.figma.com/api/mcp/asset/ed0b617a-a42c-4678-959a-5c7a8ca90908", label: "Hủy phản ánh", danger: true },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 0", cursor: "pointer", borderTop: i > 0 ? "1px solid #eff2fc" : "none" }}>
                <img src={item.icon} alt="" width={18} height={18} style={{ flexShrink: 0 }} />
                <span style={{ flex: 1, fontSize: "13px", color: item.danger ? "#f5222d" : "#272727", minWidth: 0 }}>{item.label}</span>
                <img src="https://www.figma.com/api/mcp/asset/cc8a571d-04d1-4aef-a765-86c99b4bb7a2" alt="" width={14} height={14} style={{ flexShrink: 0, opacity: 0.5 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Banner */}
      <div style={{ position: "relative", overflow: "hidden", border: "1px solid #d3c5fd", borderRadius: "10px", padding: "23px 24px 23px 220px", flexShrink: 0 }}>
        <img src="https://www.figma.com/api/mcp/asset/e1803480-f04b-45ee-b55c-9cd83b6024a7" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div style={{ fontSize: "28px", fontWeight: 700, color: "#4137f9", lineHeight: "36px", marginBottom: "4px" }}>Hỏi AI trợ lý của cư dân</div>
              <div style={{ fontSize: "18px", fontWeight: 500, color: "#272727", lineHeight: "26px" }}>Tôi có thể giúp gì cho bạn hôm nay?</div>
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Quy định về việc nuôi thú cưng?", "Hướng dẫn đăng ký xe", "Tìm tài liệu nội quy"].map((chip) => (
                <span key={chip} style={{ background: "#fff", borderRadius: "12px", padding: "8px 10px", fontSize: "14px", fontWeight: 500, color: "#272727", whiteSpace: "nowrap", cursor: "pointer", lineHeight: "22px" }}>{chip}</span>
              ))}
            </div>
          </div>
          <button style={{ display: "inline-flex", alignItems: "center", gap: "10px", background: "#4137f9", color: "#fff", padding: "8px 10px", borderRadius: "12px", border: 0, fontSize: "14px", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0, lineHeight: "22px" }}>
            Chat với AI
            <img src="https://www.figma.com/api/mcp/asset/2d5f6eb3-da7c-4c55-b3e3-3e94dcef4928" alt="" width={18} height={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
