
function giveFormFocus()
{
	var fm=document.forms[0];
	if(fm!=null)
	{
		for(var i=0, max=fm.elements.length;i<max;i++)
		{
			if(!fm.elements[i].disabled&&!fm.elements[i].readOnly&&(fm.elements[i].type=='text' || fm.elements[i].tagName == 'TEXTAREA'))
			{
				try{
					fm.elements[i].focus();
					if(!fm.elements[i].tagName == 'TEXTAREA') fm.elements[i].select();
				}
				catch(er)
				{
				
				}
				break;
			}
		}
	}
	else if(document.body!=null&&navigator.appName=='Microsoft Internet Explorer')
	{
		document.body.focus();
	}
	else window.focus();
}

function baseURL()
{
	baseHref();
}

function baseHref()
{
	var base = location.pathname.indexOf("/",1);
	return location.protocol + "//" + location.host + location.pathname.substring(0,base) + "/";
}

function resetTimers()
{
	if(top.frameToolbar != null)
	{
		top.frameToolbar.resetLimit();
	}	
}

function trim(str)
{
   return str.replace(/^\s*|\s*$/g,"");
}

function logoff()
{
	var baseURL = baseHref();
	DelMsg = "WARNING: You are about to Log off the system.  Continue?";
	if (window.confirm(DelMsg))
	{
		parent.location.href = baseURL + "logoff.jsp";
	}
}

function getCookie(name)
{
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else
    begin += 2;
  var end = document.cookie.indexOf(";", begin);
  if (end == -1)
    end = dc.length;
  return unescape(dc.substring(begin + prefix.length, end));
}

function getSelectedText()
{
	/* Netscape and IE friendly way of getting highlighed text -works in mac OS 9 */
  if(document.selection){return document.selection.createRange().text;}
  else if(document.getSelection){ return document.getSelection();}
  else if(window.getSelection){ return window.getSelection();}
  else return "";
}

function getRadio(radioName)
{
	var mode = document.getElementsByName(radioName);
	var modeValue = "";					
	for (var i=0, modeLength = mode.length; i<modeLength; i++) if (mode[i].checked) modeValue = mode[i].value;
	return modeValue;
}

function getSelect(selectName)
{
	var field = document.getElementById(selectName);
	//--- undefined is not a keyword in Mac IE 5.  Need to use typeof() ---
	if (field == null || typeof(field) == "undefined" || field.disabled) return "";
	//-- goofy condition with dynamic droplists ---
	if (field.options.length == 1 && field.options[0] == "0") return "";
	if (field.selectedIndex == -1) return "";
	return field.options[field.selectedIndex].value;
}

function getCalendar()
{
	calendarID = top.frameToolbar.calendarID;
	return calendarID;
}

function controller(evt)
{
	resetTimers();
	
	ctrl = evt.ctrlKey;
	shift = evt.shiftKey;
	altk = evt.altKey;

	var baseURL = baseHref();
	var baseFrame = top;

	var source = evt.srcElement;
	if (source == null || typeof(source) == "undefined") source = evt.target;
	
	var sourceName = "";
	var sourceID = "";
	var sourceValue = "";

	if (source != null) 
	{
		sourceName = source.name;
		sourceID = source.id;
		sourceValue = source.value;
	}
	
	// checking for dirtyFlag
	if(sourceID != '' && sourceID != null)
	{
		toggleDirty(sourceID);
	}
	
	if (typeof window.event != 'undefined')	{
		document.onkeydown = function()	{
			if (event.keyCode == 8)	{
				var target = event.srcElement.type;
				if (target == 'textarea' || target == 'text' || target == 'password')	{
					return true;
				}	else {
					return false;
				}
			}
		}
	} else {
		document.onkeypress = function(e)	{	                
			if (e.keyCode == 8)	{
				var target = e.target.type;
				if (target == 'textarea' || target == 'text' || target == 'password')	{
					return true;
				}	else {
					return false;
				}
			}
		}
	}
	
	if (evt.ctrlKey && evt.keyCode == 83)
	{
		//alert("CTRL-S Outline search");

		baseFrame.frameSidebar.showBar("Search");
		var detailFrame = baseFrame.frameWorkspace;
		detailFrame.location.href = baseHref() + "selector.jsp?search=1";
	}
	else if (altk && evt.keyCode == 83)
	{
		//alert("ALT-S Quick search");
		var quick = window.open(baseHref() + "search/quickSearch.jsp", "quickSearch", "toolbar=no,width=250,height=80,scrollbars=no,resize=no,menubar=no");
		window.blur();
	}
	/*
	else if (evt.ctrlKey && evt.keyCode == 115)
	{
		alert("CTRL-S Save");
	}
	*/			
	if (altk && evt.keyCode == 76 || (ctrl && shift && evt.keyCode == 76))  // ALT-L or CTR-SHIFT-L
	{
		
		//alert("Spell checker: " + sourceName + " " + selectedText);
		var selectedText = getSelectedText();	

		var speller = window.open('', "Spellcheck", "toolbar=no,width=400,height=500,scrollbars=no,resize=no,menubar=no");
		
		var spellerFormVal = document.getElementById('spellerForm');
		var sourceNameField = document.getElementById('sourceName');
		var sourceIDField = document.getElementById('sourceID');
		var sourceValueField = document.getElementById('sourceValue');
		var selectedTextField = document.getElementById('selectedText');
		
		sourceNameField.value = sourceName;
		sourceIDField.value = sourceID;
		sourceValueField.value = sourceValue;
		selectedTextField.value = selectedText;
		
		spellerFormVal.submit();
		
		window.blur();

		//if (selectedText != "") source.value = source.value.replace(selectedText, result);
		//else source.value = result;


		evt.returnValue = false;
	}	
	else if (evt.ctrlKey && evt.keyCode == 188)
	{
		//alert("CTRL-< Back one student");
		baseFrame.frameSidebar.searchResults.movePrevious();
	}
	else if (evt.ctrlKey && evt.keyCode == 190)
	{
		//alert("CTRL-> Forward one student");
		baseFrame.frameSidebar.searchResults.moveNext();
	}
	else if (evt.ctrlKey && evt.keyCode == 85)
	{
		//alert("CTRL-U show Outline");
		baseFrame.frameSidebar.showBar("Index");
	}
	else if (evt.ctrlKey && evt.keyCode == 81)
	{
		//alert("CRTL-Q Quit");
		logoff();
	}
	else if (altk && evt.keyCode == 80)
	{
		alert("ALT-P print");
	}
	else if (altk && evt.keyCode == 49)
	{
		//alert("ALT-1 show tab 1");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("1");
	}
	else if (altk && evt.keyCode == 50)
	{
		//alert("ALT-2 show tab 2");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("2");
	}
	else if (altk && evt.keyCode == 51)
	{
		//alert("ALT-3 show tab 3");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("3");
	}
	else if (altk && evt.keyCode == 52)
	{
		//alert("ALT-4 show tab 4");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("4");
	}
	else if (altk && evt.keyCode == 53)
	{
		//alert("ALT-5 show tab 5");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("5");
	}
	else if (altk && evt.keyCode == 54)
	{
		//alert("ALT-6 show tab 6");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("6");
	}
	else if (altk && evt.keyCode == 55)
	{
		//alert("ALT-7 show tab 7");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("7");
	}
	else if (altk && evt.keyCode == 56)
	{
		//alert("ALT-8 show tab 8");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("8");
	}
	else if (altk && evt.keyCode == 57)
	{
		//alert("ALT-9 show tab 9");
		baseFrame.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceHeader.callTab("9");
	}	
	else if (ctrl && evt.keyCode == 123)
	{
		//alert("CTRL-F12 show cookies");
		alert(document.cookie);
	}
	
	// save and continue
	else if (ctrl && evt.keyCode == 13)
	{
		var form = document.forms[0];
		if (form != null)
		{
			saveContinue();
		}
		else
		{
			baseFrame.frameDetail.folderBody.saveContinue();
		}
	}
	
	// save
	else if (altk && evt.keyCode == 13)
	{
		var form = document.forms[0];
		if (form != null)
		{
			saveThis();
		}
		else
		{
			baseFrame.frameDetail.folderBody.saveThis();
		/*
			var healthform = baseFrame.frameDetail.frameHealthBody.forms[0];
			if (healthform != null)
			{
				baseFrame.frameDetail.frameHealthBody.saveThis();
			}
		*/
		}
	}
	
	// submit form (enter key)
	else if (evt.keyCode == 13)
	{
		//alert("caught an enter");
		// if this is a return in a search wizard perform the onclick event
		if (window.searchMe && document.getElementById("search"))
		{
			searchButton = document.getElementById("search");
			searchButton.onclick();
		} 
		// for use with refresh buttons
		else if(document.getElementById('refresh') != null)
		{
			var refreshButton = document.getElementById('refresh');
			refreshButton.onclick();
		}	
		
		// else submit the form
		//else {
		//	thisForm = source.form;
		//	thisForm.submit();
		//}
	}
	//alert(evt.keyCode);
}
function clearSpellcheck()
{
	for(var i=0, max=document.forms.length; i<max; i++)
	{
		var curForm = document.forms[i];
		//alert(curForm+ " " + i + curForm.name);
		for (var j=0,len=curForm.elements.length; j<len; j++)
		{
			var curField = curForm.elements[j];
			//if (curField != null) alert(curField + " " + j + curField.name);
			if (curField != null && curField.name == 'spellcheck')
			{
				//alert("Set blank");
				curField.value = '';
			}
		}
	}
}


var dirty = 0;

function isDirty()
{
    if (dirty == 1)
    {
        return true;
    }
    else
    {
        return false;
    }
}

// Checks the various frames which could contain a dirty flag set to true to see if any of them are dirty.
// If so, returns true. Otherwise false.
function isAnyoneDirty()
{
    // Default to current frame's value if one exists
    var areWeDirty = isDirty();

    // First check if master/detail form layout exists, call detail frame's isDirty() method, as this is what will be set
    if (top.frameWorkspace.frameWorkspaceWrapper != null && top.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceDetail != null && top.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceDetail.detailFrame != null)
    {
        areWeDirty = areWeDirty || top.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceDetail.detailFrame.isDirty();
    }

    // Second check top-level workspace frame. This is used by views such as Census --> Demographics
    // which do not leverage the master/detail form layout.
    if (top.frameWorkspace.frameWorkspaceWrapper != null && top.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceDetail != null)
    {
        areWeDirty = areWeDirty || top.frameWorkspace.frameWorkspaceWrapper.frameWorkspaceDetail.isDirty();
    }

    return areWeDirty;
}


function markDirty()
{
	dirty = 1;
}

function markClean()
{
	dirty = 0;
}

// This version is used by Safari browsers when user attempts to navigate away from entire site or
// hits refresh, thus causing the entire window to fire a beforeunload event. Safari does not work with the event e argument
// in the confirmNavigationIfDirty(e) method used by other browsers.
function confirmNavigationIfDirtyWithoutEvent()
{
    // If Any Frame's Data Has Changed Since Last Save - This is necessary because the beforeunload event is coming from the main window
    if (isAnyoneDirty())
    {
        return "You are now leaving this page. If you continue, any unsaved data will be lost.";
    }
}

function confirmNavigationIfDirty(e)
{
    // If Data Has Changed Since Last Save
    if (isDirty())
    {
        // NOTE: We have added a call to markClean() and clearSpellcheck() to the onload behavior of each page.
        //       Therefore, it is unnecessary to call them here.

        // Return Browser Navigation Check (some browsers provide their own message, otherwise they will use
        // the text below)
        // For IE and Firefox prior to version 4
        var e = e || window.event;
        if (e)
        {
            e.returnValue = "You are now leaving this page. If you continue, any unsaved data will be lost.";
        }

        // For All Other Browsers
        return "You are now leaving this page. If you continue, any unsaved data will be lost.";
    }
}

function isSafari()
{
    return navigator.userAgent.indexOf('Safari') >= 0 && navigator.userAgent.indexOf('Chrome') == -1;
}

// Global Variables for Use in extractSafariVersionString()
var safariVersionRegex = new RegExp('Version/\\d*(\\.\\d*)*');
var firstMatchIndex = 0;
var safariVersionStartIndex = 8;

// Safari User Agent includes Version/#.#.#. This extracts the #.#.# string from the current user agent.
function extractSafariVersionString()
{
    var safariVersionString = navigator.userAgent.match(safariVersionRegex)[firstMatchIndex];
    if (safariVersionString != null)
    {
        safariVersionString = safariVersionString.substring(safariVersionStartIndex, safariVersionString.length);
    }

    return safariVersionString;
}

/* Determines if a version in format #.#.#, with any number of parts
   and any number of digits in each part, is less than another
   version number sequence */
function isVersionLessThan(versionOne, versionTwo)
{
    var versionOneString = versionOne.replace('.', '');
    var versionTwoString = versionTwo.replace('.', '');

    return versionOneString < versionTwoString;
}


function isSafariVersion505OrEarlier()
{
    var isSafariVersion505OrEarlier = false;

    if (isSafari())
    {
        if (isVersionLessThan(extractSafariVersionString(), '5.0.6'))
        {
            isSafariVersion505OrEarlier = true;
        }
    }

    return isSafariVersion505OrEarlier;
}

/*
 * If the page is dirty and the user's browser is Safari, prompt using a standard dialog window to confirm navigation
 * away from page with potentially un-saved data.
 * Returns: true/false whether to navigate (used by calling methods)
 */
function confirmNavigationIfDirtyAndSafari()
{
    var doNavigation = true;

    // Work-around for Safari, as it does not support beforeunload event within frames or iframes.
    // As of Safari Version 5.0.6, the behavior of onbeforeunload in frames is supported. This behavior only applies to
    // Safari versions 5.0.5 and lower.
    if (isSafariVersion505OrEarlier())
    {
        // If any frame's dirty flag is set to true, prompt user for navigation confirmation (simulates beforeunload behavior contained in confirmNavigationIfDirty())
        if (isAnyoneDirty())
        {
            var confirmNavigationMsg = 'You are now leaving this page. If you continue, any unsaved data will be lost. Press OK to continue, or Cancel to stay on the current page.';
            // If user selects 'Cancel', do not change workspace
            if (!window.confirm(confirmNavigationMsg))
            {
                doNavigation = false;
            }
        }
    }

    return doNavigation;
}

function pauseJS(millsecToPause)
{
	difference = 0;
	dateVal = new Date();
	while (1)
	{
		millsec = new Date();
		difference = millsec-dateVal;
		if( difference > millsecToPause ) 
		{
		  break;
		}
	}
}

function getObjectName(idToCheck) 
{
	var pos = 0;
	var goodChars = '0123456789'; 	
	var character;
	var testObjectName = '';
	var testObjectSecondPart = '';
	var testObjectNonNum = '';
	var numOfNumChars = 0;
	var doneWithNumbers = false;
	var nameLength = idToCheck.length;
	
	for(var i=0, max=idToCheck.length; i<max; i++)
	{
		// check to see if this element has a number it in 
		character = idToCheck.charAt(i);
		if(goodChars.indexOf(character) != -1)
		{   
			
			while(!doneWithNumbers)
			{
				character = idToCheck.charAt(i + numOfNumChars);
				
				if((i + numOfNumChars < nameLength)  && goodChars.indexOf(character) > -1)
				{ 
					numOfNumChars++;
				}
				else
				{
					pos = i + numOfNumChars;
					doneWithNumbers = true;
				}
			}
			
			testObjectName = idToCheck.substring(0,pos); 
			
			var checkForDash = idToCheck.indexOf("-");
			var checkForPeriod = idToCheck.indexOf(".");
			//checking to see if - is in name
			if(checkForDash  != -1)
			{
				testObjectSecondPart = idToCheck.substring(checkForDash, checkForPeriod) ; 
				testObjectName = testObjectName + testObjectSecondPart;
			}			
			
			// if there are numbers in the field and in the parent object need to 
			// pass out object without partial field attached.
			checkForPeriod = testObjectName.indexOf(".");
			if(checkForPeriod != -1)
			{	
				testObjectName = testObjectName.substring(0, checkForPeriod);
			}			
						
			return testObjectName; 
		}
	}

	// if we got this far... Parent Object doesn't have a number in it.
	for(var i=0, max=idToCheck.length; i<max; i++)
	{
			var checkForPeriod = idToCheck.indexOf(".");
			//checking to see if - is in name
			if(checkForPeriod != -1)
			{
				testObjectName =  idToCheck.substring(0, checkForPeriod) ; 			
			}			
			
		return testObjectName; 
	}

	testObjectName = '';
	return testObjectName;
}
function toggleDirty(elementID)
{
	var dirtyObjectName = '';
	var elementToChange = '';
	
	dirtyObjectName = getObjectName(elementID);
	
	if(dirtyObjectName != '')
	{
		elementToChange = dirtyObjectName + ".dirtyFlag";
	}
	else
	{
		elementToChange = "x.dirtyFlag";
	}
	
	// if this is a single object page, we have to check and see if we have an element to change.
	if(document.getElementById(elementToChange) != null)
	{
		//alert("changing object " + document.getElementById(elementToChange).name + " to being edited");
		document.getElementById(elementToChange).value = true;
	}
	else
	{
		// if the elementToChange value = null then we will have to just use the x.dirtyFlag
		var df = document.getElementById("x.dirtyFlag");
		if (df != null) df.value = true;
	}
}

function getDirtyField(elementID)
{
	var dirtyObjectName = '';
	var elementToChange = '';
	var dirtyField;
	
	dirtyObjectName = getObjectName(elementID);
	if(dirtyObjectName != '')
	{
		elementToChange = dirtyObjectName + ".dirtyFlag";
	}
	else
	{
		elementToChange = "x.dirtyFlag";
	}
	
	if(document.getElementById(elementToChange) != null)
	{
	     dirtyField = document.getElementById(elementToChange);
	}
	else
	{
		dirtyField = document.getElementById("x.dirtyFlag");
	}
	return dirtyField;
}



/********** Dynamic Droplists ****************************************
** The content is loaded in a iframe named dataPipe within
** the tool's own frame.  The xsl is determines which fields are
** the name, value then the pipe calls fillDroplist on its parent
** passing back the data.
*********************************************************************/

function fillDroplist(fieldName, newOptions, editable)
{
	if (typeof(editable) == "undefined") editable = true;
	var selectField = document.getElementById(fieldName);
	if (selectField == null) 
	{
		alert("DEBUG: the field was not found. Check the spelling. " + fieldName);
		return;
	}

	if (editable) selectField.disabled = false;
	//selectField.className = "detailFormField";
	if (selectField.options==null) return;
	
	selectField.options.length = 0;

	// --- for an unknown reason, newOptions[0] becomes (newOptions[1] where newOptions[0] = "0") - detect and avoid

	if (newOptions.length == 1 && newOptions[0] == "0") return;
	for(var i=0, max=newOptions.length; i<max; i++)
	{
		//if (newOptions[i] == "0") alert("TRUE");
		selectField.options[i] = new Option(newOptions[i].text,  newOptions[i].value, newOptions[i].defaultSelected, newOptions[i].selected);
	}
}

function fillSectionDroplist(fieldName, newOptions, editable)
{
	if (typeof(editable) == "undefined") editable = true;
	var selectField = document.getElementById(fieldName);
	if (selectField == null) 
	{
		alert("DEBUG: the field was not found. Check the spelling. " + fieldName);
		return;
	}
	if (editable) selectField.disabled = false;
	
	// remove all children, including OPTIONGRP children.  length = 0 doesn't remove the OPTGROUP
	while (selectField.firstChild)
	{
		selectField.removeChild(selectField.firstChild);
	}
	
	// --- for an unknown reason, newOptions[0] becomes (newOptions[1] where newOptions[0] = "0") - detect and avoid
	if (newOptions.length == 1 && newOptions[0][0] == "0") { return; }
	
	// for each term, OPTGROUP
	for(var i=0, max=newOptions.length; i<max; i++)
	{
	    var currentOptgroup = document.createElement('optgroup');
	    currentOptgroup.label = newOptions[i][0];
	    var termGroup = selectField.appendChild(currentOptgroup);

		// for each section, OPTION
		for(var j=1, maxNewOptions=newOptions[i].length; j < maxNewOptions; j++)
		{
			if(newOptions[i][j] != null)
			{
				var sectionOption = document.createElement('option');
				sectionOption.value = newOptions[i][j][1];
				sectionOption.innerHTML = newOptions[i][j][0];
				if (newOptions[i][j][2] == "true" && j == 1) {sectionOption.selected = true;}
				termGroup.appendChild(sectionOption);
			}
		}
	}
}

function dynamicDroplist(fieldName, url, value, pipeName, editable)
{
	if (typeof(pipeName) == "undefined") pipeName = "dataPipe";
	if (typeof(editable) == "undefined") editable = true;
	//alert("dynamicDroplist" + fieldName + " " + url + " " + value + " " + pipeName);
	var droplist = document.getElementById(fieldName);

	disableSelect(droplist);
	if (typeof(value) != "undefined") url += "&value=" + value;
	url += "&editable=" + editable;
	document.getElementById(pipeName).src = baseHref() + url + "&droplistName="+fieldName;
}


function disableSelect(selectObj)
{
	if (selectObj != null) 
	{
		selectObj.disabled = true;
		if (selectObj.options!=null) selectObj.options.length = 0;
	}
	//selectObj.className = "fieldDisabled";
}


function gradeList(fieldName, calendarID, structureID)
{
	if(typeof calendarID == "string")
		url = "nav/dataPipe/gradeDroplist.xsl?x=resource.GradeLevel-list&calendarID="+calendarID;
	else if(typeof calendarID == "object")
	{
		url = "nav/dataPipe/gradeDroplist.xsl?x=resource.GradeLevel-filteredList";
		for(var i=0, max=calendarID.length; i<max; i++)
			url += "&calendarID=" + calendarID[i];
	}
		
	if (typeof(structureID) != "undefined") url += "&structureID=" + structureID;
	dynamicDroplist(fieldName, url);	
}

function calendarList(fieldName, schoolID, endYear)
{
	if(typeof schoolID == "string")
		url = "nav/dataPipe/calendarDroplist.xsl?x=calendar.Calendar-list&pattern=Droplist&schoolID="+schoolID;
	else if(typeof schoolID == "object")
	{
		url = "nav/dataPipe/calendarDroplist.xsl?x=calendar.Calendar-filteredList";
		for(var i=0, max=schoolID.length; i<max; i++)
			url += "&schoolID=" + schoolID[i];
	}
	if (endYear != null && endYear != "0") url += "&endYear=" + endYear;
	
	dynamicDroplist(fieldName, url);
}

function structureList(fieldName, calendarID, includeBlank)
{
	if(typeof calendarID == "string")
	 url = "nav/dataPipe/structureDroplist.xsl?x=calendar.ScheduleStructure-list&calendarID="+calendarID+"&includeBlank="+includeBlank;
	else
	{
		url = "nav/dataPipe/structureDroplist.xsl?x=calendar.ScheduleStructure-filteredList";
		for(var i=0, max=schoolID.length; i<max; i++)
			url += "&calendarID=" + calendarID[i];
	}	

	dynamicDroplist(fieldName, url);
}

function courseList(fieldName, calendarID)
{
	dynamicDroplist(fieldName, "nav/dataPipe/courseDroplist.xsl?x=curriculum.Course-list&pattern=Droplist&calendarID="+calendarID+"&active=1");
}

function sectionListSectionsOnly(fieldName, calendarID, courseID, sectionsOnly)
{
	dynamicDroplist(fieldName, "nav/dataPipe/sectionDroplist.xsl?x=scheduling.Section-listSectionsOnly&calendarID=" + calendarID + "&courseID=" + courseID);	
}

function sectionList(fieldName, calendarID, courseID, sectionsOnly)
{
	dynamicDroplist(fieldName, "nav/dataPipe/sectionDroplist.xsl?x=scheduling.Section-list&calendarID=" + calendarID + "&courseID=" + courseID);	
}

function sectionList(fieldName, calendarID, courseID, structureID)
{
	var url = "nav/dataPipe/sectionDroplist.xsl?x=scheduling.Section-list&calendarID=" + calendarID + "&courseID=" + courseID;
	if (typeof(structureID) != "undefined") url += "&structureID=" + structureID;
	dynamicDroplist(fieldName, url);	
}

function teacherList(fieldName)
{
	//--- Uses cookie for schoolID ---
	var url = "nav/dataPipe/teacherDroplist.xsl?x=core.StaffMember-listActiveStaff&schoolID=schoolScope&teacher=1";
	dynamicDroplist(fieldName, url);		
}

function giveFocus()
{
	var fm = document.forms[0];
	if (fm != null)
	{
		for(var i=0, max=fm.elements.length; i<max; i++)
		{
			if (!fm.elements[i].disabled && !fm.elements[i].readOnly && fm.elements[i].type != 'hidden')
			{
				try 
				{
					fm.elements[i].focus();
				} 
				catch(er) {}
				break;
			}
		}
		if (document.body != null && navigator.appName == 'Microsoft Internet Explorer') 
		{
			document.body.focus(); 
		}	
		else  window.focus();
	}
	else if (document.body != null && navigator.appName == 'Microsoft Internet Explorer') 
	{
		document.body.focus(); 
	}
	else  window.focus();

}

function getBank(module, table, field, targetField)
{
	var win = window.open(baseHref() + "planning/admin/bankField/loadFromBank.xsl?x=learnerPlanning.BankField-listBank&module=" + module + "&targetField="+targetField+"&table=" + table+"&field="+field,"bank","scrollbars=yes,toolbar=no,location=no,directories=no,status=no,menubar=no,width=500,height=400,resizable=yes");
	window.blur();
}

var checkedROVal;

function setCheckBoxROVal(checkBoxRO)
{
	checkedROVal = checkBoxRO.checked;
	if(checkedROVal == 'true')
	{
		checkBoxRO.checked = true;
	}
	else
	{
		checkBoxRO.checked = false;
	}
}

var selectROVal;

function setSelectROVal(selectRO)
{
	selectROVal = selectRO.selectedIndex;
}

function onChangeSelectRO(selectRO)
{
	selectRO.selectedIndex = selectROVal;
}

function hideIFrame(frameID)
{
	var frameVal = document.getElementById(frameID);

	if(frameVal.style.display == 'block')
	{
	  frameVal.style.display = 'none';
	}
}

function expTxt(txtArea) 
{
		
	// -- nonIE
	if (!document.all) 
	{
		var splitLines = txtArea.value.split('\n');

		var rowNum = 1;
		for (var i=0, splitLinesLength = splitLines.length; i<splitLinesLength; i++)
		{
			if (splitLines[i].length > 80)
			{
				rowNum += Math.ceil(splitLines[i].length/80);
			}
		}
		
		rowNum += splitLines.length;
		
		if (rowNum > 3)
		{
			txtArea.rows = Math.min(rowNum, 30);
		}

	}
	else
	{ 
		var exped = false;
		while ((txtArea.scrollHeight > txtArea.clientHeight) && (txtArea.rows < 30))
		{
			txtArea.rows += 1;
			exped = true;
		}
		
		if (exped)
		{
			txtArea.scrollTop = 0;
		}
	}
}

// on load, go through all text areas and expand em according to the text si
function expAllTxts()
{
	if(textAreas != null && textAreas.length > 0)
	{
		for(var i=0, max=textAreas.length; i < max; i++)
		{
			expTxt(textAreas[i]);
		}
	}
}


/**Generate report button wizard, which will disable the button when click and re-enable it after the report is done
* the @formID and @buttonID aren't required if there is only one form and one button in the page
*/
//global variables
var _reportForm = null; 
var _reportButton = null;

function buttonWizard(formID, buttonID, notPDF)
{
	//set up parameters
	if(formID == null) formID ="reportOptions";
	if(buttonID == null) buttonID = "sbutton";
	_reportForm = document.getElementById(formID);
	_reportButton = document.getElementById(buttonID);

	if(_reportForm == null)
	{
		if(document.forms.length != 1)
		{
			alert("Please specify the form to be submitted");
			return false;
		}
		_reportForm = document.forms[0];
	}

	if(_reportButton == null)
	{
		var inputs = document.getElementsByTagName('input');
		for(var i = 0, max=inputs.length; i < max; i++)
		{
			if(inputs[i].type =="button")
			{
				if(_reportButton != null)
				{
					alert("There are more than one button in the page, Please specify one button");
					return false;
				}
				_reportButton = inputs[i];
			}
			if(inputs[i].type == "submit")
			{
				_reportButton = inputs[i];
				break;
			}
		}
	}

	if(_reportForm == null || _reportButton==null)
	{
		alert("Error: Couldn't find a form or a button!");
		return false;
	}

	//disable the button
	_reportButton.value = "Report building in new Window, please wait...";
	_reportButton.disabled= true;

	//guess it's easier to detect browser type here than do it in jsp :) 
	var isIE = (navigator.appName == 'Microsoft Internet Explorer');

	//not work in IE
	//if(self.win && win !=null && !win.closed)  win.close();

	var _reportName ="Report";
	if(self.reportName) _reportName=self.reportName;
	_reportName = escape(_reportName);
	var now = new Date();
	var hours = now.getHours();
	var minutes = now.getMinutes();
	var seconds = now.getSeconds();
	var msec = now.getMilliseconds();
	_reportForm.target = "report" + hours+minutes+seconds;

	url = baseHref() + 'report.jsp?isIE='+isIE + '&reportName=' + _reportName;

	var winStyle = "toolbar=no,location=no,directories=no,status=no,menubar=no,width=640,height=480,resizable=yes";
	if(notPDF) winStyle = "scrollbars=yes,width=640,height=480,resizable=yes,status=yes,menubar=yes,toolbar=no,location=yes";
	win = window.open(url, _reportForm.target, winStyle); 
	win.focus();
	//try(win.focus()) catch(err);
	setTimeout("_submitReportForm()", 1000);
}

function enableReportButton()
{	
	_reportButton.value = "Generate Report";
	_reportButton.disabled = false;
}

function _submitReportForm()
{
	if(_reportForm != null)
		_reportForm.submit();
	 else
		alert("Error: Couldn't find the form to be submitted.");
};

function coalesce()
{
	for(var i=0, max=arguments.length; i<max; i++)
	{
		if(arguments[i] && arguments[i] !='')
			return arguments[i];
	}
	return null;
};

String.prototype.addslashes = function(){
	return this.replace(/(["\\\.\|\[\]\^\*\+\?\$\(\)])/g, '\\$1');
};
String.prototype.trim = function () {
    return this.replace(/^\s*(\S*(\s+\S+)*)\s*$/, "$1");
};
String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)};
String.prototype.endsWith = function(str)
{return (this.match(str+"$")==str)};

/*search an object match the criteria v
	@criteria is in the style of 'termID=2' or 'termID=2;seq=2;name=02'
	if multiple is true, return an array, else, return an object
*/
function searchObj(obj, criteria, multiple) {
	if(!criteria) return null;
	
	
	var arr = criteria.split(";");
	if(arr.length < 1) return null;
	
	for(var i=0, max=arr.length; i<max; i++)
		arr[i] = arr[i].split("=");

	if(!multiple) return _searchObj(obj, arr);
	
	var ret = new Array();
	
	_searchObj(obj, arr, ret);
	if(ret.length < 1) return null;
	return ret;
}


function _searchObj(obj, criteria, ret)
{
	if(!obj) return null;
	
	var match = true;
	for(var i=0, max=criteria.length; i<max; i++)
	{

		var v = obj[criteria[i][0]];
		var isEmptyValue = (criteria[i].length ==1 || criteria[i][1]=='');
		if(isEmptyValue)
		{
			if(v != null && !v && v.trim() !='')
			{
			match = false;
			break;
		}
	}
		else if(!v || (criteria[i].length < 2 && v!='') || v != criteria[i][1].trim())
		{
			match = false;
			break;
		}
	}
	if(match)
	{
		if(!ret) return obj;
		else 	ret[ret.length] = obj;
	}

	var prop;
	for(prop in obj)
	{
		if(typeof obj[prop] == 'object')
		{
			//debug("search: " + prop);
			var tmp = _searchObj(obj[prop], criteria, ret);
			if(tmp != null)
			{
				if(!ret) return tmp;
				else 	ret[ret.length] = tmp;
			}
		}
	}

	return null;	
};

//replace the eval by jQuery JSON parser later
function getJSON(str)
{
	var obj;
	try{obj = eval(str);}
	catch(e)
	{
		var _win = window.open(baseHref()+ "lens/icml/BlankForm.xsl","Error", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=640,height=480,resizable=yes");
		if(_win)
			_win.document.write(str);
		else
			alert("Error occured in the request. To see the error detail, please allow the popup for current site.\n\n" + str);
	}
	return obj;
}


//the following 2 functions will be implemented in debug mode only.
function debug(v){return false;};
function obj2tbl(v){return false};