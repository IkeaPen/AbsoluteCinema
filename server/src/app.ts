import express, { Request, Response } from 'express';
import movieRoutes from './routes/movieRoutes';
import movieScreeningRoutes from './routes/movieScreeningRoutes';
import screeningRoutes from './routes/screeningRoutes';
import cinemaHallRoutes from './routes/cinemaHallRoutes';
import cinemaHallScreeningRoutes from './routes/cinemaHallScreeningRoutes';
import cinemaHallSeatRoutes from './routes/cinemaHallSeatRoutes';
import seatRoutes from './routes/seatRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';
import { setupSwagger } from './config/swagger';
import cookieParser from "cookie-parser";
import cors from "cors";
import screeningTicketRoutes from './routes/screeningTicketRoutes';
import ticketRoutes from './routes/ticketRoutes';

const app = express();
const port = process.env.PORT || 3000;
const frontURL = process.env.FRONT_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: frontURL,
    credentials: true,
  })
);

setupSwagger(app);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is up!');
});

app.use('/movies', movieRoutes);
app.use('/movies/:movieId/screenings', movieScreeningRoutes);
app.use('/screenings', screeningRoutes);
app.use('/screenings/:screeningId/seats', screeningTicketRoutes);
app.use('/cinema-halls', cinemaHallRoutes);
app.use('/cinema-halls/:cinemaHallId/screenings', cinemaHallScreeningRoutes);
app.use('/cinema-halls/:cinemaHallId/seats', cinemaHallSeatRoutes);
app.use('/seats', seatRoutes);
app.use('/tickets', ticketRoutes);

app.use('/', authRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;