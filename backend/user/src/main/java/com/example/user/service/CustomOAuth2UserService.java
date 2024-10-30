package com.example.user.service;


import com.example.user.dto.*;
import com.example.user.entity.UserEntity;
import com.example.user.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        if (oAuth2User == null) {
            throw new OAuth2AuthenticationException("OAuth2User가 null입니다. 사용자 정보 로딩 실패");
        }

        System.out.println(oAuth2User);
        System.out.println("Client Registration: " + userRequest.getClientRegistration());
        System.out.println("Access Token: " + userRequest.getAccessToken().getTokenValue());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        System.out.println(registrationId);
        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else return null;
        String userId = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        UserEntity existData = userRepository.findByUserId(userId);

        if (existData == null) {
            UserEntity userEntity = new UserEntity();
            userEntity.setUserId(userId);
            userEntity.setName(oAuth2Response.getName());
            userEntity.setEmail(oAuth2Response.getEmail());
            userEntity.setRole("ROLE_USER");

            userRepository.save(userEntity);
            UserDTO userDTO = new UserDTO();
            userDTO.setUserId(userId);
            userDTO.setName(oAuth2Response.getName());
            userDTO.setRole("ROLE_USER");

            return new CustomOAuth2User(userDTO);
        } else {

            existData.setEmail(oAuth2Response.getEmail());
            existData.setName(oAuth2Response.getName());

            userRepository.save(existData);

            UserDTO userDTO = new UserDTO();
            userDTO.setUserId(existData.getUserId());
            userDTO.setName(oAuth2Response.getName());
            userDTO.setRole(existData.getRole());

            return new CustomOAuth2User(userDTO);
        }

    }
}
