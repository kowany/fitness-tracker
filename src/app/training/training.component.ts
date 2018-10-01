import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining = false;
  exerciseSubscription: Subscription = new Subscription();

  constructor( private trainingService: TrainingService ) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if ( exercise ) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }
      }
    );
  }

  ngOnDestroy() {

    if ( this.exerciseSubscription ) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
