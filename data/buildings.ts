import type { Building } from "@/types/building";

export const buildings: Building[] = [
  {
    id: "lm1",
    name: "Landmark 1",
    apartment: "Căn hộ A-12.05",
    location: "Vinhomes Central Park",
    isOwned: true,
    isActive: true,
  },
  {
    id: "lm2",
    name: "Landmark 2",
    apartment: undefined,
    location: "Vinhomes Central Park",
    isOwned: false,
    isActive: false,
  },
  {
    id: "tgm",
    name: "The Grand Marina",
    apartment: undefined,
    location: "Quận 1, TP. Hồ Chí Minh",
    isOwned: false,
    isActive: false,
  },
];

export const activeBuilding = buildings.find((b) => b.isActive) ?? buildings[0];
