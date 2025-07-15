import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import taskRoutes from './routers/task.js';
import authRoutes from './routers/auth.js';
import userRoutes from './routers/users.js';


const app = express();
const PORT = 4000;
app.use(express.json());



console.log("server is running" , process.env.MONGODBURL);
mongoose.connect(process.env.MONGODBURL)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Hello,........... World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/task", taskRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);