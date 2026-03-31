package com.cinemo.api.infrastructure.web.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.State;
import com.cinemo.api.domain.ports.in.CreateStateUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.state.StateDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.state.StateRequestDTO;
import com.cinemo.api.infrastructure.web.controller.dto.state.StateResponseDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/state")
@RequiredArgsConstructor
public class StateController {

    private final CreateStateUseCase createStateUseCase;
    private final StateDtoMapper stateDtoMapper;


    @PostMapping
    public ResponseEntity<StateResponseDTO> createState(@Valid @RequestBody StateRequestDTO requestDTO){
        State domainState = stateDtoMapper.toDomain(requestDTO);
        State createState = createStateUseCase.createState(domainState);

        return ResponseEntity.status(HttpStatus.CREATED).body(stateDtoMapper.toResponse(createState));
    }

    
}
