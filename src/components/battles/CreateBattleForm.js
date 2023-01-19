import { getSpecificUserTeamInfo} from "../managers/AuthManager"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { createBattle, getOpponents } from "../managers/BattleManager"

export const CreateBattleForm = () => {
    const navigate = useNavigate()
    const [allOpponents, setAllOpponents] = useState([])
    const [myTeam, setMyTeam] = useState([])
    const [newBattle, updateBattleInfo] = useState({
        team_1: "",
        user_being_challenged: ""

    })

    const battleInfo = (parsedResponse) => {
        const BattleAPI = {
            battle: parsedResponse.id,
        }
            (BattleAPI)
    }

    useEffect(
        () => {
            getSpecificUserTeamInfo()
                .then((data) => {
                    setMyTeam(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getOpponents()
                .then((data) => {
                    setAllOpponents(data)
                })
        },
        []
    )

    const submitBattleChallenge = (evt) => {
        evt.preventDefault()

        const battleToSend = {
            team_1: newBattle.team_1,
            user_being_challenged: newBattle.user_being_challenged
        }
        createBattle(battleToSend)
        .then(() => navigate('/battles'))
    }

    const changeStateProperty = (evt) => {
        const copy = { ...newBattle }
        copy[evt.target.id] = evt.target.value
        updateBattleInfo(copy)
    }

    return <>
        <h1 id="create_battle_text" >Battle Form</h1>
        <fieldset>
            <div className="form-group">
                <label id="create_battle_text" for="address" class="form-label">Choose Your Team</label>
                <select value={newBattle.team_1}
                    class="form-select" id="team_1"
                    onChange={changeStateProperty}
                >
                    <option value={0}>Choose Your Team</option>
                    {
                        myTeam.map(
                            team => <option
                                value={team.id}>
                                {team.team_name}
                            </option>
                        )
                    }
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label id="create_battle_text" for="address" class="form-label">Choose Your Opponent</label>
                <select value={newBattle.user_being_challenged}
                    class="form-select" id="user_being_challenged"
                    onChange={changeStateProperty}
                >
                    <option value={0}>Choose Opponent</option>
                    {
                        allOpponents.map(
                            user => <option
                                value={user.id}>
                                {user.user.username}
                            </option>
                        )
                    }
                </select>
            </div>
        </fieldset>
        <button id="team_two_button"
            class="btn btn-danger" onClick={submitBattleChallenge}
        > Submit Challenge</button>
    </>
}