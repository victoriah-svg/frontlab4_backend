"use strict";

/* Hamburgermenyfunktion */
document.addEventListener("DOMContentLoaded", ()=>{
     const hamburger= document.getElementById("hamburger");
            hamburger.addEventListener("click", ()=>{
                const nav = document.getElementById("headerNav");
                console.log("du klickade hamburger");
                if(nav.className ==="topnav") {
                    nav.className += " responsive";
                } else {
                    nav.className = "topnav";
                }
            });
            
});