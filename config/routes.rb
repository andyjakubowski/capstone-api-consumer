Rails.application.routes.draw do
  get 'people/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :people

  root 'people#index'
end
