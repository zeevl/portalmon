class HouseholdMailer < ActionMailer::Base
  default from: "reports@realchemy.net"

  def scores_email(to, name, missing, scores)
    @scores = scores
    @missing = missing

    date = DateTime.now.in_time_zone('America/Denver').to_formatted_s(:month_day)
    mail(:to => to, 
        :subject => "#{name}'s assigment scores update for #{date}")
  end
  
end
