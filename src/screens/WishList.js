import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { displayWishList } from '../actions/wishlistActions';

import { useEffect } from 'react';
import WishListCard from '../components/WishListCard';
import styled from 'styled-components';
import '../styles/Wishlist.css';
import Loader from '../components/Loader';
import { Link } from 'react-router-dom';

const LoaderWrapper = styled.div`
	display: flex;
	height: 80vh;
	align-items: center;
	justify-context: center;
`;

export default function WishList() {
	const dispatch = useDispatch();
	const wishListData = useSelector((state) => state.wishList);
	const { wishList, loading } = wishListData;

	useEffect(
		() => {
			dispatch(displayWishList());
		},
		[ dispatch ]
	);

	return (
		<section className="wrapper">
			{loading ? (
				<LoaderWrapper>
					<Loader />
				</LoaderWrapper>
			) : (
				<div className="wishlist-wrapper">
					{wishList.length === 0 ? (
						<h1>
							Your list is empty, add some <Link to="/" style={{borderBottom: "1px solid white"} }>pokemons</Link>{' '}
						</h1>
					) : (
						<div className="wishlist-container">
							<h2 style={{ color: 'white', fontSize: '25px', marginTop: '2rem' }}>
								{' '}
								Your favorite pokemons{' '}
							</h2>

							<div className="wish-list">
								{wishList.map((pokemon) => {
									return <WishListCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />;
								})}
							</div>
						</div>
					)}
				</div>
			)}
		</section>
	);
}
