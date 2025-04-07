#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

mkdir -p ${SCRIPT_DIR}/out

cd src/go

export GOOS=js 
export GOARCH=wasm 

go build -o ${SCRIPT_DIR}/out/main.wasm main.go
# tinygo build -o ${SCRIPT_DIR}/out/main.wasm -target wasm main.go
