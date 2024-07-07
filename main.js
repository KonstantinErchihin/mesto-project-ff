(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/cohort-17",headers:{authorization:"5da21f1f-49c7-4f13-a704-f247cde7ca37","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e,n){return fetch(e,n).then(t)}function r(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__like-counter");return a.src=e.link,a.alt=e.name,u.textContent=e.name,e.owner._id!=t?c.querySelector(".card__delete-button").remove():c.querySelector(".card__delete-button").addEventListener("click",(function(t){return n(t,e)})),c.querySelector(".card__like-button").addEventListener("click",(function(t){return r(t,e)})),e.likes.some((function(e){return e._id===t}))&&c.querySelector(".card__like-button").classList.add("card__like-button_is-active"),i.textContent=e.likes.length,a.addEventListener("click",(function(){o(e.link,e.name)})),c}function o(t,r){var o,c=t.target.closest(".card");(o=r._id,n("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers})).then((function(){c.remove()})).catch((function(e){console.log("Ошибка, не выполенено: ".concat(e.status))}))}function c(t,r){var o;t.target.classList.contains("card__like-button_is-active")?(o=r._id,n("".concat(e.baseUrl,"/cards/likes/").concat(o),{method:"DELETE",headers:e.headers})).then((function(e){t.target.classList.remove("card__like-button_is-active"),t.target.closest(".card").querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){return console.log("Ошибка.....: ".concat(e))})):function(t){return n("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers})}(r._id).then((function(e){t.target.classList.add("card__like-button_is-active"),t.target.closest(".card").querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){return console.log("Ошибка.....: ".concat(e))}))}function a(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",i),document.addEventListener("mousedown",l)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),document.removeEventListener("mousedown",l)}function i(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function l(e){e.target.classList.contains("popup")&&u(e.target)}function s(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function d(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(n,r,t)}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var f=document.querySelector(".places__list"),m=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup_type_avatar"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".profile__image"),q=document.querySelectorAll(".popup__close"),g=m.querySelector(".popup__form"),C=g.querySelector(".popup__input_type_name"),k=g.querySelector(".popup__input_type_description"),E=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),x=y.querySelector(".popup__form"),A=x.querySelector(".popup__input_type_card-name"),U=x.querySelector(".popup__input_type_url"),w=document.querySelector(".popup_type_image"),T=w.querySelector(".popup__image"),j=w.querySelector(".popup__caption"),O=v.querySelector(".popup__form"),B=O.querySelector(".popup__input_type_url_img"),P=document.querySelector(".profile__image"),D=null,I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function M(e,t){T.src=e,T.alt=t,j.textContent=t,a(w)}h.addEventListener("click",(function(){a(m),p(g,I),C.value=E.textContent,k.value=L.textContent})),S.addEventListener("click",(function(){a(y),p(x,I)})),b.addEventListener("click",(function(){a(v),p(O,I)})),q.forEach((function(e){e.addEventListener("click",(function(){u(e.closest(".popup"))}))})),O.addEventListener("submit",(function(t){var r;t.preventDefault(),t.submitter.textContent="Сохранение...",(r=B.value,n("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})})).then((function(e){P.style.backgroundImage="url(".concat(e.avatar,")"),u(v)})).catch((function(e){console.error(e)})).finally((function(){t.submitter.textContent="Сохранить"})),O.reset()})),g.addEventListener("submit",(function(t){var r;t.preventDefault(),t.submitter.textContent="Сохранение...",(r={name:C.value,about:k.value},n("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r.name,about:r.about})})).then((function(){E.textContent=C.value,L.textContent=k.value,u(m)})).catch((function(e){console.error(e)})).finally((function(){t.submitter.textContent="Сохранить"}))})),x.addEventListener("submit",(function(t){var a;t.preventDefault(),t.submitter.textContent="Создать",(a={name:A.value,link:U.value},n("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a.name,link:a.link})})).then((function(e){f.prepend(r(e,e.owner._id,o,c,M)),u(y)})).catch((function(e){console.error(e)})).finally((function(){t.submitter.textContent="Сохранить"})),x.reset()})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),d(n,r,t)}))}))}(t,e)}))}(I),Promise.all([n("".concat(e.baseUrl,"/users/me"),{headers:e.headers}),n("".concat(e.baseUrl,"/cards"),{headers:e.headers})]).then((function(e){var t,n,a=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1];D=u._id,E.textContent=u.name,L.textContent=u.about,P.style.backgroundImage="url(".concat(u.avatar,")"),i.forEach((function(e){var t=r(e,D,o,c,M);f.append(t)}))})).catch((function(e){console.error("Ошибка: ",e)}))})();