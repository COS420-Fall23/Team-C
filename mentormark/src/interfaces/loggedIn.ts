import { Dispatch, SetStateAction } from "react";

export interface MyContext {
    logged: boolean;
    setLogged: Dispatch<SetStateAction<boolean>>;
}