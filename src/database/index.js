import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Book from '../app/models/Book';
import File from '../app/models/File';
import User from '../app/models/User';

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
