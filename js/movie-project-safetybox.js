function scrollLeft() {
    var left = document.querySelector(".scroll-images");
    left.scrollBy(350, 0)
}
function scrollRight() {
    var right = document.querySelector(".scroll-images");
    right.scrollBy(-350, 0)
}
// const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
const moviesURL = 'https://cuddly-sage-cobra.glitch.me/movies';
// fetch('https://assorted-sepia-mammal.glitch.me/movies').then


// ############################################ Variables #############################################################
/*
 Mason's Glitch
 const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
*/

// const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
let movieData = [];

// let movieInput = document.getElementById('movieInput');
// let directorInput = document.querySelector('#directorInput')
// let submitButton = document.querySelector('#submitButton');

// movieInput.change = function (){
//     console.log(movieInput.value);
// }
//
// submitButton.addEventListener('click', function (e){
//     e.preventDefault();
//     // console.log(movieInput.value);
//     console.log(directorInput.value);
//     console.log(movieInput.value)
// });


// ############################################ Necessary Functions ####################################################

// Need to make a function to select movie by id (or URL number??)
function findMovieId(id) {
    fetch(moviesURL + `/${id}`).then(resp => resp.json()).then(data => {
        console.log(data);
    });

}

// Working Vanilla Function (with jQuery .empty() method)
function printMovies () {
    $('#movieContainer').empty();
    movieData.forEach((element, i) => {

        document.getElementById('movieContainer').innerHTML +=
            `<div class="card">
            <p>Title: ${movieData[i].title}</p>
            <p>Year: ${movieData[i].year}</p>
            <p>Rating: ${movieData[i].rating}</p>
            <img width="90%" height="60%" src=${movieData[i].poster}>
            <button class="editButton">Edit</button>
             <button class="removeButton">Remove</button>
            </div>`
    });
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
