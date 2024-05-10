user routes:- 
/signup :- POST route, this will be used to register a user
/signin :- POST route,  this route will be used to signing, this will generate a token ,which further be used in other routes for authentication.
/myprofile:- Get route, used to see current user details
/viewprofiles: - This route will list all the users whose roles are user and profile is public
/update:- Put route, use to update user profile
/ updatePrivacy:- put route, use to update account status i.e. public or private

Admin routes:- 
/signup :- POST route, this will be used to register a user
/signin :- POST route,  this route will be used to signing, this will generate a token ,which further be used in other routes for authentication.
/accessProfiles:- get route, use to access all user whose roles are set to user. 




TO setup this in your local:- 
add your connection string in index.js file.

File path -> /db/index.js

TO run :- 
use  npm run dev to start the server