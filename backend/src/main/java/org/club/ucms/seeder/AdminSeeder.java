package org.club.ucms.seeder;

import org.club.ucms.entity.Role;
import org.club.ucms.entity.User;
import org.club.ucms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.admin.name}")
    private String adminName;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Value("${app.admin.student-id}")
    private String studentId;

    @Value("${app.admin.department}")
    private String department;

    public AdminSeeder(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {

        if (userRepository.findByEmail(adminEmail).isEmpty()) {

            User admin = new User();

            admin.setFullName(adminName);
            admin.setEmail(adminEmail);
            admin.setPassword(passwordEncoder.encode(adminPassword));
            admin.setStudentId(studentId);
            admin.setDepartment(department);
            admin.setRoles(Set.of(Role.ADMIN));

            userRepository.save(admin);

            System.out.println("=====================================");
            System.out.println(" Admin Created Successfully");
            System.out.println(" Email : " + adminEmail);
            System.out.println(" Password : " + adminPassword);
            System.out.println("=====================================");

        } else {

            System.out.println("=====================================");
            System.out.println(" Admin already exists.");
            System.out.println("=====================================");

        }
    }
}