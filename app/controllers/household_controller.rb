class HouseholdController < ApplicationController
  def index
    @scores = Assignment.all
    @missing = Assignment.where(["score LIKE :missing", {:missing => "%Missing"}])

    render "household_mailer/scores_email"
  end
end
