class ScoreToString < ActiveRecord::Migration
  def change
    remove_column :assignments, :score
    add_column :assignments, :score, :string
  end

end
