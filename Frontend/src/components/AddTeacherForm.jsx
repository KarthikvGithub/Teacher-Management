import React, { useState } from 'react';

const AddTeacherForm = ({ handleAddTeacher }) => {
    const [newTeacher, setNewTeacher] = useState({
        name: '',
        age: '',
        dob: '',
        num_classes: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddTeacher(newTeacher);
        setNewTeacher({ name: '', age: '', dob: '', num_classes: '' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={newTeacher.name} onChange={e => setNewTeacher({ ...newTeacher, name: e.target.value })} />
            <input type="number" placeholder="Age" value={newTeacher.age} onChange={e => setNewTeacher({ ...newTeacher, age: e.target.value })} />
            <input type="date" placeholder="DOB" value={newTeacher.dob} onChange={e => setNewTeacher({ ...newTeacher, dob: e.target.value })} />
            <input type="number" placeholder="Number of Classes" value={newTeacher.num_classes} onChange={e => setNewTeacher({ ...newTeacher, num_classes: e.target.value })} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddTeacherForm;