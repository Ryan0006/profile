## Guide to run Profile app

To run this app, in combination of the backend service:

Install Docker desktop on Mac or Windows and create your Docker hub account.

[Mac](https://docs.docker.com/docker-for-mac/install/)
[Windows](https://docs.docker.com/docker-for-windows/install/)

Login with your Docker credentials of your Docker hub account.

#### `$ docker login`

Poll both frontend and backend images.

#### `$ docker pull ryanchen008/profile`

#### `$ docker pull ryanchen008/profileapi`

Run images.

#### `$ docker run -p <free port>:8000 ryanchen008/profileapi`

#### `$ docker run -p <another free port>:3000 ryanchen008/profile`

Open http://localhost:< frontend port > in your browser.
