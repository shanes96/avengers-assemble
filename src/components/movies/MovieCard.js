import React from 'react'
import { useNavigate } from 'react-router-dom'
import { addMovie, addMovieForUser } from '../managers/MovieManager'

export const MovieCard = ({ data }) => {
    console.log(data)
    let navigate = useNavigate();
    const movieInfo = (parsedResponse) => {
        const MovieAPI = {
            movie: parsedResponse.id,
        }
        addMovieForUser(MovieAPI)
    }
    
    let img_path = "https://image.tmdb.org/t/p/w500";

    return (
        <>
            {
                (data) ? (
                    data.map(item => {
                        return (
                            <div id='movie_card' className="card" key={item.id}>
                                <img id="poster" src={img_path + item.poster_path} className="poster"></img>
                                <div id="movie_card_title"className="title">
                                    <h3>{item.title}</h3>
                                </div>
                                <div className='card_button_container'>
                                <button
                                id='movie_button'
                                class="btn btn-secondary"
                                    type="submit"
                                    onClick={(evt) => {
                                        evt.preventDefault()
                                        const newMovie = {
                                            movie_id: item.id,
                                            movie_title: item.title,
                                            movie_picture: item.poster_path
                                        }
                                        addMovie(newMovie).then(parsedResponse => { movieInfo(parsedResponse) })
                                            .then(() => {
                                                alert("This movie has been added to your favorite movies list on your profile!")

                                            })
                                    }}
                                >
                                    Add To Favorites
                                </button>
                                <button id="movie_button" class="btn btn-secondary" onClick={() => navigate(`/${item.id}/movieInfo`)}>Learn More</button>
                            </div>
                            </div>
                        )
                    })
                )
                    : ""
            }
        </>
    )
}