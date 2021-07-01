# Raven0

✨ Raven0 - Discord Bot Written In Typescript with [Discord-Akairo](https://github.com/discord-akairo/) And [Discord.JS](https://github.com/discordjs) Made With ♥ By ArtieFuzzz (#8298)

* Nightly Build Status [![pipeline status](https://gitlab.com/raven0-bot/Raven/badges/nightly/pipeline.svg)](https://gitlab.com/raven0-bot/Raven/-/commits/nightly)

* Main Build Status: [![pipeline status](https://gitlab.com/raven0-bot/Raven/badges/main/pipeline.svg)](https://gitlab.com/raven0-bot/Raven/-/commits/main)

## Self Hosting Instruction

* Make sure you have TypeScript and Yarn installed on your PC/Laptop
* To install TypeScript run `npm install -g typescript`
* To configure the bot you need to copy .env.example to .env and main.json.example in config to main.json and fill out the files
* Then install the dependencise with `npm install`
* Then build the projects with `npm run build`
* Once done you can run `npm start` or `npm run prod` for Production.
* For windows run update.bat in the `scripts` folder. Please note that this will not automatically restart your bot
* If you run on VPS with pm2, you can use `pm2 start pm2-start.json` (recommended)
* You're now all set!
* Having trouble with Self Hosting? You can join the support server [here](https://discord.gg/quht6bcFbX)

## Self Hosting - Docker

* Make sure you have docker installed
* Copy the .env.example file to .env and fill it out also do the same for main.json.example
* Now run `docker build .` to build.  A tag is optional.
* Now you're all set! Just run the built image.
* Having trouble with Self Hosting? You can join the support server [here](https://discord.gg/quht6bcFbX)

## Self Hosting - Docker Compose

* Make sure you have docker and / or docker-compose
* Copy the .env.example file to .env and fill it out also do the same for main.json.example.
* Now run `docker compose up -d` to run in the background or `docker compose up` to run in the terminal.
* Having trouble with Self Hosting? You can join the support server [here](https://discord.gg/quht6bcFbX)

## Updating

If you are upgrading to a newer version use the files in the scripts folder.

* update.bat - Windows (No auto start)
* update.sh - Linux

**Requirements:**

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)

## License

This project is licensed under the MIT License

===

## Credits

* TMUniversal for the [Template](https://github.com/TMUniversal/discord-bot-template)
