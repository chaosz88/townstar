// ==UserScript==
// @name         Town Star Godot - Status Check
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Alarm sound when Spinning T.
// @author       Oizys
// @match        *://*.gala.com/games/town-star*
// @match        *://*.gala.games/games/town-star*
// @match        *://tsf-client.gala.com/*
// @grant        none
// @run-at       document-start
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

    const defaultObserverTimeOutMs = 300000;
    const spinningTGreyRGB = {r: 76, g: 76, b: 76};

    let frame;

    // Auto back to competition not yet able to achieve yet.
    let playObserver = new MutationObserver(async function(mutations) {
        if (document.getElementById("playButton") && document.getElementById("playButton").style.visibility && document.getElementById("playButton").style.visibility !== "hidden") {
            playObserver.disconnect();
            setTimeout(function() { document.getElementById("playButton").click(); }, 5000);
        }
    })

    playObserver.observe(document, {childList: true, subtree: true});
    SetTimeoutObserver(playObserver);

    let postObserver = new MutationObserver(function(mutations) {
        if (
            document.querySelector('#status')
        ) {
console.log('#status detected');
            postObserver.disconnect();
            PostMessageToGala();
            console.log('Town Star Godot - Status Check Post loaded.');
            AppendAlarmSound();
            CheckSpinningT();
            console.log('Town Star Godot - Status Check Spinning T loaded.');
        }
    })
    postObserver.observe(document, {childList: true, subtree: true});
    SetTimeoutObserver(postObserver);

    let reloadTimeout;
    let reloadTriggered = false;
    let reloadObserver = new MutationObserver(function(mutations) {
        let target = document.querySelector('#app iframe');
        if (target) {
            reloadObserver.disconnect();
            // Add spinning T detection status.
            let spinningTStatus = document.createElement('div');
            spinningTStatus.id = 'spinning-t-status';
            spinningTStatus.style.cssText = 'position: absolute; z-index: 9; bottom: 0; margin-left: 10px; opacity: 0.5; pointer-events: none;';
            spinningTStatus.textContent = 'Spinning-T Detection Active';
            document.querySelector('#app').prepend(spinningTStatus);
            window.addEventListener('message', event => {
                if (
                    event.origin.startsWith('https://tsf-client.gala.com') &&
                    // event.origin.startsWith('https://games.gala.com') &&
                    !reloadTriggered
                ) {
                    window.clearTimeout(reloadTimeout);
                    reloadTimeout = window.setTimeout(ReloadGame, reloadTimeoutWaitMs);
                }
            });
            console.log('Town Star Status Check Reload loaded.');
        }
    })
    reloadObserver.observe(top.document, {childList: true, subtree: true});
    setTimeout(function() { reloadObserver.disconnect(); }, 300000);

    function PostMessageToGala() {
        top.postMessage('HUD_READY', 'https://app.gala.games');
        top.postMessage('HUD_READY', 'https://games.gala.com');
        setTimeout(PostMessageToGala, postTimeoutWaitMs);
    }

    function CheckFrame() {
console.log('CheckFrame');
        let gameAppFrame = Game.app.frame;
        if (
            frame &&
            frame === gameAppFrame
        ) {
            PlayAlarmSound();
        }
        frame = gameAppFrame;
        setTimeout(CheckFrame, alertTimeoutWaitMs);
    }

    function AppendAlarmSound() {
console.log('AppendAlarmSound');
        let alarmAudio = document.createElement('audio');
        alarmAudio.id = 'alarm-audio';
        alarmAudio.autoplay = false;
        let alarmAudioSource = document.createElement('source');
        alarmAudioSource.src = 'https://assets.mixkit.co/sfx/download/mixkit-classic-alarm-995.wav';
        alarmAudioSource.type = 'audio/wav';
        alarmAudio.appendChild(alarmAudioSource);
        alarmAudio.load();
        document.querySelector('body').appendChild(alarmAudio);
    }

    function PlayAlarmSound() {
        let alarmAudio = document.querySelector('#alarm-audio');
        alarmAudio.play();
    }

    function ReloadGame() {
        reloadTriggered = true;
        window.location.reload();
    }

    // GODOT
    function getCanvasToDataUrl(
      canvas,
      offsetX,
      offsetY,
      width,
      height
    ) {
        let buffer = document.createElement('canvas');
        let bCtx = buffer.getContext('2d');
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

    async function getAverageRGB(image) {
        let blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r:0, g:0, b:0}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data,
            width,
            height,
            i = -4,
            length,
            rgb = {r:0, g:0, b:0},
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
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);

        return rgb;
    }

    async function CheckSpinningT() {
console.log('CheckSpinningT');
        // Get 4 edges square of the canvas.
        let canvas = document.querySelector("#canvas");
        let canvasWidth = canvas.width,
            canvasHeight = canvas.height,
            width = 25,
            height = 25;
        let edge1DataUrl = getCanvasToDataUrl(canvas, 0, 0, width, height);
        let edge2DataUrl = getCanvasToDataUrl(canvas, canvasWidth - width, 0, width, height);
        let edge3DataUrl = getCanvasToDataUrl(canvas, 0, canvasHeight - height, width, height);
        let edge4DataUrl = getCanvasToDataUrl(canvas, canvasWidth - width, canvasHeight - height, width, height);

        let rgb1 = await getAverageRGB(edge1DataUrl);
        let rgb2 = await getAverageRGB(edge2DataUrl);
        let rgb3 = await getAverageRGB(edge3DataUrl);
        let rgb4 = await getAverageRGB(edge4DataUrl);
console.log('rgb1',rgb1);
console.log('rgb2',rgb2);
console.log('rgb3',rgb3);
console.log('rgb4',rgb4);

        if (
            JSON.stringify(spinningTGreyRGB) === JSON.stringify(rgb1) &&
            JSON.stringify(spinningTGreyRGB) === JSON.stringify(rgb2) &&
            JSON.stringify(spinningTGreyRGB) === JSON.stringify(rgb3) &&
            JSON.stringify(spinningTGreyRGB) === JSON.stringify(rgb4)
        ) {
            console.log('Spinning T detected!');
            PlayAlarmSound();
        }

        setTimeout(CheckSpinningT, alertTimeoutWaitMs);
    }

    setTimeout(() => {
        document.querySelector('html').style.overflowY = 'auto';
    }, 15000);

    function SetTimeoutObserver(observer) {
        setTimeout(function() { observer.disconnect(); }, defaultObserverTimeOutMs);
    }
})();