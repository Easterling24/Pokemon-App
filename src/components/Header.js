import React, { useEffect } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch, useStore } from 'react-redux';
import { selectWishList } from '../utils/selectors';
import { selectTheme } from '../utils/selectors';
import { fetchOrUpdateWishList } from '../features/wishList';
import { toggleTheme } from '../features/theme';
import styled from 'styled-components';

const HeaderComponent = styled.header`
	background: ${(props) => (props.darkmode ? '#1e2a3e' : '#fff')};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1rem;
	height: 10vh;
	position: relative;
	font-weight: 600;
	border-bottom: 2px solid rgba(189, 195, 199, 0.5);
	transition: 0.3s;

	@media screen and (max-width: 560px) {
		height: 14vh;
	}
`;

const NavLink = styled(Link)`
text-decoration:none;
color: ${(props) => (props.darkmode ? '#fff' : '#000')}
`;

export default function Header() {
	const store = useStore();

	const theme = useSelector(selectTheme);

	const dispatch = useDispatch();

	useEffect(
		() => {
			fetchOrUpdateWishList(store);
		},
		[ store ]
	);

	const wishListData = useSelector(selectWishList);

	const wishList = wishListData.wishList;

	return (
		<HeaderComponent className="HeaderComponent" darkmode={theme === 'dark'}>
			<div className="pokemonLogo">
				<img />
			</div>

			<div className="switch-container">
				<input onClick={() => dispatch(toggleTheme())} type="checkbox" id="switch" />
				<label htmlFor="switch">
					<i className="fas fa-sun" />
					<i className="fas fa-moon" />
					<span className="ball" />
				</label>
			</div>

			<ul className="list-container">
				<li>
					<NavLink to="/" darkmode={theme}>
						All Pokemons
					</NavLink>
				</li>

				<li>
					<NavLink to="/wishlist" darkmode={theme}>
						Your Favorites ({wishList.length})
					</NavLink>
				</li>
			</ul>
		</HeaderComponent>
	);
}
