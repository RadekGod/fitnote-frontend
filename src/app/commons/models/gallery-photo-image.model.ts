import {LocalImage} from "./local-image.model";

export interface GalleryPhotoImage {
  id: number,
  note?: string,
  image: LocalImage
}
