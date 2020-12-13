import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './add-student/add-student.component';
import { StudentListComponent } from './student-list/student-list.component';
import { EditStudentComponent } from './edit-student/edit-student.component';

const routes: Routes = [
{ path: '', redirectTo: '/register-student', pathMatch: 'full' },
  
  { path: 'register-student', component: AddStudentComponent },
  { path: 'view-students', component: StudentListComponent },
  { path: 'edit-student/:id', component: EditStudentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
