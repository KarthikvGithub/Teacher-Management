import { Router } from 'express';
import { readFileSync, writeFileSync } from 'fs';

const router = Router();
const filePath = './data/teachers.json';

// Utility function to read and write the JSON file
const readFile = () => JSON.parse(readFileSync(filePath));
const writeFile = (data) => writeFileSync(filePath, JSON.stringify(data, null, 2));

// Get all teachers
router.get('/', (req, res) => {
    const teachers = readFile();
    res.json(teachers);
});

// Add a teacher
router.post('/add', (req, res) => {
    const teachers = readFile();
    const newTeacher = req.body;
    teachers.push(newTeacher);
    writeFile(teachers);
    res.status(201).json(newTeacher);
});

// Filter teachers
router.get('/filter', (req, res) => {
    const { age, classes } = req.query;
    let teachers = readFile();
    if (age) teachers = teachers.filter(t => t.age == age);
    if (classes) teachers = teachers.filter(t => t.num_classes == classes);
    res.json(teachers);
});

// Search for a teacher
router.get('/search', (req, res) => {
    const { name } = req.query;
    // console.log(name);
    const teachers = readFile();
    const teacher = teachers.filter(t => t.name.toLowerCase().includes(name.toLowerCase()));
    // console.log(teacher);
    if (teacher) res.json(teacher);
    else res.status(404).json({ message: 'Teacher not found' });
});

// Update a teacher
router.put('/:name', (req, res) => {
    const { name } = req.params;
    const updatedData = req.body;
    console.log(updatedData);
    let teachers = readFile();
    const index = teachers.findIndex(t => t.name.toLowerCase() === name.toLowerCase());
    if (index !== -1) {
        teachers[index] = { ...teachers[index], ...updatedData };
        writeFile(teachers);
        res.json(teachers[index]);
    } else {
        res.status(404).json({ message: 'Teacher not found' });
    }
});

// Delete a teacher
router.delete('/:name', (req, res) => {
    const { name } = req.params;
    let teachers = readFile();
    const newTeachers = teachers.filter(t => t.name.toLowerCase() !== name.toLowerCase());
    if (newTeachers.length !== teachers.length) {
        writeFile(newTeachers);
        res.json({ message: 'Teacher deleted' });
    } else {
        res.status(404).json({ message: 'Teacher not found' });
    }
});

// Calculate average number of classes
router.get('/average-classes', (req, res) => {
    const teachers = readFile();
    const totalClasses = teachers.reduce((acc, t) => acc + (Number(t.num_classes) || 0), 0);
    const avgClasses = totalClasses / (teachers.length || 1); // Avoid division by zero
    res.json({ average_classes: avgClasses });
    // console.log(avgClasses);
});

export default router;