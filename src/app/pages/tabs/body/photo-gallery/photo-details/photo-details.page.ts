import { Component, OnInit } from '@angular/core';
import {GalleryPhotoDto} from "../../model/gallery-photo-dto.model";
import {ImageService} from "../../../../../commons/services/file/image.service";
import {BodyService} from "../../body.service";
import {GalleryPhotoImage} from "../../../../../commons/models/gallery-photo-image.model";
import {UrlService} from "../../../../../commons/services/url/url.service";
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.page.html',
  styleUrls: ['./photo-details.page.scss'],
})
export class PhotoDetailsPage implements OnInit {

  image!: GalleryPhotoImage | null;

  constructor(private bodyService: BodyService,
              private imageService: ImageService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.fetchGalleryPhoto();
  }


  fetchGalleryPhoto() {
    const galleryPhotoId = Number(this.route.snapshot.paramMap.get('id'));
    this.bodyService.getGalleryPhoto(galleryPhotoId).subscribe(async (responseDto: GalleryPhotoDto) => {
        let image = await this.imageService.loadImageFromDevice(environment.photoGalleryDirectory, responseDto.applicationFile);

        this.image = {
          id: responseDto.id,
          note: responseDto.note,
          image: image
        } as GalleryPhotoImage;

    });
  }
}
