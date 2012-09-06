/*
 SCD.js - Pixel based video scene change detection in JavaScript.
 https://github.com/gmarty/SCD.js.

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
window.Scd = function Scd($videoEl$$, $options$$2$$, $callback$$32$$) {
  var $JSCompiler_object_inline_mode_0$$, $JSCompiler_object_inline_step_1$$, $JSCompiler_object_inline_step_width_2$$, $JSCompiler_object_inline_step_height_3$$, $JSCompiler_object_inline_minSceneDuration_4$$, $JSCompiler_object_inline_threshold_5$$, $JSCompiler_object_inline_debug_6$$;
  function $init$$() {
    for(var $_step_sq_k$$ in $options$$2$$) {
      switch($_step_sq_k$$) {
        case "mode":
          $JSCompiler_object_inline_mode_0$$ = "" + $options$$2$$[$_step_sq_k$$];
          break;
        case "step":
          $JSCompiler_object_inline_step_1$$ = +$options$$2$$[$_step_sq_k$$];
          break;
        case "step_width":
          $JSCompiler_object_inline_step_width_2$$ = +$options$$2$$[$_step_sq_k$$];
          break;
        case "step_height":
          $JSCompiler_object_inline_step_height_3$$ = +$options$$2$$[$_step_sq_k$$];
          break;
        case "minSceneDuration":
          $JSCompiler_object_inline_minSceneDuration_4$$ = +$options$$2$$[$_step_sq_k$$];
          break;
        case "threshold":
          $JSCompiler_object_inline_threshold_5$$ = 4.4167 * +$options$$2$$[$_step_sq_k$$];
          break;
        case "debug":
          $JSCompiler_object_inline_debug_6$$ = !!$options$$2$$[$_step_sq_k$$]
      }
    }
    0 != $JSCompiler_object_inline_step_1$$ && ($JSCompiler_object_inline_step_width_2$$ = $JSCompiler_object_inline_step_height_3$$ = $JSCompiler_object_inline_step_1$$);
    $videoEl$$.width || ($videoEl$$.width = $videoEl$$.videoWidth);
    $videoEl$$.height || ($videoEl$$.height = $videoEl$$.videoHeight);
    $videoEl$$.videoWidth / $videoEl$$.videoHeight > $videoEl$$.width / $videoEl$$.height ? ($width$$12$$ = $videoEl$$.width, $height$$11$$ = $videoEl$$.videoHeight / $videoEl$$.videoWidth * $videoEl$$.width) : ($width$$12$$ = $videoEl$$.videoWidth / $videoEl$$.videoHeight * $videoEl$$.height, $height$$11$$ = $videoEl$$.height);
    $canvasA$$.width = $canvasB$$.width = $JSCompiler_object_inline_step_width_2$$;
    $canvasA$$.height = $canvasB$$.height = $JSCompiler_object_inline_step_height_3$$;
    $_step_sq_k$$ = $JSCompiler_object_inline_step_width_2$$ * $JSCompiler_object_inline_step_height_3$$;
    $canvasContextImageDataLength$$ = 4 * $_step_sq_k$$;
    $debugContainer$$ = document.getElementById("__scd-debug");
    $JSCompiler_object_inline_debug_6$$ && !$debugContainer$$ && ($debugContainer$$ = document.createElement("div"), $debugContainer$$.id = "__scd-debug", (document.body || document.getElementsByTagName("body")[0]).appendChild($debugContainer$$));
    $_start$$ = "FastForwardMode" === $JSCompiler_object_inline_mode_0$$ ? function() {
      if(!$stop$$) {
        $videoEl$$.controls = $JSCompiler_alias_FALSE$$;
        $videoEl$$.currentTime = $currentTime$$;
        $videoEl$$.addEventListener("seeked", $fastForwardModeEvent$$, $JSCompiler_alias_FALSE$$);
        $detectSceneChange$$()
      }
    } : function() {
      if(!$stop$$) {
        $videoEl$$.controls = $JSCompiler_alias_FALSE$$;
        $videoEl$$.currentTime = 0;
        $videoEl$$.addEventListener("timeupdate", $playbackModeEvent$$, $JSCompiler_alias_FALSE$$);
        $videoEl$$.addEventListener("ended", $videoEndedEvent$$, $JSCompiler_alias_FALSE$$);
        $videoEl$$.play()
      }
    };
    $getMedian$$ = new Function("a", "a.sort(function(a,b){return a-b});" + ($_step_sq_k$$ % 2 ? "return a[" + ($_step_sq_k$$ / 2 - 0.5) + "]" : "return(a[" + ($_step_sq_k$$ / 2 - 1) + "]+a[" + $_step_sq_k$$ / 2 + "])/2"));
    $videoEl$$.removeEventListener("durationchange", $init$$, $JSCompiler_alias_FALSE$$)
  }
  function $fastForwardModeEvent$$() {
    $videoEl$$.ended || $currentTime$$ > $videoEl$$.duration ? $videoEndedEvent$$() : ($detectSceneChange$$(), this.currentTime = $currentTime$$ += $JSCompiler_object_inline_minSceneDuration_4$$)
  }
  function $playbackModeEvent$$() {
    this.currentTime - $lastCurrentTime$$ >= $JSCompiler_object_inline_minSceneDuration_4$$ && ($currentTime$$ = this.currentTime, $detectSceneChange$$(), $lastCurrentTime$$ = this.currentTime)
  }
  function $detectSceneChange$$() {
    $ctxA$$.drawImage($videoEl$$, 0, 0, $width$$12$$, $height$$11$$, 0, 0, $JSCompiler_object_inline_step_width_2$$, $JSCompiler_object_inline_step_height_3$$);
    var $diff_diff$$inline_10$$, $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$ = $ctxB$$;
    $diff_diff$$inline_10$$ = [];
    for(var $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$ = $ctxA$$.getImageData(0, 0, $JSCompiler_object_inline_step_width_2$$, $JSCompiler_object_inline_step_height_3$$).data, $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$ = $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$.getImageData(0, 0, $JSCompiler_object_inline_step_width_2$$, $JSCompiler_object_inline_step_height_3$$).data, $hours$$inline_16_i$$inline_13$$ = 0;$hours$$inline_16_i$$inline_13$$ < $canvasContextImageDataLength$$;$hours$$inline_16_i$$inline_13$$ += 
    4) {
      $diff_diff$$inline_10$$.push(Math.sqrt(($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$[$hours$$inline_16_i$$inline_13$$] - $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$[$hours$$inline_16_i$$inline_13$$]) * ($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$[$hours$$inline_16_i$$inline_13$$] - $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$[$hours$$inline_16_i$$inline_13$$]) + ($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$[$hours$$inline_16_i$$inline_13$$ + 1] - $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$[$hours$$inline_16_i$$inline_13$$ + 
      1]) * ($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$[$hours$$inline_16_i$$inline_13$$ + 1] - $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$[$hours$$inline_16_i$$inline_13$$ + 1]) + ($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$[$hours$$inline_16_i$$inline_13$$ + 2] - $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$[$hours$$inline_16_i$$inline_13$$ + 2]) * ($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$[$hours$$inline_16_i$$inline_13$$ + 2] - $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$[$hours$$inline_16_i$$inline_13$$ + 
      2])))
    }
    $diff_diff$$inline_10$$ = $getMedian$$($diff_diff$$inline_10$$);
    if($diff_diff$$inline_10$$ > $JSCompiler_object_inline_threshold_5$$ && ($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$ = document.createEvent("Event"), $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$.initEvent("scenechange", !0, !0), $videoEl$$.dispatchEvent($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$), $sceneTimecodes$$.push($currentTime$$), $JSCompiler_object_inline_debug_6$$)) {
      $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$ = document.createElement("div");
      $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$ = document.createElement("canvas");
      $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$.width = $width$$12$$ / 2;
      $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$.height = $height$$11$$ / 2;
      $colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$.getContext("2d").drawImage($videoEl$$, 0, 0, $videoEl$$.videoWidth, $videoEl$$.videoHeight, 0, 0, $width$$12$$ / 2, $height$$11$$ / 2);
      var $hours$$inline_16_i$$inline_13$$ = Math.floor($currentTime$$ / 3600), $minutes$$inline_17$$ = Math.floor(($currentTime$$ - 3600 * $hours$$inline_16_i$$inline_13$$) / 60), $seconds$$inline_18$$ = ($currentTime$$ - 3600 * $hours$$inline_16_i$$inline_13$$ - 60 * $minutes$$inline_17$$).toFixed(2);
      10 > $hours$$inline_16_i$$inline_13$$ && ($hours$$inline_16_i$$inline_13$$ = "0" + $hours$$inline_16_i$$inline_13$$);
      10 > $minutes$$inline_17$$ && ($minutes$$inline_17$$ = "0" + $minutes$$inline_17$$);
      10 > $seconds$$inline_18$$ && ($seconds$$inline_18$$ = "0" + $seconds$$inline_18$$);
      $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$.appendChild(document.createTextNode($hours$$inline_16_i$$inline_13$$ + ":" + $minutes$$inline_17$$ + ":" + $seconds$$inline_18$$));
      $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$.appendChild(document.createElement("br"));
      $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$.appendChild($colorsB$$inline_12_ctxB$$inline_9_tmpCanvasA$$);
      $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$.appendChild(document.createElement("br"));
      $_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$.appendChild(document.createTextNode("med: " + Math.round($diff_diff$$inline_10$$ / 4.4167) + "%"));
      $debugContainer$$.appendChild($_sceneChangeEvent_colorsA$$inline_11_tmpContainer$$)
    }
    $ctxB$$.drawImage($canvasA$$, 0, 0, $JSCompiler_object_inline_step_width_2$$, $JSCompiler_object_inline_step_height_3$$, 0, 0, $JSCompiler_object_inline_step_width_2$$, $JSCompiler_object_inline_step_height_3$$)
  }
  function $videoEndedEvent$$() {
    $callback$$32$$ && $callback$$32$$($sceneTimecodes$$);
    $_stop$$()
  }
  function $pause$$() {
    $stop$$ || ("FastForwardMode" === $JSCompiler_object_inline_mode_0$$ && ($videoEl$$.controls = $controls$$, $videoEl$$.removeEventListener("seeked", $fastForwardModeEvent$$, $JSCompiler_alias_FALSE$$)), $videoEl$$.pause())
  }
  function $_stop$$() {
    $pause$$();
    "FastForwardMode" === $JSCompiler_object_inline_mode_0$$ ? ($videoEl$$.removeEventListener("seeked", $fastForwardModeEvent$$, $JSCompiler_alias_FALSE$$), $videoEl$$.controls = $controls$$) : ($videoEl$$.removeEventListener("timeupdate", $playbackModeEvent$$, $JSCompiler_alias_FALSE$$), $videoEl$$.removeEventListener("ended", $videoEndedEvent$$, $JSCompiler_alias_FALSE$$));
    $stop$$ = !0
  }
  if(!document.createElement("video").canPlayType) {
    throw Error("Native video element not supported");
  }
  if(!$videoEl$$ || 0 > $videoEl$$.constructor.toString().indexOf("HTMLVideoElement")) {
    throw Error("Input element is not a video element.");
  }
  $JSCompiler_object_inline_mode_0$$ = "FastForwardMode";
  $JSCompiler_object_inline_step_1$$ = 0;
  $JSCompiler_object_inline_step_height_3$$ = $JSCompiler_object_inline_step_width_2$$ = 50;
  $JSCompiler_object_inline_minSceneDuration_4$$ = 0.25;
  $JSCompiler_object_inline_threshold_5$$ = 110.4182;
  $JSCompiler_object_inline_debug_6$$ = $JSCompiler_alias_FALSE$$;
  var $width$$12$$ = 0, $height$$11$$ = 0, $controls$$ = $videoEl$$.controls, $currentTime$$ = 0, $lastCurrentTime$$ = 0, $canvasA$$ = document.createElement("canvas"), $canvasB$$ = document.createElement("canvas"), $ctxA$$ = $canvasA$$.getContext("2d"), $ctxB$$ = $canvasB$$.getContext("2d"), $stop$$ = $JSCompiler_alias_FALSE$$, $canvasContextImageDataLength$$, $debugContainer$$, $_start$$, $getMedian$$, $sceneTimecodes$$ = [];
  3 > $videoEl$$.readyState ? $videoEl$$.addEventListener("durationchange", $init$$, $JSCompiler_alias_FALSE$$) : $init$$();
  return{start:function() {
    $_start$$()
  }, pause:$pause$$, stop:$_stop$$}
};

