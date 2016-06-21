public class VehicleVersionController {
   // CreateNewUser
   
    @AuraEnabled
    public static List<Lead> SearchLead(String SearchName){
        List<Lead>  LeadList = new List<Lead>();
        SearchName=SearchName+'%';
        LeadList=[select id,Name from Lead where name like:SearchName ];
        return LeadList;
    }
    
     @AuraEnabled
    public static String CreateLead(String UserName,String UserEmail){ 
        String Msg='';
         System.Savepoint sp = database.setSavepoint();
        try {
           // Lead ld= new Lead(Name=UserName,Email=UserEmail);
        }catch (DmlException dmle) {
            database.rollback(sp);
            Msg=dmle.getMessage();
            
        } catch (Exception e) {
            database.rollback(sp);
            Msg=e.getMessage();
            
        } 
        return Msg;
    }
    
    @AuraEnabled
    public static String saveVehicleOrder(String BillingAddress,String ContractNumber,decimal OrderAmount,string VehicleVersion,integer yy,integer mm,integer dd,string AccountID,string ContactID) {
        // Perform isUpdateable() check here          ,String ContractNumber,string OrderAmount,
        //upsert expense;
        /*
        Vehicle_Order__c vo= new Vehicle_Order__c(Billing_Address__c=BillingAddress,
        Contract_Number__c=ContractNumber,
        Vehicle_Version__c=VehicleVersion,
        Order_Amount__c=decimal.valueOf(OrderAmount)
        );
        */
        String Msg='';
        Date newDate =  date.newInstance(integer.valueOf(yy), integer.valueOf(mm)+1, integer.valueOf(dd));//date.newInstance(1998, 10, 21);
        // date.newInstance(integer.valueOf(yy), integer.valueOf(mm)+1, integer.valueOf(dd));// Date.newInstance(yy,mm,dd);//OrderDate.substring(4, 1), OrderDate.substring(2, 4), OrderDate.substring(0, 2));
        //CustomerSignedBy__c
         System.Savepoint sp = database.setSavepoint();
        try {
            Vehicle_Order__c vo= new Vehicle_Order__c(Billing_Address__c=BillingAddress,//string.valueOf(yy),//BillingAddress,
                                                      Contract_Number__c=ContractNumber,
                                                      Vehicle_Version__c=VehicleVersion,
                                                      Order_Amount__c=OrderAmount,
                                                      Status__c='Open',
                                                      Order_Date__c=newDate,
                                                      Account__c=AccountID,
                                                      CustomerSignedBy__c=ContactID
                                                     );
            
            insert vo;
            Msg=vo.id;
            
        }catch (DmlException dmle) {
            database.rollback(sp);
            Msg=dmle.getMessage();
            
        } catch (Exception e) {
            database.rollback(sp);
            Msg=e.getMessage();
            
        } 
        return Msg;
    }
    
    
    
    
     @AuraEnabled
    public static String SendingEmail(String Emailbody,String EmailAddress){
        //Testing Email : tony.ren@elufasys.com
        
        String Msg='';
        System.Savepoint sp = database.setSavepoint();
        try {
            List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
            
            Messaging.SingleEmailMessage mail =  new Messaging.SingleEmailMessage();
            List<String> sendTo = new List<String>();
            sendTo.add(EmailAddress);
            mail.setToAddresses(sendTo);
            mail.setReplyTo('tony.ren@elufasys.com');
            mail.setSenderDisplayName('Tony Send');
            List<String> ccTo = new List<String>();
            //ccTo.add('prsg.sfdc@gmail.com');
            //mail.setCcAddresses(ccTo);
            
            mail.setSubject('Compare Table');
            mail.setHtmlBody(Emailbody);
            mails.add(mail);
            Messaging.sendEmail(mails);
            Msg='Send Success!!';
        }catch (DmlException dmle) {
            database.rollback(sp);
            Msg=dmle.getMessage();
            
        } catch (Exception e) {
            database.rollback(sp);
            Msg=e.getMessage();
            
        } 
        return Msg;
    }
    
    
    
    @AuraEnabled
    public Integer numAccounts {get; set;}
    
    @AuraEnabled
    public List<Vehicle_Version__c> VehicleList {get; set;}
    @AuraEnabled
    public List<Vehicle_Model__c> ModelList {get; set;}
    
    @AuraEnabled
    public List<Account> AccountList {get; set;}
    
    @AuraEnabled
    public List<Contact> ContactList {get; set;}
    
    @AuraEnabled 
    public List<Locator__c> LocatorList {get; set;}
    
    
    @AuraEnabled
    public static VehicleVersionController GetVehicleCompare(){
        VehicleVersionController result=new VehicleVersionController();
        result.LocatorList=[SELECT Id,Name FROM Locator__c];
        result.VehicleList=[select id,Image__c,Name,AC_2_3kW__c,
                            AC_3_6kW__c,Price__c,
                            Acceleration__c,
                            Active_for_Sales__c,Vehicle_Model__r.Name,
                            Battery__c,
                            Battery_Norminal_Storage__c,
                            DC_40kW_CCS__c,
                            Displacement_ml__c,
                            Doors__c,
                            Driving_Range__c,
                            Electrical_Power_Consumption__c,
                            Emission_Standard__c,
                            Engine__c,
                            Extra_Cost__c,
                            Fuel_Consumption__c,
                            Fuel_Type__c,
                            Gearbox__c,
                            Height__c,
                            Highlight__c,
                            Kerb_Weight__c,
                            Length__c,
                            Max_full_load_weight_kg__c,
                            Max_output_PS_kW_at_rpm__c,
                            Max_torque_Nm_at_rpm__c,
                            Motor_electric_engine__c,
                            Photo__c,
                            Top_Speed__c,
                            Vehicle_Model__c,
                            Wheelbase__c,
                            Wheel_Profile__c,
                            Wheel_Rim_Size__c,
                            Wheels_Description__c,
                            Wheels_Materials__c,
                            Wheel_Speed_Rating__c,
                            Wheels_Size_inch__c,
                            Wheel_Width__c,
                            Width__c from Vehicle_Version__c order by Price__c];
        result.numAccounts=[select count() from Account];
        result.ModelList=[select Id,Name,Active_for_Sales__c from Vehicle_Model__c where Number_of_Versions__c >0 and Active_for_Sales__c =true];
        
        result.AccountList=[select id, name from account ];
        result.ContactList=[select id,name from Contact];
        //select id,name from Contact
        return result;
    }
    
}