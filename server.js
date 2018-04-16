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

let renderer;


app.use('/public', express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV  === 'production') {
    let bundle = fs.readFileSync('./dist/node.bundle.js', 'utf-8');
    renderer = require('vue-server-renderer').createBundleRenderer(bundle);
    app.use('/dist', express.static(path.join(__dirname, 'dist')));
}

app.get('/', (req, res) => {
    let template = fs.readFileSync(path.resolve('./index.html'), 'utf-8');
    const contentMarker = '<!-- APP -->';
    const content = `<script type="application/javascript">window.__INITIAL_STATE__ = ${serialize(events)};</script>`;

    if (renderer) {
        renderer.renderToString({ events }, (err, html) => {
            if (err) {
                console.log(err);
            } else {
                template = template.replace('<div id="app"></div>', html);
                res.send(template.replace(contentMarker, content));
            }
        });
    } else {
        res.send('<p> Error when compilation...</p><script src="/reload/reload.js"></script>');
    }
});

app.use(require('body-parser').json());


app.post('/add_event', (req, res) => {
    const event = req.body;
    event.date = moment(event.date);
    events.push(event);
    res.sendStatus(200);
});

const server = http.createServer(app);

if (process.env.NODE_ENV === 'development') {
    const reload = require('reload');
    const reloadServer = reload(server, app);
    require('./webpack-dev-middleware').init(app);
    require('./webpack-server-compiler').init(function (bundle) {
        const needsReload = (typeof renderer === 'undefined');
        renderer = require('vue-server-renderer').createBundleRenderer(bundle);
        if (needsReload) {
            reloadServer.reload();
        }
    });
}

server.listen(process.env.PORT, function () {
    console.log(`Example app listening on port ${process.env.PORT}!`);
});
