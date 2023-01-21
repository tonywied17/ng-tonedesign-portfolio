import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-board-user',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  content?: string;
  currentUser: any;
  isLoggedIn = false;
  Blogs: any;
  showAdminControls = false;
  showUserFeed = false;
  private roles: string[] = [];
  image: any;
  eagles = "https://tbz.wtf/2022/October/15/_3nT/birds.png";
  phillies = "https://tbz.wtf/2022/October/15/_fYS/phils.png";
  

  message = '';

  constructor(
    private userService: UserService, 
    private token: TokenStorageService, 
    ) { }

  ngOnInit(): void {
    
  }



}
