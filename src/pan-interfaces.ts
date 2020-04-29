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
  facility: string;
  score: number;
}

export interface PanDataset {
  pid: string;
  isPublic: boolean;
  title: string;
  creationDate: string;
  size?: number;
  score?: number;
  parameters?: PanMeasurement[];
  samples?: PanSample[];
  techniques?: PanTechnique[];
  instrument?: PanInstrument;
}

interface PanMember {
  role: string;
}

export interface PanDocument {
  pid: string;
  isPublic: boolean;
  type: string;
  title: string;
  summary?: string;
  doi?: string;
  startDate?: string;
  endDate?: string;
  releaseDate?: string;
  license?: string;
  score?: number;
  datasets?: PanDataset[];
  members?: PanMember[];
}
export interface PanSample {
  pid: string;
  title: string;
  parameters?: PanMeasurement[];
}
