package com.ssafy.product.product.service;

import com.ssafy.product.config.s3.S3Uploader;
import com.ssafy.product.product.domain.Vender;
import com.ssafy.product.product.dto.request.VenderRequestDto;
import com.ssafy.product.product.dto.response.VenderResponseDto;
import com.ssafy.product.product.repository.VenderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class VenderServiceImpl implements VenderService {
    private final VenderRepository venderRepository;
    private final S3Uploader s3Uploader;

    @Override
    public VenderResponseDto registVender(final VenderRequestDto venderRequestDto, final MultipartFile image) {
        String s3Url = s3Uploader.putS3(image);
        Vender vender = Vender.builder().venderRequestDto(venderRequestDto).s3Url(s3Url).build();
        venderRepository.save(vender);

        return VenderResponseDto.builder()
                .id(vender.getId())
                .name(vender.getName())
                .phone(vender.getPhone())
                .businessNumber(vender.getBusinessNumber())
                .address(vender.getAddress())
                .image(vender.getImageUrl())
                .build();
    }
}