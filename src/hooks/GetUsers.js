import React, {useEffect, useState} from 'react'
import { useStore } from "react-redux";
import { getUser } from "../ducks/reducer";

const GetUsers = () =>  {
  const [state, setState] = useState({isLoading: true, user: null})
  const store = useStore()
  const results = store.getState()

  useEffect(()=>{
    getMyServerUsers().then(results => {
      setState(a =>({isLoading: false, users: results}))
    })
  }, [])

  return state
}

const getMyServerUsers = () => new Promise((res) => {
    setTimeout(()=>{
    return res(['blakely, Brynna, Griffin, KyloRen'])
  }, 2000)
})

export default GetUsers
