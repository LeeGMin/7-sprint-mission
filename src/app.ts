import 'dotenv/config';
import express from 'express';
import path from 'path';
import articleRouter from './router/article.router.js';
import productRouter from './router/product.router.js';
import { errorHandler } from './middlewares/errorHandler.js';
import commentRouter from './router/comment.router.js';
import authRouter from './router/auth.router.js';
import userRouter from './router/user.router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  }),
);
app.use(cookieParser());

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/article', articleRouter);
app.use('/product', productRouter);
app.use('/comment', commentRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.use(errorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

export default app;
