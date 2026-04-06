const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Dashboard-CezmZwma.js","assets/router-Ckuh80Va.js","assets/Shared-Bq-r7IMP.js","assets/charts-DN9rSpQU.js","assets/clock-wX_ybxY8.js","assets/firebase-BIi6xqhk.js","assets/Jobs-DhAGLc2l.js","assets/trash-2-CNdftPch.js","assets/search-Bb7eNt-d.js","assets/map-pin-Dk0UFm4T.js","assets/circle-x-BZHMjGgG.js","assets/Candidates-CmUheGPV.js","assets/user-CqCN3hNq.js","assets/phone-Bj9j8W_D.js","assets/Recruiters-CCrSfmLF.js","assets/Companies-B3QZEn6J.js","assets/RecruitmentPartners-DX0chTTO.js","assets/Pipeline-DZ7zBNZQ.js","assets/Attendance-aQprCePK.js","assets/Teams-DtkWKYEj.js","assets/UserManagement-C3bHBSFn.js"])))=>i.map(i=>d[i]);
import{r as I,a as fr,N as j,u as mr,R as M,B as gr,b as yr,d as N}from"./router-Ckuh80Va.js";import{L as _r,g as zt,i as Ir,a as wr,_ as gt,C as yt,r as _t,b as vr,S as ke,E as rt,c as U,d as te,e as kr,f as Bt,h as C,F as it,j as Er,q as Ee,k as st,l as $t,m as Tr,n as Sr,o as Xe,p as br,s as Rr,t as Pr,u as ye,v as _e,w as Ar,x as Cr,y as Or,z as Nr,A as at,B as xr,D as Lr,G as Mr,H as Dr}from"./firebase-BIi6xqhk.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();var qt={exports:{}},He={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jr=I,Ur=Symbol.for("react.element"),Fr=Symbol.for("react.fragment"),Vr=Object.prototype.hasOwnProperty,Hr=jr.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Wr={key:!0,ref:!0,__self:!0,__source:!0};function Kt(n,e,t){var r,i={},s=null,a=null;t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);for(r in e)Vr.call(e,r)&&!Wr.hasOwnProperty(r)&&(i[r]=e[r]);if(n&&n.defaultProps)for(r in e=n.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:Ur,type:n,key:s,ref:a,props:i,_owner:Hr.current}}He.Fragment=Fr;He.jsx=Kt;He.jsxs=Kt;qt.exports=He;var o=qt.exports,Qe={},It=fr;Qe.createRoot=It.createRoot,Qe.hydrateRoot=It.hydrateRoot;const zr="modulepreload",Br=function(n){return"/"+n},wt={},H=function(e,t,r){let i=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),c=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));i=Promise.allSettled(t.map(d=>{if(d=Br(d),d in wt)return;wt[d]=!0;const p=d.endsWith(".css"),_=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${_}`))return;const m=document.createElement("link");if(m.rel=p?"stylesheet":zr,p||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),p)return new Promise((v,T)=>{m.addEventListener("load",v),m.addEventListener("error",()=>T(new Error(`Unable to preload CSS for ${d}`)))})}))}function s(a){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=a,window.dispatchEvent(c),!c.defaultPrevented)throw a}return i.then(a=>{for(const c of a||[])c.status==="rejected"&&s(c.reason);return e().catch(s)})};async function Ze(n){const t=new TextEncoder().encode(n+"_hiretrakkr_salt"),r=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(r)).map(s=>s.toString(16).padStart(2,"0")).join("")}async function $r(n,e){return await Ze(n)===e}const qr="3.0";function Kr({companies:n,teams:e,users:t,recruiters:r,recruitmentPartners:i,jobs:s,candidates:a,attendance:c}){const d={app:"HireTrakkr",version:qr,exportedAt:new Date().toISOString(),exportedDate:new Date().toLocaleDateString("en-IN"),data:{companies:n||[],teams:e||[],users:t||[],recruiters:r||[],recruitmentPartners:i||[],jobs:s||[],candidates:a||[],attendance:c||[]}},p=JSON.stringify(d,null,2),_=new Blob([p],{type:"application/json"}),m=URL.createObjectURL(_),v=document.createElement("a");return v.href=m,v.download=`HireTrakkr_Backup_${new Date().toISOString().slice(0,10)}.json`,document.body.appendChild(v),v.click(),document.body.removeChild(v),URL.revokeObjectURL(m),!0}function Gr(n){return new Promise((e,t)=>{if(!n||!n.name.endsWith(".json")){t(new Error("Please upload a valid .json backup file"));return}const r=new FileReader;r.onload=i=>{try{const s=JSON.parse(i.target.result);if(s.app!=="HireTrakkr"){t(new Error("This file is not a HireTrakkr backup"));return}if(!s.data){t(new Error("Backup file is corrupted or invalid"));return}s.data.recruitmentPartners=s.data.recruitmentPartners||[],s.data.companies=s.data.companies||[],s.data.teams=s.data.teams||[],s.data.users=s.data.users||[],s.data.recruiters=s.data.recruiters||[],s.data.jobs=s.data.jobs||[],s.data.candidates=s.data.candidates||[],s.data.attendance=s.data.attendance||[],e(s)}catch{t(new Error("Could not read file — it may be corrupted"))}},r.onerror=()=>t(new Error("Failed to read file")),r.readAsText(n)})}function Gt(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Jr=Gt,Jt=new rt("auth","Firebase",Gt());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Me=new _r("@firebase/auth");function Yr(n,...e){Me.logLevel<=Bt.WARN&&Me.warn(`Auth (${ke}): ${n}`,...e)}function Oe(n,...e){Me.logLevel<=Bt.ERROR&&Me.error(`Auth (${ke}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(n,...e){throw ot(n,...e)}function F(n,...e){return ot(n,...e)}function Yt(n,e,t){const r={...Jr(),[e]:t};return new rt("auth","Firebase",r).create(e,{appName:n.name})}function ee(n){return Yt(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ot(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Jt.create(n,...e)}function g(n,e,...t){if(!n)throw ot(e,...t)}function W(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Oe(e),new Error(e)}function B(n,e){n||W(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function et(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Xr(){return vt()==="http:"||vt()==="https:"}function vt(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qr(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xr()||vr()||"connection"in navigator)?navigator.onLine:!0}function Zr(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e,t){this.shortDelay=e,this.longDelay=t,B(t>e,"Short delay should be less than long delay!"),this.isMobile=Ir()||wr()}get(){return Qr()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ct(n,e){B(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;W("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;W("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;W("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ei={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ti=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],ni=new Te(3e4,6e4);function ae(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function ne(n,e,t,r,i={}){return Qt(n,i,async()=>{let s={},a={};r&&(e==="GET"?a=r:s={body:JSON.stringify(r)});const c=Ee({key:n.config.apiKey,...a}).slice(1),d=await n._getAdditionalHeaders();d["Content-Type"]="application/json",n.languageCode&&(d["X-Firebase-Locale"]=n.languageCode);const p={method:e,headers:d,...s};return Ar()||(p.referrerPolicy="no-referrer"),n.emulatorConfig&&st(n.emulatorConfig.host)&&(p.credentials="include"),Xt.fetch()(await Zt(n,n.config.apiHost,t,c),p)})}async function Qt(n,e,t){n._canInitEmulator=!1;const r={...ei,...e};try{const i=new ii(n),s=await Promise.race([t(),i.promise]);i.clearNetworkTimeout();const a=await s.json();if("needConfirmation"in a)throw Ce(n,"account-exists-with-different-credential",a);if(s.ok&&!("errorMessage"in a))return a;{const c=s.ok?a.errorMessage:a.error.message,[d,p]=c.split(" : ");if(d==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ce(n,"credential-already-in-use",a);if(d==="EMAIL_EXISTS")throw Ce(n,"email-already-in-use",a);if(d==="USER_DISABLED")throw Ce(n,"user-disabled",a);const _=r[d]||d.toLowerCase().replace(/[_\s]+/g,"-");if(p)throw Yt(n,_,p);L(n,_)}}catch(i){if(i instanceof it)throw i;L(n,"network-request-failed",{message:String(i)})}}async function We(n,e,t,r,i={}){const s=await ne(n,e,t,r,i);return"mfaPendingCredential"in s&&L(n,"multi-factor-auth-required",{_serverResponse:s}),s}async function Zt(n,e,t,r){const i=`${e}${t}?${r}`,s=n,a=s.config.emulator?ct(n.config,i):`${n.config.apiScheme}://${i}`;return ti.includes(t)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(a).toString():a}function ri(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class ii{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(F(this.auth,"network-request-failed")),ni.get())})}}function Ce(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const i=F(n,e,r);return i.customData._tokenResponse=t,i}function kt(n){return n!==void 0&&n.enterprise!==void 0}class si{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return ri(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function ai(n,e){return ne(n,"GET","/v2/recaptchaConfig",ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oi(n,e){return ne(n,"POST","/v1/accounts:delete",e)}async function De(n,e){return ne(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function ci(n,e=!1){const t=te(n),r=await t.getIdToken(e),i=lt(r);g(i&&i.exp&&i.auth_time&&i.iat,t.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,a=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Ie(Ke(i.auth_time)),issuedAtTime:Ie(Ke(i.iat)),expirationTime:Ie(Ke(i.exp)),signInProvider:a||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function Ke(n){return Number(n)*1e3}function lt(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Oe("JWT malformed, contained fewer than 3 sections"),null;try{const i=Er(t);return i?JSON.parse(i):(Oe("Failed to decode base64 JWT payload"),null)}catch(i){return Oe("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Et(n){const e=lt(n);return g(e,"internal-error"),g(typeof e.exp<"u","internal-error"),g(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function we(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof it&&li(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function li({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class di{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Ie(this.lastLoginAt),this.creationTime=Ie(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function je(n){var m;const e=n.auth,t=await n.getIdToken(),r=await we(n,De(e,{idToken:t}));g(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];n._notifyReloadListener(i);const s=(m=i.providerUserInfo)!=null&&m.length?en(i.providerUserInfo):[],a=hi(n.providerData,s),c=n.isAnonymous,d=!(n.email&&i.passwordHash)&&!(a!=null&&a.length),p=c?d:!1,_={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new tt(i.createdAt,i.lastLoginAt),isAnonymous:p};Object.assign(n,_)}async function ui(n){const e=te(n);await je(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function hi(n,e){return[...n.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function en(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pi(n,e){const t=await Qt(n,{},async()=>{const r=Ee({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=n.config,a=await Zt(n,i,"/v1/token",`key=${s}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const d={method:"POST",headers:c,body:r};return n.emulatorConfig&&st(n.emulatorConfig.host)&&(d.credentials="include"),Xt.fetch()(a,d)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function fi(n,e){return ne(n,"POST","/v2/accounts:revokeToken",ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class de{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){g(e.idToken,"internal-error"),g(typeof e.idToken<"u","internal-error"),g(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Et(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){g(e.length!==0,"internal-error");const t=Et(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(g(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:i,expiresIn:s}=await pi(e,t);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:i,expirationTime:s}=t,a=new de;return r&&(g(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),i&&(g(typeof i=="string","internal-error",{appName:e}),a.accessToken=i),s&&(g(typeof s=="number","internal-error",{appName:e}),a.expirationTime=s),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new de,this.toJSON())}_performRefresh(){return W("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function K(n,e){g(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class x{constructor({uid:e,auth:t,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new di(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new tt(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const t=await we(this,this.stsTokenManager.getToken(this.auth,e));return g(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return ci(this,e)}reload(){return ui(this)}_assign(e){this!==e&&(g(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new x({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){g(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await je(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(U(this.auth.app))return Promise.reject(ee(this.auth));const e=await this.getIdToken();return await we(this,oi(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,i=t.email??void 0,s=t.phoneNumber??void 0,a=t.photoURL??void 0,c=t.tenantId??void 0,d=t._redirectEventId??void 0,p=t.createdAt??void 0,_=t.lastLoginAt??void 0,{uid:m,emailVerified:v,isAnonymous:T,providerData:b,stsTokenManager:k}=t;g(m&&k,e,"internal-error");const y=de.fromJSON(this.name,k);g(typeof m=="string",e,"internal-error"),K(r,e.name),K(i,e.name),g(typeof v=="boolean",e,"internal-error"),g(typeof T=="boolean",e,"internal-error"),K(s,e.name),K(a,e.name),K(c,e.name),K(d,e.name),K(p,e.name),K(_,e.name);const $=new x({uid:m,auth:e,email:i,emailVerified:v,displayName:r,isAnonymous:T,photoURL:a,phoneNumber:s,tenantId:c,stsTokenManager:y,createdAt:p,lastLoginAt:_});return b&&Array.isArray(b)&&($.providerData=b.map(oe=>({...oe}))),d&&($._redirectEventId=d),$}static async _fromIdTokenResponse(e,t,r=!1){const i=new de;i.updateFromServerResponse(t);const s=new x({uid:t.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await je(s),s}static async _fromGetAccountInfoResponse(e,t,r){const i=t.users[0];g(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?en(i.providerUserInfo):[],a=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),c=new de;c.updateFromIdToken(r);const d=new x({uid:i.localId,auth:e,stsTokenManager:c,isAnonymous:a}),p={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new tt(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(d,p),d}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new Map;function z(n){B(n instanceof Function,"Expected a class definition");let e=Tt.get(n);return e?(B(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Tt.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}tn.type="NONE";const St=tn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ne(n,e,t){return`firebase:${n}:${e}:${t}`}class ue{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Ne(this.userKey,i.apiKey,s),this.fullPersistenceKey=Ne("persistence",i.apiKey,s),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await De(this.auth,{idToken:e}).catch(()=>{});return t?x._fromGetAccountInfoResponse(this.auth,t,e):null}return x._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new ue(z(St),e,r);const i=(await Promise.all(t.map(async p=>{if(await p._isAvailable())return p}))).filter(p=>p);let s=i[0]||z(St);const a=Ne(r,e.config.apiKey,e.name);let c=null;for(const p of t)try{const _=await p._get(a);if(_){let m;if(typeof _=="string"){const v=await De(e,{idToken:_}).catch(()=>{});if(!v)break;m=await x._fromGetAccountInfoResponse(e,v,_)}else m=x._fromJSON(e,_);p!==s&&(c=m),s=p;break}}catch{}const d=i.filter(p=>p._shouldAllowMigration);return!s._shouldAllowMigration||!d.length?new ue(s,e,r):(s=d[0],c&&await s._set(a,c.toJSON()),await Promise.all(t.map(async p=>{if(p!==s)try{await p._remove(a)}catch{}})),new ue(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(an(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nn(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(cn(e))return"Blackberry";if(ln(e))return"Webos";if(rn(e))return"Safari";if((e.includes("chrome/")||sn(e))&&!e.includes("edge/"))return"Chrome";if(on(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function nn(n=C()){return/firefox\//i.test(n)}function rn(n=C()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sn(n=C()){return/crios\//i.test(n)}function an(n=C()){return/iemobile/i.test(n)}function on(n=C()){return/android/i.test(n)}function cn(n=C()){return/blackberry/i.test(n)}function ln(n=C()){return/webos/i.test(n)}function dt(n=C()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function mi(n=C()){var e;return dt(n)&&!!((e=window.navigator)!=null&&e.standalone)}function gi(){return Rr()&&document.documentMode===10}function dn(n=C()){return dt(n)||on(n)||ln(n)||cn(n)||/windows phone/i.test(n)||an(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function un(n,e=[]){let t;switch(n){case"Browser":t=bt(C());break;case"Worker":t=`${bt(C())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${ke}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=s=>new Promise((a,c)=>{try{const d=e(s);a(d)}catch(d){c(d)}});r.onAbort=t,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const i of t)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _i(n,e={}){return ne(n,"GET","/v2/passwordPolicy",ae(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii=6;class wi{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Ii,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),i&&(t.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vi{constructor(e,t,r,i){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Rt(this),this.idTokenSubscription=new Rt(this),this.beforeStateQueue=new yi(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Jt,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=z(t)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await ue.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await De(this,{idToken:e}),r=await x._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(U(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(s=this.redirectUser)==null?void 0:s._redirectEventId,c=r==null?void 0:r._redirectEventId,d=await this.tryRedirectSignIn(e);(!a||a===c)&&(d!=null&&d.user)&&(r=d.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return g(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await je(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Zr()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(U(this.app))return Promise.reject(ee(this));const t=e?te(e):null;return t&&g(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&g(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return U(this.app)?Promise.reject(ee(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return U(this.app)?Promise.reject(ee(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(z(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await _i(this),t=new wi(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new rt("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await fi(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&z(e)||this._popupRedirectResolver;g(t,this,"argument-error"),this.redirectPersistenceManager=await ue.create(this,[z(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,i){if(this._deleted)return()=>{};const s=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(g(c,this,"internal-error"),c.then(()=>{a||s(this.currentUser)}),typeof t=="function"){const d=e.addObserver(t,r,i);return()=>{a=!0,d()}}else{const d=e.addObserver(t);return()=>{a=!0,d()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return g(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=un(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(U(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Yr(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function fe(n){return te(n)}class Rt{constructor(e){this.auth=e,this.observer=null,this.addObserver=kr(t=>this.observer=t)}get next(){return g(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ze={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function ki(n){ze=n}function hn(n){return ze.loadJS(n)}function Ei(){return ze.recaptchaEnterpriseScript}function Ti(){return ze.gapiScript}function Si(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class bi{constructor(){this.enterprise=new Ri}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class Ri{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const Pi="recaptcha-enterprise",pn="NO_RECAPTCHA";class Ai{constructor(e){this.type=Pi,this.auth=fe(e)}async verify(e="verify",t=!1){async function r(s){if(!t){if(s.tenantId==null&&s._agentRecaptchaConfig!=null)return s._agentRecaptchaConfig.siteKey;if(s.tenantId!=null&&s._tenantRecaptchaConfigs[s.tenantId]!==void 0)return s._tenantRecaptchaConfigs[s.tenantId].siteKey}return new Promise(async(a,c)=>{ai(s,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(d=>{if(d.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const p=new si(d);return s.tenantId==null?s._agentRecaptchaConfig=p:s._tenantRecaptchaConfigs[s.tenantId]=p,a(p.siteKey)}}).catch(d=>{c(d)})})}function i(s,a,c){const d=window.grecaptcha;kt(d)?d.enterprise.ready(()=>{d.enterprise.execute(s,{action:e}).then(p=>{a(p)}).catch(()=>{a(pn)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new bi().execute("siteKey",{action:"verify"}):new Promise((s,a)=>{r(this.auth).then(c=>{if(!t&&kt(window.grecaptcha))i(c,s,a);else{if(typeof window>"u"){a(new Error("RecaptchaVerifier is only supported in browser"));return}let d=Ei();d.length!==0&&(d+=c),hn(d).then(()=>{i(c,s,a)}).catch(p=>{a(p)})}}).catch(c=>{a(c)})})}}async function Pt(n,e,t,r=!1,i=!1){const s=new Ai(n);let a;if(i)a=pn;else try{a=await s.verify(t)}catch{a=await s.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const d=c.phoneEnrollmentInfo.phoneNumber,p=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:d,recaptchaToken:p,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const d=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:d,captchaResponse:a,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:a}):Object.assign(c,{captchaResponse:a}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function At(n,e,t,r,i){var s;if((s=n._getRecaptchaConfig())!=null&&s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const a=await Pt(n,e,t,t==="getOobCode");return r(n,a)}else return r(n,e).catch(async a=>{if(a.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const c=await Pt(n,e,t,t==="getOobCode");return r(n,c)}else return Promise.reject(a)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ci(n,e){const t=$t(n,"auth");if(t.isInitialized()){const i=t.getImmediate(),s=t.getOptions();if(Xe(s,e??{}))return i;L(i,"already-initialized")}return t.initialize({options:e})}function Oi(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(z);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function Ni(n,e,t){const r=fe(n);g(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=fn(e),{host:a,port:c}=xi(e),d=c===null?"":`:${c}`,p={url:`${s}//${a}${d}/`},_=Object.freeze({host:a,port:c,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){g(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),g(Xe(p,r.config.emulator)&&Xe(_,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=p,r.emulatorConfig=_,r.settings.appVerificationDisabledForTesting=!0,st(a)?br(`${s}//${a}${d}`):Li()}function fn(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function xi(n){const e=fn(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Ct(r.substr(s.length+1))}}else{const[s,a]=r.split(":");return{host:s,port:Ct(a)}}}function Ct(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Li(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return W("not implemented")}_getIdTokenResponse(e){return W("not implemented")}_linkToIdToken(e,t){return W("not implemented")}_getReauthenticationResolver(e){return W("not implemented")}}async function Mi(n,e){return ne(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Di(n,e){return We(n,"POST","/v1/accounts:signInWithPassword",ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ji(n,e){return We(n,"POST","/v1/accounts:signInWithEmailLink",ae(n,e))}async function Ui(n,e){return We(n,"POST","/v1/accounts:signInWithEmailLink",ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve extends ut{constructor(e,t,r,i=null){super("password",r),this._email=e,this._password=t,this._tenantId=i}static _fromEmailAndPassword(e,t){return new ve(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new ve(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return At(e,t,"signInWithPassword",Di);case"emailLink":return ji(e,{email:this._email,oobCode:this._password});default:L(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return At(e,r,"signUpPassword",Mi);case"emailLink":return Ui(e,{idToken:t,email:this._email,oobCode:this._password});default:L(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function he(n,e){return We(n,"POST","/v1/accounts:signInWithIdp",ae(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fi="http://localhost";class se extends ut{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new se(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):L("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=t;if(!r||!i)return null;const a=new se(r,i);return a.idToken=s.idToken||void 0,a.accessToken=s.accessToken||void 0,a.secret=s.secret,a.nonce=s.nonce,a.pendingToken=s.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return he(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,he(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,he(e,t)}buildRequest(){const e={requestUri:Fi,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=Ee(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vi(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Hi(n){const e=ye(_e(n)).link,t=e?ye(_e(e)).deep_link_id:null,r=ye(_e(n)).deep_link_id;return(r?ye(_e(r)).link:null)||r||t||e||n}class ht{constructor(e){const t=ye(_e(e)),r=t.apiKey??null,i=t.oobCode??null,s=Vi(t.mode??null);g(r&&i&&s,"argument-error"),this.apiKey=r,this.operation=s,this.code=i,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Hi(e);try{return new ht(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(){this.providerId=me.PROVIDER_ID}static credential(e,t){return ve._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=ht.parseLink(t);return g(r,"argument-error"),ve._fromEmailAndCode(e,r.code,r.tenantId)}}me.PROVIDER_ID="password";me.EMAIL_PASSWORD_SIGN_IN_METHOD="password";me.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mn{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se extends mn{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y extends Se{constructor(){super("facebook.com")}static credential(e){return se._fromParams({providerId:Y.PROVIDER_ID,signInMethod:Y.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Y.credentialFromTaggedObject(e)}static credentialFromError(e){return Y.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Y.credential(e.oauthAccessToken)}catch{return null}}}Y.FACEBOOK_SIGN_IN_METHOD="facebook.com";Y.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class X extends Se{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return se._fromParams({providerId:X.PROVIDER_ID,signInMethod:X.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return X.credentialFromTaggedObject(e)}static credentialFromError(e){return X.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return X.credential(t,r)}catch{return null}}}X.GOOGLE_SIGN_IN_METHOD="google.com";X.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Q extends Se{constructor(){super("github.com")}static credential(e){return se._fromParams({providerId:Q.PROVIDER_ID,signInMethod:Q.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Q.credentialFromTaggedObject(e)}static credentialFromError(e){return Q.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Q.credential(e.oauthAccessToken)}catch{return null}}}Q.GITHUB_SIGN_IN_METHOD="github.com";Q.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z extends Se{constructor(){super("twitter.com")}static credential(e,t){return se._fromParams({providerId:Z.PROVIDER_ID,signInMethod:Z.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Z.credentialFromTaggedObject(e)}static credentialFromError(e){return Z.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return Z.credential(t,r)}catch{return null}}}Z.TWITTER_SIGN_IN_METHOD="twitter.com";Z.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,i=!1){const s=await x._fromIdTokenResponse(e,r,i),a=Ot(r);return new pe({user:s,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const i=Ot(r);return new pe({user:e,providerId:i,_tokenResponse:r,operationType:t})}}function Ot(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue extends it{constructor(e,t,r,i){super(t.code,t.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ue.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,i){return new Ue(e,t,r,i)}}function gn(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?Ue._fromErrorAndOperation(n,s,e,r):s})}async function Wi(n,e,t=!1){const r=await we(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return pe._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function zi(n,e,t=!1){const{auth:r}=n;if(U(r.app))return Promise.reject(ee(r));const i="reauthenticate";try{const s=await we(n,gn(r,i,e,n),t);g(s.idToken,r,"internal-error");const a=lt(s.idToken);g(a,r,"internal-error");const{sub:c}=a;return g(n.uid===c,r,"user-mismatch"),pe._forOperation(n,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&L(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function yn(n,e,t=!1){if(U(n.app))return Promise.reject(ee(n));const r="signIn",i=await gn(n,r,e),s=await pe._fromIdTokenResponse(n,r,i);return t||await n._updateCurrentUser(s.user),s}async function Bi(n,e){return yn(fe(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $i(n){const e=fe(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function qi(n,e,t){return U(n.app)?Promise.reject(ee(n)):Bi(te(n),me.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&$i(n),r})}function Ki(n,e,t,r){return te(n).onIdTokenChanged(e,t,r)}function Gi(n,e,t){return te(n).beforeAuthStateChanged(e,t)}function Ji(n){return te(n).signOut()}const Fe="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Fe,"1"),this.storage.removeItem(Fe),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yi=1e3,Xi=10;class In extends _n{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=dn(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),i=this.localCache[t];r!==i&&e(t,i,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,d)=>{this.notifyListeners(a,d)});return}const r=e.key;t?this.detachListener():this.stopPolling();const i=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},s=this.storage.getItem(r);gi()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,Xi):i()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Yi)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}In.type="LOCAL";const Qi=In;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn extends _n{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}wn.type="SESSION";const vn=wn;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(i=>i.isListeningto(e));if(t)return t;const r=new Be(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:i,data:s}=t.data,a=this.handlersMap[i];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const c=Array.from(a).map(async p=>p(t.origin,s)),d=await Zi(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:d})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Be.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,a;return new Promise((c,d)=>{const p=pt("",20);i.port1.start();const _=setTimeout(()=>{d(new Error("unsupported_event"))},r);a={messageChannel:i,onMessage(m){const v=m;if(v.data.eventId===p)switch(v.data.status){case"ack":clearTimeout(_),s=setTimeout(()=>{d(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),c(v.data.response);break;default:clearTimeout(_),clearTimeout(s),d(new Error("invalid_response"));break}}},this.handlers.add(a),i.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:p,data:t},[i.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(){return window}function ts(n){V().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kn(){return typeof V().WorkerGlobalScope<"u"&&typeof V().importScripts=="function"}async function ns(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function rs(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function is(){return kn()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const En="firebaseLocalStorageDb",ss=1,Ve="firebaseLocalStorage",Tn="fbase_key";class be{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function $e(n,e){return n.transaction([Ve],e?"readwrite":"readonly").objectStore(Ve)}function as(){const n=indexedDB.deleteDatabase(En);return new be(n).toPromise()}function nt(){const n=indexedDB.open(En,ss);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Ve,{keyPath:Tn})}catch(i){t(i)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Ve)?e(r):(r.close(),await as(),e(await nt()))})})}async function Nt(n,e,t){const r=$e(n,!0).put({[Tn]:e,value:t});return new be(r).toPromise()}async function os(n,e){const t=$e(n,!1).get(e),r=await new be(t).toPromise();return r===void 0?null:r.value}function xt(n,e){const t=$e(n,!0).delete(e);return new be(t).toPromise()}const cs=800,ls=3;class Sn{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await nt(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>ls)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return kn()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Be._getInstance(is()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await ns(),!this.activeServiceWorker)return;this.sender=new es(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||rs()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await nt();return await Nt(e,Fe,"1"),await xt(e,Fe),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Nt(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>os(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>xt(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=$e(i,!1).getAll();return new be(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),t.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),t.push(i));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),cs)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Sn.type="LOCAL";const ds=Sn;new Te(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function us(n,e){return e?z(e):(g(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends ut{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return he(e,this._buildIdpRequest())}_linkToIdToken(e,t){return he(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return he(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function hs(n){return yn(n.auth,new ft(n),n.bypassAuthState)}function ps(n){const{auth:e,user:t}=n;return g(t,e,"internal-error"),zi(t,new ft(n),n.bypassAuthState)}async function fs(n){const{auth:e,user:t}=n;return g(t,e,"internal-error"),Wi(t,new ft(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:i,tenantId:s,error:a,type:c}=e;if(a){this.reject(a);return}const d={auth:this.auth,requestUri:t,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(d))}catch(p){this.reject(p)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return hs;case"linkViaPopup":case"linkViaRedirect":return fs;case"reauthViaPopup":case"reauthViaRedirect":return ps;default:L(this.auth,"internal-error")}}resolve(e){B(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){B(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ms=new Te(2e3,1e4);class le extends bn{constructor(e,t,r,i,s){super(e,t,i,s),this.provider=r,this.authWindow=null,this.pollId=null,le.currentPopupAction&&le.currentPopupAction.cancel(),le.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return g(e,this.auth,"internal-error"),e}async onExecution(){B(this.filter.length===1,"Popup operations only handle one event");const e=pt();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(F(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(F(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,le.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,ms.get())};e()}}le.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs="pendingRedirect",xe=new Map;class ys extends bn{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=xe.get(this.auth._key());if(!e){try{const r=await _s(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}xe.set(this.auth._key(),e)}return this.bypassAuthState||xe.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function _s(n,e){const t=vs(e),r=ws(n);if(!await r._isAvailable())return!1;const i=await r._get(t)==="true";return await r._remove(t),i}function Is(n,e){xe.set(n._key(),e)}function ws(n){return z(n._redirectPersistence)}function vs(n){return Ne(gs,n.config.apiKey,n.name)}async function ks(n,e,t=!1){if(U(n.app))return Promise.reject(ee(n));const r=fe(n),i=us(r,e),a=await new ys(r,i,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Es=10*60*1e3;class Ts{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Ss(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Rn(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(F(this.auth,i))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Es&&this.cachedEventUids.clear(),this.cachedEventUids.has(Lt(e))}saveEventToCache(e){this.cachedEventUids.add(Lt(e)),this.lastProcessedEventTime=Date.now()}}function Lt(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Rn({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Ss(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Rn(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bs(n,e={}){return ne(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ps=/^https?/;async function As(n){if(n.config.emulator)return;const{authorizedDomains:e}=await bs(n);for(const t of e)try{if(Cs(t))return}catch{}L(n,"unauthorized-domain")}function Cs(n){const e=et(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!Ps.test(t))return!1;if(Rs.test(n))return r===n;const i=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=new Te(3e4,6e4);function Mt(){const n=V().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ns(n){return new Promise((e,t)=>{var i,s,a;function r(){Mt(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Mt(),t(F(n,"network-request-failed"))},timeout:Os.get()})}if((s=(i=V().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((a=V().gapi)!=null&&a.load)r();else{const c=Si("iframefcb");return V()[c]=()=>{gapi.load?r():t(F(n,"network-request-failed"))},hn(`${Ti()}?onload=${c}`).catch(d=>t(d))}}).catch(e=>{throw Le=null,e})}let Le=null;function xs(n){return Le=Le||Ns(n),Le}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls=new Te(5e3,15e3),Ms="__/auth/iframe",Ds="emulator/auth/iframe",js={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Us=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Fs(n){const e=n.config;g(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?ct(e,Ds):`https://${n.config.authDomain}/${Ms}`,r={apiKey:e.apiKey,appName:n.name,v:ke},i=Us.get(n.config.apiHost);i&&(r.eid=i);const s=n._getFrameworks();return s.length&&(r.fw=s.join(",")),`${t}?${Ee(r).slice(1)}`}async function Vs(n){const e=await xs(n),t=V().gapi;return g(t,n,"internal-error"),e.open({where:document.body,url:Fs(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:js,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const a=F(n,"network-request-failed"),c=V().setTimeout(()=>{s(a)},Ls.get());function d(){V().clearTimeout(c),i(r)}r.ping(d).then(d,()=>{s(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hs={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ws=500,zs=600,Bs="_blank",$s="http://localhost";class Dt{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function qs(n,e,t,r=Ws,i=zs){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const d={...Hs,width:r.toString(),height:i.toString(),top:s,left:a},p=C().toLowerCase();t&&(c=sn(p)?Bs:t),nn(p)&&(e=e||$s,d.scrollbars="yes");const _=Object.entries(d).reduce((v,[T,b])=>`${v}${T}=${b},`,"");if(mi(p)&&c!=="_self")return Ks(e||"",c),new Dt(null);const m=window.open(e||"",c,_);g(m,n,"popup-blocked");try{m.focus()}catch{}return new Dt(m)}function Ks(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs="__/auth/handler",Js="emulator/auth/handler",Ys=encodeURIComponent("fac");async function jt(n,e,t,r,i,s){g(n.config.authDomain,n,"auth-domain-config-required"),g(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:ke,eventId:i};if(e instanceof mn){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Pr(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[_,m]of Object.entries({}))a[_]=m}if(e instanceof Se){const _=e.getScopes().filter(m=>m!=="");_.length>0&&(a.scopes=_.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const _ of Object.keys(c))c[_]===void 0&&delete c[_];const d=await n._getAppCheckToken(),p=d?`#${Ys}=${encodeURIComponent(d)}`:"";return`${Xs(n)}?${Ee(c).slice(1)}${p}`}function Xs({config:n}){return n.emulator?ct(n,Js):`https://${n.authDomain}/${Gs}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ge="webStorageSupport";class Qs{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=vn,this._completeRedirectFn=ks,this._overrideRedirectResult=Is}async _openPopup(e,t,r,i){var a;B((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const s=await jt(e,t,r,et(),i);return qs(e,s,pt())}async _openRedirect(e,t,r,i){await this._originValidation(e);const s=await jt(e,t,r,et(),i);return ts(s),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:i,promise:s}=this.eventManagers[t];return i?Promise.resolve(i):(B(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Vs(e),r=new Ts(e);return t.register("authEvent",i=>(g(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ge,{type:Ge},i=>{var a;const s=(a=i==null?void 0:i[0])==null?void 0:a[Ge];s!==void 0&&t(!!s),L(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=As(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return dn()||rn()||dt()}}const Zs=Qs;var Ut="@firebase/auth",Ft="1.12.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ea{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){g(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ta(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function na(n){gt(new yt("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;g(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const d={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:un(n)},p=new vi(r,i,s,d);return Oi(p,t),p},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),gt(new yt("auth-internal",e=>{const t=fe(e.getProvider("auth").getImmediate());return(r=>new ea(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),_t(Ut,Ft,ta(n)),_t(Ut,Ft,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ra=5*60,ia=zt("authIdTokenMaxAge")||ra;let Vt=null;const sa=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>ia)return;const i=t==null?void 0:t.token;Vt!==i&&(Vt=i,await fetch(n,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function aa(n=Sr()){const e=$t(n,"auth");if(e.isInitialized())return e.getImmediate();const t=Ci(n,{popupRedirectResolver:Zs,persistence:[ds,Qi,vn]}),r=zt("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const a=sa(s.toString());Gi(t,a,()=>a(t.currentUser)),Ki(t,c=>a(c))}}const i=Tr("auth");return i&&Ni(t,`http://${i}`),t}function oa(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}ki({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=i=>{const s=F("internal-error");s.customData=i,t(s)},r.type="text/javascript",r.charset="UTF-8",oa().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});na("Browser");const ca={apiKey:"AIzaSyCEm5hLCD27NAQSU2ZnDdOEuqdyhfWguyE",authDomain:"hiretrakker.firebaseapp.com",projectId:"hiretrakker",storageBucket:"hiretrakker.firebasestorage.app",messagingSenderId:"1016845461095",appId:"1:1016845461095:web:b157f578ac2fbd853156c2",measurementId:"G-N93HC1W7QJ"},Pn=Cr(ca),qe=Or(Pn),Ht=aa(Pn);async function G(n){return(await xr(Lr(qe,n))).docs.map(t=>({...t.data(),id:t.id}))}async function R(n,e){await Mr(at(qe,n,e.id),e)}async function re(n,e){await Dr(at(qe,n,e))}async function J(n,e){for(const t of e)await R(n,t)}const Je="hiretrakkr_loggedIn",Ye="hiretrakkr_currentUser",ie=()=>crypto.randomUUID(),la=["📋 Applied","📞 Screening","📅 Interview Scheduled","✅ Interview Attended","➡️ Next Level","✅ Selected","🎉 Joined","🚫 Screen Rejected","❌ Interview Rejected","💔 Offer Rejected","⏸️ On Hold","🚫 Exit"],An=I.createContext(null),mt=()=>I.useContext(An);function da({children:n}){const[e,t]=I.useState([]),[r,i]=I.useState([]),[s,a]=I.useState([]),[c,d]=I.useState([]),[p,_]=I.useState([]),[m,v]=I.useState([]),[T,b]=I.useState([]),[k,y]=I.useState([]),[$,oe]=I.useState(!0),[u,Re]=I.useState(null),[On,Pe]=I.useState(!1);I.useEffect(()=>{(async()=>{try{const[l,f,h,w,E,D,q,ge]=await Promise.all([G("companies"),G("teams"),G("users"),G("jobs"),G("candidates"),G("recruiters"),G("attendance"),G("recruitmentPartners")]);if(t(l),i(f),a(h),d(w),_(E),v(D),b(q),y(ge),localStorage.getItem(Je)){const ce=JSON.parse(localStorage.getItem(Ye));ce&&(Re(ce),Pe(!0))}}catch(l){console.error(l)}finally{oe(!1)}})()},[]);const S=(u==null?void 0:u.role)==="superAdmin",P=(u==null?void 0:u.role)==="companyAdmin",O=(u==null?void 0:u.role)==="teamLead",Nn=(u==null?void 0:u.role)==="recruiter",xn=I.useMemo(()=>S?e:e.filter(l=>l.id===(u==null?void 0:u.companyId)),[e,u,S]),Ln=I.useMemo(()=>S?r:P?r.filter(l=>l.companyId===(u==null?void 0:u.companyId)):O?r.filter(l=>l.id===(u==null?void 0:u.teamId)):r.filter(l=>l.id===(u==null?void 0:u.teamId)),[r,u,S,P,O]),Mn=I.useMemo(()=>S?s:P?s.filter(l=>l.companyId===(u==null?void 0:u.companyId)):O?s.filter(l=>l.teamId===(u==null?void 0:u.teamId)):s.filter(l=>l.id===(u==null?void 0:u.id)),[s,u,S,P,O]),Dn=I.useMemo(()=>S?m:P?m.filter(l=>l.companyId===(u==null?void 0:u.companyId)):O?m.filter(l=>l.teamId===(u==null?void 0:u.teamId)):m.filter(l=>l.id===(u==null?void 0:u.recruiterId)),[m,u,S,P,O]),jn=I.useMemo(()=>S?c:P?c.filter(l=>l.companyId===(u==null?void 0:u.companyId)):c.filter(l=>l.companyId===(u==null?void 0:u.companyId)),[c,u,S,P]),Un=I.useMemo(()=>S?p:P?p.filter(l=>l.companyId===(u==null?void 0:u.companyId)):O?p.filter(l=>l.teamId===(u==null?void 0:u.teamId)):p.filter(l=>l.recruiterId===(u==null?void 0:u.recruiterId)),[p,u,S,P,O]),Fn=I.useMemo(()=>{if(S)return T;if(P){const l=u==null?void 0:u.companyId,f=m.filter(w=>w.companyId===l).map(w=>w.id),h=s.filter(w=>w.role==="teamLead"&&w.companyId===l).map(w=>w.id);return T.filter(w=>f.includes(w.personId)||h.includes(w.personId))}if(O){const l=m.filter(f=>f.teamId===(u==null?void 0:u.teamId)).map(f=>f.id);return T.filter(f=>f.personId===(u==null?void 0:u.id)||l.includes(f.personId))}return T.filter(l=>l.personId===(u==null?void 0:u.recruiterId)||l.personId===(u==null?void 0:u.id))},[T,u,S,P,O,m,s]),Vn=I.useMemo(()=>S?k:P?k.filter(l=>l.companyId===(u==null?void 0:u.companyId)):k.filter(l=>l.companyId===(u==null?void 0:u.companyId)),[k,u,S,P]),Hn=I.useCallback(async(l,f)=>{try{const q=`${l.toLowerCase()}@hiretrakkr.com`,ge=await qi(Ht,q,f),ce=await Nr(at(qe,"users",ge.user.uid));if(ce.exists()){const Ae=ce.data();return Re(Ae),Pe(!0),localStorage.setItem(Je,"true"),localStorage.setItem(Ye,JSON.stringify(Ae)),!0}}catch{}const h=s.find(q=>q.username===l);if(!h||!await $r(f,h.password))return!1;const{password:E,...D}=h;return Re(D),Pe(!0),localStorage.setItem(Je,"true"),localStorage.setItem(Ye,JSON.stringify(D)),!0},[s]),Wn=async()=>{try{await Ji(Ht)}catch{}Re(null),Pe(!1),localStorage.clear()},zn=async l=>{const f={...l,id:ie()};await R("companies",f),t(h=>[...h,f])},Bn=async(l,f)=>{const h={...f,id:l};await R("companies",h),t(w=>w.map(E=>E.id===l?h:E))},$n=async l=>{await re("companies",l),t(f=>f.filter(h=>h.id!==l))},qn=async l=>{const f={...l,id:ie()};await R("teams",f),i(h=>[...h,f])},Kn=async(l,f)=>{const h={...f,id:l};await R("teams",h),i(w=>w.map(E=>E.id===l?h:E))},Gn=async l=>{await re("teams",l),i(f=>f.filter(h=>h.id!==l))},Jn=async l=>{const f=await Ze(l.password),h={...l,password:f,id:ie()};await R("users",h),a(w=>[...w,h])},Yn=async(l,f)=>{const h=s.find(E=>E.id===l);let w={...h,...f,id:l};f.password&&f.password!==(h==null?void 0:h.password)&&(w.password=await Ze(f.password)),await R("users",w),a(E=>E.map(D=>D.id===l?w:D))},Xn=async l=>{await re("users",l),a(f=>f.filter(h=>h.id!==l))},Qn=async l=>{const f={...l,id:ie()};return await R("recruiters",f),v(h=>[...h,f]),f},Zn=async(l,f)=>{const h={...f,id:l};await R("recruiters",h),v(w=>w.map(E=>E.id===l?h:E))},er=async l=>{await re("recruiters",l),v(f=>f.filter(h=>h.id!==l))},tr=async l=>{const f={...l,id:ie()};await R("jobs",f),d(h=>[...h,f])},nr=async(l,f)=>{const h={...f,id:l};await R("jobs",h),d(w=>w.map(E=>E.id===l?h:E))},rr=async l=>{await re("jobs",l),d(f=>f.filter(h=>h.id!==l))},ir=async l=>{const f={...l,id:ie()};await R("candidates",f),_(h=>[...h,f])},sr=async(l,f)=>{const h={...f,id:l};await R("candidates",h),_(w=>w.map(E=>E.id===l?h:E))},ar=async l=>{await re("candidates",l),_(f=>f.filter(h=>h.id!==l))},or=async l=>{const f={...l,id:ie()};return await R("recruitmentPartners",f),y(h=>[...h,f]),f},cr=async(l,f)=>{const h={...f,id:l};await R("recruitmentPartners",h),y(w=>w.map(E=>E.id===l?h:E))},lr=async l=>{await re("recruitmentPartners",l),y(f=>f.filter(h=>h.id!==l))},dr=async(l,f,h="recruiter",w=null)=>{const E=w||new Date().toISOString().split("T")[0],D=`${l}_${E}`,q={id:D,personId:l,personType:h,date:E,status:f,markedAt:new Date().toISOString()};await R("attendance",q),b(ge=>[...ge.filter(Ae=>Ae.id!==D),q])},ur=l=>{const f=new Date().toISOString().split("T")[0];return T.find(h=>(h.personId===l||h.recruiterId===l)&&h.date===f)},hr=()=>{Kr({companies:e,teams:r,users:s,jobs:c,candidates:p,recruiters:m,attendance:T,recruitmentPartners:k})},pr=async l=>{const h=(await Gr(l)).data;return await J("companies",h.companies||[]),await J("teams",h.teams||[]),await J("users",h.users||[]),await J("jobs",h.jobs||[]),await J("candidates",h.candidates||[]),await J("recruiters",h.recruiters||[]),await J("attendance",h.attendance||[]),await J("recruitmentPartners",h.recruitmentPartners||[]),t(h.companies||[]),i(h.teams||[]),a(h.users||[]),d(h.jobs||[]),_(h.candidates||[]),v(h.recruiters||[]),b(h.attendance||[]),y(h.recruitmentPartners||[]),!0};return $?o.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100vh",flexDirection:"column",gap:16,background:"var(--bg, #0f1117)",color:"var(--text, #fff)"},children:[o.jsx("div",{style:{width:40,height:40,borderRadius:"50%",border:"3px solid #4f7cff",borderTopColor:"transparent",animation:"spin 0.8s linear infinite"}}),o.jsx("style",{children:"@keyframes spin { to { transform: rotate(360deg) } }"}),o.jsx("div",{style:{fontSize:14,opacity:.6},children:"Loading HireTrakkr..."})]}):o.jsx(An.Provider,{value:{currentUser:u,isLoggedIn:On,login:Hn,logout:Wn,isSuperAdmin:S,isCompanyAdmin:P,isTeamLead:O,isRecruiter:Nn,companies:e,teams:r,users:s,jobs:c,candidates:p,recruiters:m,attendance:T,recruitmentPartners:k,visibleCompanies:xn,visibleTeams:Ln,visibleUsers:Mn,visibleRecruiters:Dn,visibleJobs:jn,visibleCandidates:Un,visibleAttendance:Fn,visibleRecruitmentPartners:Vn,STATUSES:la,addCompany:zn,updateCompany:Bn,deleteCompany:$n,addTeam:qn,updateTeam:Kn,deleteTeam:Gn,addUser:Jn,updateUser:Yn,deleteUser:Xn,addRecruiter:Qn,updateRecruiter:Zn,deleteRecruiter:er,addJob:tr,updateJob:nr,deleteJob:rr,addCandidate:ir,updateCandidate:sr,deleteCandidate:ar,addRecruitmentPartner:or,updateRecruitmentPartner:cr,deleteRecruitmentPartner:lr,markAttendance:dr,getTodayAttendance:ur,exportAllData:hr,importBackup:pr},children:n})}/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ua=n=>n.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Cn=(...n)=>n.filter((e,t,r)=>!!e&&r.indexOf(e)===t).join(" ");/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var ha={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pa=I.forwardRef(({color:n="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:r,className:i="",children:s,iconNode:a,...c},d)=>I.createElement("svg",{ref:d,...ha,width:e,height:e,stroke:n,strokeWidth:r?Number(t)*24/Number(e):t,className:Cn("lucide",i),...c},[...a.map(([p,_])=>I.createElement(p,_)),...Array.isArray(s)?s:[s]]));/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=(n,e)=>{const t=I.forwardRef(({className:r,...i},s)=>I.createElement(pa,{ref:s,iconNode:e,className:Cn(`lucide-${ua(n)}`,r),...i}));return t.displayName=`${n}`,t};/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fa=A("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ma=A("Briefcase",[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ga=A("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ya=A("CalendarCheck",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"m9 16 2 2 4-4",key:"19s6y9"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _a=A("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia=A("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wa=A("Handshake",[["path",{d:"m11 17 2 2a1 1 0 1 0 3-3",key:"efffak"}],["path",{d:"m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",key:"9pr0kb"}],["path",{d:"m21 3 1 11h-2",key:"1tisrp"}],["path",{d:"M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3",key:"1uvwmv"}],["path",{d:"M3 4h8",key:"1ep09j"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const va=A("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ka=A("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ea=A("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ta=A("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sa=A("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=A("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ra=A("UsersRound",[["path",{d:"M18 21a8 8 0 0 0-16 0",key:"3ypg7q"}],["circle",{cx:"10",cy:"8",r:"5",key:"o932ke"}],["path",{d:"M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3",key:"10s06x"}]]);/**
 * @license lucide-react v0.383.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pa=A("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]),Aa={superAdmin:"#ef4444",companyAdmin:"#f97316",teamLead:"#a855f7",recruiter:"#22c55e"},Ca={superAdmin:"Super Admin",companyAdmin:"Company Admin",teamLead:"Team Lead",recruiter:"Recruiter"};function Oa(){const{visibleJobs:n,visibleCandidates:e,visibleCompanies:t,visibleRecruiters:r,currentUser:i,logout:s,isSuperAdmin:a,isCompanyAdmin:c,isTeamLead:d,isRecruiter:p,exportAllData:_,importBackup:m}=mt(),v=I.useRef(null),T=n.filter(y=>y.status==="Open").length,b=Aa[i==null?void 0:i.role]||"var(--accent)",k=async y=>{var oe;const $=(oe=y.target.files)==null?void 0:oe[0];$&&(await m($),y.target.value="")};return o.jsxs("aside",{className:"sidebar",children:[o.jsxs("div",{className:"sidebar-logo",children:[o.jsx("img",{src:"/logo.svg",alt:"HireTrakkr Logo",style:{width:52,height:52,marginBottom:8,display:"block"}}),o.jsxs("h1",{style:{fontFamily:"var(--font-display)",fontSize:18,color:"var(--text)",letterSpacing:-.3,lineHeight:1.2},children:["Hire",o.jsx("span",{style:{color:"var(--accent)"},children:"Trakkr"})]}),o.jsx("p",{children:"hiretrakkr.com"}),o.jsxs("div",{className:"firebase-badge",style:{marginTop:6},children:[o.jsx("span",{className:"dot"}),o.jsx(_a,{size:9,style:{opacity:.6}}),"Make Hiring Simple"]})]}),i&&o.jsxs("div",{style:{margin:"0 10px 10px",padding:"10px 12px",background:`${b}10`,border:`1px solid ${b}28`,borderRadius:9},children:[o.jsx("div",{style:{fontWeight:600,fontSize:12.5,color:b},children:i.name||i.username}),o.jsxs("div",{style:{fontSize:11,color:"var(--text3)",marginTop:2},children:[Ca[i.role]||i.role,i.role==="superAdmin"&&" 🔐"]})]}),o.jsxs("div",{style:{margin:"0 10px 10px",padding:"9px 11px",background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:8,display:"flex",gap:8,alignItems:"flex-start"},children:[o.jsx(Ta,{size:13,style:{color:"#f59e0b",flexShrink:0,marginTop:1}}),o.jsxs("div",{style:{fontSize:10.5,color:"#92714a",lineHeight:1.5},children:[o.jsx("strong",{style:{color:"#c98b3a"},children:"Sync with HireTrakkr."}),o.jsx("br",{}),"Export backups regularly."]})]}),o.jsxs("div",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:"Overview"}),o.jsxs(j,{to:"/",end:!0,className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(va,{})," Dashboard"]})]}),o.jsxs("div",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:"Recruitment"}),o.jsxs(j,{to:"/jobs",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(ma,{})," Job Postings",T>0&&o.jsx("span",{className:"nav-badge",children:T})]}),o.jsxs(j,{to:"/candidates",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(Pa,{})," Candidates",e.length>0&&o.jsx("span",{className:"nav-badge",children:e.length})]}),o.jsxs(j,{to:"/pipeline",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(fa,{})," Pipeline"]})]}),o.jsxs("div",{className:"sidebar-section",children:[o.jsx("div",{className:"sidebar-section-label",children:"Management"}),o.jsxs(j,{to:"/recruiters",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(ba,{})," Recruiters",!p&&r.length>0&&o.jsx("span",{className:"nav-badge",children:r.length})]}),o.jsxs(j,{to:"/attendance",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(ya,{})," Attendance"]}),(a||c)&&o.jsxs(o.Fragment,{children:[o.jsxs(j,{to:"/companies",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(ga,{})," Companies",t.length>0&&o.jsx("span",{className:"nav-badge",children:t.length})]}),o.jsxs(j,{to:"/recruitment-partners",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(wa,{})," Recruitment Partners"]})]}),(a||c||d)&&o.jsxs(j,{to:"/teams",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(Ra,{})," Teams"]}),(a||c||d)&&o.jsxs(j,{to:"/users",className:({isActive:y})=>`nav-item${y?" active":""}`,children:[o.jsx(Ea,{})," User Management"]})]}),o.jsxs("div",{style:{padding:"14px 10px 0"},children:[o.jsx("div",{style:{fontSize:9.5,fontWeight:700,letterSpacing:1.2,textTransform:"uppercase",color:"var(--text3)",marginBottom:8,paddingLeft:4},children:"Data Backup"}),o.jsxs("button",{onClick:_,style:{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 12px",marginBottom:6,background:"var(--green-bg)",border:"1px solid rgba(34,197,94,0.2)",borderRadius:8,color:"#4ade80",cursor:"pointer",fontSize:12,fontWeight:500,fontFamily:"var(--font)",transition:"all 0.15s"},onMouseEnter:y=>y.currentTarget.style.background="rgba(34,197,94,0.12)",onMouseLeave:y=>y.currentTarget.style.background="rgba(34,197,94,0.07)",children:[o.jsx(Ia,{size:13})," Export Backup (.json)"]}),o.jsxs("button",{onClick:()=>{var y;return(y=v.current)==null?void 0:y.click()},style:{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 12px",background:"var(--accent-glow)",border:"1px solid rgba(79,124,255,0.2)",borderRadius:8,color:"var(--accent2)",cursor:"pointer",fontSize:12,fontWeight:500,fontFamily:"var(--font)",transition:"all 0.15s"},onMouseEnter:y=>y.currentTarget.style.background="rgba(79,124,255,0.13)",onMouseLeave:y=>y.currentTarget.style.background="rgba(79,124,255,0.07)",children:[o.jsx(Sa,{size:13})," Restore Backup"]}),o.jsx("input",{ref:v,type:"file",accept:".json",style:{display:"none"},onChange:k}),o.jsx("div",{style:{fontSize:10,color:"var(--text3)",marginTop:6,paddingLeft:4,lineHeight:1.5},children:"Backup regularly to avoid data loss"})]}),o.jsxs("div",{style:{marginTop:"auto",padding:"16px 12px",borderTop:"1px solid var(--border)"},children:[o.jsxs("button",{onClick:s,style:{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"9px 12px",background:"var(--red-bg)",border:"1px solid rgba(239,68,68,0.15)",borderRadius:8,color:"#f87171",cursor:"pointer",fontSize:13,fontWeight:500,fontFamily:"var(--font)",transition:"all 0.15s"},onMouseEnter:y=>y.currentTarget.style.background="rgba(239,68,68,0.12)",onMouseLeave:y=>y.currentTarget.style.background="rgba(239,68,68,0.06)",children:[o.jsx(ka,{size:15})," Logout"]}),o.jsx("div",{style:{fontSize:11,color:"var(--text3)",marginTop:10,paddingLeft:2},children:"HireTrakkr v1.0"}),o.jsx("div",{style:{fontSize:10,color:"var(--text3)",marginTop:1,paddingLeft:2},children:"HireTrakkr Edition"})]})]})}function Na(){const{login:n,loading:e}=mt(),t=mr(),[r,i]=I.useState(""),[s,a]=I.useState(""),[c,d]=I.useState(""),[p,_]=I.useState(!1),[m,v]=I.useState(!1),T=async k=>{if(k.preventDefault(),d(""),e){d("Please wait while system is loading...");return}if(!r.trim()){d("Please enter your username");return}if(!s.trim()){d("Please enter your password");return}_(!0);try{await n(r.trim(),s)?t("/"):d("Incorrect username or password.")}finally{_(!1)}},b={width:"100%",padding:"0.75rem",border:"2px solid #e1e5e9",borderRadius:"8px",fontSize:"1rem",boxSizing:"border-box",transition:"border-color 0.2s",outline:"none"};return o.jsx("div",{style:{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",background:"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",fontFamily:'"DM Sans", sans-serif',padding:"20px"},children:o.jsx("div",{style:{width:"100%",maxWidth:"440px"},children:o.jsxs("div",{style:{background:"white",padding:"2rem",borderRadius:"16px",boxShadow:"0 24px 48px rgba(0,0,0,0.15)"},children:[o.jsxs("div",{style:{textAlign:"center",marginBottom:"2rem"},children:[o.jsx("img",{src:"/logo.svg",alt:"HireTrakkr",style:{width:72,height:72}}),o.jsx("h1",{style:{margin:"0.75rem 0 0.25rem",color:"#1a1a1a",fontSize:"1.9rem",fontWeight:700,fontFamily:'"Instrument Serif", serif'},children:"HireTrakkr"}),o.jsx("p",{style:{color:"#666",margin:0,fontSize:"0.9rem"},children:"HRMS and hiring simplified"})]}),o.jsxs("form",{onSubmit:T,autoComplete:"off",children:[o.jsxs("div",{style:{marginBottom:"1.25rem"},children:[o.jsx("label",{style:{display:"block",marginBottom:"0.5rem",color:"#333",fontWeight:500,fontSize:"0.9rem"},children:"Username"}),o.jsx("input",{type:"text",value:r,onChange:k=>i(k.target.value),autoComplete:"off",style:b,placeholder:"Enter username",onFocus:k=>k.target.style.borderColor="#667eea",onBlur:k=>k.target.style.borderColor="#e1e5e9"})]}),o.jsxs("div",{style:{marginBottom:"1.25rem"},children:[o.jsx("label",{style:{display:"block",marginBottom:"0.5rem",color:"#333",fontWeight:500,fontSize:"0.9rem"},children:"Password"}),o.jsxs("div",{style:{position:"relative"},children:[o.jsx("input",{type:m?"text":"password",value:s,onChange:k=>a(k.target.value),autoComplete:"off",style:{...b,paddingRight:"2.75rem"},placeholder:"Enter password",onFocus:k=>k.target.style.borderColor="#667eea",onBlur:k=>k.target.style.borderColor="#e1e5e9"}),o.jsx("span",{onClick:()=>v(k=>!k),style:{position:"absolute",right:"0.75rem",top:"50%",transform:`translateY(-50%) rotate(${m?180:0}deg)`,transition:"transform 0.3s ease",cursor:"pointer",fontSize:"1.1rem",userSelect:"none",color:"#888"},children:m?"🙈":"👁️"})]})]}),e&&o.jsx("div",{style:{background:"#efe",color:"#3a3",padding:"0.75rem",borderRadius:"6px",marginBottom:"1rem",fontSize:"0.875rem",border:"1px solid #3a3"},children:"ℹ️ System is loading, please wait..."}),c&&o.jsx("div",{style:{background:"#fee",color:"#c33",padding:"0.75rem",borderRadius:"6px",marginBottom:"1rem",fontSize:"0.875rem",border:"1px solid #fcc"},children:c}),o.jsx("button",{type:"submit",disabled:e||p,style:{width:"100%",padding:"0.8rem",background:e||p?"#ccc":"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",color:"white",border:"none",borderRadius:"8px",fontSize:"1rem",fontWeight:600,cursor:e||p?"not-allowed":"pointer",opacity:e||p?.6:1},children:p?"Signing In...":"Sign In"})]})]})})})}const Wt=M.lazy(()=>H(()=>import("./Dashboard-CezmZwma.js"),__vite__mapDeps([0,1,2,3,4,5]))),xa=M.lazy(()=>H(()=>import("./Jobs-DhAGLc2l.js"),__vite__mapDeps([6,1,2,7,8,9,4,10,5]))),La=M.lazy(()=>H(()=>import("./Candidates-CmUheGPV.js"),__vite__mapDeps([11,1,2,7,8,12,9,13,10,5]))),Ma=M.lazy(()=>H(()=>import("./Recruiters-CCrSfmLF.js"),__vite__mapDeps([14,1,2,7,8,13,5]))),Da=M.lazy(()=>H(()=>import("./Companies-B3QZEn6J.js"),__vite__mapDeps([15,1,2,7,8,5]))),ja=M.lazy(()=>H(()=>import("./RecruitmentPartners-DX0chTTO.js"),__vite__mapDeps([16,1,2,7,8,12,13,5]))),Ua=M.lazy(()=>H(()=>import("./Pipeline-DZ7zBNZQ.js"),__vite__mapDeps([17,1,2,8,5]))),Fa=M.lazy(()=>H(()=>import("./Attendance-aQprCePK.js"),__vite__mapDeps([18,1,2,10,8,4,5]))),Va=M.lazy(()=>H(()=>import("./Teams-DtkWKYEj.js"),__vite__mapDeps([19,1,2,7,8,5]))),Ha=M.lazy(()=>H(()=>import("./UserManagement-C3bHBSFn.js"),__vite__mapDeps([20,1,2,7,8,5])));function Wa({children:n}){return o.jsxs("div",{className:"app",children:[o.jsx(Oa,{}),o.jsx("div",{className:"main",children:n})]})}function za(){const{isLoggedIn:n,isSuperAdmin:e,isCompanyAdmin:t,isTeamLead:r}=mt();if(!n)return o.jsx(Na,{});const i=()=>o.jsx("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",height:"100%",color:"var(--text2)"},children:"Loading page..."});return o.jsx(Wa,{children:o.jsx(I.Suspense,{fallback:o.jsx(i,{}),children:o.jsxs(yr,{children:[o.jsx(N,{path:"/",element:o.jsx(Wt,{})}),o.jsx(N,{path:"/jobs",element:o.jsx(xa,{})}),o.jsx(N,{path:"/candidates",element:o.jsx(La,{})}),o.jsx(N,{path:"/pipeline",element:o.jsx(Ua,{})}),o.jsx(N,{path:"/recruiters",element:o.jsx(Ma,{})}),o.jsx(N,{path:"/attendance",element:o.jsx(Fa,{})}),(e||t)&&o.jsxs(o.Fragment,{children:[o.jsx(N,{path:"/companies",element:o.jsx(Da,{})}),o.jsx(N,{path:"/recruitment-partners",element:o.jsx(ja,{})})]}),(e||t||r)&&o.jsxs(o.Fragment,{children:[o.jsx(N,{path:"/teams",element:o.jsx(Va,{})}),o.jsx(N,{path:"/users",element:o.jsx(Ha,{})})]}),o.jsx(N,{path:"*",element:o.jsx(Wt,{})})]})})})}function Ba(){return o.jsx(da,{children:o.jsx(gr,{children:o.jsx(za,{})})})}Qe.createRoot(document.getElementById("root")).render(o.jsx(M.StrictMode,{children:o.jsx(Ba,{})}));export{ma as B,ya as C,wa as H,ka as L,Ea as S,Pa as U,ba as a,ga as b,A as c,Ra as d,o as j,mt as u};
