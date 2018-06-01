# Bootstrap architecture for the project

## What it does

I have created a sample single-page-website with a navigation menu which can query an API-server to fill its pages with dynamic content. 
 
It shows a preliminary MEAN stack architecture for the project. It uses MongoDB, Express.js, Angular.js, and Node.js.

## Try it out

Follow these steps:
1. install Node.js for your OS
2. clone project
3. open console and navigate to project
4. run 'npm install'
5. run 'npm start'
6. Open your browser and visit localhost:3000

To see how examples are queued from the database and then shown on the website, you have to install MongoDB on your system. https://docs.mongodb.com/manual/administration/install-community/

The correct starting command for the MongoDB service is dependent on your system, but goes roughly like this:

    "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath path/to/db/directory
    
where you have to replace the path/to/db/directory with the ABSOLUTE path (C:/.../.../db) to the database directory. Take the db directory that is included in this project.

It may happen that you will not see and activites on the homepage, when using the db form this git. This is because the homepage only shows the most recent activites and the activities on the database are simply "too old". In this case, delete all activities in the database (with the MongoDB Compass Community Software) and run `npm run populate` which will populate the DB with new activities with current time stamps.

# A teeny tiny bit of documentation

## Database stuff

### User

A regular user with an id that can be associated with any other database object.

special fields: 

password: sha256 hashed password + salt

password_salt: timestamp of user creation that is used as a password salt, so that one cannot unhash the password to retrieve the real clear text.

### Session

Once a user logs in, a session is given to him. When the session expires, the user will be logged out automatically.

special fields:

nonce: timestamp of session creation which is incremented each time the session is renewed (when user visits a subsite that requires authentification). If the nonce is too old (e.g. phishing attack), the user will be logged out automatically.

expired: when the user logs out, expired = true

### Activity

An activity/job that a user can post and apply for.