function changeLang(newLang)
{
	var cHref = document.location.href;

	// first time page is loaded
	if(cHref.indexOf("?") == -1)
	{
		document.location.href = cHref + '?lang=' + newLang;
	}
	// any other page
	else
	{
		var langLoc = cHref.indexOf("lang=");

		// there is a lang selected... take current page and replace the lang code in it. then reload
		if(langLoc != -1)
		{
			var urlBLang = cHref.substring(0, langLoc);
			var urlALang ="";
			
			var endLoc = cHref.indexOf("&", langLoc)
			if(endLoc != -1) urlALang = cHref.substring(endLoc);
			document.location.href = urlBLang + "lang=" + newLang + urlALang;
		}
		// otherwise just append the lang
		else
		{
			document.location.href = cHref + '&lang=' + newLang;
		}
	}
}