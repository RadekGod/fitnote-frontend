import { Component, OnInit } from '@angular/core';
import {TrainingDto} from "../../training-plans/training-plan/training/model/training-dto.model";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../../commons/services/user/user.service";
import {TrainingService} from "../../training-plans/training-plan/training.service";

@Component({
  selector: 'app-training-details',
  templateUrl: './training-details.page.html',
  styleUrls: ['./training-details.page.scss'],
})
export class TrainingDetailsPage implements OnInit {

  training!: TrainingDto;
  private trainingsSubscription!: Subscription;
  trainingId = Number(this.route.snapshot.paramMap.get('trainingId'));
  constructor(private router : Router, private userService: UserService,
              private trainingService: TrainingService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.initializeTrainings();
  }

  initializeTrainings() {
    this.fetchTrainings();
    this.trainingsSubscription = this.listenForTrainingsChange();
  }

  listenForTrainingsChange() {
    return this.trainingService.trainingChange.subscribe(() => {
      this.fetchTrainings();
    });
  }

  fetchTrainings() {
    this.trainingService.getTraining(this.trainingId).subscribe(response => {
      this.training = response;
    });
  }


}
