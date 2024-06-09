import TeacherCard from './TeacherCard';

const TeacherList = ({ teachers, handleUpdateTeacher, handleDeleteTeacher }) => {
    return (
        <div>
            {teachers.map(teacher => (
                <TeacherCard
                    key={teacher.name}
                    teacher={teacher}
                    handleUpdateTeacher={handleUpdateTeacher}
                    handleDeleteTeacher={handleDeleteTeacher}
                />
            ))}
        </div>
    );
};

export default TeacherList;