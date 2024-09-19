// import { Injectable } from '@angular/core';
// import { Firestore, collection, addDoc, collectionData, doc, getDocs, query, where } from '@angular/fire/firestore';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class FirebaseService {
//   constructor(private firestore: Firestore) {}

//   
//   addData(collectionName: string, data: any): Promise<void> {
//     const collectionRef = collection(this.firestore, collectionName);
//     return addDoc(collectionRef, data);
//   }

//   // 
//   getDataByField(collectionName: string, field: string, value: any): Observable<any[]> {
//     const collectionRef = collection(this.firestore, collectionName);
//     const q = query(collectionRef, where(field, '==', value));
//     return collectionData(q, { idField: 'id' }) as Observable<any[]>;
//   }
// }
