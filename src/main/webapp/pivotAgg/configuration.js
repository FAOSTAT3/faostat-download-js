 FAOSTATOLAPV3={};
FAOSTATOLAPV3.grouped=true;
var dataTest2=[];
function changechkTreeview(){
   FAOSTATOLAPV3.grouped=document.getElementById('chkTreeview').checked;
   FAOSTATOLAPV3.mygrid="";
$("#fx-olap-ui").pivotUI(FAOSTATNEWOLAP.originalData,FAOSTATOLAP2.options.E,false);}

function newGrid(r){
    console.log("r");
    console.log(r);
    var r2d2=[];
    $("#mesFlags").empty();
    if(r.colKeys.length>0){
    for(ligne in r.tree){
        var temp=ligne.split('||');
        for(col in r.colKeys){
        var coldInd=r.colKeys[col].join("||");//.replace(/[^a-zA-Z0-9 ]/g,"_");
        if( r.tree[ligne][coldInd]!=null){ temp.push(r.tree[ligne][coldInd].value()); }
        else{temp.push( "");
        }
        //temp.push(r.rowTotals[ligne].sum);
        // r2d2.push([ligne,col,+r.tree[ligne][col].value()]);
      }
      r2d2.push(temp);
     }
    }
    else{
     for(ligne in r.rowTotals){
          var temp=ligne.split('||');
          if( r.rowTotals[ligne]!=null){temp.push(r.rowTotals[ligne].value());}
          else{temp.push( "");}
         r2d2.push(temp);
        }
    }
    var grid_demo_id = "myGrid1" ;
    var dsOption= {
        fields :[],
        recordType : 'array',
        data : r2d2
        };
var colsOption = [];
for(var i in r.rowAttrs){
         dsOption.fields.push({name : r.rowAttrs[i]  });
         colsOption.push({id:  r.rowAttrs[i] , header:  r.rowAttrs[i] , frozen : true ,grouped : FAOSTATOLAPV3.grouped});
    }
var reg = new RegExp("<span class=\"ordre\">[0-9]*</span>(.*)", "g"); 
var reg2 = new RegExp("<span class=\"ordre\">[0-9]*</span><table class=\"innerCol\"><th>([0-9]+)</th><th>([^>]*)</th></table>", "g"); 

if(r.colKeys.length>0){
for(var i in r.colKeys){
   dsOption.fields.push({name : r.colKeys[i].toString().replace(/[^a-zA-Z0-9]/g,"_")  } );
   montitle="";
   for(var ii=0;ii<r.colKeys[i].length;ii++){
       if( F3DWLD.CONFIG.wdsPayload.showCodes){ montitle+=" "+r.colKeys[i][ii].replace(reg2, " $2 ($1)")/*.replace(/[^a-zA-Z0-9]/g,"")*/;}
       else{montitle+="<br />"+r.colKeys[i][ii].replace(reg, "$1")/*.replace(/[^a-zA-Z0-9]/g,"_")*/;}
   }
   colsOption.push({id:  r.colKeys[i].join("_").replace(/[^a-zA-Z0-9]/g,"_") ,
       header: montitle, toolTip : true ,toolTipWidth : 150,
     renderer:my_renderer});
    }
}
else{ dsOption.fields.push({name : "Value"  } );
     colsOption.push({id: "Value" ,
       header: "Value", toolTip : true ,toolTipWidth : 150,
       renderer:my_renderer});
    }

Sigma.ToolFactroy.register(
	'mybutton',  {cls : 'mybutton-cls', toolTip : 'I am a new button',
            action : function(event,grid) {  alert( 'The id of this grid is  '+grid.id)  }
	}
);


function my_renderer(value ,record,columnObj,grid,colNo,rowNo){
    var no="";    
    if(record[columnObj.fieldIndex].length>1){
        no= "<table class=tableVCell><tr><td>"+addCommas(record[columnObj.fieldIndex][0])+"</td>";
        if(F3DWLD.CONFIG.wdsPayload.showUnits){no+= "<td>"+record[columnObj.fieldIndex][1]+"</td>";}
        if(F3DWLD.CONFIG.wdsPayload.showFlags){no+= "<td>"+  record[columnObj.fieldIndex][2]+"</td>";}
        no+="</tr></table>";
        }
    else{  
        no=addCommas(record[columnObj.fieldIndex]);
        /*    no=record[columnObj.fieldIndex].toLocaleString();*/
        }
    return no;
}

var gridOption={
	id : grid_demo_id,
	width: "800",  //"100%", // 700,
	height: "350",  //"100%", // 330,
	container :"myGrid1_div",//pvtRendererArea",//testinline2",//'',//myGrid1_div',//pivot_table',// 'gridbox',// $(".pvtRendererArea")[0],//
	replaceContainer : true, 
	dataset : dsOption ,
        resizable : false,
	columns : colsOption,
	pageSize : 50 ,
        pageSizeList : [50,150,500],
        SigmaGridPath : 'grid/',
      
	toolbarContent : 'nav | goto | pagesize '/*,*//*| mybutton |*/
        /*
        onMouseOver : function(value,  record,  cell,  row,  colNo, rowNo,  columnObj,  grid){
        if (columnObj && columnObj.toolTip) { grid.showCellToolTip(cell,columnObj.toolTipWidth);}
        else{grid.hideCellToolTip();}
	},
	onMouseOut : function(value,  record,  cell,  row,  colNo, rowNo,  columnObj,  grid){grid.hideCellToolTip();}*/
    };

  FAOSTATOLAPV3.mygrid=new Sigma.Grid( gridOption );
  Sigma.Grid.render( FAOSTATOLAPV3.mygrid)() ;
  document.getElementById('page_after').innerHTML="/"+FAOSTATOLAPV3.mygrid.getPageInfo().totalPageNum;
  FAOSTATOLAPV3.mygrid.pageSizeSelect.onchange=function()
  {document.getElementById('page_after').innerHTML="/"+FAOSTATOLAPV3.mygrid.getPageInfo().totalPageNum;};
 
 if(FAOSTATOLAPV3.grouped){$("#mesFlags").append($("<label for=\"chkTreeview\">Treeview/sorting columns</label><input checked onchange=\"changechkTreeview()\" type=\"checkbox\" id=\"chkTreeview\">"));}
 else{$("#mesFlags").append($("<label for=\"chkTreeview\">Treeview/Sorting columns</label><input  onchange=\"changechkTreeview()\" type=\"checkbox\" id=\"chkTreeview\">"));}
$("#nested_by").hide();
}

FAOSTATOLAP2 = {};
FAOSTATOLAP2.displayOption =  {
            showUnit: 0,
            showCode: 0,
            showFlag: 0,
            overwrite: true
        };
       //  google.load("visualization", "1", {packages:["corechart", "charteditor"]});

FAOSTATOLAP2.options = {
  E:{derivedAttributes: {
          "Area": function(mp){
              if (F3DWLD.CONFIG.wdsPayload.showCodes)
              {
                  return "<span class=\"ordre\">" + mp["Var1Order"] + "</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>"; 
              }
              else {
                  return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
              }
          },
         
                    "Element": function(mp)
                    {
                       		var myFU="";
					if(mp["Unit"].length==0){myFU="";}else{myFU=" ("+mp["Unit"]+")";}
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"]+myFU + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"]+myFU;
                        }
                    },
                    "Item": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"];
                        }
                    }
                },
                rows: ["Area", "Item", "Element"],
                cols: ["Year"],
                vals: ["Value"  ],
                linkedAttributes: [],
                 hiddenAttributes: ["Country Code","Country_","Var1Order","Var2Order","Var3Order","Var4Order","Value","Flag","Unit","Item Code","Item_","Element Code","Element_","Flag Description"]
            },
    F:{ derivedAttributes: {
                    "Pays": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var1Order"] + "</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
                        }
                    },
                    "Elements": function(mp)
                    {
                      		var myFU="";
					if(mp["Unit"].length==0){myFU="";}else{myFU=" ("+mp["Unit"]+")";}
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"]+myFU + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"]+myFU;
                        }
                    },
                    "Articles": function(mp)
                    {
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"];
                        }
                    }
                },
                rows: ["Pays", "Articles", "Elements"],
                cols: ["Annees"],
                vals: ["Value"],
                linkedAttributes: [],
                hiddenAttributes: ["Country Code","Country_","Var1Order","Var2Order","Var3Order","Var4Order","Value","Flag","Unit","Item Code","Item_","Element Code","Element_","Flag Description"]
            }
    , S:{ derivedAttributes: {
            "Area": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes) {
                    return "<span class=\"ordre\">" + mp["Var1Order"] + "</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                 }
                 else {
                     return "<span class=\"ordre\">" + mp["Var1Order"] + "</span>" + mp["Country_"];
                 }
             },
            "Element": function(mp)
             {
                		var myFU="";
					if(mp["Unit"].length==0){myFU="";}else{myFU=" ("+mp["Unit"]+")";}
                        if (F3DWLD.CONFIG.wdsPayload.showCodes)
                        {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"]+myFU + "</th></table>";
                        }
                        else {
                            return "<span class=\"ordre\">" + mp["Var2Order"] + "</span>" + mp["Element_"]+myFU;
                        }
             },
             "Item": function(mp){
                 if (F3DWLD.CONFIG.wdsPayload.showCodes){
                     return "<span class=\"ordre\">" + mp["Var3Order"] + "</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                 }
                 else {
                     return "<span class=\"ordre\">" + mp["Var3Order"] + "</span>" + mp["Item_"];
                 }
             }
         },
         rows: ["Area", "Item", "Element"],
         cols: ["Year"],
         vals: ["Value", "Unit", "Flag"],
         linkedAttributes: [],
         hiddenAttributes: ["Country Code","Country_","Var1Order","Var2Order","Var3Order","Var4Order","Value","Flag","Unit","Item Code","Item_","Element Code","Element_","Flag Description"]
            }
        };

FAOSTATOLAP2.header = {E: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    F: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Annees", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    S: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]]
};


FAOSTATOLAP2.optionsTM = {
    E: { derivedAttributes: {
            "Reporter": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Partner": function(mp)  {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Element": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ElementName"] + "</th><th>" + mp["ElementCode"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Item": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }}
        ,
        rows: ["Reporter", "Partner", "Item", "Element"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []
    },
    F: {derivedAttributes: {
            "Reporteurs": function(mp)  {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Partnaires": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Elements": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Articles": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }
        }
        ,
        rows: ["Reporteurs", "Partnaires", "Articles", "Elements"],
        cols: ["Annees"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []
    }
    ,
    S: {derivedAttributes: {
            "Reporter": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Partner": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Element": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Item": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes){
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }}
        ,
        rows: ["Reporter", "Partner", "Item", "Element"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []}

};


FAOSTATOLAP2.headerTM = {
    E: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Year",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    F: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Annees",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    S: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Year",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]]

};


FAOSTATOLAP2.headerFA = {E: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    F: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Annee", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]],
    S: [["Country Code", "Country_", "Element Code", "Element_", "Item Code",
            "Item_", "Year", "Unit", "Value", "Flag", "Flag Description", "Var1Order", "Var2Order", "Var3Order",
            "Var4Order"]]
};


FAOSTATOLAP2.optionsFA = {
    E: {
        derivedAttributes: {
            "Recipient_Country": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                }
                else {
                    return mp["Country_"];
                }
            },
            "Donor_Country": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                }
                else {
                    return mp["Element_"];
                }
            },
            "Item": function(mp)   {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                }
                else {
                    return mp["Item_"];
                }
            }

        },
        rows: ["Recipient_Country", "Donor_Country", "Item"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    }, F: {
        derivedAttributes: {
            "Pays_beneficiaire": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                }
                else {
                    return mp["Country_"];
                }
            },
            "Pays_Donateur": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                }
                else {
                    return mp["Element_"];
                }
            },
            "Article": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                }
                else {
                    return mp["Item_"];
                }
            }

        },
        rows: ["Pays_beneficiaire", "Pays_Donateur", "Article"],
        cols: ["Annee"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    },
    S: {
        derivedAttributes: {
            "Recipient_Country": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Country Code"] + "</th><th>" + mp["Country_"] + "</th></table>";
                }
                else {
                    return mp["Country_"];
                }
            },
            "Donor_Country": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Element Code"] + "</th><th>" + mp["Element_"] + "</th></table>";
                }
                else { return mp["Element_"]; }
            },
            "Item": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["Item Code"] + "</th><th>" + mp["Item_"] + "</th></table>";
                }
                else {
                    return mp["Item_"];
                }
            }

        },
        rows: ["Recipient_Country", "Donor_Country", "Item"],
        cols: ["Year"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    }



};




FAOSTATOLAP2.optionsHS = {
    E: {
        derivedAttributes: {
            "Survey": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Breakdown_Variable": function(mp)  {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Breakdown_by_Sex": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Indicator": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }

        },
        rows: ["Survey", "Breakdown_Variable", "Breakdown_by_Sex", "Indicator"],
        cols: ["Measure"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    },
    F: {
        derivedAttributes: {
            "Survey": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Breakdown_Variable": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Breakdown_by_Sex": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Indicator": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }

        },
        rows: ["Survey", "Breakdown_Variable", "Breakdown_by_Sex", "Indicator"],
        cols: ["Measure"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []

    },
    S: {
        derivedAttributes: {
            "Survey": function(mp)  {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ReporterCode"] + "</th><th>" + mp["ReporterName"] + "</th></table>";
                }
                else {
                    return mp["ReporterName"];
                }
            },
            "Breakdown_Variable": function(mp){
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["PartnerCode"] + "</th><th>" + mp["PartnerName"] + "</th></table>";
                }
                else {
                    return mp["PartnerName"];
                }
            },
            "Breakdown_by_Sex": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ElementCode"] + "</th><th>" + mp["ElementName"] + "</th></table>";
                }
                else {
                    return mp["ElementName"];
                }
            },
            "Indicator": function(mp) {
                if (F3DWLD.CONFIG.wdsPayload.showCodes)
                {
                    return "<span class=\"ordre\">1</span><table class=\"innerCol\"><th>" + mp["ItemCode"] + "</th><th>" + mp["ItemName"] + "</th></table>";
                }
                else {
                    return mp["ItemName"];
                }
            }
        },
        rows: ["Survey", "Breakdown_Variable", "Breakdown_by_Sex", "Indicator"],
        cols: ["Measure"],
        vals: ["Value", "Unit", "Flag"],
        linkedAttributes: []
    }
};
FAOSTATOLAP2.headerHS = {E: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Measure",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    F: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Measure",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]],
    S: [["n1", "n2",
            "Domain", "DomainName",
            "ReporterCode", "ReporterName",
            "PartnerCode", "PartnerName",
            "ElementCode", "ElementName",
            "ItemCode", "ItemName",
            "YearCode", "Measure",
            "Unit", "Value", "Flag", "FlagD", "Var1Order", "Var2Order", "Var3Order", "Var4Order", "Var5Order"]]

};

function retConfig(domain, lang)
{//mesOptionsPivotSend
    var response2_2 = [];
    var mesOptionsPivot = {};
    if (domain == "TM" || domain == "FT"){
        response2_2 = FAOSTATOLAP2.headerTM[lang];
        for (j in FAOSTATOLAP2.optionsTM[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.optionsTM[lang][j];
        }
    }
    else if (domain == "HS"){
        response2_2 = FAOSTATOLAP2.headerHS[lang];
        mesOptionsPivot = {};
        for (j in FAOSTATOLAP2.optionsHS[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.optionsHS[lang][j];
        }
    }
    else if (domain == "FA"){
        response2_2 = FAOSTATOLAP2.headerFA[lang];
        mesOptionsPivot = {};
        for (j in FAOSTATOLAP2.optionsFA[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.optionsFA[lang][j];
        }
    }
    else {
        response2_2 = FAOSTATOLAP2.header[lang];
        mesOptionsPivot = {};
        for (j in FAOSTATOLAP2.options[lang]) {
            mesOptionsPivot[j] = FAOSTATOLAP2.options[lang][j];
        }
    }
    return [response2_2, mesOptionsPivot];
}
		
