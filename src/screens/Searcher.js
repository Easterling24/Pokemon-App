import '../styles/Searcher.css';
import { selectSearcher } from '../utils/selectors';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { useEffect } from 'react';
import { fetchOrFilterResults } from '../features/searcher';
import { filteringResults } from '../features/searcher';
import { Link } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';

export default function Searcher() {
	const dispatch = useDispatch()
	
	return (
		<div className="search-wrapper">
			{/* <div className="input-wrapper">
				<h1 style={{ textAlign: 'center', marginBottom: '1rem', color: 'white' }}>Find Your Pokemon</h1>

				<div className="icon">
					<i className="fa-solid fa-magnifying-glass" />
				</div>
				<input
					onInput={(e) => dispatch(filteringResults(e.target.value, pokemonList))}
					placeholder="Enter your pokemon's name"
				/>
			</div>

			<div className="results-wrapper">
				{resultsFiltered.map((pokemon) => {
					return <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />;
				})}
			</div> */}
		</div>
	);
}
