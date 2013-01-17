# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :assignment do
    student_id 1
    class_name "MyString"
    name "MyString"
    assigned "2013-01-12"
    due "2013-01-12"
    possible_score 1
    score 1
    comments "MyString"
  end
end
