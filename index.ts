import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import {authRoutes} from './routes/index';

export const app = express();
app.use(json());
app.use( cookieSession({ signed: false, httpOnly: true,secure : process.env.NODE_ENV !== 'test' }) );

app.use('/api/users/auth' ,authRoutes);
if (process.env.NODE_ENV !== 'test') {
    app.listen( 3000 , ()=> console.log('App listening on 3000!!!!'));
}