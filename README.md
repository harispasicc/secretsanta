# Santa App

There are three main purposes of this project: save the environment, save labor and entertain. Saving the environment through going as close to paperless on gift lists, letters to Santa and advent calendars as possible. Saving labor for our client (Santa and the elves) through collecting users presents data that can be used to create gifts in the North Pole with more accuracy. Lastly to entertain the user with various activities, thereby making them more likely to come back to the site.

# Project Features:

- Home page
- About Us page
- Login page
- Signup page
- Letter to Santa pages (Parental and Child modes)
- Gift List page
- Secret Santa page
- Advent Calendar page
- Logout option

## To get a local copy up and running follow these simple steps:

1. Clone the repo

### git clone https://github.com/zabec/santa-app

2. To run the application it was used the concurrently package. Install it with command

### npm install

# Frontend Built With:

- HTML
- CSS, Material UI
- JS
- ReactJS

3. Navigate to frontend directory santa-app/frontend:

- install npm packages

# Backend Built With:

- Node
- Express
- MongoDB

4. Navigate to backend directory santa-app/backend:

- install npm packages
- create .env file in the root of the santa-app/backend: //.env

  PORT = 4000
  JWT_SECRET = "Your secret key"</br>
  MONGO = mongodb://localhost:27017/santa</br>
  ENV = development</br>
  EMAIL_HOST = SMTP_HOST</br>
  EMAIL_PORT = 465</br>
  EMAIL_USER = "Your email"</br>
  EMAIL_PASSWORD = xxxx</br>
  EMAIL_EMAIL = "Your email"</br>
  EMAIL_SECURE = true</br>

5. Start the project

### npm start

Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

# They worked on the projekt:

- Rusmira Sabic Mahic
- Denis Imsirovic
- Haris Pasic
- Mirza Herenda
- Olgica Pajkovic

Rusmira worked on:

- Letter to Santa pages (Parental and Child modes)
  (Protected pages only accessible to logged-in users:
  Letter to Santa (Parental Mode) page - A view that allows the user/parent to enable each of their children to make a list of gifts they want to receive from Santa Claus.
- How it works - short textual explanation of the page purpose, as well as how it works for parents to add their children, and how to see the lists that children create.
- Add child option/button allows parents to be able to add each of their
  children so everyone can use the Letter to Santa part of the application. By clicking on it, the Add Child modal is to be shown.
  -Manage children - Created children names are to be displayed on the Letter to Santa(Parental Mode) page alongside the buttons: Make a List, or View a List, and Edit, and Delete icons.
- Letter to Santa (Parent View List) page is to display the child’s name so that the parent knows whose list he/she is looking at.
- Letter to Santa (Child View) that allows the child to interact with a child-friendly "letter to santa" page so he/she can use it without issues and create the list of gifts that she/he wants to get from Santa.
  )
- Gift List page
  (A view that allows a regular user to create a list of gifts for the people he wants to give those gifts to. He is to be able to create a list per person)

Denis worked on:

- Login page
  ( A login page requires user identification and authentication, performed by entering registered email and password combinations in the designated input fields. The login user to have access to protected views and actions.
  If a user provides an email and (or) a password that is not registered in the database,logging in is not possible, and an error message is to be reported. The user is asked to provide a correct email and password.
  Forgot password option is to be available on the Login page. This option allows the user to reset the password in case he forgot it. After clicking on the Forgot password option, the user is expected to enter his email address in the provided input field inside the opened modal. After inputting the email address, and clicking on the button Send My Passwordd the user is to receive an email with a link for resetting the password.)

- Signup page
  (-A view with a form for user sign-up, allowing new users to create a user account and redirecting them to a log-in page when an account is successfully created)

- Logout option
  ( An option that allows the logged-in user to log out from the system)

Haris worked on:

- Secret Santa page
  (A view that allows a user to create a Secret Santa group so that his group
  can participate in the Secret Santa activity. The page should display the following elements:
- How many people? input field - where the user is to input the number of people who will participate in Secret Santa activity.The minimum allowed number of participants per group is to be 4.
- Max price input field - where the user is to input the maximum amount of money one person can spend to buy a gift)

Mirza worked on:

- Home page
  (The homepage displays all available options for unregistered and unlogged users along with the fun activities (games).Get Started button redirects users on the Signup page. Countdown to the New Year is the part where the Home page is to display a countdown to the New Year. The user is to have an option to select the appropriate time zone in order to see the correct countdown for him.

Olgica worked on:

- About Us page
  ( About Us page is to inform the user about the application creator/s and their holiday activities alongside with the presentable pictures.)

- Advent Calendar page
  (The Advent calendar is a New Year countdown calendar. It consists of at least 31 numbered flaps that cover festive images (to do lists) printed onto cards. Starting on the first day of the Advent season (December 1st) with card
  one. The app user opens (flips) one card per day, until New Year)
