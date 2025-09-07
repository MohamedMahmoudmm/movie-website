import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HttpService } from '../../services/http-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  Msg: string = ''

  constructor(private http: HttpService) {
    http.login('Mohamed_2001', 'Mohamed_2001').subscribe({
      next: (session) => {
        localStorage.setItem('session_id', session.session_id);
        this.Msg = 'Login Success'
      },
      error: (err) => {
        this.Msg = err.message
      }
    })

    // http.get('movie/now_playing').subscribe({
      
    //     console.log(movies)
      
    // })
  }

}
