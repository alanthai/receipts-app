angular.module('receipts').controller('EditPhotoController', function() {
  var darkroom = window.darkroom = new Darkroom('.picture-edit', {
    plugins: {crop: {}, history: false, save: false}
  });

  function getCurrentImage(canvas) {
    var objects = canvas.getObjects();

    for (var i = objects.length - 1; i >= 0; i--) {
      if (objects[i] instanceof fabric.Image) return objects[i];
    }
  }

  // Modify the cropping plugin such that it caches the filters,
  // then re-applies then to the newly cropped image to preserve their states
  // rather than flattening all filters into the image
  function modifyCrop() {
    var canvas = darkroom.canvas;
    var renderAll = canvas.renderAll.bind(canvas);
    var filtersCache = getCurrentImage(canvas).filters;

    darkroom.addEventListener('image:change', function applyFilters() {
      // fix weird bug when doesn't center
      darkroom.canvas.centerObject(darkroom.image);

      // apply filters from before crop
      var img = getCurrentImage(canvas);
      if (img.filters.length) return;
      img.filters = filtersCache;
      img.applyFilters(renderAll);
    });

    darkroom.addEventListener('image:beforechange', function clearFilters() {
      var img = getCurrentImage(canvas); // last object is the mask
      img.filters = [];
      img.applyFilters();
    });

    // add image:beforechange event
    var cropPlugin = darkroom.plugins.crop;
    var cropCurrentZone = cropPlugin.cropCurrentZone.bind(cropPlugin);
    var newCropCurrentZone = function() {
      darkroom.dispatchEvent('image:beforechange');
      cropCurrentZone();
    }

    // replace crop button for clone to replace its click eventListener
    var oldBtnEl = cropPlugin.okButton.element;
    var clone = oldBtnEl.cloneNode(true);
    oldBtnEl.parentElement.insertBefore(clone, oldBtnEl);
    oldBtnEl.parentElement.removeChild(oldBtnEl);
    cropPlugin.okButton.element = clone;
    clone.addEventListener('click', newCropCurrentZone);
  }

  setTimeout(modifyCrop, 1000);
});