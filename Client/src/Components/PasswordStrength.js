import {passwordStrength as PST} from 'check-password-strength'
import {useEffect, useState} from 'react'

export default function PassSt({pwd}){
    const [b1, setb1]=useState('rgba(0,0,0,0.1)');
    const [b2, setb2]=useState('rgba(0,0,0,0.1)');
    const [b3, setb3]=useState('rgba(0,0,0,0.1)');
    const [flag, setFlag]=useState('');
    const [vis, setVis]=useState('hidden');

    useEffect(()=>{
        let status=PST(pwd).value;
        if(pwd === '')
            setVis('hidden');
        else{
            setVis('visible');
            if(status === "Too weak"){
                setb1('#df1623');
                setb2('rgba(0,0,0,0.1)');
                setb3('rgba(0,0,0,0.1)');
                setFlag('Weak');
            }else if(status === "Weak"){
                setb1('#d5b134');
                setb2('#d5b134');
                setb3('rgba(0,0,0,0.1)');
                setFlag('Medium');
            }else{
                setb1("#70e000");
                setb2('#70e000');
                setb3('#70e000');
                setFlag("Strong");
            }
        }
    }, [pwd])
    return (
        <div style={{'visibility':vis}} className='d-inline-block align-items-center'>
            <div id='b-1' style={{'backgroundColor':b1, 'height':'12px', 'width':'12px', 'marginRight':'5px'}} className="d-inline-block shadow-sm rounded-pill"></div>
            <div id='b-2' style={{'backgroundColor':b2, 'height':'12px', 'width':'12px', 'marginRight':'5px'}} className="d-inline-block shadow-sm rounded-pill"></div>
            <div id='b-3' style={{'backgroundColor':b3, 'height':'12px', 'width':'12px', 'marginRight':'5px'}} className="d-inline-block shadow-sm rounded-pill"></div>
            <p className="grey small d-inline">{flag}</p>
        </div>
    )
}