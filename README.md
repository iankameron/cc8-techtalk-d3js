# Visualizing Open Data using Python and D3.js

This repo contains visualizations of Fukushima population and radiation data that is stored herein.

A presentation of these materials can be found on [Youtube](https://youtu.be/9T32qNmWg8E?t=6225).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

A "modern" browser (supporting SVG images and JavaScript) is really all you need.
I have not checked to see what compatibilities are.

### Installing

Just fork and clone locally! Copy the path of the HTML files into your browser to see the magic.

The World Blots example can only be seen when served. This repository has a simple Express server included, and can be run using the following to install dependencies and start the server.
```
yarn install
yarn start
```

## What's in the Repository

### HTML files
- index.html - D3 Test Bed
  - My first experiments with D3, following loosely the [Curran Kelleher tutorial on YouTube](https://www.youtube.com/watch?v=8jvoTV54nXw).
- index2.html - "World Blots"
  - Major cities plotted on a blank SVG canvas, using their latitude, longitude, and population mapped to a radius.
  - Created while studying D3, again following this [tutorial](https://www.youtube.com/watch?v=8jvoTV54nXw).
- index3.html - Population and Population Change Fukushima 1999 - 2018
  - Displays population circles on a map of Fukushima. Data scraped from Excel data found on the Fukushima Prefecture website. (see [my Python repo](https://www.github.com/iankameron/cc8-techtalk-python) for that.)
- index4.html - Safecast Radiation Counts Fukushima 2011 - 2018
  - Displays radiation counts in a pseudo-3D style on a map of Fukushima. Data retrieved from [Safecast API](https://api.safecast.org/) and processed/optimized for the visualization (see "Other JS files" below). For the program that made these API calls, again see [my Python repo](https://www.github.com/iankameron/cc8-techtalk-python).
- index5.html - Safecast Radiation Counts Fukushima 2011 - 2018
  - Similar to index4, with the following differences
    - Data was retrieved on a finer grid and is denser on the map
    - Data for most time points is incomplete (only N Fukushima covered)

### Other JS files (that aren't tied directly to HTML)

- build/util
  - pythtojs.js: code to transform data extracted from the Safecast API into a Javascript form so it can be used in this repo. Python code to get data from Safecast can be found [here](https://www.github.com/iankameron/cc8-techtalk-python).
  - split_radiation.js: JS code to split radiation data contained in one array into a hash map (key: date, value: array of data for that date). This is used because the code for each web page loads data for a specific time point by getting it's array from the hash map (faster than filtering the data each time). Sample input and output for this file are as follows. Input:
  ```
  [{date1, lat1, long1, data1},
   {date1, lat2, long2, data2},
   {date2, lat3, long3, data3},
   ...]
  ```
  Output:
  ```
  {date1:[{lat1, long1, data1},
          {lat2, long2, data2}],
   date2:[{lat1, long1, data1},
          ...]
  }
  ```
## Deployment

This repository contains a simple HTTP server (Express) that statically serves the "build" folder on localhost:9000.
* Note: the index2.html page uses the d3.dsv method for file reading, so it must be served via Express and cannot be viewed successfully simply by opening up the local path.

## Built With

* [D3.js](https://d3js.org/) - Data visualizations
* [Yarn](https://yarnpkg.com/) - Package management
* [Visual Studio Code](https://code.visualstudio.com/) - IDE

## Contributing

Please post to the issues in the repository with ideas or improvements. Thank you!

## Authors

* **Ian Cameron** - *Initial work* - [iankameron](https://github.com/iankameron)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* SAFECAST organization (makers of radiation detectors and curators of worldwide radiation data)
* Code Chrysalis - This project was created for the tech talk part of the Code Chrysalis immersive bootcamp curriculum.