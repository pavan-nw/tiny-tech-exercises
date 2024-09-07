// This is where you can add JavaScript to make your webpage interactive.

// Here's a simple example:

window.onload = function() {
    console.log('Welcome to NewtonBox! Happy coding!');
    registerScrollListener();
}

let page = 1;
const maxPages = 100;

fetchCats();
page++;
fetchCats();

async function fetchCats() {
    try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=20&page=${page}`);
        const jsonData = await response.json();
        // console.log(jsonData);
        displayCats(jsonData);
    }
    catch(e) {
        console.error(e);
        document.getElementById("container").innerHTML = "";
        document.getElementById("error-container").innerHTML = "Something went wrong, please reload.";
    }
}

function displayCats(catData) {
    const htmlCode = catData.map(cat => {
        return `<div class="gallery-item">
            <img src=${cat.url} width="280px" height="280px" alt="${cat.id}" />
        </div>`
    }).join("");
    const oldInnerHtml = document.getElementById("gallery").innerHTML 
    document.getElementById("gallery").innerHTML = oldInnerHtml + htmlCode;
}

function registerScrollListener() {
    window.addEventListener("scroll", () => {
        console.log("Scrolling..")
        console.log("window.innerHeight: " + window.innerHeight)
        console.log("window.scrollY: " + window.scrollY)
        console.log("document.body.offsetHeight: " + document.body.offsetHeight)
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            page++;
            fetchCats()
        }
    })
}

async function fetchCatFact() {
 const response = await fetch(`https://meowfacts.herokuapp.com/`);
 const jsonData = await response.json();
 document.getElementById("cat-fact").innerHTML = jsonData.data[0]; 
}

fetchCatFact();

setInterval(fetchCatFact, 3000);
