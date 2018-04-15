require('dotenv').config({silent: true});

const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const http = require('http');
const moment = require('moment-timezone');
const serialize = require('serialize-javascript');

moment.tz.setDefault('America/Sao_Paulo');

const events = [
    {
        description: 'Random event',
        date: moment('2018-04-16', 'YYYY-MM-DD')
    },
    {
        description: 'Random event',
        date: moment('2018-04-17', 'YYYY-MM-DD')
    },
    {
        description: 'Random event',
        date: moment('2018-04-18', 'YYYY-MM-DD')
    },
    {
        description: 'GOD OF WAR!!!!',
        date: moment('2018-04-20', 'YYYY-MM-DD')
    }
];


app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
    const contentMarker = '<!-- APP -->';
    const content = `<script type="application/javascript">window.__INITIAL_STATE__ = ${serialize(events)};</script>`;

    res.send(template.replace(contentMarker, content));

});

app.use(require('body-parser').json());


app.post('/add_event', (req, res) => {
    events.push(req.body);
    res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
    const reload = require('reload');
    const reloadServer = reload(server, app);
    require('./webpack-dev-middleware').init(app);
}

server.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
