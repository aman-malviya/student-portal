import React, {useEffect, useState} from 'react'
import {Redirect, useHistory} from 'react-router-dom'

const Profile = () => {
    const history=useHistory();
    
    const logout=()=>{
        fetch("/logout")
            .then(res=>res.json())
            .then(res=>{
                if(res.success){
                    history.push('/auth');
                }
            })
    }
    //auth
    const [isAuthenticated, setisAuthenticated]=useState(true);
    useEffect(() => {
        fetch("/authenticate")
            .then(res=>{
                if(res.status === 401){
                    setisAuthenticated(false)
                }
            })
    }, [])
    
    return (
        isAuthenticated?
        <div className="row no-gutters min-vh-100 vw-100">
            <div className="col-lg-2 pt-5 position-relative">
                <span className="d-flex justify-content-center align-items-center mb-5 shadow-lg rounded-3 mx-auto" style={{'width':'60px', 'height':'60px'}}>
                    <img alt="logo" height="40px" src="Assets/logo.png" />
                </span>
                <button style={{'background':'none', 'textAlign':'left', 'color':'#555555','border':'0' ,'borderLeft':'4px solid #0e76a8'}} className="w-100 d-block my-3 px-5 py-2"><i class="fad fa-user pe-4"></i> Profile</button>
                <button style={{'background':'none', 'textAlign':'left', 'color':'#555555'}} className="w-100 d-block border-0 my-3 px-5 py-2"><i class="far fa-chalkboard pe-3"></i> Dashboard</button>
                <button style={{'background':'none', 'textAlign':'left', 'color':'#555555'}} className="w-100 d-block border-0 my-3 px-5 py-2"><i class="far fa-cog pe-4"></i> Settings</button>
                <button onClick={logout} style={{'background':'none', 'textAlign':'left', 'color':'#b82925'}} className="w-100 d-block border-0 my-3 px-5 py-2 position-absolute bottom-0"><i class="fad fa-sign-out pe-4"></i> Sign Out</button>
            </div>
            <div className="col-lg-2 bg-warning">
            
            </div>
            <div className="col-lg-8 bg-info">
                <h1>Profile</h1>
            </div>
        </div>
        :
        <Redirect to="/auth" />
    )
}

export default Profile
