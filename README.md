# Uneek

Test Uneek at the following address: https://permalm.github.io/permalm-github.io/

or

For local testing:
```
yarn install
yarn run test
yarn run start
```

(`yarn` can be replaced with `npm`)

# Building and deploying

For building:
```
yarn run build
```

Output is in the `dist/` directory.

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
