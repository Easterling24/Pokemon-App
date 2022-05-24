import '../styles/SideBar.css';
import Pokemon from '../assets/logo/pokeball.png';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { toggleTheme } from '../actions/themeActions';
import { useDispatch, useSelector } from 'react-redux';

const StyledLink = styled(Link)`

text-decoration:none;
transition: 0.3s ease-in-out;
text-transfrom: capitalize;
font-weight:700;
color: ${(props) => (props.darkmode ? '#5f94ff' : 'black')}

`;

export default function Sidebar() {
	const theme = useSelector((state) => state.theme);
	const dispatch = useDispatch();
	const wishList = useSelector((state) => state.wishList).wishList;

	return (
		<div className="sidebar-section">
			<input type="checkbox" id="toggle-menu" className="burger-input" />
			<div
				className=" side-bar-container"
				style={theme === 'dark' ? { background: '#162025' } : { background: '#4b5047' }}
			>
				<div className="menu-burger">
					<label
						htmlFor="toggle-menu"
						className="control-container-label"
						style={
							theme === 'dark' ? (
								{
									background: '#162025',
									color: '#5f94ff'
								}
							) : (
								{
									background: '#4b5047',
									color: 'white'
								}
							)
						}
					>
						<div className="icon-container-open">
							{' '}
							<i
								className="fa-solid fa-bars"
								style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
							/>
						</div>
						<div className="icon-container-closed">
							{' '}
							<i
								className="fa-solid fa-xmark"
								style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
							/>
						</div>
					</label>
				</div>

				<div className="side-section">
					<div className="logo-container">
						<img src={Pokemon} alt="logo" />
					</div>

					<div className="mobile-icon-wrapper">
						<div className="icon-container">
							<img src={Pokemon} alt="logo" />
						</div>
					</div>

					<nav className="side-nav">
						<ul>
							<li>
								<StyledLink
									className="links-sidebar"
									to="/"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
									{' '}
									<i className="fa-solid fa-list" style={{ marginRight: '1rem' }} />All Pokemons
								</StyledLink>
								<StyledLink
									className="links-mobile"
									to="/"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
									{' '}
									<i className="fa-solid fa-list" />
								</StyledLink>
							</li>

							<li>
								<StyledLink
									className="links-sidebar"
									to="/wishlist"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
									{' '}
									<i className="fa-solid fa-cart-arrow-down" style={{ marginRight: '1rem' }} />Your
									Favorites ({wishList.length})
								</StyledLink>
								<StyledLink
									className="links-mobile"
									to="/wishlist"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
							
									<i className="fa-solid fa-cart-arrow-down" />
								</StyledLink>
							</li>

							{/* <li>
								<StyledLink
									className="links-sidebar"
									to="/searcher"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
									<i className="fa-solid fa-magnifying-glass" style={{ marginRight: '1rem' }} />{' '}
									Searcher
								</StyledLink>
								<StyledLink
									className="links-mobile"
									to="/searcher"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
									{' '}
									<i className="fa-solid fa-magnifying-glass" />
								</StyledLink>
							</li> */}

							<li>
								<StyledLink
									className="links-sidebar"
									to="/todos"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
									<i className="fa-solid fa-circle-check" style={{ marginRight: '1rem' }} />Todos
								</StyledLink>
								<StyledLink
									className="links-mobile"
									to="/todos"
									style={theme === 'dark' ? { color: '#9678dd' } : { color: '#fff' }}
								>
									{' '}
									<i className="fa-solid fa-circle-check" />
								</StyledLink>
							</li>
						</ul>
					</nav>

					<div className="switch-container">
						<input
							onClick={() => dispatch(toggleTheme())}
							type="checkbox"
							id="switch"
							className="switch-input"
						/>
						<label
							htmlFor="switch"
							className="switch-label"
							style={theme === 'dark' ? { background: '#2c2a45' } : { background: '#c0c0c0' }}
						>
							<i className="fas fa-sun" />
							<i className="fas fa-moon" />
							<span className="ball" />
						</label>
					</div>
				</div>
			</div>
		</div>
	);
}
