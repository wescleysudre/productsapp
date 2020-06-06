import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'src/app/interfaces/department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  readonly url = 'http://localhost:3000/departments';

  constructor(private http: HttpClient) {

  }

  get(): Observable<Department[]> {
    return this.http.get<Department[]>(this.url);
  }

  add(d: Department): Observable<Department> {
    return this.http.post<Department>(this.url, d);
  }
}
