import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();


export const AppContextProvider = (props) =>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setIsLoggedin] = useState(false);
    const [userData,setUserData] = useState(false);

    const getAuthState = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/auth/is-auth')
            if(data.success){
                setIsLoggedin(true);
                getUserData();
            }
        }catch(e){
            toast.error(e.message)
        }
    }


    const getUserData = async()=>{
        try{
            const {data} = await axios.get(backendUrl+ '/api/user/data')
            data.success ? setUserData(data.userData) : toast.error(data.message);
            
        }catch(e){
            toast.error(e.message)
        }
    }

    useEffect (()=>{  //this appcontextprovider is used in main.jsx so whenever the website opens this effect will be used
        getAuthState();
    },[])
    
    const value = {
        backendUrl,
        isLoggedin,setIsLoggedin,
        userData,setUserData,
        getUserData
    }


    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

// export const useAuth= ()=>{
//     const value = useContext(AppContent);
//     if(!value){
//         throw new Error("use Auth must be used within a AppContextProvider")
//     }
//     return value;
// }