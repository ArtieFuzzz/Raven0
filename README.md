# Raven0

✨ Raven0 - Discord Bot Written In Typescript with [Discord-Akairo](https://github.com/discord-akairo/) And [Discord.JS](https://github.com/discordjs) Made With ♥ By ArtieFuzzz (#8298)

## Self Hosting Instruction

* Make sure you have TypeScript and Yarn installed on your PC/Laptop
* To install TypeScript run `npm install -g typescript`
* To install Yarn run `npm install -g yarn`
* To configure the bot you need to copy .env.example to .env and main.json.example in config to main.json and fill out the files
* Then install the dependencise with `yarn install`
* Then build the projects with `yarn build`
* Once done you can run `yarn start` or `yarn prod` for Production. Use `yarn start:linux` or `yarn start:windows` to update, build and restart the bot everytime you run it
* If you run on VPS with pm2, you can use `pm2 start pm2-start.json`
* You're now all set!
* Having trouble with Self Hosting? You can join the support server [here](https://discord.gg/7jP2gMDvRN)

## Updating

If you are upgrading to a newer version use:
* `yarn start:linux` - Linux users
* `yarn start:windows` - Windows users
Running this will fetch the latest update, rebuild and restart the bot. Use this to start the bot to update to the lastest version without any of that fuss.

**Requirements:**
* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/en/)
* Yarn installed globally (`npm install -g yarn`)
* PM2 installed globally (`npm install -g pm2`)
