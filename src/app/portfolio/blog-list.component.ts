import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/_services/blog.service';
import { Blog } from 'src/app/_models/blog.model';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {
  filtered: any;
  projects: any;
  selectedValue: any;
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

    let resp = await fetch('https://tonewebdesign.com/portfolio.json?' + this.rando());

    this.loaded = true;

    if (resp.ok) {
      let json = await resp.json();

      this.projects = json.projects;
      console.log(json.projects.sort(this.mixer))

    }
  }



  clearSortingFilters() {
    this.selectedValue = null; // or false or ''
  }

  async getProjectTag(tag: any) {


    let resp = await fetch('https://tonewebdesign.com/portfolio.json?' + this.rando());

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
