# Members Only

An online chatroom

<div align="center">
  <kbd>
    <img src="https://i.imgur.com/wNk00B2.png" />
  </kbd>
</div>

## Description

Users must create an account in order to access the website.  Once created, they need to enter the secret code (hint provided) in order to become a member and gain full access to the chat

### Features

- MVC design pattern
- Fully built on the back-end, using EJS for view templating
- Security handled with Passport and Bcrypt
- Authorization handled with express-session
- MongoDB database
- Validate and sanitize form entries
- Admin controls to edit and delete posts

### Built with

- Node.js
- Express.js
- EJS
- MongoDB
- Mongoose ODM
- Passport
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
- run ```npm run devstart``` to start the server and open a locally hosted version of the app

### Configure

- The MongoDB URI and Bcrypt secret codes are hidden using a .env file for security reasons.  In order for a new developer to use this app, they would either need access to those codes, or create their own database and encryption

### Usage

- Creating a new account:
<div align="center">
  <kbd>
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWdsdTU3MDIzNnk1dHYyZDFuenQwZW1kam1lODBtMmhsYmk1ZmVlaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U3U5bH0NIrDZpwQuJx/giphy.gif"/>
  </kbd>
</div>

<br></br>

- Becoming a member:
<div align="center">
  <kbd>
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXI3ZnV5MXZjc3VnY2QyMGt5bjc5cXRzb3JrN2lmb3ZldTVzbjFjdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZESouWvlwCkDWqsc7g/giphy.gif"/>
  </kbd>
</div>

<br></br>

- Chatting with members:
<div align="center">
  <kbd>
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXI3ZnV5MXZjc3VnY2QyMGt5bjc5cXRzb3JrN2lmb3ZldTVzbjFjdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZESouWvlwCkDWqsc7g/giphy.gif"/>
  </kbd>
</div>

<br></br>

- Admin controls:
<div align="center">
  <kbd>
    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNXI3ZnV5MXZjc3VnY2QyMGt5bjc5cXRzb3JrN2lmb3ZldTVzbjFjdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ZESouWvlwCkDWqsc7g/giphy.gif"/>
  </kbd>
</div>
