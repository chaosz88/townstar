// ==UserScript==
// @name         Town Star Godot - Status Check
// @namespace    http://tampermonkey.net/
// @version      0.2.0.1
// @description  Auto go back server after Spinning T, alarm sound when not playing after 1 minute.
// @author       Oizys
// @match        *://*.gala.com/games/town-star*
// @match        *://*.gala.games/games/town-star*
// @match        *://*.gala.com/games/tsg-playtest*
// @match        *://*.gala.games/games/tsg-playtest*
// @match        *://tsf-client.gala.com/*
// @run-at       document-start
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';

    // [IMPORTANT READ]
    // This script try to detect 4 edges of the game screen, if all the same grey color of spinning T, then it play alarm sound.
    // If no "Grey-Face Detection Active" display at bottom left.
    // Use F5 to refresh to Town Star game (not start Town Star game from gala.games website).

    // If grey face show up, after some seconds (within 60 seconds) it will auto reload the Town Star game.
    // If Town Star game is stopped (screen is blocked, or screen is blue / black),
    //   after some seconds (within 20 seconds) it will play Alarm sound repeatedly,
    //   until the game is resume (blue / black screen will need to terminate all browser process and start game again).

    // [How does it work?]
    // Town Star game is running in an iframe inside a webpage actually.
    // So I write script to be loaded from Tampermonkey, that:
    // 1. Add a "listening" script in "webpage".
    // 2. Add a "broadcasting" script in "iframe".
    // 3. "listening" script will set a count down of 1 minute, to refresh the Town Star game.
    // 3. "broadcasting" script will continuously broadcast "I am fine" to "listening".
    // 4. If "listening" script received the broadcast, then the "listening" script will stop previous count down, and start new count down to refresh the game.
    // 5. If grey-face happen, "broadcasting" script will not be able to broadcast.
    // 6. So "listening" script will refresh the game when no broadcast received (Grey Face happened), when count down of 1 minute completed.

    // postObserver first, then reloadObserver!

    // reloadTimeoutWaitMs default 60000 (60 seconds).
    // postTimeoutWaitMs default 5000 (5 seconds).
    // alertTimeoutWaitMs default 5000 (5 seconds).
    const reloadTimeoutWaitMs = 60000;
    const postTimeoutWaitMs = 5000;
    const alertTimeoutWaitMs = 5000;
    // const alertTimeoutWaitMs = 3000;

    // - variables
    // ****Test case based on height 1000, width 1701.****
    const baseWidth = 1701;
    const baseHeight = 1000;
    const baseRatio = baseHeight / baseWidth; // 0.589

    const spinningTCheckMs = 5000;
    const homePageCheckMs = 5000;
    const townPlayingCheckMs = 5000;
    const notTownPlayingCheckMs = 60000; // Default 1 minute.
    // Default 5 minutes waiting time, this will be ignored if town was found.
    const delayCheckTownPlayingMs = 300000;
    let townStopTimestamp = 0;
    let delayCheckTownPlayTimestamp = 0;
    let spinningTCount = 0;
    let spinningTActive = false;
    let isTownPlayed = false;
    let allowPlayAlarm = false;

    const baseRgb = {
        TOWN_PLAYING: { r: 213, g: 225, b: 216 },
        SPINNING_T: { r: 76, g: 76, b: 76 },
        SERVER_BUTTON_ACTIVE: { r: 250, g: 138, b: 57 },
        SERVER_BUTTON_INACTIVE: { r: 153, g: 153, b: 153 },
        SERVER_BUTTON_RESULT: { r: 72, g: 145, b: 235 }
    };

    const server = {
        NO: '',
        CASUAL: 'CS',
        COMPETITION1: 'CP1',
        COMPETITION2: 'CP2'
    };

    const serverName = {
        NO: 'No',
        CASUAL: 'Casual',
        COMPETITION1: 'Act.Comp 1',
        COMPETITION2: 'Act.Comp 2',
    }

    const UiAlign = {
        LEFT: 'L',
        CENTER: 'C'
    }

    // Default to active competition 1 server.
    let selectedServer = server.COMPETITION1;
    // Default auto enter.
    let autoEnterServer = true;

    const selectedServerName = 'selectedServer';

    const defaultObserverTimeOutMs = 300000;

    let postObserver = new MutationObserver(function(mutations) {
        if (
            document.querySelector('#status')
        ) {
            postObserver.disconnect();
            CheckReloadGame();
            console.log('Town Star Godot - Status Check Post loaded.');
            AppendAlarmSound();
            AppendServerSelection();
            MonitorGodot();
            console.log('Town Star Godot - Status Check Spinning T loaded.');
        }
    })
    postObserver.observe(document, {childList: true, subtree: true});
    SetTimeoutObserver(postObserver);

    function GetObjectKey(obj, value) {
        return Object.keys(obj).find(key => obj[key] === value);
    }

    function AppendServerSelection() {
        const storedSelectedServer = GM_getValue(selectedServerName);

        if (
            storedSelectedServer &&
            server.hasOwnProperty(GetObjectKey(server, storedSelectedServer))
        ) {
            selectedServer = storedSelectedServer;
        }

        const serverSelectionContainer = document.createElement('div');
        serverSelectionContainer.id = 'server-selection-container';
        serverSelectionContainer.style.cssText = 'position: absolute; top: 0; left: 225px; margin-left: 10px; opacity: 0.5; background-color: #fff; color: #333; display: flex; padding: 4px 12px; left: 50%; transform: translate(-50%, 0); border-radius: 0 0 8px 8px; font-family: sans-serif;';

        const serverSelectionLabel = document.createElement('div');
        serverSelectionLabel.id = 'server-selection-label';
        serverSelectionLabel.style.cssText = 'pointer-events: none;';
        serverSelectionLabel.textContent = 'Server: ';
        serverSelectionContainer.appendChild(serverSelectionLabel);

        const serverSelectionRadioButtonContainer = document.createElement('div');
        serverSelectionRadioButtonContainer.id = 'server-selection-radio-button-container';
        serverSelectionRadioButtonContainer.style.cssText = 'display: flex;';
        const serverSelectionName = 'server-selection-radio';

        for (const key in server) {
            const inputContainer = document.createElement('div');
            inputContainer.style.cssText = 'padding: 0 4px;';
            const input = document.createElement('input');
            const inputId = 'server-selection-' + server[key];
            input.id = inputId;
            input.name = serverSelectionName;
            input.type = "radio";
            input.value = server[key];
            input.onclick = function() {
                selectedServer = this.value;
                GM_setValue(selectedServerName, this.value);
            };

            if (input.value === selectedServer) {
                input.checked = 'checked';
            }
            inputContainer.appendChild(input);

            const label = document.createElement('label');
            label.textContent = serverName[key];
            label.htmlFor = inputId;
            inputContainer.appendChild(label);
            serverSelectionRadioButtonContainer.appendChild(inputContainer);
        }
        serverSelectionContainer.appendChild(serverSelectionRadioButtonContainer);
        document.querySelector('body').appendChild(serverSelectionContainer);
    }

    let reloadTimeout;
    let reloadTriggered = false;
    let reloadObserver = new MutationObserver(function(mutations) {
        let target = document.querySelector('#app iframe');
        if (target) {
            reloadObserver.disconnect();
            // Add spinning T detection status.
            const spinningTStatus = document.createElement('div');
            spinningTStatus.id = 'spinning-t-status';
            spinningTStatus.style.cssText = 'position: absolute; z-index: 9; bottom: 0; margin-left: 10px; opacity: 0.5; pointer-events: none;';
            spinningTStatus.textContent = 'Spinning-T Detection Active';
            document.querySelector('#app').prepend(spinningTStatus);

            const spinningTCountContainer = document.createElement('div');
            spinningTCountContainer.id = 'spinning-t-count-container';
            spinningTCountContainer.style.cssText = 'position: absolute; z-index: 9; bottom: 20px; margin-left: 10px; opacity: 0.5; display: flex; pointer-events: none;';
            const spinningTCountLabel = document.createElement('div');
            spinningTCountLabel.id = 'spinning-t-count-label';
            spinningTCountLabel.textContent = 'Spinning-T Count:';
            spinningTCountLabel.style.cssText = 'padding: 0 8px 0 0';
            spinningTCountContainer.appendChild(spinningTCountLabel);
            const spinningTCountNumber = document.createElement('div');
            spinningTCountNumber.id = 'spinning-t-count-number';
            spinningTCountNumber.textContent = spinningTCount;
            spinningTCountContainer.appendChild(spinningTCountNumber);
            document.querySelector('#app').prepend(spinningTCountContainer);

            window.addEventListener('message', event => {
                if (event.origin.startsWith('https://tsf-client.gala.com')) {
                    if (!reloadTriggered) {
                        window.clearTimeout(reloadTimeout);
                        reloadTimeout = window.setTimeout(ReloadGame, reloadTimeoutWaitMs);
                    }
                    const response = event.data;
// console.log('received response',response);
                    if (response?.spinningTCount) {
                        UpdateSpinningTCount(response?.spinningTCount);
                    }
                }
            });
        }
    })
    reloadObserver.observe(top.document, {childList: true, subtree: true});
    setTimeout(function() { reloadObserver.disconnect(); }, 300000);

    function CheckReloadGame() {
        PostMessageToGala('HUD_READY');
        setTimeout(CheckReloadGame, postTimeoutWaitMs);
    }

    function PostMessageToGala(message) {
        top.postMessage(message, 'https://app.gala.games');
        top.postMessage(message, 'https://games.gala.com');
    }

    function AppendAlarmSound() {
        const alarmAudio = document.createElement('audio');
        alarmAudio.id = 'alarm-audio';
        alarmAudio.autoplay = false;
        const alarmAudioSource = document.createElement('source');
        alarmAudioSource.src = 'https://assets.mixkit.co/sfx/download/mixkit-classic-alarm-995.wav';
        // alarmAudioSource.src = 'https://assets.mixkit.co/active_storage/sfx/996/996.wav';
        alarmAudioSource.type = 'audio/wav';
        alarmAudio.appendChild(alarmAudioSource);
        alarmAudio.load();
        document.querySelector('body').appendChild(alarmAudio);
    }

    function PlayAlarmSound() {
        if (allowPlayAlarm) {
            const alarmAudio = document.querySelector('#alarm-audio');
            alarmAudio.play();
        }
    }

    function ReloadGame() {
        reloadTriggered = true;
        window.location.reload();
    }

    function UpdateSpinningTCount(count) {
        document.querySelector('#spinning-t-count-number').textContent = count;
    }

    // Delay in ms.
    async function delay(ms) {
        await new Promise(r => setTimeout(r, ms));
    }

    // GODOT
    async function MonitorGodot() {
        setInterval(CheckHomePage, homePageCheckMs);
        setInterval(CheckSpinningT, spinningTCheckMs);
        delayCheckTownPlayTimestamp = Date.now();
        setInterval(CheckTownPlaying, townPlayingCheckMs);
    }

    // If over 60 seconds fail CheckTownPlaying, play alarm sound.
    async function CheckTownPlaying() {
        const isTownPlaying = await IsTownPlaying();
        if (!isTownPlaying) {
console.log('Town stop?');
            if (townStopTimestamp <= 0) {
                townStopTimestamp = Date.now();
            } else if ((Date.now() - townStopTimestamp) > notTownPlayingCheckMs) {
                PlayAlarmSound();
            }
        } else {
            isTownPlayed = true;
            allowPlayAlarm = true;
            townStopTimestamp = 0;
            delayCheckTownPlayTimestamp = 0;
        }
    }

    /*
    // Start new game, will have a 300 seconds (5 minute) delay in playing alarm sound.
    // If playing town detect, the 300 seconds delay will be removed.
    // If over 60 seconds fail CheckTownPlaying, play alarm sound.
    async function CheckTownPlaying() {
        const isTownPlaying = await IsTownPlaying();
        if (!isTownPlaying) {
console.log('Town stop?');
            if (townStopTimestamp <= 0) {
                townStopTimestamp = Date.now();
            } else if ((Date.now() - townStopTimestamp) > notTownPlayingCheckMs) {
                if (
                    delayCheckTownPlayTimestamp <= 0 ||
                    (
                        delayCheckTownPlayTimestamp > 0 &&
                        (Date.now() - delayCheckTownPlayTimestamp) > delayCheckTownPlayingMs
                    )
                ) {
                    PlayAlarmSound();
                }
            }
        } else {
            townStopTimestamp = 0;
            delayCheckTownPlayTimestamp = 0;
        }
    }
    */

    async function IsTownPlaying() {
        const townPlayingCoordinate = GetCoordinateTownPlaying();
        const townPlayingEdges = await GetCoordinateFourEdgesRgb(townPlayingCoordinate);
        return VerifyFourEdgesRgbMatching(baseRgb.TOWN_PLAYING, townPlayingEdges);
    }

    async function CheckHomePage() {
        const isHomePage = await IsHomePage();
        if (isHomePage) {
console.log('Homepage detected!');
            if (selectedServer === server.CASUAL) {
                const casualPlayButtonCoordinate = GetCoordinateCasualPlayButton();
                SimulateClickFromCoordinate(casualPlayButtonCoordinate);
            } else if (
                selectedServer === server.COMPETITION1 ||
                selectedServer === server.COMPETITION2
            ) {
                const eventEnterButtonCoordinate = GetCoordinateEventEnterButton();
                SimulateClickFromCoordinate(eventEnterButtonCoordinate);
                // Identify how many server listed.
                let eventServerCount = 0;
                let checkCount = 0;
                const maxCheckCount = 10;
                while (
                    eventServerCount === 0 &&
                    checkCount < maxCheckCount
                ) {
                    checkCount++;
                    await delay(500);
                    eventServerCount = await CheckCompetitionServerCount();
                }

                if (eventServerCount > 0) {
                    // Identify first active server position.
                    // Different count different checking.
                    let coordinates = [];
                    if (eventServerCount === 1) {
                        coordinates.push(GetCoordinateCompetitionOddCenterButton());
                    } else if (eventServerCount === 2) {
                        coordinates.push(GetCoordinateCompetitionEvenLeftButton());
                        coordinates.push(GetCoordinateCompetitionEvenRightButton());
                    } else if (eventServerCount === 3) {
                        coordinates.push(GetCoordinateCompetitionOddLeftButton());
                        coordinates.push(GetCoordinateCompetitionOddCenterButton());
                        coordinates.push(GetCoordinateCompetitionOddRightButton());
                    }

                    let enterActiveCompetition = false;
                    let checkServerCount = 0;
                    let activeServerCount = 0;

                    for (const coordinate of coordinates) {
                        checkServerCount++;
                        const edges = await GetCoordinateFourEdgesRgb(coordinate);
                        if (VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_ACTIVE, edges)) {
                            activeServerCount++;
                            console.log('Active server found, Server ', checkServerCount);
                            if (
                                (
                                    activeServerCount === 1 &&
                                    selectedServer === server.COMPETITION1
                                ) ||
                                (
                                    activeServerCount === 2 &&
                                    selectedServer === server.COMPETITION2
                                )
                            ) {
                                SimulateClickFromCoordinate(coordinate);
                                enterActiveCompetition = true;
                            }
                        }
                        if (VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_INACTIVE, edges)) {
                            console.log('Inactive server found, Server ', checkServerCount);
                        }
                        if (VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_RESULT, edges)) {
                            console.log('View result server found, Server ', checkServerCount);
                        }
                    }

                    if (enterActiveCompetition === false) {
                        console.log('No selected active competition server found.');
                    }
                }
            }
        }
    }

    async function CheckCompetitionServerCount() {
        // 0 as default, as "cannot find" result.
        let count = 0;
        const oddLeftCoordinate = GetCoordinateCompetitionOddLeftButton();
        const evenLeftCoordinate = GetCoordinateCompetitionEvenLeftButton();
        const oddCenterCoordinate = GetCoordinateCompetitionOddCenterButton();

        const oddLeftEdges = await GetCoordinateFourEdgesRgb(oddLeftCoordinate);
        const evenLeftEdges = await GetCoordinateFourEdgesRgb(evenLeftCoordinate);
        const oddCenterEdges = await GetCoordinateFourEdgesRgb(oddCenterCoordinate);

        // Check 3 servers pattern
        if (
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_RESULT, oddLeftEdges) ||
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_INACTIVE, oddLeftEdges) ||
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_ACTIVE, oddLeftEdges)
        ) {
            count = 3;
        // Check 2 servers pattern
        } else if (
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_RESULT, evenLeftEdges) ||
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_INACTIVE, evenLeftEdges) ||
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_ACTIVE, evenLeftEdges)
        ) {
            count = 2;
        } else if (
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_RESULT, oddCenterEdges) ||
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_INACTIVE, oddCenterEdges) ||
            VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_ACTIVE, oddCenterEdges)
        ) {
            count = 1;
        }

        return count;
    }

    async function IsHomePage() {
        const casualButtonCoordinate = GetCoordinateCasualPlayButton();
        const eventButtonCoordinate = GetCoordinateEventEnterButton();

        const casualButtonEdges = await GetCoordinateFourEdgesRgb(casualButtonCoordinate);
        const eventButtonEdges = await GetCoordinateFourEdgesRgb(eventButtonCoordinate);

        return (
                VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_ACTIVE, casualButtonEdges) ||
                VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_INACTIVE, eventButtonEdges)
            ) &&
            (
                VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_ACTIVE, casualButtonEdges) ||
                VerifyFourEdgesRgbMatching(baseRgb.SERVER_BUTTON_INACTIVE, eventButtonEdges)
            );
    }

    async function CheckSpinningT() {
        const isSpinningT = await IsSpinningT();

        if (isSpinningT) {
console.log('Spinning T detected!');
            if (spinningTActive === false) {
                spinningTActive = true;
                spinningTCount++;
                PostMessageToGala({ "spinningTCount": spinningTCount });
            }

            const coordinate = GetCoordinateCanvas(UiAlign.LEFT);
            SimulateClickFromCoordinate(coordinate);
        } else {
            if (spinningTActive === true) {
                spinningTActive = false;
console.log('Spinning T solved.');
            }
        }
    }

    function LogTargetAndEdges(target, edges) {
        console.log('target', target);
        console.log('edges[0]', edges[0].rgb);
        console.log('edges[1]', edges[1].rgb);
        console.log('edges[2]', edges[2].rgb);
        console.log('edges[3]', edges[3].rgb);
    }

    async function IsSpinningT() {
        const coordinate = GetCoordinateCanvas();
        const edges = await GetCoordinateFourEdgesRgb(coordinate);
// LogTargetAndEdges(baseRgb.SPINNING_T, edges);

        return VerifyFourEdgesRgbMatching(baseRgb.SPINNING_T, edges);
    }

    function GetCanvasToDataUrl(
      canvas,
      offsetX,
      offsetY,
      width,
      height
    ) {
        const buffer = document.createElement('canvas');
        const bCtx = buffer.getContext('2d');
        // set its width/height to the required ones
        buffer.width = width;
        buffer.height = height;
        bCtx.drawImage(
            canvas,
            offsetX,
            offsetY,
            width,
            height,
            0,
            0,
            buffer.width,
            buffer.height
        );
        return buffer.toDataURL();
    }

    async function GetAverageRgb(image) {
        let blockSize = 5, // only visit every 5 pixels
            defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data,
            width,
            height,
            i = -4,
            length,
            rgb = { r: 0, g: 0, b: 0 },
            count = 0;

        if (!context) {
            return defaultRGB;
        }

        if (typeof image == 'string') {
            let src = image;
            image = document.createElement('img');
            image.setAttribute('crossOrigin', '');
            image.src = src;
            await image.decode();
        }

        height = canvas.height = image.naturalHeight || image.offsetHeight || image.height;
        width = canvas.width = image.naturalWidth || image.offsetWidth || image.width;
        context.drawImage(image, 0, 0);

        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            return defaultRGB;
        }

        length = data.data.length;

        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }

        // ~~ used to floor values
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);

        return rgb;
    }

    async function GetCoordinateFourEdgesRgb(coordinate) {
        const canvas = GetCanvasElement(),
              edgeWidth = 10,
              edgeHeight = 10;
        const edges = [];
        edges.push({ rgb: await GetAverageRgb(GetCanvasToDataUrl(canvas, coordinate.x1, coordinate.y1, edgeWidth, edgeHeight)) });
        edges.push({ rgb: await GetAverageRgb(GetCanvasToDataUrl(canvas, coordinate.x2 - edgeWidth, coordinate.y1, edgeWidth, edgeHeight)) });
        edges.push({ rgb: await GetAverageRgb(GetCanvasToDataUrl(canvas, coordinate.x1, coordinate.y2 - edgeHeight, edgeWidth, edgeHeight)) });
        edges.push({ rgb: await GetAverageRgb(GetCanvasToDataUrl(canvas, coordinate.x2 - edgeWidth, coordinate.y2 - edgeHeight, edgeWidth, edgeHeight)) });

        return edges;
    }

    // Maybe study how to do better closer color matching?
    function VerifyFourEdgesRgbMatching(target, edges) {
        const offset = 3;
        return (
            target.r + offset > edges[0].rgb.r &&
            target.r - offset < edges[0].rgb.r &&
            target.g + offset > edges[0].rgb.g &&
            target.g - offset < edges[0].rgb.g &&
            target.b + offset > edges[0].rgb.b &&
            target.b - offset < edges[0].rgb.b &&

            target.r + offset > edges[1].rgb.r &&
            target.r - offset < edges[1].rgb.r &&
            target.g + offset > edges[1].rgb.g &&
            target.g - offset < edges[1].rgb.g &&
            target.b + offset > edges[1].rgb.b &&
            target.b - offset < edges[1].rgb.b &&

            target.r + offset > edges[2].rgb.r &&
            target.r - offset < edges[2].rgb.r &&
            target.g + offset > edges[2].rgb.g &&
            target.g - offset < edges[2].rgb.g &&
            target.b + offset > edges[2].rgb.b &&
            target.b - offset < edges[2].rgb.b &&

            target.r + offset > edges[3].rgb.r &&
            target.r - offset < edges[3].rgb.r &&
            target.g + offset > edges[3].rgb.g &&
            target.g - offset < edges[3].rgb.g &&
            target.b + offset > edges[3].rgb.b &&
            target.b - offset < edges[3].rgb.b
        );
    }

    function GetCanvasElement() {
        return document.querySelector('#canvas');
    }

    function GetCanvasWidth() {
        let canvas = GetCanvasElement();
        return canvas?.width || 0;
    }

    function GetCanvasHeight() {
        let canvas = GetCanvasElement();
        return canvas?.height || 0;
    }

    function GetCoordinate(baseCoordinate, align = '') {
        const canvasWidth = GetCanvasWidth(),
              canvasHeight = GetCanvasHeight();
        let extraLeftWidth = parseInt((canvasWidth > baseWidth) ? canvasWidth - baseWidth : 0),
            extraBottomHeight = parseInt((canvasWidth < baseWidth) ? (baseHeight - (canvasWidth * baseRatio)) : 0);
        let effectiveCanvasWidth = canvasWidth - extraLeftWidth,
            effectiveCanvasHeight = canvasHeight - extraBottomHeight;
        if (
            align === UiAlign.LEFT ||
            align === UiAlign.CENTER
        ) {
            extraLeftWidth = 0;
            extraBottomHeight = 0;
            if ((baseHeight / canvasWidth) < baseRatio) {
                effectiveCanvasHeight = canvasHeight;
                effectiveCanvasWidth = effectiveCanvasHeight / baseRatio;

                if (align === UiAlign.CENTER) {
                    extraLeftWidth = parseInt((canvasWidth - effectiveCanvasWidth) / 2);
                }
            } else {
                effectiveCanvasWidth = canvasWidth;
                effectiveCanvasHeight = effectiveCanvasWidth * baseRatio;
            }
        }

        return {
            x1: parseInt(baseCoordinate.x1 * effectiveCanvasWidth / baseWidth) + extraLeftWidth,
            y1: parseInt(baseCoordinate.y1 * effectiveCanvasHeight / baseHeight),
            x2: parseInt(baseCoordinate.x2 * effectiveCanvasWidth / baseWidth) + extraLeftWidth,
            y2: parseInt(baseCoordinate.y2 * effectiveCanvasHeight / baseHeight)
        };
    }

    async function SimulateClick(element, x, y) {
console.log('SimulateClick');
console.log('x = ',x,', y = ',y);
        element.dispatchEvent(new MouseEvent("mousedown", {
            clientX: x,
            clientY: y,
            bubbles: true
        }));
        await delay(10);
        element.dispatchEvent(new MouseEvent("mouseup", {
            clientX: x,
            clientY: y,
            bubbles: true
        }));
    }

    async function SimulateClickFromCoordinate(coordinate) {
        await SimulateClick(GetCanvasElement(), ((coordinate.x1 + coordinate.x2) / 2), ((coordinate.y1 + coordinate.y2) / 2));
    }

    function GetCoordinateCanvas(align = '') {
        const canvasWidth = GetCanvasWidth(),
              canvasHeight = GetCanvasHeight();
        const baseCoordinate = {
            x1: 0,
            y1: 0,
            x2: canvasWidth,
            y2: canvasHeight
        };

        return GetCoordinate(baseCoordinate, align);
    }

    function GetCoordinateTownPlaying() {
        const baseCoordinate = {
            x1: 300,
            y1: 185,
            x2: 340,
            y2: 220
        };

        return GetCoordinate(baseCoordinate, UiAlign.LEFT);
    }

    function GetCoordinateSettingButton() {
        const baseCoordinate = {
            x1: 25,
            y1: 25,
            x2: 70,
            y2: 70
        };

        return GetCoordinate(baseCoordinate, UiAlign.LEFT);
    }

    function GetCoordinateTownPoint() {
        const baseCoordinate = {
            x1: 1280,
            y1: 133,
            x2: 1465,
            y2: 173
        };

        return GetCoordinate(baseCoordinate);
    }

    function GetCoordinateCasualPlayButton() {
        const baseCoordinate = {
            x1: 423,
            y1: 755,
            x2: 722,
            y2: 825
        };

        return GetCoordinate(baseCoordinate, UiAlign.LEFT);
    }

    function GetCoordinateEventEnterButton() {
        const baseCoordinate = {
            x1: 983,
            y1: 755,
            x2: 1282,
            y2: 825
        };

        return GetCoordinate(baseCoordinate, UiAlign.LEFT);
    }

    function GetCoordinateCompetitionOddCenterButton() {
        const baseCoordinate = {
            x1: 725,
            y1: 840,
            x2: 970,
            y2: 890
        };

        return GetCoordinate(baseCoordinate, UiAlign.CENTER);
    }

    function GetCoordinateCompetitionOddLeftButton() {
        const baseCoordinate = {
            x1: 318,
            y1: 840,
            x2: 563,
            y2: 890
        };

        return GetCoordinate(baseCoordinate, UiAlign.CENTER);
    }

    function GetCoordinateCompetitionOddRightButton() {
        const baseCoordinate = {
            x1: 1132,
            y1: 840,
            x2: 1377,
            y2: 890
        };

        return GetCoordinate(baseCoordinate, UiAlign.CENTER);
    }

    function GetCoordinateCompetitionEvenLeftButton() {
        const baseCoordinate = {
            x1: 521,
            y1: 840,
            x2: 766,
            y2: 890
        };

        return GetCoordinate(baseCoordinate, UiAlign.CENTER);
    }

    function GetCoordinateCompetitionEvenRightButton() {
        const baseCoordinate = {
            x1: 928,
            y1: 840,
            x2: 1173,
            y2: 890
        };

        return GetCoordinate(baseCoordinate, UiAlign.CENTER);
    }

    async function ShowAndHideCoordinates(coordinate) {
        console.log('ShowAndHideCoordinates');
        let div = document.createElement('div');
        div.id = "ShowAndHideCoordinates";
        div.style.width = (coordinate.x2 - coordinate.x1 - 1) + "px";
        div.style.height = (coordinate.y2 - coordinate.y1 - 1) + "px";
        div.style.position = "absolute";
        div.style.left = (coordinate.x1 - 1) + "px";
        div.style.top = (coordinate.y1 - 1) + "px";
        div.style.border = "1px solid red";
        document.body.appendChild(div);
        await delay(3000);
        document.body.removeChild(div);
    }

    setTimeout(() => {
        document.querySelector('html').style.overflowY = 'auto';
    }, 15000);

    function SetTimeoutObserver(observer) {
        setTimeout(function() { observer.disconnect(); }, defaultObserverTimeOutMs);
    }
})();