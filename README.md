### Express API developed in College

This repository was developed for Web Service subject of Computer Science Bacharelor

## Instructions to run the project

First add the `nodemon.json` file in root of project, this file only has a `"env":{}` that is a environment config used inside this server application (e.g: `server.js`)

Since this file may contain ( not in this case ) sensitive info (like IPs or database access credentials) is better to not upload it into a public project.

```json
	{
		"env":{
		"PORT":4435
		}
	}
```

Then you just have to download all the modules listed into `package.json` with the command `yarn` and finally run the project with `yarn start`.

Since I use nodemon, when you change the code and save, the code automatically will be interpreted will run again. Happy coding!

