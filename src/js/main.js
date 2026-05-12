"use strict";
document.addEventListener("DOMContentLoaded", () => {
    //formulär för login
    const loginForm = document.getElementById("loginForm");
    //formulär för registrering
    const registerForm = document.getElementById("registerForm");
    //cvDiv
    let cvDiv = document.getElementById("cvDiv");
    //Ul-lista meny
    const nav = document.getElementById("menu");

    changeNav(nav);

    if (cvDiv) {
        getCV(cvDiv);
    }

    if (loginForm) {
        loginForm.addEventListener("submit", loginUser);
    }

    if (registerForm) {
       registerForm.addEventListener("submit", registerUser);
    }

});

//Körs om anävndaren är inloggad
async function getCV(cvDiv) {
    //hämta in token 
    const token = localStorage.getItem("cv_token");

    try {
        const response = await fetch('http://localhost:3001/work', {
            method: "GET",
            headers: {
                "authorization": "Bearer " + token,
                "content-type": "application/json"

            }
        });
        // if (response.ok) {
        const result = await response.json();
        console.log(result);
        result.forEach(job => {
            cvDiv.innerHTML += `<p>${job.companyname} - ${job.jobtitle} - ${job.location}</p>`;
        });
        /*  } else {
              throw error
          }*/


    } catch (error) {
        console.log("Något gick fel " + error);
    }
}

function changeNav(nav) {

    // localStorage.setItem("cv_token", "test");

    if (localStorage.getItem("cv_token")) {
        nav.innerHTML = `
        <li><a href="/">Hem</a></li>
        <li><a href="/cv">Mitt CV</a></li>
        <li><button id="logout">Logga ut</button></li>
        `;
    } else {
        nav.innerHTML = `
        <li><a href="/">Hem</a></li>
        <li><a href="/cv">Mitt CV</a></li>
        <li><a href="/login">Login</a></li>
        `
    }

    //Logga ut knapp
    const logoutBtn = document.getElementById("logout");

    //om logga-ut-knapp finns - lyssna på klick och ta bort token ur localStorage samt dirigera om till loginsidan
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            console.log("Logga ut");
            localStorage.removeItem("cv_token");
            window.location.href = "login.html";
        });
    }
}

async function loginUser(e) {
    e.preventDefault();

    let usernameInput = document.getElementById("username").value;
    let passwordInput = document.getElementById("password").value;
    //errordiv
    let errorDiv = document.getElementById("errorDivLogin");
    errorDiv.innerHTML= "";

    //Kontroll att data är lagrad i fälten 
    if (!usernameInput || !passwordInput) {
        console.log("Fyll i alla fält"); //skriv ut felmeddelande
        errorDiv.innerHTML="Fyll i alla fält";
        return
    }

    //Skapa objekt för användare 
    let user = {
        username: usernameInput,
        password: passwordInput
    }

    try {
        const response = await fetch("http://localhost:3001/authAPI/login",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        if (response.ok) {
            const data = await response.json();
            // console.log(data.response.token);
            //lagrar token som skickats med från anropet i localStorage
            localStorage.setItem("cv_token", data.response.token);
            //Dirigerar om till cv-sidan
            window.location.href = "cv.html";
        } else {
            throw error;
        }

    } catch (error) {
        console.log("Felaktigt användarnamn eller lösenord"); //Skriv ut till DOM istället
        errorDiv.innerHTML="Felaktigt användarnamn eller lösenord";
    }
}

async function registerUser(e){

e.preventDefault();
//lagrar inputvalues 
let usernameInputReg = document.getElementById("usernameReg").value;
let passwordInputReg = document.getElementById("passwordReg").value;
let createdDiv = document.getElementById("created");
let failedToCreate = document.getElementById("notCreated");

createdDiv.innerHTML = "";
failedToCreate.innerHTML = "";

 //Kontroll att data är lagrad i fälten 
    if (!usernameInputReg || !passwordInputReg) {
        console.log("Fyll i alla fält"); //skriv ut felmeddelande
        return
    }
    
     //Skapa objekt för användare 
    let user = {
        username: usernameInputReg,
        password: passwordInputReg
    }


     try {
        const response = await fetch("http://localhost:3001/authAPI/register",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        if (response.ok) {
            const data = await response.json();
           console.log( data.message);
           createdDiv.innerHTML = data.message;
            //Dirigerar om till cv-sidan
            //window.location.href = "cv.html";
        } else {
            throw error;
        }

    } catch (error) {
        failedToCreate.innerHTML="Det gick inte att registrera - prova igen";
        console.log("Det gick inte att registrera"); //Skriv ut till DOM istället
    }
}