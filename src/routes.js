import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middleware/auth';

const routes = Router();

const upload = multer(multerConfig);

import SessionController from './app/controllers/SessionController';
import BookController from './app/controllers/BookController';
import FileController from './app/controllers/FileController';
import UserController from './app/controllers/UserController';
import ReadingController from './app/controllers/ReadingController';
import FavoriteReadController from './app/controllers/FavoriteReadController';

routes.post('/session', SessionController.store);

routes.post('/users', UserController.store);

routes.use(authMiddleware);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/users', UserController.index);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

routes.get('/books', BookController.index);
routes.get('/books/:id', BookController.show);
routes.post('/books', BookController.store);
routes.put('/books/:id', BookController.update);
routes.delete('/books/:id', BookController.delete);

routes.put('/books/:id/reading', ReadingController.update);
routes.put('/books/:id/favorite', FavoriteReadController.update);

export default routes;
