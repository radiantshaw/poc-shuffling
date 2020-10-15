class Site < ApplicationRecord
  has_many :practice_areas
  accepts_nested_attributes_for :practice_areas, allow_destroy: true
end
