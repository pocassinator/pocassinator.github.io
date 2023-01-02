#!/bin/bash

# Script which looks for image files in the list of directories and uses cwebp to output webp versions of each image in the same directory as the original image with .webp extension

# Set the directories to search for image files
directories=("assets/images/portfolio/handmade" 
"assets/images/portfolio/digital"
"assets/images/portfolio/accessories")

# Set the filename
filename='assets/scss/_mixins.scss'

# Create an array to store the captured groups
declare -a screen_widths

# Read the file and store the captured groups in the array
while IFS= read -r line; do
  if [[ $line =~ max-width:([0-9]+)px ]]; then
    screen_widths+=( "${BASH_REMATCH[1]}" )
  fi
done < "$filename"

echo "Captured screen widths: ${screen_widths[@]}"

# Iterate over the directories
for directory in ${directories[@]}; do
  # Find all image files in the directory and store the results in an array
  image_files=($(find "$directory" -type f -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.bmp"  -o -name "*.tiff" ))

  # Iterate over the screen widths
  for screen_width in ${screen_widths[@]}; do
  
    # Use convert to resize the image and save it to a file with a suffix indicating the screen width
    for image_file in ${image_files[@]}; do
      base_name=$(echo "$image_file" | rev | cut -f 2- -d '.' | rev)
      convert "$image_file" -resize "${screen_width}x" "${base_name}_${screen_width}.jpg" &
    done
  done

  # Delete Original files
  for image_file in ${image_files[@]}; do
    rm -f $image_file &
  done

  image_files=($(find "$directory" -type f -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" -o -name "*.bmp"  -o -name "*.tiff" ))

  # Iterate over the array of image files
  for image_file in ${image_files[@]}; do
    # Get the base name of the image file (i.e. the file name without the extension)
    base_name=$(echo "$image_file" | rev | cut -f 2- -d '.' | rev)
    echo $image_file
    # Use cwebp to create a webp version of the image
    cwebp "$image_file" -o "${base_name}.webp" &
    npx avif --input="$image_file" --output "$directory" &
    # rm -rf $image_file
  done
done