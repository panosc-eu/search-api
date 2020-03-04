export interface SciCatMeasurement {
  unit: string;
  value: number;
  type: string;
}
export interface SciCatMeta {
  [name: string]: SciCatMeasurement;
}
export interface SciCatDataset {
  scientificMetadata: SciCatMeta;
  samples: SciCatSample[];
  doi: string;
  pid: string;
  size: number;
  datasetName: string;
  creationTime: string;
}
export interface SciCatSample {
  scientificMetadata: SciCatMeta;
  sampleId: string;
  size: number;
  description: string;
  creationTime: string;
}

export interface SciCatPublishedData {
  doi: string;
  title: string;
  abstract: string;
  datasets: SciCatDataset[];
  creationTime: string;
}
