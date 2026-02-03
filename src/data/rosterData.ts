export interface User {
  id: string;
  name: string;
  role: string | null;
  avatar: string | null;
  status: "available" | "on_leave";
  initials: string | null;
  contractHours: string | null;
  actualHours: string | null;
  leaveRange: string | null;
}

export interface Shift {
  id: string;
  userId: string;
  userName?: string;
  title: string;
  startTime: string;
  endTime: string;
  category: string;
  locationId: string;
  color: string | null;
  user?: {
    id: string;
    name: string;
    avatar: string | null;
  };
}

export interface Location {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Haico de Gast",
    role: "Surgeon",
    initials: "HG",
    avatar: null,
    status: "available",
    contractHours: "1158.0hrs",
    actualHours: "38.0hrs",
    leaveRange: "Jan 2 - Jan 9",
  },
  {
    id: "2",
    name: "Diane Lane",
    role: "Nurse",
    initials: "DL",
    avatar: null,
    status: "on_leave",
    contractHours: "1158.0hrs",
    actualHours: "38.0hrs",
    leaveRange: "Jan 12 - Jan 28",
  },
  {
    id: "3",
    name: "Elizia De Gois",
    role: "Physiotherapist",
    initials: "EG",
    avatar: null,
    status: "available",
    contractHours: "1158.0hrs",
    actualHours: "38.0hrs",
    leaveRange: null,
  },
  {
    id: "4",
    name: "Elijah Oyin",
    role: "Specialist",
    initials: "EO",
    avatar: null,
    status: "on_leave",
    contractHours: "1158.0hrs",
    actualHours: "38.0hrs",
    leaveRange: "Jan 8 - Jan 15",
  },
  {
    id: "5",
    name: "Olumzy",
    role: "Senior Specialist",
    initials: "OL",
    avatar: null,
    status: "available",
    contractHours: "1158.0hrs",
    actualHours: "38.0hrs",
    leaveRange: null,
  },
  {
    id: "6",
    name: "Tbnelly",
    role: "Junior Specialist",
    initials: "TB",
    avatar: null,
    status: "available",
    contractHours: "1158.0hrs",
    actualHours: "38.0hrs",
    leaveRange: null,
  },
];

export const mockLocations: Location[] = [
  { id: "loc-days", name: "Days" },
  { id: "loc-kamer1", name: "Behandelingenkamer1" },
  { id: "loc-mgmt", name: "Management" },
  { id: "loc-biz", name: "Bijzonderheden-Verlof-Cursus..." },
  { id: "loc-fin", name: "Financien" },
];

export const mockShifts: Shift[] = [
  {
    id: "s1",
    userId: "1",
    userName: "Haico de Gast",
    title: "Surgery",
    startTime: "11:00",
    endTime: "13:00",
    category: "Surgery",
    locationId: "room1",
    color: "#FFF5EB",
  },
  {
    id: "s2",
    userId: "2",
    userName: "Diane Lane",
    title: "Pijnspecialist",
    startTime: "11:00",
    endTime: "12:00",
    category: "Pijnspecialist",
    locationId: "days",
    color: "#F1FDF5",
  },
  {
    id: "s3",
    userId: "2",
    userName: "Diane Lane",
    title: "Pijnspecialist",
    startTime: "11:00",
    endTime: "11:45",
    category: "Consultation",
    locationId: "mgmt",
    color: "#FCFBEA",
  },
  {
    id: "s4",
    userId: "1",
    userName: "Haico de Gast",
    title: "Pijnspecialist",
    startTime: "11:00",
    endTime: "13:00",
    category: "Surgery",
    locationId: "hotel",
    color: "#FFF5EB",
  },
  {
    id: "s5",
    userId: "2",
    userName: "Diane Lane",
    title: "Pijnspecialist",
    startTime: "12:00",
    endTime: "13:00",
    category: "Consultation",
    locationId: "room1",
    color: "#FCFBEA",
  },
];
