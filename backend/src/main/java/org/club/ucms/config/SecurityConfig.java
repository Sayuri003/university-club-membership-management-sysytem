package org.club.ucms.config;

import lombok.RequiredArgsConstructor;
import org.club.ucms.security.JwtAuthenticationFilter;
import org.club.ucms.security.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity // 👈 Security configurations active කිරීමට මෙය අනිවාර්යයි
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsServiceImpl userDetailsService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. CORS සක්‍රීය කිරීම (React app එකට ඉඩ දීම සඳහා)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 2. CSRF අක්‍රීය කිරීම (Stateless API නිසා)
                .csrf(csrf -> csrf.disable())

                // 3. Request Authorization රීති
                .authorizeHttpRequests(auth -> auth
                        // ලොගින් සහ රෙජිස්ටර් සඳහා ඕනෑම අයෙකුට ඉඩ දීම
                        .requestMatchers("/api/auth/**").permitAll()

                        // කලින් turn එකේ කතා කරපු පරිදි Admin routes වලට රෝල් එක check කිරීම
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // ඉතිරි ඕනෑම request එකකට log වීම අනිවාර්යයි
                        .anyRequest().authenticated()
                )

                // 4. Session එක Stateless කිරීම
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authenticationProvider(authenticationProvider())

                // 5. UsernamePassword filter එකට කලින් JWT Filter එක run කිරීම
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 🌐 React Application එක වෙනුවෙන් CORS Config කරන Bean එක
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // React App එක රන් වන URL එක (Vite default port 5173)
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));

        // ඉඩ දෙන HTTP Methods
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // ඉඩ දෙන Headers (Authorization, Content-Type අනිවාර්යයි)
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "Cache-Control"));

        // Credentials (Cookies/Auth Headers) pass කිරීමට ඉඩ දීම
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // සියලුම පාරවල් සඳහා වලංගුයි
        return source;
    }
}