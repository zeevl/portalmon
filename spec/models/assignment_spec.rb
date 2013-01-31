require 'spec_helper'
require 'timecop'

describe Assignment do
  describe "find_existing" do
    
    it "returns assignments with matching keys" do
      score = FactoryGirl.create(:assignment)
      Assignment.find_existing(score).should_not be_nil
    end

    it "doesn't return object with mismatched keys" do
      score = FactoryGirl.create(:assignment)
      score.name = "something else"

      Assignment.find_existing(score).should be_nil
    end
  end
  describe "update_scores" do
    it "adds new scores" do
      scores = [ FactoryGirl.build(:assignment) ]
      Assignment.update_scores(0, scores)

      Assignment.all.length.should == 1
    end
  
    it "updates existing scores" do
      score1 = FactoryGirl.create(:assignment)
      
      score2 = FactoryGirl.build(:assignment, { student: score1.student, class_name: score1.class_name, name: score1.name })
      score2.possible_score = 10
      score2.score = 5

      Assignment.update_scores(0, [score2])
      Assignment.all.length.should == 1
      Assignment.first.possible_score.should == 10
      Assignment.first.score.should == "5"

    end

    it "doesn't change updated_at for scores that stay the same" do
      score = FactoryGirl.create(:assignment)

      Timecop.travel(Time.now + 1.day) do 
        # Review: this assumes only the name changes in the Factory.  Better way to do this?
        score2 = FactoryGirl.build(:assignment, name: score.name)
        Assignment.update_scores(0, [score2])

        Assignment.find_existing(score2).updated_at.day.should == score.updated_at.day
      end
    end

  end



end
