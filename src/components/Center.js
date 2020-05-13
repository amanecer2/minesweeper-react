import React from 'react';

const Center = ({children}) => {
    return (
        <div className='d-flex align-content-center justify-content-center'>
            {children}
        </div>
    );
}

export default Center;


