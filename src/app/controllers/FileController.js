import imgbbUploader from 'imgbb-uploader';

import File from '../models/File.js';

class FileController {
  async store(request, response) {
    const { path } = request.file;

    let file;

    try {
      const response = await imgbbUploader(process.env.IMGBB_API_KEY, path);

      const { image } = response;

      file = await File.findOne({
        where: { name: image.name },
      });

      if (!file) {
        file = await File.create({ name: image.name, path: image.url });
      }
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(201).json(file);
  }
}

export default new FileController();
