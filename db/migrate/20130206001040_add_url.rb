class AddUrl < ActiveRecord::Migration
  def change
    add_column :households, :login_url, :string
  end
end
