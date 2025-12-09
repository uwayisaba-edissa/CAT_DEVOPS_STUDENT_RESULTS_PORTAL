#!/bin/bash

# Usage: ./version.sh [patch|minor|major]

if [ -z "$1" ]; then
  echo "Please provide version type: patch, minor, or major"
  exit 1
fi

# Get current version from package.json
current_version=$(grep '"version"' package.json | head -1 | awk -F '"' '{print $4}')
IFS='.' read -r major minor patch <<< "$current_version"

case $1 in
  patch)
    patch=$((patch + 1))
    ;;
  minor)
    minor=$((minor + 1))
    patch=0
    ;;
  major)
    major=$((major + 1))
    minor=0
    patch=0
    ;;
  *)
    echo "Invalid version type. Use patch, minor, or major."
    exit 1
    ;;
esac

new_version="$major.$minor.$patch"

# Update package.json
sed -i "s/\"version\": \"$current_version\"/\"version\": \"$new_version\"/" package.json

# Commit and tag
git add package.json
git commit -m "chore(release): bump version $new_version"
git tag -a "v$new_version" -m "Release v$new_version"

echo "Version bumped: $current_version → $new_version"
