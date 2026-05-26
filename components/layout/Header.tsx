"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Bell,
  ChevronDown,
  Building2,
  Check,
  AlertTriangle,
  Info,
  CalendarDays,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { currentUser } from "@/data/user";
import { buildings, activeBuilding } from "@/data/buildings";

interface HeaderNotification {
  id: string;
  title: string;
  meta: string;
  isUnread: boolean;
  iconBg: string;
  iconColor: string;
  type: "warning" | "info" | "calendar";
}

const headerNotifications: HeaderNotification[] = [
  {
    id: "hn-1",
    title: "Bảo trì hệ thống PCCC định kỳ — Tầng B1 & B2",
    meta: "Ban quản trị · 10:30 sáng",
    isUnread: true,
    iconBg: "#fff3e0",
    iconColor: "#c8761b",
    type: "warning",
  },
  {
    id: "hn-2",
    title: "Điều chỉnh phí gửi xe ô tô từ tháng 6/2026",
    meta: "Ban quản trị · 09:15 sáng",
    isUnread: true,
    iconBg: "#e8f4fd",
    iconColor: "#1890ff",
    type: "info",
  },
  {
    id: "hn-3",
    title: "Sự kiện: Ngày hội cư dân 1/6/2026 — Đăng ký tham gia",
    meta: "Ban quản trị · Hôm qua",
    isUnread: false,
    iconBg: "#e6f9f1",
    iconColor: "#1c9d5f",
    type: "calendar",
  },
];

export function Header() {
  const [buildingOpen, setBuildingOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const closeAll = () => { setBuildingOpen(false); setNotifOpen(false); setUserOpen(false); };

  const getNotifIcon = (type: HeaderNotification["type"], color: string) => {
    switch (type) {
      case "warning": return <AlertTriangle size={14} color={color} />;
      case "info":    return <Info size={14} color={color} />;
      case "calendar":return <CalendarDays size={14} color={color} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      {(buildingOpen || notifOpen || userOpen) && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 100 }}
          onClick={closeAll}
        />
      )}

      <header style={{
        position: "relative",
        zIndex: 200,
        background: "#ffffff",
        borderBottom: "1px solid #eff2fc",
        padding: "10px 20px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        flexShrink: 0,
        height: "60px",
      }}>

        {/* Building Selector */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setBuildingOpen(!buildingOpen); setNotifOpen(false); setUserOpen(false); }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              border: "1px solid #d4d7e5",
              borderRadius: "8px",
              padding: "8px 12px",
              width: "236px",
              cursor: "pointer",
              background: "#fff",
            }}
          >
            <Building2 size={20} color="#4137f9" style={{ flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: "14px", fontWeight: 500, color: "#272727", textAlign: "left", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {activeBuilding.name}
            </span>
            <ChevronDown size={18} color="#585c7b" style={{ flexShrink: 0 }} />
          </button>

          {buildingOpen && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 6px)",
              left: 0,
              zIndex: 9999,
              background: "#fff",
              border: "1px solid #e2e5f1",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,0,0,.14)",
              minWidth: "272px",
              animation: "ddIn 0.14s ease",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderBottom: "1px solid #e2e5f1" }}>
                <Search size={15} color="#b4b7c9" />
                <input type="text" placeholder="Tìm kiếm tòa nhà..." style={{ flex: 1, border: 0, outline: 0, fontSize: "13px", background: "transparent", color: "#222" }} />
              </div>
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#b4b7c9", textTransform: "uppercase", letterSpacing: ".5px", padding: "10px 14px 3px" }}>Của tôi</div>
              {buildings.filter(b => b.isOwned).map(b => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 14px", cursor: "pointer", background: b.isActive ? "#f1f7ff" : "transparent" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "8px", background: "#f7f5ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Building2 size={15} color="#4137f9" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#222" }}>{b.name}</div>
                    <div style={{ fontSize: "11px", color: "#585c7b", marginTop: "1px" }}>{b.apartment} · {b.location}</div>
                  </div>
                  {b.isActive && <Check size={14} color="#4137f9" />}
                </div>
              ))}
              <div style={{ height: 1, background: "#e2e5f1", margin: "4px 0" }} />
              <div style={{ fontSize: "11px", fontWeight: 700, color: "#b4b7c9", textTransform: "uppercase", letterSpacing: ".5px", padding: "10px 14px 3px" }}>Khám phá</div>
              {buildings.filter(b => !b.isOwned).map(b => (
                <div key={b.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "9px 14px", cursor: "pointer" }} className="hover:bg-[#fafafa]">
                  <div style={{ width: 30, height: 30, borderRadius: "8px", background: "#f7f7f7", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Building2 size={15} color="#585c7b" />
                  </div>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#222" }}>{b.name}</div>
                    <div style={{ fontSize: "11px", color: "#585c7b", marginTop: "1px" }}>{b.location}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "1px solid #d4d7e5",
          borderRadius: "10px",
          padding: "0 12px",
          height: "40px",
          background: "#fff",
        }}>
          <Search size={20} color="#b4b7c9" style={{ flexShrink: 0 }} />
          <input
            placeholder="Tìm kiếm thông báo, tài liệu, báo cáo..."
            style={{ flex: 1, border: 0, outline: 0, fontSize: "14px", color: "#222", background: "transparent" }}
          />
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginLeft: "auto" }}>

          {/* Notification Bell */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setNotifOpen(!notifOpen); setBuildingOpen(false); setUserOpen(false); }}
              style={{
                position: "relative",
                width: "36px", height: "36px",
                background: "#f7f7f7",
                border: 0,
                borderRadius: "10px",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Bell size={24} color="#272727" />
              <span style={{
                position: "absolute", top: "5px", right: "5px",
                width: "8px", height: "8px",
                background: "#4137f9",
                borderRadius: "50%",
                border: "1.5px solid #fff",
              }} />
            </button>

            {notifOpen && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                zIndex: 9999,
                background: "#fff",
                border: "1px solid #e2e5f1",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,.14)",
                width: "348px",
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px 9px", borderBottom: "1px solid #e2e5f1" }}>
                  <span style={{ fontSize: "14px", fontWeight: 700, color: "#222" }}>Thông báo</span>
                  <span style={{ fontSize: "12px", fontWeight: 600, color: "#4137f9", cursor: "pointer" }}>Đánh dấu đã đọc</span>
                </div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#b4b7c9", textTransform: "uppercase", letterSpacing: ".4px", padding: "9px 16px 3px" }}>Hôm nay</div>
                {headerNotifications.slice(0, 2).map(n => (
                  <div key={n.id} style={{
                    display: "flex", alignItems: "flex-start", gap: "10px", padding: "9px 16px",
                    cursor: "pointer", background: n.isUnread ? "#f1f7ff" : "transparent",
                    position: "relative",
                  }}>
                    {n.isUnread && <span style={{ position: "absolute", left: 5, top: "50%", transform: "translateY(-50%)", width: 5, height: 5, borderRadius: "50%", background: "#4137f9" }} />}
                    <div style={{ width: 30, height: 30, borderRadius: "8px", background: n.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {getNotifIcon(n.type, n.iconColor)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#222", lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const }}>{n.title}</div>
                      <div style={{ fontSize: "12px", color: "#b4b7c9", marginTop: 3 }}>{n.meta}</div>
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#b4b7c9", textTransform: "uppercase", letterSpacing: ".4px", padding: "9px 16px 3px" }}>Hôm qua</div>
                {headerNotifications.slice(2).map(n => (
                  <div key={n.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px", padding: "9px 16px", cursor: "pointer" }}>
                    <div style={{ width: 30, height: 30, borderRadius: "8px", background: n.iconBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {getNotifIcon(n.type, n.iconColor)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#222", lineHeight: 1.4 }}>{n.title}</div>
                      <div style={{ fontSize: "12px", color: "#b4b7c9", marginTop: 3 }}>{n.meta}</div>
                    </div>
                  </div>
                ))}
                <Link href="/thong-bao" style={{ display: "block", textAlign: "center", padding: "11px", fontSize: "12px", fontWeight: 600, color: "#4137f9", borderTop: "1px solid #e2e5f1" }}>
                  Xem tất cả thông báo →
                </Link>
              </div>
            )}
          </div>

          {/* User Pill */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => { setUserOpen(!userOpen); setBuildingOpen(false); setNotifOpen(false); }}
              style={{
                display: "flex", alignItems: "center", gap: "10px",
                height: "32px",
                borderRadius: "10px",
                cursor: "pointer",
                background: "transparent",
                border: 0,
                padding: 0,
              }}
            >
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>
                <span style={{ fontWeight: 600, fontSize: "14px", lineHeight: "16px", whiteSpace: "nowrap", color: "#272727" }}>{currentUser.name}</span>
                <span style={{ fontSize: "12px", color: "#585c7b", lineHeight: "14px", whiteSpace: "nowrap" }}>{currentUser.apartment}</span>
              </div>
              <ChevronDown size={10} color="#585c7b" style={{ flexShrink: 0 }} />
            </button>

            {userOpen && (
              <div style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                zIndex: 9999,
                background: "#fff",
                border: "1px solid #e2e5f1",
                borderRadius: "12px",
                boxShadow: "0 8px 32px rgba(0,0,0,.14)",
                minWidth: "216px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "13px 16px 16px" }}>
                  <img src={currentUser.avatarUrl} alt="" style={{ width: 34, height: 34, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#222" }}>{currentUser.name}</div>
                    <div style={{ fontSize: "11px", color: "#585c7b", marginTop: 1 }}>{currentUser.email}</div>
                  </div>
                </div>
                <div style={{ height: 1, background: "#e2e5f1" }} />
                {[
                  { href: "/ho-so",   label: "Hồ sơ cá nhân", icon: <User size={15} color="#585c7b" /> },
                  { href: "/cai-dat", label: "Cài đặt",        icon: <Settings size={15} color="#585c7b" /> },
                ].map(item => (
                  <Link key={item.href} href={item.href} style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 16px", fontSize: "13px", fontWeight: 500, color: "#222", textDecoration: "none" }} className="hover:bg-[#fafafa]">
                    {item.icon}{item.label}
                  </Link>
                ))}
                <div style={{ height: 1, background: "#e2e5f1" }} />
                <button style={{ display: "flex", alignItems: "center", gap: "9px", padding: "9px 16px", fontSize: "13px", fontWeight: 500, color: "#f5222d", width: "100%", background: "transparent", border: 0, cursor: "pointer", textAlign: "left" }}>
                  <LogOut size={15} color="#f5222d" />
                  Đăng xuất
                </button>
              </div>
            )}
          </div>

        </div>
      </header>

      <style jsx global>{`
        @keyframes ddIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </>
  );
}
