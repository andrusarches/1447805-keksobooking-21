(()=>{"use strict";var e,n,t,o,r,a,i,d,s,c,l,u,m,p,w,f,v,y,h,g,L,E,S,_,F,A,q,k,C,x,P,b,M,D,R,N,V,z,I,T,j,O,$,B,X,H,U,W,Y;e=function(e){return Math.floor(Math.random()*e.length)},window.util={generateRandomArrayItemNumber:e,getRandomArrayItem:function(n){return n[e(n)]},shuffleArray:function(e){for(var n,t=e.length,o=0;t--;)o=Math.floor(Math.random()*(t+1)),n=e[t],e[t]=e[o],e[o]=n;return e}},window.debounce=function(e){n&&window.clearTimeout(n),n=window.setTimeout(e,500)},t=document.querySelector(".map__filters"),o=Array.from(t.children),r=t.querySelector("#housing-type"),a=t.querySelector("#housing-price"),i=t.querySelector("#housing-rooms"),d=t.querySelector("#housing-guests"),s=t.querySelector("#housing-features").querySelectorAll('input[type="checkbox"]'),window.adFilter={resetAdFilter:function(){t.reset()},disableAdFilterForm:function(){for(var e=0;e<o.length;e++)o[e].disabled=!0},enableAdFilterForm:function(){for(var e=function(){window.map.renderAdPins(window.download.data)},n=0;n<o.length;n++)o[n].disabled=!1;t.addEventListener("change",(function(){window.debounce(e)}))},filterAdData:function(e){for(var n in s)if(s.hasOwnProperty(n)){var t=s[n];if(t.checked&&!e.offer.features.includes(t.value))return!1}return!("any"!==r.value&&r.value!==e.offer.type||"any"!==a.value&&a.value!==(o=e.offer.price,o<1e4?"low":o>5e4?"high":"middle")||"any"!==i.value&&parseInt(i.value,10)!==e.offer.rooms||"any"!==d.value&&parseInt(d.value,10)!==e.offer.guests);var o}},l=(c=document.querySelector(".map")).querySelector(".map__pin--main"),u=document.querySelector(".map__pins"),m=document.querySelector("#pin").content.querySelector(".map__pin"),p=function(e){var n=m.cloneNode(!0);return n.style="left: "+e.location.x+"px; top: "+e.location.y+"px;",n.querySelector("img").src=e.author.avatar,n.querySelector("img").alt=e.offer.title,n.addEventListener("click",(function(){window.card.showAdCard(e)})),n},w=function(){for(var e=u.querySelectorAll(".map__pin:not(.map__pin--main)"),n=0;n<e.length;n++)e[n].remove()},window.map={mapElement:c,mainMapPin:l,fadeMap:function(){c.classList.add("map--faded")},showMap:function(){c.classList.remove("map--faded")},renderAdPins:function(e){window.card.removeAdCard(),w();for(var n=e.filter((function(e){return window.adFilter.filterAdData(e)})).slice(0,5),t=document.createDocumentFragment(),o=0;o<n.length;o++)0!==n[o].offer.length&&t.appendChild(p(n[o]));u.appendChild(t)},removeRenderedAdPins:w},f=function(){window.map.mapElement.querySelector(".popup__close")&&window.map.mapElement.querySelector(".popup__close").parentNode.remove()},v=function(e){27===e.keyCode&&(e.preventDefault(),f())},window.card={showAdCard:function(e){f();var n=window.map.mapElement.querySelector(".map__filters-container"),t=document.createDocumentFragment();t.appendChild(function(e){var n=document.querySelector("#card").content.querySelector(".popup").cloneNode(!0),t=n.querySelector(".popup__title"),o=n.querySelector(".popup__text--price"),r=n.querySelector(".popup__type"),a=n.querySelector(".popup__text--capacity"),i=n.querySelector(".popup__text--time"),d=n.querySelector(".popup__features"),s=n.querySelector(".popup__description"),c=n.querySelector(".popup__photos"),l=n.querySelector(".popup__avatar");if(0!==e.offer.title.length?t.textContent=e.offer.title:t.classList.add("hidden"),0!==e.offer.price.length?o.textContent=e.offer.price+"₽/ночь":o.classList.add("hidden"),0!==e.offer.type.length?r.textContent={flat:"Квартира",bungalow:"Бунгало",house:"Дом",palace:"Дворец"}[e.offer.type]:r.classList.add("hidden"),0!==e.offer.rooms.length&&0!==e.offer.guests.length?a.textContent=`${e.offer.rooms} комнаты для ${e.offer.guests} гостей.`:0!==e.offer.rooms.length&&0===e.offer.guests.length?a.textContent=e.offer.rooms+" комнаты.":0===e.offer.rooms.length&&0!==e.offer.guests.length?a.textContent=`Для ${e.offer.guests} гостей.`:a.classList.add("hidden"),0!==e.offer.checkin.length&&0!==e.offer.checkout.length?i.textContent=`Заезд после ${e.offer.checkin}, выезд до ${e.offer.checkout}.`:i.classList.add("hidden"),0!==e.offer.features.length){for(var u=document.createDocumentFragment(),m=0;m<e.offer.features.length;m++){var p=document.createElement("li");p.classList.add("popup__feature","popup__feature--"+e.offer.features[m]),u.appendChild(p)}d.appendChild(u)}else d.classList.add("hidden");if(0!==e.offer.description.length?s.textContent=e.offer.description:s.classList.add("hidden"),0!==e.offer.photos.length){for(var w=document.createDocumentFragment(),f=0;f<e.offer.photos.length;f++){var v=document.createElement("img");v.classList.add("popup__photo"),v.width="45",v.height="40",v.src=e.offer.photos[f],v.alt="Фотография "+(f+1)+" - "+e.offer.title,w.appendChild(v)}c.appendChild(w)}else c.classList.add("hidden");return 0!==e.author.avatar.length?(l.src=e.author.avatar,l.alt="User avatar"):(l.src="img/avatars/default.png",l.alt="Default avatar"),n}(e)).querySelector(".popup__close").addEventListener("click",(function(){f()})),document.addEventListener("keydown",v),window.map.mapElement.insertBefore(t,n)},removeAdCard:f},window.synchronizeValues=function(e,n){e.value=n},window.synchronizeFields=function(e,n,t,o,r){r(n,o[t.indexOf(e.value)])},y=document.querySelector(".ad-form"),h=y.querySelector("#address"),g=y.querySelectorAll(".ad-form-header, .ad-form__element"),L=y.querySelector("#price"),E=y.querySelector("#type"),S=y.querySelector("#timein"),_=y.querySelector("#timeout"),F=y.querySelector("#room_number"),A=y.querySelector("#capacity"),q=parseInt(window.map.mainMapPin.style.left,10)+31,k=parseInt(window.map.mainMapPin.style.top,10)+31,C=["12:00","13:00","14:00"],x=["12:00","13:00","14:00"],P=["1","2","3","100"],b=["1","2","3","0"],M=function(){"bungalow"===E.value?(L.min=0,L.placeholder=0):"flat"===E.value?(L.min=1e3,L.placeholder=1e3):"house"===E.value?(L.min=5e3,L.placeholder=5e3):"palace"===E.value&&(L.min=1e4,L.placeholder=1e4)},D=function(){"1"===F.value?"1"===A.value?A.setCustomValidity(""):A.setCustomValidity("В однокомнатном помещении может расположиться один гость."):"2"===F.value?"1"===A.value||"2"===A.value?A.setCustomValidity(""):A.setCustomValidity("Двухкомнатное помещение доступно для 1-го или 2-ух гостей."):"3"===F.value?"1"===A.value||"2"===A.value||"3"===A.value?A.setCustomValidity(""):A.setCustomValidity("Трёхкомнатное помещение доступно для 1-го, 2-ух или 3-ёх гостей."):"100"===F.value&&("0"===A.value?A.setCustomValidity(""):A.setCustomValidity("Не для гостей!"))},R=function(){window.synchronizeFields(F,A,P,b,window.synchronizeValues)},N=function(){window.synchronizeFields(S,_,C,x,window.synchronizeValues)},V=function(){window.synchronizeFields(_,S,x,C,window.synchronizeValues)},z=y.querySelector(".ad-form__reset"),I=function(e){e.preventDefault(),window.main.deactivatePage(),window.newAdForm.resetFormButton.removeEventListener("click",I)},window.newAdForm={fillOutAddressInactive:function(){h.value=q+", "+k},disableNewAdForm:function(){for(var e=0;e<g.length;e++)g[e].disabled=!0;y.classList.add("ad-form--disabled"),E.removeEventListener("input",M),y.removeEventListener("change",D),F.removeEventListener("change",R),S.removeEventListener("change",N),_.removeEventListener("change",V)},enableNewAdForm:function(){for(var e=0;e<g.length;e++)g[e].disabled=!1;y.classList.remove("ad-form--disabled"),E.addEventListener("input",M),y.addEventListener("change",D),F.addEventListener("change",R),S.addEventListener("change",N),_.addEventListener("change",V)},matchRoomNumberWithCapacity:D,newAddressField:h,newAdForm:y,resetNewAdForm:function(){y.reset(),M(),D(),R(),N()},resetFormButton:z,onClickResetForm:I},T=document.querySelector("main"),window.templatesErrorSuccess={showSuccessMessage:function(){var e=document.querySelector("#success").content.querySelector(".success").cloneNode(!0),n=document.createDocumentFragment().appendChild(e);T.appendChild(n);var t=document.querySelector(".success"),o=function(e){e.preventDefault(),t.remove(),window.main.deactivatePage(),document.removeEventListener("keydown",r),window.removeEventListener("click",o)},r=function(e){e.preventDefault(),27===e.keyCode&&(t.remove(),window.main.deactivatePage(),window.removeEventListener("click",o),document.removeEventListener("keydown",r))};document.addEventListener("keydown",r),window.addEventListener("click",o)},showErrorMessage:function(){var e=document.querySelector("#error").content.querySelector(".error").cloneNode(!0),n=document.createDocumentFragment().appendChild(e);T.appendChild(n);var t=document.querySelector(".error"),o=function(e){e.preventDefault(),27===e.keyCode&&(a.removeEventListener("click",i),t.remove(),window.removeEventListener("click",r),document.removeEventListener("keydown",o))},r=function(e){e.preventDefault(),a.removeEventListener("click",i),t.remove(),document.removeEventListener("keydown",o),window.removeEventListener("click",r)},a=t.querySelector(".error__button"),i=function(e){e.preventDefault(),a.removeEventListener("click",i),t.remove(),document.removeEventListener("keydown",o),window.removeEventListener("click",r)};document.addEventListener("keydown",o),window.addEventListener("click",r),a.addEventListener("click",i)},errorPopupHandler:function(e){var n=document.createElement("div");n.style="color: #fff; z-index: 100; margin: 0 auto; padding: 5px 0; top: 0; text-align: center; background-color: tomato; box-shadow: 0 0 5px 5px tomato;",n.style.position="sticky",n.style.left=0,n.style.right=0,n.style.fontSize="25px",n.textContent="× "+e+" ×",document.body.insertAdjacentElement("afterbegin",n)}},Y=function(e,n){var t=new XMLHttpRequest;return t.responseType="json",t.addEventListener("load",(function(){var o;switch(t.status){case 200:e(t.response),window.download.data=t.response,window.adFilter.enableAdFilterForm();break;case 400:o="Неверный запрос";break;case 401:o="Пользователь не авторизован";break;case 404:o="Ничего не найдено";break;default:o="Cтатус ответа: : "+t.status+" "+t.statusText}o&&n(o)})),t.addEventListener("error",(function(){n("Произошла ошибка соединения")})),t.addEventListener("timeout",(function(){n("Запрос не успел выполниться за "+t.timeout+"мс")})),t.timeout=1e4,t},window.download=function(e,n){var t=Y(e,n);t.open("GET","https://21.javascript.pages.academy/keksobooking/data"),t.send()},window.upload=function(e,n,t){var o=Y(n,t);o.open("POST","https://21.javascript.pages.academy/keksobooking"),o.send(e)},window.newAdForm.newAdForm.addEventListener("submit",(function(e){e.preventDefault(),window.upload(new FormData(window.newAdForm.newAdForm),window.templatesErrorSuccess.showSuccessMessage,window.templatesErrorSuccess.showErrorMessage)})),j=window.newAdForm.newAdForm.querySelector(".ad-form-header"),O=j.querySelector(".ad-form-header__preview").querySelector("img"),$=j.querySelector(".ad-form-header__input"),B=window.newAdForm.newAdForm.querySelector(".ad-form__photo-container"),X=B.querySelector(".ad-form__input"),H=B.querySelector(".ad-form__photo"),U=["png","jpg","jpeg"],$.addEventListener("change",(function(){var e=$.files[0],n=e.name.toLowerCase();if(U.some((function(e){return n.endsWith(e)}))){var t=new FileReader;t.addEventListener("load",(function(){O.src=t.result,window.readerResult=t.result})),t.readAsDataURL(e)}})),X.addEventListener("change",(function(){var e=X.files[0],n=e.name.toLowerCase();if(U.some((function(e){return n.endsWith(e)}))){var t=new FileReader;t.addEventListener("load",(function(){var e,n,o,r;e=H,n=t.result,o=document.createDocumentFragment(),(r=document.createElement("img")).src=n,r.width=70,r.height=70,r.alt="Фотография помещения",r.style.borderRadius="5px",o.appendChild(r),e.appendChild(o)})),t.readAsDataURL(e)}})),W=function(){var e=parseInt(window.map.mainMapPin.style.left,10)+31,n=parseInt(window.map.mainMapPin.style.top,10);window.newAdForm.newAddressField.value=e+", "+(n+82)},window.pin={onMouseDownPin:function(e){var n=1168;e.preventDefault(),window.startCoordinates={x:e.clientX,y:e.clientY};var t=!1,o=function(e){e.preventDefault(),t=!0;var o=window.startCoordinates.x-e.clientX,r=window.startCoordinates.y-e.clientY;window.startCoordinates={x:e.clientX,y:e.clientY};var a=window.map.mainMapPin.offsetLeft-o,i=window.map.mainMapPin.offsetTop-r;a>=-32&&a<=n&&i>=48&&i<=548?(window.map.mainMapPin.style.top=i+"px",window.map.mainMapPin.style.left=a+"px"):a<-32?(window.map.mainMapPin.style.top=i+"px",window.map.mainMapPin.style.left="-32px"):a>n?(window.map.mainMapPin.style.top=i+"px",window.map.mainMapPin.style.left="1168px"):i<48?(window.map.mainMapPin.style.top="48px",window.map.mainMapPin.style.left=a+"px"):i>548&&(window.map.mainMapPin.style.top="548px",window.map.mainMapPin.style.left=a+"px"),W()},r=function(e){t||W(),e.preventDefault(),document.removeEventListener("mousemove",o),document.removeEventListener("mouseup",r)};document.addEventListener("mousemove",o),document.addEventListener("mouseup",r)},introduceActivePinPosition:W},(()=>{var e=function(){window.map.fadeMap(),window.adFilter.disableAdFilterForm(),window.newAdForm.disableNewAdForm(),window.adFilter.resetAdFilter(),window.newAdForm.resetNewAdForm(),window.newAdForm.fillOutAddressInactive(),window.card.removeAdCard(),window.map.removeRenderedAdPins(),window.addEventListener("keydown",o)},n=function(){window.map.showMap(),window.download(window.map.renderAdPins,window.templatesErrorSuccess.errorPopupHandler),window.newAdForm.enableNewAdForm(),window.pin.introduceActivePinPosition(),window.newAdForm.resetFormButton.addEventListener("click",window.newAdForm.onClickResetForm)};e();var t=function(e){e.preventDefault(),0===e.button&&window.map.mapElement.classList.contains("map--faded")&&(n(),window.removeEventListener("keydown",o),window.map.mainMapPin.removeEventListener("mousedown",t))},o=function(e){e.preventDefault(),13===e.keyCode&&window.map.mapElement.classList.contains("map--faded")&&(n(),window.removeEventListener("keydown",o),window.map.mainMapPin.removeEventListener("mousedown",(function(){t()})))};window.map.mainMapPin.addEventListener("mousedown",(function(e){t(e),window.pin.onMouseDownPin(e)})),window.addEventListener("keydown",o),window.main={deactivatePage:e}})()})();