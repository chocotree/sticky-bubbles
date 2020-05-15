npm run build

echo "https://istree-sticky-bubbles.surge.sh" > CNAME

mv CNAME ./build/

cd build

surge