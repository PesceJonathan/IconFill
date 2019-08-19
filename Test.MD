# Testing your visual
## Test cases
Passed | Test case | Expected Results
------ | --------- | ----------------
 | Create a Stacked column chart with Category and Value, convert to your visual. Convert back to column chart. | No error should appear after these conversions. | Column chart is displayed with no errors in it's original form 
 | Create a Gauge with three measures and convert to your visual.  Convert back to Gauge.  | No error should appear after these conversions. | Gauge is redisplayed in it's original form with no errors
 | Make selections in your visual.  | Other visuals should reflect the selections. | Visual displays a single information, hence no selections can be made
 | Select elements in other visuals.  | Your visual should respond to these selections. Your visual should show filtered data according to selection in other visual. | Icon Filler reflects the selections of other visuals 
 | Some field buckets accept multiple fields, some accept only one, some are conditional based on other buckets.   | Make sure that min/max dataViewMapping conditions are correctly set up in visual's capabilities. | Only one value can be passed to the custom visual at a time as expected
 | Remove all fields in different orders.   | Visual should clean up properly as fields are removed in arbitrary order and there are no errors in the console of the browser. | Can only remove the one field it takes, and it deletes the visual as expected
 | Open the Format Pane with each possible bucket configuration.   | Null reference exceptions should not be triggered. | No exception was triggered
 | Filter data using the filter pane (visual, page and report level), a Slicer and by using a first-party visual (click a pie slice or a column, etc.).   | Tooltips must be correct after applying different types of filters and properly show the filtered value. | Visual does not have a tooltip, but properly reacts to the change of values
 | If cross-filtering is supported.  | Filter should work correctly. Applied selection should filter other visuals on this page of the report. | Visual does not support cross-filtering
 | Test Ctrl, Alt, Shift plus click.   | No unexpected behaviors should appear.| No unexpected behaviors (doesn't react to clicks)  
 | Change the View type to Actual Size, Fit to Page, and Fit to Width.  | Mouse coordinates should be accurate. | Visual does not interact with mouse movements
 | Resize the custom visual. to ensure everything reacts correctly to resize.   | Visual should react correctly to resize. | Resizing the visual works as expected, simply changing the size of the visual
 | Set the report size to minimal.  | There should be no display errors. | No errors appear
 | Scrollbars should exist, if required.  | Ensure scrollbars work correctly. Check scrollbar sizes. Scrollbars should not be too wide or tall. Position and size of scrollbars must be accorded with other elements of your visual. Verify that scrollbars are actually needed for different sizes of the visual. | Scrollbars are not needed for this visual
 | Pin the visual to a Dashboard.  | The visual should display properly. | When pinned, visual is still displayed properly
 | Add multiple versions of the visual to a single report page.  | All versions of the visual should display and operate properly. | Visual works as expected with multiple in the same file 
 | Add multiple versions of the visual to multiple report pages.  | All versions of the visual should display and operate properly. | Multiple versions of the visual works as expected on the same report
 | Switch between pages.  | Verify that the visual is displayed correctly. | Displayed properly while switching pages
 | Test the visual Reading mode and Edit mode.  | All functions should work correctly. | All functions work as expected when in both reading and edit mode 
 | If the visual uses animations test adding, changing and deleting elements of your visual.  | Animation of visual elements works correctly. | Animation for filling works as expected when visual first displayed and when the values are changed
 | Open the property pane and turn properties on and off, type in custom text where applicable, stress the options available, and input bad data.  | The visual should respond correctly. | Invalid url will display an error message to the screen.
 | Save the report and re-open it.  | All properties settings should be persisted. | All properties are persisted when you save the report 
 | Switch pages in the report and then switch back.  | All properties settings should be persisted. | Settings are persistent when switching between pages
 | Test all functionality of the visual including different options which the visual provides.  | All displays and features should work correctly. | All functionalities work the the visual as expected
 | Test all numeric, date, and character data types.  | All data should be formatted properly. | ***Visual should only be used with numeric data that is in percentage***
 | Tooltip values, axis labels, data labels and other visual elements, where values can be formatted,  | All data should be formatted properly. | The data in percentage is properly formatted to be rounded
 | Data labels need to use the format string.  | All data labels are formatted correctly. | No data labels in the visual
 | Tooltips are not required to have formatted values.  | Tooltips display exact values. | No tooltip used in the visual
 | Test with a variety of different data types – numeric, text, date-time, different data volumes (thousands of rows, 1 row, 2 rows, etc.), and different format strings from the model.  | All displays and features should work correctly. |  ***Visual should only be used with numeric data that is in percentage***
 | Provide bad data to the visual (null, infinity, negative values, wrong value types, etc.).  | All displays and features should work correctly. | Will display the visual and interpret invalid numbers to be 100%

## Browser Testing - Optional
Passed | Test case | Expected Results
------ | --------- | ----------------
 | **Windows** | 
 | Chrome (previous version) | All displays and features should work correctly. | Yes
 | Firefox (previous version) | All displays and features should work correctly.
 | Edge (previous version) | All displays and features should work correctly.
 | Internet Explorer 11 (Optional) | All displays and features should work correctly. 
 | **MacOS** | 
 | Chrome (previous version) | All displays and features should work correctly. 
 | Firefox (previous version) | All displays and features should work correctly. 
 | Safari (previous version) | All displays and features should work correctly. 
 | **Linux** | 
 | Firefox (latest and previous version) | All displays and features should work correctly. 
 | **Mobile iOS** |
 | Safari iPad (previous Safari version) | All displays and features should work correctly. 
 | Chrome iPad (latest Safari version) | All displays and features should work correctly. 
 | **Mobile Android** | 
 | Chrome (previous version) | All displays and features should work correctly. 

## Desktop Testing 
Use the currently released Power BI Desktop version (Download [here](https://powerbi.microsoft.com/en-us/desktop/)).

Passed | Test case | Expected Results
------ | --------- | ----------------
 | Test all features of the visual. | All displays and features should work correctly. 
 | Import, save, file open, and publish to the Power BI web service by using the Publish button the Desktop application. | All displays and features should work correctly.  
 | Change the numeric format string to have zero decimal places or 3 decimal places by increasing/decreasing the precision. | The visual should display correctly. 
 
## Performance Testing 
Passed | Test case | Expected Results
------ | --------- | ----------------
 | Create a visual with many visual elements. | The visual should perform well – no issues (animation speed, resizing, filtering, selecting, etc.). 
 | Use dev tools to validate performance, do not simply rely on visual cues and the console time logs. | Performance should be on acceptable level. Visual should not freeze application
