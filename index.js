const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// LiveReload
if (process.argv[2] !== 'prod') {
    const livereload = require("livereload");
    const connectLiveReload = require("connect-livereload");

    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });

    // LiveReload middleware
    app.use(connectLiveReload());
}


//Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'home', 'home.html'));
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})