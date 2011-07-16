/*
 EventEmitter v2.0.0

 Copyright 2011, Oliver Caldwell (olivercaldwell.co.uk)
 Dual licensed under the MIT or GPL Version 2 licenses.
 https://github.com/Wolfy87/EventEmitter
*/
function j(){var a=this,b={},c=null,h=null,d=null;a.addListener=function(i,c){b[i]?b[i].push(c):b[i]=[c];a.a("newListener",i,c);return a};a.d=a.addListener;a.a=function(a){if(b[a]){h=Array.prototype.slice.call(arguments,1);for(c=0;c<b[a].length;c+=1)b[a][c].apply(null,h)}};a.c=function(a){b[a]||(b[a]=[]);return b[a]};a.e=function(b,c){function e(){c.apply(null,arguments);a.b(b,e)}a.addListener(b,e);return a};a.b=function(a,h){if(b[a]){a:{var e=b[a];if(e.indexOf)d=e.indexOf(h);else{for(c=0;c<e.length;c+=
1)if(e[c]===h){d=c;break a}d=-1}}d!==-1&&b[a].splice(d,1)}else b[a]=[]};a.f=function(c){b[c]=[];return a}};/*
 SCD.js.

 Copyright 2011, Guillaume Marty (edo999@gmail.com)
 Dual licensed under the MIT or GPL Version 2 licenses.
 https://github.com/gmarty/SCD.js
*/
function D(a,b,c){function h(a,b){return a-b}function d(){if(!m)if(k==="FastForwardMode"&&(a.ended||l>a.duration))i();else{y.drawImage(a,0,0,q,r,0,0,f,g);var b=[],c=y.getImageData(0,0,f,g).data,e=z.getImageData(0,0,f,g).data,d=c.length;do b.push(Math.sqrt(Math.pow(c[d-4]-e[d-4],2)+Math.pow(c[d+-3]-e[d+-3],2)+Math.pow(c[d+-2]-e[d+-2],2)));while(d-=4);A(b)>s&&(B.a("scenecut"),t.sceneTimecodes.push(l));z.drawImage(n,0,0,f,g,0,0,f,g)}}function i(){c&&c();t.stop()}function x(){if(this.currentTime-u>=o)l=
this.currentTime,d(),u=this.currentTime}function e(){d();l+=o;this.currentTime=l}function v(){a.width=a.width?a.width:a.videoWidth;a.height=a.height?a.height:a.videoHeight;a.videoWidth/a.videoHeight>a.width/a.height?(q=a.width,r=a.videoHeight/a.videoWidth*a.width):(q=a.videoWidth/a.videoHeight*a.height,r=a.height);n.width=f;n.height=g;w.width=f;w.height=g;a.removeEventListener("durationchange",v,!1)}if(!a||a.constructor.toString().indexOf("HTMLVideoElement")<0)throw"Inputed element is not a video element.";
var t=this,k="FastForwardMode",f=50,g=50,o=0.25,s=25,E=Math.sqrt(195075)/100,l=0,u=0,q=0,r=0,C=a.controls,n=document.createElement("canvas"),w=document.createElement("canvas"),y=n.getContext("2d"),z=w.getContext("2d"),m=!1,p,B,A;D.prototype.events=B=new j;(function(){b=b||{};b.mode&&b.mode==="PlaybackMode"&&(k=b.mode);b.step_width&&b.step_height?(f=parseInt(b.step_width,10),g=parseInt(b.step_height,10)):b.step&&(f=g=parseInt(b.step,10));b.minSceneDuration&&(o=parseFloat(b.minSceneDuration));b.threshold&&
(s=parseFloat(b.threshold));u=o;s*=E;p=f*g;a.readyState<3?a.addEventListener("durationchange",v,!1):v();D.prototype.start=k==="FastForwardMode"?function(){if(!m)a.controls=!1,a.currentTime=l,a.addEventListener("seeked",e,!1),d()}:function(){if(!m)a.controls=!1,a.currentTime=0,a.addEventListener("timeupdate",x,!1),a.addEventListener("ended",i,!1),a.play()};A=p%2?function(a){a.sort(h);return a[(p+1)/2-1]}:function(a){a.sort(h);var b=(p+1)/2;return(a[b-1.5]+a[b-0.5])/2}})();D.prototype.pause=function(){if(!m){if(k===
"FastForwardMode")a.controls=C,a.removeEventListener("seeked",e,!1);a.pause()}};D.prototype.stop=function(){t.pause();if(k==="FastForwardMode")a.controls=C;k==="FastForwardMode"?a.removeEventListener("seeked",e,!1):(a.removeEventListener("timeupdate",x,!1),a.removeEventListener("ended",i,!1));m=!0}}D.prototype.sceneTimecodes=[];window.Scd=D;
