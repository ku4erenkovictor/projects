var state_list;
function initMap() {
	var _map = document.getElementById("map");
	if (_map) {
		createMap(_map);
	}
}

function createMap(_map) {
	state_list = document.getElementById("map-hover").getElementsByTagName("li");
	var _areas = _map.getElementsByTagName("area");
		for (i = 0; i < _areas.length; i ++) {
			if (_areas[i].alt) {
				var _node = document.getElementById(_areas[i].alt);
				if (_node) {
					_areas[i]._node = _node;
					_areas[i].onmouseover = function() {
						if (this._node.className.indexOf("activestate") == -1)
						{
							this._node.className += " activestate";

						}
					}
					_areas[i].onmouseout = function() {
						this._node.className = this._node.className.replace("activestate", "");
					}
				}
			}
		}
}
if (window.addEventListener){
	window.addEventListener("load", initMap, false);
}
else if (window.attachEvent){
	window.attachEvent("onload", initMap);
}

/*
	$('.map-box').each(function(){
		var hold = $(this);
		var state_list = hold.find("#map-hover");
		var _areas = hold.find("area");
		
		_areas.hover(function(){
			$('#'+$(this).attr('alt')).addClass("activestate");
		}, function(){
			$('#'+$(this).attr('alt')).removeClass("activestate");
		});
	});
 */