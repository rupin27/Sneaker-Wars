# Team Beta
## Sneaker Wars
### Fall 2022
**Project Overview:** For our project, Sneaker Wars, we wanted to create a site where sneaker enthusiasts could go to create and prsonalize a profile of all their favorite sneakers, their own prized collection, and all of their dream kicks.
## Team Members
Sean Driscoll | seand391 & spdriscoll  
Rupin Mehra   | rupin27
## User Interface
### Login page  
Used for the user to optionally log into their account so they can view and update their profile. Also includes an option to register for a new account if they do not yet have one.

![login](../docs/images/login.JPG)

### Register page  
Used to register for a new user account

![login](../docs/images/register.JPG)

### User profile page
Lets users view their profile and see all their information and sneaker lists if they are logged in  

![login](../docs/images/profile.JPG)

### Sneaker Viewer page
Displays an image and some useful information about a sneaker after the user either searches for it or clicks on it from their profile lists  

![login](../docs/images/sneakerviewer.JPG)


## API
<b>/createAccount</b>  
creates a new user account with spceified userName and userPass if no other account exists with that userName  

<b>/updateAccount</b>
updates specified fields in account. paramaters are user, pass, and any fields the user wants to update (see database section for all possible fields)

<b>/removeAccount</b>
removes account with specified userName and userPass

<b>/readAccount</b> 
get the information for account with specified user and pass

## Database

![login](../docs/images/db.JPG)  
userName: username for account, must be unique
userPass: password for account
userImg: profile picture for account
userLocation: location to display in user profile
about: description/bio for user profile
pairs: number of pairs of sneakers the user owns
followers: number of followers user has
following: number of other users the user is following
favorites: list of sneaker IDs for user's favorite sneakers
owned: list of sneaker IDs for user's collection
want: list of sneaker IDs for sneakers the user wants  

## URL Routes
/index.html: serves the main login page  

/sneakerview.html?shoeName=`shoe name here`: serves sneaker viewer for the shoe name specified in the query

## Authentication/Authorization

Users must be logged in with their username and password to add shoes to their profile

## Division of Labor

Sean: Created html and js files, created server, heroku, and database, set up routes and endpoints for server, made crud operations for database user table, made sneaker viewer page with the sneaks API, made user profile generate from database information, made markdown files, made final video

Rupin: Created github repository and inital configuration, Created html and js files, created server, firebase (intially but then replace by heroku), and database, set up routes and endpoints for server, made crud operations for database user table, constructed the backend database design, made the the login authentication and register functionality, made markdown files, made final video

### Conclusion:

The experience of building our own website and involving in something practical and industrial really helped in understanding the concepts taught in this class better. Before beginning this project, the backend functionality and login authentication process used for websites was somewhat unfamiliar to our group but to understand and then implement them ourselves through trial and testing was an enriching experience. Even with missing contributions and lack of communication from some of the members in our group, we were able to push through and construct what we planned, which is a real life issue that could spring up and every individual should be ready to cope with. Previously, we have worked with other online databases like Firebase and AWS and this was our first time interacting with heroku which somewhat slowed down our progress considering we had to understand its functionality, however after that it was all about having our concepts clear. Overall, my teammate and I found this project helpful in both educational and practical ways. 
