(this["webpackJsonpauthorization-module"]=this["webpackJsonpauthorization-module"]||[]).push([[0],{100:function(e,t,a){e.exports={signInPage:"SignIn_signInPage__WFi5q",signInPage__form:"SignIn_signInPage__form__1tCuA"}},103:function(e,t,a){e.exports={registerPage:"Register_registerPage__5npDg",registerPage__form:"Register_registerPage__form__2krKA"}},145:function(e,t,a){e.exports={example:"Preloader_example__3s1ng"}},152:function(e,t,a){e.exports=a(239)},157:function(e,t,a){},158:function(e,t,a){},239:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(14),c=a.n(s),o=(a(157),a(158),a(159),a(242)),i=a(32);function l(){return r.a.createElement(o.a,{mode:"horizontal"},r.a.createElement(o.a.Item,{key:"profile"},r.a.createElement(i.c,{to:"/profile"},"Profile")),r.a.createElement(o.a.Item,{key:"sign-in"},r.a.createElement(i.c,{to:"/sign-in"},"Sign-in")),r.a.createElement(o.a.Item,{key:"forgot"},r.a.createElement(i.c,{to:"/packs"},"Packs")),r.a.createElement(o.a.Item,{key:"set-new-pass"},r.a.createElement(i.c,{to:"/cards"},"Cards")))}var u=a(25),m=a(20),d=a(244),p=a(104),E=a(248),f=a(245),g=a(5),h=a.n(g),_=a(15),b=a(27),v=a(130),w=a(131),S=new(a(149).a),P=new(function(){function e(){Object(v.a)(this,e)}return Object(w.a)(e,[{key:"get",value:function(e){return S.get(e)}},{key:"set",value:function(e,t){S.set(e,t)}},{key:"remove",value:function(e){S.remove(e)}}]),e}()),O=a(54),y=a.n(O),k=y.a.create({baseURL:"https://cards-nya-back.herokuapp.com/1.0/"}),I=function(e,t,a){return k.post("auth/login",{email:e,password:t,rememberMe:a}).then((function(e){return e.data}))},R=function(e){return k.post("auth/me",{token:e}).then((function(e){return e.data}))},C={profile:{_id:null,email:null,name:null,avatar:null,publicCardPacksCount:null,isAdmin:null,verified:null},isAuth:!1},T=function(e,t){return{type:"USER_PROFILE/SET_PROFILE_DATA",payload:{profile:e,isAuth:t}}},j=function(e){return{type:"USER_PROFILE/SET_AUTH_VALUE",isAuth:e}},N=function(){return function(){var e=Object(_.a)(h.a.mark((function e(t){var a,n,r,s,c,o,i,l,u;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=P.get("auth_token"),e.next=4,R(a);case 4:n=e.sent,P.set("auth_token",n.token),r=n._id,s=n.email,c=n.isAdmin,o=n.name,i=n.verified,l=n.publicCardPacksCount,u=n.avatar,t(T({_id:r,email:s,isAdmin:c,name:o,verified:i,publicCardPacksCount:l,avatar:u},!0)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(t){return e.apply(this,arguments)}}()},A=function(){var e=Object(E.a)({scriptUrl:"//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"}),t=Object(m.b)(),a=Object(n.useCallback)((function(){return t(j(!1))}),[t]),s=Object(m.c)((function(e){return e.profile.profile})),c=s.email,o=s.name,i=(s.verified,s.publicCardPacksCount),l=s.avatar;return Object(m.c)((function(e){return e.profile.isAuth}))?r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h3",null,"Profile")),r.a.createElement("div",null,l?r.a.createElement("img",{src:l||void 0,alt:"profile avatar"}):r.a.createElement(d.a,{size:64,style:{backgroundColor:"#87d068"},icon:r.a.createElement(f.a,null)})),r.a.createElement("div",null,r.a.createElement("div",null,r.a.createElement("h4",null,"Name"),r.a.createElement("span",null,o)),r.a.createElement("div",null,r.a.createElement("h4",null,"Card Pack"),r.a.createElement("span",null,i)),r.a.createElement("div",null,r.a.createElement("h4",null,"Email"),r.a.createElement("span",null,c))),r.a.createElement(p.a,{onClick:function(){return a(),void P.remove("auth_token")},type:"primary",icon:r.a.createElement(e,{type:"icon-tuichu"})},"Logout")):r.a.createElement(u.a,{to:"/sign-in"})},F=a(21),G=a(56),x=a(243),U=a(247),L={_id:null,email:null,success:!1,isFetching:!1,errorMessage:""},M=function(e,t,a){return{type:"SIGNIN/SET_USER_DATA",payload:{_id:e,email:t,success:a}}},D=function(e){return{type:"SIGNIN/SET_MESSAGE_ERROR",errorMessage:e}},z=function(e){return{type:"SIGNIN/TOGGLE_IS_FETCHING",isFetching:e}},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SIGNIN/SET_USER_DATA":return Object(b.a)({},e,{},t.payload);case"SIGNIN/TOGGLE_IS_FETCHING":return Object(b.a)({},e,{isFetching:t.isFetching});case"SIGNIN/SET_MESSAGE_ERROR":return Object(b.a)({},e,{errorMessage:t.errorMessage});default:return e}},q=a(100),W=a.n(q),J=a(40),V=J.a().shape({email:J.b().required().min(2),password:J.b().required().min(8)}),B=J.a().shape({email:J.b().email().required().min(7),password:J.b().required().min(8),passwordConfirmation:J.b().required().label("Confirm password").test("passwordConfirmation","Passwords must match!",(function(e){return this.parent.password===e}))}),K=J.a().shape({email:J.b().email().required()}),X=J.a().shape({password:J.b().required().min(8),passwordConfirmation:J.b().required().test("passwordConfirmation","Passwords must match!",(function(e){return this.parent.password===e}))}),Z=function(){var e=Object(m.b)(),t=Object(F.d)({resolver:Object(G.a)(V)}),a=t.register,n=t.handleSubmit,s=t.errors,c=t.control,o=t.reset,l=Object(m.c)((function(e){return e.profile.isAuth})),d=Object(m.c)((function(e){return e.singInReducer})),E=d.isFetching;d.errorMessage;return l?r.a.createElement(u.a,{to:"/profile"}):r.a.createElement("div",{className:W.a.signInPage},r.a.createElement("div",null,r.a.createElement("h3",null,"SignIn")),r.a.createElement("form",{onSubmit:n((function(t){var a=t.email,n=t.password,r=t.rememberMe;e(function(e,t,a){return function(){var n=Object(_.a)(h.a.mark((function n(r){var s;return h.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,r(z(!0)),r(D("")),n.next=5,I(e,t,a);case 5:s=n.sent,P.set("auth_token",s.token),r(M(s._id,s.email,s.success)),r(N()),n.next=15;break;case 11:n.prev=11,n.t0=n.catch(0),r(D(n.t0.response.data.error)),console.log(n.t0.message);case 15:r(z(!1));case 16:case"end":return n.stop()}}),n,null,[[0,11]])})));return function(e){return n.apply(this,arguments)}}()}(a,n,r))})),className:W.a.signInPage__form},r.a.createElement("div",null,r.a.createElement(F.a,{as:x.a,name:"email",control:c,placeholder:"Email"}),s.email&&r.a.createElement(U.a,{message:"Login is required",type:"error",showIcon:!0})),r.a.createElement("div",null,r.a.createElement(F.a,{as:x.a.Password,name:"password",control:c,placeholder:"Password"}),s.password&&r.a.createElement(U.a,{message:"Password is required",type:"error",showIcon:!0})),r.a.createElement(i.b,{to:"/forgot"},"Forgot your password?"),r.a.createElement("div",null,r.a.createElement("input",{type:"checkbox",name:"rememberMe",ref:a})," Remember me"),r.a.createElement(p.a,{onClick:function(){return o()},loading:E,htmlType:"submit",type:"primary"},"Sign In")),r.a.createElement("span",null,"or"),r.a.createElement(i.b,{to:"/register"},"Registration"))},Y=y.a.create({baseURL:"https://cards-nya-back.herokuapp.com/1.0/"}),Q=function(e,t){return Y.post("auth/register",{email:e,password:t}).then((function(e){return e.data}))},$="authorization-module-project/registerReducer/SET_USER_DATA_SUCCESS",ee={addedUser:{created:null,email:null,isAdmin:!1,name:null,publicCardPacksCount:null,rememberMe:!1,updated:null,verified:!1,__v:null,_id:null},success:!1},te=function(e){return{type:$,payload:Object(b.a)({},e)}},ae=a(103),ne=a.n(ae),re=function(){var e,t,a,s=Object(m.c)((function(e){return e.register.success})),c=Object(m.b)(),o=Object(F.d)({resolver:Object(G.a)(B)}),l=o.handleSubmit,d=o.errors,E=o.control,f=o.reset,g=Object(n.useCallback)((function(e,t){return c(function(e,t){return function(){var a=Object(_.a)(h.a.mark((function a(n){var r;return h.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,Q(e,t);case 3:r=a.sent,n(te(r)),a.next=10;break;case 7:a.prev=7,a.t0=a.catch(0),console.log(a.t0);case 10:case"end":return a.stop()}}),a,null,[[0,7]])})));return function(e){return a.apply(this,arguments)}}()}(e,t))}),[c]);return s?r.a.createElement(u.a,{to:"/sign-in"}):r.a.createElement("div",{className:ne.a.registerPage},r.a.createElement("div",null,r.a.createElement("h3",null,"Registration")),r.a.createElement("form",{onSubmit:l((function(e){g(e.email,e.password)})),className:ne.a.registerPage__form},r.a.createElement(F.a,{as:x.a,name:"email",control:E,placeholder:"Email"}),r.a.createElement("p",null,null===(e=d.email)||void 0===e?void 0:e.message),r.a.createElement(F.a,{as:x.a.Password,name:"password",type:"password",control:E,placeholder:"Password"}),r.a.createElement("p",null,null===(t=d.password)||void 0===t?void 0:t.message),r.a.createElement(F.a,{as:x.a.Password,type:"password",name:"passwordConfirmation",control:E,placeholder:"Confirm password"}),r.a.createElement("p",null,null===(a=d.passwordConfirmation)||void 0===a?void 0:a.message),r.a.createElement(p.a,{onClick:function(){return f()},htmlType:"submit",type:"primary"},"Register")),r.a.createElement(i.b,{to:"/sign-in"},"Sign In"))},se=a(88),ce=a.n(se),oe=y.a.create({baseURL:"https://cards-nya-back.herokuapp.com/1.0/"}),ie=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"<a href='http://localhost:3000/authorization-module#/set-new-password'",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:">reset-password-link</a>";return oe.post("/auth/forgot",{email:e,html1:t,html2:a}).then((function(e){return e.data}))},le={success:!1,errorMessage:"",isFetching:!1},ue=function(e){return{type:"FORGOTPAGE/CHANGE_PASSWORD_SUCCESS",success:e}},me=function(e){return{type:"FORGOTPAGE/CHANGE_PASSWORD_ERROR",errorMessage:e}},de=function(e){return{type:"FORGOTPAGE/TOGGLE_IS_FETCHING",isFetching:e}},pe=a(246);function Ee(){return r.a.createElement(pe.a,{status:"success",title:"Check your email",subTitle:"We've sent an email to ... . Click the link in the email to reset your password\r If you don't see the email, check other places it might be, like your junk, social, spam, or other folders."})}var fe=function(){var e,t=Object(F.d)({resolver:Object(G.a)(K)}),a=t.handleSubmit,s=t.errors,c=t.control,o=t.reset,l=Object(m.c)((function(e){return e.forgotPage})),u=l.errorMessage,d=l.isFetching,E=l.success,f=Object(m.b)(),g=Object(n.useCallback)((function(e){return f((t=e,function(){var e=Object(_.a)(h.a.mark((function e(a){var n,r,s;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(de(!0)),a(me("")),e.next=5,ie(t);case 5:n=e.sent,r=n.html.match(/(.*)set-new-password'(.*?)>(.*)/),s=r[2],P.set("resetPasswordToken",s),a(ue(n.success)),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(0),a(me(e.t0.response.data.error)),console.log(e.t0.message);case 16:a(de(!1));case 17:case"end":return e.stop()}}),e,null,[[0,12]])})));return function(t){return e.apply(this,arguments)}}()));var t}),[f]);return console.log("Render Forgot"),E?r.a.createElement(Ee,null):r.a.createElement("div",{className:ce.a.forgotPage},u&&r.a.createElement(U.a,{message:u,type:"warning",showIcon:!0}),r.a.createElement("h3",null,"Forgot password?"),r.a.createElement("span",null,"Please enter ",r.a.createElement("b",null,"email")," that you used to sign in"),r.a.createElement("form",{className:ce.a.forgotForm,onSubmit:a((function(e){g(e.email)}))},r.a.createElement("div",{className:ce.a.error},s.email?r.a.createElement(U.a,{message:null===(e=s.email)||void 0===e?void 0:e.message,type:"error",showIcon:!0}):null),r.a.createElement(F.a,{as:x.a,name:"email",control:c,placeholder:"Email"}),r.a.createElement(p.a,{onClick:function(){return o()},loading:d,htmlType:"submit",type:"primary"},"Send email")),r.a.createElement(i.b,{to:"/sign-in"},"Sign In"))},ge=a(89),he=a.n(ge),_e=y.a.create({baseURL:"https://cards-nya-back.herokuapp.com/1.0/"}),be=function(e,t){return _e.post("/auth/set-new-password",{resetPasswordToken:e,password:t}).then((function(e){return e.data}))},ve={success:!1,errorMessage:"",isFetching:!1},we=function(e){return{type:"RESET/SET_NEW_PASS_SUCCESS",success:e}},Se=function(e){return{type:"RESET/SET_NEW_PASS_ERROR",message:e}},Pe=function(e){return{type:"RESET/TOGGLE_IS_FETCHING",isFetching:e}},Oe=function(){var e,t,a=Object(F.d)({resolver:Object(G.a)(X)}),s=a.handleSubmit,c=a.errors,o=a.control,i=a.reset,l=Object(m.c)((function(e){return e.restPass})),d=l.success,E=l.isFetching,f=Object(m.b)(),g=Object(n.useCallback)((function(e){return f((t=e,function(){var e=Object(_.a)(h.a.mark((function e(a){var n,r;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(Pe(!0)),n=P.get("resetPasswordToken"),e.next=5,be(n,t);case 5:r=e.sent,a(we(r)),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),a(Se(e.t0.response.data.error)),console.log(e.t0.message);case 13:a(Pe(!1));case 14:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}()));var t}),[f]);return d?r.a.createElement(u.a,{to:"/sign-in"}):r.a.createElement("div",{className:he.a.setNewPassPage},r.a.createElement("div",{className:he.a.setNewPassPage__info},r.a.createElement("h3",null,"Choose a New Password"),r.a.createElement("span",null,"Create a new password that is at least 8 characters long")),r.a.createElement("form",{onSubmit:s((function(e){g(e.password)})),className:he.a.setNewPassPage__form},r.a.createElement(F.a,{as:x.a.Password,name:"password",type:"password",control:o,placeholder:"Password"}),r.a.createElement("p",null,null===(e=c.password)||void 0===e?void 0:e.message),r.a.createElement(F.a,{as:x.a.Password,type:"password",name:"passwordConfirmation",control:o,placeholder:"Confirm password"}),r.a.createElement("p",null,null===(t=c.passwordConfirmation)||void 0===t?void 0:t.message),r.a.createElement(p.a,{onClick:function(){return i()},loading:E,htmlType:"submit",type:"primary"},"Continue")))},ye={initialize:!1},ke=function(){return{type:"APP/SET_INITIALIZE_APP"}},Ie=a(241),Re=a(145),Ce=a.n(Re);function Te(){return r.a.createElement("div",{className:Ce.a.example},r.a.createElement(Ie.a,null))}var je=function(){var e=Object(m.b)();return Object(n.useEffect)((function(){e(function(){var e=Object(_.a)(h.a.mark((function e(t){var a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t(N());case 3:a=e.sent,Promise.all([a]).then((function(){return t(ke())})),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}())}),[e]),Object(m.c)((function(e){return e.initializeApp.initialize}))?r.a.createElement("div",{className:"main"},r.a.createElement(l,null),r.a.createElement(u.d,null,r.a.createElement(u.b,{path:"/profile",render:function(){return r.a.createElement(A,null)}}),r.a.createElement(u.b,{path:"/sign-in",render:function(){return r.a.createElement(Z,null)}}),r.a.createElement(u.b,{path:"/register",render:function(){return r.a.createElement(re,null)}}),r.a.createElement(u.b,{path:"/forgot",render:function(){return r.a.createElement(fe,null)}}),r.a.createElement(u.b,{path:"/set-new-password",render:function(){return r.a.createElement(Oe,null)}}))):r.a.createElement(Te,null)},Ne=a(74),Ae=a(147),Fe=Object(Ne.c)({forgotPage:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:le,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FORGOTPAGE/CHANGE_PASSWORD_SUCCESS":return Object(b.a)({},e,{success:t.success});case"FORGOTPAGE/CHANGE_PASSWORD_ERROR":return Object(b.a)({},e,{errorMessage:t.errorMessage});case"FORGOTPAGE/TOGGLE_IS_FETCHING":return Object(b.a)({},e,{isFetching:t.isFetching});default:return e}},register:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ee,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case $:return Object(b.a)({},e,{addedUser:Object(b.a)({},t.payload.addedUser),success:t.payload.success});default:return e}},profile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:C,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"USER_PROFILE/SET_PROFILE_DATA":return Object(b.a)({},e,{},t.payload);case"USER_PROFILE/SET_AUTH_VALUE":return Object(b.a)({},e,{isAuth:t.isAuth});default:return e}},initializeApp:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ye,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"APP/SET_INITIALIZE_APP":return Object(b.a)({},e,{initialize:!0});default:return e}},restPass:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ve,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RESET/SET_NEW_PASS_SUCCESS":return Object(b.a)({},e,{success:t.success});case"RESET/SET_NEW_PASS_ERROR":return Object(b.a)({},e,{errorMessage:t.message});case"RESET/TOGGLE_IS_FETCHING":return Object(b.a)({},e,{isFetching:t.isFetching});default:return e}},singInReducer:H}),Ge=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__,xe=Object(Ne.d)(Fe,Ge(Object(Ne.a)(Ae.a)));c.a.render(r.a.createElement(i.a,null,r.a.createElement(m.a,{store:xe},r.a.createElement(je,null))),document.getElementById("root"))},88:function(e,t,a){e.exports={forgotPage:"Forgot_forgotPage__neKLE",error:"Forgot_error__BLT2U",forgotForm:"Forgot_forgotForm__UfYTJ"}},89:function(e,t,a){e.exports={setNewPassPage:"SetNewPass_setNewPassPage__3smxh",setNewPassPage__info:"SetNewPass_setNewPassPage__info__DRlit",setNewPassPage__form:"SetNewPass_setNewPassPage__form__21O7x"}}},[[152,1,2]]]);
//# sourceMappingURL=main.fb9321ac.chunk.js.map