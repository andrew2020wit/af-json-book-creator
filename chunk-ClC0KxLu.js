import{n as l,t as k}from"./chunk-USgBHqPl.js";import{$ as O_,$t as ht,A as II,An as vC,At as _a$1,B as M,Bt as dU,C as G_,Cn as qs,Ct as Wi,D as H_,Dn as tl$1,Dt as Xu,E as H,En as te,Et as X,F as Jg,Fn as vs,Ft as al$1,G as Mb,Gt as fg,H as ME,Hn as xr,Ht as el$1,I as Ju,In as vt,It as as,J as Nb,Jn as z,Jt as h,K as Mj,Kn as yg,L as Kt,Ln as wg,Lt as be,M as Ig,Mn as vg,N as Io$1,Nn as vn$1,Nt as _n$1,O as He,On as tr,P as Is,Pn as vr,Pt as ae,Q as O,Qt as hg,R as Lg,Rn as wt$1,Rt as bg,S as G,Sn as q_,St as W_,T as Gy,Tn as rl$1,Tt as Wy,U as MU,Un as xu,Ut as fC,V as M2,Vt as de$1,W as M_,Wn as y,Wt as f_,X as Nl$1,Xn as z_,Xt as hb,Y as Nj,Yt as hU,Z as Ny,Zt as he,_ as Cg,_n as pU,_t as Tg,a as bt$1,an as k$1,at as Po$1,b as Dg,bn as pt,bt as WD,cn as lr,ct as Qu,d as AU,dn as me,dt as Re$1,en as im,et as Ol$1,f as A_,fn as mn$1,ft as Rj,g as By,gn as pC,gt as Tb,ht as Sj,i as Sc,in as jy,it as Pm,j as Ic,jn as vU,jt as _b,k as Hg,kn as ty,kt as Zn,l as $,ln as lt,lt as RC,mn as nf,mt as Sg,n as Er,nn as j_,nt as P,o as xc,ot as Pr,p as Ab,pn as mr,pt as Sf,q as NC,qn as yr,rn as jo$1,rt as Pg,sn as lU,st as Qb,t as Ei$1,tn as jC,tt as Op,un as mU,ut as R_,v as Cn$1,vn as p_,vt as Tj,wn as rf,wt as Wt,x as E,xn as pw,y as DI,yn as pe,yt as Vy,z as Lt,zn as xC,zt as dC}from"./main-GQVL2W6A.js";import{a as Y,c as _t,d as it$1,f as me$1,i as Xt,l as ct,n as G$1,o as Yt,p as ot,r as J,s as Zt$1,t as Be,u as ft}from"./chunk-CojMbNN-.js";import{a as Mr,c as Qe$1,f as he$1,i as Kt$1,l as Qt$1,n as Ge$1,p as qe$1,r as Gt,s as Pr$1,t as Bn}from"./chunk-rQVC_ZPv.js";var pn=Symbol(`FIELD_TREE`);var Ji=0;function ga(){return Ji}function ye(n,t){return(...e)=>{try{return Ji=t,n(...e)}finally{Ji=0}}}function _a(n){return!n}function Tr(n){return n}function Se(n){return Array.isArray(n)}function Qt(n){return(typeof n==`object`||typeof n==`function`)&&n!=null}var xe=Symbol();var oi=Symbol();var yt=class{predicates;fns=[];constructor(t){this.predicates=t}push(t){this.fns.push(Ar(this.predicates,t))}mergeIn(t){let e=this.predicates?t.fns.map(i=>Ar(this.predicates,i)):t.fns;this.fns.push(...e)}hasRules(){return this.fns.length>0}};var Jt=class extends yt{get defaultValue(){return!1}compute(t){return this.fns.some(e=>{let i=e(t);return i&&i!==oi})}};var qe=class n extends yt{ignore;static ignoreNull(t){return new n(t,e=>e===null)}constructor(t,e){super(t),this.ignore=e}get defaultValue(){return[]}compute(t){return this.fns.reduce((e,i)=>{let r=i(t);return r===void 0||r===oi?e:Se(r)?[...e,...this.ignore?r.filter(o=>!this.ignore(o)):r]:this.ignore&&this.ignore(r)?e:[...e,r]},[])}};var en=class extends qe{constructor(t){super(t,void 0)}};var tn=class extends yt{key;get defaultValue(){return this.key.reducer.getInitial()}constructor(t,e){super(t),this.key=e}compute(t){if(this.fns.length===0)return this.key.reducer.getInitial();let e=this.key.reducer.getInitial();for(let i=0;i<this.fns.length;i++){let r=this.fns[i](t);r!==oi&&(e=this.key.reducer.reduce(e,r))}return e}};function Ar(n,t){return n.length===0?t:e=>{for(let i of n){let r=e.stateOf(i.path),o=vr(r.structure.pathKeys).length-i.depth;for(let a=0;a<o;a++)r=r.structure.parent;if(!i.fn(r.context))return oi}return t(e)}}var Xe=class{predicates;hidden;disabledReasons;readonly;syncErrors;syncTreeErrors;asyncErrors;metadata=new Map;constructor(t){this.predicates=t,this.hidden=new Jt(t),this.disabledReasons=new en(t),this.readonly=new Jt(t),this.syncErrors=qe.ignoreNull(t),this.syncTreeErrors=qe.ignoreNull(t),this.asyncErrors=qe.ignoreNull(t)}hasAnyLogic(){return this.hidden.hasRules()||this.disabledReasons.hasRules()||this.readonly.hasRules()||this.syncErrors.hasRules()||this.syncTreeErrors.hasRules()||this.asyncErrors.hasRules()||this.metadata.size>0}hasMetadata(t){return this.metadata.has(t)}hasMetadataKeys(){return this.metadata.size>0}getMetadataKeys(){return this.metadata.keys()}getMetadata(t){return this.metadata.has(t)||this.metadata.set(t,new tn(this.predicates,t)),this.metadata.get(t)}mergeIn(t){this.hidden.mergeIn(t.hidden),this.disabledReasons.mergeIn(t.disabledReasons),this.readonly.mergeIn(t.readonly),this.syncErrors.mergeIn(t.syncErrors),this.syncTreeErrors.mergeIn(t.syncTreeErrors),this.asyncErrors.mergeIn(t.asyncErrors);for(let e of t.getMetadataKeys()){let i=t.metadata.get(e);this.getMetadata(e).mergeIn(i)}}};var ei=class{depth;constructor(t){this.depth=t}build(){return new ti(this,[],0)}};var Ue=class n extends ei{constructor(t){super(t)}current;all=[];addHiddenRule(t){this.getCurrent().addHiddenRule(t)}addDisabledReasonRule(t){this.getCurrent().addDisabledReasonRule(t)}addReadonlyRule(t){this.getCurrent().addReadonlyRule(t)}addSyncErrorRule(t){this.getCurrent().addSyncErrorRule(t)}addSyncTreeErrorRule(t){this.getCurrent().addSyncTreeErrorRule(t)}addAsyncErrorRule(t){this.getCurrent().addAsyncErrorRule(t)}addMetadataRule(t,e){this.getCurrent().addMetadataRule(t,e)}getChild(t){if(t===xe){let e=this.getCurrent().children;e.size>(e.has(xe)?1:0)&&(this.current=void 0)}return this.getCurrent().getChild(t)}hasLogic(t){return this===t?!0:this.all.some(({builder:e})=>e.hasLogic(t))}hasRules(){return this.all.length>0}anyChildHasLogic(){return this.all.some(({builder:t})=>t.anyChildHasLogic())}mergeIn(t,e){e?this.all.push({builder:t,predicate:{fn:ye(e.fn,this.depth),path:e.path}}):this.all.push({builder:t}),this.current=void 0}getCurrent(){return this.current===void 0&&(this.current=new xt(this.depth),this.all.push({builder:this.current})),this.current}static newRoot(){return new n(0)}};var xt=class extends ei{logic=new Xe([]);children=new Map;constructor(t){super(t)}addHiddenRule(t){this.logic.hidden.push(ye(t,this.depth))}addDisabledReasonRule(t){this.logic.disabledReasons.push(ye(t,this.depth))}addReadonlyRule(t){this.logic.readonly.push(ye(t,this.depth))}addSyncErrorRule(t){this.logic.syncErrors.push(ye(t,this.depth))}addSyncTreeErrorRule(t){this.logic.syncTreeErrors.push(ye(t,this.depth))}addAsyncErrorRule(t){this.logic.asyncErrors.push(ye(t,this.depth))}addMetadataRule(t,e){this.logic.getMetadata(t).push(ye(e,this.depth))}getChild(t){return this.children.has(t)||this.children.set(t,new Ue(this.depth+1)),this.children.get(t)}hasLogic(t){return this===t}hasRules(){return this.logic.hasAnyLogic()||this.children.size>0}anyChildHasLogic(){for(let t of this.children.values())if(t.hasRules())return!0;return!1}};var ti=class n{builder;predicates;depth;logic;constructor(t,e,i){this.builder=t,this.predicates=e,this.depth=i,this.logic=t?va(t,e,i):new Xe([])}getChild(t){let e=this.builder?zr(this.builder,t):[];if(e.length===0)return new n(void 0,[],this.depth+1);if(e.length===1){let{builder:i,predicates:r}=e[0];return new n(i,[...this.predicates,...r.map(o=>rn(o,this.depth))],this.depth+1)}else return new nn(e.map(({builder:r,predicates:o})=>new n(r,[...this.predicates,...o.map(a=>rn(a,this.depth))],this.depth+1)))}hasLogic(t){return this.builder?this.builder.hasLogic(t):!1}hasRules(){return this.builder?this.builder.hasRules():!1}anyChildHasLogic(){return this.builder?this.builder.anyChildHasLogic():!1}};var nn=class n{all;logic;constructor(t){this.all=t,this.logic=new Xe([]);for(let e of t)this.logic.mergeIn(e.logic)}getChild(t){return new n(this.all.flatMap(e=>e.getChild(t)))}hasLogic(t){return this.all.some(e=>e.hasLogic(t))}hasRules(){return this.all.some(t=>t.hasRules())}anyChildHasLogic(){return this.all.some(t=>t.anyChildHasLogic())}};function zr(n,t){if(n instanceof Ue)return n.all.flatMap(({builder:e,predicate:i})=>{let r=zr(e,t);return i?r.map(({builder:o,predicates:a})=>({builder:o,predicates:[...a,i]})):r});if(n instanceof xt)return[...t!==xe&&n.children.has(xe)?[{builder:n.getChild(xe),predicates:[]}]:[],...n.children.has(t)?[{builder:n.getChild(t),predicates:[]}]:[]];throw new E(1909,!1)}function va(n,t,e){let i=new Xe(t);if(n instanceof Ue){let r=n.all.map(({builder:o,predicate:a})=>new ti(o,a?[...t,rn(a,e)]:t,e));for(let o of r)i.mergeIn(o.logic)}else if(n instanceof xt)i.mergeIn(n.logic);else throw new E(1909,!1);return i}function rn(n,t){return l(k({},n),{depth:t})}var Vr=Symbol(`PATH`);var de=class n{keys;parent;keyInParent;root;children=new Map;fieldPathProxy=new Proxy(this,ba);logicBuilder;constructor(t,e,i,r){this.keys=t,this.parent=i,this.keyInParent=r,this.root=e??this,i||(this.logicBuilder=Ue.newRoot())}get builder(){return this.logicBuilder?this.logicBuilder:this.parent.builder.getChild(this.keyInParent)}getChild(t){return this.children.has(t)||this.children.set(t,new n([...this.keys,t],this.root,this,t)),this.children.get(t)}mergeIn(t,e){let i=t.compile();this.builder.mergeIn(i.builder,e)}static unwrapFieldPath(t){return t[Vr]}static newRoot(){return new n([],void 0,void 0,void 0)}};var ba={get(n,t){return t===Vr?n:n.getChild(t).fieldPathProxy}};var Zt;var bt=new Map;var St=class n{schemaFn;constructor(t){this.schemaFn=t}compile(){if(bt.has(this))return bt.get(this);let t=de.newRoot();bt.set(this,t);let e=Zt;try{Zt=t,this.schemaFn(t.fieldPathProxy)}finally{Zt=e}return t}static create(t){return t instanceof n?t:new n(t)}static rootCompile(t){try{return bt.clear(),t===void 0?de.newRoot():t instanceof n?t.compile():new n(t).compile()}finally{bt.clear()}}};function ya(n){return n instanceof St||typeof n==`function`}function ai(n){if(Zt!==de.unwrapFieldPath(n).root)throw new E(1908,!1)}var Ke={list(){return{reduce:(n,t)=>t===void 0?n:[...n,t],getInitial:()=>[]}},min(){return{reduce:(n,t)=>n===void 0||t===void 0?n??t:t<n?t:n,getInitial:()=>{}}},max(){return{reduce:(n,t)=>n===void 0||t===void 0?n??t:t>n?t:n,getInitial:()=>{}}},or(){return{reduce:(n,t)=>n||t,getInitial:()=>!1}},and(){return{reduce:(n,t)=>n&&t,getInitial:()=>!0}},override:xa};function xa(n){return{reduce:(t,e)=>e,getInitial:()=>n?.()}}var gn=Symbol(`IS_ASYNC_VALIDATION_RESOURCE`);var ii=class{reducer;create;brand;[gn];constructor(t,e){this.reducer=t,this.create=e}};function De(n){return new ii(n??Ke.override())}function _n(){return De()}var Br=De(Ke.or());var Hr=_n();var jr=_n();var Wr=De(Ke.max());var Yr=De(Ke.min());var qr=De(Ke.list());function oe(n,t){if(n===t)return!0;if(!n||!t||n.length!==t.length)return!1;for(let e=0;e<n.length;e++)if(!Object.is(n[e],t[e]))return!1;return!0}function Sa(n){return n.errors().length>0?`invalid`:n.pending()?`unknown`:`valid`}var on=class{node;constructor(t){this.node=t}rawSyncTreeErrors=Tb(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncTreeErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawSyncTreeErrors()??[]],{equal:oe});syncErrors=Tb(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.syncErrors.compute(this.node.context),...this.syncTreeErrors(),...Ca(this.node.submitState.submissionErrors())],{equal:oe});syncValid=Tb(()=>this.shouldSkipValidation()?!0:this.node.structure.reduceChildren(this.syncErrors().length===0,(t,e)=>e&&t.validationState.syncValid(),_a));syncTreeErrors=Tb(()=>this.rawSyncTreeErrors().filter(t=>t.fieldTree===this.node.fieldTree),{equal:oe});rawAsyncErrors=Tb(()=>this.shouldSkipValidation()?[]:[...this.node.logicNode.logic.asyncErrors.compute(this.node.context),...this.node.structure.parent?.validationState.rawAsyncErrors()??[]],{equal:oe});asyncErrors=Tb(()=>this.shouldSkipValidation()?[]:this.rawAsyncErrors().filter(t=>t===`pending`||t.fieldTree===this.node.fieldTree),{equal:oe});parseErrors=Tb(()=>this.node.formFieldBindings().flatMap(t=>t.parseErrors()),{equal:oe});errors=Tb(()=>[...this.parseErrors(),...this.syncErrors(),...this.asyncErrors().filter(t=>t!==`pending`)],{equal:oe});errorSummary=Tb(()=>{let t=this.node.structure.reduceChildren(this.errors(),(e,i)=>[...i,...e.errorSummary()]);return vr(()=>t.sort(wa)),t},{equal:oe});pending=Tb(()=>this.node.structure.reduceChildren(this.asyncErrors().includes(`pending`),(t,e)=>e||t.validationState.pending()));status=Tb(()=>{if(this.shouldSkipValidation())return`valid`;let t=Sa(this);return this.node.structure.reduceChildren(t,(e,i)=>i===`invalid`||e.validationState.status()===`invalid`?`invalid`:i===`unknown`||e.validationState.status()===`unknown`?`unknown`:`valid`,e=>e===`invalid`)});valid=Tb(()=>this.status()===`valid`);invalid=Tb(()=>this.status()===`invalid`);shouldSkipValidation=Tb(()=>this.node.hidden()||this.node.disabled()||this.node.readonly()||this.node.structure.isOrphaned())};function Ca(n){return n===void 0?[]:Se(n)?n:[n]}function Xr(n,t){if(Se(n))for(let e of n)e.fieldTree??=t;else n&&(n.fieldTree??=t);return n}function Ir(n){return n.formField?n.formField.element:n.fieldTree().formFieldBindings().reduce((t,e)=>!t||!e.element?t??e.element:t.compareDocumentPosition(e.element)&Node.DOCUMENT_POSITION_PRECEDING?e.element:t,void 0)}function wa(n,t){let e=Ir(n),i=Ir(t);return e===i?0:e===void 0||i===void 0?e===void 0?1:-1:e.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_PRECEDING?1:-1}var an=De();var ln=class{node;cache=new WeakMap;constructor(t){this.node=t,this.fieldTreeOf=this.fieldTreeOf.bind(this),this.stateOf=this.stateOf.bind(this)}resolve(t){if(!this.cache.has(t)){let e=Tb(()=>{let i=de.unwrapFieldPath(t),r=this.node,o=ga();for(;o>0||!r.structure.logic.hasLogic(i.root.builder);)if(o--,r=r.structure.parent,r===void 0)throw new E(1900,!1);for(let a of i.keys)if(r=r.structure.getChild(a),r===void 0)throw new E(1901,!1);return r.fieldTree});this.cache.set(t,e)}return this.cache.get(t)()}get fieldTree(){return this.node.fieldProxy}get state(){return this.node}get value(){return this.node.structure.value}get key(){return this.node.structure.keyInParent}get pathKeys(){return this.node.structure.pathKeys}index=Tb(()=>{let t=this.key();if(!Se(vr(this.node.structure.parent.value)))throw new E(1906,!1);return Number(t)});fieldTreeOf(t){return this.resolve(t)}stateOf(t){return this.resolve(t)()}valueOf=t=>{let e=this.resolve(t)().value();if(e instanceof G$1)throw new E(1907,!1);return e}};var sn=class{node;metadata=new Map;constructor(t){this.node=t}runMetadataCreateLifecycle(){if(!this.node.logicNode.logic.hasMetadataKeys())return;let t=Nb();t&&Ab(!1);try{vr(()=>Zn(this.node.structure.injector,()=>{for(let e of this.node.logicNode.logic.getMetadataKeys())if(e.create){let i=this.node.logicNode.logic.getMetadata(e),r=e.create(this.node,Tb(()=>i.compute(this.node.context)));this.metadata.set(e,r)}}))}finally{t&&Ab(!0)}}get(t){if(this.has(t)&&!this.metadata.has(t)){if(t.create)throw new E(1912,!1);let e=this.node.logicNode.logic.getMetadata(t);this.metadata.set(t,Tb(()=>e.compute(this.node.context)))}return this.metadata.get(t)}has(t){return this.node.logicNode.logic.hasMetadata(t)}};var ka={get(n,t,e){if(t===pn)return!0;let i=n(),r=i.structure.getChild(t);if(r!==void 0)return r.fieldTree;let o=vr(i.value);if(Se(o)){if(t===`length`)return i.value().length;if(t===Symbol.iterator)return()=>(i.value(),Array.prototype[Symbol.iterator].apply(i.fieldTree))}if(Qt(o)&&t===Symbol.iterator)return function*(){for(let a in e)yield[a,e[a]]}},getOwnPropertyDescriptor(n,t){let e=vr(n().value),i=Reflect.getOwnPropertyDescriptor(e,t);return i&&!i.configurable&&(i.configurable=!0),i},ownKeys(n){let t=vr(n().value);return typeof t==`object`&&t!==null?Reflect.ownKeys(t):[]}};function Ma(n,t){let e=Tb(()=>n()[t()]);return e[$]=n[$],e.set=i=>{Object.is(vr(e),i)||n.update(r=>Ea(r,i,t()))},e.update=i=>{e.set(i(vr(e)))},e.asReadonly=()=>e,e}function Ea(n,t,e){if(Se(n)){let i=[...n];return i[e]=t,i}else return l(k({},n),{[e]:t})}var Ye=Symbol(``);var Ur=Tb(()=>!1);var ni=class{logic;node;createChildNode;identitySymbol=Symbol();_injector=void 0;_anyChildHasLogic;get injector(){return this._injector??=X.create({providers:[],parent:this.fieldManager.injector}),this._injector}constructor(t,e,i){this.logic=t,this.node=e,this.createChildNode=i}children(){this.ensureChildrenMap();let t=this.childrenMap();return t===void 0?[]:Array.from(t.byPropertyKey.values()).map(e=>vr(e.reader))}materializedChildren(){let t=this.childrenMap();return t===void 0?[]:Array.from(t.byPropertyKey.values()).map(e=>e.node)}_areChildrenMaterialized(){return vr(this.childrenMap)!==void 0}ensureChildrenMap(){this._areChildrenMaterialized()||vr(()=>{this.childrenMap.update(t=>this.computeChildrenMap(this.value(),t,!0))})}getChild(t){this.ensureChildrenMap();let e=t.toString(),i=vr(this.childrenMap)?.byPropertyKey.get(e)?.reader;return i||(i=this.createReader(e)),i()}reduceChildren(t,e,i){let r=this.childrenMap();if(!r)return t;let o=t;for(let a of r.byPropertyKey.values()){if(i?.(o))break;o=e(vr(a.reader),o)}return o}destroy(){this.injector.destroy()}createKeyOrOrphanSignals(t,e,i){if(t===`root`)return{keyInParent:Kr,isOrphaned:Ur};let r=this.parent,o=i,a=Tb(()=>{if(r.structure.isOrphaned())return Ye;let u=r.structure.childrenMap();if(!u)return Ye;let p=u.byPropertyKey.get(o);if(p&&p.node===this.node)return o;if(e===void 0)return Ye;for(let[b,M]of u.byPropertyKey)if(M.node===this.node)return o=b;return Ye}),l=Tb(()=>a()===Ye);return{keyInParent:Tb(()=>{let u=a();if(u===Ye)throw e===void 0?new E(-1902,!1):new E(1904,!1);return u}),isOrphaned:l}}createChildrenMap(){return Mb({source:this.value,computation:(t,e)=>this.computeChildrenMap(t,e?.value,!1)})}computeChildrenMap(t,e,i){if(!Qt(t)||!i&&e===void 0&&!(this._anyChildHasLogic??=this.logic.anyChildHasLogic()))return;e??={byPropertyKey:new Map};let r,o=Se(t);e!==void 0&&(o?r=Ra(e,t,this.identitySymbol):r=Oa(e,t));for(let a of Object.keys(t)){let l,d=t[a];if(d===void 0){e.byPropertyKey.has(a)&&(r??=k({},e),r.byPropertyKey.delete(a));continue}o&&Qt(d)&&!Se(d)&&(l=d[this.identitySymbol]??=Symbol(``));let u;l&&(e.byTrackingKey?.has(l)||(r??=k({},e),r.byTrackingKey??=new Map,r.byTrackingKey.set(l,this.createChildNode(a,l,o))),u=(r??e).byTrackingKey.get(l));let p=e.byPropertyKey.get(a);p===void 0?(r??=k({},e),r.byPropertyKey.set(a,{reader:this.createReader(a),node:u??this.createChildNode(a,l,o)})):u&&u!==p.node&&(r??=k({},e),p.node=u)}return r??e}createReader(t){return Tb(()=>this.childrenMap()?.byPropertyKey.get(t)?.node)}};var dn=class extends ni{fieldManager;value;get parent(){}get root(){return this.node}get pathKeys(){return Da}get keyInParent(){return Kr}isOrphaned=Ur;childrenMap;constructor(t,e,i,r,o){super(e,t,o),this.fieldManager=i,this.value=r,this.childrenMap=this.createChildrenMap()}};var cn=class extends ni{logic;parent;root;pathKeys;keyInParent;value;childrenMap;isOrphaned;get fieldManager(){return this.root.structure.fieldManager}constructor(t,e,i,r,o,a){super(e,t,a),this.logic=e,this.parent=i,this.root=this.parent.structure.root;let l=this.createKeyOrOrphanSignals(`child`,r,o);this.isOrphaned=l.isOrphaned,this.keyInParent=l.keyInParent,this.pathKeys=Tb(()=>[...i.structure.pathKeys(),this.keyInParent()]),this.value=Ma(this.parent.structure.value,this.keyInParent),this.childrenMap=this.createChildrenMap(),this.fieldManager.structures.add(this)}};var Da=Tb(()=>[]);var Kr=Tb(()=>{throw new E(1905,!1)});function Ra(n,t,e){let i,r=new Set(n.byPropertyKey.keys()),o=n.byTrackingKey&&new Set(n.byTrackingKey.keys());for(let a=0;a<t.length;a++){let l=t[a];r.delete(a.toString()),o&&Qt(l)&&Object.hasOwn(l,e)&&o.delete(l[e])}if(r.size>0){i??=k({},n);for(let a of r)i.byPropertyKey.delete(a)}if(o&&o.size>0){i??=k({},n);for(let a of o)i.byTrackingKey.delete(a)}return i}function Oa(n,t){let e;for(let i of n.byPropertyKey.keys())Object.hasOwn(t,i)||(e??=k({},n),e.byPropertyKey.delete(i));return e}var mn=class{node;selfSubmitting=tr(!1);submissionErrors;constructor(t){this.node=t,this.submissionErrors=Mb({source:this.node.structure.value,computation:()=>[]})}submitting=Tb(()=>this.selfSubmitting()||(this.node.structure.parent?.submitting()??!1))};var Ct=class{structure;validationState;metadataState;nodeState;submitState;fieldAdapter;controlValue;_context=void 0;get context(){return this._context??=new ln(this)}fieldProxy=new Proxy(()=>this,ka);pathNode;constructor(t){this.pathNode=t.pathNode,this.fieldAdapter=t.fieldAdapter,this.structure=this.fieldAdapter.createStructure(this,t),this.validationState=this.fieldAdapter.createValidationState(this,t),this.nodeState=this.fieldAdapter.createNodeState(this,t),this.metadataState=new sn(this),this.submitState=new mn(this),this.controlValue=this.controlValueSignal(),this.metadataState.runMetadataCreateLifecycle()}focusBoundControl(t){this.getBindingForFocus()?.focus(t)}getBindingForFocus(){return this.formFieldBindings().filter(e=>e.focus!==void 0).reduce(Lr,void 0)||this.structure.children().map(e=>e.getBindingForFocus()).reduce(Lr,void 0)}pendingSync=Mb({source:()=>this.value(),computation:(t,e)=>{e?.value?.abort()}});get fieldTree(){return this.fieldProxy}get logicNode(){return this.structure.logic}get value(){return this.structure.value}get keyInParent(){return this.structure.keyInParent}get errors(){return this.validationState.errors}get parseErrors(){return this.validationState.parseErrors}get errorSummary(){return this.validationState.errorSummary}get pending(){return this.validationState.pending}get valid(){return this.validationState.valid}get invalid(){return this.validationState.invalid}get dirty(){return this.nodeState.dirty}get touched(){return this.nodeState.touched}get disabled(){return this.nodeState.disabled}get disabledReasons(){return this.nodeState.disabledReasons}get hidden(){return this.nodeState.hidden}get readonly(){return this.nodeState.readonly}get formFieldBindings(){return this.nodeState.formFieldBindings}get submitting(){return this.submitState.submitting}get name(){return this.nodeState.name}get max(){let t=this.metadata(jr)?.();return t?this.metadata(t):void 0}get maxLength(){return this.metadata(Yr)}get min(){let t=this.metadata(Hr)?.();return t?this.metadata(t):void 0}get minLength(){return this.metadata(Wr)}get pattern(){return this.metadata(qr)??Na}get required(){return this.metadata(Br)??Fa}metadata(t){return this.metadataState.get(t)}getError(t){return this.errors().find(e=>e.kind===t)}hasMetadata(t){return this.metadataState.has(t)}markAsTouched(t){this.structure.isOrphaned()||vr(()=>{this.markAsTouchedInternal(t),this.flushSync()})}markAsTouchedInternal(t){if(!this.structure.isOrphaned()&&!this.validationState.shouldSkipValidation()&&(this.nodeState.markAsTouched(),!t?.skipDescendants))for(let e of this.structure.children())e.markAsTouchedInternal()}markAsDirty(){this.nodeState.markAsDirty()}markAsPristine(){this.nodeState.markAsPristine()}markAsUntouched(){this.nodeState.markAsUntouched()}reset(t){vr(()=>this._reset(t))}_reset(t){this.pendingSync()?.abort(),t!==void 0&&this.value.set(t),this.controlValue.rawSet(this.value()),this.nodeState.markAsUntouched(),this.nodeState.markAsPristine();for(let e of this.formFieldBindings())e.reset();for(let e of this.structure.materializedChildren())e._reset()}reloadValidation(){vr(()=>this._reloadValidation())}_reloadValidation(){let t=this.logicNode.logic.getMetadataKeys();for(let e of t)e[gn]&&this.metadata(e).reload?.();for(let e of this.structure.children())e._reloadValidation()}controlValueSignal(){let t=Mb(this.value);t.rawSet=t.set,t.set=i=>{t.rawSet(i),this.markAsDirty(),this.debounceSync()};let e=t.update;return t.update=i=>{e(i),this.markAsDirty(),this.debounceSync()},t}sync(){this.value.set(this.controlValue())}flushSync(){let t=this.pendingSync();t&&!t.signal.aborted&&(t.abort(),this.sync())}async debounceSync(){let t=vr(()=>(this.pendingSync()?.abort(),this.nodeState.debouncer()));if(t){let e=new AbortController,i=t(e.signal);if(i&&(this.pendingSync.set(e),await i,e.signal.aborted))return}this.structure.isOrphaned()||this.sync()}static newRoot(t,e,i,r){return r.newRoot(t,e,i,r)}createStructure(t){return t.kind===`root`?new dn(this,t.logic,t.fieldManager,t.value,this.newChild.bind(this)):new cn(this,t.logic,t.parent,t.identityInParent,t.initialKeyInParent,this.newChild.bind(this))}newChild(t,e,i){let r,o;return i?(r=this.pathNode.getChild(xe),o=this.structure.logic.getChild(xe)):(r=this.pathNode.getChild(t),o=this.structure.logic.getChild(t)),this.fieldAdapter.newChild({kind:`child`,parent:this,pathNode:r,logic:o,initialKeyInParent:t,identityInParent:e,fieldAdapter:this.fieldAdapter})}};var Na=Tb(()=>[]);var Fa=Tb(()=>!1);function Lr(n,t){return n?t&&n.element.compareDocumentPosition(t.element)&Node.DOCUMENT_POSITION_PRECEDING?t:n:t}var fn=class{node;selfTouched=tr(!1);selfDirty=tr(!1);markAsTouched(){this.selfTouched.set(!0)}markAsDirty(){this.selfDirty.set(!0)}markAsPristine(){this.selfDirty.set(!1)}markAsUntouched(){this.selfTouched.set(!1)}formFieldBindings=tr([]);constructor(t){this.node=t}dirty=Tb(()=>{let t=this.selfDirty()&&!this.isNonInteractive();return this.node.structure.reduceChildren(t,(e,i)=>i||e.nodeState.dirty(),Tr)});touched=Tb(()=>{let t=this.selfTouched()&&!this.isNonInteractive();return this.node.structure.reduceChildren(t,(e,i)=>i||e.nodeState.touched(),Tr)});disabledReasons=Tb(()=>[...this.node.structure.parent?.nodeState.disabledReasons()??[],...this.node.logicNode.logic.disabledReasons.compute(this.node.context)],{equal:oe});disabled=Tb(()=>!!this.disabledReasons().length);readonly=Tb(()=>(this.node.structure.parent?.nodeState.readonly()||this.node.logicNode.logic.readonly.compute(this.node.context))??!1);hidden=Tb(()=>(this.node.structure.parent?.nodeState.hidden()||this.node.logicNode.logic.hidden.compute(this.node.context))??!1);name=Tb(()=>{let t=this.node.structure.parent;return t?`${t.name()}.${this.node.structure.keyInParent()}`:this.node.structure.fieldManager.rootName});debouncer=Tb(()=>{if(this.node.logicNode.logic.hasMetadata(an)){let e=this.node.logicNode.logic.getMetadata(an).compute(this.node.context);if(e)return i=>e(this.node.context,i)}return this.node.structure.parent?.nodeState.debouncer?.()});isNonInteractive=Tb(()=>this.hidden()||this.disabled()||this.readonly())};var un=class{newRoot(t,e,i,r){return new Ct({kind:`root`,fieldManager:t,value:e,pathNode:i,logic:i.builder.build(),fieldAdapter:r})}newChild(t){return new Ct(t)}createNodeState(t){return new fn(t)}createValidationState(t){return new on(t)}createStructure(t,e){return t.createStructure(e)}};var hn=class{injector;rootName;submitOptions;constructor(t,e,i){this.injector=t,this.rootName=e??`${this.injector.get(mn$1)}.form${Pa++}`,this.submitOptions=i}structures=new Set;createFieldManagementEffect(t){Sf(()=>{let e=new Set;this.markStructuresLive(t,e);for(let i of this.structures)e.has(i)||(this.structures.delete(i),vr(()=>i.destroy()))},{injector:this.injector})}markStructuresLive(t,e){e.add(t);for(let i of t.children())this.markStructuresLive(i.structure,e)}};var Pa=0;var Gr=new y(``);function Ta(n){let t,e,i;return n.length===3?[t,e,i]=n:n.length===2?ya(n[1])?[t,e]=n:[t,i]=n:[t]=n,[t,e,i]}function vn(...n){let[t,e,i]=Ta(n),r=i?.injector??h(X),o=Zn(r,()=>St.rootCompile(e)),a=new hn(r,i?.name,i?.submission),l=i?.adapter??new un,d=Ct.newRoot(a,t,o,l);a.createFieldManagementEffect(d.structure);let{experimentalWebMcpTool:u}=i??{};if(u){let p=Zn(r,()=>h(Gr,{optional:!0}));p&&Zn(r,()=>p(d.fieldTree,{name:u.name,description:u.description,annotations:u.annotations}))}return d.fieldTree}function bn(n,t){ai(n);let e=de.unwrapFieldPath(n).getChild(xe).fieldPathProxy;$r(e,t)}function $r(n,t){ai(n),de.unwrapFieldPath(n).mergeIn(St.create(t))}var ri=class{kind=`compat`;control;fieldTree;context;message;constructor({context:t,kind:e,control:i}){this.context=t,this.kind=e,this.control=i}};function Zr(n){if(n.length===0)return null;let t={};for(let e of n)t[e.kind]=e instanceof ri?e.context:e;return t}function Qr(n,t){return n===null?[]:Object.entries(n).map(([e,i])=>new ri({context:i,kind:e,control:t}))}function wt(n){return typeof n==`function`&&n[pn]===!0}var Aa=new y(``);function Jr(n){return n===void 0?[]:Array.isArray(n)?n:[n]}function di(n,t){ai(n),de.unwrapFieldPath(n).builder.addSyncErrorRule(i=>Xr(t(i),i.fieldTree))}var yn=class{__brand=void 0;kind=``;fieldTree;message;constructor(t){t&&Object.assign(this,t)}};var li=class extends yn{kind=`parse`};function Ia(n,t,e){let i=Mb({source:n,computation:()=>[],equal:oe}),r=a=>{let l=e(a);i.set(Jr(l.error)),l.value!==void 0&&t(l.value),i.set(Jr(l.error))},o=()=>{i.set([])};return{errors:i.asReadonly(),setRawValue:r,reset:o}}var xn=class{field;constructor(t){this.field=t}control=this;get value(){return this.field().controlValue()}get valid(){return this.field().valid()}get invalid(){return this.field().invalid()}get pending(){return this.field().pending()}get disabled(){return this.field().disabled()}get enabled(){return!this.field().disabled()}get errors(){return Zr(this.field().errors())}get pristine(){return!this.field().dirty()}get dirty(){return this.field().dirty()}get touched(){return this.field().touched()}get untouched(){return!this.field().touched()}get status(){if(this.field().disabled())return`DISABLED`;if(this.field().valid())return`VALID`;if(this.field().invalid())return`INVALID`;if(this.field().pending())return`PENDING`;throw new E(1910,!1)}valueAccessor=null;hasValidator(t){return t===Y.required?this.field().required():!1}updateValueAndValidity(){}};var Sn={disabled:`disabled`,disabledReasons:`disabledReasons`,dirty:`dirty`,errors:`errors`,hidden:`hidden`,invalid:`invalid`,max:`max`,maxLength:`maxLength`,min:`min`,minLength:`minLength`,name:`name`,pattern:`pattern`,pending:`pending`,readonly:`readonly`,required:`required`,touched:`touched`};var La=(()=>{let n={};for(let t of Object.keys(Sn))n[Sn[t]]=t;return n})();function Cn(n,t){return n[La[t]]?.()}var wn=Object.values(Sn);function ci(){return{}}function Ce(n,t,e){return Object.is(n[t],e)?!1:(n[t]=e,!0)}function za(n,t,e){let i;if(io(n)&&e.isBadInput(n))return{error:new li};switch(n.type){case`checkbox`:return{value:n.checked};case`number`:case`range`:case`datetime-local`:if(i=vr(t),typeof i==`number`||i===null)return{value:n.value===``?null:n.valueAsNumber};break;case`date`:case`month`:case`time`:case`week`:if(i=vr(t),i===null||i instanceof Date)return{value:n.valueAsDate};if(typeof i==`number`)return{value:n.valueAsNumber}}if(n.tagName===`INPUT`&&n.type===`text`&&(i??=vr(t),typeof i==`number`||i===null)){if(n.value===``)return{value:null};let r=Number(n.value);return Number.isNaN(r)?{error:new li}:{value:r}}return{value:n.value}}function eo(n,t){switch(n.type){case`checkbox`:n.checked=t;return;case`radio`:n.checked=t===n.value;return;case`number`:case`range`:case`datetime-local`:if(typeof t==`number`){to(n,t);return}else if(t===null){n.value=``;return}break;case`date`:case`month`:case`time`:case`week`:if(t===null||t instanceof Date){n.valueAsDate=t;return}else if(typeof t==`number`){to(n,t);return}}if(n.tagName===`INPUT`&&n.type===`text`){if(typeof t==`number`){n.value=isNaN(t)?``:String(t);return}if(t===null){n.value=``;return}}n.value=t}function to(n,t){isNaN(t)?n.value=``:n.valueAsNumber=t}function io(n){return n.tagName===`INPUT`}function Va(n){return n.type===`date`||n.type===`datetime-local`||n.type===`month`||n.type===`time`||n.type===`week`}function Ba(n,t){let e=n.getUTCFullYear(),i=String(n.getUTCMonth()+1).padStart(2,`0`);if(t===`month`)return`${e}-${i}`;return`${e}-${i}-${String(n.getUTCDate()).padStart(2,`0`)}`}function no(n,t,e){return t instanceof Date&&(n===`min`||n===`max`)&&(e===`date`||e===`month`)?Ba(t,e):t}function Ha(n,t){n.listenToCustomControlModel(i=>t.state().controlValue.set(i)),n.listenToCustomControlOutput(`touch`,()=>t.state().markAsTouched()),t.registerAsBinding(n.customControl);let e=ci();return()=>{let i=t.state(),r=i.controlValue();Ce(e,`controlValue`,r)&&n.setCustomControlModelInput(r);for(let o of wn){let a;if(o===`errors`?a=t.errors():a=Cn(i,o),Ce(e,o,a)&&(n.setInputOnDirectives(o,a),t.elementAcceptsNativeProperty(o)&&!n.customControlHasInput(o))){let l=no(o,a,t.nativeFormElement.type);ot(t.renderer,t.nativeFormElement,o,l)}}}}function ja(n){return typeof n==`object`&&n!==null}function Wa(n,t){let e=ci();t.controlValueAccessor.registerOnChange(r=>{e.controlValue=r,t.state().controlValue.set(r)}),t.controlValueAccessor.registerOnTouched(()=>t.state().markAsTouched());let i=t.injector.get(J,null,{optional:!0,self:!0});if(i){let r;for(let d of i)ja(d)&&d.registerOnValidatorChange&&(r??=tr(0),d.registerOnValidatorChange(()=>{r.update(u=>u+1)}));let o=i.map(d=>typeof d==`function`?d:d.validate.bind(d)),a=Y.compose(o),l=Tb(()=>{r?.();return Qr(a?a(t.interopNgControl.control):null,t.interopNgControl.control)});t.parseErrorsSource.set(l)}return t.registerAsBinding({reset:()=>{let r=t.state().value();e.controlValue=r,vr(()=>t.controlValueAccessor.writeValue(r))}}),()=>{let r=t.state(),o=r.controlValue();Ce(e,`controlValue`,o)&&vr(()=>t.controlValueAccessor.writeValue(o));for(let a of wn){let l=Cn(r,a);if(Ce(e,a,l)){let d=n.setInputOnDirectives(a,l,a===`name`?Ya:void 0);a===`disabled`&&t.controlValueAccessor.setDisabledState?vr(()=>t.controlValueAccessor.setDisabledState(l)):!d&&t.elementAcceptsNativeProperty(a)&&ot(t.renderer,t.nativeFormElement,a,l)}}}}function Ya(n){return n==null}function qa(n,t,e){if(typeof MutationObserver!=`function`)return;let i=new MutationObserver(r=>{r.some(o=>Xa(o))&&t()});i.observe(n,{attributes:!0,attributeFilter:[`value`],characterData:!0,childList:!0,subtree:!0}),e.onDestroy(()=>i.disconnect())}function Xa(n){if(n.type===`childList`||n.type===`characterData`){if(n.target instanceof Comment)return!1;for(let t of n.addedNodes)if(!(t instanceof Comment))return!0;for(let t of n.removedNodes)if(!(t instanceof Comment))return!0;return!1}return n.type===`attributes`&&n.target instanceof HTMLOptionElement}function Ua(n,t,e,i){let r=!1,o=t.nativeFormElement,a=Ia(()=>t.state().value(),d=>t.state().controlValue.set(d),d=>za(o,t.state().value,i));e.set(a.errors),t.onReset=()=>{a.reset();let d=t.state().value();l.controlValue=d,eo(o,d)},n.listenToDom(`input`,()=>a.setRawValue(void 0)),n.listenToDom(`blur`,()=>t.state().markAsTouched()),io(o)&&Va(o)&&i.watchValidity(t.destroyRef,o,()=>a.setRawValue(void 0)),t.registerAsBinding(),o.tagName===`SELECT`&&qa(o,()=>{r&&(o.value=t.state().controlValue())},t.destroyRef);let l=ci();return()=>{let d=t.state();for(let M of wn){let I=Cn(d,M);if(Ce(l,M,I)&&(n.setInputOnDirectives(M,I),t.elementAcceptsNativeProperty(M))){let V=no(M,I,o.type);ot(t.renderer,o,M,V)}}let u=d.controlValue(),p=Ce(l,`controlValue`,u),b=o.type===`radio`&&Ce(l,`radioValue`,o.value);(p||b)&&eo(o,u),r=!0}}var ro=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵprov=O({token:n,factory:e=>Ka.ɵfac(e),providedIn:`root`})}return n})();var Ka=(()=>{class n extends ro{document=h(k$1);cspNonce=h(vn$1,{optional:!0});injectedStyles=new WeakMap;watchValidity(e,i,r){let o=i.getRootNode();this.injectedStyles.has(o)||this.injectedStyles.set(o,this.createTransitionStyle(o));let a=l=>{let d=l;(d.animationName===`ng-valid`||d.animationName===`ng-invalid`)&&r()};i.addEventListener(`animationstart`,a),e.onDestroy(()=>{i.removeEventListener(`animationstart`,a)})}isBadInput(e){return e.validity?.badInput??!1}createTransitionStyle(e){let i=this.document.createElement(`style`);return this.cspNonce&&(i.nonce=this.cspNonce),i.textContent=`
      @keyframes ng-valid {}
      @keyframes ng-invalid {}
      input:valid, textarea:valid {
        animation: ng-valid 0.001s;
      }
      input:invalid, textarea:invalid {
        animation: ng-invalid 0.001s;
      }
    `,e.nodeType===9?e.head?.appendChild(i):e.appendChild(i),i}ngOnDestroy(){this.injectedStyles.get(this.document)?.remove()}static ɵfac=(()=>{let e;return function(r){return(e||(e=Op(n)))(r||n)}})();static ɵprov=O({token:n,factory:n.ɵfac})}return n})();var Ga=Symbol();var si=new y(``);var mi=(()=>{class n{field=Sj.required({alias:`formField`});state=Tb(()=>this.field()());renderer=h(as);destroyRef=h(pe);injector=h(X);element=h(he).nativeElement;elementIsNativeFormElement=it$1(this.element);elementAcceptsTextualValues=Xt(this.element);_elementAcceptsMinMax;nativeFormElement=this.elementIsNativeFormElement?this.element:void 0;focuser=e=>this.element.focus(e);controlValueAccessors=h(Be,{optional:!0,self:!0});config=h(Aa,{optional:!0});validityMonitor=h(ro);parseErrorsSource=tr(void 0);_interopNgControl;get interopNgControl(){return this._interopNgControl??=new xn(this.state)}parseErrors=Tb(()=>this.parseErrorsSource()?.().map(e=>l(k({},e),{fieldTree:vr(this.state).fieldTree,formField:this}))??[],{equal:oe});errors=Tb(()=>this.state().errors().filter(e=>!e.formField||e.formField===this),{equal:oe});isFieldBinding=!1;resetter=()=>{};parseErrorsResetCallback;setParseErrors(e){this.parseErrorsSource.set(e)}set onReset(e){this.parseErrorsResetCallback=e}get onReset(){return this.parseErrorsResetCallback}get controlValueAccessor(){return!this.controlValueAccessors||this.controlValueAccessors.length===0?this.interopNgControl?.valueAccessor??void 0:ct(this.interopNgControl,this.controlValueAccessors)??void 0}installClassBindingEffect(){let e=Object.entries(this.config?.classes??{}).map(([r,o])=>[r,Tb(()=>o(this))]);if(e.length===0)return;let i=ci();Rj({write:()=>{if(!this.state().structure.isOrphaned())for(let[r,o]of e){let a=o();Ce(i,r,a)&&(a?this.renderer.addClass(this.element,r):this.renderer.removeClass(this.element,r))}}},{injector:this.injector})}focus(e){this.focuser(e)}reset(){this.resetter(),this.parseErrorsResetCallback?.(this.state().value())}registerAsBinding(e){if(this.isFieldBinding)throw new E(1913,!1);this.isFieldBinding=!0,this.installClassBindingEffect(),e?.focus&&(this.focuser=i=>e.focus(i)),e?.reset&&(this.resetter=()=>e.reset()),Sf(i=>{let r=this.state();r.nodeState.formFieldBindings.update(o=>[...o,this]),i(()=>{let o=r.nodeState.formFieldBindings().filter(a=>a!==this);r.nodeState.formFieldBindings.set(o),o.length===0&&!r.structure.isOrphaned()&&r.flushSync()})},{injector:this.injector})}[Ga];ɵngControlCreate(e){if(!e.hasPassThrough)if(this.controlValueAccessor)this.ɵngControlUpdate=Wa(e,this);else if(e.customControl)this.ɵngControlUpdate=Ha(e,this);else if(this.elementIsNativeFormElement)this.ɵngControlUpdate=Ua(e,this,this.parseErrorsSource,this.validityMonitor);else throw new E(1914,!1)}ɵngControlUpdate;elementAcceptsNativeProperty(e){if(!this.elementIsNativeFormElement)return!1;switch(e){case`min`:case`max`:return this._elementAcceptsMinMax??=Yt(this.element);case`minLength`:case`maxLength`:return this.elementAcceptsTextualValues;case`disabled`:case`required`:case`readonly`:case`name`:return!0;default:return!1}}static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[``,`formField`,``]],inputs:{field:[1,`formField`,`field`]},exportAs:[`formField`],features:[Hg([{provide:si,useExisting:n},{provide:me$1,useFactory:()=>h(n).interopNgControl},{provide:Zt$1,useFactory:()=>h(si,{self:!0})}]),f_(`formField`)]})}return n})();var kn=class{_box;_destroyed=new z;_resizeSubject=new z;_resizeObserver;_elementObservables=new Map;constructor(t){this._box=t,typeof ResizeObserver<`u`&&(this._resizeObserver=new ResizeObserver(e=>this._resizeSubject.next(e)))}observe(t){return this._elementObservables.has(t)||this._elementObservables.set(t,new M(e=>{let i=this._resizeSubject.subscribe(e);return this._resizeObserver?.observe(t,{box:this._box}),()=>{this._resizeObserver?.unobserve(t),i.unsubscribe(),this._elementObservables.delete(t)}}).pipe(wt$1(e=>e.some(i=>i.target===t)),Wy({bufferSize:1,refCount:!0}),Pr(this._destroyed))),this._elementObservables.get(t)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}};var oo=(()=>{class n{_cleanupErrorListener;_observers=new Map;_ngZone=h(H);constructor(){}ngOnDestroy(){for(let[,e]of this._observers)e.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(e,i){let r=i?.box||`content-box`;return this._observers.has(r)||this._observers.set(r,new kn(r)),this._observers.get(r).observe(e)}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var Re=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[`mat-label`]]})}return n})();var uo=new y(`MatError`);var Mt=(()=>{class n{id=h(Ol$1).getId(`mat-mdc-error-`);static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[`mat-error`],[``,`matError`,``]],hostAttrs:[1,`mat-mdc-form-field-error`,`mat-mdc-form-field-bottom-align`],hostVars:1,hostBindings:function(i,r){i&2&&Ig(`id`,r.id)},inputs:{id:`id`},features:[Hg([{provide:uo,useExisting:n}])]})}return n})();var kt=(()=>{class n{align=`start`;id=h(Ol$1).getId(`mat-mdc-hint-`);static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[`mat-hint`]],hostAttrs:[1,`mat-mdc-form-field-hint`,`mat-mdc-form-field-bottom-align`],hostVars:4,hostBindings:function(i,r){i&2&&(Ig(`id`,r.id),Io$1(`align`,null),yr(`mat-mdc-form-field-hint-end`,r.align===`end`))},inputs:{align:`align`,id:`id`}})}return n})();var Za=new y(`MatPrefix`);var Qa=new y(`MatSuffix`);var ho=new y(`FloatingLabelParent`);var ao=(()=>{class n{_elementRef=h(he);get floating(){return this._floating}set floating(e){this._floating=e,this.monitorResize&&this._handleResize()}_floating=!1;get monitorResize(){return this._monitorResize}set monitorResize(e){this._monitorResize=e,this._monitorResize?this._subscribeToResize():this._resizeSubscription.unsubscribe()}_monitorResize=!1;_resizeObserver=h(oo);_ngZone=h(H);_parent=h(ho);_resizeSubscription=new te;ngOnDestroy(){this._resizeSubscription.unsubscribe()}getWidth(){return Ja(this._elementRef.nativeElement)}get element(){return this._elementRef.nativeElement}_handleResize(){setTimeout(()=>this._parent._handleLabelResized())}_subscribeToResize(){this._resizeSubscription.unsubscribe(),this._ngZone.runOutsideAngular(()=>{this._resizeSubscription=this._resizeObserver.observe(this._elementRef.nativeElement,{box:`border-box`}).subscribe(()=>this._handleResize())})}static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[`label`,`matFormFieldFloatingLabel`,``]],hostAttrs:[1,`mdc-floating-label`,`mat-mdc-floating-label`],hostVars:2,hostBindings:function(i,r){i&2&&yr(`mdc-floating-label--float-above`,r.floating)},inputs:{floating:`floating`,monitorResize:`monitorResize`}})}return n})();function Ja(n){let t=n;if(t.offsetParent!==null)return t.scrollWidth;let e=t.cloneNode(!0);e.style.setProperty(`position`,`absolute`),e.style.setProperty(`transform`,`translate(-9999px, -9999px)`),document.documentElement.appendChild(e);let i=e.scrollWidth;return e.remove(),i}var lo=`mdc-line-ripple--active`;var fi=`mdc-line-ripple--deactivating`;var so=(()=>{class n{_elementRef=h(he);_cleanupTransitionEnd;constructor(){let e=h(H),i=h(as);e.runOutsideAngular(()=>{this._cleanupTransitionEnd=i.listen(this._elementRef.nativeElement,`transitionend`,this._handleTransitionEnd)})}activate(){let e=this._elementRef.nativeElement.classList;e.remove(fi),e.add(lo)}deactivate(){this._elementRef.nativeElement.classList.add(fi)}_handleTransitionEnd=e=>{let i=this._elementRef.nativeElement.classList,r=i.contains(fi);e.propertyName===`opacity`&&r&&i.remove(lo,fi)};ngOnDestroy(){this._cleanupTransitionEnd()}static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[`div`,`matFormFieldLineRipple`,``]],hostAttrs:[1,`mdc-line-ripple`]})}return n})();var co=(()=>{class n{_elementRef=h(he);_ngZone=h(H);open=!1;_notch;ngAfterViewInit(){let e=this._elementRef.nativeElement,i=e.querySelector(`.mdc-floating-label`);i?(e.classList.add(`mdc-notched-outline--upgraded`),typeof requestAnimationFrame==`function`&&(i.style.transitionDuration=`0s`,this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>i.style.transitionDuration=``)}))):e.classList.add(`mdc-notched-outline--no-label`)}_setNotchWidth(e){let i=this._notch.nativeElement;!this.open||!e?i.style.width=``:i.style.width=`calc(${e}px * var(--mat-mdc-form-field-floating-label-scale, 0.75) + 9px)`}_setMaxWidth(e){this._notch.nativeElement.style.setProperty(`--mat-form-field-notch-max-width`,`calc(100% - ${e}px)`)}static ɵfac=function(i){return new(i||n)};static ɵcmp=(function(){let e=[`notch`];return pt({type:n,selectors:[[`div`,`matFormFieldNotchedOutline`,``]],viewQuery:function(o,a){if(o&1&&Cg(e,5),o&2){let l;z_(l=G_())&&(a._notch=l.first)}},hostAttrs:[1,`mdc-notched-outline`],hostVars:2,hostBindings:function(o,a){o&2&&yr(`mdc-notched-outline--notched`,a.open)},inputs:{open:[0,`matFormFieldNotchedOutlineOpen`,`open`]},ngContentSelectors:[`*`],decls:5,vars:0,consts:[[`notch`,``],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__leading`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__notch`],[1,`mat-mdc-notch-piece`,`mdc-notched-outline__trailing`]],template:function(o,a){o&1&&(el$1(),Dg(0,`div`,1),Xu(1,`div`,2,0),tl$1(3),Ju(),Dg(4,`div`,3))},encapsulation:2})})()}return n})();var Mn=(()=>{class n{id;ngField=null;ngControl=null;focused=!1;empty=!1;shouldLabelFloat=!1;required=!1;disabled=!1;errorState=!1;controlType;autofilled;userAriaDescribedBy;disableAutomaticLabeling;describedByIds;stateChanges=null;value;static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n})}return n})();var En=new y(`MatFormField`);var el=new y(`MAT_FORM_FIELD_DEFAULT_OPTIONS`);var mo=`fill`;var tl=`auto`;var fo=`fixed`;var il=`translateY(-50%)`;var Ge=(()=>{class n{_elementRef=h(he);_changeDetectorRef=h(Qb);_platform=h(He);_idGenerator=h(Ol$1);_ngZone=h(H);_defaults=h(el,{optional:!0});_currentDirection;_unwrapMaybeSignal(e){return Wi(e)?e():e}_textField;_iconPrefixContainer;_textPrefixContainer;_iconSuffixContainer;_textSuffixContainer;_floatingLabel;_notchedOutline;_lineRipple;_iconPrefixContainerSignal=Mj(`iconPrefixContainer`);_textPrefixContainerSignal=Mj(`textPrefixContainer`);_iconSuffixContainerSignal=Mj(`iconSuffixContainer`);_textSuffixContainerSignal=Mj(`textSuffixContainer`);_prefixSuffixContainers=Tb(()=>[this._iconPrefixContainerSignal(),this._textPrefixContainerSignal(),this._iconSuffixContainerSignal(),this._textSuffixContainerSignal()].map(e=>e?.nativeElement).filter(e=>e!==void 0));_formFieldControl;_prefixChildren;_suffixChildren;_errorChildren;_hintChildren;_labelChild=Nj(Re);get hideRequiredMarker(){return this._hideRequiredMarker}set hideRequiredMarker(e){this._hideRequiredMarker=AU(e)}_hideRequiredMarker=!1;color=`primary`;get floatLabel(){return this._floatLabel||this._defaults?.floatLabel||tl}set floatLabel(e){e!==this._floatLabel&&(this._floatLabel=e,this._changeDetectorRef.markForCheck())}_floatLabel;get appearance(){return this._appearanceSignal()}set appearance(e){let i=e||this._defaults?.appearance||mo;this._appearanceSignal.set(i)}_appearanceSignal=tr(mo);get subscriptSizing(){return this._subscriptSizing||this._defaults?.subscriptSizing||fo}set subscriptSizing(e){this._subscriptSizing=e||this._defaults?.subscriptSizing||fo}_subscriptSizing=null;get hintLabel(){return this._hintLabel}set hintLabel(e){this._hintLabel=e,this._processHints()}_hintLabel=``;_hasIconPrefix=!1;_hasTextPrefix=!1;_hasIconSuffix=!1;_hasTextSuffix=!1;_labelId=this._idGenerator.getId(`mat-mdc-form-field-label-`);_hintLabelId=this._idGenerator.getId(`mat-mdc-hint-`);_describedByIds;get _control(){return this._explicitFormFieldControl||this._formFieldControl}set _control(e){this._explicitFormFieldControl=e}_destroyed=new z;_isFocused=null;_explicitFormFieldControl;_previousControl=null;_previousControlValidatorFn=null;_stateChanges;_valueChanges;_describedByChanges;_outlineLabelOffsetResizeObserver=null;_animationsDisabled=ty();constructor(){let e=this._defaults,i=h(jC);e&&(e.appearance&&(this.appearance=e.appearance),this._hideRequiredMarker=!!e?.hideRequiredMarker,e.color&&(this.color=e.color)),Sf(()=>this._currentDirection=i.valueSignal()),this._syncOutlineLabelOffset()}ngAfterViewInit(){this._updateFocusState(),this._animationsDisabled||this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-form-field-animations-enabled`)},300)}),this._changeDetectorRef.detectChanges()}ngAfterContentInit(){this._assertFormFieldControl(),this._initializeSubscript(),this._initializePrefixAndSuffix()}ngAfterContentChecked(){this._assertFormFieldControl(),this._control!==this._previousControl&&(this._initializeControl(this._previousControl),this._control.ngControl&&this._control.ngControl.control&&(this._previousControlValidatorFn=wt(this._control.ngField)?null:this._control.ngControl.control.validator),this._previousControl=this._control,this._changeDetectorRef.markForCheck()),this._control.ngControl&&this._control.ngControl.control&&!wt(this._control.ngField)&&this._control.ngControl.control.validator!==this._previousControlValidatorFn&&this._changeDetectorRef.markForCheck()}ngOnDestroy(){this._outlineLabelOffsetResizeObserver?.disconnect(),this._stateChanges?.unsubscribe(),this._valueChanges?.unsubscribe(),this._describedByChanges?.unsubscribe(),this._destroyed.next(),this._destroyed.complete()}getLabelId=Tb(()=>this._hasFloatingLabel()?this._labelId:null);getConnectedOverlayOrigin(){return this._textField||this._elementRef}_animateAndLockLabel(){this._hasFloatingLabel()&&(this.floatLabel=`always`)}_initializeControl(e){let i=this._control,r=`mat-mdc-form-field-type-`;e&&this._elementRef.nativeElement.classList.remove(r+e.controlType),i.controlType&&this._elementRef.nativeElement.classList.add(r+i.controlType),this._stateChanges?.unsubscribe(),this._stateChanges=i.stateChanges?.subscribe(()=>{this._updateFocusState(),this._changeDetectorRef.markForCheck()}),this._describedByChanges?.unsubscribe(),this._describedByChanges=i.stateChanges?.pipe(_a$1([void 0,void 0]),G(()=>[this._unwrapMaybeSignal(i.errorState),i.userAriaDescribedBy]),Gy(),wt$1(([[o,a],[l,d]])=>o!==l||a!==d)).subscribe(()=>this._syncDescribedByIds()),this._valueChanges?.unsubscribe(),i.ngControl&&i.ngControl.valueChanges&&!wt(i.ngField)&&(this._valueChanges=i.ngControl.valueChanges.pipe(Pr(this._destroyed)).subscribe(()=>this._changeDetectorRef.markForCheck()))}_checkPrefixAndSuffixTypes(){this._hasIconPrefix=!!this._prefixChildren.find(e=>!e._isText),this._hasTextPrefix=!!this._prefixChildren.find(e=>e._isText),this._hasIconSuffix=!!this._suffixChildren.find(e=>!e._isText),this._hasTextSuffix=!!this._suffixChildren.find(e=>e._isText)}_initializePrefixAndSuffix(){this._checkPrefixAndSuffixTypes(),By(this._prefixChildren.changes,this._suffixChildren.changes).subscribe(()=>{this._checkPrefixAndSuffixTypes(),this._changeDetectorRef.markForCheck()})}_initializeSubscript(){this._hintChildren.changes.subscribe(()=>{this._processHints(),this._changeDetectorRef.markForCheck()}),this._errorChildren.changes.subscribe(()=>{this._syncDescribedByIds(),this._changeDetectorRef.markForCheck()}),this._validateHints(),this._syncDescribedByIds()}_assertFormFieldControl(){this._control}_updateFocusState(){let e=this._unwrapMaybeSignal(this._control.focused);e&&!this._isFocused?(this._isFocused=!0,this._lineRipple?.activate()):!e&&(this._isFocused||this._isFocused===null)&&(this._isFocused=!1,this._lineRipple?.deactivate()),this._elementRef.nativeElement.classList.toggle(`mat-focused`,e),this._textField?.nativeElement.classList.toggle(`mdc-text-field--focused`,e)}_syncOutlineLabelOffset(){Rj({earlyRead:()=>{if(this._appearanceSignal()!==`outline`)return this._outlineLabelOffsetResizeObserver?.disconnect(),null;if(globalThis.ResizeObserver){this._outlineLabelOffsetResizeObserver||=new globalThis.ResizeObserver(()=>{this._writeOutlinedLabelStyles(this._getOutlinedLabelOffset())});for(let e of this._prefixSuffixContainers())this._outlineLabelOffsetResizeObserver.observe(e,{box:`border-box`})}return this._getOutlinedLabelOffset()},write:e=>this._writeOutlinedLabelStyles(e())})}_shouldAlwaysFloat(){return this.floatLabel===`always`}_hasOutline(){return this.appearance===`outline`}_forceDisplayInfixLabel(){return!this._platform.isBrowser&&this._prefixChildren.length&&!this._shouldLabelFloat()}_hasFloatingLabel=Tb(()=>!!this._labelChild());_shouldLabelFloat(){return this._hasFloatingLabel()?this._shouldAlwaysFloat()||this._unwrapMaybeSignal(this._control.shouldLabelFloat):!1}_shouldForward(e){let i=this._control?.ngField||this._control?.ngControl;if(!i)return!1;if(wt(i)){let r=i();return e===`valid`?r.valid():e===`dirty`?r.dirty():e===`touched`?r.touched():e===`pending`?r.pending():e===`untouched`?!r.touched():e===`pristine`?!r.dirty():e===`invalid`?!r.valid():!1}else{let r=i;return e===`valid`?r.valid:e===`dirty`?r.dirty:e===`touched`?r.touched:e===`pending`?r.pending:e===`untouched`?r.untouched:e===`pristine`?r.pristine:e===`invalid`?r.invalid:!1}}_getSubscriptMessageType(){return this._errorChildren&&this._errorChildren.length>0&&this._unwrapMaybeSignal(this._control.errorState)?`error`:`hint`}_handleLabelResized(){this._refreshOutlineNotchWidth()}_refreshOutlineNotchWidth(){!this._hasOutline()||!this._floatingLabel||!this._shouldLabelFloat()?this._notchedOutline?._setNotchWidth(0):this._notchedOutline?._setNotchWidth(this._floatingLabel.getWidth())}_processHints(){this._validateHints(),this._syncDescribedByIds()}_validateHints(){this._hintChildren}_syncDescribedByIds(){if(this._control){let e=[];if(this._control.userAriaDescribedBy&&typeof this._control.userAriaDescribedBy==`string`&&e.push(...this._control.userAriaDescribedBy.split(` `)),this._getSubscriptMessageType()===`hint`){let o=this._hintChildren?this._hintChildren.find(l=>l.align===`start`):null,a=this._hintChildren?this._hintChildren.find(l=>l.align===`end`):null;o?e.push(o.id):this._hintLabel&&e.push(this._hintLabelId),a&&e.push(a.id)}else this._errorChildren&&e.push(...this._errorChildren.map(o=>o.id));let i=this._control.describedByIds,r;if(i){let o=this._describedByIds||e;r=e.concat(i.filter(a=>a&&!o.includes(a)))}else r=e;this._control.setDescribedByIds(r),this._describedByIds=e}}_getOutlinedLabelOffset(){if(!this._hasOutline()||!this._floatingLabel)return null;if(!this._iconPrefixContainer&&!this._textPrefixContainer)return[``,null];if(!this._isAttachedToDom())return null;let e=this._iconPrefixContainer?.nativeElement,i=this._textPrefixContainer?.nativeElement,r=this._iconSuffixContainer?.nativeElement,o=this._textSuffixContainer?.nativeElement,a=e?.getBoundingClientRect().width??0,l=i?.getBoundingClientRect().width??0,d=r?.getBoundingClientRect().width??0,u=o?.getBoundingClientRect().width??0;return[`var(--mat-mdc-form-field-label-transform, ${il} translateX(${`calc(${this._currentDirection===`rtl`?`-1`:`1`} * (${`${a+l}px`} + var(--mat-mdc-form-field-label-offset-x, 0px)))`}))`,a+l+d+u]}_writeOutlinedLabelStyles(e){if(e!==null){let[i,r]=e;this._floatingLabel&&(this._floatingLabel.element.style.transform=i),r!==null&&this._notchedOutline?._setMaxWidth(r)}}_isAttachedToDom(){let e=this._elementRef.nativeElement;if(e.getRootNode){let i=e.getRootNode();return i&&i!==e}return document.documentElement.contains(e)}static ɵfac=function(i){return new(i||n)};static ɵcmp=(function(){let e=[`iconPrefixContainer`],i=[`textPrefixContainer`],r=[`iconSuffixContainer`],o=[`textSuffixContainer`],a=[`textField`],l=[`*`,[[`mat-label`]],[[``,`matPrefix`,``],[``,`matIconPrefix`,``]],[[``,`matTextPrefix`,``]],[[``,`matTextSuffix`,``]],[[``,`matSuffix`,``],[``,`matIconSuffix`,``]],[[`mat-error`],[``,`matError`,``]],[[`mat-hint`,3,`align`,`end`]],[[`mat-hint`,`align`,`end`]]],d=[`*`,`mat-label`,`[matPrefix], [matIconPrefix]`,`[matTextPrefix]`,`[matTextSuffix]`,`[matSuffix], [matIconSuffix]`,`mat-error, [matError]`,`mat-hint:not([align='end'])`,`mat-hint[align='end']`];function u(v,C){v&1&&vg(0,`span`,21)}function p(v,C){if(v&1&&(vs(0,`label`,20),tl$1(1,1),M_(2,u,1,0,`span`,21),Qu()),v&2){let c=H_(2);yg(`floating`,c._shouldLabelFloat())(`monitorResize`,c._hasOutline())(`id`,c._labelId),Io$1(`for`,c._control.disableAutomaticLabeling?null:c._control.id),ME(2),A_(!c.hideRequiredMarker&&c._unwrapMaybeSignal(c._control.required)?2:-1)}}function b(v,C){if(v&1&&M_(0,p,3,5,`label`,20),v&2){let c=H_();A_(c._hasFloatingLabel()?0:-1)}}function M(v,C){v&1&&vg(0,`div`,7)}function I(v,C){}function V(v,C){if(v&1&&hg(0,I,0,0,`ng-template`,13),v&2){H_(2);let c=q_(1);yg(`ngTemplateOutlet`,c)}}function Q(v,C){if(v&1&&(vs(0,`div`,9),M_(1,V,1,1,null,13),Qu()),v&2){let c=H_();yg(`matFormFieldNotchedOutlineOpen`,c._shouldLabelFloat()),ME(),A_(c._forceDisplayInfixLabel()?-1:1)}}function Tt(v,C){v&1&&(vs(0,`div`,10,2),tl$1(2,2),Qu())}function aa(v,C){v&1&&(vs(0,`div`,11,3),tl$1(2,3),Qu())}function la(v,C){}function sa(v,C){if(v&1&&hg(0,la,0,0,`ng-template`,13),v&2){H_();let c=q_(1);yg(`ngTemplateOutlet`,c)}}function da(v,C){v&1&&(vs(0,`div`,14,4),tl$1(2,4),Qu())}function ca(v,C){v&1&&(vs(0,`div`,15,5),tl$1(2,5),Qu())}function ma(v,C){v&1&&vg(0,`div`,16)}function fa(v,C){v&1&&(vs(0,`div`,18),tl$1(1,6),Qu())}function ua(v,C){if(v&1&&(vs(0,`mat-hint`,22),hb(1),Qu()),v&2){let c=H_(2);yg(`id`,c._hintLabelId),ME(),Lg(c.hintLabel)}}function ha(v,C){if(v&1&&(vs(0,`div`,19),M_(1,ua,2,2,`mat-hint`,22),tl$1(2,7),vg(3,`div`,23),tl$1(4,8),Qu()),v&2){let c=H_();ME(),A_(c.hintLabel?1:-1)}}return pt({type:n,selectors:[[`mat-form-field`]],contentQueries:function(C,c,w){if(C&1&&(Tg(w,c._labelChild,Re,5),wg(w,Mn,5)(w,Za,5)(w,Qa,5)(w,uo,5)(w,kt,5)),C&2){W_();let K;z_(K=G_())&&(c._formFieldControl=K.first),z_(K=G_())&&(c._prefixChildren=K),z_(K=G_())&&(c._suffixChildren=K),z_(K=G_())&&(c._errorChildren=K),z_(K=G_())&&(c._hintChildren=K)}},viewQuery:function(C,c){if(C&1&&(Sg(c._iconPrefixContainerSignal,e,5)(c._textPrefixContainerSignal,i,5)(c._iconSuffixContainerSignal,r,5)(c._textSuffixContainerSignal,o,5),Cg(a,5)(e,5)(i,5)(r,5)(o,5)(ao,5)(co,5)(so,5)),C&2){W_(4);let w;z_(w=G_())&&(c._textField=w.first),z_(w=G_())&&(c._iconPrefixContainer=w.first),z_(w=G_())&&(c._textPrefixContainer=w.first),z_(w=G_())&&(c._iconSuffixContainer=w.first),z_(w=G_())&&(c._textSuffixContainer=w.first),z_(w=G_())&&(c._floatingLabel=w.first),z_(w=G_())&&(c._notchedOutline=w.first),z_(w=G_())&&(c._lineRipple=w.first)}},hostAttrs:[1,`mat-mdc-form-field`],hostVars:38,hostBindings:function(C,c){C&2&&yr(`mat-mdc-form-field-label-always-float`,c._shouldAlwaysFloat())(`mat-mdc-form-field-has-icon-prefix`,c._hasIconPrefix)(`mat-mdc-form-field-has-icon-suffix`,c._hasIconSuffix)(`mat-form-field-invalid`,c._unwrapMaybeSignal(c._control.errorState))(`mat-form-field-disabled`,c._unwrapMaybeSignal(c._control.disabled))(`mat-form-field-autofilled`,c._unwrapMaybeSignal(c._control.autofilled))(`mat-form-field-appearance-fill`,c.appearance==`fill`)(`mat-form-field-appearance-outline`,c.appearance==`outline`)(`mat-form-field-hide-placeholder`,c._hasFloatingLabel()&&!c._shouldLabelFloat())(`mat-primary`,c.color!==`accent`&&c.color!==`warn`)(`mat-accent`,c.color===`accent`)(`mat-warn`,c.color===`warn`)(`ng-untouched`,c._shouldForward(`untouched`))(`ng-touched`,c._shouldForward(`touched`))(`ng-pristine`,c._shouldForward(`pristine`))(`ng-dirty`,c._shouldForward(`dirty`))(`ng-valid`,c._shouldForward(`valid`))(`ng-invalid`,c._shouldForward(`invalid`))(`ng-pending`,c._shouldForward(`pending`))},inputs:{hideRequiredMarker:`hideRequiredMarker`,color:`color`,floatLabel:`floatLabel`,appearance:`appearance`,subscriptSizing:`subscriptSizing`,hintLabel:`hintLabel`},exportAs:[`matFormField`],features:[Hg([{provide:En,useExisting:n},{provide:ho,useExisting:n}])],ngContentSelectors:d,decls:18,vars:21,consts:[[`labelTemplate`,``],[`textField`,``],[`iconPrefixContainer`,``],[`textPrefixContainer`,``],[`textSuffixContainer`,``],[`iconSuffixContainer`,``],[1,`mat-mdc-text-field-wrapper`,`mdc-text-field`,3,`click`],[1,`mat-mdc-form-field-focus-overlay`],[1,`mat-mdc-form-field-flex`],[`matFormFieldNotchedOutline`,``,3,`matFormFieldNotchedOutlineOpen`],[1,`mat-mdc-form-field-icon-prefix`],[1,`mat-mdc-form-field-text-prefix`],[1,`mat-mdc-form-field-infix`],[3,`ngTemplateOutlet`],[1,`mat-mdc-form-field-text-suffix`],[1,`mat-mdc-form-field-icon-suffix`],[`matFormFieldLineRipple`,``],[`aria-atomic`,`true`,`aria-live`,`polite`,1,`mat-mdc-form-field-subscript-wrapper`,`mat-mdc-form-field-bottom-align`],[1,`mat-mdc-form-field-error-wrapper`],[1,`mat-mdc-form-field-hint-wrapper`],[`matFormFieldFloatingLabel`,``,3,`floating`,`monitorResize`,`id`],[`aria-hidden`,`true`,1,`mat-mdc-form-field-required-marker`,`mdc-floating-label--required`],[3,`id`],[1,`mat-mdc-form-field-hint-spacer`]],template:function(C,c){if(C&1&&(el$1(l),hg(0,b,1,1,`ng-template`,null,0,_b),vs(2,`div`,6,1),bg(`click`,function(K){return c._control.onContainerClick(K)}),M_(4,M,1,0,`div`,7),vs(5,`div`,8),M_(6,Q,2,2,`div`,9),M_(7,Tt,3,0,`div`,10),M_(8,aa,3,0,`div`,11),vs(9,`div`,12),M_(10,sa,1,1,null,13),tl$1(11),Qu(),M_(12,da,3,0,`div`,14),M_(13,ca,3,0,`div`,15),Qu(),M_(14,ma,1,0,`div`,16),Qu(),vs(15,`div`,17),M_(16,fa,2,0,`div`,18)(17,ha,5,1,`div`,19),Qu()),C&2){let w,K=c._unwrapMaybeSignal(c._control.disabled);ME(2),yr(`mdc-text-field--filled`,!c._hasOutline())(`mdc-text-field--outlined`,c._hasOutline())(`mdc-text-field--no-label`,!c._hasFloatingLabel())(`mdc-text-field--disabled`,K)(`mdc-text-field--invalid`,c._unwrapMaybeSignal(c._control.errorState)),ME(2),A_(!c._hasOutline()&&!K?4:-1),ME(2),A_(c._hasOutline()?6:-1),ME(),A_(c._hasIconPrefix?7:-1),ME(),A_(c._hasTextPrefix?8:-1),ME(2),A_(!c._hasOutline()||c._forceDisplayInfixLabel()?10:-1),ME(2),A_(c._hasTextSuffix?12:-1),ME(),A_(c._hasIconSuffix?13:-1),ME(),A_(c._hasOutline()?-1:14),ME(),yr(`mat-mdc-form-field-subscript-dynamic-size`,c.subscriptSizing===`dynamic`);let pa=c._getSubscriptMessageType();ME(),A_((w=pa)===`error`?16:w===`hint`?17:-1)}},dependencies:[ao,co,pw,so,kt],styles:[`.mdc-text-field {
  display: inline-flex;
  align-items: baseline;
  padding: 0 16px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  will-change: opacity, transform, color;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.mdc-text-field__input {
  width: 100%;
  min-width: 0;
  border: none;
  border-radius: 0;
  background: none;
  padding: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  height: 28px;
}
.mdc-text-field__input::-webkit-calendar-picker-indicator, .mdc-text-field__input::-webkit-search-cancel-button {
  display: none;
}
.mdc-text-field__input::-ms-clear {
  display: none;
}
.mdc-text-field__input:focus {
  outline: none;
}
.mdc-text-field__input:invalid {
  box-shadow: none;
}
.mdc-text-field__input::placeholder {
  opacity: 0;
}
.mdc-text-field__input::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field__input::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field__input:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mdc-text-field--focused .mdc-text-field__input::placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  opacity: 1;
}
.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  opacity: 1;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-moz-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive::-webkit-input-placeholder {
  opacity: 0;
}
.mdc-text-field--%NS%disabled:not(.mdc-text-field--no-label) .mdc-text-field__input.mat-mdc-input-disabled-interactive:-ms-input-placeholder {
  opacity: 0;
}
.mdc-text-field--outlined .mdc-text-field__input, .mdc-text-field--filled.mdc-text-field--no-label .mdc-text-field__input {
  height: 100%;
}
.mdc-text-field--outlined .mdc-text-field__input {
  display: flex;
  border: none !important;
  background-color: transparent;
}
.mdc-text-field--disabled .mdc-text-field__input {
  pointer-events: auto;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-filled-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-filled-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-input-text-color, var(--%NS%mat-sys-on-surface));
  caret-color: var(--%NS%mat-form-field-outlined-caret-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-outlined-input-text-placeholder-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-filled-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--outlined.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-text-field__input {
  caret-color: var(--%NS%mat-form-field-outlined-error-caret-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-filled-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-text-field__input {
  color: var(--%NS%mat-form-field-outlined-disabled-input-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-text-field__input {
    background-color: Window;
  }
}

.mdc-text-field--filled {
  height: 56px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-top-right-radius: var(--%NS%mat-form-field-filled-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) {
  background-color: var(--%NS%mat-form-field-filled-container-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled {
  background-color: var(--%NS%mat-form-field-filled-disabled-container-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 4%, transparent));
}

.mdc-text-field--outlined {
  height: 56px;
  overflow: visible;
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
}
[dir=rtl] .mdc-text-field--outlined {
  padding-right: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)) + 4px);
  padding-left: max(16px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}

.mdc-floating-label {
  position: absolute;
  left: 0;
  transform-origin: left top;
  line-height: 1.15rem;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: text;
  overflow: hidden;
  will-change: transform;
}
[dir=rtl] .mdc-floating-label {
  right: 0;
  left: auto;
  transform-origin: right top;
  text-align: right;
}
.mdc-text-field .mdc-floating-label {
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
}
.mdc-notched-outline .mdc-floating-label {
  display: inline-block;
  position: relative;
  max-width: 100%;
}
.mdc-text-field--outlined .mdc-floating-label {
  left: 4px;
  right: auto;
}
[dir=rtl] .mdc-text-field--outlined .mdc-floating-label {
  left: auto;
  right: 4px;
}
.mdc-text-field--filled .mdc-floating-label {
  left: 16px;
  right: auto;
}
[dir=rtl] .mdc-text-field--filled .mdc-floating-label {
  left: auto;
  right: 16px;
}
.mdc-text-field--disabled .mdc-floating-label {
  cursor: default;
}
@media (forced-colors: active) {
  .mdc-text-field--disabled .mdc-floating-label {
    z-index: 1;
  }
}
.mdc-text-field--filled.mdc-text-field--no-label .mdc-floating-label {
  display: none;
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-hover-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-filled-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--filled .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-filled-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-filled-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-filled-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-filled-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-label-text-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-focus-label-text-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-hover-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-disabled-label-text-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-focus-label-text-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled):hover .mdc-floating-label {
  color: var(--%NS%mat-form-field-outlined-error-hover-label-text-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--outlined .mdc-floating-label {
  font-family: var(--%NS%mat-form-field-outlined-label-text-font, var(--%NS%mat-sys-body-large-font));
  font-size: var(--%NS%mat-form-field-outlined-label-text-size, var(--%NS%mat-sys-body-large-size));
  font-weight: var(--%NS%mat-form-field-outlined-label-text-weight, var(--%NS%mat-sys-body-large-weight));
  letter-spacing: var(--%NS%mat-form-field-outlined-label-text-tracking, var(--%NS%mat-sys-body-large-tracking));
}

.mdc-floating-label--float-above {
  cursor: auto;
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--filled .mdc-floating-label--float-above {
  transform: translateY(-106%) scale(0.75);
}
.mdc-text-field--outlined .mdc-floating-label--float-above {
  transform: translateY(-37.25px) scale(1);
  font-size: 0.75rem;
}
.mdc-notched-outline .mdc-floating-label--float-above {
  text-overflow: clip;
}
.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: 133.3333333333%;
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  transform: translateY(-34.75px) scale(0.75);
}
.mdc-text-field--outlined.mdc-notched-outline--upgraded .mdc-floating-label--float-above, .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: 1rem;
}

.mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 1px;
  margin-right: 0;
  content: "*";
}
[dir=rtl] .mdc-floating-label--%NS%required:not(.mdc-floating-label--hide-required-marker)::after {
  margin-left: 0;
  margin-right: 1px;
}

.mdc-notched-outline {
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  height: 100%;
  text-align: left;
  pointer-events: none;
}
[dir=rtl] .mdc-notched-outline {
  text-align: right;
}
.mdc-text-field--outlined .mdc-notched-outline {
  z-index: 1;
}

.mat-mdc-notch-piece {
  box-sizing: border-box;
  height: 100%;
  pointer-events: none;
  border: none;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.mdc-text-field--focused .mat-mdc-notch-piece {
  border-width: 2px;
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled) .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-outline-color, var(--%NS%mat-sys-outline));
  border-width: var(--%NS%mat-form-field-outlined-outline-width, 1px);
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-hover-outline-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-focus-outline-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--outlined.mdc-text-field--disabled .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-disabled-outline-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 12%, transparent));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-notched-outline .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-hover-outline-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--invalid.mdc-text-field--focused .mat-mdc-notch-piece {
  border-color: var(--%NS%mat-form-field-outlined-error-focus-outline-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%outlined:not(.mdc-text-field--disabled).mdc-text-field--focused .mdc-notched-outline .mat-mdc-notch-piece {
  border-width: var(--%NS%mat-form-field-outlined-focus-outline-width, 2px);
}

.mdc-notched-outline__leading {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__leading {
  width: max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small)));
}
[dir=rtl] .mdc-notched-outline__leading {
  border-left: none;
  border-right: 1px solid;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__trailing {
  flex-grow: 1;
  border-left: none;
  border-right: 1px solid;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-right-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}
[dir=rtl] .mdc-notched-outline__trailing {
  border-left: 1px solid;
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
  border-bottom-left-radius: var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small));
}

.mdc-notched-outline__notch {
  flex: 0 0 auto;
  width: auto;
}
.mdc-text-field--outlined .mdc-notched-outline .mdc-notched-outline__notch {
  max-width: min(var(--%NS%mat-form-field-notch-max-width, 100%), calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  max-width: min(100%, calc(100% - max(12px, var(--%NS%mat-form-field-outlined-container-shape, var(--%NS%mat-sys-corner-extra-small))) * 2));
}
.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 1px;
}
.mdc-text-field--focused.mdc-text-field--outlined .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-top: 2px;
}
.mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 0;
  padding-right: 8px;
  border-top: none;
}
[dir=rtl] .mdc-notched-outline--notched .mdc-notched-outline__notch {
  padding-left: 8px;
  padding-right: 0;
}
.mdc-notched-outline--no-label .mdc-notched-outline__notch {
  display: none;
}

.mdc-line-ripple::before, .mdc-line-ripple::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom-style: solid;
  content: "";
}
.mdc-line-ripple::before {
  z-index: 1;
  border-bottom-width: var(--%NS%mat-form-field-filled-active-indicator-height, 1px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-active-indicator-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled):not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-hover-active-indicator-color, var(--%NS%mat-sys-on-surface));
}
.mdc-text-field--filled.mdc-text-field--disabled .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-disabled-active-indicator-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--invalid .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-active-indicator-color, var(--%NS%mat-sys-error));
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled).mdc-text-field--%NS%invalid:not(.mdc-text-field--focused):hover .mdc-line-ripple::before {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-hover-active-indicator-color, var(--%NS%mat-sys-on-error-container));
}
.mdc-line-ripple::after {
  transform: scaleX(0);
  opacity: 0;
  z-index: 2;
}
.mdc-text-field--filled .mdc-line-ripple::after {
  border-bottom-width: var(--%NS%mat-form-field-filled-focus-active-indicator-height, 2px);
}
.mdc-text-field--%NS%filled:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-focus-active-indicator-color, var(--%NS%mat-sys-primary));
}
.mdc-text-field--filled.mdc-text-field--%NS%invalid:not(.mdc-text-field--disabled) .mdc-line-ripple::after {
  border-bottom-color: var(--%NS%mat-form-field-filled-error-focus-active-indicator-color, var(--%NS%mat-sys-error));
}

.mdc-line-ripple--%NS%active::after {
  transform: scaleX(1);
  opacity: 1;
}

.mdc-line-ripple--%NS%deactivating::after {
  opacity: 0;
}

.mdc-text-field--disabled {
  pointer-events: none;
}

.mat-mdc-form-field-textarea-control {
  vertical-align: middle;
  resize: vertical;
  box-sizing: border-box;
  height: auto;
  margin: 0;
  padding: 0;
  border: none;
  overflow: auto;
}

.mat-mdc-form-field-input-control.mat-mdc-form-field-input-control {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font: inherit;
  letter-spacing: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  border: none;
}

.mat-mdc-form-field .mat-mdc-floating-label.mdc-floating-label {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  line-height: normal;
  pointer-events: all;
  will-change: auto;
}

.mat-mdc-form-field:not(.mat-form-field-disabled) .mat-mdc-floating-label.mdc-floating-label {
  cursor: inherit;
}

.mdc-text-field--%NS%no-label:not(.mdc-text-field--textarea) .mat-mdc-form-field-input-control.mdc-text-field__input,
.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control {
  height: auto;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-input-control.mdc-text-field__input[type=color] {
  height: 23px;
}

.mat-mdc-text-field-wrapper {
  height: auto;
  flex: auto;
  will-change: auto;
}

.mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-left: 0;
  --%NS%mat-mdc-form-field-label-offset-x: -16px;
}

.mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

[dir=rtl] .mat-mdc-text-field-wrapper {
  padding-left: 16px;
  padding-right: 16px;
}
[dir=rtl] .mat-mdc-form-field-has-icon-suffix .mat-mdc-text-field-wrapper {
  padding-left: 0;
}
[dir=rtl] .mat-mdc-form-field-has-icon-prefix .mat-mdc-text-field-wrapper {
  padding-right: 0;
}

.mat-form-field-disabled .mdc-text-field__input::placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-moz-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input::-webkit-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-disabled .mdc-text-field__input:-ms-input-placeholder {
  color: var(--%NS%mat-form-field-disabled-input-text-placeholder-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-label-always-float .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
  opacity: 1;
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-infix .mat-mdc-floating-label {
  left: auto;
  right: auto;
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-text-field__input {
  display: inline-block;
}

.mat-mdc-form-field .mat-mdc-text-field-wrapper.mdc-text-field .mdc-notched-outline__notch {
  padding-top: 0;
}

.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: 1px solid transparent;
}

[dir=rtl] .mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field.mat-mdc-form-field .mdc-notched-outline__notch {
  border-left: none;
  border-right: 1px solid transparent;
}

.mat-mdc-form-field-infix {
  min-height: var(--%NS%mat-form-field-container-height, 56px);
  padding-top: var(--%NS%mat-form-field-filled-with-label-container-padding-top, 24px);
  padding-bottom: var(--%NS%mat-form-field-filled-with-label-container-padding-bottom, 8px);
}
.mdc-text-field--outlined .mat-mdc-form-field-infix, .mdc-text-field--no-label .mat-mdc-form-field-infix {
  padding-top: var(--%NS%mat-form-field-container-vertical-padding, 16px);
  padding-bottom: var(--%NS%mat-form-field-container-vertical-padding, 16px);
}

.mat-mdc-text-field-wrapper .mat-mdc-form-field-flex .mat-mdc-floating-label {
  top: calc(var(--%NS%mat-form-field-container-height, 56px) / 2);
}

.mdc-text-field--filled .mat-mdc-floating-label {
  display: var(--%NS%mat-form-field-filled-label-display, block);
}

.mat-mdc-text-field-wrapper.mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  --%NS%mat-mdc-form-field-label-transform: translateY(calc(calc(6.75px + var(--%NS%mat-form-field-container-height, 56px) / 2) * -1))
    scale(var(--%NS%mat-mdc-form-field-floating-label-scale, 0.75));
  transform: var(--%NS%mat-mdc-form-field-label-transform);
}

@keyframes _mat-form-field-subscript-animation {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.mat-mdc-form-field-subscript-wrapper {
  box-sizing: border-box;
  width: 100%;
  position: relative;
}

.mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-error-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 0 16px;
  opacity: 1;
  transform: translateY(0);
  animation: _mat-form-field-subscript-animation 0ms cubic-bezier(0.55, 0, 0.55, 0.2);
}

.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field-subscript-dynamic-size .mat-mdc-form-field-error-wrapper {
  position: static;
}

.mat-mdc-form-field-bottom-align::before {
  content: "";
  display: inline-block;
  height: 16px;
}

.mat-mdc-form-field-bottom-align.mat-mdc-form-field-subscript-dynamic-size::before {
  content: unset;
}

.mat-mdc-form-field-hint-end {
  order: 1;
}

.mat-mdc-form-field-hint-wrapper {
  display: flex;
}

.mat-mdc-form-field-hint-spacer {
  flex: 1 0 1em;
}

.mat-mdc-form-field-error {
  display: block;
  color: var(--%NS%mat-form-field-error-text-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-subscript-wrapper,
.mat-mdc-form-field-bottom-align::before {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-subscript-text-font, var(--%NS%mat-sys-body-small-font));
  line-height: var(--%NS%mat-form-field-subscript-text-line-height, var(--%NS%mat-sys-body-small-line-height));
  font-size: var(--%NS%mat-form-field-subscript-text-size, var(--%NS%mat-sys-body-small-size));
  letter-spacing: var(--%NS%mat-form-field-subscript-text-tracking, var(--%NS%mat-sys-body-small-tracking));
  font-weight: var(--%NS%mat-form-field-subscript-text-weight, var(--%NS%mat-sys-body-small-weight));
}

.mat-mdc-form-field-focus-overlay {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
  background-color: var(--%NS%mat-form-field-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mat-mdc-form-field.mat-focused .mat-mdc-form-field-focus-overlay {
  opacity: var(--%NS%mat-form-field-focus-state-layer-opacity, 0);
}

select.mat-mdc-form-field-input-control {
  -moz-appearance: none;
  -webkit-appearance: none;
  background-color: transparent;
  display: inline-flex;
  box-sizing: border-box;
}
select.mat-mdc-form-field-input-control:not(:disabled) {
  cursor: pointer;
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option {
  color: var(--%NS%mat-form-field-select-option-text-color, var(--%NS%mat-sys-neutral10));
}
select.mat-mdc-form-field-input-control:not(.mat-mdc-native-select-inline) option:disabled {
  color: var(--%NS%mat-form-field-select-disabled-option-text-color, color-mix(in srgb, var(--%NS%mat-sys-neutral10) 38%, transparent));
}

.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  content: "";
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -2.5px;
  pointer-events: none;
  color: var(--%NS%mat-form-field-enabled-select-arrow-color, var(--%NS%mat-sys-on-surface-variant));
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-infix::after {
  right: auto;
  left: 0;
}
.mat-mdc-form-field-type-mat-native-select.mat-focused .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-focus-select-arrow-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-form-field-type-mat-native-select.mat-form-field-disabled .mat-mdc-form-field-infix::after {
  color: var(--%NS%mat-form-field-disabled-select-arrow-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 15px;
}
[dir=rtl] .mat-mdc-form-field-type-mat-native-select .mat-mdc-form-field-input-control {
  padding-right: 0;
  padding-left: 15px;
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill .mat-mdc-text-field-wrapper {
    outline: solid 1px;
  }
}
@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-form-field-disabled .mat-mdc-text-field-wrapper {
    outline-color: GrayText;
  }
}

@media (forced-colors: active) {
  .mat-form-field-appearance-fill.mat-focused .mat-mdc-text-field-wrapper {
    outline: dashed 3px;
  }
}

@media (forced-colors: active) {
  .mat-mdc-form-field.mat-focused .mdc-notched-outline {
    border: dashed 3px;
  }
}

.mat-mdc-form-field-input-control[type=date], .mat-mdc-form-field-input-control[type=datetime], .mat-mdc-form-field-input-control[type=datetime-local], .mat-mdc-form-field-input-control[type=month], .mat-mdc-form-field-input-control[type=week], .mat-mdc-form-field-input-control[type=time] {
  line-height: 1;
}
.mat-mdc-form-field-input-control::-webkit-datetime-edit {
  line-height: 1;
  padding: 0;
  margin-bottom: -2px;
}

.mat-mdc-form-field {
  --%NS%mat-mdc-form-field-floating-label-scale: 0.75;
  display: inline-flex;
  flex-direction: column;
  min-width: 0;
  text-align: left;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-form-field-container-text-font, var(--%NS%mat-sys-body-large-font));
  line-height: var(--%NS%mat-form-field-container-text-line-height, var(--%NS%mat-sys-body-large-line-height));
  font-size: var(--%NS%mat-form-field-container-text-size, var(--%NS%mat-sys-body-large-size));
  letter-spacing: var(--%NS%mat-form-field-container-text-tracking, var(--%NS%mat-sys-body-large-tracking));
  font-weight: var(--%NS%mat-form-field-container-text-weight, var(--%NS%mat-sys-body-large-weight));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-floating-label--float-above {
  font-size: calc(var(--%NS%mat-form-field-outlined-label-text-populated-size) * var(--%NS%mat-mdc-form-field-floating-label-scale));
}
.mat-mdc-form-field .mdc-text-field--outlined .mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  font-size: var(--%NS%mat-form-field-outlined-label-text-populated-size);
}
[dir=rtl] .mat-mdc-form-field {
  text-align: right;
}

.mat-mdc-form-field-flex {
  display: inline-flex;
  align-items: baseline;
  box-sizing: border-box;
  width: 100%;
}

.mat-mdc-text-field-wrapper {
  width: 100%;
  z-index: 0;
}

.mat-mdc-form-field-icon-prefix,
.mat-mdc-form-field-icon-suffix {
  align-self: center;
  line-height: 0;
  pointer-events: auto;
  position: relative;
  z-index: 1;
}
.mat-mdc-form-field-icon-prefix > .mat-icon,
.mat-mdc-form-field-icon-suffix > .mat-icon {
  padding: 0 12px;
  box-sizing: content-box;
}

.mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-leading-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-prefix {
  color: var(--%NS%mat-form-field-disabled-leading-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-trailing-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-form-field-disabled .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-disabled-trailing-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-form-field-invalid .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-trailing-icon-color, var(--%NS%mat-sys-error));
}
.mat-form-field-invalid:not(.mat-focused):not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper:hover .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-hover-trailing-icon-color, var(--%NS%mat-sys-on-error-container));
}
.mat-form-field-invalid.mat-focused .mat-mdc-text-field-wrapper .mat-mdc-form-field-icon-suffix {
  color: var(--%NS%mat-form-field-error-focus-trailing-icon-color, var(--%NS%mat-sys-error));
}

.mat-mdc-form-field-icon-prefix,
[dir=rtl] .mat-mdc-form-field-icon-suffix {
  padding: 0 4px 0 0;
}

.mat-mdc-form-field-icon-suffix,
[dir=rtl] .mat-mdc-form-field-icon-prefix {
  padding: 0 0 0 4px;
}

.mat-mdc-form-field-subscript-wrapper .mat-icon,
.mat-mdc-form-field label .mat-icon {
  width: 1em;
  height: 1em;
  font-size: inherit;
}

.mat-mdc-form-field-infix {
  flex: auto;
  min-width: 0;
  width: 180px;
  position: relative;
  box-sizing: border-box;
}
.mat-mdc-form-field-infix:has(textarea[cols]) {
  width: auto;
}

.mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: -1px;
  -webkit-clip-path: inset(-9em -999em -9em 1px);
  clip-path: inset(-9em -999em -9em 1px);
}
[dir=rtl] .mat-mdc-form-field .mdc-notched-outline__notch {
  margin-left: 0;
  margin-right: -1px;
  -webkit-clip-path: inset(-9em 1px -9em -999em);
  clip-path: inset(-9em 1px -9em -999em);
}

.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-floating-label {
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input {
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-moz-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input::-webkit-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field__input:-ms-input-placeholder {
  transition: opacity 67ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-moz-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-moz-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input::-webkit-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input::-webkit-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--no-label .mdc-text-field__input:-ms-input-placeholder, .mat-mdc-form-field.mat-form-field-animations-enabled.mdc-text-field--focused .mdc-text-field__input:-ms-input-placeholder {
  transition-delay: 40ms;
  transition-duration: 110ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-text-field--%NS%filled:not(.mdc-ripple-upgraded):focus .mdc-text-field__ripple::before {
  transition-duration: 75ms;
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mdc-line-ripple::after {
  transition: transform 180ms cubic-bezier(0.4, 0, 0.2, 1), opacity 180ms cubic-bezier(0.4, 0, 0.2, 1);
}
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-hint-wrapper,
.mat-mdc-form-field.mat-form-field-animations-enabled .mat-mdc-form-field-error-wrapper {
  animation-duration: 300ms;
}

.mdc-notched-outline .mdc-floating-label {
  max-width: calc(100% + 1px);
}

.mdc-notched-outline--upgraded .mdc-floating-label--float-above {
  max-width: calc(133.3333333333% + 1px);
}
`],encapsulation:2})})()}return n})();var Oe=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({imports:[Pm,Ge,qs]})}return n})();var nl=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵcmp=pt({type:n,selectors:[[`ng-component`]],hostAttrs:[`cdk-text-field-style-loader`,``],decls:0,vars:0,template:function(i,r){},styles:[`textarea.cdk-textarea-autosize {
  resize: none;
}

textarea.cdk-textarea-autosize-measuring {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: auto !important;
  overflow: hidden !important;
}

textarea.cdk-textarea-autosize-measuring-firefox {
  padding: 2px 0 !important;
  box-sizing: content-box !important;
  height: 0 !important;
}

@keyframes cdk-text-field-autofill-start { /*!*/ }
@keyframes cdk-text-field-autofill-end { /*!*/ }
.cdk-text-field-autofill-monitored:-webkit-autofill {
  animation: cdk-text-field-autofill-start 0s 1ms;
}

.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {
  animation: cdk-text-field-autofill-end 0s 1ms;
}
`],encapsulation:2})}return n})();var rl={passive:!0};var go=(()=>{class n{_platform=h(He);_ngZone=h(H);_renderer=h(lt).createRenderer(null,null);_styleLoader=h(Po$1);_monitoredElements=new Map;monitor(e){if(!this._platform.isBrowser)return Wt;this._styleLoader.load(nl);let i=Lt(e),r=this._monitoredElements.get(i);if(r)return r.subject;let o=new z,a=`cdk-text-field-autofilled`,l=u=>{u.animationName===`cdk-text-field-autofill-start`&&!i.classList.contains(a)?(i.classList.add(a),this._ngZone.run(()=>o.next({target:u.target,isAutofilled:!0}))):u.animationName===`cdk-text-field-autofill-end`&&i.classList.contains(a)&&(i.classList.remove(a),this._ngZone.run(()=>o.next({target:u.target,isAutofilled:!1})))},d=this._ngZone.runOutsideAngular(()=>(i.classList.add(`cdk-text-field-autofill-monitored`),this._renderer.listen(i,`animationstart`,l,rl)));return this._monitoredElements.set(i,{subject:o,unlisten:d}),o}stopMonitoring(e){let i=Lt(e),r=this._monitoredElements.get(i);r&&(r.unlisten(),r.subject.complete(),i.classList.remove(`cdk-text-field-autofill-monitored`),i.classList.remove(`cdk-text-field-autofilled`),this._monitoredElements.delete(i))}ngOnDestroy(){this._monitoredElements.forEach((e,i)=>this.stopMonitoring(i))}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var _o=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({})}return n})();var vo=new y(`MAT_INPUT_VALUE_ACCESSOR`);var bo=(()=>{class n{isErrorState(e,i){return!!(e&&e.invalid&&(e.touched||i&&i.submitted))}isSignalErrorState(e){if(!e)return!1;let i=e().invalid(),r=e().touched();return i&&r}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var ui=class{_defaultMatcher;_parentFormGroup;_parentForm;_stateChanges;errorState=!1;matcher;ngControl;formField;constructor(t,e,i,r,o){this._defaultMatcher=t,this._parentFormGroup=i,this._parentForm=r,this._stateChanges=o,e?Wi(e.field)&&!e.updateValueAndValidity?(this.formField=e,this.ngControl=null):(this.formField=null,this.ngControl=e):this.ngControl=this.formField=null}updateErrorState(){let t=this.errorState,e=this._getCurrentErrorState(this.matcher||this._defaultMatcher);e!==t&&(this.errorState=e,this._stateChanges.next())}_getCurrentErrorState(t){if(this.formField&&t?.isSignalErrorState)return t.isSignalErrorState(this.formField.field())??!1;let e=this._parentFormGroup||this._parentForm,i=this.ngControl?this.ngControl.control:null;return t?.isErrorState(i,e)??!1}};var ol=[`button`,`checkbox`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`];var al=new y(`MAT_INPUT_CONFIG`);var hi=(()=>{class n{_elementRef=h(he);_platform=h(He);ngControl=h(me$1,{optional:!0,self:!0});_autofillMonitor=h(go);_ngZone=h(H);_formField=h(En,{optional:!0});_renderer=h(as);_uid=h(Ol$1).getId(`mat-input-`);_previousNativeValue;_inputValueAccessor;_signalBasedValueAccessor;_previousPlaceholder=null;_errorStateTracker;_config=h(al,{optional:!0});_cleanupIosKeyup;_cleanupWebkitWheel;_isServer=!1;_isNativeSelect=!1;_isTextarea=!1;_isInFormField=!1;focused=!1;stateChanges=new z;controlType=`mat-input`;autofilled=!1;get disabled(){return this._disabled}set disabled(e){this._disabled=AU(e),this.focused&&(this.focused=!1,this.stateChanges.next())}_disabled=!1;get id(){return this._id}set id(e){this._id=e||this._uid}_id;placeholder;name;get required(){return this._required??this.ngControl?.control?.hasValidator(Y.required)??!1}set required(e){this._required=AU(e)}_required;get type(){return this._type}set type(e){this._type=e||`text`,this._validateType(),!this._isTextarea&&vU().has(this._type)&&(this._elementRef.nativeElement.type=this._type)}_type=`text`;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}userAriaDescribedBy;get value(){return this._signalBasedValueAccessor?this._signalBasedValueAccessor.value():this._inputValueAccessor.value}set value(e){e!==this.value&&(this._signalBasedValueAccessor?this._signalBasedValueAccessor.value.set(e):this._inputValueAccessor.value=e,this.stateChanges.next())}get readonly(){return this._readonly}set readonly(e){this._readonly=AU(e)}_readonly=!1;disabledInteractive;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}_neverEmptyInputTypes=[`date`,`datetime`,`datetime-local`,`month`,`time`,`week`].filter(e=>vU().has(e));constructor(){let e=h(ft,{optional:!0}),i=h(_t,{optional:!0}),r=h(bo),o=h(vo,{optional:!0,self:!0}),a=h(si,{optional:!0,self:!0}),l=this._elementRef.nativeElement,d=l.nodeName.toLowerCase();o?Wi(o.value)?this._signalBasedValueAccessor=o:this._inputValueAccessor=o:this._inputValueAccessor=l,this._previousNativeValue=this.value,this.id=this.id,this._platform.IOS&&this._ngZone.runOutsideAngular(()=>{this._cleanupIosKeyup=this._renderer.listen(l,`keyup`,this._iOSKeyupListener)}),this._errorStateTracker=new ui(r,a||this.ngControl,i,e,this.stateChanges),this._isServer=!this._platform.isBrowser,this._isNativeSelect=d===`select`,this._isTextarea=d===`textarea`,this._isInFormField=!!this._formField,this.disabledInteractive=this._config?.disabledInteractive||!1,this._isNativeSelect&&(this.controlType=l.multiple?`mat-native-select-multiple`:`mat-native-select`),this._signalBasedValueAccessor&&Sf(()=>{this._signalBasedValueAccessor.value(),this.stateChanges.next()})}ngAfterViewInit(){this._platform.isBrowser&&this._autofillMonitor.monitor(this._elementRef.nativeElement).subscribe(e=>{this.autofilled=e.isAutofilled,this.stateChanges.next()})}ngOnChanges(){this.stateChanges.next()}ngOnDestroy(){this.stateChanges.complete(),this._platform.isBrowser&&this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement),this._cleanupIosKeyup?.(),this._cleanupWebkitWheel?.()}ngDoCheck(){this.ngControl&&(this.updateErrorState(),this.ngControl.disabled!==null&&this.ngControl.disabled!==this.disabled&&(this.disabled=this.ngControl.disabled,this.stateChanges.next())),this._dirtyCheckNativeValue(),this._dirtyCheckPlaceholder()}focus(e){this._elementRef.nativeElement.focus(e)}updateErrorState(){this._errorStateTracker.updateErrorState()}_focusChanged(e){if(e!==this.focused){if(!this._isNativeSelect&&e&&this.disabled&&this.disabledInteractive){let i=this._elementRef.nativeElement;i.type===`number`?(i.type=`text`,i.setSelectionRange(0,0),i.type=`number`):i.setSelectionRange(0,0)}this.focused=e,this.stateChanges.next()}}_onInput(){}_dirtyCheckNativeValue(){let e=this._elementRef.nativeElement.value;this._previousNativeValue!==e&&(this._previousNativeValue=e,this.stateChanges.next())}_dirtyCheckPlaceholder(){let e=this._getPlaceholder();if(e!==this._previousPlaceholder){let i=this._elementRef.nativeElement;this._previousPlaceholder=e,e?i.setAttribute(`placeholder`,e):i.removeAttribute(`placeholder`)}}_getPlaceholder(){return this.placeholder||null}_validateType(){ol.indexOf(this._type)}_isNeverEmpty(){return this._neverEmptyInputTypes.indexOf(this._type)>-1}_isBadInput(){let e=this._elementRef.nativeElement.validity;return e&&e.badInput}get empty(){return!this._isNeverEmpty()&&!this._elementRef.nativeElement.value&&!this._isBadInput()&&!this.autofilled}get shouldLabelFloat(){if(this._isNativeSelect){let e=this._elementRef.nativeElement,i=e.options[0];return this.focused||e.multiple||!this.empty||!!(e.selectedIndex>-1&&i&&i.label)}else return this.focused&&!this.disabled||!this.empty}get describedByIds(){return this._elementRef.nativeElement.getAttribute(`aria-describedby`)?.split(` `)||[]}setDescribedByIds(e){let i=this._elementRef.nativeElement;e.length?i.setAttribute(`aria-describedby`,e.join(` `)):i.removeAttribute(`aria-describedby`)}onContainerClick(){this.focused||this.focus()}_isInlineSelect(){let e=this._elementRef.nativeElement;return this._isNativeSelect&&(e.multiple||e.size>1)}_iOSKeyupListener=e=>{let i=e.target;!i.value&&i.selectionStart===0&&i.selectionEnd===0&&(i.setSelectionRange(1,1),i.setSelectionRange(0,0))};_getReadonlyAttribute(){return this._isNativeSelect?null:this.readonly||this.disabled&&this.disabledInteractive?`true`:null}static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[`input`,`matInput`,``],[`textarea`,`matInput`,``],[`select`,`matNativeControl`,``],[`input`,`matNativeControl`,``],[`textarea`,`matNativeControl`,``]],hostAttrs:[1,`mat-mdc-input-element`],hostVars:21,hostBindings:function(i,r){i&1&&bg(`focus`,function(){return r._focusChanged(!0)})(`blur`,function(){return r._focusChanged(!1)})(`input`,function(){return r._onInput()}),i&2&&(Ig(`id`,r.id)(`disabled`,r.disabled&&!r.disabledInteractive)(`required`,r.required),Io$1(`name`,r.name||null)(`readonly`,r._getReadonlyAttribute())(`aria-disabled`,r.disabled&&r.disabledInteractive?`true`:null)(`aria-invalid`,r.empty&&r.required?null:r.errorState)(`aria-required`,r.required)(`id`,r.id),yr(`mat-input-server`,r._isServer)(`mat-mdc-form-field-textarea-control`,r._isInFormField&&r._isTextarea)(`mat-mdc-form-field-input-control`,r._isInFormField)(`mat-mdc-input-disabled-interactive`,r.disabledInteractive)(`mdc-text-field__input`,r._isInFormField)(`mat-mdc-native-select-inline`,r._isInlineSelect()))},inputs:{disabled:`disabled`,id:`id`,placeholder:`placeholder`,name:`name`,required:`required`,type:`type`,errorStateMatcher:`errorStateMatcher`,userAriaDescribedBy:[0,`aria-describedby`,`userAriaDescribedBy`],value:`value`,readonly:`readonly`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,al$1]},exportAs:[`matInput`],features:[Hg([{provide:Mn,useExisting:n}]),Is]})}return n})();var pi=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({imports:[Oe,Oe,_o,qs]})}return n})();var ll=20;var gi=(()=>{class n{_ngZone=h(H);_platform=h(He);_renderer=h(lt).createRenderer(null,null);_cleanupGlobalListener;_scrolled=new z;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let i=this.scrollContainers.get(e);i&&(i.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=ll){return this._platform.isBrowser?new M(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen(`document`,`scroll`,()=>this._scrolled.next())));let r=e>0?this._scrolled.pipe(Vy(e)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):Re$1()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(e,i){let r=this.getAncestorScrollContainers(e);return this.scrolled(i).pipe(wt$1(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(e){let i=[];return this.scrollContainers.forEach((r,o)=>{this._targetContainsElement(o,e)&&i.push(o)}),i}_targetContainsElement(e,i){let r=Lt(i),o=e.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var So=(()=>{class n{elementRef=h(he);scrollDispatcher=h(gi);ngZone=h(H);dir=h(jC,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new z;_renderer=h(as);_cleanupScroll;_elementScrolled=new z;ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,`scroll`,e=>this._elementScrolled.next(e))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(e){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value==`rtl`;e.left??=r?e.end:e.start,e.right??=r?e.start:e.end,e.bottom!=null&&(e.top=i.scrollHeight-i.clientHeight-e.bottom),r&&hU()!=jo$1.NORMAL?(e.left!=null&&(e.right=i.scrollWidth-i.clientWidth-e.left),hU()==jo$1.INVERTED?e.left=e.right:hU()==jo$1.NEGATED&&(e.left=e.right?-e.right:e.right)):e.right!=null&&(e.left=i.scrollWidth-i.clientWidth-e.right),this._applyScrollToOptions(e)}_applyScrollToOptions(e){let i=this.elementRef.nativeElement;pU()?i.scrollTo(e):(e.top!=null&&(i.scrollTop=e.top),e.left!=null&&(i.scrollLeft=e.left))}measureScrollOffset(e){let i=`left`,r=`right`,o=this.elementRef.nativeElement;if(e==`top`)return o.scrollTop;if(e==`bottom`)return o.scrollHeight-o.clientHeight-o.scrollTop;let a=this.dir&&this.dir.value==`rtl`;return e==`start`?e=a?r:i:e==`end`&&(e=a?i:r),a&&hU()==jo$1.INVERTED?e==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:a&&hU()==jo$1.NEGATED?e==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:e==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[``,`cdk-scrollable`,``],[``,`cdkScrollable`,``]]})}return n})();var sl=20;var Et=(()=>{class n{_platform=h(He);_listeners;_viewportSize=null;_change=new z;_document=h(k$1);constructor(){let e=h(H),i=h(lt).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen(`window`,`resize`,r),i.listen(`window`,`orientationchange`,r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+r,right:e.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,i=this._getWindow(),r=e.documentElement,o=r.getBoundingClientRect();return{top:-o.top||e.body?.scrollTop||i.scrollY||r.scrollTop||0,left:-o.left||e.body?.scrollLeft||i.scrollX||r.scrollLeft||0}}change(e=sl){return e>0?this._change.pipe(Vy(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var xo=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({})}return n})();var Dn=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({imports:[qs,xo,qs,xo]})}return n})();var Dt=class{_attachedHost=null;attach(t){return this._attachedHost=t,t.attach(this)}detach(){let t=this._attachedHost;t!=null&&(this._attachedHost=null,t.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(t){this._attachedHost=t}};var $e=class extends Dt{component;viewContainerRef;injector;projectableNodes;bindings;directives;constructor(t,e,i,r,o,a){super(),this.component=t,this.viewContainerRef=e,this.injector=i,this.projectableNodes=r,this.bindings=o||null,this.directives=a||null}};var Ze=class extends Dt{templateRef;viewContainerRef;context;injector;constructor(t,e,i,r){super(),this.templateRef=t,this.viewContainerRef=e,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(t,e=this.context){return this.context=e,super.attach(t)}detach(){return this.context=void 0,super.detach()}};var Rn=class extends Dt{element;constructor(t){super(),this.element=t instanceof he?t.nativeElement:t}};var Qe=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(t){if(t instanceof $e)return this._attachedPortal=t,this.attachComponentPortal(t);if(t instanceof Ze)return this._attachedPortal=t,this.attachTemplatePortal(t);if(this.attachDomPortal&&t instanceof Rn)return this._attachedPortal=t,this.attachDomPortal(t)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(t){this._disposeFn=t}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var _i=class extends Qe{outletElement;_appRef;_defaultInjector;constructor(t,e,i){super(),this.outletElement=t,this._appRef=e,this._defaultInjector=i}attachComponentPortal(t){let e;if(t.viewContainerRef){let i=t.injector||t.viewContainerRef.injector,r=i.get(_n$1,null,{optional:!0})||void 0;e=t.viewContainerRef.createComponent(t.component,{index:t.viewContainerRef.length,injector:i,ngModuleRef:r,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),this.setDisposeFn(()=>e.destroy())}else{let i=this._appRef,r=t.injector||this._defaultInjector||X.NULL,o=r.get(ae,i.injector);e=Jg(t.component,{elementInjector:r,environmentInjector:o,projectableNodes:t.projectableNodes||void 0,bindings:t.bindings||void 0,directives:t.directives||void 0}),i.attachView(e.hostView),this.setDisposeFn(()=>{i.viewCount>0&&i.detachView(e.hostView),e.destroy()})}return this.outletElement.appendChild(this._getComponentRootNode(e)),this._attachedPortal=t,e}attachTemplatePortal(t){let e=t.viewContainerRef,i=e.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return i.rootNodes.forEach(r=>this.outletElement.appendChild(r)),i.detectChanges(),this.setDisposeFn(()=>{let r=e.indexOf(i);r!==-1&&e.remove(r)}),this._attachedPortal=t,i}attachDomPortal=t=>{let e=t.element;e.parentNode;let i=this.outletElement.ownerDocument.createComment(`dom-portal`);e.parentNode.insertBefore(i,e),this.outletElement.appendChild(e),this._attachedPortal=t,super.setDisposeFn(()=>{i.parentNode&&i.parentNode.replaceChild(e,i)})};dispose(){super.dispose(),this.outletElement.remove()}_getComponentRootNode(t){return t.hostView.rootNodes[0]}};var Rt=(()=>{class n extends Qe{_moduleRef=h(_n$1,{optional:!0});_document=h(k$1);_viewContainerRef=h(mr);_isInitialized=!1;_attachedRef=null;get portal(){return this._attachedPortal}set portal(e){this.hasAttached()&&!e&&!this._isInitialized||(this.hasAttached()&&super.detach(),e&&super.attach(e),this._attachedPortal=e||null)}attached=new be;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(e){e.setAttachedHost(this);let i=e.viewContainerRef!=null?e.viewContainerRef:this._viewContainerRef,r=i.createComponent(e.component,{index:i.length,injector:e.injector||i.injector,projectableNodes:e.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:e.bindings||void 0,directives:e.directives||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=e,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(e){e.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(e.templateRef,e.context,{injector:e.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=e,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=e=>{let i=e.element;i.parentNode;let r=this._document.createComment(`dom-portal`);e.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=e,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let e=this._viewContainerRef.element.nativeElement;return e.nodeType===e.ELEMENT_NODE?e:e.parentNode}static ɵfac=(()=>{let e;return function(r){return(e||(e=Op(n)))(r||n)}})();static ɵdir=ht({type:n,selectors:[[``,`cdkPortalOutlet`,``]],inputs:{portal:[0,`cdkPortalOutlet`,`portal`]},outputs:{attached:`attached`},exportAs:[`cdkPortalOutlet`],features:[fg]})}return n})();var Ne=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({})}return n})();var Co=pU();function tt(n){return new vi(n.get(Et),n.get(k$1))}var vi=class{_viewportRuler;_previousHTMLStyles={top:``,left:``};_previousScrollPosition;_isEnabled=!1;_document;constructor(t,e){this._viewportRuler=t,this._document=e}attach(){}enable(){if(this._canBeEnabled()){let t=this._document.documentElement;this._previousScrollPosition=this._viewportRuler.getViewportScrollPosition(),this._previousHTMLStyles.left=t.style.left||``,this._previousHTMLStyles.top=t.style.top||``,t.style.left=MU(-this._previousScrollPosition.left),t.style.top=MU(-this._previousScrollPosition.top),t.classList.add(`cdk-global-scrollblock`),this._isEnabled=!0}}disable(){if(this._isEnabled){let t=this._document.documentElement,e=this._document.body,i=t.style,r=e.style,o=i.scrollBehavior||``,a=r.scrollBehavior||``;this._isEnabled=!1,i.left=this._previousHTMLStyles.left,i.top=this._previousHTMLStyles.top,t.classList.remove(`cdk-global-scrollblock`),Co&&(i.scrollBehavior=r.scrollBehavior=`auto`),window.scroll(this._previousScrollPosition.left,this._previousScrollPosition.top),Co&&(i.scrollBehavior=o,r.scrollBehavior=a)}}_canBeEnabled(){if(this._document.documentElement.classList.contains(`cdk-global-scrollblock`)||this._isEnabled)return!1;let e=this._document.documentElement,i=this._viewportRuler.getViewportSize();return e.scrollHeight>i.height||e.scrollWidth>i.width}};function Oo(n,t){return new bi(n.get(gi),n.get(H),n.get(Et),t)}var bi=class{_scrollDispatcher;_ngZone;_viewportRuler;_config;_scrollSubscription=null;_overlayRef;_initialScrollPosition;constructor(t,e,i,r){this._scrollDispatcher=t,this._ngZone=e,this._viewportRuler=i,this._config=r}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(this._scrollSubscription)return;let t=this._scrollDispatcher.scrolled(0).pipe(wt$1(e=>!e||!this._overlayRef.overlayElement.contains(e.getElementRef().nativeElement)));this._config&&this._config.threshold&&this._config.threshold>1?(this._initialScrollPosition=this._viewportRuler.getViewportScrollPosition().top,this._scrollSubscription=t.subscribe(()=>{let e=this._viewportRuler.getViewportScrollPosition().top;Math.abs(e-this._initialScrollPosition)>this._config.threshold?this._detach():this._overlayRef.updatePosition()})):this._scrollSubscription=t.subscribe(this._detach)}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}_detach=()=>{this.disable(),this._overlayRef.hasAttached()&&this._ngZone.run(()=>this._overlayRef.detach())}};var Ot=class{enable(){}disable(){}attach(){}};function Nn(n,t){return t.some(e=>{let i=n.bottom<e.top,r=n.top>e.bottom,o=n.right<e.left,a=n.left>e.right;return i||r||o||a})}function wo(n,t){return t.some(e=>{let i=n.top<e.top,r=n.bottom>e.bottom,o=n.left<e.left,a=n.right>e.right;return i||r||o||a})}function No(n,t){return new yi(n.get(gi),n.get(Et),n.get(H),t)}var yi=class{_scrollDispatcher;_viewportRuler;_ngZone;_config;_scrollSubscription=null;_overlayRef;constructor(t,e,i,r){this._scrollDispatcher=t,this._viewportRuler=e,this._ngZone=i,this._config=r}attach(t){this._overlayRef,this._overlayRef=t}enable(){if(!this._scrollSubscription){let t=this._config?this._config.scrollThrottle:0;this._scrollSubscription=this._scrollDispatcher.scrolled(t).subscribe(()=>{if(this._overlayRef.updatePosition(),this._config&&this._config.autoClose){let e=this._overlayRef.overlayElement.getBoundingClientRect(),{width:i,height:r}=this._viewportRuler.getViewportSize();Nn(e,[{width:i,height:r,bottom:r,right:i,top:0,left:0}])&&(this.disable(),this._ngZone.run(()=>this._overlayRef.detach()))}})}}disable(){this._scrollSubscription&&(this._scrollSubscription.unsubscribe(),this._scrollSubscription=null)}detach(){this.disable(),this._overlayRef=null}};var Fo=(()=>{class n{_injector=h(X);noop=()=>new Ot;close=e=>Oo(this._injector,e);block=()=>tt(this._injector);reposition=e=>No(this._injector,e);static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var Je=class{positionStrategy;scrollStrategy=new Ot;panelClass=``;hasBackdrop=!1;backdropClass=`cdk-overlay-dark-backdrop`;disableAnimations;width;height;minWidth;minHeight;maxWidth;maxHeight;direction;disposeOnNavigation=!1;usePopover;eventPredicate;constructor(t){if(t){let e=Object.keys(t);for(let i of e)t[i]!==void 0&&(this[i]=t[i])}}};var xi=class{connectionPair;scrollableViewProperties;constructor(t,e){this.connectionPair=t,this.scrollableViewProperties=e}};var Po=(()=>{class n{_attachedOverlays=[];_document=h(k$1);_isAttached=!1;ngOnDestroy(){this.detach()}add(e){this.remove(e),this._attachedOverlays.push(e)}remove(e){let i=this._attachedOverlays.indexOf(e);i>-1&&this._attachedOverlays.splice(i,1),this._attachedOverlays.length===0&&this.detach()}canReceiveEvent(e,i,r){return r.observers.length<1?!1:e.eventPredicate?e.eventPredicate(i):!0}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var To=(()=>{class n extends Po{_ngZone=h(H);_renderer=h(lt).createRenderer(null,null);_cleanupKeydown;add(e){super.add(e),this._isAttached||(this._ngZone.runOutsideAngular(()=>{this._cleanupKeydown=this._renderer.listen(`body`,`keydown`,this._keydownListener)}),this._isAttached=!0)}detach(){this._isAttached&&(this._cleanupKeydown?.(),this._isAttached=!1)}_keydownListener=e=>{let i=this._attachedOverlays;for(let r=i.length-1;r>-1;r--){let o=i[r];if(this.canReceiveEvent(o,e,o._keydownEvents)){this._ngZone.run(()=>o._keydownEvents.next(e));break}}};static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var Ao=(()=>{class n extends Po{_platform=h(He);_ngZone=h(H);_renderer=h(lt).createRenderer(null,null);_cursorOriginalValue;_cursorStyleIsSet=!1;_pointerDownEventTarget=null;_cleanups;add(e){if(super.add(e),!this._isAttached){let i=this._document.body,r={capture:!0},o=this._renderer;this._cleanups=this._ngZone.runOutsideAngular(()=>[o.listen(i,`pointerdown`,this._pointerDownListener,r),o.listen(i,`click`,this._clickListener,r),o.listen(i,`auxclick`,this._clickListener,r),o.listen(i,`contextmenu`,this._clickListener,r)]),this._platform.IOS&&!this._cursorStyleIsSet&&(this._cursorOriginalValue=i.style.cursor,i.style.cursor=`pointer`,this._cursorStyleIsSet=!0),this._isAttached=!0}}detach(){this._isAttached&&(this._cleanups?.forEach(e=>e()),this._cleanups=void 0,this._platform.IOS&&this._cursorStyleIsSet&&(this._document.body.style.cursor=this._cursorOriginalValue,this._cursorStyleIsSet=!1),this._isAttached=!1)}_pointerDownListener=e=>{this._pointerDownEventTarget=vt(e)};_clickListener=e=>{let i=vt(e),r=e.type===`click`&&this._pointerDownEventTarget?this._pointerDownEventTarget:i;this._pointerDownEventTarget=null;let o=this._attachedOverlays.slice();for(let a=o.length-1;a>-1;a--){let l=o[a],d=l._outsidePointerEvents;if(!(!l.hasAttached()||!this.canReceiveEvent(l,e,d))){if(ko(l.overlayElement,i)||ko(l.overlayElement,r))break;this._ngZone?this._ngZone.run(()=>d.next(e)):d.next(e)}}};static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();function ko(n,t){let e=typeof ShadowRoot<`u`&&ShadowRoot,i=t;for(;i;){if(i===n)return!0;i=e&&i instanceof ShadowRoot?i.host:i.parentNode}return!1}var Io=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵcmp=pt({type:n,selectors:[[`ng-component`]],hostAttrs:[`cdk-overlay-style-loader`,``],decls:0,vars:0,template:function(i,r){},styles:[`.cdk-overlay-container, .cdk-global-overlay-wrapper {
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.cdk-overlay-container {
  position: fixed;
}
@layer cdk-overlay {
  .cdk-overlay-container {
    z-index: 1000;
  }
}
.cdk-overlay-container:empty {
  display: none;
}

.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
}
@layer cdk-overlay {
  .cdk-global-overlay-wrapper {
    z-index: 1000;
  }
}

.cdk-overlay-pane {
  position: absolute;
  pointer-events: auto;
  box-sizing: border-box;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
@layer cdk-overlay {
  .cdk-overlay-pane {
    z-index: 1000;
  }
}

.cdk-overlay-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: auto;
  -webkit-tap-highlight-color: transparent;
  opacity: 0;
  touch-action: manipulation;
}
@layer cdk-overlay {
  .cdk-overlay-backdrop {
    z-index: 1000;
    transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);
  }
}
@media (prefers-reduced-motion) {
  .cdk-overlay-backdrop {
    transition-duration: 1ms;
  }
}

.cdk-overlay-backdrop-showing {
  opacity: 1;
}
@media (forced-colors: active) {
  .cdk-overlay-backdrop-showing {
    opacity: 0.6;
  }
}

@layer cdk-overlay {
  .cdk-overlay-dark-backdrop {
    background: rgba(0, 0, 0, 0.32);
  }
}

.cdk-overlay-transparent-backdrop {
  transition: visibility 1ms linear, opacity 1ms linear;
  visibility: hidden;
  opacity: 1;
}
.cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing, .cdk-high-contrast-active .cdk-overlay-transparent-backdrop {
  opacity: 0;
  visibility: visible;
}

.cdk-overlay-backdrop-noop-animation {
  transition: none;
}

.cdk-overlay-connected-position-bounding-box {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
}
@layer cdk-overlay {
  .cdk-overlay-connected-position-bounding-box {
    z-index: 1000;
  }
}

.cdk-global-scrollblock {
  position: fixed;
  width: 100%;
  overflow-y: scroll;
}

.cdk-overlay-popover {
  background: none;
  border: none;
  padding: 0;
  outline: 0;
  overflow: visible;
  position: fixed;
  pointer-events: none;
  white-space: normal;
  color: inherit;
  text-decoration: none;
  width: 100%;
  height: 100%;
  inset: auto;
  top: 0;
  left: 0;
}
.cdk-overlay-popover::backdrop {
  display: none;
}
.cdk-overlay-popover .cdk-overlay-backdrop {
  position: fixed;
  z-index: auto;
}
`],encapsulation:2})}return n})();var wi=(()=>{class n{_platform=h(He);_containerElement;_document=h(k$1);_styleLoader=h(Po$1);ngOnDestroy(){this._containerElement?.remove()}getContainerElement(){return this._loadStyles(),this._containerElement||this._createContainer(),this._containerElement}_createContainer(){let e=`cdk-overlay-container`;if(this._platform.isBrowser||mU()){let r=this._document.querySelectorAll(`.${e}[platform="server"], .${e}[platform="test"]`);for(let o=0;o<r.length;o++)r[o].remove()}let i=this._document.createElement(`div`);i.classList.add(e),mU()?i.setAttribute(`platform`,`test`):this._platform.isBrowser||i.setAttribute(`platform`,`server`),this._document.body.appendChild(i),this._containerElement=i}_loadStyles(){this._styleLoader.load(Io)}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var Fn=class{_renderer;_ngZone;element;_cleanupClick;_cleanupTransitionEnd;_fallbackTimeout;constructor(t,e,i,r){this._renderer=e,this._ngZone=i,this.element=t.createElement(`div`),this.element.classList.add(`cdk-overlay-backdrop`),this._cleanupClick=e.listen(this.element,`click`,r)}detach(){this._ngZone.runOutsideAngular(()=>{let t=this.element;clearTimeout(this._fallbackTimeout),this._cleanupTransitionEnd?.(),this._cleanupTransitionEnd=this._renderer.listen(t,`transitionend`,this.dispose),this._fallbackTimeout=setTimeout(this.dispose,500),t.style.pointerEvents=`none`,t.classList.remove(`cdk-overlay-backdrop-showing`)})}dispose=()=>{clearTimeout(this._fallbackTimeout),this._cleanupClick?.(),this._cleanupTransitionEnd?.(),this._cleanupClick=this._cleanupTransitionEnd=this._fallbackTimeout=void 0,this.element.remove()}};function Pn(n){return n&&n.nodeType===1}var On=tr([]);var et=class{_portalOutlet;_host;_pane;_config;_ngZone;_keyboardDispatcher;_document;_location;_outsideClickDispatcher;_animationsDisabled;_injector;_renderer;_backdropClick=new z;_attachments=new z;_detachments=new z;_positionStrategy;_scrollStrategy;_locationChanges;_backdropRef=null;_detachContentMutationObserver;_detachContentAfterRenderRef;_disposed=!1;_previousHostParent;_keydownEvents=new z;_outsidePointerEvents=new z;_afterNextRenderRef;constructor(t,e,i,r,o,a,l,d,u,p=!1,b,M){this._portalOutlet=t,this._host=e,this._pane=i,this._config=r,this._ngZone=o,this._keyboardDispatcher=a,this._document=l,this._location=d,this._outsideClickDispatcher=u,this._animationsDisabled=p,this._injector=b,this._renderer=M,r.scrollStrategy&&(this._scrollStrategy=r.scrollStrategy,this._scrollStrategy.attach(this)),this._positionStrategy=r.positionStrategy}get overlayElement(){return this._pane}get backdropElement(){return this._backdropRef?.element||null}get hostElement(){return this._host}get eventPredicate(){return this._config?.eventPredicate||null}attach(t){if(this._disposed)return null;this._attachHost();let e=this._portalOutlet.attach(t);if(this._positionStrategy?.attach(this),this._updateStackingOrder(),this._updateElementSize(),this._updateElementDirection(),vr(()=>{On.update(i=>i.includes(this)?i:[...i,this])}),this._scrollStrategy&&this._scrollStrategy.enable(),this._afterNextRenderRef?.destroy(),this._afterNextRenderRef=xu(()=>{this.hasAttached()&&this.updatePosition()},{injector:this._injector}),this._togglePointerEvents(!0),this._config.hasBackdrop&&this._attachBackdrop(),this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!0),this._attachments.next(),this._completeDetachContent(),this._keyboardDispatcher.add(this),this._config.disposeOnNavigation===!0||this._config.disposeOnNavigation===`pop-state`){let i=this._location.subscribe(()=>this.dispose());this._locationChanges=()=>i.unsubscribe()}else this._config.disposeOnNavigation===`url-change`&&(this._locationChanges=this._location.onUrlChange(()=>this.dispose()));return this._outsideClickDispatcher.add(this),typeof e?.onDestroy==`function`&&e.onDestroy(()=>{this.hasAttached()&&this._ngZone.runOutsideAngular(()=>Promise.resolve().then(()=>this.detach()))}),e}detach(){if(!this.hasAttached())return;this.detachBackdrop(),this._togglePointerEvents(!1),this._positionStrategy&&this._positionStrategy.detach&&this._positionStrategy.detach(),this._scrollStrategy&&this._scrollStrategy.disable();let t=this._portalOutlet.detach();return this._detachments.next(),this._completeDetachContent(),this._keyboardDispatcher.remove(this),this._detachContentWhenEmpty(),this._locationChanges?.(),this._outsideClickDispatcher.remove(this),vr(()=>{On.update(e=>e.filter(i=>i!==this))}),t}dispose(){if(this._disposed)return;let t=this.hasAttached();this._positionStrategy&&this._positionStrategy.dispose(),this._disposeScrollStrategy(),this._backdropRef?.dispose(),this._locationChanges?.(),this._keyboardDispatcher.remove(this),this._portalOutlet.dispose(),this._attachments.complete(),this._backdropClick.complete(),this._keydownEvents.complete(),this._outsidePointerEvents.complete(),this._outsideClickDispatcher.remove(this),this._host?.remove(),this._afterNextRenderRef?.destroy(),this._previousHostParent=this._pane=this._host=this._backdropRef=null,t&&this._detachments.next(),this._detachments.complete(),this._completeDetachContent(),this._disposed=!0,vr(()=>{On.update(e=>e.filter(i=>i!==this))})}hasAttached(){return this._portalOutlet.hasAttached()}backdropClick(){return this._backdropClick}attachments(){return this._attachments}detachments(){return this._detachments}keydownEvents(){return this._keydownEvents}outsidePointerEvents(){return this._outsidePointerEvents}getConfig(){return this._config}updatePosition(){this._positionStrategy&&this._positionStrategy.apply()}updatePositionStrategy(t){t!==this._positionStrategy&&(this._positionStrategy&&this._positionStrategy.dispose(),this._positionStrategy=t,this.hasAttached()&&(t.attach(this),this.updatePosition()))}updateSize(t){this._config=k(k({},this._config),t),this._updateElementSize()}setDirection(t){this._config=l(k({},this._config),{direction:t}),this._updateElementDirection()}addPanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!0)}removePanelClass(t){this._pane&&this._toggleClasses(this._pane,t,!1)}getDirection(){let t=this._config.direction;return t?typeof t==`string`?t:t.value:`ltr`}updateScrollStrategy(t){t!==this._scrollStrategy&&(this._disposeScrollStrategy(),this._scrollStrategy=t,this.hasAttached()&&(t.attach(this),t.enable()))}_updateElementDirection(){this._host.setAttribute(`dir`,this.getDirection())}_updateElementSize(){if(!this._pane)return;let t=this._pane.style;t.width=MU(this._config.width),t.height=MU(this._config.height),t.minWidth=MU(this._config.minWidth),t.minHeight=MU(this._config.minHeight),t.maxWidth=MU(this._config.maxWidth),t.maxHeight=MU(this._config.maxHeight)}_togglePointerEvents(t){this._pane.style.pointerEvents=t?``:`none`}_attachHost(){if(!this._host.parentElement){let t=this._config.usePopover?this._positionStrategy?.getPopoverInsertionPoint?.():null;Pn(t)?t.after(this._host):t?.type===`parent`?t.element.appendChild(this._host):this._previousHostParent?.appendChild(this._host)}if(this._config.usePopover)try{this._host.showPopover()}catch{}}_attachBackdrop(){let t=`cdk-overlay-backdrop-showing`;this._backdropRef?.dispose(),this._backdropRef=new Fn(this._document,this._renderer,this._ngZone,e=>{this._backdropClick.next(e)}),this._animationsDisabled&&this._backdropRef.element.classList.add(`cdk-overlay-backdrop-noop-animation`),this._config.backdropClass&&this._toggleClasses(this._backdropRef.element,this._config.backdropClass,!0),this._config.usePopover?this._host.prepend(this._backdropRef.element):this._host.parentElement.insertBefore(this._backdropRef.element,this._host),!this._animationsDisabled&&typeof requestAnimationFrame<`u`?this._ngZone.runOutsideAngular(()=>{requestAnimationFrame(()=>this._backdropRef?.element.classList.add(t))}):this._backdropRef.element.classList.add(t)}_updateStackingOrder(){!this._config.usePopover&&this._host.nextSibling&&this._host.parentNode.appendChild(this._host)}detachBackdrop(){this._animationsDisabled?(this._backdropRef?.dispose(),this._backdropRef=null):this._backdropRef?.detach()}_toggleClasses(t,e,i){let r=Nl$1(e||[]).filter(o=>!!o);r.length&&(i?t.classList.add(...r):t.classList.remove(...r))}_detachContentWhenEmpty(){let t=!1;try{this._detachContentAfterRenderRef=xu(()=>{t=!0,this._detachContent()},{injector:this._injector})}catch(e){if(t)throw e;this._detachContent()}globalThis.MutationObserver&&this._pane&&(this._detachContentMutationObserver||=new globalThis.MutationObserver(()=>{this._detachContent()}),this._detachContentMutationObserver.observe(this._pane,{childList:!0}))}_detachContent(){(!this._pane||!this._host||this._pane.children.length===0)&&(this._pane&&this._config.panelClass&&this._toggleClasses(this._pane,this._config.panelClass,!1),this._host&&this._host.parentElement&&(this._previousHostParent=this._host.parentElement,this._host.remove()),this._completeDetachContent())}_completeDetachContent(){this._detachContentAfterRenderRef?.destroy(),this._detachContentAfterRenderRef=void 0,this._detachContentMutationObserver?.disconnect()}_disposeScrollStrategy(){let t=this._scrollStrategy;t?.disable(),t?.detach?.()}};var Mo=`cdk-overlay-connected-position-bounding-box`;var cl=/([A-Za-z%]+)$/;function Lo(n,t){return new Si(t,n.get(Et),n.get(k$1),n.get(He),n.get(wi))}var Si=class{_viewportRuler;_document;_platform;_overlayContainer;_overlayRef;_isInitialRender=!1;_lastBoundingBoxSize={width:0,height:0};_isPushed=!1;_canPush=!0;_growAfterOpen=!1;_hasFlexibleDimensions=!0;_positionLocked=!1;_originRect;_overlayRect;_viewportRect;_containerRect;_viewportMargin=0;_scrollables=[];_preferredPositions=[];_origin;_pane;_isDisposed=!1;_boundingBox=null;_lastPosition=null;_lastScrollVisibility=null;_positionChanges=new z;_resizeSubscription=te.EMPTY;_offsetX=0;_offsetY=0;_transformOriginSelector;_appliedPanelClasses=[];_previousPushAmount=null;_popoverLocation=`global`;positionChanges=this._positionChanges;get positions(){return this._preferredPositions}constructor(t,e,i,r,o){this._viewportRuler=e,this._document=i,this._platform=r,this._overlayContainer=o,this.setOrigin(t)}attach(t){this._overlayRef&&this._overlayRef,this._validatePositions(),t.hostElement.classList.add(Mo),this._overlayRef=t,this._boundingBox=t.hostElement,this._pane=t.overlayElement,this._isDisposed=!1,this._isInitialRender=!0,this._lastPosition=null,this._resizeSubscription.unsubscribe(),this._resizeSubscription=this._viewportRuler.change().subscribe(()=>{this._isInitialRender=!0,this.apply()})}apply(){if(this._isDisposed||!this._platform.isBrowser)return;if(!this._isInitialRender&&this._positionLocked&&this._lastPosition){this.reapplyLastPosition();return}this._clearPanelClasses(),this._resetOverlayElementStyles(),this._resetBoundingBoxStyles(),this._viewportRect=this._getNarrowedViewportRect(),this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._containerRect=this._getContainerRect();let t=this._originRect,e=this._overlayRect,i=this._viewportRect,r=this._containerRect,o=[],a;for(let l of this._preferredPositions){let d=this._getOriginPoint(t,r,l),u=this._getOverlayPoint(d,e,l),p=this._getOverlayFit(u,e,i,l);if(p.isCompletelyWithinViewport){this._isPushed=!1,this._applyPosition(l,d);return}if(this._canFitWithFlexibleDimensions(p,u,i)){o.push({position:l,origin:d,overlayRect:e,boundingBoxRect:this._calculateBoundingBoxRect(d,l)});continue}(!a||a.overlayFit.visibleArea<p.visibleArea)&&(a={overlayFit:p,overlayPoint:u,originPoint:d,position:l,overlayRect:e})}if(o.length){let l=null,d=-1;for(let u of o){let p=u.boundingBoxRect.width*u.boundingBoxRect.height*(u.position.weight||1);p>d&&(d=p,l=u)}this._isPushed=!1,this._applyPosition(l.position,l.origin);return}if(this._canPush){this._isPushed=!0,this._applyPosition(a.position,a.originPoint);return}this._applyPosition(a.position,a.originPoint)}detach(){this._clearPanelClasses(),this._lastPosition=null,this._previousPushAmount=null,this._resizeSubscription.unsubscribe()}dispose(){this._isDisposed||(this._boundingBox&&Fe(this._boundingBox.style,{top:``,left:``,right:``,bottom:``,height:``,width:``,alignItems:``,justifyContent:``}),this._pane&&this._resetOverlayElementStyles(),this._overlayRef&&this._overlayRef.hostElement.classList.remove(Mo),this.detach(),this._positionChanges.complete(),this._overlayRef=this._boundingBox=null,this._isDisposed=!0)}reapplyLastPosition(){if(this._isDisposed||!this._platform.isBrowser)return;let t=this._lastPosition;t?(this._originRect=this._getOriginRect(),this._overlayRect=this._pane.getBoundingClientRect(),this._viewportRect=this._getNarrowedViewportRect(),this._containerRect=this._getContainerRect(),this._applyPosition(t,this._getOriginPoint(this._originRect,this._containerRect,t))):this.apply()}withScrollableContainers(t){return this._scrollables=t,this}withPositions(t){return this._preferredPositions=t,t.indexOf(this._lastPosition)===-1&&(this._lastPosition=null),this._validatePositions(),this}withViewportMargin(t){return this._viewportMargin=t,this}withFlexibleDimensions(t=!0){return this._hasFlexibleDimensions=t,this}withGrowAfterOpen(t=!0){return this._growAfterOpen=t,this}withPush(t=!0){return this._canPush=t,this}withLockedPosition(t=!0){return this._positionLocked=t,this}setOrigin(t){return this._origin=t,this}withDefaultOffsetX(t){return this._offsetX=t,this}withDefaultOffsetY(t){return this._offsetY=t,this}withTransformOriginOn(t){return this._transformOriginSelector=t,this}withPopoverLocation(t){return this._popoverLocation=t,this}getPopoverInsertionPoint(){return this._popoverLocation===`global`?null:this._popoverLocation!==`inline`?this._popoverLocation:this._origin instanceof he?this._origin.nativeElement:Pn(this._origin)?this._origin:null}_getOriginPoint(t,e,i){let r;if(i.originX==`center`)r=t.left+t.width/2;else{let a=this._isRtl()?t.right:t.left,l=this._isRtl()?t.left:t.right;r=i.originX==`start`?a:l}e.left<0&&(r-=e.left);let o;return i.originY==`center`?o=t.top+t.height/2:o=i.originY==`top`?t.top:t.bottom,e.top<0&&(o-=e.top),{x:r,y:o}}_getOverlayPoint(t,e,i){let r;i.overlayX==`center`?r=-e.width/2:i.overlayX===`start`?r=this._isRtl()?-e.width:0:r=this._isRtl()?0:-e.width;let o;return i.overlayY==`center`?o=-e.height/2:o=i.overlayY==`top`?0:-e.height,{x:t.x+r,y:t.y+o}}_getOverlayFit(t,e,i,r){let o=Do(e),{x:a,y:l}=t,d=this._getOffset(r,`x`),u=this._getOffset(r,`y`);d&&(a+=d),u&&(l+=u);let p=0-a,b=a+o.width-i.width,M=0-l,I=l+o.height-i.height,V=this._subtractOverflows(o.width,p,b),Q=this._subtractOverflows(o.height,M,I),Tt=V*Q;return{visibleArea:Tt,isCompletelyWithinViewport:o.width*o.height===Tt,fitsInViewportVertically:Q===o.height,fitsInViewportHorizontally:V==o.width}}_canFitWithFlexibleDimensions(t,e,i){if(this._hasFlexibleDimensions){let r=i.bottom-e.y,o=i.right-e.x,a=Eo(this._overlayRef.getConfig().minHeight),l=Eo(this._overlayRef.getConfig().minWidth),d=t.fitsInViewportVertically||a!=null&&a<=r,u=t.fitsInViewportHorizontally||l!=null&&l<=o;return d&&u}return!1}_pushOverlayOnScreen(t,e,i){if(this._previousPushAmount&&this._positionLocked)return{x:t.x+this._previousPushAmount.x,y:t.y+this._previousPushAmount.y};let r=Do(e),o=this._viewportRect,a=Math.max(t.x+r.width-o.width,0),l=Math.max(t.y+r.height-o.height,0),d=Math.max(o.top-i.top-t.y,0),u=Math.max(o.left-i.left-t.x,0),p=0,b=0;return r.width<=o.width?p=u||-a:p=t.x<this._getViewportMarginStart()?o.left-i.left-t.x:0,r.height<=o.height?b=d||-l:b=t.y<this._getViewportMarginTop()?o.top-i.top-t.y:0,this._previousPushAmount={x:p,y:b},{x:t.x+p,y:t.y+b}}_applyPosition(t,e){if(this._setTransformOrigin(t),this._setOverlayElementStyles(e,t),this._setBoundingBoxStyles(e,t),t.panelClass&&this._addPanelClasses(t.panelClass),this._positionChanges.observers.length){let i=this._getScrollVisibility();if(t!==this._lastPosition||!this._lastScrollVisibility||!ml(this._lastScrollVisibility,i)){let r=new xi(t,i);this._positionChanges.next(r)}this._lastScrollVisibility=i}this._lastPosition=t,this._isInitialRender=!1}_setTransformOrigin(t){if(!this._transformOriginSelector)return;let e=this._boundingBox.querySelectorAll(this._transformOriginSelector),i,r=t.overlayY;t.overlayX===`center`?i=`center`:this._isRtl()?i=t.overlayX===`start`?`right`:`left`:i=t.overlayX===`start`?`left`:`right`;for(let o=0;o<e.length;o++)e[o].style.transformOrigin=`${i} ${r}`}_calculateBoundingBoxRect(t,e){let i=this._viewportRect,r=this._isRtl(),o,a,l;if(e.overlayY===`top`)a=t.y,o=i.height-a+this._getViewportMarginBottom();else if(e.overlayY===`bottom`)l=i.height-t.y+this._getViewportMarginTop()+this._getViewportMarginBottom(),o=i.height-l+this._getViewportMarginTop();else{let I=Math.min(i.bottom-t.y+i.top,t.y),V=this._lastBoundingBoxSize.height;o=I*2,a=t.y-I,o>V&&!this._isInitialRender&&!this._growAfterOpen&&(a=t.y-V/2)}let d=e.overlayX===`start`&&!r||e.overlayX===`end`&&r,u=e.overlayX===`end`&&!r||e.overlayX===`start`&&r,p,b,M;if(u)M=i.width-t.x+this._getViewportMarginStart()+this._getViewportMarginEnd(),p=t.x-this._getViewportMarginStart();else if(d)b=t.x,p=i.right-t.x-this._getViewportMarginEnd();else{let I=Math.min(i.right-t.x+i.left,t.x),V=this._lastBoundingBoxSize.width;p=I*2,b=t.x-I,p>V&&!this._isInitialRender&&!this._growAfterOpen&&(b=t.x-V/2)}return{top:a,left:b,bottom:l,right:M,width:p,height:o}}_setBoundingBoxStyles(t,e){let i=this._calculateBoundingBoxRect(t,e);!this._isInitialRender&&!this._growAfterOpen&&(i.height=Math.min(i.height,this._lastBoundingBoxSize.height),i.width=Math.min(i.width,this._lastBoundingBoxSize.width));let r={};if(this._hasExactPosition())r.top=r.left=`0`,r.bottom=r.right=`auto`,r.maxHeight=r.maxWidth=``,r.width=r.height=`100%`;else{let o=this._overlayRef.getConfig().maxHeight,a=this._overlayRef.getConfig().maxWidth;r.width=MU(i.width),r.height=MU(i.height),r.top=MU(i.top)||`auto`,r.bottom=MU(i.bottom)||`auto`,r.left=MU(i.left)||`auto`,r.right=MU(i.right)||`auto`,e.overlayX===`center`?r.alignItems=`center`:r.alignItems=e.overlayX===`end`?`flex-end`:`flex-start`,e.overlayY===`center`?r.justifyContent=`center`:r.justifyContent=e.overlayY===`bottom`?`flex-end`:`flex-start`,o&&(r.maxHeight=MU(o)),a&&(r.maxWidth=MU(a))}this._lastBoundingBoxSize=i,Fe(this._boundingBox.style,r)}_resetBoundingBoxStyles(){Fe(this._boundingBox.style,{top:`0`,left:`0`,right:`0`,bottom:`0`,height:``,width:``,alignItems:``,justifyContent:``})}_resetOverlayElementStyles(){Fe(this._pane.style,{top:``,left:``,bottom:``,right:``,position:``,transform:``})}_setOverlayElementStyles(t,e){let i={},r=this._hasExactPosition(),o=this._hasFlexibleDimensions,a=this._overlayRef.getConfig();if(r){let p=this._viewportRuler.getViewportScrollPosition();Fe(i,this._getExactOverlayY(e,t,p)),Fe(i,this._getExactOverlayX(e,t,p))}else i.position=`static`;let l=``,d=this._getOffset(e,`x`),u=this._getOffset(e,`y`);d&&(l+=`translateX(${d}px) `),u&&(l+=`translateY(${u}px)`),i.transform=l.trim(),a.maxHeight&&(r?i.maxHeight=MU(a.maxHeight):o&&(i.maxHeight=``)),a.maxWidth&&(r?i.maxWidth=MU(a.maxWidth):o&&(i.maxWidth=``)),Fe(this._pane.style,i)}_getExactOverlayY(t,e,i){let r={top:``,bottom:``},o=this._getOverlayPoint(e,this._overlayRect,t);if(this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i)),t.overlayY===`bottom`)r.bottom=`${this._document.documentElement.clientHeight-(o.y+this._overlayRect.height)}px`;else r.top=MU(o.y);return r}_getExactOverlayX(t,e,i){let r={left:``,right:``},o=this._getOverlayPoint(e,this._overlayRect,t);this._isPushed&&(o=this._pushOverlayOnScreen(o,this._overlayRect,i));let a;if(this._isRtl()?a=t.overlayX===`end`?`left`:`right`:a=t.overlayX===`end`?`right`:`left`,a===`right`)r.right=`${this._document.documentElement.clientWidth-(o.x+this._overlayRect.width)}px`;else r.left=MU(o.x);return r}_getScrollVisibility(){let t=this._getOriginRect(),e=this._pane.getBoundingClientRect(),i=this._scrollables.map(r=>r.getElementRef().nativeElement.getBoundingClientRect());return{isOriginClipped:wo(t,i),isOriginOutsideView:Nn(t,i),isOverlayClipped:wo(e,i),isOverlayOutsideView:Nn(e,i)}}_subtractOverflows(t,...e){return e.reduce((i,r)=>i-Math.max(r,0),t)}_getNarrowedViewportRect(){let t=this._document.documentElement.clientWidth,e=this._document.documentElement.clientHeight,i=this._viewportRuler.getViewportScrollPosition();return{top:i.top+this._getViewportMarginTop(),left:i.left+this._getViewportMarginStart(),right:i.left+t-this._getViewportMarginEnd(),bottom:i.top+e-this._getViewportMarginBottom(),width:t-this._getViewportMarginStart()-this._getViewportMarginEnd(),height:e-this._getViewportMarginTop()-this._getViewportMarginBottom()}}_isRtl(){return this._overlayRef.getDirection()===`rtl`}_hasExactPosition(){return!this._hasFlexibleDimensions||this._isPushed}_getOffset(t,e){return e===`x`?t.offsetX==null?this._offsetX:t.offsetX:t.offsetY==null?this._offsetY:t.offsetY}_validatePositions(){}_addPanelClasses(t){this._pane&&Nl$1(t).forEach(e=>{e!==``&&this._appliedPanelClasses.indexOf(e)===-1&&(this._appliedPanelClasses.push(e),this._pane.classList.add(e))})}_clearPanelClasses(){this._pane&&(this._appliedPanelClasses.forEach(t=>{this._pane.classList.remove(t)}),this._appliedPanelClasses=[])}_getViewportMarginStart(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.start??0}_getViewportMarginEnd(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.end??0}_getViewportMarginTop(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.top??0}_getViewportMarginBottom(){return typeof this._viewportMargin==`number`?this._viewportMargin:this._viewportMargin?.bottom??0}_getOriginRect(){let t=this._origin;if(t instanceof he)return t.nativeElement.getBoundingClientRect();if(t instanceof Element)return t.getBoundingClientRect();let e=t.width||0,i=t.height||0;return{top:t.y,bottom:t.y+i,left:t.x,right:t.x+e,height:i,width:e}}_getContainerRect(){let t=this._overlayRef.getConfig().usePopover&&this._popoverLocation!==`global`,e=this._overlayContainer.getContainerElement();t&&(e.style.display=`block`);let i=e.getBoundingClientRect();return t&&(e.style.display=``),i}};function Fe(n,t){for(let e in t)Object.hasOwn(t,e)&&(n[e]=t[e]);return n}function Eo(n){if(typeof n!=`number`&&n!=null){let[t,e]=n.split(cl);return!e||e===`px`?parseFloat(t):null}return n||null}function Do(n){return{top:Math.floor(n.top),right:Math.floor(n.right),bottom:Math.floor(n.bottom),left:Math.floor(n.left),width:Math.floor(n.width),height:Math.floor(n.height)}}function ml(n,t){return n===t?!0:n.isOriginClipped===t.isOriginClipped&&n.isOriginOutsideView===t.isOriginOutsideView&&n.isOverlayClipped===t.isOverlayClipped&&n.isOverlayOutsideView===t.isOverlayOutsideView}var Ro=`cdk-global-overlay-wrapper`;function it(n){return new Ci}var Ci=class{_overlayRef;_cssPosition=`static`;_topOffset=``;_bottomOffset=``;_alignItems=``;_xPosition=``;_xOffset=``;_width=``;_height=``;_isDisposed=!1;attach(t){let e=t.getConfig();this._overlayRef=t,this._width&&!e.width&&t.updateSize({width:this._width}),this._height&&!e.height&&t.updateSize({height:this._height}),t.hostElement.classList.add(Ro),this._isDisposed=!1}top(t=``){return this._bottomOffset=``,this._topOffset=t,this._alignItems=`flex-start`,this}left(t=``){return this._xOffset=t,this._xPosition=`left`,this}bottom(t=``){return this._topOffset=``,this._bottomOffset=t,this._alignItems=`flex-end`,this}right(t=``){return this._xOffset=t,this._xPosition=`right`,this}start(t=``){return this._xOffset=t,this._xPosition=`start`,this}end(t=``){return this._xOffset=t,this._xPosition=`end`,this}width(t=``){return this._overlayRef?this._overlayRef.updateSize({width:t}):this._width=t,this}height(t=``){return this._overlayRef?this._overlayRef.updateSize({height:t}):this._height=t,this}centerHorizontally(t=``){return this.left(t),this._xPosition=`center`,this}centerVertically(t=``){return this.top(t),this._alignItems=`center`,this}apply(){if(!this._overlayRef||!this._overlayRef.hasAttached())return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement.style,{width:r,height:o,maxWidth:a,maxHeight:l}=this._overlayRef.getConfig(),d=(r===`100%`||r===`100vw`)&&(!a||a===`100%`||a===`100vw`),u=(o===`100%`||o===`100vh`)&&(!l||l===`100%`||l===`100vh`),p=this._xPosition,b=this._xOffset,M=this._overlayRef.getConfig().direction===`rtl`,I=``,V=``,Q=``;d?Q=`flex-start`:p===`center`?(Q=`center`,M?V=b:I=b):M?p===`left`||p===`end`?(Q=`flex-end`,I=b):(p===`right`||p===`start`)&&(Q=`flex-start`,V=b):p===`left`||p===`start`?(Q=`flex-start`,I=b):(p===`right`||p===`end`)&&(Q=`flex-end`,V=b),t.position=this._cssPosition,t.marginLeft=d?`0`:I,t.marginTop=u?`0`:this._topOffset,t.marginBottom=this._bottomOffset,t.marginRight=d?`0`:V,e.justifyContent=Q,e.alignItems=u?`flex-start`:this._alignItems}dispose(){if(this._isDisposed||!this._overlayRef)return;let t=this._overlayRef.overlayElement.style,e=this._overlayRef.hostElement,i=e.style;e.classList.remove(Ro),i.justifyContent=i.alignItems=t.marginTop=t.marginBottom=t.marginLeft=t.marginRight=t.position=``,this._overlayRef=null,this._isDisposed=!0}};var zo=(()=>{class n{_injector=h(X);global(){return it()}flexibleConnectedTo(e){return Lo(this._injector,e)}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var Vo=new y(`OVERLAY_DEFAULT_CONFIG`);function ki(n,t){n.get(Po$1).load(Io);let e=n.get(wi),i=n.get(k$1),r=n.get(Ol$1),o=n.get(Cn$1),a=n.get(jC),l=n.get(as,null,{optional:!0})||n.get(lt).createRenderer(null,null),d=new Je(t),u=n.get(Vo,null,{optional:!0})?.usePopover??!0;d.direction=d.direction||a.value,!i.body||!(`showPopover`in i.body)?d.usePopover=!1:d.usePopover=t?.usePopover??u;let p=i.createElement(`div`),b=i.createElement(`div`);p.id=r.getId(`cdk-overlay-`),p.classList.add(`cdk-overlay-pane`),b.appendChild(p),d.usePopover&&(b.setAttribute(`popover`,`manual`),b.classList.add(`cdk-overlay-popover`));let M=d.usePopover?d.positionStrategy?.getPopoverInsertionPoint?.():null;return Pn(M)?M.after(b):M?.type===`parent`?M.element.appendChild(b):e.getContainerElement().appendChild(b),new et(new _i(p,o,n),b,p,d,n.get(H),n.get(To),i,n.get(im),n.get(Ao),t?.disableAnimations??n.get(Ic,null,{optional:!0})===`NoopAnimations`,n.get(ae),l)}var Bo=(()=>{class n{scrollStrategies=h(Fo);_positionBuilder=h(zo);_injector=h(X);create(e){return ki(this._injector,e)}position(){return this._positionBuilder}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var Nt=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({providers:[Bo],imports:[qs,Ne,Dn,Dn]})}return n})();var we=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;positionStrategy;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;scrollStrategy;closeOnNavigation=!0;closeOnDestroy=!0;closeOnOverlayDetachments=!0;disableAnimations=!1;providers;container;templateContext;bindings};var An=(()=>{class n extends Qe{_elementRef=h(he);_focusTrapFactory=h(NC);_config;_interactivityChecker=h(vC);_ngZone=h(H);_focusMonitor=h(pC);_renderer=h(as);_changeDetectorRef=h(Qb);_injector=h(X);_platform=h(He);_document=h(k$1);_portalOutlet;_focusTrapped=new z;_focusTrap=null;_elementFocusedBeforeDialogWasOpened=null;_closeInteractionType=null;_ariaLabelledByQueue=[];_isDestroyed=!1;constructor(){super(),this._config=h(we,{optional:!0})||new we,this._config.ariaLabelledBy&&this._ariaLabelledByQueue.push(this._config.ariaLabelledBy)}_addAriaLabelledBy(e){this._ariaLabelledByQueue.push(e),this._changeDetectorRef.markForCheck()}_removeAriaLabelledBy(e){let i=this._ariaLabelledByQueue.indexOf(e);i>-1&&(this._ariaLabelledByQueue.splice(i,1),this._changeDetectorRef.markForCheck())}_contentAttached(){this._initializeFocusTrap(),this._captureInitialFocus()}_captureInitialFocus(){this._trapFocus()}ngOnDestroy(){this._focusTrapped.complete(),this._isDestroyed=!0,this._restoreFocus()}attachComponentPortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachComponentPortal(e);return this._contentAttached(),i}attachTemplatePortal(e){this._portalOutlet.hasAttached();let i=this._portalOutlet.attachTemplatePortal(e);return this._contentAttached(),i}attachDomPortal=e=>{this._portalOutlet.hasAttached();let i=this._portalOutlet.attachDomPortal(e);return this._contentAttached(),i};_recaptureFocus(){this._containsFocus()||this._trapFocus()}_forceFocus(e,i){this._interactivityChecker.isFocusable(e)||(e.tabIndex=-1,this._ngZone.runOutsideAngular(()=>{let r=()=>{o(),a(),e.removeAttribute(`tabindex`)},o=this._renderer.listen(e,`blur`,r),a=this._renderer.listen(e,`mousedown`,r)})),e.focus(i)}_focusByCssSelector(e,i){let r=this._elementRef.nativeElement.querySelector(e);r&&this._forceFocus(r,i)}_trapFocus(e){this._isDestroyed||xu(()=>{let i=this._elementRef.nativeElement;switch(this._config.autoFocus){case!1:case`dialog`:this._containsFocus()||i.focus(e);break;case!0:case`first-tabbable`:this._focusTrap?.focusInitialElement(e)||this._focusDialogContainer(e);break;case`first-heading`:this._focusByCssSelector(`h1, h2, h3, h4, h5, h6, [role="heading"]`,e);break;default:this._focusByCssSelector(this._config.autoFocus,e)}this._focusTrapped.next()},{injector:this._injector})}_restoreFocus(){let e=this._config.restoreFocus,i=null;if(typeof e==`string`?i=this._document.querySelector(e):typeof e==`boolean`?i=e?this._elementFocusedBeforeDialogWasOpened:null:e&&(i=e),this._config.restoreFocus&&i&&typeof i.focus==`function`){let r=dC(),o=this._elementRef.nativeElement;(!r||r===this._document.body||r===o||o.contains(r))&&(this._focusMonitor?(this._focusMonitor.focusVia(i,this._closeInteractionType),this._closeInteractionType=null):i.focus())}this._focusTrap&&this._focusTrap.destroy()}_focusDialogContainer(e){this._elementRef.nativeElement.focus?.(e)}_containsFocus(){let e=this._elementRef.nativeElement,i=dC();return e===i||e.contains(i)}_initializeFocusTrap(){this._platform.isBrowser&&(this._focusTrap=this._focusTrapFactory.create(this._elementRef.nativeElement),this._document&&(this._elementFocusedBeforeDialogWasOpened=dC()))}static ɵfac=function(i){return new(i||n)};static ɵcmp=(function(){function e(i,r){}return pt({type:n,selectors:[[`cdk-dialog-container`]],viewQuery:function(r,o){if(r&1&&Cg(Rt,7),r&2){let a;z_(a=G_())&&(o._portalOutlet=a.first)}},hostAttrs:[`tabindex`,`-1`,1,`cdk-dialog-container`],hostVars:6,hostBindings:function(r,o){r&2&&Io$1(`id`,o._config.id||null)(`role`,o._config.role)(`aria-modal`,o._config.ariaModal)(`aria-labelledby`,o._config.ariaLabel?null:o._ariaLabelledByQueue[0])(`aria-label`,o._config.ariaLabel)(`aria-describedby`,o._config.ariaDescribedBy||null)},features:[fg],decls:1,vars:0,consts:[[`cdkPortalOutlet`,``]],template:function(r,o){r&1&&hg(0,e,0,0,`ng-template`,0)},dependencies:[Rt],styles:[`.cdk-dialog-container {
  display: block;
  width: 100%;
  height: 100%;
  min-height: inherit;
  max-height: inherit;
}
`],encapsulation:2,changeDetection:1})})()}return n})();var Pe=class{overlayRef;config;componentInstance=null;componentRef=null;containerInstance;disableClose;closed=new z;backdropClick;keydownEvents;outsidePointerEvents;id;_detachSubscription;constructor(t,e){this.overlayRef=t,this.config=e,this.disableClose=e.disableClose,this.backdropClick=t.backdropClick(),this.keydownEvents=t.keydownEvents(),this.outsidePointerEvents=t.outsidePointerEvents(),this.id=e.id,this.keydownEvents.subscribe(i=>{i.keyCode===27&&!this.disableClose&&!M2(i)&&(i.preventDefault(),this.close(void 0,{focusOrigin:`keyboard`}))}),this.backdropClick.subscribe(()=>{!this.disableClose&&this._canClose()?this.close(void 0,{focusOrigin:`mouse`}):this.containerInstance._recaptureFocus?.()}),this._detachSubscription=t.detachments().subscribe(()=>{e.closeOnOverlayDetachments!==!1&&this.close()})}close(t,e){if(this._canClose(t)){let i=this.closed;this.containerInstance._closeInteractionType=e?.focusOrigin||`program`,this._detachSubscription.unsubscribe(),this.overlayRef.dispose(),i.next(t),i.complete(),this.componentInstance=this.containerInstance=null}}updatePosition(){return this.overlayRef.updatePosition(),this}updateSize(t=``,e=``){return this.overlayRef.updateSize({width:t,height:e}),this}addPanelClass(t){return this.overlayRef.addPanelClass(t),this}removePanelClass(t){return this.overlayRef.removePanelClass(t),this}_canClose(t){let e=this.config;return!!this.containerInstance&&(!e.closePredicate||e.closePredicate(t,e,this.componentInstance))}};var fl=new y(`DialogScrollStrategy`,{providedIn:`root`,factory:()=>{let n=h(X);return()=>tt(n)}});var ul=new y(`DialogData`);var hl=new y(`DefaultDialogConfig`);function pl(n){let t=tr(n),e=new be;return{valueSignal:t,get value(){return t()},change:e,ngOnDestroy(){e.complete()}}}var In=(()=>{class n{_injector=h(X);_defaultOptions=h(hl,{optional:!0});_parentDialog=h(n,{optional:!0,skipSelf:!0});_overlayContainer=h(wi);_idGenerator=h(Ol$1);_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new z;_afterOpenedAtThisLevel=new z;_ariaHiddenElements=new Map;_scrollStrategy=h(fl);get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}afterAllClosed=jy(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(_a$1(void 0)));open(e,i){let r=this._defaultOptions||new we;i=k(k({},r),i),i.id=i.id||this._idGenerator.getId(`cdk-dialog-`),i.id&&this.getDialogById(i.id);let o=this._getOverlayConfig(i),a=ki(this._injector,o),l=new Pe(a,i),d=this._attachContainer(a,l,i);if(l.containerInstance=d,!this.openDialogs.length){let u=this._overlayContainer.getContainerElement();d._focusTrapped?d._focusTrapped.pipe(Kt(1)).subscribe(()=>{this._hideNonDialogContentFromAssistiveTechnology(u)}):this._hideNonDialogContentFromAssistiveTechnology(u)}return this._attachDialogContent(e,l,d,i),this.openDialogs.push(l),l.closed.subscribe(()=>this._removeOpenDialog(l,!0)),this.afterOpened.next(l),l}closeAll(){Tn(this.openDialogs,e=>e.close())}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){Tn(this._openDialogsAtThisLevel,e=>{e.config.closeOnDestroy===!1&&this._removeOpenDialog(e,!1)}),Tn(this._openDialogsAtThisLevel,e=>e.close()),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete(),this._openDialogsAtThisLevel=[]}_getOverlayConfig(e){let i=new Je({positionStrategy:e.positionStrategy||it().centerHorizontally().centerVertically(),scrollStrategy:e.scrollStrategy||this._scrollStrategy(),panelClass:e.panelClass,hasBackdrop:e.hasBackdrop,direction:e.direction,minWidth:e.minWidth,minHeight:e.minHeight,maxWidth:e.maxWidth,maxHeight:e.maxHeight,width:e.width,height:e.height,disposeOnNavigation:e.closeOnNavigation,disableAnimations:e.disableAnimations});return e.backdropClass&&(i.backdropClass=e.backdropClass),i}_attachContainer(e,i,r){let o=r.injector||r.viewContainerRef?.injector,a=[{provide:we,useValue:r},{provide:Pe,useValue:i},{provide:et,useValue:e}],l;r.container?typeof r.container==`function`?l=r.container:(l=r.container.type,a.push(...r.container.providers(r))):l=An;let d=new $e(l,r.viewContainerRef,X.create({parent:o||this._injector,providers:a}));return e.attach(d).instance}_attachDialogContent(e,i,r,o){if(e instanceof lr){let a=this._createInjector(o,i,r,void 0),l={$implicit:o.data,dialogRef:i};o.templateContext&&(l=k(k({},l),typeof o.templateContext==`function`?o.templateContext():o.templateContext)),r.attachTemplatePortal(new Ze(e,null,l,a))}else{let a=this._createInjector(o,i,r,this._injector),l=r.attachComponentPortal(new $e(e,o.viewContainerRef,a,null,o.bindings));i.componentRef=l,i.componentInstance=l.instance}}_createInjector(e,i,r,o){let a=e.injector||e.viewContainerRef?.injector,l=[{provide:ul,useValue:e.data},{provide:Pe,useValue:i}];return e.providers&&(typeof e.providers==`function`?l.push(...e.providers(i,e,r)):l.push(...e.providers)),e.direction&&(!a||!a.get(jC,null,{optional:!0}))&&l.push({provide:jC,useValue:pl(e.direction)}),X.create({parent:a||o,providers:l})}_removeOpenDialog(e,i){let r=this.openDialogs.indexOf(e);r>-1&&(this.openDialogs.splice(r,1),this.openDialogs.length||(this._ariaHiddenElements.forEach((o,a)=>{o?a.setAttribute(`aria-hidden`,o):a.removeAttribute(`aria-hidden`)}),this._ariaHiddenElements.clear(),i&&this._getAfterAllClosed().next()))}_hideNonDialogContentFromAssistiveTechnology(e){if(e.parentElement){let i=e.parentElement.children;for(let r=i.length-1;r>-1;r--){let o=i[r];o!==e&&o.nodeName!==`SCRIPT`&&o.nodeName!==`STYLE`&&!o.hasAttribute(`aria-live`)&&!o.hasAttribute(`popover`)&&(this._ariaHiddenElements.set(o,o.getAttribute(`aria-hidden`)),o.setAttribute(`aria-hidden`,`true`))}}}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();function Tn(n,t){let e=n.length;for(;e--;)t(n[e])}var jo=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({providers:[In],imports:[Nt,Ne,RC,Ne]})}return n})();var Ei=class{viewContainerRef;injector;id;role=`dialog`;panelClass=``;hasBackdrop=!0;backdropClass=``;disableClose=!1;closePredicate;width=``;height=``;minWidth;minHeight;maxWidth;maxHeight;position;data=null;direction;ariaDescribedBy=null;ariaLabelledBy=null;ariaLabel=null;ariaModal=!1;autoFocus=`first-tabbable`;restoreFocus=!0;delayFocusTrap=!0;scrollStrategy;closeOnNavigation=!0;enterAnimationDuration;exitAnimationDuration;bindings};var Ln=`mdc-dialog--open`;var Wo=`mdc-dialog--opening`;var Yo=`mdc-dialog--closing`;var gl=150;var _l=75;var vl=(()=>{class n extends An{_animationStateChanged=new be;_animationsEnabled=!ty();_actionSectionCount=0;_hostElement=this._elementRef.nativeElement;_enterAnimationDuration=this._animationsEnabled?Xo(this._config.enterAnimationDuration)??gl:0;_exitAnimationDuration=this._animationsEnabled?Xo(this._config.exitAnimationDuration)??_l:0;_animationTimer=null;_contentAttached(){super._contentAttached(),this._startOpenAnimation()}_startOpenAnimation(){this._animationStateChanged.emit({state:`opening`,totalTime:this._enterAnimationDuration}),this._animationsEnabled?(this._hostElement.style.setProperty(qo,`${this._enterAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Wo,Ln)),this._waitForAnimationToComplete(this._enterAnimationDuration,this._finishDialogOpen)):(this._hostElement.classList.add(Ln),Promise.resolve().then(()=>this._finishDialogOpen()))}_startExitAnimation(){this._animationStateChanged.emit({state:`closing`,totalTime:this._exitAnimationDuration}),this._hostElement.classList.remove(Ln),this._animationsEnabled?(this._hostElement.style.setProperty(qo,`${this._exitAnimationDuration}ms`),this._requestAnimationFrame(()=>this._hostElement.classList.add(Yo)),this._waitForAnimationToComplete(this._exitAnimationDuration,this._finishDialogClose)):Promise.resolve().then(()=>this._finishDialogClose())}_updateActionSectionCount(e){this._actionSectionCount+=e,this._changeDetectorRef.markForCheck()}_finishDialogOpen=()=>{this._clearAnimationClasses(),this._openAnimationDone(this._enterAnimationDuration)};_finishDialogClose=()=>{this._clearAnimationClasses(),this._animationStateChanged.emit({state:`closed`,totalTime:this._exitAnimationDuration})};_clearAnimationClasses(){this._hostElement.classList.remove(Wo,Yo)}_waitForAnimationToComplete(e,i){this._animationTimer!==null&&clearTimeout(this._animationTimer),this._animationTimer=setTimeout(i,e)}_requestAnimationFrame(e){this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame==`function`?requestAnimationFrame(e):e()})}_captureInitialFocus(){this._config.delayFocusTrap||this._trapFocus()}_openAnimationDone(e){this._config.delayFocusTrap&&this._trapFocus(),this._animationStateChanged.next({state:`opened`,totalTime:e})}ngOnDestroy(){super.ngOnDestroy(),this._animationTimer!==null&&clearTimeout(this._animationTimer)}attachComponentPortal(e){let i=super.attachComponentPortal(e);return i.location.nativeElement.classList.add(`mat-mdc-dialog-component-host`),i}static ɵfac=(()=>{let e;return function(r){return(e||(e=Op(n)))(r||n)}})();static ɵcmp=(function(){function e(i,r){}return pt({type:n,selectors:[[`mat-dialog-container`]],hostAttrs:[`tabindex`,`-1`,1,`mat-mdc-dialog-container`,`mdc-dialog`],hostVars:10,hostBindings:function(r,o){r&2&&(Ig(`id`,o._config.id),Io$1(`aria-modal`,o._config.ariaModal)(`role`,o._config.role)(`aria-labelledby`,o._config.ariaLabel?null:o._ariaLabelledByQueue[0])(`aria-label`,o._config.ariaLabel)(`aria-describedby`,o._config.ariaDescribedBy||null),yr(`_mat-animation-noopable`,!o._animationsEnabled)(`mat-mdc-dialog-container-with-actions`,o._actionSectionCount>0))},features:[fg],decls:3,vars:0,consts:[[1,`mat-mdc-dialog-inner-container`,`mdc-dialog__container`],[1,`mat-mdc-dialog-surface`,`mdc-dialog__surface`],[`cdkPortalOutlet`,``]],template:function(r,o){r&1&&(vs(0,`div`,0)(1,`div`,1),hg(2,e,0,0,`ng-template`,2),Qu()())},dependencies:[Rt],styles:[`.mat-mdc-dialog-container {
  width: 100%;
  height: 100%;
  display: block;
  box-sizing: border-box;
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  outline: 0;
}

.cdk-overlay-pane.mat-mdc-dialog-panel {
  max-width: var(--%NS%mat-dialog-container-max-width, 560px);
  min-width: var(--%NS%mat-dialog-container-min-width, 280px);
}
@media (max-width: 599px) {
  .cdk-overlay-pane.mat-mdc-dialog-panel {
    max-width: var(--%NS%mat-dialog-container-small-max-width, calc(100vw - 32px));
  }
}

.mat-mdc-dialog-inner-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  height: 100%;
  opacity: 0;
  transition: opacity linear var(--%NS%mat-dialog-transition-duration, 0ms);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
}
.mdc-dialog--closing .mat-mdc-dialog-inner-container {
  transition: opacity 75ms linear;
  transform: none;
}
.mdc-dialog--open .mat-mdc-dialog-inner-container {
  opacity: 1;
}
._mat-animation-noopable .mat-mdc-dialog-inner-container {
  transition: none;
}

.mat-mdc-dialog-surface {
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  position: relative;
  overflow-y: auto;
  outline: 0;
  transform: scale(0.8);
  transition: transform var(--%NS%mat-dialog-transition-duration, 0ms) cubic-bezier(0, 0, 0.2, 1);
  max-height: inherit;
  min-height: inherit;
  min-width: inherit;
  max-width: inherit;
  box-shadow: var(--%NS%mat-dialog-container-elevation-shadow, none);
  border-radius: var(--%NS%mat-dialog-container-shape, var(--%NS%mat-sys-corner-extra-large, 4px));
  background-color: var(--%NS%mat-dialog-container-color, var(--%NS%mat-sys-surface, white));
}
[dir=rtl] .mat-mdc-dialog-surface {
  text-align: right;
}
.mdc-dialog--open .mat-mdc-dialog-surface, .mdc-dialog--closing .mat-mdc-dialog-surface {
  transform: none;
}
._mat-animation-noopable .mat-mdc-dialog-surface {
  transition: none;
}
.mat-mdc-dialog-surface::before {
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  border: 2px solid transparent;
  border-radius: inherit;
  content: "";
  pointer-events: none;
}

.mat-mdc-dialog-title {
  display: block;
  position: relative;
  flex-shrink: 0;
  box-sizing: border-box;
  margin: 0 0 1px;
  padding: var(--%NS%mat-dialog-headline-padding, 6px 24px 13px);
}
.mat-mdc-dialog-title::before {
  display: inline-block;
  width: 0;
  height: 40px;
  content: "";
  vertical-align: 0;
}
[dir=rtl] .mat-mdc-dialog-title {
  text-align: right;
}
.mat-mdc-dialog-container .mat-mdc-dialog-title {
  color: var(--%NS%mat-dialog-subhead-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-dialog-subhead-font, var(--%NS%mat-sys-headline-small-font, inherit));
  line-height: var(--%NS%mat-dialog-subhead-line-height, var(--%NS%mat-sys-headline-small-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-subhead-size, var(--%NS%mat-sys-headline-small-size, 1rem));
  font-weight: var(--%NS%mat-dialog-subhead-weight, var(--%NS%mat-sys-headline-small-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-subhead-tracking, var(--%NS%mat-sys-headline-small-tracking, 0.03125em));
}

.mat-mdc-dialog-content {
  display: block;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  overflow: auto;
  max-height: 65vh;
}
.mat-mdc-dialog-content > :first-child {
  margin-top: 0;
}
.mat-mdc-dialog-content > :last-child {
  margin-bottom: 0;
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  color: var(--%NS%mat-dialog-supporting-text-color, var(--%NS%mat-sys-on-surface-variant, rgba(0, 0, 0, 0.6)));
  font-family: var(--%NS%mat-dialog-supporting-text-font, var(--%NS%mat-sys-body-medium-font, inherit));
  line-height: var(--%NS%mat-dialog-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height, 1.5rem));
  font-size: var(--%NS%mat-dialog-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 1rem));
  font-weight: var(--%NS%mat-dialog-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight, 400));
  letter-spacing: var(--%NS%mat-dialog-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking, 0.03125em));
}
.mat-mdc-dialog-container .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-content-padding, 20px 24px);
}
.mat-mdc-dialog-container-with-actions .mat-mdc-dialog-content {
  padding: var(--%NS%mat-dialog-with-actions-content-padding, 20px 24px 0);
}
.mat-mdc-dialog-container .mat-mdc-dialog-title + .mat-mdc-dialog-content {
  padding-top: 0;
}

.mat-mdc-dialog-actions {
  display: flex;
  position: relative;
  flex-shrink: 0;
  flex-wrap: wrap;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  margin: 0;
  border-top: 1px solid transparent;
  padding: var(--%NS%mat-dialog-actions-padding, 16px 24px);
  justify-content: var(--%NS%mat-dialog-actions-alignment, flex-end);
}
@media (forced-colors: active) {
  .mat-mdc-dialog-actions {
    border-top-color: CanvasText;
  }
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-start, .mat-mdc-dialog-actions[align=start] {
  justify-content: start;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-center, .mat-mdc-dialog-actions[align=center] {
  justify-content: center;
}
.mat-mdc-dialog-actions.mat-mdc-dialog-actions-align-end, .mat-mdc-dialog-actions[align=end] {
  justify-content: flex-end;
}
.mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
.mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 8px;
}
[dir=rtl] .mat-mdc-dialog-actions .mat-button-base + .mat-button-base,
[dir=rtl] .mat-mdc-dialog-actions .mat-mdc-button-base + .mat-mdc-button-base {
  margin-left: 0;
  margin-right: 8px;
}

.mat-mdc-dialog-component-host {
  display: contents;
}
`],encapsulation:2,changeDetection:1})})()}return n})();var qo=`--mat-dialog-transition-duration`;function Xo(n){return n==null?null:typeof n==`number`?n:n.endsWith(`ms`)?fC(n.substring(0,n.length-2)):n.endsWith(`s`)?fC(n.substring(0,n.length-1))*1e3:n===`0`?0:null}var Mi=(function(n){return n[n.OPEN=0]=`OPEN`,n[n.CLOSING=1]=`CLOSING`,n[n.CLOSED=2]=`CLOSED`,n})(Mi||{});var Ft=class{_ref;_config;_containerInstance;componentInstance;componentRef=null;disableClose;id;_afterOpened=new xr(1);_beforeClosed=new xr(1);_result;_closeFallbackTimeout;_state=Mi.OPEN;_closeInteractionType;constructor(t,e,i){this._ref=t,this._config=e,this._containerInstance=i,this.disableClose=e.disableClose,this.id=t.id,t.addPanelClass(`mat-mdc-dialog-panel`),i._animationStateChanged.pipe(wt$1(r=>r.state===`opened`),Kt(1)).subscribe(()=>{this._afterOpened.next(),this._afterOpened.complete()}),i._animationStateChanged.pipe(wt$1(r=>r.state===`closed`),Kt(1)).subscribe(()=>{clearTimeout(this._closeFallbackTimeout),this._finishDialogClose()}),t.overlayRef.detachments().subscribe(()=>{this._beforeClosed.next(this._result),this._beforeClosed.complete(),this._finishDialogClose()}),By(this.backdropClick(),this.keydownEvents().pipe(wt$1(r=>r.keyCode===27&&!this.disableClose&&!M2(r)))).subscribe(r=>{this.disableClose||(r.preventDefault(),Uo(this,r.type===`keydown`?`keyboard`:`mouse`))})}close(t){let e=this._config.closePredicate;e&&!e(t,this._config,this.componentInstance)||(this._result=t,this._containerInstance._animationStateChanged.pipe(wt$1(i=>i.state===`closing`),Kt(1)).subscribe(i=>{this._beforeClosed.next(t),this._beforeClosed.complete(),this._ref.overlayRef.detachBackdrop(),this._closeFallbackTimeout=setTimeout(()=>this._finishDialogClose(),i.totalTime+100)}),this._state=Mi.CLOSING,this._containerInstance._startExitAnimation())}afterOpened(){return this._afterOpened}afterClosed(){return this._ref.closed}beforeClosed(){return this._beforeClosed}backdropClick(){return this._ref.backdropClick}keydownEvents(){return this._ref.keydownEvents}updatePosition(t){let e=this._ref.config.positionStrategy;return t&&(t.left||t.right)?t.left?e.left(t.left):e.right(t.right):e.centerHorizontally(),t&&(t.top||t.bottom)?t.top?e.top(t.top):e.bottom(t.bottom):e.centerVertically(),this._ref.updatePosition(),this}updateSize(t=``,e=``){return this._ref.updateSize(t,e),this}addPanelClass(t){return this._ref.addPanelClass(t),this}removePanelClass(t){return this._ref.removePanelClass(t),this}getState(){return this._state}_finishDialogClose(){this._state=Mi.CLOSED,this._ref.close(this._result,{focusOrigin:this._closeInteractionType}),this.componentInstance=null}};function Uo(n,t,e){return n._closeInteractionType=t,n.close(e)}var zn=new y(`MatMdcDialogData`);var bl=new y(`mat-mdc-dialog-default-options`);var yl=new y(`mat-mdc-dialog-scroll-strategy`,{providedIn:`root`,factory:()=>{let n=h(X);return()=>tt(n)}});var Pt=(()=>{class n{_defaultOptions=h(bl,{optional:!0});_scrollStrategy=h(yl);_parentDialog=h(n,{optional:!0,skipSelf:!0});_idGenerator=h(Ol$1);_injector=h(X);_dialog=h(In);_animationsDisabled=ty();_openDialogsAtThisLevel=[];_afterAllClosedAtThisLevel=new z;_afterOpenedAtThisLevel=new z;dialogConfigClass=Ei;_dialogRefConstructor;_dialogContainerType;_dialogDataToken;get openDialogs(){return this._parentDialog?this._parentDialog.openDialogs:this._openDialogsAtThisLevel}get afterOpened(){return this._parentDialog?this._parentDialog.afterOpened:this._afterOpenedAtThisLevel}_getAfterAllClosed(){let e=this._parentDialog;return e?e._getAfterAllClosed():this._afterAllClosedAtThisLevel}afterAllClosed=jy(()=>this.openDialogs.length?this._getAfterAllClosed():this._getAfterAllClosed().pipe(_a$1(void 0)));constructor(){this._dialogRefConstructor=Ft,this._dialogContainerType=vl,this._dialogDataToken=zn}open(e,i){let r;i=k(k({},this._defaultOptions||new Ei),i),i.id=i.id||this._idGenerator.getId(`mat-mdc-dialog-`),i.scrollStrategy=i.scrollStrategy||this._scrollStrategy();let o=this._dialog.open(e,l(k({},i),{positionStrategy:it(this._injector).centerHorizontally().centerVertically(),disableClose:!0,closePredicate:void 0,closeOnDestroy:!1,closeOnOverlayDetachments:!1,disableAnimations:this._animationsDisabled||i.enterAnimationDuration?.toLocaleString()===`0`||i.exitAnimationDuration?.toString()===`0`,container:{type:this._dialogContainerType,providers:()=>[{provide:this.dialogConfigClass,useValue:i},{provide:we,useValue:i}]},templateContext:()=>({dialogRef:r}),providers:(a,l,d)=>(r=new this._dialogRefConstructor(a,i,d),r.updatePosition(i?.position),[{provide:this._dialogContainerType,useValue:d},{provide:this._dialogDataToken,useValue:l.data},{provide:this._dialogRefConstructor,useValue:r},{provide:Pe,useValue:null}])}));return r.componentRef=o.componentRef,r.componentInstance=o.componentInstance,this.openDialogs.push(r),this.afterOpened.next(r),r.afterClosed().subscribe(()=>{let a=this.openDialogs.indexOf(r);a>-1&&(this.openDialogs.splice(a,1),this.openDialogs.length||this._getAfterAllClosed().next())}),r}closeAll(){this._closeDialogs(this.openDialogs)}getDialogById(e){return this.openDialogs.find(i=>i.id===e)}ngOnDestroy(){this._closeDialogs(this._openDialogsAtThisLevel),this._afterAllClosedAtThisLevel.complete(),this._afterOpenedAtThisLevel.complete()}_closeDialogs(e){let i=e.length;for(;i--;)e[i].close()}static ɵfac=function(i){return new(i||n)};static ɵprov=P({token:n,factory:n.ɵfac})}return n})();var Ko=(()=>{class n{dialogRef=h(Ft,{optional:!0});_elementRef=h(he);_dialog=h(Pt);ariaLabel;type=`button`;dialogResult;_matDialogClose;ngOnInit(){this.dialogRef||(this.dialogRef=Jo(this._elementRef,this._dialog.openDialogs))}ngOnChanges(e){let i=e._matDialogClose;i&&(this.dialogResult=i.currentValue)}_onButtonClick(e){this._elementRef.nativeElement.getAttribute(`aria-disabled`)!==`true`&&Uo(this.dialogRef,e.screenX===0&&e.screenY===0?`keyboard`:`mouse`,this.dialogResult)}static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[``,`mat-dialog-close`,``],[``,`matDialogClose`,``]],hostVars:2,hostBindings:function(i,r){i&1&&bg(`click`,function(a){return r._onButtonClick(a)}),i&2&&Io$1(`aria-label`,r.ariaLabel||null)(`type`,r.type)},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],type:`type`,dialogResult:[0,`mat-dialog-close`,`dialogResult`],_matDialogClose:[0,`matDialogClose`,`_matDialogClose`]},exportAs:[`matDialogClose`],features:[Is]})}return n})();var Go=(()=>{class n{_dialogRef=h(Ft,{optional:!0});_elementRef=h(he);_dialog=h(Pt);ngOnInit(){this._dialogRef||(this._dialogRef=Jo(this._elementRef,this._dialog.openDialogs)),this._dialogRef&&Promise.resolve().then(()=>{this._onAdd()})}ngOnDestroy(){this._dialogRef?._containerInstance&&Promise.resolve().then(()=>{this._onRemove()})}static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n})}return n})();var $o=(()=>{class n extends Go{id=h(Ol$1).getId(`mat-mdc-dialog-title-`);_onAdd(){this._dialogRef._containerInstance?._addAriaLabelledBy?.(this.id)}_onRemove(){this._dialogRef?._containerInstance?._removeAriaLabelledBy?.(this.id)}static ɵfac=(()=>{let e;return function(r){return(e||(e=Op(n)))(r||n)}})();static ɵdir=ht({type:n,selectors:[[``,`mat-dialog-title`,``],[``,`matDialogTitle`,``]],hostAttrs:[1,`mat-mdc-dialog-title`,`mdc-dialog__title`],hostVars:1,hostBindings:function(i,r){i&2&&Ig(`id`,r.id)},inputs:{id:`id`},exportAs:[`matDialogTitle`],features:[fg]})}return n})();var Zo=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵdir=ht({type:n,selectors:[[``,`mat-dialog-content`,``],[`mat-dialog-content`],[``,`matDialogContent`,``]],hostAttrs:[1,`mat-mdc-dialog-content`,`mdc-dialog__content`],features:[p_([So])]})}return n})();var Qo=(()=>{class n extends Go{align;_onAdd(){this._dialogRef._containerInstance?._updateActionSectionCount?.(1)}_onRemove(){this._dialogRef._containerInstance?._updateActionSectionCount?.(-1)}static ɵfac=(()=>{let e;return function(r){return(e||(e=Op(n)))(r||n)}})();static ɵdir=ht({type:n,selectors:[[``,`mat-dialog-actions`,``],[`mat-dialog-actions`],[``,`matDialogActions`,``]],hostAttrs:[1,`mat-mdc-dialog-actions`,`mdc-dialog__actions`],hostVars:6,hostBindings:function(i,r){i&2&&yr(`mat-mdc-dialog-actions-align-start`,r.align===`start`)(`mat-mdc-dialog-actions-align-center`,r.align===`center`)(`mat-mdc-dialog-actions-align-end`,r.align===`end`)},inputs:{align:`align`},features:[fg]})}return n})();function Jo(n,t){let e=n.nativeElement.parentElement;for(;e&&!e.classList.contains(`mat-mdc-dialog-container`);)e=e.parentElement;return e?t.find(i=>i.id===e.id):null}var ea=(()=>{class n{static ɵfac=function(i){return new(i||n)};static ɵmod=me({type:n});static ɵinj=de$1({providers:[Pt],imports:[jo,Nt,Ne,qs]})}return n})();var Di=class n{data=h(zn);static ɵfac=function(e){return new(e||n)};static ɵcmp=pt({type:n,selectors:[[`app-confirm-dialog`]],decls:10,vars:5,consts:[[`mat-dialog-title`,``],[`align`,`end`],[`mat-button`,``,`cdkFocusInitial`,``,3,`mat-dialog-close`],[`mat-flat-button`,``,3,`mat-dialog-close`]],template:function(e,i){e&1&&(vs(0,`h2`,0),hb(1),Qu(),vs(2,`mat-dialog-content`)(3,`p`),hb(4),Qu()(),vs(5,`mat-dialog-actions`,1)(6,`button`,2),hb(7,`Cancel`),Qu(),vs(8,`button`,3),hb(9),Qu()()),e&2&&(ME(),Lg(i.data.title),ME(3),Lg(i.data.message),ME(2),yg(`mat-dialog-close`,!1),ME(2),yg(`mat-dialog-close`,!0),ME(),Lg(i.data.confirmLabel))},dependencies:[xc,Sc,ea,Ko,$o,Qo,Zo],encapsulation:2})};var Ri=class n{matDialog=h(Pt);async confirm(t){let e=this.matDialog.open(Di,{data:t,role:`alertdialog`,maxWidth:`calc(100vw - 32px)`});return await Ny(e.afterClosed())===!0}static ɵfac=function(e){return new(e||n)};static ɵprov=P({token:n,factory:n.ɵfac})};function na(n,t){return l(k({},t),{id:n.paragraphId??0,text:n.title.trim()})}var ra=(n,t)=>t.kind;function Cl(n,t){n&1&&(vs(0,`mat-hint`,2),hb(1),Qu()),n&2&&(ME(),Lg(t))}function wl(n,t){if(n&1&&(vs(0,`mat-error`),hb(1),Qu()),n&2){let e=t.$implicit;ME(),Lg(e.message)}}function kl(n,t){if(n&1&&(vs(0,`mat-error`),hb(1),Qu()),n&2){let e=t.$implicit;ME(),Lg(e.message)}}var Oi=class n{headerField=Sj.required();paragraphPreview=Sj(null);paragraphIdCommitted=Tj();deleted=Tj();deleteLabel=Tb(()=>{let t=this.headerField().title().value().trim();return t?`Delete header "${t}"`:`Delete header`});static ɵfac=function(e){return new(e||n)};static ɵcmp=pt({type:n,selectors:[[`app-header-row`]],hostAttrs:[`role`,`listitem`],hostVars:1,hostBindings:function(e,i){e&2&&Io$1(`data-header-key`,i.headerField()().value().key)},inputs:{headerField:[1,`headerField`],paragraphPreview:[1,`paragraphPreview`]},outputs:{paragraphIdCommitted:`paragraphIdCommitted`,deleted:`deleted`},decls:16,vars:4,consts:[[`subscriptSizing`,`dynamic`,1,`paragraph-id-field`],[`matInput`,``,`type`,`number`,`inputmode`,`numeric`,`step`,`1`,1,`paragraph-id-input`,3,`blur`,`keydown.enter`,`formField`],[1,`paragraph-preview`],[`subscriptSizing`,`dynamic`,1,`title-field`],[`matInput`,``,3,`formField`],[`mat-icon-button`,``,`type`,`button`,1,`delete-button`,3,`click`]],template:function(e,i){if(e&1&&(vs(0,`mat-form-field`,0)(1,`mat-label`),hb(2,`Paragraph ID`),Qu(),vs(3,`input`,1),DI(),bg(`blur`,function(o){return i.paragraphIdCommitted.emit(o)})(`keydown.enter`,function(o){return i.paragraphIdCommitted.emit(o)}),Qu(),M_(4,Cl,2,1,`mat-hint`,2),R_(5,wl,2,1,`mat-error`,null,ra),Qu(),vs(7,`mat-form-field`,3)(8,`mat-label`),hb(9,`Title`),Qu(),vs(10,`input`,4),DI(),Qu(),R_(11,kl,2,1,`mat-error`,null,ra),Qu(),vs(13,`button`,5),bg(`click`,function(){return i.deleted.emit()}),vs(14,`mat-icon`),hb(15,`delete`),Qu()()),e&2){let r;ME(3),yg(`formField`,i.headerField().paragraphId),II(),ME(),A_((r=i.paragraphPreview())?4:-1,r),ME(),O_(i.headerField().paragraphId().errors()),ME(5),yg(`formField`,i.headerField().title),II(),ME(),O_(i.headerField().title().errors()),ME(2),Io$1(`aria-label`,i.deleteLabel())}},dependencies:[mi,xc,Ei$1,Oe,Ge,Re,kt,Mt,dU,lU,pi,hi],styles:[`[_nghost-%COMP%]{display:flex;flex-wrap:wrap;align-items:flex-start;gap:8px 12px;padding:12px 0;border-bottom:1px solid var(--%NS%mat-sys-outline-variant)}.paragraph-id-field[_ngcontent-%COMP%]{flex:0 1 180px;min-width:140px}.title-field[_ngcontent-%COMP%]{flex:1 1 240px;min-width:0}.paragraph-preview[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:block;max-width:100%}.delete-button[_ngcontent-%COMP%]{margin-top:4px}.delete-button[_ngcontent-%COMP%]:hover, .delete-button[_ngcontent-%COMP%]:focus-visible{--%NS%mat-icon-button-icon-color: var(--%NS%mat-sys-error);--%NS%mat-icon-button-state-layer-color: var(--%NS%mat-sys-error)}`]})};var Ml=(n,t)=>t.kind;var El=(n,t)=>t().value().key;function Dl(n,t){n&1&&(vs(0,`p`,3)(1,`mat-icon`),hb(2,`info`),Qu(),vs(3,`span`),hb(4),Qu()()),n&2&&(ME(4),Lg(t))}function Rl(n,t){if(n&1&&(vs(0,`mat-error`),hb(1),Qu()),n&2){let e=t.$implicit;ME(),Lg(e.message)}}function Ol(n,t){n&1&&(vs(0,`p`,17),hb(1,`The book has no headers.`),Qu())}function Nl(n,t){if(n&1){let e=j_();vs(0,`app-header-row`,29),bg(`paragraphIdCommitted`,function(r){let o=nf(e).$implicit,a=H_(2);return rf(a.onParagraphIdCommitted(r,o().value().key))})(`deleted`,function(){let r=nf(e).$implicit,o=H_(2);return rf(o.deleteHeader(r().value().key))}),Qu()}if(n&2){let e=t.$implicit,i=H_(2);yg(`headerField`,e)(`paragraphPreview`,i.getParagraphPreview(e().value().paragraphId))}}function Fl(n,t){if(n&1&&(vs(0,`div`,18),R_(1,Nl,1,2,`app-header-row`,28,El),Qu()),n&2){let e=H_();ME(),O_(e.editorForm.headers)}}function Pl(n,t){n&1&&hb(0,` Fix the errors above to save the book. `)}function Tl(n,t){n&1&&hb(0,` Save downloads the .book.json file. `)}function Al(n,t){n&1&&hb(0,` All changes are saved. `)}function Il(n,t){n&1&&(vs(0,`p`,25),hb(1),Qu()),n&2&&(ME(),Lg(t))}var oa=class n{bookStore=h(Er);bookFilesService=h(qe$1);confirmDialogService=h(Ri);liveAnnouncer=h(xC);router=h(bt$1);injector=h(X);hostElement=h(he).nativeElement;openBook=Tb(()=>this.bookStore.openBook());book=Tb(()=>this.openBook().bookJson.book);sourceHeadersByKey=new Map;nextHeaderKey=0;editorModel=tr(this.createInitialFormValue());markedItems=tr(this.book().markedItems);translation=tr(this.book().translation);translationRevision=tr(0);savedSnapshot=tr(this.createSnapshot());existingParagraphIds=Tb(()=>new Set(this.book().content.map(t=>t.id)));firstLineByParagraphId=Tb(()=>new Map(this.book().content.map(t=>[t.id,t.text[0]??``])));duplicateParagraphIds=Tb(()=>Qt$1(this.editorModel().headers.map(t=>t.paragraphId)));editorForm=vn(this.editorModel,t=>{di(t.title,({value:e})=>e().trim()?null:{kind:`required`,message:`Title is required.`}),bn(t.headers,e=>{di(e.paragraphId,({value:i})=>{let r=i(),o=Kt$1(r,this.existingParagraphIds(),r!==null&&this.duplicateParagraphIds().has(r));return o?{kind:`paragraphId`,message:o}:null}),di(e.title,({value:i})=>{let r=Gt(i());return r?{kind:`required`,message:r}:null})})});saveError=tr(null);isDirty=Tb(()=>!this.openBook().isSaved||this.createSnapshot()!==this.savedSnapshot());bookSummary=Tb(()=>{let t=this.book(),e=t.content.reduce((i,r)=>i+r.text.length,0);return{paragraphCount:t.content.length,lineCount:e}});translatedLineCount=Tb(()=>Object.keys(this.translation()??{}).length);isImportingTranslation=tr(!1);translationErrors=tr([]);fileName=Tb(()=>this.openBook().fileName);notice=tr(this.openBook().notice??null);constructor(){this.editorForm().markAsTouched(),h(pe).onDestroy(()=>this.bookStore.close())}confirmLeave(){return this.isDirty()?this.confirmDialogService.confirm({title:`Leave without saving?`,message:`The book has unsaved changes. If you leave, they will be lost.`,confirmLabel:`Leave`}):!0}onBeforeUnload(t){this.isDirty()&&t.preventDefault()}getParagraphPreview(t){return t===null?null:this.firstLineByParagraphId().get(t)??null}addHeader(){let t=this.nextHeaderKey++;this.editorModel.update(e=>l(k({},e),{headers:[...e.headers,{key:t,paragraphId:null,title:``}]})),this.focusAfterRender(()=>this.hostElement.querySelector(`[data-header-key="${t}"] .paragraph-id-input`))}deleteHeader(t){let e=this.editorModel().headers,i=e.findIndex(o=>o.key===t),r=e[i+1]??e[i-1];this.sourceHeadersByKey.delete(t),this.editorModel.update(o=>l(k({},o),{headers:o.headers.filter(a=>a.key!==t)})),this.liveAnnouncer.announce(`Header deleted.`),this.focusAfterRender(()=>r?this.hostElement.querySelector(`[data-header-key="${r.key}"] .delete-button`):this.hostElement.querySelector(`.add-header-button`))}async deleteAllHeaders(){await this.confirmDialogService.confirm({title:`Delete all headers?`,message:`All ${this.editorModel().headers.length} headers will be deleted.`,confirmLabel:`Delete all`})&&(this.sourceHeadersByKey.clear(),this.editorModel.update(e=>l(k({},e),{headers:[]})),this.liveAnnouncer.announce(`All headers deleted.`),this.focusAfterRender(()=>this.hostElement.querySelector(`.add-header-button`)))}async deleteAllBookmarks(){await this.confirmDialogService.confirm({title:`Delete all bookmarks?`,message:`All ${this.markedItems().length} bookmarks will be deleted.`,confirmLabel:`Delete all`})&&(this.markedItems.set([]),this.liveAnnouncer.announce(`All bookmarks deleted.`))}onParagraphIdCommitted(t,e){let i=this.editorModel().headers,r=he$1(i,l=>l.paragraphId);if(r.every((l,d)=>l===i[d]))return;let o=t instanceof FocusEvent?t.relatedTarget:t.target,a=r.findIndex(l=>l.key===e)+1;this.editorModel.update(l$1=>l(k({},l$1),{headers:r})),this.liveAnnouncer.announce(`Headers sorted. This header is now ${a} of ${r.length}.`),o instanceof HTMLElement&&this.focusAfterRender(()=>o)}async importTranslation(t){let e=t[0];this.translationErrors.set([]),this.isImportingTranslation.set(!0);try{let i=await this.bookFilesService.readTranslationDocxFile(e);if(i.bookId.trim()!==this.book().id.trim()){this.translationErrors.set([{fileName:e.name,messages:[`This is a translation of a different book.`]}]);return}let r=Bn(i.paragraphs,this.book()),o=Pr$1(r);this.translation.set(r.translation),this.translationRevision.update(a=>a+1),this.notice.set(o),this.liveAnnouncer.announce(o)}catch(i){this.translationErrors.set([{fileName:e.name,messages:[Mr(i)]}])}finally{this.isImportingTranslation.set(!1)}}save(){if(!this.editorForm().invalid()){this.saveError.set(null);try{let t=this.createBookJson();this.bookFilesService.downloadBookJson(t,this.fileName()),this.bookStore.markSaved(t),this.savedSnapshot.set(this.createSnapshot()),this.liveAnnouncer.announce(`The book is saved.`)}catch{this.saveError.set(`The book could not be saved.`)}}}goBack(){this.router.navigateByUrl(`/`)}createInitialFormValue(){let t=this.book(),e=he$1(t.headers,i=>i.id).map(i=>{let r=this.nextHeaderKey++;return this.sourceHeadersByKey.set(r,i),{key:r,paragraphId:i.id,title:i.text}});return{title:t.title,headers:e}}createBookJson(){let t=this.editorModel(),e=this.openBook().bookJson;return l(k({},e),{book:l(k({},e.book),{title:t.title.trim(),markedItems:this.markedItems(),translation:this.translation(),headers:t.headers.map(i=>na(i,this.sourceHeadersByKey.get(i.key)))})})}createSnapshot(){let t=this.editorModel();return JSON.stringify({title:t.title,headers:t.headers.map(e=>[e.key,e.paragraphId,e.title]),markedItems:this.markedItems(),translationRevision:this.translationRevision()})}focusAfterRender(t){xu({read:()=>{let e=t();e?.isConnected&&e!==e.ownerDocument.activeElement&&e.focus()}},{injector:this.injector})}static ɵfac=function(e){return new(e||n)};static ɵcmp=pt({type:n,selectors:[[`app-editor-page`]],hostBindings:function(e,i){e&1&&bg(`beforeunload`,function(o){return i.onBeforeUnload(o)},WD)},decls:79,vars:18,consts:[[1,`page-header`],[`tabindex`,`-1`],[1,`file-name`],[`role`,`status`,1,`notice`],[`aria-labelledby`,`book-heading`],[`id`,`book-heading`],[1,`book-title-field`],[`matInput`,``,3,`formField`],[1,`book-summary`],[`aria-labelledby`,`translation-heading`],[`id`,`translation-heading`],[`id`,`translation-description`],[1,`actions`],[`label`,`Import translation`,`icon`,`translate`,`accept`,`.docx`,`appearance`,`outlined`,`describedBy`,`translation-description`,3,`filesSelected`,`disabled`],[`title`,`The translation could not be imported`,3,`fileErrors`],[`aria-labelledby`,`headers-heading`],[`id`,`headers-heading`],[1,`empty-text`],[`role`,`list`,`aria-labelledby`,`headers-heading`,1,`header-list`],[`matButton`,`tonal`,`type`,`button`,1,`add-header-button`,3,`click`],[`matButton`,`outlined`,`type`,`button`,3,`click`,`disabled`],[`aria-labelledby`,`bookmarks-heading`],[`id`,`bookmarks-heading`],[1,`save-bar`],[`id`,`save-status`,`aria-live`,`polite`,1,`save-status`],[`role`,`alert`,1,`save-error`],[`matButton`,`outlined`,`type`,`button`,3,`click`],[`matButton`,`filled`,`type`,`button`,`aria-describedby`,`save-status`,3,`click`,`disabled`],[3,`headerField`,`paragraphPreview`],[3,`paragraphIdCommitted`,`deleted`,`headerField`,`paragraphPreview`]],template:function(e,i){if(e&1&&(vs(0,`div`,0)(1,`h1`,1),hb(2,`Edit book`),Qu(),vs(3,`p`,2),hb(4),Qu()(),M_(5,Dl,5,1,`p`,3),vs(6,`section`,4)(7,`h2`,5),hb(8,`Book`),Qu(),vs(9,`mat-form-field`,6)(10,`mat-label`),hb(11,`Title`),Qu(),vs(12,`input`,7),DI(),Qu(),R_(13,Rl,2,1,`mat-error`,null,Ml),Qu(),vs(15,`dl`,8)(16,`div`)(17,`dt`),hb(18,`Paragraphs`),Qu(),vs(19,`dd`),hb(20),Qu()(),vs(21,`div`)(22,`dt`),hb(23,`Lines`),Qu(),vs(24,`dd`),hb(25),Qu()(),vs(26,`div`)(27,`dt`),hb(28,`Bookmarks`),Qu(),vs(29,`dd`),hb(30),Qu()()()(),vs(31,`section`,9)(32,`h2`,10),hb(33,`Translation`),Qu(),vs(34,`p`,11),hb(35),vs(36,`code`),hb(37,`.to-translate.docx`),Qu(),hb(38,` to replace the translation. `),Qu(),vs(39,`div`,12)(40,`app-file-picker-button`,13),bg(`filesSelected`,function(o){return i.importTranslation(o)}),Qu()(),vg(41,`app-file-errors`,14),Qu(),vs(42,`section`,15)(43,`h2`,16),hb(44),Qu(),M_(45,Ol,2,0,`p`,17)(46,Fl,3,0,`div`,18),vs(47,`div`,12)(48,`button`,19),bg(`click`,function(){return i.addHeader()}),vs(49,`mat-icon`),hb(50,`add`),Qu(),hb(51,` Add header `),Qu(),vs(52,`button`,20),bg(`click`,function(){return i.deleteAllHeaders()}),vs(53,`mat-icon`),hb(54,`delete_sweep`),Qu(),hb(55,` Delete all headers `),Qu()()(),vs(56,`section`,21)(57,`h2`,22),hb(58),Qu(),vs(59,`div`,12)(60,`button`,20),bg(`click`,function(){return i.deleteAllBookmarks()}),vs(61,`mat-icon`),hb(62,`bookmark_remove`),Qu(),hb(63,` Delete all bookmarks `),Qu()()(),vs(64,`div`,23)(65,`p`,24),M_(66,Pl,1,0)(67,Tl,1,0)(68,Al,1,0),Qu(),M_(69,Il,2,1,`p`,25),vs(70,`div`,12)(71,`button`,26),bg(`click`,function(){return i.goBack()}),vs(72,`mat-icon`),hb(73,`arrow_back`),Qu(),hb(74,` Back `),Qu(),vs(75,`button`,27),bg(`click`,function(){return i.save()}),vs(76,`mat-icon`),hb(77,`download`),Qu(),hb(78,` Save `),Qu()()()),e&2){let r,o;ME(4),Lg(i.fileName()),ME(),A_((r=i.notice())?5:-1,r),ME(7),yg(`formField`,i.editorForm.title),II(),ME(),O_(i.editorForm.title().errors()),ME(7),Lg(i.bookSummary().paragraphCount),ME(5),Lg(i.bookSummary().lineCount),ME(5),Lg(i.markedItems().length),ME(5),Pg(` `,i.translatedLineCount(),` of `,i.bookSummary().lineCount,` lines have a translation. Import a translated `),ME(5),yg(`disabled`,i.isImportingTranslation()),ME(),yg(`fileErrors`,i.translationErrors()),ME(3),rl$1(`Headers (`,i.editorModel().headers.length,`)`),ME(),A_(i.editorModel().headers.length===0?45:46),ME(7),yg(`disabled`,i.editorModel().headers.length===0),ME(6),rl$1(`Bookmarks (`,i.markedItems().length,`)`),ME(2),yg(`disabled`,i.markedItems().length===0),ME(6),A_(i.editorForm().invalid()?66:i.isDirty()?67:68),ME(3),A_((o=i.saveError())?69:-1,o),ME(6),yg(`disabled`,i.editorForm().invalid())}},dependencies:[Ge$1,Qe$1,mi,Oi,xc,Sc,Oe,Ge,Re,Mt,dU,lU,pi,hi],styles:[`.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:4px}.file-name[_ngcontent-%COMP%]{margin:0 0 8px;color:var(--%NS%mat-sys-on-surface-variant);overflow-wrap:anywhere}.notice[_ngcontent-%COMP%]{display:flex;gap:12px;margin:0 0 16px;padding:12px 16px;border-radius:12px;background-color:var(--%NS%mat-sys-secondary-container);color:var(--%NS%mat-sys-on-secondary-container)}.notice[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{flex-shrink:0}.book-title-field[_ngcontent-%COMP%]{width:100%}.book-summary[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px 24px;margin:8px 0 0}.book-summary[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-label-medium);color:var(--%NS%mat-sys-on-surface-variant)}.book-summary[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%]{margin:0;font:var(--%NS%mat-sys-title-medium)}.header-list[_ngcontent-%COMP%]{border-top:1px solid var(--%NS%mat-sys-outline-variant)}.empty-text[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.actions[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;margin:16px 0}.actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{min-height:44px}.save-bar[_ngcontent-%COMP%]{position:sticky;bottom:0;margin:24px -16px 0;padding:8px 16px;background-color:var(--%NS%mat-sys-surface-container);border-top:1px solid var(--%NS%mat-sys-outline-variant)}.save-bar[_ngcontent-%COMP%]   .actions[_ngcontent-%COMP%]{justify-content:flex-end;margin:8px 0}.save-status[_ngcontent-%COMP%]{margin:4px 0 0;color:var(--%NS%mat-sys-on-surface-variant)}.save-error[_ngcontent-%COMP%]{margin:4px 0 0;color:var(--%NS%mat-sys-error)}`]})};export{oa as EditorPage};