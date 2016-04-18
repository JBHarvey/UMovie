# Using the program

There are two ways to launch the project:

1. To launch the program, go to `UMovie/index.html` under WebStorm. *Make sure that the project is named UMovie in WebStorm. If the project is not named UMovie, it is possible that the front end will not work correctly.*
2. You can also run the following command in your terminal if you have *NodeJS* installed:

```shell
node index.js
```

and then you can open *Chrome* and type the following address: 

```shell
http://localhost:${PORT}/UMovie/`
```

where `${PORT}` is the port specified by the environment variable `PORT` defined in your system. If this variable is not defined, the program will default to port 3000.

It is also possible to use the hosted version of the website, available at a Heroku domain.
[Here](http://umovie-team01-h2016.herokuapp.com/UMovie/) is the link to access this hosted version. All the features implemented are also working in the pushed version on Heroku.

## Buttons

To access the different pages of the site, please refer to the navigation bar on the top of the page. The movies, actors, watchlists and TV series pages are only available while in connected mode.

## User

It is possible to create an account using a valid email address with a new password and your name. It is also possible to find and follow different users to access their actual watchlists. On the user page, it is also possible to see, modify, create and delete their own watchlists.

## Helpful links

Here are the different links that you can reach within our website:

- `UMovie/index.html#movies`: Links to the page of the movies collection. 
- `UMovie/index.html#tvShows`: Link to the page of the TV shows collection.
- `UMovie/index.html#actors`: Links to the page of the actors collection.
- `UMovie/index.html#watchlists`: While in connected mode, links to the user watchlist page.
- `UMovie/index.html#user`: While in connected mode, links to the user account page.

Authentication is essential in order to access any content of the application. Otherwise, the only page you can see is the login page (index.html).

## Search bar

The included search bar allows a connected user to search throughout the content of the whole application, for instance the different movies, tv shows, actors and users. The different genres can be changed in the menu of the movies result and the tvshows results. When a category is chosen, a research will be done for all the items in this genre available.
If none of the 4 options is selected, it will search for movies and tvshows by default.

##Searching for actor

If you make a research to find an Actor, there might be actors without picture and/or description. The reason to that is that we are getting some information from TheMovieDataBase and Imdb and it doesn't contain every actor from the UMovie database.
''Bonjour, veuillez l'expliquer dans votre document de remise,  mais pour moi c'est acceptable. '' -Vincent Séguin
