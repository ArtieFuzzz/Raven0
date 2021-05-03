echo "[I] | Updating the Bot..."
echo "[I] | Downloading latest version..."
git reset --hard
git checkout
git pull
echo "[I] | (Re-)installing..."
yarn
echo "[I] | (Re-)building..."
yarn build
echo "[I] | Done."
