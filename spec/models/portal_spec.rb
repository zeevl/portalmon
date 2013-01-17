require 'spec_helper'

describe Portal do
  def read_page(page)
    File.read(Rails.root.join('spec', 'models', 'pages', page))
  end

  before(:all) do
    FakeWeb.allow_net_connect = false
  end

  describe 'login' do
    before(:each) do
      FakeWeb.clean_registry

      FakeWeb.register_uri(:get, %r|campus/portal/thompson.jsp|, 
        :body => read_page('login.html'), 
        :content_type => "text/html")
    end

    it 'succeeds with a correct username/password' do
      FakeWeb.register_uri(:post, %r|campus/verify.jsp|, 
        :body => read_page('main.html'), 
        :content_type => "text/html")
 
      p = Portal.new
      expect { p.login('hjkarulf', 'Sunstone88') }.to_not raise_error
    end

    it 'raises error with bad u/p' do 
      FakeWeb.register_uri(:post, %r|campus/verify.jsp|, 
        :status => ["302", "Moved Temporarily"],
        :location => "https://campus.thompson.k12.co.us/campus/portal/thompson.jsp?&rID=0.8130392277342011&status=error&lang=en")
 
      p = Portal.new
      expect { p.login('hjkarulf', 'NotMyPassword') }.to raise_error
    end
  end

  describe 'assignment_scores' do
    let(:portal) { Portal.new }
    
    before(:each) do
      FakeWeb.clean_registry

      FakeWeb.register_uri(:get, %r|campus/portal/portal.xsl?.+month\=12.+year\=2012|,
        :body => read_page('calendar-12-12.html'), 
        :content_type => "text/html")

      FakeWeb.register_uri(:get, %r|campus/portal/portal.xsl?.+mode=activitiesByDate|,
        :body => read_page('activity-single.html'), 
        :content_type => "text/html")


      portal.stub(:login) { nil }
    end

    it 'gets the day score for every entry in the calendar' do
      portal.login 'hjkarulf', 'Sunstone88'

      scores = portal.assignment_scores 12, 2012
      scores.length.should == 14
    end

  end

  describe "day_scores" do
    let(:portal) { Portal.new }
    
    before(:all) do
      FakeWeb.clean_registry
    end

    it "correctly parses when theres one assignemnt" do
      FakeWeb.register_uri(:get, %r|single|,
        :body => read_page('activity-single.html'), 
        :content_type => "text/html")

      scores = portal.day_scores('single')
      scores.length.should == 1
      scores[0].name.should == "Reflection: Common Denominators"
      scores[0].possible_score.should == 10
      scores[0].due.should ==  "12/01/2012".to_date
      scores[0].assigned.should == "12/01/2012".to_date
    end

    it "correctly parses multiple assignments" do
        FakeWeb.register_uri(:get, %r|multi|,
          :body => read_page('activity-multi.html'), 
          :content_type => "text/html")

        scores = portal.day_scores('multi')
        scores.length.should == 3
    
    end
  end

end
