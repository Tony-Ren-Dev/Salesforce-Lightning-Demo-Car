({
    
    doInit : function(component, event) {
        var ResultObject;
        //https://elufa-sdfc-poc-dev-ed.lightning.force.com/auradocs/reference.app#
        
        
       // document.title = "Vehicle Manage All Page!";
        var action = component.get("c.GetVehicleCompare");
        
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                 var opts = [];
                //console.log(response.getReturnValue());
                ResultObject=response.getReturnValue();
                component.set('v.counts', response.getReturnValue());
                
                var displayList=[];
                for(var i=0;i<ResultObject.VehicleList.length;i++){  
                    if(i<12){ 
                        var temp = new Object();
                        temp.id=i;
                        temp.data=ResultObject.VehicleList[i];
                        displayList.push(temp);
                    }
                    
                }
                component.set('v.displayItems', displayList);
                
                
                var PriceList=[];
                
                var tempListMap=[];
                for(var i=0;i<ResultObject.VehicleList.length;i++){  
                    if(i<12){ 
                        var tempid=ResultObject.VehicleList[i].Id+'_Com';
                        var imageHTML='<div  id='+tempid+' ><img src='+ResultObject.VehicleList[i].Image__c+' alt="Car" style="width:14.8em;height:8em"><br/>'
                        +ResultObject.VehicleList[i].Name+'</div>';
                        var divid=i+1;
                        $('#'+divid+'_div').append(imageHTML);
                        
                    }
                    var temp = new Object();
                    temp.id=i;
                    temp.data=ResultObject.VehicleList[i];
                    tempListMap.push(temp);
                    
                    
                    PriceList.push(ResultObject.VehicleList[i].Price__c);
                }
                //
                component.set('v.VersionListMap', tempListMap);
                
                
                 //************************ Price *********************************************************
                PriceList.sort();
                component.set('v.PriceList', PriceList);
                var maxamount=PriceList[PriceList.length-1];
                opts = [];
                var Tempamount = {class:"optionClass", label:0, value:0};
                opts.push(Tempamount);
                
                for(var i=200000;i<410000;i=10000+i){  
                    var temp = {class:"optionClass", label:i, value:i};
                    opts.push(temp);
                }
                component.find("InputMinAmount").set("v.options", opts);
                component.find("InputMaxAmount").set("v.options", opts);
                
                
                // CurrentOrder 
                component.set('v.CurrentOrder', 12);
                
                $("#PreviousDiv").prop("readonly", true);
                //
                
                //*********************************************************************************
                opts = [];
                var tempAccount = {class:"optionClass", label:'', value:''};
                opts.push(tempAccount);
                for(var i=0;i<ResultObject.AccountList.length;i++){ // console.log(ResultObject.AccountList[i]);
                    var temp = new Object();
                    temp.class="optionClass";
                    temp.label=ResultObject.AccountList[i].Name;
                    temp.value=ResultObject.AccountList[i].Id;
                    opts.push(temp);
                }
                
                
                component.find("InputAccountDynamic").set("v.options", opts);
                //*********************************************************************************
                
                //CustomerSignedBy
                opts = [];
                tempAccount = {class:"optionClass", label:'', value:''};
                opts.push(tempAccount);
                for(var i=0;i<ResultObject.ContactList.length;i++){  
                    var temp = {class:"optionClass", label:ResultObject.ContactList[i].Name, value:ResultObject.ContactList[i].Id};
                    opts.push(temp);
                }
                component.find("CustomerSignedBy").set("v.options", opts);
                
                //locationDiv
                opts = [];
                for(var i=0;i<ResultObject.LocatorList.length;i++){  
                    var temp = {class:"optionClass", label:ResultObject.LocatorList[i].Name, value:ResultObject.LocatorList[i].Id};
                    opts.push(temp);
                }
                component.find("locationDiv").set("v.options", opts);
                
                
                
            }
            else if (state === "ERROR") {
                //alert('Error : ' + JSON.stringify(errors));
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
      showSpinner : function (component,event,componentId) {
        var spinner = component.find(componentId);
         // console.log(spinner.get("e.toggle"));
        var evt = spinner.get("e.toggle");
        evt.setParams({ isVisible : true });
        evt.fire();
    },
    
    hideSpinner : function (component,event,componentId) {
       var spinner = component.find(componentId);//spinner
       var evt = spinner.get("e.toggle");
       evt.setParams({ isVisible : false });
       evt.fire();    
    },
    
    createTable : function(component, CompareList) {
        console.log('Enter'+CompareList);
        
        
        
        var CompareTableHtml=' <table class="table"><thead><tr><th> &nbsp;</th>';
        for(var i=0;i<CompareList.length;i++){
            CompareTableHtml+='<th><strong>'+CompareList[i].Name+'</strong></th>';
        }
        CompareTableHtml+='</tr> </thead><tbody><tr><td><strong>Model</strong></td>';
        
        //Vehicle Model
        for(var i=0;i<CompareList.length;i++){
            CompareTableHtml+='<td>'+CompareList[i].Vehicle_Model__r.Name+'</td>';
        }    
        
        //Highlight__c
        //
         CompareTableHtml+='</tr> </thead><tbody><tr><td style="width:10em" ><strong>Highlight</strong></td>';
        
        //Vehicle Model
        for(var i=0;i<CompareList.length;i++){
            var Highlight;
            if (typeof CompareList[i].Highlight__c== 'undefined'){
                Highlight='-';
            }else{
                Highlight=CompareList[i].Highlight__c;
            }
            CompareTableHtml+='<td style="width:10em">'+Highlight+'</td>';
        }    
        
        
        //Price__c
        //
        CompareTableHtml+='</tr> </thead><tbody><tr><td><strong>Price</strong></td>';
        
        //Vehicle Model
        for(var i=0;i<CompareList.length;i++){
             var pricenumber=CompareList[i].Price__c.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //CompareTableHtml+='<td>'+CompareList[i].Price__c+'</td>';
             CompareTableHtml+='<td> $'+pricenumber+'</td>';
        }    
        
        
        
        //Door Doors__c
        CompareTableHtml+='</tr><tr><td><strong>Doors</strong></td>'
        for(var i=0;i<CompareList.length;i++){
            CompareTableHtml+='<td>'+CompareList[i].Doors__c+'</td>';
        } 
        
        //Engine__c
        CompareTableHtml+='</tr><tr><td><strong>Engine</strong></td>'
        for(var i=0;i<CompareList.length;i++){
            var Engine;
            if (typeof CompareList[i].Engine__c== 'undefined'){
                Engine='-';
            }else{
                Engine=CompareList[i].Engine__c;
            }
            
            CompareTableHtml+='<td>'+Engine+'</td>';
        } 
        
        //Fuel_Type__c
        CompareTableHtml+='</tr><tr><td><strong>Fuel Type</strong></td>'
        for(var i=0;i<CompareList.length;i++){
             var FuelType;
            if (typeof CompareList[i].Fuel_Type__c== 'undefined'){
                FuelType='-';
            }else{
                FuelType=CompareList[i].Fuel_Type__c;
            }
            
            CompareTableHtml+='<td>'+FuelType+'</td>';
        } 
        //
        //
        CompareTableHtml+='</tr><tr><td><strong>Battery</strong></td>'
         for(var i=0;i<CompareList.length;i++){
            var Battery;
            if (typeof CompareList[i].Battery__c== 'undefined'){
                Battery='-';
            }else{
                Battery=CompareList[i].Battery__c;
            }
            
            CompareTableHtml+='<td>'+Battery+'</td>';
        } 
        
        //Displacement_ml__c
        CompareTableHtml+='</tr><tr><td><strong>Displacement (ml)</strong></td>'
        for(var i=0;i<CompareList.length;i++){
            var Displacement;
            if (typeof CompareList[i].Displacement_ml__c== 'undefined'){
                Displacement='-';
            }else{
                Displacement=CompareList[i].Displacement_ml__c;
            }
            
            CompareTableHtml+='<td>'+Displacement+'</td>';
        } 
        
        // Max. output, PS (kW) at rpm
        CompareTableHtml+='</tr><tr><td><strong>Max. output, PS (kW) at rpm</strong></td>'
        for(var i=0;i<CompareList.length;i++){
            CompareTableHtml+='<td>'+CompareList[i].Max_output_PS_kW_at_rpm__c+'</td>';
        } 
        
        //
        CompareTableHtml+='</tr><tr><td><strong>Max. torque, Nm at rpm </strong> </td>'
        for(var i=0;i<CompareList.length;i++){
            CompareTableHtml+='<td>'+CompareList[i].Max_torque_Nm_at_rpm__c+'</td>';
        } 
        
        
        //Gearbox Gearbox__c
        CompareTableHtml+='</tr><tr><td><strong>Gearbox </strong></td>'
        for(var i=0;i<CompareList.length;i++){
            CompareTableHtml+='<td>'+CompareList[i].Gearbox__c+'</td>';
        } 
        
        //Wheels Description
        CompareTableHtml+='</tr><tr><td><strong>Wheels</strong></td>'
        for(var i=0;i<CompareList.length;i++){
            CompareTableHtml+='<td>'+CompareList[i].Wheels_Description__c+'</td>';
        } 
        
        
        
        //End OF TD
        CompareTableHtml+='</tr></tbody>';
        
        CompareTableHtml+='</table>';
        
        
         if(navigator.userAgent.match('(Mobi)')){
             component.set('v.CompareList', CompareList);
        }else{
            $('#CompareTable').html(CompareTableHtml);
        }
        
        var temphtml= CompareTableHtml.replace('<table class="table">', '<table class="table"  border="1" >');
        component.set('v.CompareTableHTML', temphtml);
        
        component.set('v.Displaybtn', true);// console.log(component.get('v.Displaybtn'));
    },
    
     UpdateDIVbyid: function(component,VersionId,DivName) {
         console.log(DivName+'UpdateDIVbyid'+VersionId);    
         var VersionList= component.get('v.VersionListMap');
         var DivHTML='( ';
         for(var i=0;i<VersionList.length;i++){
             console.log(VersionList[i].data); 
             if(VersionId==VersionList[i].data.Id){
                 DivHTML+=VersionList[i].data.Name
             }
         } 
         DivHTML=DivHTML+' )';
         $('#'+DivName).html(DivHTML);
     },
    
    ClearDIVPart:function(component,DivName) {
        $('#'+DivName).html('');
    },
    
    toggleClass: function(component,componentId,className) {
        var modal = component.find(componentId);
        $A.util.removeClass(modal,className+'hide');
        $A.util.addClass(modal,className+'open');
    },
    
    toggleClassInverse: function(component,componentId,className) {
        var modal = component.find(componentId);
        $A.util.addClass(modal,className+'hide');
        $A.util.removeClass(modal,className+'open');
    }
    
})