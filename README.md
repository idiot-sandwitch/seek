
<h1 align="center"> Seek</h1><h3 align="center"> Students community platform <h3>


<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project"> About the project </a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#installation">Installation</a>
      <ul>
        <li><a href="#requirements">Requirements</a></li>
        <li><a href="#installing">Installing</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About the project
*Seek* is a platform meant to build and nurture a community for college students where they can share and rate educational resources. Seek consists of following features: 
- Signup using a valid email
- Customize Profile
- Browsing through resource posts
- View a person's profile
- Create a resource post 
- Vote a resource post
- Comment on a resource post
- Vote comments and sub-comments 

Following Features are intended to be built in the future:
- A forums page where users can create discussion forums
- Teachers page where teachers can get feedback from students

### Built With

* [MongoDB](https://www.mongodb.com/)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Bootstrap](https://getbootstrap.com)

## Installation

### Requirements
- Personal and running MongoDB hosted locally or remotely : 
[Local Installation guide](https://docs.mongodb.com/manual/installation/)

- SendGrid API key : [Refer this](https://sendgrid.com/docs/ui/account-and-settings/api-keys/#creating-an-api-key)

- NodeJS: [Refer this](https://nodejs.org/en/download/)

- NPM Package Manager: [Refer this](https://www.npmjs.com/get-npm)


### Installing

_
**1.** Clone this project on your local machine using 
```bash
git clone https://github.com/idiot-sandwitch/seek.git
```

__OR__

You can download the repository directly and extract in a local folder

**2.** Open a terminal inside your local cloned repository and execute the following commands:

```bash
npm i
```
```bash
cd client
```
```bash
npm i
```
```bash
cd ..
```

**3.** Inside the root directory make the following changes:
- Make a file `.env` in the root directory and paste the following lines: 
```bash
JWT_PRIVATE_KEY='skfslakdhfskdjfsd'
# If you have the environment variable PORT defined on your machine, change 5000 to the value of PORT in the line below.
# For a remotely hosted MongoDB server, enter the base url of the remote server.
BASE_URL='http://localhost:5000/'
# If you are using a remotely hosted mongodb Server, update the line below to that server's connection string instead.
MONGODB_CONNECTION_STRING = "mongodb://localhost"
MAX_AVATAR_SIZE_MB=25
JWT_HEADER='x-auth-token'
SENDGRID_API_KEY='YOUR SENDGRID API KEY GOES HERE'
```
- Make another `.env` file, this one inside `project_root`/client/ and paste the following lines:
```bash
REACT_APP_FRONTEND_URL='http://localhost:3000'
# If you have the environment variable PORT defined on your machine, change 5000 to the value of PORT in the line below.
# For a remotely hosted server, enter the base url of the remote server.
REACT_APP_BACKEND_URL='http://localhost:5000'
```
___

## Usage
**1.** Start the MongoDB server. [Refer here]()
**2.** Open a terminal inside the local repository and execute the following command:
```bash
npm run dev
``` 
**3.** The website should now open inside a new tab in your default browser, and can be accessed from anywhere in your local machine at the address `http://localhost:3000/` as long as the above command is still running.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
MIT License

Copyright (c) [2021] [Ayushman Singh, Kshitiz Singh, Avijit Pandey]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
