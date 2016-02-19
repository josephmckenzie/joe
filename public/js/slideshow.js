var main = function() {
    /*$('.arrow-next').click(function(){
        var currentSlide = $('.current');
        var nextSlide = currentSlide.next();
		
		if(nextSlide.length === 0) {
			nextSlide = $('.slideshow-images').first();
		}
		
		currentSlide.fadeOut(400).removeClass('current');
        nextSlide.fadeIn(400).addClass('current');
		
		var currentDot = $('.active');
		var nextDot = currentDot.next();
		
		if(nextDot.length === 0) {
			nextDot = $('.dot').first();
		}
		
		currentDot.removeClass('active');
		nextDot.addClass('active');
    });*/
	
	window.setInterval(function(){
		var currentSlide = $('.current');
		var nextSlide = currentSlide.next();
		
		if(nextSlide.length === 0) {
			nextSlide = $('.slideshow').first();
		}
		
		currentSlide.fadeOut(400).removeClass('current');
		nextSlide.fadeIn(400).addClass('current');
		
		/*var currentDot = $('.active');
		var nextDot = currentDot.next();
		
		if(nextDot.length === 0) {
			nextDot = $('.dot').first();
		}
		
		currentDot.removeClass('active');
		nextDot.addClass('active');*/
	}, 4000);
	
	/*$('.arrow-back').click(function(){
        var currentSlide = $('.current');
        var prevSlide = currentSlide.prev();
		
		if(prevSlide.length === 0) {
			prevSlide = $('.slideshow-images').last();
		}
		
        currentSlide.fadeOut(400).removeClass('current');
        prevSlide.fadeIn(400).addClass('current');
		
		var currentDot = $('.active');
		var prevDot = currentDot.prev();
		
		if(prevDot.length === 0) {
			prevDot = $('.dot').last();
		}
		
		currentDot.removeClass('active');
		prevDot.addClass('active');
    });*/
}

$(document).ready(main)