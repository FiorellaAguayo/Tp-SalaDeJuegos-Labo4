import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, RouterModule], // Agrega RouterModule aquí
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isSidebarVisible: boolean = false;
  constructor(public userService: UserService, private router: Router) {}

  logout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  //alterna la visibilidad de la barra
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
