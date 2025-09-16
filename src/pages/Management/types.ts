// 관리구역 데이터 타입
export interface ManagementArea {
  id: number;
  name: string;
  image: string;
}

// 관리자 데이터 타입
export interface Manager {
  id: number;
  name: string;
  department: string;
  phone: string;
  extension: string;
  status: "권한부여" | "권한제거";
  avatar: string;
}
