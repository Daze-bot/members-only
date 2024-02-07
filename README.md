# Members Only

A REST API back-end server

<div align="center">
  <kbd>
    <img src="https://i.imgur.com/wNk00B2.png" />
  </kbd>
</div>

## Description

An API only back-end that supports the <a href="https://github.com/Daze-bot/blog-consumer">Blog</a> and <a href="https://github.com/Daze-bot/blog-author">Blog Author</a> front-ends in order to make CRUD operations on the MongoDB database

### API Calls
- Direct API calls to https://daze-blog-api.fly.dev (*Note: this website will display "Not Found" if accessed directly as it is for API calls only*)

### Features
- MVC design pattern
- RESTful API
- Security handled with Passport and Bcrypt
- Authorization handled with JSON Web Token
- MongoDB database management

### Built with

- Node.js
- Express.js
- MongoDB
- Mongoose ODM
- Passport
- JWT
- Bcryptjs
- Fly.io hosting
- Dotenv

## Getting started

### Prerequisites

- Built on Ubuntu 20.04
- Install npm on local machine

### Install

- Clone the github repository
- run ```npm install``` to install all dependencies
- run ```npm run devstart``` to start the server and allow for API calls to localhost

### Configure

- The MongoDB URI and Bcrypt secret codes are hidden using a .env file for security reasons.  In order for a new developer to use this API, they would either need access to those codes, or create their own database and encryption

### Usage

- GET, POST, PUT, and DELETE API calls should be directed to the appropriate <a href="https://github.com/Daze-bot/blog-api/tree/main/routes">Routes</a> in order to make changes to the database and subsequently update the front-end apps
- Certain routes are protected and require user authorization via a JWT which is acced by calling /users/login and inputting valid credentials
- The JWT must be included in the request header to access protected routes
