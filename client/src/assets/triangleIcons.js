
const RightPointingTriangle = () => {
    return (
        <svg height="50" width="30">
            <polygon points="0,50 0,0 30,25" fill="#ff5c6b"></polygon>
        </svg>
    );
}

const LeftPointngTriangle = () => {
    return (
        <svg height="50" width="30">
            <polygon points="0,25 30,0 30,50" fill="#ff5c6b"></polygon>
        </svg>
    );
}

 export { RightPointingTriangle, LeftPointngTriangle };