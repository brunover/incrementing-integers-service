#!/bin/bash
# Creates a production ready build in the folder ./view/build and 
# restart docker to apply the changes to local container
npm run build
docker-compose -f ../docker-compose.yml down
docker-compose -f ../docker-compose.yml up --build -d