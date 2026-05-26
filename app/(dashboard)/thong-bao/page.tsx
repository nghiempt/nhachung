"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import { notificationTabs } from "@/data/notifications";
import { NotificationList } from "@/components/notification/NotificationList";
import { NotificationDetailPanel } from "@/components/notification/NotificationDetail";
import { RightRail } from "@/components/notification/RightRail";

type TabKey = "all" | "urgent" | "unread" | "read";

export default function ThongBaoPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [selectedId, setSelectedId] = useState<string | null>("n-001");

  return (
    <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "minmax(0,1fr) 320px", gap: "20px", alignItems: "start" }}>

      {/* Left Column */}
      <div style={{ minWidth: 0 }}>

        {/* Page Head */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "20px" }}>
          <div>
            <h1 style={{ fontFamily: "Inter, sans-serif", fontSize: "28px", fontWeight: 700, color: "#272727", lineHeight: "36px" }}>
              Thông báo
            </h1>
            <div style={{ color: "#3e4265", marginTop: "4px", fontSize: "16px", lineHeight: "24px" }}>
              Cập nhật những thông tin mới nhất từ Ban quản trị
            </div>
          </div>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 12px",
            background: "#fff",
            border: "1px solid #d4d7e5",
            borderRadius: "12px",
            color: "#272727",
            fontSize: "13px", fontWeight: 500,
            whiteSpace: "nowrap", flexShrink: 0,
            cursor: "pointer",
          }}>
            <Check size={16} color="#52c41a" />
            Đánh dấu đã đọc tất cả
            <ChevronDown size={14} color="#585c7b" />
          </button>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", gap: "32px",
          borderBottom: "1px solid #eff2fc",
          marginBottom: "20px",
        }}>
          {notificationTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const isUrgent = tab.key === "urgent";
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "12px 0",
                  position: "relative",
                  fontSize: "15px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#4137f9" : "#585c7b",
                  cursor: "pointer",
                  background: "transparent",
                  border: 0,
                  borderBottom: isActive ? "2px solid #4137f9" : "2px solid transparent",
                  marginBottom: "-1px",
                  transition: "color 0.15s",
                }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span style={{
                    minWidth: 22, height: 22, padding: "0 7px",
                    borderRadius: "999px",
                    background: isActive ? "#f1f7ff" : isUrgent ? "#ffe5e7" : "#fafafa",
                    color: isActive ? "#4137f9" : isUrgent ? "#f5222d" : "#585c7b",
                    fontSize: "12px", fontWeight: 700,
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Work Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "20px" }}>
          <NotificationList
            selectedId={selectedId}
            onSelect={setSelectedId}
            activeTab={activeTab}
          />
          <NotificationDetailPanel notificationId={selectedId} />
        </div>

      </div>

      {/* Right Rail */}
      <RightRail />
    </div>
  );
}
