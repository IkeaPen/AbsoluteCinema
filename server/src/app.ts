import express, { Request, Response } from 'express';
import movieRoutes from './routes/movieRoutes';
import movieScreeningRoutes from './routes/movieScreeningRoutes';
import screeningRoutes from './routes/screeningRoutes';
import cinemaHallRoutes from './routes/cinemaHallRoutes';
import cinemaHallScreeningRoutes from './routes/cinemaHallScreeningRoutes';
import cinemaHallSeatRoutes from './routes/cinemaHallSeatRoutes';
import seatRoutes from './routes/seatRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is up!');
});


app.use('/movies', movieRoutes);
app.use('/movies/:movieId/screenings', movieScreeningRoutes);
app.use('/screenings', screeningRoutes);
app.use('/cinema-halls', cinemaHallRoutes);
app.use('/cinema-halls/:cinemaHallId/screenings', cinemaHallScreeningRoutes);
app.use('/cinema-halls/:cinemaHallId/seats', cinemaHallSeatRoutes);
app.use('/seats', seatRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;