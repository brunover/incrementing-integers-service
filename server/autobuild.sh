#!/bin/bash
# removes old go artifacts
rm -f ./server.exe
rm -f server
# generates new builds (for Windows and Unix)
go build .
env GOOS=linux go build -o server .
