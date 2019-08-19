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
    export class icon {
        private iconPaths = [];
        public viewBox;
        private imageUrl;
        public svg;

        /**
         * Constructor will take in the url to the image, retrieve the SVG elements information for it
         * and store the paths that are used to create the icon and the viewBox that it is contained in.
         * 
         * Note: Viewbox is used in order to keep the dimensions of the icon
         * 
         * @param imageUrl URL to the SVG element to be loaded as the icon
         */
        constructor(imageUrl) {
            this.imageUrl = imageUrl;
            this.viewBox = null;
            this.iconPaths = [];
        }

        /**
         * Returns true if the new url is not the same as the one already stored in imageUrl 
         * and returns false otherwise
         * 
         * @param stringUrl The current url for the image
         */
        public isNewSource(stringUrl) {
            return !(stringUrl === this.imageUrl);
        }

        /**
         * Parse the svg element in order to retrieve the paths used to create the svg element and 
         * retrieve the viewbox that the paths are maintained in.
         * 
         * @param svgData The SVG elements that compose the icon
         */
        private parseSVGData(svgData) {
            //Loop through all the paths and remove all the m's from them (making them fill themselves in)
            var paths = svgData.getElementsByTagName("path");
            for (var i = 0; i < paths.length; i++) {
                this.iconPaths.push("m" + paths[i].getAttribute("d").replace(/m|M/g, " "));
            }

            this.viewBox = svgData.getAttribute("viewBox");
        }

        /**
         * Draws the image clipping (the SVG element that will be used to clip the percentage display to be morphed into
         * the icon) in the given container with the given clipPathUrl.
         * 
         * @param container SVG container for the image clipping to be appended into
         * @param clipPathUrl URL to the clip path that will be clipped to the image clipping
         */
        private drawIconAsImageClipping(container, clipPathUrl) {
            d3.selectAll("#imageClipping").remove();

            this.svg = container.append("g")
                .attr("id", "imageClipping")
                .attr("clip-path", "url(#" + clipPathUrl + ")")
                .append("svg")
                .attr("viewBox", this.viewBox)
                .attr("x", 0)
                .attr("y", 0)
                .style("fill", "url(#gradientColour)");


            this.iconPaths.forEach(path => {
                this.svg.append("path")
                    .attr("d", path);
            });
        }

        public appendImageClipping(container, clipPathUrl, callbackFunction, svgContainer) {
            var self = this;

            //Don't reload the image if it is already loaded and saved
            if (this.viewBox === null && this.iconPaths.length === 0) {
                /**
                 * This snippet of code will retrieve the SVG element as an svg element and not an image. It will
                 * then deconstruct it to retrieve all of the paths that are used to create the icon. We then use
                 * that information in order to create a clip path that will morph/shape the shape being used to represent
                 * the percentage of the data value into the svg image.
                 */
                d3.xml(this.imageUrl).mimeType("image/svg+xml").get(function (error, xml) {
                    if (error === null) {
                        var svg = xml.documentElement;
                        self.parseSVGData(svg);
                        self.drawIconAsImageClipping(container, clipPathUrl)
                        callbackFunction();
                    } else {
                        d3.selectAll("removable").remove();
                        d3.selectAll("#imageClipping").remove();
                        d3.select("#image").remove();

                        svgContainer.append("text")
                            .text("Invalid Image URL")
                            .attr({
                                x: "50%",
                                y: "50%",
                                dy: "0.35em",
                                "text-anchor": "middle"
                            }).style("font-size", "30px")
                            .style("stroke", "black")
                            .style("fill", "black")
                            .classed("removable", true);
                    }
                });
            } else {
                callbackFunction();
            }
        }

    }
}