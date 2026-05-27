"use client";
/* eslint-disable @next/next/no-img-element */
import { api } from "@/lib/api";
import { useApi } from "@/lib/use-api";
import { useAuth } from "@/lib/auth-context";

const fmtDateTime = (iso?: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  const now = new Date();
  const time = d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  if (d.toDateString() === now.toDateString()) return `Hôm nay, ${time}`;
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return `Hôm qua, ${time}`;
  return `${d.toLocaleDateString("vi-VN")}, ${time}`;
};

export default function CaiDatPage() {
  const { user, logout } = useAuth();
  const { data, refresh } = useApi(() => api.settings(), []);
  const settings = data?.settings ?? {};
  const notifPrefs = settings.notifPreferences ?? {};
  const devices: any[] = data?.devices ?? [];
  const fullName = user?.fullName ?? "Trần Hoàng Chris";
  const email = user?.email ?? "chris.tran@gmail.com";
  const apartmentCode = user?.apartments?.[0]?.apartment?.code ?? "A-12.05";
  const buildingName = user?.apartments?.[0]?.apartment?.building?.name ?? "Landmark 1";
  const avatar = user?.avatar ?? "https://www.figma.com/api/mcp/asset/ee21e768-a070-4e15-ad43-73a28943d4ee";
  const phone = (user as any)?.phone ?? "0912 345 678";
  const emailVerified = !!(user as any)?.emailVerifiedAt;
  const phoneVerified = !!(user as any)?.phoneVerifiedAt;

  const toggleNotif = async (key: string) => {
    const cur = notifPrefs[key] ?? false;
    await api.settingsUpdate({ notifPreferences: { ...notifPrefs, [key]: !cur } });
    refresh();
  };

  return (
    <div className="caidat-page">
      <div className="page-header">
        <div className="page-title">Cài đặt</div>
        <div className="page-subtitle">Quản lý tài khoản, bảo mật và tuỳ chỉnh ứng dụng</div>
      </div>

      <div className="settings-layout">
        {/* Left nav */}
        <div className="settings-nav">
          <div className="sn-item active">
            <div className="sn-icon-wrap"><svg className="sn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
            Tài khoản
          </div>
          <div className="sn-item">
            <div className="sn-icon-wrap"><svg className="sn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
            Thông báo
          </div>
          <div className="sn-item">
            <div className="sn-icon-wrap"><svg className="sn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
            Bảo mật
          </div>
          <div className="sn-item">
            <div className="sn-icon-wrap"><svg className="sn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg></div>
            Giao diện
          </div>
          <div className="sn-item">
            <div className="sn-icon-wrap"><svg className="sn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
            Quyền riêng tư
          </div>
          <div className="sn-item">
            <div className="sn-icon-wrap"><svg className="sn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
            Thiết bị
          </div>
        </div>

        {/* Right content */}
        <div className="settings-content">
          {/* Tài khoản */}
          <div className="sc">
            <div className="sc-hd">
              <div className="sc-hd-icon" style={{ background: "#efeeff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
              <div className="sc-hd-title">Tài khoản</div>
            </div>
            <div className="sc-body">
              <div className="profile-row">
                <img className="pr-avatar" src={avatar} alt={fullName} width={52} height={52}/>
                <div className="pr-info">
                  <div className="pr-name">{fullName}</div>
                  <div className="pr-meta">{email} · Căn hộ {apartmentCode} · {buildingName}</div>
                </div>
                <button className="pr-edit">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                  Chỉnh sửa hồ sơ
                </button>
              </div>
              <div className="link-row">
                <div className="lr-icon" style={{ background: "#e4f1ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
                <div className="lr-text">
                  <div className="lr-label">Email</div>
                  <div className="lr-sub">{email}</div>
                </div>
                <div className="lr-right">
                  <span className={`lr-badge ${emailVerified ? "badge-on" : "badge-warn"}`}>{emailVerified ? "Đã xác minh" : "Chưa xác minh"}</span>
                  <div className="lr-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>
                </div>
              </div>
              <div className="link-row">
                <div className="lr-icon" style={{ background: "#e3fbed" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.08 6.08l1.79-1.79a2 2 0 0 1 2.11-.45 13.81 13.81 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
                <div className="lr-text">
                  <div className="lr-label">Số điện thoại</div>
                  <div className="lr-sub">{phone}</div>
                </div>
                <div className="lr-right">
                  <span className={`lr-badge ${phoneVerified ? "badge-on" : "badge-warn"}`}>{phoneVerified ? "Đã xác minh" : "Chưa xác minh"}</span>
                  <div className="lr-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div>
                </div>
              </div>
            </div>
          </div>

          {/* Thông báo */}
          <div className="sc">
            <div className="sc-hd">
              <div className="sc-hd-icon" style={{ background: "#fff8ec" }}><svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
              <div className="sc-hd-title">Thông báo</div>
              <div className="sc-hd-sub">Tuỳ chỉnh loại thông báo bạn nhận</div>
            </div>
            <div className="sc-body">
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#efeeff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Thông báo phí quản lý</div>
                  <div className="tr-sub">Nhắc khi đến kỳ thanh toán và xác nhận đã thu</div>
                </div>
                <div className={`toggle${notifPrefs.financeAlerts !== false ? " on" : ""}`} onClick={() => toggleNotif("financeAlerts")} style={{ cursor: "pointer" }}></div>
              </div>
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#fff8ec" }}><svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Bảo trì &amp; Sửa chữa</div>
                  <div className="tr-sub">Cập nhật tiến độ yêu cầu bảo trì của bạn</div>
                </div>
                <div className={`toggle${notifPrefs.maintenance !== false ? " on" : ""}`} onClick={() => toggleNotif("maintenance")} style={{ cursor: "pointer" }}></div>
              </div>
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#ffeded" }}><svg viewBox="0 0 24 24" fill="none" stroke="#f5222d" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Thông báo khẩn cấp</div>
                  <div className="tr-sub">PCCC, mất điện, sự cố — luôn bật</div>
                </div>
                <div className="toggle on" style={{ opacity: .5, pointerEvents: "none" }}></div>
              </div>
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#e4f1ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Sự kiện cộng đồng</div>
                  <div className="tr-sub">Thông báo về sự kiện trong toà nhà</div>
                </div>
                <div className={`toggle${notifPrefs.events !== false ? " on" : ""}`} onClick={() => toggleNotif("events")} style={{ cursor: "pointer" }}></div>
              </div>
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#f7f5ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#5a3ad9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Tài liệu &amp; Thông tin mới</div>
                  <div className="tr-sub">Khi BQL cập nhật tài liệu, báo cáo mới</div>
                </div>
                <div className={`toggle${notifPrefs.documents ? " on" : ""}`} onClick={() => toggleNotif("documents")} style={{ cursor: "pointer" }}></div>
              </div>
            </div>
          </div>

          {/* Bảo mật */}
          <div className="sc">
            <div className="sc-hd">
              <div className="sc-hd-icon" style={{ background: "#e3fbed" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
              <div className="sc-hd-title">Bảo mật</div>
            </div>
            <div className="sc-body">
              <div className="link-row">
                <div className="lr-icon" style={{ background: "#efeeff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#4137f9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                <div className="lr-text">
                  <div className="lr-label">Đổi mật khẩu</div>
                  <div className="lr-sub">Cập nhật lần cuối 3 tháng trước</div>
                </div>
                <div className="lr-right"><div className="lr-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div></div>
              </div>
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#e3fbed" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1c9d5f" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Xác thực 2 bước (2FA)</div>
                  <div className="tr-sub">Bảo vệ tài khoản bằng mã OTP qua SMS</div>
                </div>
                <div className={`toggle${settings.twoFactorEnabled ? " on" : ""}`} onClick={async () => { await api.settingsUpdate({ twoFactorEnabled: !settings.twoFactorEnabled }); refresh(); }} style={{ cursor: "pointer" }}></div>
              </div>
              <div className="link-row">
                <div className="lr-icon" style={{ background: "#fff8ec" }}><svg viewBox="0 0 24 24" fill="none" stroke="#c8761b" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
                <div className="lr-text">
                  <div className="lr-label">Lịch sử đăng nhập</div>
                  <div className="lr-sub">Xem các phiên đăng nhập gần đây</div>
                </div>
                <div className="lr-right"><div className="lr-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg></div></div>
              </div>
            </div>
          </div>

          {/* Giao diện */}
          <div className="sc">
            <div className="sc-hd">
              <div className="sc-hd-icon" style={{ background: "#f7f5ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#5a3ad9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/></svg></div>
              <div className="sc-hd-title">Ngôn ngữ &amp; Giao diện</div>
            </div>
            <div className="sc-body">
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#e4f1ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Ngôn ngữ</div>
                  <div className="tr-sub">Chọn ngôn ngữ hiển thị ứng dụng</div>
                </div>
                <div className="lang-select">
                  <span className="lang-flag">🇻🇳</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>Tiếng Việt</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div className="toggle-row">
                <div className="tr-icon" style={{ background: "#f7f5ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#5a3ad9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></div>
                <div className="tr-text">
                  <div className="tr-label">Giao diện</div>
                  <div className="tr-sub">Chọn chế độ sáng hoặc tối</div>
                </div>
                <div className="theme-btns">
                  <button className="theme-btn active">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                    Sáng
                  </button>
                  <button className="theme-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                    Tối
                  </button>
                  <button className="theme-btn">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                    Hệ thống
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Thiết bị */}
          <div className="sc">
            <div className="sc-hd">
              <div className="sc-hd-icon" style={{ background: "#e4f1ff" }}><svg viewBox="0 0 24 24" fill="none" stroke="#1870c4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
              <div className="sc-hd-title">Thiết bị đăng nhập</div>
              <div className="sc-hd-sub">{devices.length || 2} thiết bị đang hoạt động</div>
            </div>
            <div className="sc-body">
              {(devices.length ? devices : [
                { id: "pd1", deviceName: "iPhone 15 Pro Max", deviceType: "mobile", lastIp: "TP. Hồ Chí Minh", lastLoginAt: null, isCurrent: true, _meta: "iOS 17.4 · TP. Hồ Chí Minh · Hôm nay, 09:14" },
                { id: "pd2", deviceName: 'MacBook Pro 14"', deviceType: "desktop", lastIp: "TP. Hồ Chí Minh", lastLoginAt: null, isCurrent: false, _meta: "macOS Sonoma · TP. Hồ Chí Minh · Hôm qua, 21:33" },
              ]).map((d: any) => {
                const isMobile = d.deviceType === "mobile";
                return (
                  <div className="device-row" key={d.id}>
                    <div className="device-icon">
                      {isMobile ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      )}
                    </div>
                    <div className="device-info">
                      <div className="device-name">{d.deviceName}</div>
                      <div className="device-meta">{d._meta ?? `${d.lastIp ?? "—"} · ${fmtDateTime(d.lastLoginAt)}`}</div>
                    </div>
                    {d.isCurrent ? <div className="device-current">Thiết bị này</div> : <button className="device-logout">Đăng xuất</button>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Danger zone */}
          <div className="danger-zone">
            <div className="dz-hd">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <div className="dz-hd-title">Vùng nguy hiểm</div>
            </div>
            <div className="dz-row">
              <div className="dz-text">
                <div className="dz-label">Đăng xuất tất cả thiết bị</div>
                <div className="dz-sub">Kết thúc tất cả phiên đăng nhập trên mọi thiết bị</div>
              </div>
              <button className="btn-danger-outline" onClick={() => logout()}>Đăng xuất tất cả</button>
            </div>
            <div className="dz-row">
              <div className="dz-text">
                <div className="dz-label">Xoá tài khoản</div>
                <div className="dz-sub">Xoá vĩnh viễn tài khoản và toàn bộ dữ liệu. Không thể khôi phục.</div>
              </div>
              <button className="btn-danger">Xoá tài khoản</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
