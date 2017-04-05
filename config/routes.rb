Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "application#index"
  post "/upload" => "application#upload"
  get "/s3_signin"  => "application#s3_signin", as: "s3_signin"
end
