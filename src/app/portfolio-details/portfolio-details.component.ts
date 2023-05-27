import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-portfolio-details',
  templateUrl: './portfolio-details.component.html',
  styleUrls: ['./portfolio-details.component.scss']
})

export class PortfolioDetailsComponent implements OnInit {
  data: any;
  loaded: any;
  projects: any;

  @Input() viewMode = false;
  @Input() currentProject: any;

  repos: any[] = [];
  tags: any[] = [];

  constructor(
    private token: TokenStorageService,
    private route: ActivatedRoute
    ,) { }

  ngOnInit(): void {
    let paramID = this.route.snapshot.params["id"]
    this.getProject(paramID)
  }


  /**
   * 
   * @param projID 
   */
  async getProject(projID: any) {
    let resp = await fetch('assets/portfolio.json?' + this.rando());
    this.loaded = true;
    if (resp.ok) {
      let json = await resp.json();
      this.projects = json.projects;
      console.log(json.projects)
      this.projects.forEach((proj: any) => {
        if(proj.id == projID) {
          this.currentProject = proj;
          // Get Repo's comma separated to array
          if(proj.repo){
            if(proj.repo.includes(',')) {
              let splitRepos = proj.repo.split(', ');
              console.log(splitRepos)
              this.repos = splitRepos
            }else{
              console.log(proj.repo)
                this.repos.push(proj.repo);
            }
          }else{
            this.repos = [];
          }
          // Get tech stack tags comma separated to array
          if(proj.tags){
            if(proj.tags.includes(',')) {
              let splitTags = proj.tags.split(', ');
              console.log(splitTags)
              this.tags = splitTags
            }else{
              console.log(proj.tags)
                this.tags.push(proj.tags);
            }
          }else{
            this.tags = [];
          }
        }
      });
    }
  }


  /**
   * 
   * @param url 
   * @param title 
   * @param w 
   * @param h 
   * @returns 
   */
  open(url: any, title: any, w: any, h: any){
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    return window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
  }

  
  rando() {
    return Math.floor(Math.random() * 100000);
  }

}
