package ib.project.service;

import java.util.List;

import ib.project.entity.User;

public interface UserService {
    User findById(Long id);
    User findByEmail(String username);
    List<User> findAll ();
    User save(User user);
}
