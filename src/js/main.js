"use strict";
document.addEventListener("DOMContentLoaded", ()=>{
    //formulär
    const form = document.getElementById("form");
    //cvDiv
    let cvDiv = document.getElementById("cvDiv");

    if(cvDiv) {
        getCV(cvDiv);
    }


});

async function getCV(cvDiv){
    //måste lägga till att hämta och skicka med token
    try{
        const response = await fetch('http://localhost:3000/work');
        const result = await response.json();
        result.forEach(job => {
            cvDiv.innerHTML +=`<p>${job.companyname}</p>`;
        });

    }catch(error){
        console.log(error);
    }
}