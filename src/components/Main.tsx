import React, { useState } from 'react';
import { useArtists } from '../hooks/index';
import '../styles/Main.css';
import { Artist } from './Artist';

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

export const Main: React.FC<any> = () => {
	const allArtist = useArtists(); //getting the users from the hooks
	const [artist, setArtist] = useState<IArtist>();

	function handlClick(artist: IArtist) {
		setArtist(artist);
	}
	console.log(allArtist, 'asdfsadfs');
	//displaying all the users
	return (
		<div className='mainContainer'>
			<p className='title'>
				{' '}
				Photographers - Choose one Artist to see the albums
			</p>
			<div className='userNameContainer'>
				{allArtist &&
					Array.isArray(allArtist) &&
					allArtist.map((artist: IArtist, index: number) => (
						<div
							key={index}
							className='userNameCard'
							onClick={() => handlClick(artist)}
						>
							{artist.username}
						</div>
					))}
			</div>
			<Artist artist={artist} />
		</div>
	);
};
