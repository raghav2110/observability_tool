# Observability Tool

This web application is designed to visualize data in the form of a line chart. The chart represents the number of requests over a specific time period for different endpoints. Users can interact with the chart using filters to customize the displayed data.

### Design Choices

1. Special Endpoint Filtering

    Special endpoint filtering is implemented by adding a special property to the data objects. During data processing, the application filters out only the entries where special is set to true.

    ```
    // Implementation of special endpoint filtering in the code
    filtered = filtered.filter((entry) => entry.special);
    ```

2. Time Range Filtering

    Time range filtering is achieved by allowing users to select a start and end date using a date picker component. When the user selects a date range, the application filters the data to only include entries that fall within the selected range. This filtering ensures that the chart displays data only for the specified time period.

    ```
    // Implementation of time range filtering in the code
    filtered = filtered.filter((entry) => {
        const timestamp = new Date(entry.time);
        return timestamp >= startDate && timestamp <= endDate;
    });
    ```

3. End Point Filtering

    Endpoint filtering allows users to focus on specific endpoints by choosing an endpoint checkbox. When an endpoint is selected, the application filters the data to display only the entries corresponding to the chosen endpoint. This feature enables users to analyze individual endpoints' trends and patterns. By default all end points data are shown.

    ```
    // Implementation of endpoint filtering in the code
    filtered = filtered.filter((entry) => selectedEndpoints.includes(entry.endpoint));
    ```

4. Tooltip Features

    Tooltips are implemented using the Recharts library, which provides built-in tooltip functionality. When a user hovers over a data point, a tooltip displays the exact number of requests for that specific endpoint and date. Recharts handles the tooltip rendering and positioning automatically based on the user's interaction with the chart.

    ```
    // Implementation of tooltips using Recharts in the code
    <Tooltip labelFormatter={formatTooltipTime}/>
    ```

### Usage

* **Date Filter** : Use the date picker to select a specific date or a date range. The chart will display data for the selected date(s).

* **Endpoint Filter** : Select an endpoint to filter data specific to that endpoint.

* **Special Endpoint Filter** : Use to select and show data which has a property of special set True.

### Chart Interactions

* **X-Axis** : Represents the date/time for the data points.

* **Y-Axis** : Represents the number of requests for each endpoint.

* **Hover Tooltip** : Hover over a data point to view the exact number of requests at that specific point.

### Libraries and Technologies Used

* **React** : JavaScript library for building user interfaces.

* **Recharts** : Charting library for creating interactive charts.

* **Date-fns** : Modern JavaScript date utility library.

### Screenshot / Demo of the tool.

* **Home Page** : ![Alt text](https://github.com/raghav2110/observability_tool/blob/main/observability-tool/Images/Initial%20Page.png)
  
* **Date Time Filter** : ![Alt text](https://github.com/raghav2110/observability_tool/blob/main/observability-tool/Images/Date%20Time%20Filter.png)

* **Filter On Endpoint** : ![Alt text](https://github.com/raghav2110/observability_tool/blob/main/observability-tool/Images/Filter%20On%20Endpoint.png)

*  **Filter On Endpoint With Tooltip** : ![Alt text](https://github.com/raghav2110/observability_tool/blob/main/observability-tool/Images/Filter%20On%20Endpoint%20With%20Tooltip.png)

*  **Special Request Filter** : ![Alt text](https://github.com/raghav2110/observability_tool/blob/main/observability-tool/Images/Special%20Request%20Filter.png)
