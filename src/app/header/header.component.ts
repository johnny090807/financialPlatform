import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../objects/user";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // @ts-ignore
  @ViewChild('navBurger') navBurger: ElementRef;
  // @ts-ignore
  @ViewChild('navMenu') navMenu: ElementRef;

  user: User;
  constructor(public authService: AuthService) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  returnUserEmail(): string{
    this.user = JSON.parse(localStorage.getItem('user')!);
    return this.user?.email;
  }
  toggleNavbar(){
    this.navBurger.nativeElement.classList.toggle('is-active')
    this.navMenu.nativeElement.classList.toggle('is-active')
  }

  logout(){
    this.authService.Logout().then(() =>{
      this.user = JSON.parse(localStorage.getItem('user')!);
    });
  }

}
