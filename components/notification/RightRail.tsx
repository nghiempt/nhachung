"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, SlidersHorizontal, Star, LayoutGrid } from "lucide-react";
import {
  featuredNotifications,
  categoryBreakdown,
} from "@/data/notifications";
import { NotificationThumb } from "./NotificationThumb";

export function RightRail() {
  const [building] = useState("Landmark 1");
  const [category] = useState("Tất cả");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

      {/* Filter Panel */}
      <div style={{
        background: "#fff",
        border: "1px solid #e2e5f1",
        borderRadius: "20px",
        padding: "16px 16px 18px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "14px" }}>
          <span style={{
            fontWeight: 700, fontSize: "15px", color: "#272727",
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
          }}>
            <SlidersHorizontal size={16} color="#272727" />
            Lọc &amp; phân loại
          </span>
          <a href="#" style={{ color: "#4137f9", fontSize: "13px", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap", flexShrink: 0 }}>
            Đặt lại
          </a>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ color: "#3e4265", fontSize: "13px", marginBottom: "6px" }}>Tòa nhà</div>
          <div style={{
            background: "#fff", border: "1px solid #d4d7e5",
            borderRadius: "8px", padding: "10px 12px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: "14px", color: "#272727", cursor: "pointer",
          }}>
            <span>{building}</span>
            <ChevronDown size={16} color="#585c7b" />
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ color: "#3e4265", fontSize: "13px", marginBottom: "6px" }}>Loại thông báo</div>
          <div style={{
            background: "#fff", border: "1px solid #d4d7e5",
            borderRadius: "8px", padding: "10px 12px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: "14px", color: "#272727", cursor: "pointer",
          }}>
            <span>{category}</span>
            <ChevronDown size={16} color="#585c7b" />
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div style={{ color: "#3e4265", fontSize: "13px", marginBottom: "6px" }}>Khoảng thời gian</div>
          <div style={{
            background: "#fff", border: "1px solid #d4d7e5",
            borderRadius: "8px", padding: "10px 12px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            fontSize: "14px", color: "#272727", cursor: "pointer",
          }}>
            <span>30 ngày gần nhất</span>
            <ChevronDown size={16} color="#585c7b" />
          </div>
        </div>

        <button style={{
          width: "100%", marginTop: "6px",
          background: "#4137f9", color: "#fff", border: 0,
          borderRadius: "10px",
          padding: "11px 14px", fontWeight: 500, fontSize: "14px", cursor: "pointer",
        }}>
          Áp dụng
        </button>
        <button style={{
          width: "100%", marginTop: "8px",
          background: "transparent", color: "#3e4265", border: 0,
          padding: "8px", fontSize: "13.5px", fontWeight: 500, cursor: "pointer",
        }}>
          Đặt lại
        </button>
      </div>

      {/* Featured Panel */}
      <div style={{
        background: "#fff",
        border: "1px solid #e2e5f1",
        borderRadius: "20px",
        padding: "16px 16px 18px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "14px" }}>
          <span style={{
            fontWeight: 700, fontSize: "15px", color: "#272727",
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
          }}>
            <Star size={16} color="#272727" />
            Nổi bật
          </span>
          <a href="/thong-bao" style={{ color: "#4137f9", fontSize: "13px", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: "4px", whiteSpace: "nowrap", flexShrink: 0 }}>
            Xem thêm <ChevronRight size={14} />
          </a>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {featuredNotifications.map((f) => (
            <div
              key={f.id}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px",
                border: `1px solid ${f.isUrgent ? "#ffd3d6" : "#e2e5f1"}`,
                borderRadius: "12px",
                background: f.isUrgent ? "#fff2f3" : "#fff",
                cursor: "pointer",
              }}
            >
              <NotificationThumb color={f.iconColor} iconType={f.iconType} size={38} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: "10.5px", fontWeight: 700,
                  color: f.isUrgent ? "#f5222d" : "#4137f9",
                  letterSpacing: "0.06em",
                  marginBottom: "2px",
                  textTransform: "uppercase",
                }}>{f.kicker}</div>
                <div style={{
                  fontSize: "13.5px", fontWeight: 700,
                  color: f.isUrgent ? "#b91d2a" : "#272727",
                  lineHeight: 1.35,
                }}>{f.title}</div>
                <div style={{ color: "#3e4265", fontSize: "11.5px", marginTop: "4px" }}>{f.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Panel */}
      <div style={{
        background: "#fff",
        border: "1px solid #e2e5f1",
        borderRadius: "20px",
        padding: "16px 16px 18px",
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", marginBottom: "14px" }}>
          <span style={{
            fontWeight: 700, fontSize: "15px", color: "#272727",
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontFamily: "Inter, sans-serif",
            whiteSpace: "nowrap",
          }}>
            <LayoutGrid size={16} color="#272727" />
            Theo danh mục
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {categoryBreakdown.map((cat, i) => (
            <div
              key={cat.label}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 0",
                color: "#272727", fontSize: "14px",
                borderTop: i === 0 ? "none" : "1px solid #e2e5f1",
                cursor: "pointer",
              }}
            >
              <span>{cat.label}</span>
              <span style={{
                minWidth: 22, height: 22, padding: "0 8px",
                borderRadius: "999px",
                background: "#fafafa",
                color: "#3e4265", fontSize: "12px", fontWeight: 600,
                display: "inline-flex", alignItems: "center", justifyContent: "center",
              }}>{cat.count}</span>
            </div>
          ))}
        </div>
        <a href="#" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          color: "#4137f9", fontSize: "14px", fontWeight: 500, marginTop: "12px",
        }}>
          <ChevronRight size={14} />
          Xem tất cả danh mục
        </a>
      </div>

    </div>
  );
}
