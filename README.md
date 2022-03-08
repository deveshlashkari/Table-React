# table-filter-search-typescript

If you get an error of node version, follow the below steps 

Installing NVM on Ubuntu
A shell script is available for the installation of nvm on the Ubuntu 20.04 Linux system. Open a terminal on your system or connect a remote system using SSH. Use the following commands to install curl on your system, then run the nvm installer script.

```bash
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
```

The nvm installer script creates environment entry to login script of the current user. You can either logout and login again to load the environment or execute the below command to do the same.

```bash
source ~/.profile   
```
Installing Node using NVM
You can install multiple node.js versions using nvm. And use the required version for your application from installed node.js.

Install the latest version of node.js. Here node is the alias for the latest version.

```bash
nvm install node 
```

To install a specific version of node:

```bash
nvm install 14
```

Working with NVM
You can use the following command to list installed versions of node for the current user.

```bash
nvm ls 
```

With this command, you can find the available node.js version for the installation.

```bash
nvm ls-remote 
```

You can also select a different version for the current session. The selected version will be the currently active version for the current shell only.

```bash
nvm use <version>
```

To find the default Node version set for the current user, type:

```bash
nvm run default --version 
```

You can run a Node script with the desired version of node.js using the below command:

```bash
nvm exec 12.18.3 server.js 
```


## Required Steps -

First create a react app using create-react-app with Typescript support

```bash
npx create-react-app projectname --template typescript
```

## Packages to Install -

```bash
yarn add 
@babel/preset-env 
@babel/preset-react 
@babel/preset-typescript 
@babel/plugin-syntax-jsx
@material-ui/core 
@types/material-ui
@types/react-router-dom  
axios 
core-js 
react-router-dom 
regenerator-runtime
```

Create a babel configuration file in the root -
Name it as - babel.config.js
and add the following lines -

```bash
"use strict";
/**
babel.config.js with useful plugins. 
*/
module.exports = function (api) {
  api.cache(true);
  api.assertVersion("^7.4.5");

  const presets = [
    ["@babel/preset-env"],
    ["@babel/preset-react", {"runtime": "automatic"}],
    ["@babel/preset-typescript"]
  ];
  const plugins = [
    ["@babel/plugin-syntax-jsx"],
    ["@babel/plugin-proposal-class-properties"],
  ];

  return {
    presets,
    plugins,
  };
};
```

## You make face issues in setting up routing refer to this link for router v6 , Also refer App.tsx for routing

[react-router v6](https://reacttraining.com/blog/react-router-v6-pre/)
