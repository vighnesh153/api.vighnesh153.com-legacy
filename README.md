# api.vighnesh153.com

A generic api for all subdomains on [vighnesh153.com](https://vighnesh153.com)

### Steps
Done
* [x] `mkdir api-vighnesh153-com`
* [x] `cd api-vighnesh153-com`
* [x] `git init`
* [x] `npm init -y`
* [x] `npx gitignore node`
* [x] `echo "\n\n\n### CUSTOM \n\n.idea" >> .gitignore`
* [x] `npm i express cors dotenv`
* [x] `npm i -D @types/express @types/node nodemon prettier`
* [x] `export PATH="./node_modules/.bin:$PATH"`
* [x] `npm install eslint`
* [x] `eslint --init` <br>
  My Answers:
  - How would you like to use ESLint? To check syntax, find problems, and enforce code style
  - What type of modules does your project use? CommonJS (require/exports)
  - Which framework does your project use? None of these
  - Does your project use TypeScript? No
  - Where does your code run? Node
  - How would you like to define a style for your project? Use a popular style guide
  - Which style guide do you want to follow? Airbnb
  - What format do you want your config file to be in? Javascript
* [x] `npm install mongoose`
* [x] `touch docker-compose.yml`
* [x] `INIT_CWD="$(pwd)" npm install husky --save-dev`
* [x] `npm install winston winston-daily-rotate-file`
* [x] `npm install --save-dev eslint-plugin-security`
* [x] `npm install axios`

Todo
* [ ] Make winston work properly with PM2


# Database
#### Auth
Collections:
* Sessions

#### General 
Collections:
* Users
