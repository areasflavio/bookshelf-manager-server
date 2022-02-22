import Sequelize from 'sequelize';

import databaseConfig from '../config/database.js';

import Book from '../app/models/Book.js';
import File from '../app/models/File.js';
import User from '../app/models/User.js';

const models = [Book, File, User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

export default new Database();
