({
    doInit : function(component, event, helper) {
        helper.doInit(component, event);
        helper.hideSpinner(component,event,'spinner');
        helper.hideSpinner(component,event,'spinner2');
        
        helper.hideSpinner(component,event,'spinner3');
    },
    
    CreateNewUserFun : function(component, event, helper) {
    	console.log(component.find("NewUserName").get("v.value"));
        console.log(component.find("NewUserEmail").get("v.value"));
        
        
    },
    PressPrevious : function(component, event, helper) {
        var CurrentOrder= component.get('v.CurrentOrder');
        
        var ListMap=component.get('v.VersionListMap');
        var cun=0;
        var displayList=[];
        for(var i=0;i<ListMap.length;i++){  
            if(i<CurrentOrder){ 
                //console.log(ListMap[i].data.Image__c);
                var temp = new Object();
                temp.id=i;
                temp.data=ListMap[i].data;
                displayList.push(temp);
            }
        }             
        component.set('v.displayItems', displayList);
        $('#PageDiv').html('Page 1/2 ');
        
    },
    MainSearchPart : function(component, event, helper) {
        var ListMap=component.get('v.VersionListMap');
        var displayList=[];
        var CurrentOrder= component.get('v.CurrentOrder');
        var InputValue=$('#MainSearchPartId').val().toLowerCase();
        //   console.log('Main Search '+$('#MainSearchPartId').val());  referrer.toLowerCase().indexOf("ral")

        if(InputValue.legth!=0){
            var CountNumeber=1;
             for(var i=0;i<ListMap.length;i++){ 
                 if(ListMap[i].data.Name.toLowerCase().includes(InputValue)){
                     var temp = new Object();
                     temp.id=i;
                     temp.data=ListMap[i].data;
                     displayList.push(temp);
                     CountNumeber++;
                 }
             }
            if(CountNumeber>CurrentOrder){
                $('#PageDiv').html(' Page 1/2');
            }else{
                 $('#PageDiv').html('Page 1');
            }
             
        }else{
           
            for(var i=0;i<ListMap.length;i++){ 
                if(i<CurrentOrder){ 
                    var temp = new Object();
                    temp.id=i;
                    temp.data=ListMap[i].data;
                    displayList.push(temp);
                    
                }
            }
            $('#PageDiv').html('Page 1/2');
            
        }
        component.set('v.displayItems', displayList);
       
    },
    
    
    ChangeAmountFilter: function(component, event, helper) {
       
        var MinAmount=Number(component.find("InputMinAmount").get("v.value"));
        var MaxAmount=Number(component.find("InputMaxAmount").get("v.value"));
        
        
        var ListMap=component.get('v.VersionListMap');
        var CurrentOrder= component.get('v.CurrentOrder');
        var displayList=[];
        var HaveInputAmount=false;
        for(var i=0;i<ListMap.length;i++){  //console.log(ListMap[i].data.Price__c); 
            if(MinAmount<ListMap[i].data.Price__c && MinAmount!=0 && MaxAmount==0){
                var temp = new Object();
                temp.id=i;
                temp.data=ListMap[i].data;
                displayList.push(temp);
            }  
            
            if(MinAmount==0 && MaxAmount!=0 &&MaxAmount>ListMap[i].data.Price__c){
                var temp = new Object();
                temp.id=i;
                temp.data=ListMap[i].data;
                displayList.push(temp);
            }
            
            if(MinAmount!=0 && MaxAmount!=0){
                if(MinAmount<ListMap[i].data.Price__c && MaxAmount>ListMap[i].data.Price__c){
                    var temp = new Object();
                    temp.id=i;
                    temp.data=ListMap[i].data;
                    displayList.push(temp);
                }
            }
            
            if(MinAmount==0 && MaxAmount==0){
                if(i<CurrentOrder){ 
                    var temp = new Object();
                    temp.id=i;
                    temp.data=ListMap[i].data;
                    displayList.push(temp);
                    HaveInputAmount=true;
                }
            }
            
            
        }
        component.set('v.displayItems', displayList);
        if(HaveInputAmount){
            $('#PageDiv').html('1/2 Page');
        }else{
            $('#PageDiv').html('1 Page');
        }
        
        
    },
    PressNext : function(component, event, helper) {
        
        var CurrentOrder= component.get('v.CurrentOrder');
        
        var ListMap=component.get('v.VersionListMap');
        
        var cun=0;
        var displayList=[];
        for(var i=0;i<ListMap.length;i++){  
            if(i>CurrentOrder){ 
                var temp = new Object();
                temp.id=i;
                temp.data=ListMap[i].data;
                displayList.push(temp);
            }
        }             
        component.set('v.displayItems', displayList);
        
        $('#PageDiv').html('Page 2/2 ');
    },
    rangechange : function(component, event, helper) {
        
        var PriceList=component.get('v.PriceList');
        console.log(PriceList[PriceList.length-1]);
        var maxamount=PriceList[PriceList.length-1];
        console.log($('#RangeDivPart1').val());// RangePart
        console.log($('#RangeDivPart2').val());
        
        var tick1=maxamount*(Number($('#RangeDivPart1').val())/100);
        var tick2=maxamount*(Number($('#RangeDivPart2').val())/100);
        var PriceHtml='Price : '+tick1+' -'+tick2;
        
        $('#PriceDiv').html(PriceHtml);
    },
    
    itemsChange : function(component, event, helper) {
        console.log('items range');
        
    },
    ChooseUser : function(component, event, helper) {
        //var elem = event.getSource().getElement();
       // var selected = component.textContent;
        console.log(event.getSource().getElement());
        //var resultCmp = component.find("radioResult");
       // resultCmp.set("v.value", selected);
    },
    
    
    NextBookingPart : function(component, event, helper) {
    	console.log($('input[name=leadName]:checked', '#myForm').val());
        
        
    },
    
    OrderSearchuser: function(component, event, helper) {
        if($('#OrderSearchId').val().length!=0){
            helper.showSpinner(component,event,'spinner3');//
            $('#SearchResult3').html('');
            var action = component.get("c.SearchLead");
            action.setParams({ 
                "SearchName": $('#OrderSearchId').val()
            });
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var resultList=response.getReturnValue();
                   
                    component.set('v.Orderleadlist', resultList); 
                    helper.hideSpinner(component,event,'spinner3');
                    if(resultList.length==0){
                        $('#SearchResult3').html('No result Found in Database, Please create new user');
                    }else{
                        $('#SearchResult3').html('');
                    }
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
            
        }
        
    },
    EmailSearchuser: function(component, event, helper) {
        if($('#InputSearchId2').val().length!=0){
            helper.showSpinner(component,event,'spinner2');//
            $('#SearchResult2').html('');//console.log('Search user');//console.log( component.find("InputSearchuser").get("v.value"));
            var action = component.get("c.SearchLead");
            action.setParams({ 
                "SearchName": $('#InputSearchId2').val()
            });
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var resultList=response.getReturnValue();
                    console.log(resultList.length);
                    component.set('v.Emailleadlist', resultList); 
                    helper.hideSpinner(component,event,'spinner2');
                    if(resultList.length==0){
                        $('#SearchResult2').html('No result Found in Database, Please create new user');
                    }else{
                        $('#SearchResult2').html('');
                    }
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
            
        }
        
        
        
    },
    Searchuser : function(component, event, helper) {
        if($('#InputSearchId').val().length!=0){
            helper.showSpinner(component,event,'spinner');//
            $('#SearchResult').html('');//console.log('Search user');//console.log( component.find("InputSearchuser").get("v.value"));
            var action = component.get("c.SearchLead");
            action.setParams({ 
                "SearchName": $('#InputSearchId').val()
            });
            
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var resultList=response.getReturnValue();
                    console.log(resultList.length);
                    component.set('v.leadlist', resultList); 
                    helper.hideSpinner(component,event,'spinner');
                    if(resultList.length==0){
                        $('#SearchResult').html('No result Found in Database, Please create new user');
                    }else{
                        $('#SearchResult').html('');
                    }
                }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            $A.enqueueAction(action);
            
        }
        
        
    },
    PressShare: function(component, event, helper) {
        if(event.target.id){
            helper.toggleClass(component,'backdropshare','slds-backdrop--');
            helper.toggleClass(component,'modaldialogShare','slds-fade-in-');
            var currentID= event.target.id;
            var TempString= currentID.split("_");
            helper.UpdateDIVbyid(component,TempString[0],'ShareModalDIVPart');
        }else{
            alert('Cannot get ID,Press button again!');
            console.log(event.target.getAttribute("id"));
        }
    },
    hideShareModal: function(component, event, helper) {
        
        helper.toggleClassInverse(component,'backdropshare','slds-backdrop--');
        helper.toggleClassInverse(component,'modaldialogShare','slds-fade-in-');
        
    },
    Pressbooking : function(component, event, helper) {
        if(event.target.id){
            helper.toggleClass(component,'backdrop4','slds-backdrop--');
            helper.toggleClass(component,'modaldialogBooking','slds-fade-in-');
            var currentID= event.target.id;
            var TempString= currentID.split("_");//console.log('Press booking: '+TempString[0]);
            component.set('v.selectID', TempString[0]);
            helper.UpdateDIVbyid(component,TempString[0],'TestDriveBookingDIVPart');
        }else{
            alert('Cannot get ID,Press button again!');
            console.log(event.target.getAttribute("id"));
        }
        
        
        
        // console.log(event.target.id);
        //  console.log(component.get("v.counts"));
        //Draw modal
        //
        //$('#modalTitle').html('Booking');// modalTitle  modalBody
        //$('#modalBody').html('Bokking HTML');//
        
        // $('#modalbuttonContent').html('Process'); //$('#modalbutton').attr('onclick','ProcessChoose();');
        //$('#ModalPart').modal('show');
        
    },
    hideBookingModal: function(component, event, helper) {
        
        helper.toggleClassInverse(component,'backdrop4','slds-backdrop--');
        helper.toggleClassInverse(component,'modaldialogBooking','slds-fade-in-');
        
    },
    
    PressOrder : function(component, event, helper) {
        // console.log(event.target.id);
        // console.log(component.get("v.counts"));
        if(event.target.id){
            helper.toggleClass(component,'backdrop','slds-backdrop--');
            helper.toggleClass(component,'modaldialog','slds-fade-in-');
            var currentID= event.target.id;
            var TempString= currentID.split("_");
            helper.UpdateDIVbyid(component,TempString[0],'CreateOrderDIVPart');//console.log(TempString[0]);
            component.set('v.selectID', TempString[0]);
        }else{
            alert('Cannot get ID,Press button again!');
            console.log(event.target.getAttribute("id"));
        }
        
    },
    
    hideorderModal  : function(component, event, helper) {
        
        helper.toggleClassInverse(component,'backdrop','slds-backdrop--');
        helper.toggleClassInverse(component,'modaldialog','slds-fade-in-');
        
    },
    
    orderSave  : function(component, event, helper) {
        
        //console.log(component.find("InputAccountDynamic").get("v.value"));   
        //console.log(component.find("VehicleOrderDate").get("v.value"));
        //console.log(component.find("ContractNumber").get("v.value"));
        // console.log(component.find("OrderAmount").get("v.value"));
        //console.log(component.find("BillingAddress").get("v.value"));
        var tempdate =new Date(component.find("VehicleOrderDate").get("v.value"));
        console.log(tempdate.getDate());
        console.log(tempdate.getMonth());
        
        var yearnumber=tempdate.getFullYear();
        if(yearnumber<1000){
            yearnumber=yearnumber+2000;
        }
        var action = component.get("c.saveVehicleOrder");
        action.setParams({ 
            "BillingAddress": component.find("BillingAddress").get("v.value"),
            "ContractNumber":component.find("ContractNumber").get("v.value"),
            "OrderAmount":component.find("OrderAmount").get("v.value"),
            "VehicleVersion":component.get('v.selectID'),
            "yy":yearnumber,//String(tempdate.getFullYear()),
            "mm":String(tempdate.getMonth()),
            "dd":String(tempdate.getDate()),
            "AccountID":component.find("InputAccountDynamic").get("v.value"),
            "ContactID":component.find("CustomerSignedBy").get("v.value")
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //console.log(response.getReturnValue());
                
                helper.toggleClassInverse(component,'backdrop','slds-backdrop--');
                helper.toggleClassInverse(component,'modaldialog','slds-fade-in-');
                var resultobject =response.getReturnValue();
                var inHTML='<a href="https://elufa-sdfc-poc-dev-ed.lightning.force.com/'+resultobject+'">click this</a>'    
                
                $('#Modalbody').html('Save Success!!'+inHTML);
                helper.toggleClass(component,'backdrop3','slds-backdrop--');
                helper.toggleClass(component,'modaldialogResult','slds-fade-in-');
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
        
        
    },
    hideResultModal: function(component, event, helper) {
        helper.toggleClassInverse(component,'backdrop3','slds-backdrop--');
        helper.toggleClassInverse(component,'modaldialogResult','slds-fade-in-');
    },
    
    
    hideEmailModal: function(component, event, helper) {
        helper.toggleClassInverse(component,'backdrop2','slds-backdrop--');
        helper.toggleClassInverse(component,'modaldialogSend','slds-fade-in-');
        
    },
    
    SendEmailModal:  function(component, event, helper) {
        console.log('SendEmailModal!');
        helper.toggleClass(component,'backdrop2','slds-backdrop--');
        helper.toggleClass(component,'modaldialogSend','slds-fade-in-');
    },
    
    SendEmail:  function(component, event, helper) {
        console.log('SendEmail!!'+component.get('v.CompareTableHTML'));//console.log(component.get('v.CompareTableHTML'));     
        
        
        var action = component.get("c.SendingEmail");
        action.setParams({ 
            "Emailbody": component.get('v.CompareTableHTML'),
            "EmailAddress": component.find("InputEmail").get("v.value")
            
        });	
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                helper.toggleClassInverse(component,'backdrop2','slds-backdrop--');
                helper.toggleClassInverse(component,'modaldialogSend','slds-fade-in-');
                
                
                $('#Modalbody').html(response.getReturnValue());
                helper.toggleClass(component,'backdrop3','slds-backdrop--');
                helper.toggleClass(component,'modaldialogResult','slds-fade-in-');
                
                
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                console.log(errors);
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + 
                                    errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
        
        
    },
    
    
    PressFindLocater : function(component, event, helper) {
        console.log(event.target.id);
        console.log(component.get("v.counts"));
    },
    
    PressCompare2 : function(component, event, helper) {
       
        //var whichOne = event.getSource().getLocalId(); console.log(event.target.id);
        //console.log(event.target.getAttribute("id"));
        if(event.target.id){
            
            var currentID= event.target.id;
            var className=$("#"+currentID).attr('class');
            var VersionListMap=component.get('v.VersionListMap');
            var TempString= currentID.split("_");
            var CompareProductIdList=component.get('v.CompareProductIdList');
            
            
            if(className.toLowerCase().indexOf("btn-success")>0 && className.toLowerCase().indexOf("btn-default")<0){
                //Remove
                $("#"+currentID).removeClass('btn-success');
                $("#"+currentID).addClass('btn-default');
                CompareProductIdList.splice(CompareProductIdList.indexOf(TempString[0]),1);
            }
            if(CompareProductIdList.length>3){
                alert('Cannot Compare More Than 4 Vehicles Each Time.');
            }else{
                if(className.toLowerCase().indexOf("btn-success")<0 && className.toLowerCase().indexOf("btn-default")>0){
                    //Add
                    $("#"+currentID).addClass('btn-success');
                    $("#"+currentID).removeClass('btn-default');
                    CompareProductIdList.push(TempString[0]);
                }
                
                var CompareList=[];
                for(var i=0;i<VersionListMap.length;i++){
                    /*console.log(VersionListMap[i].data.Id);
                if(TempString[0]==VersionListMap[i].data.Id){
                    console.log('VersionListMap[i].data.Id');
                    CompareList.push(VersionListMap[i].data);
                    
                }*/
                    if(CompareProductIdList.indexOf(VersionListMap[i].data.Id)>-1){
                        CompareList.push(VersionListMap[i].data);
                    }
                    
                }
                component.set('v.CompareProductIdList', CompareProductIdList);
                //Draw Table again
                if(CompareList.length>0){
                    if(CompareList.length<5){
                        if(navigator.userAgent.match('(Mobi)')){
                            component.set('v.DisplayCompareTable', true);
                        }
                        helper.createTable(component,CompareList);
                    }else{
                        alert('Cannot Compare More Than 4 Vehicles Each Time.');
                    }
                    
                }else{
                    $('#CompareTable').html('');
                    component.set('v.Displaybtn', false);
                    component.set('v.DisplayCompareTable', false);
                }
            }
            
            
            
        }else{
            alert('Cannot get ID,Press button again!');
            console.log(event.target.getAttribute("id"));
        }
        
    },
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    PressCompare : function(component, event, helper) {
        console.log(event.target.id);//console.log(typeof event.target.id); event.target.getAttribute("data-id");
        
        
        if(event.target.id){// console.log(event.target);
            
            var currentID= event.target.id;
            var className=$("#"+currentID).attr('class'); //console.log(className);
            var VersionListMap=component.get('v.VersionListMap');
            var CompareProductIdList=component.get('v.CompareProductIdList');
            
            var TempString= currentID.split("_");
            
            //console.log(TempString[0]);
            // change button color
            if(className.toLowerCase().indexOf("btn-success")<0 && className.toLowerCase().indexOf("btn-default")>0){
                //Add
                $("#"+currentID).addClass('btn-success');
                $("#"+currentID).removeClass('btn-default');
                
                CompareProductIdList.push(VersionListMap[TempString[0]].data.Id);
            }
            if(className.toLowerCase().indexOf("btn-success")>0 && className.toLowerCase().indexOf("btn-default")<0){
                //Remove
                $("#"+currentID).removeClass('btn-success');
                $("#"+currentID).addClass('btn-default');
                CompareProductIdList.splice(CompareProductIdList.indexOf(VersionListMap[TempString[0]].data.Id),1);
            }
            
            // console.log(CompareProductIdList);
            
            var CompareList=[];
            for(var i=0;i<VersionListMap.length;i++){
                console.log(VersionListMap[i].data.Id);
                if(CompareProductIdList.indexOf(VersionListMap[i].data.Id)>-1){
                    CompareList.push(VersionListMap[i].data);
                }
            }
            
            console.log(CompareList);
            
            //Draw Table again
            if(CompareList.length>0){
                if(CompareList.length<5){
                    helper.createTable(component,CompareList);
                }else{
                    alert('Cannot Compare More Than 4 Vehicles Each Time.');
                }
                
            }else{
                $('#CompareTable').html('');
            }
            //helper.createTable(component,CompareProductIdList);
            
            //console.log($("#"+currentID).attr('class'));//console.log(component.get("v.counts"));
            
        }else{
            console.log('Cannot get ID');
            console.log(event.target);
            
        }
        
    }
    
})