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

Cannot figure out how to make the link, will find out for next time, but homeScreen is in  documentation


/list - page for showing account

myAccount is in documentation

/list/slug - page for showing comment section

socialFeed is in documentation


trackExcercise is in documentation

dashboard is in documentation

## Site map

Linking is not working but site map is in documentation

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

2. Research creating a Social Feed
* What?   The social feed message board is the component of FitClub which allows the users to connect through posting comments and uploading fitness related photos
*  Why?  It is important because users can post about personal fitness goals and achievements and other users comment and provide motivation or encouragement and adds a feeling of community to FitClub. 
*  Solution?   Create a online forum on FitClub by using an opensource plug-in such as Simple-Press
* Points?  Need to research how to allow users to post comments/upload photos and other users to reply directly to that post. 
