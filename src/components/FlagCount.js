import React from 'react';

const FlagCount = ({flags = 100}) => {
    return (
        <div>
            Flags left: {flags}
        </div>
    )
};

export default FlagCount;
