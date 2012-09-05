# SCD.js

Pixel based video scene change detection in JavaScript.

Try it here: http://gmarty.github.com/SCD.js/

## How to make it work?

Call `Scd()` passing it an HTML video element (`videoEl` here):
```Javascript
Scd(videoEl);
videoEl.play(); // Play the video programatically
```

When a new cut change is detected, the video element will fire a `scenechange` event. You can easily listen to these events:
```Javascript
videoEl.addEventListener('scenechange', function(e) {
  console.log('New scene change detected at', e.timeStamp);
});
```

## How to configure it?

To specify particular settings, you can pass an object of optional parameters:
```Javascript
Scd(videoEl, {
  mode: 'PlaybackMode',
  step_width: 50,
  step_height: 37,
});
```

### Available options

`step_width` and `step_height` allow you to specify the size of the thumbnail image from which pixel differences will be computed to determine scene changes.
If it's high, it will take more time. If it's low, it will lead in less precise results.
Alternatively, you can set both width and height at a time using `step`.

Scene detection can be run in 2 different modes:
* `FastForwardMode` scans the video for scene changes as fast as it can.
* If `mode` is set to `PlaybackMode`, the scene will be detected as the video plays.

`FastForwardMode` is the default.

You can adjust the minimum time frame in which a scene change cannot happen by giving a value in seconds to `minSceneDuration`. By the default, it is 0.25.
If your video is likely to have long fading transitions of let's say 0.75 seconds, you should set `minSceneDuration` to at least 0.75.
Otherwise, wrong scene changes might be detected during the fading.

`threshold` is a number between 0 and 100 and has a default value of 25. If the difference between 2 scanned images is above `threshold`%, then a cut scene is detected.
For black and white videos you'll probably want to lower this value to about 0.15. `threshold` is the sensitivity of the scene change detection.

### Callback function

The constructor accepts a third argument which is a callback function called at the end of the video:
```Javascript
Scd(videoEl, {
  mode: 'PlaybackMode',
}, function(sceneTimecodes){
  console.log(sceneTimecodes.join(', '));
});
```
It returns an array containing the time codes of the scene changes relatively to the video.

## Note

SCD.js is subject to same domain policy and only works for video hosted on the same domain.

## License

```
Copyright 2012 Guillaume Marty

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
```
