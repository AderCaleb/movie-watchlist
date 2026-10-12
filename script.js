const form = document.getElementById("movie-form");
const titleInput = document.getElementById("movie-title");
const genreSelect = document.getElementById("movie-genre");
const message = document.getElementById("form-message");
const movieList = document.getElementById("movie-list");
const emptyMessage = document.getElementById("empty-message");

const watchlist = {
    movies: [],
    toggleWatched(index) {
        this.movies[index].watched = !this.movies[index].watched;
    },
    removeMovie(index) {
        // This might work?
        this.movies.slice(index, 1);
    }
};

function saveMovies() {
    // Step 6
    localStorage.setItem("movies", JSON.stringify(watchlist.movies));
}

function loadMovies() {
    // Maybe done right?
    const saved = localStorage.getItem("movies")
    if (saved !== null) {
        try {
            watchlist.movies = JSON.parse(saved)
        } catch (error) {
            console.log("Movies can't be loaded.")
        }
    }
}

function renderMovies() {
    movieList.replaceChild();

    watchlist.movies.forEach((movie, index) => {
        const card = document.createElement("li");
        const title = document.createElement("h3");
        title.textContent = movie.title;

        const details = document.createElement("p");
        details.textContent = `${movie.genre} - ${movie.watched ? "Watched" : "Not Watched"}`;

        const toggleButton = document.createElement("button");
        toggleButton.type = "button";
        toggleButton.textContent = movie.watched ? "Mark Unwatched" : "Mark Watched";
        toggleButton.addEventListener("click", () => {
            watchlist.toggleWatched(index);
            saveMovies();
            renderMovies();
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            watchlist.removeMovie(index);
            saveMovies();
            renderMovies();
        });

        card.append(title, details, toggleButton, removeButton);
        movieList.append(card);
        if (watchlist.movies.length === 0) {
            emptyMessage.textContent = "Your watchlist is empty. Add a movie to get started.";
            // If stuck remove
            return;
        }
        else {
            emptyMessage.textContent = "";
        }
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = titleInput.value.trim();
    const genre = genreSelect.value;

    if (title == "") {
        title.textContent = "Enter a movie title.";
        return;
    }

    if (genre == "") {
        genre.textContent = "Enter a movie genre.";
        return;
    }

    watchlist.movies.push({ title: title, genre: genre, watched:false });

    saveMovies();
    renderMovies();
    title.textContent = "";
    genre.textContent = "";
});

loadMovies();
renderMovies();