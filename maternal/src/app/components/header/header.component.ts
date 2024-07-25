import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
    userLoginOn: boolean = true;
  
    constructor(private router: Router, private _AuthService: AuthService) { }
    ngOnInit(): void {
      this.userLoginOn = this._AuthService.isLoggedIn();
    }
  logout() {
    this._AuthService.logout();
    this.userLoginOn = this._AuthService.isLoggedIn();
    this.router.navigate(['/inicio'])
  }
}
