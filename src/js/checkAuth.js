"use strict";
//Kollar om token finns - annars skickar till logga-in-sidan 

//om inte token finns i localStorage
if(!localStorage.getItem("cv_token")){
    window.location.href = "login.html"; //byter användarens location - skickas till log in 
}