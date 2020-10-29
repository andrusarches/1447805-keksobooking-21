'use strict';

(function generateAdCards() {
  var createAdCard = function (arrayElement) {
    var adCardTemplate = document.querySelector('#card')
      .content
      .querySelector('.popup');
    var adCard = adCardTemplate.cloneNode(true);
    var adTitle = adCard.querySelector('.popup__title');
    var adPrice = adCard.querySelector('.popup__text--price');
    var adHousingType = adCard.querySelector('.popup__type');
    var adCapacity = adCard.querySelector('.popup__text--capacity');
    var adTime = adCard.querySelector('.popup__text--time');
    var adFeatures = adCard.querySelector('.popup__features');
    var adDescription = adCard.querySelector('.popup__description');
    var adPhotos = adCard.querySelector('.popup__photos');
    var adAvatar = adCard.querySelector('.popup__avatar');

    if (arrayElement.offer.title.length !== 0) {
      adTitle.textContent = arrayElement.offer.title;
    } else {
      adTitle.classList.add('hidden');
    }

    if (arrayElement.offer.price.length !== 0) {
      adPrice.textContent = `${arrayElement.offer.price}₽/ночь`;
    } else {
      adPrice.classList.add('hidden');
    }

    if (arrayElement.offer.type.length !== 0) {
      switch (arrayElement.offer.type) {
        case 'flat':
          adHousingType.textContent = 'Квартира';
          break;
        case 'bungalow':
          adHousingType.textContent = 'Бунгало';
          break;
        case 'house':
          adHousingType.textContent = 'Дом';
          break;
        case 'palace':
          adHousingType.textContent = 'Дворец';
          break;
      }
    } else {
      adHousingType.classList.add('hidden');
    }

    if (arrayElement.offer.rooms.length !== 0 && arrayElement.offer.guests.length !== 0) {
      adCapacity.textContent = `${arrayElement.offer.rooms} комнаты для ${arrayElement.offer.guests} гостей.`;
    } else if (arrayElement.offer.rooms.length !== 0 && arrayElement.offer.guests.length === 0) {
      adCapacity.textContent = `${arrayElement.offer.rooms} комнаты.`;
    } else if (arrayElement.offer.rooms.length === 0 && arrayElement.offer.guests.length !== 0) {
      adCapacity.textContent = `Для ${arrayElement.offer.guests} гостей.`;
    } else {
      adCapacity.classList.add('hidden');
    }

    if (arrayElement.offer.checkin.length !== 0 && arrayElement.offer.checkout.length !== 0) {
      adTime.textContent = `Заезд после ${arrayElement.offer.checkin}, выезд до ${arrayElement.offer.checkout}.`;
    } else {
      adTime.classList.add('hidden');
    }

    if (arrayElement.offer.features.length !== 0) {
      var featuresFragment = document.createDocumentFragment();
      for (var i = 0; i < arrayElement.offer.features.length; i++) {
        var adFeature = document.createElement('li');
        adFeature.classList.add('popup__feature', 'popup__feature--' + arrayElement.offer.features[i]);
        featuresFragment.appendChild(adFeature);
      }
      adFeatures.appendChild(featuresFragment);
    } else {
      adFeatures.classList.add('hidden');
    }

    if (arrayElement.offer.description.length !== 0) {
      adDescription.textContent = arrayElement.offer.description;
    } else {
      adDescription.classList.add('hidden');
    }

    if (arrayElement.offer.photos.length !== 0) {
      var photosFragment = document.createDocumentFragment();
      for (var k = 0; k < arrayElement.offer.photos.length; k++) {
        var adImg = document.createElement('img');
        adImg.classList.add('popup__photo');
        adImg.width = '45';
        adImg.height = '40';
        adImg.src = arrayElement.offer.photos[k];
        adImg.alt = 'Фотография ' + (k + 1) + ' - ' + arrayElement.offer.title;
        photosFragment.appendChild(adImg);
      }
      adPhotos.appendChild(photosFragment);
    } else {
      adPhotos.classList.add('hidden');
    }

    if (arrayElement.author.avatar.length !== 0) {
      adAvatar.src = arrayElement.author.avatar;
      adAvatar.alt = 'User avatar';
    } else {
      adAvatar.src = 'img/avatars/default.png';
      adAvatar.alt = 'Default avatar';
    }
    return adCard;
  };

  var removeAdCard = function () {
    if (window.map.mapElement.querySelector('.popup__close')) {
      window.map.mapElement.querySelector('.popup__close').parentNode.remove();
    }
  };

  var onEscCard = function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      removeAdCard();
    }
  };

  var showAdCard = function (arrayElement) {
    removeAdCard();
    var mapFilters = window.map.mapElement.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    var newCard = fragment.appendChild(createAdCard(arrayElement));
    var popupCloseButton = newCard.querySelector('.popup__close');

    popupCloseButton.addEventListener('click', function () {
      removeAdCard();
    });
    document.addEventListener('keydown', onEscCard);
    window.map.mapElement.insertBefore(fragment, mapFilters);
  };

  window.card = {
    showAdCard: showAdCard
  };
})();
