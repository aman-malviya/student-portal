import {useState} from 'react'

import PassSt from './PasswordStrength';

export default function Register(){
        const [pwd, setPwd]=useState("");

        return (
            <div class="overflow-hidden">
                <div class="row no-gutters min-vh-100">
                    <div class="col-lg-4 col-md-6 d-flex justify-content-center align-items-center flex-row">
                        <div className="login-panel p-5 overflow-scroll">
                            <div>
                                <span className="d-flex justify-content-center align-items-center mb-3 shadow-lg rounded-3 mx-auto" style={{'width':'60px', 'height':'60px'}}>
                                    <img alt="logo" height="40px" src="Assets/logo.png" />
                                </span>
                            </div>
                            <h3 className="text-center">Sign Up</h3>
                            <p style={{'padding':'0 15%'}} className="text-center grey">Hello there! Sign Up and start managing your profile.</p>
                            <form>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label grey small">Name</label>
                                    <input type="text" class="d-block w-100" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label grey small">Email</label>
                                    <input type="email" class="d-block w-100" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label grey small">Password</label>
                                    <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" class="d-block w-100" id="exampleInputPassword1" />
                                </div>
                                <div className='pt-1 d-inline-block'>
                                    <PassSt pwd={pwd} />
                                </div>
                                <button style={{'backgroundColor':'#70e000', 'color':'#fff'}} type="submit" className="btn float-end shadow">Sign Up <i style={{'fontSize':'0.8rem'}} class="fas fa-arrow-right"></i></button>
                            </form><br />
                            <div className="d-flex flex-row grey mt-3">
                                <div style={{'height':'0.5px', 'width':'47%', 'backgroundColor':'#555555'}}></div>
                                <p style={{'transform':'translateY(-12px)'}} className="px-2">or</p>
                                <div  style={{'height':'0.5px', 'width':'47%', 'backgroundColor':'#555555'}}></div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button style={{'backgroundColor':'#fff'}} type="submit" className="btn mt-3 mx-2 shadow grey"><img alt="google" src="Assets/google.png" height="15px" /></button>
                                <button style={{'backgroundColor':'#0e76a8', 'color':'#fff'}} type="submit" className="btn mx-2 mt-3 shadow"><i class="fab fa-linkedin-in"></i></button>
                                <button style={{'backgroundColor':'#3b5998', 'color':'#fff'}} type="submit" className="btn mt-3 mx-2 shadow"><i class="fab fa-facebook-f"></i></button>
                            </div>    
                            <p className="mt-3 grey small text-center">Already have an account? <a className="text-decoration-none accent" href="/">Login</a></p>   
                        </div>
                    </div>
                    <div class="col-lg-8 d-md-block d-lg-block d-none col-md-6 login-bg"></div>
                </div>
            </div>
        )

}