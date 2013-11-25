/**
 * Handles submitting the feedback form
 */
 $(document).ready(function() 
 {

  function validateEmail(email) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(email);
  }


  function initialiseForm() {
    var $form = $("form[name='feedback-form']");

    var $submitButton = $(".btn-skiddoo");

    var $inputs = $form.find('input, textarea');
    var $errorField = $form.find('.error-field');
    var $contactMe = $form.find('input[name="feedback"]');

    var checked = $contactMe.prop('checked');

    var firstname = $("input[name='firstname']").val();
    var lastname = $("input[name='lastname']").val();
    var email = $("input[name='email']").val();
    var feedback = $("textarea[name='feedback']").val();

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

      //validate each field is filled.
      $inputs.each(function() {  
        if ($(this).val() === "" || $(this).val() === null ){
          $errorField.append('<li>'+ $(this).prop('placeholder') +' is required</li>');
        }
      });
        
      //invalid input email address    
      if(validateEmail(email) === false){
        //$errorField.append('<li>Email Address is invalid</li>');
      }
      
      //if no errors  
      if($errorField.children().length === 0){
        fields = {};

        fields.firstname = firstname;
        fields.lastname = lastname;
        fields.email = email;
        fields.feedback = feedback;

        //Subscribe must say thank you
        if ($('input[name="subscribe"]').is(':checked')) {
          $.ajax('/provide-feedback', {data: {fields: JSON.stringify(fields)}});
          $('#global-message').empty();
          $('#global-message').append('<p>Thank you ' + firstname + ' for submitting your feedback.</p>').css({"padding": "10px"});   
          $('#global-message').append('<p>Thank you for subscribing to our mailing list</p>').css({"padding": "10px"});
          
        } 

        else {
          $.ajax('/provide-feedback', {data: {fields: JSON.stringify(fields)}});
          $('#global-message').html('Thank you ' + firstname + ' for submitting your feedback.').css({"padding": "10px"});     
        }
         
    
      }
     
    });    

  }

  window.onload = function() {
    initialiseForm();
  };
 });


