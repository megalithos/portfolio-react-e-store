# digitaldepot (react portfolio project)
Link to demo video of the project : https://youtu.be/OwzG_AtH1II

## Technologies used
- React, JS, NodeJS, PostgreSQL, Bootstrap, GIT

## Core Features
- Fully functional frontend + backend
	+ Everything saved to SQL database and fetched from there when needed
- User authentication
	+ You can register a new account
	+ You can login to an account
	+ You can log out
	+ Your token is automatically refreshed from the server if the token is valid
	
- Management tools (only accessible to moderators & administrators)
	+ Moderators and administrators get unread messages (that are sent via Contact Form) to /profile/unreadMessages page
		* They can then archive these messages by clicking the archive button
	- New products can be added in /profile/productControlPanel
		+ You can submit title, price, details and any image
	
- Products
	+ Products categorized by attribute (trending/interesting/most_viewed) in database and shown in corresponding category
	+ You can search for products with a keyword
	+ You can add and delete products as moderator/administrator
	+ When clicking on a product it takes you to the page showing the product
	
- UI
	+ Decent looking UI
	+ Responsive
	+ Toasts that tell you if action was successful or not.

- Shopping cart
	+ Shows all products in your cart
	+ You can delete items from a cart as well as empty the whole cart
	+ It shows you total of products in the cart as well as the total price

- Customer Service
	+ There are *FAQ*, *Contact Form* and *About us* tabs in the Customer Service
		* In the contact form you can submit a form which then gets saved to database and can be viewed by moderators & administrators
		
