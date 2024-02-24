(function(g){var window=this;'use strict';var Usb=function(a){g.V.call(this,{I:"div",S:"ytp-inline-preview-ui"});this.C=!1;this.player=a;this.T(a,"onStateChange",this.B2);this.T(a,"videodatachange",this.C2);this.T(a,"onInlinePreviewModeChange",this.d8);this.B=new g.Pu(this.z2,null,this);g.O(this,this.B)},J6=function(a){g.bW.call(this,a);
this.j=new Usb(this.player);g.O(this,this.j);this.j.hide();g.yU(this.player,this.j.element,4);a.isInline()&&(this.load(),a=a.getRootNode(),g.$u(a,["ytp-inline-preview-mode","ytp-no-contextmenu"]))};
g.w(Usb,g.V);g.k=Usb.prototype;
g.k.show=function(){g.Qu(this.B);if(!this.C){this.tooltip=new g.pY(this.player,this);g.O(this,this.tooltip);g.yU(this.player,this.tooltip.element,4);this.tooltip.scale=.6;this.Zd=new g.FW(this.player);g.O(this,this.Zd);this.j=new g.V({I:"div",La:["ytp-inline-preview-scrim"]});g.O(this,this.j);this.j.Ja(this.element);this.T(this.j.element,"click",this.A2);this.D=new g.iY(this.player,this,300);g.O(this,this.D);this.D.Ja(this.j.element);this.controls=new g.V({I:"div",S:"ytp-inline-preview-controls"});g.O(this,
this.controls);this.controls.Ja(this.element);var a=new g.BX(this.player,this,!1);g.O(this,a);a.Ja(this.controls.element);a=new g.gY(this.player,this);g.O(this,a);a.Ja(this.controls.element);this.progressBar=new g.IX(this.player,this);g.O(this,this.progressBar);g.yU(this.player,this.progressBar.element,4);this.T(this.player,"appresize",this.Yb);this.T(this.player,"fullscreentoggled",this.Yb);this.Yb();this.C=!0}0!==this.player.getPlayerState()&&g.V.prototype.show.call(this);this.progressBar.show();
this.player.ob("onInlinePreviewUiReady")};
g.k.hide=function(){this.B.stop();g.V.prototype.hide.call(this);this.player.isInline()||this.C&&this.progressBar.hide()};
g.k.xa=function(){g.V.prototype.xa.call(this)};
g.k.A2=function(a){a.target===this.j.element&&this.player.ob("onExpandInlinePreview",a)};
g.k.d8=function(){g.cv(this.player.getRootNode(),"ytp-inline-preview-mode",this.player.isInline())};
g.k.fg=function(){this.progressBar.Rc();this.D.Rc()};
g.k.z2=function(){this.fg();g.Qu(this.B)};
g.k.Yb=function(){g.M0a(this.progressBar,0,this.player.qb().getPlayerSize().width,!1);g.JX(this.progressBar)};
g.k.B2=function(a){this.player.isInline()&&(0===a?this.hide():this.show())};
g.k.C2=function(a,b){if(this.player.isInline()){g.cv(this.player.getRootNode(),"ytp-show-inline-preview-audio-controls",b.kC);var c,d,e;a=!(null==(e=null==(c=b.getPlayerResponse())?void 0:null==(d=c.playerConfig)?void 0:d.inlinePlaybackConfig)||!e.showScrubbingControls);g.cv(this.player.getRootNode(),"ytp-hide-inline-preview-progress-bar",!a)}};
g.k.Te=function(){return this.tooltip};
g.k.Vt=function(a,b,c,d,e){var f=d=0,h=0,l=g.rs(a);if(b){c=g.Yu(b,"ytp-mute-button");var m=g.Yu(b,"ytp-subtitles-button"),n=g.ps(b,this.element);b=g.rs(b);d=n.y+40;if(m||c)h=n.x-l.width+b.width}else h=c-l.width/2,f=35;b=this.player.qb().getPlayerSize().width;h=g.ue(h,0,b-l.width);d?(a.style.top=d+(e||0)+"px",a.style.bottom=""):(a.style.top="",a.style.bottom=f+"px");a.style.left=h+"px"};g.w(J6,g.bW);J6.prototype.zl=function(){return!1};
J6.prototype.load=function(){this.player.hideControls();this.j.show()};
J6.prototype.unload=function(){this.player.showControls();this.j.hide()};g.aW("inline_preview",J6);})(_yt_player);
