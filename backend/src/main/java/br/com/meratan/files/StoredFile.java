package br.com.meratan.files;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
public class StoredFile {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String originalName;
    public String storedName;
    public String contentType;
    public long sizeBytes;
    public String sha256;
    public Instant uploadedAt;
}