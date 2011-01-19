/**
 * Perform a scene change detection process on a video tag.
 * @constructor
 * @param {HTMLVideoElement} videoEl The video element to process.
 * @param {Object.<string, *>=} options An array of options.
 * @param {function()=} callback The callback function executed when process is complete.
 */
var Scd = function(videoEl, options, callback) {
    if(!videoEl || videoEl.constructor.toString().indexOf("HTMLVideoElement") < 0) {
        throw "Inputed element is not a video element.";
    }else {
        videoEl = /** @type {HTMLVideoElement} */ (videoEl);
    }

    // Private properties.
    /**
     * @type {Scd}
     * @private
     */
    var that = this;

    /**
     * Default mode is FastForward. Playback mode is used on browsers that don't support setting current playback time to sub seconds (e.g. Opera).
     * @type {string}
     * @private
     */
    var _mode = "FastForwardMode";

    /**
     * The width at which the frames will be resized down to for comparison.
     * @type {number}
     * @private
     */
    var _step_width = 50;

    /**
     * The height at which the frames will be resized down to for comparison.
     * @type {number}
     * @private
     */
    var _step_height = 50;

    /**
     * The minimal duration of a scene in s. 2 consecutive scene changes can be detected within this interval.
     * @type {number}
     * @private
     */
    var _minSceneDuration = 0.25;

    /**
     * Percentage color difference above which a scene change is detected (0 <= threshold <= 100).
     * @type {number}
     * @private
     */
    var _threshold = 25;

    /**
     * Display detected scenes first frame.
     * @type {boolean}
     * @private
     */
    var _debug = false;

    /**
     * Maximum color difference possible.
     * @const
     * @type {number}
     */
    var maxDiff = Math.sqrt(255 * 255 * 3);

    /**
     * Maximum color difference possible / 100. Used to speed up calculations on debug.
     * @const
     * @type {number}
     */
    var maxDiff100 = maxDiff / 100;

    /**
     * Current playback time.
     * @type {number}
     * @private
     */
    var _currentTime = 0;

    /**
     * Last current playback time. Used in "PlaybackMode" only.
     * @type {number}
     * @private
     */
    var _lastCurrentTime = 0;

    /**
     * Video width.
     * @type {number}
     * @private
     */
    var _width = 0;

    /**
     * Video height.
     * @type {number}
     * @private
     */
    var _height = 0;

    /**
     * Initial state of controls attribute of the video tag.
     * @type {boolean}
     * @private
     */
    var _controls = videoEl.controls;

    /**
     * Create a new canvas element.
     * @return {HTMLCanvasElement} A new canvas element created.
     * @private
     */
    var createCanvas = function() {
        return /** @type {HTMLCanvasElement} */ (document.createElement("canvas"));
    };

    /**
     * Canvas element of image 1.
     * @type {HTMLCanvasElement}
     * @private
     */
    var _canvasA = createCanvas();

    /**
     * Canvas element of image 2.
     * @type {HTMLCanvasElement}
     * @private
     */
    var _canvasB = createCanvas();

    /**
     * Canvas context for image 1.
     * @type {Object}
     * @private
     */
    var _ctxA = _canvasA.getContext("2d");

    /**
     * Canvas context for image 2.
     * @type {Object}
     * @private
     */
    var _ctxB = _canvasB.getContext("2d");

    /**
     * Determine if current scene change detection process is stopped.
     * @type {boolean}
     * @private
     */
    var _stop = false;

    /**
     * The total number of zones in the video to process. Used to speed up calculation.
     * @const
     * @type {number}
     * @private
     */
    var _step_sq;

    /**
     * The div element to write debug into.
     * @type {Element}
     * @private
     */
    var _debugContainer;

    /**
     * Expose data about the video when available.
     * @this {HTMLVideoElement}
     * @private
     */
    var getVideoData = function() {
        // durationchange appears to be the first event triggered by video that exposes width and height.
        _width = this.videoWidth;
        _height = this.videoHeight;
        _canvasA.width = _step_width;
        _canvasA.height = _step_height;
        _canvasB.width = _step_width;
        _canvasB.height = _step_height;
        //_ctxA.drawImage(this, 0, 0, _width, _height, 0, 0, _step_width, _step_height);

        this.removeEventListener("durationchange", getVideoData, false);
    };

    /**
     * Initialize values.
     * @private
     */
    var init = function() {
        // Options.
        if(options) {
            if(options["mode"] && options["mode"] === "PlaybackMode") {
                _mode = /** @type {string} */ (options["mode"]);
            }
            if(options["step_width"] && options["step_height"]) {
                _step_width = parseInt(options["step_width"], 10);
                _step_height = parseInt(options["step_height"], 10);
            }else if(options["step"]) {
                _step_width = parseInt(options["step"], 10);
                _step_height = parseInt(options["step"], 10);
            }
            if(options["minSceneDuration"]) {
                _minSceneDuration = parseFloat(options["minSceneDuration"]);
            }
            if(options["threshold"]) {
                _threshold = parseFloat(options["threshold"]);
            }
            if(options["debug"]) {
                _debug = Boolean(options["debug"]);
            }
            _lastCurrentTime = _minSceneDuration;
        }
        // _threshold is set between 0 and maxDiff100 interval to save calculations later.
        _threshold = _threshold * maxDiff100;
        // The number of pixels of resized frames. Used to speed up average calculation.
        _step_sq = _step_width * _step_height;

        // Debug
        if(_debug) {
            _debugContainer = document.createElement("div");
            _debugContainer.className = "scd-debug";
            document.getElementsByTagName("body")[0].appendChild(_debugContainer);
        }

        // @todo: Call this function if Scd is instantiated after durationchange was triggered.
        videoEl.addEventListener("durationchange", getVideoData, false);

        /**
         * Launch the scene detection process.
         */
        Scd.prototype["start"] = (_mode === "FastForwardMode") ? function() {
            // Fast forward mode.
            if(_stop) {
                return;
            }

            // Remove controls from video during process.
            videoEl.controls = false;

            videoEl.currentTime = _currentTime;
            videoEl.addEventListener("seeked", fastForwardModeEvent, false);

            detectSceneChange();
        } : function() {
            // Playback mode.
            if(_stop) {
                return;
            }

            // Remove controls from video during process.
            videoEl.controls = false;

            videoEl.currentTime = 0;
            videoEl.addEventListener("timeupdate", playbackModeEvent, false);
            videoEl.addEventListener("ended", videoEndedEvent, false);

            videoEl.play();
        };

        getMedian = (_step_sq % 2) ? function(numArray) {
            numArray.sort(compare);
            return numArray[((_step_sq + 1) / 2) - 1];
        } : function(numArray) {
            numArray.sort(compare);
            var middle = (_step_sq + 1) / 2;
            return (numArray[middle - 1.5] + numArray[middle - 0.5]) / 2;
        };
    };

    /**
     * Function triggered by seeked event on FastForwardMode.
     * @this {HTMLVideoElement}
     * @private
     */
    var fastForwardModeEvent = function() {
        detectSceneChange();

        _currentTime += _minSceneDuration;
        this.currentTime = _currentTime;
    };

    /**
     * Function triggered by timeupdate event on PlaybackMode.
     * @this {HTMLVideoElement}
     * @private
     */
    var playbackModeEvent = function() {
        if(this.currentTime - _lastCurrentTime >= _minSceneDuration) {
            _currentTime = this.currentTime;
            detectSceneChange();

            _lastCurrentTime = this.currentTime;
        }
    };

    /** Function called when video ends.
     * @type {function()}
     * @private
     */
    var videoEndedEvent = function() {
        if(callback) {
            callback();
        }
        that["stop"]();
        // @todo: Detach event when in PlaybackMode.
    };

    /**
     * Determine if a scene change occurred between last and current playback time.
     * @private
     */
    var detectSceneChange = function() {
        if(_stop) {
            return;
        }

        // @fixme: Bug on Opera. duration is not always defined.
        if(_mode === "FastForwardMode" && (videoEl.ended || _currentTime > videoEl.duration)) {
            videoEndedEvent();
            return;
        }

        _ctxA.drawImage(videoEl, 0, 0, _width, _height, 0, 0, _step_width, _step_height);
        var diff = computeDifferences(_ctxA, _ctxB);

        if(diff[0] > _threshold) {
            that["sceneTimecodes"].push(_currentTime);
            if(_debug) {
                var /** @type {Element} */ tmpContainer = document.createElement("div"),
                    /** @type {HTMLCanvasElement} */ tmpCanvasA = createCanvas(),
                    /** @type {number} */ half_width = tmpCanvasA.width = _width / 2,
                    /** @type {number} */ half_height = tmpCanvasA.height = _height / 2;
                tmpCanvasA.getContext("2d").drawImage(videoEl, 0, 0, _width, _height, 0, 0, half_width, half_height);
                tmpContainer.appendChild(document.createTextNode("@ "+_currentTime));
                tmpContainer.appendChild(document.createElement("br"));
                tmpContainer.appendChild(tmpCanvasA);
                tmpContainer.appendChild(document.createElement("br"));
                tmpContainer.appendChild(document.createTextNode("max: " + Math.round(diff[2] / maxDiff100) + "%, avg: " + Math.round(diff[1] / maxDiff100) + "%, med: " + Math.round(diff[0] / maxDiff100) + "%, min: " + Math.round(diff[3] / maxDiff100) + "%"));
                _debugContainer.appendChild(tmpContainer);
            }
        }

        _ctxB.drawImage(_canvasA, 0, 0, _step_width, _step_height, 0, 0, _step_width, _step_height);
    };

    /**
     * Return various statistics about zone differences of 2 frames.
     * Debug mode computes and returns more data.
     * @param {Object} ctxA The canvas context of image 1.
     * @param {Object} ctxB The canvas context of image 2.
     * @return {Array.<number>} Various statistics about input image differences.
     * @private
     */
    var computeDifferences = function(ctxA, ctxB) {
        var /** @type {Array.<number>} */ diff = [],
            /** @type {Array.<number>} */ colorsA = ctxA.getImageData(0, 0, _step_width, _step_height).data,
            /** @type {Array.<number>} */ colorsB = ctxB.getImageData(0, 0, _step_width, _step_height).data,
            /** @type {number} */ i = colorsA.length,
            /** @type {number} */ max,
            /** @type {number} */ avg,
            /** @type {number} */ med,
            /** @type {number} */ min;

        do {
            diff.push(getColorDistance(colorsA[i-4], colorsA[i+(1-4)], colorsA[i+(2-4)], colorsB[i-4], colorsB[i+(1-4)], colorsB[i+(2-4)]));
        } while(i = i - 4);

        med = getMedian(diff);
        if(_debug) {
            // When debug is on, full data are computed and returned...
            avg = getAverage(diff);
            max = getMaxOfArray(diff);
            min = getMinOfArray(diff);
            return [med, avg, max, min];
        }else {
            // Otherwise, only the median value is returned.
            return [med];
        }
    };

    /**
     * Calculates the distance between 2 colors RGB compounds.
     * @param {number} RA Red compound value of color A.
     * @param {number} GA Green compound value of color A.
     * @param {number} BA Blue compound value of color A.
     * @param {number} RB Red compound value of color B.
     * @param {number} GB Green compound value of color B.
     * @param {number} BB Blue compound value of color B.
     * @return {number} The distance.
     */
    var getColorDistance = function(RA, GA, BA, RB, GB, BB) {
        return Math.sqrt(Math.pow(RA - RB, 2) + Math.pow(GA - GB, 2) + Math.pow(BA - BB, 2));
        //return Math.sqrt((RA - RB) * (RA - RB) + (GA - GB) * (GA - GB) + (BA - BB) * (BA - BB));
    };

    /**
     * Calculates the maximum value of an array.
     * @param {Array.<number>} numArray An array of values.
     * @return {number} The maximum value.
     */
    var getMaxOfArray = function(numArray) {
        return Math.max.apply(null, numArray);
    };

    /**
     * Calculates the minimum value of an array.
     * @param {Array.<number>} numArray An array of values.
     * @return {number} The minimum value.
     */
    var getMinOfArray = function(numArray) {
        return Math.min.apply(null, numArray);
    };

    /**
     * Calculates the average value of an array.
     * @param {Array.<number>} numArray An array of values.
     * @return {number} The average value.
     */
    var getAverage = function(numArray) {
        return numArray.reduce(function(a, b) {
            return a + b;
        }) / _step_sq;
    };

    /**
     * Calculates the median value of an array.
     * @param {Array.<number>} numArray An array of values.
     * @return {number} The median value.
     * @private
     */
    var getMedian;

    /**
     * Comparison function for Array.sort() used in getMedian().
     * @param {number} a The first value to compare.
     * @param {number} b The second value to compare.
     * @return {number} The difference between a and b.
     */
    var compare = function(a, b) {
        return a - b;
    };

    init();

    /**
     * Temporary halt the scene detection process. Use Scd.start() again to resume process.
     */
    Scd.prototype["pause"] = function() {
        if(_stop) {
            return;
        }

        if(_mode === "FastForwardMode") {
            // Restore video element controls to its original state.
            videoEl.controls = _controls;
            videoEl.removeEventListener("seeked", fastForwardModeEvent, false);
        }
        videoEl.pause();
    };

    /**
     * Cancel the scene detection process.
     */
    Scd.prototype["stop"] = function() {
        that["pause"]();

        if(_mode === "FastForwardMode") {
            // Restore video element controls to its original state.
            videoEl.controls = _controls;
        }

        _stop = true;
    };
};

/**
 * Contains detected scene changes timecodes.
 * @type {Array.<number>}
 * @public
 */
Scd.prototype["sceneTimecodes"] = [];
