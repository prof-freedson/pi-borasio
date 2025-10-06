package com.borasio_back.backend.repository;

import com.borasio_back.backend.model.entity.Pagamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {
}