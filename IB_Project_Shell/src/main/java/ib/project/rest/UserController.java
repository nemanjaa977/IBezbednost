package ib.project.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import ib.project.dto.UserDTO;
import ib.project.entity.Authority;
import ib.project.entity.User;
import ib.project.service.AuthorityService;
import ib.project.service.UserService;

import java.security.Principal;
import java.util.List;

import javax.websocket.server.PathParam;

import static org.springframework.web.bind.annotation.RequestMethod.GET;


//Celom kontroleru mogu pristupiti samo autentifikovani korisnici
@RestController
@RequestMapping( value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE )
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AuthorityService authorityService;
    @Autowired
    PasswordEncoder passwordEncoder;
    //Putanja => localhost:8080/api/user/1
    
    //Za pristup ovoj metodi neophodno je da ulogovani korisnik ima ADMIN ulogu
    //Ukoliko nema, server ce vratiti gresku 403 Forbidden
    //Korisnik jeste autentifikovan, ali nije autorizovan da pristupi resursu
    @RequestMapping( method = GET, value = "/{userId}" )
    @PreAuthorize("hasRole('ADMIN')")
    public User loadById( @PathVariable Long userId ) {
        return this.userService.findById( userId );
    }

    @RequestMapping( method = GET, value= "/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('REGULAR')")
    public List<User> loadAll() {
        return this.userService.findAll();
    }

    @RequestMapping("/whoami")
    @PreAuthorize("hasRole('REGULAR')")
    public User user(Principal user) {
        return this.userService.findByEmail(user.getName());
    }
    
    @PostMapping(value="/create" ,consumes="application/json")
    public ResponseEntity<User> saveUser(@RequestBody User user){
		System.out.println("Servis aktiviran");
		User userr = new User();
		userr.setPassword(passwordEncoder.encode(user.getPassword()));
		userr.setEmail(user.getEmail());
		userr.setActive(false);
		userr.setSertifikat("");
		Authority authority=authorityService.findByName("ROLE_REGULAR");
		userr.getUser_authorities().add(authority);
		userr = userService.save(userr);
		return new ResponseEntity<User>(userr, HttpStatus.CREATED);
	}
    
    @PutMapping(value="/edit")
	public ResponseEntity<User> updateUser(@RequestBody String email){
    	System.out.println(email);
		User user = userService.findByEmail(email);
		System.out.println("Pronadjeni user: " + user);
		if(user == null)
			return new ResponseEntity<User>(HttpStatus.BAD_REQUEST);
		user.setActive(true);
		user = userService.save(user);
		return new ResponseEntity<User>(user,HttpStatus.OK);
	}
    
    @RequestMapping( method = RequestMethod.POST, value= "/search")
    public List<User> loadSearch(@RequestBody String text) {
    	System.out.println(text);
        return this.userService.findAllBySearch(text);
    }
}
