# Cockpit Boilerplate Component using Typescript/React/Webpack

A straightforward CockpitJS component written to simplify new module creation. 

## Before You Start

Make sure you have the correct version of Node installed. You need 8.X.X or above.

```
node --version
```

If you don't have it installed, or you have an old version, update [here](https://nodejs.org/en/download/).

## Installation

As this is intended to be used as a boilerplate, it is suggested that you clone the repo into a folder with the name of your intended module. 

```
git clone https://github.com/ALTinners/cockpit-typescript-react-boilerplate.git MyModuleName
cd MyModuleName
npm install
```

If any of these fail, you need to put [Node](https://nodejs.org/en/download/) on your target machine. Currently I've tested this with the latest LTS, but JS is a fast changing environment - you will need regular updates to keep it up to date with the latest Node environs. 

You can then build the application from source 
```
npm run build-test
```

Which will build the JS package. To link this to Cockpit, run

```
npm run link-to-cockpit
```

to link the package to the current user's Cockpit module directory. Log in to Cockpit and the module should be there. If you are already logged in, you will need to log out and in again to make it appear

## Hot Reloading and Production Builds

I've not yet figured out how to get hot reloading into Cockpit proper - in the interim `webpack-dev-server` can be used to test some changes quickly

```
npm run build-dev-server
```

A minified build can also be produced for a proper deployment using

```
npm run build-prod
```

## Modifying

The main modification you will need to make is in `manifest.json`, which contains the name of the module(s) as it is exposed to Cockpit.

I have tried to keep this boilerplate as light as possible. It only includes the basics you need to get a simple Typescript/React app running.

It also only exposes one module - more can be added under `manifest.json`. You will likely then need to create separate Webpack build scripts for each module's source. 

## Removing

If you want to unlink the module from Cockpit, run

```
npm run unlink-to-cockpit
```
