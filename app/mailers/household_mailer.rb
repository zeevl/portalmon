class HouseholdMailer < ActionMailer::Base
  default from: "reports@realchemy.net"

  def scores_email(household, scores)
    @scores = scores

    mail(:to => household.email, :subject => "Assigment Scores Update")
  end
  
end
