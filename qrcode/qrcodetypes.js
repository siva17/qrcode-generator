var QRCodeTypesClass = function(){};
QRCodeTypesClass.prototype = {
    /********************************************
     * PRIVATE Variables and functions - Begin
     *******************************************/
    _getBirthDate : function(d,type) {
        if((d) && (d.year) && (d.month) && (d.day)) {
            return d.year+type+d.month+type+d.day;
        }
        return null
    },
    
    _getVCalDate : function(d,t) {
        if(t=="y") {
            if((d) && (d.year) && (d.month) && (d.day)) {
                return d.year+d.month+d.day; // yyyymmdd
            }            
        } else {
            if((d) && (d.year) && (d.month) && (d.day) && (d.hour) && (d.minute) && (d.second)) {
                return d.year+d.month+d.day+"T"+d.hour+d.minute+d.second; // yyyymmddThhmmss
            }
        }
        return null
    },
    
    _escapeUrl : function(s) {
        if(s) {
            return escape(s).replace(/\+/g,"%2B")
        }
        return "";
    },
    
    _escapeSpecial : function(s) {
        if(s) {
            return (((s.replace(/:/g,"%3A")).replace(/;/g,"%3B")).replace(/;/g,"%2C"));
        }
        return "";
    },
    
    _urlEncode : function(s) {
        s=s.replace(/\r\n/g,"\n");
        var u="";
        for(var n=0;n<s.length;n++) {
            var c=s.charCodeAt(n);
            if(c<128) {
                u+=String.fromCharCode(c)
            } else if((c>127)&&(c<2048)) {
                u+=String.fromCharCode((c>>6)|192);
                u+=String.fromCharCode((c&63)|128)
            } else {
                u+=String.fromCharCode((c>>12)|224);
                u+=String.fromCharCode(((c>>6)&63)|128);
                u+=String.fromCharCode((c&63)|128)
            }
        }
        return this._escapeUrl(u);
    },
    /********************************************
     * PRIVATE Variables and functions - End
     *******************************************/
    /********************************************
     * PUBLIC Variables and functions - Begin
     *******************************************/
    getText : function(v) {
        return v;
    },
    
    getURL : function(u) {
        return u;
    },
    
    getBookMark : function(t,u) {
        return "MEBKM:TITLE:"+t+";URL:"+this.getURL(u);
    },
    
    getTelePhoneNumber : function(n) {
        return "TEL:"+n;
    },
    
    getSMS : function(n,m) {
        return "SMSTO:"+n+":"+m;
    },
    
    getGeoCordinates : function(la,lo,ln) {
        return "GEO:"+la+","+lo;
    },
    
    getGeoGoogleMap : function(la,lo,ln) {
        return "http://maps.google.com/maps?f=q&q="+la+"%2c"+lo+"+%28"+this._escapeUrl(ln)+"%29";
    },
    
    getGeoBingMap : function(la,lo,ln) {
        return "http://www.bing.com/maps/?v=2@cp="+la+"~"+lo+"@lvl=16&dir=0&sty=r";
    },
    
    getEmail : function(e) {
        return "MAILTO:"+e;
    },
    
    sendEmail : function(e,s,m) {
        return "mailto:"+e+"?subject="+this._escapeUrl(s)+"&body="+this._escapeUrl(m);
    },
    
    getWiFiLogin : function(s,p,t) {
        return "WIFI:T:"+t+";S:"+s+";P:"+p+";;";
    },
    
    getVCard : function(v) {
        try {
            if(v) {
                var thisObject = this;
                
                var returnValue = "BEGIN:VCARD \n"+"VERSION:3.0 \n"+
                
                "N:"+
                ((v.ln)?(thisObject._escapeSpecial(v.ln)+";"):(";"))+
                ((v.fn)?(thisObject._escapeSpecial(v.fn)+";"):(";"))+
                ((v.mn)?(thisObject._escapeSpecial(v.mn)+";;\n"):(";;\n"))+
                
                "FN:"+
                ((v.fn)?(thisObject._escapeSpecial(v.fn)+" "):(""))+
                ((v.mn)?(thisObject._escapeSpecial(v.mn)+" "):(""))+
                ((v.ln)?(thisObject._escapeSpecial(v.ln)):(""))+"\n"+
                
                ((v.org)?("ORG:"+thisObject._escapeSpecial(v.org)+"\n"):(""))+
                
                ((v.title)?("TITLE:"+thisObject._escapeSpecial(v.title)+"\n"):(""))+
                
                ((v.email)?("EMAIL;type=INTERNET;type=WORK:"+v.email+"\n"):(""))+
                
                ((v.mNumber)?("TEL;type=CELL:"+v.mNumber+"\n"):(""))+
                ((v.wNumber)?("TEL;type=WORK:"+v.wNumber+"\n"):(""))+
                ((v.hNumber)?("TEL;type=HOME:"+v.hNumber+"\n"):(""))+
                ((v.fNumber)?("TEL;type=WORK,FAX:"+v.fNumber+"\n"):(""))+
                
                ((v.WACountry)?("ADR;type=WORK:;;"+
                                thisObject._escapeSpecial(v.WAStreet)+
                                ";"+thisObject._escapeSpecial(v.WACity)+
                                ";"+thisObject._escapeSpecial(v.WAState)+
                                ";"+thisObject._escapeSpecial(v.WAZip)+
                                ";"+thisObject._escapeSpecial(v.WACountry)+"\n"):(""))+
                
                ((v.HACountry)?("ADR;type=HOME:;;"+thisObject._escapeSpecial(v.HAStreet)+
                                ";"+thisObject._escapeSpecial(v.HACity)+
                                ";"+thisObject._escapeSpecial(v.HAState)+
                                ";"+thisObject._escapeSpecial(v.HAZip)+
                                ";"+thisObject._escapeSpecial(v.HACountry)+"\n"):(""))+
                
                ((v.BD)?("BDAY;value=date:"+this._getBirthDate(v.BD,"-")+"\n"):(""))+ //yyyy-mm-dd
                
                ((v.wUrl)?("URL;type=WORK:"+thisObject._escapeUrl(v.wUrl)+"\n"):(""))+
                ((v.hUrl)?("URL;type=HOME:"+thisObject._escapeUrl(v.hUrl)+"\n"):(""))+
                
                "END:VCARD";
                
                return returnValue;
            }
        } catch(e) {
            alert("getVCard:"+e);
        }
        return null;
    },
    
    getMECard : function(v) {
        try {
            if(v) {
                var thisObject = this;
                
                var returnValue = "MECARD:N:"+
                ((v.ln)?(thisObject._escapeSpecial(v.ln)+","):(","))+
                ((v.fn)?(thisObject._escapeSpecial(v.fn)+";"):(";"))+
                
                ((v.mNumber)?("TEL:"+v.mNumber+";"):(""))+
                ((v.vNumber)?("TEL-AV:"+v.vNumber+";"):(""))+
                
                ((v.email)?("EMAIL:"+v.email+";"):(""))+
                
                ((v.url)?("URL:"+thisObject._escapeUrl(v.url)+";"):(""))+
                
                ((v.BD)?("BDAY:"+this._getBirthDate(v.BD,"")+";"):(""))+ //yyyymmdd
                
                ((v.ACountry)?("ADR:,,"+thisObject._escapeSpecial(v.AStreet)+
                               ","+thisObject._escapeSpecial(v.ACity)+
                               ","+thisObject._escapeSpecial(v.AState)+
                               ","+thisObject._escapeSpecial(v.AZip)+
                               ","+thisObject._escapeSpecial(v.ACountry)+";;"):(""));
                
                return returnValue;
            }
        } catch(e) {
            alert("getMECard:"+e);
        }
        return null;
    },
    
    getVCal : function(v) {
        try {
            if(v) {
                var thisObject = this;
                
                var returnValue = "BEGIN:VCALENDAR\n"+"VERSION:2.0\n"+"BEGIN:VEVENT\n"+
                "SUMMARY:"    +((v.summary)?(thisObject._escapeSpecial(v.summary)):(""))+"\n"+
                "DESCRIPTION:"+((v.desc)   ?(thisObject._escapeSpecial(v.desc))   :(""))+"\n"+
                "LOCATION:"   +((v.loc)    ?(thisObject._escapeSpecial(v.loc))    :(""))+"\n"+
                "DTSTART:"    +((v.sd)     ?(this._getVCalDate(v.sd,v.fd))        :(""))+"\n"+ 
                "DTEND:"      +((v.ed)     ?(this._getVCalDate(v.ed,v.fd))        :(""))+"\n"+
                "END:VEVENT\n"+"END:VCALENDAR";
                
                return returnValue;
            }
        } catch(e) {
            alert("getVCal:"+e);
        }
        return null;
    }
    /********************************************
     * PUBLIC Variables and functions - End
     *******************************************/
}