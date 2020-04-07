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
/******/ 	return __webpack_require__(__webpack_require__.s = "./windows/background/background.ts");
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

/***/ "./odk-ts/ow-game-listener.ts":
/*!************************************!*\
  !*** ./odk-ts/ow-game-listener.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ow_listener_1 = __webpack_require__(/*! ./ow-listener */ "./odk-ts/ow-listener.ts");
class OWGameListener extends ow_listener_1.OWListener {
    constructor(delegate) {
        super(delegate);
        this.onGameInfoUpdated = (update) => {
            if (!update || !update.gameInfo) {
                return;
            }
            if (!update.runningChanged && !update.gameChanged) {
                return;
            }
            if (update.gameInfo.isRunning) {
                if (this._delegate.onGameStarted) {
                    this._delegate.onGameStarted(update.gameInfo);
                }
            }
            else {
                if (this._delegate.onGameEnded) {
                    this._delegate.onGameEnded(update.gameInfo);
                }
            }
        };
        this.onRunningGameInfo = (info) => {
            if (!info) {
                return;
            }
            if (info.isRunning) {
                if (this._delegate.onGameStarted) {
                    this._delegate.onGameStarted(info);
                }
            }
        };
    }
    start() {
        super.start();
        overwolf.games.onGameInfoUpdated.addListener(this.onGameInfoUpdated);
        overwolf.games.getRunningGameInfo(this.onRunningGameInfo);
    }
    stop() {
        overwolf.games.onGameInfoUpdated.removeListener(this.onGameInfoUpdated);
    }
}
exports.OWGameListener = OWGameListener;


/***/ }),

/***/ "./odk-ts/ow-games.ts":
/*!****************************!*\
  !*** ./odk-ts/ow-games.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWGames {
    static getRunningGameInfo() {
        return new Promise((resolve) => {
            overwolf.games.getRunningGameInfo(resolve);
        });
    }
    static classIdFromGameId(gameId) {
        let classId = Math.floor(gameId / 10);
        return classId;
    }
    static async getRecentlyPlayedGames(limit = 3) {
        return new Promise((resolve) => {
            if (!overwolf.games.getRecentlyPlayedGames) {
                return resolve(null);
            }
            overwolf.games.getRecentlyPlayedGames(limit, result => {
                resolve(result.games);
            });
        });
    }
    static async getGameDBInfo(gameClassId) {
        return new Promise((resolve) => {
            overwolf.games.getGameDBInfo(gameClassId, resolve);
        });
    }
}
exports.OWGames = OWGames;


/***/ }),

/***/ "./odk-ts/ow-listener.ts":
/*!*******************************!*\
  !*** ./odk-ts/ow-listener.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class OWListener {
    constructor(delegate) {
        this._delegate = delegate;
    }
    start() {
        this.stop();
    }
}
exports.OWListener = OWListener;


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

/***/ "./windows/background/background.ts":
/*!******************************************!*\
  !*** ./windows/background/background.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = __webpack_require__(/*! ../../consts */ "./consts.ts");
const ow_games_1 = __webpack_require__(/*! ../../odk-ts/ow-games */ "./odk-ts/ow-games.ts");
const ow_game_listener_1 = __webpack_require__(/*! ../../odk-ts/ow-game-listener */ "./odk-ts/ow-game-listener.ts");
const ow_window_1 = __webpack_require__(/*! ../../odk-ts/ow-window */ "./odk-ts/ow-window.ts");
class BackgroundController {
    constructor() {
        this._windows = {};
        this._windows[consts_1.windowNames.desktop] = new ow_window_1.OWWindow(consts_1.windowNames.desktop);
        this._windows[consts_1.windowNames.inGame] = new ow_window_1.OWWindow(consts_1.windowNames.inGame);
        this._fortniteGameListener = new ow_game_listener_1.OWGameListener({
            onGameStarted: this.toggleWindows.bind(this),
            onGameEnded: this.toggleWindows.bind(this)
        });
    }
    ;
    static instance() {
        if (!BackgroundController._instance) {
            BackgroundController._instance = new BackgroundController();
        }
        return BackgroundController._instance;
    }
    async run() {
        this._fortniteGameListener.start();
        const currWindow = await this.isFortniteRunning() ? consts_1.windowNames.inGame : consts_1.windowNames.desktop;
        this._windows[currWindow].restore();
    }
    toggleWindows(info) {
        if (!info || !this.isGameFortnite(info)) {
            return;
        }
        if (info.isRunning) {
            this._windows[consts_1.windowNames.desktop].close();
            this._windows[consts_1.windowNames.inGame].restore();
            this._windows[consts_1.windowNames.inGame].minimize();
        }
        else {
            this._windows[consts_1.windowNames.inGame].close();
        }
    }
    async isFortniteRunning() {
        const info = await ow_games_1.OWGames.getRunningGameInfo();
        return info && info.isRunning && this.isGameFortnite(info);
    }
    isGameFortnite(info) {
        return true;
    }
}
BackgroundController.instance().run();


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vY29uc3RzLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy1nYW1lLWxpc3RlbmVyLnRzIiwid2VicGFjazovLy8uL29kay10cy9vdy1nYW1lcy50cyIsIndlYnBhY2s6Ly8vLi9vZGstdHMvb3ctbGlzdGVuZXIudHMiLCJ3ZWJwYWNrOi8vLy4vb2RrLXRzL293LXdpbmRvdy50cyIsIndlYnBhY2s6Ly8vLi93aW5kb3dzL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNsRkEsTUFBTSxtQkFBbUIsR0FBRztJQUMxQixVQUFVO0lBQ1YsT0FBTztJQUNQLE9BQU87SUFDUCxNQUFNO0lBQ04sUUFBUTtJQUNSLFFBQVE7SUFDUixVQUFVO0lBQ1YsWUFBWTtJQUNa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QU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUU5QzthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBSTNDO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyxpQkFBaUI7UUFDN0IsTUFBTSxJQUFJLEdBQUcsTUFBTSxrQkFBTyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDaEQsT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFHTyxjQUFjLENBQUMsSUFBcUI7UUFDMUMsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFFRCxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyIsImZpbGUiOiJiYWNrZ3JvdW5kL2JhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3dpbmRvd3MvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwiY29uc3QgaW50ZXJlc3RpbmdGZWF0dXJlcyA9IFtcbiAgJ2NvdW50ZXJzJyxcbiAgJ2RlYXRoJyxcbiAgJ2l0ZW1zJyxcbiAgJ2tpbGwnLFxuICAna2lsbGVkJyxcbiAgJ2tpbGxlcicsXG4gICdsb2NhdGlvbicsXG4gICdtYXRjaF9pbmZvJyxcbiAgJ21hdGNoJyxcbiAgJ21lJyxcbiAgJ3BoYXNlJyxcbiAgJ3JhbmsnLFxuICAncmV2aXZlZCcsXG4gICdyb3N0ZXInLFxuICAndGVhbScsXG4gICdjb2xsZWN0aW9uJyxcbiAgJ3RlYW1Hb2FsJyxcbiAgJ29wcG9zaW5nVGVhbUdvYWwnLFxuICAnYm9tYl9wbGFudGVkJ1xuXTtcblxuY29uc3Qgd2luZG93TmFtZXMgPSB7XG4gIGluR2FtZTogJ2luX2dhbWUnLFxuICBkZXNrdG9wOiAnZGVza3RvcCdcbn07XG5cbmNvbnN0IGhvdGtleXMgPSB7XG4gIHRvZ2dsZTogJ3Nob3doaWRlJ1xufTtcblxuZXhwb3J0IHtcbiAgaW50ZXJlc3RpbmdGZWF0dXJlcyxcbiAgd2luZG93TmFtZXMsXG4gIGhvdGtleXNcbn0iLCJpbXBvcnQgeyBPV0xpc3RlbmVyLCBPV0xpc3RlbmVyRGVsZWdhdGUgfSBmcm9tIFwiLi9vdy1saXN0ZW5lclwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9XR2FtZUxpc3RlbmVyRGVsZWdhdGUgZXh0ZW5kcyBPV0xpc3RlbmVyRGVsZWdhdGUge1xuICBvbkdhbWVTdGFydGVkPyhpbmZvOiBvdmVyd29sZi5nYW1lcy5SdW5uaW5nR2FtZUluZm8pO1xuICBvbkdhbWVFbmRlZD8oaW5mbzogb3ZlcndvbGYuZ2FtZXMuUnVubmluZ0dhbWVJbmZvKTtcbn1cblxuZXhwb3J0IGNsYXNzIE9XR2FtZUxpc3RlbmVyIGV4dGVuZHMgT1dMaXN0ZW5lcjxPV0dhbWVMaXN0ZW5lckRlbGVnYXRlPiB7XG4gIGNvbnN0cnVjdG9yKGRlbGVnYXRlOiBPV0dhbWVMaXN0ZW5lckRlbGVnYXRlKSB7XG4gICAgc3VwZXIoZGVsZWdhdGUpO1xuICB9XG5cbiAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xuICAgIHN1cGVyLnN0YXJ0KCk7XG5cbiAgICBvdmVyd29sZi5nYW1lcy5vbkdhbWVJbmZvVXBkYXRlZC5hZGRMaXN0ZW5lcih0aGlzLm9uR2FtZUluZm9VcGRhdGVkKTtcbiAgICBvdmVyd29sZi5nYW1lcy5nZXRSdW5uaW5nR2FtZUluZm8odGhpcy5vblJ1bm5pbmdHYW1lSW5mbyk7XG4gIH1cblxuICBwdWJsaWMgc3RvcCgpOiB2b2lkIHtcbiAgICBvdmVyd29sZi5nYW1lcy5vbkdhbWVJbmZvVXBkYXRlZC5yZW1vdmVMaXN0ZW5lcih0aGlzLm9uR2FtZUluZm9VcGRhdGVkKTtcbiAgfVxuXG4gIHByaXZhdGUgb25HYW1lSW5mb1VwZGF0ZWQgPSAodXBkYXRlOiBvdmVyd29sZi5nYW1lcy5HYW1lSW5mb1VwZGF0ZWRFdmVudCk6IHZvaWQgPT4ge1xuICAgIGlmICghdXBkYXRlIHx8ICF1cGRhdGUuZ2FtZUluZm8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXVwZGF0ZS5ydW5uaW5nQ2hhbmdlZCAmJiAhdXBkYXRlLmdhbWVDaGFuZ2VkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHVwZGF0ZS5nYW1lSW5mby5pc1J1bm5pbmcpIHtcbiAgICAgIGlmICh0aGlzLl9kZWxlZ2F0ZS5vbkdhbWVTdGFydGVkKSB7XG4gICAgICAgIHRoaXMuX2RlbGVnYXRlLm9uR2FtZVN0YXJ0ZWQodXBkYXRlLmdhbWVJbmZvKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5fZGVsZWdhdGUub25HYW1lRW5kZWQpIHtcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUub25HYW1lRW5kZWQodXBkYXRlLmdhbWVJbmZvKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25SdW5uaW5nR2FtZUluZm8gPSAoaW5mbzogb3ZlcndvbGYuZ2FtZXMuUnVubmluZ0dhbWVJbmZvKTogdm9pZCA9PiB7XG4gICAgaWYgKCFpbmZvKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIGlmIChpbmZvLmlzUnVubmluZykge1xuICAgICAgaWYgKHRoaXMuX2RlbGVnYXRlLm9uR2FtZVN0YXJ0ZWQpIHtcbiAgICAgICAgdGhpcy5fZGVsZWdhdGUub25HYW1lU3RhcnRlZChpbmZvKVxuICAgICAgfVxuICAgIH1cbiAgfSAgXG59IiwidHlwZSBHZXRHYW1lREJJbmZvUmVzdWx0ID0gb3ZlcndvbGYuZ2FtZXMuR2V0R2FtZURCSW5mb1Jlc3VsdFxudHlwZSBSdW5uaW5nR2FtZUluZm8gPSBvdmVyd29sZi5nYW1lcy5SdW5uaW5nR2FtZUluZm9cblxuZXhwb3J0IGNsYXNzIE9XR2FtZXMge1xuXHRwdWJsaWMgc3RhdGljIGdldFJ1bm5pbmdHYW1lSW5mbygpOiBQcm9taXNlPFJ1bm5pbmdHYW1lSW5mbz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSdW5uaW5nR2FtZUluZm8+KChyZXNvbHZlKSA9PiB7XG4gICAgICBvdmVyd29sZi5nYW1lcy5nZXRSdW5uaW5nR2FtZUluZm8ocmVzb2x2ZSk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY2xhc3NJZEZyb21HYW1lSWQoZ2FtZUlkOiBudW1iZXIpOiBudW1iZXIge1xuICAgIGxldCBjbGFzc0lkID0gTWF0aC5mbG9vcihnYW1lSWQgLyAxMCk7XG4gICAgcmV0dXJuIGNsYXNzSWQ7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldFJlY2VudGx5UGxheWVkR2FtZXMobGltaXQ6IG51bWJlciA9IDMpOlxuICAgIFByb21pc2U8bnVtYmVyW118bnVsbD4ge1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcltdfG51bGw+KChyZXNvbHZlKSA9PiB7XG4gICAgICBpZiAoIW92ZXJ3b2xmLmdhbWVzLmdldFJlY2VudGx5UGxheWVkR2FtZXMpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmUobnVsbCk7XG4gICAgICB9XG5cbiAgICAgIG92ZXJ3b2xmLmdhbWVzLmdldFJlY2VudGx5UGxheWVkR2FtZXMobGltaXQsIHJlc3VsdCA9PiB7XG4gICAgICAgIHJlc29sdmUocmVzdWx0LmdhbWVzKTtcbiAgICAgIH0pO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGFzeW5jIGdldEdhbWVEQkluZm8oZ2FtZUNsYXNzSWQ6IG51bWJlcik6XG4gICAgUHJvbWlzZTxHZXRHYW1lREJJbmZvUmVzdWx0PiB7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8R2V0R2FtZURCSW5mb1Jlc3VsdD4oKHJlc29sdmUpID0+IHtcbiAgICAgIG92ZXJ3b2xmLmdhbWVzLmdldEdhbWVEQkluZm8oZ2FtZUNsYXNzSWQsIHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgaW50ZXJmYWNlIE9XTGlzdGVuZXJEZWxlZ2F0ZSB7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBPV0xpc3RlbmVyPFQgZXh0ZW5kcyBPV0xpc3RlbmVyRGVsZWdhdGU+IHtcbiAgcHJvdGVjdGVkIF9kZWxlZ2F0ZTogVDtcblxuICBjb25zdHJ1Y3RvcihkZWxlZ2F0ZTogVCkge1xuICAgIHRoaXMuX2RlbGVnYXRlID0gZGVsZWdhdGU7XG4gIH1cblxuICBwdWJsaWMgc3RhcnQoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wKCk7XG4gIH1cblxuICBhYnN0cmFjdCBzdG9wKCk6IHZvaWQ7XG59XG4iLCJ0eXBlIEdldFdpbmRvd1N0YXRlUmVzdWx0ID0gb3ZlcndvbGYud2luZG93cy5HZXRXaW5kb3dTdGF0ZVJlc3VsdDtcbnR5cGUgT3dXaW5kb3dJbmZvID0gb3ZlcndvbGYud2luZG93cy5XaW5kb3dJbmZvO1xuZXhwb3J0IGNsYXNzIE9XV2luZG93IHtcbiAgcHJpdmF0ZSBfbmFtZTogc3RyaW5nIHwgbnVsbDtcbiAgcHJpdmF0ZSBfaWQ6IHN0cmluZyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nIHwgbnVsbCA9IG51bGwpIHtcbiAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB0aGlzLl9pZCA9IG51bGw7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgcmVzdG9yZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgKHJlc29sdmUpID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MucmVzdG9yZShpZCwgcmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQuc3VjY2VzcylcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBbcmVzdG9yZV0gLSBhbiBlcnJvciBvY2N1cnJlZCwgd2luZG93SWQ9JHtpZH0sIHJlYXNvbj0ke3Jlc3VsdC5lcnJvcn1gKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBtaW5pbWl6ZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLm1pbmltaXplKGlkLCAoKSA9PiB7IH0pO1xuICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIGFzeW5jIG1heGltaXplKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihhc3luYyByZXNvbHZlID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcbiAgICAgIG92ZXJ3b2xmLndpbmRvd3MubWF4aW1pemUoaWQsICgpID0+IHsgfSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgaGlkZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmhpZGUoaWQsICgpID0+IHsgfSk7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xvc2UoKSB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5hc3N1cmVPYnRhaW5lZCgpO1xuICAgICAgbGV0IGlkOiBzdHJpbmcgPSA8c3RyaW5nPnRoYXQuX2lkO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLmdldFdpbmRvd1N0YXRlKCk7XG5cbiAgICAgIGlmIChyZXN1bHQuc3VjY2VzcyAmJlxuICAgICAgICAocmVzdWx0LndpbmRvd19zdGF0ZSAhPT0gJ2Nsb3NlZCcpKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaW50ZXJuYWxDbG9zZSgpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgIH0pXG4gIH1cblxuICBwdWJsaWMgZHJhZ01vdmUoZWxlbTogSFRNTEVsZW1lbnQpIHtcbiAgICBlbGVtLm9ubW91c2Vkb3duID0gZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmRyYWdNb3ZlKHRoaXMuX25hbWUpO1xuICAgIH07XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZ2V0V2luZG93U3RhdGUoKTogUHJvbWlzZTxHZXRXaW5kb3dTdGF0ZVJlc3VsdD4ge1xuICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxHZXRXaW5kb3dTdGF0ZVJlc3VsdD4oYXN5bmMgcmVzb2x2ZSA9PiB7XG4gICAgICBhd2FpdCB0aGF0LmFzc3VyZU9idGFpbmVkKCk7XG4gICAgICBsZXQgaWQ6IHN0cmluZyA9IDxzdHJpbmc+dGhhdC5faWQ7XG4gICAgICBvdmVyd29sZi53aW5kb3dzLmdldFdpbmRvd1N0YXRlKGlkLCByZXNvbHZlKTtcbiAgICB9KVxuICB9XG5cbiAgcHVibGljIHN0YXRpYyBhc3luYyBnZXRDdXJyZW50SW5mbygpOiBQcm9taXNlPE93V2luZG93SW5mbz4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZTxPd1dpbmRvd0luZm8+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgb3ZlcndvbGYud2luZG93cy5nZXRDdXJyZW50V2luZG93KHJlc3VsdCA9PiB7XG4gICAgICAgIHJlc29sdmUocmVzdWx0LndpbmRvdyk7XG4gICAgICB9KVxuICAgIH0pXG4gIH1cblxuICBwcml2YXRlIG9idGFpbigpOiBQcm9taXNlPE93V2luZG93SW5mbyB8IG51bGw+IHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2IgPSByZXMgPT4ge1xuICAgICAgICBpZiAocmVzICYmIHJlcy5zdGF0dXMgPT09IFwic3VjY2Vzc1wiICYmIHJlcy53aW5kb3cgJiYgcmVzLndpbmRvdy5pZCkge1xuICAgICAgICAgIHRoaXMuX2lkID0gcmVzLndpbmRvdy5pZDtcblxuICAgICAgICAgIGlmICghdGhpcy5fbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5fbmFtZSA9IHJlcy53aW5kb3cubmFtZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXNvbHZlKHJlcy53aW5kb3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2lkID0gbnVsbDtcbiAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgaWYgKCF0aGlzLl9uYW1lKSB7XG4gICAgICAgIG92ZXJ3b2xmLndpbmRvd3MuZ2V0Q3VycmVudFdpbmRvdyhjYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdmVyd29sZi53aW5kb3dzLm9idGFpbkRlY2xhcmVkV2luZG93KHRoaXMuX25hbWUsIGNiKTtcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBhc3N1cmVPYnRhaW5lZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIHJlc29sdmUgPT4ge1xuICAgICAgYXdhaXQgdGhhdC5vYnRhaW4oKTtcbiAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGludGVybmFsQ2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KGFzeW5jIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGF3YWl0IHRoYXQuYXNzdXJlT2J0YWluZWQoKTtcbiAgICAgIGxldCBpZDogc3RyaW5nID0gPHN0cmluZz50aGF0Ll9pZDtcblxuICAgICAgb3ZlcndvbGYud2luZG93cy5jbG9zZShpZCwgcmVzID0+IHtcblxuICAgICAgICBpZiAocmVzICYmIHJlcy5zdWNjZXNzKVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHJlamVjdChyZXMpO1xuICAgICAgfSk7XG4gICAgfSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgd2luZG93TmFtZXMgfSBmcm9tIFwiLi4vLi4vY29uc3RzXCI7XG5pbXBvcnQgeyBPV0dhbWVzIH0gZnJvbSAnLi4vLi4vb2RrLXRzL293LWdhbWVzJztcbmltcG9ydCB7IE9XR2FtZUxpc3RlbmVyIH0gZnJvbSAnLi4vLi4vb2RrLXRzL293LWdhbWUtbGlzdGVuZXInO1xuaW1wb3J0IHsgT1dXaW5kb3cgfSBmcm9tICcuLi8uLi9vZGstdHMvb3ctd2luZG93JztcbmltcG9ydCBSdW5uaW5nR2FtZUluZm8gPSBvdmVyd29sZi5nYW1lcy5SdW5uaW5nR2FtZUluZm87XG5cbi8vIFRoZSBiYWNrZ3JvdW5kIGNvbnRyb2xsZXIgaG9sZHMgYWxsIG9mIHRoZSBhcHAncyBiYWNrZ3JvdW5kIGxvZ2ljIC0gaGVuY2UgaXRzIG5hbWUuIGl0IGhhc1xuLy8gbWFueSBwb3NzaWJsZSB1c2UgY2FzZXMsIGZvciBleGFtcGxlIHNoYXJpbmcgZGF0YSBiZXR3ZWVuIHdpbmRvd3MsIG9yLCBpbiBvdXIgY2FzZSxcbi8vIG1hbmFnaW5nIHdoaWNoIHdpbmRvdyBpcyBjdXJyZW50bHkgcHJlc2VudGVkIHRvIHRoZSB1c2VyLiBUbyB0aGF0IGVuZCwgaXQgaG9sZHMgYSBkaWN0aW9uYXJ5XG4vLyBvZiB0aGUgd2luZG93cyBhdmFpbGFibGUgaW4gdGhlIGFwcC5cbi8vIE91ciBiYWNrZ3JvdW5kIGNvbnRyb2xsZXIgaW1wbGVtZW50cyB0aGUgU2luZ2xldG9uIGRlc2lnbiBwYXR0ZXJuLCBzaW5jZSBvbmx5IG9uZVxuLy8gaW5zdGFuY2Ugb2YgaXQgc2hvdWxkIGV4aXN0LlxuY2xhc3MgQmFja2dyb3VuZENvbnRyb2xsZXIge1xuICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IEJhY2tncm91bmRDb250cm9sbGVyO1xuICBwcml2YXRlIF93aW5kb3dzID0ge307XG4gIHByaXZhdGUgX2ZvcnRuaXRlR2FtZUxpc3RlbmVyOiBPV0dhbWVMaXN0ZW5lcjtcblxuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIFBvcHVsYXRpbmcgdGhlIGJhY2tncm91bmQgY29udHJvbGxlcidzIHdpbmRvdyBkaWN0aW9uYXJ5XG4gICAgdGhpcy5fd2luZG93c1t3aW5kb3dOYW1lcy5kZXNrdG9wXSA9IG5ldyBPV1dpbmRvdyh3aW5kb3dOYW1lcy5kZXNrdG9wKTtcbiAgICB0aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmluR2FtZV0gPSBuZXcgT1dXaW5kb3cod2luZG93TmFtZXMuaW5HYW1lKTtcblxuICAgIC8vIFdoZW4gYSBGb3J0bml0ZSBnYW1lIGlzIHN0YXJ0ZWQgb3IgaXMgZW5kZWQsIHRvZ2dsZSB0aGUgYXBwJ3Mgd2luZG93c1xuICAgIHRoaXMuX2ZvcnRuaXRlR2FtZUxpc3RlbmVyID0gbmV3IE9XR2FtZUxpc3RlbmVyKHtcbiAgICAgIG9uR2FtZVN0YXJ0ZWQ6IHRoaXMudG9nZ2xlV2luZG93cy5iaW5kKHRoaXMpLFxuICAgICAgb25HYW1lRW5kZWQ6IHRoaXMudG9nZ2xlV2luZG93cy5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH07XG5cbiAgLy8gSW1wbGVtZW50aW5nIHRoZSBTaW5nbGV0b24gZGVzaWduIHBhdHRlcm5cbiAgcHVibGljIHN0YXRpYyBpbnN0YW5jZSgpOiBCYWNrZ3JvdW5kQ29udHJvbGxlciB7XG4gICAgaWYgKCFCYWNrZ3JvdW5kQ29udHJvbGxlci5faW5zdGFuY2UpIHtcbiAgICAgIEJhY2tncm91bmRDb250cm9sbGVyLl9pbnN0YW5jZSA9IG5ldyBCYWNrZ3JvdW5kQ29udHJvbGxlcigpO1xuICAgIH1cblxuICAgIHJldHVybiBCYWNrZ3JvdW5kQ29udHJvbGxlci5faW5zdGFuY2U7XG4gIH1cblxuICAvLyBXaGVuIHJ1bm5pbmcgdGhlIGFwcCwgc3RhcnQgbGlzdGVuaW5nIHRvIGdhbWVzJyBzdGF0dXMgYW5kIGRlY2lkZSB3aGljaCB3aW5kb3cgc2hvdWxkXG4gIC8vIGJlIGxhdW5jaGVkIGZpcnN0LCBiYXNlZCBvbiB3aGV0aGVyIEZvcnRuaXRlIGlzIGN1cnJlbnRseSBydW5uaW5nXG4gIHB1YmxpYyBhc3luYyBydW4oKSB7XG4gICAgdGhpcy5fZm9ydG5pdGVHYW1lTGlzdGVuZXIuc3RhcnQoKTtcbiAgICBjb25zdCBjdXJyV2luZG93ID0gYXdhaXQgdGhpcy5pc0ZvcnRuaXRlUnVubmluZygpID8gd2luZG93TmFtZXMuaW5HYW1lIDogd2luZG93TmFtZXMuZGVza3RvcDtcbiAgICB0aGlzLl93aW5kb3dzW2N1cnJXaW5kb3ddLnJlc3RvcmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdG9nZ2xlV2luZG93cyhpbmZvKSB7XG4gICAgaWYgKCFpbmZvIHx8ICF0aGlzLmlzR2FtZUZvcnRuaXRlKGluZm8pKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGluZm8uaXNSdW5uaW5nKSB7XG4gICAgICB0aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmRlc2t0b3BdLmNsb3NlKCk7XG4gICAgICB0aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmluR2FtZV0ucmVzdG9yZSgpO1xuICAgICAgdGhpcy5fd2luZG93c1t3aW5kb3dOYW1lcy5pbkdhbWVdLm1pbmltaXplKCk7XG4gICAgICAvL3RoaXMuc3RhcnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fd2luZG93c1t3aW5kb3dOYW1lcy5pbkdhbWVdLmNsb3NlKCk7XG4gICAgICAvL3RoaXMuX3dpbmRvd3Nbd2luZG93TmFtZXMuZGVza3RvcF0ucmVzdG9yZSgpO1xuICAgICAgLy90aGlzLl93aW5kb3dzW3dpbmRvd05hbWVzLmRlc2t0b3BdLm1pbmltaXplKCk7XG4gICAgICAvL3RoaXMuZW5kKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBpc0ZvcnRuaXRlUnVubmluZygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBpbmZvID0gYXdhaXQgT1dHYW1lcy5nZXRSdW5uaW5nR2FtZUluZm8oKTtcbiAgICByZXR1cm4gaW5mbyAmJiBpbmZvLmlzUnVubmluZyAmJiB0aGlzLmlzR2FtZUZvcnRuaXRlKGluZm8pO1xuICB9XG5cbiAgLy8gSWRlbnRpZnkgd2hldGhlciB0aGUgUnVubmluZ0dhbWVJbmZvIG9iamVjdCB3ZSBoYXZlIHJlZmVyZW5jZXMgRm9ydG5pdGVcbiAgcHJpdmF0ZSBpc0dhbWVGb3J0bml0ZShpbmZvOiBSdW5uaW5nR2FtZUluZm8pIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuXG5CYWNrZ3JvdW5kQ29udHJvbGxlci5pbnN0YW5jZSgpLnJ1bigpOyJdLCJzb3VyY2VSb290IjoiIn0=