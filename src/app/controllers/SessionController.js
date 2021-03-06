import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User.js';
import File from '../models/File.js';

import authConfig from '../../config/auth.js';

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = request.body;

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password_hash'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(400).json({ error: 'Wrong password' });
    }

    const { id, name, avatar } = user;

    return response.json({
      user: {
        id,
        name,
        email,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
