const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
let movieData = [];
let userDirectorInput = document.querySelector('#favMovie-Director');

// Button variable
let directorSubmitButton = document.getElementById('director-submit');
// Button variable function (for click)
directorSubmitButton.addEventListener('click', function (e){
    e.preventDefault();
    console.log(userDirectorInput.value);
    modification = {
        director: userDirectorInput.value
    }
});

let modification = {

    "title": "",
    "director": "",
    "year": "",
    "genre": "",
    "actors": "",
    "plot": "",
    "rating": "",
    "poster": "",
    "id": ''
}



const patchOptions = {
    method: 'POST',
    body: JSON.stringify(modification)
}


// Fetch request. Calls the PrintMovies function to use the data in the fetch request and print it accordingly
function getMovies () {

    fetch(moviesURL)
        .then(resp => resp.json())
        .then(data => {
            // movieData = JSON.parse(data);
            movieData = data;
            console.log(movieData);
            printMovies();
            return movieData;
        });

}

// Working Vanilla Function (with jQuery .empty() method)
function printMovies () {
    $('#movieContainer').empty();
    movieData.forEach((element, i) => {

        document.getElementById('movieContainer').innerHTML +=
            `<div class="card">
            <p>Test Again</p>
            <p>Title: ${movieData[i].title}</p>
            <p>Year: ${movieData[i].year}</p>
            <img width="90%" height="60%" src=${movieData[i].poster}>
            </div>`
    });
}


function findMovieId(id) {
    fetch(moviesURL + `/${id}`).then(resp => resp.json()).then(data => console.log(data));

}

function editMovie(element){
    fetch(moviesURL, patchOptions)
}