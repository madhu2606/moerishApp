import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
   
  }

  back() {
    this.location.back(); // <-- go back to previous location on cancel
  }

}
