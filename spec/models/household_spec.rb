require 'spec_helper'

describe Household do
  describe "update_recent_scores" do 
    before(:each) do
      @portal = double("Portal")

      @household = FactoryGirl.create(:household) 
      @household.portal = @portal
    end

    it "logs in with each user household" do
      @portal.should_receive(:login).with(@household)
      @portal.stub(:assignment_scores).and_return([])
      @household.update_recent_scores 
    end


    it "grabs scores for this month when its late in the month" do
      Timecop.freeze(2013, 1, 30) do
        @portal.stub(:login)
        @portal.should_receive(:assignment_scores).with(1, 2013).and_return([])
        @household.update_recent_scores
      end
    end

    it "grabs scores for last month when its early in the month" do
      Timecop.freeze(2013, 1, 10) do
        @portal.stub(:login)
        @portal.should_receive(:assignment_scores).with(1, 2013).and_return([])
        @portal.should_receive(:assignment_scores).with(12, 2012).and_return([])
        @household.update_recent_scores
      end
    end 

  end

end
