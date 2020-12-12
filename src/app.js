const express = require('express');
const loaders = require('./loaders');

const app = express();

(async function configureApp() {
  await loaders(app);
}());
