# C.js 
 JavaScript library for drawing figures and diagrams in blog or articles
## Get started
 Download [C.complete.min.js](https://github.com/Roopesh2/C.js/blob/master/C.complete.min.js) and link it to your html file.
 ### Boilerplate
 C is simple.
 ```javascript
C (
  containerElement,
  drawFunction,
  [configs]
);
```
 ### Argumets
 Well it's not noting more than 3.
 #### 1<sup>st</sup>: containerElement
   The element name in which the canvas (HTML5 Canvas Element) is added.
   You'd better not to add any HTML to this container.
   But you acn apply styles to this.
 #### 2<sup>nd</sup>: drawFunction
   Most Important one. Here in this function you will add all codes to draw something on the canvas.
 #### 3<sup>rd</sup>: configs
   Configuration object which contains all about canvas and can be used to manipulate canvas
   contains:
* ```width``` width of canvas. Default: width of screen.
* ```height``` height of canvas
* ```aspectRatio``` array representing ratio between width and height. Only works when height is not defined. Default value : ```[16:9]```.
* ```autoPLay``` if you have animated drawing in your function you can specify whether to start it when page loads or not. If you don't want to start when page loads set it's value to ```false```. Default is ```true```.
* ```thumbnail``` when you set ```autoPlay``` to false a blank canvas will appear with a play button in it. You can specify what to show at this time by ```thumbnail```. Put the code to draw in a function and set it to thumbnail in the config object.

## Inside drawFunction (Documentation)
 Documentation are comming soon.

## Addons
 A great thing which everyone loves - addon. You can add addon and use it easly in C. 
 ### Creating an addon
 Wrap your all functions in a object and pass it to ```addCExtension``` function, like this:
 ```javascript
 addCExtension({
   myExtFunction1: function (args) {...},
   myExtFunction2: function (args) {...},
   myExtFunction3: function (args) {...},
   ...
 })
 ```
 
 ### Using addons
  To use addons call it inside your ```drawFunction```.
  and don't forget to put a ```this.``` before calling a function.
  eg. :
  ```javascript
    C (container,
      function () {
        this.myExtFunction1(...);
      },
      {...}
    );
  ```
### Publish
 Is your addon is Useful? Add it to our ```Extenstions``` folder by opening a pull request. 
 > Note: Test your addon before publishing.
