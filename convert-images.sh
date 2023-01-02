#!/bin/bash

# Script which looks for image files in the list of directories and uses cwebp to output webp versions of each image in the same directory as the original image with .webp extension

# Set the directories to search for image files
directories=("assets/images/portfolio/handmade" 
"assets/images/portfolio/digital"
"assets/images/portfolio/accessories")

# Iterate over the directories
for directory in ${directories[@]}; do
  # Find all image files in the directory and store the results in an array
  image_files=($(find "$directory" -type f -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.bmp"  -o -name "*.tiff" ))

  # Iterate over the array of image files
  for image_file in ${image_files[@]}; do
    # Get the base name of the image file (i.e. the file name without the extension)
    base_name=($image_file | sed 's/\.[^.]*$//')
    echo $image_file
    # Use cwebp to create a webp version of the image
    cwebp "$image_file" -o "${base_name}.webp"
    npx avif --input="$image_file" --output "${base_name}.avif"
    # rm -rf $image_file
  done
done