import { ProductService } from './../share/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../share/product';
import {ActivatedRoute} from '@angular/router'

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
products: Product[];
currentCatId:number;
thePageSize:number=2;
thePageNumber:number=1;
theTotalElement:number;
previoussearch:string =null;
currentSearch:string;
productSearch:Product[]=[];
  constructor(private productService: ProductService,private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(() =>{
      this.listProducts();
    });

  }
  listProducts(){
    const hasId:boolean = this.activeRoute.snapshot.paramMap.has('id');
    const hasKeyword = this.activeRoute.snapshot.paramMap.has('keyword');
    const keyword = this.activeRoute.snapshot.paramMap.get('keyword');
    if(hasId){
     this.currentCatId= +this.activeRoute.snapshot.paramMap.get("id");
    }else{
      this.currentCatId= 1;
    }
    if(keyword!==this.previoussearch){
      this.thePageNumber =1;
    }
    this.previoussearch = keyword;
    if(hasKeyword && keyword.length > 0 && keyword){
        this.productService.searchProductPaginate(this.thePageNumber-1,this.thePageSize,keyword).subscribe(
        //data => this.products =data._embedded
        this.processResult()
      );
    }else{
      this.handleProductsPage();
    }

  }
  handleProductsPage(){
    this.productService.getProductListPaginate(this.thePageNumber-1,this.thePageSize,this.currentCatId).subscribe(this.processResult());
  }
  private processResult(){
    return data =>{
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number+1;
      this.theTotalElement=data.page.totalElements;
      this.thePageSize =data.page.size;
    }
  }
}
