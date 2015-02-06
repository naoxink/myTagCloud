# myTagCloud
Print your tags :)

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
```
