package com.postoipiranga.controller;

import java.util.List;
import java.util.Optional;

import com.postoipiranga.controller.dto.LoginDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.postoipiranga.model.UsuarioModel;
import com.postoipiranga.service.UsuarioService;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios") 
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<UsuarioModel> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<UsuarioModel> getUsuarioById(@PathVariable long id) {
        return usuarioService.findById(id);
    }

    @PostMapping
    public UsuarioModel createUsuario(@RequestBody @Valid UsuarioModel usuarioModel) {
        return usuarioService.save(usuarioModel);
    }

    @PutMapping("/{id}")
    public UsuarioModel updateUsuario(@PathVariable long id, @RequestBody @Valid UsuarioModel usuarioModel) {
        if (usuarioService.existsById(id)) {
            usuarioModel.setId(id);
            return usuarioService.save(usuarioModel);
        } else {
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }

    @DeleteMapping("/{id}")
    public Optional<UsuarioModel> deleteUsuario(@PathVariable long id) {
        if (usuarioService.existsById(id)) {
            return usuarioService.delete(id);
        } else {
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO loginDTO){

        try {
            final var result = usuarioService.autenticar(loginDTO.getEmail(), loginDTO.getSenha());

            return ResponseEntity.ok().body(result);

        }catch(RuntimeException e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e);
        }
    }
}
