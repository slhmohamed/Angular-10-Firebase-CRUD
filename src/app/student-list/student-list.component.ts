import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';  // CRUD API service class
import { ToastrService } from 'ngx-toastr';      // Alert message using NGX toastr

export interface Student {
    $key: string;
    firstName: string;
    lastName: string;
    email: string
    mobileNumber: Number;
 }

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

p: number = 1;                      // Settup up pagination variable
  Student: Student[];               
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;            // Showing No Student Message, when no student in database.
  
  

  constructor(
    public crudApi: CrudService, // Inject student CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
    ){ }


  ngOnInit() {

    this.dataState();  
    let s = this.crudApi.GetStudentsList(); 
    s.snapshotChanges().subscribe(data => { 
      this.Student = [];
      console.log("cc1")
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Student.push(a as Student);
        console.log("cc2")

      })
    })
  }

   
  dataState() {     
    this.crudApi.GetStudentsList().valueChanges().subscribe(data => {
      
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

   
  deleteStudent(student) {
    if (window.confirm('Are sure you want to delete this student ?')) { 
      this.crudApi.DeleteStudent(student.$key) // Using Delete student API to delete student.
      this.toastr.success(student.firstName + ' successfully deleted!'); // Alert message will show up when student successfully deleted.
    }
  }

}
