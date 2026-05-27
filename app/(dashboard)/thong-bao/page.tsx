"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";

const THUMB_COLOR: Record<string, string> = {
  URGENT: "red", MANAGEMENT: "blue", FINANCE: "orange", EVENT: "green", SYSTEM: "violet",
};
const THUMB_ASSET: Record<string, string> = {
  URGENT: "https://www.figma.com/api/mcp/asset/9880ed18-5587-436d-8cd0-060f6b9bcd51",
  MANAGEMENT: "https://www.figma.com/api/mcp/asset/045ba488-25e3-4537-b659-d178f2895cd6",
  FINANCE: "https://www.figma.com/api/mcp/asset/abd52cb0-2d6f-4e72-bd40-b6f409b70e84",
  SYSTEM: "https://www.figma.com/api/mcp/asset/b66c0343-b44f-4bbd-ad9c-1b849b4299fb",
  EVENT: "https://www.figma.com/api/mcp/asset/adef0138-8229-4f3a-8366-2ffa23a3f374",
};
const KICKER: Record<string, string> = {
  URGENT: "THÔNG BÁO KHẨN", MANAGEMENT: "THÔNG BÁO", FINANCE: "TÀI CHÍNH",
  EVENT: "SỰ KIỆN", SYSTEM: "HỆ THỐNG",
};

const fmtNotifTime = (iso: string) => {
  const d = new Date(iso);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Hôm qua";
  return d.toLocaleDateString("vi-VN");
};

export default function ThongBaoPage() {
  const { data, refresh } = useApi(() => api.notifications(), []);
  const [activeId, setActiveId] = useState<string | null>(null);

  const items: any[] = data?.items ?? [];
  const tabs = data?.tabs ?? { all: 24, urgent: 3, unread: 8 };
  const unreadCount = data?.unreadCount ?? 8;
  const totalCount = (tabs as any).all ?? items.length ?? 24;
  const urgentCount = items.filter((i: any) => i.notification?.type === "URGENT").length;

  const selectedItem = items.find((i: any) => i.id === activeId) ?? items[0];
  const selected = selectedItem?.notification;

  async function markAll() {
    await api.notificationsMarkAll();
    refresh();
  }

  return (
    <div className="thongbao-page">
      <div className="col-main">
        <div className="page-head">
          <div>
            <h1 className="page-title">Thông báo</h1>
            <div className="page-sub">Cập nhật những thông tin mới nhất từ Ban quản trị</div>
          </div>
          <button className="mark-all" onClick={markAll}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Đánh dấu đã đọc tất cả
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#585c7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
        </div>

        <div className="tabs">
          <div className="tab active">Tất cả <span className="count">{totalCount}</span></div>
          <div className="tab urgent">Thông báo khẩn <span className="count">{urgentCount || 3}</span></div>
          <div className="tab">Chưa đọc <span className="count">{unreadCount}</span></div>
          <div className="tab">Đã đọc</div>
        </div>

        <div className="work">
          {/* List */}
          <div>
            <div className="search-row">
              <div className="search">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b4b7c9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.65" y2="16.65"/></svg>
                <input placeholder="Tìm kiếm thông báo..." />
              </div>
              <button className="filter-icon-btn" aria-label="Bộ lọc">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="10" y1="18" x2="14" y2="18"/></svg>
              </button>
            </div>

            <div className="list">
              {items.slice(0, 5).map((it: any, idx: number) => {
                const n = it.notification;
                const type = n?.type ?? "MANAGEMENT";
                const color = THUMB_COLOR[type] ?? "blue";
                const asset = THUMB_ASSET[type] ?? THUMB_ASSET.MANAGEMENT;
                const isActive = activeId ? it.id === activeId : idx === 0;
                const dotColor = !it.readAt ? "red" : "blue";
                return (
                  <div key={it.id} className={`item${isActive ? " active" : ""}`} onClick={() => setActiveId(it.id)}>
                    <div className={`thumb ${color}`}>
                      <img src={asset} alt="" width={20} height={20} />
                    </div>
                    <div className="body">
                      <div className="eyebrow">{KICKER[type] ?? "THÔNG BÁO"}</div>
                      <div className="title">{n?.title}</div>
                      <div className="meta">{n?.publishedAt ? fmtNotifTime(n.publishedAt) : ""}</div>
                    </div>
                    {!it.readAt && <span className={`status-dot ${dotColor}`}></span>}
                  </div>
                );
              })}
            </div>

            <div className="pager">
              <div>Hiển thị 1 - {Math.min(5, items.length || 5)} của {totalCount} thông báo</div>
              <div className="pages">
                <button className="page-btn" aria-label="Trang trước">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className="page-btn active">1</button>
                <button className="page-btn">2</button>
                <button className="page-btn">3</button>
                <button className="page-btn">4</button>
                <button className="page-btn" aria-label="Trang sau">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="detail">
            <div className="detail-top">
              <div className="back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                Quay lại danh sách
              </div>
              <div className="top-actions">
                <button className="share-btn">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                  Chia sẻ
                </button>
                <button className="more-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                </button>
              </div>
            </div>

            <div className="title-row">
              <div>
                <span className="kicker">{KICKER[selected?.type ?? "MANAGEMENT"] ?? "THÔNG BÁO"}</span>
                <h2 className="h1">{selected?.title ?? "Thông báo về việc bảo trì hệ thống PCCC định kỳ"}</h2>
              </div>
              {selected?.priority === "URGENT" && <span className="urgent-badge">Khẩn cấp</span>}
            </div>

            <div className="author">
              <div className="avatar-org">
                <img src="https://www.figma.com/api/mcp/asset/a896629d-2faa-4bae-b318-ea03b31e6db9" alt="" width={22} height={25} style={{ display: "block" }} />
              </div>
              <div>
                <div className="author-name">
                  {selected?.source ?? "Ban quản trị"}
                  <span className="verified">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                </div>
                <div className="author-meta">
                  {selected?.publishedAt ? new Date(selected.publishedAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit", hour12: true }) : "10:30 AM"}
                  <span className="dot"></span>
                  {selected?.publishedAt ? new Date(selected.publishedAt).toLocaleDateString("vi-VN") : "23/05/2024"}
                  <span className="dot"></span>
                  <span className="views">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    256 lượt xem
                  </span>
                </div>
              </div>
            </div>

            <div className="prose">
              {selected?.body ? (
                selected.body.split("\n").map((para: string, i: number) => <p key={i}>{para}</p>)
              ) : (
                <>
                  <p>Kính gửi Quý cư dân,</p>
                  <p>Ban quản trị thông báo về việc bảo trì hệ thống phòng cháy chữa cháy định kỳ toàn bộ khu căn hộ Sunshine Riverside.</p>
                </>
              )}
            </div>

            <div className="time-card">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              <div>
                <div className="label">Thời gian thực hiện</div>
                <div className="row">Thứ Bảy, ngày 25/05/2024</div>
                <div className="row">Từ 08:00 - 17:00</div>
              </div>
            </div>

            <div className="section-h"><span className="info-icon">i</span> Nội dung công việc</div>
            <ul className="check-list">
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> Kiểm tra hệ thống báo cháy tự động</li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> Kiểm tra hệ thống chữa cháy (bơm, van, đường ống)</li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> Kiểm tra bình chữa cháy tại các tầng</li>
              <li><span className="check"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span> Kiểm tra hệ thống đèn sự cố và chỉ dẫn thoát hiểm</li>
            </ul>

            <div className="alert">
              <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div>Trong thời gian bảo trì, có thể xảy ra tình trạng còi báo cháy thử nghiệm. Rất mong Quý cư dân thông cảm và phối hợp.</div>
            </div>

            <div className="signoff">
              <div>Trân trọng,</div>
              <div><strong>{selected?.source ?? "Ban quản trị Sunshine Riverside"}</strong></div>
            </div>

            <div className="attach-title">Tài liệu đính kèm (2)</div>
            <div className="attach-grid">
              <div className="attach">
                <div className="filetype pdf">PDF</div>
                <div className="info">
                  <div className="name">Ke_hoach_bao_tri_PCCC.pdf</div>
                  <div className="size">PDF • 1.2 MB</div>
                </div>
                <button className="download" aria-label="Tải xuống">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
              </div>
              <div className="attach">
                <div className="filetype doc">DOC</div>
                <div className="info">
                  <div className="name">Huong_dan_an_toan_PCCC.docx</div>
                  <div className="size">DOCX • 856 KB</div>
                </div>
                <button className="download" aria-label="Tải xuống">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right rail */}
      <aside className="rail">
        <section className="panel">
          <div className="panel-head">
            <div className="panel-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Bộ lọc
            </div>
          </div>
          <div className="field">
            <div className="field-label">Loại thông báo</div>
            <div className="select">Tất cả <svg className="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
          </div>
          <div className="field">
            <div className="field-label">Danh mục</div>
            <div className="select">Tất cả <svg className="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
          </div>
          <div className="field">
            <div className="field-label">Khoảng thời gian</div>
            <div className="select">Tất cả thời gian <svg className="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></div>
          </div>
          <button className="btn-apply">Áp dụng</button>
          <button className="btn-reset">Đặt lại</button>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div className="panel-title">Thông báo nổi bật</div>
            <a href="#" className="link">Xem tất cả <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></a>
          </div>
          <div className="featured-list">
            <div className="featured urgent">
              <div className="thumb red">
                <img src="https://www.figma.com/api/mcp/asset/5418f38a-8d0f-433c-ae26-4281d2eaecff" alt="" width={18} height={18} />
              </div>
              <div className="body">
                <div className="kicker-sm">THÔNG BÁO KHẨN</div>
                <div className="ftitle">Tạm ngưng cấp nước khu A</div>
                <div className="fmeta">25/05/2024 • 08:00</div>
              </div>
            </div>
            <div className="featured">
              <div className="thumb blue">
                <img src="https://www.figma.com/api/mcp/asset/e09ab2e1-c42b-4288-abf4-9675099d1369" alt="" width={18} height={18} />
              </div>
              <div className="body">
                <div className="ftitle">Lịch cắt điện Block A</div>
                <div className="fmeta">26/05/2024 • 09:00</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#585c7b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
          </div>
        </section>

        <section className="panel">
          <div className="panel-head">
            <div className="panel-title">Danh mục phổ biến</div>
          </div>
          <div className="cat-list">
            <div className="cat"><span>Phí &amp; Tài chính</span><span className="cat-count">8</span></div>
            <div className="cat"><span>Vận hành</span><span className="cat-count">6</span></div>
            <div className="cat"><span>Sự kiện</span><span className="cat-count">4</span></div>
            <div className="cat"><span>An ninh - An toàn</span><span className="cat-count">3</span></div>
          </div>
          <a href="#" className="cat-link">
            Xem tất cả danh mục
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </section>
      </aside>
    </div>
  );
}
