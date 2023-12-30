# Dashboard

It is a web application developed by a team of 4 during the internship at Azure Knowledge Corporation. It provides a platform for users to register, login, and customize and view charts based on data retrieved from a MySQL database.

## Technologies Used

- `Frontend` : HTML, CSS, JavaScript
- `Backend` : Node.js, Express
- `Database` : MySQL

## Project Structure

The project follows the following structure:

- `controllers/` : Contains the codes for generating charts.
- `dist/` : Contains the codes for all web pages to be displayed.
- `validation/` : Contains the codes for user validation.
- `router.js` : Contains all the GET and POST requests for different routes.
- `server.js` : The main file that runs on npm start.
- `templates/` : Contains files for webpage display (not required at the moment).

## Functionality

1. User Registration and Login:
   - Users can `register` and create an account.
   - Registered users can `login` to the application.

2. Home Page:
   - The home page provides two options: `Configurations` and `Dashboard`.

3. Configurations:
   - In the Configurations section, users can `add` and `customize charts` to be displayed.
   - `CRUD` operations can be performed to manage the configurations.

4. Dashboard:
   - The `Dashboard` section displays a variety of charts.
   - The data for these charts is retrieved from the backend `MySQL` database.

5. Admin Page:
   - An `Admin page` is designed to allow the admin to control the types of analytics charts that can be generated.
   - The admin can activate or deactivate specific chart types.

## Group Members

1. Param Dalal
2. Tej Kanjariya
3. Harsh Shah
4. Akshar Goyal

## For this code to work

Clone this repository in the location `C:\xamppp\htdocs\folder_name`.
Open a terminal and write the command `npm start`.
