import {ActivityTypeDto} from "./activity-type-dto.model";

export interface ActivityDto {
  id: number,
  activityDurationInMinutes: number,
  trainingPlanName?: string,
  burntKilocalories: number,
  distanceTraveled: number,
  activityDate: Date,
  activityType: ActivityTypeDto
}
