import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./BattlePage.css"
import { getBattlesById, getTeamsById, getUserById } from "../managers/AuthManager"
import { getBattles, getSpecificUserBattlesResults } from "../managers/BattleManager"
import { getCompletedBattles } from "../managers/BattleManager"

export const BattleOpponentProfile = () => {
    const { opponentId } = useParams();
    const [specificTeams, setSpecificTeams] = useState([])
    const [specificUsers, setSpecificUsers] = useState([])
    const [userBattleResults, setUserBattleResults] = useState([])
    const moviePosterPath = "https://image.tmdb.org/t/p/w500";

    useEffect(
        () => {
            getTeamsById(opponentId)
                .then((data) => {
                    setSpecificTeams(data)
                })
        },
        [opponentId]
    )

    useEffect(
        () => {
            getUserById(opponentId)
                .then((data) => {
                    setSpecificUsers(data)
                })
        },
        [opponentId]
    )

    useEffect(
        () => {
            getCompletedBattles(opponentId)
                .then((data) => {
                    setUserBattleResults(data)
                })
        },
        [opponentId]
    )

    return <section className="user-details"> <div className="user-details_title"></div>
        {
            userBattleResults.forEach(
                (userBattleResult) => {
                    if (userBattleResult?.winner?.user?.id === specificUsers.id) {
                        specificUsers.user_wins++
                    }
                    if (userBattleResult?.loser?.user?.id === specificUsers.id) {
                        specificUsers.user_losses++
                    }
                }
            )
        }
        <div id="profile_card" className="card" style={{ border: '0' }}>
            <div id="opponent_avatar" class="avatar">
                <img src={specificUsers.profile_image} alt="Circle Image" class="img-raised rounded-circle img-fluid" />
            </div>
            <section key={`user--${specificUsers.id}`}>
                <div id="user_real_name">{specificUsers.full_name}</div>
                <div id="username">@{specificUsers?.user?.username}</div>
                <div id="user_record">Record: {specificUsers.user_wins}-{specificUsers.user_losses}</div>
            </section>

            <div id="moviesCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" id="movie_carousel">
                    {specificUsers?.favorite_movies?.map((movie, index) => (
                        <div key={`user--${movie.id}`} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                            <div id="movie_card" className="card" style={{ border: "0" }}>
                                <img
                                    id="movie_picture"
                                    src={moviePosterPath + movie.movie_picture}
                                    style={{ objectFit: "contain", width: "800px", height: "450px" }}
                                    className="card-img-top"
                                />
                                <div className="user_content">{movie.movie_title}</div>
                            </div>
                        </div>
                    ))}

                </div>
                <a className="carousel-control-prev" href="#moviesCarousel" role="button" data-slide="prev" style={{ color: 'black', zIndex: 1 }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#moviesCarousel" role="button" data-slide="next" style={{ color: 'black', zIndex: 1 }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="user_content">Favorite Movies
            </div>

            <div id="comicsCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" id="movie_carousel">
                    {specificUsers?.favorite_comics?.map((comic, index) => (
                        <div key={`user--${comic.id}`} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                            <div id="comic_card" className="card" style={{ border: "0" }}>
                                <img
                                    id="movie_picture"
                                    src={comic.comic_picture + "." + comic.comic_extension}
                                    style={{ objectFit: "contain", width: "800px", height: "450px" }}
                                    className="card-img-top"
                                />
                                <div className="user_content">{comic.comic_title}</div>
                            </div>
                        </div>
                    ))}


                </div>
                <a className="carousel-control-prev" href="#comicsCarousel" role="button" data-slide="prev" style={{ color: 'black', zIndex: 1 }}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#comicsCarousel" role="button" data-slide="next" style={{ color: 'black', zIndex: 1 }}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <div className="user_content">Favorite Comics
            </div>

            <div className="user_content_team_name">Team Name: {specificTeams.team_name} </div>
            <div className="card" style={{ border: '0' }} >
                <div>
                    {
                        specificTeams?.characters?.map(team => {
                            return <>
                                <img id="opponent_character_avatar" src={`${team.character_picture}.${team.character_extension}`} alt="" class="img-raised rounded-circle img-fluid" />
                            </>
                        }
                        )
                    }
                </div>
            </div>
        </div>
    </section >
}