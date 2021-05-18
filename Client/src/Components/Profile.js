import React, {useEffect} from 'react'
import {useHistory} from 'react-router-dom'

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


    useEffect(() => {
        fetch("/authenticate")
            .then(res=>res.json())
            .then(res=>{
                if(!res.isAuthenticated)
                    history.push("/auth");
            })
    }, [history])
    
    return (
        <div>
            Hello
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile
