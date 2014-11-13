# [![ELEFRANT Logo](https://raw.githubusercontent.com/Elefrant/elefrantio/ee8f771ab7be672b6f44d3d531059d1630bfd79a/lib/templates/logo.png)](http://elefrant.com/) ELEFRANT

[![wercker status](https://app.wercker.com/status/f8f103478934713d1e2b2731d261f4ba/s/master "wercker status")](https://app.wercker.com/project/bykey/f8f103478934713d1e2b2731d261f4ba) [![Dependency Status](https://gemnasium.com/Elefrant/elefrant.svg)](https://gemnasium.com/Elefrant/elefrant)


ELEFRANT is a framework for an easy starting point with [Node.js](http://www.nodejs.org/) based applications. It is designed to give you a quick and organized way to start developing ELEFRANT API SERVERS with useful components and configurations. We mainly try to take care of the connection points between existing popular frameworks and solve common integration problems.


## Prerequisites

* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Iמstall Node.js.
* *Git* - Get git using a package manager or <a href="http://git-scm.com/downloads">download</a> it.
* Grunt - Download and Install [Grunt](http://gruntjs.com).
```bash
  $ sudo npm install -g grunt-cli
```


## Init Framework

First install the cli module in your system. This will add the *elefrant* command which lets you interact (install, manage, update ...) your elefrant based server.
```bash
  $ sudo npm install -g elefrantio
  $ elefrant init <path or name of your new API>
  $ cd <path or name of your new API> && npm install
```

And start your own API server.


### Invoke node with Grunt

We recommend using [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:
```bash
  $ grunt
```
If grunt aborts because of JSHINT errors, these can be overridden with the `force` flag:
```bash
  $ grunt -f
```

On developer and test enviroment, grunt will launch `server.js`, but in production enviroment, grunt will launch `cluster.js`.


### Troubleshooting

During installation depending on your os and prerequiste versions you may encounter some issues.

Most issues can be solved by one of the following tips, but if are unable to find a solution feel free to contact us via the repository issue tracker or the links provided below.


#### Update NPM or Grunt

Sometimes you may find there is a weird error during install like npm's *Error: ENOENT*. Usually updating those tools to the latest version solves the issue.

* Updating NPM:
```bash
  $ sudo npm update -g npm
```
* Updating Grunt:
```bash
  $ sudo npm update -g grunt-cli
```


#### Cleaning NPM cache

NPM has a caching system for holding packages that you already installed.
We found that often cleaning the cache solves some troubles this system creates.

* NPM Clean Cache:
```bash
  $ npm cache clean
```


#### Installation problems on Windows 8 / 8.1
Some of Elefrantio dependencies uses [node-gyp](https://github.com/TooTallNate/node-gyp) with supported Python version 2.7.x. So if you see an error related to node-gyp rebuild follow next steps:

1. install [Python 2.7.x](https://www.python.org/downloads/)
2. install [Microsoft Visual Studio C++ 2012 Express](http://www.microsoft.com/ru-ru/download/details.aspx?id=34673)
3. Run NPM update
```bash
  $ npm update -g
```


## Documentation

Documentation for the entire framework can be found on the [Elefrant documentation](http://elefrant.com/#/docs).


## CLI

The Elefrantio is a simple Command Line Interface for installing and managing ELEFRANT applications. As a core module of the elefrant.com project, it provides a number of useful tools to make interaction with your ELEFRANT application easier, with features such as: scaffolding, component creation and status checks.
```bash
  $ elefrant
  $ elefrant --help
  $ elefrant help
```
  <code>elefrant help</code> can also be used in conjunction with any command to get more information about that particular functionality. For example, try <code>elefrant help init</code> to see the options for init
```bash
  $ elefrant help [command]
```


## Staying up to date

After initializing a project, you'll see that the root directory of your project is already a git repository. ELEFRANT uses git to download and update its own code. To handle its own operations, ELEFRANT creates a remote called `upstream`. This way you can use git as you would in any other project.

To maintain your own public or private repository, add your repository as remote. See here for information on [adding an existing project to GitHub](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line).

```bash
  $ git remote add origin <remote repository URL>
  $ git push -u origin master
```


## Contributing

**All issues and pull requests should be filed on the [develop branch](https://github.com/Elefrant/elefrant/tree/develop) repository.**


## Credits

  * To our awesome <a href="https://github.com/orgs/Elefrant/teams">core team</a> with help of our <a href="https://github.com/Elefrant/elefrant/graphs/contributors">contributors</a> which have made this project a success.


## License

MIT © [Elefrant](http://elefrant.com/#/license)
