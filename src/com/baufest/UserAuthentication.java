package com.baufest;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
// JAX-RS supports an automatic mapping from JAXB annotated class to XML and JSON
// Isn't that cool?
public class UserAuthentication {
    private String username;
    private String password;
    private String securityresponse;
    private String securityquestion;
    
    public UserAuthentication(){
        
    }
    public UserAuthentication (String username, String password, String securityquestion, String securityresponse ){
        this.username = username;
        this.password = password;
        this.setSecurityquestion(securityquestion);
        this.setSecurityresponse(securityresponse);
    }
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public void setSecurityquestion(String securityquestion) {
        this.securityquestion = securityquestion;
    }
    public String getSecurityquestion() {
        return securityquestion;
    }
    public void setSecurityresponse(String securityresponse) {
        this.securityresponse = securityresponse;
    }
    public String getSecurityresponse() {
        return securityresponse;
    }

    
}
