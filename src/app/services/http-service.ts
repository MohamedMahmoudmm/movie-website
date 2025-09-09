import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { catchError,  throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http:HttpClient) { }
apiKey = 'a6493890665a35d49413ed72aa7c489c';
request_token:string=''


login(username: string, password: string): Observable<any> {
  return this.http
    // Step 1: Get request token
    .get<any>(`https://api.themoviedb.org/3/authentication/token/new?api_key=${this.apiKey}`)
    .pipe(
      switchMap((res: any) => {
        const request_token = res.request_token;

        // Step 2: Validate token with login
        return this.http.post<any>(
          `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${this.apiKey}`,
          { username, password, request_token }
        ).pipe(
          // Step 3: Create session after validation
          switchMap(() => {
            return this.http.post<any>(
              `https://api.themoviedb.org/3/authentication/session/new?api_key=${this.apiKey}`,
              { request_token }
            );
          })
        );
      }),
      // Global error handler for ANY of the above requests
      catchError((err) => {
        let message = 'An unknown error occurred';

        if (err.error?.status_message) {
          message = err.error.status_message; // TMDB returns nice error messages
        } else if (err.message) {
          message = err.message;
        }
        // Pass the error down as an observable
        return throwError(() => new Error(message));
      })
    );
}

get(endpoint: string, params?: Record<string, any>): Observable<any> {
   const separator = endpoint.includes('?') ? '&' : '?';

  return this.http.get(
    `https://api.themoviedb.org/3/${endpoint}${separator}api_key=${this.apiKey}`);

  let url = `https://api.themoviedb.org/3/${endpoint}?api_key=${this.apiKey}`;


  if (params) {
    const query = new URLSearchParams(params).toString();
    url += `&${query}`;
  }

  return this.http.get(url);
 }

 post(body: any, endpoint: string): Observable<any> {
  // لو الـ endpoint فيه أصلاً '?'
  const separator = endpoint.includes('?') ? '&' : '?';

  return this.http.post(
    `https://api.themoviedb.org/3/${endpoint}${separator}api_key=${this.apiKey}`,
    body
  );
}
}
