import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(page? , itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>>{
    const paginationResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let PaginationParams = new HttpParams();
    if(page != null  && itemsPerPage != null){
      PaginationParams = PaginationParams.append('PageNumber', page);
      PaginationParams = PaginationParams.append('PageSize', itemsPerPage);
    }

    if (userParams != null){
      PaginationParams = PaginationParams.append('minAge', userParams.minAge);
      PaginationParams = PaginationParams.append('maxAge', userParams.maxAge);
      PaginationParams = PaginationParams.append('gender', userParams.gender);
      PaginationParams = PaginationParams.append('orderBy', userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUrl + 'users', { observe: 'response', params: PaginationParams}).pipe(
      map(response => {
        paginationResult.result = response.body;
        if (response.headers.get('Pagination') != null){
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginationResult;
      })
    );
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user: User){
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number){
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletPhoto(userId: number, id: number){
    return this.http.delete(this.baseUrl + 'users/'+ userId + '/photos/' + id);
  }
}
