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
const fortniteClassId = 21216;
exports.fortniteClassId = fortniteClassId;
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

/***/ "./odk-ts/ow-hotkeys.ts":
/*!******************************!*\
  !*** ./odk-ts/ow-hotkeys.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWHotkeys {
    constructor() { }
    static getHotkeyText(hotkeyId) {
        return new Promise((resolve, reject) => {
            overwolf.settings.getHotKey(hotkeyId, result => {
                if (!result || !result.success || !result.hotkey) {
                    resolve('UNASSIGNED');
                }
                resolve(result.hotkey);
            });
        });
    }
    static onHotkeyDown(hotkeyId, action) {
        overwolf.settings.registerHotKey(hotkeyId, action);
    }
}
exports.OWHotkeys = OWHotkeys;


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
const ow_hotkeys_1 = __webpack_require__(/*! ../../odk-ts/ow-hotkeys */ "./odk-ts/ow-hotkeys.ts");
const consts_1 = __webpack_require__(/*! ../../consts */ "./consts.ts");
class InGame extends AppWindow_1.AppWindow {
    constructor() {
        super(consts_1.windowNames.inGame);
        this._eventsLog = document.getElementById('eventsLog');
        this._infoLog = document.getElementById('infoLog');
        this.setToggleHotkeyBehavior();
        this.setToggleHotkeyText();
        this._fortniteGameEventsListener = new ow_games_events_1.OWGamesEvents({
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
        this._fortniteGameEventsListener.start();
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
    async setToggleHotkeyText() {
        const hotkeyText = await ow_hotkeys_1.OWHotkeys.getHotkeyText(consts_1.hotkeys.toggle);
        const hotkeyElem = document.getElementById('hotkey');
        hotkeyElem.textContent = hotkeyText;
    }
    async setToggleHotkeyBehavior() {
        const toggleInGameWindow = async (hotkeyResult) => {
            console.log(`pressed hotkey for ${hotkeyResult.featureId}`);
            const inGameState = await this.getWindowState();
            if (inGameState.window_state === "normal" ||
                inGameState.window_state === "maximized") {
                this.currWindow.minimize();
            }
            else if (inGameState.window_state === "minimized" ||
                inGameState.window_state === "closed") {
                this.currWindow.restore();
            }
        };
        ow_hotkeys_1.OWHotkeys.onHotkeyDown(consts_1.hotkeys.toggle, toggleInGameWindow);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy1nYW1lcy1ldmVudHMudHMiLCJ3ZWJwYWNrOi8vLy4vb2RrLXRzL293LWhvdGtleXMudHMiLCJ3ZWJwYWNrOi8vLy4vb2RrLXRzL293LXdpbmRvdy50cyIsIndlYnBhY2s6Ly8vLi9vZGstdHMvdGltZXIudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9BcHBXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vLy4vd2luZG93cy9pbl9nYW1lL2luX2dhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDbEZBLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQztBQWtDNUIsMENBQWU7QUFoQ2pCLE1BQU0sbUJBQW1CLEdBQUc7SUFDMUIsVUFBVTtJQUNW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UyxHQUFHLFdBQVcsQ0FBQztTQUM5QjtRQUVELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFdEYsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFJLGdCQUFnQixFQUFFO1lBQ3BCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztTQUNsQztJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJpbl9nYW1lL2luX2dhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3dpbmRvd3MvaW5fZ2FtZS9pbl9nYW1lLnRzXCIpO1xuIiwiY29uc3QgZm9ydG5pdGVDbGFzc0lkID0gMjEyMTY7XG5cbmNvbnN0IGludGVyZXN0aW5nRmVhdHVyZXMgPSBbXG4gICdjb3VudGVycycsXG4gICdkZWF0aCcsXG4gICdpdGVtcycsXG4gICdraWxsJyxcbiAgJ2tpbGxlZCcsXG4gICdraWxsZXInLFxuICAnbG9jYXRpb24nLFxuICAnbWF0Y2hfaW5mbycsXG4gICdtYXRjaCcsXG4gICdtZScsXG4gICdwaGFzZScsXG4gICdyYW5rJyxcbiAgJ3Jldml2ZWQnLFxuICAncm9zdGVyJyxcbiAgJ3RlYW0nLFxuICAnY29sbGVjdGlvbicsXG4gICd0ZWFtR29hbCcsXG4gICdvcHBvc2luZ1RlYW1Hb2FsJyxcbiAgJ2JvbWJfcGxhbnRlZCdcbl07XG5cbmNvbnN0IHdpbmRvd05hbWVzID0ge1xuICBpbkdhbWU6ICdpbl9nYW1lJyxcbiAgZGVza3RvcDogJ2Rlc2t0b3AnXG59O1xuXG5jb25zdCBob3RrZXlzID0ge1xuICB0b2dnbGU6ICdzaG93aGlkZSdcbn07XG5cbmV4cG9ydCB7XG4gIGZvcnRuaXRlQ2xhc3NJZCxcbiAgaW50ZXJlc3RpbmdGZWF0dXJlcyxcbiAgd2luZG93TmFtZXMsXG4gIGhvdGtleXNcbn0iLCJpbXBvcnQgeyBUaW1lciB9IGZyb20gXCIuL3RpbWVyXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSU9XR2FtZXNFdmVudHNEZWxlZ2F0ZSB7XG4gIG9uSW5mb1VwZGF0ZXMoaW5mbzogYW55KTtcbiAgb25OZXdFdmVudHMoZTogYW55KTtcbn1cblxuZXhwb3J0IGNsYXNzIE9XR2FtZXNFdmVudHMge1xuICBwcml2YXRlIF9kZWxlZ2F0ZTogSU9XR2FtZXNFdmVudHNEZWxlZ2F0ZTtcbiAgcHJpdmF0ZSBfZmVhdHVyZVJldHJpZXM6IG51bWJlcjtcbiAgcHJpdmF0ZSBfcmVxdWlyZWRGZWF0dXJlczogc3RyaW5nW107XG5cbiAgY29uc3RydWN0b3IoZGVsZWdhdGU6IElPV0dhbWVzRXZlbnRzRGVsZWdhdGUsIFxuICAgICAgICAgICAgICByZXF1aXJlZEZlYXR1cmVzOiBzdHJpbmdbXSwgXG4gICAgICAgICAgICAgIGZlYXR1cmVSZXRyaWVzOiBudW1iZXIgPSAxMCkge1xuICAgIHRoaXMuX2RlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgdGhpcy5fcmVxdWlyZWRGZWF0dXJlcyA9IHJlcXVpcmVkRmVhdHVyZXM7XG4gICAgdGhpcy5fZmVhdHVyZVJldHJpZXMgPSBmZWF0dXJlUmV0cmllcztcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRJbmZvKCk6IFByb21pc2U8YW55PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICBvdmVyd29sZi5nYW1lcy5ldmVudHMuZ2V0SW5mbyhyZXNvbHZlKTtcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzZXRSZXF1aXJlZEZlYXR1cmVzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGxldCB0cmllczpudW1iZXIgPSAxLFxuICAgICAgICByZXN1bHQ7XG5cbiAgICB3aGlsZSAoIHRyaWVzIDw9IHRoaXMuX2ZlYXR1cmVSZXRyaWVzICkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5zZXRSZXF1aXJlZEZlYXR1cmVzKFxuICAgICAgICAgIHRoaXMuX3JlcXVpcmVkRmVhdHVyZXMsXG4gICAgICAgICAgcmVzb2x2ZVxuICAgICAgICApO1xuICAgICAgfSlcblxuICAgICAgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZXRSZXF1aXJlZEZlYXR1cmVzKCk6IHN1Y2Nlc3M6ICcrIEpTT04uc3RyaW5naWZ5KHJlc3VsdCwgbnVsbCwgMikpO1xuICAgICAgICByZXR1cm4gKHJlc3VsdC5zdXBwb3J0ZWRGZWF0dXJlcy5sZW5ndGggPiAwKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgVGltZXIud2FpdCgzMDAwKTtcbiAgICAgIHRyaWVzKys7XG4gICAgfVxuXG4gICAgY29uc29sZS53YXJuKCdzZXRSZXF1aXJlZEZlYXR1cmVzKCk6IGZhaWx1cmUgYWZ0ZXIgJysgdHJpZXMgKycgdHJpZXMnKyBKU09OLnN0cmluZ2lmeShyZXN1bHQsIG51bGwsIDIpKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIHJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xuICAgIHRoaXMudW5SZWdpc3RlckV2ZW50cygpO1xuXG4gICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLm9uSW5mb1VwZGF0ZXMyLmFkZExpc3RlbmVyKHRoaXMub25JbmZvVXBkYXRlcyk7XG4gICAgb3ZlcndvbGYuZ2FtZXMuZXZlbnRzLm9uTmV3RXZlbnRzLmFkZExpc3RlbmVyKHRoaXMub25OZXdFdmVudHMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1blJlZ2lzdGVyRXZlbnRzKCk6IHZvaWQge1xuICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbkluZm9VcGRhdGVzMi5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uSW5mb1VwZGF0ZXMpO1xuICAgIG92ZXJ3b2xmLmdhbWVzLmV2ZW50cy5vbk5ld0V2ZW50cy5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uTmV3RXZlbnRzKTtcbiAgfVxuXG4gIHByaXZhdGUgb25JbmZvVXBkYXRlcyA9IChpbmZvOiBhbnkpOiB2b2lkID0+IHtcbiAgICB0aGlzLl9kZWxlZ2F0ZS5vbkluZm9VcGRhdGVzKGluZm8uaW5mbyk7XG4gIH1cblxuICBwcml2YXRlIG9uTmV3RXZlbnRzID0gKGU6IGFueSk6IHZvaWQgPT4ge1xuICAgIHRoaXMuX2RlbGVnYXRlLm9uTmV3RXZlbnRzKGUpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHN0YXJ0KCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKGBbb3ctZ2FtZS1ldmVudHNdIFNUQVJUYCk7XG5cbiAgICB0aGlzLnJlZ2lzdGVyRXZlbnRzKCk7XG4gICAgYXdhaXQgdGhpcy5zZXRSZXF1aXJlZEZlYXR1cmVzKCk7XG5cbiAgICBjb25zdCB7IHJlcywgc3RhdHVzIH0gPSBhd2FpdCB0aGlzLmdldEluZm8oKTtcblxuICAgIGlmICggcmVzICYmIHN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICkge1xuICAgICAgdGhpcy5vbkluZm9VcGRhdGVzKHsgaW5mbzogcmVzIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKGBbb3ctZ2FtZS1ldmVudHNdIFNUT1BgKTtcblxuICAgIHRoaXMudW5SZWdpc3RlckV2ZW50cygpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgT1dIb3RrZXlzIHtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXRIb3RrZXlUZXh0KGhvdGtleUlkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBvdmVyd29sZi5zZXR0aW5ncy5nZXRIb3RLZXkoaG90a2V5SWQsIHJlc3VsdCA9PiB7XG4gICAgICAgIGlmICghcmVzdWx0IHx8ICFyZXN1bHQuc3VjY2VzcyB8fCAhcmVzdWx0LmhvdGtleSkge1xuICAgICAgICAgIHJlc29sdmUoJ1VOQVNTSUdORUQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUocmVzdWx0LmhvdGtleSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgb25Ib3RrZXlEb3duKGhvdGtleUlkOiBzdHJpbmcsIGFjdGlvbjogKGhvdGtleVJlc3VsdDogb3ZlcndvbGYuc2V0dGluZ3MuSG90S2V5UmVzdWx0KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgb3ZlcndvbGYuc2V0dGluZ3MucmVnaXN0ZXJIb3RLZXkoaG90a2V5SWQsIGFjdGlvbik7XG4gIH1cbn0iLCJ0eXBlIEdldFdpbmRvd1N0YXRlUmVzdWx0ID0gb3ZlcndvbGYud2luZG93cy5HZXRXaW5kb3dTdGF0ZVJlc3VsdDtcbnR5cGUgT3dXaW5kb3dJbmZvID0gb3ZlcndvbGYud2luZG93cy5XaW5kb3dJbmZvO1xuZXhwb3J0IGNsYXNzIE9XV2luZG93IHtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9pZCA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzdG9yZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MucmVzdG9yZShpZCwgcmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcylcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbcmVzdG9yZV0gLSBhbiBlcnJvciBvY2N1cnJlZCwgd2luZG93SWQ9JHtpZH0sIHJlYXNvbj0ke3Jlc3VsdC5lcnJvcn1gKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBtaW5pbWl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLm1pbmltaXplKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIG1heGltaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MubWF4aW1pemUoaWQsICgpID0+IHsgfSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaGlkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmhpZGUoaWQsICgpID0+IHsgfSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xvc2UoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmdldFdpbmRvd1N0YXRlKCk7XG5cbiAgICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJlxuICAgICAgICAocmVzdWx0LndpbmRvd19zdGF0ZSAhPT0gJ2Nsb3NlZCcpKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW50ZXJuYWxDbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgZHJhZ01vdmUoZWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICBlbGVtLm9ubW91c2Vkb3duID0gZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmRyYWdNb3ZlKHRoaXMuX25hbWUpO1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0V2luZG93U3RhdGUoKTogUHJvbWlzZTxHZXRXaW5kb3dTdGF0ZVJlc3VsdD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxHZXRXaW5kb3dTdGF0ZVJlc3VsdD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmdldFdpbmRvd1N0YXRlKGlkLCByZXNvbHZlKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRDdXJyZW50SW5mbygpOiBQcm9taXNlPE93V2luZG93SW5mbz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxPd1dpbmRvd0luZm8+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KHJlc3VsdCA9PiB7XG4gICAgICAgIHJlc29sdmUocmVzdWx0LndpbmRvdyk7XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIG9idGFpbigpOiBQcm9taXNlPE93V2luZG93SW5mbyB8IG51bGw+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2IgPSByZXMgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5zdGF0dXMgPT09IFwic3VjY2Vzc1wiICYmIHJlcy53aW5kb3cgJiYgcmVzLndpbmRvdy5pZCkge1xuICAgICAgICAgIHRoaXMuX2lkID0gcmVzLndpbmRvdy5pZDtcblxuICAgICAgICAgIGlmICghdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHJlcy53aW5kb3cubmFtZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKHJlcy53aW5kb3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2lkID0gbnVsbDtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKCF0aGlzLl9uYW1lKSB7XG4gICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhjYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KHRoaXMuX25hbWUsIGNiKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhc3N1cmVPYnRhaW5lZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5vYnRhaW4oKTtcbiAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGludGVybmFsQ2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcblxuICAgICAgb3ZlcndvbGYud2luZG93cy5jbG9zZShpZCwgcmVzID0+IHtcblxuICAgICAgICBpZiAocmVzICYmIHJlcy5zdWNjZXNzKVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxufVxuIiwiZXhwb3J0IGludGVyZmFjZSBUaW1lckRlbGVnYXRlIHtcbiAgb25UaW1lcihpZD86IHN0cmluZyk6IHZvaWQ7XG59XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5leHBvcnQgY2xhc3MgVGltZXIge1xuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcHJpdmF0ZSBfdGltZXJJZDogbnVtYmVyfG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9pZDogc3RyaW5nfHVuZGVmaW5lZDtcbiAgcHJpdmF0ZSBfZGVsZWdhdGU6IFRpbWVyRGVsZWdhdGU7XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHB1YmxpYyBzdGF0aWMgYXN5bmMgd2FpdChpbnRlcnZhbEluTVM6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgaW50ZXJ2YWxJbk1TKTtcbiAgICB9KVxuICB9XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIGNvbnN0cnVjdG9yKGRlbGVnYXRlOiBUaW1lckRlbGVnYXRlLCBpZD86IHN0cmluZykge1xuICAgIHRoaXMuX2RlbGVnYXRlID0gZGVsZWdhdGU7XG4gICAgdGhpcy5faWQgPSBpZDtcbiAgfVxuXG4gIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICBwdWJsaWMgc3RhcnQoaW50ZXJ2YWxJbk1TOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3AoKTtcblxuICAgIC8vQHRzLWlnbm9yZVxuICAgIHRoaXMuX3RpbWVySWQgPSA8bnVtYmVyPnNldFRpbWVvdXQodGhpcy5oYW5kbGVUaW1lckV2ZW50LCBpbnRlcnZhbEluTVMpO1xuICB9XG5cbiAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gIHB1YmxpYyBzdG9wKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl90aW1lcklkID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXJJZCk7XG4gICAgdGhpcy5fdGltZXJJZCA9IG51bGw7XG4gIH1cblxuICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgcHJpdmF0ZSBoYW5kbGVUaW1lckV2ZW50ID0gKCkgPT4ge1xuICAgIHRoaXMuX3RpbWVySWQgPSBudWxsO1xuICAgIHRoaXMuX2RlbGVnYXRlLm9uVGltZXIodGhpcy5faWQpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBPV1dpbmRvdyB9IGZyb20gXCIuLi9vZGstdHMvb3ctd2luZG93XCI7XG5cbi8vIEEgYmFzZSBjbGFzcyBmb3IgdGhlIGFwcCdzIGZvcmVncm91bmQgd2luZG93cy5cbi8vIFNldHMgdGhlIG1vZGFsIGFuZCBkcmFnIGJlaGF2aW9ycywgd2hpY2ggYXJlIHNoYXJlZCBhY2Nyb3NzIHRoZSBkZXNrdG9wIGFuZCBpbi1nYW1lIHdpbmRvd3MuXG5leHBvcnQgY2xhc3MgQXBwV2luZG93IHtcbiAgcHJvdGVjdGVkIGN1cnJXaW5kb3c6IE9XV2luZG93O1xuICBwcm90ZWN0ZWQgbWFpbldpbmRvdzogT1dXaW5kb3c7XG4gIHByb3RlY3RlZCBtYXhpbWl6ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcih3aW5kb3dOYW1lKSB7XG4gICAgdGhpcy5tYWluV2luZG93ID0gbmV3IE9XV2luZG93KCdiYWNrZ3JvdW5kJyk7XG4gICAgdGhpcy5jdXJyV2luZG93ID0gbmV3IE9XV2luZG93KHdpbmRvd05hbWUpO1xuICAgIFxuICAgIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlQnV0dG9uJyk7XG4gICAgY29uc3QgbWF4aW1pemVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWF4aW1pemVCdXR0b24nKTtcbiAgICBjb25zdCBtaW5pbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5pbWl6ZUJ1dHRvbicpO1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V4aXRNaW5pbWl6ZU1vZGFsJyk7XG4gICAgY29uc3QgbW9kYWxDbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdleGl0Jyk7XG4gICAgY29uc3QgbW9kYWxNaW5pbWl6ZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtaW5pbWl6ZScpO1xuXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlcicpO1xuICAgIFxuICAgIHRoaXMuc2V0RHJhZyhoZWFkZXIpO1xuICAgIFxuICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgfSk7XG5cbiAgICBtb2RhbENsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgdGhpcy5tYWluV2luZG93LmNsb3NlKCk7XG4gICAgfSk7XG4gICAgXG4gICAgbWluaW1pemVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICB0aGlzLmN1cnJXaW5kb3cubWluaW1pemUoKTtcbiAgICB9KTtcblxuICAgIG1heGltaXplQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLm1heGltaXplZCkge1xuICAgICAgICB0aGlzLmN1cnJXaW5kb3cubWF4aW1pemUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY3VycldpbmRvdy5yZXN0b3JlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubWF4aW1pemVkID0gIXRoaXMubWF4aW1pemVkO1xuICAgIH0pO1xuXG4gICAgbW9kYWxNaW5pbWl6ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHRoaXMuY3VycldpbmRvdy5taW5pbWl6ZSgpO1xuICAgICAgbW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBnZXRXaW5kb3dTdGF0ZSgpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5jdXJyV2luZG93LmdldFdpbmRvd1N0YXRlKCk7XG4gIH1cbiAgXG4gIHByaXZhdGUgYXN5bmMgc2V0RHJhZyhlbGVtKSB7XG4gICAgdGhpcy5jdXJyV2luZG93LmRyYWdNb3ZlKGVsZW0pO1xuICB9XG59IiwiaW1wb3J0IHsgQXBwV2luZG93IH0gZnJvbSBcIi4uL0FwcFdpbmRvd1wiO1xuaW1wb3J0IHsgT1dHYW1lc0V2ZW50cyB9IGZyb20gXCIuLi8uLi9vZGstdHMvb3ctZ2FtZXMtZXZlbnRzXCI7XG5pbXBvcnQgeyBPV0hvdGtleXMgfSBmcm9tIFwiLi4vLi4vb2RrLXRzL293LWhvdGtleXNcIjtcbmltcG9ydCB7IGludGVyZXN0aW5nRmVhdHVyZXMsIGhvdGtleXMsIHdpbmRvd05hbWVzIH0gZnJvbSBcIi4uLy4uL2NvbnN0c1wiO1xuaW1wb3J0IFdpbmRvd1N0YXRlID0gb3ZlcndvbGYud2luZG93cy5XaW5kb3dTdGF0ZTtcblxuLy8gVGhlIHdpbmRvdyBkaXNwbGF5ZWQgaW4tZ2FtZSB3aGlsZSBhIEZvcnRuaXRlIGdhbWUgaXMgcnVubmluZy5cbi8vIEl0IGxpc3RlbnMgdG8gYWxsIGluZm8gZXZlbnRzIGFuZCB0byB0aGUgZ2FtZSBldmVudHMgbGlzdGVkIGluIHRoZSBjb25zdHMudHMgZmlsZVxuLy8gYW5kIHdyaXRlcyB0aGVtIHRvIHRoZSByZWxldmFudCBsb2cgdXNpbmcgPHByZT4gdGFncy5cbi8vIFRoZSB3aW5kb3cgYWxzbyBzZXRzIHVwIEN0cmwrRiBhcyB0aGUgbWluaW1pemUvcmVzdG9yZSBob3RrZXkuXG4vLyBMaWtlIHRoZSBiYWNrZ3JvdW5kIHdpbmRvdywgaXQgYWxzbyBpbXBsZW1lbnRzIHRoZSBTaW5nbGV0b24gZGVzaWduIHBhdHRlcm4uXG5jbGFzcyBJbkdhbWUgZXh0ZW5kcyBBcHBXaW5kb3cge1xuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEluR2FtZTtcbiAgcHJpdmF0ZSBfZm9ydG5pdGVHYW1lRXZlbnRzTGlzdGVuZXI6IE9XR2FtZXNFdmVudHM7XG4gIHByaXZhdGUgX2V2ZW50c0xvZzogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX2luZm9Mb2c6IEhUTUxFbGVtZW50O1xuXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIod2luZG93TmFtZXMuaW5HYW1lKTtcblxuICAgIHRoaXMuX2V2ZW50c0xvZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdldmVudHNMb2cnKTtcbiAgICB0aGlzLl9pbmZvTG9nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2luZm9Mb2cnKTtcblxuICAgIHRoaXMuc2V0VG9nZ2xlSG90a2V5QmVoYXZpb3IoKTtcbiAgICB0aGlzLnNldFRvZ2dsZUhvdGtleVRleHQoKTtcblxuICAgIHRoaXMuX2ZvcnRuaXRlR2FtZUV2ZW50c0xpc3RlbmVyID0gbmV3IE9XR2FtZXNFdmVudHMoe1xuICAgICAgb25JbmZvVXBkYXRlczogdGhpcy5vbkluZm9VcGRhdGVzLmJpbmQodGhpcyksXG4gICAgICBvbk5ld0V2ZW50czogdGhpcy5vbk5ld0V2ZW50cy5iaW5kKHRoaXMpXG4gICAgfSxcbiAgICAgIGludGVyZXN0aW5nRmVhdHVyZXMpO1xuXG4gICAgdGhpcy5jdXJyV2luZG93Lm1pbmltaXplKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGluc3RhbmNlKCkge1xuICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IEluR2FtZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuXG4gIHB1YmxpYyBydW4oKSB7XG4gICAgdGhpcy5fZm9ydG5pdGVHYW1lRXZlbnRzTGlzdGVuZXIuc3RhcnQoKTtcblxuICAgIGxldCBzdHJlYW1TZXR0aW5ncyA9IHtcbiAgICAgIFwidmlkZW9cIjoge1xuICAgICAgICBcInN1Yl9mb2xkZXJfbmFtZVwiOiAndmlkZW8nLFxuICAgICAgICBcImZwc1wiOiAzMCxcbiAgICAgICAgXCJ3aWR0aFwiOiAxOTIwLFxuICAgICAgICBcImhlaWdodFwiOiAxMDgwLFxuICAgICAgICBcImF1dG9fY2FsY19rYnBzXCI6IHRydWUsXG4gICAgICAgIFwiYnVmZmVyX2xlbmd0aFwiOiAxODAwMCxcbiAgICAgICAgXCJtYXhfa2Jwc1wiOiAyMDAwMCxcbiAgICAgICAgJ2ZyYW1lX2ludGVydmFsJzogMSxcbiAgICAgICAgXCJ0ZXN0X2Ryb3BfZnJhbWVzX2ludGVydmFsXCI6IDEsXG4gICAgICAgIFwibm90aWZ5X2Ryb3BwZWRfZnJhbWVzX3JhdGlvXCI6IDIsXG4gICAgICAgIFwibWF4X2ZpbGVfc2l6ZV9ieXRlc1wiOiAxMDAwMDAwMDAwLFxuICAgICAgICBcImluY2x1ZGVfZnVsbF9zaXplX3ZpZGVvXCI6IHRydWUsXG4gICAgICAgIFwib3ZlcnJpZGVfb3ZlcndvbGZfc2V0dGluZ1wiOiBmYWxzZSxcbiAgICAgICAgXCJkaXNhYmxlX3doZW5fc2h0X25vdF9zdXBwb3J0ZWRcIjogZmFsc2UsXG4gICAgICB9LFxuICAgICAgLy9cImVuY29kZXJcIjogXCJJbnRlbFwiLFxuICAgICAgXCJnaWZfYXNfdmlkZW9cIjogdHJ1ZSxcbiAgICAgIFwibWF4X3F1b3RhX2diXCI6IDEwLFxuICAgIH07XG5cbiAgICBvdmVyd29sZi5tZWRpYS5yZXBsYXlzLnR1cm5Pbih7XG4gICAgICBcInNldHRpbmdzXCI6IHN0cmVhbVNldHRpbmdzLFxuICAgICAgXCJoaWdobGlnaHRzXCI6IHtcbiAgICAgICAgXCJlbmFibGVcIiA6IGZhbHNlLCAvL3NldCBmYWxzZSBpZiB5b3Ugd2FudCB0byByZWNvcmQgdGhlIGhpZ2hsaWd0aHMgbWFudWFsbHlcbiAgICAgICAgXCJyZXF1aXJlSGlnaGxpZ2h0c1wiIDogXCJraWxsXCIgLy9hbiBpbnRlcmVzdGluZyBldmVuc3QgdGhhdCBoYXBwZW5lZCBpbiBnYW1lXG4gICAgICB9LFxuICAgIH0sIChyZXMpID0+e1xuICAgICAgdGhpcy5sb2dMaW5lKHRoaXMuX2V2ZW50c0xvZywgcmVzLCB0cnVlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgb25JbmZvVXBkYXRlcyhpbmZvKSB7XG4gICAgdGhpcy5sb2dMaW5lKHRoaXMuX2luZm9Mb2csIGluZm8sIGZhbHNlKTtcbiAgfVxuXG4gIC8vIFNwZWNpYWwgZXZlbnRzIHdpbGwgYmUgaGlnaGxpZ2h0ZWQgaW4gdGhlIGV2ZW50IGxvZ1xuICBwcml2YXRlIG9uTmV3RXZlbnRzKGUpIHtcbiAgICBjb25zdCBzaG91bGRIaWdobGlnaHQgPSBlLmV2ZW50cy5zb21lKGV2ZW50ID0+IHtcbiAgICAgIHJldHVybiBldmVudC5uYW1lID09PSAna2lsbCcgfHxcbiAgICAgICAgZXZlbnQubmFtZSA9PT0gJ2RlYXRoJyB8fFxuICAgICAgICBldmVudC5uYW1lID09PSAnYXNzaXN0JyB8fFxuICAgICAgICBldmVudC5uYW1lID09PSAnbGV2ZWwnIHx8XG4gICAgICAgIGV2ZW50Lm5hbWUgPT09ICdib21iX3BsYW50ZWQnIHx8XG4gICAgICAgIGV2ZW50Lm5hbWUgPT09ICdjb2xsZWN0aW9uJyB8fFxuICAgICAgICBldmVudC5uYW1lID09PSAndGVhbUdvYWwnIHx8XG4gICAgICAgIGV2ZW50Lm5hbWUgPT09ICdvcHBvc2luZ1RlYW1Hb2FsJ1xuICAgIH0pO1xuICAgIHRoaXMubG9nTGluZSh0aGlzLl9ldmVudHNMb2csIGUsIHNob3VsZEhpZ2hsaWdodCk7XG4gICAgaWYgKHNob3VsZEhpZ2hsaWdodCkge1xuICAgICAgb3ZlcndvbGYubWVkaWEucmVwbGF5cy5jYXB0dXJlKDMwMDAwLCA1MDAwLCAocmVzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAgIHRoaXMubG9nTGluZSh0aGlzLl9ldmVudHNMb2csIEpTT04uc3RyaW5naWZ5KHJlcyksIHRydWUpO1xuICAgICAgfSwgKHJlcykgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgICB0aGlzLmxvZ0xpbmUodGhpcy5fZXZlbnRzTG9nLCBKU09OLnN0cmluZ2lmeShyZXMpLCB0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vRGlzcGxheXMgdGhlIHRvZ2dsZSBtaW5pbWl6ZS9yZXN0b3JlIGhvdGtleSBpbiB0aGUgd2luZG93IGhlYWRlclxuICBwcml2YXRlIGFzeW5jIHNldFRvZ2dsZUhvdGtleVRleHQoKSB7XG4gICAgY29uc3QgaG90a2V5VGV4dCA9IGF3YWl0IE9XSG90a2V5cy5nZXRIb3RrZXlUZXh0KGhvdGtleXMudG9nZ2xlKTtcbiAgICBjb25zdCBob3RrZXlFbGVtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdGtleScpO1xuICAgIGhvdGtleUVsZW0udGV4dENvbnRlbnQgPSBob3RrZXlUZXh0O1xuICB9XG5cbiAgLy9TZXRzIHRvZ2dsZUluR2FtZVdpbmRvdyBhcyB0aGUgYmVoYXZpb3IgZm9yIHRoZSBDdHJsK0YgaG90a2V5XG4gIHByaXZhdGUgYXN5bmMgc2V0VG9nZ2xlSG90a2V5QmVoYXZpb3IoKSB7XG4gICAgY29uc3QgdG9nZ2xlSW5HYW1lV2luZG93ID0gYXN5bmMgaG90a2V5UmVzdWx0ID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKGBwcmVzc2VkIGhvdGtleSBmb3IgJHtob3RrZXlSZXN1bHQuZmVhdHVyZUlkfWApO1xuICAgICAgY29uc3QgaW5HYW1lU3RhdGUgPSBhd2FpdCB0aGlzLmdldFdpbmRvd1N0YXRlKCk7XG5cbiAgICAgIGlmIChpbkdhbWVTdGF0ZS53aW5kb3dfc3RhdGUgPT09IFdpbmRvd1N0YXRlLk5PUk1BTCB8fFxuICAgICAgICBpbkdhbWVTdGF0ZS53aW5kb3dfc3RhdGUgPT09IFdpbmRvd1N0YXRlLk1BWElNSVpFRCkge1xuICAgICAgICB0aGlzLmN1cnJXaW5kb3cubWluaW1pemUoKTtcbiAgICAgIH0gZWxzZSBpZiAoaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5NSU5JTUlaRUQgfHxcbiAgICAgICAgaW5HYW1lU3RhdGUud2luZG93X3N0YXRlID09PSBXaW5kb3dTdGF0ZS5DTE9TRUQpIHtcbiAgICAgICAgdGhpcy5jdXJyV2luZG93LnJlc3RvcmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBPV0hvdGtleXMub25Ib3RrZXlEb3duKGhvdGtleXMudG9nZ2xlLCB0b2dnbGVJbkdhbWVXaW5kb3cpO1xuICB9XG5cbiAgLy8gQXBwZW5kcyBhIG5ldyBsaW5lIHRvIHRoZSBzcGVjaWZpZWQgbG9nXG4gIHByaXZhdGUgbG9nTGluZShsb2c6IEhUTUxFbGVtZW50LCBkYXRhLCBoaWdobGlnaHQpIHtcbiAgICBjb25zb2xlLmxvZyhgJHtsb2cuaWR9OmApO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGNvbnN0IGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwcmUnKTtcbiAgICBsaW5lLnRleHRDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG5cbiAgICBpZiAoaGlnaGxpZ2h0KSB7XG4gICAgICBsaW5lLmNsYXNzTmFtZSA9ICdoaWdobGlnaHQnO1xuICAgIH1cblxuICAgIGNvbnN0IHNob3VsZEF1dG9TY3JvbGwgPSAobG9nLnNjcm9sbFRvcCArIGxvZy5vZmZzZXRIZWlnaHQpID4gKGxvZy5zY3JvbGxIZWlnaHQgLSAxMCk7XG5cbiAgICBsb2cuYXBwZW5kQ2hpbGQobGluZSk7XG5cbiAgICBpZiAoc2hvdWxkQXV0b1Njcm9sbCkge1xuICAgICAgbG9nLnNjcm9sbFRvcCA9IGxvZy5zY3JvbGxIZWlnaHQ7XG4gICAgfVxuICB9XG59XG5cbkluR2FtZS5pbnN0YW5jZSgpLnJ1bigpOyJdLCJzb3VyY2VSb290IjoiIn0=