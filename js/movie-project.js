// Test

// fetch('https://assorted-sepia-mammal.glitch.me/movies').then

const moviesURL = 'https://assorted-sepia-mammal.glitch.me/movies';
let movieData = [];


// This is the request to the API to get Movie data
function getMovies () {

    fetch(moviesURL)
        .then(resp => resp.json())
            .then(data => {
            movieData = data;
            console.log(movieData);
            return movieData;
        });

}

//function printWeather(data) {
//         $( "#forecast-cards-container" ).empty(); // This will clear the cards before you put a new location
//         data.list.forEach((forecast, i) => {
//             // console.log(data);
//             if (i % 8 === 0) {
//                 $(`#forecast-cards-container`).append(`
//                 <div class="card col-lg-2 forecast-card">
//                     <p class="card-header"> Date: ${data.list[i].dt_txt.split(' ')[0]}</p>
// <!--                    <hr class="stretchDiv">-->
//                     <p>Temperature: ${data.list[i].main.temp}&#8457</p>
//                     <div class="wrapper-image">
//                         <img src="http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png">
//                     </div>
//                     <p>Description: ${data.list[i].weather[0].description}</p>
//                     <hr class="stretchDiv">
//                     <p>Humidity: ${data.list[i].main.humidity}</p>
//                     <hr class="stretchDiv">
//                     <p>Wind Speed: ${data.list[i].wind.speed}</p>
//                     <hr class="stretchDiv">
//                     <p>Pressure: ${data.list[i].main.pressure}</p>
//                 </div>`);
//             }
//         });
//     }

// This will be the function to print movie data to HTML
// getMovies();
// function printMovies () {
//     fetch(moviesURL).then(
//         document.getElementById('test').innerHTML =
//         `
//             <div class="card">Test again</div>
//
//         `
//     );
//
//     // $('body').append(`
//     //     <div><p>potato</p></div>
//     //
//     //     <div class="card">
//     //     </div>`);
//
//         // document.getElementsByTagName('body').text = 'potato';
// }

// function printMovies () {
//     fetch(moviesURL).then(resp => resp.json).then(data => console.log(data))
//         .then(document.getElementById('test').innerHTML =
//         `
//             <div class="card">
//             <p>Test Again</p>
//
//             </div>
//         `);
// }

function printMovies () {
    // fetch(moviesURL).then(resp => resp.json).then(data => {
    // getMovies().then(
    // console.log(data);
    document.getElementById('test').innerHTML =
        `<div class="card">
            <p>Test Again</p>
            <p>Title: ${movieData[0].title}</p>
            </div>`

// })
}