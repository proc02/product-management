import { ProductCategory } from './../product-category';
import { ProductService } from './../share/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories:ProductCategory[];
  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.listProducCategories();
  }
  listProducCategories(){
    this.productService.listProducCategories().subscribe(
      data => {
        this.productCategories=data
      }
    );
  }
}
