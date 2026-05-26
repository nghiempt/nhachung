import type { NotificationIconColor, NotificationIconType } from "@/types/notification";

// Color map: matches HTML CSS vars exactly
const colorMap: Record<NotificationIconColor, { bg: string; stroke: string }> = {
  orange: { bg: "#fff1de", stroke: "#c8761b" },
  blue:   { bg: "#e4f1ff", stroke: "#1890ff" },
  amber:  { bg: "#fff6e1", stroke: "#e89a2c" },
  violet: { bg: "#efeeff", stroke: "#6238dd" },
  green:  { bg: "#efffe7", stroke: "#1c9d5f" },
  mint:   { bg: "#e7fffc", stroke: "#0cbfa3" },
  red:    { bg: "#ffeded", stroke: "#f5222d" },
};

// Icon SVG paths — stroke-based, matching HTML header dropdown icon style
function IconSvg({ type, stroke, size }: { type: NotificationIconType; stroke: string; size: number }) {
  const s = size <= 38 ? 14 : 20;
  const vb = "0 0 24 24";

  switch (type) {
    case "warning":
      // Triangle alert (same as HTML header notif #1: dd-nt-ico warning)
      return (
        <svg width={s} height={s} viewBox={vb} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
    case "info":
      // Circle info (same as HTML header notif #2: circle + vertical line)
      return (
        <svg width={s} height={s} viewBox={vb} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
    case "lightning":
      // Lightning bolt / zap for power outage
      return (
        <svg width={s} height={s} viewBox={vb} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "document":
      // Clipboard / document for meeting results
      return (
        <svg width={s} height={s} viewBox={vb} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      );
    case "calendar":
      // Calendar (same as HTML header notif #3: rect + lines)
      return (
        <svg width={s} height={s} viewBox={vb} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case "shield":
      return (
        <svg width={s} height={s} viewBox={vb} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "bell":
    default:
      return (
        <svg width={s} height={s} viewBox={vb} fill="none" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
      );
  }
}

interface NotificationThumbProps {
  color: NotificationIconColor;
  iconType: NotificationIconType;
  size?: number;
}

export function NotificationThumb({ color, iconType, size = 44 }: NotificationThumbProps) {
  const { bg, stroke } = colorMap[color];

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size <= 38 ? "10px" : "12px",
        background: bg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <IconSvg type={iconType} stroke={stroke} size={size} />
    </div>
  );
}
