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
        <svg width={s} height={s} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.1906 13.3324C17.1258 13.2543 17.0621 13.1762 16.9996 13.1008C16.1402 12.0613 15.6203 11.434 15.6203 8.49141C15.6203 6.96797 15.2559 5.71797 14.5375 4.78047C14.0078 4.08789 13.2918 3.5625 12.348 3.17422C12.3359 3.16746 12.3251 3.1586 12.316 3.14805C11.9766 2.01133 11.0477 1.25 10 1.25C8.95234 1.25 8.02383 2.01133 7.68437 3.14687C7.67533 3.15706 7.66463 3.16564 7.65273 3.17227C5.45039 4.07891 4.38008 5.81836 4.38008 8.49023C4.38008 11.434 3.86094 12.0613 3.00078 13.0996C2.93828 13.175 2.87461 13.2516 2.80977 13.3312C2.64227 13.5333 2.53614 13.779 2.50395 14.0394C2.47176 14.2999 2.51485 14.5641 2.62812 14.8008C2.86914 15.3086 3.38281 15.6238 3.96914 15.6238H16.0352C16.6187 15.6238 17.1289 15.309 17.3707 14.8035C17.4845 14.5668 17.528 14.3023 17.496 14.0416C17.4641 13.7809 17.3581 13.5348 17.1906 13.3324ZM10 18.75C10.5645 18.7495 11.1183 18.5963 11.6027 18.3066C12.0872 18.0168 12.4841 17.6014 12.7516 17.1043C12.7642 17.0805 12.7704 17.0538 12.7696 17.0269C12.7689 16.9999 12.7612 16.9736 12.7472 16.9506C12.7333 16.9275 12.7137 16.9084 12.6902 16.8952C12.6667 16.8819 12.6402 16.875 12.6133 16.875H7.3875C7.36052 16.8749 7.33397 16.8818 7.31044 16.895C7.28692 16.9082 7.26721 16.9273 7.25325 16.9504C7.23929 16.9735 7.23154 16.9998 7.23077 17.0268C7.22999 17.0537 7.23621 17.0804 7.24883 17.1043C7.51622 17.6013 7.91314 18.0167 8.3975 18.3065C8.88186 18.5962 9.4356 18.7495 10 18.75Z" fill={stroke} />
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
      className="thumb"
      style={{
        width: size,
        height: size,
        borderRadius: size <= 38 ? "10px" : "var(--r-lg)",
        background: bg,
      }}
    >
      <IconSvg type={iconType} stroke={stroke} size={size} />
    </div>
  );
}
