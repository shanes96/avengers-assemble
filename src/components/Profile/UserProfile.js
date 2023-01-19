import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./UserProfile.css"
import { deleteTeam, getSpecificUserTeamInfo, getSpecificUserInfo, getSpecificUserComics } from "../managers/AuthManager"
import { getSpecificUserMovieInfo } from "../managers/ProfileManager"
import { getSpecificUserBattlesResults } from "../managers/BattleManager"

export const UserProfile = () => {
    const navigate = useNavigate()
    const [specificTeams, setSpecificTeams] = useState([])
    const [specificUsers, setSpecificUsers] = useState([])
    const [specificComics, setSpecificComics] = useState([])
    const [specificMovies, setSpecificMovies] = useState([])
    const [userBattleResults, setUserBattleResults] = useState([])

    useEffect(
        () => {
            getSpecificUserMovieInfo()
                .then((data) => {
                    setSpecificMovies(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getSpecificUserBattlesResults()
                .then((data) => {
                    setUserBattleResults(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getSpecificUserTeamInfo()
                .then((data) => {
                    setSpecificTeams(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getSpecificUserComics()
                .then((data) => {
                    setSpecificComics(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getSpecificUserInfo()
                .then((data) => {
                    setSpecificUsers(data)
                })
        },
        []
    )

    return <section className="user-details"> <div className="user-details_title"></div>
        <div id="profile_card" className="card" style={{ border: '0' }}>
            {
                specificUsers.map((specificUser) => {
                    userBattleResults.forEach(
                        (userBattleResult) => {
                            if (userBattleResult?.winner?.user?.id === specificUser.id) {
                                specificUser.user_wins++
                            }
                            if (userBattleResult?.loser?.user?.id === specificUser.id) {
                                specificUser.user_losses++
                            }
                        }
                    )

                    return <section key={`user--${specificUser.id}`}>
                        <div id="avatar" class="avatar">
                            <img src={specificUser.profile_image} alt="Circle Image" class="img-raised rounded-circle img-fluid" />
                        </div>
                        <div id="user_real_name">{specificUser.full_name}</div>
                        <div id="username">@{specificUser?.user?.username}</div>
                        <div id="user_record">Record: {specificUser.user_wins}-{specificUser.user_losses}</div>
                    </section>
                })
            }

            <div id="moviesCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" id="movie_carousel">
                    {specificMovies.map((specificMovie, index) => (
                        <div key={`user--${specificMovie.id}`} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                            <div id="movie_card" className="card" style={{ border: '0' }}>
                                <img id="movie_picture" src={`https://image.tmdb.org/t/p/w500${specificMovie.movie_picture}`} style={{ objectFit: 'contain', width: '800px', height: '450px' }} className="card-img-top" alt={specificMovie.movie_title} />
                                <div className="user_content">{specificMovie.movie_title}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#moviesCarousel" role="button" data-slide="prev" style={{ color: 'black', zIndex: 1 }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#moviesCarousel" role="button" data-slide="next" style={{ color: 'black', zIndex: 1, }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="user_content">Favorite Movies</div>


            <div id="comicCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" >
                    {specificComics.map((specificComic, index) => (
                        <div key={`user--${specificComic.id}`} className={index === 0 ? 'carousel-item active' : 'carousel-item'}>
                            <div className="card" style={{ border: '0' }} >
                                <img id="movie_picture" src={`${specificComic.comic_picture}.${specificComic.comic_extension}`} style={{ objectFit: 'contain', width: '800px', height: '450px' }} className="card-img-top" alt={specificComic.comic_title} />
                                <div className="user_content">{specificComic.comic_title}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <a className="carousel-control-prev" href="#comicCarousel" role="button" data-slide="prev" style={{ color: 'black' }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#comicCarousel" role="button" data-slide="next" style={{ color: 'black' }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="user_content">Favorite Comics</div>

            {specificTeams.map((specificTeam, index) => (
                <div key={`user--${specificTeam.id}`}>
                    <Link to={`/teams/${specificTeam.id}`}>Team Name: {specificTeam.team_name}</Link>
                    <button
                        id="delete_team_button"
                        class="btn btn-danger"
                        onClick={() => {
                            deleteTeam(specificTeam.id)
                                .then(() => {
                                    window.location.reload(false);
                                })
                        }}
                    >Delete Team</button>
                    <button id="delete_team_button" class="btn btn-danger"
                        onClick={() => navigate(`/createTeam`)}
                    >Create a New Team!</button>

                    <div className="card" style={{ border: '0' }} >
                        <div>
                            {specificTeam.characters.map((character) => (
                                <img id="character_avatar" src={`${character.character_picture}.${character.character_extension}`} alt={character.character_name} class="img-raised rounded-circle img-fluid" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </section>
}