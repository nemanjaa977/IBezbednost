package ib.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import ib.project.entity.User;
import ib.project.repository.UserRepository;

import java.util.List;



@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail( String username ) {
        User u = userRepository.findByEmail( username );
        return u;
    }
    
    @Override
    public User findById( Long id ) {
        User u = userRepository.findOne( id );
        return u;
    }
    
    @Override
    public List<User> findAll() {
        List<User> result = userRepository.findAll();
        return result;
    }
    
    @Override 
	public User save(User user) {
		return userRepository.save(user);
	}
}
