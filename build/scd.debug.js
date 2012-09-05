/*
 SCD.js - Pixel based video scene change detection in JavaScript.

 https://github.com/gmarty/SCD.js

 Copyright 2011-2012 Guillaume Marty

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
*/
'use strict';var $JSCompiler_alias_FALSE$$ = !1;
function $Scd$$($videoEl$$, $_step_sq_options$$2$$, $callback$$32$$) {
  function $detectSceneChange$$() {
    if(!$_stop$$) {
      if("FastForwardMode" === $_mode$$ && ($videoEl$$.ended || $_currentTime$$ > $videoEl$$.duration)) {
        $videoEndedEvent$$()
      }else {
        $_ctxA$$.drawImage($videoEl$$, 0, 0, $_width$$, $_height$$, 0, 0, $_step_width$$, $_step_height$$);
        var $diff_diff$$inline_3_med$$inline_7$$;
        $diff_diff$$inline_3_med$$inline_7$$ = [];
        var $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$ = $_ctxA$$.getImageData(0, 0, $_step_width$$, $_step_height$$).data, $colorsB$$inline_5_tmpCanvasA$$ = $_ctxB$$.getImageData(0, 0, $_step_width$$, $_step_height$$).data, $hours$$inline_10_i$$inline_6$$ = $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$.length;
        do {
          $diff_diff$$inline_3_med$$inline_7$$.push(Math.sqrt(Math.pow($_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$[$hours$$inline_10_i$$inline_6$$ - 4] - $colorsB$$inline_5_tmpCanvasA$$[$hours$$inline_10_i$$inline_6$$ - 4], 2) + Math.pow($_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$[$hours$$inline_10_i$$inline_6$$ + -3] - $colorsB$$inline_5_tmpCanvasA$$[$hours$$inline_10_i$$inline_6$$ + -3], 2) + Math.pow($_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$[$hours$$inline_10_i$$inline_6$$ + 
          -2] - $colorsB$$inline_5_tmpCanvasA$$[$hours$$inline_10_i$$inline_6$$ + -2], 2)))
        }while($hours$$inline_10_i$$inline_6$$ -= 4);
        $diff_diff$$inline_3_med$$inline_7$$ = $getMedian$$($diff_diff$$inline_3_med$$inline_7$$);
        $diff_diff$$inline_3_med$$inline_7$$ = $_debug$$ ? [$diff_diff$$inline_3_med$$inline_7$$, void 0, void 0, void 0] : [$diff_diff$$inline_3_med$$inline_7$$];
        if($diff_diff$$inline_3_med$$inline_7$$[0] > $_threshold$$ && ($_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$ = document.createEvent("Event"), $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$.initEvent("scenechange", !0, !0), $videoEl$$.dispatchEvent($_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$), $that$$.sceneTimecodes.push($_currentTime$$), $_debug$$)) {
          $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$ = document.createElement("div");
          $colorsB$$inline_5_tmpCanvasA$$ = document.createElement("canvas");
          $colorsB$$inline_5_tmpCanvasA$$.width = $half_width$$;
          $colorsB$$inline_5_tmpCanvasA$$.height = $half_height$$;
          $colorsB$$inline_5_tmpCanvasA$$.getContext("2d").drawImage($videoEl$$, 0, 0, $videoEl$$.videoWidth, $videoEl$$.videoHeight, 0, 0, $half_width$$, $half_height$$);
          var $hours$$inline_10_i$$inline_6$$ = Math.floor($_currentTime$$ / 3600), $minutes$$inline_11$$ = Math.floor(($_currentTime$$ - 3600 * $hours$$inline_10_i$$inline_6$$) / 60), $seconds$$inline_12$$ = ($_currentTime$$ - 3600 * $hours$$inline_10_i$$inline_6$$ - 60 * $minutes$$inline_11$$).toFixed(2);
          10 > $hours$$inline_10_i$$inline_6$$ && ($hours$$inline_10_i$$inline_6$$ = "0" + $hours$$inline_10_i$$inline_6$$);
          10 > $minutes$$inline_11$$ && ($minutes$$inline_11$$ = "0" + $minutes$$inline_11$$);
          10 > $seconds$$inline_12$$ && ($seconds$$inline_12$$ = "0" + $seconds$$inline_12$$);
          $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$.appendChild(document.createTextNode($hours$$inline_10_i$$inline_6$$ + ":" + $minutes$$inline_11$$ + ":" + $seconds$$inline_12$$));
          $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$.appendChild(document.createElement("br"));
          $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$.appendChild($colorsB$$inline_5_tmpCanvasA$$);
          $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$.appendChild(document.createElement("br"));
          $_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$.appendChild(document.createTextNode("med: " + Math.round($diff_diff$$inline_3_med$$inline_7$$[0] / $maxDiff100$$) + "%"));
          $_debugContainer$$.appendChild($_sceneChangeEvent_colorsA$$inline_4_tmpContainer$$)
        }
        $_ctxB$$.drawImage($_canvasA$$, 0, 0, $_step_width$$, $_step_height$$, 0, 0, $_step_width$$, $_step_height$$)
      }
    }
  }
  function $videoEndedEvent$$() {
    $callback$$32$$ && $callback$$32$$($that$$.sceneTimecodes);
    $that$$.stop()
  }
  function $playbackModeEvent$$() {
    this.currentTime - $_lastCurrentTime$$ >= $_minSceneDuration$$ && ($_currentTime$$ = this.currentTime, $detectSceneChange$$(), $_lastCurrentTime$$ = this.currentTime)
  }
  function $fastForwardModeEvent$$() {
    $detectSceneChange$$();
    this.currentTime = $_currentTime$$ += $_minSceneDuration$$
  }
  function $getVideoData$$() {
    $videoEl$$.width = $videoEl$$.width ? $videoEl$$.width : $videoEl$$.videoWidth;
    $videoEl$$.height = $videoEl$$.height ? $videoEl$$.height : $videoEl$$.videoHeight;
    $videoEl$$.videoWidth / $videoEl$$.videoHeight > $videoEl$$.width / $videoEl$$.height ? ($_width$$ = $videoEl$$.width, $_height$$ = $videoEl$$.videoHeight / $videoEl$$.videoWidth * $videoEl$$.width) : ($_width$$ = $videoEl$$.videoWidth / $videoEl$$.videoHeight * $videoEl$$.height, $_height$$ = $videoEl$$.height);
    $_canvasA$$.width = $_canvasB$$.width = $_step_width$$;
    $_canvasA$$.height = $_canvasB$$.height = $_step_height$$;
    $_debug$$ && ($half_width$$ = $_width$$ / 2, $half_height$$ = $_height$$ / 2);
    $videoEl$$.removeEventListener("durationchange", $getVideoData$$, $JSCompiler_alias_FALSE$$)
  }
  if(!document.createElement("video").canPlayType) {
    throw Error("Native video element not supported");
  }
  if(!$videoEl$$ || 0 > $videoEl$$.constructor.toString().indexOf("HTMLVideoElement")) {
    throw Error("Inputed element is not a video element.");
  }
  var $that$$ = this, $_mode$$ = "FastForwardMode", $_step_width$$ = 50, $_step_height$$ = 50, $_minSceneDuration$$ = 0.25, $_threshold$$ = 25, $_debug$$ = $JSCompiler_alias_FALSE$$, $maxDiff100$$ = Math.sqrt(195075) / 100, $_currentTime$$ = 0, $_lastCurrentTime$$ = 0, $_width$$ = 0, $_height$$ = 0, $_controls$$ = $videoEl$$.controls, $_canvasA$$ = document.createElement("canvas"), $_canvasB$$ = document.createElement("canvas"), $_ctxA$$ = $_canvasA$$.getContext("2d"), $_ctxB$$ = $_canvasB$$.getContext("2d"), 
  $_stop$$ = $JSCompiler_alias_FALSE$$, $_debugContainer$$, $half_width$$, $half_height$$, $getMedian$$, $_step_sq_options$$2$$ = $_step_sq_options$$2$$ || {};
  $_step_sq_options$$2$$.mode && "PlaybackMode" === $_step_sq_options$$2$$.mode && ($_mode$$ = $_step_sq_options$$2$$.mode);
  $_step_sq_options$$2$$.step_width && $_step_sq_options$$2$$.step_height ? ($_step_width$$ = parseInt($_step_sq_options$$2$$.step_width, 10), $_step_height$$ = parseInt($_step_sq_options$$2$$.step_height, 10)) : $_step_sq_options$$2$$.step && ($_step_width$$ = $_step_height$$ = parseInt($_step_sq_options$$2$$.step, 10));
  $_step_sq_options$$2$$.minSceneDuration && ($_minSceneDuration$$ = parseFloat($_step_sq_options$$2$$.minSceneDuration));
  $_step_sq_options$$2$$.threshold && ($_threshold$$ = parseFloat($_step_sq_options$$2$$.threshold));
  $_step_sq_options$$2$$.debug && ($_debug$$ = Boolean($_step_sq_options$$2$$.debug));
  $_lastCurrentTime$$ = $_minSceneDuration$$;
  $_threshold$$ *= $maxDiff100$$;
  $_step_sq_options$$2$$ = $_step_width$$ * $_step_height$$;
  $_debugContainer$$ = document.getElementById("__scd-debug");
  $_debug$$ && !$_debugContainer$$ && ($_debugContainer$$ = document.createElement("div"), $_debugContainer$$.id = "__scd-debug", (document.body || document.getElementsByTagName("body")[0]).appendChild($_debugContainer$$));
  3 > $videoEl$$.readyState ? $videoEl$$.addEventListener("durationchange", $getVideoData$$, $JSCompiler_alias_FALSE$$) : $getVideoData$$();
  $Scd$$.prototype.start = "FastForwardMode" === $_mode$$ ? function() {
    if(!$_stop$$) {
      $videoEl$$.controls = $JSCompiler_alias_FALSE$$;
      $videoEl$$.currentTime = $_currentTime$$;
      $videoEl$$.addEventListener("seeked", $fastForwardModeEvent$$, $JSCompiler_alias_FALSE$$);
      $detectSceneChange$$()
    }
  } : function() {
    if(!$_stop$$) {
      $videoEl$$.controls = $JSCompiler_alias_FALSE$$;
      $videoEl$$.currentTime = 0;
      $videoEl$$.addEventListener("timeupdate", $playbackModeEvent$$, $JSCompiler_alias_FALSE$$);
      $videoEl$$.addEventListener("ended", $videoEndedEvent$$, $JSCompiler_alias_FALSE$$);
      $videoEl$$.play()
    }
  };
  var $getMedianBody$$inline_14$$ = "a.sort(function(a,b){return a-b});";
  $getMedian$$ = new Function("a", 0 == $_step_sq_options$$2$$ % 2 ? $getMedianBody$$inline_14$$ + ("return a[" + $_step_sq_options$$2$$ / 2 + "]") : $getMedianBody$$inline_14$$ + ("return (a[" + ($_step_sq_options$$2$$ / 2 - 0.5) + "]+a[" + ($_step_sq_options$$2$$ / 2 + 0.5) + "])/2"));
  $Scd$$.prototype.pause = function $$Scd$$$$pause$() {
    if(!$_stop$$) {
      if($_mode$$ === "FastForwardMode") {
        $videoEl$$.controls = $_controls$$;
        $videoEl$$.removeEventListener("seeked", $fastForwardModeEvent$$, $JSCompiler_alias_FALSE$$)
      }
      $videoEl$$.pause()
    }
  };
  $Scd$$.prototype.stop = function $$Scd$$$$stop$() {
    $that$$.pause();
    if($_mode$$ === "FastForwardMode") {
      $videoEl$$.removeEventListener("seeked", $fastForwardModeEvent$$, $JSCompiler_alias_FALSE$$);
      $videoEl$$.controls = $_controls$$
    }else {
      $videoEl$$.removeEventListener("timeupdate", $playbackModeEvent$$, $JSCompiler_alias_FALSE$$);
      $videoEl$$.removeEventListener("ended", $videoEndedEvent$$, $JSCompiler_alias_FALSE$$)
    }
    $_stop$$ = true
  }
}
$Scd$$.prototype.sceneTimecodes = [];
window.Scd = $Scd$$;

