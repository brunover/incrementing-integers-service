FROM golang:1.13 as builder
WORKDIR /go/src/github.com/incrementing-integers-service/server
ENV version 0.2.2

# Copy build files.
COPY . .
RUN go get ./...
RUN go build

# Delete the following 2 lines and $args in production
ARG args=-dev
ENV args=$args
ENTRYPOINT ./server $args
