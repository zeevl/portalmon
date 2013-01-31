class HouseholdMailer < ActionMailer::Base
  default from: "reports@realchemy.net"

  def scores_email(household, missing, scores)
    @scores = scores
    @missing = missing

    mail(:to => household.email, :subject => "Assigment scores update for #{Date.today.to_formatted_s(:short)}")
  end
  
end
