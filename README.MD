# Welcome to LiftBook's BackEnd README 

Allow this illustrious tome to be your guide to the database and all things
API related!

Your backend developers will continue to update this README as we complete objectives
and add more functionality to the API.

## Table of Contents

- [Endpoints](#Endpoints)
- [Support](#support)
- [Credits](#credits)

## Endpoints

The API is hosted at `https://lift-book.herokuapp.com/api/`

The following endpoints are available for use in your React app. Go crazy!


# User Endpoints

```
POST -- /users/register 
Returns: object
Function: Adds a user to the database, returns that user
Data Structure:
    username: "" - required
    password: "" - required
    email: "" - required
    first_name: "" - required
    last_name: "" - required
    avatar_src: "" - optional

POST -- /users/login
Returns: object
Function: Returns "login successful" and authorization token
Data Structure:
    username: "" - required
    password: "" - required

GET -- /users
Returns: array of objects
Function: Returns all users

GET -- /users/[username]
Returns: object
Function: Returns a single user

PUT -- /users/[username]
Returns: object
Function: Returns an updated user

DELETE -- /users/[username]
Returns: object
Function: Returns {message: 'user [username] has been removed'}
```


## Support

Please contact Dustin or Mychal via Slack, fax, or by payphone for support with any issues. We also
accept messages by carrier pidgeon.

## Credits

The API you are using has been brought to you by Double Dragon Development!
    
Dustin Snoap - Back End Engineer, Pizza Roll Master of the 9th circle

Mychal Hall - Back End Engineer, Overseer of General Snack Distribution