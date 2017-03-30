The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# FitClub 

## Overview

FitClub is a web-based application which is part workout tracker and part social game motivating users to push themselves and take on fitness challenges.  Users start at Level 1 and earn points for workouts and bonuses for meeting set goals which unlock achievements to reach the next Level while competing against other users for top ranking.  Routines have different rewards depending on difficulty which is motivating for the user.  FitClub community members are able to post comments on their workouts or achievements and other users can respond and provide motivation and inspiration.


## Data Model

The application will store Users, Lists and have a comment section and Items

* users can have multiple lists (via references)
* each list can have multiple items (by embedding)

(___TODO__: sample documents_)

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
  createdAt: // timestamp
}
```


## [Link to Commented First Draft Schema](db.js) 

(___TODO__: create a first draft of your Schemas in db.js and link to it_)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new Excercise routine
4. as a user, I can view all of the excercise routines I've created in a single list
5. as a user, I can add items to an existing excerices routine
6. as a user, I can check off items that I have completed for that week in an existing excercise routine

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
* (4 points) Perform client side form validation using a JavaScript library
    * if you put in an excercise alreader in that routine, an error message will appear in the dom

9 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
