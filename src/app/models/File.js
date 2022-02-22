import Sequelize from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const { Model } = Sequelize;

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${this.path}`;
          },
        },
      },
      {
        sequelize,
        modelName: 'file',
      }
    );

    this.addHook('beforeSave', async (file) => {
      if (!file.id) {
        file.id = uuidv4();
      }
    });

    return this;
  }
}

export default File;
