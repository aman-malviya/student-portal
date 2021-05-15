import React from 'react'
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
    
    return (
        <div>
            Hello chutiye
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Profile
