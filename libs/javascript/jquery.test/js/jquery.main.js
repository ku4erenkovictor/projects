// page init
$(document).ready(function(){
	initNav();
	$('.overlay-link, .overlay').click(function(){
		$('.overlay').toggleClass('open');
		return false;
	});
	$('.box .link').click(function(){
		$(this).parent().toggleClass('open');
		return false;
	});
});

function initNav(){
	$('#nav:has(.menu)').each(function(){
		var hold = $(this);
		var link = hold.find('.icon-menu');
		var box = hold.find('.menu');
		var header = $('#header');

		//box.css({display: 'none'});

		link.unbind('click').click(function () {
            if (!hold.hasClass('open')) {
                hold.addClass('open');
                header.addClass('open');
                box.css({display: 'none'}).slideDown(300);
            } else {
				box.slideUp(300, function(){
					header.removeClass('open');
					hold.removeClass('open');
				});
            }
            return false;
        });

        $(window).resize(function(){
        	box.removeAttr('style');
        });

		$(document).bind('click touchstart mousedown', function(e){
			if(link.offset().left > 0){
				if(!($(e.target).parents().index(box) != -1 || $(e.target).index(box) != -1 || $(e.target).index(link) != -1)){
					flag = false;
					box.slideUp(300, function(){
						header.removeClass('open');
						hold.removeClass('open');
					});
				}
			}
		});
	});
}