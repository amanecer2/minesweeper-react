import React from 'react';

const Input = ({num, name, setInput}) => {
    const _setInput = (e) => setInput(name, e.target.value);

    const style = {
        "width": "100%"
    };
    const lableStyle = {
        "width": "40%"
    };
    const inputStyle = {
        "width": "60%"
    };


    return (
        <div style={style} className='d-flex'>
            <label style={lableStyle} htmlFor={name}>{name}</label>
            <input style={inputStyle} value={num} type='text' id={name} onChange={_setInput}/>
        </div>
    )
};

export default Input;
