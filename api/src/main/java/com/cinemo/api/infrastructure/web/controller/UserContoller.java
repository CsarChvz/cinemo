package com.cinemo.api.infrastructure.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.User;
import com.cinemo.api.domain.ports.in.CreateUserUseCase;
import com.cinemo.api.domain.ports.in.RetriveUsersUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.UserDTOMapper;
import com.cinemo.api.infrastructure.web.controller.dto.UserRequestDTO;
import com.cinemo.api.infrastructure.web.controller.dto.UserResponseDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserContoller {
    private final CreateUserUseCase createUserUseCase;
    private final RetriveUsersUseCase retriveUsersUseCase;
    private final UserDTOMapper userDTOMapper;

    @PostMapping
    public ResponseEntity<UserResponseDTO> createNewUser(@Valid @RequestBody UserRequestDTO requestDTO){
        User domainUser = userDTOMapper.toDomain(requestDTO);
        User createUser = createUserUseCase.createUser(domainUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(userDTOMapper.toResponse(createUser));
    }

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(){

        List<User> users = retriveUsersUseCase.getUsers();
        List<UserResponseDTO> responseDTOs = users.stream().map(userDTOMapper::toResponse).toList();

        return ResponseEntity.status(HttpStatus.OK).body(responseDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Long id){
        User user = retriveUsersUseCase.getUser(id);
        return ResponseEntity.status(HttpStatus.OK).body(userDTOMapper.toResponse(user));
    }

}
