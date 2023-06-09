package com.jwt.security.controller;



import com.jwt.security.demo.Arr;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/home")
public class MainController {

    @Value("${upload.path}")
    private String uploadPath;

    @GetMapping("/test")
    public ResponseEntity<ArrayList<Arr>> addmain(){
        String image = "1679955190_phonoteka-org-p-overlord-neironist-art-vkontakte-4.png";
        Arr a = new Arr(1l,"title", "author", uploadPath+ "/static/" +image, 10.0, 200, 300, 10);
        Arr b = new Arr(2l, "title1", "author", uploadPath+ "/static/" +image, 10.0, 200, 300, 1);
        Arr c = new Arr(3l,"title2", "author", uploadPath+ "/static/" +image, 10.0, 200, 300, 2);
        ArrayList<Arr> arrayList = new ArrayList<>();
        arrayList.add(a);
        arrayList.add(b);
        arrayList.add(c);
        return ResponseEntity.ok(arrayList);
    }
}
