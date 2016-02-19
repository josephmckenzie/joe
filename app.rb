require 'sinatra'
require 'rubygems'
require 'tilt/erb'
require_relative 'converter.rb'
require 'pony'
require 'csv'

get '/login' do
    erb :login, :locals => {}
end

get '/update_csv' do
    csv = CSV.read("cityneon.csv")
    
    erb :update_csv, :locals =>{:csv => csv}
end

get '/upload' do
    erb :upload, :locals =>{:message => "Please Enter all the required information."}
end

def newfilename(filename)
  if filename.include?("dl=0") && filename.include?("dropbox")
    filename.chomp!("dl=0")
    filename << "raw=1"
  end
filename
end

post '/upload' do

filename = params[:filename]
caption = params[:caption]
validity = params[:validity]
signtype = params[:signtype]
featured = params[:featured]

cityneon = "cityneon.csv"
cityneon = File.open(cityneon,'a')

newfilename = newfilename(filename)
cityneon.write( newfilename + "," + caption + "," + validity + "," + signtype + "," + featured + "\r")
cityneon.close
redirect '/update_csv'
end

post '/edit_upload' do
    csv = CSV.read("cityneon.csv")
    csv_row = params[:edit].to_i
    row = csv[csv_row]
        
    erb :edit_upload, :locals =>{:id => csv_row, :image => row[0], 
                      :caption => row[1], :active => row[2], :signtype => row[3], :featured => row[4]}
end    

post '/edit_csv' do
    id = params[:id].to_i
    caption = params[:caption]
    active = params[:active]
    featured = params[:featured]
    csv = CSV.read("cityneon.csv")
    new_csv = File.open("cityneon.csv", 'w')
    csv.each.with_index do |row, index|

        if index == id
        new_csv << row[0] +  "," + caption + "," + active + "," + row[3] + "," + featured + "\r"
        else
        new_csv << row[0] + "," + row[1] + "," + row[2] + "," + row[3] + "," + row[4] + "\r"
        end
    end
    new_csv.close
    redirect '/update_csv'
end

get '/' do
 @title = 'City Neon Wholesale'
 erb :home
end
get '/portfolio' do
 @title = 'Portfolio'
 csv = CSV.read("cityneon.csv")
    erb :portfolio, :locals =>{:csv => csv}
    
end

get '/estimate' do
 erb :estimate, :locals => {:title => "Estimate"}
end
get '/email' do
    erb :email
end

get '/contact' do
    @title = 'Contact Us'
    erb :contact
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

post '/submit2' do
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

 erb :submission2
end