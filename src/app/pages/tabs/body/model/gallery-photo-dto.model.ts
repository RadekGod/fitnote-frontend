import {ApplicationFile} from "../../../../commons/models/application-file.model";

export interface GalleryPhotoDto {
  id: number,
  note?: string,
  applicationFile: ApplicationFile
}
