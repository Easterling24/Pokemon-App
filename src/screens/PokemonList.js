import React, { useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import '../styles/pokemonList.css';
import { useSelector, useDispatch } from 'react-redux';
import { listPokemons, nextPage, previousPage } from '../actions/pokemonsActions';
import Loader from '../components/Loader';
import styled from 'styled-components';

const NavigationButton = styled.button`
	outline: none;
	border: none;
	background: transparent;

	> i {
		color: ${(props) => (props.darkmode === 'dark' ? 'rgb(150, 120, 221)' : 'white')};
		transition: all .5s ease-in-out;
	}
`;

const LoaderWrapper = styled.div`
	display: flex;
	height: 80vh;
	align-items: center;
	justify-context: center;
`;

const MessageWrapper = styled.div`
	display: flex;
	height: 80vh;
	align-items: center;
	justify-context: center;
`;

export default function PokemonList() {
	const theme = useSelector((state) => state);
	const dispatch = useDispatch();
	const pokemonList = useSelector((state) => state.pokemons);
	const offset = pokemonList.currentOffset;

	useEffect(
		() => {
			dispatch(listPokemons(offset));
		},
		[ dispatch, offset ]
	);

	const { data, loading, error } = pokemonList;

	return (
		<section className="wrapper">
			{loading ? (
				<LoaderWrapper>
					<Loader />
				</LoaderWrapper>
			) : error ? (
				<MessageWrapper>
					<h1>Error oups</h1>
				</MessageWrapper>
			) : (
				<div className="pokemonWrapper">
					<NavigationButton
						className="pagination-btn"
						disabled={offset === 0}
						style={offset === 0 ? { opacity: '0', cursor: 'auto' } : { opacity: '1' }}
						onClick={() => dispatch(previousPage(offset))}
						darkmode={theme === 'dark'}
					>
						<i
							className="fa-solid fa-caret-left"
							style={offset === 0 ? { opacity: 0.5 } : { opacity: 1 }}
						/>
					</NavigationButton>

					<div className="pagination-btn-mobile">
						<NavigationButton
							disabled={offset === 0}
							style={offset === 0 ? { opacity: '0', cursor: 'auto' } : { opacity: '1' }}
							onClick={() => dispatch(previousPage(offset))}
							darkmode={theme === 'dark'}
						>
							<i className="fa-solid fa-circle-arrow-left" darkmode={theme} />
						</NavigationButton>
						<NavigationButton onClick={() => dispatch(nextPage(offset))} darkmode={theme}>
							<i className="fa-solid fa-circle-arrow-right" darkmode={theme} />
						</NavigationButton>
					</div>

					<div className="pokemon-list-wrapper">
						{data.map((pokemon) => {
							return <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />;
						})}
					</div>

					<div className="pagination-btn-mobile">
						<NavigationButton
							disabled={offset === 0}
							style={offset === 0 ? { opacity: '0', cursor: 'auto' } : { opacity: '1' }}
							onClick={() => dispatch(previousPage(offset))}
						>
							<i className="fa-solid fa-circle-arrow-left" />
						</NavigationButton>
						<NavigationButton onClick={() => dispatch(nextPage(offset))} darkmode={theme === 'dark'}>
							<i className="fa-solid fa-circle-arrow-right" />
						</NavigationButton>
					</div>

					<NavigationButton
						className="pagination-btn"
						darkmode={theme === 'dark'}
						onClick={() => {
							dispatch(nextPage(offset + 9));
						}}
					>
						<i className=" fa-solid fa-caret-right" />
					</NavigationButton>
				</div>
			)}
		</section>
	);
}
