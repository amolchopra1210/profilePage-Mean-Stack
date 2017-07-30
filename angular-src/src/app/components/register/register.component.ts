import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name : String;
  username : String;
  password : String;
  email : String;
  constructor(public validateService : ValidateService, public flashMessages : FlashMessagesService, public authService : AuthService, private router :Router) { }

  ngOnInit() {
  }

  onSubmit(data){
    const user = {
      name : this.name,
      email : this.email,
      username : this.username,
      password : this.password
    }
    if(!this.validateService.validateRegister(user)){
      this.flashMessages.show("Please fill all the fields", {cssClass : "alert-danger", timeout : 1500})
      console.log("Please fill all fields");
      return false;
    }
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessages.show("Please enter correct email address ", {cssClass : "alert-danger", timeout : 1500})
      return false;
    }
    //Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
              this.flashMessages.show("Successfuly Registered ", {cssClass : "alert-success", timeout : 1500});
              this.router.navigate(['login']);
      }else{
        this.flashMessages.show("Something went wrong", {cssClass : "alert-danger", timeout : 1500});
              this.router.navigate(['register']);
      }
    })
  }
}
