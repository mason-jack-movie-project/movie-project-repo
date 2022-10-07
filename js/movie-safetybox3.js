

// ############################################ Variables #############################################################
/*
 Mason's Glitch
 const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
*/

const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
let movieData = [];



let loader = document.getElementById("preloader");
// document.addEventListener("", function() {
//     loader.style.display="none";
// ############################################ Necessary Functions ####################################################

// Need to make a function to select movie by id (or URL number??)
function findMovieId(id) {
    fetch(moviesURL + `/${id}`).then(resp => resp.json()).then(data => {
        console.log(data);
    });

}

async function editCard(id) {
    let editMovie = {
        title: $("#edit-title").val(),
        cast: $("#edit-cast").val(),
        genre: $("#edit-genre").val(),
        year: $("#edit-release-date").val(),
        rating: $("#edit-rating").val(),
        plot: $("#edit-plot").val(),
    }
    const patchOptions = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editMovie)
    }

    fetch(moviesURL + "/"+ id, patchOptions).then(getMovies);

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
            <button class="editButton" data-edit-card="${element.id}"><a href="#modal-div" data-bs-toggle="modal">Edit</a></button>
            <button class="removeButton" data-delete-card="${element.id}">X</button>
            </div>`

    }); // forEach end


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
    loader.style.display="none";
    $(document).on('click', '#save-edits-button', function (e){
        e.preventDefault();
        console.log('yo');
        editCard($(this).attr("data-edit-card"));
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


// POST
// Add Movie
$('#addMovieForm').submit((e) => {
    e.preventDefault();


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

//$('#insert-modal-here').append(`<form id="edit-movie-form" class="row g-3">
//             <div>
//               <h3>Edit Movie</h3>
//             </div>
//             <div class="col-md-6">
//
//               <label for="edit-title" class="form-label">Title: </label>
//               <input type="text" class="form-control" id="edit-title">
//             </div>
//             <div class="col-md-6">
//               <label for="edit-rating" class="form-label">Rating: </label>
//               <input type="text" class="form-control" id="edit-rating">
//             </div>
//             <div class="col-12">
//               <label for="edit-release-date" class="form-label">Release Date: </label>
//               <input type="text" class="form-control" id="edit-release-date" placeholder="Ex: '1996'">
//             </div>
//             <div class="col-12">
//               <label for="edit-cast" class="form-label">Cast: </label>
//               <input type="text" class="form-control" id="edit-cast">
//             </div>
//             <div class="col-md-6">
//               <label for="edit-plot" class="form-label">Plot: </label>
//               <input type="text" class="form-control" id="edit-plot">
//             </div>
//
//             <div class="col-md-4">
//               <label for="edit-genre" class="form-label">Genre </label>
//               <select id="edit-genre" class="form-select">
//
//                 <option>Sci-Fi</option>
//                 <option>Fantasy</option>
//                 <option>Comedy</option>
//                 <option>Thriller</option>
//                 <option>Horror</option>
//                 <option>Drama</option>
//               </select>
//             </div>
//
//
//
//           </form>`)