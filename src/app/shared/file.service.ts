import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { FileMetaData } from '../model/file-meta-data';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private fireStore:AngularFirestore,private fireStorage:AngularFireStorage) { }

  // save meta data of file to firestore

  saveMetaDataFile(fileObj:FileMetaData){
    const fileMeta = {
      id:'',
      name:fileObj.name,
      url:fileObj.url,
      size:fileObj.size,
    }
    fileMeta.id=this.fireStore.createId();

    this.fireStore.collection('/Upload').add(fileMeta);
  }

  // display all files
  getAllFiles(){
    this.fireStore.collection('/Uploads').snapshotChanges();
  }

  // delete file
  deleFile(fileMeta:FileMetaData){
    this.fireStore.collection('/Uploads').doc(fileMeta.id).delete();
    this.fireStorage.ref('/Uploads/' + fileMeta.name).delete();
    
  }
}
