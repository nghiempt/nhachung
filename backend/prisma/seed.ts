/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Stable IDs so seeding is reproducible and the FE can hardcode reference ids if needed.
const ID = {
  building: {
    landmark1: 'b0000001-0000-0000-0000-000000000001',
    grandMarina: 'b0000001-0000-0000-0000-000000000002',
    masteri: 'b0000001-0000-0000-0000-000000000003',
  },
  block: { a: 'k0000001-0000-0000-0000-000000000001', b: 'k0000001-0000-0000-0000-000000000002' },
  apt: {
    a1205: 'a0000001-0000-0000-0000-000000000001',
    a1206: 'a0000001-0000-0000-0000-000000000002',
    a0801: 'a0000001-0000-0000-0000-000000000003',
    b1502: 'a0000001-0000-0000-0000-000000000004',
    a1701: 'a0000001-0000-0000-0000-000000000005',
  },
  user: {
    chris: 'u0000001-0000-0000-0000-000000000001',
    hoa: 'u0000001-0000-0000-0000-000000000002',
    minh: 'u0000001-0000-0000-0000-000000000003',
    binh: 'u0000001-0000-0000-0000-000000000004', // board member chair
    tien: 'u0000001-0000-0000-0000-000000000005', // board treasurer
    lan: 'u0000001-0000-0000-0000-000000000006', // resident-2
    dung: 'u0000001-0000-0000-0000-000000000007', // technician
    huong: 'u0000001-0000-0000-0000-000000000008', // board secretary
    son: 'u0000001-0000-0000-0000-000000000009', // board member
    mai: 'u0000001-0000-0000-0000-000000000010', // board member
  },
  fund: 'f0000001-0000-0000-0000-000000000001',
  kpi: {
    period: 'kp000001-0000-0000-0000-000000000001',
    catFinance: 'kc000001-0000-0000-0000-000000000001',
    catMaint: 'kc000001-0000-0000-0000-000000000002',
    catSat: 'kc000001-0000-0000-0000-000000000003',
    catLegal: 'kc000001-0000-0000-0000-000000000004',
    catOps: 'kc000001-0000-0000-0000-000000000005',
  },
} as const;

const BUILDING_ID = ID.building.landmark1;
const TODAY = new Date('2026-05-27T08:00:00Z');

function date(s: string) {
  return new Date(s);
}

async function clean() {
  // Order matters: respect FK constraints (children first).
  const tables = [
    'AIMessage',
    'AIConversation',
    'FeedbackWorkOrder',
    'FeedbackReply',
    'FeedbackAttachment',
    'Feedback',
    'NewsPostView',
    'NewsPost',
    'CommunityEvent',
    'Document',
    'DocumentFolder',
    'PeriodicReport',
    'BoardMemberKpi',
    'BoardMember',
    'KpiIndicator',
    'KpiCategory',
    'KpiPeriod',
    'MaintenanceSchedule',
    'TechnicalSystem',
    'WorkOrderUpdate',
    'WorkOrder',
    'FundPlan',
    'FundTransaction',
    'MaintenanceFund',
    'Payment',
    'FeeSchedule',
    'Transaction',
    'FinanceCategory',
    'UserNotification',
    'Notification',
    'Vehicle',
    'FamilyMemberDocument',
    'FamilyMember',
    'ApartmentResident',
    'Apartment',
    'Block',
    'InvitationCode',
    'AuditLog',
    'UserDevice',
    'UserSettings',
    'UserLinkedAccount',
    'UserIdentityDoc',
    'RefreshToken',
    'User',
    'Building',
  ];
  for (const t of tables) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${t}" RESTART IDENTITY CASCADE`);
  }
}

async function seedBuildings() {
  await prisma.building.createMany({
    data: [
      {
        id: ID.building.landmark1,
        name: 'Landmark 1',
        code: 'LM1',
        address: 'Vinhomes Central Park, 720A Điện Biên Phủ, Bình Thạnh, TP. HCM',
        projectName: 'Vinhomes Central Park',
        totalApartments: 720,
        totalFloors: 50,
        developerName: 'Vinhomes',
        managementCompany: 'PMC Property Management',
        hotline: '1900 1234',
        description: 'Tòa nhà cao cấp ven sông Sài Gòn',
      },
      {
        id: ID.building.grandMarina,
        name: 'The Grand Marina',
        code: 'TGM',
        address: '2 Tôn Đức Thắng, Bến Nghé, Quận 1, TP. HCM',
        totalApartments: 410,
        totalFloors: 42,
        developerName: 'Masterise Homes',
        managementCompany: 'PMC Property Management',
        hotline: '1900 5678',
      },
      {
        id: ID.building.masteri,
        name: 'Masteri Thảo Điền',
        code: 'MTD',
        address: '159 Xa lộ Hà Nội, Thảo Điền, TP. Thủ Đức, TP. HCM',
        totalApartments: 1200,
        totalFloors: 40,
        developerName: 'Thảo Điền Investment',
        managementCompany: 'Savills Vietnam',
        hotline: '1900 9999',
      },
    ],
  });

  await prisma.block.createMany({
    data: [
      { id: ID.block.a, buildingId: BUILDING_ID, name: 'A', totalUnits: 360, totalFloors: 50 },
      { id: ID.block.b, buildingId: BUILDING_ID, name: 'B', totalUnits: 360, totalFloors: 50 },
    ],
  });
}

async function seedUsers() {
  const hash = await bcrypt.hash('Password@123', 12);

  const users: Prisma.UserCreateManyInput[] = [
    {
      id: ID.user.chris,
      email: 'chris.tran@gmail.com',
      phone: '0912345678',
      passwordHash: hash,
      fullName: 'Trần Hoàng Chris',
      dob: date('1990-08-15'),
      gender: 'MALE',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Chris+Tran',
      role: 'PRIMARY_RESIDENT',
      emailVerifiedAt: null,
      phoneVerifiedAt: TODAY,
    },
    {
      id: ID.user.hoa,
      email: 'hoa.tran@gmail.com',
      phone: '0987654321',
      passwordHash: hash,
      fullName: 'Trần Thị Hoa',
      dob: date('1992-04-20'),
      gender: 'FEMALE',
      role: 'RESIDENT',
    },
    {
      id: ID.user.minh,
      email: 'minh.tran@gmail.com',
      passwordHash: hash,
      fullName: 'Trần Hoàng Minh',
      dob: date('2017-03-05'),
      gender: 'MALE',
      role: 'RESIDENT',
    },
    {
      id: ID.user.binh,
      email: 'binh.nguyen@bqt.nhachung.vn',
      phone: '0903112233',
      passwordHash: hash,
      fullName: 'Nguyễn Thanh Bình',
      dob: date('1975-06-12'),
      gender: 'MALE',
      role: 'BOARD_MEMBER',
    },
    {
      id: ID.user.tien,
      email: 'tien.le@bqt.nhachung.vn',
      phone: '0903445566',
      passwordHash: hash,
      fullName: 'Lê Văn Tiến',
      dob: date('1978-10-02'),
      gender: 'MALE',
      role: 'BOARD_MEMBER',
    },
    {
      id: ID.user.lan,
      email: 'lan.pham@gmail.com',
      phone: '0911223344',
      passwordHash: hash,
      fullName: 'Phạm Thị Lan',
      role: 'PRIMARY_RESIDENT',
    },
    {
      id: ID.user.dung,
      email: 'dung.tech@nhachung.vn',
      phone: '0944556677',
      passwordHash: hash,
      fullName: 'Trần Văn Dũng',
      role: 'RESIDENT',
    },
    {
      id: ID.user.huong,
      email: 'huong.tran@bqt.nhachung.vn',
      phone: '0905667788',
      passwordHash: hash,
      fullName: 'Trần Thu Hương',
      role: 'BOARD_MEMBER',
    },
    {
      id: ID.user.son,
      email: 'son.pham@bqt.nhachung.vn',
      passwordHash: hash,
      fullName: 'Phạm Hoàng Sơn',
      role: 'BOARD_MEMBER',
    },
    {
      id: ID.user.mai,
      email: 'mai.nguyen@bqt.nhachung.vn',
      passwordHash: hash,
      fullName: 'Nguyễn Thị Mai',
      role: 'BOARD_MEMBER',
    },
  ];

  await prisma.user.createMany({ data: users });

  // UserSettings for primary user
  await prisma.userSettings.create({
    data: {
      userId: ID.user.chris,
      notifPreferences: { email: true, push: true, sms: false, financeAlerts: true },
      language: 'vi',
      timezone: 'Asia/Ho_Chi_Minh',
    },
  });

  await prisma.userIdentityDoc.create({
    data: {
      userId: ID.user.chris,
      type: 'CCCD',
      number: '079190015820',
      verifiedAt: TODAY,
    },
  });

  await prisma.userDevice.createMany({
    data: [
      {
        userId: ID.user.chris,
        deviceName: 'MacBook Pro · Chrome',
        deviceType: 'desktop',
        lastIp: '14.169.0.1',
        lastLoginAt: TODAY,
        isCurrent: true,
      },
      {
        userId: ID.user.chris,
        deviceName: 'iPhone 15 · Safari',
        deviceType: 'mobile',
        lastIp: '14.169.0.2',
        lastLoginAt: new Date(TODAY.getTime() - 86400_000),
        isCurrent: false,
      },
    ],
  });
}

async function seedApartments() {
  await prisma.apartment.createMany({
    data: [
      {
        id: ID.apt.a1205,
        buildingId: BUILDING_ID,
        blockId: ID.block.a,
        code: 'A-12.05',
        floor: 12,
        area: new Prisma.Decimal('95.00'),
        bedrooms: 3,
        bathrooms: 2,
        balconies: 1,
        direction: 'Đông Nam',
        ownershipType: 'OWNED',
        contractDate: date('2021-06-15'),
        handoverDate: date('2021-08-01'),
        status: 'ACTIVE',
        qrCode: 'NC-LM1-A1205',
      },
      {
        id: ID.apt.a1206,
        buildingId: BUILDING_ID,
        blockId: ID.block.a,
        code: 'A-12.06',
        floor: 12,
        area: new Prisma.Decimal('72.50'),
        bedrooms: 2,
        bathrooms: 2,
        direction: 'Đông Bắc',
      },
      {
        id: ID.apt.a0801,
        buildingId: BUILDING_ID,
        blockId: ID.block.a,
        code: 'A-08.01',
        floor: 8,
        area: new Prisma.Decimal('110.00'),
        bedrooms: 3,
        bathrooms: 3,
        direction: 'Tây Nam',
        ownershipType: 'OWNED',
      },
      {
        id: ID.apt.b1502,
        buildingId: BUILDING_ID,
        blockId: ID.block.b,
        code: 'B-15.02',
        floor: 15,
        area: new Prisma.Decimal('85.00'),
        bedrooms: 3,
        bathrooms: 2,
        direction: 'Đông',
      },
      {
        id: ID.apt.a1701,
        buildingId: BUILDING_ID,
        blockId: ID.block.a,
        code: 'A-17.01',
        floor: 17,
        area: new Prisma.Decimal('120.00'),
        bedrooms: 4,
        bathrooms: 3,
        ownershipType: 'RENTED',
      },
    ],
  });

  await prisma.apartmentResident.createMany({
    data: [
      { apartmentId: ID.apt.a1205, userId: ID.user.chris, role: 'PRIMARY', startDate: date('2021-08-01') },
      { apartmentId: ID.apt.a1205, userId: ID.user.hoa, role: 'SECONDARY', startDate: date('2021-08-01') },
      { apartmentId: ID.apt.a1205, userId: ID.user.minh, role: 'SECONDARY', startDate: date('2021-08-01') },
      { apartmentId: ID.apt.b1502, userId: ID.user.lan, role: 'PRIMARY', startDate: date('2022-03-15') },
    ],
  });
}

async function seedFamily() {
  const chrisMember = await prisma.familyMember.create({
    data: {
      apartmentId: ID.apt.a1205,
      fullName: 'Trần Hoàng Chris',
      relation: 'SELF',
      cccd: '079190015820',
      dob: date('1990-08-15'),
      gender: 'MALE',
      occupation: 'Kỹ sư phần mềm',
      phone: '0912345678',
      email: 'chris.tran@gmail.com',
      isPrimary: true,
      verificationStatus: 'VERIFIED',
    },
  });

  const hoaMember = await prisma.familyMember.create({
    data: {
      apartmentId: ID.apt.a1205,
      fullName: 'Trần Thị Hoa',
      relation: 'SPOUSE',
      cccd: '079192015821',
      dob: date('1992-04-20'),
      gender: 'FEMALE',
      occupation: 'Giáo viên',
      phone: '0987654321',
      verificationStatus: 'VERIFIED',
    },
  });

  await prisma.familyMember.create({
    data: {
      apartmentId: ID.apt.a1205,
      fullName: 'Trần Hoàng Minh',
      relation: 'CHILD',
      dob: date('2017-03-05'),
      gender: 'MALE',
      occupation: 'Học sinh',
      verificationStatus: 'PENDING',
    },
  });

  await prisma.vehicle.createMany({
    data: [
      { memberId: chrisMember.id, type: 'CAR', plateNumber: '51G-123.45', brand: 'Toyota Camry 2022', color: 'Đen' },
      { memberId: hoaMember.id, type: 'MOTORCYCLE', plateNumber: '59K-999.00', brand: 'Honda Air Blade', color: 'Trắng' },
    ],
  });

  await prisma.familyMemberDocument.create({
    data: {
      memberId: chrisMember.id,
      type: 'CCCD',
      fileUrl: '/uploads/seed/chris-cccd.pdf',
      verifiedAt: TODAY,
    },
  });
}

async function seedNotifications() {
  const items = [
    {
      type: 'MANAGEMENT' as const,
      priority: 'NORMAL' as const,
      title: 'Thông báo về việc bảo trì hệ thống PCCC định kỳ',
      body: 'Ban quản trị tòa nhà thông báo lịch bảo trì hệ thống phòng cháy chữa cháy định kỳ Quý 2/2026...',
      source: 'Ban Quản Trị',
      publishedAt: new Date('2026-05-27T10:30:00Z'),
    },
    {
      type: 'URGENT' as const,
      priority: 'URGENT' as const,
      title: 'Cảnh báo: Đối tượng lạ dùng thẻ từ giả tại cổng A',
      body: 'Phát hiện đối tượng lạ sử dụng thẻ từ giả mạo tại cổng A vào lúc 03:15 sáng. Yêu cầu cư dân khóa cửa cẩn thận...',
      source: 'An ninh tòa nhà',
      publishedAt: new Date('2026-05-27T05:00:00Z'),
    },
    {
      type: 'FINANCE' as const,
      title: 'Phí quản lý tháng 5/2026 sắp đến hạn',
      body: 'Phí quản lý kỳ tháng 5/2026 với số tiền 3.800.000đ sẽ đến hạn ngày 31/05/2026.',
      source: 'Phòng Tài chính',
      publishedAt: new Date('2026-05-26T09:00:00Z'),
    },
    {
      type: 'EVENT' as const,
      title: 'Ngày hội cư dân Landmark 1 — 15/06/2026',
      body: 'Ban quản trị trân trọng kính mời cư dân tham gia Ngày hội cư dân thường niên...',
      source: 'Ban Quản Trị',
      publishedAt: new Date('2026-05-25T14:00:00Z'),
    },
    {
      type: 'SYSTEM' as const,
      title: 'Cập nhật phiên bản hệ thống Nhà Chung v1.2',
      body: 'Hệ thống đã được cập nhật với các tính năng mới: AI Assistant nâng cấp, báo cáo thu chi minh bạch hơn...',
      source: 'Hệ thống',
      publishedAt: new Date('2026-05-20T08:00:00Z'),
    },
  ];

  for (const item of items) {
    const n = await prisma.notification.create({
      data: { buildingId: BUILDING_ID, ...item },
    });
    await prisma.userNotification.create({
      data: {
        userId: ID.user.chris,
        notificationId: n.id,
        readAt: item.type === 'SYSTEM' || item.type === 'EVENT' ? new Date() : null,
      },
    });
  }
}

async function seedFinance() {
  const catManagement = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'INCOME', name: 'Phí quản lý', color: '#4137f9' },
  });
  const catService = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'INCOME', name: 'Phí dịch vụ', color: '#1c9d5f' },
  });
  const catParking = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'INCOME', name: 'Phí gửi xe', color: '#c8761b' },
  });
  const catOther = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'INCOME', name: 'Khác', color: '#585c7b' },
  });
  const catElectric = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'EXPENSE', name: 'Điện', color: '#f5222d' },
  });
  const catCleaning = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'EXPENSE', name: 'Vệ sinh', color: '#1870c4' },
  });
  const catSecurity = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'EXPENSE', name: 'An ninh', color: '#5a3ad9' },
  });
  const catMaintenance = await prisma.financeCategory.create({
    data: { buildingId: BUILDING_ID, type: 'EXPENSE', name: 'Bảo trì', color: '#c8761b' },
  });

  // Monthly transactions for last 6 months (Dec 2025 - May 2026)
  const months = [
    { year: 2025, month: 12, income: 2_650_000_000, expense: 1_980_000_000 },
    { year: 2026, month: 1, income: 2_710_000_000, expense: 2_040_000_000 },
    { year: 2026, month: 2, income: 2_690_000_000, expense: 2_010_000_000 },
    { year: 2026, month: 3, income: 2_780_000_000, expense: 2_110_000_000 },
    { year: 2026, month: 4, income: 2_830_000_000, expense: 2_150_000_000 },
    { year: 2026, month: 5, income: 2_845_600_000, expense: 2_140_000_000 },
  ];

  for (const m of months) {
    const dt = new Date(Date.UTC(m.year, m.month - 1, 15));
    // Income split
    await prisma.transaction.createMany({
      data: [
        { buildingId: BUILDING_ID, categoryId: catManagement.id, type: 'INCOME', description: `Phí quản lý ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.income * 0.45), transactionDate: dt },
        { buildingId: BUILDING_ID, categoryId: catService.id, type: 'INCOME', description: `Phí dịch vụ ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.income * 0.30), transactionDate: dt },
        { buildingId: BUILDING_ID, categoryId: catParking.id, type: 'INCOME', description: `Phí gửi xe ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.income * 0.15), transactionDate: dt },
        { buildingId: BUILDING_ID, categoryId: catOther.id, type: 'INCOME', description: `Khác ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.income * 0.10), transactionDate: dt },
        { buildingId: BUILDING_ID, categoryId: catElectric.id, type: 'EXPENSE', description: `Điện nước ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.expense * 0.35), transactionDate: dt },
        { buildingId: BUILDING_ID, categoryId: catCleaning.id, type: 'EXPENSE', description: `Vệ sinh ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.expense * 0.20), transactionDate: dt },
        { buildingId: BUILDING_ID, categoryId: catSecurity.id, type: 'EXPENSE', description: `An ninh ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.expense * 0.20), transactionDate: dt },
        { buildingId: BUILDING_ID, categoryId: catMaintenance.id, type: 'EXPENSE', description: `Bảo trì ${m.month}/${m.year}`, amount: new Prisma.Decimal(m.expense * 0.25), transactionDate: dt },
      ],
    });
  }

  // Fee schedules for apartment A-12.05
  await prisma.feeSchedule.createMany({
    data: [
      { apartmentId: ID.apt.a1205, name: 'Phí quản lý', cycle: 'MONTHLY', amount: new Prisma.Decimal(3_800_000), dueDate: date('2026-05-31'), periodLabel: 'Tháng 5/2026', status: 'PAID' },
      { apartmentId: ID.apt.a1205, name: 'Phí dịch vụ', cycle: 'MONTHLY', amount: new Prisma.Decimal(1_200_000), dueDate: date('2026-05-31'), periodLabel: 'Tháng 5/2026', status: 'PAID' },
      { apartmentId: ID.apt.a1205, name: 'Tiền nước', cycle: 'MONTHLY', amount: new Prisma.Decimal(320_000), dueDate: date('2026-05-31'), periodLabel: 'Tháng 5/2026', status: 'PENDING' },
      { apartmentId: ID.apt.a1205, name: 'Phí gửi xe ô tô', cycle: 'MONTHLY', amount: new Prisma.Decimal(1_500_000), dueDate: date('2026-05-31'), periodLabel: 'Tháng 5/2026', status: 'PAID' },
      { apartmentId: ID.apt.a1205, name: 'Phí gửi xe máy', cycle: 'MONTHLY', amount: new Prisma.Decimal(120_000), dueDate: date('2026-05-31'), periodLabel: 'Tháng 5/2026', status: 'PAID' },
    ],
  });
}

async function seedMaintenanceFund() {
  await prisma.maintenanceFund.create({
    data: {
      id: ID.fund,
      buildingId: BUILDING_ID,
      currentBalance: new Prisma.Decimal(8_265_000_000),
      bank: 'Vietcombank — CN Sài Gòn',
      accountNumber: '0071000123456',
      interestRate: new Prisma.Decimal('5.50'),
      foundedDate: date('2021-08-01'),
      legalBasis: 'Luật Nhà ở 2014, Điều 108',
    },
  });

  // Fund transactions: completed
  await prisma.fundTransaction.createMany({
    data: [
      { fundId: ID.fund, type: 'EXPENSE', category: 'Thang máy', vendor: 'Schindler VN', description: 'Bảo trì 4 thang máy Block A', amount: new Prisma.Decimal(85_000_000), status: 'DONE', transactionDate: date('2026-04-12') },
      { fundId: ID.fund, type: 'EXPENSE', category: 'PCCC', vendor: 'PCCC Bình Minh', description: 'Kiểm định hệ thống PCCC định kỳ', amount: new Prisma.Decimal(62_000_000), status: 'DONE', transactionDate: date('2026-03-22') },
      { fundId: ID.fund, type: 'EXPENSE', category: 'Sơn ngoại thất', vendor: 'Sơn Jotun VN', description: 'Sơn lại mặt ngoài tầng 1-5', amount: new Prisma.Decimal(285_000_000), status: 'APPROVED', transactionDate: date('2026-06-15') },
      { fundId: ID.fund, type: 'EXPENSE', category: 'Máy phát điện', vendor: 'Cummins VN', description: 'Đại tu máy phát điện dự phòng', amount: new Prisma.Decimal(125_000_000), status: 'PENDING', transactionDate: date('2026-07-10') },
      { fundId: ID.fund, type: 'INCOME', category: 'Đóng góp quỹ', description: 'Đóng góp 2% giá trị căn hộ Q2/2026', amount: new Prisma.Decimal(420_000_000), status: 'DONE', transactionDate: date('2026-04-30') },
    ],
  });

  // Fund plans timeline
  await prisma.fundPlan.createMany({
    data: [
      { fundId: ID.fund, item: 'Bảo trì 4 thang máy Block A', plannedDate: date('2026-04-12'), vendor: 'Schindler VN', estimatedCost: new Prisma.Decimal(85_000_000), status: 'DONE' },
      { fundId: ID.fund, item: 'Kiểm định PCCC định kỳ', plannedDate: date('2026-03-22'), vendor: 'PCCC Bình Minh', estimatedCost: new Prisma.Decimal(62_000_000), status: 'DONE' },
      { fundId: ID.fund, item: 'Sơn lại mặt ngoài tầng 1-5', plannedDate: date('2026-06-15'), vendor: 'Sơn Jotun VN', estimatedCost: new Prisma.Decimal(285_000_000), status: 'PLANNED' },
      { fundId: ID.fund, item: 'Đại tu máy phát điện', plannedDate: date('2026-07-10'), vendor: 'Cummins VN', estimatedCost: new Prisma.Decimal(125_000_000), status: 'PLANNED' },
      { fundId: ID.fund, item: 'Nâng cấp hệ thống CCTV', plannedDate: date('2026-09-01'), estimatedCost: new Prisma.Decimal(380_000_000), status: 'TENTATIVE' },
      { fundId: ID.fund, item: 'Cải tạo sảnh chính', plannedDate: date('2026-11-15'), estimatedCost: new Prisma.Decimal(520_000_000), status: 'TENTATIVE' },
    ],
  });
}

async function seedOperations() {
  // Technical systems
  await prisma.technicalSystem.createMany({
    data: [
      { buildingId: BUILDING_ID, name: 'Hệ thống PCCC', type: 'PCCC', lastCheckDate: date('2026-03-22'), nextCheckDate: date('2026-06-22'), status: 'OK' },
      { buildingId: BUILDING_ID, name: 'Thang máy Block A', type: 'LIFT', lastCheckDate: date('2026-04-12'), nextCheckDate: date('2026-07-12'), status: 'OK' },
      { buildingId: BUILDING_ID, name: 'Thang máy Block B', type: 'LIFT', lastCheckDate: date('2026-04-15'), nextCheckDate: date('2026-07-15'), status: 'WARNING', notes: 'Cabin số 2 phát ra tiếng ồn nhẹ' },
      { buildingId: BUILDING_ID, name: 'Hệ thống điện', type: 'ELECTRIC', lastCheckDate: date('2026-05-01'), nextCheckDate: date('2026-08-01'), status: 'OK' },
      { buildingId: BUILDING_ID, name: 'Hệ thống cấp nước', type: 'WATER', lastCheckDate: date('2026-05-10'), nextCheckDate: date('2026-08-10'), status: 'OK' },
      { buildingId: BUILDING_ID, name: 'Camera giám sát (CCTV)', type: 'CCTV', lastCheckDate: date('2026-04-20'), nextCheckDate: date('2026-07-20'), status: 'WARNING', notes: '3/120 camera bị mờ' },
      { buildingId: BUILDING_ID, name: 'Máy phát điện dự phòng', type: 'GENERATOR', lastCheckDate: date('2026-02-15'), nextCheckDate: date('2026-08-15'), status: 'DANGER', notes: 'Cần đại tu, dự kiến 07/2026' },
      { buildingId: BUILDING_ID, name: 'Hệ thống điều hòa trung tâm', type: 'HVAC', lastCheckDate: date('2026-05-05'), nextCheckDate: date('2026-08-05'), status: 'OK' },
      { buildingId: BUILDING_ID, name: 'Kiểm soát ra vào (Access)', type: 'ACCESS_CONTROL', lastCheckDate: date('2026-05-20'), nextCheckDate: date('2026-08-20'), status: 'OK' },
    ],
  });

  // Work orders
  const wos: Prisma.WorkOrderCreateManyInput[] = [
    { buildingId: BUILDING_ID, code: 'YC-2605-047', title: 'Thay bóng đèn LED hành lang tầng 12', category: 'ELECTRIC', status: 'IN_PROGRESS', priority: 'MEDIUM', requesterId: ID.user.binh, assigneeId: ID.user.dung, dueDate: date('2026-05-28') },
    { buildingId: BUILDING_ID, code: 'YC-2605-046', title: 'Sửa vòi nước rỉ tại căn hộ A-08.01', category: 'WATER', status: 'OPEN', priority: 'LOW', requesterId: ID.user.chris, dueDate: date('2026-05-30') },
    { buildingId: BUILDING_ID, code: 'YC-2605-045', title: 'Bảo trì cabin thang máy số 2 Block B', category: 'ELEVATOR', status: 'IN_PROGRESS', priority: 'HIGH', requesterId: ID.user.binh, assigneeId: ID.user.dung, dueDate: date('2026-05-29') },
    { buildingId: BUILDING_ID, code: 'YC-2605-044', title: 'Kiểm tra hệ thống báo cháy tầng 25', category: 'PCCC', status: 'DONE', priority: 'HIGH', requesterId: ID.user.huong, assigneeId: ID.user.dung, completedAt: date('2026-05-25') },
    { buildingId: BUILDING_ID, code: 'YC-2605-043', title: 'Sửa máy lạnh sảnh tầng 1', category: 'HVAC', status: 'DONE', priority: 'MEDIUM', requesterId: ID.user.binh, assigneeId: ID.user.dung, completedAt: date('2026-05-24') },
    { buildingId: BUILDING_ID, code: 'YC-2505-042', title: 'Vệ sinh tổng tầng hầm B2', category: 'GENERAL', status: 'DONE', priority: 'MEDIUM', requesterId: ID.user.huong, completedAt: date('2026-05-20') },
    { buildingId: BUILDING_ID, code: 'YC-2604-029', title: 'Thay ổ khóa cửa phòng kỹ thuật', category: 'GENERAL', status: 'OVERDUE', priority: 'HIGH', requesterId: ID.user.binh, dueDate: date('2026-04-25') },
    { buildingId: BUILDING_ID, code: 'YC-2604-028', title: 'Sửa camera tầng hầm B1', category: 'SECURITY', status: 'OVERDUE', priority: 'HIGH', requesterId: ID.user.huong, dueDate: date('2026-04-30') },
  ];
  await prisma.workOrder.createMany({ data: wos });

  // Maintenance schedule
  await prisma.maintenanceSchedule.createMany({
    data: [
      { buildingId: BUILDING_ID, title: 'Bảo trì PCCC tầng 1-10', scheduledDate: date('2026-05-27'), scheduledTime: '09:00', durationMin: 240, assigneeName: 'Đội PCCC Bình Minh', category: 'PCCC' },
      { buildingId: BUILDING_ID, title: 'Vệ sinh kính mặt ngoài', scheduledDate: date('2026-05-28'), scheduledTime: '08:00', durationMin: 480, assigneeName: 'Công ty Vệ sinh ABC' },
      { buildingId: BUILDING_ID, title: 'Kiểm tra thang máy Block A', scheduledDate: date('2026-05-29'), scheduledTime: '14:00', durationMin: 180, assigneeName: 'Schindler VN', category: 'ELEVATOR' },
      { buildingId: BUILDING_ID, title: 'Bảo dưỡng máy phát điện', scheduledDate: date('2026-05-30'), scheduledTime: '10:00', durationMin: 240, assigneeName: 'Cummins VN' },
    ],
  });
}

async function seedKpi() {
  const period = await prisma.kpiPeriod.create({
    data: {
      id: ID.kpi.period,
      buildingId: BUILDING_ID,
      quarter: 2,
      year: 2026,
      totalScore: new Prisma.Decimal('87.40'),
      rating: 'EXCELLENT',
    },
  });

  await prisma.kpiCategory.createMany({
    data: [
      { id: ID.kpi.catFinance, buildingId: BUILDING_ID, name: 'FINANCE', maxScore: new Prisma.Decimal(100) },
      { id: ID.kpi.catMaint, buildingId: BUILDING_ID, name: 'MAINTENANCE', maxScore: new Prisma.Decimal(100) },
      { id: ID.kpi.catSat, buildingId: BUILDING_ID, name: 'SATISFACTION', maxScore: new Prisma.Decimal(100) },
      { id: ID.kpi.catLegal, buildingId: BUILDING_ID, name: 'LEGAL', maxScore: new Prisma.Decimal(100) },
      { id: ID.kpi.catOps, buildingId: BUILDING_ID, name: 'OPERATIONS', maxScore: new Prisma.Decimal(100) },
    ],
  });

  const indicators: Prisma.KpiIndicatorCreateManyInput[] = [
    // FINANCE
    { periodId: period.id, categoryId: ID.kpi.catFinance, name: 'Tỉ lệ thu phí quản lý', unit: '% căn hộ đóng đúng hạn', targetValue: new Prisma.Decimal(95), actualValue: new Prisma.Decimal('98.6'), achievementRate: new Prisma.Decimal('103.8'), status: 'ON_TRACK', score: new Prisma.Decimal(20) },
    { periodId: period.id, categoryId: ID.kpi.catFinance, name: 'Tỉ lệ chi / thu', unit: '%', targetValue: new Prisma.Decimal(80), actualValue: new Prisma.Decimal('75.2'), achievementRate: new Prisma.Decimal('106.0'), status: 'ON_TRACK', score: new Prisma.Decimal(18) },
    { periodId: period.id, categoryId: ID.kpi.catFinance, name: 'Tăng trưởng quỹ bảo trì', unit: '%', targetValue: new Prisma.Decimal(3), actualValue: new Prisma.Decimal('3.2'), achievementRate: new Prisma.Decimal('106.7'), status: 'ON_TRACK', score: new Prisma.Decimal(15) },
    // MAINTENANCE
    { periodId: period.id, categoryId: ID.kpi.catMaint, name: 'Thời gian phản hồi yêu cầu bảo trì', unit: 'giờ', targetValue: new Prisma.Decimal(4), actualValue: new Prisma.Decimal('3.5'), achievementRate: new Prisma.Decimal('114.3'), status: 'ON_TRACK', score: new Prisma.Decimal(18) },
    { periodId: period.id, categoryId: ID.kpi.catMaint, name: 'Tỉ lệ hoàn thành đúng hạn', unit: '%', targetValue: new Prisma.Decimal(90), actualValue: new Prisma.Decimal('68.1'), achievementRate: new Prisma.Decimal('75.7'), status: 'NEEDS_ATTENTION', score: new Prisma.Decimal(13) },
    { periodId: period.id, categoryId: ID.kpi.catMaint, name: 'Tỉ lệ work order quá hạn', unit: '%', targetValue: new Prisma.Decimal(5), actualValue: new Prisma.Decimal('8.2'), achievementRate: new Prisma.Decimal('61.0'), status: 'NEEDS_ATTENTION', score: new Prisma.Decimal(12) },
    // SATISFACTION
    { periodId: period.id, categoryId: ID.kpi.catSat, name: 'NPS cư dân', unit: 'điểm', targetValue: new Prisma.Decimal(60), actualValue: new Prisma.Decimal(72), achievementRate: new Prisma.Decimal(120), status: 'ON_TRACK', score: new Prisma.Decimal(25) },
    { periodId: period.id, categoryId: ID.kpi.catSat, name: 'Tỉ lệ giải quyết phản ánh', unit: '%', targetValue: new Prisma.Decimal(85), actualValue: new Prisma.Decimal('88.4'), achievementRate: new Prisma.Decimal('104.0'), status: 'ON_TRACK', score: new Prisma.Decimal(20) },
    // LEGAL
    { periodId: period.id, categoryId: ID.kpi.catLegal, name: 'Tuân thủ báo cáo định kỳ', unit: '%', targetValue: new Prisma.Decimal(100), actualValue: new Prisma.Decimal(100), achievementRate: new Prisma.Decimal(100), status: 'ON_TRACK', score: new Prisma.Decimal(20) },
    { periodId: period.id, categoryId: ID.kpi.catLegal, name: 'Số vi phạm pháp lý', unit: 'vụ', targetValue: new Prisma.Decimal(0), actualValue: new Prisma.Decimal(0), achievementRate: new Prisma.Decimal(100), status: 'ON_TRACK', score: new Prisma.Decimal(15) },
    // OPERATIONS
    { periodId: period.id, categoryId: ID.kpi.catOps, name: 'Tỉ lệ sẵn sàng thang máy', unit: '%', targetValue: new Prisma.Decimal(99), actualValue: new Prisma.Decimal('99.3'), achievementRate: new Prisma.Decimal('100.3'), status: 'ON_TRACK', score: new Prisma.Decimal(20) },
    { periodId: period.id, categoryId: ID.kpi.catOps, name: 'Sự cố mất điện', unit: 'lần/quý', targetValue: new Prisma.Decimal(2), actualValue: new Prisma.Decimal(1), achievementRate: new Prisma.Decimal(150), status: 'ON_TRACK', score: new Prisma.Decimal(15) },
    { periodId: period.id, categoryId: ID.kpi.catOps, name: 'Sự cố an ninh', unit: 'lần/quý', targetValue: new Prisma.Decimal(3), actualValue: new Prisma.Decimal(2), achievementRate: new Prisma.Decimal(133), status: 'ON_TRACK', score: new Prisma.Decimal(18) },
    { periodId: period.id, categoryId: ID.kpi.catOps, name: 'Uptime hệ thống Nhà Chung', unit: '%', targetValue: new Prisma.Decimal('99.5'), actualValue: new Prisma.Decimal('99.8'), achievementRate: new Prisma.Decimal('100.3'), status: 'ON_TRACK', score: new Prisma.Decimal(15) },
  ];
  await prisma.kpiIndicator.createMany({ data: indicators });

  // Board members
  await prisma.boardMember.createMany({
    data: [
      { buildingId: BUILDING_ID, userId: ID.user.binh, position: 'Trưởng ban', joinDate: date('2024-01-01') },
      { buildingId: BUILDING_ID, userId: ID.user.tien, position: 'Phó ban - Thủ quỹ', joinDate: date('2024-01-01') },
      { buildingId: BUILDING_ID, userId: ID.user.huong, position: 'Thư ký', joinDate: date('2024-01-01') },
      { buildingId: BUILDING_ID, userId: ID.user.son, position: 'Ủy viên - Kỹ thuật', joinDate: date('2024-01-01') },
      { buildingId: BUILDING_ID, userId: ID.user.mai, position: 'Ủy viên - Truyền thông', joinDate: date('2024-01-01') },
    ],
  });

  const boardMembers = await prisma.boardMember.findMany({ where: { buildingId: BUILDING_ID } });
  const ratings = ['EXCELLENT', 'EXCELLENT', 'GOOD', 'GOOD', 'AVERAGE'] as const;
  const scores = [92, 89, 86, 84, 78];
  for (let i = 0; i < boardMembers.length; i++) {
    await prisma.boardMemberKpi.create({
      data: {
        boardMemberId: boardMembers[i].id,
        periodId: period.id,
        score: new Prisma.Decimal(scores[i]),
        rating: ratings[i],
      },
    });
  }
}

async function seedNews() {
  const featured = await prisma.newsPost.create({
    data: {
      buildingId: BUILDING_ID,
      authorId: ID.user.binh,
      title: 'Ngày hội cư dân Landmark 1 — Kết nối hàng xóm, gắn kết cộng đồng',
      slug: 'ngay-hoi-cu-dan-landmark-1-2026',
      summary: 'Ban quản trị trân trọng thông báo sự kiện thường niên Ngày hội cư dân Landmark 1 sẽ diễn ra ngày 15/06/2026 tại sảnh chính tầng 1.',
      content: 'Kính gửi quý cư dân,\n\nBan quản trị tòa nhà trân trọng kính mời toàn thể cư dân tham gia Ngày hội cư dân Landmark 1 năm 2026...',
      category: 'EVENT',
      thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
      isPinned: true,
      isFeatured: true,
      readTimeMin: 3,
      viewCount: 1248,
      publishedAt: date('2026-05-20'),
    },
  });

  await prisma.newsPost.createMany({
    data: [
      { buildingId: BUILDING_ID, authorId: ID.user.binh, title: 'Cập nhật tiến độ bảo trì thang máy tháng 5/2026', slug: 'cap-nhat-bao-tri-thang-may-052026', summary: 'BQT báo cáo tiến độ bảo trì 8 thang máy của Block A và B trong tháng 5.', content: 'Nội dung chi tiết về bảo trì thang máy...', category: 'MANAGEMENT', viewCount: 284, publishedAt: date('2026-05-22') },
      { buildingId: BUILDING_ID, authorId: ID.user.huong, title: 'Khuyến cáo an ninh: Cẩn thận với thẻ từ giả', slug: 'khuyen-cao-an-ninh-the-tu-gia', summary: 'Cư dân lưu ý hiện tượng đối tượng lạ dùng thẻ từ giả vào tòa nhà.', content: 'Khuyến cáo chi tiết...', category: 'SECURITY', viewCount: 512, publishedAt: date('2026-05-25') },
      { buildingId: BUILDING_ID, authorId: ID.user.mai, title: 'Workshop "Sống xanh tại chung cư" - Mời đăng ký', slug: 'workshop-song-xanh-2026', summary: 'Workshop chia sẻ kinh nghiệm tiết kiệm điện, phân loại rác tại nguồn.', content: 'Chi tiết workshop...', category: 'COMMUNITY', viewCount: 156, publishedAt: date('2026-05-18') },
      { buildingId: BUILDING_ID, authorId: ID.user.binh, title: 'Thông báo cắt nước Block B ngày 30/05/2026', slug: 'cat-nuoc-block-b-30052026', summary: 'BQT thông báo lịch cắt nước phục vụ bảo trì đường ống Block B từ 09:00 đến 14:00 ngày 30/05.', content: 'Chi tiết lịch cắt nước...', category: 'URGENT', viewCount: 423, publishedAt: date('2026-05-26') },
      { buildingId: BUILDING_ID, authorId: ID.user.tien, title: 'Báo cáo thu chi quý 1/2026', slug: 'bao-cao-thu-chi-q1-2026', summary: 'Báo cáo công khai tình hình thu chi quý 1/2026 với tổng thu 8.13 tỉ đồng.', content: 'Báo cáo chi tiết...', category: 'MANAGEMENT', viewCount: 891, publishedAt: date('2026-04-10') },
      { buildingId: BUILDING_ID, authorId: ID.user.son, title: 'Hướng dẫn sử dụng tiện ích phòng gym mới', slug: 'huong-dan-su-dung-gym', summary: 'Phòng gym mới đã hoạt động trở lại sau cải tạo. Hướng dẫn đặt lịch và sử dụng.', content: 'Hướng dẫn chi tiết...', category: 'UTILITY', viewCount: 367, publishedAt: date('2026-05-15') },
    ],
  });

  // Community events
  await prisma.communityEvent.createMany({
    data: [
      { buildingId: BUILDING_ID, title: 'Ngày hội cư dân 2026', location: 'Sảnh tầng 1', eventDate: date('2026-06-15'), startTime: '08:00', endTime: '17:00', status: 'UPCOMING' },
      { buildingId: BUILDING_ID, title: 'Workshop Sống xanh', location: 'Phòng họp tầng 3', eventDate: date('2026-06-05'), startTime: '14:00', endTime: '17:00', status: 'UPCOMING' },
      { buildingId: BUILDING_ID, title: 'Họp ban quản trị quý 2', location: 'Phòng họp BQT', eventDate: date('2026-06-20'), startTime: '09:00', endTime: '12:00', status: 'UPCOMING' },
      { buildingId: BUILDING_ID, title: 'Lớp yoga cộng đồng', location: 'Sân vườn tầng 5', eventDate: date('2026-05-30'), startTime: '06:30', endTime: '07:30', status: 'UPCOMING' },
    ],
  });

  // News views — give chris some history
  void featured;
}

async function seedFeedback() {
  const items: Array<{
    code: string;
    category: Prisma.FeedbackCreateInput['category'];
    title: string;
    description: string;
    priority: Prisma.FeedbackCreateInput['priority'];
    status: Prisma.FeedbackCreateInput['status'];
    days: number;
  }> = [
    { code: 'PA-260525-0012', category: 'CLEANLINESS', title: 'Rác thải không được dọn dẹp ở tầng hầm B2', description: 'Tầng hầm B2 nhiều ngày chưa được dọn dẹp, mùi hôi và thu hút côn trùng.', priority: 'MEDIUM', status: 'IN_PROGRESS', days: 0 },
    { code: 'PA-260524-0011', category: 'ELEVATOR', title: 'Thang máy số 2 bị kẹt và dừng đột ngột', description: 'Thang máy số 2 Block B nhiều lần dừng đột ngột, có lúc mất 5-10 phút mới mở cửa.', priority: 'HIGH', status: 'OPEN', days: 1 },
    { code: 'PA-260523-0010', category: 'NOISE', title: 'Tiếng ồn hành lang tầng 12 sau 22h', description: 'Có cư dân thường xuyên gây tiếng ồn lớn sau 22h tại hành lang tầng 12.', priority: 'LOW', status: 'IN_PROGRESS', days: 2 },
    { code: 'PA-260520-0009', category: 'PARKING', title: 'Xe đậu chiếm chỗ tại tầng hầm B1', description: 'Một xe ô tô đậu chiếm 2 chỗ tại tầng hầm B1 nhiều ngày qua.', priority: 'MEDIUM', status: 'RESOLVED', days: 5 },
    { code: 'PA-260518-0008', category: 'WATER', title: 'Nước rò rỉ ban công tầng 8', description: 'Ban công tầng 8 căn A-08.01 có hiện tượng nước rò rỉ xuống tầng dưới.', priority: 'HIGH', status: 'RESOLVED', days: 7 },
    { code: 'PA-260515-0007', category: 'SERVICE', title: 'Lễ tân thái độ không tốt', description: 'Một nhân viên lễ tân ca chiều có thái độ không thân thiện.', priority: 'LOW', status: 'CLOSED', days: 12 },
  ];

  for (const item of items) {
    const createdAt = new Date(TODAY.getTime() - item.days * 86400_000);
    const fb = await prisma.feedback.create({
      data: {
        buildingId: BUILDING_ID,
        userId: ID.user.chris,
        category: item.category,
        title: item.title,
        description: item.description,
        priority: item.priority,
        status: item.status,
        assigneeId: ID.user.binh,
        resolvedAt: item.status === 'RESOLVED' || item.status === 'CLOSED' ? new Date(createdAt.getTime() + 86400_000 * 2) : null,
        createdAt,
        updatedAt: createdAt,
      },
    });

    await prisma.feedbackReply.create({
      data: {
        feedbackId: fb.id,
        userId: ID.user.binh,
        content: `BQT đã tiếp nhận phản ánh ${item.code}. Chúng tôi sẽ phối hợp bộ phận liên quan xử lý sớm nhất.`,
        statusChange: item.status === 'OPEN' ? null : 'IN_PROGRESS',
      },
    });
  }
}

async function seedDocuments() {
  const folders = await prisma.$transaction(
    [
      { name: 'Nội quy & Quy định', icon: 'book', color: '#4137f9' },
      { name: 'Biên bản họp', icon: 'file-text', color: '#1c9d5f' },
      { name: 'Hợp đồng', icon: 'file-signature', color: '#c8761b' },
      { name: 'Báo cáo tài chính', icon: 'pie-chart', color: '#f5222d' },
      { name: 'Tài liệu kỹ thuật', icon: 'tool', color: '#1870c4' },
    ].map((f) =>
      prisma.documentFolder.create({
        data: { buildingId: BUILDING_ID, ...f },
      }),
    ),
  );

  const docs: Prisma.DocumentCreateManyInput[] = [
    { buildingId: BUILDING_ID, folderId: folders[0].id, name: 'Nội quy chung cư Landmark 1', fileType: 'PDF', fileUrl: '/uploads/seed/noi-quy-lm1.pdf', fileSize: 1_200_000, category: 'Quy định', uploadedById: ID.user.binh, year: 2026, month: 1, viewCount: 1542, downloadCount: 487 },
    { buildingId: BUILDING_ID, folderId: folders[0].id, name: 'Quy chế quản lý sử dụng chung cư', fileType: 'PDF', fileUrl: '/uploads/seed/quy-che-quan-ly.pdf', fileSize: 2_400_000, category: 'Quy định', uploadedById: ID.user.binh, year: 2026, month: 1, viewCount: 982 },
    { buildingId: BUILDING_ID, folderId: folders[1].id, name: 'Biên bản họp BQT tháng 5/2026', fileType: 'PDF', fileUrl: '/uploads/seed/bb-hop-bqt-052026.pdf', fileSize: 850_000, category: 'BQT', uploadedById: ID.user.huong, year: 2026, month: 5, viewCount: 47 },
    { buildingId: BUILDING_ID, folderId: folders[1].id, name: 'Biên bản họp BQT tháng 4/2026', fileType: 'PDF', fileUrl: '/uploads/seed/bb-hop-bqt-042026.pdf', fileSize: 920_000, category: 'BQT', uploadedById: ID.user.huong, year: 2026, month: 4, viewCount: 88 },
    { buildingId: BUILDING_ID, folderId: folders[1].id, name: 'Biên bản họp BQT tháng 3/2026', fileType: 'PDF', fileUrl: '/uploads/seed/bb-hop-bqt-032026.pdf', fileSize: 880_000, category: 'BQT', uploadedById: ID.user.huong, year: 2026, month: 3, viewCount: 120 },
    { buildingId: BUILDING_ID, folderId: folders[2].id, name: 'Hợp đồng cung cấp dịch vụ vệ sinh 2026', fileType: 'DOCX', fileUrl: '/uploads/seed/hd-ve-sinh-2026.docx', fileSize: 540_000, category: 'Hợp đồng', uploadedById: ID.user.tien, year: 2026, month: 1, viewCount: 36 },
    { buildingId: BUILDING_ID, folderId: folders[2].id, name: 'Hợp đồng bảo trì thang máy 2026', fileType: 'DOCX', fileUrl: '/uploads/seed/hd-thang-may-2026.docx', fileSize: 620_000, category: 'Hợp đồng', uploadedById: ID.user.tien, year: 2026, month: 1, viewCount: 24 },
    { buildingId: BUILDING_ID, folderId: folders[3].id, name: 'Báo cáo thu chi Q1/2026', fileType: 'XLSX', fileUrl: '/uploads/seed/bc-thu-chi-q1-2026.xlsx', fileSize: 280_000, category: 'Tài chính', uploadedById: ID.user.tien, year: 2026, month: 4, viewCount: 532 },
    { buildingId: BUILDING_ID, folderId: folders[3].id, name: 'Báo cáo quỹ bảo trì 2025', fileType: 'PDF', fileUrl: '/uploads/seed/bc-quy-bao-tri-2025.pdf', fileSize: 1_800_000, category: 'Tài chính', uploadedById: ID.user.tien, year: 2026, month: 2, viewCount: 412 },
    { buildingId: BUILDING_ID, folderId: folders[4].id, name: 'Sơ đồ mặt bằng tầng điển hình', fileType: 'PDF', fileUrl: '/uploads/seed/mat-bang-dien-hinh.pdf', fileSize: 3_400_000, category: 'Kỹ thuật', uploadedById: ID.user.son, year: 2025, month: 11, viewCount: 256 },
    { buildingId: BUILDING_ID, folderId: folders[4].id, name: 'Bản vẽ hệ thống PCCC', fileType: 'PDF', fileUrl: '/uploads/seed/bv-pccc.pdf', fileSize: 5_200_000, category: 'Kỹ thuật', uploadedById: ID.user.son, year: 2025, month: 10, viewCount: 178 },
    { buildingId: BUILDING_ID, folderId: folders[3].id, name: 'Báo cáo thu chi Q4/2025', fileType: 'XLSX', fileUrl: '/uploads/seed/bc-thu-chi-q4-2025.xlsx', fileSize: 295_000, category: 'Tài chính', uploadedById: ID.user.tien, year: 2025, month: 12, viewCount: 612 },
  ];
  await prisma.document.createMany({ data: docs });

  // Update folder file count
  for (const f of folders) {
    const count = await prisma.document.count({ where: { folderId: f.id } });
    await prisma.documentFolder.update({ where: { id: f.id }, data: { fileCount: count } });
  }

  // Periodic reports
  await prisma.periodicReport.createMany({
    data: [
      { buildingId: BUILDING_ID, type: 'MONTHLY', title: 'Báo cáo hoạt động BQT tháng 5/2026', period: '05/2026', publishDate: date('2026-06-10'), fileUrl: '/uploads/seed/rpt-052026.pdf', fileType: 'PDF', fileSize: 1_200_000, downloadCount: 0, description: 'Báo cáo tổng hợp hoạt động tháng 5/2026' },
      { buildingId: BUILDING_ID, type: 'MONTHLY', title: 'Báo cáo hoạt động BQT tháng 4/2026', period: '04/2026', publishDate: date('2026-05-10'), fileUrl: '/uploads/seed/rpt-042026.pdf', fileType: 'PDF', fileSize: 1_180_000, downloadCount: 187 },
      { buildingId: BUILDING_ID, type: 'MONTHLY', title: 'Báo cáo hoạt động BQT tháng 3/2026', period: '03/2026', publishDate: date('2026-04-10'), fileUrl: '/uploads/seed/rpt-032026.pdf', fileType: 'PDF', fileSize: 1_240_000, downloadCount: 256 },
      { buildingId: BUILDING_ID, type: 'QUARTERLY', title: 'Báo cáo tổng hợp Quý 1/2026', period: 'Q1/2026', publishDate: date('2026-04-15'), fileUrl: '/uploads/seed/rpt-q1-2026.pdf', fileType: 'PDF', fileSize: 2_400_000, downloadCount: 531 },
      { buildingId: BUILDING_ID, type: 'QUARTERLY', title: 'Báo cáo tổng hợp Quý 4/2025', period: 'Q4/2025', publishDate: date('2026-01-15'), fileUrl: '/uploads/seed/rpt-q4-2025.pdf', fileType: 'PDF', fileSize: 2_320_000, downloadCount: 712 },
      { buildingId: BUILDING_ID, type: 'YEARLY', title: 'Báo cáo tổng kết năm 2025', period: '2025', publishDate: date('2026-01-30'), fileUrl: '/uploads/seed/rpt-2025.pdf', fileType: 'PDF', fileSize: 5_800_000, downloadCount: 1342 },
      { buildingId: BUILDING_ID, type: 'YEARLY', title: 'Báo cáo tổng kết năm 2024', period: '2024', publishDate: date('2025-01-30'), fileUrl: '/uploads/seed/rpt-2024.pdf', fileType: 'PDF', fileSize: 5_600_000, downloadCount: 2104 },
      { buildingId: BUILDING_ID, type: 'MONTHLY', title: 'Báo cáo hoạt động BQT tháng 2/2026', period: '02/2026', publishDate: date('2026-03-10'), fileUrl: '/uploads/seed/rpt-022026.pdf', fileType: 'PDF', fileSize: 1_150_000, downloadCount: 298 },
    ],
  });
}

async function seedAI() {
  const conv = await prisma.aIConversation.create({
    data: {
      userId: ID.user.chris,
      title: 'Hỏi về giờ yên tĩnh chung cư',
      messageCount: 2,
      lastMessageAt: new Date('2026-05-27T10:30:00Z'),
    },
  });

  await prisma.aIMessage.createMany({
    data: [
      { conversationId: conv.id, role: 'USER', content: 'Quy định về giờ yên tĩnh?' },
      {
        conversationId: conv.id,
        role: 'ASSISTANT',
        content:
          'Theo nội quy chung cư Landmark 1, giờ yên tĩnh được quy định từ 22:00 đến 06:00 sáng hôm sau. Trong khoảng thời gian này, cư dân lưu ý: (1) Không phát tiếng ồn lớn; (2) Hạn chế sử dụng thiết bị gây ồn (máy khoan, máy hút bụi); (3) Tổ chức tiệc cần thông báo trước cho BQT.',
      },
    ],
  });

  await prisma.aIConversation.createMany({
    data: [
      { userId: ID.user.chris, title: 'Phí gửi xe ô tô hiện tại', messageCount: 2, lastMessageAt: new Date('2026-05-26T15:00:00Z') },
      { userId: ID.user.chris, title: 'Cách đăng ký bảo trì căn hộ', messageCount: 3, lastMessageAt: new Date('2026-05-25T09:20:00Z') },
      { userId: ID.user.chris, title: 'Lịch họp BQT quý 2/2026', messageCount: 2, lastMessageAt: new Date('2026-05-22T11:00:00Z') },
    ],
  });
}

async function seedAuditLogs() {
  await prisma.auditLog.createMany({
    data: [
      { userId: ID.user.chris, action: 'LOGIN', entityType: 'User', entityId: ID.user.chris, ipAddress: '14.169.0.1', userAgent: 'Mozilla/5.0' },
      { userId: ID.user.chris, action: 'SUBMIT_FEEDBACK', entityType: 'Feedback', metadata: { title: 'Tiếng ồn hành lang tầng 12' } },
      { userId: ID.user.chris, action: 'PAY_FEE', entityType: 'FeeSchedule', metadata: { amount: 3800000, period: '05/2026' } },
      { userId: ID.user.binh, action: 'PUBLISH_NEWS', entityType: 'NewsPost', metadata: { title: 'Ngày hội cư dân 2026' } },
      { userId: ID.user.binh, action: 'APPROVE_FUND_TRANSACTION', entityType: 'FundTransaction', metadata: { amount: 285000000 } },
    ],
  });
}

async function main() {
  console.log('🌱 Cleaning database...');
  await clean();

  console.log('🏢 Seeding buildings + blocks...');
  await seedBuildings();

  console.log('👥 Seeding users + settings + devices...');
  await seedUsers();

  console.log('🏠 Seeding apartments + residents...');
  await seedApartments();

  console.log('👨‍👩‍👧 Seeding family members + vehicles...');
  await seedFamily();

  console.log('🔔 Seeding notifications...');
  await seedNotifications();

  console.log('💰 Seeding finance + fees...');
  await seedFinance();

  console.log('🔧 Seeding maintenance fund...');
  await seedMaintenanceFund();

  console.log('⚙️ Seeding operations (work orders, technical systems)...');
  await seedOperations();

  console.log('📈 Seeding KPI + board members...');
  await seedKpi();

  console.log('📰 Seeding news + events...');
  await seedNews();

  console.log('💬 Seeding feedback...');
  await seedFeedback();

  console.log('📄 Seeding documents + periodic reports...');
  await seedDocuments();

  console.log('🤖 Seeding AI conversations...');
  await seedAI();

  console.log('📝 Seeding audit logs...');
  await seedAuditLogs();

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
