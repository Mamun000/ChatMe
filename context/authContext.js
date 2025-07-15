import React, { createContext,useState,useContext } from 'react';

import { useEffect } from 'react';
import {createUserWithEmailAndPassword, onAuthStateChanged,signInWithEmailAndPassword,signOut} from 'firebase/auth';
import { auth,db } from '../firebaseConfig';
import {doc,getDoc, setDoc} from 'firebase/firestore';
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(() => {
        

        const unsub=onAuthStateChanged(auth,(user)=>{
            //console.log('got user',user);
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[]);

    const updateUserData=async (userId)=>{
        const docRef=doc(db,'users',userId);
        const docSnap=await getDoc(docRef);

        if (docSnap.exists()){
            let data=docSnap.data();
            setUser({...user, username:data.username, profileUrl: data.profileUrl, userId:data.userId});
        }
    }

    const login=async(email, password) => {

        try{
             const response=await signInWithEmailAndPassword(auth,email,password);
            // console.log('response.user :',response?.user);

            // // setUser(response?.user);
            // // setIsAuthenticated(true);

            // await setDoc(doc(db,"users",response?.user?.uid),{
            //     username,
            //     profileUrl,
            //     userId: response?.user?.uid

            // });
            // return {success: true,data: response?.user};

        return{success:true};

        }catch(error){
            let msgg=error.message;
            if(msgg.includes('(auth/invalid-email)')) msgg='Invalid email'
            if(msgg.includes('(auth/invalid-credential)')) msgg='Wrong Crdential'
            return{success: false,msg: msgg};
        }
    }

    const logout=async() => {
        try{
            await signOut(auth);
            return {success: true}

        }catch(error){
            return{success:false, msg:error.message,error:error };
        }
    }

    const register= async(email,password,username,profileUrl) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            //console.log('response.user :',response?.user);
            await setDoc(doc(db,"users",response?.user?.uid),{
                username,
                profileUrl,
                userId: response?.user?.uid

            });
            return {success: true,data: response?.user};


        }catch(error){
            let msgg=error.message;
            if(msgg.includes('(auth/invalid-email)')) msgg='Invalid email'
            if(msgg.includes('(auth/email-already-in-use)')) msgg='Account already exist'
            return{success: false,msg: msgg};
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )


}

export const useAuth = () => {
    const value = useContext(AuthContext);
    if(!value) {
        throw new Error("useAuth must be used within an AuthContextProvider");
    }
    return value;
}
