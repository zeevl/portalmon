require 'spec_helper'

describe "assignments/edit" do
  before(:each) do
    @assignment = assign(:assignment, stub_model(Assignment,
      :student_id => 1,
      :class_name => "MyString",
      :name => "MyString",
      :possible_score => 1,
      :score => 1,
      :comments => "MyString"
    ))
  end

  it "renders the edit assignment form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => assignments_path(@assignment), :method => "post" do
      assert_select "input#assignment_student_id", :name => "assignment[student_id]"
      assert_select "input#assignment_class_name", :name => "assignment[class_name]"
      assert_select "input#assignment_name", :name => "assignment[name]"
      assert_select "input#assignment_possible_score", :name => "assignment[possible_score]"
      assert_select "input#assignment_score", :name => "assignment[score]"
      assert_select "input#assignment_comments", :name => "assignment[comments]"
    end
  end
end
