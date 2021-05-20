import {useState, useEffect} from 'react'
import {Redirect, useHistory} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PassSt from './PasswordStrength';

export default function Register(){
        const history=useHistory();
        const [signUp, setSignUp]=useState(false);
        const [pwd, setPwd]=useState("");
        const [actualName, setActualname]=useState("");
        const [email, setEmail]=useState("");

        //auth
        const [isAuthenticated, setisAuthenticated]=useState(false);
        useEffect(() => {
            fetch("/authenticate")
                .then(res=>res.json())
                .then(res=>{
                    if(res.isAuthenticated){
                        setisAuthenticated(res.isAuthenticated);
                    }
                })
        }, [])

        const switchPanel=()=>{
            setPwd("");
            setActualname("");
            setEmail("");
            setSignUp((prevPanel)=>!prevPanel);
        } 

        const submitForm=(e)=>{
            e.preventDefault();
            if(signUp){
                const requestOptions={
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        username:email,
                        password:pwd,
                        role:"user",
                        name:actualName
                    })
                }
                fetch('/register', requestOptions)
                    .then(res => res.json())
                    .then(res=> {
                        if(res.message.msgError)
                            toast.info(res.message.msgBody, {
                                position: window.innerWidth<600?"bottom-center":"bottom-left",
                                autoClose: 4000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        else{
                            toast.success(res.message.msgBody + " Login to continue.", {
                                position: window.innerWidth<600?"bottom-center":"bottom-left",
                                autoClose: 4000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setSignUp(false);
                        }
                    });
            }else{
                const requestOptions={
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify({
                        username:email,
                        password:pwd,
                    })
                }
                fetch('/login', requestOptions)
                    .then(res=>res.json())
                    .then(res=> {
                        if(res.isAuthenticated){
                            history.push("/");
                        }
                    });
            }
        }

        const googleAuth=()=>{
            window.open("http://localhost:9000/auth/google")
        }
        const fbAuth=()=>{
            window.open("http://localhost:9000/auth/facebook")
        }

        return (isAuthenticated?
            <Redirect to="/" />
            :
            <div class="overflow-hidden">
                <div class="row no-gutters min-vh-100">
                    <div class="col-lg-4 col-md-6 d-flex justify-content-center align-items-center flex-row">
                        <div className="login-panel p-5 overflow-scroll">
                            <div>
                                <span className="d-flex justify-content-center align-items-center mb-3 shadow-lg rounded-3 mx-auto" style={{'width':'60px', 'height':'60px'}}>
                                    <img alt="logo" height="40px" src="Assets/logo.png" />
                                </span>
                            </div>
                            <h3 className="text-center">{signUp?"Sign Up":"Sign In"}</h3>
                            <p style={{'padding':'0 15%'}} className="text-center grey">Hello there! {signUp?"Sign Up":"Sign In"} and start managing your profile.</p>
                            <form>
                                {signUp?<div class="mb-3">
                                    <label class="form-label grey small">Name</label>
                                    <input value={actualName} type="text" onChange={(e)=>setActualname(e.target.value)} class="d-block w-100" aria-describedby="emailHelp" />
                                </div>:<div></div>}
                                <div class="mb-3">
                                    <label class="form-label grey small">Email</label>
                                    <input value={email} type="email" onChange={(e)=>setEmail(e.target.value)} class="d-block w-100" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label class="form-label grey small">Password</label>
                                    <input value={pwd} onChange={e=>setPwd(e.target.value)} type="password" class="d-block w-100" />
                                </div>
                                {signUp?<div className='pt-1 d-inline-block'>
                                    <PassSt pwd={pwd} />
                                </div>:<div></div>}
                                <button onClick={submitForm} style={{'backgroundColor':'#70e000', 'color':'#fff'}} type="submit" className="btn float-end shadow">{signUp?"Sign Up":"Login"} <i style={{'fontSize':'0.8rem'}} class="fas fa-arrow-right"></i></button>
                            </form><br />
                            <div className="d-flex flex-row grey mt-5">
                                <div style={{'height':'0.5px', 'width':'47%', 'backgroundColor':'#555555'}}></div>
                                <p style={{'transform':'translateY(-12px)'}} className="px-2">or</p>
                                <div  style={{'height':'0.5px', 'width':'47%', 'backgroundColor':'#555555'}}></div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={googleAuth} style={{'backgroundColor':'#fff'}} type="submit" className="btn mt-3 mx-2 shadow grey"><img alt="google" src="Assets/google.png" height="15px" /></button>
                                <button style={{'backgroundColor':'#0e76a8', 'color':'#fff'}} type="submit" className="btn mx-2 mt-3 shadow"><i class="fab fa-linkedin-in"></i></button>
                                <button onClick={fbAuth} style={{'backgroundColor':'#3b5998', 'color':'#fff'}} type="submit" className="btn mt-3 mx-2 shadow"><i class="fab fa-facebook-f"></i></button>
                            </div>    
                            <p className="mt-3 grey small text-center">
                                {signUp?
                                    <span>
                                        Already have an account? 
                                        <button className="bg-white border-0 accent" onClick={switchPanel}>
                                            Login
                                        </button>
                                    </span>
                                    :
                                    <span>
                                        Don't have an account? 
                                        <button className="bg-white border-0 accent" onClick={switchPanel}>
                                            Sign Up
                                        </button>
                                    </span>
                                }
                            </p> 
                            <ToastContainer />
                        </div>
                    </div>
                    <div class="col-lg-8 d-md-block d-lg-block d-none col-md-6 login-bg"></div>
                </div>
            </div>
        )

}