/*global window orion */
	var picked, url, w, deferred;
	
    // Create and render a Picker object for searching images.

 
function fun(){
	if (w.closed){
		console.log('fun call pre');
		deferred.resolve(url);
		console.log('fun call post, result:' + url);
		return;
	}
	console.log('fun fun');
	setTimeout(function(){
		fun();
	}, 1000);  
 }
 
 
function createPicker(text) {

	deferred = new orion.Deferred();

	url = '';
	picked = false;
    w = window.open('picker.html','color_popup','width=610,height=550,scrollbars=0');
    
 	w.focus();
 	
 	fun();
 	
 	
   return deferred;
}

window.onload = function() {

	//google.setOnLoadCallback(createPicker);
   
	// create the plugin
	var headers = {
		name: "Google Picker embedder",
		version: "0.2",
		description: "Plugin that provides Google image Picker"
	};
	var provider = new orion.PluginProvider(headers);

	//editor command service	
	var serviceImpl = {
		run: function(selectedText, text, selection) {
			return createPicker(selectedText);
		}
	};
	var serviceProps = {
		name: "Pick an image",
		key: ["p", true, true]
	};
	provider.registerServiceProvider("orion.edit.command", serviceImpl, serviceProps);

	provider.connect();
};