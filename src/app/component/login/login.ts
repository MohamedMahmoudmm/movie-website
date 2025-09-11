import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { HttpService } from '../../services/http-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  Msg: string = ''

  constructor(private http: HttpService,private router:Router) {

    if(localStorage.getItem('session_id')){
      this.router.navigate(['/home'])
    }
  }

  login(username: string, password: string) {
    this.http.login(username, password).subscribe({
      next: (session) => {
        localStorage.setItem('session_id', session.session_id);
        this.Msg = 'Login Success'
        this.router.navigate(['/home'])
      },
      error: (err) => {
        this.Msg = err.message
      }
    })
  }

}
