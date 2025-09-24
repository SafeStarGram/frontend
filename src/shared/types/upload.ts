export interface IForm {
  image: File | null;
  upperArea: string;
  lowerArea: string;
  title: string;
  description: string;
  score: number;
}

export interface IUploadData {
  image?: File;
  areaId: string;
  subAreaId: string;
  title: string;
  content: string;
  reporterRisk: string;
}

export interface IArea {
  id: number;
  areaName: string;
  imageUrl: string;
  subAreas: ISubArea[];
}

export interface ISubArea {
  subAreaId: number;
  name: string;
}
