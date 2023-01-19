import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import "./MovieDetails.css"

export const MovieDetails = () => {
    const { id } = useParams();
    const [singleMovie, setSingleMovie] = useState({})
    let img_path = "https://image.tmdb.org/t/p/w500";

    useEffect(() => {
        const fetch = async () => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=a805a1ce4065c34d4f5f25ecb958aa83&append_to_response=videos`)
            setSingleMovie(res.data);
        }
        fetch();
    },
        [])
    return (
        <>
            <div id='movie'>
                <img src={img_path + singleMovie.backdrop_path} class="poster"></img>
                <div id='movie_title'>
                    {singleMovie.title}
                </div>
                <div id='movie_description'>
                    {singleMovie.overview}
                </div>
            </div>
            <div id='trailers_title'>Trailers</div>
            <div id="trailers" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {
                        singleMovie?.videos?.results?.slice(0, 5).map((item, index) => (
                            <div key={`user--${item.key}`} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                                <iframe src={`https://www.youtube.com/embed/${item.key}`} width={600} height={300} title="video" style={{ objectFit: 'contain' }} alt={singleMovie.title} />
                            </div>
                        ))
                    }
                </div>
                <a id='left_arrow' className="carousel-control-prev" href="#trailers" role="button" data-slide="prev" style={{ zIndex: 1, color: 'black' }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </a>
                <a id="right_arrow" className="carousel-control-next" href="#trailers" role="button" data-slide="next" style={{ zIndex: 1, color: 'black' }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </a>
            </div>
        </>
    )
}