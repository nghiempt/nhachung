"use client";

import {
  ArrowLeft, Share2, MoreHorizontal,
  Calendar, Check, AlertTriangle, Download,
  Eye, CheckCircle2,
} from "lucide-react";
import type { NotificationDetail } from "@/types/notification";
import { selectedNotificationDetail, notificationDetailsMap } from "@/data/notifications";

interface NotificationDetailPanelProps {
  notificationId: string | null;
}

export function NotificationDetailPanel({ notificationId }: NotificationDetailPanelProps) {
  // Dynamically resolve detail from mock database
  const detail: NotificationDetail = notificationId
    ? (notificationDetailsMap[notificationId] || selectedNotificationDetail)
    : selectedNotificationDetail;

  if (!notificationId) {
    return (
      <div style={{
        background: "#fff",
        border: "1px solid #e2e5f1",
        borderRadius: "20px",
        padding: "24px 28px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        color: "#585c7b",
        fontSize: "14px",
        flexDirection: "column",
        gap: "8px",
      }}>
        <div style={{ fontSize: "32px" }}>📬</div>
        <div>Chọn một thông báo để xem chi tiết</div>
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      border: "1px solid #e2e5f1",
      borderRadius: "20px",
      padding: "24px 28px 28px",
      minWidth: 0,
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: "#3e4265", fontSize: "14px", background: "transparent", border: 0, cursor: "pointer" }}>
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 14px",
            borderRadius: "10px",
            border: "1px solid #d3c5fd",
            background: "#f7f5ff",
            color: "#4137f9",
            fontWeight: 600, fontSize: "14px",
            cursor: "pointer",
          }}>
            <Share2 size={14} />
            Chia sẻ
          </button>
          <button style={{
            width: 36, height: 36,
            borderRadius: "10px",
            border: "1px solid #d3c5fd",
            background: "#f7f5ff",
            color: "#4137f9",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
          }}>
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Kicker */}
      <div style={{
        display: "inline-flex", alignItems: "center",
        padding: "5px 12px",
        background: "#f1f7ff", color: "#4137f9",
        borderRadius: "999px",
        fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em",
        marginTop: "18px",
        textTransform: "uppercase",
      }}>
        {detail.eyebrow}
      </div>

      {/* Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "18px" }}>
        <h1 style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "24px", fontWeight: 700, lineHeight: "32px",
          color: "#272727",
          marginTop: "8px", letterSpacing: "-0.01em",
        }}>
          {detail.title}
        </h1>
        {detail.isUrgent && (
          <span style={{
            display: "inline-flex", alignItems: "center",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "#ffe5e7", color: "#f5222d",
            fontWeight: 600, fontSize: "13px",
            marginTop: "18px", flexShrink: 0,
          }}>
            {detail.urgentLabel ?? "🚨 Khẩn cấp"}
          </span>
        )}
      </div>

      {/* Author */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "14px" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "8px",
          background: "#f7f5ff",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          fontSize: "14px",
        }}>🏢</div>
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontWeight: 600, fontSize: "14px", color: "#272727" }}>
            {detail.author.name}
            <span style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "#4137f9", color: "#fff",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "9px", fontWeight: 700,
            }}>✓</span>
          </div>
          <div style={{ color: "#3e4265", fontSize: "12.5px", display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
            <span>{detail.author.role}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#585c7b", display: "inline-block" }} />
            <span>{detail.author.time}</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#585c7b", display: "inline-block" }} />
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <Eye size={13} />
              {detail.author.viewCount.toLocaleString()} lượt xem
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ color: "#3e4265", fontSize: "14px", lineHeight: 1.65, marginTop: "16px" }} className="nc-prose">
        {detail.body.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {/* Time Card */}
      {detail.timeCard && (
        <div style={{
          background: "#ede9ff",
          border: "1px solid #d3c5fd",
          borderRadius: "12px",
          padding: "14px 16px",
          display: "flex",
          gap: "12px",
          margin: "4px 0 18px",
        }}>
          <Calendar size={20} color="#4137f9" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontWeight: 600, color: "#272727", marginBottom: "4px", fontSize: "14px" }}>{detail.timeCard.heading}</div>
            {detail.timeCard.rows.map((r, i) => (
              <div key={i} style={{ color: "#3e4265", fontSize: "13px", lineHeight: 1.55 }}>{r}</div>
            ))}
          </div>
        </div>
      )}

      {/* Body rest */}
      <div style={{ color: "#3e4265", fontSize: "14px", lineHeight: 1.65 }} className="nc-prose">
        {detail.body.slice(2).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {/* Section heading */}
      {detail.checklist && (
        <>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontWeight: 600, color: "#272727", fontSize: "14px" }}>
            <span>Biện pháp đã triển khai</span>
            <span style={{
              width: 18, height: 18, borderRadius: "50%",
              border: "1.5px solid #585c7b", color: "#585c7b",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "11px", fontWeight: 700,
            }}>i</span>
          </div>
          <ul style={{ listStyle: "none", margin: "12px 0 18px", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
            {detail.checklist.map((item, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px", color: "#3e4265", fontSize: "14px" }}>
                <span style={{
                  width: 20, height: 20, borderRadius: "50%",
                  background: "#52c41a", color: "#fff",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Check size={12} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Alert box */}
      {detail.alertText && (
        <div style={{
          background: "#fff6e1",
          border: "1px solid #f5e3b3",
          borderRadius: "12px",
          padding: "14px 16px",
          display: "flex",
          gap: "10px",
          color: "#5e4a16",
          lineHeight: 1.55,
          fontSize: "13.5px",
        }}>
          <AlertTriangle size={20} color="#e89a2c" style={{ flexShrink: 0, marginTop: 2 }} />
          <span>{detail.alertText}</span>
        </div>
      )}

      {/* Sign off */}
      {detail.signoff && (
        <div style={{ margin: "18px 0 14px", color: "#3e4265", fontSize: "14px", lineHeight: 1.6 }}>
          {detail.signoff.lines.map((line, i) => <p key={i} style={{ marginBottom: "6px" }}>{line}</p>)}
          <div style={{ marginTop: "8px" }}>
            <strong style={{ color: "#272727", fontWeight: 600 }}>{detail.signoff.signedBy}</strong><br />
            <span style={{ color: "#3e4265" }}>{detail.signoff.title}</span>
          </div>
        </div>
      )}

      {/* Attachments */}
      {detail.attachments && detail.attachments.length > 0 && (
        <>
          <div style={{ fontWeight: 600, color: "#272727", margin: "18px 0 12px", fontSize: "14px" }}>Tài liệu đính kèm</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {detail.attachments.map((att) => (
              <div key={att.id} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "12px 14px",
                border: "1px solid #e2e5f1",
                borderRadius: "12px",
                background: "#fff",
                minWidth: 0,
                overflow: "hidden",
              }}>
                <div style={{
                  width: 38, height: 42, borderRadius: "7px",
                  background: att.type === "pdf" ? "#f5222d" : "#2f7bf6",
                  color: "#fff",
                  fontSize: "10px", fontWeight: 800,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  letterSpacing: "0.04em",
                  flexShrink: 0,
                  textTransform: "uppercase",
                }}>
                  {att.type}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "13.5px", color: "#272727", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{att.name}</div>
                  <div style={{ color: "#3e4265", fontSize: "11.5px", marginTop: "2px" }}>{att.sizeLabel}</div>
                </div>
                <button style={{
                  width: 36, height: 36, borderRadius: "8px",
                  background: "#fff", border: "1px solid #d4d7e5",
                  color: "#3e4265",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer",
                  flexShrink: 0,
                }}>
                  <Download size={14} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
