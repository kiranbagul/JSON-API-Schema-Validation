var testResults = {};
var urls = model.urlsToProcess;
var userList;

var retrieveData = function () {
    var done = urls.length;
    $(urls).each(function () {
        if (this.validate === "true") {
            var url = this.url;
            testResults[url] = this;
            $.getJSON(url, function (data) {
                done -= 1;
                checkValidity(url, data);
                if (done === 0) {
                    table();
                    showLoadingAnimation(false);
                }
            });
        } else {
            done -= 1;
        }
    });
};

var checkValidity = function (url, data) {
    var fieldsToTest = testResults[url].fields;
    $(fieldsToTest).each(function () {
        var field = this;
        testResults[url].status = testResults[url].status || {};
        testResults[url].status[field] = (validateField(data, field));
    });
};

var validateField = function (data, field) {
    var res = jsonPath(data, field);
    return {
        "status": res ? true : false,
        "val": res,
        "test": field
    };
};

var table = function () {
    var options = {
        valueNames: ['name', 'test', 'status', 'url'],
        item: '<li><div class="liEleDiv col-lg-3 name"></div><div class="liEleDiv col-lg-5 test"></div><a class="liEleDiv col-lg-4 status"></a><div style="display:none" class="url"></div><div id="datainfo"></div></li>'
    };

    var values = [];
    var urlList = Object.keys(testResults);
    $(urlList).each(function () {
        var url = this;
        var testFileldKeys = Object.keys(testResults[url].status);
        $(testFileldKeys).each(function () {
            var thisEle = testResults[url].status[this];
            values.push({
                "name": testResults[url].name,
                "status": thisEle.status ? "Passed" : "Failed",
                "test": thisEle.test,
                "url": url
            });
        });
    });

    userList = new List('testcases', options, values);
    processTableData();
    userList.on('searchComplete', function () {
        processTableData();
    });
    userList.on('sortComplete', function () {
        processTableData();
    });

};

var processTableData = function () {
    $(userList.items).each(function () {
        var liEle = this.elm;
        var url = $($(this.elm).children()[3]).text();
        var statusElement = $($(this.elm).children()[2]);
        var desc = $("<pre id='results' style='display:none' class='alert alert-info'></pre>");
        desc.html(getTestResults(url, $($(this.elm).children()[1]).text()));
        $(liEle).after(desc);
        statusElement.click(function () {
            if ($(desc).attr("expanded") && $(liEle).attr("expanded") !== false) {
                $(desc).attr("expanded", false);
                $(desc).slideToggle('400');
            } else {
                $(desc).attr("expanded", true);
                $(desc).slideToggle('400');
            }
        });
        var className = statusElement.text() === "Passed" ? "alert alert-success" : "alert alert-danger";
        $(this.elm).addClass(className);
        var nameElement = $($(this.elm).children()[0]);

        var popOverEle = $('<a class="liEleDiv col-lg-3" data-container="body" data-toggle="popover" data-placement="bottom" ></a>');
        popOverEle.text(nameElement.text());
        popOverEle.attr('data-content', url);
        nameElement.replaceWith(popOverEle);
        $(popOverEle).popover();
    });
};

var getTestResults = function (url, field) {
    var no = testResults[url].status[field].val.length;
    var noOfResultsHtml = "";
    if (no) {
        noOfResultsHtml = "<div class='noOfResults'>No of matching elements  " + testResults[url].status[field].val.length + "</div>" + JSONBeautifier.json.prettyPrint(testResults[url].status[field].val);
    } else {
        noOfResultsHtml = "<div class='noOfResults'>No matching element found.</div>";
    }
    return noOfResultsHtml;
};


var showLoadingAnimation = function (status) {
    if (status) {
        var html = '<div class="spinner"><h2>Executing tests</h2><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div>';
        $(".spacer").append(html);
        $("#testcases").css('display','none');
    } else {
        $(".spinner").remove();
         $("#testcases").css('display','block');
    }
};

showLoadingAnimation(true);
retrieveData();