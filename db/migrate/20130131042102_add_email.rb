class AddEmail < ActiveRecord::Migration
  def change
    add_column :households, :email, :string
  end

end
