var document = app.activeDocument;
var folder = new Folder(document.path + "/" + "Assets");

if (document && folder) {
	saveToRes(100, "mdpi");
	saveToRes(150, "hdpi");
	saveToRes(200, "xhdpi");
	saveToRes(300, "xxhdpi");
	saveToRes(400, "xxxhdpi");
	saveToRes(100, "@x");
	saveToRes(200, "@2x");
	saveToRes(300, "@3x")	
}

function saveToRes(scaleTo, resFolderName) {
	var i, layer, 
		file, options,
		resFolder;
	
	resFolder = new Folder(folder.fsName + "/drawable-" + resFolderName);
	
	if (!resFolder.exists) {
		resFolder.create();
	}
	
	for (i = document.layers.length - 1; i >= 0; i--) {
		layer = document.layers[i];
		if (!layer.locked && layer.name.indexOf("!") === -1) {
			hideAllLayers();
			layer.visible = true;
			
			file = new File(resFolder.fsName + "/" + layer.name + ".png");
			
			options = new ExportOptionsPNG24();
			options.antiAliasing = true;
			options.transparency = true;
			options.artBoardClipping = false;
			options.verticalScale = scaleTo;
			options.horizontalScale = scaleTo;
			
			document.exportFile(file, ExportType.PNG24, options);
		}
	}
}

function hideAllLayers() {
	var i, layer;
	
	for (i = document.layers.length - 1; i >= 0; i--) {
		layer = document.layers[i];
		if (!layer.locked && layer.name.indexOf("!") === -1) {
			layer.visible = false;
		}
	}
}
