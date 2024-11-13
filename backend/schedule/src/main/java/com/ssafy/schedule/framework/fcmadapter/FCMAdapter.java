package com.ssafy.schedule.framework.fcmadapter;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.ssafy.schedule.application.outputport.FCMOutputPort;
import org.springframework.stereotype.Service;

/**
 * 작성자   : 이병수
 * 작성날짜 : 2024-11-12
 * 설명    :
 */

@Service
public class FCMAdapter implements FCMOutputPort {
    @Override
    public void send(String token, String title, String body) {
        try {
            // 알림 메시지 생성
            System.out.println("token: " + token);
            Notification notification = Notification.builder()
                    .setTitle(title)
                    .setBody(body)
                    .build();

            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(notification)
                    .build();

            // FCM으로 메시지 전송
            String response = FirebaseMessaging.getInstance().send(message);
            System.out.println("Successfully sent message: " + response);

        } catch (Exception e) {
            System.err.println("Error sending FCM message: " + e.getMessage());
        }
    }
}