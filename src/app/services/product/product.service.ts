import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  readonly url = 'http://localhost:3000/products';
  private productsSubject$: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(null);
  private loaded: boolean = false;

  constructor(private http: HttpClient) { }

  get(): Observable<Product[]> {
    if (!this.loaded) {
        this.http.get<Product[]>(this.url)
          .subscribe(this.productsSubject$);
      this.loaded = true;
    }
    return this.productsSubject$.asObservable();
  }
}
