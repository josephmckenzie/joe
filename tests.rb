# ENV['RACK_ENV'] = 'test'

require 'minitest/autorun'
require 'rack/test'
require 'tilt/erb'
require_relative 'app.rb'


class MyTest < MiniTest::Test

  include Rack::Test::Methods

	def app
		Sinatra::Application
	end
  
    def test_it_is_a_404 #does root exist??
		get '/starter_page'
			assert_equal 404, last_response.status
    end
	

	def test_for_links_on_index_page
		get '/'
			assert last_response.ok?
			assert last_response.body.include?("/portfolio#customsignage")
			assert last_response.body.include?("/portfolio#postandpanel")
			assert last_response.body.include?("/portfolio#boxCabinet")
			assert last_response.body.include?("/portfolio#channelLetters")
			assert last_response.body.include?("/estimate")
		
  end
  
	def test_for_pics_on_index_page

	get '/'
		assert last_response.ok?
		assert last_response.body.include?("https://scontent-yyz1-1.xx.fbcdn.net/hphotos-xfl1/t31.0-8/s2048x2048/12698672_10153434766381693_3665459585453124278_o.jpg")
		assert last_response.body.include?("https://scontent.ford1-1.fna.fbcdn.net/hphotos-xaf1/v/t1.0-9/12733514_10153443030446693_2684563634210942552_n.jpg?oh=f9d165445923442766a8b22ec9f3abd2&oe=572A63D3")
		assert last_response.body.include?("https://scontent.ford1-1.fna.fbcdn.net/hphotos-xft1/v/t1.0-9/12715485_10153443030971693_7089588744099833122_n.jpg?oh=7b144983cd6c43900d74e8c37377e0af&oe=5764F24F")
		assert last_response.body.include?("https://scontent.ford1-1.fna.fbcdn.net/hphotos-xfp1/v/t1.0-9/12688008_10153443030886693_529026792856702704_n.jpg?oh=dd4812516c97445d205452e97e821bc8&oe=576A3A10")
		assert last_response.body.include?("https://scontent.ford1-1.fna.fbcdn.net/hphotos-xtp1/v/t1.0-9/12715217_10153443030706693_6622767976420612250_n.jpg?oh=fb15f7d6b3f8a4dbebb8836f3c4cf1fe&oe=5767987D")
	
  
	end
	
	# def test_for_port_page
	
	# get '/estimate' 
		# assert_equal "http://example.org/",last_request.url
	
	# end
	
	
	end
  
  