# Installation:

Fork and clone this repository in the directory you wish to install it in.

Go to the /frontend directory and run `npm install`.

Run `docker-compose up -d`

Navigate to http://localhost:3000/ in your browser.

Pre-seeded users are user1, user2, and user3.  The password is admin for all of them.

# Using the app:

The first screen will show a login page and will list all of the items.  Clicking login will present you with a login.  Clicking login without filling out either field will present a prompt to do so.  Putting in an incorrect username or password previously sent a error response from the server to the client, but I've broken that functionality.  Putting in a correct username and password will take you to that individual user's page.

The description is capped at 100 characters with the elipses at the end.

In the event that a bad input is sent, the server will crash and will need to be restarted.  This functionality was also working, but is also now broken.  

The inventory manager's page will show only the inventory manager's inventory.  The create new item button works and sends the data to the server, but the server doesn't handle the insert/post despite returning the response back to the client.  It does take you to the page that should show the data, but it's incomplete.

Cookies are sent to the client from the browser upon authentication.  Passwords are hashed and salted using bcrypt.  