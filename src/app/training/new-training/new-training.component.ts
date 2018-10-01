import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  exercises: Exercise[] = [];
  isLoading = false;
  exerciseSubscription: Subscription = new Subscription();
  loadingSubscription: Subscription = new Subscription();

  constructor( private trainingService: TrainingService, private uiService: UIService ) {}

  ngOnInit() {

    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      exercises => this.exercises = exercises
    );

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe( isLoading => {
      this.isLoading = isLoading;
    });

    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining( form: NgForm) {
    this.trainingService.startExercise( form.value.exercise );

  }

  ngOnDestroy() {

    if ( this.exerciseSubscription ) {
      this.exerciseSubscription.unsubscribe();
    }

    if ( this.loadingSubscription ) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
