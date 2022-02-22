import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const { Model } = Sequelize;

class Book extends Model {
  static init(sequelize) {
    super.init(
      {
        isbn: Sequelize.STRING,
        title: Sequelize.STRING,
        genre: Sequelize.STRING,
        synopsis: Sequelize.STRING,
        publishing_company: Sequelize.STRING,
        pages: Sequelize.STRING,
        authors: Sequelize.ARRAY(Sequelize.STRING),
        is_reading: Sequelize.BOOLEAN,
        favorite_read: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        modelName: 'book',
      }
    );

    this.addHook('beforeSave', async (book) => {
      if (!book.id) {
        book.id = uuidv4();
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.file, {
      foreignKey: 'cover_id',
      as: 'cover',
    });

    this.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'user',
    });
  }
}

export default Book;
