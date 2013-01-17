agent = Mechanize.new
page = agent.get 'https://campus.thompson.k12.co.us/campus/portal/thompson.jsp'
form = page.forms.first
form['username'] = 'hjkarulf'
form['password'] = 'Sunstone88'
form.submit

#this returns a list of activities for the given month
agent.get "https://campus.thompson.k12.co.us/campus/portal/portal.xsl?x=portal.PortalOutline&lang=en&mode=calendarFamily&x=resource.PortalOptions&householdID=&x=portal.PortalScheduleStructure&x=portal.PortalLessonPlanActivity&dictionary=Day.eventType"
"https://campus.thompson.k12.co.us/campus/portal/portal.xsl?x=portal.PortalOutline&lang=en&context=&mode=calendarFamily&personID=&calendarID=&structureID=&x=portal.PortalScheduleStructure&x=portal.PortalLessonPlanActivity&dictionary=Day.eventType&month=2&year=2013&lang=en"


agent.get "https://campus.thompson.k12.co.us/campus/portal/portal.xsl?x=portal.PortalOutline&lang=en&mode=activitiesByDate&context=&personID=141958&date=01/11/2013&x=portal.PortalActivityByDate&lang=en&structureID=878&calendarID=872&firstName=Parker&schoolID=4"