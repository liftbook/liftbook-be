# Welcome to LiftBook's BackEnd README 

Allow this illustrious tome to be your guide to the database and all things
API related!

Your backend developers will continue to update this README as we complete objectives
and add more functionality to the API.

## Table of Contents

- [Endpoints](#Endpoints)
   - [User](#User)
   - [Exercise](#Exercise)
   - [Goal](#Goal)
- [Support](#support)
- [Credits](#credits)

# Endpoints

The API is hosted at `https://lift-book.herokuapp.com/api/`. Please make sure you are adding that complete
URL before the endpoint route.

The following endpoints are available for use in your React app. Go crazy!


## User

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


## Exercise

```
POST -- /exercises 
Returns: object
Function: Adds an exercise to the database, returns that exercise
Data Structure:
    name: "" - required
    username: "" - required
    description: "" - required
    icon_src: "" - optional

GET -- /exercises
Returns: array of objects
Function: Returns all exercises

GET -- /exercises/[exercise name or id]
Returns: object
Function: Returns a single exercise

PUT -- /exercises/[exercise name or id]
Returns: object
Function: Returns an updated exercise

DELETE -- /exercises/[exercise name or id]
Returns: object
Function: Returns a successful message
```

## Goal

```
POST -- /goals
Returns: object
Function: Adds a goal to the database, returns that goal
Data Structure:
    gid: "" - required
    uid: "" - required
    eid: "" - required
    duration: "" - optional
    repetitions: "" - optional
    distance: "" - optional
    heart_rate: "" - optional
    weight: "" - optional
    calories: "" - optional
    dateTime: "" - optional

GET -- /goals
Returns: array of objects
Function: Returns all goals

GET -- /goals/[goal id]
Returns: object
Function: Returns a single goal

GET -- /users/[username]/goals
Returns: array of objects
Function: Returns all goals for one user

GET -- /users/[username]/goals/[exercise name or id]
Returns: array of objects
Function: Returns all goals for one exercise

PUT -- /goals/[goal id]
Returns: object
Function: Returns an updated goal

DELETE -- /goals/[goal id]
Returns: object
Function: Returns a successful message
```

# Support

Please contact Dustin or Mychal via Slack, fax, or payphone for support with any issues. We also
accept messages by carrier pidgeon.


# Credits

The API you are using has been brought to you by Double Dragon Development!
    
Dustin Snoap - Back End Engineer, Pizza Roll Master of the 9th circle

Mychal Hall - Back End Engineer, Overseer of General Snack Distribution

```
______            _     _       ______                             
|  _  \          | |   | |      |  _  \                            
| | | |___  _   _| |__ | | ___  | | | |_ __ __ _  __ _  ___  _ __  
| | | / _ \| | | | '_ \| |/ _ \ | | | | '__/ _` |/ _` |/ _ \| '_ \ 
| |/ / (_) | |_| | |_) | |  __/ | |/ /| | | (_| | (_| | (_) | | | |
|___/ \___/ \__,_|_.__/|_|\___| |___/ |_|  \__,_|\__, |\___/|_| |_|
                                                  __/ |            
                                                 |___/    

______               _                                  _   
|  _  \             | |                                | |  
| | | |_____   _____| | ___  _ __  _ __ ___   ___ _ __ | |_ 
| | | / _ \ \ / / _ \ |/ _ \| '_ \| '_ ` _ \ / _ \ '_ \| __|
| |/ /  __/\ V /  __/ | (_) | |_) | | | | | |  __/ | | | |_ 
|___/ \___| \_/ \___|_|\___/| .__/|_| |_| |_|\___|_| |_|\__|
                            | |                             
                            |_|      

```