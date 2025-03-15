# "CV Simple" react CV creator app backend api

* live preview : https://cv-simple-react.netlify.app/
* frontend code : https://github.com/kad5/TOP-CV-app

## purpose:

This is a simple backend api for my react practice project.

## description:

The api is coded with node / express and is minimal containing end points for Auth and 1 basic private crud sequence.
  - Login
  - Signup
  - Logout
  - Add a refresh token
  - Update refresh token
  - Delete refresh token
  - Get all drafts
  - Add a draft
  - Update a draft
  - delete a draft

## learning points:

although this was a utility project. There were few areas I included in it so i can learn via implementation:

- Implementing refresh tokens and refresh token rotations for Auth. Previously, I had implemented auth via passport local strategy, and jwt with custom auth mw with only 1 https token. This time I wanted to use passport for jwt to test it and perhaps add other strategies like social logins.
- wanted to try to store objects in postgresql bd with prisma via jsonob
- I had some practice adding security mw to ensure backend api is secure from attacks
- more practice on planning and excuting an api codebase. This time i felt very organized and the whole codebase took few hours only, a large portion of it was testing.
- more CORS handling practice. I learned alot about https and security.
