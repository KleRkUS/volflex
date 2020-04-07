import { AppWindow } from "../AppWindow";
import { OWGamesEvents } from "../../odk-ts/ow-games-events";
import { OWHotkeys } from "../../odk-ts/ow-hotkeys";
import { interestingFeatures, hotkeys, windowNames } from "../../consts";
import WindowState = overwolf.windows.WindowState;

// The window displayed in-game while a Fortnite game is running.
// It listens to all info events and to the game events listed in the consts.ts file
// and writes them to the relevant log using <pre> tags.
// The window also sets up Ctrl+F as the minimize/restore hotkey.
// Like the background window, it also implements the Singleton design pattern.
class InGame extends AppWindow {
  private static _instance: InGame;
  private gameEventsListener: OWGamesEvents;
  private _eventsLog: HTMLElement;
  private _infoLog: HTMLElement;

  private constructor() {
    super(windowNames.inGame);

    this._eventsLog = document.getElementById('eventsLog');
    this._infoLog = document.getElementById('infoLog');

    // this.setToggleHotkeyBehavior();
    // this.setToggleHotkeyText();

    this.gameEventsListener = new OWGamesEvents({
      onInfoUpdates: this.onInfoUpdates.bind(this),
      onNewEvents: this.onNewEvents.bind(this)
    },
      interestingFeatures);

    this.currWindow.minimize();
  }

  public static instance() {
    if (!this._instance) {
      this._instance = new InGame();
    }

    return this._instance;
  }

  public run() {
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
      //"encoder": "Intel",
      "gif_as_video": true,
      "max_quota_gb": 10,
    };

    overwolf.media.replays.turnOn({
      "settings": streamSettings,
      "highlights": {
        "enable" : false, //set false if you want to record the highligths manually
        "requireHighlights" : "kill" //an interesting evenst that happened in game
      },
    }, (res) =>{
      this.logLine(this._eventsLog, res, true);
    });
  }

  private onInfoUpdates(info) {
    this.logLine(this._infoLog, info, false);
  }

  // Special events will be highlighted in the event log
  private onNewEvents(e) {
    const shouldHighlight = e.events.some(event => {
      return event.name === 'kill' ||
        event.name === 'death' ||
        event.name === 'assist' ||
        event.name === 'level' ||
        event.name === 'bomb_planted' ||
        event.name === 'collection' ||
        event.name === 'teamGoal' ||
        event.name === 'opposingTeamGoal'
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

  // //Displays the toggle minimize/restore hotkey in the window header
  // private async setToggleHotkeyText() {
  //   const hotkeyText = await OWHotkeys.getHotkeyText(hotkeys.toggle);
  //   const hotkeyElem = document.getElementById('hotkey');
  //   hotkeyElem.textContent = hotkeyText;
  // }
  //
  // //Sets toggleInGameWindow as the behavior for the Ctrl+F hotkey
  // private async setToggleHotkeyBehavior() {
  //   const toggleInGameWindow = async hotkeyResult => {
  //     console.log(`pressed hotkey for ${hotkeyResult.featureId}`);
  //     const inGameState = await this.getWindowState();
  //
  //     if (inGameState.window_state === WindowState.NORMAL ||
  //       inGameState.window_state === WindowState.MAXIMIZED) {
  //       this.currWindow.minimize();
  //     } else if (inGameState.window_state === WindowState.MINIMIZED ||
  //       inGameState.window_state === WindowState.CLOSED) {
  //       this.currWindow.restore();
  //     }
  //   }
  //
  //   OWHotkeys.onHotkeyDown(hotkeys.toggle, toggleInGameWindow);
  // }

  // Appends a new line to the specified log
  private logLine(log: HTMLElement, data, highlight) {
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