/* eslint-disable no-console */
import express, { Express, Request, Response } from 'express';
import {json, urlencoded } from 'body-parser';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import dotenv from 'dotenv';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import connection from './configs/dbConfig';
import { logger } from './utils/consolLogger';
import { createDefaultSuperAdminUser } from './utils/generateDefaultSuperuser';
import indexRoute from './routes/index'; 
import sockets from './sockets/sockets';
import adminRoute from './routes/adminUserRoutes'; 
import usersRoute from './routes/usersRoute'; 
import socketRoomRoute from './routes/sockerRoomsRoute';
import rfidLogsRouter from './routes/rfidLogsRouter';
import adminRoleRoute from './routes/adminRoleRoute';
import rfidListRoute from './routes/rfidListRoute'; 
import foodsRoute from './routes/foodsRoute';
import foodsSensitivityRouter from './routes/foodsSensitivityRouter';


const app: Express = express();
const server = http.createServer(app);
app.use(cors());
const io = new Server(server, { cors: { origin: '*' } });
dotenv.config();
const port = process.env.PORT;

app.use(json());

app.use(urlencoded({extended: true}));

app.use(logger);

app.use('/',indexRoute);
app.use('/admin',adminRoute);
app.use('/user',usersRoute);
app.use('/socketroom',socketRoomRoute);
app.use('/rfidlogs',rfidLogsRouter);
app.use('/adminrole',adminRoleRoute);

app.use('/rfidlist',rfidListRoute);
app.use('/foods',foodsRoute);
app.use('/foodssensi',foodsSensitivityRouter);

const onConnection = (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>) => {
  sockets(io, socket);
};

io.on('connection', onConnection);

app.use((
  err: Error,
  _: Request,
  res: Response,
) => {
  res.status(500).json({message: err.message});
});

app.get('*', (_, res) => {
  res.status(404).send('Not Found Page');
});

connection.sync().then(async() => {
  console.log('Database synced successfully program is runing!');
  await createDefaultSuperAdminUser();
}).catch((err) => console.log(err));

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
