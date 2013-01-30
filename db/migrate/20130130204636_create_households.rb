class CreateHouseholds < ActiveRecord::Migration
  def change
    drop_table :households
    
    create_table :households do |t|
      t.string :username
      t.string :password

      t.timestamps
    end
  end
end
