let base_url = "https://api.jikan.moe/v3";

//search function
function searchAnime(event){

    event.preventDefault();

    let form = new FormData(this);
    let query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(displaySearchResults)
    .catch(err=>console.warn(err.message));
}

function displaySearchResults(data){

    let searchResults = document.getElementById('result');
    document.getElementById("heading").innerHTML = " ";

        searchResults.innerHTML = Object.keys(data.results)
        .map(key=>{
        var anime = data.results[key]
            return `
            <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator" src="${anime.image_url}">
                </div>
                <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">${anime.title}<i class="material-icons right">more_vert</i></span>
                    <p>${anime.synopsis}</p>
                </div>
                <div class="card-reveal">
                <span class="card-title grey-text text-darken-4">More Info<i class="material-icons right">close</i></span>
                <p>Number of episodes: ${anime.episodes}<br>
                <p>Anime type: ${anime.type}

                </div>
            </div>                
                `
            });

}

function pageLoaded(){
    let form = document.getElementById('search_form');
    form.addEventListener("submit", searchAnime);
}


window.addEventListener("load", pageLoaded);


//Spring 2020
async function getTopAnime(url) {

    try{
        let response = await fetch(url);
        let result = await response.json();
        displayTopAnime(result);
     }catch(e){
         console.log(e);
     }
}

getTopAnime("https://api.jikan.moe/v3/top/anime/1/airing")



function displayTopAnime(data) {

        let topResults = document.getElementById('result');
        document.getElementById("heading").innerHTML = "Airing Now";

        topResults.innerHTML = Object.keys(data.top)

        .map(key=>{
            var anime = data.top[key]
        return `
             <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${anime.image_url}">
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">${anime.title}<i class="material-icons right">more_vert</i></span>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">More Info<i class="material-icons right">close</i></span>
          <p>Number of episodes: ${anime.episodes}<br>
          Start date: ${anime.start_date}</p>
        </div>
      </div>`;})
}

//Featured Anime
function getFeaturedAnime(event){

    event.preventDefault();


    fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
    .then(res=>res.json())
    .then(displayFeaturedAnime)
    .catch(err=>console.warn(err.message));
}

let aLink = document.querySelector("#aLink")
aLink.addEventListener("click");

function displayFeaturedAnime(data) {

    let topResults = document.getElementById('result');
    document.getElementById("heading").innerHTML = "Featured";

    topResults.innerHTML = Object.keys(data.top)

    .map(key=>{
        var anime = data.top[key]
    return `
         <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator" src="${anime.image_url}">
    </div>
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">${anime.title}<i class="material-icons right">more_vert</i></span>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">More Info<i class="material-icons right">close</i></span>
      <p>Number of episodes: ${anime.episodes}<br>
      Start date: ${anime.start_date}</p>
    </div>
  </div>`;})
}