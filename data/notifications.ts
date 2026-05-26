import type {
  Notification,
  NotificationDetail,
  FeaturedNotification,
  CategoryCount,
  NotificationTab,
} from "@/types/notification";

// ── Tabs ──────────────────────────────────────────────────────
export const notificationTabs: NotificationTab[] = [
  { key: "all",    label: "Tất cả",          count: 24 },
  { key: "urgent", label: "Thông báo khẩn",  count: 3  },
  { key: "unread", label: "Chưa đọc",        count: 8  },
  { key: "read",   label: "Đã đọc"                      },
];

// ── Notification List Items ────────────────────────────────────
export const notifications: Notification[] = [
  {
    id: "n-001",
    category: "maintenance",
    status: "unread",
    eyebrow: "THÔNG BÁO",
    title: "Thông báo về việc bảo trì hệ thống PCCC định kỳ",
    meta: "10:30 AM",
    time: "2026-05-26T10:30:00+07:00",
    timeLabel: "10:30 AM",
    iconColor: "orange",
    iconType: "warning",
    hasStatusDot: true,
    statusDotColor: "blue",
    isUrgent: false,
  },
  {
    id: "n-002",
    category: "finance",
    status: "unread",
    eyebrow: "THÔNG BÁO",
    title: "Thông báo điều chỉnh phí giữ xe tháng 6/2024",
    meta: "09:15 AM",
    time: "2026-05-26T09:15:00+07:00",
    timeLabel: "09:15 AM",
    iconColor: "blue",
    iconType: "info",
    hasStatusDot: true,
    statusDotColor: "blue",
    isUrgent: false,
  },
  {
    id: "n-003",
    category: "announcement",
    status: "read",
    eyebrow: "THÔNG BÁO",
    title: "Lịch cắt điện khu vực Block A",
    meta: "Hôm qua",
    time: "2026-05-25T08:00:00+07:00",
    timeLabel: "Hôm qua",
    iconColor: "amber",
    iconType: "lightning",
    hasStatusDot: false,
    isUrgent: false,
  },
  {
    id: "n-004",
    category: "community",
    status: "read",
    eyebrow: "THÔNG BÁO",
    title: "Kết quả họp BQT tháng 5/2024",
    meta: "22/05/2024",
    time: "2024-05-22T10:00:00+07:00",
    timeLabel: "22/05/2024",
    iconColor: "violet",
    iconType: "document",
    hasStatusDot: false,
    isUrgent: false,
  },
  {
    id: "n-005",
    category: "event",
    status: "read",
    eyebrow: "SỰ KIỆN",
    title: "Ngày hội cư dân Sunshine Riverside 2024",
    meta: "18/05/2024",
    time: "2024-05-18T10:00:00+07:00",
    timeLabel: "18/05/2024",
    iconColor: "green",
    iconType: "calendar",
    hasStatusDot: false,
    isUrgent: false,
  },
];


// ── Selected Notification Detail ───────────────────────────────
export const notificationDetailsMap: Record<string, NotificationDetail> = {
  "n-001": {
    id: "n-001",
    category: "maintenance",
    status: "unread",
    eyebrow: "THÔNG BÁO",
    title: "Thông báo về việc bảo trì hệ thống PCCC định kỳ",
    isUrgent: false,
    author: {
      name: "Ban Quản Trị Landmark 1",
      role: "Quản trị tòa nhà",
      verified: true,
      time: "26/05/2026 lúc 10:30 sáng",
      viewCount: 1024,
    },
    body: [
      "Kính gửi quý cư dân Landmark 1,",
      "Ban quản trị phối hợp cùng Ban quản lý tòa nhà xin thông báo lịch bảo trì hệ thống phòng cháy chữa cháy (PCCC) định kỳ định kỳ hàng tháng. Việc bảo trì nhằm đảm bảo toàn bộ thiết bị cảnh báo, đầu phun và đầu dò khói hoạt động tối ưu.",
      "Trong thời gian bảo trì, chuông báo cháy và còi cảnh báo có thể sẽ kêu thử nghiệm ngắt quãng. Rất mong nhận được sự thông cảm của quý cư dân cho những bất tiện này.",
    ],
    timeCard: {
      heading: "Lịch bảo trì PCCC",
      rows: [
        "📅 Ngày thực hiện: 28/05/2026",
        "⏰ Thời gian: Từ 08:30 AM đến 16:30 PM (giờ hành chính)",
        "📍 Phạm vi: Toàn bộ khu vực sảnh và hành lang các tầng Landmark 1",
      ],
    },
    checklist: [
      "Kiểm tra tủ điều khiển báo cháy trung tâm",
      "Đo áp lực nước đầu ra tại các họng cứu hỏa hành lang",
      "Thử nghiệm đầu dò khói và chuông cảnh báo ngắt quãng",
      "Bảo dưỡng hệ thống máy bơm chữa cháy áp lực cao",
    ],
    alertText:
      "⚠️ Khuyến cáo cư dân: Hệ thống sẽ phát chuông báo thử nghiệm ngắt quãng trong quá trình kiểm tra. Cư dân không cần hoảng loạn di tản khi nghe tiếng chuông trong khung giờ này.",
    signoff: {
      lines: [
        "Chúng tôi chân thành cảm ơn sự hợp tác và hỗ trợ của quý cư dân.",
        "Mọi thắc mắc vui lòng liên hệ hotline kỹ thuật tòa nhà:",
      ],
      signedBy: "Ban Quản Trị Landmark 1",
      title: "Vinhomes Central Park",
    },
    attachments: [
      {
        id: "att-101",
        name: "Ke-hoach-va-quy-trinh-bao-tri-PCCC-2026.pdf",
        type: "pdf",
        sizeLabel: "1.4 MB",
      },
    ],
  },
  "n-002": {
    id: "n-002",
    category: "finance",
    status: "unread",
    eyebrow: "THÔNG BÁO",
    title: "Thông báo điều chỉnh phí giữ xe tháng 6/2024",
    isUrgent: false,
    author: {
      name: "Ban Quản Trị Landmark 1",
      role: "Quản trị tòa nhà",
      verified: true,
      time: "26/05/2026 lúc 09:15 sáng",
      viewCount: 2150,
    },
    body: [
      "Kính gửi quý cư dân và chủ căn hộ Landmark 1,",
      "Căn cứ theo quyết định thống nhất trong Hội nghị nhà chung thường niên năm 2026 và chi phí vận hành thực tế của hệ thống bãi đỗ xe thông minh, Ban quản trị xin thông báo về việc điều chỉnh mức phí trông giữ phương tiện áp dụng chính thức từ ngày 01/06/2026.",
      "Mức phí điều chỉnh được tính toán tối ưu dựa trên giá điện vận hành, chi phí nhân công trực ca và khấu hao thiết bị kiểm soát ra vào bãi đỗ xe tự động.",
    ],
    timeCard: {
      heading: "Biểu phí gửi xe điều chỉnh mới",
      rows: [
        "🚗 Xe ô tô con: 1.500.000 VNĐ / tháng (Tăng 100.000đ)",
        "🏍️ Xe máy, xe mô tô: 120.000 VNĐ / tháng (Giữ nguyên)",
        "🚲 Xe đạp, xe đạp điện: 50.000 VNĐ / tháng (Giữ nguyên)",
      ],
    },
    alertText:
      "🚨 Lưu ý quan trọng: Các cư dân đã thanh toán đóng phí giữ xe trước theo kỳ hạn 3 tháng hoặc 6 tháng sẽ không bị truy thu phần chênh lệch cho đến hết chu kỳ hạn đóng phí hiện tại.",
    signoff: {
      lines: [
        "Mọi thắc mắc hoặc cần đăng ký thông tin xe mới, xin quý cư dân vui lòng liên hệ quầy lễ tân tầng trệt.",
        "Trân trọng thông báo.",
      ],
      signedBy: "Ban Quản Trị Landmark 1",
      title: "Vinhomes Central Park",
    },
    attachments: [
      {
        id: "att-201",
        name: "Quyet-dinh-dieu-chinh-phi-dich-vu-xe.pdf",
        type: "pdf",
        sizeLabel: "890 KB",
      },
    ],
  },
  "n-003": {
    id: "n-003",
    category: "announcement",
    status: "read",
    eyebrow: "THÔNG BÁO",
    title: "Lịch cắt điện khu vực Block A",
    isUrgent: false,
    author: {
      name: "Ban Quản Trị Landmark 1",
      role: "Quản trị tòa nhà",
      verified: true,
      time: "25/05/2026 lúc 08:00 sáng",
      viewCount: 1450,
    },
    body: [
      "Kính gửi cư dân sinh sống tại Block A,",
      "Nhằm phục vụ công tác đấu nối trạm biến áp trung thế mới và nâng cấp công suất lưới điện tòa nhà hoạt động ổn định trong mùa nắng nóng, công ty điện lực thành phố phối hợp với Ban quản lý sẽ tạm ngắt cung cấp điện tại toàn bộ Block A.",
      "Hệ thống điện máy phát khẩn cấp sẽ chỉ duy trì chiếu sáng khẩn cấp hành lang hành lang và hoạt động di chuyển của thang máy. Toàn bộ thiết bị điện trong căn hộ sẽ tạm ngưng hoạt động.",
    ],
    timeCard: {
      heading: "Thời gian ngắt điện Block A",
      rows: [
        "📅 Ngày ngắt: Ngày 29/05/2026",
        "⏰ Thời gian: Từ 13:00 đến 16:00 (Dự kiến trong vòng 3 tiếng)",
        "📍 Phạm vi ảnh hưởng: Toàn bộ Block A từ tầng 1 đến tầng 25",
      ],
    },
    checklist: [
      "Tạm dừng hệ thống điều hòa hành lang và sảnh Block A",
      "Kích hoạt hệ thống máy phát điện dự phòng khẩn cấp",
      "Bố trí kỹ thuật viên túc trực tại phòng máy thang máy phòng ngừa sự cố kẹt thang",
    ],
    alertText:
      "⚡ Khuyến cáo quan trọng: Cư dân vui lòng rút phích cắm tất cả thiết bị điện tử nhạy cảm (PC, TV, Tủ lạnh) trước giờ ngắt điện 10 phút để tránh shock điện khi đóng mạch cấp điện trở lại.",
    signoff: {
      lines: [
        "Rất mong quý cư dân thông cảm và chủ động sắp xếp thời gian sinh hoạt gia đình phù hợp.",
        "Ban quản lý trân trọng kính báo.",
      ],
      signedBy: "Ban Quản Trị Landmark 1",
      title: "Vinhomes Central Park",
    },
    attachments: [
      {
        id: "att-301",
        name: "Ke-hoach-nang-cap-dau-noi-luoi-dien.pdf",
        type: "pdf",
        sizeLabel: "1.2 MB",
      },
    ],
  },
  "n-004": {
    id: "n-004",
    category: "community",
    status: "read",
    eyebrow: "THÔNG BÁO",
    title: "Kết quả họp BQT tháng 5/2024",
    isUrgent: false,
    author: {
      name: "Ban Quản Trị Landmark 1",
      role: "Quản trị tòa nhà",
      verified: true,
      time: "22/05/2026 lúc 10:00 sáng",
      viewCount: 940,
    },
    body: [
      "Kính gửi toàn thể quý cư dân Landmark 1,",
      "Vào ngày 20/05/2026, Ban quản trị đã tổ chức cuộc họp thường niên định kỳ tháng 5 dưới sự tham dự, giám sát của đại diện cư dân và đơn vị quản lý vận hành tòa nhà. Cuộc họp đã thống nhất biểu quyết thông qua nhiều nội dung quan trọng liên quan đến công tác vận hành.",
      "Ban quản trị xin tóm tắt các quyết định chính đã đạt được sự đồng thuận cao từ các thành viên tham dự cuộc họp.",
    ],
    checklist: [
      "Thông qua kế hoạch và ngân sách sửa chữa chống thấm bể bơi vô cực tầng 4",
      "Thống nhất chấm dứt hợp đồng cũ và ký mới với đơn vị vệ sinh cảnh quan chuyên nghiệp",
      "Thành lập tiểu ban hòa giải giải quyết tranh chấp tiếng ồn từ căn hộ tầng 18",
      "Lên phương án và kinh phí tổ chức Tết Thiếu nhi 1/6 cho các cháu cư dân nhí",
    ],
    signoff: {
      lines: [
        "Biên bản chi tiết cuộc họp đã được niêm yết công khai tại bảng tin sảnh căn hộ Landmark 1.",
        "Ban quản trị trân trọng cảm ơn ý kiến đóng góp của toàn thể quý cư dân.",
      ],
      signedBy: "Ban Quản Trị Landmark 1",
      title: "Vinhomes Central Park",
    },
    attachments: [
      {
        id: "att-401",
        name: "Bien-ban-hop-BQT-thang-5-2026.pdf",
        type: "pdf",
        sizeLabel: "2.1 MB",
      },
    ],
  },
  "n-005": {
    id: "n-005",
    category: "event",
    status: "read",
    eyebrow: "SỰ KIỆN",
    title: "Ngày hội cư dân Sunshine Riverside 2024",
    isUrgent: false,
    author: {
      name: "Ban Quản Trị Sunshine",
      role: "Ban tổ chức sự kiện",
      verified: true,
      time: "18/05/2026 lúc 10:00 sáng",
      viewCount: 3400,
    },
    body: [
      "Chào mừng ngày hội cư dân Sunshine Riverside 2026!",
      "Nhằm mục đích tăng cường tinh thần gắn kết láng giềng thân thiện, xây dựng nét đẹp văn hóa cộng đồng văn minh và mang lại sân chơi bổ ích cho con em cư dân nhân dịp Quốc tế Thiếu nhi 1/6, Ban quản trị xin trân trọng tổ chức Ngày hội cư dân Sunshine Riverside với quy mô hoành tráng.",
      "Chương trình được mở cửa tự do hoàn toàn miễn phí cho tất cả các gia đình cư dân. Nhiều gian hàng ẩm thực hấp dẫn và phần thưởng từ mini game đang chào đón quý gia đình.",
    ],
    timeCard: {
      heading: "Thông tin chi tiết Ngày hội cư dân",
      rows: [
        "📅 Thời gian diễn ra: Chủ Nhật ngày 31/05/2026 (Cả ngày)",
        "📍 Địa điểm: Khuôn viên công viên trung tâm và quanh bể bơi ngoài trời Block B",
        "🎁 Quà tặng đặc biệt: Set quà tặng Quốc tế thiếu nhi cho tất cả các cháu tham gia",
      ],
    },
    checklist: [
      "08:00 - Khai mạc ngày hội và kích hoạt chuỗi gian hàng ẩm thực dân gian",
      "14:00 - Khai mạc giải thể thao cư dân nhí (Kéo co, Nhảy bao bố, Đua xe đạp chòi chân)",
      "19:00 - Đêm gala âm nhạc, trình diễn xiếc ảo thuật và trao giải thưởng may mắn",
    ],
    signoff: {
      lines: [
        "Xin vui lòng quét mã QR trên bảng tin căn hộ hoặc đăng ký trực tiếp số lượng thành viên tham gia qua ứng dụng Nhà Chung trước ngày 29/05 để BTC chuẩn bị tốt nhất.",
        "Rất hân hạnh được chào đón gia đình quý cư dân!",
      ],
      signedBy: "Ban Tổ Chức Sự Kiện",
      title: "Sunshine Riverside",
    },
    attachments: [
      {
        id: "att-501",
        name: "Chuong-trinh-ngay-hoi-cu-dan-sunshine.pdf",
        type: "pdf",
        sizeLabel: "3.4 MB",
      },
      {
        id: "att-502",
        name: "So-do-bo-tri-va-gian-hang-am-thuc.pdf",
        type: "pdf",
        sizeLabel: "1.8 MB",
      },
    ],
  },
};

export const selectedNotificationDetail: NotificationDetail = notificationDetailsMap["n-001"];

// ── Right Rail: Featured ───────────────────────────────────────
export const featuredNotifications: FeaturedNotification[] = [
  {
    id: "f-001",
    isUrgent: true,
    kicker: "KHẨN · AN NINH",
    title: "Cảnh báo: Đối tượng lạ dùng thẻ từ giả tại cổng A",
    meta: "5 giờ trước · 1.8k xem",
    iconColor: "red",
    iconType: "shield",
  },
  {
    id: "f-002",
    isUrgent: false,
    kicker: "SỰ KIỆN",
    title: "Ngày hội cư dân 1/6/2026 — Đăng ký tham gia",
    meta: "2 giờ trước · 3.4k xem",
    iconColor: "green",
    iconType: "calendar",
  },
];

// ── Right Rail: Category Counts ────────────────────────────────
export const categoryBreakdown: CategoryCount[] = [
  { label: "An ninh & Khẩn cấp",  count: 3  },
  { label: "Bảo trì & Vận hành",  count: 7  },
  { label: "Tài chính & Phí",     count: 5  },
  { label: "Sự kiện cộng đồng",   count: 4  },
  { label: "Thông báo chung",     count: 5  },
];
