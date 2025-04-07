package main

import (
	"fmt"
	"syscall/js"
)

var myMessageCounter int

//go:wasmexport
func myMessage(this js.Value, args []js.Value) interface{} {
	if len(args) != 1 {
		return js.ValueOf("Invalid number of arguments")
	}
	myMessageCounter += 1

	msg := args[0].String()
	result := fmt.Sprintf(" - - myMessage - %s - %d", msg, myMessageCounter)
	jsResult := js.ValueOf(result)
	return jsResult
}

func main() {
	myMessageCounter = 0
	c := make(chan struct{}, 0)

	println("hello from wasm world")

	// manually registering the export, This SHOULD be unnecessary as the //go:wasmexport is
	// specified. HOWEVER grumble, grumble, grumble... sigh.
	js.Global().Set("myMessage", js.FuncOf(myMessage))
	<-c
}
