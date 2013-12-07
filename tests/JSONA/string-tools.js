var StringTools = (function(){

	function getCodes(str){
		var codeStr = "";
		for(var i = 0; i < str.length){
			codeStr += str.charCodeAt(i);
		}
		return codeStr;
	}
	
	return {
		getCodes : getCodes
	};

});