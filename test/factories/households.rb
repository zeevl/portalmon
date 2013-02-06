# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :household do
    username "MyString"
    password "MyString"
    login_url "http://mystring/login.asp"
  end
end
