/** Client-side Controller **/
({
  getNumbers: function(component, event, helper) {
    var numbers = [];
    for (var i = 0; i < 20; i++) {
      numbers.push({
        value: i
      });
    }
    component.set("v.numbers", numbers); 
    }, getN2: function(component, event, helper) {
         component.set("v.numbers", []); 
        
    },
    initScripts: function(component, event, helper) {
        //Ignore duplicate notifications that may arrive because other components 
        //loading scripts using the same library. 
        if (component.alreadyhandledEvent)  
            return;
        
        var btn = component.find("modalToggle").getElement();
        var dlg = component.find("modalDlg").getElement();
        jQuery(btn).on("click", function() {
            jQuery(dlg).modal();
        });
        component.alreadyhandledEvent = true;
    },ShowModal1: function(component, event, helper) {
       console.log('ShowModal1  '); 
        var dlg = component.find("modalDlg").getElement();
        //dlg.modal('show');
        console.log(dlg)
    },showOppmodal: function(component, event, helper) {
		 //Toggle CSS styles for opening Modal
		helper.toggleClass(component,'backdrop','slds-backdrop--');
		helper.toggleClass(component,'modaldialog','slds-fade-in-');
		
	}
    
})