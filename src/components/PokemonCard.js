import React from 'react';
import '../styles/pokemonCard.css';
import { useDispatch } from 'react-redux';
import { addPokemon } from '../actions/wishlistActions';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ name, url }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const theme = useSelector((state) => state.theme);
	const wishList = useSelector((state) => state.wishList).wishList;

	const pokemonIndex = url.split('/')[url.split('/').length - 2];

	const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemonIndex}.png`;

	const isFound = wishList.some((pokemon) => pokemon.name === name);

	return (
		<div className="card-wrapper">
			<div
				className="pokemon-card"
				style={theme === 'dark' ? { background: '#3c4568' } : { background: '#605b46' }}
			>
				<h2>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</h2>

				<div className="pokemon-image">
					<img src={imageURL} alt="name" />
				</div>
			</div>

			<div className="btns-card">
				<button
					className="view-btn"
					style={theme === 'dark' ? { background: '#595a79' } : { background: '#cabf9e' }}
					onClick={() => {
						navigate(`pokemon/${pokemonIndex}`);
					}}
				>
					View
				</button>

				<button
					className="add-btn"
					disabled={isFound}
					onClick={() => {
						dispatch(addPokemon(name, url));
					}}
				>
					{' '}
					{isFound ? 'Added!' : 'Add Pokemon!'}
				</button>
			</div>
		</div>
	);
}

export default PokemonCard;
