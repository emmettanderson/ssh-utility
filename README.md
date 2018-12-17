# SshUtility
*** Apologies - Currently designed for Northwell Health site implementation.
***             Ongoing development to make site-agnostic. 
Tool for executing cache terminal commands via SSH and transferring files via SFTP to multiple AIX servers.

## Installation
Import HieCOMMONLIBSSHToolsV1.xml into local HS environment
Run in desired HS namespace: 
  > Do ##Class(CUSTOM.CORE.Util.SSHTool.TargetConfig).Populate()
   
  > Do ##Class(CUSTOM.CORE.Util.SSHTool.TargetGroupConfig).Populate()

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
