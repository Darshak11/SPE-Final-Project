package com.auction.auction.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.auction.auction.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}