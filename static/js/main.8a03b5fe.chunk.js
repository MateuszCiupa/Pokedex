(this.webpackJsonpsrc=this.webpackJsonpsrc||[]).push([[0],{64:function(e,t,n){e.exports=n(95)},95:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(34),i=n.n(o),c=n(35),s=n.n(c),u=(s()((function(e){return{root:{}}})),n(107)),p=s()((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),margin:"auto"},img:{margin:"auto",display:"block"}}})),l=n(108),f=n(109),E=function(e){var t=e.name,n=void 0===t?"Name":t,r=(e.weight,e.height,e.imgUrl),o=p();return a.a.createElement(u.a,{item:!0,xm:4,xs:4},a.a.createElement(l.a,{className:o.paper},a.a.createElement(u.a,{container:!0,spacing:2,item:!0},a.a.createElement(u.a,{item:!0},a.a.createElement("img",{className:o.img,src:r,alt:"".concat(n," img")})),a.a.createElement(u.a,{item:!0,container:!0,direction:"column"},a.a.createElement(u.a,{item:!0},a.a.createElement(f.a,{variant:"subtitle1"},n))))))},d=n(40),k=n(8),m=n.n(k),g=n(16),h=n(47),b=n(5),x="https://pokeapi.co/api/v2",v="".concat(x,"/pokemon"),_="".concat(v,"?offset=0&limit=1"),y=function(e,t){return fetch("".concat(v,"?offset=").concat(e,"&limit=").concat(t))},O="pokedex/errors/RECEIVE_ERROR",w="pokedex/errors/CLEAR_ERROR",I=function(e){return{type:O,message:e}},R="pokedex/stats/SET_POKE_COUNT",T="pokedex/stats/SET_PAGE_LIMIT",P="pokedex/stats/INCR_PAGE",j="pokedex/stats/DECR_PAGE",L="pokedex/stats/SET_LEFT_LIMIT",C={pokeCount:void 0,currentPage:0,pageLimit:20,leftLimit:!0,rightLimit:!1},S=function(e){return{type:L,payload:e}},K=function(e){return{type:"pokedex/stats/SET_RIGHT_LIMIT",payload:e}},V="pokedex/loading/RECEIVE_LOADING",N=function(e){return{type:V,loading:e}},U="pokedex/filter/CLEAR_FILTER",A="pokedex/filter/SET_FILTER",F="pokedex/filter/SET_FIRST_ID",M=function(e){return{type:F,payload:e}},D={active:!1,firstId:null,type:null,weight:null,height:null},G=n(58),B=function(e,t){var n=t.min,r=t.max;return n?r?e>=n&&e<=r:e>=n:!r||e<=r},H=function(e,t){if(!t.active)return!1;var n=e.height,r=e.weight,a=e.types,o=t.height,i=t.weight,c=t.type;if(o&&!B(n,o)||i&&!B(r,i))return!0;if(c){var s,u=Object(G.a)(a);try{for(u.s();!(s=u.n()).done;){if(s.value.type.name!==c)return!0}}catch(p){u.e(p)}finally{u.f()}}return!1},J=function(e){return{type:"pokedex/pokemon/RECEIVE_POKE_RESULTS",payload:e}},W=function(e){return{type:"pokedex/pokemon/RECEIVE_POKE_LIMIT",payload:e}},X=function(e){return{type:"pokedex/pokemon/RECEIVE_POKE_OFFSET",payload:e}},Q={offset:0,limit:0,results:[]},Y=Object(d.b)((function(e){return{pokemon:e.pokemon,loading:e.loading,error:e.error,stats:e.stats}}),(function(e){return{getPokeNext:function(){return e(function(){var e=Object(g.a)(m.a.mark((function e(t,n){var r,a,o,i,c,s,u,p,l,f,E,d,k,h,b,x,v,O,w,T,P,j,L,C,V;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t(N(!0)),r=n(),a=r.filter,o=r.stats,i=r.pokemon,o.pokeCount||t(function(){var e=Object(g.a)(m.a.mark((function e(t){var n,r,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(_);case 3:if((n=e.sent).ok){e.next=6;break}throw new Error(n.status);case 6:return e.next=8,n.json();case 8:r=e.sent,a=r.count,t({type:R,payload:a}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),console.log(e.t0),t(I("Problem while getting poke count"));case 17:case"end":return e.stop()}}),e,null,[[0,13]])})));return function(t){return e.apply(this,arguments)}}()),c=o.pokeCount,s=void 0===c?964:c,u=o.pageLimit,p=a.firstId,l=i.offset+i.limit,t(J([])),t(X(l)),f=0,E=0,e.prev=10;case 11:if(!(E<u&&l+f<s)){e.next=52;break}return e.next=14,y(l+f,20);case 14:if((d=e.sent).ok){e.next=17;break}throw new Error(d.status);case 17:return e.next=19,d.json();case 19:k=e.sent,h=k.results,b=0;case 22:if(!(b<h.length)){e.next=50;break}return e.next=25,fetch(h[b].url);case 25:if((d=e.sent).ok){e.next=28;break}throw new Error(d.status);case 28:return e.next=30,d.json();case 30:if(x=e.sent,v=x.name,O=x.weight,w=x.height,T=x.abilities,P=x.base_experience,j=x.sprites,L=x.types,C=x.id,V={name:v,weight:O,height:w,abilities:T,base_experience:P,sprites:j,types:L,id:C},f++,a.active&&H(V,a)){e.next=47;break}if(t({type:"pokedex/pokemon/RECEIVE_POKE_RESULT",payload:V}),E++,p||(p=C,t(M(C))),E!==u){e.next=47;break}return e.abrupt("break",50);case 47:b++,e.next=22;break;case 50:e.next=11;break;case 52:e.next=58;break;case 54:e.prev=54,e.t0=e.catch(10),console.log(e.t0),t(I("Problem while getting next pokes"));case 58:t(S(!(l>0))),t(K(!(l+f<s))),t(W(f)),t(N(!1));case 62:case"end":return e.stop()}}),e,null,[[10,54]])})));return function(t,n){return e.apply(this,arguments)}}())},getPokePrevious:function(){return e(function(){var e=Object(g.a)(m.a.mark((function e(t,n){var r,a,o,i,c,s,u,p,l,f,E,d,k,g,h,b,x,v,_,O,w,R,T,P,j;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t(N(!0)),r=n(),a=r.filter,o=r.stats,i=r.pokemon,c=o.pokeCount,s=void 0===c?964:c,u=o.pageLimit,p=a.firstId,0!==(l=i.offset)){e.next=7;break}return e.abrupt("return",t(N(!1)));case 7:t(J([])),f=0,E=0,e.prev=10;case 11:if(!(E<u&&l-f>0)){e.next=51;break}return e.next=14,y(l-f-20<0?0:l-f-20,l-f-20<0?l-f:20);case 14:if((d=e.sent).ok){e.next=17;break}throw new Error(d.status);case 17:return e.next=19,d.json();case 19:k=e.sent,g=k.results,h=g.length-1;case 22:if(!(h>=0)){e.next=49;break}return e.next=25,fetch(g[h].url);case 25:if((d=e.sent).ok){e.next=28;break}throw new Error(d.status);case 28:return e.next=30,d.json();case 30:if(b=e.sent,x=b.name,v=b.weight,_=b.height,O=b.abilities,w=b.base_experience,R=b.sprites,T=b.types,P=b.id,j={name:x,weight:v,height:_,abilities:O,base_experience:w,sprites:R,types:T,id:P},f++,a.active&&H(j,a)){e.next=46;break}if(t({type:"pokedex/pokemon/RECEIVE_POKE_RESULT_BACKWARDS",payload:j}),++E!==u){e.next=46;break}return e.abrupt("break",49);case 46:h--,e.next=22;break;case 49:e.next=11;break;case 51:e.next=57;break;case 53:e.prev=53,e.t0=e.catch(10),console.log(e.t0),t(I("Problem while getting previous pokes"));case 57:t(X(l-=f)),t(S(!(l>0)||l+1===p)),t(K(!(l+f<s))),t(W(f)),t(N(!1));case 63:case"end":return e.stop()}}),e,null,[[10,53]])})));return function(t,n){return e.apply(this,arguments)}}())}}}))((function(e){var t=e.loading,n=e.stats,o=n.leftLimit,i=n.rightLimit,c=e.pokemon,s=e.getPokeNext,p=e.getPokePrevious;return Object(r.useEffect)((function(){s()}),[s]),a.a.createElement("div",null,a.a.createElement("button",{disabled:t||o,onClick:p},"Previous"),a.a.createElement("button",{disabled:t||i,onClick:s},"Next"),a.a.createElement(u.a,{container:!0},c.results.map((function(e){var t=e.name,n=(e.weight,e.height,e.id,e.sprites);return a.a.createElement(E,{key:t,name:t,imgUrl:n.front_default})}))))})),q=function(){return a.a.createElement(Y,null)},z=n(45),Z=n.n(z)()({palette:{}}),$=n(105),ee=n(14),te=n(59),ne="pokedex/types/REQUEST_TYPES",re=Object(ee.c)({pokemon:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case"pokedex/pokemon/RECEIVE_POKE_RESULTS":return Object(b.a)({},e,{results:r});case"pokedex/pokemon/RECEIVE_POKE_RESULT":return Object(b.a)({},e,{results:[].concat(Object(h.a)(e.results),[r])});case"pokedex/pokemon/RECEIVE_POKE_LIMIT":return Object(b.a)({},e,{limit:r});case"pokedex/pokemon/RECEIVE_POKE_OFFSET":return Object(b.a)({},e,{offset:r});case"pokedex/pokemon/RECEIVE_POKE_RESULT_BACKWARDS":return Object(b.a)({},e,{results:[r].concat(Object(h.a)(e.results))});default:return e}},error:function(){arguments.length>0&&void 0!==arguments[0]&&arguments[0];var e=arguments.length>1?arguments[1]:void 0,t=e.type,n=e.message;switch(t){case O:return n;case w:default:return""}},loading:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.loading;switch(n){case V:return!!r;default:return e}},types:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case ne:return r;default:return e}},filter:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:D,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case U:return Object(b.a)({},e,{active:!1});case A:return Object(b.a)({},r,{active:!0});case F:return Object(b.a)({},e,{firstId:r});default:return e}},stats:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0,n=t.type,r=t.payload;switch(n){case R:return Object(b.a)({},e,{pokeCount:r});case T:return Object(b.a)({},e,{pageLimit:r});case P:return Object(b.a)({},e,{currentPage:e.currentPage+1});case j:return Object(b.a)({},e,{currentPage:e.currentPage-1});case"pokedex/stats/SET_RIGHT_LIMIT":return Object(b.a)({},e,{rightLimit:!!r});case L:return Object(b.a)({},e,{leftLimit:!!r});default:return e}}}),ae=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||ee.d,oe=Object(ee.e)(re,ae(Object(ee.a)(te.a)));i.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement($.a,{theme:Z},a.a.createElement(d.a,{store:oe},a.a.createElement(q,null)))),document.getElementById("root"))}},[[64,1,2]]]);
//# sourceMappingURL=main.8a03b5fe.chunk.js.map