$(function(){
	initNav();
});


function initNav () {
	$('#header:has(#nav)').each(function(){
		var hold = $(this);
		var link = hold.find('.toogle-menu');
		var box = hold.find('.nav-holder');
		var wrap = $('#wrapper');
		var links = hold.find('.goto')
		
		link.click(function(){
			if(!hold.hasClass('open')){
				setTimeout(function(){
					hold.addClass('open');
				}, 50);
				box.slideDown(500, function () {
					//wrap.css({height: hold.outerHeight()+box.outerHeight()});
					$('body').css({overflow: 'hidden'});
				});
			}
			else{
				box.slideUp(500, function(){
					hold.removeClass('open');
					//wrap.css({height: 'auto'});
				});
				$('body').css({overflow: 'visible'});
			}

			return false;
		});

		links.on('click', function	(){
			$(window).trigger('closeNav')
		})

		$(window).bind('closeNav', function(){
			if(hold.hasClass('open')){
				box.slideUp(500, function(){
					hold.removeClass('open');
				});
				$('body').css({overflow: 'visible'});
			}
		});

		$(window).bind('resize', function(){
			if(hold.hasClass('open')){
				//wrap.css({height: hold.outerHeight()+box.outerHeight()});
			}
		});
	});
}