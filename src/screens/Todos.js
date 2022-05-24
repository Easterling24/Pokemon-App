import '../styles/Todo.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import Loader from '../components/Loader';
import styled from 'styled-components';
import { listTodos } from '../actions/todosActions';
import Pagination from '../components/todosPagination';

const LoaderWrapper = styled.div`
	display: flex;
	height: 80vh;
	align-items: center;
	justify-context: center;
`;

export default function Todos() {
	const dispatch = useDispatch();

	const todos = useSelector((state) => state.todos);

	useEffect(
		() => {
			dispatch(listTodos());
		},
		[ dispatch ]
	);

	const { loading, data } = todos;

	return (
		<div className="todos">
			{loading ? (
				<LoaderWrapper>
					<Loader />
				</LoaderWrapper>
			) : (
				<div className="todo-wrapper">
					<h1>Todos</h1>
					<TodoForm data={data} />
					<Pagination data={data} dataLimit={5} pageLimit={5} />
				</div>
			)}
		</div>
	);
}
