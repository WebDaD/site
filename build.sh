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

echo "Refresh Bower packages"
bower install

echo "Creating Index.html"
pug index.pug -O keys.json -o public/

echo "Combine, Minify and Copy CSS"
touch tmp/main.css
lessc assets/css/main.less tmp/main.css
cp bower_components/bootstrap/dist/css/bootstrap.min.css tmp/bootstrap.min.css
cp bower_components/font-awesome/css/font-awesome.min.css tmp/font-awesome.min.css
cp -a bower_components/font-awesome/fonts/. public/fonts/
uglifycss tmp/*.css > public/css/main.css

echo "Combine, Minify and Copy JS"
uglifyjs bower_components/jquery/dist/jquery.min.js bower_components/bootstrap/dist/js/bootstrap.min.js bower_components/jquery.lazyload/jquery.lazyload.js assets/js/analytics.js assets/js/main.js --mangle --compress --output=public/js/main.js

echo "Copy Images"
cp -a images/. public/images/

echo "Copy Impressum and Datenschutz and AGBS"
pug impressum.pug -o public/
pug datenschutz.pug -o public/
pug agb.pug -o public/

echo "Copy Mailer"
cp -a assets/php/. public/php/

echo "Copy htaccess"
cp .htaccess public/.htaccess

echo "Copy Autorun (for USB/CD)"
cp autorun.inf public/autorun.inf

echo "Copy AppCache.manifest"
cp manifest.appcache public/manifest.appcache

echo "Copy Sitemap"
cp sitemap.xml public/sitemap.xml

echo "Copy robots.txt"
cp robots.txt public/robots.txt

rm -rf tmp
echo "Done. Now Copy all in public to your webspace"
