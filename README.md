# daily - a series of almost-daily projects.


## 2021-4-15
### Technologies
* Javascript
* HTML/CSS
* NodeJS
* ThreeJS
* Webpack
* dat.gui
### Resources and details
I was inspired to do this by Gary Simon of DesignCourse's series on ThreeJS over on YouTube. 
_The Map_
The Map of San Antonio was generated by capturing a about 15 higher-res images from Google Earth with labels turned off. I then stitched it together in Gimp and exported it as a PNG. The elevation was generated by using the height data from Tangram's heightmapper to capture the location I was using and setting that as my displacement map in ThreeJS. Then an alpha map was generated in Gimp with a big-ass soft brush right in the middle of a 200x200 square. 

[The Texture Map](https://githubphotos.s3.amazonaws.com/texture.png) is too big to post in this markdown file but you can see it there. 

_Displacement Map_

![The Displacement Map](https://githubphotos.s3.amazonaws.com/displacement.png)

_Alpha Map_

![The Alpha Map](https://githubphotos.s3.amazonaws.com/alpha.png)
