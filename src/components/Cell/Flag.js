import React from 'react';
import flag from "../../assets/png/flag.jpg";

const Flag = ({cell}) => {
    const style = {
        "height": "100%",
        "width": "100%",
    };

    return (
        <img style={style} src={flag} alt="flag"/>
    )
};

export default Flag
