/*
 *  Power BI Visualizations
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

module powerbi.extensibility.visual.iconFiller316E184D50974591813CF51F3E87A0DDS  {
  "use strict";
  import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;

  export class Animation {
    public duration: number = 3000;
  }

  export class Image {
    public url: string = "https://image.flaticon.com/icons/svg/259/259502.svg";
  }

  export class Gradiant {
    public show: boolean = false;
    public colour1: string = "#FF1403";
    public colour2: string = "#FCFF11";
    public colour3: string = "#1DFF00";
    public gradiantPercent1: number = 5;
    public gradiantPercent2: number = 55;
    public gradiantPercent3: number = 80;
  }

  export class Diverging {
    public show: boolean = false;
    public startColor: string = "#FF1403";
    public centerColor: string = "#FCFF11";
    public endColor: string = "#4C9A2A";
    public minValue: number = 0.15;
    public centerValue: number = 0.5;
    public maxValue: number = 1;
  }

  export class PercentageText {
    public xPos: number = 50;
    public yPos: number = 90;
    public fontSize: number = 0;
    public color: string = "black";
    public show: boolean = true;
  }

  export class Fill {
    public colour: string = "red";
    public saturation: boolean = false;
    public orientation: string = "horizontal";
  }

  export class VisualSettings extends DataViewObjectsParser {
    public image: Image = new Image();
    public gradiant: Gradiant = new Gradiant();
    public percentageText = new PercentageText();
    public animation = new Animation();
    public fill = new Fill();
    public diverging = new Diverging();
  }
}
