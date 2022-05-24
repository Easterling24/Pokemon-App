import React from 'react';
import '../styles/pokemonCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { removePokemon } from '../actions/wishlistActions';
import { useNavigate } from 'react-router-dom';

export default function WishListCard({ name, url }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const theme = useSelector((state) => state.theme);

	const pokemonIndex = url.split('/')[url.split('/').length - 2];
	const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonIndex}.png`;

	const viewDetails = () => {
		navigate(`/pokemon/${pokemonIndex}`);
	};

	return (
		<div className="card-wrapper">
			<div
				className="pokemon-card"
				style={theme === 'dark' ? { background: '#3c4568' } : { background: 'rgb(96, 91, 70)' }}
			>
				<h2>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</h2>

				<div className="pokemon-image">
					<img src={imageURL} alt="name" />
				</div>
			</div>

			<div className="btns-card">
				<button
					className="view-btn"
					style={theme === 'dark' ? { background: 'rgb(89, 90, 121)' } : { background: 'rgb(202, 191, 158)' }}
					onClick={viewDetails}
				>
					View
				</button>

				<button
					className="remove-btn"
					style={theme === 'dark' ? { background: '#f16658' } : { background: '#975d68' }}
					onClick={() => {
						dispatch(removePokemon(name));
					}}
				>
					{' '}
					Remove
				</button>
			</div>
		</div>
	);
}
