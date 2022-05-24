import { createGlobalStyle } from 'styled-components';
import { selectTheme } from '../utils/selectors';
import { useSelector } from 'react-redux';

const GlobalStyled = createGlobalStyle`
body {
    background: ${(props) => (props.darkmode ? 'linear-gradient(to right, #141e30, #243b55);' : 'linear-gradient(to right, #DECBA4, #3E5151);')};
    position: relative;
    height: 100vh;



}
`;

export default function GlobalStyle() {
	const theme = useSelector(selectTheme);

	return <GlobalStyled darkmode={theme === 'dark'} />;
}
