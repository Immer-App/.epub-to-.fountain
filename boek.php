<?php
$za = new ZipArchive();
$za->open('uploads/'.$_GET['url']);
$allehtml=[];
for ($i = 0; $i < $za->numFiles; $i++) {
    $filename = $za->getNameIndex($i);
    if(substr($filename,-4)=="html"){
	     array_push($allehtml,$za->getNameIndex($i));
	}
}
usort($allehtml, function($a, $b) {
    return strlen($a) - strlen($b) ?: strcmp($a, $b);
});
foreach($allehtml as $html){
    $buf= $za->getFromName($html);
	if(substr($buf, 2,11)=="xml version"){
		$doc = new DOMDocument();
		@$doc->loadHTML($buf);
		$content=$doc->getElementsByTagName('div');
		if($content[0]->getAttribute('id')==""||strpos($content[0]->getAttribute('id'),"toc")!==false){
			$content=$doc->getElementsByTagName('p');
			$content=$doc->getElementsByTagName('div');
			
			foreach($content as $pag){
				echo $doc->saveXML($pag);
			}
		}else{		
			echo $doc->saveXML($content[0]);
		}

	}	
}
?>