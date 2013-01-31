class Household < ActiveRecord::Base
  has_many :assignments
  attr_accessible :password, :username
  
  attr_accessor :portal

  after_initialize do 
    @portal = Portal.new
  end

  def self.update_all
    all.each do |h|
      h.update_recent_scores
    end
  end

  def update_recent_scores
    @portal.login(self.username, self.password)

    scores = @portal.assignment_scores Time.now.month, Time.now.year
    Assignment.update_scores(id, scores)

    start = Time.now - 3.weeks
    if (start.month != Time.now.month)
      scores = @portal.assignment_scores start.month, start.year
      Assignment.update_scores(id, scores)
    end          
  end

end
