import axios from "axios"

const baseURL = 'https://dummyjson.com'
// const baseURL = 'https://jsonplaceholder.typicode.com'


export const getUsers = () => axios.get(`${baseURL}/users`)
  .then(response => 
    {if (response.status !== 200) return Promise.reject(response)
        return  response.data
    })
    
    
   

export const getUser = (id) => axios.get(`${baseURL}/users/${id}`)
.then(response => 
    {if (response.status !== 200) return Promise.reject(response)
        return  response.data
    })
    
