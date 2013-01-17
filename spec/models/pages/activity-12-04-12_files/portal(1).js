// calendar/structure scope of the data, loaded & updated on student/scope changes
var xml = null;		// PortalOutline xml
var stu = null;		// Student xml
var cal = null;		// Calendar xml
var ss = null;		// Schedule Structure xml

var schoolRights = null;
var numStudents = 0;

var user = null;
var userIsStudent = false;
var words = null;
var lang = getParam('lang', 5);
var context = getParam('context', 8);
var selectedLinkID = getParam('mode', 5)

var basePortalURL = baseHref()+"portal/portal.xsl?x=portal.PortalOutline&lang=" + lang;

function getParam(param, len) {
	var href = document.location.href;
	var start = href.indexOf(param+"=");
	if(href.indexOf("?") == -1 || start == -1) {
		return '';
	} else {
		start+=len;
		var end = href.indexOf('&', start);
		if (end == -1) {
			return href.substring(start);
		} else {
			return href.substring(start, end);
		}
	}
}

// extend jQuery with a sort function
jQuery.fn.sort = function() {
   return this.pushStack( [].sort.apply( this, arguments ), []);
 };

// sorter that sorts alpha off the attribute name
function sortName(a,b){
	return $(a).attr("name") > $(b).attr("name") ? 1 : -1;
}

function setLang(outlineWords) {
	words = {};
	$("*", outlineWords).each(function() {
		words[this.nodeName] = $(this).text();
	});	
}

// if useTranslations = true or undefined, we use words[name] for the text, if false it's custom link and not localized
function outlineLink(linkID, url, name, useTranslations) {
	
	var anchor;
	if (useTranslations === undefined || useTranslations === true) {
		anchor = $('<li><a id="'+linkID+'" href="' + url + '">' + words[name] + '</a></li>');	
	} else {
		anchor = $('<li><a id="'+linkID+'" href="' + url + '">' + name + '</a></li>');
	}

	$("#menu").append(anchor);
}

function loadStudentOutline() {
	
	var url = basePortalURL + "&context=" + context + "&personID=" + stu.attr("personID") + "&studentFirstName=" + escape(stu.attr("firstName")) + "&lastName=" + escape(stu.attr("lastName")) + "&firstName=" + escape(stu.attr("firstName"));
		
	$("#menu").append('<li class="header">' + stu.attr("firstName") + '</li>');

	stu.find("FutureCalendar").each( function() {
		var i=0;
		if ($("campusRoot > PortalOutline > District > School[schoolID=" + $(this).attr("schoolID") + "]", xml).attr("registration") == "true") {
			outlineLink("registration_"+i, url + "&mode=registration_"+i + "&personID=" + stu.attr("personID") + "&calendarID=" + $(this).attr("calendarID") + "&lastName=" + escape(stu.attr("lastName")) + "&firstName=" + escape(stu.attr("firstName")) + "&lang=" + lang, '<span class="registrationOutline">'+words.registrationOutline+'</span>:<span class="subtext">' +  $(this).attr("calendarName") + '</span>', false);
			i++;
		}
	});
	
	if (cal.attr("calendarID") !== undefined) {

		var calParams = "&schoolID=" + cal.attr("schoolID") + "&calendarID=" + cal.attr("calendarID") + "&structureID=" + ss.attr("structureID") + "&calendarName=" + cal.attr("calendarName");
	
		outlineLink("calendar", url + calParams + "&mode=calendar&x=portal.PortalScheduleStructure&x=portal.PortalLessonPlanActivity&dictionary=Day.eventType", "calendarOutline");
		
		if (schoolRights.attr("schedule") == "true") {
			outlineLink("schedule", url + calParams + "&mode=schedule&x=portal.PortalSchedule&x=resource.PortalOptions", "scheduleOutline");
		}
		if (schoolRights.attr("attendance") == "true") {
			outlineLink("attendance", url + calParams + "&mode=attendance&x=portal.PortalAttendance", "attendanceOutline");
		}
		if (schoolRights.attr("behavior") == "true") {
			outlineLink("behavior", url + calParams + "&mode=behavior&x=portal.PortalBehavior", "behaviorOutline");
		}
		if (schoolRights.attr("health") == "true") {
			outlineLink("health", url + calParams + "&mode=health&x=portal.PortalHealth", "healthOutline");
		}
		if (schoolRights.attr("assessment") == "true") {
			outlineLink("assessment", url + calParams + "&mode=assessment&x=portal.PortalAssessment", "assessmentOutline");
		}
		if (schoolRights.attr("eTranscript") == "true") {
			outlineLink("eTranscript", url + calParams + "&mode=eTranscript", "eTranscriptOutline");
		}
		if (schoolRights.attr("gradPlanner") == "true") {
			outlineLink("gradPlanner", url + calParams + "&mode=gradPlanner&x=portal.PortalGradPlanner", "graduationPlannerOutline");
		}
		if (schoolRights.attr("transportation") == "true") {
			outlineLink("transportation", url + calParams + "&mode=transportation&dictionary=Transportation&x=portal.PortalTransportation", "transportationOutline");
		}
		if (schoolRights.attr("fees") == "true") {
			outlineLink("fees", url + calParams + "&mode=fees&x=portal.PortalFees", "feesOutline");
		}
		if (schoolRights.attr("schoolChoice") == "true") {
			outlineLink("schoolChoice", url + calParams + "&mode=schoolChoice&x=portal.PortalSchoolChoice&dictionary=SchoolChoiceApplication", "schoolChoiceOutline");
		}
		if (schoolRights.attr("toDoList") == "true") {
			outlineLink("toDoList", url + calParams + "&mode=toDoList&x=portal.PortalToDoList", "toDoListOutline");
		}
		if (schoolRights.attr("reports") == "true") {
			outlineLink("reports", url + calParams + "&mode=reports&x=portal.PortalReports&x=resource.PortalOptions", "reportsOutline");
		}
        if ($("campusRoot > PortalOutline > District", xml).attr("activateStudentTab") == "true"){
            $("campusRoot > PortalOutline > Family > Student", xml).each(function() {
                if (($(this).attr("isGuardian") == "true" && $(this).attr("personID") == stu.attr("personID")) || $(this).attr("personID") == $("campusRoot > Header > User", xml).attr("personID")){
                    outlineLink("activateStudentTab", url + calParams + "&mode=activateStudentTab&x=portal.PortalStudentData&dictionary=Identity.stateHispanicEthnicity&x=core.RaceEthnicity-list&preferences=1&x=portal.PortalOutline-attachIsUserAnEmancipatedStudentNode", "studentDemographicsOutline");
                }
            });
        }
		var i=0;
		$("> CustomTab", stu).sort(sortName).each(function() {
			outlineLink('customTab_'+i, url + calParams + "&mode=customTab_"+i +"&toolID=" + $(this).attr("toolID") + "&x=portal.PortalCustomTab&tabName=" + $(this).attr("name") + "&tabType=" + $(this).attr("type"), $(this).attr("name"), false);
			i++;
		});
		
	}
	loadFamilyOutline();
}

function loadFamilyOutline()
{
	// Family outline
	
	// the Family and User Account sections should show up if any school
	// that this user has access to has that section enabled.  Pass the schoolID of a school that has it enabled
	// if one exists to the tool to use for PortalScopeChecking
	
	var accessLogSchoolID = "";
	var accountSchoolID = ""; //this is used only for for user account, not food service
	var foodServiceSchoolID = ""; //this is used for food service
	var contactSchoolID = "";
	var toDoListSchoolID = "";
	
	$(xml).find("School").each(function() {
		if ($(this).attr("accessLog") == "true") {
			accessLogSchoolID = $(this).attr("schoolID");
		}
		if ($(this).attr("account") == "true") {
			accountSchoolID = $(this).attr("schoolID");
		}
		if ($(this).attr("foodService") == "true") {
			foodServiceSchoolID = $(this).attr("schoolID");
		}
		if ($(this).attr("contact") == "true") {
			contactSchoolID = $(this).attr("schoolID");
		}
		if ($(this).attr("toDoList") == "true") {
			toDoListSchoolID = $(this).attr("schoolID");
		}
	});

	$("campusRoot > PortalOutline > Family", xml).each(function() {
		$('#menu').append('<li class="header">' + words.familyOutlineHeader + '</li>');
							
		outlineLink("notices", basePortalURL + "&mode=notices", "messagesOutline");
		
		var numberOfNewMessages = $(xml).find("UserNotice[newMessage=1]").length + $(xml).find("ProcessMessage[newMessage=1]").length;
		
		if (numberOfNewMessages > 0) {
			//add new message count to menu tab									
			$("#notices").append(' <span class="circle">' + numberOfNewMessages + '</span>');
					
			if (numberOfNewMessages > 99) {
				$(".circle").css("width", "22px");		
				$(".circle").css("background", "url('images/portal/circle_wide.png') no-repeat");
			}		
		}
		
		var householdID = $(this).attr("householdID");
		if (householdID === undefined) {
			householdID = "";
		}
		
        if ($("campusRoot > PortalOutline > District", xml).attr("activateHouseholdTab") == "true") {
            outlineLink("activateHouseholdTab", basePortalURL + "&mode=activateHouseholdTab&x=portal.PortalHouseholdData&x=portal.PortalOutline-attachIsUserAnEmancipatedStudentNode", "householdDataOutline");
        }
        if ($("campusRoot > PortalOutline > District", xml).attr("activateFamilyTab") == "true") {
            outlineLink("activateFamilyTab", basePortalURL + "&mode=activateFamilyTab&x=portal.PortalFamilyData&x=portal.PortalOutline-attachIsUserAnEmancipatedStudentNode", "familyDataOutline");
        }
		
		// don't display calendar when a student logs in or a parent with only one student  or a staff member with no students
		if (numStudents > 1) {
			outlineLink("calendarFamily", basePortalURL + "&mode=calendarFamily&x=resource.PortalOptions&householdID=" + householdID + "&x=portal.PortalScheduleStructure&x=portal.PortalLessonPlanActivity&dictionary=Day.eventType", "calendarOutline");
		}
		
		if ($("campusRoot > Header", xml).attr("onlinePaymentsEnabled") == "true" && $("campusRoot > PortalOutline > OnlinePayments", xml).attr("isEnabled") == "true") {
			outlineLink("onlinePayments", basePortalURL + "&mode=onlinePayments&districtID=" + $("campusRoot > PortalOutline > District ", xml).attr("districtID"), "paymentsOutline");
		}

		if ($("campusRoot > Header", xml).attr("posEnable") == "true" && (foodServiceSchoolID != "" && foodServiceSchoolID > 0)) {
			outlineLink("posAccount", basePortalURL + "&mode=posAccount&amp;personID=" + user.attr("personID") + "&x=portal.PortalAccountJournal-accountBalanceList", "foodServiceOutline");
		}
		
		// don't display to do list when a student logs in or a parent with only one student or a staff member with no students
		if (toDoListSchoolID != "" && toDoListSchoolID > 0 && numStudents > 1) {
			outlineLink("toDoListFamily", basePortalURL + "&mode=toDoListFamily&x=portal.PortalToDoList", "toDoListOutline");
		}
		
		// User outline
		if ((accessLogSchoolID != "" && accessLogSchoolID > 0) || (accountSchoolID != "" && accountSchoolID > 0) || (contactSchoolID != "" && contactSchoolID > 0)) {
			$("#menu").append('<li class="header">' + words.userAccountOutline + '</li>');
		}
		
		if (accountSchoolID != "" && accountSchoolID > 0) {
			outlineLink("accountInfo", basePortalURL + "&schoolID=" + accountSchoolID  + "&mode=accountInfo&preferences=1&x=portal.PortalAccountInfo", "changeAccountInfoOutline");
		}

		if (contactSchoolID != "" && contactSchoolID > 0) {
			outlineLink("contactInfo", basePortalURL + "&schoolID=" + contactSchoolID  + "&mode=contactInfo&dictionary=Contact.communicationLanguage&preferences=1&x=portal.PortalContact", "changeContactInfoOutline");
		}

		if (accessLogSchoolID != "" && accessLogSchoolID > 0) {
			outlineLink("accessLog", basePortalURL + "&schoolID=" + accessLogSchoolID + "&mode=accessLog&x=portal.PortalAccessLog", "accessLogOutline");
		}
		
		// External Links
		var i=0;
		$("campusRoot > PortalOutline > ExternalURL > CustomTab", xml).sort(sortName).each(function() {
			$("#links_div").append('<a class="outlineLink" id="redirectURL_' + i++ + '" target="_blank" href="' + $(this).attr("url") + '">' + $(this).attr("name") + '</a>');
		});

		if ($("campusRoot > PortalOutline > District", xml).attr("url") !== undefined) {
			$("#links_div").append('<a class="outlineLink" id="redirectURL_' + i++ + '" target="_blank" href="' + $("campusRoot > PortalOutline > District", xml).attr("url") + '">' + $("campusRoot > PortalOutline > District", xml).attr("name") + '</a>');
		}

		$("campusRoot > PortalOutline > District > School", xml).each(function() {
			if ($(this).attr("url") !== undefined && ($("#links_div").text().indexOf($(this).attr("name")) < 0 || $("#links_div").html().indexOf($(this).attr("url")) < 0)) {
				$("#links_div").append('<a class="outlineLink" id="redirectURL_' + i++ + '" target="_blank" href="' + $(this).attr("url") + '">' + $(this).attr("name") + '</a>');
			}
		});
	});
}

function setContext(id, oneStudent) {

	if (id === undefined) {
		return;
	}
	var contextArray = id.split("-");
	var selectedStudent = contextArray[0];  //personID
	var selectedCalendar = contextArray[1];  //calendarID
	var selectedStructure = contextArray[2];  //structureID

	if (selectedCalendar === undefined) {
		//select primary enrollment
		selectedCalendar = $(xml).find("Student[personID=" + selectedStudent + "]").find("ScheduleStructure[primary='P'][active='true']").attr("calendarID");
		selectedStructure = $(xml).find("Student[personID=" + selectedStudent + "]").find("ScheduleStructure[primary='P'][active='true']").attr("structureID");
	}
	if (selectedCalendar === undefined) {
		//select the secondary enrollment
		selectedCalendar = $(xml).find("Student[personID=" + selectedStudent + "]").find("ScheduleStructure[primary='S'][active='true']").attr("calendarID");
		selectedStructure = $(xml).find("Student[personID=" + selectedStudent + "]").find("ScheduleStructure[primary='S'][active='true']").attr("structureID");
	}
	if (selectedCalendar === undefined) {
		//select special ed enrollment
		selectedCalendar = $(xml).find("Student[personID=" + selectedStudent + "]").find("ScheduleStructure[primary='N'][active='true']").attr("calendarID");
		selectedStructure = $(xml).find("Student[personID=" + selectedStudent + "]").find("ScheduleStructure[primary='N'][active='true']").attr("structureID");
	}
	if (selectedCalendar === undefined) {
		selectedCalendar = 0;
		selectedStructure = 0;
	}		

	//defaulting to student's calendar as default page when a parent switches between multiple students.  If there is only one student, 
	//or the student logs in, then we default to the messages page.
	if (oneStudent){
		context = selectedStudent + "-" + selectedCalendar + "-" + selectedStructure;
	}
	else {
		var params = "&context=" + selectedStudent + "-" + selectedCalendar + "-" + selectedStructure + "&personID="+  selectedStudent + "&calendarID="+  selectedCalendar + "&structureID="+  selectedStructure;
		if (selectedCalendar == 0) { //new student, only future enrollment
			location.href = basePortalURL+params+"&mode=notices";
		}
		else {
			location.href = basePortalURL+params+"&mode=calendar&x=portal.PortalScheduleStructure&x=portal.PortalLessonPlanActivity&dictionary=Day.eventType";
		}
	}
}

function loadStudentInfo() {
	
	var contextArray = context.split("-");
	var selectedStudent = contextArray[0];  //personID
	var selectedCalendar = contextArray[1];  //calendarID
	var selectedStructure = contextArray[2];  //structureID
	
	// save to global variables
	stu = $(xml).find("Student[personID=" + selectedStudent + "]");
	cal = stu.find("Calendar[calendarID=" + selectedCalendar + "]");
	ss = cal.find("ScheduleStructure[structureID=" + selectedStructure + "]");
	
	schoolRights = $("campusRoot > PortalOutline > District > School[schoolID=" + cal.attr("schoolID") + "]", xml);
	
	// set the header
	var middleName = stu.attr("middleName");
	if (middleName === undefined) {
		middleName = "";
	}
	
	var suffix = stu.attr("suffix");
	if (suffix === undefined) {
		suffix = "";
	}

	if (schoolRights.attr("studentPicture") == "true" && (!userIsStudent || (userIsStudent && schoolRights.attr("hidePictureFromStudent")) == "false")) {
		$("#studentPic").empty().append('<img class="studentPic" src="personPicture.jsp?personID=' + stu.attr("personID") + '&alt=logo"/>');
	}
	else {
		$("#studentPic").empty().append('<img class="studentPic" src="personPicture.jsp?alt=logo"/>');
	}

	$("#studentName").empty().append('<p class="studentName">' + stu.attr("firstName") + " " + middleName + " " + stu.attr("lastName") + " " + suffix + '</p>');

	//one enrollment
	if (stu.find("ScheduleStructure").length == 1) {
		
		var structureName = "";
		if (cal.find("ScheduleStructure").length > 1) {
			structureName = " (" + ss.attr("structureName") + ")";
		}
		
		$("#studentInfo").append('<p class="studentDetails">' + cal.attr("calendarName") + structureName + '</p>');
	}
	//create droplist for multiple enrollments
	else if (stu.find("ScheduleStructure").length > 1) {
		var selectedCalendarName = "";
		
		$("#studentInfo").append('<div id="calendars" class="hidden"><ul></ul></div>')
		
		stu.find("Calendar").each(function() {
			
			var $cal = $(this);
			$cal.find("ScheduleStructure").each(function() {
				var structureName = "";

				if ($cal.find("ScheduleStructure").length > 1) {
					structureName = " (" + $(this).attr("structureName") + ")";
				}

				if ($(this).attr("structureID") == selectedStructure) {
					selectedCalendarName = $cal.attr("calendarName") + structureName;
				}
				
				$("#calendars ul").append('<li><a href="#" id="'+ selectedStudent + "-" + $(this).attr("calendarID") + "-" + $(this).attr("structureID") + '">' + $cal.attr("calendarName") + structureName + '</a></li>');

			});
		});
		$("#studentInfo").append('<a id="cal" tabindex="2" href="#calendars" class="fg-button fg-button-icon-right ui-widget ui-state-default ui-corner-all"><span class="ui-icon ui-icon-triangle-1-s"></span>' + selectedCalendarName + '</a><p style="padding-bottom:12px"></p>');
		
		//display droplist for enrollments
		$("#cal").mymenu({
			content: $("#calendars").html(),
			width: 300,
			showSpeed: 300,
			onSelect: setContext
		});
	}

	if (schoolRights.attr("studentNumber") == "true") {
		var studentNumber = stu.attr("studentNumber");
		if (studentNumber == undefined) {
			studentNumber = "";
		}
		$("#studentInfo").append('<p class="studentDetails"><span class="studentOutline">' + words.studentNumber + '</span>: ' + studentNumber + '</p>');
	}
	
	var grade = ss.attr("grade");

	if (grade != undefined) {
		$("#studentInfo").append('<p class="studentDetails"><span class="gradPlannerGrade">' + words.gradPlannerGrade + '</span>: ' + grade + '</p>');
	}
	
	loadStudentOutline();
}

function loadStudents(data) {

	xml = data;
	
	// after ajax call load localized words before anything
	setLang($("campusRoot > OutlineWords", xml));
	
	user = $("campusRoot > Header > User", xml);
	
	// populate user name
	$("#userName").html('<span class="welcome">' + words.welcome + '</span> ' + user.attr("firstName") + " " + user.attr("lastName"));
	
	$("#home, #logo").click(function(e){
		e.preventDefault();
		location.href = basePortalURL + "&mode=notices";
	});

	// count students with a calendar or futureCalendar
	numStudents = $(xml).find("Student:has(Calendar), Student:has(FutureCalendar)").length;
	
	if (numStudents > 1) {
	
		if (numStudents > 10) {
			$("#students ul").append("<li><ul></ul></li>");  //this adds a scroll bar to the droplist and works with maxHeight on mymenu
		}
		
		//create student droplist
		$(xml).find("Student").each(function() {

			var $student = $(this);
			
			if ($student.attr("personID") == user.attr("personID")) {
				userIsStudent = true;
			}

			//student must have a calendar or future calendar to be in the droplist
			if ($student.children("Calendar").length + $student.children("FutureCalendar").length > 0) {
				
				var middleInitial = "";
				if ($student.attr("middleName") !== undefined) {
					middleInitial = $student.attr("middleName").substring(0, 1) + ".";
				}
				
				var suffix = $student.attr("suffix");
				if (suffix === undefined) {
					suffix = "";
				}
				
				var studentName = $student.attr("firstName") + " " + middleInitial + " " + $student.attr("lastName") + " " + suffix;
				var personID = $student.attr("personID");
			
				$("#students ul").append('<li><a href="#" id="' + personID + '">' + studentName + '</a></li>');
			}
		});
		
		$("#droplist").mymenu({
			content: $("#students").html(),
			showSpeed: 300,
			maxHeight: 250,
			callerOnState: '',
			onSelect: setContext
		});
	}
	else {
		if (context == "") {
			setContext($(xml).find("Student:has(Calendar), Student:has(FutureCalendar)").attr("personID"), true);
		}
		else {
			setContext(context, true);
		}
		$("#studentDroplist").remove();
		$("#home").remove();
		
		if ($(xml).find("Student:has(Calendar), Student:has(FutureCalendar)").attr("personID") == user.attr("personID")) {
			userIsStudent = true;
		}
	}

	//create navigation menu
	if (context == "") {
		if (numStudents == 0) {
			$("#studentName").append('<p class="studentName">' + user.attr("firstName") + " " + user.attr("lastName") + '</p>');
		}
		else {
			$("#studentName").append('<p class="studentName">Campus Portal</p>');
		}

		$("#studentPic").append('<img class="studentPic" src="personPicture.jsp?personID=' + user.attr("personID") + '&alt=logo"/>');
		
		loadFamilyOutline(); //first time you log in if more than one student
	}
	else {
		loadStudentInfo();
	}
	
	$(".menu a").click(function() {
		$(".menu li").removeClass("current");
		$(this).parent().addClass("current");
	});
	
	//adding hover events for signout and home buttons here because IE doesn't support div:hover
	$("#signout").hover(
		function () {
			$(this).css("background", "url(images/portal/sign_out_roll.png) no-repeat");
		},
		function () {
			$(this).css("background", "url(images/portal/sign_out.png) no-repeat");
		}
	);
	$("#home").hover(
		function () {
			$(this).css("background", "url(images/portal/home_roll.png) no-repeat");
		},
		function () {
			$(this).css("background", "url(images/portal/home.png) no-repeat");
		}
	);
	
	$("input[type=button]").removeClass().addClass("button");

	$("input[type=button]").hover(
        function () {
            $(this).removeClass().addClass("button-hover");
        },
        function () {
            $(this).removeClass().addClass("button");
        }
    );

	$("input[type=button]").mousedown(
		function () {
			$(this).removeClass().addClass("button-clicked");
		}
	);
	
	$("input[type=button]").mouseup(
		function () {
			$(this).removeClass().addClass("button");
		}
	);

	// need more space for 'Select a Student' text in Spanish
	if (lang == "es") {
		$("#studentDroplist").css("width", "190");
	}
	
	$("#"+selectedLinkID).click();

	$("#background").css({visibility: "visible"});
}

$(document).ready(function(){
	$.post("portal/portalOutlineWrapper.xsl?x=portal.PortalOutline&contentType=text/xml&lang="+lang, {}, loadStudents);
	
	//resizing height of content div so iframes fit nicely
	if ($.browser.msie) {
		$("#content").css("height", document.body.offsetHeight);
	}
});

function portalAccordionHoverFix() {
    //hack so the font stays white when hovering over triangle icon             
    $('.ui-accordion-header:not(.ui-state-active)').live('mouseover mouseout', function(event) {
        if (event.type == 'mouseover') {
            $(this).children().css("color", "#FFFFFF");
        } else {
            $(this).children().css("color", "#555555");
        }
    });             
    $('.ui-state-active').live('mouseover mouseout', function(event) {
        $(this).children().css("color", "#555555");
    });
}


