# Workspace-archive README

Super simple and fast workspace archiver.

## Features

Under the hood this extention uses the NPM packaging system [npm-packlist](https://www.npmjs.com/package/npm-packlist)

![Intro](images/Intro.gif)

It uses the following rules:

1. If a `package.json` file is found, and it has a `files` list,
   then ignore everything that isn't in `files`. Always include the
   readme, license, notice, changes, changelog, and history files, if
   they exist, and the package.json file itself.
2. If there's no `package.json` file (or it has no `files` list), and
   there is a `.npmignore` file, then ignore all the files in the
   `.npmignore` file.
3. If there's no `package.json` with a `files` list, and there's no
   `.npmignore` file, but there is a `.gitignore` file, then ignore
   all the files in the `.gitignore` file.
4. Everything in the root `node_modules` is ignored, unless it's a
   bundled dependency. If it IS a bundled dependency, and it's a
   symbolic link, then the target of the link is included, not the
   symlink itself.
5. Unless they're explicitly included (by being in a `files` list, or
   a `!negated` rule in a relevant `.npmignore` or `.gitignore`),
   always ignore certain common cruft files:

   1. .npmignore and .gitignore files (their effect is in the package
      already, there's no need to include them in the package)
   2. editor junk like `.*.swp`, `._*` and `.*.orig` files
   3. `.npmrc` files (these may contain private configs)
   4. The `node_modules/.bin` folder
   5. Waf and gyp cruft like `/build/config.gypi` and `.lock-wscript`
   6. Darwin's `.DS_Store` files because wtf are those even
   7. `npm-debug.log` files at the root of a project

   You can explicitly re-include any of these with a `files` list in
   `package.json` or a negated ignore file rule.

## Release Notes

### 1.0.0 2019-04-07

Initial release of
