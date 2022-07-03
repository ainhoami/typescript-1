import React, {useState} from 'react'
import {useUsers } from '../hooks/index'
import "../styles/Main.css"
import {User} from '../components/User'


interface IUserDTO {
  id: number;
   name: string;
   username: string;
   email: string;
   address: string;
   suite: string;
   city: string;
   zipcode: string;
   lat:string;
   lng:string;
   phone: string;
   website: string;
   company: string;
 }


export const Main: React.FC <any>= ()=>
{
  const users=useUsers() //getting the users from the hooks
  const [oneUser, setOneUser]=useState()

  function handlClick(e:any, user:any){
    setOneUser(user)
   }

//displaying all the users
    return (
      <div className="mainContainer">
        <p className="title"> Photographers - Choose one Artist to see the albums</p>
        <div className="userNameContainer" >
          {users?
          users.map((user:IUserDTO, index:number)=>(
            <div key={index} className="userNameCard" onClick={e=>handlClick(e,user)}>{user.username}</div>
          ))
          :""    
          }
      </div>
     <User oneUser={oneUser as IUserDTO}/>
      </div> 
      )

    
}
