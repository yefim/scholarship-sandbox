#!/bin/bash
set -e

TARGET_BRANCH="gh-pages"
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}

webpack -p --config webpack.config.js

mkdir build/assets
mv build/bundle.js build/assets/bundle.js

cd build
git init
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"


git add .
git commit -m "Deploy to github pages"

ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in key.pub.enc -out key.pub -d
chmod 600 key.pub
eval `ssh-agent -s`
ssh-add key.pub

git push --force --quiet $SSH_REPO $TARGET_BRANCH
