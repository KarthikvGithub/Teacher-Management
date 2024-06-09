import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import teacherRoutes from './routes/teachers.js';

const app = express();
app.use(bodyParser.json());

app.use(cors({
    origin: 'https://teacher-management-react.onrender.com'
}));

app.use('/api/teachers', teacherRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));