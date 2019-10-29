# incrementing-integers-service
Service that let's you call a REST endpoint that returns the next available integer

For development, install golang and clone the repo inside the gopath

~/go/src/github.com/

for example, on Windows:

go to "C:\Users\YOUR_USERNAME\go\src\github.com\"
git clone https://github.com/brunover/incrementing-integers-service.git

need
node
npm
golang
docker

cd server
copy .env.sample
rename to .env
go get

cd view
npm start 
or 
./ui-build

curl http://localhost/api/v1/users/1/
curl http://localhost/api/v1/users/1/current
curl http://localhost/api/v1/users/1/next
curl -X "PATCH" http://localhost/api/v1/users/1/current -H "Authorization: Bearer XXXXX" --data "current=1000"