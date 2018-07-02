package ib.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ib.project.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail( String username );
    
    @Query(value = "SELECT id, email, password, active, certificate FROM users " +
            "WHERE email LIKE %:text%",nativeQuery = true)
    List<User> findAllBySearch(@Param("text") String text);
}

