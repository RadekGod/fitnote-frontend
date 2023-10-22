export interface ApplicationFile {
  id: number;
  fileName: string;
  creationDate: number;
  data?: Blob | string;
}
