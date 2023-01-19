import { getSpecificUserTeamInfo } from "../managers/AuthManager"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getSingleBattle } from "../managers/BattleManager"
import { updateBattle } from "../managers/BattleManager"
import "./BattlePage.css"

export const UpdateBattleForm = () => {
    const navigate = useNavigate()
    const { battleId } = useParams()
    const battleIdNum = Number(battleId)
    const [myTeam, setMyTeam] = useState([])
    const [completeBattle, updateBattleInfo] = useState({
        team_2: "",
    })

    useEffect(
        () => {
            getSpecificUserTeamInfo()
                .then((data) => {
                    setMyTeam(data)
                })
        },
        []
    )
    useEffect(() => {
        getSingleBattle(battleIdNum).then(data => updateBattleInfo(data))
    }, [battleIdNum])

    const submitBattleChallenge = (evt, battleId) => {
        evt.preventDefault()

        const battleToSend = {
            team_2: completeBattle.team_2,
        }
        updateBattle(battleToSend, battleId)
    }

    const changeStateProperty = (evt) => {
        const copy = { ...completeBattle }
        copy[evt.target.id] = evt.target.value
        updateBattleInfo(copy)
    }


    return <>
        <h1 id="battle_form_title" >Battle Form</h1>
        <fieldset>
            <div className="form-group">
                <label id="battle_form_title" for="address" class="form-label">Choose Your Team</label>
                <select value={completeBattle.team_2}
                    class="form-select" id="team_2"
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
        <button
            id="team_two_button"
            class="btn btn-danger"
            onClick={(evt) => {
                evt.preventDefault();
                submitBattleChallenge(evt, battleId);
                navigate('/battles');
            }}
        >
            Start Battle
        </button>
    </>
}