package com.authnaura.backend.config;

import com.authnaura.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserRepository userRepository;

    // Bean 1: The Password Encoder
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Use BCrypt for strong, salted password hashing
        return new BCryptPasswordEncoder();
    }

    // Bean 2: The Security Filter Chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthFilter) throws Exception {
        http
                // Disable CSRF protection - common for stateless APIs
                .csrf(csrf -> csrf.disable())
                .cors(withDefaults())

                // Define which paths are public and which are protected
                .authorizeHttpRequests(authz -> authz
                        // Our web config for CORS will still be active
                        .requestMatchers("/api/v1/log/**").authenticated() // <-- Make log routes public *for now*
                        .requestMatchers("/api/v1/health").permitAll()  // <-- Make health check public
                        .requestMatchers("/api/v1/auth/**").permitAll() // <-- Make auth routes public (Register/Login)
                        .anyRequest().authenticated() // <-- All other routes need authentication
                )
                // We don't want Spring to create HTTP sessions
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Tell Spring to use our AuthenticationProvider (from Phase 7)
                .authenticationProvider(authenticationProvider())
                // Tell Spring to use our custom filter *before* the standard username/password filter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);


        return http.build();
    }

    // This bean tells Spring how to find a user by their username.
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    // This is the "data access object" that binds the UserDetailsService
    // and the PasswordEncoder together.
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    // This is the main "gatekeeper" bean that we will use in our
    // controller to trigger the authentication.
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}
