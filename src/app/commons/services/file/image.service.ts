import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, Photo} from "@capacitor/camera";
import {decode} from "base64-arraybuffer";
import {Platform} from "@ionic/angular";
import {DeleteFileOptions, Directory, FileInfo, Filesystem, ReaddirResult} from "@capacitor/filesystem";
import {environment} from "../../../../environments/environment";
import {LocalImage} from "../../models/local-image.model";
import {ApplicationFile} from "../../models/application-file.model";



@Injectable({
  providedIn: 'root'
})
export class ImageService {


  constructor(private platform: Platform) {
  }


  async selectImageFromDiskOrTakePhoto(): Promise<Photo> {
    if (this.platform.is('hybrid')) {
      return await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64
      });
    } else {
      return await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });
    }
  }


  convertBase64ImageToBlob(image: Photo): Blob {
    return new Blob([new Uint8Array(decode(image.base64String!))], {
      type: `image/${image.format}`
    });
  }

  async saveImageOnDevice(image: Photo, directory: string, fileName: string) {
    const base64Data = image.base64String!;
    await Filesystem.writeFile({
      directory: Directory.Data,
      path: `${directory}/${fileName}`,
      data: base64Data
    });
  }




  async loadImagesDirectoryFromDevice(): Promise<LocalImage[]> {
    let images: LocalImage[] = [];
    Filesystem.readdir({
      directory: Directory.Data,
      path: environment.photoGalleryDirectory
    }).then(async (result: ReaddirResult) => {
      console.log('Pobrane zdjęcia z urządzenia: ', result);
      images = await this.loadAllImagesFromDeviceDirectory(result.files);
    }, async err => {
      console.log('err:', err);
      await Filesystem.mkdir({
        directory: Directory.Data,
        path: environment.photoGalleryDirectory
      });
    });
    return images;
  }

  // async loadFileData(fileNames: FileInfo[]) {
  //   for (let f of fileNames) {
  //     const filePath = `${environment.photoGalleryDirectory}/${f.name}`;
  //
  //     const readFile = await Filesystem.readFile({
  //       directory: Directory.Data,
  //       path: filePath
  //     });
  //
  //     // this.images.push({
  //     //   name: f.name,
  //     //   path: filePath,
  //     //   data: `data:image/jpeg;base64,${readFile.data}`
  //     // })
  //     console.log('READ: ', readFile);
  //   }
  // }

  async loadAllImagesFromDeviceDirectory(fileInfos: FileInfo[]): Promise<LocalImage[]> {
    let images: LocalImage[] = [];

    for (const fileInfo of fileInfos) {
      const filePath = `${environment.photoGalleryDirectory}/${fileInfo.name}`;
      const readFile = await Filesystem.readFile({
        directory: Directory.Data,
        path: filePath
      });

      images.push({
        fileName: fileInfo.name,
        path: filePath,
        data: `data:image/jpeg;base64,${readFile.data}`
      } as LocalImage);
    }
    return images;
  }

  async loadImageFromDevice(directory: string, applicationFile: ApplicationFile): Promise<LocalImage> {
    const filePath = `${directory}/${applicationFile.fileName}`;
    const readFile = await Filesystem.readFile({
      directory: Directory.Data,
      path: filePath
    });

    return {
      id: applicationFile.id,
      fileName: applicationFile.fileName,
      path: filePath,
      creationDate: applicationFile.creationDate,
      data: `data:image/jpeg;base64,${readFile.data}`
    } as LocalImage;
  }

  async deleteImageFromDevice(directory: string, fileName: string): Promise<void> {
    const filePath = `${directory}/${fileName}`;
    await Filesystem.deleteFile({
      directory: Directory.Data,
      path: filePath
    });
  }
}
