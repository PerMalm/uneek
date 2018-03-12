# Uneek

Test Uneek at the following address:
https://uneek-tools.github.io/

or

For local testing:
```
yarn install
yarn run test
yarn run start
```

(`yarn` can be replaced with `npm`)

## Before committing

This will reformat all your code to become beautiful:

```
yarn run prettier
```

This could potentially make merging with other people's code more complicated. If you're anticipating a merge then try to make sure that you either both run prettier or you that both don't.

## Building and deploying

For building:
```
yarn run build
```

Output is in the `dist/` directory. You can remove this directory before building in case you think you have old versions around: `rm -rf dist/`

You can check if building worked by opening the page in the dist directory: `firefox dist/index.html`

To deploy:

1. go to the webpage repo
2. empty its current contents (they are now outdated)
3. copy the files from the `dist/` directory here
4. add them to git
5. commit
6. push

This can be done like this script below, but change the paths to
where you have checked out the repos (I am using `~/code/`).

```
cd ~/code/uneek-tools.github.io/
git rm *
cp ~/code/uneek/dist/* .
git add *
git commit
git push
```
