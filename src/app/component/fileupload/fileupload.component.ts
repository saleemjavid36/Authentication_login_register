import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { FileMetaData } from 'src/app/model/file-meta-data';
import { FileService } from 'src/app/shared/file.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css']
})
export class FileuploadComponent implements OnInit{
  
  selectedFiles !:FileList  ;
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
    this.currentFileUpload=new FileMetaData(this.selectedFiles[0])
    const path = 'Uploads/' + this.currentFileUpload.file.name
    const storageRef =this.fireStorage.ref(path);
    const uploadTask = storageRef.put(this.selectedFiles[0])

    uploadTask.snapshotChanges().pipe(finalize(()=>{

    })
    ).subscribe((res:any)=>{
        this.perentage=(res.bytesTransferred*100/res.res.totalBytes)
    },err=>{
      console.log('Error occured');
    })
  }

  getAllFiles(){

  }

  deleteFile(){

  }

}
