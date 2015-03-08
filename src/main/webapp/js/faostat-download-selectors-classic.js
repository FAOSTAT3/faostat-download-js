var testAjax;
if (!window.FAOSTATDownloadSelectorsClassic) {
    var monXML = "";
    function createDSDXML(arr, nom)
    {
        monXML += "<dimension name=\"" + nom + "\" nb=\"1\">";
        for (var i = 0; i < arr.length; i++)
        {
            monXML += "<dim><leaf>" + arr[i].code + "</leaf>" +
                    "<Id>" + arr[i].code + "</Id>" +
                    "<E>" + arr[i].label + "</E>" +
                    "</dim>";
        }
        monXML += "</dimension>";
    }
    function getNestedBy() {        return $('#nestedBy').sortable('toArray').slice(1).join(",");    }
    
    window.FAOSTATDownloadSelectorsClassic = {
        theme: "energyblue",source: [],
        /** base URL for WDS, default: fenixapps.fao.org */
        baseurl: "",
        /** datasource for WDS, default: faostat */
        datasource: "",
        /** language for the tree, default: en */
        language: "",
        gridItemsFrom: "",
        gridItemsTo: "",
        gridElementsFrom: "",
        gridElementsTo: "",
        gridCountriesFrom: "",
        gridCountriesTo: "",
        selectAll: function(gridCode, select) {
            var rows = $('#' + gridCode).jqxGrid('getrows');
            for (var i = 0; i < rows.length; i++) {
                if (select) {    $('#' + gridCode).jqxGrid('selectrow', i);  }
                else {$('#' + gridCode).jqxGrid('unselectrow', i); }
            }
        },
        falseclick: function() {
            console.log("falseclick");
            $('#OLAP_IFRAME').css('display', 'inline');
            document.getElementById('output_area').innerHTML = '';

            $("#testinline").html("<center><img src=\"/test2/pivotAgg/Preload.gif\" /></center>");
            FAOSTATNEWOLAP.flags = {};
            console.log("falseclick 2 ");
            var p = {};
            p.datasource = F3DWLD.CONFIG.datasource;
            p.domainCode = F3DWLD.CONFIG.domainCode;
            p.lang = F3DWLD.CONFIG.lang;
            p.areaCodes = collectCountries();
            p.itemCodes = collectItems();
            p.elementListCodes = collectElements();
            p.years = collectYears();
            p.flags = F3DWLD.CONFIG.wdsPayload.showFlags;
            p.codes = F3DWLD.CONFIG.wdsPayload.showCodes;
            p.units = F3DWLD.CONFIG.wdsPayload.showUnits;
            p.nullValues = F3DWLD.CONFIG.wdsPayload.showNullValues;
            p.thousandSeparator = F3DWLD.CONFIG.wdsPayload.thousandSeparator;
            p.decimalSeparator = F3DWLD.CONFIG.wdsPayload.decimalSeparator;
            p.decimalPlaces = F3DWLD.CONFIG.wdsPayload.decimalNumbers;
            p.limit = F3DWLD.CONFIG.outputLimit;

            var data = {};
            data.payload = JSON.stringify(p);
            console.log("falseclick 3 ");



            $.ajax({
                type: 'POST',
                url: F3DWLD.CONFIG.procedures_data_url,
                data: data,
                success: function(response) {
                    console.log("response");
                    console.log(response);
                    /* var response2=[["Domain","AreaCode","AreaName","ItemCode","ItemName","ElementCode","ElementName","Year","Unit","Flag","Value"]];
                     var response2TM=[["Domain","ReporterCode","ReporterName","PartnerCode","PartnerName","ItemCode","ItemName","ElementCode","ElementName","Year","Unit","Flag","Value"]];
                     var mesOptionsPivot=FAOSTATOLAP2.options;
                     if(F3DWLD.CONFIG.domainCode=="TM" ||F3DWLD.CONFIG.domainCode=="FT" )
                     {response2=response2TM;mesOptionsPivot=FAOSTATOLAP2.optionsTM}
                     for(i in response){response2.push(response[i]);}
                     */
                    var derivers = $.pivotUtilities.derivers;
                    var renderers = $.extend($.pivotUtilities.renderers, $.pivotUtilities.gchart_renderers);
                    /*mesOptionsPivot.vals=["Value"];
                     if(F3DWLD.CONFIG.wdsPayload.showUnits){mesOptionsPivot.vals.push("Unit")}
                     if(F3DWLD.CONFIG.wdsPayload.showFlags){mesOptionsPivot.vals.push("Flag")}
                     */
                    // $("#testinline").pivotUI(response2,mesOptionsPivot ,true);
                    //$("#testinline").pivotUI(response,mesOptionsPivot ,true);
                   
                    $("#testinline").pivotUI(response, {}, true);

                    $("#testinline").css("overflow", "auto");
                    var newFlag = "";
                    for (var i in FAOSTATNEWOLAP.flags) {
                        if (newFlag != "") { newFlag += ":";}
                        newFlag += "'" + i + "'";
                    }
                    if (newFlag == "") { newFlag = "''";    }
                    $(".pvtAxisLabel")[$(".pvtAxisLabel").length - 1].setAttribute("colspan", 2);
                    $.get("/faostat.olap.ws/rest/GetFlags/" + F3DWLD.CONFIG.lang + "/" + newFlag, function(data) {
                        data = data.replace("localhost:8080/", "faostat3.fao.org/");
                        $("#myGrid1_div").append(data);
                        // my_exportNew();
                    });
        }
    });

        },
        initOLAP: function() {
            $(".demo").jqxNavigationBar({
                width: "100%",
                height: 500,
                expandMode: 'multiple',
                theme: FAOSTATDownload.theme/* ,
                 selectedIndex: -1*/
            });
            $("#agg, #col, #row").sortable({
                connectWith: ".connectedSortable",
                cancel: ".ui-state-disabled",
                update: function() {
                    var reg = new RegExp("sel_", "g");
                    var myCols = $('#col').sortable('toArray').slice(1).join(","); // r?cup?ration des donn?es ? envoyer
                    var myNestedBy = $('#nestedBy').sortable('toArray').slice(1).join(",");
                    if (myNestedBy.length > 0) {
                        myCols = myNestedBy + "," + myCols;
                    }
                    var myRows = $('#row').sortable('toArray').slice(1).join(","); // r?cup?ration des donn?es ? envoyer
                    order = myRows.replace(reg, "") + "#" + myCols.replace(reg, "");
                    //order=order;
                    document.getElementById('c').value = order;
                    if (OLAP.window.length == 1) {
                        OLAP.window.document.getElementById('c').value = order;
                        OLAP.window.DEMO.pivot.cb();
                    }
                }
            }).disableSelection();
            $("#nestedBy").sortable({
                connectWith: ".connectedSortable",
                cancel: ".ui-state-disabled",
                update: function() {
                    var reg = new RegExp("sel_", "g");
                    var myCols = $('#col').sortable('toArray').slice(1).join(","); // recuperation des donnees a envoyer
                    var myNestedBy = $('#nestedBy').sortable('toArray').slice(1).join(",");
                    if (myNestedBy.length > 0) {
                        myCols = myNestedBy + "," + myCols;
                    }
                    var myRows = $('#row').sortable('toArray').slice(1).join(","); //  recuperation des donnees a envoyer
                    order = myRows.replace(reg, "") + "#" + myCols.replace(reg, "");
                    order = order;
                    document.getElementById('c').value = order;
                    if (OLAP.window.length == 1) {
                        OLAP.window.document.getElementById('c').value = order;
                        window.FAOSTATDownloadSelectorsClassic.falseclick();
                    }
                }
            }).disableSelection();
            /**$("#bulkDownload2").jqxButton({
             width: '75', 
             height: '25', 
             theme: FAOSTATDownload.theme 
             }); **/
            $("#bulkDownload2").bind("click", window.FAOSTATDownloadSelectorsClassic.falseclick);
        },
        initUI: function() {
            FAOSTATDownload.initOutputOptions();
            document.getElementById('selection_mode').innerHTML = I18N.translate('_selection_mode');
            document.getElementById('wizard_output_type').innerHTML = I18N.translate('_outputType');
            document.getElementById('wizard_thousand_separator').innerHTML = I18N.translate('_thousandSeparator');
            document.getElementById('wizard_decimal_separator').innerHTML = I18N.translate('_decimalSeparator');
            document.getElementById('wizard_decimal_numbers').innerHTML = I18N.translate('_decimalNumbers');
            document.getElementById('show_flags').innerHTML = I18N.translate('_show_flags_label');
            document.getElementById('show_codes').innerHTML = I18N.translate('_show_codes_label');
            document.getElementById('show_units').innerHTML = I18N.translate('_show_units_label');
            document.getElementById('show_null_values').innerHTML = I18N.translate('_show_null_values_label');
            FAOSTATDownloadSelectorsClassic.initOLAP();
            if ($.url().param('lang') != null) {
                //FAOSTATDownload.language = $.url().param('lang');
            } else {
                //FAOSTATDownload.language = 'E';
            }

            if (FAOSTATDownload.linkCodelists == true) {
            }
            else {

                $(".faostat-download-tab").jqxTabs({
                    width: '352',
                    height: '200',
                    position: 'top',
                    animationType: 'fade',
                    selectionTracker: 'checked',
                    theme: FAOSTATDownload.theme
                });

                $("#tabCountries").bind('tabclick', function(event) {
                    FAOSTATDownload.countriesTabSelectedIndex = event.args.item;
                });

                $("#tabItems").bind('tabclick', function(event) {
                    FAOSTATDownload.itemsTabSelectedIndex = event.args.item;
                });

                if (FAOSTATDownload.domainCode == 'GY') {
                    $('#tabItems').jqxTabs('removeAt', 0);
                    $('#tabItems').jqxTabs('setTitleAt', 0, $.i18n.prop('_items'));
                }

                /** $(".faostat-download-button").jqxButton({ 
                 width: '100%', 
                 height: '25', 
                 theme: FAOSTATDownload.theme 
                 });**/

                $.getJSON(FAOSTATDownload.prefix + 'config/faostat-download-configuration.json', function(data) {
                    FAOSTATDownloadSelectorsClassic.populateGrid("countries", "gridCountries", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("regions", "gridRegions", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("specialgroups", "gridSpecialGroups", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("items", "gridItems", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("itemsaggregated", "gridItemsAggregated", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("elements", "gridElements", FAOSTATDownload.domainCode);
                    FAOSTATDownloadSelectorsClassic.populateGrid("years", "gridYears", FAOSTATDownload.domainCode);
                });
            }
        },
        translateUI: function() {
            document.getElementById('li_countries').innerHTML = I18N.translate('_countries');
            document.getElementById('li_elements').innerHTML = I18N.translate('_elements');
            try {
                document.getElementById('li_items').innerHTML = I18N.translate('_items');
            } catch (err) {
            }
            try {
                document.getElementById('li_items_aggregated').innerHTML = I18N.translate('_items_aggregated');
            } catch (err) {
            }
            try {
                document.getElementById('li_regions').innerHTML = I18N.translate('_regions');
            } catch (err) {
            }
            try {
                document.getElementById('li_special_groups').innerHTML = I18N.translate('_special_groups');
            } catch (err) {
            }
            document.getElementById('li_years').innerHTML = I18N.translate('_years');
            document.getElementById('output_options_labels').innerHTML = I18N.translate('_outputOptions');

            $('#buttonSelectAllCountries-text').append(I18N.translate('_selectAll'));
            $('#buttonSelectAllCountries-text').addClass('btnText');

            $('#buttonDeSelectAllCountries-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllCountries-text').addClass('btnText');

            $('#buttonSelectAllElements-text').append(I18N.translate('_selectAll'));
            $('#buttonSelectAllElements-text').addClass('btnText');

            $('#buttonDeSelectAllElements-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllElements-text').addClass('btnText');

            $('#buttonSelectAllItems-text').append(I18N.translate('_selectAll'));
            $('#buttonSelectAllItems-text').addClass('btnText');

            $('#buttonDeSelectAllItems-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllItems-text').addClass('btnText');

            $('#buttonSelectAllYears-text').append(I18N.translate('_selectAll'));
            $('#buttonSelectAllYears-text').addClass('btnText');

            $('#buttonDeSelectAllYears-text').append(I18N.translate('_clearSelection'));
            $('#buttonDeSelectAllYears-text').addClass('btnText');

        },
        populateGrid: function(codingSystem, gridCode, domainCode) {
            var yearTemp = [{
                    "code": "2000",
                    "label": "2000"
                }, {
                    "code": "2001",
                    "label": "2001"
                }, {
                    "code": "2002",
                    "label": "2002"
                }, {
                    "code": "2003",
                    "label": "2003"
                }];
            var monUrl = 'http://' + FAOSTATDownload.baseurl + '/bletchley/rest/codes/' + codingSystem + '/' + FAOSTATDownload.datasource + '/' + domainCode + '/' + FAOSTATDownload.language;
            if (domainCode != null && domainCode.length > 0) {
                $.ajax({
                    type: 'GET',
                    url: monUrl,
                    dataType: 'json',
                    success: function(response) {
                        FAOSTATDownloadSelectorsClassic.createGrid(codingSystem, gridCode, response);
                    },
                    error: function(err, b, c) {
                        switch (codingSystem) {
                            case 'regions':
                                $('#tabCountries').jqxTabs('removeAt', 1);
                                break;
                            case 'specialgroups':
                                $('#tabCountries').jqxTabs('removeAt', 2);
                                break;
                            case 'itemsaggregated':
                                $('#tabItems').jqxTabs('removeAt', 1);
                                break;
                        }
                    }
                });
            } else {
                FAOSTATDownloadSelectorsClassic.createGrid(codingSystem, gridCode, null);
            }
        },
        createGrid: function(codingSystem, gridCode, response) {
//            var data = new Array();
//            if (response != null) {
//                if (codingSystem == 'regions' || codingSystem == 'specialgroups' || codingSystem == 'itemsaggregated') {
//                    if (FAOSTATDownload.domainCode != 'GY') {
//                        for (var i = 0 ; i < response.length ; i++) {
//                            var row = {};
//                            switch (response[i].type) {
//                                case 'list':
//                                    row["label"] = response[i].label + ' ' + $.i18n.prop('_list');
//                                    break;
//                                case 'total':
//                                    row["label"] = response[i].label + ' ' + $.i18n.prop('_total');
//                                    break;
//                            }
//                            row["code"] = response[i].code;
//                            row["type"] = response[i].type;
//                            data[i] = row;
//                        }
//                    } else {
//                        var counter = 0;
//                        for (var i = 0 ; i < response.length ; i++) {
//                            var row = {};
//                            switch (response[i].type) {
//                                case 'list':
//                                    if (codingSystem == 'regions' || codingSystem == 'specialgroups') {
//                                        row["label"] = response[i].label + ' ' + $.i18n.prop('_list');
//                                    } else {
//                                        row["label"] = response[i].label;
//                                    }
//                                    break;
//                                case 'total':
//                                    row["label"] = response[i].label + ' ' + $.i18n.prop('_total');
//                                    break;
//                            }
//                            row["code"] = response[i].code;
//                            row["type"] = response[i].type;
//                            if (codingSystem != 'itemsaggregated')
//                                data[counter++] = row;
//                            if (codingSystem == 'itemsaggregated' && response[i].type != 'total')
//                                data[counter++] = row;
//                        }
//
//                    }
//                } else {
//                    for (var i = 0 ; i < response.length ; i++) {
//                        var row = {};
//                        if (codingSystem == 'elements') {
//                            row["label"] = response[i].label + ' (' + response[i].unit + ')';
//                        } else {
//                            row["label"] = response[i].label;
//                        }
//                        row["code"] = response[i].code;
//                        data[i] = row;
//                    }
//                }
//            }
//            var source = {
//                localdata: data,
//                datatype: "array"
//            };
//            var dataAdapter = new $.jqx.dataAdapter(source);
//            $("#" + gridCode).jqxGrid({
//                width: '351',
//                height: 168,
//                source: dataAdapter,
//                columnsresize: true,
//                showheader: false,
//                selectionmode: 'multiplerowsextended',
//                columns: [{
//                    text: I18N.translate('_label'),
//                    datafield: 'label'
//                }],
//                theme: FAOSTATDownload.theme
//            });
//            $("#" + gridCode).on('rowselect', function (event) {
//                var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
//                if (item.value!="pivot") {
//                    $('#buttonExportToCSV')[0].style.display="inline-block";
//                } else{
//                    document.getElementById('buttonExportToCSV').style.display="none";
//                  $('#testinline').empty();
//                }
//            });
//            var targetCodingSystem = FAOSTATDownloadSelectorsClassic.getCodingSystemFromGridCode(gridCode);
//            $("#buttonSelectAll" + targetCodingSystem).bind('click', function() {
//                FAOSTATDownloadSelectorsClassic.selectAll(gridCode, true);
//            });
//            $("#buttonDeSelectAll" + targetCodingSystem).bind('click', function() {
//                FAOSTATDownloadSelectorsClassic.selectAll(gridCode, false);
//            });

            var select = '';
            var lbl = null;
            select += '<select id="' + gridCode + '_select" multiple="multiple" style="width: 100%; height: 100%; border: 0px;">';
            for (var i = 0; i < response.length; i++) {
                if (codingSystem == 'regions' || codingSystem == 'specialgroups' || codingSystem == 'itemsaggregated') {
                    if (FAOSTATDownload.domainCode != 'GY') {
                        switch (response[i].type) {
                            case 'list':
                                lbl = response[i].label + ' ' + $.i18n.prop('_list');
                                break;
                            case 'total':
                                lbl = response[i].label + ' ' + $.i18n.prop('_total');
                                break;
                        }
                    } else {
                        switch (response[i].type) {
                            case 'list':
                                if (codingSystem == 'regions' || codingSystem == 'specialgroups') {
                                    lbl = response[i].label + ' ' + $.i18n.prop('_list');
                                } else {
                                    lbl = response[i].label;
                                }
                                break;
                            case 'total':
                                lbl = response[i].label + ' ' + $.i18n.prop('_total');
                                break;
                        }
                    }
                } else {
                    if (codingSystem == 'elements') {
                        lbl = response[i].label + ' (' + response[i].unit + ')';
                    } else {
                        lbl = response[i].label;
                    }
                }
                select += '<option class="grid-element" data-faostat="' + response[i].code + '" data-label="' + lbl + '" data-type="' + response[i].type + '">' + lbl + '</option>';
            }
            select += '</select>';
            document.getElementById(gridCode).innerHTML = select;

        },
        getCodingSystemFromGridCode: function(gridCode) {
            return gridCode.substring("grid".length);
        }
        ,
        enableUI: function(enabled) {
            $(".faostat-download-tab").jqxTabs({
                disabled: enabled
            });
            $(".faostat-download-button").jqxButton({
                disabled: enabled
            });
        }
    };

}