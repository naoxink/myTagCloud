# myTagCloud
Print your tags :)

# First of all
[Demo here](http://naoxink.ga/myTagCloud/)

# Lightning example
`tagCloud( container [, options])`
```javascript
var myTagCloud = new tagCloud("#myDiv", {
	maxSize: 30,
	minSize: 10
});
```

**Configurable options**

Option|Type|Description
---|---|---
`listMode`|Boolean|Enable/Disable list mode
`itemsTag`|String|HTML tag of the items
`itemsClass`|String|CSS class of the items
`containerID`|String|ID of the container
`minSize`|Number|Minimum font size (Pixels)
`maxSize`|Number|Maximum font size (Pixels)

# Quick tutorial
```javascript
// Create an object over a div selection
var myTagCloud = new tagCloud("#myDiv");

// Add the tags (Text, Weight, URL)
myTagCloud.addTag('Something', 120, 'http://www.google.es');

// Or you can put an array of tags like this:
var myTags = [
  {
  	"label": "Something",
  	"weight": 120,
  	"link": "http://www.google.es"
  },
  {
  	"label": "Something else",
  	"weight": 100,
  	"link": "http://www.yahoo.es"
  },
];
myTagCloud.setTags(myTags);

// You can add more colors to the set
myTagCloud.addMaxColor('#f00');
myTagCloud.addMinColor('#EEE');

// Finally print it :)
myTagCloud.print();

// [TIP] You can chain methods like:
myTagCloud.addTag('Something', 120, 'http://www.google.es').addMaxColor('#F00').print();

```
# TODO list
- [x] Possibility of passing an options object to the constructor
- [x] Merge options object with default options
- [x] Possibility of sorting tags
- [ ] Remove jQuery dependency
- [x] Color schema from a single color
- [x] Change color schema
- [ ] Fix problem when printing a TON of tags
