import express, { Request, Response } from 'express';
import movieRoutes from './routes/movieRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/movies', movieRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;