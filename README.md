# PowerBiCustomVisual: Icon Fill

## Description

This custom visual was created in order to take any icon (that is in SVG format) and use it to help display a percentage in a report by filling in the icon by that percent. The icons must be hosted on the internet (and not on a local file) with the url provided. 

![alt text](https://github.com/PesceJonathan/PowerBiCustomVisual/blob/master/iconFill/assets/example.png)

## Customization

### Icon
The icon can be any SVG element that is hosted on the internet. To change the icon, simply go in the format options under Image tab. Then replace the value in the "URL to image" text box to be the url to the icon you would like to be displayed.

### Fill 
The fill can be customized in order to match and best represent the data you want visualized. In formatting options, under Fill, you have the option to change the colour of the fill, toggle on a saturation for the fill (make the colours start from light and move to a darker colour as it fills up) and choose in which orientation the icon should be filled (bottom to top (vertically) or left to right (horizontally)).

![alt text](https://github.com/PesceJonathan/PowerBiCustomVisual/blob/master/iconFill/assets/saturation.png)

### Display Percentage
The issue with displaying the percentage in a fixed location is that depending on the icon, the display may be hidden or look off. For that reason and a lack of a better solution, the display percentage can be moved using the percentage of the X-Axis and the Y-Axis (ex: X Position: 50 => 50% from the left). The display can also be toggled on and off, have it's colour changed and have it's font size changed.

### Animation
The animation for the fill is automatically set to 3 sec (3000 ms). This means that it will take 3 sec for the icon to be filled to it's appropriate percentage. To change the time, change the time set under the animation tab in the formatting options.

### Gradiant
The gradiant tab allows to switch from a single colour fill to a multiple colour fill as a gradiant. The gradiant can allow for multiple colours to help better demonstrate the positivity or negativity that comes with the value being displayed.

![alt text](https://github.com/PesceJonathan/PowerBiCustomVisual/blob/master/iconFill/assets/iconFillGradiant.PNG)

### Diverging
The diverging tab allows the icon to be filled by a single colour, but the colour will be determined based on the value being displayed. The colour will be based on 3 inputed colours, and depending where the value being represented falls, the visualization will determine the colour that will best represent the data.

![alt text](https://github.com/PesceJonathan/PowerBiCustomVisual/blob/master/iconFill/assets/iconFillDiverging.PNG)

## Installation Process
If you clone this repository, you will not have any of the dependencies necessarry to run the code. In order to download those dependencies, you must enter the following commands:

```bash
npm install 
```
