/**
 * Handles submitting the feedback form
 */
(function (window, $) {

   function validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
   }

  function initialiseForm() {
    var $form = $("form[name='feedback-form']");

    var $submitButton = $("input[type='submit']");

    var $inputs = $form.find('input, textarea');
    var $errorField = $form.find('.error-field');
    var $contactMe = $form.find('input[name="feedback"]');

    var checked = $contactMe.prop('checked');

    var  $firstname = $("input[name='firstname']").val();
    var  $lastname = $("input[name='lastname']").val();
    var  $email = $("input[name='email']").val();
    var  $feedback = $("textarea[name='feedback']").val();

// toggling active
    $inputs.focus(function() {
      $(this).toggleClass('active');
    });

    $inputs.blur(function() {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');        
      }
    });

    //submit
    $submitButton.click(function() {
      $errorField.empty();
      //$('#global-message').empty();

      //validate each field is filled.
      $inputs.each(function() {  
        if ($(this).val() == "" || $(this).val() == null ){
          $errorField.append('<li>'+ $(this).prop('placeholder') +' is required</li>');
        }
      });
        
      //invalid input email address?     
      if(!validateEmail($email)){
        $errorField.append('<li>Email Address is invalid</li>');
      }
      
      //if no errors  
      if($errorField.children().length == 0){

        fields = {};

        fields.firstname = $firstname;
        fields.lastname = $lastname;
        fields.email = $email;
        fields.feedback = $feedback;

         //Subscribe must say thank you
        if ($('input[name="subscribe"]').is(':checked')) {
            $.ajax('/provide-feedback', {data: {fields: JSON.stringify(fields)}});
            $('#global-message').html('Thank you ' + $firstname + ' for submitting your feedback.').show();   
            $('#global-message').append('Thank you for subscribing to our mailing list').css({"padding": "10px"});
        }; 

        $.ajax('/provide-feedback', {data: {fields: JSON.stringify(fields)}});
        $('#global-message').html('Thank you ' + $firstname + ' for submitting your feedback.').show();       
      }
      
    
     
      // var hasErrors = false,
      //     firstname;
      
      // $inputs.each(function() {
      //   var $this = $(this);
      //   var name = $this.prop('name');
      //   var fields = {};

      //   if (name == 'firstname') {
      //     firstname = $this.val();
      //   }

      //   if (name == 'firstname' || name == 'lastname' || name == 'feedback' && $this.val() == '') {
      //     $errorField.append($('<li>' + name + ' is required</li>'));
      //     hasErrors = true;
      //   }

      //   if (checked) {
      //     if (name == 'email' && $this.val() == '') {
      //       $errorField.append($('<li>Please provide an email so we can contact you</li>'));
      //     } 
      //   }

      //   if (name == 'subscribe') {
      //     var checked = $this.prop('checked');
      //     if (checked) {
      //       $('#global-message').html('Thank you for subscribing').show();
      //     }
      //   }

      //   fields[name] = $this.val();
      //   if (!hasErrors) {
      //     $.ajax('/provide-feedback', {data: {fields: JSON.stringify(fields)}});
      //     $('#global-message').html('Thank you ' + firstname + ' for submitting your feedback.').show();
      //   }
      // });
      // return false;

     
    });    

  }

  window.onload = function() {
    initialiseForm();
  }
})(window, jQuery);
