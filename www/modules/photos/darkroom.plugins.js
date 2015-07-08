(function() {
  function getCurrentImage(canvas) {
    var objects = canvas.getObjects();

    for (var i = objects.length - 1; i >= 0; i--) {
      if (objects[i] instanceof fabric.Image) return objects[i];
    }
  }

  var Grayscale = fabric.Image.filters.Grayscale;
  var Brightness = fabric.Image.filters.Brightness;

  Darkroom.plugins.grayscale = Darkroom.Plugin.extend({
    initialize: function initDarkroomGrayscalePlugin() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      this.toggleButton = buttonGroup.createButton({
        image: 'save'
      });

      this.toggleButton.addEventListener('click', this.toggleGrayscale.bind(this));
      this.toggledOn = false;
    },

    toggleGrayscale: function toggleGrayscale() {
      var canvas = this.darkroom.canvas;
      var img = getCurrentImage(canvas);

      this.toggledOn = !this.toggledOn;

      img.filters[1] = this.toggledOn
        ? this.getFilter()
        : null;

      img.applyFilters(canvas.renderAll.bind(canvas));

      darkroom.dispatchEvent('image:filter');
    },

    getFilter: function() {
      return this.filter = this.filter || new Grayscale();
    }
  });

  Darkroom.plugins.brightness = Darkroom.Plugin.extend({
    initialize: function initDarkroomBrightnessPlugin() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      this.brightnessButton = buttonGroup.createButton({
        image: 'brightness'
      });

      var toggle = this.toggleHide.bind(this);
      this.brightnessButton.addEventListener('click', toggle);

      var control = this.control = document.createElement('div');
      control.className = 'darkroom-brightness-control';
      control.innerHTML = [
        '<label>',
          'Brightness:',
          '<input type="range" max="255" min="0" value="0">',
        '</label>'
      ].join('');

      var input = control.lastChild.lastChild;
      var adjustBrightness = this.adjustBrightness.bind(this);
      input.oninput = function(e) {
        adjustBrightness(e.target.value);
      }

      this.darkroom.toolbar.element.appendChild(control);
    },

    toggleHide: function() {
      this.control.style.display =  this.control.style.display ? '' : 'none';
    },

    getFilter: function() {
      return this.filter = this.filter || new Brightness({brightness: 0});
    },

    adjustBrightness: function(value) {
      var brightness = parseInt(value, 10);
      var canvas = this.darkroom.canvas;
      var img = getCurrentImage(canvas);

      var filter = this.getFilter();
      img.filters[0] = brightness !== 0
        ? filter
        : null;
      filter.brightness = brightness;

      img.applyFilters(canvas.renderAll.bind(canvas));

      darkroom.dispatchEvent('image:filter');
    }
  });

  Darkroom.plugins.reset = Darkroom.Plugin.extend({
    initialize: function initDarkroomResetPlugin() {
      var buttonGroup = this.darkroom.toolbar.createButtonGroup();

      this.resetButton = buttonGroup.createButton({
        image: 'rotate-left'
      });

      this.resetButton.addEventListener('click', this.reset.bind(this));
      
      this.originalImg = this.darkroom.image;
    },

    reset: function reset() {
      var darkroom = this.darkroom;
      var canvas = darkroom.canvas;

      darkroom.dispatchEvent('image:beforechange');

      darkroom.image.remove();
      darkroom.image = this.originalImg;

      canvas.setWidth(darkroom.image.width);
      canvas.setHeight(darkroom.image.height);

      canvas.add(darkroom.image);

      darkroom.dispatchEvent('image:change');
    }
  });

})();
