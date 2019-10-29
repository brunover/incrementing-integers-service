(window["webpackJsonpincrementing-integers-service"]=window["webpackJsonpincrementing-integers-service"]||[]).push([[0],{200:function(e,t,n){},201:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(24),c=n.n(o),i=n(9),l=n(10),s=n(12),u=n(11),m=n(13),d=n(21),p=n(3),h=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(p.Panel,null,r.a.createElement(p.Panel.Body,null,r.a.createElement(p.Alert,{type:"warning"},r.a.createElement("h3",null,"Page not found - 404"),r.a.createElement("p",null,window.location.href)))))}}]),t}(a.Component),f=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props.user;return r.a.createElement("div",{className:"fd-container"},r.a.createElement(p.Shellbar,{logo:r.a.createElement("img",{alt:"Incrementing Integer Service",src:"/logo.png"}),productTitle:"Incrementing Integer Service",profile:{glyph:"settings",colorAccent:4,initials:"...",userName:e.email||"No user"},profileMenu:[{callback:function(){alert("Signing out!")},glyph:"log",name:"Sign Out",size:"s"}]}))}}]),t}(a.Component),g=(n(59),n(60),n(177)),b=function(e){return g.stringify(e)},v=n(180),y=localStorage.token;y||(y=localStorage.token="1234567");var E=window.location.protocol,O=window.location.hostname,j=v.create({baseURL:"".concat(E,"//").concat(O,"/api/v1"),headers:{"Content-Type":"application/x-www-form-urlencoded",Authorization:"Bearer ".concat(y)}}),w=function(e){return j.get("/users/".concat(e)).then(function(e){return e.data})},S=function(e){return j.get("/users/".concat(e,"/next")).then(function(e){return e})},I=function(e,t){return j.patch("/users/".concat(e,"/current"),t).then(function(e){return e})},k=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r))))._isMounted=!1,n.state={isLoadingUser:!0,isLoadingInteger:!1,error:null,success:null,user:{}},n.fetchUser=function(e){return w(e).then(function(e){var t=e||[];n.safeSetState({isLoadingUser:!1,user:t})}).catch(function(e){console.error(e.response),n.safeSetState({isLoadingUser:!1,error:e})})},n.requestNewInteger=function(e){n.safeSetState({isLoadingInteger:!0}),S(e).then(function(t){200===t.status&&(n.fetchUser(e),n.safeSetState({isLoadingInteger:!1}))}).catch(function(e){console.error(e.response),n.safeSetState({isLoadingInteger:!1,error:e})})},n.resetInteger=function(e){var t=window.prompt("Inform the new integer value (bigger than zero):");t&&(t=t.trim(),isNaN(t)?alert("You must provide a number"):(t=Number(t))<0?alert("You must provide a number bigger than zero"):(n.safeSetState({isLoadingInteger:!0}),I(e,b({current:t})).then(function(t){200===t.status&&(n.fetchUser(e),n.safeSetState({isLoadingInteger:!1}))}).catch(function(e){console.error(e.response),n.setState({isLoadingInteger:!1,error:e})})))},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"safeSetState",value:function(e){this._isMounted?this.setState(e):console.warn("State was not updated because component is unmounted",e)}},{key:"componentWillUnmount",value:function(){this._isMounted=!1}},{key:"componentDidMount",value:function(){this._isMounted=!0,this.fetchUser(1)}},{key:"render",value:function(){var e=this,t=this.state,n=t.isLoadingUser,a=t.isLoadingInteger,o=t.error,c=t.user;return r.a.createElement("div",{className:"fd-container fd-container--centered"},r.a.createElement(f,{user:c}),r.a.createElement("div",{className:"fd-container"},r.a.createElement("div",{className:"fd-has-margin-bottom-medium"},r.a.createElement("div",{className:"fd-container"},r.a.createElement(p.Panel,null,r.a.createElement(p.Panel.Body,null,o&&r.a.createElement(p.Status,{type:"error",glyph:"message-error"},o.message),r.a.createElement(p.ActionBar,null,r.a.createElement(p.ActionBar.Header,{description:"Request the next integer or reset the value of the current one",title:"Your personal integer"}),r.a.createElement(p.ActionBar.Actions,null,r.a.createElement(p.Button,{glyph:"add",onClick:function(){return e.requestNewInteger(c.id||0)}},"Request New Integer"),r.a.createElement(p.Button,{glyph:"refresh",onClick:function(){return e.resetInteger(c.id||0)}},"Reset My Integer"))),n?r.a.createElement(L,null):r.a.createElement(p.PanelGrid,{cols:2},r.a.createElement(p.Panel,null,r.a.createElement(p.Panel.Body,null,r.a.createElement(p.Tile,null,r.a.createElement(p.Tile.Content,{title:"User"},r.a.createElement("p",{className:"fd-has-type-4"},c.email||"No user"))))),r.a.createElement(p.Panel,null,r.a.createElement(p.Panel.Body,null,r.a.createElement(p.Tile,null,r.a.createElement(p.Tile.Content,{title:"Current Integer"},r.a.createElement("p",{className:"fd-has-type-4"},c.int_value||0,a&&r.a.createElement(L,{size:"s",type:"synch"})))))))))))))}}]),t}(a.Component),N=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"LOGIN")}}]),t}(a.PureComponent),L=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,o=new Array(a),c=0;c<a;c++)o[c]=arguments[c];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).renderSpinner=function(e){var t=e.size,n="";if(t)switch(t.toLowerCase()){case"s":n="fd-loading-spinner--small";break;case"l":n="fd-loading-spinner--large";break;default:n=""}return r.a.createElement("div",{className:"fd-loading-spinner ".concat(n),"aria-hidden":"false","aria-label":"Loading"})},n.renderSynchronizer=function(e){var t=e.size,n=e.animate,a=e.icon;return r.a.createElement("span",{className:"\n          fd-has-margin-x-tiny \n          sap-icon--".concat(a," \n          sap-icon--").concat(t," \n          sap-icon--animate-").concat(n,"\n        ")})},n}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.display,n=e.type;return t?"synch"===n.toLowerCase()?this.renderSynchronizer(this.props):this.renderSpinner(this.props):null}}]),t}(a.Component);L.defaultProps={display:!0,type:"spin",size:"m",animate:"spin",icon:"synchronize"};var C=function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(d.d,null,r.a.createElement(d.a,{exact:!0,from:"/",to:"/dashboard"}),r.a.createElement(d.b,{path:"/dashboard",component:k}),r.a.createElement(d.b,{exact:!0,path:"/login",component:N}),r.a.createElement(d.b,{path:"",component:h})))}}]),t}(a.Component),B=(n(200),function(e){function t(){return Object(i.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement(C,null)}}]),t}(a.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var P=n(29);c.a.render(r.a.createElement(P.a,null,r.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},61:function(e,t,n){e.exports=n(201)}},[[61,1,2]]]);
//# sourceMappingURL=main.e20f9adc.chunk.js.map