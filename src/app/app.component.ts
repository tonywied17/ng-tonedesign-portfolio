import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from './_services/token-storage.service';
import { UserService } from './_services/user.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  bodyTag = document.body;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  titlePage: any;
  opened: boolean = false

  constructor(private tokenStorageService: TokenStorageService, private userService: UserService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTitle();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
      this.username = user.username;
    } 
  }


  /**
   * get page title
   * @returns page title
   */
  getTitle(): void {
    this.titlePage = this.userService.pageTitle;
    return this.titlePage;
  }


  /**
   * change theme based on param
   * @param theme 
   */
  theme(theme: any) {
    if (theme) {
      this.bodyTag.classList.remove(this.bodyTag.classList.toString())
      this.bodyTag.classList.add("theme-" + theme);
    } else {
      this.bodyTag.classList.remove(this.bodyTag.classList.toString())
      this.bodyTag.classList.add("main");
    }
  }
  

  /**
   * main theme switcher
   */
  mainTheme() {
    this.bodyTag.classList.remove(this.bodyTag.classList.toString())
    this.bodyTag.classList.add("main");
  }


  /**
   * delete token storage
   */
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
    setTimeout(() => {
      window.location.reload();
    }, 10);
    
  }


  /**
   * 
   * @param message 
   * @param action 
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }


  theme2(){
    document.documentElement.setAttribute('data-theme', 'test');
  }
}
