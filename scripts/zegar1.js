 function httpGetAsync(theUrl) {
    var xmlHttp = new XMLHttpRequest();
	let response = " ";
    xmlHttp.onreadystatechange = function() { 
	   if (this.readyState == 4 && this.status == 200) 
	   {
		  //document.getElementById("zegar2").innerHTML = this.responseText;
		 //document.getElementById("zegar3").innerHTML = this.responseText;
		  //document.getElementById("zegar4").innerHTML = this.responseText;
		  response = this.responseText;
		}
    }
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    xmlHttp.send();
	return response;
}

function getEs(response){
	esRegex = /Es\s*PV\s*,\s*(\d+)\s*\[W\/m2\]/
	let es = esRegex.exec(response);
	return es[1];
}

function getTempZew(response){
	tempZewRegex = /Temp\s+zew\s+PV\s*,\s*(\d+\.\d+)\s*\[.*C\] /
	let tempZew = tempZewRegex.exec(response);
	return tempZew[1];
}

function getMocMono(response){
	mocMonoRegex = /N27\s*moc\s*P\s*1,5CX,\s*(\d+\.\d+)\s*\[W\]/ 
	let mocMono = mocMonoRegex.exec(response);
	return mocMono[0];
}

function getSuma1(response){
}

function getSuma2(response){
}

function getSuma3(response){
}

function getSuma4(response){
}

function getRandom(response){
	//return  Math.ceil(350 + (Math.random() * 500));
}

function setResponse(){
	response = httpGetAsync("http://149.156.38.46/");
}

function setTempZewOnPage(){
	document.getElementById("temp_zew").innerHTML = getTempZew(response);
}




function setEsOnPage(){
	document.getElementById("es").innerHTML = getEs(response);
}



function logValuesToConsole(){
	console.log(response);
	console.log("Wartosc es: " + getEs(response) );
	console.log("Wartosc temp zew: " + getTempZew(response));
	console.log("Wartosc moc mono: " + getMocMono(response));
}

let response = " "
setResponse()
setInterval(setResponse,5000);
setInterval(setTempZewOnPage,10000);
setInterval(logValuesToConsole,1000);

window.feed = function(callback) {
  var tick = {};
  tick.plot0 =getMocMono(response)
  callback(JSON.stringify(tick));
};
 
var myConfig = {
 	type: "gauge",
 	globals: {
 	  fontSize: 25
 	},
 	plotarea:{
 	  marginTop:80
 	},
 	plot:{
 	  size:'100%',
 	  valueBox: {
 	    placement: 'center',
 	    text:'%v', //default
 	    fontSize:14,
 	    rules:[
 	      {
 	        rule: '%v >= 1.2',
 	        text: '%v<br>EXCELLENT'
 	      },
 	      {
 	        rule: '%v < 1.0 && %v > 0.5',
 	        text: '%v<br>Good'
 	      },
 	      {
 	        rule: '%v < 0.5 && %v > 0.3',
 	        text: '%v<br>Fair'
 	      },
 	      {
 	        rule: '%v <  0.3',
 	        text: '%v<br>Bad'
 	      }   
 	    ]
 	  }
 	},
  tooltip:{
    borderRadius:2
  },
 	scaleR:{
	  aperture:180,
	  minValue:0,
	  maxValue:2,
	  step:50,
	  center:{
	    visible:false
	  },
	  tick:{
	    visible:false
	  },
	  item:{
	    offsetR:0,
	    rules:[
	      {
	        rule:'%i == 9',
	        offsetX:15
	      }
	    ]
	  },
	  labels:['10','','','','','','1.8','2.7','3.6','4,5','','5.4'],
	  ring:{
	    size:50,
	    rules:[
	      {
	        rule:'%v <= 0.3',
	        backgroundColor:'#E53935'
	      },
	      {
	        rule:'%v > 0.3 && %v < 0.8',
	        backgroundColor:'#EF5350'
	      },
	      {
	        rule:'%v >= 0.8 && %v < 1.2',
	        backgroundColor:'#FFA726'
	      },
	      {
	        rule:'%v >= 1.2',
	        backgroundColor:'#29B6F6'
	      }      
	    ]
	  }
 	},
  refresh:{  
      type:"feed",
      transport:"js",
      url:"feed()",
      interval:1500,
      resetTimeout:1000
  },
	series : [
		{
			values : [1.0], // starting value
			backgroundColor:'black',
	    indicator:[10,10,10,10,0.75],
	    animation:{  
        effect:2,
        method:1,
        sequence:4,
        speed: 900
     },
		}
	]
};
 
zingchart.render({ 
	id : 'zegar1', 
	data : myConfig, 
	height: 250, 
	width: '100%'
});

zingchart.render({ 
	id : 'zegar2', 
	data : myConfig, 
	height: 250, 
	width: '100%'
});

zingchart.render({ 
	id : 'zegar3', 
	data : myConfig, 
	height: 250, 
	width: '100%'
});

zingchart.render({ 
	id : 'zegar4', 
	data : myConfig, 
	height: 250, 
	width: '100%'
});