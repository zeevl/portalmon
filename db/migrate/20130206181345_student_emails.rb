class StudentEmails < ActiveRecord::Migration
  def change
    create_table :students do |t|
      t.string :name
      t.string :send_to
      t.references :household

      t.timestamps
    end
  end

end
