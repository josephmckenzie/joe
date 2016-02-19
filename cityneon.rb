require 'sinatra'
require 'tilt/erb'
require 'pony'
require_relative "converter.rb"

get '/estimate' do
  erb :estimate, :locals => {:title => "Estimate"}
end

post '/estimateContact' do
  size = params[:cabinetSize]
  size = valueConverter(size)
  depth = params[:cabinetDepth]
  depth = valueConverter(depth)
  face = params[:cabinetFace]
  face = valueConverter(face)
  mount = params[:cabinetMount]
  mount = valueConverter(mount)
  light = params[:cabinetLighting]
  light = valueConverter(light)
  paint = params[:cabinetPaint]
  paint = valueConverter(paint)
  total = params[:totalPrice]
  quoteNumber = params[:estimateNumber]
  erb :estimateContact, :locals => {:title => "Estimate Contact", :size => size, :depth => depth, :face => face, :mount => mount, :light => light, :paint => paint, :total => total, :quoteNumber => quoteNumber}
end

post '/submit' do
  name = params[:user_name]
  business = params[:user_business]
  address = params[:user_address]
  phone = params[:user_phone]
  from = params[:user_email]
  to = "smellydog@outlook.com,#{from}"
  referred = params[:user_referred]
  size = params[:sizeSelection]
  depth = params[:depthSelection]
  face = params[:faceSelection]
  mounting = params[:mountingSelection]
  light = params[:lightingSelection]
  paint = params[:paintSelection]
  total = params[:totalSelection]
  quoteNumber = params[:estimateSelection]
  comments = params[:message]
	
  Pony.mail(
    :to => to, 
    :from => "mmtcontactnoreply@gmail.com", 
    :subject => "Your City Wholesale Quote", 
    :content_type => 'text/html', 
    :body => erb(:email),
    :via => :smtp, 
    :via_options => {
      :address              => 'smtp.gmail.com',
      :port                 => '587',
      :enable_starttls_auto => true,
      :user_name            => 'mmtcontactnoreply',
      :password             => 'Woof9663!',
      :authentication       => :plain, 
      :domain               => "localhost.localdomain" 
    }
  )

  erb :submission
end