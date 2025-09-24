export interface IAreaData {
  areaId: number;
  subAreaId: number;
  createdAt: string;
  content: string;
}

export interface IDetailInfo {
  isChecked: number;
  checkerName: string;
  checkerPosition: number;
  checkerDepartment: number;
  isCheckedAt: string;
  isActionTaken: number;
  actionTakerName: string;
  actionTakerPosition: number;
  actionTakerDepartment: number;
  isActionTakenAt: string;
}

export interface IActionForm {
  isChecked: number;
  isActionTaken: number;
}

export interface IComment {
  userId: number;
  commentId: number;
  userName: string;
  positionId: number;
  departmentId: number;
  message: string;
  createdAt: string;
  postId: string;
  profilePhotoUrl: string;
}

export interface Area {
  id: number;
  areaName: string;
  imageUrl: string | null;
  subAreas: SubArea[];
}

export interface SubArea {
  subAreaId: number;
  name: string;
}

export interface IForm {
  title: string;
  areaId: number;
  subAreaId: number;
  content: string;
  reporterRisk: string;
}
