var classes={tekst:"",witregel:"<BR>.<BR>",cursief:"*",kleinkapitaal:"`"};
var onderdelen={sectie:"#&nbsp;",hoofdstuk:"##&nbsp;",blok:"###&nbsp;.<BR>",witregel:"<BR>.<BR>",quote:">&nbsp;"};
var tags={achtergrondkleur:"background-color: ", interfacekleur:"ui-color",tekstkleur:"text-color"};
var class_header_1='wp-kop';
class_header_1='wpvw-titel';
$('document').ready(function(){
  $.ajax({
    url:"boek.php?url="+deurl,
    method:"GET",
    success:function(data){
      $('.orig').html(data.replace(/\t/g, ''));
      var replacementTag = 'div';

// Replace all a tags with the type of replacementTag
$('.orig').children('*').each(function() {
	$(this).append('<br class="enter"/><br class="enter"/>');
    var outer = this.outerHTML;
    // Replace opening tag
    var regex = new RegExp('<' + this.tagName, 'i');
    var newTag = outer.replace(regex, '<' + replacementTag);
    // Replace closing tag
    regex = new RegExp('</' + this.tagName, 'i');
    newTag = newTag.replace(regex, '</' + replacementTag);
    $(this).replaceWith(newTag);
});
$('.orig').find('p').each(function() {
	$(this).append('<br class="enter"/><br class="enter"/>');
    var outer = this.outerHTML;
    // Replace opening tag
    var regex = new RegExp('<' + this.tagName, 'i');
    var newTag = outer.replace(regex, '<' + replacementTag);
    // Replace closing tag
    regex = new RegExp('</' + this.tagName, 'i');
    newTag = newTag.replace(regex, '</' + replacementTag);
    $(this).replaceWith(newTag);
});
      $('.orig>*:not(.enter)').each(function(){
        $(this).append("<div class='overlay allesverwijderen'>Verwijder alles vóór deze sectie</div><div class='overlay paginaverwijderen'>Verwijder deze sectie</div><!--<div class='overlay paginaidentificeren'>Identificeer deze sectie</div>-->");
        	      if($(this).attr("class")!=undefined){

                $(this).append("<div class='overlay classnaam nietvoorzien' declass='"+$(this).attr("class")+"'>"+$(this).attr("class")+"</div>");
                }

      });
      $('.orig>* *:not(.overlay,.enter)').each(function(){
	      if($(this).attr("class")!=undefined){
        $(this).append("<div class='overlay classnaam nietvoorzien' declass='"+$(this).attr("class")+"'>"+$(this).attr("class")+"</div>");
      }
      });
      $( function() {
        $( ".overlay" ).draggable();
      } );
      stats();
      
    }
  })
  $('body').on('click','.orig>div *:not(".overlay")',function(){
	          $(this).attr("contenteditable","true");
  });
  $('body').on('click','.paginaverwijderen',function(){
    if(confirm('Weet je zeker dat je deze pagina wilt verwijderen?')){
      $(this).parent().remove();
      stats();
    }
  });
  $('body').on('click','.allesverwijderen',function(){
    if(confirm('Weet je zeker dat je ALLES vóór deze pagina wilt verwijderen?')){
      $(this).parent().prevAll().remove();
      stats();
    }
  });
  $('body').on('click','.paginaidentificeren',function(){
	  
	  $(this).css('z-index','10');
    var keuzemenucontent="";
    for (var key in onderdelen) {
      keuzemenucontent+="<div class='keuzeknop keuze"+key+"' keuze='"+key+"'>"+key+"</div>";
    }
    $(this).append("<div class='identificerenmenu'><div class='keuzeknop keuzenegeer' keuze='negeer'>Negeer deze sectie</div>"+keuzemenucontent+"</div>");
   //stats();

  });
  $('body').on('click','.classnaam',function(){
	  $(this).css('z-index',10);
    var keuzemenucontent="";
    for (var key in classes) {
      keuzemenucontent+="<div class='keuzeknop keuze"+key+"' keuze='"+key+"'>"+key+"</div>";
    }
     var sectiecontent="";
    for (var key in onderdelen) {
      sectiecontent+="<div class='keuzeknop keuze"+key+"' keuze='"+key+"'>"+key+"</div>";
    }
        var sectieallcontent="";
    for (var key in onderdelen) {
      sectieallcontent+="<div class='keuzeknop keuze"+key+"all' keuze='"+key+"all'>"+key+"</div>";
    }
    var tagcontent="";
    for (var key in tags) {
      tagcontent+="<div class='keuzeknop keuze"+key+"' keuze='"+key+"'>"+key+"</div>";
    }
    $(this).append("<div class='keuzemenu'><div class='menulinks'>Class interpreteren:<BR><div class='keuzeknop keuzenegeer' keuze='negeer'>Negeer deze class</div><div class='keuzeknop keuzeverwijder1 apartekeuze' keuze='verwijder1'>Verwijder alleen deze</div><div class='keuzeknop keuzeverwijder apartekeuze' keuze='verwijder'>Verwijder al deze</div>"+keuzemenucontent+"</div><div class='menumidden'>Begin voor dit element een:<BR>"+sectiecontent+"<!--<div class='keuzeknop keuzenegeersectie' keuze='verwijder'>Geen</div>-->Begin voor al deze elementen een:<BR>"+sectieallcontent+"<!--<div class='keuzeknop keuzenegeersectie' keuze='verwijderall'>Geen</div>--></div><div class='menurechts'>Tag voor dit element:<BR>"+tagcontent+"<!--<div class='keuzeknop keuzenegeertag' keuze='verwijder'>Geen</div>--></div></div>");
    //stats();
  });
  $('body').on('click','.naarrood',function(){
    $('html').animate({
      scrollTop: $(".nietvoorzien").offset().top-100
    }, 200);
  });
  $('body').on('click','.keuzemenu .keuzeknop',function(event){
    event.stopPropagation();
    console.log($(this).parent().parent().parent().parent());
    var keuze=$(this).attr('keuze');
    var declass=$(this).parent().parent().parent().attr('declass');
    console.log(declass+" is de declass en "+keuze+" is de keuze");
    if($(this).parent().hasClass('menurechts')){
	 
if(keuze!="verwijder"){
	    $(this).parent().parent().parent().parent().before("<div class='tags'>[["+tags[(keuze)]+": #"+prompt(keuze+" in hex zonder #","000000")+"]]</div>");
	    }else{
		      /*
var i=0;
	    
while (i==0){
		    if($(this).parent().parent().parent().parent().prev().hasClass('tags')){
			    $(this).parent().parent().parent().parent().prev().remove();
		    }else{
			    i=1;
		    }
	    } 
*/
	    }
    }else if($(this).parent().hasClass('menumidden')){
	    /*
var i=0;
	    
while (i==0){
		    if($(this).parent().parent().parent().parent().prev().hasClass('sectie')){
			    $(this).parent().parent().parent().parent().prev().remove();
		    }else{
			    i=1;
		    }
	    }
*/
if(keuze!="verwijder"){
	
	if(keuze.substr(keuze.length-3)=="all"){
		keuze=keuze.substr(0,keuze.length-3);
		var ja=0;
		$('.classnaam').each(function(){
	        if($(this).attr('declass')==declass){
		        			ja++;
			console.log(ja);

	           $(this).parent().before("<div class='sectie' contenteditable='true' id='nieuwelement'>"+onderdelen[(keuze)]+(keuze!='blok'&&keuze!='witregel'&&keuze!='quote'?$(this).parent().html():"")+"</div>");
	           	    $('#nieuwelement').find('.overlay').each(function(){$(this).remove();});
	    $('#nieuwelement').attr('id','');
	    if(keuze=='hoofdstuk'){
	           $(this).parent().after("<div class='sectie' contenteditable='true' id='nieuwelement'>###&nbsp;.<BR></div>");
	           }
	              $('#nieuwelement').find('.overlay').each(function(){$(this).remove();});
	    $('#nieuwelement').attr('id','');


	        }
	      });
	      
	}else{
	    $(this).parent().parent().parent().parent().before("<div class='sectie' contenteditable='true' id='nieuwelement'>"+onderdelen[(keuze)]+(keuze!='blok'&&keuze!='witregel'&&keuze!='quote'?$(this).parent().parent().parent().parent().html():"")+"</div>");
	       $('#nieuwelement').find('.overlay').each(function(){$(this).remove();});
	    $('#nieuwelement').attr('id','');
	    if(keuze=='hoofdstuk'){
	           $(this).parent().parent().parent().parent().after("<div class='sectie' contenteditable='true' id='nieuwelement'>###&nbsp;.<BR></div>");
	           }
	    $('#nieuwelement').find('.overlay').each(function(){$(this).remove();});
	    $('#nieuwelement').attr('id','');
	    }
	    }
    }else{
	    if(keuze!='verwijder1'){
	      $('.classnaam').each(function(){
	        if($(this).attr('declass')==declass){
	          $(this).addClass('voorzien');
	          $(this).removeClass('nietvoorzien');
	          $(this).attr('ditis',keuze);
	           $(this).parent().attr('ditis',keuze);
	          if(keuze=='verwijder'){
	            $(this).parent().addClass('verwijderd');
	          }else{
	            $(this).parent().removeClass('verwijderd');
	          }
	        }
	      });
	    }else{
	      $(this).parent().parent().parent().addClass('voorzien');
	      $(this).parent().parent().parent().removeClass('nietvoorzien');
	      $(this).parent().parent().parent().attr('ditis',keuze);
	      $(this).parent().parent().parent().attr('ditis',keuze);
	      $(this).parent().parent().parent().parent().addClass('verwijderd');
	      
	    }
    }
    stats();
    $('.keuzemenu').each(function(){
	    $(this).parent().css('z-index',1);
		$(this).remove();
	});
    
  });

  $(document).mouseup(function(e){
    var container = $(".keuzemenu,.identificerenmenu");
    if (!container.is(e.target) && container.has(e.target).length === 0){
	    $('.keuzemenu').parent().css('z-index',1);
	    $('.identificerenmenu').parent().css('z-index',1);
      container.remove();
    }
  });
  $("body").on('blur',"*[contenteditable='true']",function(){$(this).attr('contenteditable','false');stats();});
});
$("body").on('click','.download',function(){
	
	var temp=$('<div id="tempDiv">' + $('.fount').html().split('<br class="enter" contenteditable="false">').join('\n').split('<br contenteditable="false">').join('\n').split('<br>').join('\n') + '</div>');
console.log(temp.text());


	download(temp.text().replace(/\t/g, ''), $(this).attr("download"), "text/plain");
});
$("body").on('click','.tags,.sectie',function(){
	$(this).remove();
});

function stats(){
	//console.log($('.orig').html());
	$(".fount").html($('.orig').html());
	$(".fount").find(".overlay").remove();
	$(".fount *").each(function(){
		$(this).attr('contenteditable','false');
		if($(this)[0].hasAttribute('ditis')){
			$(this).prepend(classes[$(this).attr('ditis')]);
			if($(this).attr('ditis')=='kleinkapitaal'){
				$(this).html($(this).html().toLowerCase());
			}

			if($(this).attr('ditis')!='witregel'){
				$(this).append(classes[$(this).attr('ditis')]);
			}else{
				$(this).html(classes[$(this).attr('ditis')]);
			}
		}
	});
  $('.stats').html('Aantal gedaan: <b>'+$('.voorzien').length+'</b> Aantal te gaan <b>'+$('.nietvoorzien').length+'</b>')
}