import React, {useState} from 'react'
import "../styles/Users.css"
import {useAlbums } from '../hooks/index'
import {usePhotos } from '../hooks/index'


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

 export const User: React.FC <any>= ({oneUser})=>
{
  const albumsOneUser = useAlbums(oneUser?oneUser.id:undefined) //getting albums from the hooks
  const [oneAlbum, setOneAlbum]=useState()
  const photosOneAlbum = usePhotos(oneAlbum?oneAlbum.id:undefined) //getting photos from the hooks
 
    function handlClick(e:any, album:any)
    {
      setOneAlbum(album)
     
    }

    return (
      <>
      <div className="oneInfo" >
          {oneUser? 
          <div>
            <p className="infoTitle">Photographer {oneUser.username} Gallery information:</p>
            <p> {oneUser.name}</p>
            <p> {oneUser.email}</p>
            <p>{oneUser.address} {oneUser.suite} { oneUser.city}</p>
            <p>{oneUser.zipcode}</p>
            <p>{oneUser.phone}</p>
            <p className="title">Albums - Choose one album to see the photos</p>
       </div>

      :""}
      </div>
      
{albumsOneUser? //displaying albums of the user selected 
    <div className="albumsUsercontainer">
      {albumsOneUser.map((album:IAlbumDTO, index:number)=>(
        <div key={index} className="albumNameCard" onClick={e=>handlClick(e,album)}><p>{album.title}</p></div>
      ))}

    </div>
    :""
}



{photosOneAlbum && oneAlbum && oneUser.id === oneAlbum.userId? //displaying photos of the album selected
    <div> 
<p className="title">Photos - {oneAlbum.title}</p> 
      <div className="albumsUsercontainer">
        { photosOneAlbum.map((photo:IPhotoDTO, index:number)=>(
         <div key={index} className="photoNameCard" >
           <img src={photo.thumbnailUrl} alt={photo.title}/>
           </div>
        ))}

      </div>
    </div>
    :""
}

    </>
    )

}

