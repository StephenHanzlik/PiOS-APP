# PiOS

To test this app, please follow the instructions closely.

## Raspberry Pi Server Setup
### Setup Networking
1. Setup your Raspberry Pi to broadcast a network called `PiOS Media Server`, and make sure the Pi itself is setup under the name `eggnogg`.

### Install NodeJS Modules
2. Transfer the files in the piBackend directory on your server, then run `npm install`.

### Setup DB
3. Create a Postgres database called 'q2pi', run its migrations with `knex migrate:latest` and its seeds with `knex seed:run`.

### Serve Files
4. Run `nodemon` to bring up the server. It should tell you it is `Listening on http://localhost:8000`.

## Frontend Setup
### Install NodeJS Modules
5. Transfer the files in the ionicFrontend directory to your client, then run `npm install`.

### Install iOS files
6. Run `ionic platform add ios`. The system should now be ready to emulate.

### Network Setup
7. Make sure you are connected to the `PiOS Media Server` network.

### Emulation
8. Run `ionic emulate ios` or `ionic serve` to test this project.

## Troubleshooting
If it errors out during the build, or you only see a blank screen, try running `bower install` to reinstall the ionic configuration. This application requires a full XCode installation to emulate properly.

If this is your first time emulating an ionic app, [here's a great resource on getting started](https://www.pluralsight.com/blog/software-development/ionic-framework-on-mac-and-windows).
