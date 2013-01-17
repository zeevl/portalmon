class Portal 
  attr_reader :agent

  def initialize
    @agent = Mechanize.new
  end

  def login(username, password)
    page = self.agent.get 'https://campus.thompson.k12.co.us/campus/portal/thompson.jsp'
    
    form = page.forms.first
    form['username'] = username
    form['password'] = password
  
    page = form.submit

    throw if page.uri.query && page.uri.query.include?('status=error')
  end

  def assignment_scores(month, year)
    scores = []

    calendar = self.agent.get "https://campus.thompson.k12.co.us/campus/portal/portal.xsl?"\
                "x=portal.PortalOutline&lang=en&context=&mode=calendarFamily&personID=&"\
                "calendarID=&structureID=&x=portal.PortalScheduleStructure&"\
                "x=portal.PortalLessonPlanActivity&dictionary=Day.eventType&"\
                "month=#{month}&year=#{year}&lang=en"
  

    calendar.search('.calendarDay a').each do |link|
      next unless link['href'].include? 'mode=activitiesByDate'
      scores += day_scores(link['href'])
    end

    scores
  end

  def day_scores(href)
    scores = []
    page = self.agent.get "https://campus.thompson.k12.co.us/campus/#{href}"
    
    page.search(".portalTable").each do |table|
      cells = table.search("td")
      i = 0
      score = nil

      while i < cells.length 
        case cells[i].text 
        when "Name"
          scores.push(score) if score
          score = Assignment.new({:name => cells[i+=1].text})

        when "Total Points Possible"
          score.possible_score = cells[i+=1].text

        when "Due Date"
          score.due = cells[i+=1].text

        when "Score"
          score.score = cells[i+=1].text

        when "Date Assigned"
          score.assigned = cells[i+1].text
        end

        i += 1
      end
      
      scores.push(score) if score
    end

    scores
  end

end
