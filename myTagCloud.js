function tagCloud(boardSelector){

    this.boardSelector = boardSelector;
    this.colors = ['#9CCDEB', '#9FD7F6', '#77C0F9', '#3886C2', '#346EA6'];
    this.maxWeight = 0;
    this.minWeight = 0;
    this.listMode = arguments[1] == 'list' ? true : false;
    this.hexRange = '0123456789ABCDEF';
    this.config = {
        "itemsTag": "span",
        "itemsClass": "myTagCloudItem",
        "containerID": "tagCloud",
        "weightAVG": 0,
        "minSize": 15,
        "maxSize": 60
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

    this.setColors = function(colorArray){
        for(var i = 0; i < colorArray.length; i++){
            if(!this._isHex(colorArray[i])){
                console.error(colorArray[i] + 'is not a valid hex color');
                return false;
            }
            this.colors = colorArray;
            return this;
        }
    };

    this.setColorsFrom = function(hex, qty){
        if(this._isHex(hex)){
            this.colors = this._calculateScale(hex, qty);
            return this;
        }else{
            console.error(hex + ' is not a hex color');
            return false;
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

    this.orderElements = function(method){
        var elements = jQuery('.' + this.config.itemsClass);
        var i;
        var orderedElements = [];
        for(i = 0; i < elements.length; i++){
            var item = {
                "weight": jQuery(elements[i]).attr('data-weight'),
                "element": jQuery(elements[i])
            };
            orderedElements.push(item);
        }
        orderedElements = this._sortElements(orderedElements, method);
        jQuery('#'+this.config.containerID).html('');
        for(i = 0; i < orderedElements.length; i++){
            jQuery('#'+this.config.containerID).append(orderedElements[i].element);
        }
        return this;
    };

    this.print = function(){
        this._setMaxMin();
    };

    ////////////////////////
    //   PRIVATE methods  //
    ////////////////////////
    this._calculateWeightAVG = function(tags){
        var SUM = 0;
        for(var i = 0; i < tags.length; i++){
            SUM += parseInt(jQuery(tags[i]).attr('data-weight'));
        }
        this.config.weightAVG = SUM / tags.length;
        this._setItemStyles();
    };

    this._getColor = function(weight){
        // TODO: Comprobar que este algoritmo funciona bien en todos los casos
        // return (weight / this.config.maxSize * this.colors.length) - 1;
        return (weight / this.maxWeight * this.colors.length) - 1;
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
        var max, min;
        var selector = '#'+this.config.containerID+' .'+this.config.itemsClass;
        var tags = jQuery(selector);
        min = jQuery(tags[0]).attr('data-weight');
        max = jQuery(tags[0]).attr('data-weight');
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
            jQuery(tag).attr('data-size', newWeight);
        };
        this._calculateWeightAVG(tags);
    };

    this._checkWeight = function(weight){
        // var aux = (weight / (this.maxWeight - this.minWeight)) * this.config.maxSize;
        // if(aux < this.config.minSize){
        //     aux = this.config.minSize;
        // }
        return ((weight / this.maxWeight) * (this.config.maxSize - this.config.minSize)) + this.config.minSize;
        // return aux;
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
            var size = jQuery(item).attr('data-size');
            var weight = jQuery(item).attr('data-weight');
            if(size > this.config.maxSize) size = this.config.maxSize;
            if(size < this.config.minSize) size = this.config.minSize;
            jQuery(item).css('display', 'inline-block');
            jQuery(item).css('font-size', ''+size+'px');
            jQuery(item).css('padding', '0px');
            jQuery(item).css('padding-right', '0.3em');
            jQuery(item).css('vertical-align', 'middle');
            jQuery(item).css('color', ''+this.colors[parseInt(this._getColor(weight))]);
            if(size > this.config.weightAVG){
                jQuery(item).css('font-weight', 'bold');
            }
            if(jQuery(item).attr('href')){
                jQuery(item).css('text-decoration', 'none');
            }
        }
        // Houston, we have a memory problem if we have a lot of tags :(
        // this._cloudSort();
    };

    this._setListStyle = function(items){
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            var weight = parseInt(jQuery(item).attr('data-size'));
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

    this._calculateScale = function(midhex, qty){
        var colors = [];
        var steps = (qty) ? (qty / 2) - 1 : 2;
        var jumps = 1;
        var i;
        // lighter
        for(i = 0; i < steps; i++){ colors.push(this._hexUp(midhex, i+jumps)); }
        colors.reverse(colors);
        colors.push(midhex);
        // darker
        for(i = 0; i > (steps*-1); i--){ colors.push(this._hexDown(midhex, i-jumps)); }
        return colors;
    };

    this._hexUp = function(hex, steps){
        var hexPieces = hex.replace('#', '').split('');
        for(var i = 0; i < hexPieces.length; i++){
            var part = this.hexRange.charAt( this.hexRange.indexOf(hexPieces[i]) + steps );
            if(!part){ part = this.hexRange.charAt(this.hexRange.length-1); }
            hexPieces[i] = part;
        }
        return '#' + hexPieces.join('');
    };

    this._hexDown = function(hex, steps){
        var hexPieces = hex.replace('#', '').split('');
        for(var i = 0; i < hexPieces.length; i++){
            var part = this.hexRange.charAt( this.hexRange.indexOf(hexPieces[i]) + steps );
            if(!part){ part = this.hexRange.charAt(0); }
            hexPieces[i] = part;
        }
        return '#' + hexPieces.join('');
    };

    this._sortElements = function(array, method){
        switch(method){
            case 'desc':
                array.sort(function(a,b) { return parseFloat(b.weight) - parseFloat(a.weight) } );
                break;
            case 'asc':
                array.sort(function(a,b) { return parseFloat(a.weight) - parseFloat(b.weight) } );
                break;
            default:
                array.sort(function(a,b) { return parseFloat(b.weight) - parseFloat(a.weight) } );
                break;
        }
        return array;
    };

    this._cloudSort = function(){
        var items = jQuery('.' + this.config.itemsClass);
        var res = [];
        var i = 0;
        var containerWidth = jQuery('#' + this.config.containerID).width();
        var freeSpace = containerWidth;
        var itemWidth;

        while(i < items.length){
            itemWidth = jQuery(items[i]).outerWidth();
            var fits = this._getWhichFits(items, freeSpace);
            if(!fits){
                // reset
                freeSpace = containerWidth;
            }else{
                res.push(fits.item);
                items.splice(fits.index, 1);
                freeSpace -= fits.width;
            }
        };
        jQuery('#' + this.config.containerID).html(res);
    };

    this._getWhichFits = function(items, freeSpace){
        for(var x = 0; x < items.length; x++){
            var itemWidth = jQuery(items[x]).outerWidth();
            if(itemWidth < freeSpace){
                return { "item": items[x], "index": x, "width": itemWidth };
            }
            if(x == items.length){ return false; }
        }
    };

    return {
    	'addTag': addTag,
		'addMaxColor': addMaxColor,
		'addMinColor': addMinColor,
		'setColors': setColors,
		'setColorsFrom': setColorsFrom,
		'setTags': setTags,
		'orderElements': orderElements,
		'print': print
    }

};
