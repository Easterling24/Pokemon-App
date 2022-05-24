import '../styles/Todo.css';
import { useState } from 'react';
import TodoCard from './TodoCard';
import styled from 'styled-components';

const PageItem = styled.span`
	cursor: pointer;
	color: ${(props) => (props.current === props.item ? '#ddcaa0' : 'white')};
    
`;

export default function Pagination({ data, dataLimit, pageLimit }) {
	const pages = useState(data.length / dataLimit)[0]
	const [ currentPage, setCurrentPage ] = useState(1);


	const getPaginationData = () => {
		const startIndex = currentPage * dataLimit - dataLimit;
		const endIndex = startIndex + dataLimit;
		return data.slice(startIndex, endIndex);
	};

	const nextPage = () => {
		setCurrentPage((page) => page + 1);
	};

	const previousPage = () => {
		setCurrentPage((page) => page - 1);
	};

	const changePage = (e) => {
		const pageNumber = Number(e.target.textContent);
		setCurrentPage(pageNumber);
	};

	let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;

	let range = new Array(pageLimit).fill().map((_, idx) => start + idx + 1);


	return (
		<div className="todo-container">
			<div className="pagination-container">
				<button className="prev-btn" onClick={previousPage} disabled={currentPage === 1}>
					<i className="fa-solid fa-angle-left" />
				</button>
				{range.map((elt, index) => (
					<PageItem
						className="pagination-item"
						key={index}
						onClick={changePage}
						current={currentPage}
						item={elt}
					>
						{elt}
					</PageItem>
				))}
				<button className="next-btn" onClick={nextPage} disabled={currentPage === pages}>
					<i className="fa-solid fa-angle-right" />
				</button>
			</div>
			<div className="todo-data">
				{getPaginationData().map((todo) => {
					return (
						<TodoCard
							key={todo.id}
							id={todo.id}
							title={todo.title}
							completed={todo.completed}
							toggled={todo.toggled}
						/>
					);
				})}
			</div>

			<div className="pagination-container">
				<button className="prev-btn" onClick={previousPage} disabled={currentPage === 1}>
					<i className="fa-solid fa-angle-left" />
				</button>

				{range.map((elt, index) => (
					<PageItem
						className="pagination-item"
						key={index}
						onClick={changePage}
						current={currentPage}
						item={elt}
					>
						{elt}
					</PageItem>
				))}

				<button className="next-btn" onClick={nextPage} disabled={currentPage === pages}>
					<i className="fa-solid fa-angle-right" />
				</button>
			</div>
		</div>
	);
}
