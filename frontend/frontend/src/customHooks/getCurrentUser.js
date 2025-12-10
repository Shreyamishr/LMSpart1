import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { serverURL } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const getCurrentUser = () => {
    const dispatch=useDispatch()
    useEffect(()=>{
        const fetchUser=async()=>{
            try{
                const result = await axios.get(serverURL + "/api/user/getCurrentUser", { withCredentials: true })
                // backend returns { user }, so prefer result.data.user
                dispatch(setUserData(result.data?.user ?? result.data))

                
            }catch(error){
                console.log(error)
                dispatch(setUserData(null))

            }
        }
        fetchUser()

    },[])
}

export default getCurrentUser