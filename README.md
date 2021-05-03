# dgm-4790-server-test

Server for the GraphQL API node Server for DGM 4790. 

If you're wondering why the repo is called "server-test", I had initially planned to make this repo a sort of testing ground for connecting all the technologies for this application, and making some kind of blueprint for me to make the actual project on. Unfortunately, I spent a lot of time trying to figure out getting the technologies to work together (mainly Prisma), and unfortunately I wasn't able to get Prisma working, so I had to cut my losses and not include the database for this project. However, everything else is here; GraphQL, Apollo, Node and React are implemented, and everything is deployable using Docker. The site is deployed live on DigitalOcean using docker containers. 

## Deploying locally without Docker

This application has two parts to it that need their NPM dependencies installed; one for the GraphQL server, and one for the frontend React App. The GraphQL server is located at the root of the repo and the main file is server.js. The react app is located in the client folder, and made using the Create React App package. 

To install the NPM dependencies for both parts of the application, do `npm install` in the root directory to install the dependencies for the GraphQL server, then `cd client` to go into the folder for the React app, and do `npm install`. Return to the root directory by typing `cd ..`. 

To run both the client and the server at the same time, I have installed a package called concurrently that lets you run two processes at the same time, so there is no need to open two terminals; you just to run `npm run dev` in the root directory of the project to start both the GraphQL server and React App at the same time.

## Deploying locally with Docker

To deploy locally with docker, you need to build two images; one for the GraphQL server and one for the frontend React app. There is a Dockerfile in the root directory, which is for the GraphQL server. The Dockerfile for the React app is located in the client folder. 

To build the image for the GraphQL server, make sure you are in the root directory and type in `docker build -t [your name] .`. To build the image for the React App, go to the client directory by typing in `cd client`, and then run `docker build -t [your name] .`. Now that you have the two images for the application built, now you need to run them. You can use the graphical interface with Docker Desktop, or you can run the images by typing in `docker run -d -p 3535:3535 [your name]` for the GraphQL server, and `docker run -d -p 4646:4646 [your name]` for the React server. The GraphQL server _must_ be hosted on port 3535 because that is where the Apollo client in the React App connects to. You can change this if you would like though.

## Queries

### Query resolvers

**forum** - Get a single forum by its `id`.

Example:
```
query ($id: String) {
  forum (id: $id) {
    id
    name
    description
    comments {
      id
      title
      date 
      body
      forum
    }
  } 
}
```

**forums** - Get a list of all the forums and their comments on the server.

Example:
```
query {
  forums {
    id
    name
  } 
}
```

**comment** - Get a single comment by its `id`.

Example:
```
query ($id:String) {
  comment(id:$id) {
    id
    title
    date
    body
    forum
  }
}
```

### Mutation resolvers

**addComment** - Add a comment to a forum. Required arguments are the `title`, `body`, and the `forum` id.

Example:
```
mutation ($title:String!, $body:String!, $forum:String!) {
  addComment(title:$title, body:$body, forum:$forum) {
    title
    body
    forum
    date
    id
  }
}
```

**editComment** - Edit a comment. Required arguments are the `id` of the comment you want to edit, as well as the `title` and `body`. 

Example:
```
mutation ($title:String!, $body:String!, $id:String!) {
  editComment (id:$id, title:$title, body:$body) {
    title
    body
    forum
    date
    id
  }
}
```


**deleteComment** - Delete a comment. The required argument for this is the `id` of the comment you want to delete.

Example:
```
mutation ($id:String!) {
  deleteComment(id:$id) {
    id
    name
    description
    comments {
      id
      title
      date 
      body
      forum
    }
  }
}
```
