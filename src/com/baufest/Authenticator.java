package com.baufest;

import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

@Path("/authenticate")
public class Authenticator {
    // This method is called if XMLis request
    @GET
    @Produces( { MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON })
    public UserAuthentication getXML() {
        UserAuthentication todo = new UserAuthentication();
        todo.setUsername("john.poe");
        todo.setPassword("k5p1");
        return todo;
    }
    
    // This can be used to test the integration with the browser
    @GET
    @Produces( { MediaType.TEXT_XML })
    public UserAuthentication getHTML() {
        UserAuthentication todo = new UserAuthentication();
        todo.setUsername("john.doe");
        todo.setPassword("k5p1");
        return todo;
    }
    
    
    // Authenticate the user.
    @GET
    @Path("fetch")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public UserAuthentication fetch(
            @QueryParam("username") String username) {
        
        UserAuthentication todo = new UserAuthentication();
        todo.setUsername(username);
        todo.setSecurityquestion("Where did your mother born?");
        todo.setSecurityresponse("Ezeiza");
       
        return todo;
        
    }
    
    // Authenticate the user.
    @POST
    @Path("change")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public UserAuthentication change(
            @FormParam("username") String username,
            @FormParam("password") String password,
            @FormParam("newpassword1") String newpassword1,
            @FormParam("newpassword2") String newpassword2) {
        
        UserAuthentication todo = new UserAuthentication();
        
        checkPassword(username,password, todo);
        
        
        System.out.println ( todo );
       
        return todo;
        
    }
    
    // Authenticate the user.
    @POST
    @Path("reset")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public UserAuthentication change(
            @FormParam("username") String username,
            @FormParam("newpassword1") String newpassword1,
            @FormParam("newpassword2") String newpassword2) {
        
        UserAuthentication todo = new UserAuthentication();
        
        todo.setUsername(username);
        todo.setPassword(newpassword1);
        System.out.println ( todo );
       
        return todo;
        
    }
    
    
    // Authenticate the user.
    @POST
    @Path("save")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public UserAuthentication save(
            @FormParam("username") String username,
            @FormParam("surname") String surname,
            @FormParam("securityquestion") String securityquestion,
            @FormParam("securityanswer") String securityanswer) {
        
        UserAuthentication todo = new UserAuthentication();
        System.out.println ( username );
        
        todo.setUsername(username);
        todo.setSecurityquestion(securityquestion);
        todo.setSecurityresponse(securityanswer);
        
       
        return todo;
        
    }
    
    // Authenticate the user.
    @POST
    @Path("check")
    @Produces({MediaType.APPLICATION_XML, MediaType.APPLICATION_JSON})
    public UserAuthentication doAuthenticate(
            @FormParam("username") String username,
            @FormParam("password") String password) {
        
        UserAuthentication todo = new UserAuthentication();

        
        checkPassword(username, password, todo);
        
       
        return todo;
        
    }

    private boolean checkPassword(String username, String password,
            UserAuthentication todo) {
        
        if (username.equals("faturita") && password.equals("1122"))
        {
            todo.setUsername(username);
            todo.setPassword(password);    
            return true;
        }
        else
        {
            todo.setUsername("notauthenticated");
            return false;
        }
    }

}