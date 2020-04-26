import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../share/product.service';
import { Product } from './../share/product';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  selectedProd:Product;
  constructor(private productService:ProductService,private route:ActivatedRoute) { }

  findProductById(){
    const id:number = +this.route.snapshot.paramMap.get("id");
      this.productService.productById(id).subscribe(
        data => this.selectedProd=data
      );
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.findProductById();
    });
  }

}
