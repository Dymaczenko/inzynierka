var numer = Math.floor(Math.random()*3)+1;
	 
	       var timer1 = 0;
	       var time2 = 0;
	       function ustawslajd(nrslajdu)
		   {
		      clearTimeout(timer1);
		      clearTimeout(timer2);
			  
			  schowaj();
			  setTimeout("zmienslajd()", 500);
			  numer = nrslajdu - 1; 
			  
		   }
	 
	       function schowaj()
		   {
		      $("#slider").fadeOut(500);
		   }
           
		   function zmienslajd()
		   {
		        numer++; if (numer>2) numer=1;
				
				var plik = "<img src=\"farma" + numer + ".png\" />";
				
				document.getElementById("slider").innerHTML = plik;
				$("#slider").fadeIn(500);
				
		        
		        timer1 = setTimeout("zmienslajd()", 5000);
				timer2 = setTimeout("schowaj()", 4500);
		   }