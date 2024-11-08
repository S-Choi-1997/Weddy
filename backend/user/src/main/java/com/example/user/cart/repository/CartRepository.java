package com.example.user.cart.repository;

import com.example.user.cart.entity.CartEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<CartEntity,Long> {
    Long findCartIdByUserId(Long userId);
}
