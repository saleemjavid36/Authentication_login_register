import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit{
  
  selectedFiles !:FileService  ;
  currentFileUpload !:FileMetaData;
  perentage : number=0


  constructor(private fileService:FileService,private fireStorage:AngularFireStorage){}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  selectFile(event:any){
    this.selectedFiles =event.target.files;
  }

  uploadFile(){

  }

  getAllFiles(){

  }

  deleteFile(){

  }

}
