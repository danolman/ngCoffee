import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

//material
import { 
	MatFormFieldModule,
	MatCardModule,
	MatButtonModule,
	MatMenuModule,
	MatToolbarModule,
	MatIconModule,
	MatSidenavModule,
	MatLineModule,
	MatProgressSpinnerModule,
	MatDividerModule,
	MatChipsModule,
	MatInputModule
} from '@angular/material';


const myModules = [
	MatFormFieldModule,
	MatCardModule,
	MatButtonModule,
	MatMenuModule,
	MatToolbarModule,
	MatIconModule,
	MatSidenavModule,
	MatLineModule,
	MatProgressSpinnerModule,
	MatDividerModule,
	MatChipsModule,
	MatInputModule
];

@NgModule({
  declarations: [],
  imports: [ CommonModule,myModules, MatDialogModule ],
  exports : [ myModules ]
})
export class MaterialModule { }
