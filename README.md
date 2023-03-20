# QuikTalk - Messaging Application

Quiktalk is a project created to act as a social media platform that allows users to communicate with one another in the form of text. Using Socket IO, users are able to send and recieve messages in real time. The application is accessable to anybody, all you need is to sign up here.

<p align="center" >
<img src="https://github.com/MarkoSOE/MarkoSOE/blob/main/QuikTalkDemo.gif" height="500px" />
</p>

# How It's made:

<p align="center">
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" height=25>
<img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" height=25>
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" height=25>
<img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" height=25>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" height=25>
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" height=25>
<img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" height=25>
</p>

This project was heavily inspired by the widely popular messaging app - Telegram. I took inspiration from the design and decided to build my own take on a messaging app from the ground up.

<b>Frontend: </b>

- React was the first choice framework due to how simple creating a component based structure across all pages is. React allows me to use complex user interfaces to interact with my backend in a quick and efficient way.
- React context used to pass down global states to different components was an important tool when building this project and allowed for a lot of the functionality of the app to exist.
- React Query was used to manage state for the project and also allowed me to use caching alongside handling server API requests.
- Socket.IO was used to handle real time communication between the client and the server allowing for instant back-and-forth messaging between parties in a groupchat.

<b>Backend: </b>

- To structure the application I chose an MVC (Model-View-Controller) software design patern to give me the benefit of modularity across the source code, an easier time debugging, and allows for organization to stay as the scale of the project increases over time
- For the backend, Node was used to run javascript in the server-side. It provides a set of asynchronous I/O that allows Node.Js to handle multiple connections without burden on the server.
- MongoDB was used as a database for this project because of it's schema-less sctructure holding multiple collections of documents for different purposes. It also has a flexible schema design, allowing attributes of different collections to be modified on the fly

## Features

- Mobile layout featuring Message timestamps, Avatar selection using multiavatar API, with future plans on implementing user typing animation, user online activity, and emoji support.

<img src="https://github.com/MarkoSOE/QuikTalk/blob/main/frontend/src/assets/GroupChat.png?raw=true" width="300px"><img src="https://github.com/MarkoSOE/QuikTalk/blob/main/frontend/src/assets/MessageList.png?raw=true" width="300px">
<img src="https://github.com/MarkoSOE/QuikTalk/blob/main/frontend/src/assets/Login.png?raw=true" width="300px"><img src="https://github.com/MarkoSOE/QuikTalk/blob/main/frontend/src/assets/Signup.png?raw=true" width="300px">
<img src="https://github.com/MarkoSOE/QuikTalk/blob/main/frontend/src/assets/AvatarSelection.png?raw=true" />

## Future Optimizations:

- Email validations
- Notifications for unread messages
- Light mode
- Create poll function similar to Facebook
- O-Auth
