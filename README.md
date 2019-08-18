[![Build Status](https://travis-ci.com/williamreetz/nearby-customers.svg?branch=master)](https://travis-ci.com/williamreetz/nearby-customers)

# Nearby Customers
This CLI tool provides the customer IDs of nearby customers.

# Installation
```sh
# clone repository
git clone www.github.com/williamreetz/nearby-customers
# install dependencies
npm install
# compile typescript files
npm run build
# symlink package folder locally
npm link
```

# How to use
Get all ids of costomers in a radius of 100km
```
nearby-customers -f path/to/customers.txt
```

Get all ids of costomers in a radius of 1000km from location lat:52.5186, lon:13.3760
```
nearby-customers -f path/to/customers.txt -d 1000 -l 52.5186,13.3760
```

Options:
```
  -V, --version              output the version number
  -f, --file <path>          set the path to the customer.txt file
  -d, --distance <distance>  set distance to nearby customers
  -l, --location <location>  set default location
  -h, --help                 output usage information
```

The customer.txt should have the following syntax:
```
id: Axxxxxxx-xxxx-xxxx-xxxxxxxxxxxx, lat:xx.xx, long:xx.xx,
id: Bxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx, lat:xx.xx, long:xx.xx,
id: Cxxxxxxx-xxxx-xxxx-xxxxxxxxxxxx, lat:xx.xx, long:xx.xx,
```

# Testing
Start the test suite:
```sh
npm test
#or
npx jest
```
You can test the program also manuelly. You will find dummy-files in '/src/tests/dummies/*.txt'.
