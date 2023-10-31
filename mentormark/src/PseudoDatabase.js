import { account } from "./interfaces/account.ts";
import { useState } from "react";

const iconList = ["Icon1.png", "Icon2.png", "Icon3.png", "Icon4.png", "Icon5.png", "Icon6.png"];

export const users = [
    {Name: "User1", email: "User1@maine.edu", age: 22, password: "11111", number: "001", gender: "male", icon: "Icon1.png"},
    {Name: "User2", email: "User2@maine.edu", age: 19, password: "22222", number: "002", gender: "female", icon: "Icon2.png"},
    {Name: "User3", email: "User3@maine.edu", age: 23, password: "33333", number: "003", gender: "", icon: "Icon3.png"},
    {Name: "User4", email: "User4@maine.edu", age: 30, password: "44444", number: "004", gender: "male", icon: "Icon5.png"},
];

function iconAssignment(){
    const x = Math.floor(Math.random()*6);
    return iconList[x];
}

function iconSelect(x){
    return iconList[x];
}

export function displayIcon(user) {
    const image = "./icons/" + user.icon;
    return (
        <span>
            <img src={image} alt="UserIcon" width={50} height={50}/>
        </span>
    );
}