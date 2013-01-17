require 'spec_helper'

describe "assignments/show" do
  before(:each) do
    @assignment = assign(:assignment, stub_model(Assignment,
      :student_id => 1,
      :class_name => "Class Name",
      :name => "Name",
      :possible_score => 2,
      :score => 3,
      :comments => "Comments"
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/1/)
    rendered.should match(/Class Name/)
    rendered.should match(/Name/)
    rendered.should match(/2/)
    rendered.should match(/3/)
    rendered.should match(/Comments/)
  end
end
