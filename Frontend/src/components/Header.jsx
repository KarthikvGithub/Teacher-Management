const Header = ({ setView, showAllTeachers}) => {
    return (
        <header>
            <h1>Teacher Management</h1>
            <div>
                <button onClick={() => setView('add')}>Add</button>
                <button onClick={() => setView('search')}>Search</button>
                <button onClick={() => setView('filter')}>Filter</button>
                <button onClick={showAllTeachers}>Show All</button>
            </div>
        </header>
    );
};

export default Header;