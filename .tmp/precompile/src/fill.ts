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

module powerbi.extensibility.utils {
    "use strict";
    export class fill {

        /**
         * Generates a fill colour that will either be a single colour or a saturation of a colour and will
         * append it to the given container.
         * 
         * @param fillOrientation Orientation of the fill (horizontal or vertical)
         * @param colour The colour that the fill should be
         * @param isSaturated Boolean representing if the fill should be saturated (going from light to dark)
         * @param container Container for the gradiant to be appened into
         */
        public generateFillColour(fillOrientation, colour, isSaturated, container) {
            //Determine the orientation of the gradiant and then depending on which colours are chosen create the proper gradiant
            var rotate = (fillOrientation === "horizontal") ? 0 : 90;

            if (isSaturated) {
                this.generateGradiant([10, 40, 70], [d3.hsl(colour).brighter(0.5), colour, d3.hsl(colour).darker(0.5)], rotate, container)
            } else {
                this.generateGradiant([0], [colour], 0, container);
            }
        }

        /**
         * Generates and appends a gradiant fill, based on the colours and the gradiant percents given,
         * into the given container to be used.
         * 
         * @param fillOrientation Orientation of the fill (horizontal or vertical
         * @param gradientPercents Percents at which the gradiant completly switches a colour
         * @param gradientColours The colours that the gradiant will switch to
         * @param container Container that the gradiant will be appened to
         */
        public generateGradiantFill(fillOrientation, gradiantPercents, gradientColours, container) {
            var rotate = (fillOrientation === "horizontal") ? 0 : 90;

            this.generateGradiant(gradiantPercents, gradientColours, rotate, container);
        }

        /**
        * This function will generate the glinear gradient that will be used to fill up
        * the icon. As parameters, it takes in an array of offset percentages and 
        * an array of colours, as well as a rotate value to rotate it clockwise.
        * 
        * @param percentagePoint Array of the percentage points for the offset of the gradiants
        * @param colours Array of the colours to add within the gradiants
        * @param rotate Degree in order to rotate the gradiant (used to rotate vertically)
        * @param container SVG element for the gradiant to be appended into
        */
        private generateGradiant(percentagePoint, colours, rotate, container) {
            container.selectAll("#gradientContainer").remove();

            var gradient = container.append("defs")
                .attr("id", "gradientContainer")
                .append("linearGradient")
                .attr("id", "gradientColour");

            for (var i = 0; i < percentagePoint.length; i++) {
                gradient.append("stop")
                    .attr("offset", percentagePoint[i] + "%")
                    .attr("stop-color", colours[i]);
            }

            if (rotate === 90) {
                //If necessary rotates the gradiant
                gradient.attr("y1", "100%")
                    .attr("x2", 0)
                    .attr("gradientUnits", "userSpaceOnUse");
            } else {
                //If necessary rotates the gradiant
                gradient.attr("y1", 0)
                    .attr("x2", "100%")
                    .attr("gradientUnits", "userSpaceOnUse");
            }

        }
    }
}