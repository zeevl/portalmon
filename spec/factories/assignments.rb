# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :assignment do
    household_id 1
    student "Parker"
    class_name "Math"
    sequence(:name) { |n| "Test #{n}" }
    assigned "2013-01-12"
    due "2013-01-12"
    possible_score 5
    score "4"
  end
end
