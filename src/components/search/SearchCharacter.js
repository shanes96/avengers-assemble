import React, { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import "./SearchCharacter.css"

export const CharacterProfilePage = () => {
    const location = useLocation();
    const navigate = useNavigate()

    // Parse the query string to get the query parameter
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query');
    // const { query } = useParams();

    // State variables to store the character's information and search query
    const [character, setCharacter] = useState({});
    // const [query, setQuery] = useState('');

    // Function to handle the search form submission
    const fetchCharacterData = async () => {

        // Reset the character data
        setCharacter({});
        // Make a request to the Marvel API to search for the character
        const marvelResponse = await axios.get(
            `https://gateway.marvel.com/v1/public/characters?name=${query}&ts=1&apikey=9410888bec125d11c09be9b3037e4524&hash=60935f7b6e667cce8caedde91c7afe95`
        );

        // Extract the character's information from the response
        const characterData = marvelResponse.data.data.results[0];

        console.log("Marvel API response:", marvelResponse);

        // Make a request to the TMDb API to search for movies featuring the character
        const movieDataBaseResponse = await axios.get(
            `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=a805a1ce4065c34d4f5f25ecb958aa83&with_companies=420&with_keywords=179440
            `
        );

        // Extract the movie data from the response
        const movies = movieDataBaseResponse.data.results;

        console.log(movieDataBaseResponse)

        // Set the character data in state
        setCharacter({
            name: characterData.name,
            series: characterData.series,
            stories: characterData.stories,
            appearance: characterData.comics,
            comicLink: characterData.urls,
            events: characterData.events,
            description: characterData.description,
            image: characterData.thumbnail.path,
            extension: characterData.thumbnail.extension,
            comics: characterData.comics.items,
            movies: movies,
        });

    }
    useEffect(() => {
        fetchCharacterData();
    }, [query]);

    return (
        <div id="profile_card" className="card" style={{ border: '0' }}>
            {character && (
                <div>
                    <h1 id='character_name'>{character.name}</h1>
                    <div id="avatar" class="avatar">
                        <img src={`${character.image}.${character.extension}`} alt="Circle Image" class="img-raised rounded-circle img-fluid" />
                    </div>
                    <div class="additional-info">
                        <div class="circle circle--red">
                            <span>{character?.series?.available}</span>
                            <span>Series</span>
                        </div>
                        <div class="circle circle--red">
                            <span>{character?.stories?.available}</span>
                            <span>Stories</span>
                        </div>
                        <div class="circle circle--red">
                            <span>{character?.events?.available}</span>
                            <span>Events</span>
                        </div>
                        <div class="circle circle--red">
                            <span>{character?.appearance?.available}</span>
                            <span>Comics</span>
                        </div>
                        <div>
                            <button 
                            class="btn btn-danger"
                            id='delete_team_button' onClick={() => window.open(character?.comicLink[2].url, '_blank')}>Browse All Comics</button>
                        </div>
                    </div>
                    <p id='description' class="p-3 mb-2 bg-danger text-white">{character.description}</p>
                    <div id="characterComicCarousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner" >
                            {character.comics?.map((comic, index) => (
                                <div key={`user--${comic.resourceURI}`} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                                    <div className="card" style={{ border: '0' }} >
                                        <img id="movie_picture" src={"https://i.ebayimg.com/images/g/8DIAAOSwjuFbih6G/s-l500.jpg"} style={{ objectFit: 'contain', width: '800px', height: '450px' }} className="card-img-top" alt={comic.comic_title} />
                                        <h5 id="comic_name">{comic.name}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#characterComicCarousel" role="button" data-slide="prev" style={{ zIndex: 1, color: 'black' }}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#characterComicCarousel" role="button" data-slide="next" style={{ zIndex: 1, color: 'black' }}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                    <div id="characterMovieCarousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner" >
                            {character.movies?.map((movie, index) => (
                                <div key={`user--${movie.id}`} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                                    <div className="card" style={{ border: '0' }} >
                                        <img id="movie_picture" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} style={{ objectFit: 'contain', width: '800px', height: '450px' }} className="card-img-top" alt={movie.title} />
                                        <h5 id="comic_name">{movie.title}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#characterMovieCarousel" role="button" data-slide="prev" style={{ zIndex: 1, color: 'black' }}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#characterMovieCarousel" role="button" data-slide="next" style={{ zIndex: 1, color: 'black' }}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}

