// page init
$(document).ready(function(){
	$('form').validation();
	$('.test').click(function(){
		$('span', this).text($('#form01').validation('checkFields') ? "from valid" : "form error");
		console.log($('#form01').validation('checkFields'));
		return false;
	});
});

/**
 * jQuery validation v1.0.0
 * Copyright (c) 2016 JetCoders
 * email: yuriy.shpak@jetcoders.com
 * www: JetCoders.com
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 **/

;(function( $ ){
	
	/**
	 * Private methods 
	 */
	var _checkFields = function(data){
		data.valid = true;

		data.form
			.find('.'+data.errorClass+', .'+data.validClass)
			.removeClass(data.errorClass+' '+data.validClass);

		data.form.find('[data-required]').filter(':visible').not(':disabled').each(function(){
			if(data.params[$(this).data('required')] == undefined){
				_error( 'Validate for data-required="' +  $(this).data('required') + 
					'" does not exist on jQuery.validation' );
			}
			else{
				if(typeof data.params[$(this).data('required')] == 'function'){
					if (!data.params[$(this).data('required')](data, $(this)) ) _addError($(this), data);
					else _addValid($(this), data);
				}
				else{
					if (!data.params[$(this).data('required')].test($(this).val()) || $(this).val() == $(this).attr('placeholder') || $(this).val() == $(this).data('placeholder')) _addError($(this), data);
					else _addValid($(this), data);
				}
			}
		});
		return !data.valid;
	},

	_error = function (text) {
		if(typeof console == 'object') console.warn(text);
	},
	
	_addError = function(el, data){
		data.valid = false;
		el.addClass(data.errorClass);
		data.onAddClass(el, data.errorClass);
	},
	
	_addValid = function(el, data){
		el.addClass(data.validClass);
		data.onAddClass(el, data.validClass);
	},

	/**
	 * Public methods 
	 */
	
	methods = {
		init : function( options ) {
			return this.each(function(){
				var $this = $(this);
				$this.data('validation', jQuery.extend(true, {}, defaults, options));
				var data = $this.data('validation');
				data.form = $this;
				data.submit = data.form.find(data.submitBtn);

				var _submit = function(){
					if(_checkFields(data)) {
						return data.onError(data);
					}
					return data.onValid(data);
				}

				data.submit.click(_submit);
				data.form.submit(_submit);
			});
		},
		checkFields: function () {
			var $this = $(this).eq(0),
			data = $this.data('validation');
			return data ? !_checkFields(data) : _error( 'jQuery.validation not start for this form!' );;
		},
		option: function(name, element){
			if(typeof element != 'object') element = this.eq(0);
			var $this = this.filter(element),
			data = $this.data('validation');
			if(!data) return this;
			
			return data[name];
		},
		destroy : function( ) {
			return this.each(function(){
				var $this = $(this),
				data = $this.data('validation');
				
				data.form.find('*').unbind('.validation');
				data.validation.remove();
				$this.removeData('validation');
			});
		}
	},
	
	/**
	 * Params:
	 * 
	 * data-required="checkbox"
	 * data-required="radio"
	 * data-required="equal" data-equal="id"
	 */
	
	defaults = {
		errorClass: 'error',
		validClass: 'valid',
		submitBtn: 'input[type=submit], button[type=submit]',
		params: {
			empty: /\S/,
			email: /^[_.0-9a-z-]+@([0-9a-z][0-9a-z-]+.)+[a-z]{2,4}$/,
			phone: /^([0-9][\-\.\s]{0,1}){7,}$/,
			numbers: /^\d+(\.\d{1,2})?$/,
    		digits: /[0-9]*$/,
			select: /([^\-]{1})$/,
			card: /^[0-9]{4}[\-\.\s]{0,1}[0-9]{4}[\-\.\s]{0,1}[0-9]{4}[\-\.\s]{0,1}[0-9]{4}$/,
			checkbox: function (data, el) {
				return el.is(':checked');
			},
			radio: function (data, el) {
				return $('input:radio[name='+el.attr('name')+']').filter(':checked').length > 0;
			},
			equal: function (data, el) {
				return data.params.empty.test(el.val()) && data.params.empty.test($(el.data('equal')).val()) && el.val() == $(el.data('equal')).val();
			}
		},
		onAddClass: function(el, className){
			$(el).parent().addClass(className);
		},
		onValid: function(){},
		onError: function(){return false;}
	};
	
	$.fn.validation = function( method ) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else {
			if ( typeof method === 'object' || ! method ) {
				return methods.init.apply( this, arguments );
			} else {
				_error( 'Method ' +  method + ' does not exist on jQuery.validation' );
			}
		}
	};
	
})( jQuery );
