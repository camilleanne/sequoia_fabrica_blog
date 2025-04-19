---
title: "Article Template: How to write posts in Markdown for Hugo?"
date: ""
summary: "This page goes over the specific markdown syntax that should be used to write articles, and comments in the new hugo solar web. "
lang: "en"
authors: ["Marie Verdeil"]
categories: [""]
tags: [""]
unlisted: true
draft: false
featured_image: "image.png"
---

{{% figure src="image.png" %}} 
A screenshot of the markdown file for this page.
{{% /figure %}}

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Files](#files)
    - [Structure](#structure)
    - [Folder Name](#folder-name)
  - [Comments file](#comments-file)
- [Formatting articles](#formatting-articles)
- [Syntax Rules](#syntax-rules)
  - [Main rules](#main-rules)
- [Big headers are h2](#big-headers-are-h2)
  - [Sub-header are h3](#sub-header-are-h3)
  - [Internal Links](#internal-links)
- [Images shortcodes](#images-shortcodes)
- [Comments](#comments)

## Files

Each articles lives in the folder `posts` on Github, with the following structure. 

#### Structure

Content is organized as [Hugo Page Bundles](https://gohugo.io/content-management/page-bundles/).

That means that each post is a directory (`content/posts`) which contains: 

* the post (`index.md`)
* the images in the article (`images/`)
* dithered versions of the images (`images/dithers/`)
* comments (`comments.md`) 

Example:

```text
how-to-build-a-low-tech-internet/
├── comments.md
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

#### Folder Name

To create on new post, be sure to create a new folder in `posts/` with the name of the post, containing at least:
- 1 index file 
- 1 comments file (see below)
- 1 `images/` folder where your images will live. 


To create an new page that isn't an blog post, place the folder directly in `content/` or in `content/about/` for the about section. 

By default, your folder name is the article slug. The slug should match the title, but with the following rules. Use `"-"`instead of `" "` spaces and **don't** include special character (no `,=;/%?! &.@` etc.)

```
/posts/my-article-name/index.md
```

will become:

```
https://sequoiafabrica.org/YYYY/MM/my-article-name/ 
```

### Comments file

The comments should be placed in a different file in the article folder.

The comments will appear automatically at the end of the article, no need to add anything in the article file. 

Regarding the syntax of the comments files see the [Comments section below](#reader-comments).

## Formatting articles

The design relies on the following [front matter](https://gohugo.io/content-management/front-matter/) fields:

```text
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

**_!Do not forget the `---` at the first and last line of the front matter!_**


* Date should use the following YYYY-MM-DD syntax.
  ```yaml
  date: "2015-10-26"
  ```
* The correct spelling for categories is:
 `"Low-tech Solutions"` (Blue), `"High-tech Problems"` (Red),  `"Obsolete Technology"` (Green),  `"About"` or `" "` (BW)
  ```text
  categories: ["Low-tech Solutions"]
  ```
  // TODO: UPDATE THIS ^^
* The featured image will appear as a thumbnail on the category page. Make sure the image is placed inside the `images/` folder. Do not include the file path, just the image with the correct extension (.png, .jpg).
  ```text
  featured_image: "image.png"
  ```
* `draft: false` is the default. Setting this to `draft: true` will not generate the article. It will not be visible on the site anymore, only on gitlab.
  ```text
  draft: false
  ```

_**Always include at least:**_ `title: "", date: "", summary: "Article Summary"`

Other metadata fields are available: 

* `slug: ""` : By default, the slug is the filename but you can overwrite this by adding a slug.
  ```text
  slug: "this-is-a-slug"
  ```
* `unlisted: true` : Include this field to mark the article as unlisted: it will still be accessible via the url but won't be listed in the index page.
  ```text
  unlisted: true
  ```

## Syntax Rules

The rest of of the document uses [regular markdown syntax](https://www.markdownguide.org/cheat-sheet), with a few exception. Markup conventions as follows: 


### Main rules

- `## Big headers are h2` and render as:
  ## Big headers are h2
- `### Sub-header are h3` and render as:
  ### Sub-header are h3 
- `> Quotes` render as:
  > Quotes
- `* Lists` /  ` - Lists` render as this list.
* _Footnote references_ use this syntax: `[^number]` and render as [^1]
* _Footnotes_ appear the bottom of the document. The syntax is `[^1]: text`

[^1]: Footnotes appear here the bottom of the document.

- `[Hyperlinks](url)` linking to other websites render as: [Hyperlinks](url)


### Internal Links

To link to other articles on the solar website, we use a hugo specific shortcode to call the article folder. This has an advantage as the url will not break if the article `title` or `date` change, since we are calling the file itself.

- _Shortcode is written as follow and looks like this:_ [Text](/).
  ```text
  [Text]({{</* ref "/path-to-folder" */>}})
  ``` 

The file path should start from within the content folder and link to the article or page folder, not the slug!

- _Examples:_
  ```text
  [Donate]({{</* ref "/donate" */>}})
  [here]({{</* ref "/posts/power-water-networks/" */>}})
  ```


* _To link to a section in the article_ (render as: [Link to section](#section).)
  ```text
  [Link to Section](#section)

  ### Section
  ```

## Images shortcodes

Images now use specific shortcodes instead of the classic markdown syntax. This allows t include a toggle linking to the original images and to embed the caption within the image and better control its styling. 

The shortcode is written: 
```text
{{%/* figure src="image-1.png" %}} 
Here goes the image caption. 
You can include footnotes [^1], 
[Hyperlinks](https://solar.lowtechmagazine.com), 
and *regular* __markdown__ syntax.
{{% /figure */%}}
```
and render as: 

{{% figure src="image-1.png" %}} 
This is an image of the shortcode that generated it. You can include footnotes [^1], 
[Hyperlinks](https://solar.lowtechmagazine.com), 
and *regular* __markdown__ syntax.
{{% /figure %}}

Captions are handy to include sources and additional info but are also useful for screen-readers users (people who cannot see images). Describing the image is thoughtful of them. 

To render uncompressed images (not dithered and not compressed in `.webp`), use the normal markdown syntax. This comes in handy for comic pages, for example. Please pre-compress the images to prevent overcrowding the server with big files. 
```markdown
![here goes your alt text](image-filename.png)
```


## Comments
 
Comments are now added in a dedicated `comments.md` file, as explained above. 
The file should start with the following lines:
```yaml
---
---
```

Each comment is then added: 
```text
{{</* comment name="Name" >}}

This is the comment text.

{{</ comment */>}}
```
Check out the result [at the bottom](#comments-title)


Please reach out _marie @ verdeil . net_ if you have any remaining questions.

