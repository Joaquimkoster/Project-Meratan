package br.com.meratan.files;

import org.springframework.core.io.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.security.*;
import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/files")
public class FileController {

    private final StoredFileRepository repo;
    private final Path dir = Paths.get("uploads");

    public FileController(StoredFileRepository repo) throws IOException {
        this.repo = repo;
        Files.createDirectories(dir);
    }

    @GetMapping
    public List<StoredFile> list() {
        return repo.findAllByOrderByUploadedAtDesc();
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public StoredFile upload(@RequestParam("file") MultipartFile file) throws Exception {
        String storedName = UUID.randomUUID().toString();
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        try (InputStream in = new DigestInputStream(file.getInputStream(), sha)) {
            Files.copy(in, dir.resolve(storedName));
        }
        StoredFile f = new StoredFile();
        f.originalName = file.getOriginalFilename();
        f.storedName = storedName;
        f.contentType = file.getContentType();
        f.sizeBytes = file.getSize();
        f.sha256 = HexFormat.of().formatHex(sha.digest());
        f.uploadedAt = Instant.now();
        return repo.save(f);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource> open(@PathVariable Long id) throws IOException {
        StoredFile f = find(id);
        String type = f.contentType != null ? f.contentType : "application/octet-stream";
        boolean inline = type.startsWith("image/") && !type.equals("image/svg+xml")
                || type.equals("application/pdf");
        ContentDisposition cd = (inline ? ContentDisposition.inline() : ContentDisposition.attachment())
                .filename(f.originalName, StandardCharsets.UTF_8).build();
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(inline ? type : "application/octet-stream"))
                .header(HttpHeaders.CONTENT_DISPOSITION, cd.toString())
                .header("X-Content-Type-Options", "nosniff")
                .body(new UrlResource(dir.resolve(f.storedName).toUri()));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) throws IOException {
        StoredFile f = find(id);
        Files.deleteIfExists(dir.resolve(f.storedName));
        repo.delete(f);
    }

    @DeleteMapping
    public void deleteAll() throws IOException {
        for (StoredFile f : repo.findAll()) {
            Files.deleteIfExists(dir.resolve(f.storedName)); // apaga o arquivo da pasta uploads
        }
        repo.deleteAll(); // apaga os registros do banco
    }

    private StoredFile find(Long id) {
        return repo.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }
}