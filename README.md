#  Maple Sugar Shack

Maple Sugar Shack is a simple ecommerce project built with Turborepo, React, and NestJS. The API was made following an base interface contract.
I chose to use NestJS for the API development as it offers efficient and easy way to create services and ensure to follow the industry best practices. It has a robust module system, it's reliable, and offers support for widely used libraries.

### Things that could be improved
- Implement the repository pattern in the API design to facilitate testing of application logic
- Improve the visual design and UX of the web application
- Refactor the endpoint interface design to improve the request parameters and response body structures

##  What's inside?

This repo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

###  Apps and Packages
-  `api`: a [Nest.js](https://nestjs.com/) app
-  `web`: another [React.js](https://reactjs.org/) app

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

###  Set up the environment
You could use Docker for set up the MongoDB running the following command:
```
docker-compose up -d
```
When you have MongoDB running you should install the install packages and seed the products collection using the following command:
```
npm install
npm run seed
```

###  Develop
To run all the apps, run the following command:

```
npm run dev
```

###  Build
To build all apps and packages, run the following command:

```
npm run build
```

###  Test
To run all the tests, run the following command:

```
npm run test
```