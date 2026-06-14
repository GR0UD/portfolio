export type FeatureStatus = "in-progress" | "done";

export interface Feature {
  id: string;
  nameEn: string;
  nameRu: string;
  descriptionEn: string;
  descriptionRu: string;
  version: string;
  status: FeatureStatus;
}

export interface FeatureInput {
  nameEn: string;
  nameRu: string;
  descriptionEn: string;
  descriptionRu: string;
  major: number;
  minor: number;
  patch: number;
}
