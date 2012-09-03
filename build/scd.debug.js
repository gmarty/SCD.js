/*
 EventEmitter v2.0.0.

 Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 Dual licensed under the MIT or GPL Version 2 licenses.
 https://github.com/Wolfy87/EventEmitter
*/
'use strict';var $JSCompiler_alias_NULL$$ = null, $JSCompiler_alias_FALSE$$ = !1;
function $EventEmitter$$() {
  var $instance$$ = this, $listeners$$ = {}, $i$$1$$ = $JSCompiler_alias_NULL$$, $args$$ = $JSCompiler_alias_NULL$$, $index$$44$$ = $JSCompiler_alias_NULL$$;
  $instance$$.addListener = function $$instance$$$addListener$($eventName$$, $listener$$29$$) {
    $listeners$$[$eventName$$] ? $listeners$$[$eventName$$].push($listener$$29$$) : $listeners$$[$eventName$$] = [$listener$$29$$];
    $instance$$.$emit$("newListener", $eventName$$, $listener$$29$$);
    return $instance$$
  };
  $instance$$.$on$ = $instance$$.addListener;
  $instance$$.$emit$ = function $$instance$$$$emit$$($eventName$$1$$) {
    if($listeners$$[$eventName$$1$$]) {
      $args$$ = Array.prototype.slice.call(arguments, 1);
      for($i$$1$$ = 0;$i$$1$$ < $listeners$$[$eventName$$1$$].length;$i$$1$$ += 1) {
        $listeners$$[$eventName$$1$$][$i$$1$$].apply($JSCompiler_alias_NULL$$, $args$$)
      }
    }
  };
  $instance$$.$listeners$ = function $$instance$$$$listeners$$($eventName$$2$$) {
    $listeners$$[$eventName$$2$$] || ($listeners$$[$eventName$$2$$] = []);
    return $listeners$$[$eventName$$2$$]
  };
  $instance$$.$once$ = function $$instance$$$$once$$($eventName$$3$$, $listener$$30$$) {
    function $wrapper$$() {
      $listener$$30$$.apply($JSCompiler_alias_NULL$$, arguments);
      $instance$$.removeListener($eventName$$3$$, $wrapper$$)
    }
    $instance$$.addListener($eventName$$3$$, $wrapper$$);
    return $instance$$
  };
  $instance$$.removeListener = function $$instance$$$removeListener$($eventName$$4$$, $listener$$31$$) {
    if($listeners$$[$eventName$$4$$]) {
      a: {
        var $stack$$inline_0$$ = $listeners$$[$eventName$$4$$];
        if($stack$$inline_0$$.indexOf) {
          $index$$44$$ = $stack$$inline_0$$.indexOf($listener$$31$$)
        }else {
          for($i$$1$$ = 0;$i$$1$$ < $stack$$inline_0$$.length;$i$$1$$ += 1) {
            if($stack$$inline_0$$[$i$$1$$] === $listener$$31$$) {
              $index$$44$$ = $i$$1$$;
              break a
            }
          }
          $index$$44$$ = -1
        }
      }
      -1 !== $index$$44$$ && $listeners$$[$eventName$$4$$].splice($index$$44$$, 1)
    }else {
      $listeners$$[$eventName$$4$$] = []
    }
    return $instance$$
  };
  $instance$$.$removeAllListeners$ = function $$instance$$$$removeAllListeners$$($eventName$$5$$) {
    $listeners$$[$eventName$$5$$] = [];
    return $instance$$
  }
}
;/*
 SCD.js - Pixel based video scene change detection in JavaScript
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
function $Scd$$($videoEl$$, $options$$2$$, $callback$$32$$) {
  function $compare$$($a$$1$$, $b$$1$$) {
    return $a$$1$$ - $b$$1$$
  }
  function $detectSceneChange$$() {
    if(!$_stop$$) {
      if("FastForwardMode" === $_mode$$ && ($videoEl$$.ended || $_currentTime$$ > $videoEl$$.duration)) {
        $videoEndedEvent$$()
      }else {
        $_ctxA$$.drawImage($videoEl$$, 0, 0, $_width$$, $_height$$, 0, 0, $_step_width$$, $_step_height$$);
        var $diff_diff$$inline_5_min$$inline_12$$;
        $diff_diff$$inline_5_min$$inline_12$$ = [];
        var $colorsA$$inline_6_max$$inline_9_tmpContainer$$ = $_ctxA$$.getImageData(0, 0, $_step_width$$, $_step_height$$).data, $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$ = $_ctxB$$.getImageData(0, 0, $_step_width$$, $_step_height$$).data, $half_width_i$$inline_8_med$$inline_11$$ = $colorsA$$inline_6_max$$inline_9_tmpContainer$$.length;
        do {
          $diff_diff$$inline_5_min$$inline_12$$.push(Math.sqrt(Math.pow($colorsA$$inline_6_max$$inline_9_tmpContainer$$[$half_width_i$$inline_8_med$$inline_11$$ - 4] - $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$[$half_width_i$$inline_8_med$$inline_11$$ - 4], 2) + Math.pow($colorsA$$inline_6_max$$inline_9_tmpContainer$$[$half_width_i$$inline_8_med$$inline_11$$ + -3] - $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$[$half_width_i$$inline_8_med$$inline_11$$ + -3], 2) + Math.pow($colorsA$$inline_6_max$$inline_9_tmpContainer$$[$half_width_i$$inline_8_med$$inline_11$$ + 
          -2] - $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$[$half_width_i$$inline_8_med$$inline_11$$ + -2], 2)))
        }while($half_width_i$$inline_8_med$$inline_11$$ -= 4);
        $half_width_i$$inline_8_med$$inline_11$$ = $getMedian$$($diff_diff$$inline_5_min$$inline_12$$);
        $_debug$$ ? ($avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$ = $diff_diff$$inline_5_min$$inline_12$$.reduce(function($a$$, $b$$) {
          return $a$$ + $b$$
        }) / $_step_sq$$, $colorsA$$inline_6_max$$inline_9_tmpContainer$$ = Math.max.apply($JSCompiler_alias_NULL$$, $diff_diff$$inline_5_min$$inline_12$$), $diff_diff$$inline_5_min$$inline_12$$ = Math.min.apply($JSCompiler_alias_NULL$$, $diff_diff$$inline_5_min$$inline_12$$), $diff_diff$$inline_5_min$$inline_12$$ = [$half_width_i$$inline_8_med$$inline_11$$, $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$, $colorsA$$inline_6_max$$inline_9_tmpContainer$$, $diff_diff$$inline_5_min$$inline_12$$]) : $diff_diff$$inline_5_min$$inline_12$$ = 
        [$half_width_i$$inline_8_med$$inline_11$$];
        if($diff_diff$$inline_5_min$$inline_12$$[0] > $_threshold$$ && ($_events$$.$emit$("scenecut"), $that$$.sceneTimecodes.push($_currentTime$$), $_debug$$)) {
          var $colorsA$$inline_6_max$$inline_9_tmpContainer$$ = document.createElement("div"), $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$ = document.createElement("canvas"), $half_width_i$$inline_8_med$$inline_11$$ = $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$.width = $_width$$ / 2, $half_height$$ = $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$.height = $_height$$ / 2;
          $avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$.getContext("2d").drawImage($videoEl$$, 0, 0, $_width$$, $_height$$, 0, 0, $half_width_i$$inline_8_med$$inline_11$$, $half_height$$);
          $colorsA$$inline_6_max$$inline_9_tmpContainer$$.appendChild(document.createTextNode("@ " + $_currentTime$$));
          $colorsA$$inline_6_max$$inline_9_tmpContainer$$.appendChild(document.createElement("br"));
          $colorsA$$inline_6_max$$inline_9_tmpContainer$$.appendChild($avg$$inline_10_colorsB$$inline_7_tmpCanvasA$$);
          $colorsA$$inline_6_max$$inline_9_tmpContainer$$.appendChild(document.createElement("br"));
          $colorsA$$inline_6_max$$inline_9_tmpContainer$$.appendChild(document.createTextNode("max: " + Math.round($diff_diff$$inline_5_min$$inline_12$$[2] / $maxDiff100$$) + "%, avg: " + Math.round($diff_diff$$inline_5_min$$inline_12$$[1] / $maxDiff100$$) + "%, med: " + Math.round($diff_diff$$inline_5_min$$inline_12$$[0] / $maxDiff100$$) + "%, min: " + Math.round($diff_diff$$inline_5_min$$inline_12$$[3] / $maxDiff100$$) + "%"));
          $_debugContainer$$.appendChild($colorsA$$inline_6_max$$inline_9_tmpContainer$$)
        }
        $_ctxB$$.drawImage($_canvasA$$, 0, 0, $_step_width$$, $_step_height$$, 0, 0, $_step_width$$, $_step_height$$)
      }
    }
  }
  function $videoEndedEvent$$() {
    $callback$$32$$ && $callback$$32$$();
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
    $videoEl$$.removeEventListener("durationchange", $getVideoData$$, $JSCompiler_alias_FALSE$$)
  }
  if(!$videoEl$$ || 0 > $videoEl$$.constructor.toString().indexOf("HTMLVideoElement")) {
    throw"Inputed element is not a video element.";
  }
  var $that$$ = this, $_mode$$ = "FastForwardMode", $_step_width$$ = 50, $_step_height$$ = 50, $_minSceneDuration$$ = 0.25, $_threshold$$ = 25, $_debug$$ = $JSCompiler_alias_FALSE$$, $maxDiff100$$ = Math.sqrt(195075) / 100, $_currentTime$$ = 0, $_lastCurrentTime$$ = 0, $_width$$ = 0, $_height$$ = 0, $_controls$$ = $videoEl$$.controls, $_canvasA$$ = document.createElement("canvas"), $_canvasB$$ = document.createElement("canvas"), $_ctxA$$ = $_canvasA$$.getContext("2d"), $_ctxB$$ = $_canvasB$$.getContext("2d"), 
  $_stop$$ = $JSCompiler_alias_FALSE$$, $_step_sq$$, $_step_sq_plus$$, $_debugContainer$$, $_events$$, $getMedian$$;
  $Scd$$.prototype.events = $_events$$ = new $EventEmitter$$;
  $options$$2$$ = $options$$2$$ || {};
  $options$$2$$.mode && "PlaybackMode" === $options$$2$$.mode && ($_mode$$ = $options$$2$$.mode);
  $options$$2$$.step_width && $options$$2$$.step_height ? ($_step_width$$ = parseInt($options$$2$$.step_width, 10), $_step_height$$ = parseInt($options$$2$$.step_height, 10)) : $options$$2$$.step && ($_step_width$$ = $_step_height$$ = parseInt($options$$2$$.step, 10));
  $options$$2$$.minSceneDuration && ($_minSceneDuration$$ = parseFloat($options$$2$$.minSceneDuration));
  $options$$2$$.threshold && ($_threshold$$ = parseFloat($options$$2$$.threshold));
  $options$$2$$.debug && ($_debug$$ = Boolean($options$$2$$.debug));
  $_lastCurrentTime$$ = $_minSceneDuration$$;
  $_threshold$$ *= $maxDiff100$$;
  $_step_sq$$ = $_step_width$$ * $_step_height$$;
  $_step_sq_plus$$ = ($_step_sq$$ + 1) / 2 - 1;
  $_debug$$ && ($_debugContainer$$ = document.createElement("div"), $_debugContainer$$.className = "scd-debug", document.getElementsByTagName("body")[0].appendChild($_debugContainer$$));
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
  $getMedian$$ = $_step_sq$$ % 2 ? function($numArray$$inline_14$$) {
    $numArray$$inline_14$$.sort($compare$$);
    return $numArray$$inline_14$$[$_step_sq_plus$$]
  } : function($numArray$$inline_15$$) {
    $numArray$$inline_15$$.sort($compare$$);
    return($numArray$$inline_15$$[$_step_sq_plus$$ - 0.5] + $numArray$$inline_15$$[$_step_sq_plus$$ + 0.5]) / 2
  };
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

