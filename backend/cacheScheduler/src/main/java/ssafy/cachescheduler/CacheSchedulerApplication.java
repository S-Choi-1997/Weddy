package ssafy.cachescheduler;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class CacheSchedulerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CacheSchedulerApplication.class, args);
	}

}
