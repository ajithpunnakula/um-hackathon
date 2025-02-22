import{s as N,i as st,B as H,m as v,o as l,c as d,r as T,a as b,b as s,d as G,U,g as A,e as E,f as M,h as lt,j as R,R as ct,k as dt,w as _,l as C,n as F,F as I,p as V,t as x,v as J,q as ut,u as $,x as Q,y as pt,z as B,A as vt,C as ht,D as ft,E as W,G as P,H as w,I as Y,J as Z}from"./index-DUm2uLGw.js";import{_ as bt}from"./_plugin-vue_export-helper-DlAUqK2U.js";var mt={name:"BaseEditableHolder",extends:N,emits:["update:modelValue","value-change"],props:{modelValue:{type:null,default:void 0},defaultValue:{type:null,default:void 0},name:{type:String,default:void 0},invalid:{type:Boolean,default:void 0},disabled:{type:Boolean,default:!1},formControl:{type:Object,default:void 0}},inject:{$parentInstance:{default:void 0},$pcForm:{default:void 0},$pcFormField:{default:void 0}},data:function(){return{d_value:this.defaultValue||this.modelValue}},watch:{modelValue:function(t){this.d_value=t},defaultValue:function(t){this.d_value=t},$formName:{immediate:!0,handler:function(t){var n,a;this.formField=((n=this.$pcForm)===null||n===void 0||(a=n.register)===null||a===void 0?void 0:a.call(n,t,this.$formControl))||{}}},$formControl:{immediate:!0,handler:function(t){var n,a;this.formField=((n=this.$pcForm)===null||n===void 0||(a=n.register)===null||a===void 0?void 0:a.call(n,this.$formName,t))||{}}},$formDefaultValue:{immediate:!0,handler:function(t){this.d_value!==t&&(this.d_value=t)}}},formField:{},methods:{writeValue:function(t,n){var a,o;this.controlled&&(this.d_value=t,this.$emit("update:modelValue",t)),this.$emit("value-change",t),(a=(o=this.formField).onChange)===null||a===void 0||a.call(o,{originalEvent:n,value:t})}},computed:{$filled:function(){return st(this.d_value)},$invalid:function(){var t,n,a,o;return(t=(n=this.invalid)!==null&&n!==void 0?n:(a=this.$pcFormField)===null||a===void 0||(a=a.$field)===null||a===void 0?void 0:a.invalid)!==null&&t!==void 0?t:(o=this.$pcForm)===null||o===void 0||(o=o.states)===null||o===void 0||(o=o[this.$formName])===null||o===void 0?void 0:o.invalid},$formName:function(){var t;return this.name||((t=this.$formControl)===null||t===void 0?void 0:t.name)},$formControl:function(){var t;return this.formControl||((t=this.$pcFormField)===null||t===void 0?void 0:t.formControl)},$formDefaultValue:function(){var t,n,a,o;return(t=(n=this.d_value)!==null&&n!==void 0?n:(a=this.$pcFormField)===null||a===void 0?void 0:a.initialValue)!==null&&t!==void 0?t:(o=this.$pcForm)===null||o===void 0||(o=o.initialValues)===null||o===void 0?void 0:o[this.$formName]},controlled:function(){return this.$inProps.hasOwnProperty("modelValue")||!this.$inProps.hasOwnProperty("modelValue")&&!this.$inProps.hasOwnProperty("defaultValue")},filled:function(){return this.$filled}}},gt={name:"BaseInput",extends:mt,props:{size:{type:String,default:null},fluid:{type:Boolean,default:null},variant:{type:String,default:null}},inject:{$parentInstance:{default:void 0},$pcFluid:{default:void 0}},computed:{$variant:function(){var t;return(t=this.variant)!==null&&t!==void 0?t:this.$primevue.config.inputStyle||this.$primevue.config.inputVariant},$fluid:function(){var t;return(t=this.fluid)!==null&&t!==void 0?t:!!this.$pcFluid},hasFluid:function(){return this.$fluid}}},yt=function(t){var n=t.dt;return`
.p-inputtext {
    font-family: inherit;
    font-feature-settings: inherit;
    font-size: 1rem;
    color: `.concat(n("inputtext.color"),`;
    background: `).concat(n("inputtext.background"),`;
    padding-block: `).concat(n("inputtext.padding.y"),`;
    padding-inline: `).concat(n("inputtext.padding.x"),`;
    border: 1px solid `).concat(n("inputtext.border.color"),`;
    transition: background `).concat(n("inputtext.transition.duration"),", color ").concat(n("inputtext.transition.duration"),", border-color ").concat(n("inputtext.transition.duration"),", outline-color ").concat(n("inputtext.transition.duration"),", box-shadow ").concat(n("inputtext.transition.duration"),`;
    appearance: none;
    border-radius: `).concat(n("inputtext.border.radius"),`;
    outline-color: transparent;
    box-shadow: `).concat(n("inputtext.shadow"),`;
}

.p-inputtext:enabled:hover {
    border-color: `).concat(n("inputtext.hover.border.color"),`;
}

.p-inputtext:enabled:focus {
    border-color: `).concat(n("inputtext.focus.border.color"),`;
    box-shadow: `).concat(n("inputtext.focus.ring.shadow"),`;
    outline: `).concat(n("inputtext.focus.ring.width")," ").concat(n("inputtext.focus.ring.style")," ").concat(n("inputtext.focus.ring.color"),`;
    outline-offset: `).concat(n("inputtext.focus.ring.offset"),`;
}

.p-inputtext.p-invalid {
    border-color: `).concat(n("inputtext.invalid.border.color"),`;
}

.p-inputtext.p-variant-filled {
    background: `).concat(n("inputtext.filled.background"),`;
}

.p-inputtext.p-variant-filled:enabled:hover {
    background: `).concat(n("inputtext.filled.hover.background"),`;
}

.p-inputtext.p-variant-filled:enabled:focus {
    background: `).concat(n("inputtext.filled.focus.background"),`;
}

.p-inputtext:disabled {
    opacity: 1;
    background: `).concat(n("inputtext.disabled.background"),`;
    color: `).concat(n("inputtext.disabled.color"),`;
}

.p-inputtext::placeholder {
    color: `).concat(n("inputtext.placeholder.color"),`;
}

.p-inputtext.p-invalid::placeholder {
    color: `).concat(n("inputtext.invalid.placeholder.color"),`;
}

.p-inputtext-sm {
    font-size: `).concat(n("inputtext.sm.font.size"),`;
    padding-block: `).concat(n("inputtext.sm.padding.y"),`;
    padding-inline: `).concat(n("inputtext.sm.padding.x"),`;
}

.p-inputtext-lg {
    font-size: `).concat(n("inputtext.lg.font.size"),`;
    padding-block: `).concat(n("inputtext.lg.padding.y"),`;
    padding-inline: `).concat(n("inputtext.lg.padding.x"),`;
}

.p-inputtext-fluid {
    width: 100%;
}
`)},wt={root:function(t){var n=t.instance,a=t.props;return["p-inputtext p-component",{"p-filled":n.$filled,"p-inputtext-sm p-inputfield-sm":a.size==="small","p-inputtext-lg p-inputfield-lg":a.size==="large","p-invalid":n.$invalid,"p-variant-filled":n.$variant==="filled","p-inputtext-fluid":n.$fluid}]}},xt=H.extend({name:"inputtext",theme:yt,classes:wt}),$t={name:"BaseInputText",extends:gt,style:xt,provide:function(){return{$pcInputText:this,$parentInstance:this}}},z={name:"InputText",extends:$t,inheritAttrs:!1,methods:{onInput:function(t){this.writeValue(t.target.value,t)}},computed:{attrs:function(){return v(this.ptmi("root",{context:{filled:this.$filled,disabled:this.disabled}}),this.formField)}}},Tt=["value","disabled","aria-invalid"];function kt(e,t,n,a,o,i){return l(),d("input",v({type:"text",class:e.cx("root"),value:e.d_value,disabled:e.disabled,"aria-invalid":e.$invalid||void 0,onInput:t[0]||(t[0]=function(){return i.onInput&&i.onInput.apply(i,arguments)})},i.attrs),null,16,Tt)}z.render=kt;var Pt=function(t){var n=t.dt;return`
.p-card {
    background: `.concat(n("card.background"),`;
    color: `).concat(n("card.color"),`;
    box-shadow: `).concat(n("card.shadow"),`;
    border-radius: `).concat(n("card.border.radius"),`;
    display: flex;
    flex-direction: column;
}

.p-card-caption {
    display: flex;
    flex-direction: column;
    gap: `).concat(n("card.caption.gap"),`;
}

.p-card-body {
    padding: `).concat(n("card.body.padding"),`;
    display: flex;
    flex-direction: column;
    gap: `).concat(n("card.body.gap"),`;
}

.p-card-title {
    font-size: `).concat(n("card.title.font.size"),`;
    font-weight: `).concat(n("card.title.font.weight"),`;
}

.p-card-subtitle {
    color: `).concat(n("card.subtitle.color"),`;
}
`)},Ct={root:"p-card p-component",header:"p-card-header",body:"p-card-body",caption:"p-card-caption",title:"p-card-title",subtitle:"p-card-subtitle",content:"p-card-content",footer:"p-card-footer"},It=H.extend({name:"card",theme:Pt,classes:Ct}),St={name:"BaseCard",extends:N,style:It,provide:function(){return{$pcCard:this,$parentInstance:this}}},L={name:"Card",extends:St,inheritAttrs:!1};function Bt(e,t,n,a,o,i){return l(),d("div",v({class:e.cx("root")},e.ptmi("root")),[e.$slots.header?(l(),d("div",v({key:0,class:e.cx("header")},e.ptm("header")),[T(e.$slots,"header")],16)):b("",!0),s("div",v({class:e.cx("body")},e.ptm("body")),[e.$slots.title||e.$slots.subtitle?(l(),d("div",v({key:0,class:e.cx("caption")},e.ptm("caption")),[e.$slots.title?(l(),d("div",v({key:0,class:e.cx("title")},e.ptm("title")),[T(e.$slots,"title")],16)):b("",!0),e.$slots.subtitle?(l(),d("div",v({key:1,class:e.cx("subtitle")},e.ptm("subtitle")),[T(e.$slots,"subtitle")],16)):b("",!0)],16)):b("",!0),s("div",v({class:e.cx("content")},e.ptm("content")),[T(e.$slots,"content")],16),e.$slots.footer?(l(),d("div",v({key:1,class:e.cx("footer")},e.ptm("footer")),[T(e.$slots,"footer")],16)):b("",!0)],16)],16)}L.render=Bt;var X={name:"ChevronLeftIcon",extends:G};function At(e,t,n,a,o,i){return l(),d("svg",v({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[s("path",{d:"M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z",fill:"currentColor"},null,-1)]),16)}X.render=At;var tt={name:"ChevronRightIcon",extends:G};function _t(e,t,n,a,o,i){return l(),d("svg",v({width:"14",height:"14",viewBox:"0 0 14 14",fill:"none",xmlns:"http://www.w3.org/2000/svg"},e.pti()),t[0]||(t[0]=[s("path",{d:"M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z",fill:"currentColor"},null,-1)]),16)}tt.render=_t;var Ft=function(t){var n=t.dt;return`
.p-tabview-tablist-container {
    position: relative;
}

.p-tabview-scrollable > .p-tabview-tablist-container {
    overflow: hidden;
}

.p-tabview-tablist-scroll-container {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    scrollbar-width: none;
    overscroll-behavior: contain auto;
}

.p-tabview-tablist-scroll-container::-webkit-scrollbar {
    display: none;
}

.p-tabview-tablist {
    display: flex;
    margin: 0;
    padding: 0;
    list-style-type: none;
    flex: 1 1 auto;
    background: `.concat(n("tabview.tab.list.background"),`;
    border: 1px solid `).concat(n("tabview.tab.list.border.color"),`;
    border-width: 0 0 1px 0;
    position: relative;
}

.p-tabview-tab-header {
    cursor: pointer;
    user-select: none;
    display: flex;
    align-items: center;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: transparent transparent `).concat(n("tabview.tab.border.color"),` transparent;
    color: `).concat(n("tabview.tab.color"),`;
    padding: 1rem 1.125rem;
    font-weight: 600;
    border-top-right-radius: `).concat(n("border.radius.md"),`;
    border-top-left-radius: `).concat(n("border.radius.md"),`;
    transition: color `).concat(n("tabview.transition.duration"),", outline-color ").concat(n("tabview.transition.duration"),`;
    margin: 0 0 -1px 0;
    outline-color: transparent;
}

.p-tabview-tablist-item:not(.p-disabled) .p-tabview-tab-header:focus-visible {
    outline: `).concat(n("focus.ring.width")," ").concat(n("focus.ring.style")," ").concat(n("focus.ring.color"),`;
    outline-offset: -1px;
}

.p-tabview-tablist-item:not(.p-highlight):not(.p-disabled):hover > .p-tabview-tab-header {
    color: `).concat(n("tabview.tab.hover.color"),`;
}

.p-tabview-tablist-item.p-highlight > .p-tabview-tab-header {
    color: `).concat(n("tabview.tab.active.color"),`;
}

.p-tabview-tab-title {
    line-height: 1;
    white-space: nowrap;
}

.p-tabview-next-button,
.p-tabview-prev-button {
    position: absolute;
    top: 0;
    margin: 0;
    padding: 0;
    z-index: 2;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: `).concat(n("tabview.nav.button.background"),`;
    color: `).concat(n("tabview.nav.button.color"),`;
    width: 2.5rem;
    border-radius: 0;
    outline-color: transparent;
    transition: color `).concat(n("tabview.transition.duration"),", outline-color ").concat(n("tabview.transition.duration"),`;
    box-shadow: `).concat(n("tabview.nav.button.shadow"),`;
    border: none;
    cursor: pointer;
    user-select: none;
}

.p-tabview-next-button:focus-visible,
.p-tabview-prev-button:focus-visible {
    outline: `).concat(n("focus.ring.width")," ").concat(n("focus.ring.style")," ").concat(n("focus.ring.color"),`;
    outline-offset: `).concat(n("focus.ring.offset"),`;
}

.p-tabview-next-button:hover,
.p-tabview-prev-button:hover {
    color: `).concat(n("tabview.nav.button.hover.color"),`;
}

.p-tabview-prev-button {
    left: 0;
}

.p-tabview-next-button {
    right: 0;
}

.p-tabview-panels {
    background: `).concat(n("tabview.tab.panel.background"),`;
    color: `).concat(n("tabview.tab.panel.color"),`;
    padding: 0.875rem 1.125rem 1.125rem 1.125rem;
}

.p-tabview-ink-bar {
    z-index: 1;
    display: block;
    position: absolute;
    bottom: -1px;
    height: 1px;
    background: `).concat(n("tabview.tab.active.border.color"),`;
    transition: 250ms cubic-bezier(0.35, 0, 0.25, 1);
}
`)},Vt={root:function(t){var n=t.props;return["p-tabview p-component",{"p-tabview-scrollable":n.scrollable}]},navContainer:"p-tabview-tablist-container",prevButton:"p-tabview-prev-button",navContent:"p-tabview-tablist-scroll-container",nav:"p-tabview-tablist",tab:{header:function(t){var n=t.instance,a=t.tab,o=t.index;return["p-tabview-tablist-item",n.getTabProp(a,"headerClass"),{"p-tabview-tablist-item-active":n.d_activeIndex===o,"p-disabled":n.getTabProp(a,"disabled")}]},headerAction:"p-tabview-tab-header",headerTitle:"p-tabview-tab-title",content:function(t){var n=t.instance,a=t.tab;return["p-tabview-panel",n.getTabProp(a,"contentClass")]}},inkbar:"p-tabview-ink-bar",nextButton:"p-tabview-next-button",panelContainer:"p-tabview-panels"},Dt=H.extend({name:"tabview",theme:Ft,classes:Vt}),Et={name:"BaseTabView",extends:N,props:{activeIndex:{type:Number,default:0},lazy:{type:Boolean,default:!1},scrollable:{type:Boolean,default:!1},tabindex:{type:Number,default:0},selectOnFocus:{type:Boolean,default:!1},prevButtonProps:{type:null,default:null},nextButtonProps:{type:null,default:null},prevIcon:{type:String,default:void 0},nextIcon:{type:String,default:void 0}},style:Dt,provide:function(){return{$pcTabs:void 0,$pcTabView:this,$parentInstance:this}}},et={name:"TabView",extends:Et,inheritAttrs:!1,emits:["update:activeIndex","tab-change","tab-click"],data:function(){return{id:this.$attrs.id,d_activeIndex:this.activeIndex,isPrevButtonDisabled:!0,isNextButtonDisabled:!1}},watch:{"$attrs.id":function(t){this.id=t||U()},activeIndex:function(t){this.d_activeIndex=t,this.scrollInView({index:t})}},mounted:function(){console.warn("Deprecated since v4. Use Tabs component instead."),this.id=this.id||U(),this.updateInkBar(),this.scrollable&&this.updateButtonState()},updated:function(){this.updateInkBar(),this.scrollable&&this.updateButtonState()},methods:{isTabPanel:function(t){return t.type.name==="TabPanel"},isTabActive:function(t){return this.d_activeIndex===t},getTabProp:function(t,n){return t.props?t.props[n]:void 0},getKey:function(t,n){return this.getTabProp(t,"header")||n},getTabHeaderActionId:function(t){return"".concat(this.id,"_").concat(t,"_header_action")},getTabContentId:function(t){return"".concat(this.id,"_").concat(t,"_content")},getTabPT:function(t,n,a){var o=this.tabs.length,i={props:t.props,parent:{instance:this,props:this.$props,state:this.$data},context:{index:a,count:o,first:a===0,last:a===o-1,active:this.isTabActive(a)}};return v(this.ptm("tabpanel.".concat(n),{tabpanel:i}),this.ptm("tabpanel.".concat(n),i),this.ptmo(this.getTabProp(t,"pt"),n,i))},onScroll:function(t){this.scrollable&&this.updateButtonState(),t.preventDefault()},onPrevButtonClick:function(){var t=this.$refs.content,n=A(t),a=t.scrollLeft-n;t.scrollLeft=a<=0?0:a},onNextButtonClick:function(){var t=this.$refs.content,n=A(t)-this.getVisibleButtonWidths(),a=t.scrollLeft+n,o=t.scrollWidth-n;t.scrollLeft=a>=o?o:a},onTabClick:function(t,n,a){this.changeActiveIndex(t,n,a),this.$emit("tab-click",{originalEvent:t,index:a})},onTabKeyDown:function(t,n,a){switch(t.code){case"ArrowLeft":this.onTabArrowLeftKey(t);break;case"ArrowRight":this.onTabArrowRightKey(t);break;case"Home":this.onTabHomeKey(t);break;case"End":this.onTabEndKey(t);break;case"PageDown":this.onPageDownKey(t);break;case"PageUp":this.onPageUpKey(t);break;case"Enter":case"NumpadEnter":case"Space":this.onTabEnterKey(t,n,a);break}},onTabArrowRightKey:function(t){var n=this.findNextHeaderAction(t.target.parentElement);n?this.changeFocusedTab(t,n):this.onTabHomeKey(t),t.preventDefault()},onTabArrowLeftKey:function(t){var n=this.findPrevHeaderAction(t.target.parentElement);n?this.changeFocusedTab(t,n):this.onTabEndKey(t),t.preventDefault()},onTabHomeKey:function(t){var n=this.findFirstHeaderAction();this.changeFocusedTab(t,n),t.preventDefault()},onTabEndKey:function(t){var n=this.findLastHeaderAction();this.changeFocusedTab(t,n),t.preventDefault()},onPageDownKey:function(t){this.scrollInView({index:this.$refs.nav.children.length-2}),t.preventDefault()},onPageUpKey:function(t){this.scrollInView({index:0}),t.preventDefault()},onTabEnterKey:function(t,n,a){this.changeActiveIndex(t,n,a),t.preventDefault()},findNextHeaderAction:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=n?t:t.nextElementSibling;return a?E(a,"data-p-disabled")||E(a,"data-pc-section")==="inkbar"?this.findNextHeaderAction(a):M(a,'[data-pc-section="headeraction"]'):null},findPrevHeaderAction:function(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,a=n?t:t.previousElementSibling;return a?E(a,"data-p-disabled")||E(a,"data-pc-section")==="inkbar"?this.findPrevHeaderAction(a):M(a,'[data-pc-section="headeraction"]'):null},findFirstHeaderAction:function(){return this.findNextHeaderAction(this.$refs.nav.firstElementChild,!0)},findLastHeaderAction:function(){return this.findPrevHeaderAction(this.$refs.nav.lastElementChild,!0)},changeActiveIndex:function(t,n,a){!this.getTabProp(n,"disabled")&&this.d_activeIndex!==a&&(this.d_activeIndex=a,this.$emit("update:activeIndex",a),this.$emit("tab-change",{originalEvent:t,index:a}),this.scrollInView({index:a}))},changeFocusedTab:function(t,n){if(n&&(lt(n),this.scrollInView({element:n}),this.selectOnFocus)){var a=parseInt(n.parentElement.dataset.pcIndex,10),o=this.tabs[a];this.changeActiveIndex(t,o,a)}},scrollInView:function(t){var n=t.element,a=t.index,o=a===void 0?-1:a,i=n||this.$refs.nav.children[o];i&&i.scrollIntoView&&i.scrollIntoView({block:"nearest"})},updateInkBar:function(){var t=this.$refs.nav.children[this.d_activeIndex];this.$refs.inkbar.style.width=A(t)+"px",this.$refs.inkbar.style.left=R(t).left-R(this.$refs.nav).left+"px"},updateButtonState:function(){var t=this.$refs.content,n=t.scrollLeft,a=t.scrollWidth,o=A(t);this.isPrevButtonDisabled=n===0,this.isNextButtonDisabled=parseInt(n)===a-o},getVisibleButtonWidths:function(){var t=this.$refs,n=t.prevBtn,a=t.nextBtn;return[n,a].reduce(function(o,i){return i?o+A(i):o},0)}},computed:{tabs:function(){var t=this;return this.$slots.default().reduce(function(n,a){return t.isTabPanel(a)?n.push(a):a.children&&a.children instanceof Array&&a.children.forEach(function(o){t.isTabPanel(o)&&n.push(o)}),n},[])},prevButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.previous:void 0},nextButtonAriaLabel:function(){return this.$primevue.config.locale.aria?this.$primevue.config.locale.aria.next:void 0}},directives:{ripple:ct},components:{ChevronLeftIcon:X,ChevronRightIcon:tt}};function D(e){"@babel/helpers - typeof";return D=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},D(e)}function q(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(o){return Object.getOwnPropertyDescriptor(e,o).enumerable})),n.push.apply(n,a)}return n}function y(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]!=null?arguments[t]:{};t%2?q(Object(n),!0).forEach(function(a){Lt(e,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):q(Object(n)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))})}return e}function Lt(e,t,n){return(t=Kt(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function Kt(e){var t=Nt(e,"string");return D(t)=="symbol"?t:t+""}function Nt(e,t){if(D(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var a=n.call(e,t||"default");if(D(a)!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}var Ht=["tabindex","aria-label"],jt=["data-p-active","data-p-disabled","data-pc-index"],zt=["id","tabindex","aria-disabled","aria-selected","aria-controls","onClick","onKeydown"],Ot=["tabindex","aria-label"],Ut=["id","aria-labelledby","data-pc-index","data-p-active"];function Mt(e,t,n,a,o,i){var f=dt("ripple");return l(),d("div",v({class:e.cx("root"),role:"tablist"},e.ptmi("root")),[s("div",v({class:e.cx("navContainer")},e.ptm("navContainer")),[e.scrollable&&!o.isPrevButtonDisabled?_((l(),d("button",v({key:0,ref:"prevBtn",type:"button",class:e.cx("prevButton"),tabindex:e.tabindex,"aria-label":i.prevButtonAriaLabel,onClick:t[0]||(t[0]=function(){return i.onPrevButtonClick&&i.onPrevButtonClick.apply(i,arguments)})},y(y({},e.prevButtonProps),e.ptm("prevButton")),{"data-pc-group-section":"navbutton"}),[T(e.$slots,"previcon",{},function(){return[(l(),C(F(e.prevIcon?"span":"ChevronLeftIcon"),v({"aria-hidden":"true",class:e.prevIcon},e.ptm("prevIcon")),null,16,["class"]))]})],16,Ht)),[[f]]):b("",!0),s("div",v({ref:"content",class:e.cx("navContent"),onScroll:t[1]||(t[1]=function(){return i.onScroll&&i.onScroll.apply(i,arguments)})},e.ptm("navContent")),[s("ul",v({ref:"nav",class:e.cx("nav")},e.ptm("nav")),[(l(!0),d(I,null,V(i.tabs,function(c,h){return l(),d("li",v({key:i.getKey(c,h),style:i.getTabProp(c,"headerStyle"),class:e.cx("tab.header",{tab:c,index:h}),role:"presentation",ref_for:!0},y(y(y({},i.getTabProp(c,"headerProps")),i.getTabPT(c,"root",h)),i.getTabPT(c,"header",h)),{"data-pc-name":"tabpanel","data-p-active":o.d_activeIndex===h,"data-p-disabled":i.getTabProp(c,"disabled"),"data-pc-index":h}),[_((l(),d("a",v({id:i.getTabHeaderActionId(h),class:e.cx("tab.headerAction"),tabindex:i.getTabProp(c,"disabled")||!i.isTabActive(h)?-1:e.tabindex,role:"tab","aria-disabled":i.getTabProp(c,"disabled"),"aria-selected":i.isTabActive(h),"aria-controls":i.getTabContentId(h),onClick:function(S){return i.onTabClick(S,c,h)},onKeydown:function(S){return i.onTabKeyDown(S,c,h)},ref_for:!0},y(y({},i.getTabProp(c,"headerActionProps")),i.getTabPT(c,"headerAction",h))),[c.props&&c.props.header?(l(),d("span",v({key:0,class:e.cx("tab.headerTitle"),ref_for:!0},i.getTabPT(c,"headerTitle",h)),x(c.props.header),17)):b("",!0),c.children&&c.children.header?(l(),C(F(c.children.header),{key:1})):b("",!0)],16,zt)),[[f]])],16,jt)}),128)),s("li",v({ref:"inkbar",class:e.cx("inkbar"),role:"presentation","aria-hidden":"true"},e.ptm("inkbar")),null,16)],16)],16),e.scrollable&&!o.isNextButtonDisabled?_((l(),d("button",v({key:1,ref:"nextBtn",type:"button",class:e.cx("nextButton"),tabindex:e.tabindex,"aria-label":i.nextButtonAriaLabel,onClick:t[2]||(t[2]=function(){return i.onNextButtonClick&&i.onNextButtonClick.apply(i,arguments)})},y(y({},e.nextButtonProps),e.ptm("nextButton")),{"data-pc-group-section":"navbutton"}),[T(e.$slots,"nexticon",{},function(){return[(l(),C(F(e.nextIcon?"span":"ChevronRightIcon"),v({"aria-hidden":"true",class:e.nextIcon},e.ptm("nextIcon")),null,16,["class"]))]})],16,Ot)),[[f]]):b("",!0)],16),s("div",v({class:e.cx("panelContainer")},e.ptm("panelContainer")),[(l(!0),d(I,null,V(i.tabs,function(c,h){return l(),d(I,{key:i.getKey(c,h)},[!e.lazy||i.isTabActive(h)?_((l(),d("div",v({key:0,id:i.getTabContentId(h),style:i.getTabProp(c,"contentStyle"),class:e.cx("tab.content",{tab:c}),role:"tabpanel","aria-labelledby":i.getTabHeaderActionId(h),ref_for:!0},y(y(y({},i.getTabProp(c,"contentProps")),i.getTabPT(c,"root",h)),i.getTabPT(c,"content",h)),{"data-pc-name":"tabpanel","data-pc-index":h,"data-p-active":o.d_activeIndex===h}),[(l(),C(F(c)))],16,Ut)),[[J,e.lazy?!0:i.isTabActive(h)]]):b("",!0)],64)}),128))],16)],16)}et.render=Mt;var Rt={root:function(t){var n=t.instance;return["p-tabpanel",{"p-tabpanel-active":n.active}]}},Wt=H.extend({name:"tabpanel",classes:Rt}),Yt={name:"BaseTabPanel",extends:N,props:{value:{type:[String,Number],default:void 0},as:{type:[String,Object],default:"DIV"},asChild:{type:Boolean,default:!1},header:null,headerStyle:null,headerClass:null,headerProps:null,headerActionProps:null,contentStyle:null,contentClass:null,contentProps:null,disabled:Boolean},style:Wt,provide:function(){return{$pcTabPanel:this,$parentInstance:this}}},K={name:"TabPanel",extends:Yt,inheritAttrs:!1,inject:["$pcTabs"],computed:{active:function(){var t;return ut((t=this.$pcTabs)===null||t===void 0?void 0:t.d_value,this.value)},id:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tabpanel_").concat(this.value)},ariaLabelledby:function(){var t;return"".concat((t=this.$pcTabs)===null||t===void 0?void 0:t.id,"_tab_").concat(this.value)},attrs:function(){return v(this.a11yAttrs,this.ptmi("root",this.ptParams))},a11yAttrs:function(){var t;return{id:this.id,tabindex:(t=this.$pcTabs)===null||t===void 0?void 0:t.tabindex,role:"tabpanel","aria-labelledby":this.ariaLabelledby,"data-pc-name":"tabpanel","data-p-active":this.active}},ptParams:function(){return{context:{active:this.active}}}}};function Zt(e,t,n,a,o,i){var f,c;return i.$pcTabs?(l(),d(I,{key:1},[e.asChild?T(e.$slots,"default",{key:1,class:Q(e.cx("root")),active:i.active,a11yAttrs:i.a11yAttrs}):(l(),d(I,{key:0},[!((f=i.$pcTabs)!==null&&f!==void 0&&f.lazy)||i.active?_((l(),C(F(e.as),v({key:0,class:e.cx("root")},i.attrs),{default:$(function(){return[T(e.$slots,"default")]}),_:3},16,["class"])),[[J,(c=i.$pcTabs)!==null&&c!==void 0&&c.lazy?!0:i.active]]):b("",!0)],64))],64)):T(e.$slots,"default",{key:0})}K.render=Zt;const qt=pt("main",{state:()=>({count:0,name:"Eduardo",isProcessing:!1,processError:null}),getters:{doubleCount:e=>e.count*2},actions:{increment(){this.count++},async processVideo(e){try{this.isProcessing=!0,this.processError=null,console.log("🎥 Processing video:",{url:e});const t=await fetch("https://um-hackathon.vercel.app/api/process-video",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})});if(!t.ok)throw console.error("❌ Process video error:",{url:e,status:t.status,statusText:t.statusText}),new Error(`HTTP error! status: ${t.status}`);const n=await t.json();return console.log("✅ Process video success:",{url:e,responseData:n}),n}catch(t){throw this.processError=t.message,console.error("💥 Process video exception:",{url:e,error:t.message}),t}finally{this.isProcessing=!1}}}}),Gt={class:"min-h-screen bg-gradient-to-br from-purple-50 to-blue-50"},Jt={class:"max-w-4xl mx-auto px-4 py-8"},Qt={class:"space-y-6"},Xt={class:"flex gap-2"},te={class:"space-y-6"},ee={class:"relative aspect-video"},ne=["src"],ae={class:"mt-3 text-lg font-semibold text-gray-900"},ie={class:"mt-1 text-sm text-gray-500"},oe={class:"bg-purple-50 rounded-lg p-4"},re={class:"mt-2 space-y-2"},se={class:"p-4"},le={class:"text-gray-700 whitespace-pre-line"},ce={class:"p-4"},de={class:"max-h-96 overflow-y-auto"},ue={class:"text-gray-700 whitespace-pre-line"},pe={key:2,class:"space-y-4"},ve={class:"grid grid-cols-1 md:grid-cols-2 gap-4 relative"},he=["onClick"],fe={class:"relative aspect-video"},be=["src","onLoad"],me={class:"p-3"},ge={class:"flex items-center text-sm text-gray-500 mb-2"},ye={class:"font-medium text-gray-900"},we={key:3,class:"flex justify-end"},xe={class:"bg-purple-600 text-white rounded-lg p-3 max-w-[80%]"},$e={class:"text-sm"},Te={key:4,class:"flex justify-start"},ke={class:"bg-gray-100 text-gray-900 rounded-lg p-3 max-w-[80%]"},Pe={class:"text-sm"},Ce={class:"flex gap-2"},Ie={__name:"ChatView",setup(e){const t=B(""),n=B(!1),a=B([]),o=B("");qt();const i=B(!1),f=B(0),c=B([]),h=async()=>{if(!t.value.trim())return;a.value=[],a.value.push({id:Date.now().toString(),type:"user",content:t.value});const p=t.value;t.value="",n.value=!0;try{await new Promise(r=>setTimeout(r,2e3)),a.value.push({id:Date.now().toString(),type:"video",content:{title:"How to Build a Successful Startup",thumbnail:"https://i.ytimg.com/vi/sample/maxresdefault.jpg",url:p}}),a.value.push({id:Date.now().toString(),type:"videoAnalysis",content:{takeaways:["Start with a clear problem statement","Focus on customer validation early","Build a minimum viable product","Iterate based on user feedback","Maintain a sustainable growth rate"],summary:"This comprehensive guide covers the essential steps to building a successful startup, from initial ideation to scaling. The video emphasizes the importance of customer-focused development and iterative improvement based on real feedback. The presenter walks through each stage of startup development, highlighting common pitfalls to avoid and sharing practical strategies for success.",transcript:`
00:00 - Introduction to startup fundamentals
02:15 - Identifying market opportunities
  - Understanding customer pain points
  - Market size evaluation
  - Competitive analysis
05:30 - Customer validation techniques
  - Interview strategies
  - Feedback collection methods
  - Iterative learning process
08:45 - Building MVP strategies
  - Feature prioritization
  - Development timeline
  - Resource allocation
12:00 - Growth and scaling approaches
  - Marketing channels
  - Team building
  - Investment strategies
15:30 - Common pitfalls to avoid
  - Premature scaling
  - Ignoring customer feedback
  - Poor market fit
18:45 - Conclusion and key takeaways
        `.trim()}}),a.value.push({id:Date.now().toString(),type:"shorts",content:[{title:"First Segment Highlight",videoUrl:"https://www.youtube.com/watch?v=wzFLZPE_gNk",startTime:30,endTime:40},{title:"Second Segment Analysis",videoUrl:"https://www.youtube.com/watch?v=wzFLZPE_gNk",startTime:100,endTime:110},{title:"Key Insights",videoUrl:"https://www.youtube.com/watch?v=wzFLZPE_gNk",startTime:150,endTime:160},{title:"Final Thoughts",videoUrl:"https://www.youtube.com/watch?v=wzFLZPE_gNk",startTime:200,endTime:210}]})}catch{a.value.push({id:Date.now().toString(),type:"assistant",content:"Sorry, there was an error processing the video."})}finally{n.value=!1}},j=()=>{if(!o.value.trim())return;const p={id:Date.now().toString(),type:"user",content:o.value,timestamp:new Date};a.value.push(p),o.value="",setTimeout(()=>{const r={id:(Date.now()+1).toString(),type:"assistant",content:"Based on the video content, I can explain more about that topic...",timestamp:new Date};a.value.push(r)},1e3)},S=p=>{const r=/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/,u=p.match(r);return u&&u[2].length===11?u[2]:null},nt=(p,r)=>`${Math.round(r-p)} seconds`,at=p=>{i.value=!0,f.value=0;const r=c.value[0];r&&(r.seekTo(p[0].startTime),r.playVideo())},it=(p,r)=>{if(!c.value[r]){const u=p.target,g=a.value.find(k=>k.type==="shorts").content[r],m=new YT.Player(u,{videoId:S(g.videoUrl),playerVars:{start:g.startTime,controls:1,modestbranding:1,disablekb:1,rel:0,autoplay:i.value&&f.value===r?1:0},events:{onReady:k=>ot(k,r),onStateChange:k=>rt(k,r)}});c.value[r]=m}},ot=(p,r)=>{i.value&&f.value===r&&(p.target.seekTo(a.value.find(u=>u.type==="shorts").content[r].startTime),p.target.playVideo(),O(p.target,r))},O=(p,r)=>{const u=a.value.find(m=>m.type==="shorts").content[r],g=setInterval(()=>{p.getCurrentTime()>=u.endTime&&(p.stopVideo(),clearInterval(g),setTimeout(()=>{if(f.value<a.value.find(m=>m.type==="shorts").content.length-1){f.value++;const m=c.value[f.value];m&&(m.seekTo(a.value.find(k=>k.type==="shorts").content[f.value].startTime),m.playVideo())}else i.value=!1,f.value=0},1e3))},500)},rt=(p,r)=>{p.data===YT.PlayerState.PLAYING&&i.value&&f.value===r&&O(p.target,r)};return vt(()=>{if(!window.YT){const p=document.createElement("script");p.src="https://www.youtube.com/iframe_api";const r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(p,r)}}),ht(()=>{c.value.forEach(p=>{p&&p.destroy&&p.destroy()})}),(p,r)=>(l(),d("div",Gt,[r[9]||(r[9]=ft('<header class="bg-white shadow-sm sticky top-0 z-10" data-v-76e3ab0c><div class="max-w-4xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between" data-v-76e3ab0c><div class="flex items-center gap-2" data-v-76e3ab0c><i class="pi pi-youtube text-purple-600 text-xl" data-v-76e3ab0c></i><h1 class="text-xl font-bold text-gray-900" data-v-76e3ab0c>shortok.ai</h1></div></div></header>',1)),s("main",Jt,[s("div",Qt,[s("form",{onSubmit:W(h,["prevent"]),class:"bg-white rounded-lg shadow-md p-4"},[s("div",Xt,[P(w(z),{modelValue:t.value,"onUpdate:modelValue":r[0]||(r[0]=u=>t.value=u),type:"url",placeholder:"Paste YouTube URL here...",class:"flex-1",required:""},null,8,["modelValue"]),P(w(Z),{type:"submit",loading:n.value,disabled:n.value,severity:"primary"},{default:$(()=>[Y(x(n.value?"Processing...":"Transform"),1)]),_:1},8,["loading","disabled"])])],32),s("div",te,[(l(!0),d(I,null,V(a.value,u=>(l(),d("div",{key:u.id,class:"animate-fade-in"},[u.type==="video"?(l(),C(w(L),{key:0,class:"hover:shadow-md transition-shadow"},{content:$(()=>[s("div",ee,[s("iframe",{src:`https://www.youtube.com/embed/${S(u.content.url)}`,class:"w-full h-full rounded-lg",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,8,ne)]),s("h3",ae,x(u.content.title),1),s("p",ie,x(u.content.url),1)]),_:2},1024)):b("",!0),u.type==="videoAnalysis"?(l(),C(w(L),{key:1,class:"bg-white"},{content:$(()=>[P(w(et),null,{default:$(()=>[P(w(K),{header:"Key Takeaways"},{default:$(()=>[s("div",oe,[r[2]||(r[2]=s("h3",{class:"text-lg font-semibold text-purple-900"},"Key Points",-1)),s("ul",re,[(l(!0),d(I,null,V(u.content.takeaways,(g,m)=>(l(),d("li",{key:m,class:"text-purple-700"}," • "+x(g),1))),128))])])]),_:2},1024),P(w(K),{header:"Summary"},{default:$(()=>[s("div",se,[r[3]||(r[3]=s("h3",{class:"text-lg font-semibold text-gray-900 mb-3"},"Full Summary",-1)),s("p",le,x(u.content.summary),1)])]),_:2},1024),P(w(K),{header:"Transcript"},{default:$(()=>[s("div",ce,[r[4]||(r[4]=s("h3",{class:"text-lg font-semibold text-gray-900 mb-3"},"Full Transcript",-1)),s("div",de,[s("p",ue,x(u.content.transcript),1)])])]),_:2},1024)]),_:2},1024)]),_:2},1024)):b("",!0),u.type==="shorts"?(l(),d("div",pe,[r[7]||(r[7]=s("h3",{class:"text-lg font-semibold text-gray-900"},"Generated Shorts",-1)),s("div",ve,[i.value?b("",!0):(l(),d("div",{key:0,class:"absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center z-10 cursor-pointer",onClick:g=>at(u.content)},r[5]||(r[5]=[s("div",{class:"text-center"},[s("i",{class:"pi pi-play-circle text-white text-6xl mb-2"}),s("div",{class:"text-white text-xl font-semibold"},"Play Shorts")],-1)]),8,he)),(l(!0),d(I,null,V(u.content,(g,m)=>(l(),C(w(L),{key:m,class:"hover:shadow-md transition-shadow"},{content:$(()=>[s("div",fe,[s("iframe",{src:`https://www.youtube.com/embed/${S(g.videoUrl)}?enablejsapi=1`,class:Q(["w-full h-full rounded-t-lg",{"opacity-50":i.value&&f.value!==m}]),frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:"",onLoad:k=>it(k,m)},null,42,be)]),s("div",me,[s("div",ge,[r[6]||(r[6]=s("i",{class:"pi pi-clock mr-1"},null,-1)),Y(" "+x(nt(g.startTime,g.endTime)),1)]),s("h4",ye,x(g.title),1)])]),_:2},1024))),128))])])):b("",!0),u.type==="user"?(l(),d("div",we,[s("div",xe,[s("p",$e,x(u.content),1)])])):b("",!0),u.type==="assistant"?(l(),d("div",Te,[s("div",ke,[s("p",Pe,x(u.content),1)])])):b("",!0)]))),128))]),a.value.length&&!n.value?(l(),d("form",{key:0,onSubmit:W(j,["prevent"]),class:"sticky bottom-0 bg-white rounded-lg shadow-md p-4 animate-fade-in"},[s("div",Ce,[P(w(z),{modelValue:o.value,"onUpdate:modelValue":r[1]||(r[1]=u=>o.value=u),placeholder:"Ask about the video content...",class:"flex-1"},null,8,["modelValue"]),P(w(Z),{type:"submit",severity:"primary"},{default:$(()=>r[8]||(r[8]=[s("i",{class:"pi pi-send"},null,-1)])),_:1})])],32)):b("",!0)])])]))}},Ae=bt(Ie,[["__scopeId","data-v-76e3ab0c"]]);export{Ae as default};
