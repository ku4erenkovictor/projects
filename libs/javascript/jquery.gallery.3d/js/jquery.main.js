
$(document).ready(function(){
	var li = $('li');
	var count = li.length;
	var radius = li.outerWidth()*count/(Math.PI*2);
	var percent, active = 0, step = (360/count).toFixed(2), last = active;
	li.parent().parent().css({
		"transform": "translateZ(-"+radius+"px)"
	});
	li.each(function(i){
		percent = (360/count*i)/360;
		$(this).css({
			"transform": "translate3d("+(radius*Math.sin(Math.PI*2*percent)).toFixed(2)+"px,0,"+(radius*Math.cos(Math.PI*2*percent)).toFixed(2)+"px) rotateY("+(360*percent).toFixed(2)+"deg)"
		});
	});
	time = setInterval(function(){
		active++;
		li.parent().css({
			"transform": "translate3d(0,"+(radius/3).toFixed(2)+"px,-"+(radius).toFixed(2)+"px) rotateY("+(step*last).toFixed(2)+"deg)"
		});
		setTimeout(function(){
			li.parent().css({
				"transform": "translate3d(0,"+(radius/3).toFixed(2)+"px,-"+(radius).toFixed(2)+"px) rotateY("+(step*active).toFixed(2)+"deg)"
			});
			time = setTimeout(function(){
				li.parent().css({
					"transform": "translate3d(0,0,0) rotateY("+(step*active).toFixed(2)+"deg)"
				});
				last = active;
			}, 800);
		}, 800);
	}, 4000);
	// li.each(function(i){
	// 	$(this).css({
	// 		"transform": "translate3d("+(Math.round(Math.random()*2)*600 - 600)+"px,"+(Math.round(Math.random()*2)*300 - 300)+"px,"+(Math.round(Math.random()*4)*1000 - 2000)+"px)"
	// 	});
	// });
	// li.parent().css({
	// 	"transform": "translate3d(0,1000px,-"+(6000)+"px)"
	// });
});
