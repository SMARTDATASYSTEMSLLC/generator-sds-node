#generator-sds-node

>Yeoman Node/Hapi Generator for Smart Data Systems

Getting Started
-------------

Prerequisites: Node and Yeoman.  Once Node is installed, do:

    npm install -g yo

Next, install this generator:

    npm install -g generator-sds-node

To create a project:

    mkdir MyNewAwesomeApp
    cd MyNewAwesomeApp
    yo sds-node

Running The Project
-------------

Now that the project is created, you can run it with the following command:

    node server   #This will run the app.

Yeoman Subgenerators
-------------

There are a set of subgenerators to initialize empty Hapi components.  Each of these generators will:

* Create one or more skeleton files (javascript and tests) for the component type.

There are generators for `route`,`model`, and `migration`.

Running a generator:

    yo sds-node:route my-route
    yo sds-node:model my-model
    yo sds-node:migration my-migration

The name paramater passed (i.e. 'my-route') will be used as the file names.  The generators will derive appropriate class names from this parameter.

The route generator will also create a service and test to match.

The migration generator is equivalent to knex migrate:make my-migration.

Preconfigured Libraries
-------------

The new app will have a handful of preconfigured libraries included.  This includes Hapi, Bookshelf, Knex, Lab, Moment, and Lodash.  You may of course add to or remove any of these libraries.  But the work to integrate them into the app and into the build process has already been done for you.

