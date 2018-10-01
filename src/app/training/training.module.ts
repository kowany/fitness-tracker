import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';


import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { TrainingRouterModule } from './training-routing.module';


@NgModule({
    declarations: [
        TrainingComponent,
        CurrentTrainingComponent,
        NewTrainingComponent,
        PastTrainingsComponent,
        StopTrainingComponent
    ],
    imports: [
        SharedModule,
        TrainingRouterModule
    ],
    entryComponents: [ StopTrainingComponent ]
})


export class TrainingModule {}
