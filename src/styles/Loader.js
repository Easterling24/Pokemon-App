import styled, {keyframes} from "styled-components"

const rotate = keyframes
`
from {
    transform:rotate(0deg)
}

to {
    transform:rotate(360deg)
}

`
export const Loader = styled.div`

padding: 30px;
border: 6px solid #0978b2;
border-bottom-color: transparent;
border-radius: 42px;
animation: ${rotate} 1s infinite linear;
height: 0;
width: 0;
`