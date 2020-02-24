function odliczanie(){
	var data = new Date();

	var dzien = data.getDate();
	var miesiac = data.getMonth()+1;
	var rok = data.getFullYear();

	var godzina = data.getHours();
	if (godzina<10) godzina = "0"+godzina;

	var minuta = data.getMinutes();
	if (minuta<10) minuta = "0"+minuta;

	var sekunda = data.getSeconds();
	if (sekunda<10) sekunda = "0"+sekunda;

	document.getElementById("clock").innerHTML = dzien+"/"+miesiac+"/"+rok+" | "+godzina+":"+minuta+":"+sekunda;

	setTimeout("odliczanie()", 1000);
}

odliczanie();