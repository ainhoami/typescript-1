import React, { useState, MouseEvent } from 'react';
import '../styles/Artists.css';
import { useAlbums, usePhotos } from '../hooks/index';

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

export const Artist: React.FC<any> = ({ artist }) => {
	const albumsOneUser = useAlbums(artist ? artist.id : 0); //getting albums from the hooks
	const [oneAlbum, setOneAlbum] = useState<IAlbum>();
	const photosOneAlbum = usePhotos(oneAlbum ? oneAlbum.id : 0); //getting photos from the hooks

	function handlClick(e: MouseEvent<HTMLElement>, album: IAlbum) {
		setOneAlbum(album);
	}

	return (
		<>
			<div className='oneInfo'>
				{artist ? (
					<div>
						<p className='infoTitle'>
							Photographer {artist.username} Gallery information:
						</p>
						<p> {artist.name}</p>
						<p> {artist.email}</p>
						<p>
							{artist.address} {artist.suite} {artist.city}
						</p>
						<p>{artist.zipcode}</p>
						<p>{artist.phone}</p>
						<p className='title'>
							Albums - Choose one album to see the photos
						</p>
					</div>
				) : (
					''
				)}
			</div>

			{albumsOneUser && ( //displaying albums of the user selected
				<div className='albumsUsercontainer'>
					{Array.isArray(albumsOneUser) &&
						albumsOneUser.map((album: IAlbum, index: number) => (
							<div
								key={index}
								className='albumNameCard'
								onClick={(e) => handlClick(e, album)}
							>
								<p>{album.title}</p>
							</div>
						))}
				</div>
			)}

			{photosOneAlbum &&
				oneAlbum &&
				artist.id === oneAlbum.userId && ( //displaying photos of the album selected
					<div>
						<p className='title'>
							Photos of Album: {oneAlbum.title}
						</p>
						<div className='albumsUsercontainer'>
							{Array.isArray(photosOneAlbum) &&
								photosOneAlbum.map(
									(photo: IPhoto, index: number) => (
										<div
											key={index}
											className='photoNameCard'
										>
											<img
												src={photo.thumbnailUrl}
												alt={photo.title}
											/>
										</div>
									),
								)}
						</div>
					</div>
				)}
		</>
	);
};
