var numer = Math.floor(Math.random()*3)+1;

var timer1 = 0;
var time2 = 0;
var plik1 = "<img src=\"pictures/farma" + 1 + ".png\" />";
var plik2 = "<img src=\"pictures/farma" + 2 + ".png\" />";

function setSlide(nrslajdu)
{
	clearTimeout(timer1);
	clearTimeout(timer2);

	schowaj();
	setTimeout("changeSlide()", 500);
	numer = nrslajdu - 1; 

}

function hide()
{
	$("#slider").fadeOut(500);
}

function changeSlide()
{
	numer++; if (numer>2) numer=1;

	plik = plik1;
	if(numer == 2)
		plik = plik2;

	document.getElementById("slider").innerHTML = plik;
	$("#slider").fadeIn(500);


	timer1 = setTimeout("changeSlide()", 5000);
	timer2 = setTimeout("hide()", 4500);
}

changeSlide();