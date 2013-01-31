class Assignment < ActiveRecord::Base
  belongs_to :houeshold

  def self.update_scores(id, scores)
    scores.each do |score| 
      existing = find_existing(score)

      if !existing
        score.household_id = id
        score.save      
      else
        existing.score = score.score
        existing.possible_score = score.possible_score

        existing.save
      end
    end
  end

  def self.find_existing(score)
    where(:household_id => score.household_id, 
         :student => score.student,
         :class_name => score.class_name,
         :assigned => score.assigned,
         :name => score.name).first
  end
end
