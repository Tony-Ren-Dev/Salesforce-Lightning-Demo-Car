({
    doInit : function(component, event, helper) {
          helper.doInit(component, event);
        
    },Pressbtn : function(component, event, helper) {
        console.log(event.target.id);
    },CompareClick : function(component, event, helper) {
        console.log(event);
        
    }
})