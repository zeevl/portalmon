class CreateAssignments < ActiveRecord::Migration
  def change
    create_table :assignments do |t|
      t.integer :student_id
      t.string :class_name
      t.string :name
      t.date :assigned
      t.date :due
      t.integer :possible_score
      t.integer :score
      t.string :comments

      t.timestamps
    end
  end
end
