import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})

export class PortfolioComponent implements OnInit {
  filtered: any;
  projects: any;
  selectedValue: any;
  selectedValue2: any;
  loaded: any;

  constructor() { }

  ngOnInit(): void {
    this.getAllProjects();
  }


  rando() {
    return Math.floor(Math.random() * 100000);
  }

  mixer(a: any, b: any) {
    return Math.random() - 0.5;
  }

  async getAllProjects() {
    let resp = await fetch('assets/portfolio.json?' + this.rando());
    this.loaded = true;
    if (resp.ok) {
      let json = await resp.json();
      this.projects = json.projects;
      // console.log(json.projects.sort(this.mixer))
    }
  }


  clearSortingFilters() {
    this.selectedValue = null; // or false or ''
  }


  clearSortingFilters2() {
    this.selectedValue2 = null;
  }


  /**
   * Pull the project development status (boolean)
   * @param status 
   */
  async getProjectDev(status: boolean){
      let resp = await fetch('assets/portfolio.json?' + this.rando());
      if (resp.ok) {
        this.filtered = await resp.json();
        this.projects = [];
        this.filtered.projects.forEach((proj: any) => {
          console.log(proj.dev)
          if(status === true){
            if (proj.dev === true) {
              console.log(proj)
              this.projects.push(proj)
              console.log(this.projects)
            }
          }else{
            if (proj.dev === false) {
              console.log(proj)
              this.projects.push(proj)
              console.log(this.projects)
            }
          }
        })
      }
  }


  /**
   * Grab the tags and filter by
   * @param tag 
   */
  async getProjectTag(tag: any) {
    let resp = await fetch('assets/portfolio.json?' + this.rando());

    if (resp.ok) {
      this.filtered = await resp.json();
      this.projects = [];
      this.filtered.projects.forEach((proj: any) => {
        if (proj.tags.includes(tag)) {
          console.log(proj)
          this.projects.push(proj)
          console.log(this.projects)
        }
      })
      // json.projects.forEach((element: []) => {

      //   if(element.tags.includes('HTML')){
      //     console.log(element)
      //     this.projects.push(element)
      //     console.log(this.projects)
      //   }

      // });

    }
  }

}
