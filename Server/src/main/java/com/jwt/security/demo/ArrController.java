package com.jwt.security.demo;

import com.jwt.security.Entity.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;

@Controller
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/demo")
@RequiredArgsConstructor
public class ArrController {

    @Value("${upload.path}")
    private String uploadPath;

    @GetMapping
    public ResponseEntity<ArrayList<Arr>> getArr(@AuthenticationPrincipal User user) {
        String image = "1679955190_phonoteka-org-p-overlord-neironist-art-vkontakte-4.png";
        String imageUrl = "img/" + image; // Относительный путь к изображению

        Arr a = new Arr(1l,"title", "author", imageUrl, 10.0, 200, 300, 10);
        Arr b = new Arr(2l,"title1", "author", imageUrl, 10.0, 200, 300, 1);
        Arr c = new Arr(3l,"title2", "author", imageUrl, 10.0, 200, 300, 2);

        ArrayList<Arr> arrayList = new ArrayList<>();
        arrayList.add(a);
        arrayList.add(b);
        arrayList.add(c);

        return ResponseEntity.ok(arrayList);
    }

}
