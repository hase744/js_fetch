Rails.application.routes.draw do
  root 'user#index'
  get 'user/index', to: 'user#index'
  get 'user/sign_up'
  get 'user/log_in'

  post 'user/sign_up'
  post 'user/log_in'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
