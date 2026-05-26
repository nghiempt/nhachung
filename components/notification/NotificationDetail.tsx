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
    <div className="detail">
      {/* Top bar */}
      <div className="detail-top">
        <button className="back">
          <ArrowLeft size={16} />
          Quay lại
        </button>
        <div className="top-actions">
          <button className="share-btn">
            <Share2 size={14} />
            Chia sẻ
          </button>
          <button className="more-btn">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Kicker */}
      <div className="kicker">
        {detail.eyebrow}
      </div>

      {/* Title row */}
      <div className="title-row">
        <h1 className="h1">
          {detail.title}
        </h1>
        {detail.isUrgent && (
          <span className="urgent-badge">
            {detail.urgentLabel ?? "🚨 Khẩn cấp"}
          </span>
        )}
      </div>

      {/* Author */}
      <div className="author">
        <div className="avatar-org">🏢</div>
        <div>
          <div className="author-name">
            {detail.author.name}
            <span className="verified">✓</span>
          </div>
          <div className="author-meta">
            <span>{detail.author.role}</span>
            <span className="dot" />
            <span>{detail.author.time}</span>
            <span className="dot" />
            <span className="views">
              <Eye size={13} />
              {detail.author.viewCount.toLocaleString()} lượt xem
            </span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="prose">
        {detail.body.slice(0, 2).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {/* Time Card */}
      {detail.timeCard && (
        <div className="time-card">
          <Calendar className="ico" />
          <div>
            <div className="label">{detail.timeCard.heading}</div>
            {detail.timeCard.rows.map((r, i) => (
              <div key={i} className="row">{r}</div>
            ))}
          </div>
        </div>
      )}

      {/* Body rest */}
      <div className="prose">
        {detail.body.slice(2).map((p, i) => <p key={i}>{p}</p>)}
      </div>

      {/* Section heading */}
      {detail.checklist && (
        <>
          <div className="section-h">
            <span>Biện pháp đã triển khai</span>
            <span className="info-icon">i</span>
          </div>
          <ul className="check-list">
            {detail.checklist.map((item, i) => (
              <li key={i}>
                <span className="check">
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
        <div className="alert">
          <AlertTriangle className="ico" />
          <span>{detail.alertText}</span>
        </div>
      )}

      {/* Sign off */}
      {detail.signoff && (
        <div className="signoff">
          {detail.signoff.lines.map((line, i) => <p key={i}>{line}</p>)}
          <div style={{ marginTop: "8px" }}>
            <strong>{detail.signoff.signedBy}</strong><br />
            <span>{detail.signoff.title}</span>
          </div>
        </div>
      )}

      {/* Attachments */}
      {detail.attachments && detail.attachments.length > 0 && (
        <>
          <div className="attach-title">Tài liệu đính kèm</div>
          <div className="attach-grid">
            {detail.attachments.map((att) => (
              <div key={att.id} className="attach">
                <div className={`filetype ${att.type}`}>
                  {att.type}
                </div>
                <div className="info">
                  <div className="name">{att.name}</div>
                  <div className="size">{att.sizeLabel}</div>
                </div>
                <button className="download">
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
