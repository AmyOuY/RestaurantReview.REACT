import {createContext} from "react";

const currentUser = {user: {}} 

export const UserContext = createContext(currentUser);

