export let AuthContext = "NOT LOGGED";

export function isLoggedIn() {
    if(AuthContext === "LOGGED"){
        return true;
    } else return false;
}

export function logIn (){
    if(!isLoggedIn()){
        AuthContext = "LOGGED";
    } else {
        AuthContext = "NOT LOGGED";
    }
}

