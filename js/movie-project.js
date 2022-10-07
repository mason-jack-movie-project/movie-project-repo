

// ############################################ Variables #############################################################
/*
 Mason's Glitch link
 const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
*/

const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
let movieData = [];



let loader = document.getElementById("preloader");

// ############################################ Necessary Functions ####################################################

// Working Vanilla Function (with jQuery .empty() method)
function printMovies () {
    $('#scroll-cards').empty();

    document.getElementById('scroll-cards').innerHTML +=
        `<div class="smolcard">_</div>`
    movieData.forEach((element, i) => {

        document.getElementById('scroll-cards').innerHTML +=
            `<div data-movie-id="${element.id}" class="card">
            <img class="cardImg" src=${element.poster}>
            <p>Title: ${element.title}</p>
            <p>Year: ${element.year}</p>
            <p>Rating: ${element.rating}</p>
            <button data-bs-toggle="modal" data-bs-target="#modal-div" class="editButton" data-edit-card="${element.id}"><a href="#modal-div" data-bs-toggle="modal">Edit</a></button>
            <button class="removeButton" data-delete-card="${element.id}">X</button>
            </div>`

    }); // forEach end
    document.getElementById('scroll-cards').innerHTML +=
        `<div class="smolcard">_</div>`
}

// Initial Fetch request which calls printMovies() function
function getMovies () {

    fetch(moviesURL)
        .then(resp => resp.json())
        .then(data => {
            // movieData = JSON.parse(data);
            movieData = data;
            console.log(movieData);
            console.log(data)
            printMovies(); // called printMovies() which displays the movies based on data
            return data;

        });
    loader.style.display="none";
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

//Variable for option to edit
async function editMovie(movieID){
    getMovies().then(movies =>{
        for(let movie of movies){
            if(movie.id === parseInt(movieID)){

                $("#edit-title").attr("value", movie.title);
                $("#edit-rating").attr("value", movie.rating);
                $("#edit-release-date").attr("value", movie.year);
                $("#edit-cast").attr("value", movie.cast);
                $("#edit-plot").attr("value", movie.plot);
                $("#save-edits-button").attr("id", "added-edited-movie-button");
            }
        }
    });

    // Edit option attempt
    $(document.body).on("click", "#added-edited-movie-button", function(){
        let newMovie = {
            title:  $("#edit-title").val(),
            rating: $("#edit-rating").val(),
            year:   $("#edit-release-date").val(),
            cast: $("#edit-cast").val(),
            plot: $("#edit-plot").val()
        }
        const editOption = {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newMovie)
        }
        fetch(moviesURL + `/${movieID}`, editOption)
            .then(results => results.json())
            .then(data => {
                getMovies();
            });
    })
}