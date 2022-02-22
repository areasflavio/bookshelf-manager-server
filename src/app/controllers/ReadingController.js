import Book from '../models/Book.js';

class ReadingController {
  async update(request, response) {
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

    const { is_reading } = request.body;

    const {
      title,
      isbn,
      genre,
      synopsis,
      publishing_company,
      cover,
      authors,
      pages,
      favorite_read,
    } = await book.update({ is_reading, user_id: request.userId });

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
}

export default new ReadingController();
