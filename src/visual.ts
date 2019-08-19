/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    "use strict";
    export class Visual implements IVisual {
        private svg: d3.Selection<SVGElement>;
        private container: d3.Selection<SVGElement>;
        private visualSettings: VisualSettings;
        private percentageText: d3.Selection<SVGElement>;
        private clipPathUrl: string;
        private icon: powerbi.extensibility.utils.icon;
        private heightChange: boolean;
        private clipPath: d3.Selection<SVGElement>;
        private previousFillOrientation: string;

        /**
         * Constructor will simply grab the svg element canvas and will
         * generate a container and text field used to display the visualization
         */
        constructor(options: VisualConstructorOptions) {
            this.svg = d3.select(options.element)
                .append('svg');

            this.container = this.svg.append("g");

            this.percentageText = this.svg.append("text")
                .classed("textValue", true);

            this.clipPathUrl = "iconClipPath";
            this.heightChange = true;
            this.icon = null;
            this.clipPath = null;
        }

        /**
         * Function created by microsoft which is the boiller code for retrieving the VisualSettings that
         * are set for the visualization
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
            const settings: VisualSettings = this.visualSettings ||
                VisualSettings.getDefault() as VisualSettings;
            return VisualSettings.enumerateObjectInstances(settings, options);
        }

        /**
         * Update function is called everytime that the visualization is updated, either
         * because the size has changed of the element or that certain formatting options
         * have been changed. This is the function responsible for drawing the new elements
         * to the screen.
         */
        public update(options: VisualUpdateOptions) {
            //Retrieve the data view in order to retrieve the visual settings
            let dataView: DataView = options.dataViews[0];
            this.visualSettings = VisualSettings.parse<VisualSettings>(dataView)

            //Retrieve the height and width of the view port and set the svg canvas to that size
            let width: number = options.viewport.width;
            let height: number = options.viewport.height;

            //If the dimensions change or the fill orientation, then we need to redraw
            if (this.svg.attr("height") === "" + height && this.svg.attr("width") === "" + width) {
                this.heightChange = false;
            } else {
                this.heightChange = true;
            }

            this.svg.attr({
                width: width,
                height: height
            });

            //Remove all of the already drawn icons from the screen
            this.svg.selectAll(".removable").remove();

            var self = this;

            //Retrieve the percentage
            var percentage = dataView.single.value as number;

            //Append the icon clipping then give it the draw function as the callback function
            if (this.icon === null || this.icon.isNewSource(this.visualSettings.image.url)) {
                this.icon = new powerbi.extensibility.utils.icon(this.visualSettings.image.url);
                this.heightChange = true;
            }

            this.icon.appendImageClipping(this.container, this.clipPathUrl, function () {
                self.draw(width, height, percentage, self.icon.svg);
            }, this.svg);
        }

        public draw(width, height, percentage, iconSvg) {
            //Add the gradiant Fill
            this.addGradiantFill(iconSvg, percentage);

            //Draw the clip path
            this.drawClipPath(percentage, this.visualSettings.animation.duration, width, height);

            if (this.heightChange) {
                d3.select("#image").remove();

                //Draws the image onto the container with the height and width of the SVG element
                this.container.append('image')
                    .attr("id", "image")
                    .attr('xlink:href', this.visualSettings.image.url)
                    .attr('width', width)
                    .attr('height', height);
            }

            //Draw the text to the screen
            this.drawTextOnScreen(width, height, percentage);
        }

        /**
        * This function is responsible for drawing the clipPath used in order to display
        * the percentage of the icon. Depending on the formatting options, it may draw it
        * vertically, horizontally or as an arc (for display like time).
        * 
        * @param percentage Percentage of the icon that should be displayed
        * @param animatationTime Time that should be taken for the icon to be displayed
        */
        private drawClipPath(percentage, animatationTime, width, height) {
            var imageClipping = (d3.select("#imageClipping")[0][0] as any).getBBox();

            var rectangleStartX = (width - imageClipping.width) / 2;
            var rectangleStartY = (height - imageClipping.height) / 2;

            if (this.clipPath === null) {
                this.clipPath = this.svg.append("clipPath")
                    .attr("id", "iconClipPath");
            }

            if (this.heightChange || this.visualSettings.fill.orientation !== this.previousFillOrientation) {
                this.heightChange = true; //Set so it gets redrawn
                d3.select("#rectangle").remove();
            }

            //Creates and draws the clip path that is used to represent the filling of the icon.
            if (this.visualSettings.fill.orientation === "clockwise") {
                d3.select("#rectangle").remove();

                //Draws the clip art as an arc
                var arc = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(width)
                    .startAngle(0)
                    .endAngle(Math.PI * 2 * percentage);

                this.clipPath.append("path")
                    .attr("id", "rectangle")
                    .attr("d", <any>arc)
                    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");
            } else if (this.visualSettings.fill.orientation === "horizontal") {

                //If the height changed or orientation, complete restart the drawing of the clippath
                if (this.heightChange) {
                    var startX = rectangleStartX - (width - (rectangleStartX * 2)) * percentage;

                    this.appendRectangleToClipPath(this.clipPath, (height - (rectangleStartY * 2)),
                        (width - (rectangleStartX * 2)) * percentage, rectangleStartX, rectangleStartY, animatationTime);
                } else {
                    //If the clip-path still exist then just change it's value
                    d3.select("#rectangle").transition()
                        .duration(500)
                        .attr({
                            width: (width - (rectangleStartX * 2)) * percentage
                        });
                }
            } else {
                var recHeight = (height - (rectangleStartY * 2));
                var yPos = rectangleStartY + (imageClipping.height * (1 - percentage));

                //If the height changed or orientation, complete restart the drawing of the clippath
                if (this.heightChange) {
                    this.appendRectangleToClipPath(this.clipPath, recHeight,
                        width - (rectangleStartX * 2), rectangleStartX, yPos, animatationTime);
                } else {
                    //If the clip-path still exist then just change it's value
                    d3.select("#rectangle").attr("x", rectangleStartX).transition()
                        .duration(500)
                        .attr({
                            y: yPos
                        });
                }

            }

            //Store the orientation of the icon fill
            this.previousFillOrientation = this.visualSettings.fill.orientation;
        }

        /**
         * Creates the rectangle that is appened to the clipPath based on all of the attributes given into the 
         * function.
         * 
         * @param clipPath ClipPath for the rectangle to be appended to.
         * @param startXPosition The startXPosition of the rectangle (where the animation will start) 
         * @param startYPosition The startYPosition of the rectangle (where the animation will start)
         * @param recHeight The height of the rectangle
         * @param recWidth the width of the rectangle
         * @param endXPos The end position of the rectangle (after the animation)
         * @param endYPos The end Y position of the rectangle (after the animation)
         * @param animatationTime The time it takes for the animation of filling up to complete
         */
        private appendRectangleToClipPath(clipPath, recHeight, recWidth, xPos, yPos, animatationTime) {
            var startHeight = 0;
            var startWidth = 0;
            var endY = yPos;

            if (this.visualSettings.fill.orientation === "horizontal") {
                startHeight = recHeight;
            } else {
                startHeight = recHeight;
                startWidth = recWidth;
                yPos += recHeight;
            }

            clipPath.append("rect")
                .attr("id", "rectangle")
                .attr("x", xPos)
                .attr("y", yPos)
                .attr("height", startHeight)
                .attr("width", startWidth)
                .transition()
                .duration(animatationTime)
                .attr({
                    width: recWidth,
                    height: recHeight,
                    y: endY
                });
        }

        /**
         * If percent text is toggled on, the function will determine the font size, either programatically
         * or through the formatting option, and will then draw the text on the screen and set the text
         * to be visible.
         * 
         * @param width Width of the screen
         * @param height Height of the screen
         * @param percentage Percentage to be displayed in text form
         */
        private drawTextOnScreen(width, height, percentage) {
            //If percent text is set to off, then don't show it
            if (this.visualSettings.percentageText.show === true) {
                this.percentageText.style("visibility", "visible");

                //Set font size then draw the text onto the screen
                let fontSizeValue: number;
                if (this.visualSettings.percentageText.fontSize !== 0) {
                    fontSizeValue = this.visualSettings.percentageText.fontSize;
                } else {
                    fontSizeValue = Math.min(width, height) / 5;
                }


                this.percentageText
                    .text((Math.round(percentage * 10000) / 100) + "%")
                    .attr({
                        x: this.visualSettings.percentageText.xPos + "%",
                        y: this.visualSettings.percentageText.yPos + "%",
                        dy: "0.35em",
                        "text-anchor": "middle"
                    }).style("font-size", fontSizeValue + "px")
                    .style("stroke", this.visualSettings.percentageText.color)
                    .style("fill", this.visualSettings.percentageText.color);
            } else {
                this.percentageText.style("visibility", "hidden");
            }
        }

        /**
         * Adds the gradiant fill based on the formatting options that are provided by Power BI.
         */
        private addGradiantFill(iconSvg, percentage) {
            //Generate the gradiant colour that will be used to colour the fill of the icon
            var fill = new powerbi.extensibility.utils.fill();
            if (this.visualSettings.gradiant.show === true) {
                var gradiantProperties = this.visualSettings.gradiant;

                fill.generateGradiantFill(this.visualSettings.fill.orientation,
                    [gradiantProperties.gradiantPercent1, gradiantProperties.gradiantPercent2, gradiantProperties.gradiantPercent3],
                    [gradiantProperties.colour1, gradiantProperties.colour2, gradiantProperties.colour3],
                    iconSvg);
            } else if (this.visualSettings.diverging.show === true) {
                //This will take care of the diverging colours (colour represents the data)
                var diverging = this.visualSettings.diverging;
                var linear = d3.scale.linear()
                    .domain([diverging.minValue,
                    diverging.centerValue,
                    diverging.maxValue])
                    .range([
                        diverging.startColor,
                        diverging.centerColor,
                        diverging.endColor
                    ] as any);
                fill.generateFillColour(this.visualSettings.fill.orientation, linear(percentage), false, iconSvg);
            } else {
                var fillProperties = this.visualSettings.fill;

                fill.generateFillColour(fillProperties.orientation, fillProperties.colour, fillProperties.saturation, iconSvg);
            }
        }
    }
}
