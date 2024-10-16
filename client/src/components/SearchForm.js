import React from 'react';

function SearchForm() {
    return (
        <div className="search-form">
            <label htmlFor="from">De:</label>
            <input type="text" id="from" name="from" />
            <label htmlFor="to">A:</label>
            <input type="text" id="to" name="to" />
            <button>Buscar</button>
            <label>
                <input type="checkbox" /> Activar reportes en zona favorita
            </label>
        </div>
    );
}

export default SearchForm;
