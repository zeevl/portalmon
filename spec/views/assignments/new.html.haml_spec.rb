require 'spec_helper'

describe "assignments/new" do
  before(:each) do
    assign(:assignment, stub_model(Assignment,
      :student_id => 1,
      :class_name => "MyString",
      :name => "MyString",
      :possible_score => 1,
      :score => 1,
      :comments => "MyString"
    ).as_new_record)
  end

  it "renders new assignment form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => assignments_path, :method => "post" do
      assert_select "input#assignment_student_id", :name => "assignment[student_id]"
      assert_select "input#assignment_class_name", :name => "assignment[class_name]"
      assert_select "input#assignment_name", :name => "assignment[name]"
      assert_select "input#assignment_possible_score", :name => "assignment[possible_score]"
      assert_select "input#assignment_score", :name => "assignment[score]"
      assert_select "input#assignment_comments", :name => "assignment[comments]"
    end
  end
end
