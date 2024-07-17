import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilingService {
  private apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {}

  createCustomer(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/add-customer`, data);
  }

  viewCustomer(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/view-customer/${id}`);
  }

  listCustomer(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/list-customers`);
  }

  updateCustomer(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/update-customer`, data);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/remove-customer`, { id: id });
  }
}
