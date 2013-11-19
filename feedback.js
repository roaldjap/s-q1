/**
 * Handles submitting the feedback form
 */
(function (window, $) {

  function initialiseForm() {
    var $form;
    
    $('form').each(function() {
      if ($(this).prop('name') == 'feedback-form') {
        $form = $(this);
        return;
      }
    });

    var $submitButton;
    $('input').each(function() {
      var $this = $(this);
      if ($this.prop('type') == 'submit') {
        $submitButton = $this;
        return;
      }
    });

    var $inputs = $form.find('input');
    var $errorField = $form.find('.error-field');
    var $contactMePermission = $form.find('.contactMeContainer input');

    $inputs.focus(function() {
      $(this).toggleClass('active');
    });

    $inputs.blur(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
      }
    });

    var checked = $contactMePermission.prop('checked');

    $submitButton.click(function() {
      var hasErrors = false,
          firstname;
      
      $inputs.each(function() {
        var $this = $(this);
        var name = $this.prop('name');
        var fields = {};

        if (name == 'firstname') {
          firstname = $this.val();
        }

        if (name == 'firstname' || name == 'lastname' || name == 'feedback' && $this.val() == '') {
          $errorField.append($('<div>' + name + ' is required</div>'));
          hasErrors = true;
        }

        if (checked) {
          if (name == 'email' && $this.val() == '') {
            $errorField.append($('<div>Please provide an email so we can contact you</div>'));
          } 
        }

        if (name == 'subscribe') {
          var checked = $this.prop('checked');
          if (checked) {
            $('#global-message').html('Thank you for subscribing').show();
          }
        }

        fields[name] = $this.val();
        if (!hasErrors) {
          $.ajax('/provide-feedback', {data: {fields: JSON.stringify(fields)}});
          $('#global-message').html('Thankyou ' + firstname + ' for submitting your feedback.').show();
        }
      });
      return false;
    });

  }

  window.onload = function() {
    initialiseForm();
  }
})(window, jQuery);
