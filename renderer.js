const { remote, ipcRenderer } = require('electron')

/*
On window load (index.html), listen for the .wasm load event produced in the 'main.js' file.  

I COULD have just sourced the .wasm file directly in index.html using a script tag. 

I choose instead to load the binary in the node process, as to remove the dependency and responsibity from the markup, injecting it w/ renderer.js instead.

Once the wasmSrc "binary" is passed to the ipcRenderer.on function, the wasm is then instantiated.  On success, the wasm main is executed, making the exported golang functions available to renderer.js.

Ignoring the stupid function name, myMessage(msg) does nothing. Simply prepending the string passed to the output with a counter

    myMessage - <msg> - <counter>

The msg is logged to the js console and assigned to a div.innerHTML
*/

window.onload = function (e) {
	console.log('renderer.js to the rescue!')
	const msg_div = document.getElementById("msg_div")
	const msg_input = document.getElementById("msg_input")
	const go_button = document.getElementById("go_button")

	const go = new Go();
	const imports = go.importObject

	ipcRenderer.on('wasm_load', function (e, wasmSrc) {
		//const wasmSrc = fetch("out/main.wasm")
		if (wasmSrc) {
			console.log("wasm_load fired with wasmSrc passed " + wasmSrc.length)
		} else {
			console.log("wasm_load fired with NULL wasmSrc")
		}
		WebAssembly.instantiate(wasmSrc, imports).then(
			(result) => {
				go.run(result.instance);
				if (go_button) {
					go_button.onclick = () => {
						msgValue = msg_input.value
						if(!msgValue) {
							msgValue="maybe"
							msg_input.value = msgValue
						}
						msg = myMessage(msgValue)
						console.log("go_button pressed " + msg)
						msg_div.innerHTML = msg
					}
				}
			}
		)
	})
}

