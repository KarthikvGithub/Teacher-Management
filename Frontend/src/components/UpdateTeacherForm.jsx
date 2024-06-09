import React, { useState } from 'react';
import axios from 'axios';

const UpdateTeacherForm = ({ teacher, handleUpdate }) => {
    const [updatedTeacher, setUpdatedTeacher] = useState({
        name: teacher.name,
        age: teacher.age,
        dob: teacher.dob,
        num_classes: teacher.num_classes
    });

    const handleChange = (e) => {
        setUpdatedTeacher({ ...updatedTeacher, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://teacher-management-5ms3.onrender.com/api/teachers/${teacher.name}`, updatedTeacher);
            handleUpdate(response.data);
        } catch (error) {
            console.error('Error updating teacher:', error);
        }
    };

    return (
        <form className="update-form" onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={updatedTeacher.name} onChange={handleChange} />
            <input type="number" name="age" placeholder="Age" value={updatedTeacher.age} onChange={handleChange} />
            <input type="date" name="dob" placeholder="DOB" value={updatedTeacher.dob} onChange={handleChange} />
            <input type="number" name="num_classes" placeholder="Number of Classes" value={updatedTeacher.num_classes} onChange={handleChange} />
            <button type="submit">Update</button>
        </form>
    );
};

export default UpdateTeacherForm;
