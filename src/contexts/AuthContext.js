import React, { createContext, useContext, useState, useEffect } from 'react'

import { auth } from '../firebase.js';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    function signUp(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    function logIn(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }
    function logOut(){
        return auth.signOut();
    }
    function forgotPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe
    }, []);

    const value = {
        currentUser,
        logIn,
        logOut,
        signUp,
        forgotPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}