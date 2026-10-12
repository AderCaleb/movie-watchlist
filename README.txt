https://github.com/AderCaleb/movie-watchlist.git

toggleWatched(index) will make the movie index (ex. if the index is 2 it will take from the third spot in the list) and do the opposite of the bool
ex. Movie 1, which is movie 2, is marked as being watched. Click the button and it now goes to being unwatched.

removeMovie(index) will go to that movies index and splice, remove, it.

The function saveMovies() will first try to store the movie in the loacalStorage. If it is successful it will be added to the watchlist.movies list and will stay there until it is removed. If not then the user will get an error.

The function loadMovies() will load all the saved movies from the localStorage, once it comes back as null it will stop. However, if something goes wrong it will create an empty watchlist.movies list index, which is null and will stop the function.

The function renderMovies() will render the saved movies in an unordered list format with the title of the movie being at the top and if it has been watched or not on the bottom. It is also were the buttons, remove and watched, live. It also hides the empty message if there are movies in the list.

The listener at the bottom when clicked will check if there is a title and genre in the text boxes and if there is it will push it to the movies list.

This was a fun asignment and now I can use this for myself if I have any movies I wish to watch later. Thanks!