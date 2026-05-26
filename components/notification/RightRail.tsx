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
    <div className="rail">

      {/* Filter Panel */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">
            <SlidersHorizontal size={16} />
            Lọc &amp; phân loại
          </span>
          <a href="#" className="link">
            Đặt lại
          </a>
        </div>

        <div className="field">
          <div className="field-label">Tòa nhà</div>
          <div className="select">
            <span>{building}</span>
            <ChevronDown size={16} className="chev" />
          </div>
        </div>

        <div className="field">
          <div className="field-label">Loại thông báo</div>
          <div className="select">
            <span>{category}</span>
            <ChevronDown size={16} className="chev" />
          </div>
        </div>

        <div className="field">
          <div className="field-label">Khoảng thời gian</div>
          <div className="select">
            <span>30 ngày gần nhất</span>
            <ChevronDown size={16} className="chev" />
          </div>
        </div>

        <button className="btn-apply">
          Áp dụng
        </button>
        <button className="btn-reset">
          Đặt lại
        </button>
      </div>

      {/* Featured Panel */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">
            <Star size={16} />
            Nổi bật
          </span>
          <a href="/thong-bao" className="link">
            Xem thêm <ChevronRight size={14} />
          </a>
        </div>
        <div className="featured-list">
          {featuredNotifications.map((f) => (
            <div
              key={f.id}
              className={`featured ${f.isUrgent ? "urgent" : ""}`}
            >
              <NotificationThumb color={f.iconColor} iconType={f.iconType} size={38} />
              <div className="body">
                <div className="kicker-sm">{f.kicker}</div>
                <div className="ftitle">{f.title}</div>
                <div className="fmeta">{f.meta}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Panel */}
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">
            <LayoutGrid size={16} />
            Theo danh mục
          </span>
        </div>
        <div className="cat-list">
          {categoryBreakdown.map((cat) => (
            <div
              key={cat.label}
              className="cat"
            >
              <span>{cat.label}</span>
              <span className="cat-count">{cat.count}</span>
            </div>
          ))}
        </div>
        <a href="#" className="cat-link">
          <ChevronRight size={14} />
          Xem tất cả danh mục
        </a>
      </div>

    </div>
  );
}
