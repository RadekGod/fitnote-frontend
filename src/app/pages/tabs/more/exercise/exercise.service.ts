import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {AppConstants} from "../../../../configuration/app.constants";
import {ExerciseDto} from "../../training-plans/model/exercise-dto.model";
import {FormGroup} from "@angular/forms";
import {CreateExerciseDto} from "./model/create-exercise-dto.model";
import {ExerciseCategoryGroupDto} from "../../training-plans/model/exercise-category-group-dto.model";

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private httpClient: HttpClient) {

  }

  public exercisesChange = new Subject<void>();


  notifyAboutExercisesChange(): void {
    this.exercisesChange.next();
  }

  getAllExercisesFromCategory(category: string): Observable<ExerciseDto[]> {
    return this.httpClient.get<ExerciseDto[]>(environment.rootUrl + AppConstants.EXERCISES_CATEGORIES_API_URL, {params: {category: category},  withCredentials:true });
  }

  getExercise(exerciseId: number): Observable<ExerciseDto> {
    return this.httpClient.get<ExerciseDto>(environment.rootUrl + AppConstants.EXERCISES_API_URL + '/exercise', {params: {id: exerciseId},  withCredentials:true });
  }

  addCustomExercise(formGroup : FormGroup, formData: FormData)  {
    formData.append('exerciseData', new Blob([JSON.stringify(this.mapFormToExerciseDto(formGroup))], {
      type: 'application/json'
    }));
    return this.httpClient.post(environment.rootUrl + AppConstants.EXERCISES_API_URL, formData,{ withCredentials: true });
  }

  editCustomExercise(exerciseId: number, formGroup : FormGroup, formData: FormData)  {
    formData.append('exerciseData', new Blob([JSON.stringify(this.mapFormToExerciseDto(formGroup))], {
      type: 'application/json'
    }));
    return this.httpClient.put(environment.rootUrl + AppConstants.EXERCISES_API_URL, formData,{params: {id: exerciseId}, withCredentials: true });
  }

  deleteCustomExercise(exerciseId: number)  {
    return this.httpClient.delete(environment.rootUrl + AppConstants.EXERCISES_API_URL + '/exercise',{params: {id: exerciseId}, withCredentials: true });
  }

  private mapFormToExerciseDto(form: FormGroup): CreateExerciseDto {
    let exerciseCategoryGroups: ExerciseCategoryGroupDto[] = [];
    let exerciseCategoryGroupsString: string[] = form.get('exerciseCategoryGroups')?.value as string[];
    exerciseCategoryGroupsString.forEach(exerciseCategoryGroup => {
      exerciseCategoryGroups.push(<ExerciseCategoryGroupDto>{categoryName: exerciseCategoryGroup});
    });

    return {
      name: form.get('name')?.value,
      description: form.get('description')?.value,
      exerciseType: form.get('exerciseType')?.value,
      exerciseCategoryGroups: exerciseCategoryGroups,
      mainMuscles: form.get('mainMuscles')?.value,
      supportiveMuscles: form.get('supportiveMuscles')?.value,
    } as CreateExerciseDto;
  }

}
