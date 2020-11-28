import { Component } from '@angular/core';
 
import { GitHubService } from './service/github.service';
import { Repo } from './model/repo.model';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  userName: string = "tektutorialshub"
  repos: Repo[] = [];
 
  loading: boolean = false;
  errorMessage: any | undefined;
 
  constructor(private githubService: GitHubService) {
  }
 
  public getRepos() {
    this.loading = true;
    this.errorMessage = "";
    this.githubService.getRepos(this.userName)
      .subscribe(
        (response) => {                           //next() callback
          console.log('response received')
          this.repos = response; 
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          console.log('Request completed')      //This is actually not needed 
          this.loading = false; 
        })
  }
}