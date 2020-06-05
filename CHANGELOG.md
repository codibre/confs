# Changelog
  All notable changes to this project will be documented in this file.

  The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
  and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

  ## Next Release



-v1.4.8

- fixing .huskyrc name

-v1.4.7

- Adding prettrier back and configuring tslint to not conflict with it

-v1.4.6

- Fixing strict null checks, to show errors in lint when an optional field is used without checking if it is falsy
- Removing prettier from base config, leaving only tslint
- Updating package versions and fixing vulnerabilities

-v1.4.5

- Exporting ts-node-register.js

-v1.4.4

- Definetily fixing script exporting

-v1.4.2

- Trying to fix script exporting

-v1.4.1

- Fixing tsconfig.json exporting
- Fixing creation of .editorconfig

-v1.4.0

- Adding script to create config files
- "declarationMap: false" removed from tsconfig.json

-v1.3.1

- Changing init-git-hooks command to ts file, for coverage purpose

-v1.3.0
- Added script to initialize git hooks on a cloned project where it is already prepareds: init-git-hooks


-v1.2.0
- Added script to update changelog file: update-changelog
