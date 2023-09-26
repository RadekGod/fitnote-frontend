import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ItemReorderEventDetail} from "@ionic/angular";

@Component({
  selector: 'app-training-plans',
  templateUrl: './training-plans.page.html',
  styleUrls: ['./training-plans.page.scss'],
})
export class TrainingPlansPage implements OnInit {

  constructor(private router : Router) {
  }

  ngOnInit(): void {
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }


}
