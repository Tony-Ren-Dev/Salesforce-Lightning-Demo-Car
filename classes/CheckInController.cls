public with sharing class CheckInController
{
  // Geo location: longitude and latitude
  public String geolocation {get; set;}
  // Post text
  public String text {get; set;}
  // Error or Info
  public String error {get;set;}
 
  public CheckInController(ApexPages.StandardController con)
  {
     // TO DO : In case of Standard pages
  }
 
  // Post to chatter with geolocation
  public void checkIn()
  {
     // Check if geolocation found or not
     if(geolocation==null)
     {
        error = 'Unable to retreive location';
        return;
     }
 
     if(text == null || text.trim().length()==0)
     {
        error = 'Nothing to post';
        return;
     }
 
     try
     {
        // Post to chatter of current user
        FeedItem post = new FeedItem();
        post.ParentId = Userinfo.getUserId();
        post.Body = text;
        post.Type = 'LinkPost';
        post.LinkUrl = 'http://maps.google.com/maps?q=' + geolocation;
        insert post;
        error = 'Posted Successfully !';
     }
     catch(Exception ex)
     {
        error = ex.getMessage();
     }
  }
}