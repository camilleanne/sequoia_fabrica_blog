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

## Organizing content

Content is organized as [Hugo Page Bundles](https://gohugo.io/content-management/page-bundles/).

That means that each post is a directory (`content/posts`) which contains: 

* the article (`index.md`)
* the images in the article (`images/`)
* dithered versions of the images (`images/dithers/`)
* comments (`comments.md`) 

Example:

```
how-to-build-a-low-tech-internet/
├── comments.en.md
├── images
│   ├── dithers
│   │   ├── img1_dithered.png
│   │   ├── img2_dithered.png
│   │   ├── img3_dithered.png
│   │   └── img4_dithered.png
│   ├── img1.png
│   ├── img2.jpg
│   ├── img3.png
│   └── img4.jpg
├── index.md
```
At least one article is required: `index.md` or `index.md`.

## Formatting articles

The design relies on the following [front matter](https://gohugo.io/content-management/front-matter/) fields:

```
---
title: First Blog Post
date: 2025-03-10
summary: look ma no hands
draft: false
authors:
  - Canis Familiaris
  - Felis Catus
tags:
  - tag
  - tag2
categories:
  - general
featured_image: you-got-it-boss.png
---
```

``` 
### Image shortcodes

The design relies on shortcodes for images rather than markdown image tags:

`{{% figure src="yutampo2.png" %}} Una borsa d’acqua calda giapponese detta yutampo, fatta di plastica rigida. Fonte: All About Japan. [https://allabout-japan.com/en/article/6244/](https://allabout-japan.com/en/article/6244/) {{% /figure %}}
`


### Reader comments
If there are any comments to be rendered under an article they should be in a file called `comments.md` and each comment rendered as such:
```
{{< comment name="Lord Byron" >}}
As the Liberty lads o'er the sea
Bought their freedom, and cheaply, with blood
So we, boys, we
Will die fighting, or live free,
And down with all kings but King Ludd” 
{{</ comment >}}
```

### Internal links
To link to other articles on the solar website, we use a hugo specific shortcode to call the article folder. This has an advantage as the url will not break if the article `title` or `date` change, since we are calling the file itself. 
- _Sytnax:_
```go
[Text]({{< ref "/path-to-folder" >}})
``` 
- _Examples:_
```go
[Donate]({{< ref "/donate" >}})
[here]({{< ref "/posts/power-water-networks/" >}})
```

# TODO: update all content below this line:
------------

## Author & Translator pages

This site builds custom taxonomies for `Authors` and `Translators` which can be accessed via `http://localhost:1313/authors/` and `http://localhost:1313/translators/` respectively. Individual data about each author or translator can be written in `content/authors/authorname/index.md`


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

The Solar v.2 theme was made by

* [Marie Otsuka](https://motsuka.com/)[^1]
* [Roel Roscam Abbing](https://test.roelof.info)[^1]
* [Marie Verdeil](https://verdeil.net/)

With contributions by
* [Erhard Maria Klein](http://www.weitblick.de/)

# Donations

If Low-Tech Magazine or this theme has been useful to your work, please support us by making a one time donation [through Paypal](https://www.paypal.com/paypalme/lowtechmagazine) or a recurring one [through Patreon](https://solar.lowtechmagazine.com/donate/) 

[^1]: Marie and Roel created the [original Pelican theme](https://github.com/lowtechmag/solar) for the first version of https://solar.lowtechmagazine.com
