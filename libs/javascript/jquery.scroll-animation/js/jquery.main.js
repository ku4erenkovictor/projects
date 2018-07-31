jQuery(window).load(function(){
	pageInit.init();
});

var pageInit = {
	init: function(){
		this.animStart({
			divider: 5,
			box: '.start-animation',
			width: 1200,
			className: 'visible'
		});
	},
	
	animStart: function(obj){
		var box = $(obj.box);
		if(box.length == 0) return false;

		box.each(function(i){
			var hold = $(this);
			var k = hold.data('number');

			if(k){
				var delay = hold.data('delay') || 0;
				var time, date, newDate = 0, timer = hold.data('duration') || 1000;
				
				hold.bind(obj.className, function(){
					setTimeout(function(){
						date = new Date().getTime();
						time = setInterval(function(){
							hold.text(Math.round(k/timer*newDate));
							newDate = new Date().getTime() - date;
							if(newDate >= timer) {
								hold.text(k);
								clearTimeout(time);
							}
						}, 20);
					}, ($(window).width() >= obj.width ? delay : 0));
				});
			}
		});

		var all = function(){
			box.not('.'+obj.className).each(function(){
				if ($(this).offset().top  <= $(window).scrollTop() + $(window).height()-($(window).height()/obj.divider)) {
					$(this).addClass(obj.className).trigger(obj.className);
				}
			});
		}
		$(window).bind('scroll resize', all);
		all();
	}
}