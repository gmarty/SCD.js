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
function E(a,b,c){function h(a,b){return a-b}function d(){if(!l)if(m==="FastForwardMode"&&(a.ended||k>a.duration))i();else{z.drawImage(a,0,0,q,r,0,0,f,g);var b=[],c=z.getImageData(0,0,f,g).data,e=A.getImageData(0,0,f,g).data,d=c.length;do b.push(Math.sqrt(Math.pow(c[d-4]-e[d-4],2)+Math.pow(c[d+-3]-e[d+-3],2)+Math.pow(c[d+-2]-e[d+-2],2)));while(d-=4);B(b)>s&&(C.a("scenecut"),t.sceneTimecodes.push(k));A.drawImage(n,0,0,f,g,0,0,f,g)}}function i(){c&&c();t.stop()}function y(){if(this.currentTime-u>=o)k=
this.currentTime,d(),u=this.currentTime}function e(){d();k+=o;this.currentTime=k}function v(){a.width=a.width?a.width:a.videoWidth;a.height=a.height?a.height:a.videoHeight;a.videoWidth/a.videoHeight>a.width/a.height?(q=a.width,r=a.videoHeight/a.videoWidth*a.width):(q=a.videoWidth/a.videoHeight*a.height,r=a.height);n.width=w.width=f;n.height=w.height=g;a.removeEventListener("durationchange",v,!1)}if(!a||a.constructor.toString().indexOf("HTMLVideoElement")<0)throw"Inputed element is not a video element.";
var t=this,m="FastForwardMode",f=50,g=50,o=0.25,s=25,F=Math.sqrt(195075)/100,k=0,u=0,q=0,r=0,D=a.controls,n=document.createElement("canvas"),w=document.createElement("canvas"),z=n.getContext("2d"),A=w.getContext("2d"),l=!1,x,p,C,B;E.prototype.events=C=new j;(function(){b=b||{};b.mode&&b.mode==="PlaybackMode"&&(m=b.mode);b.step_width&&b.step_height?(f=parseInt(b.step_width,10),g=parseInt(b.step_height,10)):b.step&&(f=g=parseInt(b.step,10));b.minSceneDuration&&(o=parseFloat(b.minSceneDuration));b.threshold&&
(s=parseFloat(b.threshold));u=o;s*=F;x=f*g;p=(x+1)/2-1;a.readyState<3?a.addEventListener("durationchange",v,!1):v();E.prototype.start=m==="FastForwardMode"?function(){if(!l)a.controls=!1,a.currentTime=k,a.addEventListener("seeked",e,!1),d()}:function(){if(!l)a.controls=!1,a.currentTime=0,a.addEventListener("timeupdate",y,!1),a.addEventListener("ended",i,!1),a.play()};B=x%2?function(a){a.sort(h);return a[p]}:function(a){a.sort(h);return(a[p-0.5]+a[p+0.5])/2}})();E.prototype.pause=function(){if(!l){if(m===
"FastForwardMode")a.controls=D,a.removeEventListener("seeked",e,!1);a.pause()}};E.prototype.stop=function(){t.pause();m==="FastForwardMode"?(a.removeEventListener("seeked",e,!1),a.controls=D):(a.removeEventListener("timeupdate",y,!1),a.removeEventListener("ended",i,!1));l=!0}}E.prototype.sceneTimecodes=[];window.Scd=E;
