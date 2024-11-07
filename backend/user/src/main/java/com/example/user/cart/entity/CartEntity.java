package com.example.user.cart.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "Cart")
public class CartEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long productId;

    private Long userId;
}
