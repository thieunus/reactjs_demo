class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  def upload
    render nothing: true
  end

  def s3_signin
    # Usual fog config, set as an initializer
    storage = Fog::Storage.new(
      provider: 'AWS',
      aws_access_key_id: "AKIAJYM5QLKSPUYS3RKA",
      aws_secret_access_key: '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'
    )

    # In the controller
    options = {path_style: true}
    headers = {"Content-Type" => params[:contentType], "x-amz-acl" => "public-read"}

    url = storage.put_object_url('monetrack-dev', "user_uploads/#{params[:objectName]}", 15.minutes.from_now.to_time.to_i, headers, options)

    respond_to do |format|
      format.json { render json: {signedUrl: url} }
    end
  end
end
