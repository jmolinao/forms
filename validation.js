    var noneSelect = '-';
	var checkType = function(fieldObj){
		var aux = $chk(fieldObj[0]) ? fieldObj[0].type:fieldObj.type;
		aux = fieldObj.type == 'select-one' ? 'select-one':aux;
		if(aux!='textarea' && aux!='text' && aux!='file' && aux!='select-one' && aux!='radio' && aux!='checkbox'){
		    //alert(message['FIELD'] + fieldObj.name + message['TYPE'] + aux + message['UNSUPPORTED']);
			return false;
		}else{
			return aux;
		}
	}

	/*
	var checkFormOK(field){

	}
	*/

	
// text && textarea [field is an Object]
var Vtext = function(fieldObj){
	  //if(!$chk(fieldObj.value)){ //value to field
	  //		if($chk(fieldObj.getAttribute('message')))
	  //			alert(fieldObj.getAttribute('message'));
	  //		else
				//alert(message['text|textarea|select']);
		//createArrow(getOffSet(fieldObj.id).top, getOffSet(fieldObj.id).left);
	  //	fieldObj.focus();
	  //		return 1;
	  //} else {
 		
			// Verifico si pide formato especifico
			if(fieldObj.length==2){
			    //validate confirm	  
                if(fieldObj[0].getAttribute('format')=='email' || fieldObj[0].getAttribute('format')=='email-confirm'){
				   if(fieldObj[0].value==fieldObj[1].value){
				         //validate email
					     if(!checkEmail(fieldObj[0].value) && !checkEmail(fieldObj[1].value)){
							//fieldObj[0].focus();
							fieldObj[0].style.background=window.backgroundError;
							fieldObj[1].style.background=window.backgroundError;
							return 1;
						 }else{
					        //success
							fieldObj[0].style.background=window.backgroundSuccess;
					        fieldObj[1].style.background=window.backgroundSuccess;
							return 0;	
						 }		
				   }else{
				      //fieldObj[0].focus();
				      fieldObj[0].style.background=window.backgroundError;
					  fieldObj[1].style.background=window.backgroundError;
				      return 1;
				   }
				}else{
					dialog('Nombres repetido, verifique los ID de los campos de texto.','error');
					return 1;
				}
         	}else{
			    //validate normal
			    if(fieldObj.length>2){
				  dialog('Nombres repetido, verifique los ID de los campos de texto.','error');
				  return 1;
				}else{
						if(
						  $chk(fieldObj.getAttribute('need')) && fieldObj.value=='' ||
						  $chk(fieldObj.getAttribute('need')) && fieldObj.value=='Nombre' 
						){ //validate need field
						   fieldObj.style.background=window.backgroundError;
						   return 1;
						}else{
						    fieldObj.style.background=window.backgroundSuccess;
							
							if($chk(fieldObj.getAttribute('format'))){
								var format = fieldObj.getAttribute('format');
								format = format.split(":");
							
							
							
							//formato date -> ej: format='date:aa-dd-yyyy'
							if(format[0] == 'date'){
								//if(!$chk(format[1]) || format[1] == ''){
								  //alert(message['NOT_FORMAT_DATE'] +"'"+ fieldObj.id +"'");
								  //return 1;
								//} else {
								  if(fieldObj.value!=''){
									  if(!checkDate(fieldObj.value,format[1])){
										fieldObj.style.background=window.backgroundError;
										//fieldObj.focus();
										return 1;
									  } else {
										fieldObj.style.background=window.backgroundSuccess;
										return 0;
									  }
								  }else{
									return 0;
								  }	  
								//}
							}
						  
							  // formato email -> ej: format='email'
							  if(format[0] == 'email'){
										if(!checkEmail(fieldObj.value)){
											//alert(message['NOT_EMAIL']);
											fieldObj.style.background=window.backgroundError;
											fieldObj.value='E-mail no Valido!';
											//fieldObj.focus();
											return 1;
										} else {
										  fieldObj.style.background=window.backgroundSuccess;
										  return 0;
										}
							  }
							  
							  // formato rut -> ej: format='rut'
							  if(format[0] == 'rut'){
										//valida el rut usando la función RUT y ademas valida que el largo del texto ingresado no sea superior a 10
										if(!Rut(fieldObj.value) && (fieldObj.value.length > 10 || fieldObj.value.length <= 12 )){
											//alert(message['NOT_EMAIL']);
											fieldObj.style.background=window.backgroundError;
											fieldObj.value='RUT no Valido!';
											//fieldObj.focus();
											return 1;
										} else {
										  fieldObj.style.background=window.backgroundSuccess;
										  return 0;
										}
							   }
							   
							// formato phone -> ej: format='phone'
							if(format[0] == 'phone'){	
								//utilizo una variable auxiliar para validar el telefono sin usar directamente el campo.
								var telefono = fieldObj.value;
								//var auxFono = false;
								/*if(telefono === "Teléfono"){
									telefono = 0;
									auxFono = true;
								}*/
								if(!phone(telefono)){
									//alert(message['NOT_EMAIL']);											
									fieldObj.style.background=window.backgroundError;
									fieldObj.value='Teléfono no Valido!';
									//fieldObj.focus();
									return 1;
								} else {
									if(telefono.length >= 6 || auxFono === true){
										fieldObj.style.background=window.backgroundSuccess;
										return 0;
									}else{
										fieldObj.style.background=window.backgroundError;
										fieldObj.value='Teléfono no Valido!';
										return 1;
									}
										
								}
							}
						  
							  // formato file -> ej: format='file:gif,png,pdf,docx,doc'
							  if(format[0] == 'file'){
								var extensions = $chk(format[1]) ? format[1]:'';
										if(!checkFile(fieldObj.value,extensions)){
											//fieldObj.focus();
											//createArrow(getOffSet(fieldObj.id).top, getOffSet(fieldObj.id).left);
											return 1;
										} else {
											  return 0;
										}
							   }
							}
							
							// Verifico si pide un valor optimo
							if($chk(fieldObj.getAttribute('valueOp'))) {
								if(fieldObj.getAttribute('valueOp') != fieldObj.value){
									if($chk(fieldObj.getAttribute('message')))
										dialog(fieldObj.getAttribute('message'),'error');
									else
									 dialog(message['UNEXPECTED_VALUE'],'error');
									 fieldObj.style.background=window.backgroundError;
									 //fieldObj.focus();
									return 1;
								 } else {
									fieldObj.style.background=window.backgroundSuccess;
									return 0;
								  }
							}
								return 0;
						}
					
							
			}	
			//}          }
	     }
}//end vtext

	// select [field is an Object]
	var Vselect = function(fieldObj){
		if(fieldObj.value == noneSelect && $chk(fieldObj.getAttribute('need'))){
			if($chk(fieldObj.getAttribute('message'))){
				//dialog(fieldObj.getAttribute('message'),'error');
			}else{
				//alert(message['text|textarea|select']);
			  fieldObj.style.background=window.backgroundError;
			  //fieldObj.focus();
		      //createArrow(getOffSet(fieldObj.id).top, getOffSet(fieldObj.id).left);
			  return 1;
			}
		}
		fieldObj.style.background=window.backgroundSuccess;
		return 0;
	}

	// radio && checkbox [field is an Object]
	var Vchecked = function(fieldObj){
		var checked = false;
		if($chk(fieldObj[0]))
			for(c=0; ele = fieldObj[c]; c++){
				if (ele.checked){
					checked = true;
					break;
				}
			}
		else
			if (fieldObj.checked) { checked = true; }
		
		if (!checked){
		var field = $chk(fieldObj[0]) ? fieldObj[0]:fieldObj;
		if($chk(field.getAttribute('message')))
				dialog(fieldObj.getAttribute('message'),'error');
			else
				//alert(message['text|textarea|select']);
			//field.focus();
		    //createArrow(getOffSet(field.id).top, getOffSet(field.id).left);
			return 1;
		} else {
		return 0;
	  }
	}

	// --- VALIDADORES --- //
	var checkEmail = function(value) {
	  var re = /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,3})$/
	  if(!re.exec(value)){
		//alert(message['NOT_EMAIL']);
		return false;
	  } else {
		return true;
	  }
	}

	var checkFile = function(value,extensions){
	  var ext = value.split(".");
	  if(ext.length <= 1){
		dialog(message['WITHOUT_EXTENSION'],'error');
		return false;
	  } else {
		var accept = extensions.split(/,|;/);
		if(accept.length > 0){
		  var countext = 0;
		  for(d=0 ; d<accept.length ; d++){
			if(ext[ext.length-1].toLowerCase() == accept[d]){
			  countext++;
			}
		  }
		  if(countext == 0){
			dialog(message['NO_VALID_EXTENSION'],'error');
			return false;
		  } else {
			return true;
		  }
		} else {
		  return true;
		}
	  }
	}

	var checkDate = function(date,format){
	  var dt = date.split("-");
	  var ft = format.split("-");
	  var status = true;
	  if(dt.length == ft.length){
		for(e=0; e<ft.length ; e++){
		  if(dt[e].length < ft[e].length)
			status = false;
		}
	  } else {
		status = false;
	  }

	  if(!status){
		    dialog(message['FORMAT_DATE'] + format,'error');
			return false;
	  }
	  
	  for(f=0; f<ft.length ; f++){
		switch(ft[f]){
		  case "d":
		  case "dd": if (isNaN(dt[f]) || parseInt(dt[f], 10)<1 || parseInt(dt[f], 10)>31){
					   dialog(message['INVALID_DAY'],'error');
					   return false;
					 } break;
		  case "m":
		  case "mm": if (isNaN(dt[f]) || parseFloat(dt[f])<1 || parseFloat(dt[f])>12){
					   dialog(message['INVALID_MONTH'],'error');
					   return false;
					 }
					 if (dt[f]==4 || dt[f]==6 || dt[f]==9 || dt[f]==11 || dt[f]==2) {  
					   if (dt[f]==2 && dt[f]>28 || dt[f]>30) {  
						 dialog(message['INVALID_DAY'],'error');
						 return false;
					   }
					 } break;
		  case "yy": 
		  case "aa": if (isNaN(dt[f]) || parseFloat(dt[f])<1 || parseFloat(dt[f])>99){
					   dialog(message['INVALID_YEAR'],'error');
					   return false;
					 } break;
		  case "yyyy":
		  case "aaaa":
					 if (isNaN(dt[f]) || parseFloat(dt[f])<1900){
					   dialog(message['INVALID_YEAR'],'error');
					   return false;
					 } break;               
		}
	  }
	  return true;    
	}

	var getOffSet = function(id){
	  var obj = $(id);
	  var curleft = curtop = 0;
	  if (obj.offsetParent) {
		do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
		} while (obj = obj.offsetParent);
	  }
	  return {top: curtop
			 ,left: curleft};
	}
	
	var phone=function(value){	  
		if(isNaN(value))
			return false;
		else
			return true;
	}
    
	var createArrow = function(top, left){
	  var arrow = document.createElement('div');
	  arrow.setAttribute('id','div_arrow');
	  arrow.style.position    = "absolute";
	  arrow.style.top         = (top - 42)+"px";
	  arrow.style.left        = (left) +"px";
	  arrow.style.zIndex      = 1000;
	  arrow.style.background  = "";
	  arrow.style.height      = 48 + "px";
	  arrow.style.width       = 40 + "px";
	  document.body.appendChild(arrow);
	  //setTimeout( 'deleteArrow()', 2000 );
	}

	var deleteArrow = function(){
	  //var arrow = $('div_arrow');
	  //document.body.removeChild(arrow);
	}
    
	  var message = new Array(2);
	  message['text|textarea|select'] = "Falta por ingresar un campo Obligatorio!";
	  message['radio|checkbox']       = "Falta aún seleccionar unos Item.";
	  message['FORMAT_DATE']          = "El formato ingresado es incorrecto.\n\rEl formato solicitado es "; 
	  message['NOT_FORMID']           = "El ID del formulario no existe, o su ID no es único.";
	  message['NOT_EMAIL']            = "El formato ingresado no corresponde al de EMAIL.";
	  message['WITHOUT_EXTENSION']    = "El archivo seleccionado no posee extensión.";
	  message['NO_VALID_EXTENSION']   = "La extensión del archivo no está permitida.";
	  message['UNEXPECTED_VALUE']     = "El valor no es el esperado.";
	  message['NOT_FORMAT_DATE']      = "No ha definido el formato de fecha en el campo ";
	  message['NOT_EXISTS']           = " no existe";
	  message['FIELD']                = "El campo ";
	  message['TYPE']                 = " de tipo ";
	  message['UNSUPPORTED']          = " no es soportado por validateForm.";
	  message['INVALID_DAY']          = "Día inválido";
	  message['INVALID_MONTH']        = "Mes inválido";
	  message['INVALID_YEAR']         = "Año inválido";
	  
 	  
