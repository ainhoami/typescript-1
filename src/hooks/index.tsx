import { useEffect, useState } from 'react';
import axios from 'axios';

/************* Data interface *********************/

interface IArtist {
	id: number;
	name: string;
	username: string;
	email: string;
	address: string;
	suite: string;
	city: string;
	zipcode: string;
	lat: string;
	lng: string;
	phone: string;
	website: string;
	company: string;
}

interface IAlbum {
	userId: number;
	id: number;
	title: string;
}

interface IPhoto {
	albumId: number;
	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

/************* Getting data from the server side  *********************/

export const useArtists = () => {
	const [users, setUsers] = useState<IArtist>();
	useEffect(() => {
		axios.get('/api/users').then((resp) => {
			setUsers(resp.data);
		});
	}, []);
	return users;
};

export const useAlbums = (userid: number) => {
	console.log('albuuum');
	const [albums, setAlbums] = useState<IAlbum>();
	useEffect(() => {
		axios.get('/api/albums/' + userid).then((resp) => {
			setAlbums(resp.data);
		});
	}, [userid]);
	return albums;
};

export const usePhotos = (albumId: number) => {
	const [photos, setPhotos] = useState<IPhoto>();
	useEffect(() => {
		axios.get('/api/photos/' + albumId).then((resp) => {
			setPhotos(resp.data);
		});
	}, [albumId]);
	return photos;
};
