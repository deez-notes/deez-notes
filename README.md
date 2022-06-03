# CS35L Final Project: Deez Notes

## Description

Deez Notes is a social media platform for sharing songs you love with your friends. Users can post songs and follow each other to see other users' posts.
[Final Presentation Slides](https://docs.google.com/presentation/d/1cnw10erzFvxEA0wO7GezE7An-rWZCICFqS-IWicw0Wk/edit?usp=sharing)

## Key Features
  1. Create an account, log in, and log out
  2. Create posts with tags
  3. Comment on and rate posts
  4. Search posts by tag
  5. Search for other users and view their profiles
  6. Follow or unfollow other users
  7. View a feed of posts from users you follow
  8. Update your profile to change information or add more
  9. Delete your posts

## Running the Application on POSIX

Clone the repository:

##### `git clone https://github.com/deez-notes/deez-notes.git`

##### `cd deez-notes`

Initialize npm and install dependencies:

##### `./initialize`

Run webapp

##### `./startup`

## Running the Application on Windows

Clone the repository:

##### `git clone https://github.com/deez-notes/deez-notes.git`

##### `cd deez-notes`

Initalization
```
cd backend
pip3 install -r requirements.txt
cd ..
cd frontend
npm i
cd ..
```

Running the Program
- In one terminal window run these commands to start the backend
```
cd backend
uvicorn backend:app --reload
```
- In another run these commands to start the frontend
```
cd frontend
npm start
```
