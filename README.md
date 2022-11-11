										WORLD RECORDS 
									   (Hobby Project)

1. What is it?

	World Records is a hobby project developed as a web application that potentially stores music albums created by various artists and can be used as means of discovering new records. Looking at the content is available for all visitors, but contributing is allowed only to registered users. There is three user roles that have different levels of authorization - USER, ADMIN, SUPER ADMIN.

2. What does it consist of and how to use it?

	* Artists section - It holds information for different artists - name / short description / photograph. Alongside this you will see a list of albums that the artist has created (if uploaded to the database).

	* Records section - It displays different albums that are uploaded to the database. When you open one you will see its cover photo, associated artist, the year of production as well as reviews that users have left for the album (if any). You will also see other albums by the same artist (if any) as well as a youtube snippet of the album(if added).

	* Review - Each review holds 5 star rating as well as review notes that the user has on the album. Only registered user can leave a review.

	* Record upload - Both album and artists upload can be done by registered users with user role of user or higher. In order to upload an album the user must be logged in. The user will be asked to enter different information about the album. In order to make sure that the respected artist is present in the database the artist field is a dropdown. If not, the user needs to first upload the artist. If the user has ADMIN or SUPER ADMIN role they will also have the option to embed a YouTube link for the album preview. The link must be embed type (https://support.google.com/youtube/answer/171780?hl=en)

	* Artist upload - Can be uploaded by users with role USER or higher

	* Leaving a review - Reviews can be added only by registered users. When you open a record while you are logged in you will be able to leave a review as well as rate it - 1 to 5.

	* Deleting or editing record / artist - if you are the content uploader or ADMIN or SUPER ADMIN you will see edit / delete buttons added to the record / artist page. You will also be able to delete a review if those conditions are matched.

3. What are the different user roles?

	* Visitor - a.k.a non registered / logged person. They can view the application content, but can not contribute in any way.

	* USER - A user can add records / artists / reviews. They can manage their account and also edit or delete the content that they have created. In order to make sure the application won't hold unlicensed music a regular user can not add the embeded youtube link to an album they upload. This can be done at a later stage by users with role admin or higher

	* ADMIN - An admin has the authorizations of a user as well as the option to edit or delete any content uploaded to the application if deemed inappropriate, offensive or spam. An admin can also add the embeded youtube links to albums uploaded by both them and other users.

	* SUPER ADMIN - A super admin has all the authorizations of the other roles with the addition that they also have the right to change the role of users. 


4. Next steps ?
	
	This is still a work in progress. The application is being developed at night after full time work days so there is a lot more to do. 

		* Add Artist button should be added to the artist section in Upload Record, so the user can be redirected to the Upload Artist page in case the artist is not part of the database. The page should be opened in a new tab in order to not lose the progress.

		* Make better use of the account pages. Account pages need to be styled better and also uploaded records / artists / reviews should be added to the account page.

		* Be able to look for specific genres of music. Currently all records have genres associated with them, they are part of enum list. However the application currently does not use them in any way. 

		* OBVIOUSLY add a search bar

		* Add sort by rating.

		* SUPER ADMIN users should be able to also delete users if needed. Currently they can only remove avatars / bio if found offensive.

		* Lots of code refactoring needs to be done. I aknowledge that the code needs refactoring and establishing of naming conventions. Quite frequently I notice something I am not proud of and go the rabbit hole of refactoring on the spot, but that interrupts the workflow so as of now refactorring will be left for a later stage.

		* Last but not least - DEPLOYMENT. 

5. Technologies used
	
	* JavaScript ES6
	* Node.js
	* Express
	* Bootstrap 5
	* MongoDB
	* Cloudinary (for image storage. A cloudinary account can be created for free: https://cloudinary.com/ )


6. How to launch ?

	1. Pull the contents of the master branch

	2. In the terminal run the following command: 'npm install'

	3. Create .env file with the following structure:
		
		MONGO_PORT={ enter your mongo port }
		SERVER_PORT={ enter the port on which the server will be listening }
		CLOUDINARY_CLOUD_NAME={enter a cloudinary cloud name }
		CLOUDINARY_KEY={enter a cloudinary key }
		CLOUDINARY_SECRET={enter a cloudinary secret }
		SESSION_SECRET={ session secret that will be used for session configuration }
		NODE_ENV=development

	3. In the terminal run the following command, this will seed the roles in the database:

		 'node seeds/RoleSeeds.js'

	4. Run the application with the following command:

		 'node app.js'

	5. In app navigate to the Register page and create an account. By default the account will be created with the role of User. You will want to change the role to super admin. You will need to get the _id of both the user and role

	6. In the terminal open the mongo (type mongo) shell and run the following queries:
 
		 'use WorldRecords'
		 'db.roles.find({})'
		 'db.users.find({})'

	7. If seeding was successful you will see the three roles there. Copy the _id of the role with roleType: "super admin" You will now use it to change the role of the user you registered. To do so in the mongo shell type the following query but replace the placeholders with actual values:

		 'db.users.update({_id : "_ID OF THE USER YOU CREATED"}, {$set: {role: "_ID OF THE SUPER ADMIN ROLE"}})'

	8. Now it is time for seeding artists and albums. To do that you will first need to open both files: seeds/ArtistSeeds.js and seeds/AlbumSeeds.js and will need to replace the value of const uploaderId with the _id of the user you registered. You need only the UUID section: ex. '636e9c1c2da0f0fa11ba7938'

	9. Next you need to run the following commands in your terminal. This will seed the rest of the database.
	
		 'node seeds/ArtistSeeds.js'
		 'node seeds/AlbumSeeds.js'

	10. Have fun :) 
