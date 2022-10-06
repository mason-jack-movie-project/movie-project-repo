

// ############################################ Variables #############################################################
/*
 Mason's Glitch
 const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
*/

const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
let movieData = [];


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
    movieData.forEach((element, i) => {

        document.getElementById('scroll-cards').innerHTML +=
            `<div class="card">
            <img class="cardImg" src=${element.poster}>
            <p>Title: ${element.title}</p>
            <p>Year: ${element.year}</p>
            <p>Rating: ${element.rating}</p>
            <button class="editButton" data-edit="${element.id}">Edit</button>
            <button class="removeButton" data-delete-card="${element.id}">X</button>
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

async function deleteCard(id) {
    const deleteOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`${moviesURL}/${id}`, deleteOptions)
        // .then(getMovies);
        .then(resp => resp.json())
        .then(moviePosters => {
            getMovies();
            printMovies();
        }).catch(error => console.log(error))
}
// Add event listener to delete the card
$(document).on("click", ".removeButton", function(){
    // console.log($(this).attr("data-delete-card"))
    deleteCard($(this).attr("data-delete-card"))
});

$('#addMovieForm').submit((e) => {
    e.preventDefault();
    // console.log('you clicked addmovie')

    let addMovie = {
        title: $("#titleInput").val(),
        year: $('#releaseDateInput').val(),
        genre: $("#genreInput").val(),
        rating: $("#ratingInput").val(),
        plot: $("#plotInput").val(),
        poster: `../img/not-found-image.jpeg`
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

        }).catch(error => console.log(error))

});

async function editCard(id) {
    const editOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    fetch(`${moviesURL}/${id}`, deleteOptions)
        // .then(getMovies);
        .then(resp => resp.json())
        .then(moviePosters => {
            getMovies();
            printMovies();
        }).catch(error => console.log(error))
}
// Add event listener to delete the card
$(document).on("click", ".removeButton", function(){
    // console.log($(this).attr("data-delete-card"))
    deleteCard($(this).attr("data-delete-card"))
});