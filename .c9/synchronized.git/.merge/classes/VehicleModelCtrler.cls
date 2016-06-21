public class VehicleModelCtrler {
    public ApexPages.StandardController standardController {get;set;}
    public Vehicle_Model__c Header {get;set;}
    public List<Attachment> AttachmentList {get;set;} {AttachmentList= new List<Attachment>();} 
    public List<Vehicle_Version__c> VVList  {get;set;} {VVList= new List<Vehicle_Version__c>();} 
    public String summaryUrl {get;set;} {summaryUrl=null;}
    public String FisrstUrl {get;set;} {summaryUrl=null;}
    
    public VehicleModelCtrler(ApexPages.StandardController standardController){// public VehicleModelCtrler(){
        this.standardController = standardController;
        this.Header = (Vehicle_Model__c) this.standardController.getRecord();
        if(this.Header !=null && this.Header.Id !=null){
            for(Vehicle_Model__c vm: [select Id,name,Image_URL__c,Description_2__c,Description1__c from Vehicle_Model__c where id =: this.Header.Id limit 1]){
                this.Header =vm;
            }
			init();
        }
    }
    //Test :https://elufa-sdfc-poc-dev-ed--c.ap2.visual.force.com/apex/Testing?&id=a092800000DoDT2
    public void init() {
        AttachmentList=[select id,Name,Description from Attachment where ParentId= :Header.Id order by name];
        summaryUrl=Header.Image_URL__c;
        VVList=[select id,name,AC_2_3kW__c,
                            AC_3_6kW__c,Price__c,Image__c,
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
                            Width__c  from Vehicle_Version__c where Vehicle_Model__c=:Header.Id];
        
        if(VVList.size()>0){
            FisrstUrl=VVList[0].Image__c;
        }else{
            FisrstUrl=Header.Image_URL__c;
        }
        
    }
}