import {Component, OnInit} from '@angular/core';
import {UrlService} from "../../../../../commons/services/url/url.service";
import {ExerciseCategoryGroups} from "../../../../../commons/enums/exercise-category-groups.enum";

interface ExerciseCategoryGroup {
  categoryName: ExerciseCategoryGroups,
  categoryImage: string,
  queryParam: string
}

@Component({
  selector: 'app-exercise-groups',
  templateUrl: './exercise-groups.page.html',
  styleUrls: ['./exercise-groups.page.scss'],
})
export class ExerciseGroupsPage implements OnInit {

  exerciseCategoryGroups: ExerciseCategoryGroup[] = [
    {
      categoryName: ExerciseCategoryGroups.CHEST,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9194_1521031139_c560x377x0x17,540x360.jpg',
      queryParam: ExerciseCategoryGroups.CHEST
    },
    {
      categoryName: ExerciseCategoryGroups.SHOULDERS,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9190_1521030039_540x360.jpg',
      queryParam: ExerciseCategoryGroups.SHOULDERS
    },
    {
      categoryName: ExerciseCategoryGroups.BICEPS,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9191_1521031033_c560x377x0x17,540x360.jpg',
      queryParam: ExerciseCategoryGroups.BICEPS
    },
    {
      categoryName: ExerciseCategoryGroups.TRICEPS,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9198_1521031241_c560x377x9x17,540x360.jpg',
      queryParam: ExerciseCategoryGroups.TRICEPS
    },
    {
      categoryName: ExerciseCategoryGroups.FOREARMS,
      categoryImage: 'https://amadeuszmajcher.pl/wp-content/uploads/2020/03/trening-przedramion-najwa%C5%BCniejsze-informacje.jpg',
      queryParam: ExerciseCategoryGroups.FOREARMS
    },
    {
      categoryName: ExerciseCategoryGroups.UPPER_BACK,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9197_1521031212_c554x373x0x13,540x360.jpg',
      queryParam: ExerciseCategoryGroups.UPPER_BACK
    },
    {
      categoryName: ExerciseCategoryGroups.LOWER_BACK,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9197_1521031212_c554x373x0x13,540x360.jpg',
      queryParam: ExerciseCategoryGroups.LOWER_BACK
    },
    {
      categoryName: ExerciseCategoryGroups.ABS,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9192_1521031073_c560x377x0x17,540x360.jpg',
      queryParam: ExerciseCategoryGroups.ABS
    },
    {
      categoryName: ExerciseCategoryGroups.GLUTES,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9195_1521031215_c560x377x2x4,540x360.jpg',
      queryParam: ExerciseCategoryGroups.GLUTES
    },
    {
      categoryName: ExerciseCategoryGroups.THIGH_FRONT,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9193_1521031142_c560x377x9x17,540x360.jpg',
      queryParam: ExerciseCategoryGroups.THIGH_FRONT
    },
    {
      categoryName: ExerciseCategoryGroups.THIGH_BACK,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9195_1521031215_c560x377x2x4,540x360.jpg',
      queryParam: ExerciseCategoryGroups.THIGH_BACK
    },
    {
      categoryName: ExerciseCategoryGroups.CALVES,
      categoryImage: 'https://www.fabrykasily.pl/upload/gallery/2018/03/id_9196_1521031171_c560x377x1x0,540x360.jpg',
      queryParam: ExerciseCategoryGroups.CALVES
    },
    {
      categoryName: ExerciseCategoryGroups.CARDIO,
      categoryImage: 'https://png.pngtree.com/element_our/png_detail/20181205/favorite-vector-icon-png_256690.jpg',
      queryParam: ExerciseCategoryGroups.CARDIO
    },
    {
      categoryName: ExerciseCategoryGroups.FAVOURITE,
      categoryImage: 'https://png.pngtree.com/element_our/png_detail/20181205/favorite-vector-icon-png_256690.jpg',
      queryParam: ExerciseCategoryGroups.FAVOURITE
    },
    {
      categoryName: ExerciseCategoryGroups.CUSTOM,
      categoryImage: 'https://i.imgur.com/ljYNElL.png',
      queryParam: ExerciseCategoryGroups.CUSTOM
    }
  ];

  previousUrl: string = '';

  constructor(private urlService: UrlService) {
  }

  ngOnInit() {
    this.urlService.previousUrl$
      .subscribe((previousUrl: string) => {
        this.previousUrl = previousUrl;
      });
  }
}
