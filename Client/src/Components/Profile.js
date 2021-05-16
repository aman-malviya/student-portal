import React, {useEffect, useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'

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

    const [isAuthenticated, setisAuthenticated] = useState(false);

    useEffect(() => {
        fetch("/authenticate")
            .then(res=>res.json())
            .then(res=>{
                setisAuthenticated(res.isAuthenticated);
            })
    }, [])
    
    return (
        isAuthenticated?
        <div>
            Hello
            <button onClick={logout}>Logout</button>
        </div>
        :
        <Redirect to="/auth" />
    )
}

export default Profile
