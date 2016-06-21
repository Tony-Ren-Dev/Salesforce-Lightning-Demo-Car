public class SignatureController {
    
    public Vehicle_Order__c Header {get;set;}
    public ApexPages.StandardController standardController {get;set;}
    
    public SignatureController(ApexPages.StandardController standardController){// public VehicleModelCtrler(){
        this.standardController = standardController;
        this.Header = (Vehicle_Order__c) this.standardController.getRecord();
        if(this.Header !=null && this.Header.Id !=null){
            for(Vehicle_Order__c vo: [select Id,name from Vehicle_Order__c where id =: this.Header.Id limit 1]){
                this.Header =vo;
            }
            //init();
        }
    }
    // Test https://elufa-sdfc-poc-dev-ed--c.ap2.visual.force.com/apex/signature_pad?scontrolCaching=1&id=a0D28000007yBWt 
    @RemoteAction
    public static string insertSignature(string VehicleOrder,string imageURL){  
        String urllink;
        
         Attachment attach = new Attachment();
        attach.contentType = 'image/png';
        attach.name = 'Signature';
        attach.parentId = VehicleOrder;
        attach.body = EncodingUtil.base64Decode(imageURL);
        insert attach;
        
        
        return attach.id;
    }
    
}