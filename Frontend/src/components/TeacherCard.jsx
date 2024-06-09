import React, { useState } from 'react';
import UpdateTeacherForm from './UpdateTeacherForm';

const TeacherCard = ({ teacher, handleDeleteTeacher }) => {
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    const handleToggleUpdateForm = () => {
        setShowUpdateForm(!showUpdateForm);
    };

    return (
        <div className="teacher-card">
            {!showUpdateForm ? (
                <>
                    <div>
                        <pre>
                            <p><strong>Name</strong>        :{teacher.name}</p>
                            <p><strong>Age</strong>         :{teacher.age}</p>
                            <p><strong>DOB</strong>         :{teacher.dob}</p>
                            <p><strong>Class Count</strong> :{teacher.num_classes}</p>
                        </pre>
                    </div>
                    <div>
                        <button onClick={handleToggleUpdateForm}>Update</button>
                        <button onClick={() => handleDeleteTeacher(teacher.name)}>Delete</button>
                    </div>
                </>
            ) : (
                <UpdateTeacherForm teacher={teacher} handleUpdate={() => handleToggleUpdateForm()} />
            )}
        </div>
    );
};

export default TeacherCard;