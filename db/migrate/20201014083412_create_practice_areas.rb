class CreatePracticeAreas < ActiveRecord::Migration[6.0]
  def change
    create_table :practice_areas do |t|
      t.string :title
      t.references :site, null: false, foreign_key: true

      t.timestamps
    end
  end
end
