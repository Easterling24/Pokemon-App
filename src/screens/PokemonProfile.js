import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../actions/pokemonAction';
import { addPokemon } from '../actions/wishlistActions';

import styled from 'styled-components';
import '../styles/pokemonProfile.css';
import Loader from '../components/Loader';

const LoaderWrapper = styled.div`
	display: flex;
	height: 80vh;
	align-items: center;
	justify-context: center;
`;

export default function PokemonProfile() {
	const id = useParams().id;
	const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

	const wishlist = useSelector((state) => state.wishList).wishList;

	const dispatch = useDispatch();

	useEffect(
		() => {
			dispatch(getPokemonDetail(id));
		},
		[ dispatch, id ]
	);
	const pokemon = useSelector((state) => state.pokemon);
	const pokemonData = pokemon;

	const { loading, data } = pokemonData;

	const [ movesList, setMovesList ] = useState([]);
	const [ abilitiesList, setAbilitiesList ] = useState([]);

	const [ exapndAbilities, setExpandAbilities ] = useState(false);
	const [ expandMoves, setExpandMoves ] = useState(false);

	const getMoves = () => {
		setMovesList(data.moves);
		setExpandMoves(true);
	};

	const getAbilities = () => {
		setAbilitiesList(data.abilities);
		setExpandAbilities(true);
	};

	const handleExpandMoves = () => {
		if (expandMoves) {
			setExpandMoves(false);
		} else {
			getMoves();
		}
	};

	const handleExpandAbilities = () => {
		if (exapndAbilities) {
			setExpandAbilities(false);
		} else {
			getAbilities();
		}
	};

	const isFound = wishlist.some((elt) => elt.name === data.name);

	return (
		<div className="wrapper">
			{loading ? (
				<LoaderWrapper>
					<Loader />
				</LoaderWrapper>
			) : (
				<div className="pokemon-container">
					<div className="pokemon-img-container">
						<img src={data.img} alt={data.name} />
					</div>

					<div className="pokemon-info-container">
						<table className="info-table">
							<tbody>
								<tr>
									<th>Name</th>
									<td>{data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()}</td>
								</tr>

								<tr>
									<th>ID</th>
									<td>{data.id}</td>
								</tr>

								<tr>
									<th>Base Experience</th>
									<td>{data.base}</td>
								</tr>

								<tr>
									<th>Weight</th>
									<td>{data.weight}</td>
								</tr>

								<tr>
									<th>Height</th>
									<td>{data.height}</td>
								</tr>

								<tr>
									<th>Moves</th>
									<td>
										<button className="table-btns" onClick={handleExpandMoves}>
											{expandMoves ? 'Hide' : 'Expand'}
										</button>
										{movesList && expandMoves ? (
											<ul className="moves-container">
												{movesList.map((elt) => <li key={elt.move.name}>{elt.move.name}</li>)}
											</ul>
										) : null}
									</td>
								</tr>

								<tr>
									<th>Abilities</th>
									<td>
										<button className="table-btns" onClick={handleExpandAbilities}>
											{exapndAbilities ? 'Hide' : 'Expand'}
										</button>
										{abilitiesList && exapndAbilities ? (
											<ul className="moves-container">
												{abilitiesList.map((elt) => (
													<li key={elt.ability.name}>{elt.ability.name}</li>
												))}
											</ul>
										) : null}
									</td>
								</tr>
							</tbody>
						</table>

						<button
							className="pokemon-btn"
							disabled={isFound}
							onClick={() => {
								dispatch(addPokemon(data.name, url));
							}}
						>
							{isFound ? 'Already added !' : 'Add pokemon'}
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
