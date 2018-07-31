$(document).ready(function(){	$('div.file').customFile();});/** * jQuery Custom File min v1.0.0 * Copyright (c) 2012 JetCoders * email: yuriy.shpak@jetcoders.com * www: JetCoders.com * Licensed under the MIT License: * http://www.opensource.org/licenses/mit-license.php **/
jQuery.fn.customFile = function(_options){
	var _options = jQuery.extend({
		file: 'input.file-input-area',
		input: 'input.file-text',		filledClass: 'filled',		hoverClass: 'hover'
	}, _options);
	return this.each(function(){
		var hold = jQuery(this);
		var file = hold.find(_options.file);
		var input = hold.find(_options.input);
		
		input.prop('readonly', true);
		file.change(function(){
			input.val(this.value);
			hold.addClass(_options.filledClass);
		}).hover(function(){			hold.addClass(_options.hoverClass);		}, function(){			hold.removeClass(_options.hoverClass);		});
	});
}