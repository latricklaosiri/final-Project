//Load assets to use in programs
//Mouse program is heavily based on nCases programs, used freely under common attributes liscense


window.Loader = {};
Loader.load = function(imagePaths){

	// When all images loaded, callback
	var assetsToLoad = imagePaths.length;
	var _onAssetLoad = function(){
		assetsToLoad--;
		if(assetsToLoad==0){
			Loader.onload();
		}
	};

	// Load images
	for(var i=0;i<imagePaths.length;i++){
		var img = new Image();
		img.onload = _onAssetLoad;
		img.src = imagePaths[i];
	}

};