package com.jwt.security.Entity.token;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    @Query(value = """
      select t from Token t inner join User u\s
      on t.user.id = u.id\s
      where u.id = :id and (t.expired = false or t.revoked = false)\s
      """)
    List<Token> findAllValidTokenByUser(Long id);

    Optional<Token> findByToken(String token);

    @Modifying
    @Query("UPDATE Token t SET t.revoked = true WHERE t.token = :token")
    void saveRevokedToken(@Param("token") String token);

    @Query("SELECT COUNT(t) > 0 FROM Token t WHERE t.token = :token AND t.revoked = true")
    boolean existsRevokedToken(@Param("token") String token);
}