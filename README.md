# Home - The Social Media site built around people dealing with cancer, allowing them to be able to chat in chat rooms, add each other as friends, message each other, and make posts. If you feel like you are all alone, you always have a Home here where people are in the same shoes as you and understand you on a personal level. 

## Idea and Users
- The idea is for users to be able to create an account and be able to talk with people who are in the same boat as you. During these times of Covid-19, cancer patients are all alone while getting treatments, all alone in fear of their immune system being compromised. The goal is to bring everyone together. Build a family and network of friends in a new home designed to remove that lonliness. If you are newly diagnosed, you will find family here willing to take you in and help you understand and remove that fear.

## Features 
- My MVP is being able to create an account, be able to make posts, view posts, chat in a chat room.
- Bonus features will be to add friends, DM them comment on posts and like posts.

## Endpoints
### Auth Endpoints
- POST '/api/auth/register'. req.body = email, password, first name, last name, username. (a@aol.com, password, eric, camp, trix)
- Send username and userId
- POST '/api/auth/login' req.body = email, password( a@aol.com, password)
- Send username and userId

### Post Endpoints 
- GET '/api/posts' will send all posts. 
- GET '/api/posts/:id' will send that specific post they want to view.
- POST '/api/posts/:id' will allow the user to create a new post.
- PUT '/api/posts/:id' will allow the user to edit their post.
- DELETE '/api/posts/:id' will allow the user to delete their post. 

## Schemas
- create a table called users that will have 6 columns (id as serial primary key, email with a varchar, password with a varchar, first name with a varchar, last name with a varchar, username with a varchar)
- create a table called posts that will have 5 columms (id as a serial primary key, title with a varchar, img as text, content as varchar, author_id integer that references users id)
- create a table called messages that will have 3 columns (id as a serial primary key, messages as a varchar, time as to_timestamp, and user_id that references users id.)

## Point Plan
- Have it responsive in at least 3 different screen sizes for 10 points.
- React redux in at least one store for 5 points and write to store for 5 points.
- I will be using only hooks on at least 5 components for 10 points. 
- Fully working authentication for 10 points 
- I will be using sockets, at least 10 points. 
- I will implement nodemailer for 10 points.
- I will implement Sass/Less for 5 - 10 points.
- I will use 20 - 40 lines of inline css for 5 points. 
- I will host for 10 points. 

