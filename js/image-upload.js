'use strict';

var adFormHeader = window.newAdForm.newAdForm.querySelector('.ad-form-header');
var avatarPreviewContainer = adFormHeader.querySelector('.ad-form-header__preview');
var avatarPreviewElement = avatarPreviewContainer.querySelector('img');
var avatarInput = adFormHeader.querySelector('.ad-form-header__input');
var userPhotoContainer = window.newAdForm.newAdForm.querySelector('.ad-form__photo-container');
var userPhotoInput = userPhotoContainer.querySelector('.ad-form__input');
var userPhotoPreviewContainer = userPhotoContainer.querySelector('.ad-form__photo');
var ACCEPTED_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg'];

var renderUploadedImage = function (parentElement, imageSrc) {
  var fragment = document.createDocumentFragment();

  var newImgElement = document.createElement('img');
  newImgElement.src = imageSrc;
  newImgElement.width = 70;
  newImgElement.height = 70;
  newImgElement.alt = 'Фотография помещения';
  newImgElement.style.borderRadius = 5 + 'px';

  fragment.appendChild(newImgElement);

  parentElement.appendChild(fragment);
};

avatarInput.addEventListener('change', function () {
  var newAvatar = avatarInput.files[0];
  var newAvatarName = newAvatar.name.toLowerCase();

  var matches = ACCEPTED_FILE_EXTENSIONS.some(function (it) {
    return newAvatarName.endsWith(it);
  });

  if (matches) {
    var newFileReader = new FileReader();

    newFileReader.addEventListener('load', function () {
      avatarPreviewElement.src = newFileReader.result;
      window.readerResult = newFileReader.result;
    });

    newFileReader.readAsDataURL(newAvatar);
  }
});

userPhotoInput.addEventListener('change', function () {
  var newPhoto = userPhotoInput.files[0];
  var newPhotoName = newPhoto.name.toLowerCase();

  var matches = ACCEPTED_FILE_EXTENSIONS.some(function (it) {
    return newPhotoName.endsWith(it);
  });

  if (matches) {
    var newFileReader = new FileReader();

    newFileReader.addEventListener('load', function () {
      renderUploadedImage(userPhotoPreviewContainer, newFileReader.result);
    });

    newFileReader.readAsDataURL(newPhoto);
  }
});
