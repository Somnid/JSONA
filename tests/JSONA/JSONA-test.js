module("JSONA")
module("parse");
test("should parse simple JSON", function(){
	var sample = '{ "key" : "value" }'
	var result = JSONA.parse(sample);
	var expected = { key : "value" };
	
	deepEqual(result, expected);
});
test("should parse simple JSON with a line comment", function(){
	var sample = "";
	sample += '{\n';
	sample += '"key" : "value",\n'; 
	sample += '"key2" : "value2"\n'; 
	sample += '//"key3" : "value3"\n'; 
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2"
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with a line comment and windows line encoding", function(){
	var sample = "";
	sample += '{\r\n';
	sample += '"key" : "value",\r\n'; 
	sample += '"key2" : "value2"\r\n'; 
	sample += '//"key3" : "value3"\r\n'; 
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2"
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with multiple line comments", function(){
	var sample = "";
	sample += '{\n';
	sample += '\t"key" : "value",\n'; 
	sample += '\t"key2" : "value2",\n'; 
	sample += '//\t"commented-key" : "commented-value"\n';
	sample += '\t"key3" : "value3",\n';
	sample += '\t"key4" : {\n';
	sample += '\t\t"sub-key1" : "sub-value1",\n';
	sample += '//\t\t"commented-sub-key" : "commented-sub-value",\n';
	sample += '\t\t"sub-key2" : "sub-value2"\n';
	sample += '\t}\n';
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2",
		key3 : "value3",
		key4 : {
			"sub-key1" : "sub-value1",
			"sub-key2" : "sub-value2"
		}
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with a star-syntax comment", function(){
	var sample = "";
	sample += '{\n';
	sample += '"key" : "value",\n'; 
	sample += '"key2" : "value2"\n'; 
	sample += '/*"key3" : "value3"*/\n'; 
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2"
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with multiple star syntax comments", function(){
	var sample = "";
	sample += '{\n';
	sample += '\t"key" : "value",\n'; 
	sample += '\t"key2" : "value2",\n'; 
	sample += '/*\t"commented-key" : "commented-value"*/\n';
	sample += '\t"key3" : "value3",\n';
	sample += '\t"key4" : {\n';
	sample += '\t\t"sub-key1" : "sub-value1",\n';
	sample += '/*\t\t"commented-sub-key" : "commented-sub-value",*/\n';
	sample += '\t\t"sub-key2" : "sub-value2"\n';
	sample += '\t}\n';
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2",
		key3 : "value3",
		key4 : {
			"sub-key1" : "sub-value1",
			"sub-key2" : "sub-value2"
		}
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with a star-syntax comment shorter than one line", function(){
	var sample = "";
	sample += '{\n';
	sample += '"key" : "value",\n'; 
	sample += '"key2" : "value2",\n'; 
	sample += '"key3" : /*"value3"*/"value4"\n'; 
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2",
		key3 : "value4"
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with multiple star-syntax comments shorter than one line", function(){
	var sample = "";
	sample += '{\n';
	sample += '"key" : "value",\n'; 
	sample += '"key2" : "value2",\n'; 
	sample += '/*"key3"*/"key4" : /*"value3"*/"value4"\n'; 
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2",
		key4 : "value4"
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with multi-line star syntax comments", function(){
	var sample = "";
	sample += '{\n';
	sample += '\t"key" : "value",\n'; 
	sample += '\t"key2" : "value2",\n'; 
	sample += '\t"key3" : "value3"\n';
	sample += '/*\t"key4" : {\n';
	sample += '\t\t"sub-key1" : "sub-value1",\n';
	sample += '\t\t"commented-sub-key" : "commented-sub-value",\n';
	sample += '\t\t"sub-key2" : "sub-value2"\n';
	sample += '\t}*/\n';
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2",
		key3 : "value3",
	};
	
	deepEqual(result, expected);
});
test("should parse simple JSON with multi-line star syntax comment and line comment", function(){
	var sample = "";
	sample += '{\n';
	sample += '\t"key" : "value",\n'; 
	sample += '\t"key2" : "value2",\n'; 
	sample += '//\t"key3" : "value3",\n';
	sample += '\t"key4" : "value4"\n'
	sample += '/*\t"key4" : {\n';
	sample += '\t\t"sub-key1" : "sub-value1",\n';
	sample += '\t\t"commented-sub-key" : "commented-sub-value",\n';
	sample += '\t\t"sub-key2" : "sub-value2"\n';
	sample += '\t}*/\n';
	sample += '}';
	var result = JSONA.parse(sample);
	var expected = { 
		key : "value",
		key2 : "value2",
		key4: "value4",
	};
	
	deepEqual(result, expected);
});
	