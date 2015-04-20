var FAOSTATFBS={};
FAOSTATFBS.lang="E";
//Waste out ,5123:9
FAOSTATFBS.traduction={
    S:{
        filterOff:"Filtro",
        filterOn:"Filtro",
        countries:"Pais",
        regions:"Regiones",
        both:"Ambos",
        year:"A&ntilde;o",
        items:"Articulos",
        choosecountries:"Selecciona un pais",
        chooseitem:"Selecciona un articulo",
        showdata:"Mostrar datos",
        exportdata:"Exportar datos",
        commodities:"Articulos",
        aggregate:"agregado",
        domesticsupply:"Suministro interno",
        domesticutilization:"Utilizacion interna",
        percatitasupply:"Suministro per capita",
        metricstons:"1000 Toneladas",
        population:"Poblacion (Miles)",
        all:"Todos",
        none:"Ninguno",
        reverse:"Reverso",
        fullscreen:"Pantalla completa",
        fbs:"Balances Alimentarios",
        total:"Total",
        protein:"Proteina",
        fat:"Grasa",
        supply:"Suministro",
        utilisation:"Utilisation",
        showcode:"Mostrar Codigo",
        domestic:"Suministro Interior/Utilizacion"
,presentation:"<p><u>Hojas de balance de alimentos 2013 para 42 paises seleccionados (y agregados regionales actualizados).</u></p><p>\n\
Son paises clave en el calculo de los indicadores sobre la prevalencia global de desnutricion (PoU) que saran publicados en el proximo 'El estado de la inseguridad alimentaria en el mundo 2015' (SOFI).<p><br>Pays : <i>\n\
Afganistan, Angola,  Argelia, Bangladesh, Belice, Brasil, Burkina Faso, Chad, China (Continental), China (RAE de Hong Kong), China (RAE de Macao), China (Taiwan provincia de), Colombia, Cote d'Ivoire, Etiopia, Filipinas, Guatemala, Haiti, India, Indonesia, Jamaica, Kenya, Madagascar, Mexico, Mozambique, Myanmar, Nepal, Nigeria, Oman, Pakistan, Panama,  Paraguay, Peru, Republica Dominicana, Republica Popular Democratica de Corea, Republica Unida de Tanzania, Sri Lanka, Tailandia, Viet Nam, Yemen, Zambia, Zimbabwe</i></p>"
    },

    F:{
        filterOff:"Filtre",
        filterOn:"Filtre",
        countries:"Pays",
        regions:"Region",
        both:"Tous",
        year:"Annee",
        items:"Produits",
        choosecountries:"Choisir un pays",
        chooseitem:"Choisir un item",
        showdata:"Previsualisation",
        exportdata:"Export Excel",
        commodities:"Produits",
        domesticsupply:"Offre interieure",
        aggregate:"agreggation",
        domesticutilization:"Utilisation domestique",
        percatitasupply:"Approvisionnements par habitant",
        metricstons:"1000 Tonnes",
        population:"Population",
        all:"Tous",
        none:"Aucun",
        reverse:"Inverse",
        fullscreen:"Plein ecran",
        fbs:"Bilans Alimentaires",
        total:"Total",
        protein:"Protein",
        fat:"Fat",
        supply:"Disponibilite",
        utilisation:"Utilisation",
        showcode:"Voir Code",
        domestic:"Disponibilité intérieure /Utilisation"
,presentation:"<p><u>Bilans alimentaires 2013 pour 42 pays s&eacute;lectionn&eacute;s (et mise &agrave; jour des agr&eacute;gats r&eacute;gionaux).</u></p>\n\
<p>Ce sont les pays cl&eacute;s rentrant dans le calcul de la pr&eacute;valence globale des indicateurs de la sous-alimentation (PoU) qui seront publi&eacute;s dans ''L'&eacute;tat de l'ins&eacute;curit&eacute; alimentaire dans le monde 2015'' (SOFI).</p><p><br>Pays : \n\
<i>Afghanistan, Algerie, Angola, Bangladesh, Belize, Bresil, Burkina Faso, Chine - RAS de Hong-Kong, Chine - RAS de Macao, Chine (continentale), Chine (Taiwan Province de), Colombie, Cote d'Ivoire, Ethiopie, Guatemala, Haiti, Inde, Indonesie, Jamaique, Kenya, Madagascar, Mexique, Mozambique, Myanmar, Nepal, Nigeria, Oman, Pakistan, Panama, Paraguay, Perou, Philippines, Republique dominicaine, Republique populaire democratique de Coree, Republique-Unie de Tanzanie, Sri Lanka, Tchad, Thailande, Viet Nam, Yemen, Zambie, Zimbabwe</i></p>"
    },

    E:{
        filterOff:"Filter",
        filterOn:"Filter",
        countries:"Countries",
        regions:"Regions",
        both:"Both",
        year:"Year",
        items:"Items",
        choosecountries:"Choose a country",
        chooseitem:"Choose an item",
        aggregate:"Item aggregations",
        showdata:"Show Data",
        exportdata:"Export Data",
        commodities:"Single Items",
        domesticsupply:"Domestic Supply",
        domesticutilization:"Domestic Utilization",
        percatitasupply:"Per Capita Supply",
        metricstons:"1000 Metric tons",
        population:"Population (Thousand)",
        all:"ALL",
        none:"none",
        reverse:"Reverse",
        fullscreen:"Full screen",
        fbs:"Food Balance Sheets",
        total:"Total",
        protein:"Prot.",
        fat:"Fat",
        supply:"Supply",
        utilisation:"Utilisation",
        showcode:"Show Code",
        domestic:"Balance as Domestic Supply/Utilization"
,presentation:"<p><u>2013 Food Balance Sheets for 42 selected countries (and updated regional aggregates)</u></p>\n\
<p>These are key countries in the calculation of the global prevalence of undernourishment (PoU) indicators that will be published in the upcoming ''The State of Food Insecurity in the World 2015'' (SOFI)</p>\n\
<p><br>Countries: <i>Afghanistan, Algeria, Angola, Bangladesh, Belize, Brazil, Burkina Faso, Chad,China (Hong Kong SAR), China (Macao SAR), China (mainland), China (Taiwan Province of), Colombia, Cote d'Ivoire, Democratic People's Republic of Korea, Dominican Republic, Ethiopia, Guatemala, Haiti, India, Indonesia, Jamaica, Kenya, Madagascar, Mexico, Mozambique, Myanmar, Nepal, Nigeria, Oman, Pakistan, Panama, Paraguay,<br>Peru, Philippines, Sri Lanka, Thailand, United Republic of Tanzania, Viet Nam, Yemen, Zambia, Zimbabwe</i></p>"
    }

};




//FAOSTATFBS.root="/home/faostat-download-js";
FAOSTATFBS.myIndex={
    5511:1,
    5611:2,
    5072:3,
    5911:4,
    5301:5,
    5142:6,
    5131:7,
    5521:8,
	5527:9,
    5123:10,
    5154:11,
    645:12,
    664:13,
    674:14,
    684:15
};

FAOSTATFBS.myIndexNoDom={
    5511:1,
    5611:2,
    5072:3,
    5123:9,
    5301:4,
    5521:7,
    5527:8,
    5131:6,
	5911:10,
    5154:11,
    5142:5,
    645:12,
    664:13,
    674:14,
    684:15
};
//Waste out {t:"Waste",v:5123},t:"Exp.",    v:5911,
FAOSTATFBS.header=[
{
    t:"Prod.",
    v:5511,
    E:"Prod-"
	
},
{
    t:"Impo.",
    v:5611,
    E:"Impo-"
	
},
{
    t:"Stock Var.",
    v:5072,
    E:"Invent"
},
{
    t:"Exp.",
    v:5911,
    E:"Exp-"
},
{
    t:"Total",
    v:5301,
    E:"Total"
},
{
    t:"Food",
    v:5142,
    E:"Alimentos"
},
{
    t3:"Processing",
    t:"Food Manu",
    v:5131,
    E:"Manu/alim"
},
{
    t:"Feed",
    v:5521,
    E:"Alim-"
},
{
    t:"Seed",
    v:5527,
    E:"Semi-"
},
{
    t:"Waste",
    v:5123,
    E:"Waste"
},
 
{
    t3:"Other Util",
    t:"Oth. Uses",
    v:5154,
    E:"Usos"
},//;628
{
    t:"Kg / Yr",
    v:645,
    E:"Kg/An"
},
{
    t:"KCal / Day",
    v:664,
    E:"Por dia Cal-Num"
},
{
    t:"Gr / Day",
    v:674,
    E:"Por dia Pro. Gr."
},
{
    t:"Gr / Day",
    v:684,
    E:"Por dia Grasa Gr"
}
];

FAOSTATFBS.Population="";
FAOSTATFBS.headerNoDom=[
{
    t:"Prod.",
    v:5511,
    E:"Prod-"
},
{
    t:"Impo.",
    v:5611,
    E:"Impo-"
},
{
    t:"Stock Var.",
    v:5072,
    E:"Invent"
},
{
    t:"Total",
    v:5301,
    E:"Total"
},
{
    t:"Food",
    v:5142,
    E:"Alimentos"
},
{
    t3:"Processing",
    t:"Food Manu",
    v:5131,
    E:"Manu/alim"
},
{
    t:"Feed",
    v:5521,
    E:"Alim-"
},
{
    t:"Seed",
    v:5527,
    E:"Semi-"
},
{
    t:"Waste",
    v:5123,
    E:"Waste"
},
 {
    t:"Exp.",
    v:5911,
    E:"Exp."
},
 
{
    t3:"Other Util",
    t:"Oth. Uses",
    v:5154,
    E:"Usos"
},//;628

{
    t:"Kg / Yr",
    v:645,
    E:"Kg/An"
},
{
    t:"KCal / Day",
    v:664,
    E:"Por dia Cal-Num"
},
{
    t:"Gr / Day",
    v:674,
    E:"Por dia Pro. Gr."
},
{
    t:"Gr / Day",
    v:684,
    E:"Por dia Grasa Gr"
}
];
 
var tri=0;
var asc=0;//sort asc or desc?
var arrF=[];
var totChroma;
var tFinal="";
var filterOnOff=0;
var CTOptions={
    width: "100%",
    height: "490px",
    scrolling: "yes"
};
var CTOptionsPopUp={
    width: "100%",
    height: "95%",
    scrolling: "yes"
};


/*
if (window.XMLHttpRequest) {
var reqC = new XMLHttpRequest();//Country
var req = new XMLHttpRequest();//Item
var reqRes = new XMLHttpRequest();//Result
 }
else {
        try {
		var reqC = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		var req = new ActiveXObject("MSXML2.XMLHTTP.3.0");
		var reqRes = new ActiveXObject("MSXML2.XMLHTTP.3.0");
        }
        catch(ex) {alert("Your browser don t support XMLHTTP objects")}
    }
*/



FAOSTATFBS.init=function ()
{
      document.getElementById("presentation").innerHTML=FAOSTATFBS.traduction[FAOSTATDownload.language].presentation;
    FAOSTATFBS.Year();
    FAOSTATFBS.Country();
    FAOSTATFBS.Items();
    document.getElementById("result").innerHTML="";
    //document.getElementById('menu_tabCountry').style.backgroundImage="url(FAOSTATFBS.root+'img/countriesTabOn.gif')";

    /*traduc*/
  /*  if(FAOSTATFBS.lang=="S"){
        document.getElementById("menu_tabCountry").className="myButtonCS";
        document.getElementById("menu_tabItem").className="myButtonIS";
    }
    else if(FAOSTATFBS.lang=="F"){
        document.getElementById("menu_tabCountry").className="myButtonCF";
        document.getElementById("menu_tabItem").className="myButtonIF";
    }*/
    try{
        document.getElementById("tra1").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].chooseitem;
        document.getElementById("tra2").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].choosecountries;
        document.getElementById("tra3").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].year;
        document.getElementById("tra4").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].countries;
        document.getElementById("tra5").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].regions;
        document.getElementById("tra6").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].both;
        document.getElementById("tra7").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].commodities;
        document.getElementById("tra8").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].aggregate;
        document.getElementById("tra9").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].both;



        document.getElementById("tra10").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].showcode;
        document.getElementById("tra11").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].domestic;

    }
    catch(e){}


}


FAOSTATFBS.Year=function()
{ 
    mycountry=document.getElementById('sYear');
    var d = new Date();
    dd=d.getFullYear();
    for(var i=2011;i>1960;i--)
    {
        var o=document.createElement("option");
        o.setAttribute('value',i);
        var t=document.createTextNode(i);
        o.appendChild(t);
        mycountry.appendChild(o);
    }
}

FAOSTATFBS.Country=function()
{

    var param={
        "selects":[{
            "aggregation":"NONE",
            "column":"A.AreaCode",
            "alias":"AreaCode"
        },

        {
            "aggregation":"NONE",
            "column":"A.AreaName"+FAOSTATFBS.lang,
            "alias":"AreaName"+FAOSTATFBS.lang
            }
        ],
        "froms":[
        {
            "column":"Area",
            "alias":"A"
        },

        {
            "column":"DomainArea",
            "alias":"DA"
        }
        ],
        "wheres":[
        {
            "datatype" : "TEXT",
            "column" : "DA.DomainCode",
            "operator" : "=",
            "value" : "FBS",
            "ins" : []
        },

        {
            "datatype" : "DATE",
            "column" : "A.AreaCode",
            "operator" : "=",
            "value" : "DA.AreaCode",
            "ins" : []
        }
		
        ],
        "orderBys" :[{
            "column" : "DA.Ord"
        },{
            "column" : "A.AreaName"+FAOSTATFBS.lang
            }]
        ,
        "limit" : null,
        "query" : null,
        "frequency" : "NONE"
		
    };

    var data = {};
    data.datasource = F3DWLD.CONFIG.datasource;
    data.thousandSeparator = ',';
    data.decimalSeparator = '.';
    data.decimalNumbers = '2';
    data.json = JSON.stringify(param);
    data.cssFilename = 'faostat';
    data.valueIndex = '1';
console.log(data);
    //	req.open("POST", "http://faostat3.fao.org/wds/api"+param,true);

						
    $.ajax({
        type : 'POST',
        url : 'http://faostat3.fao.org/wds/rest/table/json',
        data : data,
        success : function(response) {
          
            var myJson=response;
            mycountry=document.getElementById('sCountry');
            for(var i=0;i<myJson.length;i++)
            {
                var o=document.createElement("option");
                o.setAttribute('value',myJson[i][0]);
                var t=document.createTextNode(myJson[i][1]);
                o.appendChild(t);
                mycountry.appendChild(o);
            }
        },
        error : function(err, b, c) {
            console.log(err);
        }
    });
}
/*
FAOSTATFBS.fillCountries=function()
{
    if (reqC.readyState == 4 && reqC.status =="200" ) 

    {
        var myJson=JSON.parse(reqC.responseText);
        mycountry=document.getElementById('sCountry');
        for(var i=1;i<myJson.length;i++)
        {
            var o=document.createElement("option");
            o.setAttribute('value',myJson[i][0]);
            var t=document.createTextNode(myJson[i][1]);
            o.appendChild(t);
            mycountry.appendChild(o);
        }
    }
}*/
 
 
 
FAOSTATFBS.Items=function(){
    var param={
        "selects":[{
            "aggregation":"NONE",
            "column":"A.ItemCode",
            "alias":"ItemCode"
        },	{
            "aggregation":"NONE",
            "column":"A.ItemName"+FAOSTATFBS.lang,
            "alias":"ItemName"+FAOSTATFBS.lang
            }],
        "froms":[
        {
            "column":"Item",
            "alias":"A"
        },{
            "column":"DomainItem",
            "alias":"DA"
        }],
        "wheres":[
        {
            "datatype" : "TEXT",
            "column" : "DA.DomainCode",
            "operator" : "=",
            "value" : "FBS",
            "ins" : []
        },

        {
            "datatype" : "DATE",
            "column" : "A.ItemCode",
            "operator" : "=",
            "value" : "DA.ItemCode",
            "ins" : []
        }
        ],
        "orderBys" :[  { "column": "DA.Level"},{
            "column" : "A.ItemName"+FAOSTATFBS.lang
            }]
        ,
        "limit" : null,
        "query" : null,
        "frequency" : "NONE"
    };

    var data = {};
    data.datasource = F3DWLD.CONFIG.datasource;
    data.thousandSeparator = ',';
    data.decimalSeparator = '.';
    data.decimalNumbers = '2';
    data.json = JSON.stringify(param);
    data.cssFilename = 'faostat';
    data.valueIndex = '1';
    $.ajax({
        type : 'POST',
        url : 'http://faostat3.fao.org/wds/rest/table/json',
        data : data,
        success : function(response) {
            var myJson=response;
            mycountry=document.getElementById('sItem');
            for(var i=0;i<myJson.length;i++){
                var o=document.createElement("option");
                o.setAttribute('value',myJson[i][0]);
                var t=document.createTextNode(myJson[i][1]);
                o.appendChild(t);
                mycountry.appendChild(o);
            }
        },
        error : function(err, b, c) {
            console.log(err);
        }
    });
	
}
/*
FAOSTATFBS.fillItems=function()
{ if (req.readyState == 4 && req.status =="200" ) 
   {
	var myJson=JSON.parse(req.responseText);
	mycountry=document.getElementById('sItem');
	  for(var i=1;i<myJson.length;i++)
		{
			var o=document.createElement("option");
			o.setAttribute('value',myJson[i][0]);
			
			var t=document.createTextNode(myJson[i][1]);
			o.appendChild(t);
			if(myJson[i][2]>5){var sep=document.createTextNode("+");o.appendChild(sep);}
			mycountry.appendChild(o);
		}
   }
 }
 
*/
FAOSTATFBS.showData=function()
{
    var pays=document.getElementById("sCountry").value;

    var items=document.getElementById("sItem").value;
    var annee=document.getElementById("sYear").value;
    //console.log(items+" "+pays);
    if (items!="" || pays!=""){
        document.getElementById("result").innerHTML="<img src=\"/faostat-download-js/preloadFBS.gif\" />";

        //try{
        var myTata=0;
        if (document.getElementById("tabItem").className=="invi"){
            myTata=1;
        }else{
            myTata=0;
        }
        if((document.getElementById("rc3").checked && myTata==1)|| (document.getElementById("ri3").checked && myTata==0))
        {
            myFilter2.style.display="block";
            myFilter3.style.display="block";

            myFilter2Button.style.display="block";
            myFilter3Button.style.display="block";
        }
        else if((document.getElementById("rc2").checked && myTata==1) || (document.getElementById("ri2").checked  && myTata==0))
        {

            myFilter2.style.display="none";
            myFilter3.style.display="block";
            myFilter2Button.style.display="none";
            myFilter3Button.style.display="block";
        }
        else
        {

            myFilter2.style.display="block";
            myFilter3.style.display="none";
            myFilter2Button.style.display="block";
            myFilter3Button.style.display="none";
        }
        if (navigator.appVersion.indexOf("MSIE 7.") != -1){
            myFilter2.style.display="none";
            myFilter3.style.display="none";
            myFilter2Button.style.display="none";
            myFilter3Button.style.display="none";
        }
        //}catch(e){console.log("pas trouve")}




        if(items=="")
        {
		
		//CASE 1 COUNTRIESconsole.log("ITEMS");
		var param0={
		 "selects":[{
                    "aggregation":"NONE",
                    "column":"Value",
                    "alias":"Value"
                }
                ]
				,
                "froms":[
                {
                    "column":"vFBSItem",
                    "alias":"vFBSItem"
                }],"wheres":[
                {
                    "datatype" : "TEXT",
                    "column" : "AreaCode",
                    "operator" : "=",
                    "value" : pays,
                    "ins" : []
                },

                {
                    "datatype" : "DATE",
                    "column" : "Year",
                    "operator" : "=",
                    "value" : annee,
                    "ins" : []
                }
                ],
                "orderBys" :[{
                    "column" : "Year"
                },
                {
                    "column" : "Ord"
                },
                    {
                    "column" : "AreaCode"
                }]
                ,
                "limit" : null,
                "query" :null,
                "frequency" : "NONE"
            };
			 param0["wheres"].push({
                    "datatype" : "TEXT",
                    "column" : "ItemCode",
                    "operator" : "=",
                    "value" : 2501,
                    "ins" : []
                });
			 var data0 = {};
            data0.datasource = F3DWLD.CONFIG.datasource;
            data0.thousandSeparator = ',';
            data0.decimalSeparator = '.';
            data0.decimalNumbers = '2';
            data0.json = JSON.stringify(param0);
            //console.log(param)
            data0.cssFilename = 'faostat';
            data0.valueIndex = '1';
			
			 $.ajax({
                type : 'POST',
                url : 'http://faostat3.fao.org/wds/rest/table/json',
                data : data0,
                success : function(response) 
				{FAOSTATFBS.Population=response;
				try{
				document.getElementById("valPop").innerHTML=FAOSTATFBS.Population;
				}catch(er){}
				},
			 error : function(err, b, c) { console.log(err); }
        });
			
			
			
            var param={
                "selects":[{
                    "aggregation":"NONE",
                    "column":"ItemLevel",
                    "alias":"ItemLevel"
                }
                ,{
                    "aggregation":"NONE",
                    "column":"AreaCode",
                    "alias":"AreaCode"
                }
                ,	{
                    "aggregation":"NONE",
                    "column":"AreaName"+FAOSTATFBS.lang,
                    "alias":"AreaName"+FAOSTATFBS.lang
                    }
                ,	{
                    "aggregation":"NONE",
                    "column":"ItemCode",
                    "alias":"ItemCode"
                }
                ,	{
                    "aggregation":"NONE",
                    "column":"ItemName"+FAOSTATFBS.lang,
                    "alias":"ItemName"+FAOSTATFBS.lang
                    }
                ,	{
                    "aggregation":"NONE",
                    "column":"ElementCode",
                    "alias":"ElementCode"
                }
                ,	{
                    "aggregation":"NONE",
                    "column":"ElementName"+FAOSTATFBS.lang,
                    "alias":"ElementName"+FAOSTATFBS.lang
                    }
                ,	{
                    "aggregation":"NONE",
                    "column":"Year",
                    "alias":"Year"
                }
                ,	{
                    "aggregation":"NONE",
                    "column":"Value",
                    "alias":"Value"
                }
                ,	{
                    "aggregation":"NONE",
                    "column":"Flag",
                    "alias":"Flag"
                }
                ],
                "froms":[
                {
                    "column":"vFBSItem",
                    "alias":"vFBSItem"
                }],
                "wheres":[
                {
                    "datatype" : "TEXT",
                    "column" : "AreaCode",
                    "operator" : "=",
                    "value" : pays,
                    "ins" : []
                },

                {
                    "datatype" : "DATE",
                    "column" : "Year",
                    "operator" : "=",
                    "value" : annee,
                    "ins" : []
                }
                ],
                "orderBys" :[{
                    "column" : "Year"
                },{
                    "column" : "Ord"
                },
                        {
//                    "column" : "AreaCode"
                    "column" : "ItemCode"

                             }]
                ,
                "limit" : null,
                "query" :null,
                "frequency" : "NONE"
            };

            if(document.getElementById("rc1").checked){
                param["wheres"].push({
                    "datatype" : "TEXT",
                    "column" : "ItemLevel",
                    "operator" : "=",
                    "value" : 15,
                    "ins" : []
                })
            }
            else if(document.getElementById("rc2").checked){
                param["wheres"].push({
                    "datatype" : "TEXT",
                    "column" : "ItemLevel",
                    "operator" : ">",
                    "value" : 15,
                    "ins" : []
                });/*
				 param["wheres"].push({
                    "datatype" : "TEXT",
                    "column" : "ItemCode",
                    "operator" : "=",
                    "value" : 2501,
                    "ins" : []
                });*/
            }

            var data = {};
            data.datasource =  F3DWLD.CONFIG.datasource;
            data.thousandSeparator = ',';
            data.decimalSeparator = '.';
            data.decimalNumbers = '2';
            data.json = JSON.stringify(param);
            //console.log(data);
            //console.log(param)
            data.cssFilename = 'faostat';
            data.valueIndex = '1';
            //console.log(param);
            $.ajax({
                type : 'POST',
                url : 'http://faostat3.fao.org/wds/rest/table/json',
                data : data,
                success : function(response) {

                    document.getElementById("result").innerHTML="";

                    var myJson=response;
                    var curPos="";
                    var curItem="";
                    var myLine=[];
                    var body=document.getElementById("result");
                    var tbl = document.createElement("table");
                    tbl.setAttribute("cellspacing",0);
                    tbl.setAttribute("id","resultTable");
                    var tblB = document.createElement("tbody");
                    var tblH = document.createElement("thead");
   
   
   
                    var row=document.createElement("tr");
                    var cell = document.createElement("th");
                    cell.setAttribute("id","thTitle");
                    if(document.getElementById("showCode").checked){
                        cell.colSpan=13;
                    }else{
                        cell.colSpan=12;
                    }
                    var txtCell = document.createTextNode(document.getElementById("sCountry").getElementsByTagName("option")[document.getElementById("sCountry").selectedIndex].innerHTML);
                    cell.appendChild(txtCell);
                    var txtCell = document.createElement("br");
                    cell.appendChild(txtCell);
                    var txtCell = document.createTextNode(document.getElementById("sYear").getElementsByTagName("option")[document.getElementById("sYear").selectedIndex].innerHTML);
	
                    var myI=document.createElement("i");
                    myI.appendChild(txtCell);
                    cell.appendChild(myI);
                    row.appendChild(cell);
	
                    var cell = document.createElement("th");
                    cell.setAttribute("id","titleFBS");
	
                    cell.colSpan=4;
                    var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].fbs);
                    cell.appendChild(txtCell);
                    row.appendChild(cell);
	
                    tblH.appendChild(row);
   
   
   
   
   
                    var row = document.createElement("tr");
                    //  row.style.height="40px";
                    var cell = document.createElement("th");
                    if(document.getElementById("showCode").checked){
                        cell.colSpan=13;
                    }else{
                        cell.colSpan=12;
                    }
                    cell.setAttribute("id","emptyPop");
                    cell.setAttribute("class","thPopEmpty");
	
	

                    var mybutton=document.createElement("div");
                    mybutton.setAttribute("id","btnFilter");
	
                    mybutton.setAttribute("onclick","FAOSTATFBS.cache('myFilter')");
                    mybutton.onclick=function(){
                        FAOSTATFBS.cache('myFilter');
                    };
        
                    mybutton.setAttribute("class","myButton");
                    mybutton.innerHTML="<img src=\"/faostat-download-js/images/filter.png\" /><p class=\"up\">"+FAOSTATFBS.traduction[FAOSTATFBS.lang].filterOff+"</p>";
	
                    if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{
                        cell.appendChild(mybutton);
                    }
	

                    var myA=document.createElement("div");

                    myA.setAttribute("onClick","FAOSTATFBS.toExcel()");
                    myA.onclick=function(){
                        FAOSTATFBS.toExcel()
                        };
                    myA.setAttribute("id","btnExcel");
                    myA.innerHTML="<img src=\"/faostat-download-js/images/export.png\" /><p class=\"up\">"+FAOSTATFBS.traduction[FAOSTATFBS.lang].exportdata+"</p>";
	
                    cell.appendChild(myA);
	
                    var myA=document.createElement("div");
                    myA.setAttribute("class","various myButton");
                    myA.setAttribute("id","btnFS2");
                    myA.setAttribute("data-fancybox-type","iframe");
                    myA.setAttribute("href","/faostat-download-js/popup.jsp");
                    myA.setAttribute("target","myFanzy");
                    myA.innerHTML=	"<img src=\"/faostat-download-js/images/full.png\"/><p class=\"up\">"+FAOSTATFBS.traduction[FAOSTATFBS.lang].fullscreen+"</p>";
                    if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{cell.appendChild(myA);}
	
                    row.appendChild(cell); 
                    var cell = document.createElement("th");
                    cell.setAttribute("class","popClass");
                    cell.colSpan=3;
                    var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].population);//trad
                    cell.setAttribute("class","bgBlue");
                    cell.appendChild(txtCell);
                    row.appendChild(cell);


                    var cell = document.createElement("td");
                    cell.setAttribute("id","valPop");
                    var txtCell = document.createTextNode(FAOSTATFBS.Population);
					  /* if(document.getElementById("rc2").checked){var txtCell = document.createTextNode("Na");}*/

                    //cell.setAttribute("class","popTotal");
                    cell.colSpan=2;
                    cell.appendChild(txtCell);
                    row.appendChild(cell);
                    tblH.appendChild(row);
                    /*FIN POPULATION*/
                    var row = document.createElement("tr");
                    row.setAttribute("id","myFilter");
                    row.setAttribute("class","invi");
                    var cell = document.createElement("th");
                    if(document.getElementById("showCode").checked){
                        cell.colSpan=16;
                    }else{
                        cell.colSpan=15;
                    }
                    cell.appendChild(myFilter2Button);
                    cell.appendChild(myFilter3Button);
                    var mydiv=document.createElement("div");
                    mydiv.setAttribute("style","display:block;clear:both");
                    mydiv.appendChild(myFilter2);
                    mydiv.appendChild(myFilter3);
                    cell.appendChild(mydiv);
                    row.appendChild(cell);
                    tblH.appendChild(row);
                    /*FIN FILTER*/
                    var row = document.createElement("tr");
                    var cell = document.createElement("th");
                    if(document.getElementById("showCode").checked){
                        cell.colSpan=2;
                    }
                    cell.rowSpan=3;
                    var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].commodities);//trad
                    cell.style.cursor="pointer";
                    cell.setAttribute("class","thCol");
                    cell.setAttribute("OnClick","FAOSTATFBS.showData()");
                    cell.onclick=function(){
                      FAOSTATFBS.showData();
                    };
                    cell.appendChild(txtCell); 
                    row.appendChild(cell); 


                    var cell = document.createElement("th");
                    if(document.getElementById("showDomestic").checked){
                        cell.colSpan=5;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].domesticsupply);//trad
                    }
                    else{
                        cell.colSpan=4;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].supply);
                    }
                    cell.setAttribute("class","bgBlue");
                    cell.appendChild(txtCell);
                    row.appendChild(cell);

                    var cell = document.createElement("th");
                    if(document.getElementById("showDomestic").checked){
                        cell.colSpan=6;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].domesticutilization);//trad
                    }
                    else{
                        cell.colSpan=7;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].utilisation);//trad
                    }
                    cell.setAttribute("class","bgBlue");
                    cell.appendChild(txtCell);
                    row.appendChild(cell);

                    var cell = document.createElement("th");
                    var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].percatitasupply);//trad
                    cell.setAttribute("class","bgBlue");
                    cell.colSpan=4;
                    cell.appendChild(txtCell);
                    row.appendChild(cell);

                    tblH.appendChild(row);

                    var row = document.createElement("tr");
                    {
                        var cell = document.createElement("th");
                        cell.colSpan=11;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].metricstons);//trad
                        cell.appendChild(txtCell);
                        row.appendChild(cell);

                        var cell = document.createElement("th");
                        cell.colSpan=2;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].total);//trad
                        cell.appendChild(txtCell);
                        row.appendChild(cell);

                        var cell = document.createElement("th");
                        cell.colSpan=1;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].protein);//trad
                        cell.appendChild(txtCell);
                        row.appendChild(cell);

                        var cell = document.createElement("th");
                        cell.colSpan=1;
                        var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].fat);//trad
                        cell.appendChild(txtCell);
                        row.appendChild(cell);

                    }
                    tblH.appendChild(row);

                    var row = document.createElement("tr");
                    if(document.getElementById("showDomestic").checked){
                        FAOSTATFBS.headert=FAOSTATFBS.header;
                    }else{
                        FAOSTATFBS.headert=FAOSTATFBS.headerNoDom;
                    }
                    for(var i=0;i<FAOSTATFBS.headert.length;i++)
                    {
                        var cell = document.createElement("th");
                        cell.style.cursor="pointer";

                        cell.setAttribute("OnClick","FAOSTATFBS.reTri("+i+")");
                        cell.setAttribute("name",i);
                        cell.onclick=function(){
                            FAOSTATFBS.reTri(this.name)
                            };
                        var txtCell = document.createTextNode(FAOSTATFBS.headert[i].t);
                        cell.appendChild(txtCell);
                        row.appendChild(cell);
                    }
                    tblH.appendChild(row);




                    var row = document.createElement("tr");
                    row.style.display="none";
                    var cell = document.createElement("th");
                    var txtCell = document.createTextNode("");
                    cell.appendChild(txtCell);
                    row.appendChild(cell);
                    if(document.getElementById("showDomestic").checked){
                        FAOSTATFBS.headert=FAOSTATFBS.header;
                    }else{
                        FAOSTATFBS.headert=FAOSTATFBS.headerNoDom;
                    }
                    for(var i=0;i<FAOSTATFBS.headert.length;i++)
                    {
                        var cell = document.createElement("td");
                        var txtCell = document.createTextNode(FAOSTATFBS.headert[i].t);
                        cell.appendChild(txtCell);
                        row.appendChild(cell);
                    }
                    tblH.appendChild(row);

                    tbl.appendChild(tblH);
                    /*DEBUT DATA*/
                    var imax=0;
                    var nl=0;
                    try{
                        myFilter2.innerHTML="";
                    }catch(e){}
                    try{
                        myFilter3.innerHTML="";
                    }catch(e){}
                    var debutBoucle=0;
                    if(document.getElementById("rc2").checked){debutBoucle=0;}
                    for(var i=debutBoucle;i<myJson.length;i++)
                    {
                      
                        if(curItem!=myJson[i][3])
                        {
                            curItem=myJson[i][3];
		 
                            if (navigator.appVersion.indexOf("MSIE 7.") == -1){
                                var myfil=	document.createElement("input");
                                myfil.setAttribute("type","checkbox");
                                myfil.setAttribute("id","chk_"+i);
                                myfil.setAttribute("checked",true);
                                myfil.setAttribute("onclick","FAOSTATFBS.cache('myTr_"+nl+"');");
                                myfil.onclick=function(){
                                    FAOSTATFBS.cache('myTr_'+nl);
                                }
                                myfil.setAttribute("value","myTr_"+nl);
                                //nl++;
                                var mylab=	document.createElement("label");
                                mylab.setAttribute("for","chk_"+i);

                                var txtCell = document.createTextNode(myJson[i][4]);
                                if(myJson[i][0]==15){	
                                    myFilter2.appendChild(myfil);
                                    mylab.appendChild(txtCell);
                                    myFilter2.appendChild(mylab);
                                    var myBr=document.createElement("br");
                                    myFilter2.appendChild(myBr);
                                }
                                else{
                                    myFilter3.appendChild(myfil);
                                    mylab.appendChild(txtCell);
                                    myFilter3.appendChild(mylab);
                                    var myBr=	document.createElement("br");
                                    myFilter3.appendChild(myBr);
                                }
                            }
                        nl++;
                        if(myLine.length>0){
			
                            nlt=nl-2;
		
                            FAOSTATFBS.writeTR(tblB,myLine,"myTr_"+nlt);
                        }
			
                        myLine=[];
                    }
                    myLine[0]=myJson[i][0]+"_"+myJson[i][4]+"_"+myJson[i][3];
	
 
                    if(document.getElementById("showDomestic").checked){
                        if(FAOSTATFBS.myIndex[myJson[i][5]]>0){
                            myLine[FAOSTATFBS.myIndex[myJson[i][5]]]=parseFloat(myJson[i][8]);
                        }
                    }
                    else{
                        if(FAOSTATFBS.myIndexNoDom[myJson[i][5]]>0){
                            myLine[FAOSTATFBS.myIndexNoDom[myJson[i][5]]]=parseFloat(myJson[i][8]);
                        }
                    }
                }
            nlt=nl-1;
            FAOSTATFBS.writeTR(tblB,myLine,"myTr_"+nlt);//derniere Ligne

                tbl.appendChild(tblB);

                tbl.setAttribute("width", "100%"); 
                body.appendChild(tbl);

                document.getElementById('btnExcel').className="myButton";
                if (navigator.appVersion.indexOf("MSIE 7.") != -1){}
                else
                {
                    totChroma=$("#resultTable").chromatable(CTOptions);	
                }
            },
            error : function(err, b, c) {
                console.log(err);
            }
        });
		
}
else
{
    var param={
        "selects":[{
            "aggregation":"NONE",
            "column":"ItemLevel",
            "alias":"ItemLevel"
        }
        ,{
            "aggregation":"NONE",
            "column":"AreaCode",
            "alias":"AreaCode"
        }
        ,	{
            "aggregation":"NONE",
            "column":"AreaName"+FAOSTATFBS.lang,
            "alias":"AreaName"+FAOSTATFBS.lang
            }
        ,	{
            "aggregation":"NONE",
            "column":"ItemCode",
            "alias":"ItemCode"
        }
        ,	{
            "aggregation":"NONE",
            "column":"ItemName"+FAOSTATFBS.lang,
            "alias":"ItemName"+FAOSTATFBS.lang
            }
        ,	{
            "aggregation":"NONE",
            "column":"ElementCode",
            "alias":"ElementCode"
        }
        ,	{
            "aggregation":"NONE",
            "column":"ElementName"+FAOSTATFBS.lang,
            "alias":"ElementName"+FAOSTATFBS.lang
            }
        ,	{
            "aggregation":"NONE",
            "column":"Year",
            "alias":"Year"
        }
        ,	{
            "aggregation":"NONE",
            "column":"Value",
            "alias":"Value"
        }
        ,	{
            "aggregation":"NONE",
            "column":"Flag",
            "alias":"Flag"
        }
        ],
        "froms":[
        {
            "column":"vFBSCountry",
            "alias":"vFBSCountry"
        }],
        "wheres":[
        {
            "datatype" : "TEXT",
            "column" : "ItemCode",
            "operator" : "=",
            "value" : items,
            "ins" : []
        },

        {
            "datatype" : "DATE",
            "column" : "Year",
            "operator" : "=",
            "value" : annee,
            "ins" : []
        }
        ],
        "orderBys" :[{
            "column" : "Year"
        },{
            "column" : "Ord"
        },{
            "column" : "AreaName"+FAOSTATFBS.lang
        }]
        ,
        "limit" : null,
        "query" : null,
        "frequency" : "NONE"
    };

    if(document.getElementById("ri1").checked){
        param["wheres"].push({
            "datatype" : "TEXT",
            "column" : "ItemLevel",
            "operator" : "=",
            "value" : 15,
            "ins" : []
        })
    }
    else if(document.getElementById("ri2").checked){
        param["wheres"].push({
            "datatype" : "TEXT",
            "column" : "ItemLevel",
            "operator" : ">",
            "value" : 15,
            "ins" : []
        })
    }

    var data = {};
    data.datasource = F3DWLD.CONFIG.datasource;
    data.thousandSeparator = ',';
    data.decimalSeparator = '.';
    data.decimalNumbers = '2';
    data.json = JSON.stringify(param);
    data.cssFilename = 'faostat';
    data.valueIndex = '1';
    $.ajax({
        type : 'POST',
        url : 'http://faostat3.fao.org/wds/rest/table/json',
        data : data,
        success : function(response) {


            document.getElementById("result").innerHTML="";
            //var myJson=JSON.parse(reqRes.responseText);
            var myJson=response;
            var curPos="";
            var curItem="";
            var myLine=[];
            var body=document.getElementById("result");
            var tbl = document.createElement("table");
            tbl.setAttribute("id","resultTable");
            tbl.setAttribute("cellspacing",0);
            var tblB = document.createElement("tbody");
            var tblH = document.createElement("thead");
            var row=document.createElement("tr");
            var cell = document.createElement("th");

            if(document.getElementById("showCode").checked){
                cell.colSpan=13;
            }else{
                cell.colSpan=12;
            }
            cell.setAttribute("id","thTitle");
            var txtCell = document.createTextNode(document.getElementById("sItem").getElementsByTagName("option")[document.getElementById("sItem").selectedIndex].innerHTML);
            cell.appendChild(txtCell);
            var txtCell = document.createElement("br");
            cell.appendChild(txtCell);
	
            var txtCell = document.createTextNode(document.getElementById("sYear").getElementsByTagName("option")[document.getElementById("sYear").selectedIndex].innerHTML);
            var myI=document.createElement("i");
            myI.appendChild(txtCell);
            cell.appendChild(myI);
            row.appendChild(cell);
	
            var cell = document.createElement("th");
            cell.setAttribute("id","titleFBS");
            cell.colSpan=4;
            var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].fbs);
            cell.appendChild(txtCell);
            row.appendChild(cell);
	
            tblH.appendChild(row);
            var row = document.createElement("tr");
            //row.style.height="40px";
            var cell = document.createElement("th");
            if(document.getElementById("showCode").checked){
                cell.colSpan=17;
            }
            else{
                cell.colSpan=16;
            }
            cell.setAttribute("id","emptyPop");
            cell.setAttribute("class","thPopEmpty");
	
	
	
            filterOnOff=0;
            var mybutton=document.createElement("div");
            mybutton.setAttribute("id","btnFilter");
            mybutton.setAttribute("onclick","FAOSTATFBS.cache('myFilter')");
            mybutton.onclick=function(){
                FAOSTATFBS.cache('myFilter');
            };
            mybutton.setAttribute("class","myButton");
		
            mybutton.innerHTML="<img src=\"/faostat-download-js/images/filter.png\" /><p class=\"up\" id=\"pup\">"+FAOSTATFBS.traduction[FAOSTATFBS.lang].filterOff+"</p>";

            if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{
                cell.appendChild(mybutton);
            }
	

            var myA=document.createElement("div");
	
            myA.setAttribute("onClick","FAOSTATFBS.toExcel()");
            myA.onclick=function(){
                FAOSTATFBS.toExcel()
                };
            myA.setAttribute("id","btnExcel");
            myA.innerHTML="<img src=\"/faostat-download-js/images/export.png\" /><p class=\"up\">"+FAOSTATFBS.traduction[FAOSTATFBS.lang].exportdata+"</p>";
            cell.appendChild(myA);
	
            var myA=document.createElement("div");
            myA.setAttribute("class","various myButton");
            myA.setAttribute("id","btnFS2");
            myA.setAttribute("data-fancybox-type","iframe");
            myA.setAttribute("href","/faostat-download-js/popup.jsp");
            myA.setAttribute("target","myFanzy");
            myA.innerHTML=	"<img src=\"/faostat-download-js/images/full.png\"/><p class=\"up\">"+FAOSTATFBS.traduction[FAOSTATFBS.lang].fullscreen+"</p>";
            if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{
                cell.appendChild(myA);
            }
            row.appendChild(cell); 
            tblH.appendChild(row);
            /**FILTER*/

            var row = document.createElement("tr");
            row.setAttribute("id","myFilter");
            row.setAttribute("class","invi");
            var cell = document.createElement("th");
            if(document.getElementById("showCode").checked){
                cell.colSpan=17;
            }else{
                cell.colSpan=16;
            }
            cell.appendChild(myFilter2Button);
            cell.appendChild(myFilter3Button);
            var mydiv=document.createElement("div");
            mydiv.setAttribute("style","clear:both");
            mydiv.appendChild(myFilter2);
            mydiv.appendChild(myFilter3);
            cell.appendChild(mydiv);
            if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{
                row.appendChild(cell);
            }
            tblH.appendChild(row);
            /*FIN FILTER*/
            var row = document.createElement("tr");
            var cell = document.createElement("th");
            cell.rowSpan=3;
            if(document.getElementById("showCode").checked){
                cell.colSpan=2;
            }
            var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].countries);
            //trad
            cell.setAttribute("class","thCol");
            cell.appendChild(txtCell); 
            cell.style.cursor="pointer";
            cell.setAttribute("OnClick","FAOSTATFBS.showData()");
            cell.onclick=function(){
                FAOSTATFBS.showData();
            };
            row.appendChild(cell); 




            var cell = document.createElement("th");
            if(document.getElementById("showDomestic").checked){
                cell.colSpan=5;
                var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].domesticsupply);
            }
            else{
                cell.colSpan=4;
                var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].supply);
            }
            //trad
            cell.appendChild(txtCell);
            row.appendChild(cell);

            var cell = document.createElement("th");
            if(document.getElementById("showDomestic").checked){
                cell.colSpan=6;
                var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].domesticutilization);
            }
            else{
                cell.colSpan=7;
                var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].utilisation);
            }
            //trad
            cell.appendChild(txtCell);
            row.appendChild(cell);

            var cell = document.createElement("th");
            var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].percatitasupply);
            //trad
            cell.colSpan=4;
            cell.appendChild(txtCell);
            row.appendChild(cell);

            tblH.appendChild(row);



            var row = document.createElement("tr");

            var cell = document.createElement("th");
            cell.colSpan=11;
            var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].metricstons);//trad
            cell.appendChild(txtCell);
            row.appendChild(cell);

            var cell = document.createElement("th");
            cell.colSpan=2;
            var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].total);//trad
            cell.appendChild(txtCell);
            row.appendChild(cell);

            var cell = document.createElement("th");
            cell.colSpan=1;
            var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].protein);//trad
            cell.appendChild(txtCell);
            row.appendChild(cell);

            var cell = document.createElement("th");
            cell.colSpan=1;
            var txtCell = document.createTextNode(FAOSTATFBS.traduction[FAOSTATFBS.lang].fat);//trad
            cell.appendChild(txtCell);
            row.appendChild(cell);


            tblH.appendChild(row);


            var row = document.createElement("tr");

            if(document.getElementById("showDomestic").checked){
                FAOSTATFBS.headert=FAOSTATFBS.header;
            }else{
                FAOSTATFBS.headert=FAOSTATFBS.headerNoDom;
            }
            for(var i=0;i<FAOSTATFBS.headert.length;i++)
            {
                var cell = document.createElement("th");
                cell.style.cursor="pointer";
                var txtCell = document.createTextNode(FAOSTATFBS.headert[i].t);
                cell.setAttribute('name',i);
                cell.setAttribute('OnClick',"FAOSTATFBS.reTri("+i+")");
                cell.onclick=function(){
                    FAOSTATFBS.reTri(this.name)
                    };
                cell.appendChild(txtCell);
                row.appendChild(cell);
            }
            tblH.appendChild(row);

            var row = document.createElement("tr");
            row.style.display="none";
            var cell = document.createElement("th");
            var txtCell = document.createTextNode("");
            cell.appendChild(txtCell);
            row.appendChild(cell);
            if(document.getElementById("showDomestic").checked){
                FAOSTATFBS.headert=FAOSTATFBS.header;
            }else{
                FAOSTATFBS.headert=FAOSTATFBS.headerNoDom;
            }
            for(var i=0;i<FAOSTATFBS.headert.length;i++)
            {
                var cell = document.createElement("td");
                var txtCell = document.createTextNode(FAOSTATFBS.headert[i].t);
                cell.appendChild(txtCell);
                row.appendChild(cell);
            }
            tblH.appendChild(row);
            tbl.appendChild(tblH);


            /*DEBUT DATA*/
            var nl=0;
            myFilter2.innerHTML="";
            myFilter3.innerHTML="";
            for(var i=0;i<myJson.length;i++)
            {
                if(curItem!=myJson[i][2])
                {
                    curItem=myJson[i][2];

                    var myfil=	document.createElement("input");
                    myfil.setAttribute("type","checkbox");
                    myfil.setAttribute("id","chk_"+i);
                    myfil.setAttribute("checked",true);
                    myfil.setAttribute("value","myTr_"+nl);
                    myfil.setAttribute("onclick","FAOSTATFBS.cache('myTr_"+nl+"')");
                    myfil.onclick=function(){
                        FAOSTATFBS.cache("myTr_"+nl);
                    };
                    var mylab=	document.createElement("label");
                    mylab.setAttribute("for","chk_"+i);

                    var txtCell = document.createTextNode(myJson[i][2]);	
                    if(myJson[i][0]==15){
                        myFilter2.appendChild(myfil);
                        mylab.appendChild(txtCell);
                        myFilter2.appendChild(mylab);
                        var myBr=	document.createElement("br");
                        myFilter2.appendChild(myBr);
                    }
		
                    else{
                        myFilter3.appendChild(myfil);
                        mylab.appendChild(txtCell);
                        myFilter3.appendChild(mylab);
                        var myBr=	document.createElement("br");
		 
                        myFilter3.appendChild(myBr);
		 
                    }
		 
		 
                    nl++;
 
 
                    if(myLine.length>0){
                        nlt=nl-2;
                        FAOSTATFBS.writeTR(tblB,myLine,"myTr_"+nlt);
                    }
                    myLine=[];
                }
                myLine[0]=myJson[i][0]+"_"+myJson[i][2]+"_"+myJson[i][1];
                if(document.getElementById("showDomestic").checked){
                    if(FAOSTATFBS.myIndex[myJson[i][5]]>0){
                        myLine[FAOSTATFBS.myIndex[myJson[i][5]]]=parseFloat(myJson[i][8]);
                    }
                }
                else{
                    if(FAOSTATFBS.myIndexNoDom[myJson[i][5]]>0){
                        myLine[FAOSTATFBS.myIndexNoDom[myJson[i][5]]]=parseFloat(myJson[i][8]);
                    }
                }
            }
            nlt=nl-1;
            FAOSTATFBS.writeTR(tblB,myLine,"myTr_"+nlt);//derniere Ligne
            tbl.appendChild(tblB);
            body.appendChild(tbl);
            tFinal=$("#resultTable");
            document.getElementById('btnExcel').className="myButton";
            if (navigator.appVersion.indexOf("MSIE 7.") != -1){}
            else{
                totChroma=$("#resultTable").chromatable(CTOptions);	
            }


        },
        error : function(err, b, c) {
            console.log(err);
        }
    });
		
		
		
		
}
}
else{
    document.getElementById("result").innerHTML="";
}
}



 

{
    var myFilter2Button=document.createElement("div");
    myFilter2Button.setAttribute("id","myFilter2Button");
    myFilter2Button.setAttribute("class","myFilterButton");
    var b1=document.createElement("input");
    b1.setAttribute("type","button");
    b1.setAttribute("value",FAOSTATFBS.traduction[FAOSTATFBS.lang].all);//trad
    b1.setAttribute("onclick","FAOSTATFBS.refAll(0)");
    b1.onclick=function(){
        FAOSTATFBS.refAll(0);
    }

    myFilter2Button.appendChild(b1);


    var b1=document.createElement("input");
    b1.setAttribute("type","button");
    b1.setAttribute("value",FAOSTATFBS.traduction[FAOSTATFBS.lang].none);
    //trad
    b1.setAttribute("onclick","FAOSTATFBS.refNone(0)");
    b1.onclick=function(){
        FAOSTATFBS.refNone(0)
        };
    myFilter2Button.appendChild(b1);
    var b1=document.createElement("input");
    b1.setAttribute("type","button");
    b1.setAttribute("value",FAOSTATFBS.traduction[FAOSTATFBS.lang].reverse);
    //trad
    b1.setAttribute("onclick","FAOSTATFBS.refRev(0)");
    b1.onclick=function(){
        FAOSTATFBS.refRev(0)
        };

    myFilter2Button.appendChild(b1);


    var myFilter3Button=document.createElement("div");
    myFilter3Button.setAttribute("id","myFilter3Button");
    myFilter3Button.setAttribute("class","myFilterButton");
    var b1=document.createElement("input");
    b1.setAttribute("type","button");
    b1.setAttribute("value",FAOSTATFBS.traduction[FAOSTATFBS.lang].all);
    //trad
    b1.setAttribute("onclick","FAOSTATFBS.refAll(1)");
    b1.onclick=function(){
        FAOSTATFBS.refAll(1)
        };
    myFilter3Button.appendChild(b1);

    var b1=document.createElement("input");
    b1.setAttribute("type","button");
    b1.setAttribute("value",FAOSTATFBS.traduction[FAOSTATFBS.lang].none);
    //trad
    b1.setAttribute("onclick","FAOSTATFBS.refNone(1)");
    b1.onclick=function(){
        FAOSTATFBS.refNone(1)
        };
    myFilter3Button.appendChild(b1);
    var b1=document.createElement("input");
    b1.setAttribute("type","button");
    b1.setAttribute("value",FAOSTATFBS.traduction[FAOSTATFBS.lang].reverse);
    //trad
    b1.setAttribute("onclick","FAOSTATFBS.refRev(1)");
    b1.onclick=function(){
        FAOSTATFBS.refRev(1);
    };
    myFilter3Button.appendChild(b1);

    var myFilter2=document.createElement("div");
    myFilter2.setAttribute("class","divMyFilter");
    myFilter2.setAttribute("id","myFilter2");
 
    var myFilter3=document.createElement("div");
    myFilter3.setAttribute("class","divMyFilter");
    myFilter3.setAttribute("id","myFilter3");
}
 

 
FAOSTATFBS.cache=function(id)
{
    if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{
        totChroma.resize();
    }
    if(id=="myFilter"){
        if(filterOnOff==0){
            filterOnOff=1;
        }else{
            filterOnOff=0;
        }
        if(document.getElementById(id).className=="visifb"){
            document.getElementById(id).className="invi";
        }
        else{
            document.getElementById(id).className="visifb";
        }
    /*
if(filterOnOff==0){document.getElementById("pup").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].filterOff;}
else{document.getElementById("pup").innerHTML=FAOSTATFBS.traduction[FAOSTATFBS.lang].filterOn;}*/
    }
    else{
        if(document.getElementById(id).className=="visifb"){
            document.getElementById(id).className="invi";
        }
        else{
            document.getElementById(id).className="visifb";
        }
    }
    if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{
        totChroma.resize();	
    }
}
 
 
FAOSTATFBS.reTri=function(i){
    if(i==tri){
        asc++;
        if(asc==2){
            asc=0;
        }
    }
tri=i;
FAOSTATFBS.triDataset();
}


FAOSTATFBS.triDataset=function()
{
    arrF=[];
    $("#resultTable tbody tr").each(function()
    {

        c=$(this);
        if(c[0].getElementsByTagName("td").length>0)
        {

            cc=c[0].getElementsByTagName("td")[tri].innerHTML;

            arrF.push([cc,$(this)]);
        }

    });


    arrF.sort(function(a,b)
    {
        var aa=parseInt(a[0]);
        var bb=parseInt(b[0]);
        if(isNaN(aa)){
            aa=0;
        }
        if(isNaN(bb)){
            bb=0;
        }
        if(asc==0){
            return -aa+bb;
        }
        else{
            return aa-bb;
        }
    }
    );

    $("#resultTable tbody").empty();
    for(i in arrF)
    {
        $("#resultTable tbody")[0].appendChild(arrF[i][1][0]);
    }

}


FAOSTATFBS.writeTR=function(tb,line,id)
{
    var row = document.createElement("tr");
    row.setAttribute("id",id);
    row.setAttribute("class","visifb");
    for(var i=0;i<16;i++)
    {
        if(i==0){ 
            var text="";
            if(line[i]!="undefined" && line[i]!=undefined){
                text=line[i];
            } 
            var nom=text.split("_");
            if(nom[0]==15){
                if(document.getElementById("showCode").checked){
                    var cell = document.createElement("th");
                    cell.className="subTitle2";
                    var txtCell = document.createTextNode(nom[2]);
                    cell.appendChild(txtCell);
                    row.appendChild(cell);
                }
                var cell = document.createElement("th");
                cell.className="subTitle2";
                var txtCell = document.createTextNode(nom[1]);
                cell.appendChild(txtCell);
                row.appendChild(cell);
            }
            else
            { 
                var cell = document.createElement("th");
                if(document.getElementById("showCode").checked){
                    cell.className="subTitle";
                    var txtCell = document.createTextNode(nom[2]);
                    cell.appendChild(txtCell);
                    row.appendChild(cell);
                }
                var cell = document.createElement("th");
                cell.className="subTitle";
                var txtCell = document.createTextNode(nom[1]);
                cell.appendChild(txtCell);
                row.appendChild(cell);
            }
        }
        else{
            var cell = document.createElement("td");
            if(document.getElementById("showDomestic").checked){
                if(i<6){
                    cell.className="td1";
                }
                else if(i<12){ cell.className="td2"; }
                else{ cell.className="td3"; }
            }
            else{
                if(i<5){
                    cell.className="td1";
                }
                else if(i<12){
                    cell.className="td2";
                }
                else{
                    cell.className="td3";
                }
            }
            var text="";
            if(line[i]!="undefined" && line[i]!=undefined){
                text=line[i];
            }
            var txtCell = document.createTextNode(text);
            cell.appendChild(txtCell);
            row.appendChild(cell);
        }
    }
    tb.appendChild(row);
}

FAOSTATFBS.myReset=function(id)
{
    document.getElementById(id).selectedIndex=0;
}

FAOSTATFBS.refAll=function(c)
{
    if(c==0){
        var mesCheck=document.getElementById("myFilter2").getElementsByTagName("input");
    }
    else{
        var mesCheck=document.getElementById("myFilter3").getElementsByTagName("input");
    }
    for(var i=0;i<mesCheck.length;i++)
    {
        mesCheck[i].checked=true;
        document.getElementById(mesCheck[i].value).className="visifb";
    }
}

FAOSTATFBS.refNone=function(c){
    if(c==0){
        var mesCheck=document.getElementById("myFilter2").getElementsByTagName("input");
    }
    else{
        var mesCheck=document.getElementById("myFilter3").getElementsByTagName("input");
    }
    for(var i=0;i<mesCheck.length;i++)
    {
        mesCheck[i].checked=false
        document.getElementById(mesCheck[i].value).className="invi";
    }
}

FAOSTATFBS.refRev=function(c)
{
    if(c==0){
        var mesCheck=document.getElementById("myFilter2").getElementsByTagName("input");
    }
    else{
        var mesCheck=document.getElementById("myFilter3").getElementsByTagName("input");
    }
    for(var i=0;i<mesCheck.length;i++)
    {
        if(mesCheck[i].checked){
            mesCheck[i].checked=false;
            document.getElementById(mesCheck[i].value).className="invi";
        }
        else{
            mesCheck[i].checked=true;
            document.getElementById(mesCheck[i].value).className="visifb";
        }
    }
}

FAOSTATFBS.toExcel=function()
{
    var test=window.location.toString().split("/");
    var dd="";
    var df="";
    if(test[test.length-1]=="popup.jsp"){
        dd=parent.window.document.getElementById("excelData");
        df=parent.window.document.getElementById("formExcel");
    }
    else{
        dd=document.getElementById("excelData");
        df=document.getElementById("formExcel");
    }
    if (navigator.appVersion.indexOf("MSIE 7.") != -1){}else{
        document.getElementById("emptyPop").setAttribute("id","emptyPop2");
    }
    var temp=document.getElementById("emptyPop").innerHTML;
    document.getElementById("emptyPop").innerHTML="";
    var ret=document.getElementById("resultTable").innerHTML.toString();

    dd.value="<style>.invi,.myButton{display:none} </style><table>"+ret+"</table>";
    df.submit();
    document.getElementById("emptyPop").innerHTML=temp;
/*var ret2=document.getElementById("resultTable");
ret2.getElementById
	*/	
};
FAOSTATFBS.changeTab=function(param)
{
    document.getElementById("sCountry").selectedIndex=0;

    document.getElementById("sItem").selectedIndex=0;
    document.getElementById("result").innerHTML="";
    document.getElementById('tabCountry').className="invi";
    document.getElementById('tabItem').className="invi";
    document.getElementById('sCountry').className="invi";
    document.getElementById('sItem').className="invi";
    //document.getElementById('menu_tabCountry').style.backgroundImage="url(FAOSTATFBS.root+'img/countriesTab.gif')";
    //document.getElementById('menu_tabItem').style.backgroundImage="url(FAOSTATFBS.root+'img/itemsTab.gif')";
    document.getElementById('rc3').checked=true;
    document.getElementById('ri3').checked=true;
    document.getElementById(param).className="visi2";
    if(param=="tabItem"){        document.getElementById("sItem").className="visi2";    }
    else{        document.getElementById("sCountry").className="visi2";    }
 //   document.getElementById('menu_'+param).style.color="red";
    if (param=='tabCountry'){
        $("#search-items")[0].className="search-categories-label search-categories-label-selected";
         $("#search-countries")[0].className="search-categories-label";
    //document.getElementById('menu_'+param).style.backgroundImage="url(FAOSTATFBS.root+'img/countriesTabOn.gif')";
    }
    if (param=='tabItem'){
          $("#search-countries")[0].className="search-categories-label search-categories-label-selected";
        $("#search-items")[0].className="search-categories-label";
       // document.getElementById('menu_'+param).style.backgroundImage="url(/faostat-download-js/imgages/itemsTabOn.gif')";
    }
}



// Moved to the download and not on ready
//$(document).ready(function() {
//    if (navigator.appVersion.indexOf("MSIE 7.") != -1){}
//    else{
//        $(".various").fancybox({
//            maxWidth	: 1500,
//            maxHeight	: 900,
//            fitToView	: false,
//            width		: '90%',
//            height		: '90%',
//            autoSize	: false,
//            closeClick	: false,
//            openEffect	: 'none',
//            closeEffect	: 'none'
//        });
//    }
//});
