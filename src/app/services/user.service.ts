import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { addDoc, collection, Firestore, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [
    { name: 'Fiorella', password: '123' },
    { name: 'Jose', password: '456' }
  ];
  
  private loggedIn: boolean = false;

  constructor(private firestore: Firestore) {}

  async login(user: User): Promise<boolean> {
    try {
      const usersCollection = collection(this.firestore, 'registers');
      const q = query(usersCollection, where('user.name', '==', user.name), where('user.password', '==', user.password));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        this.loggedIn = true;
        return true;
      } else {
        this.loggedIn = false;
        return false;
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      this.loggedIn = false;
      return false;
    }
  }

  logout(): void {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  register(user: User): boolean {
    const createdUser = this.users.push(user);
    return createdUser !== undefined;
  }

  async registerDatabase(newUser: User): Promise<boolean> {
    try {
      const col = collection(this.firestore, 'registers');
      const obj = { fecha: new Date(), user: newUser };
      await addDoc(col, obj);
      this.loggedIn = true;
      return true;
    } catch (error) {
      console.error('Error al agregar el documento:', error);
      this.loggedIn = false;
      return false;
    }
  }
}
