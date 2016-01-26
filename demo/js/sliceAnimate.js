/*$(function(){
	var move = new sliceAnimate();
	move.init(".js-m-banner");//this.noticer
	var n = 0;
		move.into(n);
		setInterval(function(){
			move.out();
			setTimeout(function(){
				move.into(n)
			},1000)
			n < $('.js-m-banner').length-1 ? n++ : n = 0;
		},5000)
})
*/
function sliceAnimate(){
	this.options;
	this.before;
}
sliceAnimate.prototype.init=function(el){
	this.options = this.getOptions(el);
}
sliceAnimate.prototype.getGroup=function(el){
	var arr = [];
	$(el).each(function(){
		arr.push($(this));
	})
	return arr;
}
sliceAnimate.prototype.getOptions=function(el){
	var options = [];
	var group = this.getGroup(el);
	$(group).each(function(){
		var arr = {};
		$(this).find("*").each(function(){
			var obj = {};
			obj.el = $(this)
			obj.bottom = $(this).attr("m-bottom");
			obj.left = $(this).attr("m-left");
			obj.right = $(this).attr("m-right");
			obj.top = $(this).attr("m-top");
			obj.opacity = $(this).attr("m-opacity");
			if(typeof $(this).attr("m-timer") === 'undefined'){
				obj.timer = 0.2;
			}else{
				obj.timer = Number($(this).attr("m-timer"));
			}
			if(typeof $(this).attr("m-delay") === 'undefined'){
				obj.delay = 0;
			}else{
				obj.delay = Number($(this).attr("m-delay"));
			}
			arr[""+$(this).index()]=obj;
		});
		options.push(arr);
	});
	return options;
}
sliceAnimate.prototype.noticer = function(index){
	this.out(index);
}
sliceAnimate.prototype.into = function(index){
	var obj = {}
	for(var attr in this.options[index]){
		obj[attr] = this.getBefore(this.options[index][attr]);
	};
	this.before = obj;
	for(var key in this.options[index]){
		this.animation(this.options[index][key] , true);
	};
}
sliceAnimate.prototype.out = function(){
	var option = this.before;
	var moust = 0;
	for(var key in option){
		this.animation(option[key] , false);
	}
	for(var attr in option){
		option[attr].timer+option[attr].delay > moust ? moust = option[attr].timer+option[attr].delay : moust = moust
	}
	return this.toMilli(moust);
};
sliceAnimate.prototype.animation = function(option , state){
	var obj = {};
	for(var key in option){
		if(typeof option[key] === 'string'){
			if(option[key].indexOf('px') > -1){
				obj[key] = option[key].substring(0,option[key].length-2);
			}else if(option[key] === 'auto'){
				continue;
			}else{
				obj[key] = option[key];
			}
		}
	}
	var timer = this.toMilli(option.timer);
	var delay = this.toMilli(option.delay);
	setTimeout(function(){
		if(state == true){
			$(option.el).css('display','block');
		}
		$(option.el).animate(obj,timer,function(){
			if(state == false){
				$(this).css('display','none');
			}
		});
	},delay);
}
sliceAnimate.prototype.toMilli = function(timer){
	var timer = timer.toString();
	if(timer.indexOf('0.') > -1){
		if(timer.substring(timer.indexOf('0.')+2).length == 1){
			return timer.substring(timer.indexOf('0.')+2) * 100;
		}else if(timer.substring(timer.indexOf('0.')+2).length == 2){
			return timer.substring(timer.indexOf('0.')+2) * 10;
		}else{
			return timer.substring(timer.indexOf('0.')+2).substring(0 , 3) * 1;
		}
	}else{
		return timer * 1000;
	}
}
sliceAnimate.prototype.getBefore = function(option){

	var obj = {};

	var aaa = option

	for(var to in option){
		obj[to] = option[to];
	}
	obj['bottom'] = option.el.css('bottom');
	obj['left'] = option.el.css('left');
	obj['top'] = option.el.css('top');
	obj['right'] = option.el.css('right');
	obj['opacity'] = option.el.css('opacity');
	return obj
}