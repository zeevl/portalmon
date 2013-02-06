class Student < ActiveRecord::Base
  belongs_to :household
  attr_accessible :name, :send_to
end
