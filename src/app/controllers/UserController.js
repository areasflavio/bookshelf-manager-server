import * as Yup from 'yup';

import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(request, response) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email'],
      include: {
        model: File,
        as: 'avatar',
        attributes: ['id', 'path', 'url'],
      },
    });

    return response.json(users);
  }

  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
      confirm_password: Yup.string().oneOf([Yup.ref('password'), null]),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email } = request.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const { id, name } = await User.create({
      ...request.body,
      avatar_id: null,
    });

    return response.status(201).json({ id, name, email });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      oldPassword: Yup.string(),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const id = request.userId;
    const { email, oldPassword } = request.body;

    const user = await User.findByPk(id);

    if (!user) {
      return response.status(400).json({ error: 'User not found' });
    }

    if (email !== user.email) {
      return response.status(401).json({ error: "You can't change the email" });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: 'Password does not match' });
    }

    await user.update(request.body);

    const { name, avatar } = await User.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return response.json({ id, email, name, avatar });
  }

  async delete(request, response) {
    const id = request.userId;

    const user = await User.findByPk(id);

    if (!user) {
      return response.status(400).json({ error: 'User not registered' });
    }

    await user.destroy();

    return response.json();
  }
}

export default new UserController();
