#!/bin/sh

rm -rf node_modules
npm install
npm run-script build

# see bug https://github.com/Famous/famous/pull/218#
sed "s/document\.body\.style\.webkitTransform !== undefined/document\.createElement('div')\.style\.webkitTransform !== undefined/g" \
famous.tmp > famous.js
#cp static/
