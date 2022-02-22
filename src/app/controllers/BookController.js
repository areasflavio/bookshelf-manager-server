import * as Yup from 'yup';

import Book from '../models/Book.js';
import File from '../models/File.js';

class BookController {
  async index(request, response) {
    const books = await Book.findAll({
      where: { user_id: request.userId },
      attributes: [
        'id',
        'isbn',
        'title',
        'synopsis',
        'genre',
        'publishing_company',
        'pages',
        'authors',
        'is_reading',
        'favorite_read',
      ],
      include: {
        model: File,
        as: 'cover',
        attributes: ['path', 'url'],
      },
    });

    return response.json(books);
  }

  async show(request, response) {
    const book = await Book.findByPk(request.params.id, {
      where: { user_id: request.userId },
      attributes: [
        'id',
        'isbn',
        'title',
        'synopsis',
        'genre',
        'publishing_company',
        'pages',
        'authors',
        'is_reading',
        'favorite_read',
      ],
      include: {
        model: File,
        as: 'cover',
        attributes: ['id', 'path', 'url'],
      },
    });

    if (!book) {
      return response.status(400).json({ error: 'Book not found' });
    }

    return response.json(book);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      isbn: Yup.string().required(),
      title: Yup.string().required(),
      genre: Yup.string().required(),
      synopsis: Yup.string(),
      publishing_company: Yup.string().required(),
      pages: Yup.string().required(),
      authors: Yup.array().of(Yup.string()).required(),
      cover_id: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { isbn } = request.body;

    const bookExists = await Book.findOne({ where: { isbn } });

    if (bookExists) {
      return response.status(401).json({ error: 'Book already registered' });
    }

    const {
      id,
      title,
      genre,
      synopsis,
      publishing_company,
      cover_id,
      pages,
      authors,
      is_reading,
      favorite_read,
    } = await Book.create({ ...request.body, user_id: request.userId });

    return response.status(201).json({
      id,
      isbn,
      title,
      genre,
      synopsis,
      publishing_company,
      cover_id,
      pages,
      authors,
      is_reading,
      favorite_read,
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      isbn: Yup.string().required(),
      title: Yup.string().required(),
      genre: Yup.string().required(),
      synopsis: Yup.string(),
      publishing_company: Yup.string().required(),
      pages: Yup.string().required(),
      authors: Yup.array().of(Yup.string()).required(),
      // cover_id: Yup.number(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { id } = request.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return response.status(400).json({ error: 'Book not registered' });
    }

    if (book.user_id !== request.userId) {
      return response
        .status(401)
        .json({ error: "You're not allowed to edit this book" });
    }

    const { isbn } = request.body;

    const bookExists = await Book.findOne({
      where: { isbn },
    });

    if (bookExists && book.id !== bookExists.id) {
      return response.status(400).json({ error: 'Book already registered' });
    }

    const {
      title,
      genre,
      synopsis,
      publishing_company,
      cover,
      authors,
      pages,
      is_reading,
      favorite_read,
    } = await book.update({ ...request.body, user_id: request.userId });

    return response.status(200).json({
      id,
      isbn,
      title,
      genre,
      synopsis,
      publishing_company,
      cover,
      authors,
      pages,
      is_reading,
      favorite_read,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return response.status(400).json({ error: 'Book not registered' });
    }

    if (book.user_id !== request.userId) {
      return response
        .status(401)
        .json({ error: "You're not allowed to edit this book" });
    }

    await book.destroy();

    return response.json();
  }
}

export default new BookController();
