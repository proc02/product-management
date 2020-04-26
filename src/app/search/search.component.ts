import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  item:string;
  constructor(private route:Router) { }

  ngOnInit(): void {
  }
search(value:string){
  this.route.navigateByUrl(`/search/${value}`)
}
}
