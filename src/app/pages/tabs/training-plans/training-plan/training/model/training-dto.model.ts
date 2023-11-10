import {TrainingExerciseDto} from "./training-exercise-dto.model";


export interface TrainingDto {
  id?: number,
  name: string,
  trainingExercises: TrainingExerciseDto[],
  startTime: Date;
  finishTime?: Date;
}
