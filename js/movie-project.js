// Test
// const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
const moviesURL = 'https://cuddly-sage-cobra.glitch.me/movies';
// fetch('https://assorted-sepia-mammal.glitch.me/movies').then

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

const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
let movieData = [];

const patchOptions = {
    method: 'POST',
    body: JSON.stringify(modification)
}

//const bookToPost = {
//     title: 'Eleanor of Aquitaine',
//     author: {
//         firstName: 'Ralph',
//         lastName: 'Turner'
//     }
// }

//const deleteOptions = {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }



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

// Need to make a function to select movie by id (or URL number??)

function findMovieId(id) {
    fetch(moviesURL + `/${id}`).then(resp => resp.json()).then(data => console.log(data));

}

//const bookToPost = {
//     title: 'Eleanor of Aquitaine',
//     author: {
//         firstName: 'Ralph',
//         lastName: 'Turner'
//     }
// }

const movieToPost = {
    //"title": "",
    //         "director": "",
    //         "year": "",
    //         "genre": "",
    //         "actors": "",
    //         "plot": "",
    //         "rating": "",
    //         "poster": "",
    //         "id": ''
}

// function addMovie (){
//     // fetch(booksURL, postOptions).then(getBooks);
//     fetch(moviesURL, postOptions).then(getMovies)
// }

function editMovie(element){
    fetch(moviesURL, patchOptions)
}