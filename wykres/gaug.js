function httpGetAsync(theUrl) 
{
	var xmlHttp = new XMLHttpRequest();
	let response = " ";
	xmlHttp.onreadystatechange = function() 
	{
		if (this.readyState == 4 && this.status == 200) 
		{
			response = this.responseText;
		}
	}
    xmlHttp.open("GET", theUrl, false);
	/*xmlHttp.setEsOnPage;*/
	xmlHttp.send();
	return response;
}

function getEs(response)
{
	EsRegex = /Es\s*PV\s*\,\s*\d+\s*\[\w\/\w\d\]/g;
	var es = EsRegex.exec(response);
	return es;
}

function getTempZew(response)
{
       TempZewRegex = /Temp\s*zew\s*PV.\s*(....)\s*\[..\]/g; 
	   var tempZew = TempZewRegex.exec(response);
	   return tempZew;
}

function getN1(response)
{
      N1Regex = /N27\s*moc\s*P\s*1.5CX.\s*\d+.\d\s*\[\w\]/;     
	  let n1 = N1Regex.exec(response);
	  return n1;
}

function getN2(response)
{
      N2Regex = /N27\s*suma\s*P\s*mono,\s*\d*.\d\s*\[\w\]/;  
	  var n2 = N2Regex.exec(response);
	  return n2;
}

function getN3(response)
{
      N3Regex = /N27suma\s*P\s*CX,\s*\d*.\d\s*\[\w\]/;
	  var n3 = N3Regex.exec(response);
	  return n3;
}

function getN4(response)
{
      N4Regex = /N27\s*suma\s*P\s*poli,\s*\d*.\d\s*\[\w\]/;
	  var n4 = N4Regex.exec(response);
	  return n4;
}

function getN5(response)
{
      N5Regex = /N27suma\s*P\s*wyj\,\s*\d*.\d\s*\[W\]/;  
	  
	  var n5 = N5Regex.exec(response);
	  return n5;
}

function setResponse()
{
	response = httpGetAsync("http://149.156.38.46/");
}

function setEsOnPage()
{
	document.getElementById('es').innerHTML = getEs(response);
}

function setTempZewOnPage()
{
	document.getElementById('tempZew').innerHTML = getTempZew(response);
}

function setN1OnPage()
{
	document.getElementById('n1').innerHTML = getN1(response);
}

function setN2OnPage()
{
	document.getElementById('n2').innerHTML = getN2(response);
}

function setN3OnPage()
{
	document.getElementById('n3').innerHTML = getN3(response);
}

function setN4OnPage()
{
	document.getElementById('n4').innerHTML = getN4(response);
}

function setN5OnPage()
{
	document.getElementById('n5').innerHTML = getN5(response);
}


function logValuesToConsole()
{
	console.log(response);
	console.log("Wartosc Es:" + getEs(response));
	console.log("Temperatura:" + getTempZew(response));
	console.log("N1:" + getN1(response));
	console.log("N2:" + getN2(response));
	console.log("N3:" + getN3(response));
	console.log("N4:" + getN4(response));
	console.log("N5:" + getN5(response));
}

var response = " "
setResponse();
setInterval(setResponse,4000);
setInterval(setEsOnPage,4300);
setInterval(setTempZewOnPage,4400);
setInterval(setN1OnPage,4500);
setInterval(setN2OnPage,4600);
setInterval(setN3OnPage,4700);
setInterval(setN4OnPage,4800);
setInterval(setN5OnPage,4900);
setInterval(logValuesToConsole,1100);

window.feed = function(callback)
{
	var tick = {};
	tick.plot0 = setEsOnPage(response)
	tick.plot0 = setTempZewOnPage(response)
	tick.plot0 = setN1OnPage(response)
	tick.plot0 = setN2OnPage(response)
	tick.plot0 = setN3OnPage(response)
	tick.plot0 = setN4OnPage(response)
	tick.plot0 = setN5OnPage(response)
	callback(JSON.stringify(tick));
}

window.feed = function(callback) 
{
  var tick = {};
  tick.plot0 = Math.ceil();
  callback(JSON.stringify(tick));
}

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
 	    fontSize:35,
 	    rules:[
 	      {
 	        rule: '%v >= 700',
 	        text: '%v<br>EXCELLENT'
 	      },
 	      {
 	        rule: '%v < 700 && %v > 640',
 	        text: '%v<br>Good'
 	      },
 	      {
 	        rule: '%v < 640 && %v > 580',
 	        text: '%v<br>Fair'
 	      },
 	      {
 	        rule: '%v <  580',
 	        text: '%v<br>Bad'
 	      }   
 	    ]
 	  }
 	},
  tooltip:{
    borderRadius:5
  },
 	scaleR:{
	  aperture:180,
	  minValue:300,
	  maxValue:850,
	  step:50,
	  center:{
	  visible:false
	  },
	  tick:{
	    visible:true
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
	  labels:['300','','','','','','580','640','700','750','','850'],
	  ring:{
	    size:50,
	    rules:[
	      {
	        rule:'%v <= 580',
	        backgroundColor:'#E53935'
	      },
	      {
	        rule:'%v > 580 && %v < 640',
	        backgroundColor:'#EF5350'
	      },
	      {
	        rule:'%v >= 640 && %v < 700',
	        backgroundColor:'#FFA726'
	      },
	      {
	        rule:'%v >= 700',
	        backgroundColor:'#29B6F6'
	      }      
	    ]
	  }
 	},
  refresh:{  
      type:"feed",
      transport:"js",
      url:"feed()",
      setInterval:4000,
      setTimeout:4000
  },
	series :[
		{
		values : [], // starting value
		backgroundColor:'black',
	    indicator:[10,10,10,10,0.75],
	    animation:{  
        effect:1,
        method:1,
        sequence:1,
        speed: 900
     },
		}
	]
};

zingchart.render ({ 
	id : 'n1', 
	data : myConfig, 
	height: 500, 
	width: '100%'
});


zingchart.render({ 
	id : 'n2', 
	data : myConfig, 
	height: 500, 
	width: '100%'
});

/*
zingchart.render({ 
	id : 'n2', 
	data : myConfig, 
	height: 250, 
	width: '25%'
});

zingchart.render({ 
	id : 'n3', 
	data : myConfig, 
	height: 500, 
	width: '25%'
});

zingchart.render({ 
	id : 'n4', 
	data : myConfig, 
	height: 250, 
	width: '25%'
});*/