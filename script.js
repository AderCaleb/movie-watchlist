

const form = document.getElementById("movie-form");
const titleInput = document.getElementById("movie-title");
const genreSelect = document.getElementById("movie-genre");
const message = document.getElementById("form-message");
const movieList = document.getElementById("movie-list");
const emptyMessage = document.getElementById("empty-message");

// Watchlist object
const watchlist = {
    movies: [],

    // Change watched status
    toggleWatched(index) {
        this.movies[index].watched = !this.movies[index].watched;
    },

    // Remove a movie
    removeMovie(index) {
        this.movies.splice(index, 1);
    }
};

// Save the movie array to localStorage
function saveMovies() {
    try {
        localStorage.setItem("movies", JSON.stringify(watchlist.movies));
    } catch (error) {
        message.textContent = "Unable to save your watchlist.";
    }
}

// Load movies from localStorage
function loadMovies() {
    const saved = localStorage.getItem("movies");

    if (saved === null) {
        return;
    }

    try {
        watchlist.movies = JSON.parse(saved);
    } catch (error) {
        watchlist.movies = [];
    }
}

// Display movies
function renderMovies() {
    movieList.replaceChildren();

    watchlist.movies.forEach((movie, index) => {
        const card = document.createElement("li");
        card.className = "movie-item";

        const title = document.createElement("h3");
        title.textContent = movie.title;

        const details = document.createElement("p");
        details.textContent = `${movie.genre} · ${movie.watched ? "Watched" : "Not watched"}`;

        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.className = "status-button";

        toggleButton.textContent = movie.watched ? "Mark Unwatched" : "Mark Watched";

        toggleButton.addEventListener("click", () => {
            watchlist.toggleWatched(index);

            saveMovies();
            renderMovies();
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "remove-button";
        removeButton.textContent = "Remove";

        removeButton.addEventListener("click", () => {
            watchlist.removeMovie(index);

            saveMovies();
            renderMovies();
        });

        const actions = document.createElement("div");
        actions.className = "movie-actions";
        actions.append(toggleButton, removeButton);

        const movieDetails = document.createElement("div");
        movieDetails.className = "movie-details";
        movieDetails.append(title, details);

        card.append(movieDetails, actions);
        movieList.append(card);
    });

    // Show the empty-list message when there are no movies.
    emptyMessage.hidden = watchlist.movies.length > 0;
}

// Add movies from the form
form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const genre = genreSelect.value;

    if (title === "") {
        message.textContent = "Enter a movie title";
        return;
    }

    if (genre === "") {
        message.textContent = "Choose a genre";
        return;
    }

    watchlist.movies.push({ title: title, genre: genre, watched: false });

    saveMovies();
    renderMovies();

    message.textContent = "";
    titleInput.value = "";
});

// Load and display movies when the page opens.
loadMovies();
renderMovies();