namespace :scores do
 desc "Update scores"
 task :update => :environment do  
   Household.update_all
 end

 desc "Email latest scores"
 task :email => :environment do
   Household.all.each { |h| h.send_scores }
 end
end

task :scores => ["scores:update", "scores:email"]
