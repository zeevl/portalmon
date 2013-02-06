class Household < ActiveRecord::Base
  has_many :assignments
  has_many :students

  attr_accessible :password, :username, :login_url
  
  attr_accessor :portal

  after_initialize do 
    @portal = Portal.new
  end

  def self.update_all
    all.each do |h|
      h.update_recent_scores
    end
  end

  def send_scores
    students.each do |s|
      scores = self.assignments.where("student = ? AND updated_at > ?", s.name, Time.now - 2.weeks)
      missing = self.assignments.where(["student = :name AND score LIKE :missing", 
          {:name => s.name, :missing => "%Missing"}])

      if !scores.any? && !missing.any?
        logger.info "No scores for #{s.name} (#{self.username}), skipping."
        return 
      end
      
      HouseholdMailer.scores_email(s.send_to, s.name, missing, scores).deliver
    end
  end


  def update_recent_scores
    @portal.login(self)

    scores = @portal.assignment_scores Time.now.month, Time.now.year
    Assignment.update_scores(id, scores)

    start = Time.now - 3.weeks
    if (start.month != Time.now.month)
      scores = @portal.assignment_scores start.month, start.year
      Assignment.update_scores(id, scores)
    end          
  end

end
