class AddStudent < ActiveRecord::Migration
  def change
    add_column :assignments, :student, :string
    add_column :assignments, :household_id, :integer

    create_table :households do |t|
      t.string :username
      t.string :password
    end
    
  end
end
