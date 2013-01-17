require 'spec_helper'

describe "assignments/index" do
  before(:each) do
    assign(:assignments, [
      stub_model(Assignment,
        :student_id => 1,
        :class_name => "Class Name",
        :name => "Name",
        :possible_score => 2,
        :score => 3,
        :comments => "Comments"
      ),
      stub_model(Assignment,
        :student_id => 1,
        :class_name => "Class Name",
        :name => "Name",
        :possible_score => 2,
        :score => 3,
        :comments => "Comments"
      )
    ])
  end

  it "renders a list of assignments" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Class Name".to_s, :count => 2
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => "Comments".to_s, :count => 2
  end
end
