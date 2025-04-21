#!/bin/bash
# © 2023 Roel Roscam Abbing, released as AGPLv3
# see https://www.gnu.org/licenses/agpl-3.0.html
# Support your local low-tech magazine: https://solar.lowtechmagazine.com/donate/
# Updated 2025 by Camille Teicheira

now=`date`
# baseURL="https://sequoiafabrica.org" #the URL of the website e.g. htttps://solar.lowtechmagazine.com/
baseURL="http://localhost:9000"
contentDir="$(pwd)/content" #the directory where your HUGO articles are e.g. /path/to/repo/solar_v2/content/
repoDir="$(pwd)" #the full path to the repository
outputDir="$(pwd)/output" # the directory where you export the site to.
# python="/usr/bin/python3"


while getopts f flag
do
    case "${flag}" in
        f) updated="forced rebuild";;
    esac
done

if [[ $updated != "forced rebuild" ]]; then
        echo "Checking for update $now"
        updated=$(git -C $repoDir pull origin main)
fi


if  echo $updated | grep -q "Already up to date";
then 
        echo "Git up to date $now"
else
        echo "Git was not up to date"
fi
        mkdir -p $outputDir

        echo $updated
        echo "Rebuilding the site"

        cd $repoDir

        echo "Dithering new images"
        # TODO: colorize requires updates to "categories" (still configured for lowtech mag)
        python3 utils/dither_images.py -d $contentDir # --colorize

        echo "Generating site"
        hugo --baseURL $baseURL --destination $outputDir --ignoreCache --environment production

        echo "Calculating page sizes"
        python3 utils/calculate_size.py --directory $outputDir --baseURL $baseURL

        echo "Removing original media from" $outputDir
        python3 utils/clean_output.py --directory $outputDir

        after_seconds=`date +%s`
        time_elapsed=$(( $after_seconds - $now_seconds ))
        echo "Site regeneration took $time_elapsed seconds"
