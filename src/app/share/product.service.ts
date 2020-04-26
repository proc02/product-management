import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from './../product-category';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl = 'http://localhost:9999/api/products';
private catUrl = 'http://localhost:9999/api/product_category';
  constructor(private httpClient: HttpClient,route:ActivatedRoute) { }
  //http://localhost:9999/api/products/search/findByNameContaining
  getProduct(catId:number): Observable <Product []> {
    const url =  `${this.baseUrl}/search/findByCategoryId?id=${catId}`;
    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }
  getProductListPaginate(thePage:number,thePageSize:number,theCatId):Observable<GetResponse>{
    const url =  `${this.baseUrl}/search/findByCategoryId` + `?id=${theCatId}&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponse>(url);
  }
  searchProducts(value:string):Observable<Product []>{
    const  searchurl =  `${this.baseUrl}/search/findByNameContaining?name=${value}`;
    return this.httpClient.get<GetResponse>(searchurl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProductPaginate(thePage:number,thePageSize:number,value:string):Observable<GetResponse>{
    const  searchurl =  `${this.baseUrl}/search/findByNameContaining?name=${value}`+
                          `&page=${thePage}&size=${thePageSize}`;
     return this.httpClient.get<GetResponse>(searchurl);
  }

  listProducCategories():Observable<ProductCategory[]>{
      return this.httpClient.get<GetResponseProductCategory>(this.catUrl)
      .pipe(
        map(
          response => response._embedded.productCategory
        )
      );
  }

  productById(idProd:number):Observable<Product>{
    const  searchurl =  `${this.baseUrl}/${idProd}`;
    return this.httpClient.get<Product>(searchurl);
  }

}

interface GetResponse{
  _embedded: {
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}
interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  };
}