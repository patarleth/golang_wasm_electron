#!/usr/bin/env bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

mkdir -p ${SCRIPT_DIR}/out

cd src/go

GOOS=js GOARCH=wasm go build -o ${SCRIPT_DIR}/out/main.wasm main.go
# tinygo build -o ${SCRIPT_DIR}/out/main.wasm -target wasi main.go
