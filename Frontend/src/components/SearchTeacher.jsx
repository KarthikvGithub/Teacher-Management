import React, { useState } from 'react';

const SearchTeacher = ({ handleSearch }) => {
    const [searchName, setSearchName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchName);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search by Name" value={searchName} onChange={e => setSearchName(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    );
};

export default SearchTeacher;