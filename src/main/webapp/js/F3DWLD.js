var F3DWLD = (function() {

    var CONFIG = {
        prefix              :   'http://localhost:8080/faostat-download-js/',
        CPINotes_url        :   'http://localhost:8080/wds/rest/procedures/cpinotes',
        ODA_url             :   'http://localhost:8080/wds/rest/procedures/oda',
        data_url            :   'http://localhost:8080/wds/rest',
//        codes_url           :   'http://localhost:8080/bletchley/rest',
        codes_url           :   'http://localhost:8080/wds/rest/procedures/',
        configurationURL    :   'config/faostat-download-configuration.json',
        dbPrefix            :   'FAOSTAT_',
        dsdURL              :   'http://faostat3.fao.org/wds/rest/procedures/listboxes/faostatproddiss/',
        theme               :   'faostat',
        tradeMatrices       :   ['FT', 'TM'],
        lang                :   'E',
        lang_ISO2           :   'en',
        outputLimit         :   50,
        widthTable          :   '100%',
        baseurl             :   null,
        datasource          :   null,
        tablelimit          :   null,
        groupCode           :   null,
        domainCode          :   null,
        dsd                 :   null,
        wdsPayload          :   {},
        tabsSelection       :   {},
        selectedValues      :   {}
    };

    function collectAndQueryWDS(limitOutput) {

        /* Collect parameters. */
        getTabSelection();
        getOptions(limitOutput);
        getGridsValues();

        /* Collect codes for 'list' items, then create the JSON payload. */
        collectListCodes();
    };

    function collectListCodes() {

        var doTheCall = callListCodesREST();

        if (doTheCall) {

            var countries = JSON.stringify(F3DWLD.CONFIG.selectedValues.countries);
            var countries_dst = JSON.stringify(F3DWLD.CONFIG.selectedValues.countries_dst);
            var items = JSON.stringify(F3DWLD.CONFIG.selectedValues.items);

            var backup_countries = new Array();
            var backup_countries_dst = new Array();
            var backup_items = new Array();

            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.countries.length ; i++)
                if (F3DWLD.CONFIG.selectedValues.countries.type == 'total')
                    backup_countries.push(F3DWLD.CONFIG.selectedValues.countries[i]);

//            if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
//                for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.countries_dst.length ; i++)
//                    if (F3DWLD.CONFIG.selectedValues.countries_dst.type == 'total')
//                        backup_countries_dst.push(F3DWLD.CONFIG.selectedValues.countries_dst[i]);
//            }

            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.items.length ; i++)
                if (F3DWLD.CONFIG.selectedValues.items[i].type == 'total')
                    backup_items.push(F3DWLD.CONFIG.selectedValues.items[i]);

            var data = {};
            data.datasource = F3DWLD.CONFIG.datasource;
            data.domainCode = F3DWLD.CONFIG.domainCode;
            data.language = F3DWLD.CONFIG.lang;
            data.countries_1 = countries;
            data.countries_2 = countries_dst;
            data.items = items;

            $.ajax({

                type    :   'POST',
                url     :   F3DWLD.CONFIG.codes_url + '/codes/listForTradeMatrix/post',
                data    :   data,

                success : function(response) {

                    var codes = response;
                    if (typeof(codes) == 'string')
                        codes = $.parseJSON(response);

                    if (codes != null && codes[0].length > 0) {
                        F3DWLD.CONFIG.selectedValues.countries = codes[0];
                    }

                    if (codes != null && codes[1].length > 0) {
                        F3DWLD.CONFIG.selectedValues.items = codes[1];
                    }

                    if (codes != null && codes[2].length > 0) {
                        F3DWLD.CONFIG.selectedValues.countries_dst = codes[2];
                    }

                    if (codes != null) {

                        /* Use list codes or keep the current ones. */
                        if (codes != null && codes[0].length > 0)
                            F3DWLD.CONFIG.selectedValues.countries = codes[0];

                        /* Use list codes or keep the current ones. */
                        if (codes != null && codes[1].length > 0)
                            F3DWLD.CONFIG.selectedValues.items = codes[1];

                        /* Use list codes or keep the current ones. */
//                        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
//                            if (codes != null && codes[2].length > 0)
//                                F3DWLD.CONFIG.selectedValues.countries_dst = codes[2];
//                        }

                    }

                    for (var z = 0 ; z < backup_items.length ; z++)
                        F3DWLD.CONFIG.selectedValues.items.push(backup_items[z]);

                    for (var z = 0 ; z < backup_countries.length ; z++)
                        F3DWLD.CONFIG.selectedValues.countries.push(backup_countries[z]);

//                    if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
//                        for (var z = 0 ; z < backup_countries_dst.length ; z++)
//                            F3DWLD.CONFIG.selectedValues.countries_dst.push(backup_countries_dst[z]);
//                    }

                    createJSON();
                    createTable();

                },

                error : function(err, b, c) {

                }

            });

        } else {
            createJSON();
            createTable();
        }

    };

    function callListCodesREST() {

        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.countries.length ; i++)
            if (F3DWLD.CONFIG.selectedValues.countries[i].type == 'list')
                return true;

//        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
//            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.countries_dst.length ; i++)
//                if (F3DWLD.CONFIG.selectedValues.countries_dst[i].type == 'list')
//                    return true;
//        }

        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.items.length ; i++)
            if (F3DWLD.CONFIG.selectedValues.items[i].type == 'list')
                return true;

        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.itemsAggregated.length ; i++)
            if (F3DWLD.CONFIG.selectedValues.itemsAggregated[i].type == 'list')
                return true;

        return false;

    };

    function createJSON() {
        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
            createJSONTradeMatrix();
        } else {
            createJSONStandard();
        }
    };

    function createJSONTradeMatrix() {

        if (F3DWLD.CONFIG.wdsPayload.json == null)
            F3DWLD.CONFIG.wdsPayload.json = {};

        F3DWLD.CONFIG.wdsPayload.json["selects"] = [{"aggregation":"NONE", "column": "DOM.DomainName" + FAOSTATDownload.language, "alias": $.i18n.prop('_export_domain')}];

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"A1.AreaName" + FAOSTATDownload.language, "alias": $.i18n.prop('_export_country_1')};
        if (F3DWLD.CONFIG.wdsPayload.showCodes)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.ReporterAreaCode", "alias": $.i18n.prop('_export_country_code_1').replace(' ', '_')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"A2.AreaName" + FAOSTATDownload.language, "alias": $.i18n.prop('_export_country_2')};
        if (F3DWLD.CONFIG.wdsPayload.showCodes)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.PartnerAreaCode", "alias": $.i18n.prop('_export_country_code_2').replace(' ', '_')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"I.ItemName" + F3DWLD.CONFIG.lang, "alias": $.i18n.prop('_export_item')};

        if (F3DWLD.CONFIG.wdsPayload.showCodes)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.ItemCode", "alias": $.i18n.prop('_export_item_code').replace(' ', '_')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"E.ElementUnitName" + F3DWLD.CONFIG.lang, "alias": $.i18n.prop('_export_element')};

        if (F3DWLD.CONFIG.wdsPayload.showCodes)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.ElementCode", "alias": $.i18n.prop('_export_element_code').replace(' ', '_')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.Year", "alias": $.i18n.prop('_export_year')};

        if (F3DWLD.CONFIG.wdsPayload.showUnits)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"E.UnitName" + F3DWLD.CONFIG.lang, "alias": $.i18n.prop('_export_unit')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.Value", "alias": $.i18n.prop('_export_value')};

        if (F3DWLD.CONFIG.wdsPayload.showFlags)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.Flag", "alias": $.i18n.prop('_export_flag')};

        F3DWLD.CONFIG.wdsPayload.valueColumnIndex = getValueColumnIndex(F3DWLD.CONFIG.wdsPayload.json);

        F3DWLD.CONFIG.wdsPayload.json["froms"] = [{"column":"TradeMatrix", "alias":"D"},
            {"column":"Item", "alias":"I"},
            {"column":"Element", "alias":"E"},
            {"column":"Area", "alias":"A1"},
            {"column":"Area", "alias":"A2"},
            {"column":"Domain", "alias":"DOM"}];

        var elements = collectElements();
        var countries = collectCountries();
        var countries_dst = collectCountries_dst();
        var items = collectItems();
        var years = collectYears();

        F3DWLD.CONFIG.wdsPayload.json["wheres"] = [{"datatype": "TEXT", "column": "D.DomainCode", "operator": "=", "value": F3DWLD.CONFIG.domainCode, "ins": []},
            {"datatype": "TEXT", "column": "DOM.DomainCode", "operator": "=","value": F3DWLD.CONFIG.domainCode, "ins": []},
            {"datatype": "DATE", "column": "D.ReporterAreaCode", "operator": "=","value": "A1.AreaCode", "ins": []},
            {"datatype": "DATE", "column": "D.PartnerAreaCode", "operator": "=","value": "A2.AreaCode", "ins": []},
            {"datatype": "DATE", "column": "D.DomainCode", "operator": "=","value": "DOM.DomainCode", "ins": []},
            {"datatype": "DATE", "column": "D.ItemCode", "operator": "=","value": "I.ItemCode", "ins": []},
            {"datatype": "DATE", "column": "D.ElementCode", "operator": "=","value": "E.ElementCode", "ins": []}];

        if (elements != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype": "TEXT", "column": "D.ElementListCode", "operator": "IN", "value": "E.ElementListCode", "ins": elements};
        if (countries != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype":"TEXT","column":"D.ReporterAreaCode","operator":"IN","value":"A1.AreaCode","ins": countries};
        if (countries_dst != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype":"TEXT","column":"D.PartnerAreaCode","operator":"IN","value":"A2.AreaCode","ins": countries_dst};
        if (items != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype":"TEXT","column":"D.ItemCode","operator":"IN","value":"I.ItemCode","ins": items};
        if (years != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype":"TEXT","column":"D.Year","operator":"IN","value":"D.Year","ins": years};

        F3DWLD.CONFIG.wdsPayload.json["orderBys"] = [{"column":"D.Year", "direction":"DESC"},
            {"column":"A1.AreaName" + F3DWLD.CONFIG.lang, "direction":"ASC"},
            {"column":"A2.AreaName" + F3DWLD.CONFIG.lang, "direction":"ASC"},
            {"column":"I.ItemName" + F3DWLD.CONFIG.lang, "direction":"ASC"},
            {"column":"E.ElementUnitName" + F3DWLD.CONFIG.lang, "direction":"ASC"}];

        if (F3DWLD.CONFIG.wdsPayload.limit) {
            F3DWLD.CONFIG.wdsPayload.json["limit"] = FAOSTATDownload.tablelimit;
        } else {
            F3DWLD.CONFIG.wdsPayload.json["limit"] = null;
        }

        F3DWLD.CONFIG.wdsPayload.json["query"] = null;
        F3DWLD.CONFIG.wdsPayload.json["frequency"] = "NONE";
        F3DWLD.CONFIG.wdsPayload.cssFilename = '';
        getValueColumnIndex(F3DWLD.CONFIG.wdsPayload.json);

    };

    function createJSONStandard() {

        if (F3DWLD.CONFIG.wdsPayload.json == null)
            F3DWLD.CONFIG.wdsPayload.json = {};

        F3DWLD.CONFIG.wdsPayload.json["selects"] = [{"aggregation":"NONE", "column": "DOM.DomainName" + FAOSTATDownload.language, "alias": $.i18n.prop('_export_domain')}];
        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"A.AreaName" + FAOSTATDownload.language, "alias": $.i18n.prop('_export_country')};
        if (F3DWLD.CONFIG.wdsPayload.showCodes)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.AreaCode", "alias": $.i18n.prop('_export_country_code').replace(' ', '_')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"I.ItemName" + F3DWLD.CONFIG.lang, "alias": $.i18n.prop('_export_item')};

        if (F3DWLD.CONFIG.wdsPayload.showCodes)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.ItemCode", "alias": $.i18n.prop('_export_item_code').replace(' ', '_')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"E.ElementUnitName" + F3DWLD.CONFIG.lang, "alias": $.i18n.prop('_export_element')};

        if (F3DWLD.CONFIG.wdsPayload.showCodes)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.ElementCode", "alias": $.i18n.prop('_export_element_code').replace(' ', '_')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.Year", "alias": $.i18n.prop('_export_year')};

        if (F3DWLD.CONFIG.wdsPayload.showUnits)
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"E.UnitName" + F3DWLD.CONFIG.lang, "alias": $.i18n.prop('_export_unit')};

        F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation":"NONE", "column":"D.Value", "alias": $.i18n.prop('_export_value')};

        if (F3DWLD.CONFIG.wdsPayload.showFlags) {
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation": "NONE", "column": "D.Flag", "alias": $.i18n.prop('_export_flag')};
            F3DWLD.CONFIG.wdsPayload.json["selects"][F3DWLD.CONFIG.wdsPayload.json["selects"].length] = {"aggregation": "NONE", "column": "F.FlagDescription" + F3DWLD.CONFIG.lang, "alias": $.i18n.prop('_export_flag_description')};
        }

        F3DWLD.CONFIG.wdsPayload.valueColumnIndex = getValueColumnIndex(F3DWLD.CONFIG.wdsPayload.json);

        F3DWLD.CONFIG.wdsPayload.json["froms"] = [{"column":"Data", "alias":"D"},
            {"column":"Item", "alias":"I"},
            {"column":"Element", "alias":"E"},
            {"column":"Area", "alias":"A"},
            {"column":"Domain", "alias":"DOM"},
            {"column":"Flag", "alias":"F"}];

        var elements = collectElements();
        var countries = collectCountries();
        var items = collectItems();
        var years = collectYears();

        F3DWLD.CONFIG.wdsPayload.json["wheres"] = [{"datatype": "TEXT", "column": "D.DomainCode", "operator": "=", "value": F3DWLD.CONFIG.domainCode, "ins": []},
            {"datatype": "TEXT", "column": "DOM.DomainCode", "operator": "=","value": F3DWLD.CONFIG.domainCode, "ins": []},
            {"datatype": "DATE", "column": "D.AreaCode", "operator": "=","value": "A.AreaCode", "ins": []},
            {"datatype": "DATE", "column": "D.DomainCode", "operator": "=","value": "DOM.DomainCode", "ins": []},
            {"datatype": "DATE", "column": "D.ItemCode", "operator": "=","value": "I.ItemCode", "ins": []},
            {"datatype": "DATE", "column": "D.ElementCode", "operator": "=","value": "E.ElementCode", "ins": []},
            {"datatype": "DATE", "column": "D.Flag", "operator": "=","value": "F.Flag", "ins": []}];

        if (elements != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype": "TEXT", "column": "D.ElementListCode", "operator": "IN", "value": "E.ElementListCode", "ins": elements};
        if (countries != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype":"TEXT","column":"D.AreaCode","operator":"IN","value":"A.AreaCode","ins": countries};
        if (items != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype":"TEXT","column":"D.ItemCode","operator":"IN","value":"I.ItemCode","ins": items};
        if (years != null)
            F3DWLD.CONFIG.wdsPayload.json["wheres"][F3DWLD.CONFIG.wdsPayload.json["wheres"].length] = {"datatype":"TEXT","column":"D.Year","operator":"IN","value":"D.Year","ins": years};

        F3DWLD.CONFIG.wdsPayload.json["orderBys"] = [{"column":"D.Year", "direction":"DESC"},
            {"column":"A.AreaName" + F3DWLD.CONFIG.lang, "direction":"ASC"},
            {"column":"I.ItemName" + F3DWLD.CONFIG.lang, "direction":"ASC"},
            {"column":"E.ElementUnitName" + F3DWLD.CONFIG.lang, "direction":"ASC"}];

        if (F3DWLD.CONFIG.wdsPayload.limit) {
            F3DWLD.CONFIG.wdsPayload.json["limit"] = FAOSTATDownload.tablelimit;
        } else {
            F3DWLD.CONFIG.wdsPayload.json["limit"] = null;
        }

        F3DWLD.CONFIG.wdsPayload.json["query"] = null;
        F3DWLD.CONFIG.wdsPayload.json["frequency"] = "NONE";
        F3DWLD.CONFIG.wdsPayload.cssFilename = '';
        getValueColumnIndex(F3DWLD.CONFIG.wdsPayload.json);

    };

    function createTable() {

        var data = {};

        data.datasource = F3DWLD.CONFIG.wdsPayload.datasource;
        data.thousandSeparator = F3DWLD.CONFIG.wdsPayload.thousandSeparator;
        data.decimalSeparator = F3DWLD.CONFIG.wdsPayload.decimalSeparator;
        data.decimalNumbers = F3DWLD.CONFIG.wdsPayload.decimalNumbers;
        data.json = JSON.stringify(F3DWLD.CONFIG.wdsPayload.json);
        data.cssFilename = F3DWLD.CONFIG.wdsPayload.cssFilename;
        data.valueIndex = F3DWLD.CONFIG.wdsPayload.valueColumnIndex;

        var outputType = 'html';
        if (F3DWLD.CONFIG.wdsPayload.limit == null || F3DWLD.CONFIG.wdsPayload.limit == false)
            outputType = 'excel';

        /** Stream the Excel through the hidden form */
        $('#datasource_WQ').val(F3DWLD.CONFIG.wdsPayload.datasource);
        $('#thousandSeparator_WQ').val(F3DWLD.CONFIG.wdsPayload.thousandSeparator);
        $('#decimalSeparator_WQ').val(F3DWLD.CONFIG.wdsPayload.decimalSeparator);
        $('#decimalNumbers_WQ').val(F3DWLD.CONFIG.wdsPayload.decimalNumbers);
        $('#json_WQ').val(JSON.stringify(F3DWLD.CONFIG.wdsPayload.json));
        $('#cssFilename_WQ').val(F3DWLD.CONFIG.wdsPayload.cssFilename);
        $('#valueIndex_WQ').val(F3DWLD.CONFIG.wdsPayload.valueIndex);

//        _this = this;

        /** Show the table */
        if (F3DWLD.CONFIG.wdsPayload.limit != null && F3DWLD.CONFIG.wdsPayload.limit == true) {

            $.ajax({

                type    :   'POST',
                url     :   F3DWLD.CONFIG.data_url + '/table/' + outputType,
                data    :   data,

                success : function(response) {

                    $('#output_area').empty();
                    $('#output_area').append('<div class="single-result-table-title">Please note: the preview is limited to ' + F3DWLD.CONFIG.tablelimit + ' rows.</div>');
                    $('#output_area').append('<div style="overflow: auto; padding-top:10px; width:'+ F3DWLD.CONFIG.widthTable +'">' + response + '</div>');

                    if (F3DWLD.CONFIG.domainCode == 'CP') {
                        getCPINotesByProcedures();
                    }

                    $('#OLAP_IFRAME').css('display', 'none');
                    $('#output_area').css('margin', '0');

                    /* Track on Google Analytics */
                    if (outputType == 'excel') {
                        STATS.exportTableDownloadStandard(F3DWLD.CONFIG.domainCode);
                    } else {
                        STATS.showTableDownloadStandard();
                    }

//                    showCPINotes();

                },

                error : function(err, b, c) {

                }

            });

        }

        /** Download the Excel */
        else {

            /* Track on Google Analytics */
            STATS.exportTableDownloadStandard(F3DWLD.CONFIG.domainCode);

            $.getJSON(F3DWLD.CONFIG.prefix + 'config/quotes.json', function (data) {

                $('#quote_WQ').val(data[F3DWLD.CONFIG.lang + '_quote']);

                if (F3DWLD.CONFIG.domainCode == 'AA' || F3DWLD.CONFIG.domainCode == 'AR' || F3DWLD.CONFIG.domainCode == 'AE') {
                    $('#title_WQ').val(data[F3DWLD.CONFIG.domainCode][F3DWLD.CONFIG.lang + '_title']);
                    $('#subtitle_WQ').val(data[F3DWLD.CONFIG.domainCode][F3DWLD.CONFIG.lang + '_subtitle']);
                } else {
                    $('#title_WQ').val('');
                    $('#subtitle_WQ').val('');
                }

                document.excelFormWithQuotes.submit();

            });

        }

    };

    function getCPINotesByProcedures() {

        var s = '<H1>CPI Notes</H1>';
        s += '<br>';

        var data = {};
        var p = {};
        p.datasource = F3DWLD.CONFIG.datasource;
        p.lang = F3DWLD.CONFIG.lang;
        p.areaCodes = collectCountries();
        p.yearCodes = collectYears();
        p.itemCodes = collectItems();
        data.payload = JSON.stringify(p);

        $.ajax({

            type : 'POST',
            url  : F3DWLD.CONFIG.CPINotes_url,
            data : data,

            success : function(response) {

                var json = response;
                if (typeof(json) == 'string')
                    json = $.parseJSON(response);

                s += '<table class="dataTable">';
                s += '<thead>';
                s += '<tr>';
                s += '<th>Country</th><th>Year</th><th>Item</th><th>Note</th>';
                s += '</tr>';
                s += '</thead>';
                s += '<tbody>';
                for (var i = 0 ; i < json.length ; i++) {
                    s += '<tr>';
                    for (var j = 0 ; j < json[i].length ; j++)
                        s += '<td>' + json[i][j] + '</td>';
                    s += '</tr>';
                }
                s += '</tbody>';
                s += '</table>';

                $('#output_area').append('<br>');
                $('#output_area').append(s);

            },

            error : function(err, b, c) {

            }

        });

        return s;
    };

    function showCPINotes() {

        if (F3DWLD.CONFIG.domainCode == 'CP') {

            var data = {};
            data.datasource = F3DWLD.CONFIG.datasource;
            data.lang = F3DWLD.CONFIG.lang;

            var json = {};
            json.lang = F3DWLD.CONFIG.lang;

            var countries = '@areaList=N\'';
            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.countries.length ; i++) {
                countries += F3DWLD.CONFIG.selectedValues.countries[i].code;
                if (i < F3DWLD.CONFIG.selectedValues.countries.length - 1)
                    countries += ',';
            }
            countries += '\'';
            json.countries = countries;

            var items = '@item=N\'';
            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.items.length ; i++) {
                items += F3DWLD.CONFIG.selectedValues.items[i].code;
                if (i < F3DWLD.CONFIG.selectedValues.items.length - 1)
                    items += ',';
            }
            items += '\'';
            json.items = items;

            var years = '@yearList=N\'';
            for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.years.length ; i++) {
                years += F3DWLD.CONFIG.selectedValues.years[i].code;
                if (i < F3DWLD.CONFIG.selectedValues.years.length - 1)
                    years += ',';
            }
            years += '\'';
            json.years = years;

            data.json = JSON.stringify(json);

            $.ajax({

                type    :   'POST',
                url     :   F3DWLD.CONFIG.data_url + '/notes/cpinotes',
                data    :   data,

                success : function(response) {

                    var html = '<br>';
                    html += '<input style="margin-left: 22px;" type="button" id="cpi_notes_button" onclick="CPI.showCPITableNotes();" value="Show / Hide CPI Notes"/>';
                    html += '<br><br>';
                    html += '<div id="cpi_notes_container" style="display: none;">';
                    html += response;
                    html += '</div>';

                    $('#cpi_notes_area').css('display', 'inline');
                    document.getElementById('cpi_notes_area').innerHTML = html;

                    $("#cpi_notes_button").jqxButton({
                        width: '150',
                        theme: F3DWLD.CONFIG.theme
                    });

                },

                error : function(err, b, c) {

                }

            });

        }

    };

    function collectItems() {
        var ins = new Array();
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.items.length ; i++) {
            if (F3DWLD.CONFIG.selectedValues.items[i].code == 'all') {
                return null;
            } else {
                ins.push(F3DWLD.CONFIG.selectedValues.items[i].code);
            }
        }
        return ins;
    };

    function collectElements() {
        var ins = new Array();
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.elements.length ; i++) {
            if (F3DWLD.CONFIG.selectedValues.elements[i].code == 'all') {
                return null;
            } else {
                ins.push(F3DWLD.CONFIG.selectedValues.elements[i].code);
            }
        }
        return ins;
    };

    function collectCountries() {
        var ins = new Array();
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.countries.length ; i++) {
            if (F3DWLD.CONFIG.selectedValues.countries[i].code == 'all') {
                return null;
            } else {
                ins.push(F3DWLD.CONFIG.selectedValues.countries[i].code);
            }
        }
        return ins;
    };

    function collectCountries_dst() {
        var ins = new Array();
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.countries_dst.length ; i++) {
            if (F3DWLD.CONFIG.selectedValues.countries_dst[i].code == 'all') {
                return null;
            } else {
                ins.push(F3DWLD.CONFIG.selectedValues.countries_dst[i].code);
            }
        }
        return ins;
    };

    function collectYears() {
        var ins = new Array();
        for (var i = 0 ; i < F3DWLD.CONFIG.selectedValues.years.length ; i++) {
            if (F3DWLD.CONFIG.selectedValues.years[i].code == 'all') {
                return null;
            } else {
                ins.push(F3DWLD.CONFIG.selectedValues.years[i].code);
            }
        }
        return ins;
    };

    function getValueColumnIndex(json) {
        for (var i = 0 ; i < json.selects.length ; i++)
            if (json.selects[i].column == 'D.Value')
                return i;
    };

    function getGridsValues() {

        /* Init buffers. */
        F3DWLD.CONFIG.selectedValues.countries = [];
        F3DWLD.CONFIG.selectedValues.countries_dst = [];
        F3DWLD.CONFIG.selectedValues.elements = [];
        F3DWLD.CONFIG.selectedValues.items = [];
        F3DWLD.CONFIG.selectedValues.itemsAggregated = [];
        F3DWLD.CONFIG.selectedValues.years = [];

        /* Init variables. */
        var countryGridName = null;
        var countryGridName_dst = null;
        var itemsGridName = null;
        switch (F3DWLD.CONFIG.tabsSelection.countries) {
            case 0 : countryGridName = 'grid_usp_GetAreaList1'; break;
            case 1 : countryGridName = 'grid_usp_GetAreaList2'; break;
            case 2 : countryGridName = 'grid_usp_GetAreaList3'; break;
        }
        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
            switch (F3DWLD.CONFIG.tabsSelection.countries_dst) {
                case 0 : countryGridName_dst = 'grid_usp_GetAreaList1'; break;
                case 1 : countryGridName_dst = 'grid_usp_GetAreaList2'; break;
                case 2 : countryGridName_dst = 'grid_usp_GetAreaList3'; break;
            }
        }
        switch (F3DWLD.CONFIG.tabsSelection.items) {
            case 0 : itemsGridName = 'grid_usp_GetItemList1'; break;
            case 1 : itemsGridName = 'grid_usp_GetItemList2'; break;
        }

        getGridValues(countryGridName, F3DWLD.CONFIG.selectedValues.countries);
        getGridValues('grid_usp_GetElementList', F3DWLD.CONFIG.selectedValues.elements);
        getGridValues(itemsGridName, F3DWLD.CONFIG.selectedValues.items);
        getGridValues(itemsGridName, F3DWLD.CONFIG.selectedValues.itemsAggregated);
        getGridValues('grid_usp_GetYearList', F3DWLD.CONFIG.selectedValues.years);
//        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1)
//            getGridValues(countryGridName_dst, F3DWLD.CONFIG.selectedValues.countries_dst);

    };

    function getGridValues(tableCode, map) {
        $('#' + tableCode).find('option:selected').each(function(k, v) {
            console.log(tableCode);
            var tmp = {};
            tmp.code = $(v).data('faostat');
            tmp.label = $(v).data('label');
            tmp.type = $(v).data('type');
            console.log(tmp);
            map.push(tmp);
        });
    };

    function getOptions(limitOutput) {
        F3DWLD.CONFIG.wdsPayload.showFlags = $('#options_show_flags').val();
        F3DWLD.CONFIG.wdsPayload.showCodes = $('#options_show_codes').val();
        F3DWLD.CONFIG.wdsPayload.showUnits = $('#options_show_units').val();
        F3DWLD.CONFIG.wdsPayload.showNullValues = $('#options_show_null_values').val();
        F3DWLD.CONFIG.wdsPayload.limit = limitOutput;
        F3DWLD.CONFIG.wdsPayload.datasource = F3DWLD.CONFIG.datasource;
        F3DWLD.CONFIG.wdsPayload.thousandSeparator = $('#options_thousand_separator').jqxDropDownList('getSelectedItem').value;
        F3DWLD.CONFIG.wdsPayload.decimalSeparator = $('#options_decimal_separator').jqxDropDownList('getSelectedItem').value;
        F3DWLD.CONFIG.wdsPayload.decimalNumbers = $('#options_decimal_numbers').jqxDropDownList('getSelectedItem').value;
    };

    function getTabSelection() {
        F3DWLD.CONFIG.tabsSelection.countries = $('#tab_ListBox1').jqxTabs('selectedItem');
        F3DWLD.CONFIG.tabsSelection.elements = $('#tab_ListBox3').jqxTabs('selectedItem');
        F3DWLD.CONFIG.tabsSelection.items = $('#tab_ListBox2').jqxTabs('selectedItem');
        if (F3DWLD.CONFIG.domainCode == 'GY')
            F3DWLD.CONFIG.tabsSelection.items = 1;
        F3DWLD.CONFIG.tabsSelection.years = $('#tab_ListBox4').jqxTabs('selectedItem');
//        if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1)
//            F3DWLD.CONFIG.tabsSelection.countries_dst = $('#tabCountries_dst').jqxTabs('selectedItem');
    };

    function buildF3DWLD(groupCode, domainCode, language) {

        /* Upgrade the URL. */
        var domainCodeURL = (domainCode == 'null') ? '*' : domainCode;
        CORE.upgradeURL('download', groupCode, domainCodeURL, language);

        $.getJSON(CONFIG.prefix + CONFIG.configurationURL, function (data) {

            F3DWLD.CONFIG.baseurl      =   data.baseurl;
            F3DWLD.CONFIG.datasource   =   data.datasource;
            F3DWLD.CONFIG.tablelimit   =   data.tablelimit;
            F3DWLD.CONFIG.groupCode    =   groupCode;
            F3DWLD.CONFIG.domainCode   =   domainCode;
            F3DWLD.CONFIG.lang         =   language;

            switch (language) {
                case 'FR' :
                    F3DWLD.CONFIG.lang = 'F';
                    F3DWLD.CONFIG.lang_ISO2 = 'fr';
                    break;
                case 'F' :
                    F3DWLD.CONFIG.lang = 'F';
                    F3DWLD.CONFIG.lang_ISO2 = 'fr';
                    break;
                case 'ES' :
                    F3DWLD.CONFIG.lang = 'S';
                    F3DWLD.CONFIG.lang_ISO2 = 'es';
                    break;
                case 'S' :
                    F3DWLD.CONFIG.lang = 'S';
                    F3DWLD.CONFIG.lang_ISO2 = 'es';
                    break;
                case 'EN' :
                    F3DWLD.CONFIG.lang = 'E';
                    F3DWLD.CONFIG.lang_ISO2 = 'en';
                    break;
                case 'E' :
                    F3DWLD.CONFIG.lang = 'E';
                    F3DWLD.CONFIG.lang_ISO2 = 'en';
                    break;
            }

            $.i18n.properties({
                name        :   'I18N',
                path        :   F3DWLD.CONFIG.prefix + 'I18N/',
                mode        :   'both',
                language    :   F3DWLD.CONFIG.lang_ISO2
            });

            loadDSD();

        })

    };

    function loadDSD() {

        $.ajax({

            type: 'GET',
            url: F3DWLD.CONFIG.dsdURL + F3DWLD.CONFIG.domainCode + '/' + F3DWLD.CONFIG.lang,
            dataType: 'json',

            /* Load data from the DB */
            success : function(response) {

                /* Convert the response in JSON, if needed */
                var json = response;
                if (typeof json == 'string')
                    json = $.parseJSON(response);
                F3DWLD.CONFIG.dsd = arrayToObject(json);

                /* Build UI structure. */
                $('#testinline').empty();
                if(F3DWLD.CONFIG.domainCode == 'FB') {
                    document.getElementById('trWizardMode').className = 'visi2';
                    document.getElementById('OLAPTD').className = 'invi';
                    document.getElementById('mainTD').className = 'invi';
                    document.getElementById('testinline').className = 'invi' ;
                    FAOSTATDownload.showFB();
                } else {
                    document.getElementById('OLAPTD').className = 'visi2';
                    document.getElementById('mainTD').className = 'invi';
                    buildUIStructure();
                }

            },

            /* Error */
            error : function(err, b, c) {
                alert('Domain code ' + F3DWLD.CONFIG.domainCode + ' has no DSD.');
            }

        });

    };

    function arrayToObject(a) {
        var tmp = {};
        var names  = [];
        var counters  = [];
        for (var i = 0 ; i < a.length ; i++) {
            if ($.inArray(a[i][0], names) < 0) {
                names.push(a[i][0]);
                counters[names.length - 1] = a[i][4];
                tmp[a[i][0]] = {};
            }
        }
        for (var i = 0 ; i < a.length ; i++) {
            tmp[a[i][0]][a[i][1]] = {};
            tmp[a[i][0]][a[i][1]].tabGroup = a[i][0];
            tmp[a[i][0]][a[i][1]].tabIndex = a[i][2];
            tmp[a[i][0]][a[i][1]].tabName = a[i][1];
            tmp[a[i][0]][a[i][1]].procedure = a[i][3];
        }
        return tmp;
    }

    function buildUIStructure() {
        $('#mainTD').hide();
        $('#OLAPTD').show();
        var s = '';
        s += '<div class="standard-title">' + $.i18n.prop('_selectors') + '</div>';
        s += '<hr class="standard-hr">';
        var columns = [];
        var counter = 0;
        for (var i = 0 ; i < Object.keys(F3DWLD.CONFIG.dsd).length ; i++) {
            columns.push(F3DWLD.CONFIG.dsd[Object.keys(F3DWLD.CONFIG.dsd)[i]]);
            if (columns.length % 2 == 0) {
                s += buildSelectorsRow(columns);
                columns = [];
            }
        }
        s += '<div class="spacer-one"></div>';
        s += buildOptions();
        s += buildButtons();
        s += buildOLAP();
        s += buildOutputArea();
        document.getElementById('listArea').innerHTML = s;
        enhanceUIStructure();
    };

    function buildSelectorsRow(columns) {
        var s = '';
        s += '<div class="download-selector">';
        for (var i = 0 ; i < columns.length ; i++)
            s += buildSelector(columns[i]);
        s += '</div>';
        return s;
    };

    function buildSelector(column) {

        var s = '';

        /** Box */
        s += '<div class="obj-box-download">';

        /** Tab Panel */
        s += '<div class="faostat-download-tab" id="tab_' + column[Object.keys(column)[0]].tabGroup + '">';

        /** Tabs */
        s += '<ul>';
        for (var key in column)
            s += '<li id="li_' + column[key].procedure + '">' + key + '</li>';
        s += '</ul>';

        /** Grids */
        for (var key in column)
            s += ' <div class="faostat-download-list" id="grid_' + column[key].procedure + '"></div>';
        s += '</div>';

        /** Select All */
        s += '<div class="download-selection-buttons">';
        s += '<a onclick="F3DWLD.selectAll(\'grid_' + column[Object.keys(column)[0]].procedure + '\', \'' + true + '\');" id="buttonSelectAll_' + column[Object.keys(column)[0]].procedure + '" class="btn">';
        s += '<div class="btn-select-all-icon btnLeftIcon"></div>';
        s += '<div id="buttonSelectAll_' + column[Object.keys(column)[0]].procedure + '-text"></div>';
        s += '</a>';

        /** De-select All */
        s += '<a onclick="F3DWLD.selectAll(\'grid_' + column[Object.keys(column)[0]].procedure + '\', \'' + false + '\');" id="buttonDeSelectAll_' + column[Object.keys(column)[0]].procedure + '" class="btn">';
        s += '<div class="btn-clear-all-icon btnLeftIcon"></div>';
        s += '<div id="buttonDeSelectAll_' + column[Object.keys(column)[0]].procedure + '-text"></div>';
        s += '</a>';

        /** Close DIV's */
        s += '</div>';
        s += '</div>';

        return s;

    };

    function buildOutputArea() {
        return '<div id="output_area"></div>';
    };

    function buildButtons() {
        var s = '';
        s += '<div id="output_buttons" style="display: block;">';
        s += '<div class="download-selection-buttons">';
        s += '<div class="single-result-buttons">';
        s += '<a class="btn" id="buttonViewTables">';
        s += '<div class="btn-preview-icon btnLeftIcon"></div>';
        s += '<div class="btnText" id="buttonViewTables-text">' + $.i18n.prop('_preview') + '</div>';
        s += '</a>';
        s += '<a style="display:none" class="btn" id="buttonExportToCSV">';
        s += '<div class="btn-export-icon btnLeftIcon"></div>';
        s += '<div class="btnText" id="buttonExportToCSV-text">' + $.i18n.prop('_download') + '</div>';
        s += '</a>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        s += '<div class="spacer-one"></div>';
        return s;
    };

    function enhanceUIStructure() {
        enhanceUITabs();
        enhanceUIOptions();
        enhanceUIButtons();
        enhanceUIGrids();
    };

    function enhanceUIGrids() {
        if (F3DWLD.CONFIG.domainCode == 'EA') {
            enhanceUIGrid('donors', 'gridCountries_donor');
            enhanceUIGrid('recipients', 'gridCountries_recipient');
            enhanceUIGrid('flows', 'gridFlows');
            enhanceUIGrid('purposes', 'gridPurposes');
            enhanceUIGrid('year', 'gridYears');
            enhanceUIGrid('elements', 'gridElements');
        } else {
//            if ($.inArray(F3DWLD.CONFIG.domainCode, F3DWLD.CONFIG.tradeMatrices) > -1) {
//                enhanceUIGrid('reporters', 'grid_usp_GetAreaList1');
//                enhanceUIGrid('reporters_geo_groups', 'grid_usp_GetAreaList2');
//                enhanceUIGrid('reporters_special_groups', 'grid_usp_GetAreaList3');
//                enhanceUIGrid('partners', 'gridCountries_dst');
//                enhanceUIGrid('partners_geo_groups', 'gridRegions_dst');
//                enhanceUIGrid('partners_special_groups', 'gridSpecialGroups_dst');
//            } else {
                enhanceUIGrid('countries', 'grid_usp_GetAreaList1');
                enhanceUIGrid('regions', 'grid_usp_GetAreaList2');
                enhanceUIGrid('specialgroups', 'grid_usp_GetAreaList3');
//            }
            enhanceUIGrid('items', 'grid_usp_GetItemList1');
            enhanceUIGrid('itemsaggregated', 'grid_usp_GetItemList2');
            enhanceUIGrid('elements', 'grid_usp_GetElementList');
            enhanceUIGrid('years', 'grid_usp_GetYearList');
        }
    };

    function enhanceUIGrid(codingSystem, gridCode) {

        if (F3DWLD.CONFIG.domainCode == 'EA') {

            $.ajax({

                type        : 'GET',
                url         : F3DWLD.CONFIG.ODA_url + '/' + codingSystem + '/' + F3DWLD.CONFIG.datasource + '/' + F3DWLD.CONFIG.lang,
                dataType    : 'json',

                success : function(response) {

                    var json = response;
                    if (typeof(json) == 'string')
                        json = $.parseJSON(response);

                    var select = '';
                    var lbl = null;
                    select += '<select id="' + gridCode + '_select" multiple="multiple" style="width: 100%; height: 100%; border: 0px;" onchange="myclean()">';
                    for (var i = 0 ; i < json.length ; i++) {
                        if (codingSystem == 'year' || codingSystem == 'elements')
                            lbl = json[i][1];
                        else
                            lbl = json[i][2];
                        var option = '<option class="grid-element" data-faostat="' + json[i][0] + '" data-label="' + lbl + '" data-type="' + json[i].type + '">' + lbl + '</option>';
                        select += option;
                    }
                    select += '</select>';
                    document.getElementById(gridCode).innerHTML = select;

                },

                error : function(err, b, c) {

                }

            });

        } else {

            $.ajax({

                url         :   F3DWLD.CONFIG.codes_url + codingSystem + '/' + F3DWLD.CONFIG.datasource + '/' + F3DWLD.CONFIG.domainCode + '/' + F3DWLD.CONFIG.lang,
                type        :   'GET',
                dataType    :   'json',

                success : function(response) {

                    var json = response;
                    if (typeof(json) == 'string')
                        json = $.parseJSON(response);

                    var select = '';
                    var lbl = null;
                    select += '<select id="' + gridCode + '_select" multiple="multiple" style="width: 100%; height: 100%; border: 0px;" onchange="myclean()">';

                    for (var i = 0 ; i < json.length ; i++) {

                        if (F3DWLD.CONFIG.domainCode != 'GY') {
                            switch (json[i][3]) {
                                case '>':
                                    lbl = json[i][1];
                                    break;
                                case '+':
                                    lbl = json[i][1];
                                    break;
                            }
                        } else {
                            switch (json[i][3]) {
                                case '>':
                                    if (codingSystem == 'regions' || codingSystem == 'specialgroups') {
                                        lbl = json[i][1];
                                    } else {
                                        lbl = json[i][1];
                                    }
                                    break;
                                case '+':
                                    lbl = json[i][1];
                                    break;
                            }
                        }
                        lbl = json[i][1];
                        var option = '<option class="grid-element" data-faostat="' + json[i][0] + '" data-label="' + lbl + '" data-type="' + json[i][3] + '">' + lbl + '</option>';
                        select += option;

                    }

                    select += '</select>';
                    document.getElementById(gridCode).innerHTML = select;

                },

                error : function(err,b,c) {
                    switch (codingSystem) {
                        case 'regions':
                            $('#tabCountries').jqxTabs('removeAt', 1);
                            $('#tabCountries_dst').jqxTabs('removeAt', 1);
                            break;
                        case 'specialgroups':
                            $('#tabCountries').jqxTabs('removeAt', 2);
                            $('#tabCountries_dst').jqxTabs('removeAt', 1);
                            break;
                        case 'itemsaggregated':
                            $('#tabItems').jqxTabs('removeAt', 1);
                            break;
                        case 'items':
                            if (F3DWLD.CONFIG.domainCode != 'FS')
                                $('#tabItems').jqxTabs('removeAt', 0);
                            break;
                    }
                }

            });

        }

    };

    function enhanceUIButtons() {

        /* Select/Deselect all buttons. */
        $('#buttonSelectAll_usp_GetAreaList1-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAll_usp_GetAreaList1-text').addClass('btnText');
        $('#buttonDeSelectAll_usp_GetAreaList1-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAll_usp_GetAreaList1-text').addClass('btnText');
        $('#buttonDeSelectAllCountries-text_dst').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllCountries-text_dst').addClass('btnText');
        $('#buttonSelectAll_usp_GetElementList-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAll_usp_GetElementList-text').addClass('btnText');
        $('#buttonDeSelectAll_usp_GetElementList-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAll_usp_GetElementList-text').addClass('btnText');
        $('#buttonSelectAll_usp_GetItemList1-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAll_usp_GetItemList1-text').addClass('btnText');
        $('#buttonDeSelectAll_usp_GetItemList1-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAll_usp_GetItemList1-text').addClass('btnText');
        $('#buttonSelectAll_usp_GetYearList-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAll_usp_GetYearList-text').addClass('btnText');
        $('#buttonDeSelectAll_usp_GetYearList-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAll_usp_GetYearList-text').addClass('btnText');

        $('#buttonSelectAllCountries-text_dst').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllCountries-text_dst').addClass('btnText');
        $('#buttonSelectAllFlows-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllFlows-text').addClass('btnText');
        $('#buttonDeSelectAllFlows-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllFlows-text').addClass('btnText');
        $('#buttonSelectAllPurposes-text').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllPurposes-text').addClass('btnText');
        $('#buttonDeSelectAllPurposes-text').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllPurposes-text').addClass('btnText');
        $('#buttonSelectAllCountries-text_donor').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllCountries-text_donor').addClass('btnText');
        $('#buttonDeSelectAllCountries-text_donor').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllCountries-text_donor').addClass('btnText');
        $('#buttonSelectAllCountries-text_recipient').append($.i18n.prop('_selectAll'));
        $('#buttonSelectAllCountries-text_recipient').addClass('btnText');
        $('#buttonDeSelectAllCountries-text_recipient').append($.i18n.prop('_clearSelection'));
        $('#buttonDeSelectAllCountries-text_recipient').addClass('btnText');

        /* Download button. */
        $('#buttonExportToCSV').bind('click', function() {
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
            if (item.value=="pivot") {
                STATS.exportPivotDownloadStandard();
                var footNotes="";
                if(typeof FAOSTATDownload.MyMetaData[F3DWLD.CONFIG.domainCode]!="undefined") {
                    footNotes = "<table><tr><td>" + FAOSTATDownload.MyMetaData[F3DWLD.CONFIG.domainCode]["E"] + "</td></tr></table>"
                }
                var myFFlag = "";
                if(FAOSTATOLAP.option.showFlags == 1) {
                    myFFlag = document.getElementById("myFlags").innerHTML;
                }
                FAOSTATOLAP.pivots[0].toExcel("<table><tr><td>FAOSTAT 2013</td></tr></table>", "<table><tr><td>" + myFFlag + "</td></tr></table>" + footNotes);
            } else {
                collectAndQueryWDS(false);
            }
        });

        /* Preview button. */
        $('#buttonViewTables').bind('click', function() {
            $('#buttonExportToCSV')[0].style.display="inline-block";
            $('#testinline').empty();
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
            if (item.value=="pivot") {
                getTabSelection();
                getOptions(false);
                getGridsValues();
                try {
                    document.getElementById('testinline').className="visi2";
                } catch(err) {

                }
                window.FAOSTATDownloadSelectorsClassic.falseclick();
            } else {
                collectAndQueryWDS(true);
                STATS.showTableDownloadStandard(F3DWLD.CONFIG.domainCode);
            }
        });

    };

    function enhanceUITabs() {
        $('.faostat-download-tab').jqxTabs({
            width: '352',
            height: '200',
            position: 'top',
            animationType: 'fade',
            selectionTracker: 'checked',
            theme: F3DWLD.CONFIG.theme
        });
    };

    function enhanceUIOptions() {
        var width = '140';
        $('.output_options').jqxExpander({
            width: '100%',
            theme: F3DWLD.CONFIG.theme
        });
        $('.output_options').jqxExpander('collapse');
        $('#options_output_type').jqxDropDownList({
            source: [{label: $.i18n.prop('_pivot'), value: 'pivot'},
                {label: $.i18n.prop('_table'), value: 'table'}],
            width: width,
            height: '25',
            selectedIndex: 0,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_output_type').on('change',function(event) {
            var item = $('#options_output_type').jqxDropDownList('getSelectedItem');
            if (item.value != 'pivot') {
                $('#buttonExportToCSV')[0].style.display="inline-block";
            } else {
                $('#buttonExportToCSV')[0].style.display="none";
            }
        });
        $('#options_thousand_separator').jqxDropDownList({
            source: [{label: $.i18n.prop('_comma'), value: ',', olap_value: 1},
                {label: $.i18n.prop('_period'), value: '.', olap_value: 2},
                {label: $.i18n.prop('_space'), value: ' ', olap_value: 3},
                {label: $.i18n.prop('_none'), value: ' ', olap_value: 4}],
            width: width,
            height: '25',
            selectedIndex: 0,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_thousand_separator').bind('change', function (event) {
            var ts = $('#options_thousand_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
            document.getElementById('option').value = document.getElementById("option").value.replace(/thousandSeparator:./g,"thousandSeparator:"+ts+"");
            var v = ts;
            try {
                FAOSTATOLAP.option.thousandSeparator = v;
                DEMO.pivot.cb();
            } catch (E) {

            }
        });
        $("#options_decimal_separator").jqxDropDownList({
            source: [{label: $.i18n.prop('_comma'), value: ',', olap_value: 1},
                {label: $.i18n.prop('_period'), value: '.', olap_value: 2},
                {label: $.i18n.prop('_space'), value: ' ', olap_value: 3},
                {label: $.i18n.prop('_none'), value: ' ', olap_value: 4}],
            width: width,
            height: '25',
            selectedIndex: 1,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_decimal_separator').bind('change', function (event) {
            var ds = $('#options_decimal_separator').jqxDropDownList('getSelectedItem').originalItem.olap_value.toString();
            document.getElementById("option").value = document.getElementById("option").value.replace(/decimalSeparator:./g,"decimalSeparator:"+ds+"");
            var v = ds;
            try {
                FAOSTATOLAP.option.decimalSeparator = v;
                DEMO.pivot.cb();
            } catch (e) {

            }
        });
        $('#options_decimal_numbers').jqxDropDownList({
            source: [{label: '0', value: 0},
                {label: '1', value: 1},
                {label: '2', value: 2},
                {label: '3', value: 3},
                {label: '4', value: 4}],
            width: width,
            height: '25',
            selectedIndex: 2,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_decimal_numbers').bind('change', function (event) {
            var nbDec = $('#options_decimal_numbers').jqxDropDownList('getSelectedItem').label.toString();
            var v = 0;
            document.getElementById("option").value=document.getElementById("option").value.replace(/nbDec:(\d)/g,"nbDec:"+nbDec);
            v = nbDec;
            try {
                FAOSTATOLAP.option.nbDec = v;
                DEMO.pivot.cb();
            } catch (e) {

            }
        });
        $('#options_show_flags').jqxCheckBox({
            checked : false,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_show_flags').bind('change', function (event) {
            var item = event.args.checked;
            var checked = 0;
            if(item)
                checked = 1;
            var v = 0;
            if (checked == 1) {
                FAOSTATOLAP.option.showFlags = 1;
                v = 1;
            } else {
                v = 0;
                FAOSTATOLAP.option.showFlags = 0;
            }
            {
                FAOSTATOLAP.option.showFlags = v;
                try {
                    DEMO.pivot.cb();
                } catch(er) {

                }
            }
        });
        $('#options_show_codes').jqxCheckBox({
            checked : false,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_show_codes').bind('change', function (event) {
            var item = event.args.checked;
            var checked = 1;
            if(item) {
                checked = 0;
            }
            if(checked == 1) {
                FAOSTATOLAP.option.showCode = 0;
            } else {
                FAOSTATOLAP.option.showCode = 1;
            }
            showCode();
        });
        $('#options_show_units').jqxCheckBox({
            checked : false,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_show_units').bind('change', function (event) {
            var item = event.args.checked;
            var checked = 1;
            if(item) {
                checked = 0;
            }
            if (checked == 0) {
                document.getElementById("option").value = document.getElementById("option").value.replace("showUnits:0","showUnits:1");
                v = 1;
            } else {
                document.getElementById("option").value = document.getElementById("option").value.replace("showUnits:1","showUnits:0");
                v = 0;
            }
            try {
                FAOSTATOLAP.option.showUnits = v;
                DEMO.pivot.cb();
            }
            catch(e) {

            }
        });
        $('#options_show_null_values').jqxCheckBox({
            checked : true,
            theme: F3DWLD.CONFIG.theme
        });
        $('#options_show_flags').jqxCheckBox({
            checked : true,
            theme: F3DWLD.CONFIG.theme
        });
        if (F3DWLD.CONFIG.domainCode == 'FS') {
            $('#options_show_flags').jqxCheckBox('disable');
        } else {
            $('#options_show_flags').jqxCheckBox('enable');
        }
    };

    function buildOLAP() {
        var s = '';
        s += '<table style="width: 720px; margin-left: 22px;">';
        s += '<tr>';
        s += '<td>';
        s += '<div class="demo" style="float: left; width: 100%; margin-top: 16px; display: none">';
        s += '<div>';
        s += '<div style="margin-top: 0px;">';
        s += '<div style="margin-left: 0px; float: left;" id="olapDimensionConfiguration">' + $.i18n.prop('_olapDimensionConfiguration') + '</div>';
        s += '</div>';
        s += '</div>';
        s += '<div>';
        s += '<div style="margin-top: 5px; margin-left: 5px; ">';
        s += '<ul id="agg" class="connectedSortable" style="display:none">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_notUse') + '</li>';
        s += '</ul>';
        s += '<ul id="nestedBy" class="connectedSortable">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_nestedBy') + '</li>';
        s += '</ul>';
        s += '<ul id="row" class="connectedSortable">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_rows') + '</li>';
        s += '<li class="ui-state-default" id="sel_2">' + $.i18n.prop('_items') + '</li>';
        s += '<li class="ui-state-default" id="sel_3">' + $.i18n.prop('_years') + '</li>';
        s += '</ul>';
        s += '<ul id="col" class="connectedSortable">';
        s += '<li class="ui-state-default ui-state-disabled">' + $.i18n.prop('_columns') + '</li>';
        s += '<li class="ui-state-default" id="sel_0">' + $.i18n.prop('_elements') + '</li>';
        s += '<li class="ui-state-default" id="sel_1">' + $.i18n.prop('_countries') + '</li>';
        s += '</ul>';
        s += '</div>';
        s += '</div>';
        s += '</div>';
        s += '</td>';
        s += '</tr>';
        s += '</table>';
        return s;
    };

    function buildOptions() {
        var s = '';
        s += '<div>';
        s += '<div>';
        s += '<div id="output_options_labels" class="standard-title">' + $.i18n.prop('_outputOptions') + '</div>';
        s += '<hr class="standard-hr">';
        s += '</div>';
        s += '</div>';
        s += '<div class="download-output-options">';
        s += '<table style="width: 100%;">';
        s += '<tr>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_output_type">' + $.i18n.prop('_outputType') + '</td>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_thousand_separator">' + $.i18n.prop('_thousandSeparator') + '</td>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_decimal_separator">' + $.i18n.prop('_decimalSeparator') + '</td>';
        s += '<td style="width: 25%;" class="compare-label" id="wizard_decimal_numbers">' + $.i18n.prop('_decimalNumbers') + '</td>';
        s += '</tr>';
        s += '<tr>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_output_type"></div>';
        s += '</td>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_thousand_separator"></div>';
        s += '</td>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_decimal_separator"></div>';
        s += '</td>';
        s += '<td style="width: 25%;">';
        s += '<div id="options_decimal_numbers"></div>';
        s += '</td>';
        s += '</tr>';
        s += '<tr style="display:none;">';
        s += '<td id="show_flags" style="width: 25%;"></td>';
        s += '<td id="show_codes" style="width: 25%;"></td>';
        s += '<td id="show_units" style="width: 25%;"></td>';
        s += '<td id="show_null_values" style="width: 25%;"></td>';
        s += '</tr>';
        s += '<tr>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_flags" class="compare-label">' + $.i18n.prop('_showFlags') + '</div>';
        s += '</td>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_codes" class="compare-label">' + $.i18n.prop('_showCodes') + '</div>';
        s += '</td>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_units" class="compare-label">' + $.i18n.prop('_showUnits') + '</div>';
        s += '</td>';
        s += '<td style="width: 25%; padding-top : 10px">';
        s += '<div id="options_show_null_values" class="compare-label">' + $.i18n.prop('_showNullValues') + '</div>';
        s += '</td>';
        s += '</tr>';
        s += '</table>';
        s += '</div>';
        return s;
    };

    function selectAll(gridCode, isSelected) {
        getTabSelection();
        var grid = '';
        switch (gridCode) {
            case 'grid_usp_GetAreaList1' :
                switch (F3DWLD.CONFIG.tabsSelection.countries) {
                    case 0: grid = 'grid_usp_GetAreaList1_select'; break;
                    case 1: grid = 'grid_usp_GetAreaList2_select'; break;
                    case 2: grid = 'grid_usp_GetAreaList3_select'; break;
                }
                break;
            case 'grid_usp_GetAreaList1' :
                switch (F3DWLD.CONFIG.tabsSelection.countries) {
                    case 0: grid = 'grid_usp_GetAreaList1_select'; break;
                    case 1: grid = 'grid_usp_GetAreaList2_select'; break;
                    case 2: grid = 'grid_usp_GetAreaList3_select'; break;
                }
                break;
            case 'grid_usp_GetAreaList1' :
                switch (F3DWLD.CONFIG.tabsSelection.countries) {
                    case 0: grid = 'grid_usp_GetAreaList1_select'; break;
                }
                break;
            case 'grid_usp_GetAreaList1' :
                switch (F3DWLD.CONFIG.tabsSelection.countries) {
                    case 0: grid = 'grid_usp_GetAreaList1_select'; break;
                }
                break;
            case 'grid_usp_GetElementList' :
                switch (F3DWLD.CONFIG.tabsSelection.elements) {
                    case 0: grid = 'grid_usp_GetElementList_select'; break;
                }
                break;
            case 'grid_usp_GetItemList1' :
                switch (F3DWLD.CONFIG.tabsSelection.items) {
                    case 0: grid = 'grid_usp_GetItemList1_select'; break;
                    case 1: grid = 'grid_usp_GetItemList2_select'; break;
                }
                break;
            case 'grid_usp_GetYearList' :
                switch (F3DWLD.CONFIG.tabsSelection.years) {
                    case 0: grid = 'grid_usp_GetYearList_select'; break;
                }
                break;
        }
        var selected = (isSelected == 'true') ? 'selected' : '';
        $('#' + grid + ' option').prop('selected', selected);
    };





    return {
        CONFIG      :   CONFIG,
        buildF3DWLD :   buildF3DWLD,
        selectAll   :   selectAll
    };

})();