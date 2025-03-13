# CV simple react app backend api

## purpose:

This is a simple backend api for my react practice project.

## description:

The api is coded with node / express and is minimal containing end points for Auth and 1 basic private crud sequence.

## learning points:

although this was a utility project. There were few areas I included to learn via implementation:

- Implementing refresh tokens and refresh token rotations for Auth.
- Previously, I had implemented auth via passport local strategy, or jwt with custom auth mw with only 1 https token.
- This time I wanted to use passport for jwt to test it and perhaps add other strategies like social logins.
- I had some practice adding security mw
