CREATE TABLE stored_file (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  original_name VARCHAR(255) NOT NULL,
  stored_name   VARCHAR(64)  NOT NULL,
  content_type  VARCHAR(255),
  size_bytes    BIGINT       NOT NULL,
  sha256        VARCHAR(64)  NOT NULL,
  uploaded_at   TIMESTAMP    NOT NULL
);