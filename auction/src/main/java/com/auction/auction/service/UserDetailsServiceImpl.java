package com.auction.auction.service;

import com.auction.auction.dto.BearerToken;
import com.auction.auction.dto.LoginDto;
import com.auction.auction.dto.RegisterDto;
import com.auction.auction.model.Role;
import com.auction.auction.model.RoleName;
import com.auction.auction.model.User;
import com.auction.auction.repository.RoleRepository;
import com.auction.auction.repository.UserRepository;
import com.auction.auction.security.JwtUtilities;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class UserDetailsServiceImpl {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final JwtUtilities jwtUtilities;

    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final AuthenticationManager authenticationManager;


    
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    public User saverUser(User user) {
        return userRepository.save(user);
    }

    public ResponseEntity<?> signup(RegisterDto registerDto) {
        // Check if a user with the same username already exists
        if (userRepository.findByUsername(registerDto.getUsername()).isPresent()) {
            // Throw an exception or return null
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPhone(registerDto.getPhone());
        user.setUserType(registerDto.getUserType());

        // Encode the user's password
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
        Role role = roleRepository.findByRoleName(RoleName.USER);
        user.setRoles(Collections.singletonList(role));
        userRepository.save(user);
        // Save the user to the database
        String token = jwtUtilities.generateToken(registerDto.getEmail(),Collections.singletonList(role.getRoleName()));
        return new ResponseEntity<>(new BearerToken(token , "Bearer "),HttpStatus.OK);

    }


    public String login(LoginDto loginDto) {
        // Authenticate the user
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginDto.getUsername(), loginDto.getPassword())
        );
        // Set the authenticated user in the security context
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = userRepository.findByUsername(authentication.getName()).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        List<String> rolesNames = new ArrayList<>();
        user.getRoles().forEach(r-> rolesNames.add(r.getRoleName()));
        String token = jwtUtilities.generateToken(user.getUsername(),rolesNames);
        return token;
        // Return the authenticated user
    }
}
