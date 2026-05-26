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
      <div className="search-row">
        <div className="search">
          <Search size={16} />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Tìm kiếm thông báo..."
          />
        </div>
        <button className="filter-icon-btn" aria-label="Bộ lọc">
          <SlidersHorizontal size={18} />
        </button>
      </div>

      {/* List */}
      <div className="list">
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
        <div className="pager">
          <span>Hiển thị {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length}</span>
          <div className="pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`page-btn ${p === page ? "active" : ""}`}
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
      className={`item ${isActive ? "active" : ""}`}
    >
      <NotificationThumb color={n.iconColor} iconType={n.iconType} />

      <div className="body">
        <div className="eyebrow">
          {n.eyebrow}
        </div>
        <div className="title">
          {n.title}
        </div>
        <div className="meta">
          {n.meta}
        </div>
      </div>

      {n.hasStatusDot && n.statusDotColor && (
        <span className={`status-dot ${n.statusDotColor}`} />
      )}
    </div>
  );
}
