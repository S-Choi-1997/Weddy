package com.example.user.contract.service;


import com.example.user.contract.domain.Contract;
import com.example.user.contract.dto.request.CreateContractRequestDto;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceImpl implements ContractService {

    @Override
    public Contract createContract(Long userId, CreateContractRequestDto createContractRequestDto) {
        return null;
    }
}
