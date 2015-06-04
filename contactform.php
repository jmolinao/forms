<?php 
  session_start();
  require_once('config.php');
  $config = new Config();
  
  if(isset($_GET['type'])){ 
    $_SESSION['type']=$_GET['type']; //type form
  }else{
    $_SESSION['type']="general"; //type form
  }
  
  $con =mysql_connect($config->host, $config->user, $config->pass);
  if (!$con){die('ERROR DE CONEXION CON MYSQL:'. mysql_error());}
  $database = mysql_select_db($config->db, $con);

  if (!$database){die('ERROR CONEXION CON BD:'.mysql_error());}
    $sql = 'SELECT * FROM '.$config->prefixTbl.'emails_saved';
    $result = mysql_query ($sql);
	
  if (!$result){
      $sql = "CREATE TABLE IF NOT EXISTS `".$config->prefixTbl."emails_saved` (        
			  `id` int(11) NOT NULL auto_increment,
			  `published` int(11),
			  `created` timestamp NOT NULL default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP,
			  `ipaddress` int(11),
			  `articleid` int(11),
			  `F1` text collate utf8_spanish2_ci,
			  `F2` text collate utf8_spanish2_ci,
			  `F3` text collate utf8_spanish2_ci,
			  `F4` text collate utf8_spanish2_ci,
			  `F5` text collate utf8_spanish2_ci,
			  `F6` text collate utf8_spanish2_ci,
			  `F7` text collate utf8_spanish2_ci,
			  `F8` text collate utf8_spanish2_ci,
			  `F9` text collate utf8_spanish2_ci,
			  `F10` text collate utf8_spanish2_ci,
			  `F11` text collate utf8_spanish2_ci,
			  `F12` text collate utf8_spanish2_ci,
			  `F13` text collate utf8_spanish2_ci,
			  `F14` text collate utf8_spanish2_ci,
			  `F15` text collate utf8_spanish2_ci,
			  `F16` text collate utf8_spanish2_ci,
			  `F17` text collate utf8_spanish2_ci,
			  `F18` text collate utf8_spanish2_ci,
			  `F19` text collate utf8_spanish2_ci,
			  `F20` text collate utf8_spanish2_ci,
			  `id_client` text collate utf8_spanish2_ci,
			  `timestamp` text collate utf8_spanish2_ci,
			PRIMARY KEY  (`id`)
			) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci AUTO_INCREMENT=1 ";
	   mysql_query($sql);  
	   mail($config->to_mail[$_SESSION['type']],'Formulario sitio '.$config->nameSite,'Atención! Se ha generado la tabla en la base de datos correctamente.');
  }  
	
	require_once "helpers/form_".$_SESSION['type'].".html";    

