import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { register } from './controllers/auth.js'; // For file upload
import { createPost } from './controllers/posts.js'; // For Creating Post
import { verifyToken } from './middleware/auth.js';

// Models
import Users from './models/Users.js';
import Posts from './models/Posts.js';
import { users, posts } from './data/index.js';

// Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// File Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

// upload Routes
app.post("/auth/register", upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/users', userRoutes);

const clearDatabase = async () => {
    try {
        await Users.deleteMany({});
        await Posts.deleteMany({});
        console.log('All users and posts have been deleted');
    } catch (error) {
        console.error('Error deleting users and posts:', error);
    }
};

// clearDatabase();

// Mongoose Connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
            // Users.insertMany(users);
            // Posts.insertMany(posts);
        });
    }).catch((error) => {
        console.log(error.message);
    });