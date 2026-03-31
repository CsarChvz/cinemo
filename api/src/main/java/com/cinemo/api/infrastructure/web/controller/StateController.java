package com.cinemo.api.infrastructure.web.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cinemo.api.domain.State;
import com.cinemo.api.domain.ports.in.CreateStateUseCase;
import com.cinemo.api.domain.ports.in.ManageStateUseCase;
import com.cinemo.api.domain.ports.in.RetrieveStateUseCase;
import com.cinemo.api.infrastructure.web.controller.dto.state.StateDtoMapper;
import com.cinemo.api.infrastructure.web.controller.dto.state.StateRequestDTO;
import com.cinemo.api.infrastructure.web.controller.dto.state.StateResponseDTO;
import com.cinemo.api.infrastructure.web.controller.dto.state.StateUpdateRequestDTO;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/state")
@RequiredArgsConstructor
public class StateController {

    private final CreateStateUseCase createStateUseCase;
    private final RetrieveStateUseCase retrieveStateUseCase;
    private final ManageStateUseCase manageStateUseCase;
    private final StateDtoMapper stateDtoMapper;



    @PostMapping
    public ResponseEntity<StateResponseDTO> createState(@Valid @RequestBody StateRequestDTO requestDTO){
        State domainState = stateDtoMapper.toDomain(requestDTO);
        State createState = createStateUseCase.createState(domainState);

        return ResponseEntity.status(HttpStatus.CREATED).body(stateDtoMapper.toResponse(createState));
    }

    @GetMapping
    public ResponseEntity<List<StateResponseDTO>> getAllStates() {

        List<State> states = retrieveStateUseCase.getStates();
        List<StateResponseDTO> responseDTOs = states.stream().map(stateDtoMapper::toResponse).toList();

        return ResponseEntity.status(HttpStatus.OK).body(responseDTOs);
    }

    @GetMapping("/struct")
    public ResponseEntity<List<StateResponseDTO>> getStatesFromMemory() {
        List<State> states = retrieveStateUseCase.getMemoryStates();

        List<StateResponseDTO> responseDTOs = states.stream()
                .map(stateDtoMapper::toResponse)
                .toList();

        return ResponseEntity.ok(responseDTOs);
    }

    @GetMapping("/{code}")
    public ResponseEntity<Optional<StateResponseDTO>> getStatesByCode(@PathVariable String code) {
        Optional<State> state = retrieveStateUseCase.getByCode(code);
        Optional<StateResponseDTO> responseDTOs = state.map(stateDtoMapper::toResponse);

        return ResponseEntity.status(HttpStatus.OK).body(responseDTOs);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StateResponseDTO> updateState(@PathVariable Long id,
            @Valid @RequestBody StateUpdateRequestDTO requestDTO) {

        // 1. Buscamos el estado por ID
        return retrieveStateUseCase.getById(id)
                .map(existingState -> {
                    stateDtoMapper.updateDomainFromDto(requestDTO, existingState);
                    State updated = manageStateUseCase.modifiedState(existingState);
                    return ResponseEntity.ok(stateDtoMapper.toResponse(updated));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteState(@PathVariable Long id) {

        return retrieveStateUseCase.getById(id).map(existingState -> {
            manageStateUseCase.removeState(existingState);
            return ResponseEntity.noContent().<Void>build();
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
