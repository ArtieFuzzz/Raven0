echo "[I] | Updating the Bot..."
echo "[I] | Downloading latest version..."
git reset --hard
git checkout
git pull
echo "[I] | (Re-)installing..."
npm i
echo "[I] | (Re-)building..."
npm run build
echo "[I] | Done."
