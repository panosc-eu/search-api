export interface PanMeasurement {
  unit?: string;
  value: number;
  name: string;
}

export interface PanTechnique {
  pid: string;
  name: string;
}

export interface PanFile {
  pid: string;
  name: string;
}

export interface PanInstrument {
  pid: string;
  name: string;
}

export interface PanDataset {
  pid: string;
  isPublic: boolean;
  title: string;
  creationDate: string;
  size: number;
  parameters?: PanMeasurement[];
  samples?: PanSample[];
  files?: PanFile[];
  techniques?: PanTechnique[];
  instrument?: PanInstrument;
}

interface PanMember {
  role: string;
}

export interface PanDocument {
  pid: string;
  type: string;
  summary: string;
  title: string;
  startDate: string;
  endDate: string;
  releaseDate: string;
  license: string;
  datasets?: PanDataset[];
  members?: PanMember[];
}
export interface PanSample {
  pid: string;
  title: string;
  parameters?: PanMeasurement[];
}
