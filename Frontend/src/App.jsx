import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import TeacherList from './components/TeacherList';
import AddTeacherForm from './components/AddTeacherForm';
import SearchTeacher from './components/SearchTeacher';
import FilterTeacher from './components/FilterTeacher';
import Footer from './components/Footer';
import AvgButton from './components/AvgButton';

const link = process.env.API_BASE_URL;

console.log(process.env.API_BASE_URL);

function App() {
    const [teachers, setTeachers] = useState([]);
    const [view, setView] = useState('all');
    const [averageClasses, setAverageClasses] = useState(null);

    useEffect(() => {
        fetchTeachers();
    }, []);

    const fetchTeachers = async () => {
        const response = await axios.get(`${link}/api/teachers`);
        setTeachers(response.data);
    };

    const handleAddTeacher = async (newTeacher) => {
        await axios.post(`${link}/api/teachers/add`, newTeacher);
        fetchTeachers();
        setView('all');
    };

    const handleSearch = async (name) => {
        try {
            const response = await axios.get(`${link}/api/teachers/search?name=${name}`);
            setTeachers(response.data);
            setView('all');
        } catch (error) {
            setTeachers([]);
        }
    };

    const handleFilter = async (age, classes) => {
        const response = await axios.get(`${link}/api/teachers/filter`, {
            params: { age, classes }
        });
        setTeachers(response.data);
        setView('all');
    };

    const handleUpdateTeacher = async (name, updatedData) => {
        await axios.put(`${link}/api/teachers/${name}`, updatedData);
        fetchTeachers();
    };

    const handleDeleteTeacher = async (name) => {
        await axios.delete(`${link}/api/teachers/${name}`);
        fetchTeachers();
    };

    const fetchAverageClasses = async () => {
        const response = await axios.get(`${link}/api/teachers/average-classes`);
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