var setList = function(list, id, name, type) {
	var obj;
	if(type == 1)
		obj = { text: id+":"+name, value: id };
	else if(type == 2)
		obj = { text: name, value: id };
	else
		obj = { text: id, value: id };
	
	list.push(obj);
}