package com.auction.auction;

import java.util.ArrayList;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.auction.auction.model.Role;
import com.auction.auction.model.RoleName;
import com.auction.auction.model.User;
import com.auction.auction.repository.RoleRepository;
import com.auction.auction.repository.UserRepository;
import com.auction.auction.service.UserDetailsServiceImpl;


@SpringBootApplication

public class AuctionApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuctionApplication.class, args);
	}
	@Bean
    CommandLineRunner run (UserDetailsServiceImpl iUserService , RoleRepository iRoleRepository , UserRepository iUserRepository , PasswordEncoder passwordEncoder)
    {return  args ->
    {   iUserService.saveRole(new Role(RoleName.USER));
        iUserService.saveRole(new Role(RoleName.ADMIN));
        iUserService.saveRole(new Role(RoleName.SUPERADMIN));
        iUserService.saverUser(new User("admin", passwordEncoder.encode("adminPassword"), new ArrayList<>()));
        iUserService.saverUser(new User("superadminadmin", passwordEncoder.encode("superadminPassword"), new ArrayList<>()));

        Role role = iRoleRepository.findByRoleName(RoleName.ADMIN);
        User user = iUserRepository.findByUsername("admin").orElse(null);
        user.getRoles().add(role);
        iUserService.saverUser(user);

        User userr = iUserRepository.findByUsername("superadminadmin").orElse(null);
        Role rolee = iRoleRepository.findByRoleName(RoleName.SUPERADMIN);
        userr.getRoles().add(rolee);
        iUserService.saverUser(userr);

    };}
}
