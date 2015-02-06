function myTagCloud(boardSelector){

	this.boardSelector = boardSelector;
	this.colors = ['#9CCDEB', '#9FD7F6', '#77C0F9', '#3886C2', '#346EA6'];
	this.maxWeight = 0;
	this.minWeight = 0;
	this.listMode = arguments[1] == 'list' ? true : false;
	this.config = {
		"itemsTag": "span",
		"itemsClass": "myTagCloudItem",
		"containerID": "tagCloud",
		"weightAVG": 0,
		"minSize": 15,
		"maxSize": 90
	};

	this.addTag = function(label, weight, link){
		var tag;
		if(link){
			tag = jQuery('<a>', { "href": link, "class": this.config.itemsClass });
		}else{
			tag = jQuery('<'+this.config.itemsTag+'>', { "class": this.config.itemsClass });
		}
		jQuery(tag).text(label);
		jQuery(tag).css("display", "none");
		jQuery(tag).attr("data-weight", weight);
		if(!jQuery('#'+this.config.containerID).length){
			var container = jQuery('<div>', { "id": this.config.containerID, "style": "text-align: center" });
			jQuery(this.boardSelector).append(container);
		}
		jQuery('#'+this.config.containerID).append(tag);
		return this;
	};

	this.addMaxColor = function(hex){
		if(this._isHex(hex)){
			this.colors.push(hex);
			return this;
		}
	};
	this.addMinColor = function(hex){
		if(this._isHex(hex)){
			this.colors.unshift(hex);
			return this;
		}
	};

	this.setTags = function(tagsArray){
		if(!jQuery.isArray(tagsArray)){
			console.error('Is not an array');
			return false;
		}else{
			jQuery('#'+this.config.containerID).html('');
			for(var i = 0; i < tagsArray.length; i++){
				this.addTag(tagsArray[i].label, tagsArray[i].weight, tagsArray[i].link);
			}
			return this;
		}
	};

	this._calculateWeightAVG = function(tags){
		var SUM = 0;
		for(var i = 0; i < tags.length; i++){
			SUM += parseInt(jQuery(tags[i]).attr('data-weight'));
		}
		this.config.weightAVG = SUM / tags.length;
		this._setItemStyles();
	};

	this._getColor = function(weight){
		return (weight / this.config.maxSize * this.colors.length) - 1;
	}

	this._isHex = function(str){
		var regEx = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
		if(regEx.test(str)){
			return true;
		}else{
			console.error('Invalid hex value ('+str+')');
			return false;
		}
	};

	this._setMaxMin = function(){
		var max = 0;
		var min = 0;
		var selector = '#'+this.config.containerID+' .'+this.config.itemsClass;
		var tags = jQuery(selector);
		for(var i = 0; i < tags.length; i++){
			var tag = tags[i];
			if(parseInt(jQuery(tag).attr('data-weight')) < min) min = parseInt(jQuery(tag).attr('data-weight'));
			if(parseInt(jQuery(tag).attr('data-weight')) > max) max = parseInt(jQuery(tag).attr('data-weight'));
		}
		this.minWeight = min;
		this.maxWeight = max;
		for (var i = 0; i < tags.length; i++) {
			var tag = tags[i];
			var newWeight = this._checkWeight(jQuery(tag).attr('data-weight'));
			jQuery(tag).attr('data-weight', newWeight);
		};
		this._calculateWeightAVG(tags);
	};

	this._checkWeight = function(weight){
		return (weight / (this.maxWeight - this.minWeight)) * this.config.maxSize;
	};

	this._setItemStyles = function(){
		var items = jQuery('#'+this.config.containerID+' .'+this.config.itemsClass);
		if(!this.listMode){
			this._setCloudStyle(items);
		}else{
			this._setListStyle(items);
		}
	};

	this._setCloudStyle = function(items){
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			var weight = jQuery(item).attr('data-weight');
			if(weight > this.config.maxSize) weight = this.config.maxSize;
			if(weight < this.config.minSize) weight = this.config.minSize;
			jQuery(item).css('display', 'inline-block');
			jQuery(item).css('font-size', ''+weight+'px');
			jQuery(item).css('padding', '0px 5px');
			jQuery(item).css('color', ''+this.colors[parseInt(this._getColor(weight))]);
			if(weight > this.config.weightAVG){
				jQuery(item).css('font-weight', 'bold');
			}
			if(jQuery(item).attr('href')){
				jQuery(item).css('text-decoration', 'none');
			}
		}
	};

	this._setListStyle = function(items){
		for(var i = 0; i < items.length; i++){
			var item = items[i];
			var weight = parseInt(jQuery(item).attr('data-weight'));
			jQuery(item).css('display', 'block');
			jQuery(item).css('font-size', '15px');
			jQuery(item).css('padding', '0px 5px');
			jQuery(item).text('('+((weight < 10) ? '0'+weight : weight)+') '+jQuery(item).text());
			if(weight > this.config.weightAVG){
				jQuery(item).css('font-weight', 'bold');
			}
			if(jQuery(item).attr('href')){
				jQuery(item).css('text-decoration', 'none');
			}
		}
		return this;
	};

	this.print = function(){
		this._setMaxMin();
	};

};
