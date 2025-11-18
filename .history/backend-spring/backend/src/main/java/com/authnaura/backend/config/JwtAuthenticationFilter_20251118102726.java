package com.authnaura.backend.config;

import com.authnaura.backend.service.JwtService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Get the "Authorization" header from the request
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        System.out.println("=== JWT Filter ===");
        System.out.println("Request URI: " + request.getRequestURI());
        System.out.println("Auth Header: " + (authHeader != null ? "Present" : "Missing"));

        // 2. Check if the header exists and starts with "Bearer "
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("No valid Authorization header, passing to next filter");
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Extract the token (everything after "Bearer ")
        jwt = authHeader.substring(7);
        System.out.println("JWT Token extracted: " + jwt.substring(0, Math.min(20, jwt.length())) + "...");

        // 4. Extract the username from the token
        try {
            username = jwtService.extractUsername(jwt);
            System.out.println("Username from token: " + username);
        } catch (Exception e) {
            System.out.println("Failed to extract username: " + e.getMessage());
            filterChain.doFilter(request, response);
            return;
        }

        // 5. Check if username is valid AND if the user is not *already* authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 6. Load the user from the database
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            System.out.println("User loaded: " + userDetails.getUsername());

            // 7. Validate the token
            if (jwtService.isTokenValid(jwt, userDetails)) {
                System.out.println("Token is valid, authenticating user");
                // 8. If valid, create an "Authentication" object
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null, // We don't need credentials
                        userDetails.getAuthorities()
                );
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 9. Update the Spring Security Context (This is the line that "logs the user in")
                SecurityContextHolder.getContext().setAuthentication(authToken);
                System.out.println("User authenticated successfully");
            } else {
                System.out.println("Token validation failed");
            }
        } else {
            System.out.println("Username null or already authenticated");
        }
        // 10. Pass the request to the next filter
        filterChain.doFilter(request, response);
    }

}
