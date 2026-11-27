package br.com.meratan.files;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface StoredFileRepository extends JpaRepository<StoredFile, Long> {
    List<StoredFile> findAllByOrderByUploadedAtDesc();
}