[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- TABLE OF CONTENTS -->

# Incrementing Integer Service

## Table of Contents

- [Incrementing Integer Service](#incrementing-integer-service)
  - [Table of Contents](#table-of-contents)
  - [About The Project](#about-the-project)
    - [Built With](#built-with)
  - [Getting Started](#getting-started)
    - [Quick Install](#quick-install)
    - [Prerequisites for development mode](#prerequisites-for-development-mode)
    - [Installation for development mode](#installation-for-development-mode)
  - [Usage](#usage)
  - [Contact](#contact)

<!-- ABOUT THE PROJECT -->

## About The Project

This project generate integers that automatically increment. Why you need to generate identifiers using sequential integers
is not important ;) Suffice it to say that this project is based on a real-world scenario.

### Built With

- [Docker](https://www.docker.com/)
- [Node.js](https://nodejs.org/)
- [React.js](https://reactjs.org/)
- [GoLang](https://golang.org/)
- [Postgres](https://www.postgresql.org/)
- [Nginx](https://www.nginx.com/)
- [Auth0](https://auth0.com/)

<!-- GETTING STARTED -->

## Getting Started

Follow the `Quick Install` if you whant to see the project running or follow the `Prerequisites` and `Installation` to be able to modify the project on your own.

### Quick Install

To get a local copy up and running follow these simple steps:

1. Install [Docker](https://www.docker.com/). If you are running on Linux, make sure to install [docker-compose](https://docs.docker.com/compose/install/) also.

2. Clone the repo

```sh
git clone https://github.com/brunover/incrementing-integers-service
cd incrementing-integers-service
```

3. Go to `/server`, copy the file `.env.sample` and rename it to `.env` and modify the variables as you wish (use it as it is if you just want to do a quick test)

```sh
cd server
cp -a .env.sample .env
```

4. Run `docker-compose up --build -d` at the root folder of the repository to start the containers

```sh
cd ..
docker-compose up --build -d
```

5. Go to `http://localhost/` to see the application running

6. If you don't want to register in Auth0 to test the UI, just use the default credentials

```sh
# Default login email
admin@admin.com

# Default login password
Test12345
```

7. (Optional) To turn down the container go to the root folder of the repository and run `docker-compose down`

```sh
# turn down the container
docker-compose down

# use the flag '-v' to remove the volumes
docker-compose down -v
```

### Prerequisites for development mode

1. Install [Docker](https://www.docker.com/)
2. Install [Node.js + NPM](https://nodejs.org/)
3. Install [GoLang](https://golang.org/)
4. Install [Postgres](https://www.postgresql.org/)
5. Install [Nginx](https://www.nginx.com/)

Check [Built With](#built-with) section to know what technologies you may need to know.

### Installation for development mode

1. For development, after installing [GoLang](https://golang.org/) clone the repo inside the gopath

```sh
# this is the default GOPATH
cd ~/go/src/github.com/
git clone https://github.com/brunover/incrementing-integers-service
cd incrementing-integers-service

# for example, on Windows:
go to 'C:\Users\YOUR_USERNAME\go\src\github.com\'
git clone https://github.com/brunover/incrementing-integers-service.git
```

1. Install NPM packages at the `/views` folder (You must have `Node.js` and `NPM` installed)

```sh
cd views
npm install
```

3. Download go dependencies by going to `/server` and running `go get`

```sh
cd ..
cd server
go get
```

4. In `/server`, copy the file `.env.sample` and rename it to `.env` and modify the variables as you wish

```sh
cp -a .env.sample .env
```

5. Run `docker-compose up --build -d` at the root folder of the repository to start the containers

```sh
cd ..
docker-compose up --build -d
```

6. Run `npm start` inside of `view` to initiate development mode of the UI

```sh
cd view
npm start
```

7. If you want to test a local copy as meant for production, run the script inside of `view` called `ui-build.sh`

```sh
cd view
./ui-buid.sh
```

<!-- USAGE EXAMPLES -->

## Usage

With the UI runnig just log in and use the buttons to increment or reset the integer.

If you want to test the api using `curl` the endpoints are:

- Fetch current integer: `curl http://localhost/api/v1/users/{user_id}/current`
- Fetch next integer: `curl http://localhost/api/v1/users/{user_id}/next`
- Update your integer: `curl -X "PATCH" http://localhost/api/v1/users/{user_id}/current --data "current=1000"`

<!-- CONTACT -->

## Contact

Bruno Leandro de Lima - [brunolimadev.com](https://brunolimadev.com/)

[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=flat-square
[contributors-url]: https://github.com/brunover/incrementing-integers-service/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=flat-square
[forks-url]: https://github.com/brunover/incrementing-integers-service/network/members
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/brunover/
