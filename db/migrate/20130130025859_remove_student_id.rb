class RemoveStudentId < ActiveRecord::Migration
  def change
    remove_column :assignments, :student_id
  end

end
