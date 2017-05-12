#!/bin/bash
echo "Creating Public Folders"
mkdir -p public
mkdir -p public/images
mkdir -p public/fonts
mkdir -p public/css
mkdir -p public/js
mkdir -p public/php
mkdir -p tmp
chmod 777 tmp/

echo "Creating Index.html"
pug index.pug -O keys.json -o public/

echo "Combine, Minify and Copy CSS"
touch tmp/main.css
lessc main.less tmp/main.css
cp bower_components/bootstrap/dist/css/bootstrap.min.css tmp/bootstrap.min.css
cp bower_components/font-awesome/css/font-awesome.min.css tmp/font-awesome.min.css
cp -a bower_components/font-awesome/fonts/. public/fonts/
uglifycss tmp/*.css > public/css/main.css

echo "Combine, Minify and Copy JS"
uglifyjs bower_components/jquery/dist/jquery.min.js bower_components/bootstrap/dist/js/bootstrap.min.js bower_components/jquery.lazyload/jquery.lazyload.js analytics.js main.js --mangle --compress --output=public/js/main.js

echo "Copy Images"
cp -a images/. public/images/
cp favicon.ico public/favicon.ico

echo "Copy Impressum and Datenschutz"
pug impressum.pug -o public/
pug datenschutz.pug -o public/

echo "Copy Mailer"
cp -a php/. public/php/

echo "Copy htaccess"
cp .htaccess public/.htaccess

echo "Copy Autorun (for USB/CD)"
cp autorun.inf public/autorun.inf

echo "Copy AppCache.manifest"
cp manifest.appcache public/manifest.appcache

rm -rf tmp
echo "Done. Now Copy all in public to your webspace"
