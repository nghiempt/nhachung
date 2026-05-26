"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlignJustify } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  iconUrl: string;
  badge?: string;
  badgeStyle?: React.CSSProperties;
}

interface NavSection {
  label?: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    items: [
      {
        href: "/dashboard",
        label: "Dashboard",
        iconUrl: "https://www.figma.com/api/mcp/asset/948dfd1b-cf10-487e-a625-2f3992055751",
      },
      {
        href: "/thong-bao",
        label: "Thông báo",
        iconUrl: "https://www.figma.com/api/mcp/asset/48c83959-0e4a-4796-92aa-855c591bea09",
        badge: "298",
        badgeStyle: { background: "#f9c268", color: "#272727" },
      },
      {
        href: "/kho-tai-lieu",
        label: "Kho tài liệu",
        iconUrl: "https://www.figma.com/api/mcp/asset/4d81f87e-d02e-4f11-bbeb-1cbb8bd237cd",
      },
      {
        href: "/gop-y",
        label: "Góp ý / Phản ánh",
        iconUrl: "https://www.figma.com/api/mcp/asset/e7a24a0c-9154-4fe5-b775-e28b59efd97b",
      },
      {
        href: "/tin-tuc",
        label: "Tin tức cộng đồng",
        iconUrl: "https://www.figma.com/api/mcp/asset/88032ed9-c023-453f-ace1-48bac91b8033",
      },
      {
        href: "/ai-assistant",
        label: "AI Assistant",
        iconUrl: "https://www.figma.com/api/mcp/asset/78e1328a-b252-4727-85bd-ef574d18925e",
      },
    ],
  },
  {
    label: "báo cáo minh bạch",
    items: [
      {
        href: "/tai-chinh",
        label: "Tổng quan tài chính",
        iconUrl: "https://www.figma.com/api/mcp/asset/704a494d-6aa9-4050-93d6-8be752cc3e38",
      },
      {
        href: "/thu-chi",
        label: "Báo cáo thu chi",
        iconUrl: "https://www.figma.com/api/mcp/asset/89c6053d-33c3-448d-b8d6-5eaef37341ac",
      },
      {
        href: "/quy-bao-tri",
        label: "Quỹ bảo trì",
        iconUrl: "https://www.figma.com/api/mcp/asset/73832a3c-38ad-496e-b944-0ebb15cb0d62",
      },
      {
        href: "/van-hanh",
        label: "Vận hành & bảo trì",
        iconUrl: "https://www.figma.com/api/mcp/asset/82bc45d6-8665-4c78-bac3-f9fbb084e888",
      },
      {
        href: "/kpi",
        label: "KPI Ban quản trị",
        iconUrl: "https://www.figma.com/api/mcp/asset/4a802188-fa92-4a4d-97e3-f3cf05f15319",
      },
      {
        href: "/bao-cao",
        label: "Báo cáo định kỳ",
        iconUrl: "https://www.figma.com/api/mcp/asset/6df232ea-f0e0-4733-9c5b-bd32987e6750",
      },
      {
        href: "/lich-su",
        label: "Lịch sử & lưu trữ",
        iconUrl: "https://www.figma.com/api/mcp/asset/e68588e5-a681-4c29-aeea-03abf1166456",
      },
    ],
  },
  {
    label: "cá nhân",
    items: [
      {
        href: "/ho-so",
        label: "Hồ sơ cá nhân",
        iconUrl: "https://www.figma.com/api/mcp/asset/33744d68-a412-4dd3-aed3-a586e2256f38",
      },
      {
        href: "/gia-dinh",
        label: "Thành viên gia đình",
        iconUrl: "https://www.figma.com/api/mcp/asset/29317f27-aa9f-46d1-b44e-723d4ca142d1",
      },
      {
        href: "/can-ho",
        label: "Căn hộ của tôi",
        iconUrl: "https://www.figma.com/api/mcp/asset/5239243c-3028-423d-a5d8-7983f3bcf2c1",
      },
      {
        href: "/cai-dat",
        label: "Cài đặt",
        iconUrl: "https://www.figma.com/api/mcp/asset/1effc1b6-c32f-4ad4-8e08-df8f1d1ec6bf",
      },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: "268px",
        flexShrink: 0,
        background: "#ffffff",
        borderRight: "1px solid #eff2fc",
        boxShadow: "2px 0 10px rgba(89,89,89,0.05)",
        display: "flex",
        flexDirection: "column",
        padding: "16px 0 24px",
        height: "100vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
      className="nc-scroll"
    >
      {/* Logo */}
      <div style={{ padding: "0 16px 30px", display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
        <svg width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 12.6995V36.7148C0 36.8859 0.0894999 37.043 0.235683 37.13L3.58397 39.1241C3.73215 39.2122 3.91711 39.2142 4.06727 39.1281L7.61545 37.086C7.76461 37 7.8571 36.8399 7.8571 36.6668V16.7058C7.8571 16.5337 7.76561 16.3736 7.61744 16.2875L0.719977 12.2813C0.399766 12.0952 0 12.3273 0 12.6995Z" fill="#4137F9"/>
          <path d="M19.4784 8.91446L27.7512 13.7201C27.8993 13.8062 27.9908 13.9662 27.9908 14.1383V30.0301C27.9908 30.2973 28.2056 30.5134 28.4711 30.5134H35.3676C35.6331 30.5134 35.8479 30.2973 35.8479 30.0301V9.57482C35.8479 9.40273 35.7564 9.24264 35.6082 9.15659L19.9587 0.0655729C19.6385 -0.12053 19.2387 0.111598 19.2387 0.483804V8.49523C19.2387 8.66732 19.3302 8.82741 19.4784 8.91346V8.91446Z" fill="#A7A3F7"/>
          <path d="M15.8893 0.0655729L1.13768 8.6353C0.817474 8.82141 0.817474 9.28566 1.13768 9.47177L8.03315 13.478C8.18133 13.564 8.3643 13.564 8.51347 13.478L16.3696 8.91446C16.5177 8.82841 16.6092 8.66832 16.6092 8.49623V0.483804C16.6092 0.111598 16.2095 -0.12053 15.8893 0.0655729Z" fill="#4137F9"/>
          <path d="M31.9184 40.0005C34.0878 40.0005 35.8464 38.231 35.8464 36.0483C35.8464 33.8656 34.0878 32.0961 31.9184 32.0961C29.749 32.0961 27.9903 33.8656 27.9903 36.0483C27.9903 38.231 29.749 40.0005 31.9184 40.0005Z" fill="#4137F9"/>
          <path d="M17.72 14.6407C15.3164 14.6407 13.3613 16.6068 13.3613 19.0261C13.3613 21.4455 15.206 23.3185 17.6096 23.4016C17.6832 23.3926 17.7568 23.3926 17.8115 23.4016H17.8761C20.225 23.3185 22.0687 21.3985 22.0786 19.0261C22.0786 16.6078 20.1245 14.6407 17.72 14.6407Z" fill="#4137F9"/>
          <path d="M22.3805 25.8569C19.8208 24.1399 15.6461 24.1399 13.0675 25.8569C11.902 26.6413 11.2596 27.7029 11.2596 28.8385C11.2596 29.9742 11.902 31.0267 13.0576 31.8022C14.3424 32.6697 16.03 33.1039 17.7185 33.1039C19.4071 33.1039 21.0947 32.6697 22.3795 31.8022C23.536 31.0177 24.1774 29.9652 24.1774 28.8205C24.1685 27.6849 23.535 26.6323 22.3795 25.8569H22.3805Z" fill="#4137F9"/>
        </svg>
        <svg width="114" height="23" viewBox="0 0 114 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3.08376 0.41618L10.7434 11.7261V0.41618H13.6282V17.0307H10.7932L3.08376 5.72081V17.0307H0V0.666398C0 0.605345 0.079581 0.513264 0 0.41618H3.08376Z" fill="#161A48"/>
          <path d="M111.115 15.3252C108.772 17.8894 104.134 17.0627 102.672 13.962C100.157 8.62835 105.228 2.80527 110.467 6.21925L111.215 6.91786V5.51664H114V17.4771C114 17.8704 113.652 19.0575 113.476 19.4518C111.549 23.7666 103.993 23.5974 102.56 18.9293L105.285 18.0195C106.038 20.5267 110.022 20.6018 110.895 18.1557C110.939 18.0296 111.115 17.449 111.115 17.377V15.3252ZM107.811 7.84667C103.858 8.23001 104.125 14.8558 108.769 14.2152C112.193 13.7428 111.9 7.45033 107.811 7.84667Z" fill="#161A48"/>
          <path d="M51.2667 12.9877C53.4541 15.1626 57.8182 14.8553 59.1074 11.8347L62.1334 12.6174C60.8015 17.3075 54.6399 18.4615 50.7325 16.3777C45.4413 13.5552 45.127 5.19392 49.8481 1.67184C53.7197 -1.21668 59.8515 -0.34792 62.0648 4.16702L59.3213 5.60427C59.1332 5.62129 58.7184 4.81959 58.5453 4.61441C56.6622 2.37946 52.903 2.63969 51.0369 4.76854C49.1866 6.87839 49.2672 10.998 51.2676 12.9877H51.2667Z" fill="#161A48"/>
          <path d="M19.4978 0.0146542V6.72051C21.5023 4.48656 25.6743 4.68773 26.877 7.65332C26.9496 7.83348 27.257 8.75929 27.257 8.87238V17.0295H24.2727V10.2736C24.2727 8.49606 23.0322 7.76442 21.362 8.04566C20.5503 8.18278 19.4978 9.36081 19.4978 10.1735V17.0295H16.613V0.0146542H19.4978Z" fill="#161A48"/>
          <path d="M67.0478 0.0146542V6.72051L68.2475 5.77568C71.0059 4.25435 74.8069 5.89779 74.8069 9.27273V17.0295H71.9221V10.1735C71.9221 9.94732 71.6834 9.26473 71.562 9.03453C70.7473 7.48517 68.14 7.70837 67.395 9.22169C67.3422 9.32978 67.0478 10.2176 67.0478 10.2736V17.0295H64.163V0.0146542H67.0478Z" fill="#161A48"/>
          <path d="M39.5915 17.0319H36.8062C36.8171 16.6846 36.7853 16.3173 36.7047 15.981C36.6003 15.5456 36.4779 16.019 36.3645 16.1331C34.6366 17.8856 30.6217 17.8136 29.427 15.4986C28.0314 12.7962 30.1482 10.1259 32.9763 10.1259H36.5077C36.5286 9.26713 36.6152 8.58053 35.9029 7.982C35.0176 7.23836 33.0649 7.31042 32.3864 8.33131C32.1935 8.62156 32.1228 9.2411 31.8612 9.31216C31.5091 9.25311 29.3932 9.10098 29.3504 8.86878C29.7812 5.48382 33.5881 4.74818 36.3874 5.49383C38.3431 6.01529 39.2911 7.39349 39.4811 9.38723C39.7149 11.8494 39.2523 14.5637 39.5925 17.0319H39.5915ZM36.5077 12.0275H33.5732C33.426 12.0275 32.5854 12.4369 32.4262 12.575C31.3051 13.5499 32.2213 15.0842 33.5712 15.1773C35.6304 15.3184 36.7843 14.0923 36.5077 12.0275Z" fill="#161A48"/>
          <path d="M100.471 17.0268H97.4871V9.77049C97.4871 9.5613 97.0941 8.80665 96.934 8.62549C96.1203 7.70969 94.1466 7.80777 93.3558 8.71657C93.1807 8.91774 92.7122 9.96265 92.7122 10.1708V17.0268H89.8274V5.51677H92.6127V6.81691L93.7766 5.83705C96.3878 4.20063 100.471 5.86308 100.471 9.16996V17.0268Z" fill="#161A48"/>
          <path d="M84.556 5.5178H87.4408V17.0278H84.6555V15.7267C82.7605 18.1318 78.4541 17.8526 77.2167 14.954C77.0784 14.6308 76.7969 13.6889 76.7969 13.3747V5.5178H79.6319L79.7812 5.66793V12.9743C79.7812 13.0414 80.0647 13.6139 80.1353 13.719C81.0843 15.1122 83.3892 14.8139 84.179 13.3957C84.2417 13.2836 84.556 12.4278 84.556 12.3738V5.5178Z" fill="#161A48"/>
          <path d="M31.3356 0.617431H34.4691L35.997 3.7882L35.8618 4.0204H33.4743L31.3903 1.11386L31.3356 0.617431Z" fill="#161A48"/>
        </svg>
      </div>

      {/* Nav */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: "0 16px", flex: 1 }}>
        {navSections.map((section, si) => (
          <div key={si} style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            {section.label && (
              <div style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: "#959595",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                padding: "0 8px 6px",
                lineHeight: "16px",
              }}>
                {section.label}
              </div>
            )}
            {section.items.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    borderRadius: "8px",
                    color: isActive ? "#4137f9" : "#272727",
                    fontSize: "14px",
                    fontWeight: isActive ? 600 : 400,
                    lineHeight: "22px",
                    background: isActive ? "#f1f7ff" : "transparent",
                    transition: "background 0.15s",
                    textDecoration: "none",
                    width: "236px",
                  }}
                  className={!isActive ? "hover:bg-[#fafafa]" : ""}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.iconUrl}
                    alt=""
                    width={20}
                    height={20}
                    style={{
                      width: 20,
                      height: 20,
                      flexShrink: 0,
                      filter: isActive
                        ? "brightness(0) saturate(100%) invert(22%) sepia(97%) saturate(2000%) hue-rotate(237deg) brightness(107%) contrast(104%)"
                        : "brightness(0) opacity(0.45)",
                    }}
                  />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      padding: "4px 6px",
                      borderRadius: "10px",
                      lineHeight: 1,
                      marginLeft: "auto",
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                      ...item.badgeStyle,
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: "auto",
        padding: "16px 16px 0",
        borderTop: "1px solid #dedede",
        flexShrink: 0,
      }}>
        <div style={{ fontSize: "12px", color: "#585c7b", lineHeight: "18px", marginBottom: "8px" }}>
          Nhà Chung Platform<br />Phiên bản 1.0.0
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px", borderRadius: "8px", cursor: "pointer", color: "#585c7b" }}>
          <AlignJustify size={20} />
        </div>
      </div>
    </aside>
  );
}
