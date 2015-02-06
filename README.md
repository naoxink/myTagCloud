# myTagCloud
Print your tags :)

# First of all
[Demo here](http://naoxink.hol.es/myTagCloud/)

# Second
Info: You can configure a lot of options inside the code, they are prepared to be merged with another object (in the future)

# Quick tutorial
```javascript
// Create an object over a div selection
var myTagCloud = new tagCloud("#myDiv");

// Add the tags
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

// Also you can print the cloud in 'list mode' creating the object like:
var myTagCloud = new tagCloud("#myDiv", "list");
```
# TODO list
- [ ] Possibility of passing an options object to the constructor
- [ ] Merge options object with default options
- [ ] Possibility of sorting tags
- [ ] Remove jQuery dependency
