import React from 'react';
import {useParams } from 'react-router-dom';
import Template from '../components/Templates/Templates';
import Coil from '../components/Coil';
import Firmware from '../components/Firmware';
import Dashboard from '../components/Dashboard'

export default function Forms(){
    let { id } = useParams();
    
    if(id === "coil"){
        return <Coil />;
    }else if(id === "templates"){
        return <Template />
    }else if(id === "firmware"){
        return <Firmware />;
    }
    else if(id === "dashboard"){
        return <Dashboard />;
    }
}