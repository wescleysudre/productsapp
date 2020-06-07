import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product/product.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { DepartmentService } from 'src/app/services/department/department.service';
import { Department } from 'src/app/interfaces/department';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup = this.fb.group({
    _id: [null],
    name: ['',[Validators.required]],
    stock: ['',[Validators.required, Validators.min(0)]],
    price: ['',[Validators.required, Validators.min(0)]],
    departments: [[], [Validators.required]]
  });

  @ViewChild('form') form: NgForm;

  products: Product[] = [];
  departments: Department[] = [];

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((prods) => this.products = prods);

    this.departmentService.get()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((deps) => this.departments = deps);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }

  save() {
    let data = this.productForm.value;
    if (data._id != null) {
      this.productService.update(data)
        .subscribe(
          () => this.notify("Saved!"),
          (err) => console.log(err)
        );
    }
    else {
      this.productService.add(data)
        .subscribe(
          () => this.notify("Created!"),
          (err) => console.log(err)
        );
    }

    this.resetForm();
  }

  delete(p: Product) {
    this.productService.del(p)
      .subscribe(
        () => this.notify("Deleted!"),
        (err) => console.log(err)
      )
  }

  edit(p: Product) {
    this.productForm.setValue(p);

  }

  notify(msg: string) {
    this.snackbar.open(msg, "ok", {duration: 3000});
  }

  resetForm() {
    //this.productForm.reset();
    this.form.resetForm();
  }
}
