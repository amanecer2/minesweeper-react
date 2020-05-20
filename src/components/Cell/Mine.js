import React from 'react';

import {ReactComponent as BoomdedSvg} from "../../assets/svg/bomb.svg";

const Mine = () => {
    const style = {
        "height": "100%",
        "width": "100%",
    };

    return (
        <div>
            <BoomdedSvg style={style}/>
        </div>

    )
};

export default Mine;