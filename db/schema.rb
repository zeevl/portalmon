# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130206181345) do

  create_table "assignments", :force => true do |t|
    t.string   "class_name"
    t.string   "name"
    t.date     "assigned"
    t.date     "due"
    t.integer  "possible_score"
    t.string   "comments"
    t.datetime "created_at",     :null => false
    t.datetime "updated_at",     :null => false
    t.string   "student"
    t.integer  "household_id"
    t.string   "score"
  end

  create_table "households", :force => true do |t|
    t.string   "username"
    t.string   "password"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "email"
    t.string   "login_url"
  end

  create_table "students", :force => true do |t|
    t.string   "name"
    t.string   "send_to"
    t.integer  "household_id"
    t.datetime "created_at",   :null => false
    t.datetime "updated_at",   :null => false
  end

end
