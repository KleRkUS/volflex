/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./windows/in_game/in_game.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./consts.ts":
/*!*******************!*\
  !*** ./consts.ts ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const interestingFeatures = [
    'counters',
    'death',
    'items',
    'kill',
    'killed',
    'killer',
    'location',
    'match_info',
    'match',
    'me',
    'phase',
    'rank',
    'revived',
    'roster',
    'team',
    'collection',
    'teamGoal',
    'opposingTeamGoal',
    'bomb_planted'
];
exports.interestingFeatures = interestingFeatures;
const windowNames = {
    inGame: 'in_game',
    desktop: 'desktop'
};
exports.windowNames = windowNames;
const hotkeys = {
    toggle: 'showhide'
};
exports.hotkeys = hotkeys;


/***/ }),

/***/ "./odk-ts/ow-games-events.ts":
/*!***********************************!*\
  !*** ./odk-ts/ow-games-events.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const timer_1 = __webpack_require__(/*! ./timer */ "./odk-ts/timer.ts");
class OWGamesEvents {
    constructor(delegate, requiredFeatures, featureRetries = 10) {
        this.onInfoUpdates = (info) => {
            this._delegate.onInfoUpdates(info.info);
        };
        this.onNewEvents = (e) => {
            this._delegate.onNewEvents(e);
        };
        this._delegate = delegate;
        this._requiredFeatures = requiredFeatures;
        this._featureRetries = featureRetries;
    }
    async getInfo() {
        return new Promise((resolve) => {
            overwolf.games.events.getInfo(resolve);
        });
    }
    async setRequiredFeatures() {
        let tries = 1, result;
        while (tries <= this._featureRetries) {
            result = await new Promise(resolve => {
                overwolf.games.events.setRequiredFeatures(this._requiredFeatures, resolve);
            });
            if (result.status === 'success') {
                console.log('setRequiredFeatures(): success: ' + JSON.stringify(result, null, 2));
                return (result.supportedFeatures.length > 0);
            }
            await timer_1.Timer.wait(3000);
            tries++;
        }
        console.warn('setRequiredFeatures(): failure after ' + tries + ' tries' + JSON.stringify(result, null, 2));
        return false;
    }
    registerEvents() {
        this.unRegisterEvents();
        overwolf.games.events.onInfoUpdates2.addListener(this.onInfoUpdates);
        overwolf.games.events.onNewEvents.addListener(this.onNewEvents);
    }
    unRegisterEvents() {
        overwolf.games.events.onInfoUpdates2.removeListener(this.onInfoUpdates);
        overwolf.games.events.onNewEvents.removeListener(this.onNewEvents);
    }
    async start() {
        console.log(`[ow-game-events] START`);
        this.registerEvents();
        await this.setRequiredFeatures();
        const { res, status } = await this.getInfo();
        if (res && status === 'success') {
            this.onInfoUpdates({ info: res });
        }
    }
    stop() {
        console.log(`[ow-game-events] STOP`);
        this.unRegisterEvents();
    }
}
exports.OWGamesEvents = OWGamesEvents;


/***/ }),

/***/ "./odk-ts/ow-window.ts":
/*!*****************************!*\
  !*** ./odk-ts/ow-window.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWWindow {
    constructor(name = null) {
        this._name = name;
        this._id = null;
    }
    async restore() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.restore(id, result => {
                if (!result.success)
                    console.error(`[restore] - an error occurred, windowId=${id}, reason=${result.error}`);
                resolve();
            });
        });
    }
    async minimize() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.minimize(id, () => { });
            return resolve();
        });
    }
    async maximize() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.maximize(id, () => { });
            return resolve();
        });
    }
    async hide() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.hide(id, () => { });
            return resolve();
        });
    }
    async close() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            const result = await this.getWindowState();
            if (result.success &&
                (result.window_state !== 'closed')) {
                await this.internalClose();
            }
            return resolve();
        });
    }
    dragMove(elem) {
        elem.onmousedown = e => {
            e.preventDefault();
            overwolf.windows.dragMove(this._name);
        };
    }
    async getWindowState() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.getWindowState(id, resolve);
        });
    }
    static async getCurrentInfo() {
        return new Promise(async (resolve) => {
            overwolf.windows.getCurrentWindow(result => {
                resolve(result.window);
            });
        });
    }
    obtain() {
        return new Promise((resolve, reject) => {
            const cb = res => {
                if (res && res.status === "success" && res.window && res.window.id) {
                    this._id = res.window.id;
                    if (!this._name) {
                        this._name = res.window.name;
                    }
                    resolve(res.window);
                }
                else {
                    this._id = null;
                    reject();
                }
            };
            if (!this._name) {
                overwolf.windows.getCurrentWindow(cb);
            }
            else {
                overwolf.windows.obtainDeclaredWindow(this._name, cb);
            }
        });
    }
    async assureObtained() {
        let that = this;
        return new Promise(async (resolve) => {
            await that.obtain();
            return resolve();
        });
    }
    async internalClose() {
        let that = this;
        return new Promise(async (resolve, reject) => {
            await that.assureObtained();
            let id = that._id;
            overwolf.windows.close(id, res => {
                if (res && res.success)
                    resolve();
                else
                    reject(res);
            });
        });
    }
}
exports.OWWindow = OWWindow;


/***/ }),

/***/ "./odk-ts/timer.ts":
/*!*************************!*\
  !*** ./odk-ts/timer.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Timer {
    constructor(delegate, id) {
        this._timerId = null;
        this.handleTimerEvent = () => {
            this._timerId = null;
            this._delegate.onTimer(this._id);
        };
        this._delegate = delegate;
        this._id = id;
    }
    static async wait(intervalInMS) {
        return new Promise(resolve => {
            setTimeout(resolve, intervalInMS);
        });
    }
    start(intervalInMS) {
        this.stop();
        this._timerId = setTimeout(this.handleTimerEvent, intervalInMS);
    }
    stop() {
        if (this._timerId == null) {
            return;
        }
        clearTimeout(this._timerId);
        this._timerId = null;
    }
}
exports.Timer = Timer;


/***/ }),

/***/ "./windows/AppWindow.ts":
/*!******************************!*\
  !*** ./windows/AppWindow.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ow_window_1 = __webpack_require__(/*! ../odk-ts/ow-window */ "./odk-ts/ow-window.ts");
class AppWindow {
    constructor(windowName) {
        this.maximized = false;
        this.mainWindow = new ow_window_1.OWWindow('background');
        this.currWindow = new ow_window_1.OWWindow(windowName);
        const closeButton = document.getElementById('closeButton');
        const maximizeButton = document.getElementById('maximizeButton');
        const minimizeButton = document.getElementById('minimizeButton');
        const modal = document.getElementById('exitMinimizeModal');
        const modalCloseButton = document.getElementById('exit');
        const modalMinimizeButton = document.getElementById('minimize');
        const header = document.getElementById('header');
        this.setDrag(header);
        closeButton.addEventListener('click', () => {
            modal.style.display = 'block';
        });
        modalCloseButton.addEventListener('click', () => {
            this.mainWindow.close();
        });
        minimizeButton.addEventListener('click', () => {
            this.currWindow.minimize();
        });
        maximizeButton.addEventListener('click', () => {
            if (!this.maximized) {
                this.currWindow.maximize();
            }
            else {
                this.currWindow.restore();
            }
            this.maximized = !this.maximized;
        });
        modalMinimizeButton.addEventListener('click', () => {
            this.currWindow.minimize();
            modal.style.display = 'none';
        });
    }
    async getWindowState() {
        return await this.currWindow.getWindowState();
    }
    async setDrag(elem) {
        this.currWindow.dragMove(elem);
    }
}
exports.AppWindow = AppWindow;


/***/ }),

/***/ "./windows/in_game/in_game.ts":
/*!************************************!*\
  !*** ./windows/in_game/in_game.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const AppWindow_1 = __webpack_require__(/*! ../AppWindow */ "./windows/AppWindow.ts");
const ow_games_events_1 = __webpack_require__(/*! ../../odk-ts/ow-games-events */ "./odk-ts/ow-games-events.ts");
const consts_1 = __webpack_require__(/*! ../../consts */ "./consts.ts");
class InGame extends AppWindow_1.AppWindow {
    constructor() {
        super(consts_1.windowNames.inGame);
        this._eventsLog = document.getElementById('eventsLog');
        this._infoLog = document.getElementById('infoLog');
        this.gameEventsListener = new ow_games_events_1.OWGamesEvents({
            onInfoUpdates: this.onInfoUpdates.bind(this),
            onNewEvents: this.onNewEvents.bind(this)
        }, consts_1.interestingFeatures);
        this.currWindow.minimize();
    }
    static instance() {
        if (!this._instance) {
            this._instance = new InGame();
        }
        return this._instance;
    }
    run() {
        this.gameEventsListener.start();
        let streamSettings = {
            "video": {
                "sub_folder_name": 'video',
                "fps": 30,
                "width": 1920,
                "height": 1080,
                "auto_calc_kbps": true,
                "buffer_length": 18000,
                "max_kbps": 20000,
                'frame_interval': 1,
                "test_drop_frames_interval": 1,
                "notify_dropped_frames_ratio": 2,
                "max_file_size_bytes": 1000000000,
                "include_full_size_video": true,
                "override_overwolf_setting": false,
                "disable_when_sht_not_supported": false,
            },
            "gif_as_video": true,
            "max_quota_gb": 10,
        };
        overwolf.media.replays.turnOn({
            "settings": streamSettings,
            "highlights": {
                "enable": false,
                "requireHighlights": "kill"
            },
        }, (res) => {
            this.logLine(this._eventsLog, res, true);
        });
    }
    onInfoUpdates(info) {
        this.logLine(this._infoLog, info, false);
    }
    onNewEvents(e) {
        const shouldHighlight = e.events.some(event => {
            return event.name === 'kill' ||
                event.name === 'death' ||
                event.name === 'assist' ||
                event.name === 'level' ||
                event.name === 'bomb_planted' ||
                event.name === 'collection' ||
                event.name === 'teamGoal' ||
                event.name === 'opposingTeamGoal';
        });
        this.logLine(this._eventsLog, e, shouldHighlight);
        if (shouldHighlight) {
            overwolf.media.replays.capture(30000, 5000, (res) => {
                console.log(res);
                this.logLine(this._eventsLog, JSON.stringify(res), true);
            }, (res) => {
                console.log(res);
                this.logLine(this._eventsLog, JSON.stringify(res), true);
            });
        }
    }
    logLine(log, data, highlight) {
        console.log(`${log.id}:`);
        console.log(data);
        const line = document.createElement('pre');
        line.textContent = JSON.stringify(data);
        if (highlight) {
            line.className = 'highlight';
        }
        const shouldAutoScroll = (log.scrollTop + log.offsetHeight) > (log.scrollHeight - 10);
        log.appendChild(line);
        if (shouldAutoScroll) {
            log.scrollTop = log.scrollHeight;
        }
    }
}
InGame.instance().run();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy1nYW1lcy1ldmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vb2RrLXRzL293LXdpbmRvdy50cyIsIndlYnBhY2s6Ly8vLi9vZGstdHMvdGltZXIudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9BcHBXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9pbl9nYW1lL2luX2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsVUFBVTtJQUNWLE9BQU87SUFDUCxPQUFPO0lBQ1AsTUFBTTtJQUNOLFFBQVE7SUFDUixRQUFRO0lBQ1IsVUFBVTtJQUNWLFlBQVk7SUFDWixPQUFPO0lBQ1As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QUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNELENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDO0lBNEJPLE9BQU8sQ0FBQyxHQUFnQixFQUFFLElBQUksRUFBRSxTQUFTO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xCLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhDLElBQUksU0FBUyxFQUFFO1lBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUM7U0FDOUI7UUFFRCxNQUFNLGdCQUFnQixHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRXRGLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFdEIsSUFBSSxnQkFBZ0IsRUFBRTtZQUNwQixHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7U0FDbEM7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMiLCJmaWxlIjoiaW5fZ2FtZS9pbl9nYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi93aW5kb3dzL2luX2dhbWUvaW5fZ2FtZS50c1wiKTtcbiIsImNvbnN0IGludGVyZXN0aW5nRmVhdHVyZXMgPSBbXG4gICdjb3VudGVycycsXG4gICdkZWF0aCcsXG4gICdpdGVtcycsXG4gICdraWxsJyxcbiAgJ2tpbGxlZCcsXG4gICdraWxsZXInLFxuICAnbG9jYXRpb24nLFxuICAnbWF0Y2hfaW5mbycsXG4gICdtYXRjaCcsXG4gICdtZScsXG4gICdwaGFzZScsXG4gICdyYW5rJyxcbiAgJ3Jldml2ZWQnLFxuICAncm9zdGVyJyxcbiAgJ3RlYW0nLFxuICAnY29sbGVjdGlvbicsXG4gICd0ZWFtR29hbCcsXG4gICdvcHBvc2luZ1RlYW1Hb2FsJyxcbiAgJ2JvbWJfcGxhbnRlZCdcbl07XG5cbmNvbnN0IHdpbmRvd05hbWVzID0ge1xuICBpbkdhbWU6ICdpbl9nYW1lJyxcbiAgZGVza3RvcDogJ2Rlc2t0b3AnXG59O1xuXG5jb25zdCBob3RrZXlzID0ge1xuICB0b2dnbGU6ICdzaG93aGlkZSdcbn07XG5cbmV4cG9ydCB7XG4gIGludGVyZXN0aW5nRmVhdHVyZXMsXG4gIHdpbmRvd05hbWVzLFxuICBob3RrZXlzXG59IiwiaW1wb3J0IHsgVGltZXIgfSBmcm9tIFwiLi90aW1lclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIElPV0dhbWVzRXZlbnRzRGVsZWdhdGUge1xuICBvbkluZm9VcGRhdGVzKGluZm86IGFueSk7XG4gIG9uTmV3RXZlbnRzKGU6IGFueSk7XG59XG5cbmV4cG9ydCBjbGFzcyBPV0dhbWVzRXZlbnRzIHtcbiAgcHJpdmF0ZSBfZGVsZWdhdGU6IElPV0dhbWVzRXZlbnRzRGVsZWdhdGU7XG4gIHByaXZhdGUgX2ZlYXR1cmVSZXRyaWVzOiBudW1iZXI7XG4gIHByaXZhdGUgX3JlcXVpcmVkRmVhdHVyZXM6IHN0cmluZ1tdO1xuXG4gIGNvbnN0cnVjdG9yKGRlbGVnYXRlOiBJT1dHYW1lc0V2ZW50c0RlbGVnYXRlLCBcbiAgICAgICAgICAgICAgcmVxdWlyZWRGZWF0dXJlczogc3RyaW5nW10sIFxuICAgICAgICAgICAgICBmZWF0dXJlUmV0cmllczogbnVtYmVyID0gMTApIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgIHRoaXMuX3JlcXVpcmVkRmVhdHVyZXMgPSByZXF1aXJlZEZlYXR1cmVzO1xuICAgIHRoaXMuX2ZlYXR1cmVSZXRyaWVzID0gZmVhdHVyZVJldHJpZXM7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0SW5mbygpOiBQcm9taXNlPGFueT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLmdldEluZm8ocmVzb2x2ZSk7XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBsZXQgdHJpZXM6bnVtYmVyID0gMSxcbiAgICAgICAgcmVzdWx0O1xuXG4gICAgd2hpbGUgKCB0cmllcyA8PSB0aGlzLl9mZWF0dXJlUmV0cmllcyApIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMuc2V0UmVxdWlyZWRGZWF0dXJlcyhcbiAgICAgICAgICB0aGlzLl9yZXF1aXJlZEZlYXR1cmVzLFxuICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgKTtcbiAgICAgIH0pXG5cbiAgICAgIGlmICggcmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICkge1xuICAgICAgICBjb25zb2xlLmxvZygnc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBzdWNjZXNzOiAnKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcbiAgICAgICAgcmV0dXJuIChyZXN1bHQuc3VwcG9ydGVkRmVhdHVyZXMubGVuZ3RoID4gMCk7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IFRpbWVyLndhaXQoMzAwMCk7XG4gICAgICB0cmllcysrO1xuICAgIH1cblxuICAgIGNvbnNvbGUud2Fybignc2V0UmVxdWlyZWRGZWF0dXJlcygpOiBmYWlsdXJlIGFmdGVyICcrIHRyaWVzICsnIHRyaWVzJysgSlNPTi5zdHJpbmdpZnkocmVzdWx0LCBudWxsLCAyKSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSByZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcbiAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudHMoKTtcblxuICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbkluZm9VcGRhdGVzMi5hZGRMaXN0ZW5lcih0aGlzLm9uSW5mb1VwZGF0ZXMpO1xuICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbk5ld0V2ZW50cy5hZGRMaXN0ZW5lcih0aGlzLm9uTmV3RXZlbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5SZWdpc3RlckV2ZW50cygpOiB2b2lkIHtcbiAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25JbmZvVXBkYXRlczIucmVtb3ZlTGlzdGVuZXIodGhpcy5vbkluZm9VcGRhdGVzKTtcbiAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMub25OZXdFdmVudHMucmVtb3ZlTGlzdGVuZXIodGhpcy5vbk5ld0V2ZW50cyk7XG4gIH1cblxuICBwcml2YXRlIG9uSW5mb1VwZGF0ZXMgPSAoaW5mbzogYW55KTogdm9pZCA9PiB7XG4gICAgdGhpcy5fZGVsZWdhdGUub25JbmZvVXBkYXRlcyhpbmZvLmluZm8pO1xuICB9XG5cbiAgcHJpdmF0ZSBvbk5ld0V2ZW50cyA9IChlOiBhbnkpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5vbk5ld0V2ZW50cyhlKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBzdGFydCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zb2xlLmxvZyhgW293LWdhbWUtZXZlbnRzXSBTVEFSVGApO1xuXG4gICAgdGhpcy5yZWdpc3RlckV2ZW50cygpO1xuICAgIGF3YWl0IHRoaXMuc2V0UmVxdWlyZWRGZWF0dXJlcygpO1xuXG4gICAgY29uc3QgeyByZXMsIHN0YXR1cyB9ID0gYXdhaXQgdGhpcy5nZXRJbmZvKCk7XG5cbiAgICBpZiAoIHJlcyAmJiBzdGF0dXMgPT09ICdzdWNjZXNzJyApIHtcbiAgICAgIHRoaXMub25JbmZvVXBkYXRlcyh7IGluZm86IHJlcyB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBjb25zb2xlLmxvZyhgW293LWdhbWUtZXZlbnRzXSBTVE9QYCk7XG5cbiAgICB0aGlzLnVuUmVnaXN0ZXJFdmVudHMoKTtcbiAgfVxufVxuIiwidHlwZSBHZXRXaW5kb3dTdGF0ZVJlc3VsdCA9IG92ZXJ3b2xmLndpbmRvd3MuR2V0V2luZG93U3RhdGVSZXN1bHQ7XG50eXBlIE93V2luZG93SW5mbyA9IG92ZXJ3b2xmLndpbmRvd3MuV2luZG93SW5mbztcbmV4cG9ydCBjbGFzcyBPV1dpbmRvdyB7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyB8IG51bGw7XG4gIHByaXZhdGUgX2lkOiBzdHJpbmcgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZyB8IG51bGwgPSBudWxsKSB7XG4gICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgdGhpcy5faWQgPSBudWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHJlc3RvcmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlKSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLnJlc3RvcmUoaWQsIHJlc3VsdCA9PiB7XG4gICAgICAgIGlmICghcmVzdWx0LnN1Y2Nlc3MpXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgW3Jlc3RvcmVdIC0gYW4gZXJyb3Igb2NjdXJyZWQsIHdpbmRvd0lkPSR7aWR9LCByZWFzb249JHtyZXN1bHQuZXJyb3J9YCk7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgbWluaW1pemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5taW5pbWl6ZShpZCwgKCkgPT4geyB9KTtcbiAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBtYXhpbWl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLm1heGltaXplKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGhpZGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5oaWRlKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIGNsb3NlKCkge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcblxuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5nZXRXaW5kb3dTdGF0ZSgpO1xuXG4gICAgICBpZiAocmVzdWx0LnN1Y2Nlc3MgJiZcbiAgICAgICAgKHJlc3VsdC53aW5kb3dfc3RhdGUgIT09ICdjbG9zZWQnKSkge1xuICAgICAgICBhd2FpdCB0aGlzLmludGVybmFsQ2xvc2UoKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGRyYWdNb3ZlKGVsZW06IEhUTUxFbGVtZW50KSB7XG4gICAgZWxlbS5vbm1vdXNlZG93biA9IGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5kcmFnTW92ZSh0aGlzLl9uYW1lKTtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGdldFdpbmRvd1N0YXRlKCk6IFByb21pc2U8R2V0V2luZG93U3RhdGVSZXN1bHQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8R2V0V2luZG93U3RhdGVSZXN1bHQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRXaW5kb3dTdGF0ZShpZCwgcmVzb2x2ZSk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgZ2V0Q3VycmVudEluZm8oKTogUHJvbWlzZTxPd1dpbmRvd0luZm8+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8T3dXaW5kb3dJbmZvPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhyZXN1bHQgPT4ge1xuICAgICAgICByZXNvbHZlKHJlc3VsdC53aW5kb3cpO1xuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBvYnRhaW4oKTogUHJvbWlzZTxPd1dpbmRvd0luZm8gfCBudWxsPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNiID0gcmVzID0+IHtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuc3RhdHVzID09PSBcInN1Y2Nlc3NcIiAmJiByZXMud2luZG93ICYmIHJlcy53aW5kb3cuaWQpIHtcbiAgICAgICAgICB0aGlzLl9pZCA9IHJlcy53aW5kb3cuaWQ7XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX25hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX25hbWUgPSByZXMud2luZG93Lm5hbWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVzb2x2ZShyZXMud2luZG93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9pZCA9IG51bGw7XG4gICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGlmICghdGhpcy5fbmFtZSkge1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLmdldEN1cnJlbnRXaW5kb3coY2IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3ZlcndvbGYud2luZG93cy5vYnRhaW5EZWNsYXJlZFdpbmRvdyh0aGlzLl9uYW1lLCBjYik7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgYXNzdXJlT2J0YWluZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQub2J0YWluKCk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpbnRlcm5hbENsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG5cbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MuY2xvc2UoaWQsIHJlcyA9PiB7XG5cbiAgICAgICAgaWYgKHJlcyAmJiByZXMuc3VjY2VzcylcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZWplY3QocmVzKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cbn1cbiIsImV4cG9ydCBpbnRlcmZhY2UgVGltZXJEZWxlZ2F0ZSB7XG4gIG9uVGltZXIoaWQ/OiBzdHJpbmcpOiB2b2lkO1xufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuZXhwb3J0IGNsYXNzIFRpbWVyIHtcbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHByaXZhdGUgX3RpbWVySWQ6IG51bWJlcnxudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZ3x1bmRlZmluZWQ7XG4gIHByaXZhdGUgX2RlbGVnYXRlOiBUaW1lckRlbGVnYXRlO1xuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBwdWJsaWMgc3RhdGljIGFzeW5jIHdhaXQoaW50ZXJ2YWxJbk1TOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICBzZXRUaW1lb3V0KHJlc29sdmUsIGludGVydmFsSW5NUyk7XG4gICAgfSlcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZTogVGltZXJEZWxlZ2F0ZSwgaWQ/OiBzdHJpbmcpIHtcbiAgICB0aGlzLl9kZWxlZ2F0ZSA9IGRlbGVnYXRlO1xuICAgIHRoaXMuX2lkID0gaWQ7XG4gIH1cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcHVibGljIHN0YXJ0KGludGVydmFsSW5NUzogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wKCk7XG5cbiAgICAvL0B0cy1pZ25vcmVcbiAgICB0aGlzLl90aW1lcklkID0gPG51bWJlcj5zZXRUaW1lb3V0KHRoaXMuaGFuZGxlVGltZXJFdmVudCwgaW50ZXJ2YWxJbk1TKTtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdGltZXJJZCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVySWQpO1xuICAgIHRoaXMuX3RpbWVySWQgPSBudWxsO1xuICB9XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHByaXZhdGUgaGFuZGxlVGltZXJFdmVudCA9ICgpID0+IHtcbiAgICB0aGlzLl90aW1lcklkID0gbnVsbDtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5vblRpbWVyKHRoaXMuX2lkKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgT1dXaW5kb3cgfSBmcm9tIFwiLi4vb2RrLXRzL293LXdpbmRvd1wiO1xuXG4vLyBBIGJhc2UgY2xhc3MgZm9yIHRoZSBhcHAncyBmb3JlZ3JvdW5kIHdpbmRvd3MuXG4vLyBTZXRzIHRoZSBtb2RhbCBhbmQgZHJhZyBiZWhhdmlvcnMsIHdoaWNoIGFyZSBzaGFyZWQgYWNjcm9zcyB0aGUgZGVza3RvcCBhbmQgaW4tZ2FtZSB3aW5kb3dzLlxuZXhwb3J0IGNsYXNzIEFwcFdpbmRvdyB7XG4gIHByb3RlY3RlZCBjdXJyV2luZG93OiBPV1dpbmRvdztcbiAgcHJvdGVjdGVkIG1haW5XaW5kb3c6IE9XV2luZG93O1xuICBwcm90ZWN0ZWQgbWF4aW1pemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3Iod2luZG93TmFtZSkge1xuICAgIHRoaXMubWFpbldpbmRvdyA9IG5ldyBPV1dpbmRvdygnYmFja2dyb3VuZCcpO1xuICAgIHRoaXMuY3VycldpbmRvdyA9IG5ldyBPV1dpbmRvdyh3aW5kb3dOYW1lKTtcbiAgICBcbiAgICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUJ1dHRvbicpO1xuICAgIGNvbnN0IG1heGltaXplQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21heGltaXplQnV0dG9uJyk7XG4gICAgY29uc3QgbWluaW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1pemVCdXR0b24nKTtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGl0TWluaW1pemVNb2RhbCcpO1xuICAgIGNvbnN0IG1vZGFsQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXhpdCcpO1xuICAgIGNvbnN0IG1vZGFsTWluaW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWluaW1pemUnKTtcblxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXInKTtcbiAgICBcbiAgICB0aGlzLnNldERyYWcoaGVhZGVyKTtcbiAgICBcbiAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH0pO1xuXG4gICAgbW9kYWxDbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMubWFpbldpbmRvdy5jbG9zZSgpO1xuICAgIH0pO1xuICAgIFxuICAgIG1pbmltaXplQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5jdXJyV2luZG93Lm1pbmltaXplKCk7XG4gICAgfSk7XG5cbiAgICBtYXhpbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5tYXhpbWl6ZWQpIHtcbiAgICAgICAgdGhpcy5jdXJyV2luZG93Lm1heGltaXplKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmN1cnJXaW5kb3cucmVzdG9yZSgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1heGltaXplZCA9ICF0aGlzLm1heGltaXplZDtcbiAgICB9KTtcblxuICAgIG1vZGFsTWluaW1pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJXaW5kb3cubWluaW1pemUoKTtcbiAgICAgIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0V2luZG93U3RhdGUoKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY3VycldpbmRvdy5nZXRXaW5kb3dTdGF0ZSgpO1xuICB9XG4gIFxuICBwcml2YXRlIGFzeW5jIHNldERyYWcoZWxlbSkge1xuICAgIHRoaXMuY3VycldpbmRvdy5kcmFnTW92ZShlbGVtKTtcbiAgfVxufSIsImltcG9ydCB7IEFwcFdpbmRvdyB9IGZyb20gXCIuLi9BcHBXaW5kb3dcIjtcbmltcG9ydCB7IE9XR2FtZXNFdmVudHMgfSBmcm9tIFwiLi4vLi4vb2RrLXRzL293LWdhbWVzLWV2ZW50c1wiO1xuaW1wb3J0IHsgT1dIb3RrZXlzIH0gZnJvbSBcIi4uLy4uL29kay10cy9vdy1ob3RrZXlzXCI7XG5pbXBvcnQgeyBpbnRlcmVzdGluZ0ZlYXR1cmVzLCBob3RrZXlzLCB3aW5kb3dOYW1lcyB9IGZyb20gXCIuLi8uLi9jb25zdHNcIjtcbmltcG9ydCBXaW5kb3dTdGF0ZSA9IG92ZXJ3b2xmLndpbmRvd3MuV2luZG93U3RhdGU7XG5cbi8vIFRoZSB3aW5kb3cgZGlzcGxheWVkIGluLWdhbWUgd2hpbGUgYSBGb3J0bml0ZSBnYW1lIGlzIHJ1bm5pbmcuXG4vLyBJdCBsaXN0ZW5zIHRvIGFsbCBpbmZvIGV2ZW50cyBhbmQgdG8gdGhlIGdhbWUgZXZlbnRzIGxpc3RlZCBpbiB0aGUgY29uc3RzLnRzIGZpbGVcbi8vIGFuZCB3cml0ZXMgdGhlbSB0byB0aGUgcmVsZXZhbnQgbG9nIHVzaW5nIDxwcmU+IHRhZ3MuXG4vLyBUaGUgd2luZG93IGFsc28gc2V0cyB1cCBDdHJsK0YgYXMgdGhlIG1pbmltaXplL3Jlc3RvcmUgaG90a2V5LlxuLy8gTGlrZSB0aGUgYmFja2dyb3VuZCB3aW5kb3csIGl0IGFsc28gaW1wbGVtZW50cyB0aGUgU2luZ2xldG9uIGRlc2lnbiBwYXR0ZXJuLlxuY2xhc3MgSW5HYW1lIGV4dGVuZHMgQXBwV2luZG93IHtcbiAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBJbkdhbWU7XG4gIHByaXZhdGUgZ2FtZUV2ZW50c0xpc3RlbmVyOiBPV0dhbWVzRXZlbnRzO1xuICBwcml2YXRlIF9ldmVudHNMb2c6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9pbmZvTG9nOiBIVE1MRWxlbWVudDtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKHdpbmRvd05hbWVzLmluR2FtZSk7XG5cbiAgICB0aGlzLl9ldmVudHNMb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXZlbnRzTG9nJyk7XG4gICAgdGhpcy5faW5mb0xvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbmZvTG9nJyk7XG5cbiAgICAvLyB0aGlzLnNldFRvZ2dsZUhvdGtleUJlaGF2aW9yKCk7XG4gICAgLy8gdGhpcy5zZXRUb2dnbGVIb3RrZXlUZXh0KCk7XG5cbiAgICB0aGlzLmdhbWVFdmVudHNMaXN0ZW5lciA9IG5ldyBPV0dhbWVzRXZlbnRzKHtcbiAgICAgIG9uSW5mb1VwZGF0ZXM6IHRoaXMub25JbmZvVXBkYXRlcy5iaW5kKHRoaXMpLFxuICAgICAgb25OZXdFdmVudHM6IHRoaXMub25OZXdFdmVudHMuYmluZCh0aGlzKVxuICAgIH0sXG4gICAgICBpbnRlcmVzdGluZ0ZlYXR1cmVzKTtcblxuICAgIHRoaXMuY3VycldpbmRvdy5taW5pbWl6ZSgpO1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBpbnN0YW5jZSgpIHtcbiAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBJbkdhbWUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XG4gIH1cblxuICBwdWJsaWMgcnVuKCkge1xuICAgIHRoaXMuZ2FtZUV2ZW50c0xpc3RlbmVyLnN0YXJ0KCk7XG5cbiAgICBsZXQgc3RyZWFtU2V0dGluZ3MgPSB7XG4gICAgICBcInZpZGVvXCI6IHtcbiAgICAgICAgXCJzdWJfZm9sZGVyX25hbWVcIjogJ3ZpZGVvJyxcbiAgICAgICAgXCJmcHNcIjogMzAsXG4gICAgICAgIFwid2lkdGhcIjogMTkyMCxcbiAgICAgICAgXCJoZWlnaHRcIjogMTA4MCxcbiAgICAgICAgXCJhdXRvX2NhbGNfa2Jwc1wiOiB0cnVlLFxuICAgICAgICBcImJ1ZmZlcl9sZW5ndGhcIjogMTgwMDAsXG4gICAgICAgIFwibWF4X2ticHNcIjogMjAwMDAsXG4gICAgICAgICdmcmFtZV9pbnRlcnZhbCc6IDEsXG4gICAgICAgIFwidGVzdF9kcm9wX2ZyYW1lc19pbnRlcnZhbFwiOiAxLFxuICAgICAgICBcIm5vdGlmeV9kcm9wcGVkX2ZyYW1lc19yYXRpb1wiOiAyLFxuICAgICAgICBcIm1heF9maWxlX3NpemVfYnl0ZXNcIjogMTAwMDAwMDAwMCxcbiAgICAgICAgXCJpbmNsdWRlX2Z1bGxfc2l6ZV92aWRlb1wiOiB0cnVlLFxuICAgICAgICBcIm92ZXJyaWRlX292ZXJ3b2xmX3NldHRpbmdcIjogZmFsc2UsXG4gICAgICAgIFwiZGlzYWJsZV93aGVuX3NodF9ub3Rfc3VwcG9ydGVkXCI6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIC8vXCJlbmNvZGVyXCI6IFwiSW50ZWxcIixcbiAgICAgIFwiZ2lmX2FzX3ZpZGVvXCI6IHRydWUsXG4gICAgICBcIm1heF9xdW90YV9nYlwiOiAxMCxcbiAgICB9O1xuXG4gICAgb3ZlcndvbGYubWVkaWEucmVwbGF5cy50dXJuT24oe1xuICAgICAgXCJzZXR0aW5nc1wiOiBzdHJlYW1TZXR0aW5ncyxcbiAgICAgIFwiaGlnaGxpZ2h0c1wiOiB7XG4gICAgICAgIFwiZW5hYmxlXCIgOiBmYWxzZSwgLy9zZXQgZmFsc2UgaWYgeW91IHdhbnQgdG8gcmVjb3JkIHRoZSBoaWdobGlndGhzIG1hbnVhbGx5XG4gICAgICAgIFwicmVxdWlyZUhpZ2hsaWdodHNcIiA6IFwia2lsbFwiIC8vYW4gaW50ZXJlc3RpbmcgZXZlbnN0IHRoYXQgaGFwcGVuZWQgaW4gZ2FtZVxuICAgICAgfSxcbiAgICB9LCAocmVzKSA9PntcbiAgICAgIHRoaXMubG9nTGluZSh0aGlzLl9ldmVudHNMb2csIHJlcywgdHJ1ZSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIG9uSW5mb1VwZGF0ZXMoaW5mbykge1xuICAgIHRoaXMubG9nTGluZSh0aGlzLl9pbmZvTG9nLCBpbmZvLCBmYWxzZSk7XG4gIH1cblxuICAvLyBTcGVjaWFsIGV2ZW50cyB3aWxsIGJlIGhpZ2hsaWdodGVkIGluIHRoZSBldmVudCBsb2dcbiAgcHJpdmF0ZSBvbk5ld0V2ZW50cyhlKSB7XG4gICAgY29uc3Qgc2hvdWxkSGlnaGxpZ2h0ID0gZS5ldmVudHMuc29tZShldmVudCA9PiB7XG4gICAgICByZXR1cm4gZXZlbnQubmFtZSA9PT0gJ2tpbGwnIHx8XG4gICAgICAgIGV2ZW50Lm5hbWUgPT09ICdkZWF0aCcgfHxcbiAgICAgICAgZXZlbnQubmFtZSA9PT0gJ2Fzc2lzdCcgfHxcbiAgICAgICAgZXZlbnQubmFtZSA9PT0gJ2xldmVsJyB8fFxuICAgICAgICBldmVudC5uYW1lID09PSAnYm9tYl9wbGFudGVkJyB8fFxuICAgICAgICBldmVudC5uYW1lID09PSAnY29sbGVjdGlvbicgfHxcbiAgICAgICAgZXZlbnQubmFtZSA9PT0gJ3RlYW1Hb2FsJyB8fFxuICAgICAgICBldmVudC5uYW1lID09PSAnb3Bwb3NpbmdUZWFtR29hbCdcbiAgICB9KTtcbiAgICB0aGlzLmxvZ0xpbmUodGhpcy5fZXZlbnRzTG9nLCBlLCBzaG91bGRIaWdobGlnaHQpO1xuICAgIGlmIChzaG91bGRIaWdobGlnaHQpIHtcbiAgICAgIG92ZXJ3b2xmLm1lZGlhLnJlcGxheXMuY2FwdHVyZSgzMDAwMCwgNTAwMCwgKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICB0aGlzLmxvZ0xpbmUodGhpcy5fZXZlbnRzTG9nLCBKU09OLnN0cmluZ2lmeShyZXMpLCB0cnVlKTtcbiAgICAgIH0sIChyZXMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgICAgdGhpcy5sb2dMaW5lKHRoaXMuX2V2ZW50c0xvZywgSlNPTi5zdHJpbmdpZnkocmVzKSwgdHJ1ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvLyAvL0Rpc3BsYXlzIHRoZSB0b2dnbGUgbWluaW1pemUvcmVzdG9yZSBob3RrZXkgaW4gdGhlIHdpbmRvdyBoZWFkZXJcbiAgLy8gcHJpdmF0ZSBhc3luYyBzZXRUb2dnbGVIb3RrZXlUZXh0KCkge1xuICAvLyAgIGNvbnN0IGhvdGtleVRleHQgPSBhd2FpdCBPV0hvdGtleXMuZ2V0SG90a2V5VGV4dChob3RrZXlzLnRvZ2dsZSk7XG4gIC8vICAgY29uc3QgaG90a2V5RWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3RrZXknKTtcbiAgLy8gICBob3RrZXlFbGVtLnRleHRDb250ZW50ID0gaG90a2V5VGV4dDtcbiAgLy8gfVxuICAvL1xuICAvLyAvL1NldHMgdG9nZ2xlSW5HYW1lV2luZG93IGFzIHRoZSBiZWhhdmlvciBmb3IgdGhlIEN0cmwrRiBob3RrZXlcbiAgLy8gcHJpdmF0ZSBhc3luYyBzZXRUb2dnbGVIb3RrZXlCZWhhdmlvcigpIHtcbiAgLy8gICBjb25zdCB0b2dnbGVJbkdhbWVXaW5kb3cgPSBhc3luYyBob3RrZXlSZXN1bHQgPT4ge1xuICAvLyAgICAgY29uc29sZS5sb2coYHByZXNzZWQgaG90a2V5IGZvciAke2hvdGtleVJlc3VsdC5mZWF0dXJlSWR9YCk7XG4gIC8vICAgICBjb25zdCBpbkdhbWVTdGF0ZSA9IGF3YWl0IHRoaXMuZ2V0V2luZG93U3RhdGUoKTtcbiAgLy9cbiAgLy8gICAgIGlmIChpbkdhbWVTdGF0ZS53aW5kb3dfc3RhdGUgPT09IFdpbmRvd1N0YXRlLk5PUk1BTCB8fFxuICAvLyAgICAgICBpbkdhbWVTdGF0ZS53aW5kb3dfc3RhdGUgPT09IFdpbmRvd1N0YXRlLk1BWElNSVpFRCkge1xuICAvLyAgICAgICB0aGlzLmN1cnJXaW5kb3cubWluaW1pemUoKTtcbiAgLy8gICAgIH0gZWxzZSBpZiAoaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5NSU5JTUlaRUQgfHxcbiAgLy8gICAgICAgaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5DTE9TRUQpIHtcbiAgLy8gICAgICAgdGhpcy5jdXJyV2luZG93LnJlc3RvcmUoKTtcbiAgLy8gICAgIH1cbiAgLy8gICB9XG4gIC8vXG4gIC8vICAgT1dIb3RrZXlzLm9uSG90a2V5RG93bihob3RrZXlzLnRvZ2dsZSwgdG9nZ2xlSW5HYW1lV2luZG93KTtcbiAgLy8gfVxuXG4gIC8vIEFwcGVuZHMgYSBuZXcgbGluZSB0byB0aGUgc3BlY2lmaWVkIGxvZ1xuICBwcml2YXRlIGxvZ0xpbmUobG9nOiBIVE1MRWxlbWVudCwgZGF0YSwgaGlnaGxpZ2h0KSB7XG4gICAgY29uc29sZS5sb2coYCR7bG9nLmlkfTpgKTtcbiAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncHJlJyk7XG4gICAgbGluZS50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG4gICAgaWYgKGhpZ2hsaWdodCkge1xuICAgICAgbGluZS5jbGFzc05hbWUgPSAnaGlnaGxpZ2h0JztcbiAgICB9XG5cbiAgICBjb25zdCBzaG91bGRBdXRvU2Nyb2xsID0gKGxvZy5zY3JvbGxUb3AgKyBsb2cub2Zmc2V0SGVpZ2h0KSA+IChsb2cuc2Nyb2xsSGVpZ2h0IC0gMTApO1xuXG4gICAgbG9nLmFwcGVuZENoaWxkKGxpbmUpO1xuXG4gICAgaWYgKHNob3VsZEF1dG9TY3JvbGwpIHtcbiAgICAgIGxvZy5zY3JvbGxUb3AgPSBsb2cuc2Nyb2xsSGVpZ2h0O1xuICAgIH1cbiAgfVxufVxuXG5JbkdhbWUuaW5zdGFuY2UoKS5ydW4oKTsiXSwic291cmNlUm9vdCI6IiJ9