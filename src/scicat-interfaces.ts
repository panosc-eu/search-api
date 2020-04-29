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
  origdatablocks?: SciCatDatablock[];
}

export interface SciCatDatablock {
  id: string;
  size: number;
  dataFileList: SciCatFile[];
  ownerGroup: string;
  accessGroups?: string[];
  createdBy?: string;
  updatedBy?: string;
}

export interface SciCatFile {
  path: string;
  size: number;
  time: string;
  chk: string;
  uid: string;
  gid: string;
  perm: string;
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
  pidArray: string[];
  datasets: SciCatDataset[];
  creationTime: string;
}

export interface SciCatInstrument {
  pid: string;
  name: string;
  customMetadata: SciCatMeta;
}
