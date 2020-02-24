function httpGet(theUrl) {
	var xmlHttp = new XMLHttpRequest();
	let response = "";
	xmlHttp.onreadystatechange = function() { 
		if (this.readyState == 4 && this.status == 200) {
			response = this.responseText;
		}
	}
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    xmlHttp.send();
    return response;
}

function getEs(text){
	regex = /Es\s*PV\s*,\s*(\d+)\s*\[W\/m2\]/
	let value = regex.exec(text);
	return value[1];
}

function getTempZew(text){
	regex = /Temp\s+zew\s+PV\s*,\s*(\d+\.\d+)\s*\[.*C\] /
	let value = regex.exec(text);
	return value[1];
}

function getMocCX(text){
	regex = /N27\s*moc\s*P\s*1,5CX,\s*(\d+\.\d+)\s*\[W\]/ 
	let value = regex.exec(text);
	return value[1];
}

function getSumaMocMono(text){
	regex = /N27\s*suma\s+P\s+mono,\s+(\d+\.\d+)\s+\[W\]/
	let value = regex.exec(text);
	return value[1];
}

function getSumaMocCX(text){
	regex = /N27\s*suma\s+P\s+CX,\s+(\d+\.\d+)\s+\[W\]/
	let value = regex.exec(text);
	return value[1];
}

function getSumaMocPoli(text){
	regex = /N27\s*suma\s+P\s+poli,\s+(\d+\.\d+)\s+\[W\]/
	let value = regex.exec(text);
	return value[1];
}

function getSumaMocWyj(text){
	regex = /N27\s*suma\s+P\s+wyj,\s+(\d+\.\d+)\s+\[W\]/
	let value = regex.exec(text);
	return value[1];
}

function setClock(id, value, title){
	defaultColors = [
		[0,10,'#f20'],
		[10,20,'#f30'],
		[20,30,'#f50'],
		[30,40,'#f60'],
		[40,50,'#f80'],
		[50,60,'#fa0'],
		[60,70,'#fc0'],
		[70,80,'#fd0'],
		[80,90,'#ff0'],
		[90,100,'#ff0'],
	];

	// Create the Meter chart specifying the min/max/value
	meter = new RGraph.Meter({
		id: id,
		min: 0,
		max: 100,
		value: value,
		options: {
			marginLeft: 15,
			marginRight: 15,
			marginTop: 15,
			marginBottom: 15,

			// Hide the centerpin by setting its colors to transparent
			centerpinStroke: 'rgba(0,0,0,0)',
			centerpinFill: 'rgba(0,0,0,0)',

			// These are the colors for the segments on the main chart
			colorsRanges: defaultColors,

			// Turn off labels
			labelsCount: 0,

			// By setting the start and end angles of the Meter you can change
			// the extent of the Meter chart from the default semi-circle
			anglesStart: RGraph.PI + 0.5,
			anglesEnd: RGraph.TWOPI - 0.5,

			linewidthSegments: 0,
			textSize: 16,
			marginLeft: 0,
			marginBottom: 0,
			marginRight: 0,
			marginTop: 50,
			title: title,
			colorsStroke: 'white',
			segmentsRadiusStart: 150,
			needleRadius: 210,
			border: 0,
			tickmarksSmallCount: 0,
			tickmarksLargeCount: 0,
			adjustable: false
		}
	}).draw();
}

function setClocks(htmlContent){
	var width = $("#es").parent().width();

	document.getElementById('es').setAttribute("width", width);
	document.getElementById('mocCX').setAttribute("width", width);
	document.getElementById('sumaMocMono').setAttribute("width", width);
	document.getElementById('sumaMocCX').setAttribute("width", width);
	document.getElementById('sumaMocPoli').setAttribute("width", width);
	document.getElementById('sumaMocWyj').setAttribute("width", width);

	document.getElementById('es').innerHTML = setClock('es', getEs(htmlContent),"Natężenie promieniowania Słonecznego");
	document.getElementById('mocCX').innerHTML = setClock('mocCX', getEs(htmlContent),"Moc CX");
	document.getElementById('sumaMocMono').innerHTML = setClock('sumaMocMono', getEs(htmlContent),"Suma Moc Mono");
	document.getElementById('sumaMocCX').innerHTML = setClock('sumaMocCX', getEs(htmlContent),"Suma Moc CX");
	document.getElementById('sumaMocPoli').innerHTML = setClock('sumaMocPoli', getEs(htmlContent),"Suma Moc Poli");
	document.getElementById('sumaMocWyj').innerHTML = setClock('sumaMocWyj', getEs(htmlContent),"Suma Moc Wyj");
}

function setValues(htmlContent){
	document.getElementById('esVal').innerHTML = getEs(htmlContent);
	document.getElementById('tempZewVal').innerHTML = getTempZew(htmlContent);
	document.getElementById('mocCXVal').innerHTML = getMocCX(htmlContent);
	document.getElementById('sumaMocMonoVal').innerHTML = getSumaMocMono(htmlContent);
	document.getElementById('sumaMocCXVal').innerHTML = getSumaMocCX(htmlContent);
	document.getElementById('sumaMocPoliVal').innerHTML = getSumaMocPoli(htmlContent);
	document.getElementById('sumaMocWyjVal').innerHTML = getSumaMocWyj(htmlContent);
}

function logValuesToConsole(htmlContent){
	console.log("Wartosc es: " + getEs(htmlContent));
	console.log("Wartosc temp zew: " + getTempZew(htmlContent));
	console.log("Wartosc moc: " + getMocCX(htmlContent));
	console.log("Wartosc suma moc mono: " + getSumaMocMono(htmlContent));
	console.log("Wartosc suma moc cx: " + getSumaMocCX(htmlContent));
	console.log("Wartosc suma moc poli: " + getSumaMocPoli(htmlContent));
	console.log("Wartosc suma moc wyj: " + getSumaMocWyj(htmlContent));
}

function setClocksAndValues(){
	let htmlContent = httpGet("http://149.156.38.46/");
	logValuesToConsole(htmlContent);
	setClocks(htmlContent);
	setValues(htmlContent);
}

setClocksAndValues();
setInterval(setClocksAndValues, 5000);