import { Injectable } from '@angular/core';
import {AngularFirestore, DocumentChangeAction} from '@angular/fire/compat/firestore'
import { Student } from '../model/student';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs:AngularFirestore) { }

  // add student

  addStudent(student: Student ){
    student.id = this.afs.createId()
    return this.afs.collection('/Students').add(student)
    // we are adding collected data in path /Students in firestore
  }

  // get all students

  getAllStudents() {
    return this.afs.collection('/Students').snapshotChanges()
  }


  // delete students

  deleteStudent(student:Student){
    debugger
    return this.afs.doc('/Students/' + student.id).delete()
  }

  // update student

  updateStudent(student:Student){
    this.deleteStudent(student);
    this.addStudent(student);
  }
}
