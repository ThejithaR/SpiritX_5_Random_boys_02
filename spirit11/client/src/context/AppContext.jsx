import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();


export const AppContextProvider = (props) =>{

    axios.defaults.withCredentials = true;

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [isLoggedin,setIsLoggedin] = useState(false);
    const [userData,setUserData] = useState(false);

    const getAuthState = async () => {
        try {
          // Check if user is logged in from localStorage
          const token = localStorage.getItem('token');
          if (token) {
            setIsLoggedin(true);
            await getUserData();  // Fetch user data if logged in
          } else {
            // Check with backend if the token is invalid
            const { data } = await axios.get(backendUrl + '/api/auth/is-auth');
            if (data.success) {
              setIsLoggedin(true);
              await getUserData();  
            }
          }
        } catch (e) {
          toast.error(e.message);
        }
      };

    const getUserData = async()=>{
        try{
            const {data} = await axios.get(backendUrl+ '/api/user/data')
            
            if (data.success) {
                setUserData(data.userData); 
              } else {
                toast.error(data.message);
              }
            
        }catch(e){
            toast.error(e.message)
        }
    }


      useEffect(() => {
        getAuthState(); 
      }, []);
      

      
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
