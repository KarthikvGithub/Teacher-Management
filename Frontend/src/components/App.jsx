import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import TeacherList from './TeacherList';
import AddTeacherForm from './AddTeacherForm';
import SearchTeacher from './SearchTeacher';
import FilterTeacher from './FilterTeacher';
import Footer from './Footer';
import AvgButton from './AvgButton';

function App() {
    const [teachers, setTeachers] = useState([]);
    const [view, setView] = useState('all');
    const [averageClasses, setAverageClasses] = useState(null);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        const response = await axios.get('http://localhost:5000/api/teachers');
        setTeachers(response.data);
    };

    const handleAddTeacher = async (newTeacher) => {
        await axios.post('http://localhost:5000/api/teachers/add', newTeacher);
        fetchTeachers();
        setView('all');
    };

    const handleSearch = async (name) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/teachers/search?name=${name}`);
            setTeachers(response.data);
            setView('all');
        } catch (error) {
            setTeachers([]);
        }
    };

    const handleFilter = async (age, classes) => {
        const response = await axios.get(`http://localhost:5000/api/teachers/filter`, {
            params: { age, classes }
        });
        setTeachers(response.data);
        setView('all');
    };

    const handleUpdateTeacher = async (name, updatedData) => {
        await axios.put(`http://localhost:5000/api/teachers/${name}`, updatedData);
        fetchTeachers();
    };

    const handleDeleteTeacher = async (name) => {
        await axios.delete(`http://localhost:5000/api/teachers/${name}`);
        fetchTeachers();
    };

    const fetchAverageClasses = async () => {
        const response = await axios.get('http://localhost:5000/api/teachers/average-classes');
        setAverageClasses(response.data.average_classes);
    };

    const showAllTeachers = () => {
        fetchTeachers();
        setView('all');
    };

    return (
        <div>
            <div>
                <Header setView={setView} showAllTeachers={showAllTeachers} />
                <main>
                    {view === 'all' && (
                        <TeacherList
                            teachers={teachers}
                            handleUpdateTeacher={handleUpdateTeacher}
                            handleDeleteTeacher={handleDeleteTeacher}
                        />
                    )}
                    {view === 'add' && <AddTeacherForm handleAddTeacher={handleAddTeacher} />}
                    {view === 'search' && <SearchTeacher handleSearch={handleSearch} />}
                    {view === 'filter' && <FilterTeacher handleFilter={handleFilter} />}
                </main>
            </div>
            <AvgButton fetchAverageClasses={fetchAverageClasses} averageClasses={averageClasses} />
            <Footer />
        </div>
    );
}

export default App;