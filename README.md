<!-- # Garbage Management

This is a repository for a group project we're making in school. 
This is our [Trello](https://trello.com/b/XL7BJNWe/school-project-v2) board for managment.
-->
<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
[![LinkedInIsa][linkedin-shield-isa]][linkedin-url-isa]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/backbonzo/SchoolProjectV2">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Garbage Management</h3>

  <p align="center">
    A Garbage Management app that we created for our school project. We aim at having an embedded device inside the garbage container and send information to a databse.
	Then we will display the devices along with the information inside the web-app on for example a map and dashboard.
    <br />
    <a href="https://github.com/backbonzo/SchoolProjectV2"><strong>View the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/backbonzo/SchoolProjectV2">View Demo (COMING SOON)</a>
    ·
    <a href="https://github.com/backbonzo/SchoolProjectV2/issues">Report Bug</a>
    ·
    <a href="https://github.com/backbonzo/SchoolProjectV2/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started-with-device">Getting Started With Device</a>
      <ul>
        <li><a href="#prerequisites-device">Prerequisites Device</a></li>
        <li><a href="#installation-device">Installation Device</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started-with-device">Getting Started With Device</a>
      <ul>
		    <li><a href="#prerequisites-web-app">Prerequisites Web App</a></li>
		    <li><a href="#installation-web-app">Installation Web App</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgements">Acknowledgements</a></li> -->
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

With this project we aim at solving and helping out with garbage with two main parts: The Web App and The Device <br />
For example, inside a garbage container we would mount a device inside the garbage container or bin. The device would then send the GPS coordinates along with information to our database.
The thought later on would be to run Machine Learning on the image and train AI to recognize how full it is and send that information too. That would require us to use another server/middleman to process the image. 
The last resort would be to use a laser distance measurement device to simply see how much garbage would be inside.

Here's what the device will send in a JSON format:
* ID
* Title
* Description
* Image taken by camera
* Longitude & Latitude

The Web App would then be displaying the information from the database inside of a map. Think Google Maps but it displays markers where the device is. <br />
Once you click on the marker you can view information about the deive and see a picture that displays how full it is along side with a quick display on how full the device is if the image is unclear.
There will be a dashboard that can view the infomration in a more structured way too and contain multiple devices for quick listing.

So in general it would feature:
* A Device mounted inside the container(s).
* A Web App that shows the information along with the locations on a map.

Of Course we don't have all the features yet. So We'll be adding more in the near future. You may also suggest changes by forking this repo and creating a pull request or opening an issue.

So far into the prototype we have a:
* Device that runs with Raspberry Pi and USB/Pi Cam and sends information and picture to the DB.
* Web App Server that runs with Node, Express and mongoDB and working API that creates routes to GET or POST information.
* Web App Client that runs with ReactJS and shows a Mapbox map together with locations and information of the device.

### Built With

* [React](https://reactjs.org)
* [Express](https://expressjs.com)
* [Node.JS](https://nodejs.org/en/)
* [Mongo DB](https://nodejs.org/en/)
* [PyMongo](https://github.com/mongodb/mongo-python-driver)


<!-- GETTING STARTED DEVICE -->
## Getting Started With Device

To get a local copy up and running follow these simple steps.

### Prerequisites Device

This is require to run the Device:
* Python 3.7.3
* Raspberry Pi / Python Instance
* USB Camera
* A MongoDB Connection
* Pip
Pip should be installed from Python. Otherwise choose correct way of installing depending on your OS.


### Installation Device

1. Clone the repo if already not done so.
   ```sh
   git clone https://github.com/backbonzo/SchoolProjectV2.git
   ```
2. Cd into the correct directory
   ```sh
   cd prototype/DeviceGarbageCam/
   ```
3. Install PIP packages
   ```sh
   pip install -r requirements.txt
   ```
4. Change credentials inside configCred.py
   ```python
   user= Mongo DB Username
   password= Mongo DB Password
   cl= Mongo DB Cluster
   db= Database Name
   coll= Collection Name in db
   description= A Description of the device
   latitude= Hardcoded Latitude (will change later)
   longitude= Hardcoded Longitude (will change later)
   ```
5. Run!
   ```sh
   py track.py
   ```

<!-- GETTING STARTED WEBAPP -->
## Getting Started With Web App

To get a local copy up and running follow these simple steps.

### Prerequisites Web App

This requires NPM to be installed.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation Web App

1. Clone the repo if already not done so.
   ```sh
   git clone https://github.com/backbonzo/SchoolProjectV2.git
   ```
2. CD to the right directory (either client or server depends on what you want to run)
   ```sh
   cd prototype/web-app/client
   or
   cd prototype/web-app/server
   ```
   
3. Install NPM packages
   ```sh
   npm install
   ```
   
5. Change ENV variables
   ```sh
   NODE_ENV=development
   PORT=PORT NUMBER
   DATABASE_URL=MONGODB CONNECTION URL
   CORS_ORIGIN=http://localhost:port
   ```
   
6. Run in development mode
   ```sh
   npm run dev
   ```
   This requires nodemon to be installed.



<!-- USAGE EXAMPLES -->
## Usage
<!--
Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.
-->
Currently we have the devices hard coded. Later on we will publish a demo website that you can access and use the web app.
It's a bit harder to showcase the Device, we recommend that you run a device on your own with a local setup if you can.

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->



<!-- ROADMAP -->
## Roadmap

See our [Trello](https://trello.com/b/XL7BJNWe/school-project-v2) for a list of proposed features and todo's (and known issues).
We are currently in the <strong>Prototype</strong> phase.
<!-- See the [open issues](https://github.com/backbonzo/SchoolProjectV2/issues) for a list of proposed features (and known issues). -->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Sebastian Mossberg - [@Lemorz56](https://twitter.com/Lemorz56) - Sebastian@msbrg.net
<br />
Isa Magomadov - [@isa4042](https://twitter.com/isa4042) - isa080199@gmail.com

Project Link: [https://github.com/backbonzo/SchoolProjectV2](https://github.com/backbonzo/SchoolProjectV2)



<!-- ACKNOWLEDGEMENTS 
## Acknowledgements

* [](https://www.webfx.com/tools/emoji-cheat-sheet/)
* []()
* []()
-->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Backbonzo/SchoolProjectV2?style=for-the-badge
[contributors-url]: https://github.com/backbonzo/SchoolProjectV2/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/backbonzo/SchoolProjectV2?style=for-the-badge
[forks-url]: https://github.com/backbonzo/repo/network/members

[stars-shield]: https://img.shields.io/github/stars/backbonzo/SchoolProjectV2?style=for-the-badge
[stars-url]: https://github.com/backbonzo/SchoolProjectV2/stargazers

[issues-shield]: https://img.shields.io/github/issues/backbonzo/SchoolProjectV2?style=for-the-badge
[issues-url]: https://github.com/backbonzo/SchoolProjectV2/issues

[license-shield]: https://img.shields.io/github/license/backbonzo/SchoolProjectV2?style=for-the-badge
[license-url]: https://github.com/backbonzo/SchoolProjectV2/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/msbrg
[linkedin-shield-isa]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url-isa]: https://linkedin.com/in/isa-m-6055b6194

[product-screenshot]: images/screenshotPLACEHOLDER.png
