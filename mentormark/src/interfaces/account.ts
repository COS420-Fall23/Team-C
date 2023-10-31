import "icons/"
import React from "react";

export interface account{
    Name: string;
    email: string;
    age: number;
    password: string;
    number: string;
    gender: string;
    icon: string;
}

const iconList = ["Icon1", "Icon2", "Icon3", "Icon4", "Icon5", "Icon6"];

function iconAssignment(){
    const x = Math.floor(Math.random()*6);
    return iconList[x];
}

function iconSelect(x){
    return iconList[x];
}