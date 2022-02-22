import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer.js';

import authMiddleware from './app/middleware/auth.js';

const routes = Router();

const upload = multer(multerConfig);

import SessionController from './app/controllers/SessionController.js';
import BookController from './app/controllers/BookController.js';
import FileController from './app/controllers/FileController.js';
import UserController from './app/controllers/UserController.js';
import ReadingController from './app/controllers/ReadingController.js';
import FavoriteReadController from './app/controllers/FavoriteReadController.js';

routes.get('/', (request, response) => {
  return response.json({ message: 'This is the Bookshelf Manager server.' });
});

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
