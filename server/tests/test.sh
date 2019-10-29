#!/bin/bash

#TESTS="*_test.go"
#
#for f in $TESTS
#do
#	arrIN=(${f//_/ })
#	if [ "main" == "${arrIN[0]}" ]; then
#		echo "skipping main"
#	else
#		echo "Running test on $f"; go test -v -run ${arrIN[0]}
#	fi
#done


go test -v -run Suite