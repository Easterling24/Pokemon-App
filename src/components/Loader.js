import PropagateLoader from 'react-spinners/PropagateLoader';

import { css } from '@emotion/react';
import { useState } from 'react';

const override = css`
	display: block;
	border-color: red;
`;

export default function Loader() {
	const [ loading ] = useState(true);
	const [ color ] = useState('#e5e5e5');

	return <PropagateLoader color={color} loading={loading} css={override} size={40} />;
}
