clear 
DIR="dist/"
if [ -d "$DIR" ]; then
  rm -R dist/
  echo "Removing old dist folder...."
fi
echo "Making new build"
node -v
npm -v
webpack
echo "removing old files git files"
# rm ../git/template*
# echo "Copying dist files to git folder"
# cp dist/* ../git/template/
# echo "going to GIT Dir"
# cd ../git/template/
# echo "Commiting the code to GIT"
# date +'FORMAT'
# date +'%m/%d/%Y'
# date +'%r'
# backup_dir=$(date +'%m/%d/%Y')
# git add . && git commit -m backup_dir
# echo "Pushing the code"
# git push origin master
# echo "Code is pushed"
