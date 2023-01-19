import { getBattles, addVote, getSpecificUserBattlesResults, getCompletedBattles,} from "../managers/BattleManager"
import { useEffect, useState } from "react"
import "./BattlePage.css"
import { getTeams } from "../managers/AuthManager"
import { Link,useNavigate } from "react-router-dom"
import { getSpecificUserBattles } from "../managers/BattleManager"

export const BattlePage = () => {
    const [allBattles, setAllBattles] = useState([])
    const [allTeams, setAllTeams] = useState([])
    const navigate = useNavigate()
    const [completedBattlesClicked, setCompletedBattlesClicked] = useState(false);
    const avengerUser = localStorage.getItem("user")
    const avengerUserObject = JSON.parse(avengerUser)

    const voteInfo = (parsedResponse) => {
        const VoteAPI = {
            vote: parsedResponse.id,
        }
        window.location.reload(false)
            (VoteAPI)
    }

    useEffect(
        () => {
            getBattles()
                .then((data) => {
                    setAllBattles(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getTeams()
                .then((data) => {
                    setAllTeams(data)
                })
        },
        []
    )

    return <>
        <div className="battle_buttons">
            <button class="btn btn-dark" id="single_battle_button"
                onClick={() => navigate(`/createBattle`)}
            >Create a New Battle!</button>

            <button class="btn btn-dark" id="single_battle_button" onClick={(evt) => {
                evt.preventDefault();
                getBattles()
                    .then(data => setAllBattles(data))
                window.location.reload()
            }}>
                All Battles
            </button>

            <button class="btn btn-dark" id="single_battle_button" onClick={(evt) => {
                evt.preventDefault();
                getSpecificUserBattles()
                    .then(data => setAllBattles(data))
            }}>
                My Current Battles
            </button>

            <button class="btn btn-dark" id="single_battle_button" onClick={(evt) => {
                evt.preventDefault();
                getCompletedBattles()
                    .then(data => setAllBattles(data))
            }}>
                Completed Battles
            </button>

            <button class="btn btn-dark" id="single_battle_button" onClick={(evt) => {

                evt.preventDefault();
                getSpecificUserBattlesResults()
                    .then(data => setAllBattles(data))
                setCompletedBattlesClicked(true);
            }}>
                My Completed Battles
            </button>
        </div>
        {
            allBattles.length === 0 ? (
                <div> No Battles Right Now Solider Check Back Later!</div>
            ) : (
                allBattles.map((battle) => {
                    return <section key={`battle--${battle.id}`}>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <section key={`battle--${battle.id}`}>
                                            <h4 className="">
                                                <Link to={`/battles/${battle.team_1.user.id}/opponentProfile`}>
                                                    {battle.team_1.team_name}
                                                </Link>
                                            </h4>
                                            <h5 className="challenger">Challenger</h5>
                                            <div class="image-container">
                                                {battle?.team_1?.characters.map((team) => {
                                                    return (
                                                        <>
                                                            <img
                                                                src={`${team.character_picture}.${team.character_extension}`} alt="Circle Image" class="img-raised rounded-circle img-fluid"
                                                            />
                                                        </>
                                                    );
                                                })}
                                            </div>
                                            <div className="vote_counter">Number of Votes: {battle.number_of_votes_team_1}</div>
                                            {allTeams.map((team) => {
                                                if (team.id === battle.team_1?.id) {
                                                    console.log(avengerUserObject?.id);
                                                    if (
                                                        avengerUserObject?.id !== battle?.team_1?.user?.id &&
                                                        avengerUserObject?.id !== battle.team_2?.user?.id
                                                    ) {
                                                        return (
                                                            <>
                                                                {battle.winner === null &&
                                                                    battle.team_2?.id != null
                                                                    ? (
                                                                    <button
                                                                        type="submit"
                                                                        class="btn btn-danger"
                                                                        id="team_one_button"
                                                                        onClick={(evt) => {
                                                                            evt.preventDefault();
                                                                            const newVote = {
                                                                                user: battle.team_1?.user.id,
                                                                                battle: battle.id,
                                                                                user_team_voted_for: battle.team_1?.id,
                                                                            };
                                                                            addVote(newVote).then((parsedResponse) => {
                                                                                voteInfo(parsedResponse);
                                                                            }
                                                                            );
                                                                        }}
                                                                    >
                                                                        Vote For This Team
                                                                    </button>
                                                                ) : null}
                                                            </>
                                                        );
                                                    }
                                                }
                                            })}
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="card">
                                    <div class="card-body">
                                        <h4 className="">
                                            <Link to={`/battles/${battle.team_2?.user?.id}/opponentProfile`}>
                                                {battle.team_2?.team_name}
                                            </Link>
                                        </h4>
                                        <h5 className="challenged_opponent">Challenged Opponent: @{battle.user_being_challenged.user.username}</h5>
                                        <div class="image-container">
                                            {battle?.team_2?.characters.map((team) => {
                                                return (
                                                    <>
                                                        <img
                                                            src={`${team.character_picture}.${team.character_extension}`} alt="Circle Image" class="img-raised rounded-circle img-fluid"
                                                        />
                                                    </>
                                                );
                                            })}
                                        </div>
                                        <div className="vote_counter">Number of Votes: {battle.number_of_votes_team_2}</div>
                                        {allTeams.map((team) => {
                                            if (team.id === battle.team_2?.id) {
                                                if (
                                                    avengerUserObject?.id !== battle?.team_1?.user?.id &&
                                                    avengerUserObject?.id !== battle.team_2?.user?.id
                                                ) {
                                                    return (
                                                        <>
                                                            {battle.winner === null &&
                                                                battle.team_2?.id != null 
                                                                ? (
                                                                <button
                                                                    type="submit"
                                                                    id="team_two_button"
                                                                    class="btn btn-danger"
                                                                    onClick={(evt) => {
                                                                        evt.preventDefault();
                                                                        const newVote = {
                                                                            user: battle.team_2?.user.id,
                                                                            battle: battle.id,
                                                                            user_team_voted_for: battle.team_2?.id,
                                                                        };
                                                                        addVote(newVote)
                                                                            .then((parsedResponse) => {
                                                                                voteInfo(parsedResponse);
                                                                            })
                                                                            .catch((error) => {
                                                                                window.confirm("You cannot vote again");
                                                                            });
                                                                    }}
                                                                >
                                                                    Vote For This Team
                                                                </button>

                                                            ) : null}

                                                        </>
                                                    );
                                                }
                                            }
                                        })}
                                        {
                                            battle.team_2 === null && avengerUserObject?.id === battle.user_being_challenged.id ? (
                                                <button
                                                id="team_two_button"
                                                class="btn btn-danger"
                                                    onClick={() => navigate(`/battles/${battle.id}`)}
                                                >
                                                    Pick Your Team!
                                                </button>
                                            ) : null
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                })
            )}
    </>
}