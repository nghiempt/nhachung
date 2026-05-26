"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import type { Notification, NotificationStatus } from "@/types/notification";
import { notifications as allNotifications } from "@/data/notifications";
import { NotificationThumb } from "./NotificationThumb";

interface NotificationListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  activeTab: "all" | "urgent" | "unread" | "read";
}

const PAGE_SIZE = 7;

export function NotificationList({ selectedId, onSelect, activeTab }: NotificationListProps) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = allNotifications.filter((n) => {
    const matchesTab =
      activeTab === "all"    ? true :
      activeTab === "urgent" ? n.isUrgent :
      activeTab === "unread" ? n.status === "unread" :
      activeTab === "read"   ? n.status === "read" : true;
    const matchesSearch = search
      ? n.title.toLowerCase().includes(search.toLowerCase()) || n.eyebrow.toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      {/* Search Row */}
      <div style={{ display: "flex", gap: "10px" }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "8px",
          border: "1px solid #d4d7e5", borderRadius: "10px",
          padding: "0 12px", height: "40px",
          background: "#fff", flex: 1,
        }}>
          <Search size={16} color="#b4b7c9" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm kiếm thông báo..."
            style={{ flex: 1, border: 0, outline: 0, background: "transparent", fontSize: "14px", color: "#222" }}
          />
        </div>
        <button style={{
          width: 40, height: 40,
          borderRadius: "10px",
          background: "#fff",
          border: "1px solid #d4d7e5",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          color: "#3e4265",
          cursor: "pointer",
        }}>
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "14px" }}>
        {paged.length === 0 && (
          <div style={{ textAlign: "center", padding: "32px", color: "#585c7b", fontSize: "14px" }}>
            Không tìm thấy thông báo nào.
          </div>
        )}
        {paged.map((n) => (
          <NotificationCard
            key={n.id}
            notification={n}
            isActive={selectedId === n.id}
            onClick={() => onSelect(n.id)}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "16px", color: "#3e4265", fontSize: "12.5px" }}>
          <span>Hiển thị {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}</span>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                style={{
                  minWidth: 32, height: 32,
                  borderRadius: "8px",
                  background: p === page ? "#4137f9" : "#fff",
                  border: `1px solid ${p === page ? "#4137f9" : "#d4d7e5"}`,
                  color: p === page ? "#fff" : "#3e4265",
                  fontWeight: 500,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "13px",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Notification Card ──────────────────────────────────────────
interface NotificationCardProps {
  notification: Notification;
  isActive: boolean;
  onClick: () => void;
}

function NotificationCard({ notification: n, isActive, onClick }: NotificationCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        background: isActive ? "#f7f5ff" : "#fff",
        border: `1px solid ${isActive ? "#d3c5fd" : "#e2e5f1"}`,
        borderRadius: "20px",
        padding: "14px",
        display: "flex",
        gap: "14px",
        position: "relative",
        cursor: "pointer",
        boxShadow: isActive ? "0 2px 10px rgba(36,85,224,0.30)" : "none",
        transition: "transform .15s, box-shadow .15s, border-color .15s",
      }}
    >
      <NotificationThumb color={n.iconColor} iconType={n.iconType} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ color: "#4137f9", fontSize: "10.5px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px" }}>
          {n.eyebrow}
        </div>
        <div style={{ fontSize: "14px", fontWeight: 700, color: "#222222", lineHeight: "22px" }}>
          {n.title}
        </div>
        <div style={{ marginTop: "8px", color: "#3e4265", fontSize: "12px", lineHeight: "18px" }}>
          {n.meta}
        </div>
      </div>

      {n.hasStatusDot && n.statusDotColor && (
        <span style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: n.statusDotColor === "red" ? "#f5222d" : "#2f7bf6",
        }} />
      )}
    </div>
  );
}
