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

Follow the instructions and create a new databased named "motivactive". Right now I haven't uploaded a database with dummy entries, so you'd have to create them yourself:

1 table called "activities" in which each activity has at least following attributes: title, description, reward. That is what the dummy website needs at this point.

1 table called "users". At this point the user doesn't need any attributes.

For the future I will create a dummy database with default entries that we can share while working on this project.