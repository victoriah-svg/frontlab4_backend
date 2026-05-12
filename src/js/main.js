"use strict";
document.addEventListener("DOMContentLoaded", () => {
    //formulär
    const form = document.getElementById("form");
    //cvDiv
    let cvDiv = document.getElementById("cvDiv");
    //Ul-lista meny
    const nav = document.getElementById("menu");

    if (cvDiv) {
        getCV(cvDiv);
    }

    changeNav(nav);
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

    localStorage.setItem("cv_token", "test");

    if (localStorage.getItem("cv_token")) {
        nav.innerHTML = `
        <li><a href="/">Hem</a></li>
        <li><a href="/cv">Mitt CV</a></li>
        <li><button id="logout">Logga ut</button></li>
        `;
    } // ska jag lägga till else med vanlig meny här? 
}