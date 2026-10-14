import{$t as hb,At as Xu,Bn as y,Bt as as,C as Fg,D as Gs,Dn as tr,Gn as yr,Gt as de,It as _g,L as Io,Ln as xj,Qt as h,U as Lg,Un as yg,Ut as be,V as Ju,Y as M_,_t as Tb,dt as Qu,en as he,et as Ng,f as A_,i as Er,j as H_,jn as vs,k as H,kn as vg,ln as me$1,mn as nl,o as bt,q as ME,qn as zC,un as mg,ut as Qb,yn as pt}from"./main-OGESB34P.js";import{a as Se,c as kt,d as wn,r as Fe,s as ae,t as Ce}from"./chunk-BTtclJlM.js";import{n as I,r as _,t as A}from"./chunk-cnJHq5Ow.js";var te=new y(`MAT_PROGRESS_BAR_DEFAULT_OPTIONS`);var ee=(()=>{class a{_elementRef=h(he);_ngZone=h(H);_changeDetectorRef=h(Qb);_renderer=h(as);_cleanupTransitionEnd;constructor(){let e=zC(),r=h(te,{optional:!0});this._isNoopAnimation=e===`di-disabled`,e===`reduced-motion`&&this._elementRef.nativeElement.classList.add(`mat-progress-bar-reduced-motion`),r&&(r.color&&(this.color=this._defaultColor=r.color),this.mode=r.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor=`primary`;get value(){return this._value}set value(e){this._value=Y(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=Y(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new be;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode=`determinate`;ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,`transitionend`,this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode===`buffer`?this.bufferValue:100}%`}_isIndeterminate(){return this.mode===`indeterminate`||this.mode===`query`}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains(`mdc-linear-progress__primary-bar`)||(this.mode===`determinate`||this.mode===`buffer`)&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static ɵfac=function(r){return new(r||a)};static ɵcmp=(function(){function e(r,l){r&1&&vg(0,`div`,2)}return pt({type:a,selectors:[[`mat-progress-bar`]],hostAttrs:[`role`,`progressbar`,`aria-valuemin`,`0`,`aria-valuemax`,`100`,`tabindex`,`-1`,1,`mat-mdc-progress-bar`,`mdc-linear-progress`],hostVars:10,hostBindings:function(l,t){l&2&&(Io(`aria-valuenow`,t._isIndeterminate()?null:t.value)(`mode`,t.mode),nl(`mat-`+t.color),yr(`_mat-animation-noopable`,t._isNoopAnimation)(`mdc-linear-progress--animation-ready`,!t._isNoopAnimation)(`mdc-linear-progress--indeterminate`,t._isIndeterminate()))},inputs:{color:`color`,value:[2,`value`,`value`,xj],bufferValue:[2,`bufferValue`,`bufferValue`,xj],mode:`mode`},outputs:{animationEnd:`animationEnd`},exportAs:[`matProgressBar`],decls:7,vars:5,consts:[[`aria-hidden`,`true`,1,`mdc-linear-progress__buffer`],[1,`mdc-linear-progress__buffer-bar`],[1,`mdc-linear-progress__buffer-dots`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__primary-bar`],[1,`mdc-linear-progress__bar-inner`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__secondary-bar`]],template:function(l,t){l&1&&(Xu(0,`div`,0),vg(1,`div`,1),M_(2,e,1,0,`div`,2),Ju(),Xu(3,`div`,3),vg(4,`span`,4),Ju(),Xu(5,`div`,5),vg(6,`span`,4),Ju()),l&2&&(ME(),Ng(`flex-basis`,t._getBufferBarFlexBasis()),ME(),A_(t.mode===`buffer`?2:-1),ME(),Ng(`transform`,t._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --%NS%mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --%NS%mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--%NS%mat-progress-bar-track-height, 4px), var(--%NS%mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--%NS%mat-progress-bar-active-indicator-color, var(--%NS%mat-sys-primary));
  border-top-width: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--%NS%mat-progress-bar-track-height, 4px);
  border-radius: var(--%NS%mat-progress-bar-track-shape, var(--%NS%mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant)) calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--%NS%mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2})})()}return a})();function Y(a,n=0,e=100){return Math.max(n,Math.min(e,a))}var re=(()=>{class a{static ɵfac=function(r){return new(r||a)};static ɵmod=me$1({type:a});static ɵinj=de({imports:[Gs]})}return a})();function oe(a,n){if(a&1&&(vs(0,`p`),hb(1),vs(2,`strong`),hb(3),Qu()()),a&2){let e=n;ME(),Lg(` Converting `,e.doneCount+1,` of `,e.totalCount,`: `),ME(2),Fg(e.currentFileName)}}function se(a,n){a&1&&(vs(0,`p`),hb(1,`Reading the file…`),Qu())}function me(a,n){if(a&1&&(vs(0,`p`),hb(1),Qu()),a&2){let e=n;ME(),Lg(`Converted and downloaded `,e.convertedCount,` of `,e.totalCount,` files.`)}}function le(a,n){if(a&1&&yg(0,`mat-progress-bar`,9),a&2){let e=H_();mg(`value`,e.batchProgressPercent())}}function ce(a,n){a&1&&yg(0,`mat-progress-bar`,10)}var ne=class a{bookFilesService=h(Ce);bookStore=h(Er);router=h(bt);isBusy=tr(!1);batchProgress=tr(null);batchResult=tr(null);fileErrors=tr([]);fileErrorsTitle=Tb(()=>this.fileErrors().length>1?`These files could not be processed`:`The file could not be processed`);batchProgressPercent=Tb(()=>{let n=this.batchProgress();return n?n.doneCount/n.totalCount*100:0});async importFiles(n){this.resetStatus(),this.isBusy.set(!0);try{n.length===1?await this.importSingleFile(n[0]):await this.importBatch(n)}finally{this.isBusy.set(!1)}}async editJsonFile(n){let e=n[0];this.resetStatus(),this.isBusy.set(!0);try{let r=await this.bookFilesService.readBookJsonFile(e);if(!r.isValid){this.fileErrors.set([{fileName:e.name,messages:r.errors}]);return}this.bookStore.open({bookJson:r.bookJson,fileName:e.name,isSaved:!0}),await this.router.navigateByUrl(`/editor`)}catch(r){this.fileErrors.set([{fileName:e.name,messages:[wn(r)]}])}finally{this.isBusy.set(!1)}}async importSingleFile(n){try{let e=await this.bookFilesService.convertSourceFile(n),r=kt(n.name);await this.bookFilesService.downloadTranslationDocx(e.book,r),this.bookStore.open({bookJson:e,fileName:r,isSaved:!1,notice:`The translation file ${ae(r)} has been downloaded.`}),await this.router.navigateByUrl(`/editor`)}catch(e){this.fileErrors.set([{fileName:n.name,messages:[wn(e)]}])}}async importBatch(n){let e=[],r=0;for(let[l,t]of n.entries()){this.batchProgress.set({totalCount:n.length,doneCount:l,currentFileName:t.name});try{let b=await this.bookFilesService.convertSourceFile(t),N=kt(t.name);this.bookFilesService.downloadBookJson(b,N),await this.bookFilesService.downloadTranslationDocx(b.book,N),r++}catch(b){e.push({fileName:t.name,messages:[wn(b)]})}}this.batchProgress.set(null),this.batchResult.set({totalCount:n.length,convertedCount:r}),this.fileErrors.set(e)}resetStatus(){this.batchProgress.set(null),this.batchResult.set(null),this.fileErrors.set([])}static ɵfac=function(e){return new(e||a)};static ɵcmp=pt({type:a,selectors:[[`app-start-page`]],decls:38,vars:8,consts:[[`tabindex`,`-1`,1,`visually-hidden`],[1,`intro`],[1,`options`],[`appearance`,`outlined`],[`id`,`import-files-description`],[`label`,`Import files`,`icon`,`upload_file`,`accept`,`.txt,.epub`,`describedBy`,`import-files-description`,3,`filesSelected`,`multiple`,`disabled`],[`id`,`edit-json-description`],[`label`,`Edit JSON file`,`icon`,`edit_document`,`accept`,`.json`,`describedBy`,`edit-json-description`,3,`filesSelected`,`disabled`],[`aria-live`,`polite`,1,`status`],[`mode`,`determinate`,`aria-label`,`Batch conversion progress`,3,`value`],[`mode`,`indeterminate`,`aria-label`,`Reading the file`],[3,`title`,`fileErrors`]],template:function(e,r){if(e&1&&(vs(0,`h1`,0),hb(1,`Home`),Qu(),vs(2,`p`,1),hb(3,` Create books for Foreign Reader from text and EPUB files, and edit existing JSON books. Files are processed in your browser and never uploaded.
`),Qu(),vs(4,`div`,2)(5,`mat-card`,3)(6,`mat-card-content`)(7,`h2`),hb(8,`Import files`),Qu(),vs(9,`p`,4),hb(10,` Convert `),vs(11,`code`),hb(12,`.txt`),Qu(),hb(13,` and `),vs(14,`code`),hb(15,`.epub`),Qu(),hb(16,` files. One file opens in the editor, and its `),vs(17,`code`),hb(18,`.to-translate.docx`),Qu(),hb(19,` is downloaded; several files are converted and downloaded right away. `),Qu(),vs(20,`app-file-picker-button`,5),_g(`filesSelected`,function(t){return r.importFiles(t)}),Qu()()(),vs(21,`mat-card`,3)(22,`mat-card-content`)(23,`h2`),hb(24,`Edit JSON file`),Qu(),vs(25,`p`,6),hb(26,` Open a `),vs(27,`code`),hb(28,`.book.json`),Qu(),hb(29,` file to change its title, headers and bookmarks. `),Qu(),vs(30,`app-file-picker-button`,7),_g(`filesSelected`,function(t){return r.editJsonFile(t)}),Qu()()()(),vs(31,`div`,8),M_(32,oe,4,3,`p`)(33,se,2,0,`p`),M_(34,me,2,2,`p`),Qu(),M_(35,le,1,1,`mat-progress-bar`,9)(36,ce,1,0,`mat-progress-bar`,10),yg(37,`app-file-errors`,11)),e&2){let l,t;ME(20),mg(`multiple`,!0)(`disabled`,r.isBusy()),ME(10),mg(`disabled`,r.isBusy()),ME(2),A_((l=r.batchProgress())?32:r.isBusy()?33:-1,l),ME(2),A_((t=r.batchResult())?34:-1,t),ME(),A_(r.batchProgress()?35:r.isBusy()?36:-1),ME(2),mg(`title`,r.fileErrorsTitle())(`fileErrors`,r.fileErrors())}},dependencies:[Se,Fe,A,I,_,re,ee],styles:[`.visually-hidden[_ngcontent-%COMP%]{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}.intro[_ngcontent-%COMP%]{max-width:65ch}.options[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px;margin:24px 0}mat-card-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:flex-start;height:100%}mat-card-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-top:8px}mat-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{flex:1 1 auto}.status[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:8px 0;overflow-wrap:anywhere}`]})};export{ne as StartPage};