rm -rf ./dist
pnpm i
pnpm run build
cd ./dist
git init
git checkout -b gh-pages
git add .
git commit -m "feat: publish"
git remote add origin git@github.com:YINGcnf/test.git
git push -f origin gh-pages