#!/bin/bash
echo "[I] | Updating the Bot..."
echo "[I] | Downloading latest version..."
git reset --hard
git checkout
git pull
echo "[I] | (Re-)installing..."
yarn
echo "[I] | (Re-)building..."
yarn build
echo "[I] | (Re-)starting the bot..."
if [ pm2 pid Raven0 ]; then
echo "[I] | The bot is still running! Don't worry I'll handle this..."
pm2 restart Raven0
echo "[I] | Done."
fi
pm2 start pm2-start.json
echo "[I] | Done."
