class HouseholdMailer < ActionMailer::Base
  default from: "reports@realchemy.net"

  def scores_email(household, missing, scores)
    @scores = scores
    @missing = missing

    date = DateTime.now.in_time_zone('America/Denver').to_formatted_s(:month_day)
    mail(:to => household.email, 
        :subject => "Assigment scores update for #{date}")
  end
  
end
