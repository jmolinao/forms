<?php
class Config{
  //config server 
  public $host='host';
  public $user='dbUser';
  public $db='dbName';
  public $pass='dbPass';
  //config template emails
  public $nameSite='Name Site';
  public $prefixTbl='form_gnr_'; //no cambiar define parte del nombre de la table de la bd
  public $from='noreply@site.cl';
  public $to_mail=array(
       "general"=>"to@mail.cl" //define los destinatarios del formularios, separar con comas en caso de ser más de uno
  );
  public $cc_mail=array(
     "general"=>"tocc@mail.cl" //define las CC del formularios, separar con comas en caso de ser más de uno
  );
} 
