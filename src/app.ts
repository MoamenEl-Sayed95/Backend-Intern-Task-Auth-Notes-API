import express from 'express';;
import { logger } from './middleware/logger';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/note.routes';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';

const app = express();

app.use(express.json());
app.use(logger);

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;