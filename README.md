# Solar v.2

- Rebuild of Low-tech Magazine's Solar theme with Hugo
- Updated for the Sequioia Fabrica use (removed localization to reduce complexity)
- Builds the entire site in minutes rather than hours :)
- Makes use of additional taxonomies that are possible in Hugo

Requires Hugo 0.145 or newer!

## Local Development
```
hugo server
```

## Adding pages and writing posts
There is a handy guide! 

- If running locally, check out [http://localhost:1313/article-template-how-to](http://localhost:1313/article-template-how-to)
- raw markdown at [content/article-template-how-to/index.md](./content/article-template-how-to/index.md)


## Author & Translator pages

This site builds custom taxonomy for `Authors` which can be accessed via `http://localhost:1313/authors/`. Individual data about each author can be written in `content/authors/authorname/index.md`


# TODO: update all content below this line:
------------
# Additional utilities

In `utils` there are various utilities to be used before or after site rendering. 

## dithering tool

`dither_images.py` recursively traverses folders and creates dithered versions of the images it finds. These are stored in the same folder as the images in a folder called "dithers".

### Installation & Depedencies

depends on [Pillow](https://pillow.readthedocs.io) and [hitherdither](https://github.com/hbldh/hitherdither)

`pip install Pillow git+https://www.github.com/hbldh/hitherdither`

### Usage

Dither all the images found in the subdirectories of `content` 
`python3 utils/dither_images.py --directory content/`

Colorize the dithers as well based on the LTM categories:
`python3 utils/dither_images.py --directory content/ --colorize`

Run the script with more debug output:
`python3 utils/dither_images.py --directory content/ --colorize --verbose`

Remove all dithered files in the subdirectories of `content`:
`python3 utils/dither_images.py --remove --directory content/`

## Page Size Calculator

This script recursively traverses folders and enumerates the file size of all html pages and associated media.
The calculated total file size is then added to the HTML page. The script looks for a `div` with class `page-size` to add the page metadata in to. This div is currently found in `layouts/partials/footer.html`

#### Installation & Dependencies

Relies on BeautifulSoup

`pip install bs4`


#### Usage

This script should be run *after* the site has been generated on the resulting files. It is a post-processing step.
In the case of Hugo, this is usually the directory called `public`. Add the baseurl that you also use in production:

`python3 utils/calculate_size.py --directory public/ --baseURL https://solar.lowtechmagazine.com`

## build_site.sh

This is a script to build the hugo site and run the various support scripts. It assumes you generate and deploy the site on the same machine.

It can be used in `cron` to make a daily build at 12:15 and log the output. 

`15 12 * * * /bin/bash /path/to/repo/utils/build_site.sh > /path/to/build.log 2>&1`

# Contributions

Updates for Sequioa Fabrica made by
* [Camille Teicheira](https://camileanne.com)

The Solar v.2 theme was made by

* [Marie Otsuka](https://motsuka.com/)
* [Roel Roscam Abbing](https://test.roelof.info)
* [Marie Verdeil](https://verdeil.net/)

With contributions by
* [Erhard Maria Klein](http://www.weitblick.de/)

# Donations

If Low-Tech Magazine or this theme has been useful to your work, please support us by making a one time donation [through Paypal](https://www.paypal.com/paypalme/lowtechmagazine) or a recurring one [through Patreon](https://solar.lowtechmagazine.com/donate/) 
