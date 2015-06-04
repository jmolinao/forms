// prepare the form when the DOM is ready 
jQuery(function($){
   $.datepicker.regional['es'] = {
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
      dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: ''};
   $.datepicker.setDefaults($.datepicker.regional['es']);
}); 

$(document).ready(function(){ 
	 //$('#boton1').css('background','#666');
     //$('#boton2').css('background','#999');
	//$('#boton3').css('background','#999');
	 
	 //btn1
	 $('#boton1').click(function(){     
	    $('#total').css('display','block');
		$('#total1').css('display','none');
		$('#total2').css('display','none');
        
		$("#form")[0].reset();   
		$("#form").find(':input').each(function() {
            if(this.type!='submit')
			  this.style.background=window.backgroundSuccess; 
        });
		
		//$('#boton1').css('background','#666');
		//$('#boton2').css('background','#999');
		//$('#boton3').css('background','#999');
	 });
	 
	 //btn2
	 $('#boton2').click(function(){      		
		$('#total').css('display','none');
		$('#total1').css('display','block');
        $('#total2').css('display','none');		
        
		$("#form1")[0].reset();
		$("#form1").find(':input').each(function() {
            if(this.type!='submit')
			  this.style.background=window.backgroundSuccess; 
        }); 		
		//$('#total form').remove();
		//$('#total2 form').remove();	
		
        //$('#form').find('input, textarea, button, select').attr('disabled','disabled');
		//$('#form2').find('input, textarea, button, select').attr('disabled','disabled');	
        //$('#boton1').css('background','#999');
        //$('#boton2').css('background','#666');	
        //$('#boton3').css('background','#999');			
	 });
	 
	 //btn3
	 $('#boton3').click(function(){      
		$('#total2').css('display','block');
		$('#total1').css('display','none');
        $('#total').css('display','none');	
        $("#form2")[0].reset();
        $("#form2").find(':input').each(function() {
            if(this.type!='submit')
			  this.style.background=window.backgroundSuccess; 
        });		
        //$('#boton1').css('background','#999');
        //$('#boton2').css('background','#999');
        //$('#boton3').css('background','#666');			
	 });
	 
	 //radio button F8 form_contact
	 $('.radio1').click(function(){
	      $('#radio-contact').append("<div id='grupo'><!--<label class='control-label' for='passenger'>Seleccione la Sede</label>--><div class='controls'><select id='F6' name='F6'><option value='-'>Seleccione la Sede..</option><option value='Santiago'>Santiago</option><option value='Viña del Mar'>Viña del Mar</option></select></div></div>");
		  $('#radio-contact').append("<div id='grupo'><!--<label class='control-label' for='passenger'>Seleccione la Carrera</label>--><div class='controls'><select id='F7' name='F7'><option value='-'>Seleccione la Carrera..</option><option value='Artes Culinarias'>Artes Culinarias</option><option value='Hotelería y Turismo'>Hotelería y Turismo</option><option value='Administración de Negocios del Vino'>Administración de Negocios del Vino </option><option value='Dirección y Producción de Eventos'>Hotelería y Turismo</option></select></div></div>");
		  //$('#radio-contact').css('display','block');
	 });
	 
	 $('.radio2').click(function(){   
		  $('#radio-contact div').remove();
		  //$('#radio-contact').css('display','none');
	 });
	 
	 function load_radio(){
	    try{ 
	     $('#radio-contact div').remove();
	     $('#radio-contact').append("<div id='grupo'><!--<label class='control-label' for='passenger'>Seleccione la Sede</label>--><div class='controls'><select id='F6' name='F6'><option value='-'>Seleccione la Sede..</option><option value='Santiago'>Santiago</option><option value='Viña del Mar'>Viña del Mar</option></select></div></div>"); 
		 $('#radio-contact').append("<div id='grupo'><!--<label class='control-label' for='passenger'>Seleccione la Carrera</label>--><div class='controls'><select id='F7' name='F7'><option value='-'>Seleccione la Carrera..</option><option value='Artes Culinarias'>Artes Culinarias</option><option value='Hotelería y Turismo'>Hotelería y Turismo</option><option value='Administración de Negocios del Vino'>Administración de Negocios del Vino </option><option value='Dirección y Producción de Eventos'>Hotelería y Turismo</option></select></div></div>");
	    }catch(err){return false;}	
	 }
	 
	/*
	$("#form").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 5
			},
			confirm_password: {
				required: true,
				minlength: 5,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
			
			email_confirm: {
				required: true,
				email: true,
				equalTo: "#email"
			},
			
			topic: {
				required: "#newsletter:checked",
				minlength: 2
			},
			agree: "required"
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 5 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy"
		}
	});

	*/
	
	$("#inputdate").datepicker({
			dateFormat: 'dd/mm/yy',
			altField: '#thealtdate',
			altFormat: 'dd/mm/yy',
		   //showOn: "button",
		  // buttonImage: "assets/css/images/calendar.gif",
		   //buttonImageOnly: true
	});
	
	$("#outputdate").datepicker({
		    dateFormat: 'dd/mm/yy',
			altField: '#thealtdate',
			altFormat: 'dd/mm/yy'	
		   //showOn: "button",
		   //buttonImage: "assets/css/images/calendar.gif",
		   //buttonImageOnly: true
	});
	
	$("#inputdate1").datepicker({
			dateFormat: 'dd/mm/yy',
			altField: '#thealtdate',
			altFormat: 'dd/mm/yy',
		   //showOn: "button",
		  // buttonImage: "assets/css/images/calendar.gif",
		   //buttonImageOnly: true
	});
	
	$("#outputdate1").datepicker({
		    dateFormat: 'dd/mm/yy',
			altField: '#thealtdate',
			altFormat: 'dd/mm/yy'	
		   //showOn: "button",
		   //buttonImage: "assets/css/images/calendar.gif",
		   //buttonImageOnly: true
	});
	
	var options = { 
        //target:        '#conversion',
        beforeSubmit:  showRequest,
        success:       showResponse,
        url:       'api/contact.php',
        type:      'post', 
        dataType:  'json', 
        clearForm: true,
        //resetForm: true,
        //timeout:   3000 
    }; 
	
    
	$('#form').submit(function() {  
	       $(this).ajaxSubmit(options);		 
		   return false; 
    });

    $('#form1').submit(function() {  
	       $(this).ajaxSubmit(options);		 
		   return false; 
    });	
	
	$('#form2').submit(function() {  
	       $(this).ajaxSubmit(options);		 
		   return false; 
    });	
	
	function showRequest(formData, jqForm, options) {
		var queryString = $.param(formData); 
		//formData.length
        //alert(formData[3].type);
		var formElement = jqForm[0]; 
	     //alert(eval("formElement.nombre"));
		//alert('About to submit: \n\n' + queryString); 
		var count_error = 0;
		//alert(jqForm.length);
		for(var i=0;i<formData.length;i++){
		    //alert(eval("formElement."+formData[i].name+".type"));	
			var type = checkType(eval("formElement."+formData[i].name));
			switch(type){
					case 'textarea'  : count_error = count_error + Vtext(eval("formElement."+formData[i].name));    break;
					case 'text'      : count_error = count_error + Vtext(eval("formElement."+formData[i].name));    break;
					case 'file'      : count_error = count_error + Vtext(eval("formElement."+formData[i].name));    break;
					case 'select-one': count_error = count_error + Vselect(eval("formElement."+formData[i].name));  break;
					case 'radio'     : count_error = count_error + Vchecked(eval("formElement."+formData[i].name)); break;
					case 'checkbox'  : count_error = count_error + Vchecked(eval("formElement."+formData[i].name)); break;
			}	
		}
		
		if(count_error > 0)
		  return false;
		else{
			var formulario = document.getElementById("total");
			var loading = document.getElementById("load");
			formulario.className = "invisible";
			loading.className = "visible";
			return true;
		}    			         		  
	} 
 
	function showResponse(responseText, statusText, xhr, $form)  { 	
        var formulario = document.getElementById("total");
		var loading = document.getElementById("load");
		formulario.className = "visible";
		loading.className = "invisible";
        if(responseText.message=="captcha error"){		   
		   alert('El código de verificación es incorrecto, intentelo nuevamente!');
		   change_captcha();
		   if(responseText.message=="timestamp limit")
				alert('El formulario ha fue enviado anteriormente, favor intentelo más tarde');
		}else{
		   //dialog('El Formulario se ha enviado correctamente, pronto lo contactaremos!','success');
		   alert('El Formulario se ha enviado correctamente, pronto lo contactaremos!');
		   //$(".btn").show();
		   load_radio();//form_contact
		   change_captcha();
		   resetform();
		   ppcconversion();
		}
	} 
	
	 $('#refresh').click(function() {  		
		change_captcha();
	 });
	 
	 function change_captcha(){
	   try{
		document.getElementById('captcha').src="api/captcha.php?rnd=" + Math.random();
	   }catch(err){return false;}	
	 }

	 function ppcconversion() {
		var iframe = document.createElement('iframe');
		/*iframe.style.width = 'auto';
		iframe.style.height = 'auto';
		iframe.style.background = 'transparent';*/
		iframe.style.border = '0px';
		document.body.appendChild(iframe);
		iframe.src = 'helpers/adwords.html';
	 };


});

 function dialog(msg,type){
    $("#msg-modal").html(msg);
	if(type=='success'){    
	    $("#icon-dialog").removeClass("ui-icon ui-icon-info");
		$("#icon-dialog").addClass("ui-icon ui-icon-circle-check");
	}else{
	    $("#icon-dialog").removeClass("ui-icon ui-icon-circle-check");
	    $("#icon-dialog").addClass("ui-icon ui-icon-info");
	}
    $("#dialog" ).dialog({
	    modal: true,
		  buttons: {
			Ok: function() {
			  $( this ).dialog( "close" );
			}
		  }
	});
 }
 
 
 function resetform(){
    try{
	//------reset del select del codigo de comuna
	$('#codet')
	.find('option')
    .remove()
    .end()
    .append('<option value="-">-</option>')
    .val('-');
	//--------reset de los formularios
     $("#form")[0].reset();
     $("#form1")[0].reset();
	 $("#form2")[0].reset();
	}catch(err){return false;}	
 }
