package com.example.user.user.service;

import com.example.user.common.dto.ErrorCode;
import com.example.user.common.exception.UserNotFoundException;
import com.example.user.common.exception.UserTokenNotFoundException;
import com.example.user.common.service.GCSImageService;
import com.example.user.user.dto.response.UserCoupleTokenDto;
import com.example.user.user.dto.response.UserResponseDTO;
import com.example.user.user.entity.UserEntity;
import com.example.user.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final GCSImageService gcsImageService;
    public UserService(UserRepository userRepository, GCSImageService gcsImageService){
        this.userRepository = userRepository;
        this.gcsImageService = gcsImageService;
    }

    public List<UserResponseDTO> userInfo(UserEntity user) {
        // userEntity와 otherUserEntity를 각각 조회하며, 없으면 UserNotFoundException 발생
        UserEntity userEntity = userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException(ErrorCode.USER_NOT_FOUND));
        UserEntity otherUserEntity = null;
        if(user.getOtherId() != null){
            otherUserEntity = userRepository.findById(user.getOtherId())
                    .orElse(null); // otherUserEntity는 없을 수 있으므로 예외를 발생시키지 않고 null을 허용
        }

        List<UserResponseDTO> responseList = new ArrayList<>();

        // userEntity는 항상 존재하므로 리스트에 추가
        responseList.add(UserResponseDTO.fromEntity(userEntity));

        // otherUserEntity가 존재할 경우에만 리스트에 추가
        if (otherUserEntity != null) {
            responseList.add(UserResponseDTO.fromEntity(otherUserEntity));
        }

        return responseList;
    }




    public UserResponseDTO coupleCode(String coupleCode){
        UserResponseDTO userResponseDTO = UserResponseDTO.builder()
                .coupleCode(coupleCode)
                .build();

        return userResponseDTO;
    }

    public void updateUserInfo(Long id, Map<String, Object> info) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        log.info("Received update info: {}", info);

        if (userEntity == null) {
            throw new RuntimeException("User not found");
        }

        if (info.get("phone") != null && !info.get("phone").toString().trim().isEmpty()) {
            userEntity.setPhone(info.get("phone").toString());
        }

        if (info.get("name") != null && !info.get("name").toString().trim().isEmpty()) {
            userEntity.setName(info.get("name").toString());
        }

        if (info.get("address") != null && !info.get("address").toString().trim().isEmpty()) {
            userEntity.setAddress(info.get("address").toString());
        }

        if (info.get("email") != null && !info.get("email").toString().trim().isEmpty()) {
            userEntity.setEmail(info.get("email").toString());
        }

        if (info.get("picture") != null && info.get("picture") instanceof MultipartFile) {
            MultipartFile pictureFile = (MultipartFile) info.get("picture");
            try {
                String pictureUrl = gcsImageService.uploadImage(pictureFile); // GCS에 업로드하고 URL 반환
                userEntity.setPicture(pictureUrl); // URL을 picture 필드에 저장
            } catch (Exception e) {
                throw new RuntimeException("Failed to upload picture", e);
            }
        }

        if (info.get("date") != null && !info.get("date").toString().trim().isEmpty()) {
            log.info(info.get("date").toString());
            userEntity.setDate(LocalDate.parse(info.get("date").toString()));
        }

        userRepository.save(userEntity);
    }


    public UserResponseDTO connectCoupleCode(String coupleCode, Long id) {
        UserEntity userEntity = userRepository.findById(id).orElse(null);
        UserEntity otheruserEntity = userRepository.findByCoupleCode(coupleCode).get(0); // 이부분 내가 바꿨으니 확인 해보셈

        if (userEntity == null || otheruserEntity == null) {
            throw new UserNotFoundException(ErrorCode.USER_NOT_FOUND);
        }

        // coupleCode 업데이트 및 저장
        userEntity.setCoupleCode(coupleCode);
        userEntity.setOtherId(otheruserEntity.getId());
        userRepository.save(userEntity);
        otheruserEntity.setOtherId(userEntity.getId());
        userRepository.save(otheruserEntity);


        // UserResponseDTO 빌드 및 반환
        return UserResponseDTO.builder()
                .id(otheruserEntity.getId())
                .coupleCode(otheruserEntity.getCoupleCode())
                .socialId(otheruserEntity.getSocialId())
                .name(otheruserEntity.getName())
                .email(otheruserEntity.getEmail())
                .address(otheruserEntity.getAddress())
                .phone(otheruserEntity.getPhone())
                .picture(otheruserEntity.getPicture())
                .date(otheruserEntity.getDate())
                .build();
    }

    /**
     *  토큰 가져오기
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-11-07
     * @ 설명     : 커플 코드를 통해서 커플들의 fcm 토큰을 가져오기

     * @param coupleCode
     * @param myUserId
     * @return
     */
    @Transactional(readOnly = true)
    public UserCoupleTokenDto getFcmToken(String coupleCode, Long myUserId) {
        List<UserEntity> userEntity = getUserEntities(coupleCode);
        return getUserCoupleTokenDto(myUserId, userEntity);

    }

    /**
     * fcm 토큰 저장
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-11-07
     * @ 설명     : fcm 토큰 저장

     * @param userId
     * @param fcmToken
     */
    @Transactional
    public void setFcmToken(Long userId, String fcmToken) {
        UserEntity userEntity = getUserEntity(userId);
        userEntity.updateFcmToken(fcmToken);
    }



    private UserEntity getUserEntity(Long userId) {
        UserEntity userEntity = userRepository.findById(userId).orElse(null);
        if (userEntity == null) {
            throw new UserNotFoundException(ErrorCode.USER_NOT_FOUND);
        }
        return userEntity;
    }

    private List<UserEntity> getUserEntities(String coupleCode) {
        List<UserEntity> userEntity = userRepository.findByCoupleCode(coupleCode);
        if (userEntity == null) {
             throw new UserTokenNotFoundException(ErrorCode.USER_TOKEN_NOT_FOUND);
        }
        return userEntity;
    }

    private static UserCoupleTokenDto getUserCoupleTokenDto(Long myUserId, List<UserEntity> userEntity) {
        String myToken = null;
        String coupleToken =null ;

        for(UserEntity user : userEntity){
            if(user.getId().equals(myUserId)){
                myToken = user.getFcmToken();
            }else{
                coupleToken = user.getFcmToken();
            }
        }

        return UserCoupleTokenDto.builder()
                .myFcmToken(myToken)
                .coupleFcmToken(coupleToken)
                .build();
    }
}
