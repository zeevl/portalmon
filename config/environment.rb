# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Portalmon::Application.initialize!



Portalmon::Application.configure do
  config.action_mailer.delivery_method = :smtp

  config.action_mailer.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :domain               => 'realchemy.net',
    :user_name            => ENV["EMAIL_USER_NAME"],
    :password             => ENV["EMAIL_PASSWORD"],
    :authentication       => 'plain',
    :enable_starttls_auto => true
  }
end

ActionMailer::Base.smtp_settings = {
    :address              => "smtp.gmail.com",
    :port                 => 587,
    :domain               => 'realchemy.net',
    :user_name            => ENV["EMAIL_USER_NAME"],
    :password             => ENV["EMAIL_PASSWORD"],
    :authentication       => 'plain',
    :enable_starttls_auto => true
}
# ActionMailer::Base.smtp_settings = {
#     :address              => "smtp.gmail.com",
#     :port                 => 587,
#     :domain               => 'realchemy.net',
#     :user_name            => ENV["email_user_name"],
#     :password             => ENV["email_password"],
#     :authentication       => 'plain',
#     :enable_starttls_auto => true
# }
