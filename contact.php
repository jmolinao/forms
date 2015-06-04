<?php
   session_start();	
   error_reporting(0);
   if(isset($_POST['captcha'])){   
       if(strtoupper($_POST["captcha"]) != $_SESSION["captcha"]){
			 $_SESSION["captcha"] = md5(rand()*time());
			 echo '{ "message": "captcha error"}';
			 exit();
		}
   }	
    
	require_once('config.php');
	require_once('class.basicMail.php');
	$config = new Config();
	$db=new DB(); 
	
	if($db->timestamp($config->prefixTbl)){
        echo '{ "message": "timestamp limit"}';
	}else{
		  //configure		  
		  $nombre = $_POST['F1'];
		  $email = $_POST['F2'];
		  $telefono = $_POST['F3'];
		  $comentario = $_POST['F4'];
		 
		  $body_empresa = str_replace(array('{nombre}','{email}','{telefono}','{comentario}','{form}')
								  ,array($nombre,$email,$telefono,$comentario,$_POST['F20'])
								  ,file_get_contents('../helpers/email_business.html'));
								  


								  
		  $body_cliente = str_replace(array('{nombre}','{email}','{telefono}','{comentario}')
								  ,array($nombre, $email,$telefono,$comentario)
								  ,file_get_contents('../helpers/email_client.html'));
		  

		  
		  //INSERT DATA DB 
		  $sql = "INSERT INTO ".$config->prefixTbl;
		  $sql.="emails_saved(published,created,F1,F2,F3,F4"; 
		 
		  if(isset($_POST['F5'])) $sql.=",F5";
		  if(isset($_POST['F6'])) $sql.=",F6";
			if(isset($_POST['F7'])) $sql.=",F7";
			  if(isset($_POST['F8'])) $sql.=",F8";
				if(isset($_POST['F9'])) $sql.=",F9";
				  if(isset($_POST['F10'])) $sql.=",F10";
					if(isset($_POST['F11'])) $sql.=",F11";
					  if(isset($_POST['F12'])) $sql.=",F12";
						if(isset($_POST['F13'])) $sql.=",F13";
						  if(isset($_POST['F14'])) $sql.=",F14";
							if(isset($_POST['F15'])) $sql.=",F15";
							  if(isset($_POST['F16'])) $sql.=",F16";
								if(isset($_POST['F17'])) $sql.=",F17";
								  if(isset($_POST['F18'])) $sql.=",F18";
									if(isset($_POST['F19'])) $sql.=",F19";
									  if(isset($_POST['F20'])) $sql.=",F20";
									  //new cod validate send form copy and paste
									  $sql.=",id_client";
									  $sql.=",timestamp";

		  $sql.=") VALUES (";
		  $sql.="1,NOW(),'". utf8_decode($_POST['F1']) ."',";
		  $sql.="'". utf8_decode($_POST['F2']) ."',";
		  $sql.="'". utf8_decode($_POST['F3']) ."',";
		  $sql.="'". utf8_decode($_POST['F4']) ."'";
		  if(isset($_POST['F5'])) $sql.=",'". utf8_decode($_POST['F5']) ."'";
		  if(isset($_POST['F6'])) $sql.=",'". utf8_decode($_POST['F6']) ."'";
		  if(isset($_POST['F7'])) $sql.=",'". utf8_decode($_POST['F7']) ."'";
		  if(isset($_POST['F8'])) $sql.=",'". utf8_decode($_POST['F8']) ."'";
		  if(isset($_POST['F9'])) $sql.=",'". utf8_decode($_POST['F9']) ."'";
		  if(isset($_POST['F10'])) $sql.=",'". utf8_decode($_POST['F10']) ."'";
		  if(isset($_POST['F11'])) $sql.=",'". utf8_decode($_POST['F11']) ."'";
		  if(isset($_POST['F12'])) $sql.=",'". utf8_decode($_POST['F12']) ."'";
		  if(isset($_POST['F13'])) $sql.=",'". utf8_decode($_POST['F13']) ."'";
		  if(isset($_POST['F14'])) $sql.=",'". utf8_decode($_POST['F14']) ."'";
		  if(isset($_POST['F15'])) $sql.=",'". utf8_decode($_POST['F15']) ."'";
		  if(isset($_POST['F16'])) $sql.=",'". utf8_decode($_POST['F16']) ."'";
		  if(isset($_POST['F17'])) $sql.=",'". utf8_decode($_POST['F17']) ."'";
		  if(isset($_POST['F18'])) $sql.=",'". utf8_decode($_POST['F18']) ."'";
		  if(isset($_POST['F19'])) $sql.=",'". utf8_decode($_POST['F19']) ."'";
		  if(isset($_POST['F20'])) $sql.=",'". utf8_decode($_POST['F20']) ."'";
		  $sql.=",'".session_id()."'";
		  $sql.=",'".date_format(date_create(), 'U')."'";
		  $sql.=")";
		  
			$db->saveData($sql);
			try{
				  //email business
				  $mail = new basicMail();
				  $mail->subject = "Contacto desde ".$config->nameSite;
				  $mail->setFrom($config->from); 
				  $mail->setReplyTo($email,$nombre);
				  $mail->body = $body_empresa;
				  $mail->addMultipleTo($config->to_mail[$_SESSION['type']]);
				  $mail->addMultipleBcc($config->cc_mail[$_SESSION['type']]);
				  $send = $mail->send();
				  
				  //email client
				  $mail = new basicMail();
				  $mail->subject = "Contacto desde ".$config->nameSite;
				  $mail->setFrom($config->from);
				  $mail->body = $body_cliente;
				  $mail->addTo($email,$nombre);
				  $mail->send();
			}catch(Execption $e){
				//do something...
			}
		  
		  //TODO
		  echo '{ "message": "success"}';
    }
 
class DB{
	  public function saveData($sql){
		require_once('../config.php');
		$dat = new Config();
		$conection  = mysql_connect($dat->host, $dat->user, $dat->pass);
		mysql_select_db($dat->db, $conection);
		mysql_query($sql);
		mysql_close($conection);
	  }
	  
	  //new cod validate send form copy and paste
	  public function timestamp($prfix){
		require_once('../config.php');
		$dat = new Config();
		//echo $prfix;
		$conection  = mysql_connect($dat->host, $dat->user, $dat->pass);
		mysql_select_db($dat->db,$conection);
		$result=mysql_query("SELECT id, timestamp FROM ".$prfix."emails_saved WHERE id_client='".session_id()."' ORDER BY id DESC LIMIT 1");
		if(mysql_num_rows($result)>0){
		   while ($fila = mysql_fetch_assoc($result))
			 $tmsp=$fila['timestamp'];
		   if((date_format(date_create(), 'U')-$tmsp)<30){
			 mysql_close($conection);
			 return true;	 
		   }	   
		}
		return false;
	  }
}
