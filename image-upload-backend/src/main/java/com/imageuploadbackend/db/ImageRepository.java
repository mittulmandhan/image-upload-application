package com.imageuploadbackend.db;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.imageuploadbackend.model.ImageModel;

public interface ImageRepository extends JpaRepository<ImageModel, Long> {
	Optional<ImageModel> findByName(String name);
}
