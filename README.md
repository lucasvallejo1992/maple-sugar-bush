#  Maple Sugar Shack

This is an simple example of an ecommerce following the contract that you can find in `./docs/maple-sugar-shack.json`.

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
