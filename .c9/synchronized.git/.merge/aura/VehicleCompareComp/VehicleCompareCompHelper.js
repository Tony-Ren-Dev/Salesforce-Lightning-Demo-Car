({
  
    doInit : function(component, event) {
        document.title = "Vehicle Model Compare Page!";
        var action = component.get("c.GetVehicleCompare");
       
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //Pass value 
                ResultObject=response.getReturnValue();
                component.set('v.counts', response.getReturnValue());
            }
            else if (state === "ERROR") {
                alert('Error : ' + JSON.stringify(errors));
            }
        });
        $A.enqueueAction(action);
        
    }
    
})