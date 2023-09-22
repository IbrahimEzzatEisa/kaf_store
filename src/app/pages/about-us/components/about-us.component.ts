import { Component, OnInit } from '@angular/core';
import { About } from '../../home/models/about.model';
import { HomeService } from '../../home/service/sections.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent implements OnInit {

   // main array
   about: About = new About()

   constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getAbout().subscribe(
      res => {
        this.about = res
      }, err => {
      }
    )
  }

}
