package com.jwt.security.service;

import com.jwt.security.Entity.course.Lesson;
import com.jwt.security.Entity.course.repository.LessonRepository;
import com.jwt.security.Entity.text.Comment;
import com.jwt.security.Entity.text.repository.CommnetRepository;
import com.jwt.security.Entity.user.User;
import com.jwt.security.requestResponse.CommentRequest;
import com.jwt.security.requestResponse.CommentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final LessonRepository lessonRepository;
    private final CommnetRepository commnetRepository;
    public CommentResponse addComment(CommentRequest commentRequest, User user){
        Lesson lesson = lessonRepository.findById(commentRequest.getLessonId()).orElseThrow();
        Comment comment = new Comment();
        comment.setLesson(lesson);
        comment.setUser(user);
        comment.setText(commentRequest.getText());
        Long commentId = commnetRepository.save(comment).getId();

        CommentResponse commentResponse = new CommentResponse();
        commentResponse.setId(commentId);
        commentResponse.setText(commentRequest.getText());
        commentResponse.setLessonId(lesson.getId());
        commentResponse.setUserId(user.getId());
        commentResponse.setUserName(user.getFirstname());

        return commentResponse;
    }

    public List<CommentResponse> getComments(Long lessonId){
        List<Comment> commentList = commnetRepository.findByLessonId(lessonId);
        List<CommentResponse> commentResponses = new ArrayList<>();
        for(Comment comment : commentList){
            CommentResponse commentResponse = new CommentResponse();
            commentResponse.setId(comment.getId());
            commentResponse.setText(comment.getText());
            commentResponse.setLessonId(comment.getLesson().getId());
            commentResponse.setUserId(comment.getUser().getId());
            commentResponse.setUserName(comment.getUser().getFirstname());
            commentResponses.add(commentResponse);
        }
        return commentResponses;
    }
}
