import {NgModule} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  exports: [
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule   
  ]
})
export class AppMaterialModule {}
