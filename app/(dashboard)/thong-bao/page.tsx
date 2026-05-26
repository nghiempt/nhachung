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
    <div className="page">

      {/* Left Column */}
      <div className="col-main">

        {/* Page Head */}
        <div className="page-head">
          <div>
            <h1 className="page-title">Thông báo</h1>
            <div className="page-sub">
              Cập nhật những thông tin mới nhất từ Ban quản trị
            </div>
          </div>
          <button className="mark-all">
            <Check size={16} />
            Đánh dấu đã đọc tất cả
            <ChevronDown size={14} />
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {notificationTabs.map((tab) => {
            const isActive = activeTab === tab.key;
            const isUrgent = tab.key === "urgent";
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`tab ${isActive ? "active" : ""} ${isUrgent ? "urgent" : ""}`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className="count">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Work Grid */}
        <div className="work">
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
