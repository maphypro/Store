package com.jwt.security.service;


import com.jwt.security.Entity.course.Categories;
import com.jwt.security.Entity.course.Course;
import com.jwt.security.Entity.course.repository.CategoriesRepository;
import com.jwt.security.Entity.course.repository.CourseRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.Entity.user.repository.UserRepository;
import com.jwt.security.requestResponse.CourseRequest;
import com.jwt.security.requestResponse.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class CourseService {


    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final CategoriesRepository categoriesRepository;
    public CourseRequest addCourse(CourseRequest request, MultipartFile image, MultipartFile video, User user) {
        User existingUser = userRepository.findById(user.getId()).orElse(null);
        Categories categories = categoriesRepository.findById(1l).orElse(null);

        Course course = new Course();
        course.setTitle(request.getTitle());
        course.setCourseCreator(user.getCourseCreator());
        course.setMemberCount(request.getMemberCount());
        course.setCategories(categories);
        course.setPrice(request.getPrice());
        course.setCourseTime(request.getCourseTime());
        course.setImage(image.getOriginalFilename());
        course.setVideo(video.getOriginalFilename());
        course.setDescription(request.getDescription());

        courseRepository.save(course);
        return request;
    }
}
