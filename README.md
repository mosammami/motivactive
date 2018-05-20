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
