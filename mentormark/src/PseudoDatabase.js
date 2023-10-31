import "icons/"
import { account } from "./interfaces/account";
import { useState } from "react";

const users = [
    {Name: "User1", email: "User1@maine.edu", age: 22, password: "11111", number: "001", gender: "male", icon: ""},
    {Name: "User2", email: "User2@maine.edu", age: 19, password: "22222", number: "002", gender: "female", icon: ""},
    {Name: "User3", email: "User3@maine.edu", age: 23, password: "33333", number: "003", gender: "", icon: ""},
    {Name: "User4", email: "User4@maine.edu", age: 30, password: "44444", number: "004", gender: "male", icon: ""},
];

export function displayIcon(user) {
    return (
        <div>
            {user.icon}
        </div>
    );
}