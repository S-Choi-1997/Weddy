package com.ssafy.product.product.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.product.global.s3.S3Uploader;
import com.ssafy.product.global.util.RedisUtil;
import com.ssafy.product.global.util.exception.ImageInvalidException;
import com.ssafy.product.global.util.exception.ProductNotFoundExpception;
import com.ssafy.product.global.util.response.ErrorCode;
import com.ssafy.product.product.domain.Product;
import com.ssafy.product.product.domain.ProductImage;
import com.ssafy.product.product.domain.Review;
import com.ssafy.product.product.dto.request.ProductRegistRequestDto;
import com.ssafy.product.product.dto.request.ReviewRequestDto;
import com.ssafy.product.product.dto.response.ProductResponseDto;
import com.ssafy.product.product.dto.response.ReviewResponseDto;
import com.ssafy.product.product.repository.ProductImageRepository;
import com.ssafy.product.product.repository.ProductRepository;
import com.ssafy.product.product.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class ProductServiceImpl implements ProductService{
    private final String REDIS_LIST_KEY = "productList";
    private final ProductRepository productRepository;
    private final ProductImageRepository productImageRepository;
    private final S3Uploader s3Uploader;
    private final ReviewRepository reviewRepository;
    private final RedisUtil redisUtil;
    private final SyncService syncService;

    @Override
    public List<ProductResponseDto> getList() {
        if(redisUtil.getData(REDIS_LIST_KEY) != null) {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.convertValue(redisUtil.getData(REDIS_LIST_KEY), new TypeReference<List<ProductResponseDto>>(){});
        }

        return productRepository.findAll().stream()
                .map(product -> product.getProduct(product))
                .toList();
    }

    @Override
    public ProductResponseDto detailProduct(final Long productId) {
        Product product = productIsPresent(productId);

        ProductResponseDto productResponse = product.getProduct(product);
        redisUtil.addToSortedSet(productResponse);

        return productResponse;
    }

    @Override
    @Transactional
    public ProductResponseDto registProduct(final ProductRegistRequestDto productRegistRequestDto,
                                            final List<MultipartFile> images) {
        productImageValidation(images);

        Product product = productRepository.save(Product.builder().productRegistRequestDto(productRegistRequestDto).build());

        List<ProductImage> productImages = productImageRepository.saveAll(images.stream()
                .map(image -> ProductImage.builder()
                        .imageUrl(s3Uploader.putS3(image))
                        .product(product)
                        .build())
                .toList());
        ProductResponseDto productResponseDto = ProductResponseDto.registProductResponseDto(product,productImages);
        syncService.syncToReadDatabaseAsync(productResponseDto);

        return productResponseDto;
    }

    @Override
    public List<ReviewResponseDto> reviewList(final Long productId) {
        Product product = productIsPresent(productId);
        List<Review> reviews = reviewRepository.findByProductId(productId);

        return reviews.stream()
                .map(review -> review.getReview(review,product))
                .toList();
    }

    @Override
    @Transactional
    public ReviewResponseDto registerReview(final ReviewRequestDto reviewRequestDto, final Long productId) {
        Product product = productIsPresent(productId);
        Review review = reviewRepository.save(Review.builder().reviewRequestDto(reviewRequestDto).product(product).build());

        return review.getReview(review,product);
    }

    @Override
    public List<ProductResponseDto> rankingList() {
        ObjectMapper objectMapper = new ObjectMapper();

        return redisUtil.getTopRanked().stream()
                .map(obj -> objectMapper.convertValue(obj, ProductResponseDto.class))
                .toList();
    }

    private Product productIsPresent(final Long productId) {
        return productRepository.findById(productId).orElseThrow(
                () -> new ProductNotFoundExpception(ErrorCode.PRODUCT_NOT_FOUND_EXCEPTION)
        );
    }

    private void productImageValidation(final List<MultipartFile> images) {
        if(images == null || images.isEmpty()){
            throw new ImageInvalidException(ErrorCode.IMAGE_INVALID_EXCEPTION);
        }
    }
}
