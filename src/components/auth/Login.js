import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../managers/AuthManager"
import "./Login.css"

export const Login = () => {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        const user = {
            username: username.current.value,
            password: password.current.value,
        }
        loginUser(user)
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("aa_token", res.token)
                    localStorage.setItem('user', JSON.stringify(res))

                    navigate("/profile")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <>
            <div className="background">
                <div class="container">
                    <img id="image" class="spiderman" src="https://i.ibb.co/XDFkXMx/spiderman-colgado.png" alt="" />
                    <div class="shadow"></div>
                </div>
            
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <h5 className="header">Avengers Assemeble</h5>
            <div id="login_card" class="card text-center">
                <div class="card-body">
                    <form onSubmit={handleLogin}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">UserName</label>
                            <input ref={username} class="form-control" id="exampleInputEmail1" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input ref={password} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="login_buttons">
                            <button id="submit_button" type="submit" class="btn btn-primary">Login</button>
                            <button id="register_button" onClick={() => navigate('/register')} type="submit" class="btn btn-primary">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}
