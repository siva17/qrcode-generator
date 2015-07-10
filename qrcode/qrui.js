
function startActivityIndicator() {
    document.getElementById("globalSpinner").className = "spinnerWrapper";
}
function stopActivityIndicator() {
    document.getElementById("globalSpinner").className = "hideSpinner";
}

function updateElementClass(idname,classname) {
    try{document.getElementById(idname).className=classname;}catch(e){}
}
function onChangeQRTypeSelect(type) {
    var qridname=new Array("qrBookMarkText",
                           "qrWebSiteUrl",
                           "qrUrlShorten",
                           "qrPhoneNumber",
                           "qrSMSMessage",
                           "qrEMailAddress",
                           "qrEMailRecipient",
                           "qrEMailSubject",
                           "qrEMailBody",
                           "qrVCardFN",
                           "qrVCardMN",
                           "qrVCardLN",
                           "qrVCardMobilePhone",
                           "qrVCardHomePhone",
                           "qrVCardWorkPhone",
                           "qrVCardWorkFax",
                           "qrMECardVideoPhone",
                           "qrVCardEmail",
                           "qrVCardOrg",
                           "qrVCardOrgTitle",
                           "qrVCardWorkStreet",
                           "qrVCardWorkCity",
                           "qrVCardWorkState",
                           "qrVCardWorkZip",
                           "qrVCardWorkCountry",
                           "qrVCardHomeStreet",
                           "qrVCardHomeCity",
                           "qrVCardHomeState",
                           "qrVCardHomeZip",
                           "qrVCardHomeCountry",
                           "qrMECardStreet",
                           "qrMECardCity",
                           "qrMECardState",
                           "qrMECardZip",
                           "qrMECardCountry",
                           "qrVCardWorkUrl",
                           "qrVCardHomeUrl",
                           "qrMECardUrl",
                           "qrVCardBirthDay",
                           "qrVCalEventSummary",
                           "qrVCalEventDesc",
                           "qrVCalEventIsFullDay",
                           "qrVCalEventStartDate",
                           "qrVCalEventStartTime",
                           "qrVCalEventEndDate",
                           "qrVCalEventEndTime",
                           "qrMapLocation",
                           "qrWIFISSID",
                           "qrWIFIPassword",
                           "qrWIFIType",
                           "qrTextValue",
                           "qrPhotoUrl",
                           "qrOutputDiv"
                           );
    
    var i=0;
    for(i=0;i<qridname.length;i++) updateElementClass(qridname[i]+"ID","hideItemCls");
        
    if(type=="site") {
        updateElementClass("qrWebSiteUrlID","showItemCls");
        updateElementClass("qrUrlShortenID","showItemCls");
        updateElementClass("qrPhotoUrlID","showItemCls");
    } else if(type=="bookmark") {
        updateElementClass("qrBookMarkTextID","showItemCls");
        updateElementClass("qrWebSiteUrlID","showItemCls");
        updateElementClass("qrUrlShortenID","showItemCls");
        updateElementClass("qrPhotoUrlID","showItemCls");
    } else if(type=="call") {
        updateElementClass("qrPhoneNumberID","showItemCls")
        updateElementClass("qrPhotoUrlID","showItemCls");
    } else if(type=="sms") {
        updateElementClass("qrPhoneNumberID","showItemCls");
        updateElementClass("qrSMSMessageID","showItemCls")
    } else if(type=="email") {
        updateElementClass("qrEMailAddressID","showItemCls");
        updateElementClass("qrPhotoUrlID","showItemCls");
    } else if(type=="mail") {
        updateElementClass("qrEMailRecipientID","showItemCls");
        updateElementClass("qrEMailSubjectID","showItemCls");
        updateElementClass("qrEMailBodyID","showItemCls")
    } else if(type=="vcard") {
        updateElementClass("qrUrlShortenID","showItemCls");
        updateElementClass("qrVCardFNID","showItemCls");
        updateElementClass("qrVCardMNID","showItemCls");
        updateElementClass("qrVCardLNID","showItemCls");
        updateElementClass("qrVCardMobilePhoneID","showItemCls");
        updateElementClass("qrVCardHomePhoneID","showItemCls");
        updateElementClass("qrVCardWorkPhoneID","showItemCls");
        updateElementClass("qrVCardWorkFaxID","showItemCls");
        updateElementClass("qrVCardEmailID","showItemCls");
        updateElementClass("qrVCardOrgID","showItemCls");
        updateElementClass("qrVCardOrgTitleID","showItemCls");
        updateElementClass("qrVCardWorkStreetID","showItemCls");
        updateElementClass("qrVCardWorkCityID","showItemCls");
        updateElementClass("qrVCardWorkStateID","showItemCls");
        updateElementClass("qrVCardWorkZipID","showItemCls");
        updateElementClass("qrVCardWorkCountryID","showItemCls");
        updateElementClass("qrVCardHomeStreetID","showItemCls");
        updateElementClass("qrVCardHomeCityID","showItemCls");
        updateElementClass("qrVCardHomeStateID","showItemCls");
        updateElementClass("qrVCardHomeZipID","showItemCls");
        updateElementClass("qrVCardHomeCountryID","showItemCls");
        updateElementClass("qrVCardWorkUrlID","showItemCls");
        updateElementClass("qrVCardHomeUrlID","showItemCls");
        updateElementClass("qrVCardBirthDayID","showItemCls")
    } else if(type=="mecard") {
        updateElementClass("qrUrlShortenID","showItemCls");
        updateElementClass("qrVCardFNID","showItemCls");
        updateElementClass("qrVCardLNID","showItemCls");
        updateElementClass("qrVCardMobilePhoneID","showItemCls");
        updateElementClass("qrMECardVideoPhoneID","showItemCls");
        updateElementClass("qrVCardEmailID","showItemCls");
        updateElementClass("qrMECardStreetID","showItemCls");
        updateElementClass("qrMECardCityID","showItemCls");
        updateElementClass("qrMECardStateID","showItemCls");
        updateElementClass("qrMECardZipID","showItemCls");
        updateElementClass("qrMECardCountryID","showItemCls");
        updateElementClass("qrMECardUrlID","showItemCls");
        updateElementClass("qrVCardBirthDayID","showItemCls")
    } else if(type=="vevent") {
        updateElementClass("qrVCalEventSummaryID","showItemCls");
        updateElementClass("qrVCalEventDescID","showItemCls");
        updateElementClass("qrVCalEventIsFullDayID","showItemCls");
        updateElementClass("qrVCalEventStartDateID","showItemCls");
        updateElementClass("qrVCalEventStartTimeID","showItemCls");
        updateElementClass("qrVCalEventEndDateID","showItemCls");
        updateElementClass("qrVCalEventEndTimeID","showItemCls");
        updateElementClass("qrMapLocationID","showItemCls")
    } else if(type=="map") {
        updateElementClass("qrUrlShortenID","showItemCls");
        updateElementClass("qrMapLocationID","showItemCls");
    } else if(type=="bing") {
        updateElementClass("qrUrlShortenID","showItemCls");
        updateElementClass("qrMapLocationID","showItemCls");
    } else if(type=="geo") {
        updateElementClass("qrMapLocationID","showItemCls");
        updateElementClass("qrPhotoUrlID","showItemCls");
    } else if(type=="wifi") {
        updateElementClass("qrWIFISSIDID","showItemCls");
        updateElementClass("qrWIFIPasswordID","showItemCls");
        updateElementClass("qrWIFITypeID","showItemCls")
        updateElementClass("qrPhotoUrlID","showItemCls");
    } else if(type=="text") {
        updateElementClass("qrTextValueID","showItemCls");
    }
}

// Global Variables
var qrCodeObject;
var qrCodeTypes
function initQRCode() {
    onChangeQRTypeSelect("site");
    qrCodeObject = new QRCodeClass();
    qrCodeTypes = new QRCodeTypesClass();
}

function getECCValue(input) {
    if(input == "L") return 1;
    else if(input == "M") return 2;
    else if(input == "Q") return 3;
    else if(input == "H") return 4;
    return 1;
}

function getValue(x) {
    return document.qrCodeForm[x].value;
}

function getShortenURl(config) {
    if(config) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "http://api.bitly.com/v3/shorten?login=sivar&apiKey=R_864f39f8efb70705d2360a54ea05d52d&longUrl="+config.url);
        xhr.onreadystatechange = function() { 
            if(xhr.readyState == 4) {
                var urlOutput = config.url;
                if(xhr.status==200) {
                    try {
                        var jsonObject = JSON.parse(xhr.response);
                        urlOutput = jsonObject.data.url;
                    } catch(e) {
                        urlOutput = config.url;
                    }
                }
                if(config.callback) {
                    config.callback({data:urlOutput});
                }
            } 
        }
        xhr.send();
        return true;
    }
    return false;
}

function getQRString(config) {
    var type = getValue("qrSelecteType");
    var inputString = "";
    
    try {
        var photoValue = getValue("qrPhotoUrl");
        if((document.getElementById("qrPhotoUrlID").className == "showItemCls") &&
           (photoValue != "")) {
            var photoImageID = document.getElementById("qrOutputPhotoID");
            photoImageID.src = photoValue;
        } else {
            document.getElementById("qrOutputPhotoID").src = null;
            document.qrCodeForm["qrPhotoUrl"].value = null;
        }
    } catch(e) {}
    
    if(type=="site") {
        if(qrCodeTypes.getText(getValue("qrUrlShorten")) == "y") {
            if(getShortenURl({
                             url : qrCodeTypes.getURL(getValue("qrWebSiteUrl")),
                             callback : function(returnConfig) {
                             if((config) && (config.callback)) config.callback({data:returnConfig.data});
                             }
                             }) == true) {
                return; 
            }
        }
        inputString = qrCodeTypes.getURL(getValue("qrWebSiteUrl"));
    } else if(type=="bookmark") {
        if(qrCodeTypes.getText(getValue("qrUrlShorten")) == "y") {
            if(getShortenURl({
                             url : qrCodeTypes.getURL(getValue("qrWebSiteUrl")),
                             callback : function(returnConfig) {
                             if((config) && (config.callback)) {
                             var bkMarkString = qrCodeTypes.getBookMark(
                                                                        getValue("qrBookMarkText"),
                                                                        returnConfig.data
                                                                        );
                             config.callback({data:bkMarkString});
                             }
                             }
                             }) == true) {
                return; 
            }
        }
        inputString = qrCodeTypes.getBookMark(
                                              getValue("qrBookMarkText"),
                                              getValue("qrWebSiteUrl")
                                              );
    } else if(type=="call") {
        inputString = qrCodeTypes.getTelePhoneNumber(getValue("qrPhoneNumber"));
    } else if(type=="sms") {
        inputString = qrCodeTypes.getSMS(getValue("qrPhoneNumber"),
                                         getValue("qrSMSMessage"));
    } else if(type=="email") {
        inputString = qrCodeTypes.getEmail(getValue("qrEMailAddress"));
    } else if(type=="mail") {
        inputString = qrCodeTypes.sendEmail(getValue("qrEMailRecipient"),
                                            getValue("qrEMailSubject"),
                                            getValue("qrEMailBody"));
    } else if(type=="vcard") {
        
        if(qrCodeTypes.getText(getValue("qrUrlShorten")) == "y") {
            if(getShortenURl({
                             url : qrCodeTypes.getURL(getValue("qrVCardWorkUrl")),
                             callback : function(returnConfig) {
                             var vcardWorkUrl = returnConfig.data;
                             getShortenURl({
                                           url : qrCodeTypes.getURL(getValue("qrVCardHomeUrl")),
                                           callback : function(returnConfig1) {
                                           if((config) && (config.callback)) {
                                           var vcardHomeUrl = returnConfig1.data;
                                           
                                           inputString = qrCodeTypes.getVCard({
                                                                              fn       : getValue("qrVCardFN"),
                                                                              mn       : getValue("qrVCardMN"),
                                                                              ln       : getValue("qrVCardLN"),
                                                                              org      : getValue("qrVCardOrg"),
                                                                              title    : getValue("qrVCardOrgTitle"),
                                                                              email    : getValue("qrVCardEmail"),
                                                                              mNumber  : getValue("qrVCardMobilePhone"),
                                                                              wNumber  : getValue("qrVCardWorkPhone"),
                                                                              hNumber  : getValue("qrVCardHomePhone"),
                                                                              fNumber  : getValue("qrVCardWorkFax"),
                                                                              WAStreet : getValue("qrVCardWorkStreet"),
                                                                              WACity   : getValue("qrVCardWorkCity"),
                                                                              WAState  : getValue("qrVCardWorkState"),
                                                                              WAZip    : getValue("qrVCardWorkZip"),
                                                                              WACountry: getValue("qrVCardWorkCountry"),
                                                                              HAStreet : getValue("qrVCardHomeStreet"),
                                                                              HACity   : getValue("qrVCardHomeCity"),
                                                                              HAState  : getValue("qrVCardHomeState"),
                                                                              HAZip    : getValue("qrVCardHomeZip"),
                                                                              HACountry: getValue("qrVCardHomeCountry"),
                                                                              BD       : {
                                                                              year     : getValue("qrVCardBirthDayYear"),
                                                                              month    : getValue("qrVCardBirthDayMonth"),
                                                                              day      : getValue("qrVCardBirthDayDay"),
                                                                              },
                                                                              wUrl     : vcardWorkUrl,
                                                                              hUrl     : vcardHomeUrl
                                                                              });
                                           
                                           config.callback({data:inputString});
                                           }
                                           }
                                           });
                             }
                             }) == true) {
                return; 
            }
        }        
        
        inputString = qrCodeTypes.getVCard({
                                           fn       : getValue("qrVCardFN"),
                                           mn       : getValue("qrVCardMN"),
                                           ln       : getValue("qrVCardLN"),
                                           org      : getValue("qrVCardOrg"),
                                           title    : getValue("qrVCardOrgTitle"),
                                           email    : getValue("qrVCardEmail"),
                                           mNumber  : getValue("qrVCardMobilePhone"),
                                           wNumber  : getValue("qrVCardWorkPhone"),
                                           hNumber  : getValue("qrVCardHomePhone"),
                                           fNumber  : getValue("qrVCardWorkFax"),
                                           WAStreet : getValue("qrVCardWorkStreet"),
                                           WACity   : getValue("qrVCardWorkCity"),
                                           WAState  : getValue("qrVCardWorkState"),
                                           WAZip    : getValue("qrVCardWorkZip"),
                                           WACountry: getValue("qrVCardWorkCountry"),
                                           HAStreet : getValue("qrVCardHomeStreet"),
                                           HACity   : getValue("qrVCardHomeCity"),
                                           HAState  : getValue("qrVCardHomeState"),
                                           HAZip    : getValue("qrVCardHomeZip"),
                                           HACountry: getValue("qrVCardHomeCountry"),
                                           BD       : {
                                           year     : getValue("qrVCardBirthDayYear"),
                                           month    : getValue("qrVCardBirthDayMonth"),
                                           day      : getValue("qrVCardBirthDayDay"),
                                           },
                                           wUrl     : getValue("qrVCardWorkUrl"),
                                           hUrl     : getValue("qrVCardHomeUrl")
                                           });
    } else if(type=="mecard") {
        
        
        if(qrCodeTypes.getText(getValue("qrUrlShorten")) == "y") {
            if(getShortenURl({
                             url : qrCodeTypes.getURL(getValue("qrMECardUrl")),
                             callback : function(returnConfig) {
                             if((config) && (config.callback)) {
                             
                             var meString = qrCodeTypes.getMECard({
                                                                  fn       : getValue("qrVCardFN"),
                                                                  ln       : getValue("qrVCardLN"),
                                                                  mNumber  : getValue("qrVCardMobilePhone"),
                                                                  vNumber  : getValue("qrMECardVideoPhone"),
                                                                  email    : getValue("qrVCardEmail"),
                                                                  url      : returnConfig.data,
                                                                  BD       : {
                                                                  year     : getValue("qrVCardBirthDayYear"),
                                                                  month    : getValue("qrVCardBirthDayMonth"),
                                                                  day      : getValue("qrVCardBirthDayDay"),
                                                                  },
                                                                  AStreet  : getValue("qrMECardStreet"),
                                                                  ACity    : getValue("qrMECardCity"),
                                                                  AState   : getValue("qrMECardState"),
                                                                  AZip     : getValue("qrMECardZip"),
                                                                  ACountry : getValue("qrMECardCountry"),
                                                                  });
                             
                             config.callback({data:meString});
                             }
                             }
                             }) == true) {
                return; 
            }
        }
        
        inputString = qrCodeTypes.getMECard({
                                            fn       : getValue("qrVCardFN"),
                                            ln       : getValue("qrVCardLN"),
                                            mNumber  : getValue("qrVCardMobilePhone"),
                                            vNumber  : getValue("qrMECardVideoPhone"),
                                            email    : getValue("qrVCardEmail"),
                                            url      : getValue("qrMECardUrl"),
                                            BD       : {
                                            year     : getValue("qrVCardBirthDayYear"),
                                            month    : getValue("qrVCardBirthDayMonth"),
                                            day      : getValue("qrVCardBirthDayDay"),
                                            },
                                            AStreet  : getValue("qrMECardStreet"),
                                            ACity    : getValue("qrMECardCity"),
                                            AState   : getValue("qrMECardState"),
                                            AZip     : getValue("qrMECardZip"),
                                            ACountry : getValue("qrMECardCountry"),
                                            });
    } else if(type=="vevent") {
        var fdEvent = (((document.qrCodeForm.qrVCalEventIsFullDay)[0].checked == true)?("y"):("n"));
        
        inputString = qrCodeTypes.getVCal({
                                          summary  : getValue("qrVCalEventSummary"),
                                          desc     : getValue("qrVCalEventDesc"),
                                          loc      : getValue("qrMapLocationName"),
                                          fd       : fdEvent,
                                          sd       : {
                                          year     : getValue("qrVCalEventStartDateYear"),
                                          month    : getValue("qrVCalEventStartDateMonth"),
                                          day      : getValue("qrVCalEventStartDateDay"),
                                          hour     : getValue("qrVCalEventStartTimeHour"),
                                          minute   : getValue("qrVCalEventStartTimeMinute"),
                                          second   : "00"
                                          },
                                          ed       : {
                                          year     : getValue("qrVCalEventEndDateDayYear"),
                                          month    : getValue("qrVCalEventEndDateMonth"),
                                          day      : getValue("qrVCalEventEndDateDay"),
                                          hour     : getValue("qrVCalEventEndTimeHour"),
                                          minute   : getValue("qrVCalEventEndTimeMinute"),
                                          second   : "00"
                                          }
                                          });
    } else if(type=="geo") {
        inputString = qrCodeTypes.getGeoCordinates(getValue("qrMapLatitude"),
                                                   getValue("qrMapLongitude"),
                                                   getValue("qrMapLocationName"));
    } else if(type=="map") {
        inputString = qrCodeTypes.getGeoGoogleMap(getValue("qrMapLatitude"),
                                                  getValue("qrMapLongitude"),
                                                  getValue("qrMapLocationName"));
        if(qrCodeTypes.getText(getValue("qrUrlShorten")) == "y") {
            if(getShortenURl({
                             url : inputString,
                             callback : function(returnConfig) {
                             if((config) && (config.callback)) config.callback({data:returnConfig.data});
                             }
                             }) == true) {
                return; 
            }
        }
    } else if(type=="bing") {
        inputString = qrCodeTypes.getGeoBingMap(getValue("qrMapLatitude"),
                                                getValue("qrMapLongitude"),
                                                getValue("qrMapLocationName"));
        if(qrCodeTypes.getText(getValue("qrUrlShorten")) == "y") {
            if(getShortenURl({
                             url : inputString,
                             callback : function(returnConfig) {
                             if((config) && (config.callback)) config.callback({data:returnConfig.data});
                             }
                             }) == true) {
                return; 
            }
        }
    } else if(type=="wifi") {
        inputString = qrCodeTypes.getWiFiLogin(getValue("qrWIFISSID"),
                                               getValue("qrWIFIPassword"),
                                               getValue("qrWIFIType"));
    } else if(type=="text") {
        inputString = qrCodeTypes.getText(getValue("qrTextValue"));
    }
    
    if((config) && (config.callback)) config.callback({data:inputString});
}

function generateQRCode() {
    startActivityIndicator();
    getQRString({
                callback : function(returnConfig) {
                                
                qrCodeObject.colors.bg      = getValue("qrColorbg");
                qrCodeObject.colors.dot     = getValue("qrColordot");
                qrCodeObject.colors.lBorder = getValue("qrColorlBorder");
                qrCodeObject.colors.lFill   = getValue("qrColorlFill");
                qrCodeObject.colors.rBorder = getValue("qrColorrBorder");
                qrCodeObject.colors.rFill   = getValue("qrColorrFill");
                qrCodeObject.colors.bBorder = getValue("qrColorbBorder");
                qrCodeObject.colors.bFill   = getValue("qrColorbFill");
                qrCodeObject.fillValue      = getValue("qrColorpattern");
                
                console.log("QRString:"+returnConfig.data);
                qrCodeObject.generateQRCode({
                                            value    : returnConfig.data,
                                            ecclevel : getECCValue(getValue("QRECC")),
                                            showimage: "yes",
                                            imageid  : "qrOutputImageID",
                                            photoid  : ((document.getElementById("qrPhotoUrlID").className == "showItemCls")?("qrOutputPhotoID"):("")),
                                            width    : getValue("QRWidth")
                                            });
                updateElementClass("qrOutputDivID","showItemCls");
                stopActivityIndicator();
                }
                });
}
