public class VehicleCompareController {
   
    @AuraEnabled
    public Integer numAccounts {get; set;}
    
    @AuraEnabled
    public List<Vehicle_Version__c> VehicleList {get; set;}
    @AuraEnabled
    public List<Vehicle_Model__c> ModelList {get; set;}
    
        
        
    @AuraEnabled
    public static VehicleCompareController GetVehicleCompare(){
        VehicleCompareController result=new VehicleCompareController();
        result.VehicleList=[select id,Image__c from Vehicle_Version__c];
        result.numAccounts=[select count() from Account];
        result.ModelList=[select Id,Name,Active_for_Sales__c from Vehicle_Model__c where Number_of_Versions__c >0 and Active_for_Sales__c =true];
        
        return result;
    }
    
 
}