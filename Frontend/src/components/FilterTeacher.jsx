import React, { useState } from 'react';

const FilterTeacher = ({ handleFilter }) => {
    const [filterAge, setFilterAge] = useState('');
    const [filterClasses, setFilterClasses] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        handleFilter(filterAge, filterClasses);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Filter by Age" value={filterAge} onChange={e => setFilterAge(e.target.value)} />
            <input type="number" placeholder="Filter by Classes" value={filterClasses} onChange={e => setFilterClasses(e.target.value)} />
            <button type="submit">Filter</button>
        </form>
    );
};

export default FilterTeacher;
