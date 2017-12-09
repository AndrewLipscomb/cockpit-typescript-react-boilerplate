# Cockpit Boilerplate Component using Typescript/React/Webpack

A straightforward CockpitJS component written to simplify new module creation. 

## Intended Usage

This repository is intended to act as an updatable, maintainable base for allowing a developer to quickly build a Cockpit module without worrying about tooling. It isolates the application source code from the tooling so that when tooling changes (as JS tooling quickly does), each of your separate module applications can be updated at once, quickly and cleanly.

As such, it includes installation scripts to allow the easy addition of a separate application source repository, as well as installation scripts to quickly add and remove it from Cockpit. 

## Installation

As this is intended to be used as a boilerplate, it is suggested that you clone the repo into a folder with the name of your intended module. 

```
git clone https://github.com/ALTinners/cockpit-typescript-react-boilerplate.git MyModuleName
cd MyModuleName
npm install
```

If any of these fail, you need to put [Node](https://nodejs.org/en/download/) on your target machine. Currently I've tested this with the latest LTS, but JS is a fast changing environment - you will need regular updates to keep it up to date with the latest Node environs. 

Then you need to install a source repository. For the purposes of examples, I have provided a very simple one. 

```
npm run install-src -- https://github.com/ALTinners/cockpit-typescript-react-boilerplate-example.git
git commit -m "Installed source submodule"
```

You can then build the application from source 
```
npm run build-test
```

Which will build the JS package. To link this to Cockpit, run

```
npm run link-to-cockpit
```

to link the package to the current user's Cockpit module directory. Log in to Cockpit and the module should be there. If you are already logged in, you will need to log out and in again to make it appear

## Modifying

The main modification beyond a source submodule you will need to make is in `manifest.json`, which contains the name of the module as it is exposed to Cockpit.

I have tried to keep this boilerplate as light as possible. It only includes the basics you need to get a simple Typescript/React app running. If you wish to use modules for things like Mocha for automated testing or SASS programmatic CSS, please consider forking this repo. 

## Removing

If you want to unlink the module from Cockpit, run

```
npm run unlink-to-cockpit
```

And if you want to remove the source submodule, run
```
npm run uninstall-src
```