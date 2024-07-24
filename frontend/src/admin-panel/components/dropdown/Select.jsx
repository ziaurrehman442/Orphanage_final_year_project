import React from 'react';


const Select = ({ value, name, title, language, handleChange }) => {

    return (
        <div>
            <div style={{ flex: '0 0 30%', marginRight: '10px', margin: '3% 0 3% 0'}}>
            <select
            required
            className="urdu-select" 
            onChange={handleChange}
            name={name}
            style={{ 
                width: '100%',
                padding: '8px',
                fontSize: '16px',
                border: 'none',
                borderBottom: '2px solid black',
                backgroundColor: 'white',
                direction: language === 'English' ? 'ltr' : 'rtl',
                textAlign: language === 'English' ? 'left' : 'right'
            }}
            >
                {console.log(value)}
            <option value="">{title}</option>
                {value.map((val, id) => <option value={val.name}>{val.name}</option>)}
            </select>
        </div>
    </div>
    )
}

export default Select