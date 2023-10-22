import {WeekDay} from "../../../../commons/enums/week-days.enum";
import {TrainingPlanExerciseDto} from "./training-plan-exercise-dto.model";


export interface TrainingPlanDto {
  id: number,
  name: string,
  trainingDays: WeekDay[],
  trainingPlanExercises: TrainingPlanExerciseDto[]
}
