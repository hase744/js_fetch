class UserController < ApplicationController
skip_before_action :verify_authenticity_token
  def index
  end

  def sign_up
    user = params[:user]
    password = params[:password]
    if request.post? then
      print("ポスト")
      if User.find_by(name:user) == nil
        print("該当ユーザーなし")
        User.create(name: user, password: password)
        render :json => {"user" => user, "password" => password, "registered" => true}
      else
        render :json => {"user" => user, "password" => password, "registered" => false}
      end
    end
  end

  def log_in
    user = params[:user]
    password = params[:password]
    if request.post? then
      print("ポスト")
      if User.find_by(name:user, password: password) == nil
        print("該当ユーザーなし")
        render :json => {"user" => user, "password" => password, "can_log_in" => false}
      else
        render :json => {"user" => user, "password" => password, "can_log_in" => true}
      end
    end
  end
end
