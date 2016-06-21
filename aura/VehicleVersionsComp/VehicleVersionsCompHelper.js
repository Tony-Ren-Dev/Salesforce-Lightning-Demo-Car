({
    
    doInit : function(component, event) {
        var ResultObject;
        //https://elufa-sdfc-poc-dev-ed.lightning.force.com/auradocs/reference.app#

        
        document.title = "Vehicle Manage All Page!";
        var action = component.get("c.GetVehicleCompare");
        
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                //console.log(response.getReturnValue());
                ResultObject=response.getReturnValue();
                console.log(response.getReturnValue());
                component.set('v.counts', response.getReturnValue());
                
                var ListViewHTML='<div class="border row">';
                var countnum=0;
                for(var i=0;i<ResultObject.VehicleList.length;i++){  
                    var tempid=ResultObject.VehicleList[i].Id+'_Com';
                    //console.log(ResultObject.VehicleList[i]);
                    if(i<12){ 
                        ListViewHTML+='<div class="border col-md-3"> <div class="panel panel-default" id='+ResultObject.VehicleList[i].Id+'><div class="panel-body">'
                        +'<img src='+ResultObject.VehicleList[i].Image__c+' alt="Mountain View" style="width:14.8em;height:8em"> <br/>'
                        +ResultObject.VehicleList[i].Name+
                            '<br/>'+
                            '<button  type="button" class="btn btn-default"  title="booking" ><span class="glyphicon glyphicon-calendar" aria-hidden="true"></span> </button> &nbsp;&nbsp;'+
                             '<button  type="button" class="btn btn-default"  title="Order!"  ><span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span> </button>&nbsp;&nbsp;'+
                            '<button    type="button" class="btn btn-default"  title="Find Locater!"  ><span class="glyphicon glyphicon-screenshot" aria-hidden="true"></span> </button>&nbsp;&nbsp;'+
                            '<button onclick="CompareClick(\''+ResultObject.VehicleList[i].Id+'\');" id='+tempid+'  type="button" class="btn btn-default"    title="Compare"  ><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span> </button>&nbsp;&nbsp;'+
                            
                            '</div></div></div>';
                    }
                    // (\''+ResultObject.VehicleList[i].Id+'\')
                    if(countnum>2){
                        countnum=0;
                        ListViewHTML+='</div><div class="border row">';
                    }else{
                        countnum++;
                    }
                    
                }
                ListViewHTML+='</div>';
                 
                //$('#ListView').append(ListViewHTML);
                document.getElementById("ListView").innerHTML=ListViewHTML;
                //$('#ListView').html(ListViewHTML);
               //  $('[data-toggle="tooltip"]').tooltip(); 
            }
            else if (state === "ERROR") {
                alert('Error : ' + JSON.stringify(errors));
            }
        });
        
        $A.enqueueAction(action);
        
        
        
        
        
    }
    
})