<?php
class basicMail
{
  protected $recipients = array();
  protected $attachments = null;
  protected $from = null;
  protected $replyTo = '';
  public $subject = null;
  public $body = null;
  protected $contentType = 'text/html';
  protected $headers = null;
  protected $eol = "\r\n";
  //protected $prefix = '{prefixTbl}';
  
  public function __construct() {
  }  private function checkEmailAddress($email){
    return preg_match( "/^([a-zA-Z0-9])+([a-zA-Z0-9\._-])*@([a-zA-Z0-9_-])+([a-zA-Z0-9\._-]+)+$/", $email);
    //return $email;
  } 
  public function addToAddress($email,$name=null){
    if($this->checkEmailAddress($email))
      $this->recipients['to'][] = array($email,$name);
  }
  // short name of the function addToAddress
  public function addTo($email,$name=null){
    $this->addToAddress($email,$name);
  }
  public function addMultipleTo($email){
    if(is_array($email)){
      foreach($email as $e)
        $this->addTo($e);
    } else {
      $emails = explode(",",str_replace(' ','',$email));
      foreach($emails as $e)
        $this->addTo($e);
    }
  }
  public function addBccAddress($email,$name=null){
    if($this->checkEmailAddress($email))
      $this->recipients['bcc'][] = array($email,$name);
  }
  // short name of the function addBccAddress
  public function addBcc($email,$name=null){
    $this->addBccAddress($email,$name);
  }
  public function addMultipleBcc($email){
    if(is_array($email)){
      foreach($email as $e)
        $this->addBcc($e);
    } else {
      $emails = explode(",",str_replace(' ','',$email));
      foreach($emails as $e)
        $this->addBcc($e);
    }
  }
  public function addCcAddress($email,$name=null){
    if($this->checkEmailAddress($email))
      $this->recipients['cc'][] = array($email,$name);
	  
  }
  // short name of the function addCcAddress
  public function addCc($email,$name=null){
    $this->addCcAddress($email,$name);
  }  
  public function addMultipleCc($email){
    if(is_array($mail)){
      foreach($email as $e)
        $this->addCc($e);
    } else {
      $emails = explode(",",str_replace(' ','',$email));
      foreach($emails as $e)
        $this->addCc($e);
    }
  }  


  /* no me funciona aún // This function doesn't work.
  public function addAttachments($filename,$name){
    $size = filesize($filename);
    if($size){
      $file = fopen($filename, "r");
      $content = fread($file, $size);
      $encoded_attach = chunk_split(base64_encode($content));
      $this->contentType = 'multipart/mixed; boundary="Message-Boundary"';
      $this->attachments.= '--Message-Boundary'. $this->eol;
      $this->attachments.= 'Content-type: application/octet-stream; name="'. $name .'"'. $this->eol;
      $this->attachments.= 'Content-Transfer-Encoding: base64'. $this->eol;
      $this->attachments.= 'Content-disposition: attachments; filename="'. $name .'"'. $this->eol;
      $this->attachments.= $encoded_attach . $this->eol;
      $this->attachments.= '--Message-Boundary--'. $this->eol;
    }
  }
  */

  
  public function setFrom($email,$name=null){
    $this->from = (@$name) ? "$name <$email>":$email;
  }
  
  public function setReplyTo($email,$name=null){
    $this->replyTo = (@$name) ? "$name <$email>":$email;
  }

  protected function checkSend(){
        if(!@$this->from)
          throw new Exception('You must provide a sender address.');
        if(!@$this->subject)
          throw new Exception('You must provide a email subject.');
        if(!@$this->body)
          throw new Exception('You must provide a body message.');
        if(!sizeof($this->recipients['to']))
          throw new Exception('You must provide a recipient address.');
        return true;
  }
    
  public function send(){
          if($this->checkSend()) {
            $this->headers.= 'From:'. $this->from . $this->eol;
            $this->headers.= 'Content-type: '. $this->contentType .'; charset=utf-8'. $this->eol;
            $this->headers.= (@$this->attachments) ? 'Content-transfer-encoding: 7BIT'. $this->eol:'';
            $this->headers.= 'MIME-version: 1.0'. $this->eol;
            $this->headers.= 'X-Mailer: PHP/' . phpversion() . $this->eol;      
            if(@$this->replyTo)
              $this->headers.= 'Reply-To:'. $this->replyTo . $this->eol;
            if(sizeof($this->recipients['bcc'])){
              $this->headers.= 'Bcc:';
              foreach($this->recipients['bcc'] as $bcc)
                $this->headers.= (@$bcc[1]) ? $bcc[1] ." <". $bcc[0] .">,":$bcc[0] .',';
              $this->headers = substr($this->headers,0,-1) . $this->eol;
            }
            if(sizeof($this->recipients['cc'])){
              $this->headers.= 'Cc:';
              foreach($this->recipients['cc'] as $cc)
                $this->headers.= (@$cc[1]) ? $cc[1] ." <". $cc[0] .">,":$cc[0] .',';
              $this->headers = substr($this->headers,0,-1) . $this->eol;
            }
            $tos = null;
            foreach($this->recipients['to'] as $to)
              $tos.= (@$to[1]) ? ($to[1] ." <". $to[0] .">,"):$to[0] .',';
            $tos = substr($tos,0,-1);
            $this->headers.= $this->attachments;
			//var_dump($this->recipients);
			//echo $this->subject.'--------';
			//echo $this->body.'--------';
			//echo $this->headers.'--------';
			//exit();
            return mail($tos,$this->subject,$this->body,$this->headers);
          }  
  }

}
?>
