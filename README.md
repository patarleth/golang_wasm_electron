# simple go -> wasm Electron app

## build

    npm run build

## run

    npm run start

## wat!?

### main.js

On index.html load, attemp to read the .wasm file from out/

Create and send a "wasm_load" ipc message

### renderer.js

On window load (index.html), listen for the .wasm load event produced in the 'main.js' file.  

I COULD have just sourced the .wasm file directly in index.html using a script tag. 

I choose instead to load the binary in the node process, as to remove the dependency and responsibity from the markup, injecting it w/ renderer.js instead.

Once the wasmSrc "binary" is passed to the ipcRenderer.on function, the wasm is then instantiated.  On success, the wasm main is executed, making the exported golang functions available to renderer.js.

Ignoring the stupid function name, myMessage(msg) does nothing. Simply prepending the string passed to the output with a counter

    myMessage - <msg> - <counter>

The msg is logged to the js console and assigned to a div.innerHTML
