# Bookshelf-manager-server

<p align="center">
  <img alt="transactioned" src=".github/logo.png" width="12.5%">
</p>

<h2 align="center">
  This is the server for a virtual bookshelf app that was developed using NodeJS, Express, Sequelize and PostgreSQL.
</h2>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/areasflavio/bookshelf-manager-server.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/areasflavio/bookshelf-manager-server.svg">

  <a href="https://github.com/areasflavio/bookshelf-manager-server/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/areasflavio/bookshelf-manager-server.svg">
  </a>
</p>

<p align="center">
  <a href="#star-features">Features</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer-API-Reference">API Reference</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#keyboard-technologies">Technologies</a>&nbsp;&nbsp;|&nbsp;&nbsp;
  <a href="#computer_mouse-installation">Installation</a>
</p>

# :star: Features

[(Back to top)](#Bookshelf-manager-server)

This is a server API for a virtual bookshelf application. You can create your
account and start registering your books.

Some key features are:

- Create account and register books.
- Password are encrypted with Bcrypt package.
- Authenticated routes using JWT Token.
- Upload your user avatar and the cover of your books.
- Image files host on ImgBB.
- Books filtering options.

The application is built using Node.JS with Express framework. The database is
the PostgreSQL connected by Sequelize ORM. The entire codebase is written using
Javascript.

<p align="center">
  Checkout the <a href="https://bookshelf-manager-server.herokuapp.com">API Live version</a>
	 with a PostgreSQL database hosted on:
</p>
<p align="center">
    <img alt="Heroku" src="https://img.shields.io/badge/heroku-%23430098.svg?&style=for-the-badge&logo=heroku&logoColor=white"/>
</p>

<p align="center">
  You also can check the complete <a href="https://bookshelf-manager.vercel.app">Application Live version</a>
  hosted on:
</p>
<p align="center">
    <img alt="Vercel" src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>

<br/>

# :computer: API-Reference

[(Back to top)](#Bookshelf-manager-server)

### Get welcome message

```http
  GET /
```

## Users

### Create a user

```http
  POST /users
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `name`     | `string` | **Required**. Name of the user     |
| `email`    | `string` | **Required**. Email of the user    |
| `password` | `string` | **Required**. Password of the user |

### Login with a user

```http
  POST /session
```

| Body       | Type     | Description                        |
| :--------- | :------- | :--------------------------------- |
| `email`    | `string` | **Required**. Email of the user    |
| `password` | `string` | **Required**. Password of the user |

<br/>

> All next routes need authentication!

<br/>

### Get all users

```http
  GET /users
```

### Update current user

```http
  PUT /users
```

| Body              | Type     | Description                                         |
| :---------------- | :------- | :-------------------------------------------------- |
| `name`            | `string` | **Optional**. Name of the user                      |
| `email`           | `string` | **Optional**. Email of the user                     |
| `oldPassword`     | `string` | **Optional**. Old password of the user              |
| `password`        | `string` | **Optional**. New Password of the user              |
| `confirmPassword` | `string` | **Optional**. New password confirmation of the user |

### Delete current user

```http
  DELETE /users
```

## Books

### Get books from current user

```http
  GET /books
```

### Get the details of a book

```http
  GET /books/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Id of the book |

### Create a book register

```http
  POST /books
```

| Body                 | Type       | Description                                    |
| :------------------- | :--------- | :--------------------------------------------- |
| `title`              | `string`   | **Required**. Title of the book                |
| `isbn`               | `string`   | **Required**. ISBN of the book                 |
| `genre`              | `string`   | **Required**. Genre of the book                |
| `synopsis`           | `string`   | **Required**. Synopsis of the book             |
| `pages`              | `string`   | **Required**. Pages of the book                |
| `authors`            | `string[]` | **Required**. Authors of the book              |
| `publishing_company` | `string`   | **Required**. Publishing Company of the book   |
| `cover_id`           | `string`   | **Required**. ID of the cover file of the book |

### Update a existing book

```http
  PUT /books/:id
```

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. ID of the book |

| Body                 | Type       | Description                                    |
| :------------------- | :--------- | :--------------------------------------------- |
| `title`              | `string`   | **Required**. Title of the book                |
| `isbn`               | `string`   | **Required**. ISBN of the book                 |
| `genre`              | `string`   | **Required**. Genre of the book                |
| `synopsis`           | `string`   | **Required**. Synopsis of the book             |
| `pages`              | `string`   | **Required**. Pages of the book                |
| `authors`            | `string[]` | **Required**. Authors of the book              |
| `publishing_company` | `string`   | **Required**. Publishing Company of the book   |
| `cover_id`           | `string`   | **Required**. ID of the cover file of the book |

### Delete a existing books

```http
  DELETE /books/:id
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. ID of the books |

### Set/remove an existing book as currently being read

```http
  PUT /books/:id/reading
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. ID of the books |

| Body         | Type      | Description                       |
| :----------- | :-------- | :-------------------------------- |
| `is_reading` | `boolean` | **Required**. Book reading status |

### Set/remove an existing book as favorite

```http
  PUT /books/:id/favorite
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `id`      | `string` | **Required**. ID of the books |

| Body            | Type      | Description                        |
| :-------------- | :-------- | :--------------------------------- |
| `favorite_read` | `boolean` | **Required**. Book favorite status |

## Files

### Upload image file

```http
  POST /files
```

| Body   | Type  | Description              |
| :----- | :---- | :----------------------- |
| `file` | `img` | **Required**. Image file |

<br/>

# :keyboard: Technologies

[(Back to top)](#Bookshelf-manager-server)

This is what i used and learned with this project:

- [x] Node.JS
- [x] Express
- [x] Sequelize
- [x] PostgreSQL
- [x] UUID
- [x] Multer
- [x] Bcryptjs
- [x] JWT
- [x] Yup
- [x] Imgbb Uploader
- [x] Eslint
- [x] Prettier
- [x] Sucrase
- [x] Javascript

<br/>

# :computer_mouse: Installation

[(Back to top)](#Bookshelf-manager-server)

To use this project, first you need NodeJS and PostgreSQL running in your device, then you can follow the commands below:

```bash
# Clone this repository
git clone https://github.com/areasflavio/bookshelf-manager-server.git

# Go into the repository
cd bookshelf-manager-server

# Install dependencies for the backend
yarn install

# Copy the .env.example to the .env file and inject your credentials
cp .env.example .env

# Make sure that you have a proper database created

# Run the migrations
yarn sequelize-cli db:migrate

# To start the express development server, run the following command
yarn dev:server
```

# :man_technologist: Author

[(Back to top)](#Bookshelf-manager-server)

Build by Flávio Arêas 👋 [Get in touch!](https://www.linkedin.com/in/areasflavio/)
