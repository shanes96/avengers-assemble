import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "./CreateTeam.css"
import { getSingleTeam, updateTeam } from '../managers/AuthManager'

export const UpdateFormCard = () => {
    const { teamId } = useParams()
    const navigate = useNavigate()
    const [team, setNewTeamDetails] = useState({
        team_name: ""
    })

    useEffect(() => {
        getSingleTeam(teamId).then(data => setNewTeamDetails(data))
    }, [teamId])


    const changeTeamState = (domEvent) => {
        const copy = { ...team }
        copy[domEvent.target.id] = domEvent.target.value
        setNewTeamDetails(copy)
    }

    return (
        <>
            <div class="field">
                <label id='update_team_text' class="label">Team Name</label>
                <div class="">
                    <input
                        class="form-control"
                        type="text"
                        id="team_name"
                        required
                        autoFocus
                        placeholder="Type Your Team Name Here"
                        value={team.team_name}
                        onChange={changeTeamState}
                    />
                </div>
            </div>
            <button
                id="team_two_button"
                class="btn btn-danger"
                type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    updateTeam(team, teamId)
                        .then(() => navigate("/profile"))
                }}
            >
                Update Team!
            </button>
        </>
    )
}