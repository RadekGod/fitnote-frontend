import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ExerciseService} from "../../exercise.service";
import {UrlService} from "../../../../../../commons/services/url/url.service";
import {ExerciseDto} from "../../../../training-plans/model/exercise-dto.model";
import {GalleryPhotoDto} from "../../../../body/model/gallery-photo-dto.model";
import {GalleryPhotoImage} from "../../../../../../commons/models/gallery-photo-image.model";
import {LocalImage} from "../../../../../../commons/models/local-image.model";
import {Exercise} from "../../../../../../commons/models/exercise.model";
import {ImageService} from "../../../../../../commons/services/file/image.service";
import {environment} from "../../../../../../../environments/environment";

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {

  previousUrl: string = '';
  category!: string;
  exercises: Exercise[] = [];


  constructor(private activatedRoute: ActivatedRoute,
              private exerciseService: ExerciseService,
              private urlService: UrlService,
              private imageService: ImageService) {
  }

  ngOnInit() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });

    this.previousUrl.split('/').pop();
    this.category = this.activatedRoute.snapshot.params['category'];

    this.exerciseService.getAllExercisesFromCategory(this.category).subscribe(async response => {
      console.log(response);
      for (const responseEntry of response) {
        this.exercises.push({
          ...responseEntry,
          image: responseEntry.applicationFile ? await this.imageService.loadImageFromDevice(environment.customExercisesDirectory, responseEntry.applicationFile) : undefined
        })
      }
      console.log(this.exercises);
    })
  }

  // loadImagesForExercises() {
  //   this.bodyService.getAllGalleryPhotos().subscribe(async (responseDto: GalleryPhotoDto[]) => {
  //     for (const response of responseDto) {
  //       let image = await this.imageService.loadImageFromDevice(response.applicationFile);
  //
  //       this.images.push({
  //         id: response.id,
  //         note: response.note,
  //         image: image
  //       } as GalleryPhotoImage);
  //     }
  //   });
  // }

}
