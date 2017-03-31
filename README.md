# FitClub 

## Overview

FitClub is a web-based application which is part workout tracker and part social game motivating users to push themselves and take on fitness challenges.  Users start at Level 1 and earn points for workouts and bonuses for meeting set goals which unlock achievements to reach the next Level while competing against other users for top ranking.  Routines have different rewards depending on difficulty which is motivating for the user.  FitClub community members are able to post comments on their workouts or achievements and other users can respond and provide motivation and inspiration.


## Data Model

The application will store Users, Lists and have a comment section and Items

* users can have multiple lists (via references)
* each list can have multiple items (by embedding)

An Example User:

```javascript
{
  username: "mikeymacho",
  hash: // a password hash,
  lists: // an array of references to List documents
}
```

An Example List with Embedded Items:

```javascript
{
  user: // a reference to a User object
  name: "Cardio Routine",
  items: [
    { name: "running", length: "60", checked: false},
    { name: "swimming", length: "120", checked: false},
  ],
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

/list/create - homepage

![homepage](documentation/homepage.png)

/list - page for showing account

![myAccount](documentation/myAccount.png)

/list/slug - page for showing comment section

![socialFeed](documentation/socialFeed.png)


![trackExcercise](documentation/trackExcerise.png)

![dashboard](documentation/dashboard.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a ![Fitclub Site Map (jpeg).png](smt430-final-project/documentation/Fitclub Site Map (jpeg).png), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new Excercise routine
4. as a user, I can view all of the excercise routines I've created in a single list
5. as a user, I can add items to an existing excerices routine
6. as a user, I can check off items that I have completed for that week in an existing excercise routine

## Research Topics

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
* (4 points) Perform client side form validation using a JavaScript library
    * if you put in an excercise alreader in that routine, an error message will appear in the dom

9 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
