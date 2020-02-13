<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <title></title>
  <script src="https://code.jquery.com/jquery-3.4.1.min.js" type="text/javascript" ></script>
  <script src="jquery-ui.min.js" type="text/javascript" ></script>
  <script src="download.js" type="text/javascript" ></script>
  <link href='jquery-ui.min.css'  rel="stylesheet">
  <link href='style.css'  rel="stylesheet">
</head>
<body>
	<?php
		if(isset($_FILES["fileToUpload"])||isset($_GET['niels'])){
			if(!isset($_GET['niels'])){
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
if (file_exists($target_file)) {

} else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    } else {
        echo "Sorry, er was een error en je file is niet geupload...";
    }
}
}else{
	$_FILES["fileToUpload"]["name"]="9789048837021.epub";
}
		?>
	
  <div class='container'>
    <div class='orig'>
    </div>
    <div class='fount'>
    </div>
  </div>
  <div class='nav'><a class=nieuw href='index.php'>Nieuwe .epub uploaden</a><div class='stats'></div><div class='naarrood'>Volgende</div><a class=download href="" download="<?php $file=explode(".",$_FILES["fileToUpload"]["name"]);echo str_replace(" ","_",$file[0]);?>.fountain">Download <?php echo str_replace(" ","_",$file[0]);?>.fountain</a>
</div>
  <script>
	  var deurl="<?php echo $_FILES["fileToUpload"]["name"]?>";
  </script>
  <script src='script.js'>
  </script>
  <?php
	  }else{
		  
	  ?>
	  <form action="" method="post" enctype="multipart/form-data">
    Selecteer een epub bestand om te bewerken:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload" name="submit">
</form>
	  <?php
		  }
		  ?>
</body>
</html>
