// Initialize app
var myApp = new Framework7();
var app = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('results', function (page) {
	var vNome = $$("#nome").val(); 
                var vEstado = $$(".estado").val(); 
                var vCidade= $$("#cidade").val(); 
                var vCategoria = $$("#categorias").val(); 
				var distancia = $$('#distancia').val();
    // Do something here for "about" page
	if(distancia != 0 ){
				localizarsempre();
				}else{
	$$.ajax({
    url : 'https://divulgabr.com.br/aplicativo/resultados.php',
    type : 'post',
    data : {'nome':vNome, 'idEstado': vEstado,'idCidade': vCidade, 'idCategoria': vCategoria},
    dataType: 'html',
    beforeSend: function(){
      myApp.showPreloader('Carregando');
$$(".container-resultsOff").hide();	  
    },
    timeout: 3000,    
    success: function(retorno){
myApp.hidePreloader();
	  if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";	  
	 
	  $$.each(data,function(i, data){
		/*item += '<a style="color:black" onClick="exibePaginaBase('+ data.idEmpresa + ')">';
		item += '<div class="container-results">';
		item += '<div class="empresa">';		
		item += '<div class="dados">';
		item += '<p  class="nome" id="nome' + data.idEmpresa +'">' + data.nomeEmpresa + '</p>';	
		item += '<p class="endereco">' + data.endereco + '</p>';
		item += '<p class="telefone"><i class="fa fa-phone" aria-hidden="true"></i> ' + data.telefone + '</p>';
		item += '</div>';
		item += '<div class="logo-empresa">';
		item += '<img style="width:100%;" src="https://divulgabr.com.br/admin/logos/' + data.logo +'" ></div>';
		item += '</div>';
		item += '</div>';
		item += '</a>';
		item += "<div class='border'></div>";*/
		
		item += '<div class="list-block media-list">';
  item += '<ul>';
    item += '<li>';
     item += '<a  class="item-link item-content id'+ data.idEmpresa + '" onClick="exibePaginaBase('+ data.idEmpresa + ')">';
       item += '<div class="item-media"><img src="https://divulgabr.com.br/admin/logos/' + data.logo +'"></div>';
        item +='<div class="item-inner">';
          item += '<div class="item-title-row">';
           item += '<div class="item-title" id="nome'+ data.idEmpresa + '">' + data.nomeEmpresa + '</div>';
         item += '</div>';
         item += '<div class="item-subtitle">' + data.telefone + '</div>';
          item += '<div class="item-text">' + data.endereco + '</div>';
        item += '</div>';
     item += '</a>';
    item += '</li>';
  item += '</ul>';
item += '</div>';
		
		
                    //$("#estadoOption").append(data.nome)
				
                });
	 
	 $$(".modifica").html(item);
	  }else{
	   $$(".container-resultsOff").show();
	   $$(".modifica").hide();
	  }
    },
    error: function(erro){
      
    }       
            });
				}
				
				function onSuccess(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
	var distancia = $$("#distancia").val();

	myApp.alert(lat);
	myApp.alert(lng);
	myApp.alert(distancia);
	
	returnAjax(lat, lng, distancia);
}

function returnAjax(latitude, longitude, distancia){

	 $$.ajax({
      url: "https://divulgabr.com.br/aplicativo/resultados.php",  
	  type : 'post',
    data : {'latitude':latitude, 'longitude': longitude,'distancia': distancia},
    dataType: 'html',
	   beforeSend: function(){
      //$('#carregando').fadeIn(); 
$$(".container-resultsOff").hide();	  
    },
      success: function(ret) { 
		 //alert(retorno);
		 if(ret != "null"){
	  
	  var data = JSON.parse(ret);
	  var item = "";
	  
	  alert('123');
	 
	  $$.each(data,function(i, data){
		item += '<div class="list-block media-list">';
  item += '<ul>';
    item += '<li>';
     item += '<a  class="item-link item-content id'+ data.idEmpresa + '" onClick="exibePaginaBase('+ data.idEmpresa + ')">';
       item += '<div class="item-media"><img src="https://divulgabr.com.br/admin/logos/' + data.logo +'"></div>';
        item +='<div class="item-inner">';
          item += '<div class="item-title-row">';
           item += '<div class="item-title" id="nome'+ data.idEmpresa + '">' + data.nomeEmpresa + '</div>';
         item += '</div>';
         item += '<div class="item-subtitle">' + data.telefone + '</div>';
          item += '<div class="item-text">' + data.endereco + '</div>';
        item += '</div>';
     item += '</a>';
    item += '</li>';
  item += '</ul>';
item += '</div>';
		
                    //$("#estadoOption").append(data.nome)
				
                });	
		$$(".modifica").show();
		$$(".modifica").html(item);	
        }else{
	   $$(".container-resultsOff").show();
	   $$(".modifica").hide();
	  }

      },
	  
   });
}

// onError Callback receives a PositionError object
//
function onError(error) {
    myApp.alert('Ative o GPS', 'Atenção');
}
		
		function localizarsempre() {
    // Update every 4 minute
    var options = { maximumAge: 2400, timeout: 1000, enableHighAccuracy: true };
    watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
}
})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'index') {
        // Following code will be executed for page with data-page attribute equal to "about"
         $$.ajax({
    url:'https://divulgabr.com.br/aplicativo/estados.php',
    data:{'json_order':'123'},
    type:'POST',
	dataType: 'jsonp',
	crossDomain: true,
    beforeSend:function(){
    //myApp.showPreloader('Carregando');
    },
    success:function(retorno)
    {
        myApp.hidePreloader();
        console.log(data);
		 var data = JSON.parse(retorno);
		var item = "";
		item += "<option value=''>ESTADO</option>";
		$$.each(data,function(i, data){
		
	    item += "<option value='"+  data.nome +"'>" + data.nome + "</option>";
                    //$("#estadoOption").append(data.nome)
                });
		$$("#estado").html(item);

    }
    }); 
       
      $$.ajax({
    url : 'https://divulgabr.com.br/aplicativo/categorias.php',
    type : 'post',
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
	  
	  var data = JSON.parse(retorno);
var item = "";
	  item += "<option value=''>CATEGORIA</option>";
	   $$.each(data,function(i, data){
		
	    item += "<option value='" +  data.nome + "'>" + data.nome + "</option>";
                    //$("#estadoOption").append(data.nome)
                });
	  $$("#categorias").html(item);
    },
    error: function(erro){
      
    }       
  }); 

  $$('#estado').change(function() {
  
  var estado = $$("#estado").val();
  
$$.ajax({
    url : 'https://divulgabr.com.br/aplicativo/cidades.php',
    type : 'post',
	data : {'id': estado},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();

	  var data = JSON.parse(retorno);
		var item = "";
	  item += "<option value=''>CIDADE</option>";
	   $$.each(data,function(i, data){
		
	    item += "<option value='" +  data.nome + "'>" + data.nome + "</option>";
                    //$("#estadoOption").append(data.nome)
                });
	  $$("#cidade").html(item);
    },
    error: function(erro){
      
    }       
  });
  });
       
  
    }
})

function exibePaginaGaleria(idGaleria){
		
		item = '<img src="' + idGaleria + '">';
		
		var myPhotoBrowser = app.photoBrowser({
    zoom: 400,
    photos: [item],
	theme: 'dark',
	backLinkText: 'Voltar',
	ofText: 'de',
});   
myPhotoBrowser.open(); 
		
	}

function exibePaginaBase(idEmpresa){
   var vID = $$("#nome" + idEmpresa).text();
	       
        
// Load page from about.html file to main View:
mainView.router.loadPage('preview.html');

$$.ajax({
				  
    url : 'https://divulgabr.com.br/aplicativo/empresa.php',
    type : 'post',
    data : {'idEmpresa':vID},
    dataType: 'html',
    beforeSend: function(){ 
	 myApp.showPreloader('Carregando');
    },
    timeout: 3000,    
    success: function(retorno){
 myApp.hidePreloader();
	  if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";
	  
	 
	  $$.each(data,function(i, data){
	  $$('.center').html(data.nomeEmpresa);
		item += '<div class="imagemDestaque"><img src="http://divulgabr.com.br/admin/imagemDestaque/' + data.imagemDestaque +'"/></div>';
		item += '<div class="list-block media-list">';
  item += '<ul>';
    item += '<li>';
     item += '<div  class="item-link item-content id'+ data.idEmpresa + '">';
       item += '<div class="item-media"><img src="https://divulgabr.com.br/admin/logos/' + data.logo +'"></div>';
        item +='<div class="item-inner">';
         item += '<div class="item-subtitle"><i class="fa fa-phone" aria-hidden="true"></i> ' + data.telefone + '</div>';
		 item += '<div class="item-subtitle"><i class="fa fa-phone" aria-hidden="true"></i> ' + data.telefone2 + '</div>';
          item += '<div class="item-text"><i class="fa fa-map-marker" aria-hidden="true"></i> ' + data.endereco + '</div>';
		   item += '<div class="item-text"><i class="fa fa-envelope" aria-hidden="true"></i> ' + data.email + '</div>';
          item += '<div class="item-text"><i class="fa fa-internet-explorer" aria-hidden="true"></i> ' + data.site + '</div>';
        item += '</div>';
     item += '</div>';
    item += '</li>';
  item += '</ul>';
item += '</div>';
					item += '<div class="row">'
		item +=			'<div class="container-dados col-100">';
		item +=				'<div class="sobre">';
		item +=					'<h3>Sobre</h3>';
		item +=					'<p>' + data.sobre + '</p>';
		item +=				'</div>';
		item +=				'<div class="sobre horarios">';
		item +=					'<h3>Horários</h3>';
		item +=					'<p>Segunda - Sexta: 11AM - 16PM</p>';
		item +=					'<p>Sabado: Fechado</p>';
		item +=					'<p>Domingo: Fechado</p>';
		item +=				'</div>';
		item +=				'<div class="sobre facilidades">';
		item +=					'<h3>Facilidades</h3>';
		item +=					'<p> </p>';
		item +=				'</div>';
		item +=				'<div class="sobre galeria">';
	
		item +=				'</div>';
		item += '<div class="sobre"></div>';
		item +=			'</div>';
		item += '</div>';
                });
	 
	  $$(".content").html(item);
	  }else{
	   //$(".container-resultsOff").show();
	   //$(".modifica").hide();
	  }
    },
    error: function(erro){
      
    }       
            });
			
			$$.ajax({
				  
    url : 'https://divulgabr.com.br/aplicativo/horario.php',
    type : 'post',
    data : {'idEmpresa':vID},
    dataType: 'html',
    beforeSend: function(){ 
    },
    timeout: 3000,    
    success: function(retorno){

	  if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";
	  
	 
	  $$.each(data,function(i, data){

		item +=					'<h3>Horários</h3>';
		
		
		if(data.sabado.lenght() == 0){
		item +=					'<p>Sabado: Fechado</p>';
		}else{
		item +=					'<p>Sabado: ' + data.sabado + '</p>';
		}
		
		if(data.sabado.lenght() == 0){
		item +=					'<p>Domingo: Fechado</p>';
		}else{
		item +=					'<p>Domingo: ' + data.domingo + '</p>';
		}
		
		

                });
	 
	  $$(".horarios").html(item);
	  }else{
	   //$(".container-resultsOff").show();
	   //$(".modifica").hide();
	  }
    },
    error: function(erro){
      
    }       
            });
			
			$$.ajax({
				  
    url : 'https://divulgabr.com.br/aplicativo/facilidades.php',
    type : 'post',
    data : {'id':idEmpresa},
    dataType: 'html',
    beforeSend: function(){ 
	
    },
    timeout: 3000,    
    success: function(retorno){
	
	  if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";
	  
	item +=					'<h3>Facilidades</h3>';
	  $$.each(data,function(i, data){

		item +=					'<p>' + data.facilidades + '</p>';
		
                });
	 
	  $$(".facilidades").html(item);
	  }else{
	   //$(".container-resultsOff").show();
	   //$(".modifica").hide();
	  }
    },
    error: function(erro){
      
    }       
            });
			
			$$.ajax({
				  
    url : 'https://divulgabr.com.br/aplicativo/galeria.php',
    type : 'post',
    data : {'id':idEmpresa},
    dataType: 'html',
    beforeSend: function(){ 
    },
    timeout: 3000,    
    success: function(retorno){
	
	  if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";
	 
	   item +=					'<h3>Galeria</h3>';
	 
	  $$.each(data,function(i, data){
		var link = "https://divulgabr.com.br/admin/imagens/";
		var funcao = "exibePaginaGaleria('" + link + data.galeria + "')";
		item +=					'<img onClick="' + funcao + '" src="https://divulgabr.com.br/admin/imagens/' + data.galeria + '"/>';		
		item += '<p class="imagem' + data.galeria + ' " style="display:none">https://divulgabr.com.br/admin/imagens/' + data.galeria + '</p>';
	
                });
	 
	  $$(".galeria").html(item);
	  }else{
	   //$(".container-resultsOff").show();
	   //$(".modifica").hide();
	  }
    },
    error: function(erro){
      
    }       
            });
}

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
 $$.ajax({
    url : 'https://divulgabr.com.br/aplicativo/sobre.php',
    type : 'post',
    //data : {},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();   
    },
    timeout: 3000,    
    success: function(retorno){

	 var data = JSON.parse(retorno);
	 var item = "";	  
	 
	  $$.each(data,function(i, data){
	  item += "<p>" + data.sobre + "</p>";
	 });
	 $$('.sobreid').html(item);
	 
    },
    error: function(erro){
      
    }       
            });
			
			$$.ajax({
				  
    url : 'https://divulgabr.com.br/aplicativo/link.php',
    type : 'post',
    //data : {'id':idEmpresa},
    dataType: 'html',
    beforeSend: function(){ 
    },
    timeout: 3000,    
    success: function(retorno){
	
	  if(retorno != "null"){
	  
	  var data = JSON.parse(retorno);
	  var item = "";
	 

	  $$.each(data,function(i, data){
		var link = data.link;
		var funcao = "window.open('" + link +"', '_system');";
	
		item +=					'Desenvolvido por <a class="external" onclick=' + funcao + '>Higor Pedroso</a>';		
	
                });
	 
	  $$(".infodev").html(item);
	  }else{
	   //$(".container-resultsOff").show();
	   //$(".modifica").hide();
	  }
    },
    error: function(erro){
      
    }       
            });
})

 $$.ajax({
    url:'https://divulgabr.com.br/aplicativo/estados.php',
    data:{'json_order':'123'},
    type:'POST',
	dataType: 'jsonp',
	crossDomain: true,
    beforeSend:function(){
    //myApp.showPreloader('Carregando');
    },
    success:function(retorno)
    {
        myApp.hidePreloader();
        console.log(data);
		 var data = JSON.parse(retorno);
		var item = "";
		item += "<option value=''>ESTADO</option>";
		$$.each(data,function(i, data){
		
	    item += "<option value='"+  data.nome +"'>" + data.nome + "</option>";
                    //$("#estadoOption").append(data.nome)
                });
		$$("#estado").html(item);

    }
    }); 
       
      $$.ajax({
    url : 'https://divulgabr.com.br/aplicativo/categorias.php',
    type : 'post',
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();
	  
	  var data = JSON.parse(retorno);
var item = "";
	  item += "<option value=''>CATEGORIA</option>";
	   $$.each(data,function(i, data){
		
	    item += "<option value='" +  data.nome + "'>" + data.nome + "</option>";
                    //$("#estadoOption").append(data.nome)
                });
	  $$("#categorias").html(item);
    },
    error: function(erro){
      
    }       
  }); 

  $$('#estado').change(function() {
  
  var estado = $$("#estado").val();
  
$$.ajax({
    url : 'https://divulgabr.com.br/aplicativo/cidades.php',
    type : 'post',
	data : {'id': estado},
    dataType: 'html',
    beforeSend: function(){
      //$('#carregando').fadeIn();  
    },
    timeout: 3000,    
    success: function(retorno){
      //$('#carregando').fadeOut();

	  var data = JSON.parse(retorno);
		var item = "";
	  item += "<option value=''>CIDADE</option>";
	   $$.each(data,function(i, data){
		
	    item += "<option value='" +  data.nome + "'>" + data.nome + "</option>";
                    //$("#estadoOption").append(data.nome)
                });
	  $$("#cidade").html(item);
    },
    error: function(erro){
      
    }       
  });
  });
  
