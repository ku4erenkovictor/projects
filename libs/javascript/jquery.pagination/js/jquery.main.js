// page init
$(document).ready(function(){
	$('.pagin').pagination({
		pages: 100,
		onChange: function(data){
			console.log(data);
		}
	});
});


/**
 * jQuery pagination v1.0.0
 * Copyright (c) 2014 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function($){var _createStructure=function(data){var all=$(data.structure);var html='';for(var i=1;i<=data.pages;i++){html+='<li>'+i+'</li>';if(i==data.show.start||i==data.pages-data.show.end)html+='<li class="hidden dot">...</li>';};all.find('.prev').after(html);data.$this.empty().append(all);data.start=data.$this.find('.start');data.end=data.$this.find('.end');data.prev=data.$this.find('.prev');data.next=data.$this.find('.next');data.el=data.$this.find('li:not([class])');data.el.eq(data.active).addClass('active');data.dotStart=data.$this.find('.dot:eq(0)');data.dotEnd=data.$this.find('.dot:eq(1)');_changeActive(data);_initEvents(data);},_initEvents=function(data){data.start.bind('click.pagination',function(){data.active=0;_changeActive(data);});data.end.bind('click.pagination',function(){data.active=data.pages-1;_changeActive(data);});data.prev.bind('click.pagination',function(){data.active--;if(data.active<0)data.active=0;_changeActive(data);});data.next.bind('click.pagination',function(){data.active++;if(data.active>data.pages-1)data.active=data.pages-1;_changeActive(data);});data.el.bind('click.pagination',function(){data.active=data.el.index(this);_changeActive(data);});},_changeActive=function(data){data.el.addClass('hidden');data.dotStart.addClass('hidden');data.dotEnd.addClass('hidden');data.el.removeClass('active').eq(data.active).removeClass('hidden').addClass('active');for(var i=1;i<=data.show.between;i++){data.el.eq(data.active+i).removeClass('hidden');if(data.active-i>=0)data.el.eq(data.active-i).removeClass('hidden');};for(var i=0;i<data.show.start;i++){data.el.eq(i).removeClass('hidden');};for(var i=data.pages-data.show.end;i<data.pages;i++){data.el.eq(i).removeClass('hidden');};if(data.show.start+data.show.between+1<data.active+1)data.dotStart.removeClass('hidden');if(data.pages-(data.show.start+data.show.between+1)>data.active)data.dotEnd.removeClass('hidden');data.onChange(data);};methods={init:function(options){return this.each(function(){$(this).data('pagination',jQuery.extend(true,{},defaults,options));var data=$(this).data('pagination');data.$this=$(this);_createStructure(data);});},option:function(name,element){if(typeof element!='object')element=this.eq(0);var $this=this.filter(element),data=$this.data('pagination');if(!data)return this;return data[name];},destroy:function(){return this.each(function(){var $this=$(this),data=$this.data('pagination');data.$this.find('*').unbind('.pagination');data.pagination.remove();$this.removeData('pagination');});}},defaults={structure:'<ul class="jq-pagination"><li class="start">&lt;&lt;</li><li class="prev">&lt;</li><li class="next">&gt;</li><li class="end">&gt;&gt;</li></ul>',show:{start:2,end:2,between:2},pages:20,active:0,onChange:function(){}};$.fn.pagination=function(method){if(methods[method]){return methods[method].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof method==='object'||!method){return methods.init.apply(this,arguments);}else{$.error('Method '+method+' does not exist on jQuery.pagination');}}};})(jQuery);

;(function( $ ){
	
	/**
	 * Private methods 
	 */
	var _createStructure = function(data){
		var all = $(data.structure);
		var html = '';
		
		for (var i = 1; i <= data.pages; i++){
			html += '<li>'+i+'</li>';
			if(i == data.show.start || i == data.pages - data.show.end) html += '<li class="hidden dot">...</li>';
		};
		all.find('.prev').after(html);
		data.$this.empty().append(all);
		data.start = data.$this.find('.start');
		data.end = data.$this.find('.end');
		data.prev = data.$this.find('.prev');
		data.next = data.$this.find('.next');
		data.el = data.$this.find('li:not([class])');
		data.el.eq(data.active).addClass('active');
		data.dotStart = data.$this.find('.dot:eq(0)');
		data.dotEnd = data.$this.find('.dot:eq(1)');
		_changeActive(data);
		_initEvents(data);
	},
	
	_initEvents = function(data){
		data.start.bind('click.pagination', function(){
			data.active = 0;
			_changeActive(data);
			return false;
		});
		data.end.bind('click.pagination', function(){
			data.active = data.pages-1;
			_changeActive(data);
			return false;
		});
		data.prev.bind('click.pagination', function(){
			data.active--;
			if(data.active < 0) data.active = 0;
			_changeActive(data);
			return false;
		});
		data.next.bind('click.pagination', function(){
			data.active++;
			if(data.active > data.pages-1) data.active = data.pages-1;
			_changeActive(data);
			return false;
		});
		data.el.bind('click.pagination', function(){
			data.active = data.el.index(this);
			_changeActive(data);
			return false;
		});
	},
	_changeActive = function(data){
		data.el.addClass('hidden');
		data.dotStart.addClass('hidden');
		data.dotEnd.addClass('hidden');
		data.el.removeClass('active').eq(data.active).removeClass('hidden').addClass('active');
		for (var i = 1; i <= data.show.between; i++){
			data.el.eq(data.active+i).removeClass('hidden');
			if(data.active-i >= 0) data.el.eq(data.active-i).removeClass('hidden');
		};
		for (var i = 0; i < data.show.start; i++){
			data.el.eq(i).removeClass('hidden');
		};
		for (var i = data.pages - data.show.end; i < data.pages; i++){
			data.el.eq(i).removeClass('hidden');
		};
		if(data.show.start + data.show.between + 1 < data.active+1) data.dotStart.removeClass('hidden');
		if(data.pages - (data.show.start + data.show.between + 1) > data.active) data.dotEnd.removeClass('hidden');
		data.onChange(data);
	}

	/**
	 * Public methods 
	 */
	
	methods = {
		init : function( options ) {
			return this.each(function(){
				$(this).data('pagination', jQuery.extend(true, {}, defaults, options));
				var data = $(this).data('pagination');
				data.$this = $(this);
				
				_createStructure(data);
			});
		},
		option: function(name, element){
			if(typeof element != 'object') element = this.eq(0);
			var $this = this.filter(element),
			data = $this.data('pagination');
			if(!data) return this;
			
			return data[name];
		},
		destroy : function( ) {
			return this.each(function(){
				var $this = $(this),
				data = $this.data('pagination');
				
				data.$this.find('*').unbind('.pagination');
				data.$this.empty();
				$this.removeData('pagination');
			});
		}
	},
	
	/**
	 * Param:
	 * 
	 */
	
	defaults = {
		structure: '<ul class="jq-pagination"><li class="start">&lt;&lt;</li><li class="prev">&lt;</li><li class="next">&gt;</li><li class="end">&gt;&gt;</li></ul>',
		show:{
			start: 2,
			end: 2,
			between: 2
		},
		pages: 20,
		active: 0,
		onChange: function(){}
	};
	
	$.fn.pagination = function( method ) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				$.error( 'Method ' +  method + ' does not exist on jQuery.pagination' );
			}
		}
	};
	
})( jQuery );
