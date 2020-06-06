# milligram-tronweb-starter

> A super simple boilerplate project with Milligram, TronBox and TronWeb
  
## Built for quick bootstrapping

This starter provides a minimal setup for a fast and clean starting point.  It intends to enable anyone to quickly get hands on Solidity, TronBox and TronWeb. 

It consists of a simple votinh system that enables any Tron address to vote a single time over a predefined set of candidates. It is ready to be deployed into the test net with minimal setup. Hope you enjoy!

## Getting Started

It is recommended that windows users use an Ubuntu Subsystem command console for an optimal TronBox experience. More information [here](https://developers.tron.network/docs/tron-box-user-guide) or [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10)

**Clone or download project**

**Install dependencies**
```sh
$ npm install
```
**Copy rename .env.example into .env**
After renaming the file replace the variables with the adecuate test keys.

**Compile contracts**
```sh
$ npm run tronbox-compile
```
**Deploy contracts to Shasta test network**
```sh
$ npm run tronbox-migrate
```
**Create config file for newly deployed contract**
```sh
$ npm run app-setup
```

## Available Commands


-  `npm start` - starts the development server with hot reloading enabled.
-  `npm run build` - generates the distribution files.
-  `npm run lint` - check with code linter.
-  `npm run lint:format` - check and format with code linter.


## External References

-  [TronBox User Guide](https://developers.tron.network/docs/tron-box-user-guide)

-  [TronWeb Api Reference ](https://developers.tron.network/reference#tronweb-object-1)

-  [Milligram Docs](https://milligram.io/)

## Contributing

Want to contribute? Don't hesitate in opening an issue or pull request.

