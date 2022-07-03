import { useEffect, useState } from 'react';
import axios from 'axios'

/************* Data interface *********************/


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

   interface IAlbumDTO {
    userId: number;
    id: number;
    title: string;
  }
 
  interface IPhotoDTO {
   albumId: number;
   id: number;
   title: string;
   url:string;
   thumbnailUrl:string;
  }

/************* Getting data from the server side  *********************/

export const useUsers = () => {
    const [users, setUsers]=useState()
    useEffect(() => {
        axios.get("/api/users").then(resp => {
          setUsers(resp.data as IUserDTO[])
          console.log(resp.data)
      })
      }, [])
    return users;
  };



  export const useAlbums = (userid:number) => {
    const [albums, setAlbums]=useState()
    useEffect(() => {
        axios.get("/api/albums/"+userid).then(resp => {
          setAlbums(resp.data as IAlbumDTO[])
          // console.log(resp.data)
      })
      }, [userid])
    return albums;
  };


  export const usePhotos = (albumId:number) => {
    const [photos, setPhotos]=useState()
    useEffect(() => {
        axios.get("/api/photos/"+albumId).then(resp => {
          setPhotos(resp.data as IPhotoDTO[])
      })
      }, [albumId])
    return photos;
  };