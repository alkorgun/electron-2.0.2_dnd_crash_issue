const electron = require("electron");

const {app, BrowserWindow} = electron;

let win;

function createMainWindow() {
	win = new BrowserWindow({width: 640, height: 360});

	win.loadURL("file://{fld}/test.html".format({fld: __dirname}));

	//win.webContents.openDevTools();

	win.on("closed", () => {
		win = null;
	});
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (win === null) {
		createMainWindow();
	}
});

String.prototype.format = function (desc) {
	return this.replace(/\{(.*?)\}/g, (function (data, key) { return desc[key] || ""; }));
};
