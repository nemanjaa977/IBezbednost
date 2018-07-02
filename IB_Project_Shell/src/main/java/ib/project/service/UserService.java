package ib.project.service;

import java.util.List;

import org.springframework.data.repository.query.Param;

import ib.project.entity.User;

public interface UserService {
    User findById(Long id);
    User findByEmail(String username);
    List<User> findAll ();
    User save(User user);
    
    List<User> findAllBySearch(String text);
}
