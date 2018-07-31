$(function(){
	initOpen();
	initAnim();
	$('.nav-overlay').click(function(){
		$('#nav').toggleClass('open');
		return false;
	});
	OpenBox({
		wrap: '.search-box',
		link: '.search-link',
		box: '.search-widget',
		openClass: 'open'
	});
	OpenBox2({
		wrap: '.catalog-box',
		link: '.catalog-link',
		box: '.catalog-list',
		openClass: 'open'
	});
	OpenBox2({
		wrap: '.catalog-list > li',
		link: '.sub-link',
		box: '.sub-list',
		openClass: 'open'
	});

	OpenBox({
		wrap: '.more-wrap',
		link: '.more-item',
		box: '.list-more',
		openClass: 'open'
	});
	
	$('.tabs').tabs();
	$('.steps').tabs({
        steps: ".list"
	});

	$(document).ready(function(){
		$('.tabs').tabs();
	});
	initGalleries();

	$(function() {
		jcf.replaceAll();
	});

	$('.products').gallery({
		circle: false,
		circle: false,
		flexible: true
	});
	
	$('.gallery-firm').gallery({
		flexible: true
	});
});

function initGalleries(){
	var galleries =[];

	galleries.push({
		gal:$('.slide').gallery({
		circle: false,
		disableBtn: 'disabled',
		switcher: "div.switcher > span",
		slideElement: 6,
		flexible: true
		}),
		width:$('.slide').width(),
		slides: 6 	});

	galleries.push({
		gal:$('.kategorien').gallery({
		circle: false,
		disableBtn: 'disabled',
		switcher: "div.switcher > span",
		slideElement: 4,
		flexible: true
		}),
		width: $('.kategorien').width(),
		slides: 4 	});

	galleries.push({
		gal:$('.katalog').gallery({
		circle: false,
		disableBtn: 'disabled',
		switcher: "div.switcher > span",
		slideElement: 5,
		flexible: true
		}),
		width: $('.katalog').width(),
		slides: 5 	}
		);

	galleries.push({
		gal: $('.cars').gallery({
		circle: false,
		disableBtn: 'disabled',
		switcher: "div.switcher > span",
		slideElement: 5,
		flexible: true
		}),
		width: $('.cars').width(),
		slides: 5 	
	});

	var busy = false;
	$(window).on('resize', function(){
		if (!busy && galleries.length!=0 && galleries[0].gal.data('gallery')){
			busy = true;
			setTimeout(function(){
				checkSize();
				busy = false;
			}, 500)
		}
	})
	function checkSize(){
		$(galleries).each(function(){
			if((this.gal.width() / this.gal.data('gallery').elements.width()) < this.slides){
				this.gal.gallery('option', 'slideElement', 1);
			}else{
				this.gal.gallery('option', 'slideElement', this.slides);
			}
		})
	}


}
function initOpen() {
    $('.menu-holder').each(function () {
        var hold = $(this);
        var link = hold.find('.arrow-menu');
        var box = hold.find('.drop');
		var li = hold.find('.menu > li');
		var closeLink =  $('#nav .toogle-menu');
		var nav = $('#nav');
		
		closeLink.click(function(){
			
			if(!nav.hasClass('open')){
				nav.addClass('open');
			}
			else {
				nav.removeClass('open');
				box.removeAttr('style');
			}
			
			li.removeClass('open');
			
			return false;
		});
		
        link.click(function () {
            if (!$(this).parent().hasClass('open')) {
				box.css({display: 'none'});
				li.removeClass('open');
				
                $(this).parent().addClass('open');
                $(this).parent().find('.drop').css({display: 'block'});
            } else {
                $(this).parent().find('.drop').css({display: 'none'})
				$(this).parent().removeClass('open');
            }
            return false;
        });
		
		function all(){
			if(link.is(':visible')){
				box.each(function(){
					if(!$(this).parent().hasClass('open')){
						console.log(10);
						$(this).css({display: 'none'});
					}
				});
			}
			else {
				box.removeAttr('style');
				li.removeClass('open');
			}
		}
		
		all();
		
		$(window).resize(function(){
			all();
		})
    });
}

function initAnim () {
	var headTop = $(window).scrollTop();
	var last = $(window).scrollTop();
	var _scroll = function () {
		$('.anim-bottom, .anim-left, .anim-right, .anim-footer').not('.load').each(function(){
			if($(this).hasClass('anim-footer')){
				if($(this).offset().top - $(window).height() + 10 < $(window).scrollTop()){
					$(this).addClass('load');
				}
			}
			else{
				if($(this).offset().top - $(window).height() + 100 < $(window).scrollTop()){
					$(this).addClass('load');
				}
			}
		});
	}
	_scroll();
	$(window).bind('scroll', _scroll);
}

function OpenBox(obj){
	$(obj.wrap).each(function(){
		var hold = $(this);
		var link = hold.find(obj.link);
		var box = hold.find(obj.box);
		var w = obj.w;
		var close = hold.find(obj.close);
		
		link.click(function(){
			$(obj.wrap).not(hold).removeClass(obj.openClass);
			if (!hold.hasClass(obj.openClass)) {
				hold.addClass(obj.openClass);
			}
			else {
				hold.removeClass(obj.openClass);
			}
			return false;
		});
		
		hold.hover(function(){
			$(this).addClass('hovering');
		}, function(){
			$(this).removeClass('hovering');
		});
		
		$("body").click(function(){
			if (!hold.hasClass('hovering')) {
				hold.removeClass(obj.openClass);
			}
		});
		close.click(function(){
			hold.removeClass(obj.openClass);
			
			return false;
		});
	});
}
function OpenBox2(obj){
	$(obj.wrap).each(function(){
		var hold = $(this);
		var link = hold.find(obj.link);
		var box = hold.find(obj.box);
		var w = obj.w;
		var close = hold.find(obj.close);
		
		link.click(function(){
			//$(obj.wrap).not(hold).removeClass(obj.openClass);
			if (!hold.hasClass(obj.openClass)) {
				hold.addClass(obj.openClass);
			}
			else {
				hold.removeClass(obj.openClass);
			}
			return false;
		});
		close.click(function(){
			hold.removeClass(obj.openClass);
			
			return false;
		});
	});
}

/**
 * jQuery gallery v2.3.6
 * Copyright (c) 2013 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function($){var _installDirections=function(data){data.holdWidth=data.list.parent().outerWidth();data.woh=data.elements.outerWidth(true);if(!data.direction)data.parentSize=data.holdWidth;else{data.woh=data.elements.outerHeight(true);data.parentSize=data.list.parent().height()}data.wrapHolderW=Math.ceil(data.parentSize/data.woh);if((data.wrapHolderW-1)*data.woh+data.woh/2>data.parentSize)data.wrapHolderW--;if(data.wrapHolderW==0)data.wrapHolderW=1},_dirAnimate=function(data){if(!data.direction)return{left:-(data.woh*
data.active)};else return{top:-(data.woh*data.active)}},_initDisableBtn=function(data){data.prevBtn.removeClass(data.disableBtn);data.nextBtn.removeClass(data.disableBtn);if(data.active==0||data.count+1==data.wrapHolderW-1)data.prevBtn.addClass(data.disableBtn);if(data.active==0&&data.count+1==1||data.count+1<=data.wrapHolderW-1)data.nextBtn.addClass(data.disableBtn);if(data.active==data.rew)data.nextBtn.addClass(data.disableBtn)},_initEvent=function(data,btn,side){btn.bind(data.event+".gallery"+
data.timeStamp,function(){if(data.flag){if(data.infinite)data.flag=false;if(data._t)clearTimeout(data._t);_toPrepare(data,side);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}if(data.event=="click")return false})},_initEventSwitcher=function(data){data.switcher.bind(data.event+".gallery"+data.timeStamp,function(){if(data.flag&&!$(this).hasClass(data.activeClass)){if(data.infinite)data.flag=false;data.active=data.switcher.index(jQuery(this))*data.slideElement;
if(data.infinite)data.active=data.switcher.index(jQuery(this))+data.count;if(data._t)clearTimeout(data._t);if(data.disableBtn)_initDisableBtn(data);if(!data.effect)_scrollElement(data);else _fadeElement(data);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}if(data.event=="click")return false})},_toPrepare=function(data,side){if(!data.infinite){if(data.active==data.rew&&data.circle&&side)data.active=-data.slideElement;if(data.active==0&&data.circle&&
!side)data.active=data.rew+data.slideElement;for(var i=0;i<data.slideElement;i++)if(side){if(data.active+1<=data.rew)data.active++}else if(data.active-1>=0)data.active--}else{if(data.active>=data.count+data.count&&side)data.active-=data.count;if(data.active<=data.count-1&&!side)data.active+=data.count;data.list.css(_dirAnimate(data));if(side)data.active+=data.slideElement;else data.active-=data.slideElement}if(data.disableBtn)_initDisableBtn(data);if(!data.effect)_scrollElement(data);else _fadeElement(data)},
_fadeElement=function(data){data.list.removeClass(data.activeClass).css({zIndex:1});data.list.eq(data.last).stop().css({zIndex:2,opacity:1});if(data.effect=="transparent")data.list.eq(data.last).animate({opacity:0},{queue:false,duration:data.duration});data.list.eq(data.active).addClass(data.activeClass).css({opacity:0,zIndex:3}).animate({opacity:1},{queue:false,duration:data.duration,complete:function(){jQuery(this).css("opacity","auto")}});if(data.autoHeight)data.list.parent().animate({height:data.list.eq(data.active).outerHeight()},
{queue:false,duration:data.duration});if(data.switcher)data.switcher.removeClass(data.activeClass).eq(data.active).addClass(data.activeClass);data.last=data.active},_scrollElement=function(data){data.elements.removeClass("active").eq(data.active).addClass(data.activeClass);if(!data.infinite)data.list.animate(_dirAnimate(data),{queue:false,duration:data.duration});else{data.list.animate(_dirAnimate(data),data.duration,function(){if(data.active>=data.count+data.count)data.active-=data.count;if(data.active<=
data.count-1)data.active+=data.count;data.list.css(_dirAnimate(data));data.flag=true});data.elements.eq(data.active-data.count).addClass(data.activeClass);data.elements.eq(data.active+data.count).addClass(data.activeClass)}if(data.autoHeight)data.list.parent().animate({height:data.list.children().eq(data.active).outerHeight()},{queue:false,duration:data.duration});if(data.switcher)if(!data.infinite)data.switcher.removeClass(data.activeClass).eq(Math.ceil(data.active/data.slideElement)).addClass(data.activeClass);
else{data.switcher.removeClass(data.activeClass).eq(data.active-data.count).addClass(data.activeClass);data.switcher.removeClass(data.activeClass).eq(data.active-data.count-data.count).addClass(data.activeClass);data.switcher.eq(data.active).addClass(data.activeClass)}},_runTimer=function(data){if(data._t)clearTimeout(data._t);data._t=setInterval(function(){if(data.infinite)data.flag=false;_toPrepare(data,true);if(typeof data.onChange=="function")data.onChange({data:data})},data.autoRotation)},_rePosition=
function(data){if(data.flexible&&!data.direction){_installDirections(data);if(data.oneSlide)data.elements.css({width:data.holdWidth});else if(data.elements.length*data.minWidth>data.holdWidth){data.elements.css({width:Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth))});if(data.elements.outerWidth(true)>Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth)))data.elements.css({width:Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth))-(data.elements.outerWidth(true)-
Math.floor(data.holdWidth/Math.floor(data.holdWidth/data.minWidth)))})}else{data.active=0;data.elements.css({width:Math.floor(data.holdWidth/data.elements.length)})}}_installDirections(data);if(!data.effect){data.rew=data.count-data.wrapHolderW+1;if(data.active>data.rew&&!data.infinite)data.active=data.rew;if(data.active-data.count>data.rew&&data.infinite)data.active=data.rew;data.list.css({position:"relative"}).css(_dirAnimate(data));if(data.autoHeight)data.list.parent().css({height:data.list.children().eq(data.active).outerHeight()})}else{data.rew=
data.count;data.list.css({opacity:0}).removeClass(data.activeClass).eq(data.active).addClass(data.activeClass).css({opacity:1}).css("opacity","auto");if(data.autoHeight)data.list.parent().css({height:data.list.eq(data.active).outerHeight()})}if(data.switcher)if(!data.infinite)data.switcher.removeClass(data.activeClass).eq(Math.ceil(data.active/data.slideElement)).addClass(data.activeClass);else{data.switcher.removeClass(data.activeClass).eq(data.active-data.count).addClass(data.activeClass);data.switcher.removeClass(data.activeClass).eq(data.active-
data.count-data.count).addClass(data.activeClass);data.switcher.eq(data.active).addClass(data.activeClass)}if(data.disableBtn)_initDisableBtn(data);if(data.rew<=0&&!data.effect)data.list.css({left:0})},_initTouchEvent=function(data){var touchOnGallery=false;var startTouchPos,listPosNow,side,start;var span=data.list.parent().find("span.gallery-touch-holder");if(span.length==0){span=$("<span></span>");span.css({position:"absolute",left:0,top:0,width:9999,height:9999,cursor:"pointer",zIndex:9999,display:"none"}).addClass("gallery-touch-holder");
data.list.parent().append(span)}data.list.parent().css({position:"relative"});data.list.bind("mousedown.gallery"+data.timeStamp+" touchstart.gallery"+data.timeStamp,function(e){touchOnGallery=true;startTouchPos=e.originalEvent.touches?e.originalEvent.touches[0].pageX:e.pageX;data.list.stop();start=0;listPosNow=data.list.position().left;if(e.type=="mousedown")e.preventDefault()});$(document).bind("mousemove.gallery"+data.timeStamp+" touchmove.gallery"+data.timeStamp,function(e){if(touchOnGallery&&
Math.abs(startTouchPos-(e.originalEvent.touches?e.originalEvent.touches[0].pageX:e.pageX))>10){span.css({display:"block"});start=(e.originalEvent.touches?e.originalEvent.touches[0].pageX:e.pageX)-startTouchPos;if(!data.effect)data.list.css({left:listPosNow+start});return false}}).bind("mouseup.gallery"+data.timeStamp+" touchend.gallery"+data.timeStamp,function(e){if(touchOnGallery&&span.is(":visible")){span.css({display:"none"});if(!data.infinite)if(!data.effect)if(data.list.position().left>0){data.active=
0;_scrollElement(data)}else if(data.list.position().left<-data.woh*data.rew){data.active=data.rew;_scrollElement(data)}else{data.active=Math.floor(data.list.position().left/-data.woh);if(start<0)data.active+=1;_scrollElement(data)}else{if(start<0)_toPrepare(data,true);if(start>0)_toPrepare(data,false)}else{if(data.list.position().left>-data.woh*data.count)data.list.css({left:data.list.position().left-data.woh*data.count});if(data.list.position().left<-data.woh*data.count*2)data.list.css({left:data.list.position().left+
data.woh*data.count});data.active=Math.floor(data.list.position().left/-data.woh);if(start<0)data.active+=1;_scrollElement(data)}if(data.disableBtn)_initDisableBtn(data);if(typeof data.onChange=="function")data.onChange({data:data});if(data.autoRotation)_runTimer(data);touchOnGallery=false}else touchOnGallery=false})},methods={init:function(options){return this.each(function(i){var $this=$(this);$this.data("gallery",jQuery.extend({},defaults,options));var data=$this.data("gallery");data.aR=data.autoRotation;
data.context=$this;data.timeStamp=(new Date).getTime()+i;data.list=data.context.find(data.elements);data.elements=data.list;if(data.elements.css("position")=="absolute"&&data.autoDetect&&!data.effect)data.effect=true;data.count=data.list.index(data.list.filter(":last"));if(!data.effect)data.list=data.list.parent();data.switcher=data.context.find(data.switcher);if(data.switcher.length==0)data.switcher=false;if(data.nextBtn)data.nextBtn=data.context.find(data.nextBtn);if(data.prevBtn)data.prevBtn=data.context.find(data.prevBtn);
if(data.switcher)data.active=data.switcher.index(data.switcher.filter("."+data.activeClass+":eq(0)"));else data.active=data.elements.index(data.elements.filter("."+data.activeClass+":eq(0)"));if(data.active<0)data.active=0;data.last=data.active;if(data.oneSlide)data.flexible=true;if(data.flexible&&!data.direction)data.minWidth=data.elements.outerWidth(true);_rePosition(data);if(data.flexible&&!data.direction)$(window).bind("resize.gallery"+data.timeStamp,function(){_rePosition(data)});data.flag=true;
if(data.infinite){data.count++;data.active+=data.count;data.list.append(data.elements.clone().addClass("gallery-clone"));data.list.append(data.elements.clone().addClass("gallery-clone"));data.list.css(_dirAnimate(data));data.elements=data.list.children()}if(data.rew<=0&&!data.effect)data.list.css({left:0});else{if(data.list.length<=1&&data.effect)return $this;if(data.nextBtn)_initEvent(data,data.nextBtn,true);if(data.prevBtn)_initEvent(data,data.prevBtn,false);if(data.switcher)_initEventSwitcher(data);
if(data.autoRotation)_runTimer(data);if(data.touch)_initTouchEvent(data);if(typeof data.onChange=="function")data.onChange({data:data})}})},option:function(name,set){if(set)return this.each(function(){var data=$(this).data("gallery");if(data)data[name]=set});else{var ar=[];this.each(function(){var data=$(this).data("gallery");if(data)ar.push(data[name])});if(ar.length>1)return ar;else return ar[0]}},destroy:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(data){if(data._t)clearTimeout(data._t);
data.context.find("*").unbind(".gallery"+data.timeStamp);$(window).unbind(".gallery"+data.timeStamp);$(document).unbind(".gallery"+data.timeStamp);data.elements.removeAttr("style");if(data.infinite)data.elements.filter(".gallery-clone").remove();data.list.removeAttr("style");$this.removeData("gallery")}})},rePosition:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");_rePosition(data)})},stop:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");
data.aR=data.autoRotation;data.autoRotation=false;if(data._t)clearTimeout(data._t)})},play:function(time){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(data._t)clearTimeout(data._t);data.autoRotation=time?time:data.aR;if(data.autoRotation)_runTimer(data)})},next:function(element){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(element!="undefined"&&element>-1){data.active=element;if(data.disableBtn)_initDisableBtn(data);if(!data.effect)_scrollElement(data);
else _fadeElement(data)}else if(data.flag){if(data.infinite)data.flag=false;if(data._t)clearTimeout(data._t);_toPrepare(data,true);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}})},prev:function(){return this.each(function(){var $this=$(this),data=$this.data("gallery");if(data.flag){if(data.infinite)data.flag=false;if(data._t)clearTimeout(data._t);_toPrepare(data,false);if(data.autoRotation)_runTimer(data);if(typeof data.onChange=="function")data.onChange({data:data})}})}},
defaults={infinite:false,activeClass:"active",duration:300,slideElement:1,autoRotation:false,effect:false,elements:"ul:eq(0) > li",switcher:".switcher > li",disableBtn:false,nextBtn:"a.link-next, a.btn-next, .next",prevBtn:"a.link-prev, a.btn-prev, .prev",circle:true,direction:false,event:"click",autoHeight:false,flexible:false,oneSlide:false,autoDetect:true,touch:true,onChange:null};$.fn.gallery=function(method){if(methods[method])return methods[method].apply(this,Array.prototype.slice.call(arguments,
1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else $.error("Method "+method+" does not exist on jQuery.gallery")}})(jQuery);

/**
 * jQuery tabs v1.1.0
 * Copyright (c) 2016 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function($){var _error=function(text){if(typeof console=="object")console.warn(text)},_setTab=function(data,tab){data.links.removeClass(data.activeTab).filter('[data-tab="'+tab+'"]').addClass(data.activeTab);data.boxes.removeClass(data.visibleClass+" "+data.hiddenClass).addClass(data.hiddenClass).filter(tab).addClass(data.visibleClass);if(data.steps){if(data.maxStep<data.steps.index(data.steps.filter("."+data.activeTab)))data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab));data.steps.removeClass(data.disabledTab);
for(var i=data.maxStep+1;i<=data.steps.length;i++)data.steps.eq(i).addClass(data.disabledTab)}data.onChange();$(window).trigger("resize")},_initEvents=function(data){data.links.bind("click.tabs",function(){if(!$(this).hasClass(data.disabledTab))_setTab(data,$(this).data("tab"));return false})},methods={init:function(options){return this.each(function(){var $this=$(this);$this.data("tabs",jQuery.extend({},defaults,options));var data=$this.data("tabs");data.context=$this;data.links=$this.find("[data-tab]").not(".detected").addClass("detected");
data.boxes=$();if(data.steps){data.steps=$this.find(data.steps).eq(0).find("[data-tab]");data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab))}data.links.each(function(){data.boxes=data.boxes.add($($(this).data("tab")))});_setTab(data,data.links.filter("."+data.activeTab).eq(0).data("tab"));_initEvents(data)})},setTab:function(tab){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data&&typeof tab=="string")_setTab(data,tab);else _error("Second param need to be String")})},
option:function(name,set){if(set)return this.each(function(){var data=$(this).data("tabs");if(data)data[name]=set});else{var ar=[];this.each(function(){var data=$(this).data("tabs");if(data)ar.push(data[name])});return ar.length>1?ar:ar[0]}},destroy:function(){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data){data.context.find("*").unbind(".tabs").removeClass(data.hiddenClass+" "+data.visibleClass);$(window).unbind(".tabs");$this.removeData("tabs")}})}},defaults={hiddenClass:"hidden",
visibleClass:"visible",activeTab:"active",disabledTab:"disabled",steps:false,onChange:function(){}};$.fn.tabs=function(method){if(methods[method])return methods[method].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else _error("Method "+method+" does not exist on jQuery.tabs")}})(jQuery);

/**
 * jQuery tabs v1.1.0
 * Copyright (c) 2016 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function($){var _error=function(text){if(typeof console=="object")console.warn(text)},_setTab=function(data,tab){data.links.removeClass(data.activeTab).filter('[data-tab="'+tab+'"]').addClass(data.activeTab);data.boxes.removeClass(data.visibleClass+" "+data.hiddenClass).addClass(data.hiddenClass).filter(tab).addClass(data.visibleClass);if(data.steps){if(data.maxStep<data.steps.index(data.steps.filter("."+data.activeTab)))data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab));data.steps.removeClass(data.disabledTab);
for(var i=data.maxStep+1;i<=data.steps.length;i++)data.steps.eq(i).addClass(data.disabledTab)}data.onChange();$(window).trigger("resize")},_initEvents=function(data){data.links.bind("click.tabs",function(){if(!$(this).hasClass(data.disabledTab))_setTab(data,$(this).data("tab"));return false})},methods={init:function(options){return this.each(function(){var $this=$(this);$this.data("tabs",jQuery.extend({},defaults,options));var data=$this.data("tabs");data.context=$this;data.links=$this.find("[data-tab]").not(".detected").addClass("detected");
data.boxes=$();if(data.steps){data.steps=$this.find(data.steps).eq(0).find("[data-tab]");data.maxStep=data.steps.index(data.steps.filter("."+data.activeTab))}data.links.each(function(){data.boxes=data.boxes.add($($(this).data("tab")))});_setTab(data,data.links.filter("."+data.activeTab).eq(0).data("tab"));_initEvents(data)})},setTab:function(tab){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data&&typeof tab=="string")_setTab(data,tab);else _error("Second param need to be String")})},
option:function(name,set){if(set)return this.each(function(){var data=$(this).data("tabs");if(data)data[name]=set});else{var ar=[];this.each(function(){var data=$(this).data("tabs");if(data)ar.push(data[name])});return ar.length>1?ar:ar[0]}},destroy:function(){return this.each(function(){var $this=$(this),data=$this.data("tabs");if(data){data.context.find("*").unbind(".tabs").removeClass(data.hiddenClass+" "+data.visibleClass);$(window).unbind(".tabs");$this.removeData("tabs")}})}},defaults={hiddenClass:"hidden",
visibleClass:"visible",activeTab:"active",disabledTab:"disabled",steps:false,onChange:function(){}};$.fn.tabs=function(method){if(methods[method])return methods[method].apply(this,Array.prototype.slice.call(arguments,1));else if(typeof method==="object"||!method)return methods.init.apply(this,arguments);else _error("Method "+method+" does not exist on jQuery.tabs")}})(jQuery);


/*!
 * JavaScript Custom Forms
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e,t){"use strict";"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):e.jcf=t(jQuery)}(this,function(e){"use strict";var t="1.2.3",n=[],o={optionsKey:"jcf",dataKey:"jcf-instance",rtlClass:"jcf-rtl",focusClass:"jcf-focus",pressedClass:"jcf-pressed",disabledClass:"jcf-disabled",hiddenClass:"jcf-hidden",resetAppearanceClass:"jcf-reset-appearance",unselectableClass:"jcf-unselectable"},a="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,i=/Windows Phone/.test(navigator.userAgent);o.isMobileDevice=!(!a&&!i);var r=function(){var t=e("<style>").appendTo("head"),n=t.prop("sheet")||t.prop("styleSheet"),a=function(e,t,o){o=o||0,n.insertRule?n.insertRule(e+"{"+t+"}",o):n.addRule(e,t,o)};a("."+o.hiddenClass,"position:absolute !important;left:-9999px !important;height:1px !important;width:1px !important;margin:0 !important;border-width:0 !important;-webkit-appearance:none;-moz-appearance:none;appearance:none"),a("."+o.rtlClass+" ."+o.hiddenClass,"right:-9999px !important; left: auto !important"),a("."+o.unselectableClass,"-webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; -webkit-tap-highlight-color: rgba(0,0,0,0);"),a("."+o.resetAppearanceClass,"background: none; border: none; -webkit-appearance: none; appearance: none; opacity: 0; filter: alpha(opacity=0);");var i=e("html"),r=e("body");"rtl"!==i.css("direction")&&"rtl"!==r.css("direction")||i.addClass(o.rtlClass),i.on("reset",function(){setTimeout(function(){c.refreshAll()},0)}),o.styleSheetCreated=!0};!function(){var t,n=navigator.pointerEnabled||navigator.msPointerEnabled,o="ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch,a={},i="jcf-";t=n?{pointerover:navigator.pointerEnabled?"pointerover":"MSPointerOver",pointerdown:navigator.pointerEnabled?"pointerdown":"MSPointerDown",pointermove:navigator.pointerEnabled?"pointermove":"MSPointerMove",pointerup:navigator.pointerEnabled?"pointerup":"MSPointerUp"}:{pointerover:"mouseover",pointerdown:"mousedown"+(o?" touchstart":""),pointermove:"mousemove"+(o?" touchmove":""),pointerup:"mouseup"+(o?" touchend":"")},e.each(t,function(t,n){e.each(n.split(" "),function(e,n){a[n]=t})}),e.each(t,function(t,n){n=n.split(" "),e.event.special[i+t]={setup:function(){var t=this;e.each(n,function(e,n){t.addEventListener?t.addEventListener(n,c,!1):t["on"+n]=c})},teardown:function(){var t=this;e.each(n,function(e,n){t.addEventListener?t.removeEventListener(n,c,!1):t["on"+n]=null})}}});var r=null,s=function(e){var t=Math.abs(e.pageX-r.x),n=Math.abs(e.pageY-r.y),o=25;return o>=t&&o>=n?!0:void 0},c=function(t){var n=t||window.event,o=null,c=a[n.type];if(t=e.event.fix(n),t.type=i+c,n.pointerType)switch(n.pointerType){case 2:t.pointerType="touch";break;case 3:t.pointerType="pen";break;case 4:t.pointerType="mouse";break;default:t.pointerType=n.pointerType}else t.pointerType=n.type.substr(0,5);return t.pageX||t.pageY||(o=n.changedTouches?n.changedTouches[0]:n,t.pageX=o.pageX,t.pageY=o.pageY),"touchend"===n.type&&(r={x:t.pageX,y:t.pageY}),"mouse"===t.pointerType&&r&&s(t)?void 0:(e.event.dispatch||e.event.handle).call(this,t)}}(),function(){var t=("onwheel"in document||document.documentMode>=9?"wheel":"mousewheel DOMMouseScroll").split(" "),n="jcf-mousewheel";e.event.special[n]={setup:function(){var n=this;e.each(t,function(e,t){n.addEventListener?n.addEventListener(t,o,!1):n["on"+t]=o})},teardown:function(){var n=this;e.each(t,function(e,t){n.addEventListener?n.removeEventListener(t,o,!1):n["on"+t]=null})}};var o=function(t){var o=t||window.event;if(t=e.event.fix(o),t.type=n,"detail"in o&&(t.deltaY=-o.detail),"wheelDelta"in o&&(t.deltaY=-o.wheelDelta),"wheelDeltaY"in o&&(t.deltaY=-o.wheelDeltaY),"wheelDeltaX"in o&&(t.deltaX=-o.wheelDeltaX),"deltaY"in o&&(t.deltaY=o.deltaY),"deltaX"in o&&(t.deltaX=o.deltaX),t.delta=t.deltaY||t.deltaX,1===o.deltaMode){var a=16;t.delta*=a,t.deltaY*=a,t.deltaX*=a}return(e.event.dispatch||e.event.handle).call(this,t)}}();var s={fireNativeEvent:function(t,n){e(t).each(function(){var e,t=this;t.dispatchEvent?(e=document.createEvent("HTMLEvents"),e.initEvent(n,!0,!0),t.dispatchEvent(e)):document.createEventObject&&(e=document.createEventObject(),e.target=t,t.fireEvent("on"+n,e))})},bindHandlers:function(){var t=this;e.each(t,function(n,o){0===n.indexOf("on")&&e.isFunction(o)&&(t[n]=function(){return o.apply(t,arguments)})})}},c={version:t,modules:{},getOptions:function(){return e.extend({},o)},setOptions:function(t,n){arguments.length>1?this.modules[t]&&e.extend(this.modules[t].prototype.options,n):e.extend(o,t)},addModule:function(t){e.isFunction(t)&&(t=t(e,window));var a=function(t){t.element.data(o.dataKey)||t.element.data(o.dataKey,this),n.push(this),this.options=e.extend({},o,this.options,i(t.element),t),this.bindHandlers(),this.init.apply(this,arguments)},i=function(t){var n=t.data(o.optionsKey),a=t.attr(o.optionsKey);if(n)return n;if(a)try{return e.parseJSON(a)}catch(i){}};a.prototype=t,e.extend(t,s),t.plugins&&e.each(t.plugins,function(t,n){e.extend(n.prototype,s)});var r=a.prototype.destroy;a.prototype.destroy=function(){this.options.element.removeData(this.options.dataKey);for(var e=n.length-1;e>=0;e--)if(n[e]===this){n.splice(e,1);break}r&&r.apply(this,arguments)},this.modules[t.name]=a},getInstance:function(t){return e(t).data(o.dataKey)},replace:function(t,n,a){var i,s=this;return o.styleSheetCreated||r(),e(t).each(function(){var t,r=e(this);i=r.data(o.dataKey),i?i.refresh():(n||e.each(s.modules,function(e,t){return t.prototype.matchElement.call(t.prototype,r)?(n=e,!1):void 0}),n&&(t=e.extend({element:r},a),i=new s.modules[n](t)))}),i},refresh:function(t){e(t).each(function(){var t=e(this).data(o.dataKey);t&&t.refresh()})},destroy:function(t){e(t).each(function(){var t=e(this).data(o.dataKey);t&&t.destroy()})},replaceAll:function(t){var n=this;e.each(this.modules,function(o,a){e(a.prototype.selector,t).each(function(){this.className.indexOf("jcf-ignore")<0&&n.replace(this,o)})})},refreshAll:function(t){if(t)e.each(this.modules,function(n,a){e(a.prototype.selector,t).each(function(){var t=e(this).data(o.dataKey);t&&t.refresh()})});else for(var a=n.length-1;a>=0;a--)n[a].refresh()},destroyAll:function(t){if(t)e.each(this.modules,function(n,a){e(a.prototype.selector,t).each(function(t,n){var a=e(n).data(o.dataKey);a&&a.destroy()})});else for(;n.length;)n[0].destroy()}};return"function"==typeof define&&define.amd&&(window.jcf=c),c});

/*!
 * JavaScript Custom Forms : Select Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e){e.addModule(function(t,s){"use strict";function i(e){this.options=t.extend({wrapNative:!0,wrapNativeOnMobile:!0,fakeDropInBody:!0,useCustomScroll:!0,flipDropToFit:!0,maxVisibleItems:10,fakeAreaStructure:'<span class="jcf-select"><span class="jcf-select-text"></span><span class="jcf-select-opener"></span></span>',fakeDropStructure:'<div class="jcf-select-drop"><div class="jcf-select-drop-content"></div></div>',optionClassPrefix:"jcf-option-",selectClassPrefix:"jcf-select-",dropContentSelector:".jcf-select-drop-content",selectTextSelector:".jcf-select-text",dropActiveClass:"jcf-drop-active",flipDropClass:"jcf-drop-flipped"},e),this.init()}function o(e){this.options=t.extend({wrapNative:!0,useCustomScroll:!0,fakeStructure:'<span class="jcf-list-box"><span class="jcf-list-wrapper"></span></span>',selectClassPrefix:"jcf-select-",listHolder:".jcf-list-wrapper"},e),this.init()}function n(e){this.options=t.extend({holder:null,maxVisibleItems:10,selectOnClick:!0,useHoverClass:!1,useCustomScroll:!1,handleResize:!0,multipleSelectWithoutKey:!1,alwaysPreventMouseWheel:!1,indexAttribute:"data-index",cloneClassPrefix:"jcf-option-",containerStructure:'<span class="jcf-list"><span class="jcf-list-content"></span></span>',containerSelector:".jcf-list-content",captionClass:"jcf-optgroup-caption",disabledClass:"jcf-disabled",optionClass:"jcf-option",groupClass:"jcf-optgroup",hoverClass:"jcf-hover",selectedClass:"jcf-selected",scrollClass:"jcf-scroll-active"},e),this.init()}var l={name:"Select",selector:"select",options:{element:null,multipleCompactStyle:!1},plugins:{ListBox:o,ComboBox:i,SelectList:n},matchElement:function(e){return e.is("select")},init:function(){this.element=t(this.options.element),this.createInstance()},isListBox:function(){return this.element.is("[size]:not([jcf-size]), [multiple]")},createInstance:function(){this.instance&&this.instance.destroy(),this.isListBox()&&!this.options.multipleCompactStyle?this.instance=new o(this.options):this.instance=new i(this.options)},refresh:function(){var e=this.isListBox()&&this.instance instanceof i||!this.isListBox()&&this.instance instanceof o;e?this.createInstance():this.instance.refresh()},destroy:function(){this.instance.destroy()}};t.extend(i.prototype,{init:function(){this.initStructure(),this.bindHandlers(),this.attachEvents(),this.refresh()},initStructure:function(){this.win=t(s),this.doc=t(document),this.realElement=t(this.options.element),this.fakeElement=t(this.options.fakeAreaStructure).insertAfter(this.realElement),this.selectTextContainer=this.fakeElement.find(this.options.selectTextSelector),this.selectText=t("<span></span>").appendTo(this.selectTextContainer),h(this.fakeElement),this.fakeElement.addClass(r(this.realElement.prop("className"),this.options.selectClassPrefix)),this.realElement.prop("multiple")&&this.fakeElement.addClass("jcf-compact-multiple"),this.options.isMobileDevice&&this.options.wrapNativeOnMobile&&!this.options.wrapNative&&(this.options.wrapNative=!0),this.options.wrapNative?this.realElement.prependTo(this.fakeElement).css({position:"absolute",height:"100%",width:"100%"}).addClass(this.options.resetAppearanceClass):(this.realElement.addClass(this.options.hiddenClass),this.fakeElement.attr("title",this.realElement.attr("title")),this.fakeDropTarget=this.options.fakeDropInBody?t("body"):this.fakeElement)},attachEvents:function(){var e=this;this.delayedRefresh=function(){setTimeout(function(){e.refresh(),e.list&&(e.list.refresh(),e.list.scrollToActiveOption())},1)},this.options.wrapNative?this.realElement.on({focus:this.onFocus,change:this.onChange,click:this.onChange,keydown:this.delayedRefresh}):(this.realElement.on({focus:this.onFocus,change:this.onChange,keydown:this.onKeyDown}),this.fakeElement.on({"jcf-pointerdown":this.onSelectAreaPress}))},onKeyDown:function(e){13===e.which?this.toggleDropdown():this.dropActive&&this.delayedRefresh()},onChange:function(){this.refresh()},onFocus:function(){this.pressedFlag&&this.focusedFlag||(this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur),this.toggleListMode(!0),this.focusedFlag=!0)},onBlur:function(){this.pressedFlag||(this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur),this.toggleListMode(!1),this.focusedFlag=!1)},onResize:function(){this.dropActive&&this.hideDropdown()},onSelectDropPress:function(){this.pressedFlag=!0},onSelectDropRelease:function(e,t){this.pressedFlag=!1,"mouse"===t.pointerType&&this.realElement.focus()},onSelectAreaPress:function(e){var s=!this.options.fakeDropInBody&&t(e.target).closest(this.dropdown).length;s||e.button>1||this.realElement.is(":disabled")||(this.selectOpenedByEvent=e.pointerType,this.toggleDropdown(),this.focusedFlag||("mouse"===e.pointerType?this.realElement.focus():this.onFocus(e)),this.pressedFlag=!0,this.fakeElement.addClass(this.options.pressedClass),this.doc.on("jcf-pointerup",this.onSelectAreaRelease))},onSelectAreaRelease:function(e){this.focusedFlag&&"mouse"===e.pointerType&&this.realElement.focus(),this.pressedFlag=!1,this.fakeElement.removeClass(this.options.pressedClass),this.doc.off("jcf-pointerup",this.onSelectAreaRelease)},onOutsideClick:function(e){var s=t(e.target),i=s.closest(this.fakeElement).length||s.closest(this.dropdown).length;i||this.hideDropdown()},onSelect:function(){this.refresh(),this.realElement.prop("multiple")?this.repositionDropdown():this.hideDropdown(),this.fireNativeEvent(this.realElement,"change")},toggleListMode:function(e){this.options.wrapNative||(e?this.realElement.attr({size:4,"jcf-size":""}):this.options.wrapNative||this.realElement.removeAttr("size jcf-size"))},createDropdown:function(){this.dropdown&&(this.list.destroy(),this.dropdown.remove()),this.dropdown=t(this.options.fakeDropStructure).appendTo(this.fakeDropTarget),this.dropdown.addClass(r(this.realElement.prop("className"),this.options.selectClassPrefix)),h(this.dropdown),this.realElement.prop("multiple")&&this.dropdown.addClass("jcf-compact-multiple"),this.options.fakeDropInBody&&this.dropdown.css({position:"absolute",top:-9999}),this.list=new n({useHoverClass:!0,handleResize:!1,alwaysPreventMouseWheel:!0,maxVisibleItems:this.options.maxVisibleItems,useCustomScroll:this.options.useCustomScroll,holder:this.dropdown.find(this.options.dropContentSelector),multipleSelectWithoutKey:this.realElement.prop("multiple"),element:this.realElement}),t(this.list).on({select:this.onSelect,press:this.onSelectDropPress,release:this.onSelectDropRelease})},repositionDropdown:function(){var e,t,s,i=this.fakeElement.offset(),o=this.fakeElement[0].getBoundingClientRect(),n=o.width||o.right-o.left,l=this.fakeElement.outerHeight(),r=this.dropdown.css("width",n).outerHeight(),h=this.win.scrollTop(),a=this.win.height(),c=!1;i.top+l+r>h+a&&i.top-r>h&&(c=!0),this.options.fakeDropInBody&&(s="static"!==this.fakeDropTarget.css("position")?this.fakeDropTarget.offset().top:0,this.options.flipDropToFit&&c?(t=i.left,e=i.top-r-s):(t=i.left,e=i.top+l-s),this.dropdown.css({width:n,left:t,top:e})),this.dropdown.add(this.fakeElement).toggleClass(this.options.flipDropClass,this.options.flipDropToFit&&c)},showDropdown:function(){this.realElement.prop("options").length&&(this.dropdown||this.createDropdown(),this.dropActive=!0,this.dropdown.appendTo(this.fakeDropTarget),this.fakeElement.addClass(this.options.dropActiveClass),this.refreshSelectedText(),this.repositionDropdown(),this.list.setScrollTop(this.savedScrollTop),this.list.refresh(),this.win.on("resize",this.onResize),this.doc.on("jcf-pointerdown",this.onOutsideClick))},hideDropdown:function(){this.dropdown&&(this.savedScrollTop=this.list.getScrollTop(),this.fakeElement.removeClass(this.options.dropActiveClass+" "+this.options.flipDropClass),this.dropdown.removeClass(this.options.flipDropClass).detach(),this.doc.off("jcf-pointerdown",this.onOutsideClick),this.win.off("resize",this.onResize),this.dropActive=!1,"touch"===this.selectOpenedByEvent&&this.onBlur())},toggleDropdown:function(){this.dropActive?this.hideDropdown():this.showDropdown()},refreshSelectedText:function(){var e,s=this.realElement.prop("selectedIndex"),i=this.realElement.prop("options")[s],o=i?i.getAttribute("data-image"):null,n="",l=this;this.realElement.prop("multiple")?(t.each(this.realElement.prop("options"),function(e,t){t.selected&&(n+=(n?", ":"")+t.innerHTML)}),n||(n=l.realElement.attr("placeholder")||""),this.selectText.removeAttr("class").html(n)):i?this.currentSelectedText===i.innerHTML&&this.currentSelectedImage===o||(e=r(i.className,this.options.optionClassPrefix),this.selectText.attr("class",e).html(i.innerHTML),o?(this.selectImage||(this.selectImage=t("<img>").prependTo(this.selectTextContainer).hide()),this.selectImage.attr("src",o).show()):this.selectImage&&this.selectImage.hide(),this.currentSelectedText=i.innerHTML,this.currentSelectedImage=o):(this.selectImage&&this.selectImage.hide(),this.selectText.removeAttr("class").empty())},refresh:function(){"none"===this.realElement.prop("style").display?this.fakeElement.hide():this.fakeElement.show(),this.refreshSelectedText(),this.fakeElement.toggleClass(this.options.disabledClass,this.realElement.is(":disabled"))},destroy:function(){this.options.wrapNative?this.realElement.insertBefore(this.fakeElement).css({position:"",height:"",width:""}).removeClass(this.options.resetAppearanceClass):(this.realElement.removeClass(this.options.hiddenClass),this.realElement.is("[jcf-size]")&&this.realElement.removeAttr("size jcf-size")),this.fakeElement.remove(),this.doc.off("jcf-pointerup",this.onSelectAreaRelease),this.realElement.off({focus:this.onFocus})}}),t.extend(o.prototype,{init:function(){this.bindHandlers(),this.initStructure(),this.attachEvents()},initStructure:function(){this.realElement=t(this.options.element),this.fakeElement=t(this.options.fakeStructure).insertAfter(this.realElement),this.listHolder=this.fakeElement.find(this.options.listHolder),h(this.fakeElement),this.fakeElement.addClass(r(this.realElement.prop("className"),this.options.selectClassPrefix)),this.realElement.addClass(this.options.hiddenClass),this.list=new n({useCustomScroll:this.options.useCustomScroll,holder:this.listHolder,selectOnClick:!1,element:this.realElement})},attachEvents:function(){var e=this;this.delayedRefresh=function(t){t&&(16===t.which||t.ctrlKey||t.metaKey||t.altKey)||(clearTimeout(e.refreshTimer),e.refreshTimer=setTimeout(function(){e.refresh(),e.list.scrollToActiveOption()},1))},this.realElement.on({focus:this.onFocus,click:this.delayedRefresh,keydown:this.delayedRefresh}),t(this.list).on({select:this.onSelect,press:this.onFakeOptionsPress,release:this.onFakeOptionsRelease})},onFakeOptionsPress:function(e,t){this.pressedFlag=!0,"mouse"===t.pointerType&&this.realElement.focus()},onFakeOptionsRelease:function(e,t){this.pressedFlag=!1,"mouse"===t.pointerType&&this.realElement.focus()},onSelect:function(){this.fireNativeEvent(this.realElement,"change"),this.fireNativeEvent(this.realElement,"click")},onFocus:function(){this.pressedFlag&&this.focusedFlag||(this.fakeElement.addClass(this.options.focusClass),this.realElement.on("blur",this.onBlur),this.focusedFlag=!0)},onBlur:function(){this.pressedFlag||(this.fakeElement.removeClass(this.options.focusClass),this.realElement.off("blur",this.onBlur),this.focusedFlag=!1)},refresh:function(){this.fakeElement.toggleClass(this.options.disabledClass,this.realElement.is(":disabled")),this.list.refresh()},destroy:function(){this.list.destroy(),this.realElement.insertBefore(this.fakeElement).removeClass(this.options.hiddenClass),this.fakeElement.remove()}}),t.extend(n.prototype,{init:function(){this.initStructure(),this.refreshSelectedClass(),this.attachEvents()},initStructure:function(){this.element=t(this.options.element),this.indexSelector="["+this.options.indexAttribute+"]",this.container=t(this.options.containerStructure).appendTo(this.options.holder),this.listHolder=this.container.find(this.options.containerSelector),this.lastClickedIndex=this.element.prop("selectedIndex"),this.rebuildList(),this.element.prop("multiple")&&(this.previousSelection=this.getSelectedOptionsIndexes())},attachEvents:function(){this.bindHandlers(),this.listHolder.on("jcf-pointerdown",this.indexSelector,this.onItemPress),this.listHolder.on("jcf-pointerdown",this.onPress),this.options.useHoverClass&&this.listHolder.on("jcf-pointerover",this.indexSelector,this.onHoverItem)},onPress:function(e){t(this).trigger("press",e),this.listHolder.on("jcf-pointerup",this.onRelease)},onRelease:function(e){t(this).trigger("release",e),this.listHolder.off("jcf-pointerup",this.onRelease)},onHoverItem:function(e){var t=parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute));this.fakeOptions.removeClass(this.options.hoverClass).eq(t).addClass(this.options.hoverClass)},onItemPress:function(e){"touch"===e.pointerType||this.options.selectOnClick?(this.tmpListOffsetTop=this.list.offset().top,this.listHolder.on("jcf-pointerup",this.indexSelector,this.onItemRelease)):this.onSelectItem(e)},onItemRelease:function(e){this.listHolder.off("jcf-pointerup",this.indexSelector,this.onItemRelease),this.tmpListOffsetTop===this.list.offset().top&&this.listHolder.on("click",this.indexSelector,{savedPointerType:e.pointerType},this.onSelectItem),delete this.tmpListOffsetTop},onSelectItem:function(e){var s,i=parseFloat(e.currentTarget.getAttribute(this.options.indexAttribute)),o=e.data&&e.data.savedPointerType||e.pointerType||"mouse";this.listHolder.off("click",this.indexSelector,this.onSelectItem),e.button>1||this.realOptions[i].disabled||(this.element.prop("multiple")?e.metaKey||e.ctrlKey||"touch"===o||this.options.multipleSelectWithoutKey?this.realOptions[i].selected=!this.realOptions[i].selected:e.shiftKey?(s=[this.lastClickedIndex,i].sort(function(e,t){return e-t}),this.realOptions.each(function(e,t){t.selected=e>=s[0]&&e<=s[1]})):this.element.prop("selectedIndex",i):this.element.prop("selectedIndex",i),e.shiftKey||(this.lastClickedIndex=i),this.refreshSelectedClass(),"mouse"===o&&this.scrollToActiveOption(),t(this).trigger("select"))},rebuildList:function(){var s=this,i=this.element[0];this.storedSelectHTML=i.innerHTML,this.optionIndex=0,this.list=t(this.createOptionsList(i)),this.listHolder.empty().append(this.list),this.realOptions=this.element.find("option"),this.fakeOptions=this.list.find(this.indexSelector),this.fakeListItems=this.list.find("."+this.options.captionClass+","+this.indexSelector),delete this.optionIndex;var o=this.options.maxVisibleItems,n=this.element.prop("size");n>1&&!this.element.is("[jcf-size]")&&(o=n);var l=this.fakeOptions.length>o;return this.container.toggleClass(this.options.scrollClass,l),l&&(this.listHolder.css({maxHeight:this.getOverflowHeight(o),overflow:"auto"}),this.options.useCustomScroll&&e.modules.Scrollable)?void e.replace(this.listHolder,"Scrollable",{handleResize:this.options.handleResize,alwaysPreventMouseWheel:this.options.alwaysPreventMouseWheel}):void(this.options.alwaysPreventMouseWheel&&(this.preventWheelHandler=function(e){var t=s.listHolder.scrollTop(),i=s.listHolder.prop("scrollHeight")-s.listHolder.innerHeight();(0>=t&&e.deltaY<0||t>=i&&e.deltaY>0)&&e.preventDefault()},this.listHolder.on("jcf-mousewheel",this.preventWheelHandler)))},refreshSelectedClass:function(){var e,t=this,s=this.element.prop("multiple"),i=this.element.prop("selectedIndex");s?this.realOptions.each(function(e,s){t.fakeOptions.eq(e).toggleClass(t.options.selectedClass,!!s.selected)}):(this.fakeOptions.removeClass(this.options.selectedClass+" "+this.options.hoverClass),e=this.fakeOptions.eq(i).addClass(this.options.selectedClass),this.options.useHoverClass&&e.addClass(this.options.hoverClass))},scrollToActiveOption:function(){var e=this.getActiveOptionOffset();"number"==typeof e&&this.listHolder.prop("scrollTop",e)},getSelectedOptionsIndexes:function(){var e=[];return this.realOptions.each(function(t,s){s.selected&&e.push(t)}),e},getChangedSelectedIndex:function(){var e=this.element.prop("selectedIndex"),s=this,i=!1,o=null;return this.element.prop("multiple")?(this.currentSelection=this.getSelectedOptionsIndexes(),t.each(this.currentSelection,function(e,t){!i&&s.previousSelection.indexOf(t)<0&&(0===e&&(i=!0),o=t)}),this.previousSelection=this.currentSelection,o):e},getActiveOptionOffset:function(){var e=this.getChangedSelectedIndex();if(null!==e){var t=this.listHolder.height(),s=this.listHolder.prop("scrollTop"),i=this.fakeOptions.eq(e),o=i.offset().top-this.list.offset().top,n=i.innerHeight();return o+n>=s+t?o-t+n:s>o?o:void 0}},getOverflowHeight:function(e){var t=this.fakeListItems.eq(e-1),s=this.list.offset().top,i=t.offset().top,o=t.innerHeight();return i+o-s},getScrollTop:function(){return this.listHolder.scrollTop()},setScrollTop:function(e){this.listHolder.scrollTop(e)},createOption:function(e){var t=document.createElement("span");t.className=this.options.optionClass,t.innerHTML=e.innerHTML,t.setAttribute(this.options.indexAttribute,this.optionIndex++);var s,i=e.getAttribute("data-image");return i&&(s=document.createElement("img"),s.src=i,t.insertBefore(s,t.childNodes[0])),e.disabled&&(t.className+=" "+this.options.disabledClass),e.className&&(t.className+=" "+r(e.className,this.options.cloneClassPrefix)),t},createOptGroup:function(e){var t,s,i=document.createElement("span"),o=e.getAttribute("label");return t=document.createElement("span"),t.className=this.options.captionClass,t.innerHTML=o,i.appendChild(t),e.children.length&&(s=this.createOptionsList(e),i.appendChild(s)),i.className=this.options.groupClass,i},createOptionContainer:function(){var e=document.createElement("li");return e},createOptionsList:function(e){var s=this,i=document.createElement("ul");return t.each(e.children,function(e,t){var o,n=s.createOptionContainer(t);switch(t.tagName.toLowerCase()){case"option":o=s.createOption(t);break;case"optgroup":o=s.createOptGroup(t)}i.appendChild(n).appendChild(o)}),i},refresh:function(){this.storedSelectHTML!==this.element.prop("innerHTML")&&this.rebuildList();var t=e.getInstance(this.listHolder);t&&t.refresh(),this.refreshSelectedClass()},destroy:function(){this.listHolder.off("jcf-mousewheel",this.preventWheelHandler),this.listHolder.off("jcf-pointerdown",this.indexSelector,this.onSelectItem),this.listHolder.off("jcf-pointerover",this.indexSelector,this.onHoverItem),this.listHolder.off("jcf-pointerdown",this.onPress)}});var r=function(e,t){return e?e.replace(/[\s]*([\S]+)+[\s]*/gi,t+"$1 "):""},h=function(){function t(e){e.preventDefault()}var s=e.getOptions().unselectableClass;return function(e){e.addClass(s).on("selectstart",t)}}();return l})}(jcf);

/*!
 * JavaScript Custom Forms : Number Module
 *
 * Copyright 2014-2015 PSD2HTML - http://psd2html.com/jcf
 * Released under the MIT license (LICENSE.txt)
 *
 * Version: 1.2.3
 */
!function(e){e.addModule(function(e){"use strict";return{name:"Number",selector:'input[type="number"]',options:{realElementClass:"jcf-real-element",fakeStructure:'<span class="jcf-number"><span class="jcf-btn-inc"></span><span class="jcf-btn-dec"></span></span>',btnIncSelector:".jcf-btn-inc",btnDecSelector:".jcf-btn-dec",pressInterval:150},matchElement:function(e){return e.is(this.selector)},init:function(){this.initStructure(),this.attachEvents(),this.refresh()},initStructure:function(){this.page=e("html"),this.realElement=e(this.options.element).addClass(this.options.realElementClass),this.fakeElement=e(this.options.fakeStructure).insertBefore(this.realElement).prepend(this.realElement),this.btnDec=this.fakeElement.find(this.options.btnDecSelector),this.btnInc=this.fakeElement.find(this.options.btnIncSelector),this.initialValue=parseFloat(this.realElement.val())||0,this.minValue=parseFloat(this.realElement.attr("min")),this.maxValue=parseFloat(this.realElement.attr("max")),this.stepValue=parseFloat(this.realElement.attr("step"))||1,this.minValue=isNaN(this.minValue)?-(1/0):this.minValue,this.maxValue=isNaN(this.maxValue)?1/0:this.maxValue,isFinite(this.maxValue)&&(this.maxValue-=(this.maxValue-this.minValue)%this.stepValue)},attachEvents:function(){this.realElement.on({focus:this.onFocus}),this.btnDec.add(this.btnInc).on("jcf-pointerdown",this.onBtnPress)},onBtnPress:function(e){var t,s=this;this.realElement.is(":disabled")||(t=this.btnInc.is(e.currentTarget),s.step(t),clearInterval(this.stepTimer),this.stepTimer=setInterval(function(){s.step(t)},this.options.pressInterval),this.page.on("jcf-pointerup",this.onBtnRelease))},onBtnRelease:function(){clearInterval(this.stepTimer),this.page.off("jcf-pointerup",this.onBtnRelease)},onFocus:function(){this.fakeElement.addClass(this.options.focusClass),this.realElement.on({blur:this.onBlur,keydown:this.onKeyPress})},onBlur:function(){this.fakeElement.removeClass(this.options.focusClass),this.realElement.off({blur:this.onBlur,keydown:this.onKeyPress})},onKeyPress:function(e){38!==e.which&&40!==e.which||(e.preventDefault(),this.step(38===e.which))},step:function(e){var t=parseFloat(this.realElement.val()),s=t||0,i=this.stepValue*(e?1:-1),n=isFinite(this.minValue)?this.minValue:this.initialValue-Math.abs(s*this.stepValue),a=Math.abs(n-s)%this.stepValue;a?e?s+=i-a:s-=a:s+=i,s<this.minValue?s=this.minValue:s>this.maxValue&&(s=this.maxValue),s!==t&&(this.realElement.val(s).trigger("change"),this.refresh())},refresh:function(){var e=this.realElement.is(":disabled"),t=parseFloat(this.realElement.val());this.fakeElement.toggleClass(this.options.disabledClass,e),this.btnDec.toggleClass(this.options.disabledClass,t===this.minValue),this.btnInc.toggleClass(this.options.disabledClass,t===this.maxValue)},destroy:function(){this.realElement.removeClass(this.options.realElementClass).insertBefore(this.fakeElement),this.fakeElement.remove(),clearInterval(this.stepTimer),this.page.off("jcf-pointerup",this.onBtnRelease),this.realElement.off({keydown:this.onKeyPress,focus:this.onFocus,blur:this.onBlur})}}})}(jcf);