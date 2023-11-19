package com.auction.auction.repository;

import com.auction.auction.model.Role;
import com.auction.auction.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Integer> {

    Role findByRoleName(RoleName roleName);


}