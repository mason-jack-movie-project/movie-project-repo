function scrollLeft() {
    var left = document.querySelector(".scroll-mask");
    left.scrollBy(350, 0)
}
function scrollRight() {
    var right = document.querySelector(".scroll-mask");
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
    $('#scroll-cards').empty();
    document.getElementById('scroll-cards').innerHTML +=
        `<div class="smolcard">_</div>`
    document.getElementById('scroll-cards').innerHTML +=
        `<div class="smolcard">_</div>`
    document.getElementById('scroll-cards').innerHTML +=
        `<div class="smolcard">_</div>`
    //blank card^
    movieData.forEach((element, i) => {
        document.getElementById('scroll-cards').innerHTML +=
            `<div class="card">
            <p>Title: ${movieData[i].title}</p>
            <p>Year: ${movieData[i].year}</p>
            <p>Rating: ${movieData[i].rating}</p>
            <img width="90%" height="60%" src=${movieData[i].poster}>
            <button class="editButton" data-edit="${movieData.id}">Edit</button>
             <button class="removeButton" data-del="${movieData.id}">Remove</button>
            </div>`
    });
    document.getElementById('scroll-cards').innerHTML +=
        `<div class="smolcard">_</div>`
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

// $('#addMovieForm').submit((e) => {
//     let addMovieObj = {
//         title: $('#titleInput').val(),
//         genre: $('#genreInput').val(),
//         rating: $('#ratingInput').val(),
//         plot: $('#plotInput').val()
//     }
//     console.log('This is the movie log');
//     console.log(addMovieObj);
//
//
//     let postOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(addMovieObj)
//     }
//
//     fetch(moviesURL, postOptions).then(resp => resp.json()).then(getMovies);
//
// });
$('#addMovieForm').submit((e) => {
    e.preventDefault();
    // console.log('you clicked addmovie')

    let addMovie = {
        title: $("#titleInput").val(),
        genre: $("#genreInput").val(),
        rating: $("#ratingInput").val(),
        plot: $("#plotInput").val(),
        poster: `<img src="img/not-found-image.jpeg">`
    }
    console.log("this is the add movie log")
    console.log(addMovie)

    let postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addMovie)
    }
    // POST movie

    fetch(moviesURL, postOptions)
        .then(resp => resp.json())
        .then(moviePosters => {
            console.log(moviePosters);
            getMovies();
            printMovies();
        }).catch(error => console.log(error))

});

// async function addCard() {
//     const postOptions = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     }
//
//     fetch(`${moviesURL}`, postOptions)
//         // .then(getMovies);
//         .then(resp => resp.json())
//         .then(moviePosters => {
//             movieGlitch();
//         }).catch(error => console.log(error))
// }
// Add event listener to delete the card
// $(document.body).on("click", ".deleteMovieCard", function(){
//     // console.log($(this).attr("data-delete-card"))
//     deleteCard($(this).attr("data-delete-card"))};