package com.postoipiranga.controller;

import java.util.List;
import java.util.Optional;

import com.postoipiranga.controller.dto.LoginDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(UsuarioController.class);

    @GetMapping
    public List<UsuarioModel> getAllUsuarios() {
        logger.info("chamada endpoint GET /usuarios");
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<UsuarioModel> getUsuarioById(@PathVariable long id) {
        logger.info("chamada endpoint GET /usuarios/{id}");
        return usuarioService.findById(id);
    }

    @PostMapping
    public UsuarioModel createUsuario(@RequestBody @Valid UsuarioModel usuarioModel) {
        logger.info("chamada endpoint POST /usuarios");
        return usuarioService.save(usuarioModel);
    }

    @PutMapping("/{id}")
    public UsuarioModel updateUsuario(@PathVariable long id, @RequestBody @Valid UsuarioModel usuarioModel) {
        logger.info("chamada endpoint PUT /usuarios/{id}");
        if (usuarioService.existsById(id)) {
            usuarioModel.setId(id);
            return usuarioService.save(usuarioModel);
        } else {
            logger.warn("Usuário não existente");
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }

    @DeleteMapping("/{id}")
    public Optional<UsuarioModel> deleteUsuario(@PathVariable long id) {
        logger.info("chamada endpoint DELETE /usuarios/{id}");
        if (usuarioService.existsById(id)) {
            return usuarioService.delete(id);
        } else {
            logger.warn("Usuário não existente");
            throw new IllegalArgumentException("Usuario with ID " + id + " not found.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDTO loginDTO){
        logger.info("chamada endpoint POST /usuarios/login");
        try {
            final var result = usuarioService.autenticar(loginDTO.getEmail(), loginDTO.getSenha());

            return ResponseEntity.ok().body(result);

        }catch(RuntimeException e)
        {
            logger.error("Não foi possível fazer login de usuário", e);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e);
        }
    }
}
