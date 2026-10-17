import{$ as Ol,At as _i,B as ME,Bt as el,Dn as tr,E as H_,En as tl,Ft as bg,H as M_,Hn as y,Kn as yr,Lt as dU,Mn as vs,Mt as al,Pn as wg,Pt as be,Q as O_,Qt as jC,Rt as de,S as G_,Sn as qs,Tt as YU,Vt as ey,Wn as yg,Xt as he,Yn as z_,Yt as hb,Zt as ht$1,at as Qu,b as Fg,c as m,cn as me,f as A_,gt as Vg,in as lU,it as Qb,j as Io,kt as _g,ln as mg,mn as pC,qn as z,qt as h,rn as ks,s as h$1,st as R_,tt as Po,u as $U,vt as WU,wn as rl,xn as q_,yn as pt$1,z as M2}from"./main-JAXLYAUG.js";import{t as Be}from"./chunk-Cm0zhPv1.js";var k=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new z;bulk={select:e=>this._select(e),deselect:e=>this._deselect(e),setSelection:e=>this._setSelection(e)};constructor(e=!1,t,n=!0,a){this._multiple=e,this._emitChanges=n,this.compareWith=a,t&&t.length&&(e?t.forEach(r=>this._markSelected(r)):this._markSelected(t[0]),this._selectedToEmit.length=0)}select(...e){return this._select(e)}deselect(...e){return this._deselect(e)}setSelection(...e){return this._setSelection(e)}toggle(e){return this.isSelected(e)?this.deselect(e):this.select(e)}clear(e=!0){this._unmarkAll();let t=this._hasQueuedChanges();return e&&this._emitChangeEvent(),t}isSelected(e){return this._selection.has(this._getConcreteValue(e))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(e){this._multiple&&this.selected&&this._selected.sort(e)}isMultipleSelection(){return this._multiple}_select(e){this._verifyValueAssignment(e),e.forEach(n=>this._markSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}_deselect(e){this._verifyValueAssignment(e),e.forEach(n=>this._unmarkSelected(n));let t=this._hasQueuedChanges();return this._emitChangeEvent(),t}_setSelection(e){this._verifyValueAssignment(e);let t=this.selected,n=new Set(e.map(r=>this._getConcreteValue(r)));e.forEach(r=>this._markSelected(r)),t.filter(r=>!n.has(this._getConcreteValue(r,n))).forEach(r=>this._unmarkSelected(r));let a=this._hasQueuedChanges();return this._emitChangeEvent(),a}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(e){e=this._getConcreteValue(e),this.isSelected(e)||(this._multiple||this._unmarkAll(),this.isSelected(e)||this._selection.add(e),this._emitChanges&&this._selectedToEmit.push(e))}_unmarkSelected(e){e=this._getConcreteValue(e),this.isSelected(e)&&(this._selection.delete(e),this._emitChanges&&this._deselectedToEmit.push(e))}_unmarkAll(){this.isEmpty()||this._selection.forEach(e=>this._unmarkSelected(e))}_verifyValueAssignment(e){e.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(e,t){if(this.compareWith){t=t??this._selection;for(let n of t)if(this.compareWith(e,n))return n;return e}else return e}};var bt=(()=>{class l{_animationsDisabled=ey();state=`unchecked`;disabled=!1;appearance=`full`;static ɵfac=function(n){return new(n||l)};static ɵcmp=pt$1({type:l,selectors:[[`mat-pseudo-checkbox`]],hostAttrs:[1,`mat-pseudo-checkbox`],hostVars:12,hostBindings:function(n,a){n&2&&yr(`mat-pseudo-checkbox-indeterminate`,a.state===`indeterminate`)(`mat-pseudo-checkbox-checked`,a.state===`checked`)(`mat-pseudo-checkbox-disabled`,a.disabled)(`mat-pseudo-checkbox-minimal`,a.appearance===`minimal`)(`mat-pseudo-checkbox-full`,a.appearance===`full`)(`_mat-animation-noopable`,a._animationsDisabled)},inputs:{state:`state`,disabled:`disabled`,appearance:`appearance`},decls:0,vars:0,template:function(n,a){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--%NS%mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--%NS%mat-pseudo-checkbox-full-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--%NS%mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--%NS%mat-pseudo-checkbox-full-selected-icon-color, var(--%NS%mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--%NS%mat-pseudo-checkbox-full-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--%NS%mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2})}return l})();var mt=new y(`MAT_BUTTON_TOGGLE_DEFAULT_OPTIONS`,{providedIn:`root`,factory:()=>({hideSingleSelectionIndicator:!1,hideMultipleSelectionIndicator:!1,disabledInteractive:!1})});var pt=new y(`MatButtonToggleGroup`);var It={provide:Be,useExisting:_i(()=>B),multi:!0};var S=class{source;value;constructor(e,t){this.source=e,this.value=t}};var B=(()=>{class l{_changeDetector=h(Qb);_dir=h(jC,{optional:!0});_multiple=!1;_disabled=!1;_disabledInteractive=!1;_selectionModel;_rawValue;_controlValueAccessorChangeFn=()=>{};_onTouched=()=>{};_buttonToggles;appearance;get name(){return this._name}set name(t){this._name=t,this._markButtonsForCheck()}_name=h(Ol).getId(`mat-button-toggle-group-`);vertical=!1;get value(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t.map(n=>n.value):t[0]?t[0].value:void 0}set value(t){this._setSelectionByValue(t),this.valueChange.emit(this.value)}valueChange=new be;get selected(){let t=this._selectionModel?this._selectionModel.selected:[];return this.multiple?t:t[0]||null}get multiple(){return this._multiple}set multiple(t){this._multiple=t,this._markButtonsForCheck()}get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._markButtonsForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t,this._markButtonsForCheck()}get dir(){return this._dir&&this._dir.value===`rtl`?`rtl`:`ltr`}change=new be;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(t){this._hideSingleSelectionIndicator=t,this._markButtonsForCheck()}_hideSingleSelectionIndicator;get hideMultipleSelectionIndicator(){return this._hideMultipleSelectionIndicator}set hideMultipleSelectionIndicator(t){this._hideMultipleSelectionIndicator=t,this._markButtonsForCheck()}_hideMultipleSelectionIndicator;constructor(){let t=h(mt,{optional:!0});this.appearance=t&&t.appearance?t.appearance:`standard`,this._hideSingleSelectionIndicator=t?.hideSingleSelectionIndicator??!1,this._hideMultipleSelectionIndicator=t?.hideMultipleSelectionIndicator??!1}ngOnInit(){this._selectionModel=new k(this.multiple,void 0,!1)}ngAfterContentInit(){this._selectionModel.select(...this._buttonToggles.filter(t=>t.checked)),this.multiple||this._initializeTabIndex()}writeValue(t){this.value=t,this._changeDetector.markForCheck()}registerOnChange(t){this._controlValueAccessorChangeFn=t}registerOnTouched(t){this._onTouched=t}setDisabledState(t){this.disabled=t}_keydown(t){if(this.multiple||this.disabled||M2(t))return;let a=t.target.id,r=this._buttonToggles.toArray().findIndex(o=>o.buttonId===a),i=null;switch(t.keyCode){case 32:case 13:i=this._buttonToggles.get(r)||null;break;case 38:i=this._getNextButton(r,-1);break;case 37:i=this._getNextButton(r,this.dir===`ltr`?-1:1);break;case 40:i=this._getNextButton(r,1);break;case 39:i=this._getNextButton(r,this.dir===`ltr`?1:-1);break;default:return}i&&(t.preventDefault(),i._onButtonClick(),i.focus())}_emitChangeEvent(t){let n=new S(t,this.value);this._rawValue=n.value,this._controlValueAccessorChangeFn(n.value),this.change.emit(n)}_syncButtonToggle(t,n,a=!1,r=!1){!this.multiple&&this.selected&&!t.checked&&(this.selected.checked=!1),this._selectionModel?n?this._selectionModel.select(t):this._selectionModel.deselect(t):r=!0,r?Promise.resolve().then(()=>this._updateModelValue(t,a)):this._updateModelValue(t,a)}_isSelected(t){return this._selectionModel&&this._selectionModel.isSelected(t)}_isPrechecked(t){return typeof this._rawValue>`u`?!1:this.multiple&&Array.isArray(this._rawValue)?this._rawValue.some(n=>t.value!=null&&n===t.value):t.value===this._rawValue}_initializeTabIndex(){if(this._buttonToggles.forEach(t=>{t.tabIndex=-1}),this.selected)this.selected.tabIndex=0;else for(let t=0;t<this._buttonToggles.length;t++){let n=this._buttonToggles.get(t);if(!n.disabled){n.tabIndex=0;break}}}_getNextButton(t,n){let a=this._buttonToggles;for(let r=1;r<=a.length;r++){let i=(t+n*r+a.length)%a.length,o=a.get(i);if(o&&!o.disabled)return o}return null}_setSelectionByValue(t){if(this._rawValue=t,!this._buttonToggles)return;let n=this._buttonToggles.toArray();if(this.multiple&&t?(this._clearSelection(),t.forEach(a=>this._selectValue(a,n))):(this._clearSelection(),this._selectValue(t,n)),!this.multiple&&n.every(a=>a.tabIndex===-1)){for(let a of n)if(!a.disabled){a.tabIndex=0;break}}}_clearSelection(){this._selectionModel.clear(),this._buttonToggles.forEach(t=>{t.checked=!1,this.multiple||(t.tabIndex=-1)})}_selectValue(t,n){for(let a of n)if(a.value===t){a.checked=!0,this._selectionModel.select(a),this.multiple||(a.tabIndex=0);break}}_updateModelValue(t,n){n&&this._emitChangeEvent(t),this.valueChange.emit(this.value)}_markButtonsForCheck(){this._buttonToggles?.forEach(t=>t._markForCheck())}static ɵfac=function(n){return new(n||l)};static ɵdir=ht$1({type:l,selectors:[[`mat-button-toggle-group`]],contentQueries:function(n,a,r){if(n&1&&bg(r,T,5),n&2){let i;z_(i=G_())&&(a._buttonToggles=i)}},hostAttrs:[1,`mat-button-toggle-group`],hostVars:6,hostBindings:function(n,a){n&1&&_g(`keydown`,function(i){return a._keydown(i)}),n&2&&(Io(`role`,a.multiple?`group`:`radiogroup`)(`aria-disabled`,a.disabled),yr(`mat-button-toggle-vertical`,a.vertical)(`mat-button-toggle-group-appearance-standard`,a.appearance===`standard`))},inputs:{appearance:`appearance`,name:`name`,vertical:[2,`vertical`,`vertical`,al],value:`value`,multiple:[2,`multiple`,`multiple`,al],disabled:[2,`disabled`,`disabled`,al],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,al],hideSingleSelectionIndicator:[2,`hideSingleSelectionIndicator`,`hideSingleSelectionIndicator`,al],hideMultipleSelectionIndicator:[2,`hideMultipleSelectionIndicator`,`hideMultipleSelectionIndicator`,al]},outputs:{valueChange:`valueChange`,change:`change`},exportAs:[`matButtonToggleGroup`],features:[Vg([It,{provide:pt,useExisting:l}])]})}return l})();var T=(()=>{class l{_changeDetectorRef=h(Qb);_elementRef=h(he);_focusMonitor=h(pC);_idGenerator=h(Ol);_animationDisabled=ey();_checked=!1;ariaLabel;ariaLabelledby=null;_buttonElement;buttonToggleGroup;get buttonId(){return`${this.id}-button`}id;name;value;get tabIndex(){return this._tabIndex()}set tabIndex(t){this._tabIndex.set(t)}_tabIndex;disableRipple=!1;get appearance(){return this.buttonToggleGroup?this.buttonToggleGroup.appearance:this._appearance}set appearance(t){this._appearance=t}_appearance;get checked(){return this.buttonToggleGroup?this.buttonToggleGroup._isSelected(this):this._checked}set checked(t){t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&this.buttonToggleGroup._syncButtonToggle(this,this._checked),this._changeDetectorRef.markForCheck())}get disabled(){return this._disabled||this.buttonToggleGroup&&this.buttonToggleGroup.disabled}set disabled(t){this._disabled=t}_disabled=!1;get disabledInteractive(){return this._disabledInteractive||this.buttonToggleGroup!==null&&this.buttonToggleGroup.disabledInteractive}set disabledInteractive(t){this._disabledInteractive=t}_disabledInteractive;change=new be;constructor(){h(Po).load(WU);let t=h(pt,{optional:!0}),n=h(new ks(`tabindex`),{optional:!0})||``,a=h(mt,{optional:!0});this._tabIndex=tr(parseInt(n)||0),this.buttonToggleGroup=t,this._appearance=a&&a.appearance?a.appearance:`standard`,this._disabledInteractive=a?.disabledInteractive??!1}ngOnInit(){let t=this.buttonToggleGroup;this.id=this.id||this._idGenerator.getId(`mat-button-toggle-`),t&&(t._isPrechecked(this)?this.checked=!0:t._isSelected(this)!==this._checked&&t._syncButtonToggle(this,this._checked))}ngAfterViewInit(){this._animationDisabled||this._elementRef.nativeElement.classList.add(`mat-button-toggle-animations-enabled`),this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){let t=this.buttonToggleGroup;this._focusMonitor.stopMonitoring(this._elementRef),t&&t._isSelected(this)&&t._syncButtonToggle(this,!1,!1,!0)}focus(t){this._buttonElement.nativeElement.focus(t)}_onButtonClick(){if(this.disabled)return;let t=this.isSingleSelector()?!0:!this._checked;if(t!==this._checked&&(this._checked=t,this.buttonToggleGroup&&(this.buttonToggleGroup._syncButtonToggle(this,this._checked,!0),this.buttonToggleGroup._onTouched())),this.isSingleSelector()){let n=this.buttonToggleGroup._buttonToggles.find(a=>a.tabIndex===0);n&&(n.tabIndex=-1),this.tabIndex=0}this.change.emit(new S(this,this.value))}_markForCheck(){this._changeDetectorRef.markForCheck()}_getButtonName(){return this.isSingleSelector()?this.buttonToggleGroup.name:this.name||null}isSingleSelector(){return this.buttonToggleGroup&&!this.buttonToggleGroup.multiple}static ɵfac=function(n){return new(n||l)};static ɵcmp=(function(){let t=[`button`],n=[`*`];function a(r,i){if(r&1&&(vs(0,`div`,2),yg(1,`mat-pseudo-checkbox`,6),Qu()),r&2){let o=H_();ME(),mg(`disabled`,o.disabled)}}return pt$1({type:l,selectors:[[`mat-button-toggle`]],viewQuery:function(i,o){if(i&1&&wg(t,5),i&2){let m;z_(m=G_())&&(o._buttonElement=m.first)}},hostAttrs:[`role`,`presentation`,1,`mat-button-toggle`],hostVars:14,hostBindings:function(i,o){i&1&&_g(`focus`,function(){return o.focus()}),i&2&&(Io(`aria-label`,null)(`aria-labelledby`,null)(`id`,o.id)(`name`,null),yr(`mat-button-toggle-standalone`,!o.buttonToggleGroup)(`mat-button-toggle-checked`,o.checked)(`mat-button-toggle-disabled`,o.disabled)(`mat-button-toggle-disabled-interactive`,o.disabledInteractive)(`mat-button-toggle-appearance-standard`,o.appearance===`standard`))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],id:`id`,name:`name`,value:`value`,tabIndex:`tabIndex`,disableRipple:[2,`disableRipple`,`disableRipple`,al],appearance:`appearance`,checked:[2,`checked`,`checked`,al],disabled:[2,`disabled`,`disabled`,al],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,al]},outputs:{change:`change`},exportAs:[`matButtonToggle`],ngContentSelectors:n,decls:7,vars:13,consts:[[`button`,``],[`type`,`button`,1,`mat-button-toggle-button`,`mat-focus-indicator`,3,`click`,`id`,`disabled`],[1,`mat-button-toggle-checkbox-wrapper`],[1,`mat-button-toggle-label-content`],[1,`mat-button-toggle-focus-overlay`],[`matRipple`,``,1,`mat-button-toggle-ripple`,3,`matRippleTrigger`,`matRippleDisabled`],[`state`,`checked`,`aria-hidden`,`true`,`appearance`,`minimal`,3,`disabled`]],template:function(i,o){if(i&1&&(el(),vs(0,`button`,1,0),_g(`click`,function(){return o._onButtonClick()}),M_(2,a,2,1,`div`,2),vs(3,`span`,3),tl(4),Qu()(),yg(5,`span`,4)(6,`span`,5)),i&2){let m=q_(1);mg(`id`,o.buttonId)(`disabled`,o.disabled&&!o.disabledInteractive||null),Io(`role`,o.isSingleSelector()?`radio`:`button`)(`tabindex`,o.disabled&&!o.disabledInteractive?-1:o.tabIndex)(`aria-pressed`,o.isSingleSelector()?null:o.checked)(`aria-checked`,o.isSingleSelector()?o.checked:null)(`name`,o._getButtonName())(`aria-label`,o.ariaLabel)(`aria-labelledby`,o.ariaLabelledby)(`aria-disabled`,o.disabled&&o.disabledInteractive?`true`:null),ME(2),A_(o.buttonToggleGroup&&(!o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideSingleSelectionIndicator||o.buttonToggleGroup.multiple&&!o.buttonToggleGroup.hideMultipleSelectionIndicator)?2:-1),ME(4),mg(`matRippleTrigger`,m)(`matRippleDisabled`,o.disableRipple||o.disabled)}},dependencies:[$U,bt],styles:[`.mat-button-toggle-standalone,
.mat-button-toggle-group {
  position: relative;
  display: inline-flex;
  flex-direction: row;
  white-space: nowrap;
  overflow: hidden;
  -webkit-tap-highlight-color: transparent;
  border-radius: var(--%NS%mat-button-toggle-legacy-shape);
  transform: translateZ(0);
}
.mat-button-toggle-standalone:not([class*=mat-elevation-z]),
.mat-button-toggle-group:not([class*=mat-elevation-z]) {
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone,
  .mat-button-toggle-group {
    outline: solid 1px;
  }
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
.mat-button-toggle-group-appearance-standard {
  border-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard .mat-pseudo-checkbox,
.mat-button-toggle-group-appearance-standard .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-button-toggle-selected-state-text-color, var(--%NS%mat-sys-on-secondary-container));
}
.mat-button-toggle-standalone.mat-button-toggle-appearance-standard:not([class*=mat-elevation-z]),
.mat-button-toggle-group-appearance-standard:not([class*=mat-elevation-z]) {
  box-shadow: none;
}
@media (forced-colors: active) {
  .mat-button-toggle-standalone.mat-button-toggle-appearance-standard,
  .mat-button-toggle-group-appearance-standard {
    outline: 0;
  }
}

.mat-button-toggle-vertical {
  flex-direction: column;
}
.mat-button-toggle-vertical .mat-button-toggle-label-content {
  display: block;
}

.mat-button-toggle {
  white-space: nowrap;
  position: relative;
  color: var(--%NS%mat-button-toggle-legacy-text-color);
  font-family: var(--%NS%mat-button-toggle-legacy-label-text-font);
  font-size: var(--%NS%mat-button-toggle-legacy-label-text-size);
  line-height: var(--%NS%mat-button-toggle-legacy-label-text-line-height);
  font-weight: var(--%NS%mat-button-toggle-legacy-label-text-weight);
  letter-spacing: var(--%NS%mat-button-toggle-legacy-label-text-tracking);
  --%NS%mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--%NS%mat-button-toggle-legacy-selected-state-text-color);
}
.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-legacy-focus-state-layer-opacity);
}
.mat-button-toggle .mat-icon svg {
  vertical-align: top;
}

.mat-button-toggle-checkbox-wrapper {
  display: inline-block;
  justify-content: flex-start;
  align-items: center;
  width: 0;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 16px;
  transform: translate3d(0, -50%, 0);
}
[dir=rtl] .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 16px;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: 12px;
}
[dir=rtl] .mat-button-toggle-appearance-standard .mat-button-toggle-checkbox-wrapper {
  left: auto;
  right: 12px;
}
.mat-button-toggle-checked .mat-button-toggle-checkbox-wrapper {
  width: 18px;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-checkbox-wrapper {
  transition: width 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-checkbox-wrapper {
  transition: none;
}

.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-legacy-selected-state-text-color);
  background-color: var(--%NS%mat-button-toggle-legacy-selected-state-background-color);
}

.mat-button-toggle-disabled {
  pointer-events: none;
  color: var(--%NS%mat-button-toggle-legacy-disabled-state-text-color);
  background-color: var(--%NS%mat-button-toggle-legacy-disabled-state-background-color);
  --%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--%NS%mat-button-toggle-legacy-disabled-state-text-color);
}
.mat-button-toggle-disabled.mat-button-toggle-checked {
  background-color: var(--%NS%mat-button-toggle-legacy-disabled-selected-state-background-color);
}

.mat-button-toggle-disabled-interactive {
  pointer-events: auto;
}

.mat-button-toggle-appearance-standard {
  color: var(--%NS%mat-button-toggle-text-color, var(--%NS%mat-sys-on-surface));
  background-color: var(--%NS%mat-button-toggle-background-color, transparent);
  font-family: var(--%NS%mat-button-toggle-label-text-font, var(--%NS%mat-sys-label-large-font));
  font-size: var(--%NS%mat-button-toggle-label-text-size, var(--%NS%mat-sys-label-large-size));
  line-height: var(--%NS%mat-button-toggle-label-text-line-height, var(--%NS%mat-sys-label-large-line-height));
  font-weight: var(--%NS%mat-button-toggle-label-text-weight, var(--%NS%mat-sys-label-large-weight));
  letter-spacing: var(--%NS%mat-button-toggle-label-text-tracking, var(--%NS%mat-sys-label-large-tracking));
}
.mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
[dir=rtl] .mat-button-toggle-group-appearance-standard .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle-appearance-standard + .mat-button-toggle-appearance-standard {
  border-left: none;
  border-right: none;
  border-top: solid 1px var(--%NS%mat-button-toggle-divider-color, var(--%NS%mat-sys-outline));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-selected-state-text-color, var(--%NS%mat-sys-on-secondary-container));
  background-color: var(--%NS%mat-button-toggle-selected-state-background-color, var(--%NS%mat-sys-secondary-container));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled {
  color: var(--%NS%mat-button-toggle-disabled-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-toggle-disabled-state-background-color, transparent);
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled .mat-pseudo-checkbox {
  --%NS%mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color: var(--%NS%mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-button-toggle-appearance-standard.mat-button-toggle-disabled.mat-button-toggle-checked {
  color: var(--%NS%mat-button-toggle-disabled-selected-state-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  background-color: var(--%NS%mat-button-toggle-disabled-selected-state-background-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
  background-color: var(--%NS%mat-button-toggle-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-button-toggle-appearance-standard.cdk-keyboard-focused .mat-button-toggle-focus-overlay {
  opacity: var(--%NS%mat-button-toggle-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
@media (hover: none) {
  .mat-button-toggle-appearance-standard:hover .mat-button-toggle-focus-overlay {
    display: none;
  }
}

.mat-button-toggle-label-content {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  padding: 0 16px;
  line-height: var(--%NS%mat-button-toggle-legacy-height);
  position: relative;
}
.mat-button-toggle-appearance-standard .mat-button-toggle-label-content {
  padding: 0 12px;
  line-height: var(--%NS%mat-button-toggle-height, 40px);
}

.mat-button-toggle-label-content > * {
  vertical-align: middle;
}

.mat-button-toggle-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
  pointer-events: none;
  opacity: 0;
  background-color: var(--%NS%mat-button-toggle-legacy-state-layer-color);
}

@media (forced-colors: active) {
  .mat-button-toggle-checked .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
    opacity: 0.5;
    height: 0;
  }
  .mat-button-toggle-checked:hover .mat-button-toggle-focus-overlay {
    opacity: 0.6;
  }
  .mat-button-toggle-checked.mat-button-toggle-appearance-standard .mat-button-toggle-focus-overlay {
    border-bottom: solid 500px;
  }
}
.mat-button-toggle .mat-button-toggle-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.mat-button-toggle-button {
  border: 0;
  background: none;
  color: inherit;
  padding: 0;
  margin: 0;
  font: inherit;
  outline: none;
  width: 100%;
  cursor: pointer;
}
.mat-button-toggle-animations-enabled .mat-button-toggle-button {
  transition: padding 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-button-toggle-vertical .mat-button-toggle-button {
  transition: none;
}
.mat-button-toggle-disabled .mat-button-toggle-button {
  cursor: default;
}
.mat-button-toggle-button::-moz-focus-inner {
  border: 0;
}
.mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 30px;
}
[dir=rtl] .mat-button-toggle-checked .mat-button-toggle-button:has(.mat-button-toggle-checkbox-wrapper) {
  padding-left: 0;
  padding-right: 30px;
}

.mat-button-toggle-standalone.mat-button-toggle-appearance-standard {
  --%NS%mat-focus-indicator-border-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard:not(.mat-button-toggle-vertical) .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}

.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:last-of-type .mat-button-toggle-button::before {
  border-bottom-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-bottom-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
.mat-button-toggle-group-appearance-standard.mat-button-toggle-vertical .mat-button-toggle:first-of-type .mat-button-toggle-button::before {
  border-top-right-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
  border-top-left-radius: var(--%NS%mat-button-toggle-shape, var(--%NS%mat-sys-corner-extra-large));
}
`],encapsulation:2})})()}return l})();var ht=(()=>{class l{static ɵfac=function(n){return new(n||l)};static ɵmod=me({type:l});static ɵinj=de({imports:[YU,T,qs]})}return l})();var wt=(l,e)=>e.value;function Mt(l,e){if(l&1&&(vs(0,`mat-button-toggle`,4)(1,`mat-icon`),hb(2),Qu(),hb(3),Qu()),l&2){let t=e.$implicit;mg(`value`,t.value),ME(2),Fg(t.icon),ME(),rl(` `,t.label,` `)}}var Ct=[{value:`system`,label:`System`,icon:`routine`},{value:`light`,label:`Light`,icon:`light_mode`},{value:`dark`,label:`Dark`,icon:`dark_mode`}];var ft=class l{themeService=h(m);themeOptions=Ct;onThemeChange(e){h$1(e.value)&&this.themeService.setThemePreference(e.value)}static ɵfac=function(t){return new(t||l)};static ɵcmp=pt$1({type:l,selectors:[[`app-settings-page`]],decls:10,vars:1,consts:[[`tabindex`,`-1`],[`aria-labelledby`,`theme-heading`],[`id`,`theme-heading`],[`aria-labelledby`,`theme-heading`,3,`change`,`value`],[3,`value`],[1,`hint`]],template:function(t,n){t&1&&(vs(0,`h1`,0),hb(1,`Settings`),Qu(),vs(2,`section`,1)(3,`h2`,2),hb(4,`Theme`),Qu(),vs(5,`mat-button-toggle-group`,3),_g(`change`,function(r){return n.onThemeChange(r)}),R_(6,Mt,4,3,`mat-button-toggle`,4,wt),Qu(),vs(8,`p`,5),hb(9,`System follows the light or dark mode of your device.`),Qu()()),t&2&&(ME(5),mg(`value`,n.themeService.themePreference()),ME(),O_(n.themeOptions))},dependencies:[ht,B,T,dU,lU],styles:[`mat-button-toggle-group[_ngcontent-%COMP%]{flex-wrap:wrap}mat-icon[_ngcontent-%COMP%]{vertical-align:middle}.hint[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}`]})};export{ft as SettingsPage};