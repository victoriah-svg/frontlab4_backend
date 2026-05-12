"use strict";
document.addEventListener("DOMContentLoaded", () => {
    //formulär
    const form = document.getElementById("loginForm");
    //cvDiv
    let cvDiv = document.getElementById("cvDiv");
    //Ul-lista meny
    const nav = document.getElementById("menu");

     changeNav(nav);

    if (cvDiv) {
        getCV(cvDiv);
    }

    if(loginForm){
        loginForm.addEventListener("submit", loginUser);
    }
   
});

async function getCV(cvDiv) {
    //måste lägga till att hämta och skicka med token
    try {
        const response = await fetch('http://localhost:3000/work');
        const result = await response.json();
        result.forEach(job => {
            cvDiv.innerHTML += `<p>${job.companyname}</p>`;
        });

    } catch (error) {
        console.log(error);
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

    //Kontroll att data är lagrad i fälten 
    if(!usernameInput || !passwordInput){
        console.log("Fyll i alla fält"); //skriv ut felmeddelande
        return 
    }

    //Skapa objekt för användare 
    let user = {
        username: usernameInput,
        password: passwordInput
    }

    try{
        const response = await fetch("http://localhost:3000/authAPI/login",
            {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(user)
            }
        );

        if(response.ok){
            const data = await response.json();
            console.log(data);
            //lagrar token som skickats med från anropet i localStorage
            localStorage.setItem("cv_token", data.token);
            //Dirigerar om till cv-sidan
            window.location.href = "cv.html";
        }else{
            throw error;
        }

    }catch(error){
        console.log("Felaktigt användarnamn eller lösenord"); //Skriv ut till DOM istället
    }
}