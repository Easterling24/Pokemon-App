import './App.css';
import PokemonList from './screens/PokemonList';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import GlobalStyle from './styles/GlobalStyle';

// Sreens
import PokemonProfile from './screens/PokemonProfile';
import WishList from './screens/WishList';
import Todos from './screens/Todos'



function App() {
	return (
		<div className="App">
			<GlobalStyle />
			<Sidebar />
			<Routes>
				<Route path="/" element={<PokemonList />} />
				 <Route path="/pokemon/:id" element={<PokemonProfile />} />
				<Route path="/wishlist" element={<WishList />} />
				<Route path='/todos' element={<Todos/>} /> 
			</Routes>
	
		</div>
	);
}

export default App;
