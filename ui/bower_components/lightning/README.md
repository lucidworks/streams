# Twigkit Lightning

Twigkit Lightning is a single-page JavaScript framework that supports the same syntax and ease of development for complex business applications as our traditional JSP tag library and supporting services. It is however a simpler way of developing and managing applications since no runtime other than the browser is required for development or deployment.

This redesigned framework represents years of learning in the space where data is requested and rendered as and when it is needed for best-of-breed richness and performance.

# Installing Lightning
## Installing with NPM
To install lightning using NPM **you will need to have NPM 5.x.x** or greater installed. You can then include lightning in your dependencies like so (changing `X.X.X` for the version you would like to install)
```
"dependencies": {
    "lightning": "twigkit/lightning.git#semver:~X.X.X"
}
```
And then run `npm install` you will then find lightning in `node_modules/lightning` with the main distribution of lightning being in `dist/lightning.min.js`

### Updating NPM
Details on how to do this can be found here - https://docs.npmjs.com/getting-started/installing-node or you can try and run the following command `npm install -g npm@'>=5.0.0'`

## Install with bower
To install lightning using bower simply include lightning in your dependencies like so (changing `X.X.X` for the version you would like to install)
```
"dependencies": {
    "lightning": "https://github.com/twigkit/lightning.git#~X.X.X"
}
```
And then run `bower install` you will then find lightning in `bower_components/lightning` with the main distribution of lightning being in `dist/lightning.min.js`
