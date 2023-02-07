const XHR_DONE = 4;
const XHR_SUCCESS = 200;
const ALLDATA = 'http://webapi19sa-1.course.tamk.cloud/v1/weather'
const last20WindSpeed = 'https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed'
const windSpeed24hours = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/23'
const windSpeed48hours = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/47'
const windSpeed72hours = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/71'
const windSpeed1week = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/167'
const last20Temperature = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature'
const temperature24h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/23'
const temperature48h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/47'
const temperature72h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/71'
const temperature1w = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/167'
const last20Rain = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/rain'
const rain24h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/23'
const rain48h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/47'
const rain72h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/71'
const rain1w = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/rain/167'
const last20WindDirection = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction'
const windDirection24h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/23'
const windDirection48h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/47'
const windDirection72h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/71'
const windDirection1w = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_direction/167'
const last20Light = 'http://webapi19sa-1.course.tamk.cloud/v1/weather/light'
const light24h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/light/23'
const light48h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/light/47'
const light72h = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/light/71'
const light1w = ' http://webapi19sa-1.course.tamk.cloud/v1/weather/light/167'
var html;
var DATA_SOURCE;

function getData(DATA_SOURCE) {
    if (fooChart) { fooChart.destroy(); }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", DATA_SOURCE);
    xhr.onreadystatechange = function () {
        if (this.readyState == XHR_DONE) {
            if (this.status == XHR_SUCCESS) {
                const e = document.getElementById("table");
                const data = JSON.parse(this.responseText);
                e.innerHTML = dataToHtmlRepresentation(data);
            }
            else {
                console.log('Error! ' + xhr.status);
            }
        }
    };
    xhr.send();
}


var fooChart = null;
function dataToHtmlRepresentation(dataObjects) {
    var x_axis = new Array();
    var y_axis = new Array();
    if (fooChart) { fooChart.destroy(); }
    const l = dataObjects.length;
    var num;
    if (l == 500) {
        num = 30;
        html = '<table class="center"><tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measurement type</th><th>measured value</th></tr>';
    } else {
        num = l;
        html = '<table class="center"><tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>';
    }
    var col = [];
    for (var i = 0; i < num; i++) {
        for (var key in dataObjects[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }
    if (num == 30) {
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            html += ` <tr><td>${i + 1}</td>                     <td>${date}</td>                      <td>${time}</td>`             //view 1
            let weatherData = dataObject.data;
            html += `
                               <td>${Object.keys(weatherData)}</td>
                               <td>${Object.values(weatherData)}</td>
                          </tr>
                        `
        }
    }
    else if (key.includes('wind_speed')) {                                                        //view 2
        html = '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button href="#" onclick="getData(last20WindSpeed)">Now</button><button href="#" onclick="getData(windSpeed24hours)">24 Hours</button><button href="#" onclick="getData(windSpeed48hours)">48 Hours</button><button href="#" onclick="getData(windSpeed72hours)">72 Hours</button><button href="#" onclick="getData(windSpeed1week)">1 Week</button></div></div>' + html;
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            //let a = Object.values(dataObjects);
            //let b = Object.values(a);
            x_axis[i] = time;
            html += ` <tr><td>${i + 1}</td>                      <td>${date}</td>                     <td>${time}</td>`
            y_axis[i] = dataObject.wind_speed;
            html += `
                               <td>${dataObject.wind_speed}</td>
                          </tr>`
        }
    }
    else if (key.includes('temperature')) {                                                        //view  3
        html = '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button onclick="getData(last20Temperature)">Now</button><button onclick="getData(temperature24h)">24 Hours</button><button onclick="getData(temperature48h)">48 Hours</button><button onclick="getData(temperature72h)">72 Hours</button><button onclick="getData(temperature1w)">1 Week</button></div></div>' + html;
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            let a = Object.values(dataObjects);
            let b = Object.values(a);
            x_axis[i] = time;
            html += ` <tr><td>${i + 1}</td>                      <td>${date}</td>                     <td>${time}</td>`
            y_axis[i] = Number(dataObject.temperature);
            html += `
                               <td>${dataObject.temperature}</td>
                          </tr>`
        }
    }
    if (num == l) myChart(x_axis, y_axis);
    html += '</table>';
    return html;
}

function myInfor() {
    if (fooChart) { fooChart.destroy(); }
    const e = document.getElementById("table");
    e.innerHTML = '<h>Name:</h> <p> Xiaomin Wu </p> <h> Email:</h> <p> xiaomininfi@gmail.com</p><h> Phone:</h> <p> +358 466620421</p>';
}

function myChart(x_axis, y_axis) {
    const ctx = document.getElementById('myChart').getContext('2d');
    fooChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: x_axis,
            datasets: [{
                labels: 'values',
                data: y_axis,
                borderWidth: 1,
            }]
        },
        options: {
            // legend: {
            // 	display: false
            // },
            tooltips: {
                enabled: false
            },
            title: {
                display: true,
                text: 'Bar Chart',
            },
            // scales: {
            // 	yAxes: [{
            // 		ticks: {
            // 			beginAtZero: true
            // 		},
            //         gridLines: {
            //             color: 'white'
            //           }
            // 	}]
            // },
        }
    });
}

function view4(DATA_SOURCE) {
    if (fooChart) { fooChart.destroy(); }
    const xhr = new XMLHttpRequest();
    xhr.open("GET", DATA_SOURCE);
    xhr.onreadystatechange = function () {
        if (this.readyState == XHR_DONE) {
            if (this.status == XHR_SUCCESS) {
                const e = document.getElementById("table");
                const data = JSON.parse(this.responseText);
                e.innerHTML = tableForView4(data);
            }
            else {
                console.log('Error! ' + xhr.status);
            }
        }
    }
    xhr.send();
}

function tableForView4(dataObjects) {
    var x_axis = new Array();
    var y_axis = new Array();
    if (fooChart) { fooChart.destroy(); }
    const l = dataObjects.length;
    if (l == 500) num = 25;
    else num = l;
    var html;
    var table;
    //let html1 = '<div class="container"><h2>Weather Type</h2>< div class="select-box"><div class="options-container"><div class="option"><input type="radio" class="radio" id="rain" name="category"><label for="rain" onclick="view4(ALLDATA)">Rain</label></div><div class="option"><input type="radio" class="radio" id="wind_speed" name="category"><label for="wind_speed" onclick="view4(ALLDATA)">Wind Speed</label></div><div class="option"><input type="radio" class="radio" id="wind_direction" name="category"><label for="wind_direction" onclick="view4(ALLDATA)">Wind Direction</label></div><div class="option"><input type="radio" class="radio" id="light" name="category"><label for="light" onclick="view4(ALLDATA)">Light</label></div><div class="option"><input type="radio" class="radio" id="temperature" name="category"><label for="temperature" onclick="view4(ALLDATA)">Temperature</label></div></div><div class="selected">Select weather type</div></div></div ><script src="menu.js" type="text/javascript">    </script>';
    let html1 = '<div class="dropdown"><button class="dropbtn">Weather type</button><div class="dropdown-content"><button onclick="view4(last20Rain)">Rain</button><button onclick="view4(last20WindSpeed)">Wind Speed</button><button onclick="view4(last20WindDirection)">Wind Direction</button><button onclick="view4(last20Light)">Light</button><button onclick="view4(last20Temperature)">Temperature</button></div></div>';
    let html2 = '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button href="#">Choose weather type first</button></div></div>';
    html = html1 + html2;
    table = '<table class="center"><tr><th>row number</th><th>measurement date</th><th>measurement time</th><th>measured value</th></tr>';
    var col = [];
    for (var i = 0; i < num; i++) {
        for (var key in dataObjects[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    if (key.includes('data')) {
        let values = new Array();
        let date = new Array();
        let time = new Array();
        for (let i = 0, j = 0; i < num && j < l; i++, j++) {
            const dataObject = dataObjects[l - j - 1];
            let weatherData = dataObject.data;
            while (Object.keys(weatherData) == 'wind_speed') {
                let date_time = Object.values(dataObject.date_time);
                let timeString = date_time.join('');
                values[i] = Object.values(weatherData);
                date[i] = timeString.substring(0, 10);
                time[i] = timeString.substring(11, 23);
                j++;
            }
        }
        for (let i = 0; i < num; i++) {
            x_axis[i] = time[i];
            table += ` <tr><td>${i + 1}</td><td>${date[i]}</td><td>${time[i]}</td>`;
            y_axis[i] = values[i];
            table += `
                                               <td>${values[i]}</td>
                                          </tr>
                                        `
        }
    }
    if (key.includes('wind_speed')) {
        html = html1 + '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button href="#" onclick="view4ForNow(ALLDATA,"wind_speed")">Now</button><button href="#" onclick="view4(windSpeed24hours)">24 Hours</button><button href="#" onclick="view4(windSpeed48hours)">48 Hours</button><button href="#" onclick="view4(windSpeed72hours)">72 Hours</button><button href="#" onclick="view4(windSpeed1week)">1 Week</button></div></div>';
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            // let a = Object.values(dataObjects);
            // let b = Object.values(a);
            x_axis[i] = time;
            table += ` <tr><td>${i + 1}</td>                      <td>${date}</td>                     <td>${time}</td>`
            y_axis[i] = dataObject.wind_speed;
            table += `
                               <td>${dataObject.wind_speed}</td>
                          </tr>`
        }
        table += '</table>';
        html += table;
        view4Chart(x_axis, y_axis);
    }
    else if (key.includes('temperature')) {
        html = html1 + '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button onclick="view4ForNow(ALLDATA,"temperature")">Now</button><button onclick="view4(temperature24h)">24 Hours</button><button onclick="view4(temperature48h)">48 Hours</button><button onclick="view4(temperature72h)">72 Hours</button><button onclick="view4(temperature1w)">1 Week</button></div></div>';
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            // let a = Object.values(dataObjects);
            // let b = Object.values(a);
            x_axis[i] = time;
            table += ` <tr><td>${i + 1}</td>                      <td>${date}</td>                     <td>${time}</td>`
            y_axis[i] = Number(dataObject.temperature);
            table += `
                               <td>${dataObject.temperature}</td>
                          </tr>`
        }
        table += '</table>';
        html += table;
        view4Chart(x_axis, y_axis);
    }
    else if (key.includes('rain')) {
        html = html1 + '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button onclick="view4ForNow(ALLDATA,"rain")">Now</button><button onclick="view4(rain24h)">24 Hours</button><button onclick="view4(rain48h)">48 Hours</button><button onclick="view4(rain72h)">72 Hours</button><button onclick="view4(rain1w)">1 Week</button></div></div>';
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            let a = Object.values(dataObjects);
            let b = Object.values(a);
            x_axis[i] = time;
            table += ` <tr><td>${i + 1}</td>                      <td>${date}</td>                     <td>${time}</td>`
            y_axis[i] = Number(dataObject.rain);
            table += `
                                               <td>${dataObject.rain}</td>
                                          </tr>`
        }
        table += '</table>';
        html += table;
        view4Chart(x_axis, y_axis);
    }
    else if (key.includes('wind_direction')) {
        html = html1 + '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button onclick="view4ForNow(ALLDATA,"wind_direction"))">Now</button><button onclick="view4(windDirection24h)">24 Hours</button><button onclick="view4(windDirection48h)">48 Hours</button><button onclick="view4(windDirection72h)">72 Hours</button><button onclick="view4(windDirection1w)">1 Week</button></div></div>';
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            let a = Object.values(dataObjects);
            let b = Object.values(a);
            x_axis[i] = time;
            table += ` <tr><td>${i + 1}</td>                      <td>${date}</td>                     <td>${time}</td>`
            y_axis[i] = Number(dataObject.wind_direction);
            table += `
                                                   <td>${dataObject.wind_direction}</td>
                                              </tr>`
        }
        table += '</table>';
        html += table;
        view4Chart(x_axis, y_axis);
    }
    else if (key.includes('light')) {
        html = html1 + '<div class="dropdown"><button class="dropbtn">Time Interval</button><div class="dropdown-content"><button onclick="view4ForNow(ALLDATA,"light")">Now</button><button onclick="view4(light24h)">24 Hours</button><button onclick="view4(light48h)">48 Hours</button><button onclick="view4(light72h)">72 Hours</button><button onclick="view4(light1w)">1 Week</button></div></div>';
        for (let i = 0; i < num; i++) {
            const dataObject = dataObjects[i];
            let date_time = Object.values(dataObject.date_time);
            let timeString = date_time.join('');
            var date = timeString.substring(0, 10);
            var time = timeString.substring(11, 23);
            let a = Object.values(dataObjects);
            let b = Object.values(a);
            x_axis[i] = time;
            table += ` <tr><td>${i + 1}</td>                      <td>${date}</td>                     <td>${time}</td>`
            y_axis[i] = Number(dataObject.light);
            table += `
                                                   <td>${dataObject.light}</td>
                                              </tr>`
        }
        table += '</table>';
        html += table;
        view4Chart(x_axis, y_axis);
    }
    return html;
}

function view4Chart(x_axis, y_axis) {
    const ctx = document.getElementById('myChart').getContext('2d');
    fooChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x_axis,
            datasets: [{
                labels: 'values',
                data: y_axis,
                borderWidth: 1,
            }]
        },
        options: {

            tooltips: {
                enabled: false
            },
            title: {
                display: true,
                text: 'Line Chart',
            },

        }
    });
}


const btn = document.querySelector('button');
btn.addEventListener('click', function onClick() {
    btn.style.backgroundColor = 'salmon';
    btn.style.color = 'white';
});

function color(id) {
    var ids = new Array('view1', 'view2', 'view3', 'view4', 'view5');
    let a = 'view';
    const btn = document.getElementById(id);
    btn.style.backgroundColor = 'salmon';
    btn.style.color = 'white';
    for (let i = 0; i < 5; i++) {
        if (ids[i] == id) ids[i] = null;
        else {
            const others = document.getElementById(ids[i]);
            others.style.backgroundColor = 'white';
            others.style.color = 'lightslategray';
            let j = toString(i + 1);
            ids[i] == a.concat(j);
        }
    }

}