import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registerUser, sendWelcomeEmailToUser } from "../managers/AuthManager"
import "./Login.css"

export const Register = () => {
    const firstName = useRef()
    const lastName = useRef()
    const username = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()
    const email = useRef()
    const csrf_token= useRef
    const navigate = useNavigate()

    //integrate client side code

    const handleRegister = (e) => {
        e.preventDefault()
    
        if (password.current.value === verifyPassword.current.value) {
            const user = {
                "username": username.current.value,
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "password": password.current.value,
                "verifyPassword":verifyPassword.current.value,
                "email": email.current.value
            }
    
            registerUser(user)
                .then(res => {
                    if ("token" in res) {
                        localStorage.setItem("aa", res.token)
                        navigate("/profile")
                    }
                })
        } else {
            passwordDialog.current.showModal()
        }
    }
    

    return (
        <>

            <div className="background">
                <div class="container">
                    <img id="image" class="spiderman" src="https://i.ibb.co/XDFkXMx/spiderman-colgado.png" alt="" />
                    <div class="shadow"></div>
                </div>
            </div>
            <h5 className="register_title">Avengers Assemeble</h5>
            
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>

            <div id="register_card" class="card text-center">
                <div class="card-body">
                    <form method="POST" onSubmit={handleRegister}>
                        <div class="form-group">
                            <label for="exampleInputEmail1">First Name</label>
                            <input ref={firstName} class="form-control" id="exampleInputEmail1" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Last Name</label>
                            <input ref={lastName} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">UserName</label>
                            <input ref={username} class="form-control" id="exampleInputUsername1" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input ref={password} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Verify Password</label>
                            <input ref={verifyPassword} type="password" class="form-control" id="exampleInputPassword1" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Email</label>
                            <input ref={email} class="form-control" id="exampleInputPassword1" />
                        </div>
                        <button id="register_button" class="btn btn-primary" type="submit">Register</button>
                        <button id="register_button" onClick={() => navigate('/login')} type="submit" class="btn btn-primary">Already Registered?</button>
                    </form>
                </div>
            </div>
        </>
    )
}
